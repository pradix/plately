/**
 * App-state saves mogen bestaande receptbeoordelingen niet wegpoetsen.
 */
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { __dev } = require("../server");

describe("recipe rating preservation", () => {
  it("bewaart server-rating als client hetzelfde recept zonder rating terugstuurt", () => {
    const incoming = [
      {
        id: "recipe-1",
        title: "Pasta pesto",
        sourceUrl: "https://example.com/recept/pasta-pesto",
        ingredients: [{ name: "pasta" }],
        instructions: ["Kook de pasta."],
      },
    ];
    const stored = [
      {
        id: "recipe-1",
        title: "Pasta pesto",
        sourceUrl: "https://example.com/recept/pasta-pesto",
        ratingValue: 4,
        ratingCount: 128,
      },
    ];

    const [merged] = __dev.mergeStoredRecipeRatingsIntoIncomingRecipes(incoming, stored);
    assert.equal(merged.ratingValue, 4);
    assert.equal(merged.ratingCount, 128);
  });

  it("kan rating bewaren via bron-URL als een recept-id lokaal veranderd is", () => {
    const incoming = [
      {
        id: "local-copy-1",
        title: "Citroencake",
        sourceUrl: "https://www.laurasbakery.nl/citroencake/?utm_source=test#comments",
        ingredients: [{ name: "citroen" }],
        instructions: ["Bak de cake."],
      },
    ];
    const stored = [
      {
        id: "recipe-original",
        title: "Citroencake",
        sourceUrl: "https://laurasbakery.nl/citroencake/",
        ratingValue: 5,
        ratingCount: 42,
      },
    ];

    const [merged] = __dev.mergeStoredRecipeRatingsIntoIncomingRecipes(incoming, stored);
    assert.equal(merged.ratingValue, 5);
    assert.equal(merged.ratingCount, 42);
  });

  it("overschrijft een geldige client-rating niet met een oudere server-rating", () => {
    const incoming = [
      {
        id: "recipe-2",
        title: "Taco's",
        sourceUrl: "https://example.com/recept/tacos",
        ratingValue: 5,
        ratingCount: 9,
        ingredients: [{ name: "tortilla" }],
        instructions: ["Vul de taco."],
      },
    ];
    const stored = [
      {
        id: "recipe-2",
        sourceUrl: "https://example.com/recept/tacos",
        ratingValue: 3,
        ratingCount: 100,
      },
    ];

    const [merged] = __dev.mergeStoredRecipeRatingsIntoIncomingRecipes(incoming, stored);
    assert.equal(merged.ratingValue, 5);
    assert.equal(merged.ratingCount, 9);
  });

  it("bewaart Postgres app_state ratings bij een client-save zonder ratings", () => {
    const currentUser = {
      id: "user-1",
      email: "test@example.com",
      app_state: {
        importedRecipes: [
          {
            id: "recipe-pg",
            title: "Postgres pasta",
            sourceUrl: "https://example.com/recept/postgres-pasta",
            ratingValue: 4,
            ratingCount: 321,
            ingredients: [{ name: "pasta" }],
            instructions: ["Kook."],
          },
        ],
      },
    };
    const incoming = {
      importedRecipes: [
        {
          id: "recipe-pg",
          title: "Postgres pasta",
          sourceUrl: "https://example.com/recept/postgres-pasta",
          ingredients: [{ name: "pasta" }],
          instructions: ["Kook."],
        },
      ],
    };

    const next = __dev.sanitizeUserStatePayload(incoming, currentUser);
    assert.equal(next.importedRecipes[0].ratingValue, 4);
    assert.equal(next.importedRecipes[0].ratingCount, 321);
  });
});
