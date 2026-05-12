/**
 * Unit tests voor AH ingrediënt ↔ producttitel matching (geen server, geen netwerk).
 */
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  ingredientTermMatchesProductTitle,
  ingredientMatchesAnyProductTerm,
  buildIngredientMatchTerms,
  tokenizeForMatch,
} = require("../lib/ah-ingredient-match.js");

describe("ingredientTermMatchesProductTitle", () => {
  it("citroen matcht niet citroengras (één woord)", () => {
    assert.equal(ingredientTermMatchesProductTitle("citroen", "AH Citroengras"), false);
    assert.equal(ingredientTermMatchesProductTitle("citroen", "Citroengras stengels"), false);
  });

  it("citroen matcht wel los woord; niet binnen citroenen", () => {
    assert.equal(ingredientTermMatchesProductTitle("citroen", "Losse citroen"), true);
    assert.equal(ingredientTermMatchesProductTitle("citroen", "AH Citroenen"), false);
  });

  it("knoflook matcht niet als onderdeel van knoflookboter", () => {
    assert.equal(ingredientTermMatchesProductTitle("knoflook", "AH Knoflookboter"), false);
  });

  it("knoflook matcht wel als heel woord", () => {
    assert.equal(ingredientTermMatchesProductTitle("knoflook", "AH Biologisch knoflook"), true);
  });

  it("ui: uien wel, uitjes/lente-ui/sjalot/processed niet", () => {
    assert.equal(ingredientTermMatchesProductTitle("ui", "AH Uien"), true);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Rode uien"), true);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Amsterdamse uitjes"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "verse lente-ui"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Bosui"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Sjalotten"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Gebakken uien"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Crispy uien"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Uien soep"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Uiensoep"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Uienringen"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Uien poeder"), false);
    assert.equal(ingredientTermMatchesProductTitle("rode ui", "AH Rode ui framboos dip kleintjes"), false);
    assert.equal(ingredientTermMatchesProductTitle("rode ui", "Verkade Ovengebakken shuttles kaas & ui"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Knorr Cup-a-soup Franse ui"), false);
    assert.equal(ingredientTermMatchesProductTitle("ui", "Knorr Franse uiensoep"), false);
  });

  it("tomaat/paprika/komkommer: vermijd obvious processed", () => {
    assert.equal(ingredientTermMatchesProductTitle("tomaat", "Tomaten puree"), false);
    assert.equal(ingredientTermMatchesProductTitle("tomaat", "Tomatensaus"), false); // compound
    assert.equal(ingredientTermMatchesProductTitle("tomaten", "Verse tomaten"), true);
    assert.equal(ingredientTermMatchesProductTitle("paprika", "Paprikapoeder"), false);
    assert.equal(ingredientTermMatchesProductTitle("paprika", "Paprika chips"), false);
    assert.equal(ingredientTermMatchesProductTitle("paprika", "Rode paprika"), true);
    assert.equal(ingredientTermMatchesProductTitle("komkommer", "Zoetzure komkommer"), false);
    assert.equal(ingredientTermMatchesProductTitle("komkommer", "Komkommer"), true);
  });

  it("citroen: geen sap/limonade", () => {
    assert.equal(ingredientTermMatchesProductTitle("citroen", "Citroensap"), false); // compound
    assert.equal(ingredientTermMatchesProductTitle("citroen", "Citroen sap"), false);
    assert.equal(ingredientTermMatchesProductTitle("citroen", "Limonade citroen"), false);
    assert.equal(ingredientTermMatchesProductTitle("citroen", "AH Dextrose tabletten citroen smaak"), false);
    assert.equal(ingredientTermMatchesProductTitle("citroen", "Citroen"), true);
  });

  it("gember/citroengras: geen (bruis)water/drank blends", () => {
    assert.equal(ingredientTermMatchesProductTitle("verse gember", "AH Ginger strawberry verse gember appel"), false);
    assert.equal(ingredientTermMatchesProductTitle("citroengras", "AH Bruiswater gember citroengras"), false);
    assert.equal(ingredientTermMatchesProductTitle("citroengras", "AH Groene thee citroengras"), false);
    assert.equal(ingredientTermMatchesProductTitle("verse gember", "AH Ginger passion gember passievrucht"), false);
  });

  it("meest voorkomende pantry/dairy guardrails (melk/room/boter/margarine/zout/peper/olie)", () => {
    assert.equal(ingredientTermMatchesProductTitle("melk", "Kokos melk"), false);
    assert.equal(ingredientTermMatchesProductTitle("melk", "Koffiemelk cups"), false);
    assert.equal(ingredientTermMatchesProductTitle("melk", "Halfvolle melk"), true);
    assert.equal(ingredientTermMatchesProductTitle("room", "Roomkaas naturel"), false);
    // "room" is strict whole-word; kookroom wordt via matchTerms afgevangen.
    assert.equal(ingredientTermMatchesProductTitle("room", "Kookroom"), false);
    const roomTerms = buildIngredientMatchTerms("room", "room");
    assert.equal(ingredientMatchesAnyProductTerm(roomTerms, "Kookroom"), true);
    assert.equal(ingredientTermMatchesProductTitle("boter", "Knoflookboter"), false);
    assert.equal(ingredientTermMatchesProductTitle("margarine", "AH Scharreleieren"), false);
    assert.equal(ingredientTermMatchesProductTitle("zout", "Zoutjes mix"), false);
    assert.equal(ingredientTermMatchesProductTitle("peper", "Pepernoten"), false);
    assert.equal(ingredientTermMatchesProductTitle("olie", "Olijven groen"), false);
  });

  it("meest voorkomende staples (kaas/kip/gehakt/rijst/bloem/suiker) guardrails", () => {
    assert.equal(ingredientTermMatchesProductTitle("rijst", "Rijstwafels naturel"), false);
    assert.equal(ingredientTermMatchesProductTitle("rijst", "Basmatirijst"), false); // compound; via matchTerms
    const riceTerms = buildIngredientMatchTerms("rijst", "rijst");
    assert.equal(ingredientMatchesAnyProductTerm(riceTerms, "Basmatirijst"), true);

    assert.equal(ingredientTermMatchesProductTitle("bloem", "Bos bloemen"), false);
    assert.equal(ingredientTermMatchesProductTitle("bloem", "Tarwebloem"), false); // compound; via matchTerms

    assert.equal(ingredientTermMatchesProductTitle("suiker", "Zoetstof tabletten"), false);
    assert.equal(ingredientTermMatchesProductTitle("suiker", "Suiker"), true);

    assert.equal(ingredientTermMatchesProductTitle("kip", "Kippenbouillon"), false);
    assert.equal(ingredientTermMatchesProductTitle("kip", "Kipfilet"), false); // compound; via matchTerms
    assert.equal(ingredientTermMatchesProductTitle("kip bouillon", "H. Nandan Roti kip masala"), false);
    assert.equal(ingredientTermMatchesProductTitle("kip bouillon", "Kippenbouillon blokjes"), true);

    assert.equal(ingredientTermMatchesProductTitle("gehakt", "Gehakt kruidenmix"), false);
    assert.equal(ingredientTermMatchesProductTitle("gehakt", "Rundergehakt"), false); // compound; via matchTerms

    assert.equal(ingredientTermMatchesProductTitle("kaas", "Kaassaus"), false);
    assert.equal(ingredientTermMatchesProductTitle("kaas", "Jonge kaas"), true);
  });

  it("verse gember: beide woorden als heel woord", () => {
    assert.equal(ingredientTermMatchesProductTitle("verse gember", "AH Verse gember"), true);
    assert.equal(ingredientTermMatchesProductTitle("verse gember", "Gemberbier"), false);
    assert.equal(
      ingredientTermMatchesProductTitle("verse gember", "AH 50% Groentesap wortel sinaas gember"),
      false
    );
    assert.equal(ingredientTermMatchesProductTitle("gember", "AH Groentesap wortel gember"), false);
  });
});

describe("buildIngredientMatchTerms + ingredientMatchesAnyProductTerm", () => {
  it("citroen: terms dekken citroenen in titel", () => {
    const terms = buildIngredientMatchTerms("citroen", "citroen");
    assert.ok(terms.includes("citroen"));
    assert.ok(terms.includes("citroenen"));
    assert.equal(ingredientMatchesAnyProductTerm(terms, "AH Citroenen"), true);
    assert.equal(ingredientMatchesAnyProductTerm(terms, "Citroengras"), false);
  });

  it("citroengras: lemongrass/sereh", () => {
    const terms = buildIngredientMatchTerms("citroengras", "citroengras");
    assert.ok(terms.includes("lemongrass"));
    assert.ok(terms.includes("sereh"));
    assert.equal(ingredientMatchesAnyProductTerm(terms, "Lemongrass vers"), true);
    assert.equal(ingredientMatchesAnyProductTerm(terms, "AH Citroen"), false);
  });

  it("ui: uien-term matcht AH-titel", () => {
    const terms = buildIngredientMatchTerms("ui", "ui");
    assert.ok(terms.includes("uien"));
    assert.equal(ingredientMatchesAnyProductTerm(terms, "AH Biologische uien"), true);
  });

  it("ei: eieren-term voor verpakking", () => {
    const terms = buildIngredientMatchTerms("2 eieren", "ei");
    assert.ok(terms.includes("eieren"));
    assert.equal(ingredientMatchesAnyProductTerm(terms, "Scharrel eieren M"), true);
  });

  it("citroengras in raw voorkomt citroen/citroenen lemma's", () => {
    const terms = buildIngredientMatchTerms("vers citroengras", "citroengras");
    assert.ok(terms.includes("citroengras"));
    assert.ok(!terms.some((t) => t === "citroen" || t === "citroenen"));
  });
});

describe("tokenizeForMatch", () => {
  it("stript stopwoorden en leestekens", () => {
    const t = tokenizeForMatch("verse rode paprika, naar smaak");
    assert.ok(t.includes("rode"));
    assert.ok(t.includes("paprika"));
    assert.equal(t.includes("smaak"), false);
    assert.equal(t.includes("vers"), false);
  });
});
