/**
 * AH producttitel ↔ ingrediënt matching (pure functies, geen I/O).
 * Gedeeld door server.js en unit tests.
 *
 * Nieuwe guardrails: voeg een regel toe in `tests/ah-ingredient-golden.json` (en zo nodig hieronder),
 * zodat regressies in CI zichtbaar blijven.
 */

function sanitizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Per producttitel: alle woorden uit `term` moeten matchen (multi-word = elk apart whole-word).
 *
 * **Volgorde (belangrijk voor onderhoud)** — per woord `part`:
 * 1. `looksProcessed` (soep/snack/chips/…) → voor sommige ingrediënten harde `return false`.
 * 2. Ingrediënt-specifieke negatieve filters (`ui`, `gember`, `citroen`, `kip`+`bouillon`, …).
 * 3. Slot: strikt `\\bpart\\b` op de titel.
 *
 * Voorkomt o.a. "ui"→"uitjes"/"uien" (prefix), "citroen"→"citroengras", "ei"→"geleiding".
 * Zie ook `tests/ah-ingredient-golden.json`.
 */
function ingredientTermMatchesProductTitle(term, productTitle) {
  const title = String(productTitle || "");
  const titleLow = title.toLowerCase();
  const cleaned = String(term || "")
    .toLowerCase()
    .replace(/^\d[\d\s/,.-]*/, "")
    .trim();
  if (!cleaned || cleaned.length < 2) return true;
  const parts = cleaned.split(/\s+/).filter((p) => p.length >= 1);
  if (!parts.length) return true;
  const wantsBouillon = parts.includes("bouillon");

  // ── Global blockers (not dependent on `part`) ────────────────────────────
  // Non-food products (personal care / cleaning / household): never a food ingredient.
  // Checked once per call before the per-part loop.

  // Sets and flags that don't depend on `part` — defined here for efficiency.
  const VERS_BASIS = new Set([
    "ei","eieren","melk","boter","room","slagroom","bloem","suiker","meel",
    "zout","azijn","olie","rijst","gist","zetmeel","maizena","honing","mosterd",
    "knoflook","ui","uien","wortel","wortelen","tomaat","tomaten",
    "paprika","komkommer","courgette","aubergine","spinazie","prei","selderij",
    "champignon","champignons","paddenstoel","paddenstoelen",
    "kip","vlees","gehakt","spek","ham","kaas","kwark","yoghurt",
    "peper","oregano","basilicum","tijm","rozemarijn","koriander",
    "peterselie","munt","dille","bieslook","dragon",
    "citroen","citroenen","limoen","limoenen",
    "appel","appels","appelen","peer","peren",
    "banaan","bananen","aardbei","aardbeien",
    "sinaasappel","sinaasappelen","mango","ananas",
    "gember","laos","galangal","sereh","citroengras",
  ]);

  const VERS_FRUIT = new Set([
    "appel","appels","appelen","peer","peren","aardbei","aardbeien",
    "sinaasappel","sinaasappelen","banaan","bananen","mango","ananas",
    "druif","druiven","kers","kersen","perzik","pruim","pruimen",
    "abrikoos","abrikozen","meloen","watermeloen","kiwi",
    "citroen","citroenen","limoen","limoenen",
  ]);

  const ingredientWantsDrink = /\b(sap|juice|limonade|drank|nectar|smoothie)\b/.test(cleaned);
  const ingredientWantsJam   = /\b(jam|confituur|gelei|marmelade)\b/.test(cleaned);

  const looksLikeSupplement =
    /\b(tablet(?:ten)?|capsule?s?|supplement(?:en)?|multivitamine|probiot(?:isch|ica)|omega[\s-]?3|visolie|echinacea|ginseng)\b/i.test(title) ||
    (/\bvitamine\b/i.test(title) && /\b[A-D]\d?\b/.test(title));

  const looksLikeSnoep =
    /\b(snoep(?:je|jes)?|bonbon|lollipop|kauwgom|drop\b|gummi(?:beer)?|gummies|candy)\b/i.test(title) ||
    /\b(haribo|mentos|skittles|chupa[\s-]?chups)\b/i.test(title);
  const looksLikeCandyBrand =
    /\b(kinder|ferrero|milka|toblerone|raffaello|rocher)\b/i.test(title) &&
    /\b(chocolade|chocola|snoep|reep|ei|surprise|maxi|bueno|schoko)\b/i.test(title);

  const looksLikeFruitDrink =
    /\b(sap|sapje|limonade|nectar|juice|smoothie|drank|frisdrank|siroop)\b/i.test(title);
  const looksLikeFruitJam =
    /\b(jam|confituur|gelei|marmelade|stroop)\b/i.test(title);

  try {
    // Non-food producten (verzorging/schoonmaak/huishoud): nooit een voedingsingrediënt.
    if (/\b(shampoo|conditioner|tandpasta|tandenborstel|wasmiddel|wasverzachter|afwasmiddel|schoonmaakmiddel|schoonmaakdoekjes?|deodorant|bodylotion|bodywash|zonnebrand(?:cr[eè]me?)?|luier(?:broekjes?)?|toiletpapier|tissues?|maandverband|tampon|scheergel|scheercr[eè]me?|aftershave)\b/i.test(title)) return false;

    for (const part of parts) {
      if (part.length < 2) continue;
      // Common produce/pantry guardrails. These are intentionally conservative:
      // keep fresh core items, avoid obvious processed/derived products.
      const looksProcessed =
        /\b(soep|saus|dressing|marinade|pasta|puree|passata|ketchup|dip|spread|chips|snack|toast|toastjes|crackers?|koek|koekjes|biscuit|shuttles?)\b/i.test(
          title
        );

        // Global baby food blocker: knijpfruit/babyvoeding ≠ basisingrediënt.
      // Detecteer ook: leeftijdsindicatoren zoals "6m+", "8m06", "4m", "12m+" die op
      // baby-/peuterverpakkingen staan. Lookahead (?=[+\d\s]|$) voorkomt false positives
      // op "ml" of "mg".
      if (/\b(knijpfruit|knijpzakje|babyvoeding|babyhapje|baby\s*maaltijd|fruitmoes|fruitpap|groentehapje|fruitpuree\s+baby|peuterkoek|peuterreep|knabbels\b)\b/i.test(title)) return false;
      if (/\b\d+\s*m(?=[+\d\s]|$)/i.test(title)) return false;

      // Global supplement blocker: supplement/vitamin products ≠ fresh ingredients.
      if (looksLikeSupplement && VERS_BASIS.has(part)) return false;

      // Global candy/sweets blocker: snoep/candy ≠ basic pantry/fresh ingredients.
      if ((looksLikeSnoep || looksLikeCandyBrand) && VERS_BASIS.has(part)) return false;

      // Fresh fruit ≠ juices/drinks/limonade (unless the ingredient itself asks for drink).
      if (VERS_FRUIT.has(part) && looksLikeFruitDrink && !ingredientWantsDrink) return false;

      // Fresh fruit ≠ jam/confituur (unless the ingredient itself asks for jam).
      if (VERS_FRUIT.has(part) && looksLikeFruitJam && !ingredientWantsJam) return false;

      if (part === "knoflook") {
        // Knoflook (bol/net/teen): alleen puur knoflook-product, niet als smaakmaker.
        // Check zowel losse woorden (\bsaus\b) als samenstellingen (knoflooksaus).
        const KNOFLOOK_BLOCKER =
          /\b(roomkaas|kaas|saus|dressing|mayo|mayonaise|aioli|boter|kruidenboter|olie|azijn|vinaigrette|marinade|mix|kruidenmix|kruiden|pasta|puree|poeder|granulaat|gemalen|crouton|croutons|chips|dip|spread|hummus|tapenades?|pers|press|snijder|rasp)\b/i;
        if (KNOFLOOK_BLOCKER.test(title)) return false;
        // Composita: "knoflooksaus", "knoflookboter", "knoflookmayo", "knoflookolie", etc.
        if (/knoflook(saus|boter|mayo|mayonaise|olie|azijn|roomkaas|kaas|pasta|puree|poeder|croutons?|chips|dip|spread|pers|press|snijder|rasp|kruidenmix|mix)/i.test(title)) return false;
        // Knoflook als bijsmaak in aardappel-/vleesproducten (composita + los).
        if (/\b(aardappel(partjes)?|aardappelpartjes|wok|smaakmaker|woksmaakmaker|gehaktbal|balletjes?)\b/i.test(title)) return false;
        if (/knoflook.*\baardappel/i.test(title) || /\baardappel.*knoflook/i.test(title)) return false;
        continue; // sla standaard \b-check over — "knoflook" als los woord is al gecontroleerd
      }
      if (part === "ui" || part === "uien") {
        // Ui (bol): match "uien"/"rode ui"/losse "ui", maar voorkom veelvoorkomende verkeerde hits
        // (lente-ui/bosui/sjalot/uitjes/soep/gebakken/crispy/poeder/...).
        const looksLikeOnionWord =
          /\buien\b|\b(rode|gele|witte|zilver)\s+ui(en)?\b|(?<![a-zà-ÿ-])ui\b/i.test(title);
        if (!looksLikeOnionWord) {
          return false;
        }
        // Andere ui-achtigen / ingelegd.
        if (/\b(lente-?ui|bosui|sjalot(?:ten)?|uitjes|zilveruitjes?)\b/i.test(title)) return false;
        // Verwerkte uien die AH vaak teruggeeft op "ui"/"uien".
        if (/\b(uiensoep|uienringen?)\b/i.test(title)) return false;
        if (/\buien\s*(?:soep|ringen?|snippers?|poeder|granulaat|pasta)\b/i.test(title)) return false;
        if (/\b(gebakken|crispy|gefruite?)\s+uien?\b/i.test(title)) return false;
        if (/\b(chutney|saus|dressing|mix|kruiden|dip|spread)\b/i.test(title) && /\bui(en)?\b/i.test(title)) return false;
        // Snacks met "ui"-smaak (bv. kaas & ui) mogen nooit als "ui" matchen.
        if (looksProcessed) return false;
        if (/\b(verkade|ovengebakken)\b/i.test(title)) return false;
        // Poeder-/cupsoep (bv. Knorr Cup-a-soup "Franse ui") is geen verse ui.
        if (/\bcup\s*[-]?\s*a\s*[-]?\s*soup\b/i.test(title)) return false;
        if (/\b(knorr|unox|maggi)\b/i.test(title) && /\b(soep|soup|cup|poeder|instant)\b/i.test(title)) return false;
        if (/\bfranse\s+ui\b/i.test(title) && /\b(knorr|unox|maggi|cup|soep|soup|poeder|instant)\b/i.test(title)) return false;
        // Kant-en-klaar aardappel/groente (Knorr Good potatoes …) met spek & ui ≠ verse ui.
        if (/\b(knorr|unox|maggi)\b/i.test(title) && /\b(good\s+potatoes|potatoes|potato|aardappel|gratin|gratinée|gratinee)\b/i.test(title)) {
          return false;
        }
        if (/\bgood\s+potatoes\b/i.test(title)) return false;
        if (/\b(bacon|spek|ham)\s*(?:&|en)\s*ui\b/i.test(title)) return false;
        if (/\bui\s*(?:&|en)\s*(bacon|spek|ham)\b/i.test(title)) return false;
        continue;
      }
      if (part === "gember" || part === "ginger") {
        // Gember (vers) ≠ drank/shot/water/fruitmix/supplement/sappen (ook samengestelde woorden als groentesap).
        if (
          /\b(shot|sap|sapje|smoothie|juice|drank|bruiswater|water|limonade|tabletten|capsule|supplement|vitamine|groentesap(pen)?|vruchtensap(pen)?|gembersap|nectar|multivrucht|blend)\b/i.test(
            title
          ) ||
          /\bgroente\s*sap\b/i.test(title) ||
          /\bvruchten\s*sap\b/i.test(title) ||
          /\b\d+\s*%\s*groentesap\b/i.test(titleLow)
        ) {
          return false;
        }
        const hasRootCue = /\b(knol|stuk|wortel|root|staak)\b/i.test(titleLow);
        const fruitCue =
          /\b(aardbei|strawberry|framboos|raspberry|appel|apple|mango|ananas|pineapple|sinaasappel|orange|passion|passievrucht|passionfruit)\b/i.test(
            titleLow
          );
        if (fruitCue && !hasRootCue) return false;
      }
      if (part === "citroen") {
        // Citroen (vrucht) ≠ sap/limonade/concentraat/aroma; die moeten expliciet gevraagd worden.
        if (/\b(citroengras|lemongrass|sereh)\b/i.test(title)) return false;
        if (/\b(sap|sapje|limonade|concentraat|aroma|cordial|siroop|syrop|drank|thee|tea)\b/i.test(title)) return false;
        if (/\b(dextrose|tabletten|tablet|capsule|supplement|vitamine)\b/i.test(title)) return false;
        if (/\b(smaak|flavour)\b/i.test(title)) return false;
      }
      if (part === "citroengras" || part === "lemongrass" || part === "sereh") {
        // Citroengras ≠ drank/water/shot; die moeten expliciet gevraagd worden.
        if (/\b(bruiswater|water|drank|sap|sapje|shot|smoothie|juice|thee|tea)\b/i.test(title)) return false;
      }
      if (part === "tomaat" || part === "tomaten") {
        // "tomatenpuree" als 2 woorden zou anders matchen.
        if (/\b(tomaten?\s*(?:puree|pasta|saus|passata|ketchup|sap))\b/i.test(title)) return false;
        if (looksProcessed) return false;
      }
      if (part === "paprika") {
        if (/\bpaprika\s*poeder\b/i.test(title) || /\bpaprikapoeder\b/i.test(title)) return false;
        if (looksProcessed) return false;
      }
      // Losse gedroogde kruiden (tl/el): niet matchen op tomatenblokjes, sauzen met "& basilicum & oregano", of generieke pasta.
      if (part === "oregano" || part === "basilicum") {
        if (/\b(heinz|unox)\b/i.test(title) && /\b(oregano|basilicum)\b/i.test(title)) return false;
        if (/\b(basilicum|oregano)\s*(?:&|en)\s*(oregano|basilicum)\b/i.test(title)) return false;
        if (/\bblokjes?\b.*\b(oregano|basilicum)\b/i.test(title)) return false;
        if (/\b(tomat(?:en|e)|passata|pizzasaus|soep)\b.*\b(oregano|basilicum)\b/i.test(title)) return false;
        const spiceJarCue = /\b(gedroogd|droog|kruiden|strooi|strooier|zakje|potje|pot|mix|thee)\b/i.test(
          title
        );
        if (
          /\b(pasta|spaghetti|penne|macaroni|fusilli|tagliatelle|ravioli|tortellini|italiaanse\s+pasta|pasta\s+italiaanse)\b/i.test(
            title
          ) &&
          !spiceJarCue
        ) {
          return false;
        }
      }
      if (part === "lasagne" || part === "lasagna") {
        if (
          /\b(italiaanse\s+pasta|pasta\s+italiaanse|macaroni|spaghetti|penne|fusilli|tagliatelle|vermicelli|noedels?)\b/i.test(
            title
          ) &&
          !/\b(lasagne|lasagna|blad|bladen|vell|vellen|sheet|oven|diepvries)\b/i.test(title)
        ) {
          return false;
        }
      }
      if (part === "komkommer") {
        if (/\b(augurk|zoetzuur|zoetzure|zuur)\b/i.test(title)) return false;
        if (looksProcessed) return false;
      }
      if (part === "aubergine" || part === "courgette") {
        if (looksProcessed) return false;
      }
      if (part === "melk") {
        // Melk ≠ kokos-/plantaardige melk, koffiemelk, gecondenseerd, drankjes.
        if (/\b(kokos|kokosmelk|coconut)\b/i.test(title)) return false;
        if (/\b(amandel|haver|soja|rijst)\s*(?:drank|melk)\b/i.test(title)) return false;
        if (/\bkoffiemelk\b/i.test(title)) return false;
        if (/\b(gecondenseerd(?:e)?|condensed|kookmelk)\b/i.test(title)) return false;
        if (/\b(drank|latte|koffie|coffee|thee|tea)\b/i.test(title) && /\bmelk\b/i.test(title)) return false;
      }
      if (part === "room") {
        // Room ≠ roomkaas / roomijs / chocoladeroom.
        if (/\broomkaas\b/i.test(title)) return false;
        if (/\broomijs\b/i.test(title)) return false;
        if (/\bchocoladeroom\b/i.test(title)) return false;
      }
      if (part === "boter") {
        // Boter ≠ kruidenboter/knoflookboter (tenzij expliciet gevraagd; dat gebeurt via term zelf).
        if (/\b(kruidenboter|knoflookboter)\b/i.test(title)) return false;
      }
      if (part === "margarine") {
        // Margarine ≠ eieren (veelvoudige false positives door andere tokens).
        if (/\b(ei|eieren|scharreleieren)\b/i.test(title)) return false;
      }
      if (part === "zout") {
        // Zout ≠ zoutjes/snacks.
        if (/\b(zoutjes|chips|sticks)\b/i.test(title)) return false;
      }
      if (part === "peper") {
        // Peper ≠ pepernoten/pepermunt/peperoni.
        if (/\b(pepernoot|pepernoten|pepermunt|peperoni)\b/i.test(title)) return false;
      }
      if (part === "olie") {
        // Olie ≠ olijven.
        if (/\bolijven\b/i.test(title)) return false;
      }
      if (part === "rijst") {
        // Rijst (los) ≠ rijstwafels/rijstpapier/noedels tenzij expliciet.
        if (/\b(rijstwafel|rijstwafels|rijstkoek|rijstkoeken|rijstpapier|rijstnoedel|rijstnoedels|mihoen)\b/i.test(title)) return false;
      }
      if (part === "bloem") {
        // Bloem (bakkers) ≠ bloemen/boeketten.
        if (/\bbloemen\b|\bboeket\b/i.test(title)) return false;
      }
      if (part === "suiker") {
        // Suiker ≠ zoetstof/suikervrij/snoep.
        if (/\b(zoetstof|sweetener|suikervrij|sugarfree)\b/i.test(title)) return false;
        if (/\b(snoep|chocolade|reep|koek|koeken)\b/i.test(title) && /\bsuiker\b/i.test(title)) return false;
      }
      if (part === "kip") {
        // Kip (vlees) ≠ bouillon/soep/kruiden/mix.
        // Special-case: "kip bouillon" should match compounds like "kippenbouillon".
        if (wantsBouillon) {
          if (/\bkip(pen)?bouillon\b/i.test(titleLow) || /\bkip\s+bouillon\b/i.test(titleLow)) {
            // ok: let bouillon part validate the rest; skip strict whole-word check below
            continue;
          } else if (!/\bkip(pen)?\b/i.test(titleLow)) {
            return false;
          }
        } else if (/\b(kippen?bouillon|bouillon)\b/i.test(title) && /\bkip(pen)?\b/i.test(title)) {
          return false;
        }
        if (/\b(kippensoep|soep)\b/i.test(title) && /\bkip(pen)?\b/i.test(title)) return false;
        if (/\b(kruidenmix|mix|kruiden|seasoning)\b/i.test(title) && /\bkip(pen)?\b/i.test(title)) return false;
      }
      if (part === "bouillon") {
        // Bouillon (blokjes/pot) ≠ masala/roti/curry sauzen.
        // Allow compounds like "kippenbouillon".
        if (!/bouillon/i.test(title)) return false;
        if (/\b(masala|roti|curry|kruidenmix|mix|saus|smaakmaker)\b/i.test(title)) return false;
        // Skip the strict whole-word check below; compound hits are ok.
        continue;
      }
      if (part === "gehakt") {
        // Gehakt ≠ kruidenmix/mix.
        if (/\b(kruidenmix|mix|kruiden)\b/i.test(title) && /\bgehakt\b/i.test(title)) return false;
      }
      if (part === "kaas") {
        // Kaas ≠ kaassaus/dip/spread tenzij gevraagd.
        if (/\b(kaassaus|saus)\b/i.test(title) && /\bkaas\b/i.test(title)) return false;
        if (/\b(dip|spread)\b/i.test(title) && /\bkaas\b/i.test(title)) return false;
        if (/\b(fondue|gourmet|nachos?)\b/i.test(title) && /\bkaas\b/i.test(title)) return false;
        if (/\b(kaas-?blokjes|kaas-?stengels|kaas-?koekjes)\b/i.test(title)) return false;
        // Kaas als smaakmaker in crackers/snacks/broodstengels ≠ stuk kaas.
        if (/\b(grissini|broodstengels?|crackers?|toastjes?|koekjes?|chips|snack|minikoek|mini\s*koek)\b/i.test(title)) return false;
      }
      if (part === "wortel" || part === "wortelen") {
        // Wortel (groente) ≠ sap/soep/cake/koekjes; babyworteltjes alleen bij expliciete vraag.
        if (/\b(wortelsap|wortelsoep|wortelcake|wortelkoekjes|babyworteltjes)\b/i.test(title)) return false;
        if (/\bwortel\s*(?:sap|soep|cake|koekjes)\b/i.test(title)) return false;
        // Samenstellingen met "wortel" als kern zijn ok (wortelen, wortels, winterwortels, etc.).
        if (/wortel(?:en|s|tjes|s)?\b/i.test(title)) continue;
      }
      if (part === "sjalot" || part === "sjalotten") {
        // Sjalot ≠ saus/dressing.
        if (/\b(sjalottensaus|sjalottendressing)\b/i.test(title)) return false;
        if (/\bsjalotten?\s*(?:saus|dressing)\b/i.test(title)) return false;
      }
      if (part === "lente-ui" || part === "lente-uien" || part === "bosui") {
        // Lente-ui ≠ poeder/smaak.
        if (/\b(lente-?ui\s*(?:poeder|smaak|snippers?|granulaat))\b/i.test(title)) return false;
        if (/\blente-?uipoeder\b/i.test(title)) return false;
      }
      if (part === "aardappel" || part === "aardappelen" || part === "aardappels") {
        // Aardappel ≠ chips/soep(blik)/instant puree/zetmeel.
        if (/\baardappelchips\b/i.test(title)) return false;
        if (/\baardappelsoep\b/i.test(title)) return false;
        if (/\baardappel\s*(?:chips|zetmeel)\b/i.test(title)) return false;
        if (/\b(zetmeel)\b/i.test(title) && /\baardappel\b/i.test(title)) return false;
        // Instant aardappelpuree (herkenbaar aan merknaam of "instant").
        if (/\binstant\b/i.test(title) && /\b(puree|aardappel)\b/i.test(title)) return false;
        if (/\baardappelpuree\b/i.test(title) && /\b(instant|knorr|maggi|unox|dr\.?\s*oetker)\b/i.test(title)) return false;
        // Soep in blik/pak van merk.
        if (/\b(knorr|unox|maggi|campbells?)\b/i.test(title) && /\b(soep|soup)\b/i.test(title)) return false;
      }
      if (part === "champignon" || part === "champignons" || part === "paddenstoel" || part === "paddenstoelen") {
        // Champignon ≠ saus/soep (blik).
        if (/\b(champignonsaus|champignonsoep)\b/i.test(title)) return false;
        if (/\bchampignon\s*(?:saus|soep)\b/i.test(title)) return false;
        if (/\bpaddenstoel(?:en)?\s*(?:mix\s*)?saus\b/i.test(title)) return false;
        if (/\b(saus)\b/i.test(title) && /\b(champignon|paddenstoel)\b/i.test(title)) return false;
        if (/\b(knorr|unox|maggi|campbells?)\b/i.test(title) && /\b(soep|soup)\b/i.test(title)) return false;
      }
      if (part === "prei") {
        // Prei ≠ soep/poeder/vlaaiemes.
        if (/\bpreisoep\b/i.test(title)) return false;
        if (/\bprei\s*(?:soep|poeder|vlaaimes)\b/i.test(title)) return false;
        if (/\b(knorr|unox|maggi)\b/i.test(title) && /\b(soep|soup)\b/i.test(title)) return false;
      }
      if (part === "selderij") {
        // Selderij ≠ zout/poeder/sap.
        if (/\bselderij(?:zout|poeder|sap)\b/i.test(title)) return false;
        if (/\bselderij\s*(?:zout|poeder|sap)\b/i.test(title)) return false;
        // Samenstellingen met "selderij" als kern zijn ok (bleekselderij, knolselderij).
        if (/(?:bleek|knol)selderij\b/i.test(title)) continue;
      }
      if (part === "spek" || part === "bacon") {
        // Spek ≠ saus/poeder; verse/gerookte spek mag wel matchen.
        if (/\bspeksaus\b/i.test(title)) return false;
        if (/\bspekpoeder\b/i.test(title)) return false;
        if (/\bspek\s*(?:saus|poeder|mix)\b/i.test(title)) return false;
        // Samenstellingen met "spek" als kern zijn ok (ontbijtspek, rookspek, speklapjes, bacon).
        if (/(?:ontbijt|rook|mager|buik|streep)spek\b/i.test(title) || /\bspek(?:lapjes?|blokjes?|schijfjes?)?\b/i.test(title) || /\bbacon\b/i.test(title)) {
          continue;
        }
      }
      if (part === "ham") {
        // Ham ≠ saus/spread; hamlapjes/plakken zijn ok.
        if (/\bhamsaus\b/i.test(title)) return false;
        if (/\bhamspread\b/i.test(title)) return false;
        if (/\bham\s*(?:saus|spread|mix)\b/i.test(title)) return false;
        if (/\bham\s*(?:saus|dip)\b/i.test(title)) return false;
      }
      if (part === "honing") {
        // Honing ≠ drank/thee/mosterd-dressing/snoep (tenzij expliciet gevraagd).
        if (/\b(honingdrank|honingthee|honingsnoep)\b/i.test(title)) return false;
        if (/\bhoning\s*(?:drank|thee|snoep|drop|bonbon)\b/i.test(title)) return false;
        if (/\b(citroen|lemon)\s*(thee|tea)\b/i.test(title) && /\bhoning\b/i.test(title)) return false;
        if (/\b(thee|tea)\b/i.test(title) && /\bhoning\b/i.test(title)) return false;
        if (/\b(mosterd|mustard)\b/i.test(title) && /\b(dressing|saus|marinade)\b/i.test(title) && /\bhoning\b/i.test(title)) return false;
      }
      if (part === "mosterd") {
        // Mosterd ≠ honing-mosterddressing/mosterdsaus (als alleen "mosterd" gevraagd).
        if (/\bmosterd-?honing\b/i.test(title) && /\b(dressing|saus|marinade)\b/i.test(title)) return false;
        if (/\bhoning-?mosterd\b/i.test(title) && /\b(dressing|saus|marinade)\b/i.test(title)) return false;
        if (/\b(mosterdsaus)\b/i.test(title)) return false;
      }
      if (part === "dragon") {
        // Dragon (kruid) ≠ saus/azijn.
        if (/\bdragonsaus\b/i.test(title)) return false;
        if (/\bdragonazijn\b/i.test(title)) return false;
        if (/\bdragon\s*(?:saus|azijn)\b/i.test(title)) return false;
      }
      if (part === "appel" || part === "appels" || part === "appelen") {
        // Appelmoes/appelsap/appelazijn/appeltaart ≠ losse appel.
        if (/\b(appelmoes|appelsap|appel-?azijn|appelcider|appeljenever|appel-?moes)\b/i.test(title)) return false;
        if (/\b(moes|stroop)\b/i.test(title) && /\bappel\b/i.test(title)) return false;
        if (looksProcessed) return false;
      }
      if (part === "peer" || part === "peren") {
        // Perenazijn/perenjam/perensap ≠ losse peer.
        if (/\b(peren-?azijn|perenjenever|perenjam|perensap)\b/i.test(title)) return false;
        if (/\b(azijn|jenever|sap|jam)\b/i.test(title) && /\bperen?\b/i.test(title)) return false;
        if (looksProcessed) return false;
      }
      if (part === "sinaasappel" || part === "sinaasappelen") {
        // Sinaasappelsap/limonade ≠ losse sinaasappel.
        if (/\b(sap|sapje|limonade|nectar|juice|drank|siroop)\b/i.test(title)) return false;
      }
      if (part === "banaan" || part === "bananen") {
        // Bananenchips/smaak/snoep ≠ losse banaan.
        if (/\b(bananensmaak|bananachips|bananasmaak|bananasnoep)\b/i.test(title)) return false;
        if (/\b(chips|smaak|snoep|kauwgom|sap|drank)\b/i.test(title)) return false;
      }
      if (part === "aardbei" || part === "aardbeien") {
        // Aardbeiensap/jam/limonade ≠ losse aardbei.
        if (/\b(aardbei-?sap|aardbeijam|aardbeisirop|aardbei-?limonade|aardbeismoothie)\b/i.test(title)) return false;
        if (/\b(jam|sap|limonade|drank|siroop|smaak|kauwgom)\b/i.test(title)) return false;
        if (looksProcessed) return false;
      }
      if (part === "limoen" || part === "limoenen") {
        // Limoensap/limonade ≠ losse limoen.
        if (/\b(limoensap|limoenlimonade|limoenthee|limoencordial|limoensiroop)\b/i.test(title)) return false;
        if (/\b(sap|limonade|drank|thee|tea|cordial|siroop)\b/i.test(title)) return false;
      }
      if (part === "mango") {
        // Mangosap/smoothie/smaak ≠ verse mango.
        if (/\b(mangosap|mangodrank|mangosmaak|mangosmoothie|mangolimonade)\b/i.test(title)) return false;
        if (/\b(sap|drank|limonade|nectar|juice|smaak|smoothie)\b/i.test(title)) return false;
        if (looksProcessed) return false;
      }
      if (part === "ananas") {
        // Ananassap/smaak ≠ verse ananas.
        if (/\b(ananassap|ananaslimonade|ananassmaak|ananaskauwgom)\b/i.test(title)) return false;
        if (/\b(sap|limonade|drank|nectar|juice|smaak|kauwgom)\b/i.test(title)) return false;
        if (looksProcessed) return false;
      }
      if (part === "vis") {
        // Vis ≠ visolie/visvoer (supplement/diervoeding).
        if (/\bvisolie\b/i.test(title)) return false;
        if (/\b(visvoer|visvoeding)\b/i.test(title)) return false;
        // Samenstellingen met "vis" als kern zijn ok (visfilet, vissticks, viskoek, visje etc).
        if (/\bvis(?:filet|sticks?|koek|bal|balletjes?|je|jes|schotel|salade)\b/i.test(title)) continue;
      }
      if (part === "yoghurt" || part === "yogurt") {
        // Yoghurtdressing/dip ≠ verse yoghurt; frozen yoghurt/ijs ≠ verse yoghurt.
        if (/\b(yoghurtdressing|yoghurtdip|yoghurt\s*dressing|yoghurt\s*dip)\b/i.test(title)) return false;
        if (/\b(frozen|ijs)\b/i.test(title) && /\byoghurt\b/i.test(title)) return false;
      }
      if (part === "kwark") {
        // Kwarkgebak/taart/cake kant-en-klaar ≠ verse kwark.
        if (/\b(gebak|taart|rol|cake)\b/i.test(title) && /\bkwark\b/i.test(title)) return false;
      }
      if (part === "peterselie") {
        // Peterseliesaus/boter ≠ verse peterselie.
        if (/\bpeterseliesaus\b/i.test(title)) return false;
        if (/\b(saus|boter)\b/i.test(title) && /\bpeterselie\b/i.test(title)) return false;
      }
      if (part === "koriander") {
        // Korianderpoeder/zaad ≠ verse koriander (tenzij het ingrediënt zelf poeder/zaad vraagt).
        if (/\b(korianderpoeder|korianderzaad|koriander\s*(?:poeder|zaad|gemalen))\b/i.test(title)) {
          if (!/\b(poeder|zaad|gemalen)\b/.test(cleaned)) return false;
        }
        if (/\b(saus|dressing|marinade)\b/i.test(title) && /\bkoriander\b/i.test(title)) return false;
      }
      if (part === "munt") {
        // Munt (kruid, vers) ≠ pepermunt/muntthee/muntdrop/spearmint.
        if (/\b(pepermunt|pepermuntsmaak|munt-?thee|muntdrop|spearmint)\b/i.test(title)) return false;
        if (/\b(thee|tea|snoep|drop|kauwgom)\b/i.test(title) && /\bmunt\b/i.test(title)) return false;
      }
      if (part === "ei" || part === "eieren") {
        // Ei/eieren ≠ eiersalade/eierkoek/eiercognac/chocolade-ei.
        if (/\beiersalade\b/i.test(title)) return false;
        if (/\beierkoek\b/i.test(title)) return false;
        if (/\beiercognac\b/i.test(title)) return false;
        if (/\bei\s*(?:salade|koek|cognac)\b/i.test(title)) return false;
        if (/\b(chocolade|paas)-?ei\b/i.test(title)) return false;
        // Kinderei / Kinder-merk (chocolade, surprise, maxi, bueno) ≠ vers ei.
        if (/\bkinderei\b/i.test(title)) return false;
        if (/\bkinder\b/i.test(title) && /\b(chocolade|surprise|maxi|bueno|schoko|candy|snoep|reep)\b/i.test(title)) return false;
        // Paaseitjes / plastic / decoratie.
        if (/\b(paaseitjes?|plastic|decoratie|nep|vul|vulling)\b/i.test(title)) return false;
        // Samengesteld gerecht ≠ vers ei (bijv. "spaghetti met ei", "nasi met ei").
        if (/\b(spaghetti|pasta\b|penne|lasagne|macaroni|nasi\b|bami\b|noedels|noodles|ramen\b|stamppot|frittata|omelet\b|quiche|wrap\b|curry\b|wokmaaltijd|rijstschotel)\b/i.test(title)) return false;
        // Whole-word check: "ei" must not match "geleiding", "erei" etc.
        if (part === "ei" && !/(?<![a-zà-ÿ])ei(?![a-zà-ÿ])/i.test(title)) return false;
      }
      if (part === "brood") {
        // Brood ≠ broodmix (instant)/broodkruimels/broodpudding/broodbakvet.
        if (/\bbroodkruimels\b/i.test(title)) return false;
        if (/\bbroodmix\b/i.test(title)) return false;
        if (/\bbroodpudding\b/i.test(title)) return false;
        if (/\bbroodbakvet\b/i.test(title)) return false;
        if (/\bbrood\s*(?:kruimels?|mix|pudding|bakvet)\b/i.test(title)) return false;
        // Merk + "mix" + brood is vrijwel altijd een bakproduct, geen echt brood.
        if (/\b(dr\.?\s*oetker|koopmans|honig|knorr)\b/i.test(title) && /\b(mix|kruidenmix)\b/i.test(title)) return false;
        // Samenstellingen met "brood" als kern zijn ok (desembrood, volkoren brood, witbrood, etc.).
        if (/(?:desem|wit|volkoren|rogge|spelt|meergranen|casino|tijger|koren|zuurdesem|licht|donker)brood\b/i.test(title) || /\bbrood\b/i.test(title)) continue;
      }
      const escaped = part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`\\b${escaped}\\b`, "i").test(title)) return false;
    }
    return true;
  } catch {
    return true;
  }
}

function ingredientMatchesAnyProductTerm(terms, productTitle) {
  const list = Array.isArray(terms) ? terms : [];
  if (!list.length) return true;
  for (const t of list) {
    if (!t) continue;
    if (ingredientTermMatchesProductTitle(t, productTitle)) return true;
  }
  return false;
}

function tokenizeForMatch(raw) {
  const text = sanitizeText(raw || "").toLowerCase();
  const cleaned = text
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\u00c0-\u024f]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return [];
  const stop = new Set([
    "de",
    "het",
    "een",
    "en",
    "van",
    "voor",
    "met",
    "naar",
    "smaak",
    "optioneel",
    "evt",
    "eventueel",
    "vers",
    "bio",
    "biologisch",
    "extra",
    "vierge",
    "vergine",
    "groot",
    "klein",
  ]);
  return cleaned
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !stop.has(t));
}

function buildIngredientMatchTerms(rawIngredient, normalizedBase) {
  const raw = sanitizeText(rawIngredient || "").toLowerCase();
  const base = sanitizeText(normalizedBase || "").toLowerCase();
  const terms = new Set([base].filter(Boolean));

  // Keep the raw ingredient as a fallback (helps when base is canonicalized).
  if (raw && raw.length >= 2) terms.add(raw);

  // Cheese equivalences (not only search canonical; also matching against titles).
  if (base === "parmezaanse kaas") {
    terms.add("parmezaan");
    terms.add("parmigiano");
    terms.add("parmigiano reggiano");
    terms.add("grana padano");
  }
  if (base === "grana padano") {
    terms.add("grana padano");
    terms.add("parmezaan");
    terms.add("parmigiano");
  }
  if (base === "pecorino") {
    terms.add("pecorino romano");
  }

  // Produce: bilingual catalog hits (English appears on AH labels occasionally).
  if (/\bcourgu?ettes?\b/.test(base) || /\bcourgu?ettes?\b/.test(raw)) {
    terms.add("courgette");
    terms.add("courgettes");
    terms.add("zucchini");
  }
  if (/\baubergines?\b/.test(base) || /\baubergines?\b/.test(raw)) {
    terms.add("aubergine");
    terms.add("aubergines");
    terms.add("eggplant");
  }
  if (/\bkomkommers?\b/.test(base) || /\bkomkommers?\b/.test(raw)) {
    terms.add("komkommer");
    terms.add("komkommers");
    terms.add("cucumber");
  }

  if (
    (base === "melk" || /^(?:volle|halfvolle|magere)\s+melk$/i.test(base)) &&
    !/\bkokos|kokosmelk|coconut\b/.test(raw)
  ) {
    terms.add("melk");
    terms.add("milk"); // bilingual AH titles
  }

  if (/\byoghurts?\b/.test(base) || /\byogurt\b/.test(raw)) {
    terms.add("yoghurt");
    terms.add("yogurt");
  }

  // Room: AH gebruikt vaak samenstellingen zoals "kookroom"/"slagroom".
  if (/\broom\b/.test(base) || /\broom\b/.test(raw)) {
    terms.add("room");
    terms.add("kookroom");
    terms.add("slagroom");
  }

  // Rijst: AH gebruikt vaak samenstellingen (basmatirijst, zilvervliesrijst, etc.)
  if (base === "rijst" || /\brijst\b/.test(raw) || /\b(?:basmati|jasmijn|zilvervlies|volkoren|sushi)\s*rijst\b/.test(raw)) {
    terms.add("rijst");
    terms.add("basmatirijst");
    terms.add("jasmijnrijst");
    terms.add("zilvervliesrijst");
  }

  // Bloem: vaak samenstelling (tarwebloem/patentbloem/zelfrijzend).
  if (base === "bloem" || /\bbloem\b/.test(raw)) {
    terms.add("bloem");
    terms.add("tarwebloem");
    terms.add("patentbloem");
    terms.add("zelfrijzend");
  }

  // Kip: vaak samenstelling (kipfilet/kipdijfilet).
  if (base === "kip" || /\bkip\b/.test(raw) || /\bkipfilet\b/.test(raw)) {
    terms.add("kip");
    terms.add("kipfilet");
    terms.add("kipdij");
    terms.add("kipdijfilet");
  }

  // Gehakt: samenstellingen.
  if (/\bgehakt\b/.test(base) || /\bgehakt\b/.test(raw)) {
    terms.add("gehakt");
    terms.add("rundergehakt");
    terms.add("varkensgehakt");
    terms.add("half-om-half");
  }

  if (/\bgember\b/.test(base) || /\bgember\b/.test(raw) || /\bginger\b/.test(raw)) {
    terms.add("gember");
    terms.add("ginger");
  }

  // Ui (bol): AH-titels zeggen meestal "uien"; niet verwarren met sjalot/lente-ui.
  if (
    base === "ui" ||
    base === "uien" ||
    /\b(rode|gele|witte|zilver)\s+ui(en)?\b/.test(base) ||
    /\b(rode|gele|witte|zilver)\s+ui(en)?\b/.test(raw)
  ) {
    terms.add("ui");
    terms.add("uien");
  }
  // Tomaat: meervoud komt vaker voor in titels.
  if (base === "tomaat" || base === "tomaten" || /\btomaten?\b/.test(raw)) {
    terms.add("tomaat");
    terms.add("tomaten");
  }
  // Paprika: basiswoord in titels, ook bij kleurvarianten.
  if (/\bpaprika\b/.test(base) || /\bpaprika\b/.test(raw)) {
    terms.add("paprika");
  }
  // Komkommer: meervoud.
  if (base === "komkommer" || base === "komkommers" || /\bkomkommers?\b/.test(raw)) {
    terms.add("komkommer");
    terms.add("komkommers");
  }
  // Aubergine/courgette: meervoud.
  if (base === "aubergine" || base === "aubergines" || /\baubergines?\b/.test(raw)) {
    terms.add("aubergine");
    terms.add("aubergines");
  }
  if (base === "courgette" || base === "courgettes" || /\bcourgettes?\b/.test(raw)) {
    terms.add("courgette");
    terms.add("courgettes");
  }

  // Lasagnevellen: expliciete synoniemen zodat AH-zoek en titel-match niet op generieke pasta belanden.
  if (
    /\blasagne|lasagna\b/i.test(base + raw) &&
    /\b(blad|bladen|vell|vellen|sheet|sheets)\b/i.test(base + raw)
  ) {
    terms.add("lasagne bladen");
    terms.add("lasagnebladen");
    terms.add("lasagnevellen");
    terms.add("lasagna sheets");
  }

  // Citroengras ≠ citroen; AH gebruikt ook "lemongrass" / "sereh".
  if (/\bcitroengras\b/.test(base) || /\bcitroengras\b/.test(raw) || /\blemongrass\b/i.test(raw)) {
    terms.add("citroengras");
    terms.add("lemongrass");
    terms.add("sereh");
  }

  // Hele citroen / meerdere: AH schrijft vaak "citroenen" (één woord).
  if (
    (base === "citroen" || base === "citroenen" || /\bcitroen(?:en)?\b/.test(raw)) &&
    !/\bcitroengras\b/.test(base) &&
    !/\bcitroengras\b/.test(raw)
  ) {
    terms.add("citroen");
    terms.add("citroenen");
  }

  // Ei / eieren: whole-word "ei" matcht niet op "eieren".
  if (base === "ei" || base === "eieren" || /^(?:biologisch\s+)?(?:scharrel)?eieren?$/.test(base)) {
    terms.add("ei");
    terms.add("eieren");
  }

  // Wortel: meervoud.
  if (base === "wortel" || base === "wortelen" || /\bwortel(?:en)?\b/.test(raw)) {
    terms.add("wortel");
    terms.add("wortelen");
  }

  // Sjalot: meervoud.
  if (base === "sjalot" || base === "sjalotten" || /\bsjalot(?:ten)?\b/.test(raw)) {
    terms.add("sjalot");
    terms.add("sjalotten");
  }

  // Radijs: enkelvoud/meervoud/verkleind zijn synoniemen.
  if (base === "radijs" || /\bradijsjes?\b/.test(base) || /\bradijsjes?\b/.test(raw)) {
    terms.add("radijs");
    terms.add("radijsjes");
  }

  // Basterdsuiker: ook matchen op gewone "suiker" als fallback.
  if (/\bbasterdsuiker\b/.test(base) || /\bbasterdsuiker\b/.test(raw)) {
    terms.add("basterdsuiker");
    terms.add("suiker");
  }
  // Suiker-varianten: lichtbruin/donkerbruin/basterd zijn synoniemen.
  if (base === "suiker" || /\bsuiker\b/.test(raw)) {
    terms.add("suiker");
    terms.add("basterdsuiker");
    terms.add("rietsuiker");
  }

  // Aardappel: meervoud varianten.
  if (base === "aardappel" || base === "aardappelen" || base === "aardappels" || /\baardappel(?:en|s)?\b/.test(raw)) {
    terms.add("aardappel");
    terms.add("aardappelen");
    terms.add("aardappels");
  }

  // Champignon/paddenstoel: meervoud en synoniemen.
  if (/\bchampignon(?:s)?\b/.test(base) || /\bpaddenstoel(?:en)?\b/.test(base) || /\bchampignon(?:s)?\b/.test(raw) || /\bpaddenstoel(?:en)?\b/.test(raw)) {
    terms.add("champignon");
    terms.add("champignons");
    terms.add("paddenstoel");
    terms.add("paddenstoelen");
  }

  // Prei: enkelvoud en meervoud zijn gelijk in het Nederlands.
  if (base === "prei" || /\bprei\b/.test(raw)) {
    terms.add("prei");
  }

  // Ham: varianten.
  if (base === "ham" || /\bham\b/.test(raw)) {
    terms.add("ham");
    terms.add("hamlapjes");
    terms.add("hamplakken");
  }

  return [...terms].filter(Boolean);
}

module.exports = {
  sanitizeText,
  ingredientTermMatchesProductTitle,
  ingredientMatchesAnyProductTerm,
  tokenizeForMatch,
  buildIngredientMatchTerms,
};
