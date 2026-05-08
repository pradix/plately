#!/usr/bin/env node
/* eslint-disable no-console */

const https = require("https");
const { __dev } = require("../server");

const URL_TO_TEST =
  process.env.URL ||
  "https://www.ah.nl/allerhande/recept/R-R1198674/gebakken-aardappeltjes-met-courgette-en-gehakt";

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "user-agent": "Mozilla/5.0",
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve({ status: res.statusCode, url: res.headers.location || url, html: data }));
        }
      )
      .on("error", reject);
  });
}

function pick(fields) {
  const out = {};
  for (const k of fields) out[k] = k in fields ? fields[k] : undefined;
  return out;
}

async function main() {
  const { status, html } = await fetchHtml(URL_TO_TEST);
  if (status < 200 || status >= 400) {
    throw new Error(`Fetch failed (${status})`);
  }

  const jsonLd = __dev.findRecipeJsonLd(html);
  const parsed = __dev.parseWebsiteRecipe(html, URL_TO_TEST);

  const summary = {
    url: URL_TO_TEST,
    jsonLd: {
      hasRecipe: Boolean(jsonLd),
      name: jsonLd?.name || "",
      ingredientCount: Array.isArray(jsonLd?.recipeIngredient) ? jsonLd.recipeIngredient.length : 0,
      instructionCount: Array.isArray(jsonLd?.recipeInstructions) ? jsonLd.recipeInstructions.length : 0,
      totalTime: jsonLd?.totalTime || "",
      recipeYield: jsonLd?.recipeYield || "",
      calories: jsonLd?.nutrition?.calories || "",
    },
    parsed: {
      title: parsed?.title || "",
      descriptionLen: (parsed?.description || "").length,
      servings: parsed?.servings || "",
      time: parsed?.time || "",
      kcal: parsed?.kcal || "",
      ingredientCount: Array.isArray(parsed?.ingredients) ? parsed.ingredients.length : 0,
      instructionCount: Array.isArray(parsed?.instructions) ? parsed.instructions.length : 0,
      needsReview: Boolean(parsed?.needsReview),
    },
  };

  console.log(JSON.stringify(summary, null, 2));

  if (!summary.jsonLd.hasRecipe) throw new Error("No JSON-LD Recipe detected");
  if (summary.parsed.ingredientCount < 6) throw new Error(`Too few ingredients: ${summary.parsed.ingredientCount}`);
  if (summary.parsed.instructionCount < 4) throw new Error(`Too few instructions: ${summary.parsed.instructionCount}`);
  if (!summary.parsed.servings) throw new Error("Missing servings");
  if (!summary.parsed.time) throw new Error("Missing time");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

