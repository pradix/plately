/**
 * AH sanity script (no extra deps).
 *
 * Calls the local `/api/store-basket` endpoint with a list of ingredient strings
 * and prints the selected product title for each.
 *
 * Usage:
 *   node dev/ah-basket-sanity.js 5063
 *   node dev/ah-basket-sanity.js 5063 "kipdijfilet" "crème fraîche"
 */
const port = Number.parseInt(String(process.argv[2] || "5063"), 10) || 5063;
const extraIngredients = process.argv.slice(3).map((s) => String(s || "").trim()).filter(Boolean);

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

async function main() {
  const base = `http://127.0.0.1:${port}`;
  const ingredients = [
    // cheeses
    "parmezaanse kaas",
    "Parmigiano Reggiano",
    "grana padano",
    "pecorino romano",
    "mozzarella",
    // creams
    "slagroom (ongeklopt)",
    "kookroom",
    "room",
    "crème fraîche",
    "mascarpone",
    // herbs
    "basilicum",
    "peterselie",
    "koriander",
    // meats
    "kipdijfilet",
    "kipfilet",
    "rundergehakt",
    "half-om-half gehakt",
    ...extraIngredients,
  ];

  const basket = await postJson(`${base}/api/store-basket`, {
    store: "albert-heijn",
    recipeTitle: "AH basket sanity",
    sourceUrl: "dev/ah-basket-sanity",
    items: ingredients.map((title) => ({
      title,
      amount: "1",
      recipeTitle: "AH basket sanity",
    })),
  });

  const items = Array.isArray(basket?.items) ? basket.items : [];
  for (const it of items) {
    const picked = it?.choices?.[0] || null;
    console.log(`${it?.ingredientTitle || ""} -> ${picked?.title || ""}`);
  }
}

main().catch((err) => {
  console.error(err?.message || err);
  if (err?.payload) console.error(JSON.stringify(err.payload, null, 2));
  process.exit(1);
});

