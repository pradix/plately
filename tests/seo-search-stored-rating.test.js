/**
 * SEO-zoek: ratings uit opgeslagen recepten (geen netwerk).
 */
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { __dev } = require("../server");

describe("searchPublicSeoRecipesLocal stored ratings", () => {
  it("geeft ratingValue/ratingCount mee uit DB-recept", () => {
    const entries = [
      {
        urlPath: "/recept/pasta-carbonara",
        channelId: "ch-ah",
        recipe: {
          title: "Pasta carbonara",
          sourceUrl: "https://www.ah.nl/allerhande/recept/R-R123/pasta-carbonara",
          image: "https://example.com/img.jpg",
          ratingValue: 4,
          ratingCount: 210,
        },
      },
    ];
    const hits = __dev.searchPublicSeoRecipesLocal({
      entries,
      query: "carbonara",
      allowedChannels: null,
      limit: 10,
    });
    assert.equal(hits.length, 1);
    assert.equal(hits[0].ratingValue, 4);
    assert.equal(hits[0].ratingCount, 210);
    assert.equal(hits[0].sourceUrl, "https://www.ah.nl/allerhande/recept/R-R123/pasta-carbonara");
  });

  it("buildStoredRecipeRatingIndex indexeert op bron-URL", () => {
    const index = __dev.buildStoredRecipeRatingIndexFromSeoEntries([
      {
        recipe: {
          sourceUrl: "https://www.jumbo.com/recepten/test-123",
          ratingValue: 5,
          ratingCount: 88,
        },
      },
    ]);
    assert.equal(index.get("https://www.jumbo.com/recepten/test-123")?.ratingValue, 5);
    assert.equal(index.get("https://www.jumbo.com/recepten/test-123")?.ratingCount, 88);
  });
});
