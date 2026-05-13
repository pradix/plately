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
