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
  const cleaned = String(term || "")
    .toLowerCase()
    .replace(/^\d[\d\s/,.-]*/, "")
    .trim();
  if (!cleaned || cleaned.length < 2) return true;
  const parts = cleaned.split(/\s+/).filter((p) => p.length >= 1);
  if (!parts.length) return true;
  try {
    for (const part of parts) {
      if (part.length < 2) continue;
      // Common produce/pantry guardrails. These are intentionally conservative:
      // keep fresh core items, avoid obvious processed/derived products.
      const looksProcessed =
        /\b(soep|saus|dressing|marinade|pasta|puree|passata|ketchup|dip|spread|chips|snack|toast|toastjes|crackers?)\b/i.test(title);
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
        if (/\b(chutney|saus|dressing|mix|kruiden)\b/i.test(title) && /\bui(en)?\b/i.test(title)) return false;
        continue;
      }
      if (part === "citroen") {
        // Citroen (vrucht) ≠ sap/limonade/concentraat/aroma; die moeten expliciet gevraagd worden.
        if (/\b(citroengras|lemongrass|sereh)\b/i.test(title)) return false;
        if (/\b(sap|sapje|limonade|concentraat|aroma|cordial|siroop|syrop|drank|thee|tea)\b/i.test(title)) return false;
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
