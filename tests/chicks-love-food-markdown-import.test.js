/**
 * Unit tests: Chicks Love Food via Jina/markdown fallback (geen netwerk).
 */
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { __dev } = require("../server");

describe("Chicks Love Food markdown import", () => {
  it("behoudt de eerste checklist-ingredientregel na 'Dit heb je nodig'", () => {
    const parsed = __dev.parseMarkdownIngredientSection(`
### Dit heb je nodig
*   afvinken maar - [x]  6 vellen bladerdeeg
*   - [x]  1 zak kant-en-klaar banketbakkersroom
*   - [x]  500 ml melk
*   - [x]  1 zakje lonka fudge
*   - [x]  100 g witte chocolade

Shop ingredients at:

### En zo doe je het
*   - [x]  Verwarm de oven voor op 200 graden.
`);

    assert.deepEqual(
      parsed.map((i) => `${i.quantity} ${i.unit} ${i.name}`),
      [
        "6 x vellen bladerdeeg",
        "1 x zak kant-en-klaar banketbakkersroom",
        "500 ml melk",
        "1 zakje lonka fudge",
        "100 g witte chocolade",
      ]
    );
  });

  it("knipt CLF-footerlinks uit bereidingswijze", () => {
    const parsed = __dev.parseMarkdownInstructionSection(`
### En zo doe je het
*   - [x]  Snijd de rol croissantdeeg in 6 plakjes. Rol het deeg dus niet uit!
*   - [x]  Leg de plakjes op een met bakpapier beklede ovenplaat en bak ze in zo'n 12 minuten goudbruin.
*   - [x]  Laat de broodjes vervolgens minimaal 15 minuten afkoelen.
*   - [x]  Maak ondertussen de banketbakkersroom volgens de aanwijzingen op de verpakking.
*   - [x]  Snijd ze daarna open als een broodje. Vul ze royaal met banketbakkersroom.
*   - [x]  Verwarm het roze glazuur volgens de instructies op de verpakking en bestrijk de bovenkant van de soezen ermee.
*   - [x]  Laat het glazuur even opstijven en spuit er eventueel nog wat slagroom bij voor de finishing touch. Smullen maar!

Dit recept is geschreven op 16-02-2025

### Meer Sinner Sunday
*   [Privacy Statement](https://chickslovefood.com/privacybeleid/)
*   [Cookie Statement](https://chickslovefood.com/cookie-statement/)
*   [Cookieinstellingen](https://chickslovefood.com/recept/tompouce-soezen-met-3-ingredienten/#)
`);

    assert.equal(parsed.length, 7);
    assert.equal(parsed[0], "Snijd de rol croissantdeeg in 6 plakjes. Rol het deeg dus niet uit!");
    assert.equal(parsed.at(-1), "Laat het glazuur even opstijven en spuit er eventueel nog wat slagroom bij voor de finishing touch. Smullen maar!");
    assert.equal(parsed.some((step) => /privacy|cookie/i.test(step)), false);
  });
});
