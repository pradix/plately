/**
 * Regression script: import a recipe URL, build a store basket payload,
 * and print ingredient titles + top AH match (and a few alternatives).
 *
 * Usage:
 *   node dev/grocery-ah-regression.js "https://www.lekkerensimpel.com/pasta-alfredo-met-kip/" 5063
 */
const recipeUrl =
  process.argv[2] || "https://www.lekkerensimpel.com/pasta-alfredo-met-kip/";
const port = Number.parseInt(String(process.argv[3] || "5063"), 10) || 5063;

function pick(obj, key) {
  return obj && typeof obj === "object" ? obj[key] : undefined;
}

async function postJson(endpoint, body) {
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  const json = await resp.json().catch(() => null);
  if (!resp.ok) {
    const err = new Error(`Request failed (${resp.status})`);
    err.status = resp.status;
    err.payload = json;
    throw err;
  }
  return json;
}

function formatChoices(item, max = 4) {
  const choices = Array.isArray(item?.choices) ? item.choices : [];
  return choices.slice(0, max).map((c, i) => ({
    i,
    title: c?.title || "",
    price: c?.price || "",
    labels: Array.isArray(c?.labels) ? c.labels : [],
  }));
}

async function main() {
  const base = `http://localhost:${port}`;
  const imported = await postJson(`${base}/api/import`, { url: recipeUrl });
  const recipe = pick(imported, "recipe") || {};
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

  const basket = await postJson(`${base}/api/store-basket`, {
    store: "albert-heijn",
    recipeTitle: recipe.title || "Regression",
    sourceUrl: recipeUrl,
    items: ingredients.map((ing) => ({
      title: String(ing?.name || "").trim(),
      amount: `${String(ing?.quantity || "").trim()} ${String(ing?.unit || "").trim()}`.trim() || "1",
      recipeTitle: recipe.title || "",
    })),
  });

  const items = Array.isArray(basket?.items) ? basket.items : [];
  console.log(
    JSON.stringify(
      {
        ok: Boolean(basket?.ok),
        url: recipeUrl,
        recipeTitle: recipe.title || "",
        ingredientCount: ingredients.length,
        basketItemCount: items.length,
        items: items.map((it) => ({
          ingredientTitle: it?.ingredientTitle || "",
          ingredientAmount: it?.ingredientAmount || "",
          confidence: it?.confidence || "",
          topChoice: it?.choices?.[0]?.title || "",
          topChoices: formatChoices(it, 5),
        })),
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err?.message || err);
  if (err?.payload) console.error(JSON.stringify(err.payload, null, 2));
  process.exit(1);
});

