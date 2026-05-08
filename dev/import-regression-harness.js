/**
 * Lightweight import regression harness (no extra deps).
 *
 * Runs a list of URLs against a locally running server and prints a compact
 * report that is easy to diff in CI / local debugging.
 *
 * Usage:
 *   node dev/import-regression-harness.js 5063
 *   node dev/import-regression-harness.js --port 5063
 *   node dev/import-regression-harness.js --url "https://example.com/recipe"
 */
const fixtures = require("./import-regression-fixtures");

function parseArgs(argv) {
  const out = { port: 5063, url: "" };
  const list = Array.isArray(argv) ? argv.slice(2) : [];
  for (let i = 0; i < list.length; i++) {
    const cur = list[i];
    if (!cur) continue;
    if (cur === "--port" || cur === "-p") {
      out.port = Number.parseInt(String(list[i + 1] || ""), 10) || out.port;
      i++;
      continue;
    }
    if (cur === "--url" || cur === "-u") {
      out.url = String(list[i + 1] || "").trim();
      i++;
      continue;
    }
    if (/^\d{2,5}$/.test(cur)) {
      out.port = Number.parseInt(cur, 10) || out.port;
      continue;
    }
    if (/^https?:\/\//i.test(cur)) {
      out.url = cur.trim();
      continue;
    }
  }
  return out;
}

function pick(obj, key) {
  return obj && typeof obj === "object" ? obj[key] : undefined;
}

function sanitizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function summarizeRecipe(url, recipe) {
  const title = sanitizeText(recipe?.title || "");
  const ingredients = Array.isArray(recipe?.ingredients) ? recipe.ingredients.filter(Boolean) : [];
  const steps = Array.isArray(recipe?.instructions) ? recipe.instructions.filter(Boolean) : [];
  const ingredientNames = ingredients
    .map((i) => sanitizeText(i?.name || i?.title || ""))
    .filter(Boolean);

  const samples = ingredientNames.slice(0, 3);
  const ingredientCount = ingredientNames.length;
  const stepsCount = steps.length;

  const warnings = [];
  if (!title) warnings.push("missing_title");
  if (ingredientCount < 2) warnings.push("few_ingredients");
  if (stepsCount < 1) warnings.push("few_steps");
  if (ingredientCount > 40) warnings.push("many_ingredients");
  if (ingredientCount > 50) warnings.push("noise_ingredients_gt_50");
  if (stepsCount > 60) warnings.push("many_steps");

  const joined = `${title}\n${ingredientNames.join("\n")}\n${steps.join("\n")}`.toLowerCase();
  if (/privacy statement|cookie statement|word gratis member|accepteer cookies/.test(joined)) {
    warnings.push("cookie_or_privacy_noise");
  }

  return {
    url,
    titlePresent: Boolean(title),
    ingredientCount,
    stepsCount,
    ingredientSamples: samples,
    warnings,
    ok:
      Boolean(title) &&
      ingredientCount >= 2 &&
      ingredientCount <= 50 &&
      stepsCount >= 1 &&
      stepsCount <= 60 &&
      !warnings.includes("cookie_or_privacy_noise"),
  };
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

async function runOne(base, url) {
  const imported = await postJson(`${base}/api/import`, { url });
  const recipe = pick(imported, "recipe") || {};
  return summarizeRecipe(url, recipe);
}

async function main() {
  const args = parseArgs(process.argv);
  const base = `http://127.0.0.1:${args.port}`;
  const urls = args.url ? [args.url] : fixtures.map((f) => f.url);

  const results = [];
  for (const url of urls) {
    const startedAt = Date.now();
    try {
      const result = await runOne(base, url);
      results.push({ ...result, ms: Date.now() - startedAt });
    } catch (err) {
      results.push({
        url,
        ok: false,
        titlePresent: false,
        ingredientCount: 0,
        stepsCount: 0,
        ingredientSamples: [],
        warnings: ["request_failed"],
        error: sanitizeText(err?.message || err),
        status: err?.status || 0,
        ms: Date.now() - startedAt,
      });
    }
  }

  const okCount = results.filter((r) => r.ok).length;
  const flagged = results.filter((r) => !r.ok || (Array.isArray(r.warnings) && r.warnings.length));

  console.log(
    JSON.stringify(
      {
        ok: okCount === results.length,
        port: args.port,
        total: results.length,
        okCount,
        flaggedCount: flagged.length,
        results,
      },
      null,
      2
    )
  );

  process.exit(okCount === results.length ? 0 : 1);
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});

