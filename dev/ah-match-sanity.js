/**
 * Quick sanity script: prints AH picks for a fixed ingredient list.
 *
 * Usage:
 *   node dev/ah-match-sanity.js 5063
 *
 * Requires the server to be running locally on the given port.
 */
const port = Number.parseInt(String(process.argv[2] || "5063"), 10) || 5063;

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

function pickChoices(item, max = 5) {
  const choices = Array.isArray(item?.choices) ? item.choices : [];
  return choices.slice(0, max).map((c) => ({
    title: c?.title || "",
    price: c?.price || "",
    labels: Array.isArray(c?.labels) ? c.labels : [],
  }));
}

async function main() {
  const base = `http://localhost:${port}`;
  const ingredients = [
    "knoflook",
    "ongeklopte room",
    "slagroom (ongeklopt)",
    "parmezaanse kaas",
    "Parmigiano Reggiano",
    "parmigiano",
    "grana padano",
    "pecorino romano",
    "mozzarella",
    "burrata",
  ];

  const basket = await postJson(`${base}/api/store-basket`, {
    store: "albert-heijn",
    recipeTitle: "AH match sanity",
    sourceUrl: "dev/ah-match-sanity",
    items: ingredients.map((title) => ({
      title,
      amount: "1",
      recipeTitle: "AH match sanity",
    })),
  });

  const items = Array.isArray(basket?.items) ? basket.items : [];
  for (const it of items) {
    const top = it?.choices?.[0] || null;
    console.log("");
    console.log(`- ingredient: ${it?.ingredientTitle || ""}`);
    console.log(`  confidence: ${it?.confidence || ""}`);
    console.log(`  pick: ${top?.title || ""} ${top?.price ? `(${top.price})` : ""}`.trim());
    const alts = pickChoices(it, 5);
    for (const a of alts) {
      console.log(`    - ${a.title} ${a.price ? `(${a.price})` : ""}`.trim());
    }
  }
}

main().catch((err) => {
  console.error(err?.message || err);
  if (err?.payload) console.error(JSON.stringify(err.payload, null, 2));
  process.exit(1);
});

