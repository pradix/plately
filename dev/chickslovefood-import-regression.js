/**
 * Regression script: hit local /api/import for a ChicksLoveFood recipe and print
 * extracted title/ingredients/instructions, plus a quick sanity check.
 *
 * Usage:
 *   node dev/chickslovefood-import-regression.js "https://chickslovefood.com/recept/..." 5055
 */
const recipeUrl =
  process.argv[2] || "https://chickslovefood.com/recept/penne-margherita-ovenschotel/";
const port = Number.parseInt(String(process.argv[3] || "5055"), 10) || 5055;

function toIngredientLine(i) {
  if (!i || typeof i !== "object") return "";
  return `${i.quantity || ""} ${i.unit || ""} ${i.name || ""}`.replace(/\s+/g, " ").trim();
}

async function main() {
  const endpoint = `http://127.0.0.1:${port}/api/import`;
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

  const recipe = (json && json.recipe) || {};
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];

  const ingredientLines = ingredients.map(toIngredientLine).filter(Boolean);
  const needsAttention =
    ingredientLines.length < 4 ||
    instructions.length < 5 ||
    ingredientLines.some((l) => /privacy statement|cookie statement|word gratis member/i.test(l)) ||
    instructions.some((s) => /word gratis member|privacy statement|cookie statement/i.test(String(s || "")));

  console.log(
    JSON.stringify(
      {
        ok: Boolean(json && json.ok),
        url: recipeUrl,
        title: recipe.title || "",
        ingredientsCount: ingredientLines.length,
        stepsCount: instructions.length,
        needsAttention,
        ingredients: ingredientLines,
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

