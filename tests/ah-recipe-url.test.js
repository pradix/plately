const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { __dev } = require("../server");

describe("AH Allerhande recipe URL guardrails", () => {
  it("accepts concrete Allerhande recipe pages", () => {
    assert.equal(
      __dev.isAhAllerhandeRecipeUrl("https://www.ah.nl/allerhande/recept/R-R1202458/pastasalade-met-tonijn-bonen-en-ei-advertorial"),
      true
    );
    assert.equal(
      __dev.urlLooksLikeRecipe("https://www.ah.nl/allerhande/recept/R-R1202458/pastasalade-met-tonijn-bonen-en-ei-advertorial"),
      true
    );
  });

  it("rejects Allerhande recipe hub pages", () => {
    assert.equal(__dev.isAhAllerhandeRecipeUrl("https://www.ah.nl/allerhande/recepten/asperges"), false);
    assert.equal(__dev.urlLooksLikeRecipe("https://www.ah.nl/allerhande/recepten/asperges"), false);
  });

  it("keeps AH SEO backfill candidates relevant to the keyword", () => {
    assert.equal(
      __dev.ahSeoBackfillResultMatchesQuery(
        "Marry Me Chicken Pasta",
        "r-r1202304/marry-me-chicken-pasta",
        "kip"
      ),
      true
    );
    assert.equal(
      __dev.ahSeoBackfillResultMatchesQuery(
        "Stroopwafelappeltaart met misokaramel",
        "r-r1202419/stroopwafelappeltaart-met-misokaramel",
        "pasta"
      ),
      false
    );
  });
});

describe("Channel recipe search blog/listicle guardrails", () => {
  it("rejects recipe collection/listicle pages from channel search", () => {
    const badRows = [
      {
        title: "25x best bekeken 5 or less recepten",
        url: "https://chickslovefood.com/recept/25x-best-bekeken-5-or-less-recepten/",
      },
      {
        title: "Flammkuchen – 5 recepten",
        url: "https://uitpaulineskeuken.nl/recept/flammkuchen-5-recepten/",
      },
      {
        title: "7. Poké bowl met broccolirijst",
        url: "https://example.com/recept/5x-avondeten-recepten/#poke-bowl",
      },
      {
        title: "5x avondeten recepten",
        url: "https://example.com/recept/5x-avondeten-recepten/",
      },
      {
        title: "Onze favoriete pasta recepten",
        url: "https://example.com/recept/pasta-recepten-overzicht/",
      },
      {
        title: "Top 10 snelle gerechten",
        url: "https://example.com/recept/top-10-snelle-gerechten/",
      },
      {
        title: "Gezonde lunch ideeën",
        url: "https://example.com/recept/gezonde-lunch-ideeen/",
        description: "Ontdek alle recepten voor een makkelijke lunch.",
      },
    ];

    for (const row of badRows) {
      assert.equal(__dev.isLikelyBlogPage(row.title, row.url), true, row.title);
      assert.equal(__dev.isLikelyRecipeCollectionPage(row.title, row.url, row.description || ""), true, row.title);
      assert.equal(__dev.titleLooksLikeRecipe(row.title), false, row.title);
    }
  });

  it("keeps concrete individual recipe pages", () => {
    assert.equal(
      __dev.isLikelyBlogPage(
        "Poké bowl met broccolirijst",
        "https://chickslovefood.com/recept/poke-bowl-met-broccolirijst/"
      ),
      false
    );
    assert.equal(__dev.titleLooksLikeRecipe("Poké bowl met broccolirijst"), true);
    assert.equal(
      __dev.isLikelyRecipeCollectionPage(
        "Pasta pesto met kip",
        "https://example.com/recept/pasta-pesto-met-kip/"
      ),
      false
    );
    assert.equal(
      __dev.isLikelyRecipeCollectionPage(
        "Traybake met groenten uit de oven",
        "https://example.com/recept/traybake-met-groenten-uit-de-oven/"
      ),
      false
    );
  });
});
