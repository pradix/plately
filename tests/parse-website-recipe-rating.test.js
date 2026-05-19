/**
 * Unit tests: rating uit JSON-LD bij website-import (geen netwerk).
 */
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { __dev } = require("../server");

const SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head><title>Test pasta</title></head>
<body>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Test pasta",
  "recipeIngredient": ["200 g pasta", "2 el olijfolie"],
  "recipeInstructions": [{"@type": "HowToStep", "text": "Kook pasta."}, {"@type": "HowToStep", "text": "Serveer."}],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "ratingCount": "128",
    "bestRating": "5"
  }
}
</script>
</body>
</html>`;

describe("parseWebsiteRecipe ratings", () => {
  it("haalt aggregateRating uit JSON-LD mee bij import", () => {
    const parsed = __dev.parseWebsiteRecipe(SAMPLE_HTML, "https://example.com/recept/test-pasta");
    assert.equal(parsed.ratingValue, 5);
    assert.equal(parsed.ratingCount, 128);
    assert.equal(parsed.ratingNormalizedFromWideScale, undefined);
  });

  it("normaliseert brede schaal naar /5", () => {
    const wide = normalizeWideScaleHtml();
    const parsed = __dev.parseWebsiteRecipe(wide, "https://example.com/recept/wide");
    assert.equal(parsed.ratingValue, 4); // 8/10 → 4 op schaal van 5
    assert.equal(parsed.ratingCount, 42);
    assert.equal(parsed.ratingNormalizedFromWideScale, true);
  });
});

function normalizeWideScaleHtml() {
  return `<!DOCTYPE html><html><body>
<script type="application/ld+json">
{
  "@type": "Recipe",
  "name": "Wide scale",
  "recipeIngredient": ["a", "b"],
  "recipeInstructions": ["stap 1", "stap 2", "stap 3"],
  "aggregateRating": { "ratingValue": "8", "ratingCount": "42", "bestRating": "10" }
}
</script>
</body></html>`;
}
