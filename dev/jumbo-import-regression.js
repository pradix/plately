/**
 * Regression script: hit local /api/import for a Jumbo recipe and print
 * extracted title/intro/ingredients/instructions/image, plus a quick
 * ingredient diff vs the page's JSON-LD.
 *
 * Usage:
 *   node dev/jumbo-import-regression.js "https://www.jumbo.com/recepten/..." 5063
 */
const recipeUrl =
  process.argv[2] || "https://www.jumbo.com/recepten/zelfgemaakte-kfc-1413686-7";
const port = Number.parseInt(String(process.argv[3] || "5063"), 10) || 5063;

function pick(obj, key) {
  return obj && typeof obj === "object" ? obj[key] : undefined;
}

function toIngredientLine(i) {
  if (!i || typeof i !== "object") return "";
  return `${i.quantity || ""} ${i.unit || ""} ${i.name || ""}`.replace(/\s+/g, " ").trim();
}

function normalizeIngText(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchJsonLdRecipe(url) {
  const res = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0", accept: "text/html" },
    redirect: "follow",
  });
  const html = await res.text();
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .filter(Boolean);
  const flatten = (obj) => {
    if (!obj) return [];
    if (Array.isArray(obj)) return obj.flatMap(flatten);
    if (typeof obj === "object") {
      const out = [obj];
      if (obj["@graph"]) out.push(...flatten(obj["@graph"]));
      return out;
    }
    return [];
  };

  for (const script of scripts) {
    try {
      const parsed = JSON.parse(script);
      for (const cand of flatten(parsed)) {
        const t = cand && cand["@type"];
        const isRecipe = Array.isArray(t) ? t.includes("Recipe") : t === "Recipe";
        if (isRecipe) return cand;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

async function main() {
  const endpoint = `http://localhost:${port}/api/import`;
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ url: recipeUrl }),
  });

  const json = await resp.json().catch(() => null);
  if (!resp.ok) {
    console.error("Import failed:", resp.status, json || {});
    process.exit(1);
  }

  const recipe = pick(json, "recipe") || {};
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];

  const jsonLd = await fetchJsonLdRecipe(recipeUrl).catch(() => null);
  const jsonLdIngredientsRaw = Array.isArray(jsonLd?.recipeIngredient) ? jsonLd.recipeIngredient : [];
  const jsonLdIngredients = jsonLdIngredientsRaw.map((s) => String(s || "").trim()).filter(Boolean);

  const importedSet = new Set(ingredients.map((i) => normalizeIngText(toIngredientLine(i))).filter(Boolean));
  const jsonldSet = new Set(jsonLdIngredients.map((s) => normalizeIngText(s)).filter(Boolean));
  const missingFromImport = [...jsonldSet].filter((s) => !importedSet.has(s)).slice(0, 30);

  console.log(
    JSON.stringify(
      {
        ok: Boolean(json && json.ok),
        url: recipeUrl,
        title: recipe.title || "",
        intro: recipe.description || recipe.caption || "",
        image: recipe.image || "",
        ingredientsCount: ingredients.length,
        stepsCount: instructions.length,
        missingJsonLdIngredients: missingFromImport,
        ingredients: ingredients.map(toIngredientLine),
        steps: instructions,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

