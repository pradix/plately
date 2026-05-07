// Minimal smoke test for Jumbo store basket.
// Usage:
//   node server.js   (in one terminal)
//   node smoke-jumbo-store-basket.js

const API_BASE = process.env.API_BASE || "http://localhost:3000";

async function main() {
  const res = await fetch(`${API_BASE}/api/store-basket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      store: "jumbo",
      recipeTitle: "Smoke test",
      items: [{ title: "kipfilet", amount: "1" }],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = await res.json();
  const item = json?.items?.[0];
  const choices = Array.isArray(item?.choices) ? item.choices : [];
  if (!choices.length) {
    throw new Error("Expected choices[0].choices to be populated for jumbo.");
  }

  const top = choices[0];
  console.log("✓ jumbo /api/store-basket choices:", {
    kind: json.kind,
    directUrl: json.directUrl,
    ingredient: item.ingredientTitle,
    choicesCount: choices.length,
    firstChoice: {
      title: top.title,
      price: top.price,
      url: top.url,
      imageUrl: top.imageUrl,
      productId: top.productId,
    },
  });
}

main().catch((err) => {
  console.error("✗ smoke test failed:", err?.message || err);
  process.exitCode = 1;
});

