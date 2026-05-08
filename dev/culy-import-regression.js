/**
 * Regression script: hit local /api/import for a Culy recipe and print
 * extracted title/intro/ingredients/instructions/image.
 *
 * Usage:
 *   node dev/culy-import-regression.js "https://www.culy.nl/recepten/..." 5055
 */
const recipeUrl =
  process.argv[2] || "https://www.culy.nl/recepten/surinaamse-nasi-goreng-met-kip/";
const port = Number.parseInt(String(process.argv[3] || "5055"), 10) || 5055;

function pick(obj, key) {
  return obj && typeof obj === "object" ? obj[key] : undefined;
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
        ingredients: ingredients.slice(0, 10),
        steps: instructions.slice(0, 10),
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

