const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { __dev } = require("../server");

describe("ingredient unit remainder repair", () => {
  it("parses longer Dutch unit forms without leaving s in the ingredient name", () => {
    const cases = [
      ["2 takjes koriander", { quantity: "2", unit: "takjes", name: "koriander" }],
      ["4 plakjes kaas", { quantity: "4", unit: "plakjes", name: "kaas" }],
      ["3 blaadjes basilicum", { quantity: "3", unit: "blaadjes", name: "basilicum" }],
      ["2 teentjes knoflook", { quantity: "2", unit: "teentjes", name: "knoflook" }],
      ["5 blokjes bouillon", { quantity: "5", unit: "blokjes", name: "bouillon" }],
      ["6 reepjes paprika", { quantity: "6", unit: "reepjes", name: "paprika" }],
      ["2 stengels bleekselderij", { quantity: "2", unit: "stengels", name: "bleekselderij" }],
    ];

    for (const [input, expected] of cases) {
      assert.deepEqual(__dev.parseIngredientLine(input), expected);
    }
  });

  it("repairs stored ingredients where an old alternation left s as name prefix", () => {
    const recipe = {
      id: "r1",
      title: "Test",
      ingredients: [
        { quantity: "4", unit: "plakje", name: "s kaas" },
        { quantity: "2", unit: "takje", name: "s koriander" },
        { quantity: "2", unit: "teen", name: "tjes knoflook" },
      ],
      instructions: ["Meng alles."],
    };

    const result = __dev.repairRecipeIngredientUnitRemainders(recipe);
    assert.equal(result.changed, true);
    assert.deepEqual(result.recipe.ingredients, [
      { quantity: "4", unit: "plakje", name: "kaas" },
      { quantity: "2", unit: "takje", name: "koriander" },
      { quantity: "2", unit: "teen", name: "knoflook" },
    ]);
  });
});
