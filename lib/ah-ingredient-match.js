/**
 * AH producttitel ↔ ingrediënt matching (pure functies, geen I/O).
 * Gedeeld door server.js en unit tests.
 */

function sanitizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * AH: ingrediënt-term moet als afzonderlijk woord/deel in de producttitel voorkomen.
 * Voorkomt o.a. "ui"→"uitjes"/"uien" (prefix), "citroen"→"citroengras", "ei"→"geleiding".
 * Meerdere woorden in één term: elk woord apart als whole-word (bijv. "verse gember").
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
  try {
    for (const part of parts) {
      if (part.length < 2) continue;
      // Common produce/pantry guardrails. These are intentionally conservative:
      // keep fresh core items, avoid obvious processed/derived products.
      const looksProcessed =
        /\b(soep|saus|dressing|marinade|pasta|puree|passata|ketchup|dip|spread|chips|snack|toast|toastjes|crackers?|koek|koekjes|biscuit|shuttles?)\b/i.test(
          title
        );
      if (part === "ui") {
        // Ui (bol): match "uien"/"rode ui"/losse "ui", maar voorkom veelvoorkomende verkeerde hits
        // (lente-ui/bosui/sjalot/uitjes/soep/gebakken/crispy/poeder/...).
        const looksLikeOnionWord =
          /\buien\b|\b(rode|gele|witte|zilver)\s+ui(en)?\b|(?<![a-zà-ÿ-])ui\b/i.test(title);
        if (!looksLikeOnionWord) {
          return false;
        }
        // Andere ui-achtigen / ingelegd.
        if (/\b(lente-?ui|bosui|sjalot(?:ten)?|uitjes|zilveruitjes?)\b/i.test(title)) return false;
        // Verwerkte uien die AH vaak teruggeeft op "ui".
        if (/\b(uiensoep|uienringen?)\b/i.test(title)) return false;
        if (/\buien\s*(?:soep|ringen?|snippers?|poeder|granulaat|pasta)\b/i.test(title)) return false;
        if (/\b(gebakken|crispy)\s+uien\b/i.test(title)) return false;
        if (/\b(chutney|saus|dressing|mix|kruiden|dip|spread)\b/i.test(title) && /\bui(en)?\b/i.test(title)) return false;
        // Snacks met "ui"-smaak (bv. kaas & ui) mogen nooit als "ui" matchen.
        if (looksProcessed) return false;
        if (/\b(verkade|ovengebakken)\b/i.test(title)) return false;
        continue;
      }
      if (part === "gember" || part === "ginger") {
        // Gember (vers) ≠ drank/shot/water/fruitmix/supplement.
        if (/\b(shot|sap|sapje|smoothie|juice|drank|bruiswater|water|limonade|tabletten|capsule|supplement|vitamine)\b/i.test(title)) {
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
        // Room ≠ roomkaas.
        if (/\broomkaas\b/i.test(title)) return false;
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

  return [...terms].filter(Boolean);
}

module.exports = {
  sanitizeText,
  ingredientTermMatchesProductTitle,
  ingredientMatchesAnyProductTerm,
  tokenizeForMatch,
  buildIngredientMatchTerms,
};
