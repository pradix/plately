function createSeedRecipe({
  id,
  title,
  description,
  time,
  servings,
  mealTag,
  image,
  sourceUrl,
  ingredients,
  instructions,
}) {
  return {
    id,
    title,
    description,
    time,
    kcal: `${Math.max(280, ingredients.length * 75)} kcal`,
    servings,
    mealTag,
    sourceUrl,
    image,
    alt: title,
    platform: "website",
    caption: description,
    author: "Leuke Recepten",
    ingredients,
    instructions,
    isSeed: true,
  };
}

const showcaseRecipes = [
  createSeedRecipe({
    id: "recipe-home-burger",
    title: "De Ultieme Avocado Burger",
    description: "Een heerlijke, vullende burger met verse avocado en een knapperige bun. Perfect voor het weekend.",
    time: "35 min",
    servings: "2 personen",
    mealTag: "Avond",
    sourceUrl: "https://www.leukerecepten.nl/recepten/avocado-burger/",
    image: "assets/hero-burger.svg",
    ingredients: [
      { quantity: "2", unit: "x", name: "Brioche buns" },
      { quantity: "2", unit: "x", name: "Runderburgers" },
      { quantity: "1", unit: "x", name: "Avocado" },
      { quantity: "1", unit: "x", name: "Tomaat" },
      { quantity: "4", unit: "plakjes", name: "Pickles" },
      { quantity: "2", unit: "el", name: "Burgersaus" },
    ],
    instructions: [
      "Bak de burgers goudbruin en toast de broodjes kort.",
      "Snijd de avocado en tomaat in plakjes.",
      "Beleg de onderste helft met sla, tomaat, burger en avocado.",
      "Werk af met saus en serveer direct.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-home-avocado-smash",
    title: "Avocado Smash",
    description: "Snelle avocado toast met citroen en peper.",
    time: "10 min",
    servings: "2 stuks",
    mealTag: "Ontbijt",
    sourceUrl: "https://www.leukerecepten.nl/recepten/avocado-toast/",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80",
    ingredients: [
      { quantity: "1", unit: "x", name: "Avocado" },
      { quantity: "2", unit: "stuks", name: "Zuurdesem toast" },
      { quantity: "1", unit: "tl", name: "Citroensap" },
    ],
    instructions: [
      "Prak de avocado met citroensap.",
      "Rooster het brood goudbruin.",
      "Verdeel de avocado over de toast.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-home-eggs",
    title: "Gepofte Eieren Avocado",
    description: "Zachte eieren met romige avocado op toast.",
    time: "15 min",
    servings: "2 stuks",
    mealTag: "Ontbijt",
    sourceUrl: "https://www.leukerecepten.nl/recepten/gepocheerde-eieren/",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80",
    ingredients: [
      { quantity: "2", unit: "x", name: "Eieren" },
      { quantity: "1", unit: "x", name: "Avocado" },
      { quantity: "2", unit: "stuks", name: "Toast" },
    ],
    instructions: [
      "Pocheer de eieren zacht.",
      "Prak de avocado grof.",
      "Serveer op toast met peper en zout.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-book-spaghetti",
    title: "Spaghetti Bolognese",
    description: "Klassieke spaghetti bolognese met rijke tomatensaus.",
    time: "60 min",
    servings: "4 personen",
    mealTag: "Avond",
    sourceUrl: "https://www.leukerecepten.nl/recepten/spaghetti-bolognese/",
    image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&q=80",
    ingredients: [
      { quantity: "400", unit: "g", name: "Spaghetti" },
      { quantity: "300", unit: "g", name: "Rundergehakt" },
      { quantity: "1", unit: "blik", name: "Tomatenblokjes" },
    ],
    instructions: ["Kook pasta.", "Bak gehakt.", "Laat saus pruttelen.", "Serveer samen."],
  }),
  createSeedRecipe({
    id: "recipe-book-salmon",
    title: "Pasta met Zalm en Spinazie",
    description: "Romige pasta met zalm, spinazie en citroen.",
    time: "30 min",
    servings: "4 personen",
    mealTag: "Avond",
    sourceUrl: "https://www.leukerecepten.nl/recepten/pasta-zalm-spinazie/",
    image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800&q=80",
    ingredients: [
      { quantity: "300", unit: "g", name: "Pasta" },
      { quantity: "250", unit: "g", name: "Zalmfilet" },
      { quantity: "200", unit: "g", name: "Spinazie" },
    ],
    instructions: ["Kook pasta.", "Bak zalm.", "Voeg spinazie toe.", "Meng alles samen."],
  }),
  createSeedRecipe({
    id: "recipe-book-cake",
    title: "Aardbeientaart",
    description: "Luchtige taart met room en verse aardbeien.",
    time: "65 min",
    servings: "8 personen",
    mealTag: "Dessert",
    sourceUrl: "https://www.leukerecepten.nl/recepten/aardbeientaart/",
    image: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?w=800&q=80",
    ingredients: [
      { quantity: "1", unit: "x", name: "Taartbodem" },
      { quantity: "250", unit: "g", name: "Aardbeien" },
      { quantity: "200", unit: "ml", name: "Slagroom" },
    ],
    instructions: ["Bak bodem.", "Klop room.", "Werk af met aardbeien."],
  }),
  createSeedRecipe({
    id: "recipe-book-thai",
    title: "Thaise Cashew Kip Roerbak",
    description: "Snelle wok met kip, cashews en limoen.",
    time: "18 min",
    servings: "4 personen",
    mealTag: "Avond",
    sourceUrl: "https://www.leukerecepten.nl/recepten/thaise-kip/",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    ingredients: [
      { quantity: "400", unit: "g", name: "Kipfilet" },
      { quantity: "75", unit: "g", name: "Cashewnoten" },
      { quantity: "1", unit: "x", name: "Limoen" },
    ],
    instructions: ["Bak kip.", "Voeg groenten en saus toe.", "Werk af met cashews en limoen."],
  }),
];

const initialRecipes = [...showcaseRecipes,
  createSeedRecipe({
    id: "recipe-1",
    title: "Pasta carbonara",
    description: "Klassiek recept voor romige Italiaanse pasta carbonara met spekjes, eieren en Parmezaanse kaas.",
    time: "25 min",
    servings: "4 Pers.",
    mealTag: "Avond",
    sourceUrl: "https://www.leukerecepten.nl/recepten/pasta-carbonara-recept/",
    image: "https://www.leukerecepten.nl/app/uploads/2025/09/pasta-carbonara-recept-nieuw.jpg",
    ingredients: [
      { quantity: "400", unit: "g", name: "Spaghetti" },
      { quantity: "200", unit: "g", name: "Gerookte spekblokjes of reepjes" },
      { quantity: "100", unit: "g", name: "Parmezaanse kaas" },
      { quantity: "3", unit: "x", name: "Eieren" },
      { quantity: "1", unit: "snuf", name: "Peper en zout" },
      { quantity: "1", unit: "handje", name: "Verse peterselie" },
    ],
    instructions: [
      "Bak de spekblokjes krokant en laat ze uitlekken op keukenpapier.",
      "Kook de spaghetti al dente en vang wat pastawater op.",
      "Meng de eieren met de geraspte kaas en flink wat peper.",
      "Roer de spaghetti met de spekjes en het eimengsel tot een romige saus en werk af met peterselie.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-2",
    title: "Wraps met kip",
    description: "Lekkere tortilla wraps gevuld met Mexicaans gekruide kip en paprika. Makkelijk en snel klaar.",
    time: "25 min",
    servings: "4 Pers.",
    mealTag: "Lunch",
    sourceUrl: "https://www.leukerecepten.nl/recepten/wraps-met-kip/",
    image: "https://www.leukerecepten.nl/app/uploads/2023/09/wraps-met-kip_b-2.jpg",
    ingredients: [
      { quantity: "8", unit: "x", name: "Middelgrote tortilla's" },
      { quantity: "500", unit: "g", name: "Kip in blokjes" },
      { quantity: "2", unit: "x", name: "Rode paprika's" },
      { quantity: "1", unit: "x", name: "Ui" },
      { quantity: "1", unit: "blik", name: "Maïs" },
      { quantity: "2", unit: "el", name: "Mexicaanse kruidenmix" },
    ],
    instructions: [
      "Bak de ui samen met de kip ongeveer 5 minuten in een pan.",
      "Voeg de paprika toe en bak nog eens 5 minuten mee.",
      "Roer de kruidenmix en wat water door het kipmengsel en warm de maïs mee.",
      "Vul de wraps en serveer met lente-ui, kaas, zure room en tacosaus.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-3",
    title: "Aspergesoep vers maken",
    description: "Heerlijk en makkelijk basisrecept voor aspergesoep met reepjes ham en ei.",
    time: "30 min",
    servings: "4 Pers.",
    mealTag: "Lunch",
    sourceUrl: "https://www.leukerecepten.nl/recepten/aspergesoep/",
    image: "https://www.leukerecepten.nl/app/uploads/2020/04/aspergesoep-recept.jpg",
    ingredients: [
      { quantity: "1000", unit: "g", name: "Witte asperges" },
      { quantity: "2", unit: "x", name: "Sjalotjes" },
      { quantity: "2", unit: "blokjes", name: "Kippenbouillon" },
      { quantity: "1500", unit: "ml", name: "Water" },
      { quantity: "200", unit: "ml", name: "Kookroom of slagroom" },
      { quantity: "80", unit: "g", name: "Bloem" },
    ],
    instructions: [
      "Schil de asperges en kook de schillen en uiteinden mee voor extra smaak.",
      "Maak een roux van boter en bloem en voeg daar de bouillon aan toe.",
      "Kook de asperges gaar en pureer of snijd ze in stukjes voor de soep.",
      "Roer de room erdoor en serveer met ham, ei en peterselie.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-4",
    title: "Kip kerrie",
    description: "Heerlijke zelfgemaakte kip kerrie in een romige saus met sperziebonen en rijst.",
    time: "30 min",
    servings: "4 Pers.",
    mealTag: "Avond",
    sourceUrl: "https://www.leukerecepten.nl/recepten/kip-kerrie/",
    image: "https://www.leukerecepten.nl/app/uploads/2025/07/kip-kerrie-recept.jpg",
    ingredients: [
      { quantity: "500", unit: "g", name: "Kipfilet" },
      { quantity: "1", unit: "x", name: "Ui" },
      { quantity: "250", unit: "g", name: "Sperziebonen" },
      { quantity: "1", unit: "x", name: "Ananas" },
      { quantity: "200", unit: "ml", name: "Crème fraîche" },
      { quantity: "300", unit: "g", name: "Rijst" },
    ],
    instructions: [
      "Bak de kip met ui en kerriekruiden rondom aan.",
      "Voeg de sperziebonen en ananas toe en laat kort meegaren.",
      "Roer de crème fraîche door de saus voor een romige structuur.",
      "Serveer met rijst.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-5",
    title: "Hollandse ovenschotel met bloemkool",
    description: "Krieltjes, bloemkool en spekjes in een romige saus met mosterd en kaas uit de oven.",
    time: "55 min",
    servings: "3 Pers.",
    mealTag: "Avond",
    sourceUrl: "https://www.leukerecepten.nl/recepten/hollandse-ovenschotel-met-bloemkool/",
    image: "https://www.leukerecepten.nl/app/uploads/2023/09/ovenschotel-met-bloemkool-1.jpg",
    ingredients: [
      { quantity: "400", unit: "g", name: "Bloemkool" },
      { quantity: "700", unit: "g", name: "Krieltjes" },
      { quantity: "250", unit: "g", name: "Spekjes" },
      { quantity: "200", unit: "g", name: "Prei" },
      { quantity: "250", unit: "ml", name: "Crème fraîche" },
      { quantity: "1", unit: "tl", name: "Mosterd" },
    ],
    instructions: [
      "Verwarm de oven op 200 graden en kook bloemkool en krieltjes kort voor.",
      "Bak de spekjes met ui en voeg daarna de prei toe.",
      "Klop de eieren los met crème fraîche, mosterd, tijm, peper en zout.",
      "Meng alles in een ovenschaal, bestrooi met kaas en bak 30 minuten.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-6",
    title: "Bananenbrood recept",
    description: "Gezond bananenbrood met amandelmeel, speltbloem en rijpe bananen. Simpel basisrecept.",
    time: "60 min",
    servings: "8 Pers.",
    mealTag: "Ontbijt",
    sourceUrl: "https://www.leukerecepten.nl/recepten/bananenbrood-recept/",
    image: "https://www.leukerecepten.nl/app/uploads/2021/08/bananenbrood-nw.jpg",
    ingredients: [
      { quantity: "4", unit: "x", name: "Rijpe bananen" },
      { quantity: "3", unit: "x", name: "Eieren" },
      { quantity: "160", unit: "g", name: "Speltbloem" },
      { quantity: "80", unit: "g", name: "Amandelmeel" },
      { quantity: "0.5", unit: "zakje", name: "Bakpoeder" },
      { quantity: "3", unit: "x", name: "Dadels" },
    ],
    instructions: [
      "Prak de bananen fijn en meng ze met de eieren en dadels.",
      "Spatel speltbloem, amandelmeel, kaneel en bakpoeder erdoor.",
      "Giet het beslag in een cakevorm.",
      "Bak het bananenbrood ongeveer 50 minuten in de oven tot het gaar is.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-7",
    title: "Chili con carne",
    description: "Klassieke chili con carne met gehakt, bonen, maïs en een kruidige tomatensaus.",
    time: "35 min",
    servings: "4 Pers.",
    mealTag: "Avond",
    sourceUrl: "https://www.leukerecepten.nl/recepten/chili-con-carne/",
    image: "https://www.leukerecepten.nl/app/uploads/2022/03/chili-con-carne_.jpg",
    ingredients: [
      { quantity: "500", unit: "g", name: "Rundergehakt" },
      { quantity: "450", unit: "g", name: "Kidneybonen" },
      { quantity: "1", unit: "blik", name: "Tomatenblokjes" },
      { quantity: "2", unit: "x", name: "Rode paprika's" },
      { quantity: "140", unit: "g", name: "Maïs" },
      { quantity: "300", unit: "g", name: "Rijst" },
    ],
    instructions: [
      "Bak ui, knoflook en gehakt rul in een grote pan.",
      "Voeg kruidenmix en paprika toe en bak kort mee.",
      "Roer tomatenpuree, tomatenblokjes en gezeefde tomaten erdoor en laat pruttelen.",
      "Voeg bonen en maïs toe en serveer met rijst en zure room.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-8",
    title: "Pannenkoeken",
    description: "Eenvoudig basisrecept voor pannenkoekenbeslag met maar een paar ingrediënten.",
    time: "30 min",
    servings: "8 Pers.",
    mealTag: "Ontbijt",
    sourceUrl: "https://www.leukerecepten.nl/recepten/pannenkoeken/",
    image: "https://www.leukerecepten.nl/app/uploads/2021/08/pannenkoeken-recept-1.jpg",
    ingredients: [
      { quantity: "300", unit: "g", name: "Bloem" },
      { quantity: "3", unit: "x", name: "Eieren" },
      { quantity: "500", unit: "ml", name: "Melk" },
      { quantity: "1", unit: "snuf", name: "Zout" },
      { quantity: "1", unit: "klontje", name: "Boter om te bakken" },
    ],
    instructions: [
      "Meng bloem, eieren, melk en zout tot een glad beslag.",
      "Laat het beslag eventueel kort rusten voor extra mooie pannenkoeken.",
      "Verhit boter in een koekenpan en schenk een soeplepel beslag in de pan.",
      "Bak de pannenkoeken aan beide kanten goudbruin.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-9",
    title: "Pasta pesto met kip",
    description: "Makkelijke pasta met kip in een romige pestosaus, afgewerkt met tomaatjes en rucola.",
    time: "25 min",
    servings: "4 Pers.",
    mealTag: "Avond",
    sourceUrl: "https://www.leukerecepten.nl/recepten/pasta-pesto-met-kip/",
    image: "https://www.leukerecepten.nl/app/uploads/2022/07/Pasta-pesto-recept.jpg",
    ingredients: [
      { quantity: "300", unit: "g", name: "Pasta" },
      { quantity: "400", unit: "g", name: "Kipfilet" },
      { quantity: "4", unit: "el", name: "Pesto" },
      { quantity: "250", unit: "ml", name: "Kookroom" },
      { quantity: "250", unit: "g", name: "Cherry tomaatjes" },
      { quantity: "1", unit: "handje", name: "Rucola" },
    ],
    instructions: [
      "Kook de pasta gaar volgens de verpakking.",
      "Bak de kip met ui gaar en voeg de tomaatjes toe.",
      "Roer pesto en kookroom door het kipmengsel tot een saus.",
      "Meng met de pasta en werk af met rucola en pijnboompitten.",
    ],
  }),
  createSeedRecipe({
    id: "recipe-10",
    title: "Tiramisu",
    description: "Klassieke tiramisu met mascarpone, lange vingers, koffie en cacao. Heerlijk romig dessert.",
    time: "35 min + 12 u",
    servings: "6 Pers.",
    mealTag: "Dessert",
    sourceUrl: "https://www.leukerecepten.nl/recepten/tiramisu/",
    image: "https://www.leukerecepten.nl/app/uploads/2019/12/tiramisu-klassiek-1.jpg",
    ingredients: [
      { quantity: "3", unit: "x", name: "Verse eieren" },
      { quantity: "250", unit: "g", name: "Mascarpone" },
      { quantity: "20", unit: "x", name: "Lange vingers" },
      { quantity: "40", unit: "g", name: "Suiker" },
      { quantity: "1", unit: "kopje", name: "Sterke koffie" },
      { quantity: "3", unit: "el", name: "Cacaopoeder" },
    ],
    instructions: [
      "Splits de eieren en meng het eigeel met suiker en mascarpone.",
      "Klop het eiwit stijf en spatel dit voorzichtig door het mascarponemengsel.",
      "Doop de lange vingers kort in koffie en maak lagen in een schaal met de crème.",
      "Bestrooi met cacao en laat de tiramisu minimaal een nacht opstijven.",
    ],
  }),
];

const HOME_FEATURED_RECIPE_ID = "recipe-home-burger";
const HOME_QUICK_RECIPE_IDS = ["recipe-home-avocado-smash", "recipe-home-eggs"];
const COOKBOOK_SHOWCASE_IDS = [
  "recipe-book-spaghetti",
  "recipe-book-salmon",
  "recipe-book-cake",
  "recipe-book-thai",
];

const HOME_RECIPE_INITIAL = 6;
const HOME_RECIPE_STEP = 12;
const HOME_RECIPE_LIMIT_SESSION_KEY = "plately-home-recipe-limit";

function getSessionNumber(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key);
    const parsed = Number.parseInt(String(raw || ""), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function setSessionNumber(key, value) {
  try { sessionStorage.setItem(key, String(value)); } catch {}
}

function getNavigationType() {
  try {
    const nav = performance?.getEntriesByType?.("navigation")?.[0];
    return nav?.type || "";
  } catch {
    return "";
  }
}

// ── Dev-only perf logger ───────────────────────────────────────────────────────
const PERF_ENABLED = (() => {
  try {
    return localStorage.getItem("plately-perf") === "1" || String(location?.search || "").includes("perf=1");
  } catch {
    return String(location?.search || "").includes("perf=1");
  }
})();

function perfMeasure(label, fn) {
  if (!PERF_ENABLED || !performance?.now) return fn();
  const t0 = performance.now();
  const out = fn();
  const t1 = performance.now();
  // eslint-disable-next-line no-console
  console.debug(`[perf] ${label}: ${(t1 - t0).toFixed(1)}ms`);
  return out;
}

async function perfMeasureAsync(label, fn) {
  if (!PERF_ENABLED || !performance?.now) return await fn();
  const t0 = performance.now();
  const out = await fn();
  const t1 = performance.now();
  // eslint-disable-next-line no-console
  console.debug(`[perf] ${label}: ${(t1 - t0).toFixed(1)}ms`);
  return out;
}

// Allowed to reset on hard refresh; keep within-session navigation state.
if (getNavigationType() === "reload") {
  try { sessionStorage.removeItem(HOME_RECIPE_LIMIT_SESSION_KEY); } catch {}
}

const state = {
  apiBase: window.location.protocol === "file:" ? "http://localhost:3000" : "",
  selectedPlatform: "tiktok",
  view: "home",
  recipes: [],
  // Imported-but-not-yet-saved recipes live here as previews/drafts.
  // They are NOT shown on home and are NOT persisted.
  importPreviews: {},
  selectedRecipeId: "",
  featuredRecipeId: "",
  reviewRecipeId: "",
  currentServings: 2,
  recipeProgress: {},
  keepAwake: false,
  wakeLockSentinel: null,
  kookstandOpen: false,
  kookstandRecipeId: "",
  kookstandStepIndex: 0,
  kookstandShowIngredients: false,
  kookstandJumpOpen: false,
  kookstandWakeLockOwned: false,
  session: {
    ready: false,
    saving: false,
    userId: "",
  },
  auth: {
    enabled: false,
    authenticated: false,
    email: "",
    mode: "login",
  },
  profile: {
    name: "",
    handle: "",
    email: "",
    photo: "",
    favoriteSupermarket: "ah",
    onboardingSeenAt: null,
  },
  language: "nl",
  groceryItems: [],
  basketPreview: null,
  basketServings: 2, // current persons
  basketBaseServings: 2, // base when basket was opened
  basketFilter: { bio: false, beterLeven1: false, vegetarisch: false, vegan: false, plantaardig: false },
  // Track optional pantry items the user explicitly added from the basket sheet.
  // Keyed by selected recipe id so the behavior is per-recipe.
  basketOptionalAddedByRecipe: {},
  // Track optional pantry items quantities added directly in the basket sheet.
  // Shape: { [recipeId]: { [normalizedIngredientKey]: number } }
  basketOptionalQtyByRecipe: {},
  altSheetItemIndex: null,
  altSheetFilter: null, // null = grouped view, otherwise one of: beterLeven1|vegetarisch|vegan|plantaardig|more
  cookbooks: [],
  selectedCookbookId: "",
  pendingCookbookSaveRecipeId: "",
  pendingCookbookSaveCookbookId: "",
  _moveFromCookbookId: "",
  mealPlan: {
    maandag: null,
    dinsdag: null,
    woensdag: null,
    donderdag: null,
    vrijdag: null,
    zaterdag: null,
    zondag: null,
  },
  // searchQuery is used for filtering the "Mijn recepten" grid.
  // Keep it separate from channel-search query.
  searchQuery: "",
  channelSearchQuery: "",
  activeCookbookFilter: null,
  homeRecipeLimit: getSessionNumber(HOME_RECIPE_LIMIT_SESSION_KEY, HOME_RECIPE_INITIAL),
  followedChannelIds: ["ch-ah"], // Start with only Allerhande (primary Dutch recipe source)
  customChannels: [],
  channelEnabled: { seed: {}, custom: {} },
  channelSearchFilter: null,
  channelSearchAllResults: [],
  openCookbookId: null,
  cookbookSelectMode: false,
  cookbookSelectedRecipeIds: [],
  cookbooksSelectMode: false,
  cookbooksSelectedIds: [],
  push: {
    supported: false,
    permission: "default",
    subscribed: false,
    refreshing: false,
    prefs: {
      categories: { features: true, ah: false, cookmode: false },
    },
  },
  announce: {
    pending: null, // { id?, title?, body?, url? }
    unseen: false,
  },
};

const PLATELY_CLIENT_ANON_KEY = "plately-client-anon-v1";
const CLIENT_TRACK_FLUSH_MS = 3200;
const CLIENT_TRACK_ALLOWED = new Set([
  "client_navigation",
  "client_grocery_add",
  "client_ah_basket_open",
  "client_kookstand",
  "client_cookbook_save",
  "client_import_success",
  "client_ah_wissel_open",
  "client_ah_wissel_pick",
  "client_ah_research",
  "client_ah_bio_toggle",
  "client_channel_search_import",
  "client_import_review_saved",
  "client_recipe_deleted",
]);
const __clientEventQueue = [];
let __clientEventFlushTimer = null;

function getOrCreateClientAnonId() {
  try {
    let id = localStorage.getItem(PLATELY_CLIENT_ANON_KEY);
    if (!id || id.length < 10) {
      const rand = crypto.randomUUID?.().replace(/-/g, "") || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      id = `a-${rand}`.slice(0, 40);
      localStorage.setItem(PLATELY_CLIENT_ANON_KEY, id);
    }
    return String(id).slice(0, 44);
  } catch {
    return "";
  }
}

function flushClientEventsBatch() {
  if (!__clientEventQueue.length || typeof fetch !== "function") return;
  const events = __clientEventQueue.splice(0, 20);
  const url = `${state.apiBase}/api/client-events`;
  const body = JSON.stringify({
    anonId: getOrCreateClientAnonId(),
    events,
  });
  fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

function scheduleClientEventsFlush() {
  if (__clientEventFlushTimer) return;
  __clientEventFlushTimer = setTimeout(() => {
    __clientEventFlushTimer = null;
    flushClientEventsBatch();
  }, CLIENT_TRACK_FLUSH_MS);
}

/** Best-effort product analytics; falen wordt genegeerd. */
function trackClientEvent(type, meta = {}) {
  if (!CLIENT_TRACK_ALLOWED.has(type)) return;
  __clientEventQueue.push({
    type,
    meta: meta && typeof meta === "object" ? meta : {},
    ts: Date.now(),
  });
  if (__clientEventQueue.length >= 10) flushClientEventsBatch();
  else scheduleClientEventsFlush();
}

function hostnameForAnalytics(url) {
  try {
    return String(new URL(url).hostname || "")
      .replace(/^www\./i, "")
      .slice(0, 96);
  } catch {
    return "";
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushClientEventsBatch();
  });
  window.addEventListener(
    "pagehide",
    () => {
      flushClientEventsBatch();
    },
    { capture: true }
  );
}

function getInitials(name, email) {
  const n = String(name || "").trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    const first = (parts[0]?.[0] || "").toUpperCase();
    const second = (parts.length > 1 ? parts[1]?.[0] : parts[0]?.[1]) || "";
    const out = (first + String(second).toUpperCase()).trim();
    return out || "?";
  }
  const e = String(email || "").trim();
  if (e) {
    const local = e.split("@")[0] || "";
    const a = (local[0] || "").toUpperCase();
    const b = (local[1] || "").toUpperCase();
    return (a + b).trim() || "?";
  }
  return "?";
}

function resetOnboardingPhotoCircle() {
  try {
    const circle = document.getElementById("onboardingPhotoCircle");
    const icon = circle?.querySelector?.(".onboarding-photo-icon");
    if (circle) {
      circle.style.backgroundImage = "";
      circle.style.backgroundSize = "";
      circle.style.backgroundPosition = "";
    }
    if (icon instanceof HTMLElement) {
      icon.style.display = "";
    }
  } catch {
    // ignore
  }
}

function clearTransientProfilePhoto() {
  state.profile.photo = "";
  resetOnboardingPhotoCircle();
}

const SEED_RECIPE_IDS = new Set(initialRecipes.map((recipe) => recipe.id));

/** Startset voor registratie-onboarding (kopie krijgt een eigen id voor je kookboek). */
const ONBOARDING_FIRST_RECIPE_IDS = ["recipe-1", "recipe-9", "recipe-4", "recipe-8"];

function cloneSeedRecipeForUserCollection(seedId) {
  const seed = initialRecipes.find((r) => r && r.id === seedId);
  if (!seed) return null;
  const id = `${seed.id}-${Date.now().toString(36)}`;
  try {
    const copy = JSON.parse(JSON.stringify(seed));
    copy.id = id;
    copy.isSeed = false;
    copy.platform = seed.platform || "website";
    return copy;
  } catch {
    return null;
  }
}

const SEED_CHANNELS = [
  { id: "ch-ah",  initials: "AH",  name: "Allerhande",          color: "#0071c2", url: "https://www.ah.nl/allerhande" },
  { id: "ch-24k", initials: "24K", name: "24 Kitchen",          color: "#e82828", url: "https://www.24kitchen.nl/recepten" },
  { id: "ch-ek",  initials: "EK",  name: "Eef Kookt Zo",        color: "#d4789e", url: "https://www.eefkooktzo.nl" },
  { id: "ch-mj",  initials: "MJ",  name: "Miljuschka",           color: "#2d2d2d", url: "https://miljuschka.nl" },
  { id: "ch-up",  initials: "UP",  name: "Uit Paulines Keuken",  color: "#e8a020", url: "https://uitpaulineskeuken.nl" },
  { id: "ch-clf", initials: "CLF", name: "Chicks Love Food",     color: "#e04458", url: "https://www.chickslovefood.com" },
  { id: "ch-les", initials: "LS",  name: "Lekker & Simpel",      color: "#4d9e5a", url: "https://www.lekkerensimpel.com" },
  { id: "ch-lb",  initials: "LB",  name: "Laura's Bakery",       color: "#e879a0", url: "https://www.laurasbakery.nl" },
  { id: "ch-jumbo", initials: "JU", name: "Jumbo",               color: "#fdc500", url: "https://www.jumbo.com/recepten/" },
  { id: "ch-culy", initials: "CU", name: "Culy",                 color: "#2f6f5d", url: "https://www.culy.nl" },
];

const CUSTOM_CHANNEL_COLORS = [
  "#6c63ff", "#e8605a", "#43aa8b", "#f4a261", "#457b9d",
  "#e9c46a", "#9b5de5", "#00b4d8", "#f15bb5", "#06d6a0",
];

const SUPERMARKETS = [
  { id: "ah",        name: "Albert Heijn", color: "#0071c2", url: "https://www.ah.nl",        supported: true  },
  { id: "jumbo",     name: "Jumbo",        color: "#fdc500", url: "https://www.jumbo.com",    supported: false },
  { id: "picnic",    name: "Picnic",       color: "#e60000", url: "https://picnic.app",       supported: false },
  { id: "vomar",     name: "Vomar",        color: "#e30613", url: "https://www.vomar.nl",     supported: false },
  { id: "dirk",      name: "Dirk",         color: "#e30613", url: "https://www.dirk.nl",      supported: false },
  { id: "lidl",      name: "Lidl",         color: "#0050aa", url: "https://www.lidl.nl",      supported: false },
  { id: "aldi",      name: "Aldi",         color: "#00549f", url: "https://www.aldi.nl",      supported: false, logo: "assets/supermarkt-aldi.png" },
  { id: "coop",      name: "Coop",         color: "#e2001a", url: "https://www.coop.nl",      supported: false },
  { id: "hoogvliet", name: "Hoogvliet",    color: "#e30613", url: "https://www.hoogvliet.com", supported: false, logo: "assets/supermarkt-hoogvliet.png" },
];

// ── i18n (Internationalization) ──────────────────────────────────────────────
let translations = {};
let translationsReady = false;

async function loadTranslations() {
  try {
    const response = await fetch('translations.json');
    translations = await response.json();
    translationsReady = true;
    console.log('✓ Translations loaded:', Object.keys(translations));
  } catch (error) {
    console.error('Failed to load translations:', error);
    // Fallback to Dutch if loading fails
    translations = { nl: {}, en: {} };
    translationsReady = true;
  }
  // Apply once translations are ready (prevents showing raw keys).
  applyTranslations();
}

function t(key, fallback = '') {
  const lang = state.language || 'nl';
  const translated = translations[lang]?.[key];
  const fallbackTranslated = translations['nl']?.[key];
  return translated || fallbackTranslated || fallback || key;
}

function applyTranslations() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const translated = t(key);
    if (el.tagName === 'INPUT' && el.type === 'placeholder') {
      el.placeholder = translated;
    } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.value = translated;
    } else {
      el.textContent = translated;
    }
  });

  // Update all elements with data-i18n-title attribute
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.dataset.i18nTitle;
    el.title = t(key);
  });

  // Update all elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });
}

// Load translations immediately (non-blocking)
loadTranslations();

function getSupermarketIconUrl(sm) {
  return sm.logo || getSourceIconUrl(sm.url);
}

function getSupermarketById(id) {
  return SUPERMARKETS.find((s) => s.id === id) || SUPERMARKETS[0];
}

function getAllChannels() {
  return [...SEED_CHANNELS, ...state.customChannels];
}

function compareChannelDisplayName(a, b) {
  const an = (a?.name || "").trim();
  const bn = (b?.name || "").trim();
  return an.localeCompare(bn, undefined, { sensitivity: "base" });
}

function getSeedChannelsSortedByName() {
  return [...SEED_CHANNELS].sort(compareChannelDisplayName);
}

function isSeedChannelEnabled(channelId) {
  const id = String(channelId || "").trim();
  if (!id) return false;
  const map = state.channelEnabled?.seed && typeof state.channelEnabled.seed === "object" ? state.channelEnabled.seed : {};
  return map[id] === false ? false : true;
}

function isCustomChannelEnabled(channelId) {
  const id = String(channelId || "").trim();
  if (!id) return false;
  const map = state.channelEnabled?.custom && typeof state.channelEnabled.custom === "object" ? state.channelEnabled.custom : {};
  return map[id] === false ? false : true;
}

const homeScreen = document.getElementById("homeScreen");
const detailScreen = document.getElementById("detailScreen");
const groceryScreen = document.getElementById("groceryScreen");
const mealPlanScreen = document.getElementById("mealPlanScreen");
const settingsScreen = document.getElementById("settingsScreen");
const cookbooksScreen = document.getElementById("cookbooksScreen");
const importScreen = document.getElementById("importScreen");
const reviewScreen = document.getElementById("reviewScreen");
const adminScreen = document.getElementById("adminScreen");
const modal = document.getElementById("importModal");
const toast = document.getElementById("toast");
const importForm = document.getElementById("importForm");
const importFeedback = document.getElementById("importFeedback");
const quickRecipeGrid = document.getElementById("quickRecipeGrid");
const categoryGrid = document.getElementById("categoryGrid");
const recipeGrid = document.getElementById("recipeGrid");
const featuredCard = document.getElementById("featuredCard");
const featuredImage = document.getElementById("featuredImage");
const featuredSourceIcon = document.getElementById("featuredSourceIcon");
const featuredTitle = document.getElementById("featuredTitle");
const featuredDescription = document.getElementById("featuredDescription");
const featuredTime = document.getElementById("featuredTime");
const featuredServings = document.getElementById("featuredServings");
const homeStats = document.getElementById("homeStats");
const recentImportList = document.getElementById("recentImportList");
const homeConceptsHeading = document.getElementById("homeConceptsHeading");
const homeConceptsGrid = document.getElementById("homeConceptsGrid");
const homeConceptsBanner = document.getElementById("homeConceptsBanner");
const homeImportForm = document.getElementById("homeImportForm");
const homeImportUrl = document.getElementById("homeImportUrl");
const homeImportSubmit = document.getElementById("homeImportSubmit");
const homeImportFeedback = document.getElementById("homeImportFeedback");
const recipeUrlInput = document.getElementById("recipeUrl");
const recipeNoteInput = document.getElementById("recipeNote");
const searchInput = document.getElementById("searchInput");
const homeSearchChipsWrap = document.querySelector(".home-search-chips");
const homeSearchChipsMore = document.getElementById("homeSearchChipsMore");
const channelSearchSection = document.getElementById("channelSearchSection");
const channelSearchResults = document.getElementById("channelSearchResults");
const closeImportSecondaryButton = document.getElementById("closeImportSecondaryButton");
const openFeaturedRecipeButton = document.getElementById("openFeaturedRecipeButton");
const platformButtons = [...document.querySelectorAll(".platform-button[data-platform-choice]")];
const platformCards = [...document.querySelectorAll(".platform-card[data-platform-choice]")];
const navItems = [...document.querySelectorAll(".nav-item[data-view]")];
const detailHeroImage = document.getElementById("detailHeroImage");
const detailTitle = document.getElementById("detailTitle");
const detailMealTag = document.getElementById("detailMealTag");
const detailTime = document.getElementById("detailTime");
const detailKcal = document.getElementById("detailKcal");
const detailServings = document.getElementById("detailServings");
const detailDescription = document.getElementById("detailDescription");
const detailSourceIcon = document.getElementById("detailSourceIcon");
const detailSourceLabel = document.getElementById("detailSourceLabel");
const reviewImportButton = document.getElementById("reviewImportButton");
const detailSaveHeaderButton = document.getElementById("detailSaveHeaderButton");
const shareRecipeButton = document.getElementById("shareRecipeButton");
const favoriteRecipeButton = document.getElementById("favoriteRecipeButton");
const topbarFavoriteButton = document.getElementById("topbarFavoriteButton");
const saveRecipeButton = document.getElementById("saveRecipeButton");
const kookstandButton = document.getElementById("kookstandButton");
const cookModeButton = document.getElementById("cookModeButton");
const wakeLockButton = document.getElementById("wakeLockButton");
const detailAssist = document.getElementById("detailAssist");
const cookModePanel = document.getElementById("cookModePanel");
const cookModeProgress = document.getElementById("cookModeProgress");
const cookModeStepIndex = document.getElementById("cookModeStepIndex");
const cookModeStepText = document.getElementById("cookModeStepText");
const cookModePrevButton = document.getElementById("cookModePrevButton");
const cookModeResetButton = document.getElementById("cookModeResetButton");
const cookModeNextButton = document.getElementById("cookModeNextButton");
const kookstandOverlay = document.getElementById("kookstandOverlay");
const kookstandBackdrop = document.getElementById("kookstandBackdrop");
const kookstandCloseButton = document.getElementById("kookstandClose");
const kookstandTitle = document.getElementById("kookstandTitle");
const kookstandServings = document.getElementById("kookstandServings");
const kookstandProgress = document.getElementById("kookstandProgress");
const kookstandCounter = document.getElementById("kookstandCounter");
const kookstandStepIndex = document.getElementById("kookstandStepIndex");
const kookstandStepText = document.getElementById("kookstandStepText");
const kookstandPrevButton = document.getElementById("kookstandPrev");
const kookstandNextButton = document.getElementById("kookstandNext");
const kookstandToggleIngredientsButton = document.getElementById("kookstandToggleIngredients");
const kookstandIngredientsSection = document.getElementById("kookstandIngredients");
const kookstandIngredientList = document.getElementById("kookstandIngredientList");
const kookstandHideIngredientsButton = document.getElementById("kookstandHideIngredients");
const detailStepCount = document.getElementById("detailStepCount");
const detailIngredientCount = document.getElementById("detailIngredientCount");
const servingsDisplay = document.getElementById("servingsDisplay");
const detailIngredientList = document.getElementById("detailIngredientList");
const ingredientSwapPanel = document.getElementById("ingredientSwapPanel");
const ingredientSwapList = document.getElementById("ingredientSwapList");
const checkAllIngredientsButton = document.getElementById("checkAllIngredientsButton");
const uncheckAllIngredientsButton = document.getElementById("uncheckAllIngredientsButton");
const detailStepList = document.getElementById("detailStepList");
const addSelectedToGroceriesButton = document.getElementById("addSelectedToGroceriesButton");
const groceryGroups = document.getElementById("groceryGroups");
const grocerySummaryChips = document.getElementById("grocerySummaryChips");
const groceryQuickInput = document.getElementById("groceryQuickInput");
const groceryToolbar = document.getElementById("groceryToolbar");
const groceryOrder = document.getElementById("groceryOrder");
const groceryQuickAddTopButton = document.getElementById("groceryQuickAddTopButton");
const groceryMoreButton = document.getElementById("groceryMoreButton");
const groceryAddButton = document.getElementById("groceryAddButton");
const clearGroceryListButton = document.getElementById("clearGroceryListButton");
const addCustomGroceryButton = document.getElementById("addCustomGroceryButton");
const copyGroceryListButton = document.getElementById("copyGroceryListButton");
const clearGroceryToolbarButton = document.getElementById("clearGroceryToolbarButton");
const orderAHButton = document.getElementById("orderAHButton");
const orderAHItemCount = document.getElementById("orderAHItemCount");
const storeAssistant = document.getElementById("storeAssistant");
const storeAssistantKicker = document.getElementById("storeAssistantKicker");
const storeAssistantTitle = document.getElementById("storeAssistantTitle");
const storeAssistantCopy = document.getElementById("storeAssistantCopy");
const basketSummary = document.getElementById("basketSummary");
const basketList = document.getElementById("basketList");
const basketNote = document.getElementById("basketNote");
const basketContinueButton = document.getElementById("basketContinueButton");
const mealPlanCurrentRecipe = document.getElementById("mealPlanCurrentRecipe");
const mealPlanGrid = document.getElementById("mealPlanGrid");
const cookbookList = document.getElementById("cookbookList");
const profileName = document.getElementById("profileName");
const profileHandle = document.getElementById("profileHandle");
const profileRecipeCount = document.getElementById("profileRecipeCount");
const profileCookbookCount = document.getElementById("profileCookbookCount");
const profileEditButton = document.getElementById("profileEditButton");
const shareProfileButton = document.getElementById("shareProfileButton");
const premiumButton = document.getElementById("premiumButton");
const accountTitle = document.getElementById("accountTitle");
const accountCopy = document.getElementById("accountCopy");
const openRegisterButton = document.getElementById("openRegisterButton");
const openLoginButton = document.getElementById("openLoginButton");
const logoutButton = document.getElementById("logoutButton");
const featurePushRow = document.getElementById("featurePushRow");
const featurePushToggle = document.getElementById("featurePushToggle");
const featurePushMeta = document.getElementById("featurePushMeta");
const pushCatFeaturesRow = document.getElementById("pushCatFeaturesRow");
const pushCatFeaturesToggle = document.getElementById("pushCatFeaturesToggle");
const pushCatFeaturesMeta = document.getElementById("pushCatFeaturesMeta");
const pushCatAhRow = document.getElementById("pushCatAhRow");
const pushCatAhToggle = document.getElementById("pushCatAhToggle");
const pushCatAhMeta = document.getElementById("pushCatAhMeta");
const pushCatCookmodeRow = document.getElementById("pushCatCookmodeRow");
const pushCatCookmodeToggle = document.getElementById("pushCatCookmodeToggle");
const pushCatCookmodeMeta = document.getElementById("pushCatCookmodeMeta");
const pushTrigAhBasketReadyRow = document.getElementById("pushTrigAhBasketReadyRow");
const pushTrigAhBasketReadyToggle = document.getElementById("pushTrigAhBasketReadyToggle");
const pushTrigAhBasketReadyMeta = document.getElementById("pushTrigAhBasketReadyMeta");
const pushTrigAhBonusRow = document.getElementById("pushTrigAhBonusRow");
const pushTrigAhBonusToggle = document.getElementById("pushTrigAhBonusToggle");
const pushTrigAhBonusMeta = document.getElementById("pushTrigAhBonusMeta");
const homeAnnounceBadge = document.getElementById("homeAnnounceBadge");
const profileAnnounceBadge = document.getElementById("profileAnnounceBadge");
const brandHomeButtons = [...document.querySelectorAll("[data-home-link]")];
const importScreenForm = document.getElementById("importScreenForm");
const importScreenUrl = document.getElementById("importScreenUrl");
const importScreenFeedback = document.getElementById("importScreenFeedback");
const importScreenSubmit = document.getElementById("importScreenSubmit");
const reviewPreviewImage = document.getElementById("reviewPreviewImage");
const reviewPreviewMealTag = document.getElementById("reviewPreviewMealTag");
const reviewPreviewHost = document.getElementById("reviewPreviewHost");
const reviewForm = document.getElementById("reviewForm");
const reviewSummary = document.getElementById("reviewSummary");
const reviewInsights = document.getElementById("reviewInsights");
const reviewSuggestions = document.getElementById("reviewSuggestions");
const reviewDrafts = document.getElementById("reviewDrafts");
const reviewTitleInput = document.getElementById("reviewTitleInput");
const reviewDescriptionInput = document.getElementById("reviewDescriptionInput");
const reviewTimeInput = document.getElementById("reviewTimeInput");
const reviewServingsInput = document.getElementById("reviewServingsInput");
const reviewMealTagInput = document.getElementById("reviewMealTagInput");
const reviewIngredientsInput = document.getElementById("reviewIngredientsInput");
const reviewInstructionsInput = document.getElementById("reviewInstructionsInput");
const reviewFeedback = document.getElementById("reviewFeedback");
const importDraftsButton = document.getElementById("importDraftsButton");
const skipReviewButton = document.getElementById("skipReviewButton");
const servingsDown = document.getElementById("servingsDown");
const servingsUp = document.getElementById("servingsUp");
const authModal = document.getElementById("authModal");
const authKicker = document.getElementById("authKicker");
const authTitle = document.getElementById("authTitle");
const authForm = document.getElementById("authForm");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const submitAuthButton = document.getElementById("submitAuthButton");
const switchAuthModeButton = document.getElementById("switchAuthModeButton");
const authFeedback = document.getElementById("authFeedback");
const cookbookSaveModal = document.getElementById("cookbookSaveModal");
const cookbookSaveList = document.getElementById("cookbookSaveList");
const cookbookSaveRecipeTitle = document.getElementById("cookbookSaveRecipeTitle");
const cookbookSaveCreateButton = document.getElementById("cookbookSaveCreateButton");
const cookbookSaveConfirmButton = document.getElementById("cookbookSaveConfirmButton");
const cookbookNameModal = document.getElementById("cookbookNameModal");
const cookbookNameInput = document.getElementById("cookbookNameInput");
const cookbookNameSuggestionsPills = document.getElementById("cookbookNameSuggestionsPills");
const cookbookNameSuggestionsRefresh = document.getElementById("cookbookNameSuggestionsRefresh");
const cookbookOptionsSheet = document.getElementById("cookbookOptionsSheet");

function getSelectedRecipe() {
  return getRecipeById(state.selectedRecipeId) || state.recipes[0] || null;
}

function getFeaturedRecipe() {
  return state.recipes.find((recipe) => recipe.id === state.featuredRecipeId)
    || state.recipes.find((recipe) => recipe.id === HOME_FEATURED_RECIPE_ID)
    || state.recipes[0];
}

function getFavoriteRecipe() {
  const preferredCookbook = getCookbookById(state.selectedCookbookId);
  const preferredRecipeId = preferredCookbook?.recipeIds?.[0];
  if (preferredRecipeId) {
    const preferredRecipe = getRecipeById(preferredRecipeId);
    if (preferredRecipe) {
      return preferredRecipe;
    }
  }

  for (const cookbook of state.cookbooks) {
    const recipeId = cookbook.recipeIds?.[0];
    if (!recipeId) {
      continue;
    }
    const recipe = getRecipeById(recipeId);
    if (recipe) {
      return recipe;
    }
  }

  return null;
}

function getHomeFeaturedRecipe() {
  return getFavoriteRecipe() || getFeaturedRecipe();
}

function getRecipeById(recipeId) {
  const id = String(recipeId || "").trim();
  if (!id) return null;
  const real = state.recipes.find((recipe) => recipe.id === id) || null;
  if (real) return real;
  const preview = state.importPreviews ? state.importPreviews[id] : null;
  return preview || null;
}

function getCookbookById(cookbookId) {
  return state.cookbooks.find((cookbook) => cookbook.id === cookbookId) || state.cookbooks[0];
}

function isRecipeSaved(recipeId) {
  return state.cookbooks.some((cookbook) => cookbook.recipeIds.includes(recipeId));
}

function getCookbooksForRecipe(recipeId) {
  return state.cookbooks.filter((cookbook) => cookbook.recipeIds.includes(recipeId));
}

function normalizeRecipeProgressState(value) {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.entries(value).reduce((accumulator, [recipeId, progress]) => {
    if (!recipeId || !progress || typeof progress !== "object") {
      return accumulator;
    }

    const checkedIngredients = Array.isArray(progress.checkedIngredients)
      ? progress.checkedIngredients.map((item) => String(item || "").trim()).filter(Boolean)
      : [];
    const checkedSteps = Array.isArray(progress.checkedSteps)
      ? progress.checkedSteps.map((item) => String(item || "").trim()).filter(Boolean)
      : [];
    const currentStep = Number.isFinite(progress.currentStep) ? Math.max(0, Math.floor(progress.currentStep)) : 0;

    accumulator[recipeId] = {
      checkedIngredients,
      checkedSteps,
      currentStep,
      cookMode: Boolean(progress.cookMode),
    };
    return accumulator;
  }, {});
}

function getRecipeProgress(recipeId) {
  const cleanId = String(recipeId || "").trim();
  if (!cleanId) {
    return {
      checkedIngredients: [],
      checkedSteps: [],
      currentStep: 0,
      cookMode: false,
    };
  }

  if (!state.recipeProgress[cleanId]) {
    state.recipeProgress[cleanId] = {
      checkedIngredients: [],
      checkedSteps: [],
      currentStep: 0,
      cookMode: false,
    };
  }

  return state.recipeProgress[cleanId];
}

function getIngredientProgressKey(ingredient, index) {
  return `${index}:${normalizeIngredientKey(ingredient?.name || "ingredient")}`;
}

function isIngredientChecked(recipeId, ingredient, index) {
  const progress = getRecipeProgress(recipeId);
  return progress.checkedIngredients.includes(getIngredientProgressKey(ingredient, index));
}

function getStepProgressKey(stepIndex) {
  return `step:${Math.max(0, Math.floor(Number(stepIndex) || 0))}`;
}

function isStepChecked(recipeId, stepIndex) {
  const progress = getRecipeProgress(recipeId);
  return Array.isArray(progress.checkedSteps) && progress.checkedSteps.includes(getStepProgressKey(stepIndex));
}

function toggleStepChecked(recipeId, stepIndex) {
  const cleanId = String(recipeId || "").trim();
  if (!cleanId) return;
  const progress = getRecipeProgress(cleanId);
  const key = getStepProgressKey(stepIndex);
  const current = Array.isArray(progress.checkedSteps) ? progress.checkedSteps : [];
  progress.checkedSteps = current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
  schedulePersistAppState();
}

function getSourceHost(sourceUrl) {
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function getSourceIconUrl(sourceUrl) {
  const host = getSourceHost(sourceUrl);
  if (!host) {
    return "";
  }
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`;
}

function getSourceIconMarkup(recipe) {
  const host = getSourceHost(recipe.sourceUrl || "");
  const iconUrl = getSourceIconUrl(recipe.sourceUrl || "");
  const label = host || getPlatformLabel(recipe.platform || "website");
  return `
    <span class="source-favicon" aria-hidden="true">
      ${iconUrl ? `<img src="${iconUrl}" alt="" loading="lazy" />` : `<span>${label.slice(0, 1).toUpperCase()}</span>`}
    </span>
  `;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2800);
}

let confirmCallback = null;
let confirmAltCallback = null;
function showConfirm({ title, subtitle, confirmLabel = "Bevestigen", destructive = false, altLabel = "", onConfirm, onAlt }) {
  const sheet = document.getElementById("confirmSheet");
  const titleEl = document.getElementById("confirmSheetTitle");
  const subtitleEl = document.getElementById("confirmSheetSubtitle");
  const confirmBtn = document.getElementById("confirmSheetConfirmBtn");
  const altBtn = document.getElementById("confirmSheetAltBtn");
  if (!sheet) return;
  if (titleEl) titleEl.textContent = title || "";
  if (subtitleEl) subtitleEl.textContent = subtitle || "";
  if (confirmBtn) {
    confirmBtn.textContent = confirmLabel;
    confirmBtn.className = "confirm-sheet__btn confirm-sheet__btn--confirm" + (destructive ? " confirm-sheet__btn--destructive" : "");
  }
  if (altBtn) {
    const hasAlt = Boolean(String(altLabel || "").trim()) && typeof onAlt === "function";
    altBtn.textContent = String(altLabel || "").trim() || "Andere optie";
    altBtn.classList.toggle("hidden", !hasAlt);
  }
  confirmCallback = onConfirm || null;
  confirmAltCallback = typeof onAlt === "function" ? onAlt : null;
  sheet.classList.remove("hidden");
  document.getElementById("confirmSheetBackdrop")?.classList.remove("hidden");
}

// Backwards-compatible wrapper used by newer features.
function openConfirmDialog({ title, message, confirmLabel = "Bevestigen", cancelLabel = "Annuleren", onConfirm }) {
  void cancelLabel; // cancel handled by sheet cancel button
  const destructive = String(confirmLabel || "").toLowerCase().includes("verwijder");
  showConfirm({
    title,
    subtitle: message,
    confirmLabel,
    destructive,
    onConfirm,
  });
}
function closeConfirmSheet() {
  const sheet = document.getElementById("confirmSheet");
  sheet?.classList.add("hidden");
  document.getElementById("confirmSheetBackdrop")?.classList.add("hidden");
  confirmCallback = null;
  confirmAltCallback = null;
}

function showIosSetupModal() {
  const sheet = document.getElementById("iosSetupSheet");
  const backdrop = document.getElementById("iosSetupBackdrop");
  if (!sheet) return;
  sheet.classList.remove("hidden");
  backdrop?.classList.remove("hidden");
}

function closeIosSetupModal() {
  const sheet = document.getElementById("iosSetupSheet");
  const backdrop = document.getElementById("iosSetupBackdrop");
  sheet?.classList.add("hidden");
  backdrop?.classList.add("hidden");
}

function updateAuthUI() {
  if (!accountTitle || !accountCopy || !openRegisterButton || !openLoginButton || !logoutButton) {
    return;
  }
  const adminBtn = document.getElementById("adminDashboardBtn");
  const adminLeadDivider = document.getElementById("adminDashboardLeadDivider");
  const shouldShowAdmin = isAdmin();
  if (adminBtn) adminBtn.style.display = shouldShowAdmin ? "" : "none";
  if (adminLeadDivider) adminLeadDivider.style.display = shouldShowAdmin ? "" : "none";

  if (!state.auth.enabled) {
    accountTitle.textContent = "Account volgt zodra Postgres is gekoppeld";
    accountCopy.textContent = "De app werkt nu als guest. Voeg straks DATABASE_URL toe om echte login en synchronisatie te activeren.";
    openRegisterButton.classList.add("hidden");
    openLoginButton.classList.add("hidden");
    logoutButton.classList.add("hidden");
    return;
  }

  if (state.auth.authenticated) {
    accountTitle.textContent = `Ingelogd als ${state.profile.name}`;
    accountCopy.textContent = state.auth.email
      ? `Je account ${state.auth.email} synchroniseert nu recepten, kookboeken, planning en lijstjes.`
      : "Je account synchroniseert nu recepten, kookboeken, planning en lijstjes.";
    openRegisterButton.classList.add("hidden");
    openLoginButton.classList.add("hidden");
    logoutButton.classList.remove("hidden");
    return;
  }

  accountTitle.textContent = "Gebruik Plately op al je apparaten";
  accountCopy.textContent = "Maak een account aan of log in om recepten, kookboeken en lijstjes te synchroniseren.";
  openRegisterButton.classList.remove("hidden");
  openLoginButton.classList.remove("hidden");
  logoutButton.classList.add("hidden");
}

function openAuthModal(mode = "login") {
  console.log("🔐 Opening auth modal, mode:", mode, "authModal element:", authModal);
  state.auth.mode = mode;
  const isRegister = mode === "register";

  if (!authModal) {
    console.error("❌ authModal element not found!");
    return;
  }

  if (isRegister) {
    // Ensure registration never shows a previous user's transient photo.
    clearTransientProfilePhoto();
  }

  authModal.classList.remove("hidden");
  authModal.setAttribute("aria-hidden", "false");
  console.log("✅ Auth modal opened, hidden class:", authModal.classList.contains("hidden"));

  // Title and subtitle
  if (authKicker) authKicker.textContent = isRegister ? "Account aanmaken" : "Welkom terug";

  const subtitleEl = document.getElementById("authSubtitle");
  if (subtitleEl) subtitleEl.textContent = isRegister
    ? "Bewaar recepten, kookboeken en boodschappenlijsten in je account."
    : "Log in om je recepten en lijstjes te bekijken.";

  // Show/hide name field
  const nameField = document.getElementById("authNameField");
  if (nameField) nameField.style.display = isRegister ? "" : "none";

  // Show/hide forgot password button (only for login, not register)
  const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
  if (forgotPasswordBtn) forgotPasswordBtn.style.display = isRegister ? "none" : "";

  // Submit button text
  if (submitAuthButton) submitAuthButton.textContent = isRegister ? "Account aanmaken" : "Inloggen";

  // Switch button
  if (switchAuthModeButton) {
    switchAuthModeButton.innerHTML = isRegister
      ? 'Al een account? <strong>Inloggen</strong>'
      : 'Nog geen account? <strong>Account aanmaken</strong>';
  }

  // Clear feedback
  if (authFeedback) authFeedback.textContent = "";

  authForm.reset();
  // UX: In register mode, focus the name field first so users don't type their name into the email input.
  setTimeout(() => {
    if (isRegister) {
      document.getElementById("authName")?.focus();
      return;
    }
    authEmail?.focus();
  }, 100);
}

function closeAuthModal() {
  authModal.classList.add("hidden");
  authModal.setAttribute("aria-hidden", "true");
}

// Alias for backwards compatibility
const showAuthModal = openAuthModal;

// Password show/hide toggle
bindEvent(document.getElementById("authPasswordToggle"), "click", () => {
  const input = document.getElementById("authPassword");
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
});

bindEvent(document.getElementById("forgotPasswordBtn"), "click", (e) => {
  e.preventDefault();
  const authForm = document.querySelector(".auth-screen__form:not(#resetEmailForm)");
  const resetForm = document.getElementById("passwordResetForm");
  if (authForm) authForm.style.display = "none";
  if (resetForm) resetForm.classList.remove("hidden");
});

bindEvent(document.getElementById("resetFormBack"), "click", (e) => {
  e.preventDefault();
  const authForm = document.querySelector(".auth-screen__form:not(#resetEmailForm)");
  const resetForm = document.getElementById("passwordResetForm");
  if (authForm) authForm.style.display = "";
  if (resetForm) resetForm.classList.add("hidden");
  const resetFeedback = document.getElementById("resetFeedback");
  if (resetFeedback) resetFeedback.textContent = "";
});

bindEvent(document.getElementById("resetEmailForm"), "submit", async (e) => {
  e.preventDefault();
  const resetEmail = document.getElementById("resetEmail");
  const resetSubmitBtn = document.getElementById("resetSubmitBtn");
  const resetFeedback = document.getElementById("resetFeedback");

  if (!resetEmail || !resetSubmitBtn) return;

  const email = resetEmail.value.trim();
  if (!email) return;

  resetSubmitBtn.disabled = true;
  resetSubmitBtn.textContent = "Link wordt verstuurd...";
  if (resetFeedback) resetFeedback.textContent = "";

  try {
    const response = await fetch("/api/auth/request-password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.ok) {
      if (resetFeedback) resetFeedback.style.color = "#22c55e";
      if (resetFeedback) resetFeedback.textContent = "Check je e-mail voor een reset link.";
      resetEmail.value = "";
      setTimeout(() => {
        const authForm = document.querySelector(".auth-screen__form:not(#resetEmailForm)");
        const resetForm = document.getElementById("passwordResetForm");
        if (authForm) authForm.style.display = "";
        if (resetForm) resetForm.classList.add("hidden");
      }, 3000);
    } else {
      if (resetFeedback) resetFeedback.textContent = data.error || "Er is iets fout gegaan.";
    }
  } catch (error) {
    if (resetFeedback) resetFeedback.textContent = "Verbindingsfout. Probeer opnieuw.";
  } finally {
    resetSubmitBtn.disabled = false;
    resetSubmitBtn.textContent = "Reset link versturen";
  }
});

function getCookbookCoverMarkup(cookbook, baseClass = "cookbook-save-option__cover", extraClass = "") {
  const recipes = (cookbook?.recipeIds || [])
    .map((recipeId) => getRecipeById(recipeId))
    .filter(Boolean);
  const coverRecipes = recipes.slice(0, 4);

  if (!coverRecipes.length) {
    return `<span class="${baseClass} ${baseClass}--empty ${extraClass}" aria-hidden="true">＋</span>`;
  }

  if (coverRecipes.length === 1) {
    const recipe = coverRecipes[0];
    return `
      <span class="${baseClass} ${extraClass}" aria-hidden="true">
        <img src="${escapeHtml(recipe.image)}" alt="" loading="lazy" />
      </span>
    `;
  }

  return `
    <span class="${baseClass} ${baseClass}--grid ${extraClass}" aria-hidden="true">
      ${coverRecipes
        .map(
          (recipe) => `
            <img src="${escapeHtml(recipe.image)}" alt="" loading="lazy" />
          `
        )
        .join("")}
    </span>
  `;
}

function renderCookbookSaveList(recipeId = state.pendingCookbookSaveRecipeId) {
  if (!cookbookSaveList) {
    return;
  }

  const cookbooks = [...(state.cookbooks || [])];
  const preferredId = String(state.selectedCookbookId || "").trim();
  if (preferredId) {
    cookbooks.sort((a, b) => {
      if (a?.id === preferredId) return -1;
      if (b?.id === preferredId) return 1;
      return 0;
    });
  }

  cookbookSaveList.innerHTML = cookbooks
    .map((cookbook) => {
      const recipeCount = cookbook.recipeIds.length;
      const containsRecipe = cookbook.recipeIds.includes(recipeId);
      const isDefaultCookbook = cookbook.id === state.selectedCookbookId;
      const isSelected = cookbook.id === state.pendingCookbookSaveCookbookId;
      const meta = containsRecipe
        ? "Staat hier al in"
        : isDefaultCookbook
          ? `Standaard kookboek • ${recipeCount} recepten`
          : `${recipeCount} recepten`;

      return `
        <button
          class="cookbook-save-option ${isDefaultCookbook ? "is-default" : ""} ${isSelected ? "is-selected" : ""}"
          type="button"
          data-save-cookbook-id="${cookbook.id}"
          data-save-recipe-id="${escapeHtml(recipeId)}"
          role="option"
          aria-selected="${isSelected ? "true" : "false"}"
        >
          ${getCookbookCoverMarkup(cookbook, "cookbook-save-option__cover", "")}
          <span class="cookbook-save-option__copy">
            <strong>${escapeHtml(cookbook.name)}</strong>
            <span>${escapeHtml(meta)}</span>
          </span>
          <span class="cookbook-save-option__indicator" aria-hidden="true">
            ${isSelected ? "✓" : containsRecipe ? "✓" : isDefaultCookbook ? "★" : "+"}
          </span>
        </button>
      `;
    })
    .join("");
}

const COOKBOOK_NAME_SUGGESTION_POOL = [
  "Favorieten",
  "Snel & makkelijk",
  "Weekendkoken",
  "Bakken",
  "Vegetarisch",
  "Vegan",
  "Mealprep",
  "Budget",
  "30 minuten",
  "Airfryer",
  "Soepen",
  "Salades",
  "Pasta",
  "Rijst & noedels",
  "Kip",
  "Vis",
  "BBQ",
  "Ovenschotels",
  "Ontbijt",
  "Lunch",
  "Diner",
  "Desserts",
  "Hapjes",
  "Gezinsproof",
  "Feestdagen",
  "Zomer",
  "Winter",
  "Italiaans",
  "Aziatisch",
  "Mexicaans",
];

let cookbookNameSuggestionSalt = 0;
function renderCookbookNameSuggestions() {
  if (!cookbookNameSuggestionsPills) return;
  const seed = (Date.now() ^ ((++cookbookNameSuggestionSalt * 2654435761) >>> 0)) >>> 0;
  const rng = mulberry32(seed);
  const picks = pickUniqueRandom(COOKBOOK_NAME_SUGGESTION_POOL, 10, rng);
  cookbookNameSuggestionsPills.innerHTML = picks
    .map((label) => `<button class="onboarding-suggestion-pill" type="button" data-cookbook-name-suggest="${escapeHtml(label)}">${escapeHtml(label)}</button>`)
    .join("");
}

function syncCookbookSaveConfirmButton() {
  if (!cookbookSaveConfirmButton) return;
  const hasChoice = Boolean(state.pendingCookbookSaveCookbookId);
  cookbookSaveConfirmButton.disabled = !hasChoice;
  cookbookSaveConfirmButton.setAttribute("aria-disabled", hasChoice ? "false" : "true");
}

let cookbookSaveLastActiveElement = null;
let cookbookSaveFocusTrapHandler = null;

function enableCookbookSaveFocusTrap() {
  if (!cookbookSaveModal) return;
  cookbookSaveLastActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const focusables = cookbookSaveModal.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const first = focusables[0] instanceof HTMLElement ? focusables[0] : null;
  const last = focusables[focusables.length - 1] instanceof HTMLElement ? focusables[focusables.length - 1] : null;

  cookbookSaveFocusTrapHandler = (event) => {
    if (event.key !== "Tab" || cookbookSaveModal.classList.contains("hidden")) return;
    if (!first || !last) return;
    const active = document.activeElement;
    if (!(active instanceof HTMLElement)) return;
    if (event.shiftKey) {
      if (active === first || !cookbookSaveModal.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  document.addEventListener("keydown", cookbookSaveFocusTrapHandler);
  first?.focus();
}

function disableCookbookSaveFocusTrap() {
  if (cookbookSaveFocusTrapHandler) {
    document.removeEventListener("keydown", cookbookSaveFocusTrapHandler);
  }
  cookbookSaveFocusTrapHandler = null;
  const restore = cookbookSaveLastActiveElement;
  cookbookSaveLastActiveElement = null;
  restore?.focus?.();
}

function openCookbookSaveModal(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe || !cookbookSaveModal) {
    return;
  }

  state.pendingCookbookSaveRecipeId = recipe.id;
  state.pendingCookbookSaveCookbookId = state.selectedCookbookId || state.cookbooks?.[0]?.id || "";
  const isMoving = Boolean(state._moveFromCookbookId);
  if (cookbookSaveRecipeTitle) {
    cookbookSaveRecipeTitle.textContent = isMoving
      ? `${recipe.title} verplaatsen naar…`
      : `${recipe.title} opslaan in welk kookboek?`;
  }
  renderCookbookSaveList(recipe.id);
  syncCookbookSaveConfirmButton();
  cookbookSaveModal.classList.remove("hidden");
  cookbookSaveModal.setAttribute("aria-hidden", "false");
  enableCookbookSaveFocusTrap();
}

function closeCookbookSaveModal() {
  if (!cookbookSaveModal) {
    return;
  }

  cookbookSaveModal.classList.add("hidden");
  cookbookSaveModal.setAttribute("aria-hidden", "true");
  state._moveFromCookbookId = "";
  state.pendingCookbookSaveRecipeId = "";
  state.pendingCookbookSaveCookbookId = "";
  syncCookbookSaveConfirmButton();
  disableCookbookSaveFocusTrap();
}

function inferPlatformFromUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.replace(/^www\./, "");
    if (hostname.includes("tiktok.com")) {
      return "tiktok";
    }
    if (hostname.includes("instagram.com")) {
      return "instagram";
    }
    return "website";
  } catch {
    return null;
  }
}

function getPlatformLabel(platform) {
  return platform === "tiktok" ? "TikTok" : platform === "instagram" ? "Instagram" : "Website";
}

function toDutchMealTag(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "breakfast") return "Ontbijt";
  if (normalized === "lunch") return "Lunch";
  if (normalized === "dinner") return "Avond";
  if (normalized === "dessert") return "Dessert";
  if (normalized === "snack") return "Tussendoor";
  if (normalized === "brunch") return "Brunch";
  return value || "Avond";
}

function getPlatformPlaceholder(platform) {
  if (platform === "tiktok") {
    return "https://www.tiktok.com/@creator/video/123...";
  }
  if (platform === "instagram") {
    return "https://www.instagram.com/reel/abc123/";
  }
  return "https://example.com/recept/pasta-met-citroen";
}

function syncPlatformUI() {
  platformButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.platformChoice === state.selectedPlatform);
  });

  platformCards.forEach((button) => {
    button.classList.toggle("platform-card--active", button.dataset.platformChoice === state.selectedPlatform);
  });

  recipeUrlInput.placeholder = getPlatformPlaceholder(state.selectedPlatform);
  importScreenUrl.placeholder =
    state.selectedPlatform === "website"
      ? "Plak hier een receptwebsite..."
      : `Plak hier je ${getPlatformLabel(state.selectedPlatform)}-link...`;

  // Phase 1: Instagram UI improvements
  // Show/hide Instagram paste helper button
  const instagramPasteHelper = document.getElementById("instagramPasteHelper");
  if (instagramPasteHelper) {
    instagramPasteHelper.classList.toggle("hidden", state.selectedPlatform !== "instagram");
  }

  // Update feedback messages based on platform
  const feedbackTikTok = document.getElementById("feedbackTikTok");
  const feedbackInstagram = document.getElementById("feedbackInstagram");
  const feedbackWebsite = document.getElementById("feedbackWebsite");

  if (feedbackTikTok) feedbackTikTok.classList.toggle("hidden", state.selectedPlatform !== "tiktok");
  if (feedbackInstagram) feedbackInstagram.classList.toggle("hidden", state.selectedPlatform !== "instagram");
  if (feedbackWebsite) feedbackWebsite.classList.toggle("hidden", state.selectedPlatform !== "website");
}

function openModal(platform = state.selectedPlatform) {
  state.selectedPlatform = platform;
  syncPlatformUI();
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  recipeUrlInput.focus();
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  importFeedback.textContent =
    "De app roept nu een backend importer aan. TikTok werkt direct voor publieke posts, websites ook; Instagram vraagt om een Meta app-token.";
}

function getStoreConfig(storeSlug = "albert-heijn") {
  if (storeSlug === "jumbo") {
    return {
      slug: "jumbo",
      label: "Jumbo",
      kicker: "JUMBO MANDJE",
      loadingLabel: "Voorbereiden…",
      continueLabel: "Open Jumbo",
      directLabel: "Open Jumbo mandje",
      helperCopy: "We tonen je beste productmatches en sturen je daarna door naar Jumbo.",
      defaultUrl: "https://www.jumbo.com/mandje/",
    };
  }

  return {
    slug: "albert-heijn",
    label: "Albert Heijn",
    kicker: "ALBERT HEIJN LIJSTJE",
    loadingLabel: "Voorbereiden…",
    continueLabel: "Open Albert Heijn",
    directLabel: "Open Albert Heijn-lijst",
    helperCopy: "We tonen je beste productmatches. Waar mogelijk openen we direct je Albert Heijn-lijst.",
    defaultUrl: "https://www.ah.nl/mijnlijst/",
  };
}

function buildStoreSearchUrl(storeSlug, items) {
  const query = encodeURIComponent(
    (Array.isArray(items) ? items : [])
      .map((item) => String(item?.title || "").trim())
      .filter(Boolean)
      .join(" ")
  );

  if ((storeSlug || "albert-heijn") === "jumbo") {
    return `https://www.jumbo.com/zoeken/?searchTerms=${query}`;
  }

  return `https://www.ah.nl/zoeken?query=${query}`;
}

function closeBasketModal() {
  const overlay = document.getElementById("basketOverlay");
  if (overlay) {
    overlay.classList.add("hidden");
    overlay.hidden = true;
  }
  // Also dismiss the per-item alternatives sheet if it happens to be open.
  const altOverlay = document.getElementById("altOverlay");
  if (altOverlay && !altOverlay.hidden) {
    altOverlay.classList.add("hidden");
    altOverlay.hidden = true;
  }
  state.basketPreview = null;
  state.altSheetItemIndex = null;
  state.altSheetFilter = null;
}

function getBasketHandoffUrl(preview) {
  if (!preview) {
    return "";
  }
  const storeConfig = getStoreConfig(preview.store);
  return (
    preview.directUrl ||
    preview.fallbackUrl ||
    storeConfig.defaultUrl
  );
}

function splitCompoundIngredientWords(text) {
  const source = String(text || "");
  if (!source.trim()) return "";

  const stripDiacritics = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Small, intentionally conservative dictionary. We only split when a single
  // token exactly equals <base><suffix>.
  const BASE_WORDS = [
    "kipfilet",
    "kip",
    "rundergehakt",
    "gehakt",
    "varkensvlees",
    "spekjes",
    "parmezaan",
    "mozzarella",
    "cherrytomaat",
    "tomaat",
    "ui",
    "knoflook",
    "paprika",
    "komkommer",
    "cremefraiche",
    "crmefraiche",
    "slagroom",
    "kookroom",
    "boter",
    "olijfolie",
  ];

  const SUFFIX_WORDS = [
    "plakjes",
    "reepjes",
    "blokjes",
    "stukjes",
    "filets",
    "schijfjes",
    "ringen",
    "snippers",
    "groente",
    "groenten",
    "kaas",
    "saus",
    "mix",
  ];

  const baseByLengthDesc = [...BASE_WORDS].sort((a, b) => b.length - a.length);
  const suffixByLengthDesc = [...SUFFIX_WORDS].sort((a, b) => b.length - a.length);

  const splitToken = (token) => {
    if (!token || token.length <= 8) return token;
    if (token.includes(" ")) return token;
    if (!/^[\p{L}]+$/u.test(token)) return token;

    const normalized = stripDiacritics(token).toLowerCase();
    for (const base of baseByLengthDesc) {
      if (!normalized.startsWith(base)) continue;
      const rest = normalized.slice(base.length);
      if (!rest) continue;
      for (const suffix of suffixByLengthDesc) {
        if (rest !== suffix) continue;
        return `${token.slice(0, base.length)} ${token.slice(base.length)}`;
      }
    }
    return token;
  };

  return source
    .split(/\s+/)
    .filter(Boolean)
    .map(splitToken)
    .join(" ");
}

function normalizeBasketToken(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractBasketLabelsFromChoice(choice, item) {
  const raw = [
    choice?.title,
    choice?.subtitle,
    Array.isArray(choice?.labels) ? choice.labels.join(" ") : "",
    choice?.badge,
    choice?.searchTerm,
    item?.ingredientTitle,
    item?.ingredientAmount,
  ]
    .filter(Boolean)
    .join(" ");

  const text = normalizeBasketToken(raw);
  const flags = {
    bio: false,
    beterLeven1: false,
    vegetarisch: false,
    vegan: false,
    plantaardig: false,
  };

  // Best-effort heuristics (conservative). Prefer explicit label strings if present.
  if (/\b(biologisch|biologische|bio)\b/.test(text)) flags.bio = true;
  if (/\bbeter leven\b/.test(text) && /(\b1\b|\b1\s*ster\b|\b1\s*\*\b)/.test(text)) flags.beterLeven1 = true;
  if (/\bvegetari\w*\b|\bvega\b/.test(text)) flags.vegetarisch = true;
  if (/\bvegan\b/.test(text)) flags.vegan = true;
  if (/\bplantaardig\b|\bplant based\b|\bplantbased\b/.test(text)) flags.plantaardig = true;

  // Extra conservative hints for common plant-based staples (does not imply vegan).
  if (/\b(tofu|tempeh|seitan|kikkererwten|kikkererwt|linzen|soja|sojabonen)\b/.test(text)) {
    flags.plantaardig = true;
    flags.vegetarisch = true;
  }

  // Inherit hierarchy: vegan ⊂ vegetarian, vegan ⊂ plant-based (practical UX)
  if (flags.vegan) {
    flags.vegetarisch = true;
    flags.plantaardig = true;
  }

  return flags;
}

function getChoicePromotionLabel(choice) {
  const label = String(choice?.promotionLabel || "").trim();
  if (label) return label;
  return choice?.isBonus ? "BONUS" : "";
}

function formatEuro(value) {
  if (!Number.isFinite(Number(value))) return "";
  const euros = Number(value).toFixed(2).replace(".", ",");
  return `€${euros}`;
}

function getChoicePriceParts(choice) {
  const current = Number(choice?.currentPrice);
  const before = Number(choice?.priceBeforeBonus);
  const hasDiscount =
    Number.isFinite(current) &&
    Number.isFinite(before) &&
    current > 0 &&
    before > current;

  if (hasDiscount) {
    return { current: formatEuro(current), before: formatEuro(before) };
  }

  // Fall back to legacy formatted `choice.price` (string like "€2,49")
  const legacy = String(choice?.price || "").trim();
  return legacy ? { current: legacy, before: "" } : { current: "", before: "" };
}

function renderChoicePriceHtml(choice) {
  const parts = getChoicePriceParts(choice);
  if (!parts.current) return "";
  if (parts.before) {
    return `<span class="price-new">${escapeHtml(parts.current)}</span><span class="price-old">${escapeHtml(parts.before)}</span>`;
  }
  return `<span>${escapeHtml(parts.current)}</span>`;
}

function choiceMatchesBasketFilters(choice, filter, item) {
  const labels = extractBasketLabelsFromChoice(choice, item);
  if (filter?.beterLeven1 && !labels.beterLeven1) return false;
  if (filter?.vegetarisch && !labels.vegetarisch) return false;
  if (filter?.vegan && !labels.vegan) return false;
  if (filter?.plantaardig && !labels.plantaardig) return false;
  return true;
}

function getBasketItemCategory(item, choice) {
  const text = normalizeBasketToken([
    item?.ingredientTitle,
    item?.ingredientAmount,
    choice?.title,
    choice?.subtitle,
  ].filter(Boolean).join(" "));
  const groups = [
    { key: "produce", label: "Groente & fruit", terms: ["aardappel", "appel", "avocado", "banaan", "bloemkool", "bosui", "champignon", "citroen", "courgette", "fruit", "groente", "komkommer", "knoflook", "limoen", "paprika", "prei", "rucola", "sla", "spinazie", "tomaat", "ui", "wortel"] },
    { key: "meat", label: "Vlees, vis & vega", terms: ["bacon", "gehakt", "ham", "kip", "kabeljauw", "rookworst", "spek", "tonijn", "vega", "vegan", "vis", "vlees", "worst", "zalm"] },
    { key: "dairy", label: "Zuivel & kaas", terms: ["boter", "creme", "crème", "ei", "eieren", "kaas", "kwark", "melk", "mozzarella", "room", "slagroom", "yoghurt", "zuivel"] },
    { key: "bakery", label: "Brood & granen", terms: ["brood", "wrap", "tortilla", "pasta", "rijst", "noedel", "couscous", "bloem", "paneermeel", "havermout"] },
    { key: "pantry", label: "Voorraadkast", terms: ["azijn", "bouillon", "honing", "ketchup", "mayonaise", "mosterd", "olie", "saus", "soja", "suiker", "tomatenpuree", "peper", "zout", "kruiden", "paprikapoeder"] },
    { key: "frozen", label: "Diepvries", terms: ["diepvries", "bevroren", "vriesvers"] },
    { key: "drinks", label: "Drinken", terms: ["sap", "water", "wijn", "bier", "frisdrank", "drank"] },
  ];
  const hit = groups.find((group) => group.terms.some((term) => text.includes(term)));
  return hit || { key: "other", label: "Overig" };
}

function getBasketMatchQuality(choice) {
  const score = Number(choice?.matchMeta?.score);
  if (!Number.isFinite(score)) return "unknown";
  return score > 45 ? "low" : "good";
}

function renderBasketPreview() {
  const preview = state.basketPreview;
  const nameEl = document.getElementById("basketRecipeName");
  const listEl = document.getElementById("basketSheetList");
  const totalEl = document.getElementById("basketSheetTotal");
  const ctaBtn = document.getElementById("basketSheetCta");
  const trustEl = document.getElementById("basketSheetTrust");
  if (!preview || !listEl) return;

  if (nameEl) nameEl.textContent = preview.recipeTitle || "Boodschappenlijst";

  if (trustEl) {
    trustEl.textContent =
      preview.store === "albert-heijn"
        ? "Elk product komt uit de AH-zoek-API als voorstel. Controleer rood gemarkeerde regels (‘Even controleren’); het totaal is een indicatie vóór je naar ah.nl gaat."
        : "Supermarktkoppeling zoekt automatisch; controleer de matches en hoeveelheden vóór je afrekent.";
  }

  // Optional/pantry items ("in huis"): informational only and do not include them
  // in the store basket URL/payload.
  const basketRecipe = state.selectedRecipeId ? getRecipeById(state.selectedRecipeId) : null;
  const pantryQtyMap = (state.selectedRecipeId && state.basketOptionalQtyByRecipe?.[state.selectedRecipeId])
    ? state.basketOptionalQtyByRecipe[state.selectedRecipeId]
    : {};
  const pantryAddedForRecipe = new Set(
    Object.entries(pantryQtyMap || {})
      .filter(([, qty]) => (Number(qty) || 0) > 0)
      .map(([k]) => String(k || ""))
      .filter(Boolean)
  );
  const existingPantryKeys = new Set(
    (Array.isArray(preview.items) ? preview.items : [])
      .map((i) => normalizeIngredientKey(i?.ingredientTitle || ""))
      .filter(Boolean)
  );
  pantryAddedForRecipe.forEach((k) => existingPantryKeys.add(k));
  const pantryOptional = getPantryOptionalSuggestionsForRecipe(basketRecipe, existingPantryKeys);
  const pantryOptionalHtml = pantryOptional.length
    ? `
        <section class="grocery-group grocery-group--smart">
          <div class="grocery-group__header grocery-group__header--shared">
            <h2>Dit heb je waarschijnlijk in huis</h2>
          </div>
          ${pantryOptional
            .map((s) => `
              <div class="basket-product" data-basket-pantry="1">
                <div class="basket-product__img-wrap">
                  <span class="basket-product__img basket-product__img--placeholder" aria-hidden="true">${escapeHtml(s.icon || "🏠")}</span>
                </div>
                <div class="basket-product__info">
                  <p class="basket-product__name">${escapeHtml(s.title)}</p>
                  <p class="basket-product__meta">
                    <span class="basket-product__partner">IN HUIS</span>
                    <span>optioneel</span>
                  </p>
                  <p class="basket-product__for">Niet toegevoegd aan AH</p>
                </div>
                <div class="basket-product__right">
                  <div class="basket-product__qty">
                    <button class="basket-qty-btn basket-qty-btn--minus" type="button" data-basket-pantry-qty-minus="${escapeHtml(s.title)}" aria-label="Minder" disabled>−</button>
                    <span class="basket-product__qty-num">0</span>
                    <button class="basket-qty-btn basket-qty-btn--plus" type="button" data-basket-pantry-qty-plus="${escapeHtml(s.title)}" aria-label="Meer">+</button>
                  </div>
                </div>
              </div>
            `)
            .join("")}
        </section>
      `
    : "";

  // Update servings label
  const servLabel = document.getElementById("basketServingsLabel");
  if (servLabel) {
    const noun = state.basketServings === 1 ? "persoon" : "personen";
    servLabel.textContent = `${state.basketServings} ${noun}`;
  }

  // Update bio chip active state (only filter shown in basket sheet)
  document.getElementById("basketFilterBio")?.classList.toggle("is-active", state.basketFilter.bio);

  let totalCents = 0;
  const servScale = state.basketBaseServings > 0
    ? state.basketServings / state.basketBaseServings
    : 1;

  const activeFilter = state.basketFilter || {};

  const renderedItems = preview.items.map((item, itemIndex) => {
    const choices = Array.isArray(item.choices) ? item.choices : [];
    if (!choices.length) return null;

    // When filters/search are active: pick the first matching alternative choice.
    const hasDietFilter =
      Boolean(activeFilter.beterLeven1 || activeFilter.vegetarisch || activeFilter.vegan || activeFilter.plantaardig);
    const hasSearch = false;

    let pickedIndex = item.selectedChoiceIndex || 0;
    if (hasDietFilter || hasSearch) {
      const matchIdx = choices.findIndex((c) => choiceMatchesBasketFilters(c, activeFilter, item));
      // If no match found, keep the first/selected choice instead of hiding the item.
      if (matchIdx !== -1) pickedIndex = matchIdx;
    }
    // Clamp in case the choice list shrank after a refetch.
    if (pickedIndex < 0 || pickedIndex >= choices.length) pickedIndex = 0;

    const choice = choices[pickedIndex];
    if (!choice) return null;

    const priceNum = parseFloat((choice.price || "0").replace("€", "").replace(",", ".")) || 0;
    const qty = Math.max(1, Math.round((item.qty || 1) * servScale));
    totalCents += Math.round(priceNum * qty * 100);

    const img = choice.imageUrl
      ? `<img class="basket-product__img" src="${escapeHtml(choice.imageUrl)}" alt="" loading="lazy" />`
      : `<span class="basket-product__img basket-product__img--placeholder">${escapeHtml(choice.emoji || "🛒")}</span>`;

    const altCount = (item.choices || []).length;

    const bioActive = state.basketFilter.bio;
    const isBioChoice = Boolean(extractBasketLabelsFromChoice(choice, item).bio);
    const displayTitle = bioActive && isBioChoice
      ? `🌱 Biologisch ${choice.title}`
      : choice.title;
    const promotionLabel = getChoicePromotionLabel(choice);
    const promotionBadge = promotionLabel
      ? `<span class="basket-product__bonus">${escapeHtml(promotionLabel)}</span>`
      : "";

    const ingredientTitle = splitCompoundIngredientWords(item.ingredientTitle || "");
    const itemId = String(item.id || `basket-item-${itemIndex}`);

    const category = getBasketItemCategory(item, choice);
    const matchQuality = getBasketMatchQuality(choice);
    const matchBadge = matchQuality === "low"
      ? `<span class="basket-product__attention">Check match</span>`
      : "";
    const aisleBadge = `<span class="basket-product__aisle">${escapeHtml(category.label)}</span>`;

    const html = `
      <div class="basket-product ${matchQuality === "low" ? "basket-product--attention" : ""}" data-basket-item="${itemIndex}">
        <div class="basket-product__img-wrap">
          ${img}
        </div>
        <div class="basket-product__info">
          <p class="basket-product__name">${escapeHtml(displayTitle)}</p>
          <p class="basket-product__meta">
            ${renderChoicePriceHtml(choice)}
            ${promotionBadge}
            ${aisleBadge}
            ${matchBadge}
            ${choice.subtitle ? `<span>${escapeHtml(choice.subtitle)}</span>` : ""}
          </p>
          <p class="basket-product__for">voor ${escapeHtml(item.ingredientAmount || "")} ${escapeHtml(ingredientTitle)}</p>
          ${altCount > 1 ? `<button class="basket-product__wissel" type="button" data-basket-wissel="${itemIndex}" onclick="openAlternativesSheet(${itemIndex}); return false;">
            ${WISSEL_SVG}
            Wissel
          </button>` : ""}
        </div>
        <div class="basket-product__right">
          <button class="basket-product__delete" type="button" aria-label="Verwijder" data-basket-delete="${itemIndex}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
          </button>
          <div class="basket-product__qty">
            <button class="basket-qty-btn basket-qty-btn--minus" type="button" data-basket-qty-minus="${itemIndex}">−</button>
            <span class="basket-product__qty-num" id="basket-qty-${itemIndex}">${qty}</span>
            <button class="basket-qty-btn basket-qty-btn--plus" type="button" data-basket-qty-plus="${itemIndex}">+</button>
          </div>
        </div>
      </div>
    `;
    return { html, category, matchQuality };
  }).filter(Boolean);

  const attentionItems = renderedItems.filter((entry) => entry.matchQuality === "low");
  const regularItems = renderedItems.filter((entry) => entry.matchQuality !== "low");
  const categoryOrder = ["produce", "meat", "dairy", "bakery", "pantry", "frozen", "drinks", "other"];
  const grouped = new Map();
  regularItems.forEach((entry) => {
    const key = entry.category.key;
    if (!grouped.has(key)) grouped.set(key, { label: entry.category.label, items: [] });
    grouped.get(key).items.push(entry.html);
  });

  const sectionHtml = [];
  if (attentionItems.length) {
    sectionHtml.push(`
      <section class="basket-section basket-section--attention">
        <div class="basket-section__head">
          <h3>Even controleren</h3>
          <span>${attentionItems.length}</span>
        </div>
        <div class="basket-section__list">${attentionItems.map((entry) => entry.html).join("")}</div>
      </section>
    `);
  }
  categoryOrder.forEach((key) => {
    const group = grouped.get(key);
    if (!group?.items?.length) return;
    sectionHtml.push(`
      <section class="basket-section">
        <div class="basket-section__head">
          <h3>${escapeHtml(group.label)}</h3>
          <span>${group.items.length}</span>
        </div>
        <div class="basket-section__list">${group.items.join("")}</div>
      </section>
    `);
  });

  const productsHtml = sectionHtml.join("") || `<p style="text-align:center;padding:26px 18px;color:#888;font-size:0.95rem">Geen producten gevonden.</p>`;
  listEl.innerHTML = `${productsHtml}${pantryOptionalHtml}`;

  // Calculate total
  const totalEur = (totalCents / 100).toFixed(2).replace(".", ",");
  if (totalEl) totalEl.textContent = `€ ${totalEur}`;

  // CTA button
  if (ctaBtn) {
    ctaBtn.onclick = () => {
      const url = preview.directUrl || preview.fallbackUrl || "";
      if (url) window.open(url, "_blank", "noreferrer");
    };
  }
}

async function researchBasketItem(itemIndex, { excludeCurrent = true } = {}) {
  const preview = state.basketPreview;
  if (!preview || preview.store !== "albert-heijn") return;
  const item = preview.items?.[itemIndex];
  if (!item) return;
  const currentChoice = item.choices?.[item.selectedChoiceIndex || 0];
  const exclude = [];
  if (excludeCurrent && currentChoice?.productId) exclude.push(currentChoice.productId);
  try {
    const payload = await fetchJson(`${state.apiBase}/api/ah-research`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredientTitle: item.ingredientTitle,
        amount: item.ingredientAmount,
        bio: Boolean(state.basketFilter?.bio),
        beterLeven1: Boolean(state.basketFilter?.beterLeven1),
        vegetarisch: Boolean(state.basketFilter?.vegetarisch),
        vegan: Boolean(state.basketFilter?.vegan),
        plantaardig: Boolean(state.basketFilter?.plantaardig),
        excludeProductIds: exclude,
      }),
    });
    if (payload?.choices?.length) {
      item.choices = payload.choices;
      item.selectedChoiceIndex = 0;
      trackClientEvent("client_ah_research", {
        choiceCount: payload.choices.length,
        exclude: exclude.length,
      });
      renderBasketPreview();
    } else {
      showToast("Geen betere match gevonden.");
    }
  } catch {
    showToast("Herzoeken lukte niet.");
  }
}

function pickBestChoiceIndexByScore(item) {
  const choices = Array.isArray(item?.choices) ? item.choices : [];
  if (!choices.length) return 0;
  let bestIdx = 0;
  let bestScore = Infinity;
  for (let i = 0; i < choices.length; i++) {
    const s = choices[i]?.matchMeta?.score;
    if (!Number.isFinite(s)) continue;
    if (s < bestScore) {
      bestScore = s;
      bestIdx = i;
    }
  }
  return bestIdx;
}

function parseChoicePriceNumber(choice) {
  const current = Number(choice?.currentPrice);
  if (Number.isFinite(current) && current > 0) return current;
  const legacy = String(choice?.price || "").trim();
  if (!legacy) return Number.POSITIVE_INFINITY;
  const num = parseFloat(
    legacy
      .replace(/[^\d,.\-]+/g, "")
      .replace(/\.(?=\d{3}\b)/g, "")
      .replace(",", ".")
  );
  return Number.isFinite(num) && num > 0 ? num : Number.POSITIVE_INFINITY;
}

function pickCheapestChoiceIndex(item) {
  const choices = Array.isArray(item?.choices) ? item.choices : [];
  if (!choices.length) return 0;
  let bestIdx = 0;
  let bestPrice = Number.POSITIVE_INFINITY;
  for (let i = 0; i < choices.length; i++) {
    const p = parseChoicePriceNumber(choices[i]);
    if (p < bestPrice) {
      bestPrice = p;
      bestIdx = i;
    }
  }
  return bestIdx;
}

function pickPreferredChoiceIndex(item, predicate) {
  const choices = Array.isArray(item?.choices) ? item.choices : [];
  if (!choices.length) return 0;
  const currentIdx = item?.selectedChoiceIndex || 0;
  const current = choices[currentIdx];
  if (current && predicate(current, item)) return currentIdx;
  let bestIdx = null;
  let bestPrice = Number.POSITIVE_INFINITY;
  for (let i = 0; i < choices.length; i++) {
    const c = choices[i];
    if (!c) continue;
    if (!predicate(c, item)) continue;
    const p = parseChoicePriceNumber(c);
    if (p < bestPrice) {
      bestPrice = p;
      bestIdx = i;
    }
  }
  return bestIdx ?? currentIdx;
}

async function ensureBasketChoicesLoaded(itemIndexes) {
  const preview = state.basketPreview;
  if (!preview || preview.store !== "albert-heijn") return;
  const items = Array.isArray(preview.items) ? preview.items : [];
  const idxs = Array.isArray(itemIndexes) ? itemIndexes.filter((i) => Number.isInteger(i)) : [];
  if (!idxs.length) return;

  const missing = idxs
    .map((idx) => ({ idx, item: items[idx] }))
    .filter(({ item }) => item && (!Array.isArray(item.choices) || item.choices.length === 0));

  if (!missing.length) return;

  const activeItems = getActiveGroceryItems();
  const sourceUrl = preview.sourceUrl || getSingleRecipeContext(activeItems)?.sourceUrl || "";
  const recipeTitle = preview.recipeTitle || getSingleRecipeContext(activeItems)?.recipeTitle || "Boodschappenlijst";

  try {
    const payload = await fetchJson(`${state.apiBase}/api/store-basket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        store: "albert-heijn",
        sourceUrl,
        recipeTitle,
        bio: Boolean(state.basketFilter?.bio),
        beterLeven1: Boolean(state.basketFilter?.beterLeven1),
        vegetarisch: Boolean(state.basketFilter?.vegetarisch),
        vegan: Boolean(state.basketFilter?.vegan),
        plantaardig: Boolean(state.basketFilter?.plantaardig),
        items: missing.map(({ item }) => ({
          title: item.ingredientTitle,
          amount: item.ingredientAmount || "1",
          recipeTitle: item.recipeTitle || "",
        })),
      }),
    });

    const fetched = Array.isArray(payload?.items) ? payload.items : [];
    if (!fetched.length) return;

    const keyOf = (s) => normalizeBasketToken(s || "");
    const fetchedByKey = new Map(fetched.map((it) => [keyOf(it?.ingredientTitle), it]));
    for (const { idx, item } of missing) {
      const hit = fetchedByKey.get(keyOf(item?.ingredientTitle));
      if (hit?.choices?.length) {
        item.choices = hit.choices;
        item.selectedChoiceIndex = Number.isInteger(item.selectedChoiceIndex) ? item.selectedChoiceIndex : 0;
      }
    }
  } catch {
    // ignore (bulk actions will operate on whatever data exists)
  }
}

async function applyBasketBulkOptimization(mode) {
  const preview = state.basketPreview;
  if (!preview || preview.store !== "albert-heijn") return;
  const items = Array.isArray(preview.items) ? preview.items : [];
  if (!items.length) return;

  const idxs = items.map((_, i) => i);
  await ensureBasketChoicesLoaded(idxs);

  let changed = 0;
  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx];
    if (!item) continue;
    const currentIdx = item.selectedChoiceIndex || 0;
    const choices = Array.isArray(item.choices) ? item.choices : [];
    if (!choices.length) continue;

    let nextIdx = currentIdx;
    if (mode === "cheapest") {
      nextIdx = pickCheapestChoiceIndex(item);
    } else if (mode === "bonus") {
      nextIdx = pickPreferredChoiceIndex(item, (choice) => Boolean(getChoicePromotionLabel(choice)));
    } else if (mode === "bio") {
      nextIdx = pickPreferredChoiceIndex(item, (choice, it) => Boolean(extractBasketLabelsFromChoice(choice, it).bio));
    }

    if (Number.isInteger(nextIdx) && nextIdx !== currentIdx) {
      item.selectedChoiceIndex = nextIdx;
      changed += 1;
    }
  }

  renderBasketPreview();

  if (mode === "cheapest") showToast(changed ? "Goedkoopste keuzes geselecteerd." : "Alles stond al op goedkoopste.");
  if (mode === "bonus") showToast(changed ? "BONUS keuzes geselecteerd." : "Geen BONUS alternatieven gevonden.");
  if (mode === "bio") showToast(changed ? "Bio keuzes geselecteerd." : "Geen bio alternatieven gevonden.");
}

async function smartPickLowConfidence() {
  const preview = state.basketPreview;
  if (!preview || preview.store !== "albert-heijn") return;
  const items = Array.isArray(preview.items) ? preview.items : [];
  let changed = 0;
  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx];
    const current = item?.choices?.[item.selectedChoiceIndex || 0];
    const currentScore = current?.matchMeta?.score;
    const isLow = !Number.isFinite(currentScore) || Number(currentScore) > 45;
    if (!isLow) continue;
    const bestIdx = pickBestChoiceIndexByScore(item);
    if (bestIdx !== (item.selectedChoiceIndex || 0)) {
      item.selectedChoiceIndex = bestIdx;
      changed += 1;
      continue;
    }
    await researchBasketItem(idx, { excludeCurrent: true });
    changed += 1;
  }
  renderBasketPreview();
  showToast(changed ? "Lage matches opnieuw gezocht." : "Alles ziet er al goed uit.");
}

async function fetchSingleBasketItemMatch(store, title, preferences) {
  const cleanTitle = String(title || "").trim();
  if (!cleanTitle) return null;
  const payload = await fetchJson(`${state.apiBase}/api/store-basket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      store,
      recipeTitle: state.basketPreview?.recipeTitle || "Boodschappenlijst",
      sourceUrl: state.basketPreview?.sourceUrl || "",
      bio: Boolean(preferences?.bio),
      beterLeven1: Boolean(preferences?.beterLeven1),
      vegetarisch: Boolean(preferences?.vegetarisch),
      vegan: Boolean(preferences?.vegan),
      plantaardig: Boolean(preferences?.plantaardig),
      items: [{ title: cleanTitle, amount: "1", recipeTitle: state.basketPreview?.recipeTitle || "" }],
    }),
  }).catch(() => null);
  const item = payload?.items?.[0] || null;
  return item && item.choices ? item : null;
}

async function setOptionalPantryQty(title, nextQty) {
  const preview = state.basketPreview;
  const recipe = state.selectedRecipeId ? getRecipeById(state.selectedRecipeId) : null;
  if (!preview || !recipe) {
    showToast("Kies eerst een recept.");
    return;
  }

  const cleanTitle = String(title || "").trim();
  const key = normalizeIngredientKey(cleanTitle);
  if (!key) return;

  const clamped = Math.max(0, Number(nextQty) || 0);

  const currentRecipeMap = (state.basketOptionalQtyByRecipe?.[recipe.id] && typeof state.basketOptionalQtyByRecipe[recipe.id] === "object")
    ? state.basketOptionalQtyByRecipe[recipe.id]
    : {};

  state.basketOptionalQtyByRecipe = {
    ...(state.basketOptionalQtyByRecipe || {}),
    [recipe.id]: {
      ...currentRecipeMap,
      [key]: clamped,
    },
  };

  // If qty is 0: remove from the main basket list (if present)
  if (clamped === 0) {
    const items = Array.isArray(preview.items) ? preview.items : [];
    const idx = items.findIndex((it) => normalizeIngredientKey(it?.ingredientTitle || "") === key);
    if (idx !== -1) {
      items.splice(idx, 1);
    }
    schedulePersistAppState();
    renderBasketPreview();
    return;
  }

  // Qty > 0: ensure it exists in main basket list with matching products.
  const items = Array.isArray(preview.items) ? preview.items : (preview.items = []);
  const existing = items.find((it) => normalizeIngredientKey(it?.ingredientTitle || "") === key) || null;
  if (existing) {
    existing.qty = clamped;
    schedulePersistAppState();
    renderBasketPreview();
    return;
  }

  // Immediate single-ingredient match, no full basket refetch.
  const match = await fetchSingleBasketItemMatch(preview.store, cleanTitle, state.basketFilter || {});
  if (!match) {
    showToast("Geen match gevonden voor dit item.");
    // Roll back qty so it stays optional
    state.basketOptionalQtyByRecipe = {
      ...(state.basketOptionalQtyByRecipe || {}),
      [recipe.id]: {
        ...currentRecipeMap,
        [key]: 0,
      },
    };
    schedulePersistAppState();
    renderBasketPreview();
    return;
  }

  match.qty = clamped;
  match.id = `basket-item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  items.push(match);
  schedulePersistAppState();
  renderBasketPreview();
}

function openBasketModal(preview) {
  state.basketPreview = preview;
  // Derive base servings from the recipe that was active when basket was built
  const recipe = state.selectedRecipeId ? getRecipeById(state.selectedRecipeId) : null;
  const base = recipe ? parseBaseServings(recipe.servings) : 2;
  state.basketBaseServings = base;
  // Lijn mand-personen af op gekozen porties op recept (indien van toepassing)
  const aligned = recipe
    ? Math.min(20, Math.max(1, Math.round(Number(state.currentServings) || base)))
    : base;
  state.basketServings = aligned;
  state.basketFilter = { bio: false, beterLeven1: false, vegetarisch: false, vegan: false, plantaardig: false };
  const smartBtn = document.getElementById("basketSmartPickButton");
  if (smartBtn) smartBtn.style.display = preview?.store === "albert-heijn" ? "" : "none";
  renderBasketPreview();
  const overlay = document.getElementById("basketOverlay");
  if (overlay) {
    overlay.hidden = false;
    overlay.classList.remove("hidden");
  }
}

// ── Alternatives sheet ("Kies een alternatief") ─────────────────────────────
//
// Opens a full-screen sheet over the basket overlay listing alternative
// products for one basket item, grouped by Meest voordelig / Biologisch /
// Beter Leven 1 ster / Vegetarisch / Vegan / Plantaardig / Meer alternatieven.
// Each product appears once, in the highest-priority section it qualifies for.
// Tapping "Kies" updates the basket item's selectedChoiceIndex and returns
// to the basket sheet.

const ALT_SECTIONS = [
  { id: "cheapest", title: "Meest voordelig" },
  { id: "biologisch", title: "Biologisch" },
  { id: "beterLeven1", title: "Beter Leven 1 ster" },
  { id: "vegetarisch", title: "Vegetarisch" },
  { id: "vegan", title: "Vegan" },
  { id: "plantaardig", title: "Plantaardig" },
  { id: "more", title: "Meer alternatieven" },
];

const ALT_FILTER_CHIPS = [
  { id: null, label: "Alles", subtle: true },
  { id: "beterLeven1", label: "Beter Leven 1 ster" },
  { id: "vegetarisch", label: "Vegetarisch" },
  { id: "vegan", label: "Vegan" },
  { id: "plantaardig", label: "Plantaardig" },
  { id: "more", label: "Meer alternatieven" },
];

const ALT_BADGE_PRIORITY = ["bio", "beterLeven1", "vegan", "vegetarisch", "plantaardig"];

function normalizeAltLabelToken(token) {
  const t = String(token || "").toLowerCase().trim();
  if (!t) return null;
  if (t === "bio" || t === "biologisch" || t === "biologische") return "bio";
  if (t === "beterleven1" || t === "beter leven 1" || t === "beter leven 1 ster" || t === "beter leven") return "beterLeven1";
  if (t === "vegan") return "vegan";
  if (t === "vegetarisch" || t === "vegetarische" || t === "vega") return "vegetarisch";
  if (t === "plantaardig" || t === "plant based" || t === "plantbased") return "plantaardig";
  return null;
}

function getAlternativeLabelKeys(choice, item) {
  // Prefer server-provided `choice.labels` (also used by grouped alternative searches).
  const tokens = Array.isArray(choice?.labels) && choice.labels.length
    ? choice.labels
    : (() => {
        const flags = extractBasketLabelsFromChoice(choice, item);
        return Object.entries(flags).filter(([, v]) => Boolean(v)).map(([k]) => k);
      })();

  const set = new Set();
  for (const tok of tokens) {
    const key = normalizeAltLabelToken(tok);
    if (key) set.add(key);
  }
  return set;
}

function formatAltBadgeLabel(key) {
  if (key === "bio") return "Bio";
  if (key === "beterLeven1") return "Beter Leven 1 ster";
  if (key === "vegan") return "Vegan";
  if (key === "vegetarisch") return "Vegetarisch";
  if (key === "plantaardig") return "Plantaardig";
  if (key === "cheapest") return "Meest voordelig";
  return "";
}

function renderAltBadges(choice, item, { showCheapest = false, forceKeys = [] } = {}) {
  const keys = getAlternativeLabelKeys(choice, item);
  for (const fk of forceKeys) {
    const k = normalizeAltLabelToken(fk);
    if (k) keys.add(k);
  }
  const primary = ALT_BADGE_PRIORITY.filter((k) => keys.has(k)).slice(0, 2);
  const promotionLabel = getChoicePromotionLabel(choice);
  const badges = [
    ...(promotionLabel ? [{ key: "bonus", label: promotionLabel }] : []),
    ...primary.map((k) => ({ key: k, label: formatAltBadgeLabel(k) })),
    ...(showCheapest ? [{ key: "cheapest", label: formatAltBadgeLabel("cheapest") }] : []),
  ].filter((b) => b.label);

  if (!badges.length) return "";
  return `
    <div class="alt-card__badges" aria-label="Product labels">
      ${badges.map((b) => `<span class="alt-badge alt-badge--${escapeHtml(b.key)}">${escapeHtml(b.label)}</span>`).join("")}
    </div>
  `;
}

function classifyAlternative(choice, item) {
  const flags = extractBasketLabelsFromChoice(choice, item);
  if (flags.bio) return "biologisch";
  if (flags.beterLeven1) return "beterLeven1";
  if (flags.vegan) return "vegan";
  if (flags.vegetarisch) return "vegetarisch";
  if (flags.plantaardig) return "plantaardig";
  return "more";
}

function renderAlternativesSheet(item) {
  const listEl = document.getElementById("altOverlayList");
  const ctxEl = document.getElementById("altOverlayContext");
  const chipsEl = document.getElementById("altOverlayChips");
  if (!listEl) return;

  const rawChoices = Array.isArray(item?.choices) ? item.choices.slice() : [];
  const choices = (() => {
    const seen = new Set();
    const out = [];
    for (const c of rawChoices) {
      if (!c) continue;
      const key =
        c.productId ||
        c.id ||
        c.url ||
        [c.title || "", c.imageUrl || "", c.subtitle || ""].join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(c);
    }
    return out;
  })();

  // Determine which filter chips have any matching products for this item.
  const chipAvailability = (() => {
    const counts = { beterLeven1: 0, vegetarisch: 0, vegan: 0, plantaardig: 0, more: 0 };
    for (const c of choices) {
      const flags = extractBasketLabelsFromChoice(c, item);
      if (flags.beterLeven1) counts.beterLeven1 += 1;
      if (flags.vegetarisch) counts.vegetarisch += 1;
      if (flags.vegan) counts.vegan += 1;
      if (flags.plantaardig) counts.plantaardig += 1;
      const anyLabeled = Boolean(flags.bio || flags.beterLeven1 || flags.vegetarisch || flags.vegan || flags.plantaardig);
      if (!anyLabeled) counts.more += 1;
    }
    return counts;
  })();

  if (chipsEl) {
    const active = state.altSheetFilter ?? null;
    const visibleChips = ALT_FILTER_CHIPS.filter((chip) => {
      if (chip.id === null) return true; // "Alles" always visible
      return (chipAvailability[chip.id] || 0) > 0;
    });
    // If the currently active chip has no matches, fall back to grouped view.
    if (active && (chipAvailability[active] || 0) === 0) {
      state.altSheetFilter = null;
    }
    chipsEl.innerHTML = visibleChips.map((chip) => {
      const nextActive = state.altSheetFilter ?? null;
      const isActive = chip.id === nextActive || (chip.id === null && nextActive === null);
      return `
        <button
          type="button"
          class="alt-filter-chip${isActive ? " is-active" : ""}${chip.subtle ? " alt-filter-chip--subtle" : ""}"
          data-alt-filter="${chip.id ?? ""}"
          aria-pressed="${isActive ? "true" : "false"}"
        >${escapeHtml(chip.label)}</button>
      `;
    }).join("");
  }

  if (ctxEl) {
    const amount = item?.ingredientAmount ? `${escapeHtml(item.ingredientAmount)} ` : "";
    const title = escapeHtml(splitCompoundIngredientWords(item?.ingredientTitle || ""));
    ctxEl.innerHTML = `<span class="alt-sheet__context-label">Voor</span> <span class="alt-sheet__context-value">${amount}${title}</span>`;
  }

  if (!choices.length) {
    listEl.innerHTML = `<p class="alt-sheet__empty">Geen alternatieven gevonden.</p>`;
    return;
  }

  // Build a parallel list with original index + classification + price.
  const annotated = choices.map((choice, idx) => ({
    choice,
    idx,
    section: classifyAlternative(choice, item),
    priceNum: parseFloat(String(choice.price || "0").replace("€", "").replace(",", ".")) || 9999,
  }));

  const activeFilter = state.altSheetFilter ?? null;
  if (activeFilter) {
    const matches = (entry) => {
      const flags = extractBasketLabelsFromChoice(entry.choice, item);
      if (activeFilter === "beterLeven1") return Boolean(flags.beterLeven1);
      if (activeFilter === "vegetarisch") return Boolean(flags.vegetarisch);
      if (activeFilter === "vegan") return Boolean(flags.vegan);
      if (activeFilter === "plantaardig") return Boolean(flags.plantaardig);
      if (activeFilter === "more") {
        const anyChipLabel = Boolean(flags.beterLeven1 || flags.vegetarisch || flags.vegan || flags.plantaardig || flags.bio);
        return !anyChipLabel;
      }
      return true;
    };

    const filtered = annotated
      .filter(matches)
      .sort((a, b) => a.priceNum - b.priceNum);

    const chipTitle = ALT_FILTER_CHIPS.find((c) => c.id === activeFilter)?.label || "Alternatieven";
    const selectedIdx = item.selectedChoiceIndex || 0;
    const cards = filtered
      .map((e) => {
        const c = e.choice;
        const img = c.imageUrl
          ? `<img class="alt-card__img" src="${escapeHtml(c.imageUrl)}" alt="" loading="lazy" />`
          : `<span class="alt-card__img alt-card__img--placeholder">${escapeHtml(c.emoji || "🛒")}</span>`;
        const meta = [c.price, c.subtitle].filter(Boolean).map(escapeHtml).join(" · ");
        // Force at least the active chip label as a badge when in single-filter mode,
        // even if AH metadata did not include explicit labels.
        const forceKeys = activeFilter ? [activeFilter] : [];
        const badges = renderAltBadges(c, item, { forceKeys });
        const cta = e.idx === selectedIdx
          ? `<span class="alt-card__chosen">Gekozen</span>`
          : `<button class="alt-card__choose" type="button" data-alt-choose="${e.idx}">Kies</button>`;
        return `
          <div class="alt-card${e.idx === selectedIdx ? " is-selected" : ""}">
            ${img}
            <div class="alt-card__info">
              <p class="alt-card__title">${escapeHtml(c.title || "")}</p>
              <p class="alt-card__meta">${meta}</p>
              ${badges}
            </div>
            ${cta}
          </div>
        `;
      })
      .join("");

    listEl.innerHTML = filtered.length
      ? `<section class="alt-section">
           <h3 class="alt-section__title">${escapeHtml(chipTitle)}</h3>
           <div class="alt-section__list">${cards}</div>
         </section>`
      : `<p class="alt-sheet__empty">Geen alternatieven gevonden.</p>`;
    return;
  }

  // Cheapest option floats to the top-only "Meest voordelig" section so it
  // is always discoverable, even when it also fits a label section.
  const cheapest = [...annotated].sort((a, b) => a.priceNum - b.priceNum)[0];
  const cheapestKey = cheapest ? cheapest.idx : -1;

  // Group while preserving "show only once": once an idx is placed, skip it.
  const placed = new Set();
  const sections = new Map();
  for (const sec of ALT_SECTIONS) sections.set(sec.id, []);

  if (cheapestKey >= 0) {
    sections.get("cheapest").push(annotated[cheapestKey]);
    placed.add(cheapestKey);
  }

  for (const sec of ALT_SECTIONS) {
    if (sec.id === "cheapest" || sec.id === "more") continue;
    for (const entry of annotated) {
      if (placed.has(entry.idx)) continue;
      if (entry.section === sec.id) {
        sections.get(sec.id).push(entry);
        placed.add(entry.idx);
      }
    }
  }
  // Anything left over → "Meer alternatieven", sorted by price ascending.
  for (const entry of annotated) {
    if (!placed.has(entry.idx)) {
      sections.get("more").push(entry);
      placed.add(entry.idx);
    }
  }

  const cardHtml = (entry, isSelected) => {
    const c = entry.choice;
    const img = c.imageUrl
      ? `<img class="alt-card__img" src="${escapeHtml(c.imageUrl)}" alt="" loading="lazy" />`
      : `<span class="alt-card__img alt-card__img--placeholder">${escapeHtml(c.emoji || "🛒")}</span>`;
    const meta = [c.price, c.subtitle].filter(Boolean).map(escapeHtml).join(" · ");
    const isCheapest = entry.idx === cheapestKey;
    // Force the section label as a badge so users can always see the kenmerk
    // even when AH metadata is incomplete.
    const sectionKey = entry.section || "";
    const forceKeys = sectionKey ? [sectionKey] : [];
    const badges = renderAltBadges(c, item, { showCheapest: isCheapest, forceKeys });
    const cta = isSelected
      ? `<span class="alt-card__chosen">Gekozen</span>`
      : `<button class="alt-card__choose" type="button" data-alt-choose="${entry.idx}">Kies</button>`;
    return `
      <div class="alt-card${isSelected ? " is-selected" : ""}">
        ${img}
        <div class="alt-card__info">
          <p class="alt-card__title">${escapeHtml(c.title || "")}</p>
          <p class="alt-card__meta">${meta}</p>
          ${badges}
        </div>
        ${cta}
      </div>
    `;
  };

  const selectedIdx = item.selectedChoiceIndex || 0;
  const html = ALT_SECTIONS
    .map((sec) => {
      const entries = sections.get(sec.id) || [];
      if (!entries.length) return "";
      // Sort label sections by price ascending so the cheapest variant is shown first.
      entries.sort((a, b) => a.priceNum - b.priceNum);
      const cards = entries.map((e) => cardHtml(e, e.idx === selectedIdx)).join("");
      return `
        <section class="alt-section">
          <h3 class="alt-section__title">${escapeHtml(sec.title)}</h3>
          <div class="alt-section__list">${cards}</div>
        </section>
      `;
    })
    .join("");

  listEl.innerHTML = html || `<p class="alt-sheet__empty">Geen alternatieven gevonden.</p>`;
}

function openAlternativesSheet(itemIndex) {
  const preview = state.basketPreview;
  if (!preview) return;
  const item = preview.items[itemIndex];
  if (!item) return;
  state.altSheetItemIndex = itemIndex;
  state.altSheetFilter = null;

  const overlay = document.getElementById("altOverlay");
  if (!overlay) return;
  // Be defensive: a render exception would otherwise abort before making the
  // overlay visible (appears as "Wissel does nothing" in production).
  let rendered = false;
  try {
    renderAlternativesSheet(item);
    rendered = true;
  } catch (err) {
    console.error("[alt-sheet] render failed", err);
  }

  overlay.hidden = false;
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  // Some mobile browsers can keep fixed overlays "click-through" after toggles;
  // explicitly ensure the overlay can receive pointer events.
  overlay.style.pointerEvents = "auto";

  if (!rendered) {
    const listEl = document.getElementById("altOverlayList");
    if (listEl) listEl.innerHTML = `<p class="alt-sheet__empty">Kon alternatieven niet laden. Probeer opnieuw.</p>`;
  }

  const altN = Array.isArray(item.choices) ? item.choices.length : 0;
  trackClientEvent("client_ah_wissel_open", { choices: altN });

  const listEl = document.getElementById("altOverlayList");
  if (listEl) listEl.scrollTop = 0;
  // Move focus inside the dialog for accessibility and to avoid iOS losing the
  // click transition.
  requestAnimationFrame(() => {
    const backBtn = document.getElementById("altOverlayBack");
    if (backBtn instanceof HTMLElement) backBtn.focus();
  });
}

function closeAlternativesSheet() {
  const overlay = document.getElementById("altOverlay");
  if (!overlay) return;
  overlay.classList.add("hidden");
  overlay.hidden = true;
  overlay.setAttribute("aria-hidden", "true");
  state.altSheetItemIndex = null;
}

function scrollToTopNow(extraContainers = []) {
  const containers = Array.isArray(extraContainers) ? extraContainers : [extraContainers];

  // Window scroll (most views)
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  } catch {
    window.scrollTo(0, 0);
  }

  // iOS/Safari fallback paths for document scrolling
  try { document.documentElement.scrollTop = 0; } catch {}
  try { document.body.scrollTop = 0; } catch {}

  // Some screens are internally scrollable (e.g. cookbooks detail in a grid/list container)
  containers
    .filter(Boolean)
    .forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      try {
        el.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } catch {
        try { el.scrollTop = 0; } catch {}
      }
    });
}

function scrollToTopSoon(extraContainers = []) {
  const apply = () => scrollToTopNow(extraContainers);

  apply();
  requestAnimationFrame(() => {
    apply();
    requestAnimationFrame(apply);
  });
  setTimeout(apply, 60);
}

function goHome() {
  closeModal();
  closeBasketModal();
  switchView("home");
}

function isChannelSearchEmpty() {
  const inputVal = (searchInput?.value || "").trim();
  const stateVal = (state.channelSearchQuery || "").trim();
  return inputVal.length === 0 && stateVal.length === 0;
}

function ensureChannelSearchClosed() {
  channelSearchAbortController?.abort();
  channelSearchAbortController = null;
  if (channelSearchSection) channelSearchSection.classList.add("hidden");
  if (channelSearchResults) channelSearchResults.innerHTML = "";
  state.channelSearchQuery = "";
  state.channelSearchFilter = null;
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pickUniqueRandom(items, count, rng = Math.random) {
  const n = Math.min(Math.max(0, count), items.length);
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

const HOME_QUICK_CHIP_DISH_POOL = [
  "Bami",
  "Nasi",
  "Lasagne",
  "Pad thai",
  "Pannenkoeken",
  "Saté",
  "Sushi bowl",
  "Poké bowl",
  "Ovenschotel",
  "Spaghetti Bolognese",
  "Pasta Carbonara",
  "Lasagne Bolognese",
  "Pasta Pesto",
  "Macaroni and Cheese",
  "Tomatenrisotto met Parmezaan en citroen",
  "Gnocchi met salieboter",
  "Pizza Margherita",
  "Pasta met feta uit de oven",
  "Fettuccine Alfredo",
  "Aubergine Parmigiana",
  "Stamppot Boerenkool",
  "Stamppot Hutspot",
  "Hachee",
  "Ovenschotel met prei en aardappel",
  "Bloemkool met kaassaus en aardappels",
  "Gehaktballen in jus",
  "Hollandse pannenkoeken",
  "Babi Pangang",
  "Snert",
  "Thaise Pad Thai",
  "Massaman Curry",
  "Indiase Butter Chicken",
  "Indonesische Gado Gado",
  "Mexicaanse Taco's met gehakt",
  "Shakshuka",
  "Spaanse Paella",
  "Kip Tikka Masala",
  "Nasi Goreng",
  "Chili con Carne",
  "Kip uit de oven",
  "Kip Teriyaki",
  "Saté met pindasaus",
  "Steak met chimichurri",
  "Pulled Pork",
  "Gyros",
];

const HOME_QUICK_CHIP_GENERAL_POOL = [
  "Pasta",
  "Kip",
  "Avocado",
  "Snelle lunch",
  "Gezond",
  "Vegetarisch",
  "Vegan",
  "Salade",
  "Soep",
  "Curry",
  "Rijst",
  "Noedels",
  "Wrap",
  "Taco",
  "Bowl",
  "Airfryer",
  "30 minuten",
  "Budget",
  "Mealprep",
  "Ontbijt",
  "Smoothie",
  "Eieren",
  "Vis",
  "Garnalen",
  "Tofu",
  "Kikkererwten",
  "Linzen",
  "Zoete aardappel",
  "Broccoli",
  "Bloemkool",
  "Spinazie",
  "Courgette",
  "Aubergine",
  "Tomaat",
  "Paprika",
  "Pesto",
  "Parmezaan",
  "Feta",
  "Burrata",
  "Stoof",
  "BBQ",
  "Dessert",
  "Chocolate chip",
  "Gezinsproof",
];

function pickHomeQuickChips(count, rng) {
  const n = Math.max(0, Math.min(count, HOME_QUICK_CHIP_DISH_POOL.length + HOME_QUICK_CHIP_GENERAL_POOL.length));
  if (n === 0) return [];

  const dishPick = pickUniqueRandom(HOME_QUICK_CHIP_DISH_POOL, 1, rng)[0];
  const remainingCount = Math.max(0, n - 1);
  const combined = [...HOME_QUICK_CHIP_DISH_POOL, ...HOME_QUICK_CHIP_GENERAL_POOL].filter((x) => x !== dishPick);
  const rest = pickUniqueRandom(combined, remainingCount, rng);

  // Preserve randomness of display order.
  return pickUniqueRandom([dishPick, ...rest], n, rng);
}

// ── Focus-state helpers (recent searches, recent viewed recipes, intent chips) ─

const HOME_INTENT_CHIPS = [
  { label: "Budget", q: "budget" },
  { label: "Vega", q: "vega" },
  { label: "Airfryer", q: "airfryer" },
  { label: "Mealprep", q: "mealprep" },
];

const RECENT_SEARCHES_KEY = "plately-recent-searches";
const RECENT_RECIPES_KEY = "plately-recent-recipes";
const MAX_RECENT_SEARCHES = 6;
const MAX_RECENT_RECIPES = 24;

function loadRecentSearches() {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string" && x.trim()) : [];
  } catch {
    return [];
  }
}

function pushRecentSearch(query) {
  const text = (query || "").trim();
  if (!text || text.length < 2) return;
  const lower = text.toLowerCase();
  const next = [text, ...loadRecentSearches().filter((x) => x.toLowerCase() !== lower)].slice(0, MAX_RECENT_SEARCHES);
  try { localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next)); } catch { /* ignore */ }
}

function loadRecentRecipeIds() {
  try {
    const raw = localStorage.getItem(RECENT_RECIPES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string" && x.trim()) : [];
  } catch {
    return [];
  }
}

function pushRecentRecipeId(recipeId) {
  const rid = String(recipeId || "").trim();
  if (!rid) return;
  const next = [rid, ...loadRecentRecipeIds().filter((x) => x !== rid)].slice(0, MAX_RECENT_RECIPES);
  try { localStorage.setItem(RECENT_RECIPES_KEY, JSON.stringify(next)); } catch { /* ignore */ }
}

function renderHomeQuickChips() {
  if (!homeSearchChipsWrap) return;
  const isWide = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(min-width: 768px)").matches;
  const chipCount = isWide ? 6 : Math.random() < 0.55 ? 4 : 5;

  let sessionSeed = 0;
  try {
    const existing = sessionStorage.getItem("plately-home-chip-seed");
    if (existing) {
      sessionSeed = Number(existing) >>> 0;
    } else {
      sessionSeed = (Math.random() * 2 ** 32) >>> 0;
      sessionStorage.setItem("plately-home-chip-seed", String(sessionSeed));
    }
  } catch {
    sessionSeed = (Math.random() * 2 ** 32) >>> 0;
  }

  const reloadSalt = (Date.now() ^ ((Math.random() * 2 ** 32) >>> 0)) >>> 0;
  const rng = mulberry32((sessionSeed ^ reloadSalt) >>> 0);
  const picks = pickHomeQuickChips(chipCount, rng);

  homeSearchChipsWrap.innerHTML = picks
    .map(
      (label) =>
        `<button type="button" class="home-search-chip" data-home-search-chip="${escapeHtml(label)}">${escapeHtml(label)}</button>`
    )
    .join("");
}

function renderHomeFocusPanel() {
  const panel = document.getElementById("homeFocusPanel");
  if (!panel) return;
  const intents = HOME_INTENT_CHIPS
    .map((c) => `<button type="button" class="home-intent-chip" data-home-intent="${escapeHtml(c.q)}">${escapeHtml(c.label)}</button>`)
    .join("");
  const recentSearches = loadRecentSearches();
  const recentSearchHtml = recentSearches.length
    ? `<div class="home-focus-section">
         <h3 class="home-focus-title">Recente zoekopdrachten</h3>
         <div class="home-recent-searches">${recentSearches
           .map((q) => `<button type="button" class="home-recent-search" data-home-recent-search="${escapeHtml(q)}">${escapeHtml(q)}</button>`)
           .join("")}</div>
       </div>`
    : "";
  const recentIds = loadRecentRecipeIds();
  const recentRecipes = recentIds.map((id) => getRecipeById(id)).filter(Boolean).slice(0, 6);
  const recentRecipesHtml = recentRecipes.length
    ? `<div class="home-focus-section">
         <h3 class="home-focus-title">Onlangs bekeken</h3>
         <div class="home-recent-recipes">${recentRecipes
           .map((r) => `
             <button type="button" class="home-recent-recipe" data-home-recent-recipe="${escapeHtml(r.id)}" aria-label="Open ${escapeHtml(r.title || "recept")}">
               <img class="home-recent-recipe__img" src="${escapeHtml(r.image || "assets/hero-burger.svg")}" alt="" loading="lazy" />
               <span class="home-recent-recipe__title">${escapeHtml(r.title || "Recept")}</span>
             </button>`)
           .join("")}</div>
       </div>`
    : "";
  panel.innerHTML = `
    <div class="home-focus-section">
      <h3 class="home-focus-title">Snel zoeken</h3>
      <div class="home-intent-row">${intents}</div>
    </div>
    ${recentSearchHtml}
    ${recentRecipesHtml}
  `;
}

function showHomeFocusPanel() {
  const panel = document.getElementById("homeFocusPanel");
  if (!panel) return;
  if (state.view !== "home") return;
  if ((searchInput?.value || "").trim().length > 0) return;
  renderHomeFocusPanel();
  panel.classList.remove("hidden");
  panel.classList.add("home-focus-panel--open");
}

function hideHomeFocusPanel() {
  const panel = document.getElementById("homeFocusPanel");
  if (!panel) return;
  panel.classList.add("hidden");
  panel.classList.remove("home-focus-panel--open");
}

function runHomeSearchQuery(query) {
  if (!searchInput) return;
  const q = (query || "").trim();
  searchInput.value = q;
  state.channelSearchQuery = q;
  state.channelSearchFilter = null;
  hideHomeFocusPanel();
  if (q.length >= 2) {
    clearTimeout(channelSearchTimeout);
    searchChannels(q);
  } else {
    ensureChannelSearchClosed();
  }
}

function switchView(view, opts = {}) {
  const skipImportReviewLeaveGuard = opts.skipImportReviewLeaveGuard === true;

  if (
    !skipImportReviewLeaveGuard &&
    state.view === "review" &&
    view !== "review" &&
    importReviewLeaveShouldWarn()
  ) {
    showConfirm({
      title: "Importeren verlaten?",
      subtitle:
        "Dit recept staat nog niet in een kookboek. Het blijft als concept zichtbaar bij Concepten.",
      confirmLabel: "Toch doorgaan",
      destructive: true,
      onConfirm: () => switchView(view, { skipImportReviewLeaveGuard: true }),
    });
    return;
  }

  // Enforce authentication for all protected views
  // Only enforce after session check is complete (state.session.ready)
  if (state.session.ready && !state.auth.authenticated && view !== "detail") {
    // Allow detail view (might be switching from authenticated state)
    // but require login for all other views
    openAuthModal("login");
    return;
  }

  const prevView = state.view;
  state.view = view;
  homeScreen.classList.toggle("screen--active", view === "home");
  detailScreen.classList.toggle("screen--active", view === "detail");
  groceryScreen.classList.toggle("screen--active", view === "grocery");
  mealPlanScreen.classList.toggle("screen--active", view === "mealplan");
  settingsScreen.classList.toggle("screen--active", view === "settings");
  if (cookbooksScreen) cookbooksScreen.classList.toggle("screen--active", view === "cookbooks");
  importScreen.classList.toggle("screen--active", view === "import");
  reviewScreen.classList.toggle("screen--active", view === "review");
  if (adminScreen) adminScreen.classList.toggle("screen--active", view === "admin");

  navItems.forEach((item) => {
    const isRecipesNav = item.dataset.view === "home" && (view === "home" || view === "detail" || view === "import" || view === "review");
    item.classList.toggle("nav-item--active", isRecipesNav || item.dataset.view === view);
  });

  if (view !== "detail" && state.kookstandOpen) {
    closeKookstand();
  }

  if (view !== "detail" && state.keepAwake) {
    releaseWakeLock();
  } else if (view === "detail" && state.keepAwake) {
    requestWakeLock();
  }

  // Reset cookbook detail view when leaving settings
  // (but preserve when navigating into cookbooks to open a specific cookbook)
  if (view !== "settings" && view !== "cookbooks" && state.openCookbookId) {
    state.openCookbookId = null;
  }

  if (view !== prevView) {
    scrollToTopSoon();
  } else {
    // Still force top when re-entering same screen via deep-link flows.
    scrollToTopSoon();
  }

  // When entering grocery screen, kick off a photo fetch for items that don't have one yet
  if (view === "grocery") {
    debouncedFetchGroceryPhotos();
  }

  // When opening import screen: auto-fill from clipboard if it contains a URL
  if (view === "import" && recipeUrlInput && !recipeUrlInput.value.trim()) {
    navigator.clipboard.readText().then((text) => {
      const trimmed = (text || "").trim();
      if (trimmed && /^https?:\/\//i.test(trimmed) && recipeUrlInput && !recipeUrlInput.value.trim()) {
        recipeUrlInput.value = trimmed;
        showToast("📋 Link uit klembord geplakt");
      }
    }).catch(() => {});
  }

  // When entering cookbooks screen, re-render the list
  if (view === "cookbooks") {
    renderCookbookList();
  }

  // When entering settings, refresh custom channel statuses (admin approvals)
  if (view === "settings" && state.auth.authenticated) {
    const hasPending = state.customChannels.some((ch) => (ch.status || "approved") === "pending");
    if (hasPending) {
      refreshChannelStatusesFromServer();
    }
  }

  // Persist view so refresh restores the same tab
  try {
    if (["home", "detail", "grocery", "settings", "mealplan", "cookbooks", "import", "review"].includes(view)) {
      sessionStorage.setItem("plately-view", view);
      // Also persist selectedRecipeId for detail view
      if (view === "detail" && state.selectedRecipeId) {
        sessionStorage.setItem("plately-selected-recipe", state.selectedRecipeId);
      }
    } else {
      sessionStorage.removeItem("plately-view");
      sessionStorage.removeItem("plately-selected-recipe");
    }
  } catch { /* ignore */ }

  // Track recently viewed recipes for the home focus-state panel
  if (view === "detail" && state.selectedRecipeId) {
    pushRecentRecipeId(state.selectedRecipeId);
  }

  // Home-specific: keep channel search panel consistent on returning home
  if (view === "home") {
    // Chips: pick a new set each time home is entered
    renderHomeQuickChips();
    hideHomeFocusPanel();

    // Defensive: when input is empty, ALWAYS force the channel-search panel
    // closed regardless of any lingering state. Mobile flows can leave
    // state.channelSearchQuery populated after an import; we don't want
    // the panel to remain visible when the user has no active query.
    const inputEmpty = (searchInput?.value || "").trim().length === 0;
    if (inputEmpty || isChannelSearchEmpty()) {
      ensureChannelSearchClosed();
    }
  } else {
    // Hide focus panel any time we leave home
    hideHomeFocusPanel();
  }

  if (state.session.ready && view !== prevView) {
    trackClientEvent("client_navigation", { view, from: prevView });
  }
}

function parseBaseServings(value) {
  const match = String(value || "2").match(/\d+/);
  return match ? Number(match[0]) : 2;
}

function scaleQty(quantity, factor) {
  const value = Number.parseFloat(String(quantity).replace(",", "."));
  if (!Number.isFinite(value)) {
    return quantity;
  }
  const scaled = value * factor;
  return Number.isInteger(scaled) ? String(scaled) : String(Math.round(scaled * 10) / 10);
}

function formatIngredientAmount(ingredient, factor = 1) {
  const quantity = scaleQty(ingredient.quantity, factor);
  const rawUnit = ingredient.unit === "x" ? "" : ingredient.unit;
  const unit = formatUnitForQuantity(normalizeUnit(rawUnit), quantity);
  return `${quantity}${unit ? ` ${unit}` : ""}`.trim();
}

function formatUnitForQuantity(unit, quantity) {
  const u = String(unit || "").trim().toLowerCase();
  if (!u) return "";

  const num = Number.parseFloat(String(quantity).replace(",", "."));
  const isOne = Number.isFinite(num) && Math.abs(num - 1) < 1e-9;

  // Only pluralize Dutch "count" units that should read naturally in UI + basket search terms.
  // Keep canonical singular form in storage; pluralize for display when qty != 1.
  const PLURAL = new Map([
    ["stuk", "stuks"],
    ["plakje", "plakjes"],
    ["reepje", "reepjes"],
    ["blokje", "blokjes"],
    ["schijfje", "schijfjes"],
    ["handje", "handjes"],
    ["takje", "takjes"],
  ]);

  if (isOne) return u;
  return PLURAL.get(u) || u;
}

function parseIngredientInput(value) {
  const cleanValue = String(value || "").trim();
  const match = cleanValue.match(
    /^(\d+(?:[.,]\d+)?)\s*(gr|gram|grammen|grams|g|kg|kilogram|kilogrammen|kilo|mg|ml|milliliter|milliliters|cl|dl|l|liter|liters|el|eetlepels?|tl|theelepels?|tbsp|tsp|cup|cups|oz|lb|stuks?|stuk(?:ken)?|krop|kroppen|bosje|bosjes|zakje|zakjes|pot(?:je|jes)?|blik(?:je|jes)?|snuf(?:je|jes)?|teen|teentjes|plak(?:je|jes)?|handje(?:s)?|scheut(?:je)?|bakje|bakjes|pak(?:ken)?|rol(?:len)?|verpakking(?:en)?|takje|takjes|blokje|blokjes|reepje|reepjes|schijfje|schijfjes)?\s*(.+)$/i
  );
  if (match) {
    // Normalize units to a canonical singular form (e.g. plakjes → plakje)
    let unit = normalizeUnit((match[2] || "x").toLowerCase());
    // Clean ingredient name: remove leading/trailing punctuation and extra spaces
    let name = match[3].trim().replace(/^[.,\s]+|[.,\s]+$/g, "").trim();

    // Validate quantity: convert to number and check validity
    let quantity = match[1];
    const qtyNum = parseFloat(quantity.replace(",", "."));

    // Validate: quantity must be positive and reasonable
    if (isNaN(qtyNum) || qtyNum <= 0) {
      // Invalid quantity, use default
      quantity = "1";
    } else if (qtyNum > 1000) {
      // Warn about unreasonably large quantities (silently cap at 999)
      quantity = "999";
    } else if (qtyNum < 0.01) {
      // Very small quantities (less than 0.01) become 1 unit
      quantity = "1";
    } else {
      // Keep original quantity
      quantity = match[1];
    }

    return {
      quantity,
      unit,
      name: name || "Ingredient",
    };
  }
  return { quantity: "1", unit: "x", name: cleanValue || "Ingredient" };
}

function normalizeUnit(unit) {
  const value = String(unit || "").trim().toLowerCase();
  if (!value || value === "x") return "stuk";
  if (value === "stuks") return "stuk";
  if (value === "plakjes") return "plakje";
  if (value === "reepjes") return "reepje";
  if (value === "blokjes") return "blokje";
  if (value === "schijfjes") return "schijfje";
  if (value === "handjes") return "handje";
  if (value === "gr" || value === "gram" || value === "grammen" || value === "grams") return "g";
  if (value === "kilo" || value === "kilogram" || value === "kilogrammen") return "kg";
  if (value === "liter" || value === "liters") return "l";
  if (value === "milliliter" || value === "milliliters") return "ml";
  if (value === "eetlepel" || value === "eetlepels") return "el";
  if (value === "theelepel" || value === "theelepels") return "tl";
  return value;
}

function normalizeIngredientKey(name) {
  let t = String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  // Typo's: „kom kommer” → komkommer (consistent met AH-zoek & mergen).
  if (/\bkom\s+kom+m?ers\b/.test(t)) t = t.replace(/\bkom\s+kom+m?ers\b/g, "komkommers");
  else if (/\bkom\s+kom+m?er\b/.test(t)) t = t.replace(/\bkom\s+kom+m?er\b/g, "komkommer");

  // Remove parenthetical notes: "kip (zonder bot)" → "kip"
  t = t.replace(/\s*\([^)]*\)/g, " ").trim();

  // Strip leading quantity + unit-ish tokens
  t = t.replace(
    /^[\d\s½¼¾.,/+-]+\s*(?:g|gr|kg|mg|ml|dl|cl|l\b|el|tl|tbsp|tsp|oz|lb|stuk(?:s|ken)?|stuks?|krop(?:pen)?|bosje[s]?|zakje[s]?|pot(?:je|jes)?|blik(?:je|jes)?|eetlepels?|theelepels?|teen(?:tjes|en)?|snuf(?:je|jes)?|plak(?:je|jes)?|handje[s]?|scheut(?:je)?|takje[s]?|blaadje[s]?|blokje[s]?|reepje[s]?|filet(?:s)?|verpakking(?:en)?|pak(?:ken)?|rol(?:len)?)?\s+/i,
    ""
  );

  // Strip common descriptors (repeat to catch doubles like "verse fijngesneden ui")
  const DESC =
    /^(vers(?:e|en)?|biologisch(?:e)?|bio|extra\s+vierge?|extra|groot(?:e)?|klein(?:e)?|fijn(?:gesneden)?|grof(?:gesneden)?|gesneden|gehakt(?:e)?|geraspt(?:e)?|gedroogd(?:e)?|gezouten|ongezouten|gepeld(?:e)?|gewassen|rood(?:e)?|groen(?:e)?|geel(?:e)?|wit(?:te)?|zwart(?:e)?|halve?|half|vol(?:le)?|mager(?:e)?|licht(?:e)?|geroosterd(?:e)?|gebakken|gekookt(?:e)?|rauw(?:e)?|warm(?:e)?|koud(?:e)?|in\s+reepjes|in\s+blokjes)\s+/i;
  t = t.replace(DESC, "").replace(DESC, "").trim();

  // Normalize punctuation and collapse spaces
  t = t.replace(/[^a-z0-9]+/g, " ").trim();
  if (!t) return "";

  // Word-level normalizations (Dutch + common variants)
  const MAP = new Map([
    ["uien", "ui"],
    ["uitjes", "ui"],
    ["tomaten", "tomaat"],
    ["eieren", "ei"],
    ["aardappelen", "aardappel"],
    ["krieltjes", "aardappel"],
    ["knoflooktenen", "knoflook"],
    ["knoflookteen", "knoflook"],
    ["citroenen", "citroen"],
    ["limoenen", "limoen"],
    ["bananen", "banaan"],
    ["paprikas", "paprika"],
    ["champignons", "champignon"],
    ["paddenstoelen", "paddenstoel"],
    ["noedels", "noedel"],
    ["noodles", "noedel"],
    ["spagetti", "spaghetti"],
    ["creme", "creme"],
    ["cremefraiche", "creme fraiche"],
  ]);

  const words = t.split(/\s+/).filter(Boolean).map((w) => MAP.get(w) || w);

  // Very small plural-to-singular fallback for Dutch-ish plurals (safe-ish)
  const singularized = words.map((w) => {
    if (MAP.has(w)) return MAP.get(w);
    if (w.length > 4 && w.endsWith("en")) return w.slice(0, -2);
    if (w.length > 4 && w.endsWith("s")) return w.slice(0, -1);
    return w;
  });

  // Keep up to 3 words to avoid over-specific keys
  return singularized.slice(0, 3).join(" ").trim();
}

function parseAmountLabel(value) {
  const match = String(value || "").trim().match(/^(\d+(?:[.,]\d+)?)\s*(.+)?$/);
  if (!match) {
    return null;
  }

  const amount = Number.parseFloat(match[1].replace(",", "."));
  if (!Number.isFinite(amount)) {
    return null;
  }

  return {
    amount,
    unit: normalizeUnit(match[2] || ""),
  };
}

function formatMergedAmount(amount, unit) {
  const rounded = Number.isInteger(amount) ? String(amount) : String(Math.round(amount * 10) / 10).replace(".", ",");
  if (!unit || unit === "stuk") {
    return `${rounded} ${amount === 1 ? "stuk" : "stuks"}`;
  }
  return `${rounded} ${unit}`.trim();
}

function mergeAmountLabels(existing, incoming) {
  const left = parseAmountLabel(existing);
  const right = parseAmountLabel(incoming);

  if (left && right && left.unit === right.unit) {
    return formatMergedAmount(left.amount + right.amount, left.unit);
  }

  const uniqueValues = [...new Set([String(existing || "").trim(), String(incoming || "").trim()].filter(Boolean))];
  return uniqueValues.join(" + ");
}

/** Schaal één hoeveelheidstekst (bijv. na porties wijzigen). Ondersteunt "400 g + 200 g". */
function scaleAmountLabelByRatio(amountStr, ratio) {
  if (!Number.isFinite(ratio) || ratio <= 0 || Math.abs(ratio - 1) < 1e-9) {
    return String(amountStr || "").trim();
  }
  const raw = String(amountStr || "").trim();
  if (!raw) return raw;
  const parts = raw.split(/\s*\+\s*/).map((p) => p.trim()).filter(Boolean);
  const scaled = parts.map((part) => {
    const p = parseAmountLabel(part);
    if (!p) return part;
    return formatMergedAmount(p.amount * ratio, p.unit);
  });
  return scaled.join(" + ");
}

/** Dedupe-key: zelfde ingrediënt ongeacht grove groep; optioneel apart. */
function groceryMergeKeyForList(item) {
  const raw = String(item?.title || "");
  const opt =
    /\(optioneel\)/i.test(raw) || /\boptioneel\b/i.test(raw.toLowerCase()) ? "|opt" : "";
  const stripped = raw.replace(/\s*\(optioneel\)\s*$/i, "").replace(/\boptioneel$/i, "").trim();
  return `${normalizeIngredientKey(stripped)}${opt}`;
}

function consolidateUncheckedGroceryDuplicates() {
  const items = state.groceryItems;
  if (!Array.isArray(items) || items.length < 2) return;

  const buckets = new Map();
  const keyOrder = [];
  for (const item of items) {
    if (!item || item.checked) continue;
    const k = groceryMergeKeyForList(item);
    if (!k) continue;
    if (!buckets.has(k)) {
      buckets.set(k, []);
      keyOrder.push(k);
    }
    buckets.get(k).push(item);
  }

  const removeIds = new Set();
  for (const k of keyOrder) {
    const group = buckets.get(k);
    if (!group || group.length < 2) continue;
    const [first, ...rest] = group;
    let combined = String(first.amount || "").trim();
    const titles = new Set();
    if (first.recipeTitle) titles.add(String(first.recipeTitle));
    for (const o of rest) {
      combined = mergeAmountLabels(combined, String(o.amount || "").trim());
      if (o.recipeTitle) titles.add(String(o.recipeTitle));
      if (o.id) removeIds.add(o.id);
    }
    first.amount = combined;
    const mergedTitle = [...titles].filter(Boolean).join(", ");
    if (mergedTitle) first.recipeTitle = mergedTitle;
  }

  if (!removeIds.size) return;
  state.groceryItems = items.filter((i) => i && !removeIds.has(i.id));
}

function rescaleGroceryAmountsForRecipe(recipeId, ratio) {
  const id = String(recipeId || "").trim();
  if (!id || !Number.isFinite(ratio) || ratio <= 0 || Math.abs(ratio - 1) < 1e-9) return;
  for (const item of state.groceryItems) {
    if (!item || item.checked) continue;
    if (item.recipeId !== id) continue;
    item.amount = scaleAmountLabelByRatio(item.amount, ratio);
  }
}

// Optional manual sanity checks in browser console:
//   window.__platelyIngredientSanity?.()
//   window.__platelyPantrySanity?.()
if (typeof window !== "undefined") {
  window.__platelyIngredientSanity = () => {
    const cases = [
      { input: "2 plakjes kaas", want: { quantity: "2", unit: "plakje", name: "kaas" }, wantAmount: "2 plakjes" },
      { input: "1 plakje kaas", want: { quantity: "1", unit: "plakje", name: "kaas" }, wantAmount: "1 plakje" },
      { input: "3 reepjes kipfilet", want: { quantity: "3", unit: "reepje", name: "kipfilet" }, wantAmount: "3 reepjes" },
      { input: "2 schijfjes citroen", want: { quantity: "2", unit: "schijfje", name: "citroen" }, wantAmount: "2 schijfjes" },
    ];

    const ok = [];
    const bad = [];
    for (const c of cases) {
      const parsed = parseIngredientInput(c.input);
      const amount = formatIngredientAmount(parsed, 1);
      const pass =
        parsed.quantity === c.want.quantity &&
        parsed.unit === c.want.unit &&
        parsed.name === c.want.name &&
        amount === c.wantAmount;
      (pass ? ok : bad).push({ input: c.input, parsed, amount, expected: c });
    }

    if (bad.length) {
      // eslint-disable-next-line no-console
      console.warn("Ingredient sanity FAILED", bad);
    } else {
      // eslint-disable-next-line no-console
      console.log("Ingredient sanity OK", ok.map((x) => `${x.input} → ${x.amount} ${x.parsed.name}`));
    }
    return { ok, bad };
  };
}

if (typeof window !== "undefined") {
  window.__platelyPantrySanity = () => {
    const normalize = (v) => normalizeIngredientKey(String(v || ""));

    const recipe = {
      id: "pantry-sanity",
      title: "Pantry sanity",
      servings: "2",
      ingredients: [
        { name: "zout (optioneel)" },
        { name: "peper naar smaak" },
        { name: "olijfolie" },
      ],
    };

    const pantryPool = [
      "Olie",
      "Olijfolie",
      "Boter",
      "Bloem",
      "Suiker",
      "Azijn",
      "Sojasaus",
      "Bouillonblokje",
      "Zout",
      "Peper",
    ].map((title) => ({ title }));

    const existingKeys = new Set(); // emulate: not in grocery list
    const recipeHas = (r, title) => {
      const key = normalize(title);
      return (r.ingredients || []).some((ing) => normalize(ing?.name).includes(key));
    };

    const suggestions = pantryPool
      .filter((p) => recipeHas(recipe, p.title))
      .filter((p) => !existingKeys.has(normalize(p.title)))
      .map((p) => p.title);

    const pass = suggestions.includes("Zout") && suggestions.includes("Peper") && suggestions.includes("Olijfolie");

    if (!pass) {
      // eslint-disable-next-line no-console
      console.warn("Pantry sanity FAILED", { suggestions });
    } else {
      // eslint-disable-next-line no-console
      console.log("Pantry sanity OK", { suggestions });
    }
    return { pass, suggestions };
  };
}

function getIngredientEmoji(name) {
  const value = String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const matchers = [
    [/avocado/, "🥑"],
    [/(banaan|bananen)/, "🍌"],
    [/(aardbei|aardbeien|framboos|frambozen|blauwe bes|blauwe bessen|bosbes|bosbessen)/, "🫐"],
    [/(appel|appels)/, "🍎"],
    [/(peer|peren)/, "🍐"],
    [/(citroen|citroenen|limoen|limoenen|lime)/, "🍋"],
    [/(sinaasappel|mandarijn)/, "🍊"],
    [/(druif|druiven)/, "🍇"],
    [/(kers|kersen)/, "🍒"],
    [/(perzik|abrikoos|mango|ananas)/, "🍑"],
    [/(tomaat|tomaten|cherry tomaat|cherrytomaat)/, "🍅"],
    [/(paprika|paprika's|paprikamix)/, "🫑"],
    [/(komkommer|courgette|augurk)/, "🥒"],
    [/(wortel|wortels|peen|winterpeen)/, "🥕"],
    [/(broccoli|bloemkool|kool|spruit|spruitjes|paksoi|boerenkool)/, "🥦"],
    [/(sla|ijsbergsla|romaine|rucola|spinazie|andijvie|veldslamix|slamix)/, "🥬"],
    [/(ui|uien|rode ui|gele ui|sjalot|sjalotten|bosui|lente ui)/, "🧅"],
    [/(knoflook|knoflookteen|knoflooktenen)/, "🧄"],
    [/(champignon|champignons|paddenstoel|paddenstoelen)/, "🍄"],
    [/(mais|maiskorrel)/, "🌽"],
    [/(chili|peper|jalapeno)/, "🌶️"],
    [/(aardappel|aardappelen|krieltjes|friet|zoete aardappel)/, "🥔"],
    [/(rijst|basmati|jasmijnrijst)/, "🍚"],
    [/(spaghetti|pasta|penne|fusilli|macaroni|tagliatelle|linguine|lasagne|gnocchi|noodle|noedels)/, "🍝"],
    [/(wrap|tortilla|naan|pita|broodje|bun|brood|toast|bagel|brioche)/, "🍞"],
    [/(ei|eieren)/, "🥚"],
    [/(melk|karnemelk|yoghurt|kwark|room|slagroom|kookroom|creme fraiche|creme fraîche)/, "🥛"],
    [/(kaas|parmezaan|pecorino|feta|mozzarella|cheddar|gouda|mascarpone)/, "🧀"],
    [/(boter|margarine)/, "🧈"],
    [/(kip|kipfilet|kippendij|kipgehakt)/, "🍗"],
    [/(burger|gehakt|rundergehakt|vlees|biefstuk|spek|spekjes|ham)/, "🥩"],
    [/(zalm|tonijn|kabeljauw|garnalen|vis)/, "🐟"],
    [/(tofu|tempeh|vegetarische burger|vega burger|falafel)/, "🌱"],
    [/(bonen|kidneybonen|kikkererwten|linzen)/, "🫘"],
    [/(pesto|saus|pastasaus|tomatenpuree|tomatenblokjes|mayonaise|mayo|dressing|ketjap|soja)/, "🫙"],
    [/(honing|siroop)/, "🍯"],
    [/(suiker|poedersuiker|dadel|dadels|rozijn|rozijnen)/, "🍯"],
    [/(bloem|speltbloem|zelfrijzend bakmeel|amandelmeel|meel|havermout)/, "🌾"],
    [/(koffie|espresso|cacao|chocolade)/, "☕"],
    [/(koriander|peterselie|basilicum|bieslook|munt|dille)/, "🌿"],
    [/(mosterd|kerrie|kruiden|paprikapoeder|komijn|oregano|tijm|kaneel)/, "🧂"],
  ];

  for (const [pattern, emoji] of matchers) {
    if (pattern.test(value)) {
      return emoji;
    }
  }

  return "🛒";
}

function getIngredientIllustration(name) {
  const value = String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (/avocado/.test(value)) return "assets/ingredients/avocado.svg";
  if (/(banaan|bananen)/.test(value)) return "assets/ingredients/banana.svg";
  if (/(tomaat|tomaten|cherry tomaat|cherrytomaat)/.test(value)) return "assets/ingredients/tomato.svg";
  if (/(ui|uien|rode ui|gele ui|sjalot|sjalotten|bosui|lente ui)/.test(value)) return "assets/ingredients/onion.svg";
  if (/(sla|ijsbergsla|romaine|rucola|spinazie|andijvie|veldslamix|slamix|broccoli|bloemkool|kool)/.test(value)) {
    return "assets/ingredients/greens.svg";
  }
  if (/(wortel|wortels|peen|winterpeen)/.test(value)) return "assets/ingredients/carrot.svg";
  if (/(komkommer|courgette|augurk)/.test(value)) return "assets/ingredients/cucumber.svg";
  if (/(aardappel|aardappelen|krieltjes|friet|zoete aardappel)/.test(value)) return "assets/ingredients/potato.svg";
  if (/(spaghetti|pasta|penne|fusilli|macaroni|tagliatelle|linguine|lasagne|gnocchi|noodle|noedels)/.test(value)) {
    return "assets/ingredients/pasta.svg";
  }
  if (/(wrap|tortilla|naan|pita|broodje|bun|brood|toast|bagel|brioche)/.test(value)) return "assets/ingredients/bread.svg";
  if (/(ei|eieren)/.test(value)) return "assets/ingredients/egg.svg";
  if (/(melk|karnemelk|yoghurt|kwark|room|slagroom|kookroom|creme fraiche|creme fraîche)/.test(value)) {
    return "assets/ingredients/milk.svg";
  }
  if (/(kaas|parmezaan|pecorino|feta|mozzarella|cheddar|gouda|mascarpone)/.test(value)) return "assets/ingredients/cheese.svg";
  if (/(kip|kipfilet|kippendij|kipgehakt)/.test(value)) return "assets/ingredients/chicken.svg";
  if (/(burger|gehakt|rundergehakt|vlees|biefstuk|spek|spekjes|ham)/.test(value)) return "assets/ingredients/steak.svg";
  if (/(zalm|tonijn|kabeljauw|garnalen|vis)/.test(value)) return "assets/ingredients/fish.svg";
  if (/(tofu|tempeh|vegetarische burger|vega burger|falafel|bonen|kidneybonen|kikkererwten|linzen)/.test(value)) {
    return "assets/ingredients/beans.svg";
  }
  if (/(pesto|saus|pastasaus|tomatenpuree|tomatenblokjes|mayonaise|mayo|dressing|ketjap|soja|honing|siroop)/.test(value)) {
    return "assets/ingredients/jar.svg";
  }
  if (/(koriander|peterselie|basilicum|bieslook|munt|dille|kruiden|oregano|tijm)/.test(value)) return "assets/ingredients/herb.svg";
  return "";
}

function getIngredientVisualMarkup(name) {
  const illustration = getIngredientIllustration(name);
  if (illustration) {
    return `<img class="ingredient-visual__img" src="${illustration}" alt="" loading="lazy" />`;
  }
  return `<span class="ingredient-visual__emoji">${getIngredientEmoji(name)}</span>`;
}

function getIngredientGroup(name) {
  const value = name.toLowerCase();
  if (/(avocado|sla|tomaat|ui|koriander|banaan|citroen|limoen|lime|paprika|komkommer|courgette|wortel|spinazie)/.test(value)) {
    return "produce";
  }
  if (/(zalm|vis|tonijn|garnalen|kabeljauw)/.test(value)) {
    return "fish";
  }
  if (/(burger|kip|gehakt|runder|bacon|guanciale|spek|tofu|ei|feta|kaas)/.test(value)) {
    return "protein";
  }
  if (/(mayo|saus|kruiden|honing|peper|zout|flakes|mosterd|azijn)/.test(value)) {
    return "flavour";
  }
  return "pantry";
}

function getGroupMeta(group) {
  switch (group) {
    case "produce":
      return {
        title: "Groenten & Fruit",
        icon:
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.2c1.1-1.5 2.7-2.2 4.5-2.2c2.8 0 5 2.2 5 5c0 5-4.4 8.8-9.5 10.4C6.9 17.8 2.5 14 2.5 9c0-2.8 2.2-5 5-5c1.8 0 3.4.7 4.5 2.2ZM12 6.2c-.9-1.7-.8-3.4.7-4.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        className: "group-icon group-icon--produce",
      };
    case "protein":
      return {
        title: "Vlees & Gevogelte",
        icon:
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 4.5c-5.7.4-9.6 3.1-11.7 8.1c-.8 2-.9 3.9-.8 6.9c3-1.4 4.8-2.9 6.1-4.7c2.8-3.7 3-7.4 6.4-10.3Zm-12 15c3-2 5.9-3.3 8.8-3.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        className: "group-icon group-icon--protein",
      };
    case "fish":
      return {
        title: "Vis",
        icon:
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12s-3.5-5-8-5c-3.2 0-5.3 1.8-7 5c1.7 3.2 3.8 5 7 5c4.5 0 8-5 8-5Zm-8 0h.01" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        className: "group-icon group-icon--fish",
      };
    case "flavour":
      return {
        title: "Smaakmakers",
        icon:
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v5l-4.6 7.2A3 3 0 0 0 6.9 20h10.2a3 3 0 0 0 2.5-4.8L15 8V3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        className: "group-icon group-icon--flavour",
      };
    default:
      return {
        title: "Overig",
        icon:
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M6.5 6l1 12h9l1-12M9 10v5M12 10v5M15 10v5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        className: "group-icon group-icon--pantry",
      };
  }
}

function getVisibleRecipes() {
  let recipes = state.recipes;

  // Kookboek-filter
  if (state.activeCookbookFilter) {
    const cookbook = state.cookbooks.find((cb) => cb.id === state.activeCookbookFilter);
    if (cookbook) {
      const ids = new Set(cookbook.recipeIds);
      recipes = recipes.filter((recipe) => ids.has(recipe.id));
    }
  }

  // Zoek-filter
  const query = state.searchQuery.trim().toLowerCase();
  if (!query) {
    return recipes;
  }

  // Ingredient search: "met kip en citroen" or "met kip, ui"
  const ingredientSearchMatch = /^met\s+(.+)/i.exec(query);
  if (ingredientSearchMatch) {
    const terms = ingredientSearchMatch[1]
      .split(/\s+en\s+|,\s*/)
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    if (terms.length) {
      return recipes.filter((recipe) => {
        const ingText = (recipe.ingredients || []).map((i) => (i.name || "").toLowerCase()).join(" ");
        return terms.every((term) => ingText.includes(term));
      });
    }
  }

  return recipes.filter((recipe) => {
    const haystack = [
      recipe.title,
      recipe.description || "",
      recipe.platform,
      recipe.caption || "",
      ...recipe.ingredients.map((ingredient) => ingredient.name),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
}

function getImportStatusMeta(recipe) {
  if (!recipe || recipe.isSeed || SEED_RECIPE_IDS.has(recipe.id)) {
    return { label: "Redactie", tone: "editorial" };
  }

  if (recipe.needsReview) {
    return { label: "Controle nodig", tone: "warn" };
  }

  if ((recipe.ingredients || []).length >= 5 && (recipe.instructions || []).length >= 4) {
    return { label: "Klaar om te koken", tone: "good" };
  }

  return { label: "Even nalopen", tone: "soft" };
}

const CLOCK_SVG = `<svg class="recipe-time__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const WISSEL_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>`;

const INGREDIENT_SWAPS = [
  ["koriander", "peterselie"],
  ["kipfilet", "kippendij"],
  ["rundergehakt", "half om half gehakt"],
  ["slagroom", "kookroom"],
  ["crème fraîche", "yoghurt"],
];

function renderFeaturedRecipe() {
  const recipe = getHomeFeaturedRecipe();
  featuredImage.src = recipe.image;
  featuredImage.alt = recipe.alt;
  featuredTitle.textContent = recipe.title;
  if (featuredDescription) {
    featuredDescription.textContent = recipe.description || "";
  }
  if (featuredTime) {
    featuredTime.innerHTML = `${CLOCK_SVG}${escapeHtml(recipe.time)}`;
  }
  if (featuredServings) {
    featuredServings.textContent = recipe.servings
      .replace(/pers\./i, "personen")
      .replace(/pers/i, "personen");
  }
  if (featuredSourceIcon) {
    featuredSourceIcon.innerHTML = "";
  }
}

function getImportedRecipes() {
  return state.recipes.filter((recipe) => !SEED_RECIPE_IDS.has(recipe.id) && !recipe.isSeed);
}

function getSavedImportedRecipes() {
  return getImportedRecipes().filter((recipe) => isRecipeSaved(recipe.id));
}

// ── Channel recipe search ─────────────────────────────────────────────────────

let channelSearchTimeout = null;
/** Abort lopende /api/channel-search als de gebruiker verder typt of het paneel sluit */
let channelSearchAbortController = null;
let importChannelSearchAbortController = null;
/** Tijd na laatste toets voordat de zoekrequest start (lager = sneller na stoppen met typen) */
const CHANNEL_SEARCH_DEBOUNCE_MS = 100;
const CHANNEL_SEARCH_SKELETON_MS = 50;
const IMPORT_CHANNEL_SEARCH_DEBOUNCE_MS = 240;

function getActiveFollowedSeedChannelIds() {
  // Only seed channels can be toggled; custom channels are passed separately via customChannels param.
  // Pending/rejected custom channels should never block seed searching.
  return state.followedChannelIds
    .filter((id) => SEED_CHANNELS.some((ch) => ch.id === id))
    .filter((id) => isSeedChannelEnabled(id));
}

/**
 * Seed-kanalen die het account volgt én die in de app aan staan — gebruikt voor home-/import-zoeken.
 */
function getSeedChannelIdsForRecipeSearch() {
  return getActiveFollowedSeedChannelIds();
}

function countActiveFollowedChannels() {
  const seedActive = getActiveFollowedSeedChannelIds().length;
  const approvedCustomActive = state.customChannels.filter(
    (ch) =>
      state.followedChannelIds.includes(ch.id) &&
      (ch.status || "approved") === "approved" &&
      isCustomChannelEnabled(ch.id)
  ).length;
  return seedActive + approvedCustomActive;
}

function normalizeChannelUrlForCompare(url) {
  const raw = String(url || "").trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    const path = (u.pathname || "/").replace(/\/+$/, "") || "/";
    return { host, path };
  } catch {
    return null;
  }
}

function normalizeChannelBase(url) {
  const norm = normalizeChannelUrlForCompare(url);
  if (!norm) return "";
  const seg = norm.path.split("/").filter(Boolean)[0] || "";
  return seg ? `${norm.host}/${seg}` : norm.host;
}

function channelUrlsMatchByBaseOrPrefix(aUrl, bUrl) {
  const a = normalizeChannelUrlForCompare(aUrl);
  const b = normalizeChannelUrlForCompare(bUrl);
  if (!a || !b) return false;
  if (a.host !== b.host) return false;
  if (a.path === b.path) return true;
  const aBase = normalizeChannelBase(aUrl);
  const bBase = normalizeChannelBase(bUrl);
  if (aBase && bBase && aBase === bBase) return true;
  const aPath = a.path.endsWith("/") ? a.path : `${a.path}/`;
  const bPath = b.path.endsWith("/") ? b.path : `${b.path}/`;
  return aPath.startsWith(bPath) || bPath.startsWith(aPath);
}

function findMatchingSeedChannelForUrl(customUrl) {
  for (const seed of SEED_CHANNELS) {
    if (channelUrlsMatchByBaseOrPrefix(customUrl, seed.url)) return seed;
  }
  return null;
}

function normalizeChannelThumbnailUrl(url) {
  const raw = String(url || "").trim().replace(/[\\'"]+$/g, "");
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) {
    try {
      const host = new URL(raw).hostname.replace(/^www\./, "").toLowerCase();
      const proxyHosts = new Set([
        "static.ah.nl",
        "lekkerensimpel.com",
        "lekkeren-simpel.nl",
        "i0.wp.com",
        "i1.wp.com",
        "i2.wp.com",
        "i3.wp.com",
      ]);
      if (
        proxyHosts.has(host) ||
        host.endsWith(".static.ah.nl") ||
        host.endsWith(".googleusercontent.com") ||
        host.endsWith(".gstatic.com")
      ) {
        return `/api/image-proxy?url=${encodeURIComponent(raw)}`;
      }
    } catch {
      return raw;
    }
    return raw;
  }
  return raw; // assets/..., relative paths, etc.
}

function getChannelFallbackVisual(channel, channelColor) {
  return `<div class="ch-card__img ch-card__img--placeholder" style="background:${escapeHtml(channelColor)}22">
    <span style="font-size:2rem;opacity:.4">${escapeHtml(channel?.initials || "?")}</span>
  </div>`;
}

function getChannelThumbnailMarkup(result, channel, channelColor) {
  const thumbUrl = normalizeChannelThumbnailUrl(result.thumbnail);
  if (!thumbUrl) return getChannelFallbackVisual(channel, channelColor);
  return `
    <img
      class="ch-card__img"
      src="${escapeHtml(thumbUrl)}"
      alt="${escapeHtml(result.title)}"
      loading="lazy"
      referrerpolicy="no-referrer"
      onerror="this.outerHTML='${escapeHtml(getChannelFallbackVisual(channel, channelColor))}'"
    />`;
}

function getChannelImportLoadingMarkup() {
  return `<svg class="spin" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 1 0 8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>Plately is bezig...</span>`;
}

function sanitizeRatingSourceLabel(raw) {
  const s = String(raw ?? "").trim().replace(/[\u0000-\u001f<>]/g, "");
  return s.slice(0, 48);
}

/** @param {{ ratingValue?: number; ratingCount?: number; channel?: string; ratingNormalizedFromWideScale?: boolean }} r */
function formatChannelSearchRatingHtml(r, options = {}) {
  const cnt = Number(r?.ratingCount);
  if (!Number.isFinite(cnt) || cnt < 1) return "";
  const raw = r?.ratingValue;
  if (raw == null || raw === "") return "";
  const num = Math.min(5, Math.max(1, Math.round(Number(raw))));
  if (!Number.isFinite(num) || num < 1) return "";

  const showSource =
    Boolean(options.showRatingSource) &&
    sanitizeRatingSourceLabel(String(r?.channel || "").trim()).length > 0;
  let chipSrc = sanitizeRatingSourceLabel(String(r.channel || "").trim());
  if (chipSrc.length > 14) chipSrc = `${chipSrc.slice(0, 13)}…`;

  let confidenceLine = "";
  if (cnt >= 150) {
    const approx = Math.round(cnt / 50) * 50;
    confidenceLine = `Gebaseerd op ca. ${approx} waarderingen op de bronwebsite.`;
  } else if (cnt >= 35) {
    const approx = Math.round(cnt / 5) * 5;
    confidenceLine = `Gebaseerd op ca. ${approx} waarderingen op de bronwebsite.`;
  } else if (cnt >= 15) {
    confidenceLine = `Gebaseerd op ${cnt} waarderingen op de bronwebsite.`;
  }

  const scaleNote = r?.ratingNormalizedFromWideScale
    ? "De bron gebruikt een hogere scoreschaal; hier getoond als sterren op 5. "
    : "";

  const trustNote = "Sterren komen uit gestructureerde gegevens op de bronwebsite, niet van Plately.";

  const ariaPieces = [
    scaleNote,
    chipSrc && showSource ? `${chipSrc}. ` : "",
    `Gemiddeld ${num} van 5 sterren, ${cnt} ${cnt === 1 ? "waardering" : "waarderingen"}`,
    confidenceLine ? ` ${confidenceLine}` : "",
    ` ${trustNote}`,
  ];
  const ariaLabel = ariaPieces.join("").trim();

  const starSvg =
    '<svg class="ch-card__rating-icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></svg>';
  const countHtml = `<span class="ch-card__rating-sep" aria-hidden="true">·</span><span class="ch-card__rating-count">${cnt}×</span>`;
  const sourceHtml =
    showSource ?
      `<span class="ch-card__rating-source">${escapeHtml(chipSrc)}</span>`
    : "";
  const confidenceHtml = confidenceLine
    ? `<span class="ch-card__rating-confidence">${escapeHtml(confidenceLine)}</span>`
    : "";
  const scaleHtml = r?.ratingNormalizedFromWideScale ?
    `<span class="ch-card__rating-scale-note" title="De bron geeft scores op een hogere schaal dan 5; Plately toont het gemiddelde hier als sterren op 5.">10→5</span>`
  : "";

  const trustHtml = `<span class="ch-card__rating-trust">${escapeHtml(trustNote)}</span>`;

  return `<div class="ch-card__rating">
    <span class="ch-card__rating-pill" aria-label="${escapeHtml(ariaLabel)}">
      ${sourceHtml}
      ${starSvg}
      <span class="ch-card__rating-score">
        <span class="ch-card__rating-num">${num}</span><span class="ch-card__rating-suffix">/5</span>
      </span>
      ${countHtml}
      ${scaleHtml}
    </span>
    ${confidenceHtml}
    ${trustHtml}
  </div>`;
}

function renderChannelSearchResults(results, filter = state.channelSearchFilter) {
  if (!channelSearchSection || !channelSearchResults) return;

  perfMeasure("renderChannelSearchResults", () => {
    state.channelSearchAllResults = results ?? state.channelSearchAllResults;
    // If the current filter doesn't exist in these results, reset to "Alles"
    // to avoid the UI showing "no results" while there actually are results.
    const presentChannelIds = [...new Set((state.channelSearchAllResults || []).map((r) => r.channelId).filter(Boolean))];
    const effectiveFilter = filter && presentChannelIds.includes(filter) ? filter : "";
    state.channelSearchFilter = effectiveFilter || null;

    const all = state.channelSearchAllResults;

    if (!all || all.length === 0) {
      // Only hide if we're not actively searching
      if (!state.channelSearchQuery || state.channelSearchQuery.trim().length === 0) {
        // Only hide if truly no search is active AND no previous results
        channelSearchSection.classList.add("hidden");
        channelSearchResults.innerHTML = "";
        renderChannelFilterChips([]);
      } else {
        // Show "no results" message when actively searching but got nothing
        channelSearchSection.classList.remove("hidden");
        channelSearchResults.innerHTML = `
          <div class="ch-search-empty" style="grid-column:1/-1;text-align:center;padding:2rem 1rem;max-width:26rem;margin:0 auto">
            <p style="margin:0 0 .75rem;font-weight:650;color:var(--text,#2a2a28)">Geen resultaten gevonden in de geselecteerde kanalen</p>
            <p style="margin:0 0 1.1rem;font-size:0.95rem;opacity:.88;line-height:1.45">
              Zet meer receptenkanalen aan via <strong>Profiel</strong> → <strong>Gekoppelde kanalen</strong>.
            </p>
            <button type="button" class="profile-login-banner__btn profile-login-banner__btn--primary" data-open-channel-settings>
              Kanalen beheren
            </button>
          </div>`;
      }
      return;
    }

    const filtered = effectiveFilter ? all.filter((r) => r.channelId === effectiveFilter) : all;

    channelSearchSection.classList.remove("hidden");
    renderChannelFilterChips(all);

    const allCh = getAllChannels();
    const channelById = new Map(allCh.map((ch) => [ch.id, ch]));

    const showRatingSourceInPill = !effectiveFilter && presentChannelIds.length > 1;

    const rows = filtered.length ? filtered : all;
    if (!filtered.length && effectiveFilter) {
      state.channelSearchFilter = null;
      renderChannelFilterChips(all);
    }

    channelSearchResults.innerHTML = `<div class="ch-result-grid">${rows.map((r) => {
      const channel = channelById.get(r.channelId);
      const channelColor = channel?.color || "#8da485";
      const thumbUrl = normalizeChannelThumbnailUrl(r.thumbnail);
      const thumbHtml = getChannelThumbnailMarkup(r, channel, channelColor);
      return `
      <div class="ch-card" data-ch-card-url="${escapeHtml(r.url)}" data-ch-card-thumb="${escapeHtml(thumbUrl || "")}">
        <div class="ch-card__visual">
          ${thumbHtml}
          <span class="ch-card__badge" style="background:${escapeHtml(channelColor)}">${escapeHtml(r.channel)}</span>
        </div>
        <div class="ch-card__body">
          <p class="ch-card__title">${escapeHtml(r.title)}</p>
          ${formatChannelSearchRatingHtml(r, { showRatingSource: showRatingSourceInPill })}
          ${r.description ? `<p class="ch-card__desc">${escapeHtml(r.description)}</p>` : ""}
          ${r.time ? `<span class="ch-card__time">⏱ ${escapeHtml(r.time)}</span>` : ""}
        </div>
        <div class="ch-card__actions">
          <a class="ch-card__view" href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer" aria-label="Bekijk ${escapeHtml(r.title)} op ${escapeHtml(r.channel)}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4.5a1 1 0 0 1 1-1h3.5A1.5 1.5 0 0 1 20 5v3.5a1 1 0 1 1-2 0V6.91l-5.3 5.3a1 1 0 0 1-1.4-1.42L16.59 5.5H15a1 1 0 0 1-1-1Zm-8 4A2.5 2.5 0 0 1 8.5 6h3a1 1 0 1 1 0 2h-3a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-3a1 1 0 1 1 2 0v3a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 6 16.5v-8Z" fill="currentColor"/></svg>
            Bekijk
          </a>
          <button class="ch-card__import" type="button"
            data-channel-import-url="${escapeHtml(r.url)}"
            data-channel-import-thumb="${escapeHtml(thumbUrl || "")}"
            aria-label="Importeer ${escapeHtml(r.title)}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
            Importeer
          </button>
        </div>
      </div>`;
    }).join("")}</div>`;
  });
}

function renderChannelFilterChips(results) {
  const filterRow = document.getElementById("channelSearchFilters");
  if (!filterRow) return;

  // Build set of channelIds present in results
  const present = [...new Set(results.map((r) => r.channelId))];
  if (present.length <= 1) { filterRow.innerHTML = ""; return; }

  filterRow.innerHTML = [
    `<button class="channel-filter-pill ${!state.channelSearchFilter ? "" : "is-off"}" data-ch-filter="">Alles</button>`,
    ...getAllChannels()
      .filter((ch) => present.includes(ch.id))
      .map((ch) => {
        const fav = getSourceIconUrl(ch.url);
        return `<button class="channel-filter-pill ${state.channelSearchFilter === ch.id ? "" : "is-off"}" data-ch-filter="${escapeHtml(ch.id)}">${fav ? `<img src="${escapeHtml(fav)}" alt="" loading="lazy" onerror="this.style.display='none'" />` : ""}${escapeHtml(ch.name)}</button>`;
      })
  ].join("");
}

async function searchChannels(query) {
  if (!query || query.trim().length < 2) {
    channelSearchAbortController?.abort();
    channelSearchAbortController = null;
    renderChannelSearchResults([]);
    return;
  }
  state.channelSearchQuery = query.trim();
  pushRecentSearch(state.channelSearchQuery);

  // Skeleton loader: only show if the request isn't instant.
  const requestId = (searchChannels._reqId = (searchChannels._reqId || 0) + 1);
  channelSearchAbortController?.abort();
  const abortCtl = new AbortController();
  channelSearchAbortController = abortCtl;
  let skeletonTimer = null;
  skeletonTimer = setTimeout(() => {
    if (requestId !== searchChannels._reqId) return;
    if (!channelSearchSection || !channelSearchResults) return;
    channelSearchSection.classList.remove("hidden");
    channelSearchResults.innerHTML = `
      <div style="padding: 12px 14px; display: grid; gap: 10px;">
        ${Array.from({ length: 4 }).map(() => `
          <div class="ch-result" aria-hidden="true" style="cursor: default;">
            <div class="skeleton" style="width: 54px; height: 54px; border-radius: 12px;"></div>
            <div style="flex:1; min-width:0; display:grid; gap:6px;">
              <div class="skeleton" style="height: 12px; width: 62%;"></div>
              <div class="skeleton" style="height: 10px; width: 38%; opacity: .9;"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }, CHANNEL_SEARCH_SKELETON_MS);
  try {
    const channels = getSeedChannelIdsForRecipeSearch().join(",");
    // Only include approved custom channels in search
    const followedCustomChannels = state.customChannels.filter(
      (ch) =>
        state.followedChannelIds.includes(ch.id) &&
        (ch.status || "approved") === "approved" &&
        isCustomChannelEnabled(ch.id)
    );
    const dedupedCustomChannels = followedCustomChannels.filter((ch) => {
      const seed = findMatchingSeedChannelForUrl(ch.url);
      // Only dedupe when the matching seed exists in zoek-scope (enabled) and zou dubbel zoeken.
      return !(seed && getSeedChannelIdsForRecipeSearch().includes(seed.id));
    });
    if (dedupedCustomChannels.length !== followedCustomChannels.length) {
      console.log("🧹 Deduped custom channels for search:", {
        before: followedCustomChannels.length,
        after: dedupedCustomChannels.length,
      });
    }
    const customChannelsParam = dedupedCustomChannels.map((ch) => `${ch.id}|${ch.name}|${ch.url}`).join(",");
    let url = `/api/channel-search?q=${encodeURIComponent(query.trim())}&channels=${encodeURIComponent(channels)}`;
    if (customChannelsParam) url += `&customChannels=${encodeURIComponent(customChannelsParam)}`;

    console.log("🔍 Channel search:", { query: query.trim(), channels, url });

    const resp = await fetch(url, { signal: abortCtl.signal });
    const data = await resp.json();
    if (requestId !== searchChannels._reqId) return;
    console.log("✅ Channel search results:", data.results?.length || 0, "results");
    if (data.results && data.results.length > 0) {
      console.log("📦 First result details:", {
        title: data.results[0].title,
        channelId: data.results[0].channelId,
        channel: data.results[0].channel,
        url: data.results[0].url?.substring(0, 80)
      });
    }
    renderChannelSearchResults(data.results || []);
  } catch (error) {
    if (error?.name === "AbortError") return;
    console.error("❌ Channel search error:", error);
    if (requestId !== searchChannels._reqId) return;
    renderChannelSearchResults([]);
  } finally {
    if (skeletonTimer) clearTimeout(skeletonTimer);
  }
}

async function searchChannelsOnImportScreen(query) {
  const section = document.getElementById("importChannelSearchSection");
  const results = document.getElementById("importChannelSearchResults");
  const orRow = document.getElementById("importOrRow");
  if (!query || query.trim().length < 2) {
    importChannelSearchAbortController?.abort();
    importChannelSearchAbortController = null;
    if (section) section.classList.add("hidden");
    if (orRow) orRow.classList.remove("hidden");
    return;
  }
  state.channelSearchQuery = query.trim();
  // Skeleton loader: only show if the request isn't instant.
  const requestId = (searchChannelsOnImportScreen._reqId = (searchChannelsOnImportScreen._reqId || 0) + 1);
  importChannelSearchAbortController?.abort();
  const importAbortCtl = new AbortController();
  importChannelSearchAbortController = importAbortCtl;
  if (section) section.classList.remove("hidden");
  let skeletonTimer = null;
  skeletonTimer = setTimeout(() => {
    if (requestId !== searchChannelsOnImportScreen._reqId) return;
    if (!results) return;
    results.innerHTML = `
      <div style="padding: 12px 14px; display: grid; gap: 10px;">
        ${Array.from({ length: 4 }).map(() => `
          <div class="ch-result" aria-hidden="true" style="cursor: default;">
            <div class="skeleton" style="width: 54px; height: 54px; border-radius: 12px;"></div>
            <div style="flex:1; min-width:0; display:grid; gap:6px;">
              <div class="skeleton" style="height: 12px; width: 62%;"></div>
              <div class="skeleton" style="height: 10px; width: 38%; opacity: .9;"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }, CHANNEL_SEARCH_SKELETON_MS);
  if (orRow) orRow.classList.add("hidden");
  try {
    const channels = getSeedChannelIdsForRecipeSearch().join(",");
    // Only include approved custom channels in search
    const followedCustomChannels = state.customChannels.filter(
      (ch) =>
        state.followedChannelIds.includes(ch.id) &&
        (ch.status || "approved") === "approved" &&
        isCustomChannelEnabled(ch.id)
    );
    const dedupedCustomChannels = followedCustomChannels.filter((ch) => {
      const seed = findMatchingSeedChannelForUrl(ch.url);
      return !(seed && getSeedChannelIdsForRecipeSearch().includes(seed.id));
    });
    if (dedupedCustomChannels.length !== followedCustomChannels.length) {
      console.log("🧹 Deduped custom channels for search (import):", {
        before: followedCustomChannels.length,
        after: dedupedCustomChannels.length,
      });
    }
    const customChannelsParam = dedupedCustomChannels.map((ch) => `${ch.id}|${ch.name}|${ch.url}`).join(",");
    let url = `/api/channel-search?q=${encodeURIComponent(query.trim())}&channels=${encodeURIComponent(channels)}`;
    if (customChannelsParam) url += `&customChannels=${encodeURIComponent(customChannelsParam)}`;
    const resp = await fetch(url, { signal: importAbortCtl.signal });
    const data = await resp.json();
    if (requestId !== searchChannelsOnImportScreen._reqId) return;
    const all = data.results || [];
    if (!all.length) {
      if (results) results.innerHTML = `<p class="ch-result__loading">Geen resultaten gevonden.</p>`;
      if (orRow) orRow.classList.remove("hidden");
      return;
    }
    const importSearchMultiChannel =
      new Set(all.map((r) => r.channelId).filter(Boolean)).size > 1;

    if (results) {
      results.innerHTML = `<div class="ch-result-grid">${all.map((r) => {
        const allCh = getAllChannels();
        const channel = allCh.find((ch) => ch.id === r.channelId);
        const channelColor = channel?.color || "#8da485";
        const thumbUrl = normalizeChannelThumbnailUrl(r.thumbnail);
        const thumbHtml = getChannelThumbnailMarkup(r, channel, channelColor);
        return `
          <div class="ch-card" data-ch-card-url="${escapeHtml(r.url)}">
            <div class="ch-card__visual">
              ${thumbHtml}
              <span class="ch-card__badge" style="background:${escapeHtml(channelColor)}">${escapeHtml(r.channel)}</span>
            </div>
            <div class="ch-card__body">
              <p class="ch-card__title">${escapeHtml(r.title)}</p>
              ${formatChannelSearchRatingHtml(r, { showRatingSource: importSearchMultiChannel })}
              ${r.time ? `<span class="ch-card__time">⏱ ${escapeHtml(r.time)}</span>` : ""}
            </div>
            <div class="ch-card__actions">
              <a class="ch-card__view" href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4.5a1 1 0 0 1 1-1h3.5A1.5 1.5 0 0 1 20 5v3.5a1 1 0 1 1-2 0V6.91l-5.3 5.3a1 1 0 0 1-1.4-1.42L16.59 5.5H15a1 1 0 0 1-1-1Zm-8 4A2.5 2.5 0 0 1 8.5 6h3a1 1 0 1 1 0 2h-3a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-3a1 1 0 1 1 2 0v3a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 6 16.5v-8Z" fill="currentColor"/></svg>
                Bekijk
              </a>
              <button class="ch-card__import" type="button"
                data-channel-import-url="${escapeHtml(r.url)}"
                data-channel-import-thumb="${escapeHtml(thumbUrl || "")}"
                aria-label="Importeer ${escapeHtml(r.title)}">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
                Importeer
              </button>
            </div>
          </div>`;
      }).join("")}</div>`;
    }
    if (orRow) orRow.classList.remove("hidden");
  } catch (err) {
    if (err?.name === "AbortError") return;
    if (requestId !== searchChannelsOnImportScreen._reqId) return;
    if (section) section.classList.add("hidden");
    if (orRow) orRow.classList.remove("hidden");
  } finally {
    if (skeletonTimer) clearTimeout(skeletonTimer);
  }
}

function renderHomeStats() {
  if (!homeStats) {
    return;
  }
  homeStats.innerHTML = "";
}

function renderRecentImports() {
  const heading = document.getElementById("recentImportsHeading");
  const grid = document.getElementById("recentImportsGrid");
  if (!heading || !grid) return;

  // Only show recipes the user actually saved (newest first)
  const imported = getSavedImportedRecipes().slice(0, 4);

  heading.classList.remove("hidden");

  // Recipe cards + fill remaining slots with an "add" card (up to 4 total)
  const cards = imported.map((recipe) => {
    const faviconUrl = getSourceIconUrl(recipe.sourceUrl || "");
    return `
    <button class="recent-card" type="button" data-recipe-id="${escapeHtml(recipe.id)}">
      <img class="recent-card__img" src="${escapeHtml(recipe.image || "assets/hero-burger.svg")}" alt="${escapeHtml(recipe.title)}" loading="lazy" />
      ${faviconUrl ? `<span class="recent-card__favicon"><img src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" /></span>` : ""}
      <div class="recent-card__body">
        <p class="recent-card__title">${escapeHtml(recipe.title)}</p>
        <p class="recent-card__meta">${escapeHtml(recipe.time || "")}</p>
      </div>
    </button>
  `;
  });

  // Add a + import card in the empty slots
  const slotsLeft = Math.max(0, 4 - imported.length);
  for (let i = 0; i < Math.min(slotsLeft, imported.length === 0 ? 1 : 1); i++) {
    cards.push(`
      <button class="recent-card recent-card--add" type="button" id="recentAddButton">
        <div class="recent-card__add-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        </div>
        <div class="recent-card__body">
          <p class="recent-card__title">Recept toevoegen</p>
          <p class="recent-card__meta">Importeer via link</p>
        </div>
      </button>
    `);
  }

  perfMeasure("renderRecentImports", () => {
    grid.innerHTML = cards.join("");
  });

  // Bind once: event delegation prevents per-render listener churn.
  if (!grid.dataset.bound) {
    grid.dataset.bound = "1";
    grid.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const add = target.closest("#recentAddButton");
      if (add) {
        document.getElementById("openImportButton")?.click();
        return;
      }
      const card = target.closest(".recent-card[data-recipe-id]");
      if (!(card instanceof HTMLElement)) return;
      const id = card.dataset.recipeId;
      if (!id) return;
      state.selectedRecipeId = id;
      renderDetailRecipe(true);
      switchView("detail");
    });
  }
}

function renderHomeConcepts() {
  if (!homeConceptsHeading || !homeConceptsGrid) {
    return;
  }

  const previews = Object.values(state.importPreviews || {}).filter(Boolean);
  previews.sort((a, b) => Number(b._previewCreatedAt || 0) - Number(a._previewCreatedAt || 0));
  const items = previews.slice(0, 4);

  if (!items.length) {
    homeConceptsHeading.classList.add("hidden");
    homeConceptsGrid.innerHTML = "";
    if (homeConceptsBanner) {
      homeConceptsBanner.classList.add("hidden");
      homeConceptsBanner.innerHTML = "";
    }
    return;
  }

  if (homeConceptsBanner) {
    const n = previews.length;
    const newest = previews[0];
    homeConceptsBanner.classList.remove("hidden");
    homeConceptsBanner.innerHTML = `
      <div class="home-concepts-banner__inner">
        <span class="home-concepts-banner__icon" aria-hidden="true">📝</span>
        <p class="home-concepts-banner__text"><strong>${n === 1 ? "1 import" : `${n} imports`}</strong> nog niet in een kookboek — rond de import af zodat alles klopt.</p>
        <button type="button" class="home-concepts-banner__btn" id="homeConceptsBannerCta">Naar controle</button>
      </div>
    `;
    const cta = document.getElementById("homeConceptsBannerCta");
    if (cta && newest?.id) {
      cta.onclick = () => openImportReview(newest.id);
    }
  }

  homeConceptsHeading.classList.remove("hidden");
  homeConceptsGrid.innerHTML = items
    .map((recipe) => {
      const faviconUrl = getSourceIconUrl(recipe.sourceUrl || "");
      const host = getSourceHost(recipe.sourceUrl || "") || getPlatformLabel(recipe.platform || "website");
      return `
        <button class="recent-card" type="button" data-concept-id="${escapeHtml(recipe.id)}">
          <img class="recent-card__img" src="${escapeHtml(recipe.image || "assets/hero-burger.svg")}" alt="${escapeHtml(recipe.title || "Concept")}" loading="lazy" />
          ${faviconUrl ? `<span class="recent-card__favicon"><img src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" /></span>` : ""}
          <div class="recent-card__body">
            <p class="recent-card__title">${escapeHtml(recipe.title || "Concept")}</p>
            <p class="recent-card__meta">${escapeHtml(host)}</p>
          </div>
        </button>
      `;
    })
    .join("");

  homeConceptsGrid.querySelectorAll("[data-concept-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-concept-id") || "";
      if (!id || !getRecipeById(id)) return;
      state.selectedRecipeId = id;
      renderDetailRecipe(true);
      switchView("detail");
      openRecipeEditPanel(id);
    });
  });
}

function parseMinutesLabel(value) {
  const match = String(value || "").match(/(\d+)/);
  return match ? Number(match[1]) : 999;
}

function getQuickRecipes() {
  if (!state.searchQuery.trim() && !state.activeCookbookFilter) {
    return HOME_QUICK_RECIPE_IDS.map((recipeId) => getRecipeById(recipeId)).filter(Boolean);
  }
  const featured = getFeaturedRecipe();
  if (!featured) return [];
  const featuredId = featured.id;
  return getVisibleRecipes()
    .filter((recipe) => recipe.id !== featuredId)
    .sort((left, right) => parseMinutesLabel(left.time) - parseMinutesLabel(right.time))
    .slice(0, 4);
}

function renderQuickRecipeGrid() {
  const recipes = getQuickRecipes();
  if (!recipes.length) {
    quickRecipeGrid.innerHTML = "";
    return;
  }
  quickRecipeGrid.innerHTML = recipes
    .slice(0, 2)
    .map((recipe) => `
        <button class="quick-card" type="button" data-recipe-id="${recipe.id}">
          <span class="quick-card__img" aria-hidden="true">${getIngredientVisualMarkup(recipe.ingredients[0]?.name || recipe.title)}</span>
          <span class="quick-card__copy">
            <strong>${escapeHtml(recipe.title)}</strong>
            <span class="quick-card__meta">
              <span>${escapeHtml(recipe.time)}</span>
              <span>${escapeHtml(recipe.ingredients.length)} stuks</span>
            </span>
          </span>
          <span class="quick-card__check" aria-hidden="true"></span>
        </button>
      `)
    .join("");
}

function renderCategoryGrid() {
  if (!categoryGrid) {
    return;
  }
  const categories = [
    {
      title: "Ontbijt",
      count: state.recipes.filter((r) => /ontbijt/i.test(r.mealTag)).length || 12,
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80",
    },
    {
      title: "Salades",
      count: 8,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    },
    {
      title: "Dips",
      count: 5,
      image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&q=80",
    },
    {
      title: "Hoofdgerechten",
      count: state.recipes.filter((r) => /avond|lunch/i.test(r.mealTag)).length || 24,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    },
  ];

  categoryGrid.innerHTML = categories
    .map(
      (cat) => `
        <article class="category-card">
          <div class="category-card__photo">
            <img class="category-card__img" src="${escapeHtml(cat.image)}" alt="${escapeHtml(cat.title)}" loading="lazy" />
          </div>
          <h3>${escapeHtml(cat.title)}</h3>
          <p>${cat.count} Recepten</p>
        </article>
      `
    )
    .join("");
}

function renderChannelRow() {
  const row = document.getElementById("channelRow");
  if (!row) return;
  // Only show followed channels that are approved (not pending)
  const followed = getAllChannels()
    .filter(
      (ch) =>
        state.followedChannelIds.includes(ch.id) &&
        (ch.status || "approved") === "approved" &&
        (SEED_CHANNELS.some((s) => s.id === ch.id) ? isSeedChannelEnabled(ch.id) : isCustomChannelEnabled(ch.id))
    )
    .sort(compareChannelDisplayName);
  row.innerHTML = followed.map((ch) => {
    const faviconUrl = getSourceIconUrl(ch.url);
    return `
    <button class="channel-item" type="button" data-channel-url="${escapeHtml(ch.url)}" aria-label="${escapeHtml(ch.name)} openen">
      <span class="channel-avatar">
        ${faviconUrl
          ? `<img class="channel-avatar__favicon" src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><span class="channel-avatar__initials" style="display:none">${escapeHtml(ch.initials)}</span>`
          : `<span class="channel-avatar__initials">${escapeHtml(ch.initials)}</span>`}
      </span>
      <span class="channel-name">${escapeHtml(ch.name)}</span>
    </button>
  `}).join("");
}

function renderHomeCookbooks() {
  const strip = document.getElementById("homeCbStrip");
  const heading = document.getElementById("homeCookbooksSectionHead");
  if (!strip) return;

  // Hide cookbooks section for unauthenticated users
  if (!state.auth.authenticated) {
    if (heading) heading.classList.add("hidden");
    strip.innerHTML = "";
    return;
  }

  const top = state.cookbooks.slice(0, 4);

  if (!top.length) {
    if (heading) heading.classList.add("hidden");
    strip.innerHTML = `
      <div class="home-empty-state">
        <div class="home-empty-state__icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        </div>
        <h3 class="home-empty-state__title">Nieuw kookboek</h3>
        <p class="home-empty-state__text">Maak je eerste kookboek aan</p>
        <button class="home-empty-state__btn" type="button" id="homeCreateCookbookBtn">Nieuw kookboek</button>
      </div>
    `;
    bindEvent(document.getElementById("homeCreateCookbookBtn"), "click", () => {
      switchView("cookbooks");
    });
    return;
  }

  if (heading) heading.classList.remove("hidden");

  const addCard = `
    <button class="home-cb-card home-cb-card--add" type="button" id="homeCookbookAddCard" aria-label="Nieuw kookboek aanmaken">
      <div class="home-cb-card__cover home-cb-card__cover--add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true" style="width:32px;height:32px;opacity:.55"><path d="M12 5v14M5 12h14"/></svg>
      </div>
      <div class="home-cb-card__body">
        <p class="home-cb-card__name">Nieuw</p>
        <p class="home-cb-card__count">Kookboek</p>
      </div>
    </button>
  `;

  strip.innerHTML = top.map((cookbook) => {
    const recipes = cookbook.recipeIds.map((id) => getRecipeById(id)).filter(Boolean);
    const count = cookbook.recipeIds.length;

    // Show "+" button for empty cookbooks instead of regular card
    if (count === 0) {
      return `
        <button class="home-cb-card home-cb-card--add" type="button" id="homeCookbookAdd${escapeHtml(cookbook.id)}" aria-label="Recepten toevoegen aan ${escapeHtml(cookbook.name)}">
          <div class="home-cb-card__cover home-cb-card__cover--add">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true" style="width:32px;height:32px;opacity:.55"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <div class="home-cb-card__body">
            <p class="home-cb-card__name">${escapeHtml(cookbook.name)}</p>
            <p class="home-cb-card__count">Voeg recepten toe</p>
          </div>
        </button>
      `;
    }

    const coverImg = recipes[0]?.image || "";
    const coverHtml = coverImg
      ? `<div class="home-cb-card__cover home-cb-card__cover--photo" style="background-image:url('${escapeHtml(coverImg)}')">${
          recipes.length > 1
            ? `<div class="home-cb-card__cover-grid">${recipes.slice(0, 4).map((r) => `<img src="${escapeHtml(r.image)}" alt="" loading="lazy" />`).join("")}</div>`
            : ""
        }</div>`
      : `<div class="home-cb-card__cover home-cb-card__cover--empty">📚</div>`;
    return `
      <button class="home-cb-card" type="button" data-open-cookbook-home="${escapeHtml(cookbook.id)}">
        ${coverHtml}
        <div class="home-cb-card__body">
          <p class="home-cb-card__name">${escapeHtml(cookbook.name)}</p>
          <p class="home-cb-card__count">${count} recept${count === 1 ? "" : "en"}</p>
        </div>
      </button>
    `;
  }).join("") + addCard;
}

function renderNavBadge() {
  const badge = document.getElementById("groceryNavBadge");
  if (!badge) return;
  const count = state.groceryItems.filter((item) => !item.checked).length;
  badge.textContent = count > 0 ? String(count) : "";
}

function renderChannelSettings() {
  const container = document.getElementById("channelSettingsList");
  if (!container) return;

  // Merge seed + global admin-managed channels, sorted A-Z
  const NEW_CHANNEL_DAYS = 14;
  const nowMs = Date.now();
  const seedEntries = getSeedChannelsSortedByName()
    .filter((ch) => isSeedChannelEnabled(ch.id))
    .map((ch) => ({ ...ch, _kind: "seed" }));
  const managedEntries = state.customChannels
    .filter((ch) => Boolean(ch.managedByAdmin) && isCustomChannelEnabled(ch.id))
    .map((ch) => ({ ...ch, _kind: "managed" }));
  const allPlatelyChannels = [...seedEntries, ...managedEntries]
    .sort((a, b) => a.name.localeCompare(b.name, "nl", { sensitivity: "base" }));

  const seedRows = allPlatelyChannels.map((ch) => {
    const followed = state.followedChannelIds.includes(ch.id);
    const faviconUrl = getSourceIconUrl(ch.url);
    const isNew = ch._kind === "managed" && ch.createdAt
      ? (nowMs - new Date(ch.createdAt).getTime()) < NEW_CHANNEL_DAYS * 86400_000
      : false;
    const newBadge = isNew ? `<span class="channel-new-badge">Nieuw</span>` : "";
    return `
      <label class="channel-toggle-row" data-channel-id="${escapeHtml(ch.id)}">
        <span class="channel-toggle-avatar">
          ${faviconUrl ? `<img class="channel-toggle-avatar__favicon" src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/><span style="display:none;font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>` : `<span style="font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>`}
        </span>
        <span class="channel-toggle-name">${escapeHtml(ch.name)}${newBadge}</span>
        <span class="toggle-switch ${followed ? "toggle-switch--on" : ""}" role="switch" aria-checked="${followed}" tabindex="0" data-toggle-channel="${escapeHtml(ch.id)}"></span>
      </label>`;
  }).join("");

  const managedRows = ""; // merged into seedRows above

  // Separate custom channels section — only personal (non-managed) channels
  let customHTML = "";

  const personalChannels = state.customChannels.filter((ch) => !ch.managedByAdmin);

  if (personalChannels.length > 0) {
    customHTML += `<div class="channel-section-label">MIJN KANALEN</div>`;

    // Show custom channels: approved first, then pending, then rejected (sorted A-Z within each)
    const customRows = personalChannels
      .sort((a, b) => {
        // Approved channels first, then pending, then rejected
        const aStatus = a.status || "approved";
        const bStatus = b.status || "approved";
        const rank = (s) => (s === "approved" ? 0 : s === "pending" ? 1 : s === "rejected" ? 2 : 3);
        const aRank = rank(aStatus);
        const bRank = rank(bStatus);
        if (aRank !== bRank) return aRank - bRank;
        // Within same status, sort alphabetically (A-Z)
        return a.name.localeCompare(b.name);
      })
      .map((ch) => {
      const followed = state.followedChannelIds.includes(ch.id);
      const faviconUrl = getSourceIconUrl(ch.url);
      const status = ch.status || "approved";
      const seedMatch = findMatchingSeedChannelForUrl(ch.url);
      const dupeBadgeHtml = seedMatch
        ? `<span class="channel-dupe-badge">Toegevoegd aan standaard kanalen</span>`
        : "";
      const statusClass =
        status === "pending" ? "channel-status-badge--pending" :
        status === "rejected" ? "channel-status-badge--rejected" :
        "channel-status-badge--approved";
      const statusLabel =
        status === "pending" ? "In behandeling" :
        status === "rejected" ? "Afgekeurd" :
        "Goedgekeurd";
      const isPending = status === "pending";
      const isRejected = status === "rejected";
      const isManagedByAdmin = Boolean(ch.managedByAdmin);
      const enabled = isCustomChannelEnabled(ch.id);
      const isAdminDisabled = status === "approved" && !enabled;
      // Admin-uitgeschakelde kanalen volledig verbergen, ook als de gebruiker ze volgt.
      const shouldHide = status === "approved" && !enabled;
      if (shouldHide) return "";
      const toggleDisabled = (isPending || isRejected || isAdminDisabled) ? "disabled" : "";
      const rowDisabledClass = (isPending || isRejected || isAdminDisabled) ? "channel-toggle-row--disabled" : "";
      const adminDisabledBadge = isAdminDisabled ? ` <span class="channel-status-badge channel-status-badge--rejected">Uitgeschakeld</span>` : "";
      const managedBadgeHtml = isManagedByAdmin
        ? `<span class="channel-dupe-badge">Plately kanaal</span>`
        : "";
      const toggleHtml = (isRejected || isAdminDisabled)
        ? `<span class="toggle-switch disabled" role="switch" aria-checked="${followed}" aria-disabled="true" tabindex="-1"></span>`
        : `<span class="toggle-switch ${followed ? "toggle-switch--on" : ""} ${toggleDisabled}" role="switch" aria-checked="${followed}" tabindex="0" data-toggle-channel="${ch.id}" ${toggleDisabled}></span>`;
      const deleteHtml = isManagedByAdmin
        ? ""
        : `<button class="channel-delete-btn" type="button" aria-label="Verwijder ${escapeHtml(ch.name)}" data-delete-channel="${ch.id}">×</button>`;

      return `
        <div class="channel-toggle-row channel-toggle-row--custom ${rowDisabledClass}" data-channel-id="${ch.id}">
          <span class="channel-toggle-avatar">
            ${faviconUrl ? `<img class="channel-toggle-avatar__favicon" src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/><span style="display:none;font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>` : `<span style="font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>`}
          </span>
          <div class="channel-toggle-info">
            <span class="channel-toggle-name">${escapeHtml(ch.name)}${adminDisabledBadge}</span>
            <span class="channel-status-badge ${statusClass}">${escapeHtml(statusLabel)}</span>
            ${managedBadgeHtml}
            ${dupeBadgeHtml}
          </div>
          ${toggleHtml}
          ${deleteHtml}
        </div>`;
    }).join("");

    customHTML += customRows;
  }

  const addButton = `
    <button class="channel-add-btn" type="button" id="addCustomChannelButton">
      <span class="channel-add-btn__icon">+</span>
      Kanaal toevoegen
    </button>`;

  container.innerHTML = seedRows + managedRows + customHTML + addButton;

  // Reset form and hide it
  const form = document.getElementById("customChannelForm");
  const formContainer = document.getElementById("channelAddForm");
  if (form) {
    form.reset();
    if (formContainer) formContainer.hidden = true;
  }
}

function renderCookbookFilterBar() {
  const bar = document.getElementById("cookbookFilterBar");
  if (!bar) return;

  const active = state.activeCookbookFilter;
  const chips = [
    { id: null, label: "Alles" },
    { id: "favorites", label: "❤️ Favorieten" },
    { id: "easy", label: "⏱ Snel" },
    { id: "veggie", label: "🥦 Vegetarisch" },
    { id: "in-cookbook", label: "📚 In kookboek" },
  ];

  bar.innerHTML = chips
    .map(
      (chip) => `
        <button
          class="filter-chip ${chip.id === active ? "filter-chip--active" : ""}"
          type="button"
          data-cookbook-filter="${chip.id ?? ""}"
        >${escapeHtml(chip.label)}</button>
      `
    )
    .join("");
}

function renderRecipeGrid() {
  const isSearching = !!state.searchQuery.trim();
  const gridSection = document.getElementById("recipeGridSection");

  // Always render filter bar so chips are visible on home screen
  renderCookbookFilterBar();

  // Show grid section when actively searching/filtering OR when displaying recipes
  if (isSearching || state.activeCookbookFilter) {
    if (gridSection) gridSection.style.display = "";
  }

  let recipes;
  if (!isSearching && !state.activeCookbookFilter) {
    // Show saved user imports first, then fill with seed recipes
    // For new users (no saved imports), show nothing (empty state will be shown)
    const imported = getSavedImportedRecipes();
    const seeds = COOKBOOK_SHOWCASE_IDS.map((id) => getRecipeById(id)).filter(Boolean);
    recipes = imported.length ? [...imported, ...seeds] : [];
  } else {
    recipes = getVisibleRecipes();
  }

  if (state.activeCookbookFilter === "favorites") {
    const savedIds = new Set(state.cookbooks.flatMap((cookbook) => cookbook.recipeIds));
    recipes = recipes.filter((recipe) => savedIds.has(recipe.id));
  } else if (state.activeCookbookFilter === "easy") {
    recipes = recipes.filter((recipe) => parseMinutesLabel(recipe.time) <= 30);
  } else if (state.activeCookbookFilter === "recent") {
    recipes = [...recipes].reverse();
  } else if (state.activeCookbookFilter === "veggie") {
    const MEAT_TERMS = ["kip","rund","varken","lam","spek","bacon","worst","gehakt","vis","zalm","tonijn","garnalen","ham","biefstuk","kalkoen","eend","konijn","vlees","kipfilet","kippenborst"];
    recipes = recipes.filter((recipe) => {
      const ingText = (recipe.ingredients || []).map((i) => (i.name || "").toLowerCase()).join(" ");
      return !MEAT_TERMS.some((term) => ingText.includes(term));
    });
  } else if (state.activeCookbookFilter === "in-cookbook") {
    const cbIds = new Set(state.cookbooks.flatMap((cb) => cb.recipeIds || []));
    recipes = recipes.filter((recipe) => cbIds.has(recipe.id));
  }

  const totalRecipeCount = recipes.length;

  // Home screen can get very long with lots of imports; keep it snappy by default.
  // Only cap when we're on home and NOT in cookbook/search mode.
  const shouldCapHome = state.view === "home" && !isSearching && !state.activeCookbookFilter;
  if (shouldCapHome) {
    const currentLimit = Math.max(
      HOME_RECIPE_INITIAL,
      Number.isFinite(Number(state.homeRecipeLimit)) ? Number(state.homeRecipeLimit) : HOME_RECIPE_INITIAL
    );
    state.homeRecipeLimit = currentLimit;
    recipes = recipes.slice(0, Math.min(currentLimit, totalRecipeCount));
  }

  // Update heading to reflect search state
  const headingEl = document.getElementById("recipeGridHeading") || document.querySelector(".kookboek-heading h1, .kookboek-heading h2");
  if (headingEl) {
    if (isSearching) {
      headingEl.textContent = recipes.length
        ? `${recipes.length} recept${recipes.length === 1 ? "" : "en"} gevonden`
        : "Geen resultaten";
    } else {
      headingEl.textContent = "Mijn recepten";
    }
  }

  if (!recipes.length) {
    const isNewUser = getSavedImportedRecipes().length === 0 && !isSearching && !state.activeCookbookFilter;

    if (isNewUser && state.auth.authenticated) {
      // New authenticated user - show import prompt
      recipeGrid.innerHTML = `
        <div class="home-empty-state">
          <div class="home-empty-state__icon">
            <svg viewBox="0 0 48 48" aria-hidden="true" fill="none"><circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5" opacity=".18"/><path d="M16 30c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="20" cy="20" r="2" fill="currentColor"/><circle cx="28" cy="20" r="2" fill="currentColor"/><path d="M24 10v4M10 24h4M34 24h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </div>
          <h3 class="home-empty-state__title">Welkom bij Plately 👋</h3>
          <p class="home-empty-state__text">Importeer een recept van internet en begin je collectie</p>
          <button class="home-empty-state__btn" type="button" id="homeImportFirstRecipeBtn">Importeer recept</button>
        </div>
      `;
      bindEvent(document.getElementById("homeImportFirstRecipeBtn"), "click", () => {
        if (!state.auth.authenticated) {
          openAuthModal("login");
          return;
        }
        switchView("import");
      });
    } else if (isNewUser) {
      // Unauthenticated user - hide empty state, show nothing
      recipeGrid.innerHTML = "";
    } else {
      // Search or filter with no results
      recipeGrid.innerHTML = `
        <div class="home-empty-state" style="grid-column:1/-1">
          <div class="home-empty-state__icon">
            <svg viewBox="0 0 48 48" aria-hidden="true" fill="none"><circle cx="20" cy="20" r="13" stroke="currentColor" stroke-width="2"/><path d="M30 30l10 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M16 20h8M20 16v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".4"/></svg>
          </div>
          <h3 class="home-empty-state__title">Niets gevonden</h3>
          <p class="home-empty-state__text">Probeer een andere zoekterm of importeer een nieuw recept</p>
        </div>
      `;
    }
    return;
  }

  // Add "add new recipe" card at the beginning when authenticated
  let gridHtml = "";
  if (state.auth.authenticated && !isSearching && !state.activeCookbookFilter) {
    gridHtml = `
      <button class="recent-card recent-card--add" type="button" id="addRecipeCard">
        <div class="recent-card__add-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        </div>
        <div class="recent-card__body">
          <p class="recent-card__title">Recept toevoegen</p>
          <p class="recent-card__meta">Importeer via link</p>
        </div>
      </button>
    `;
  }

  gridHtml += recipes
    .map(
      (recipe) => {
        const faviconUrl = getSourceIconUrl(recipe.sourceUrl || "");
        const faviconHtml = faviconUrl
          ? `<span class="recent-card__favicon"><img src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" /></span>`
          : "";
        const statusBadges = [
          recipe.needsReview
            ? `<span class="recipe-status-pill recipe-status-pill--review">Nakijken</span>`
            : "",
          isRecipeFavorited(recipe.id)
            ? `<span class="recipe-status-pill recipe-status-pill--fav" aria-hidden="true">❤︎</span>`
            : "",
        ]
          .filter(Boolean)
          .join("");
        return `
        <button class="recent-card" type="button" data-recipe-id="${escapeHtml(recipe.id)}">
          <img class="recent-card__img" src="${escapeHtml(recipe.image || "assets/hero-burger.svg")}" alt="${escapeHtml(recipe.title || "")}" loading="lazy" />
          ${statusBadges ? `<div class="recipe-status-pills">${statusBadges}</div>` : ""}
          ${faviconHtml}
          <div class="recent-card__body">
            <p class="recent-card__title">${escapeHtml(recipe.title)}</p>
            <p class="recent-card__meta">${escapeHtml(recipe.time || "")}</p>
          </div>
        </button>
      `;
      }
    )
    .join("");

  // Home "Laad meer" progressive reveal
  if (shouldCapHome && totalRecipeCount > recipes.length) {
    const remaining = totalRecipeCount - recipes.length;
    const nextStep = Math.min(HOME_RECIPE_STEP, remaining);
    const label = nextStep > 0 ? `Laad meer (+${nextStep})` : "Laad meer";
    gridHtml += `
      <div class="recipe-grid-more" style="grid-column:1/-1">
        <button class="secondary-button recipe-grid-more__btn" type="button" id="homeLoadMoreRecipes">${escapeHtml(label)}</button>
      </div>
    `;
  }

  recipeGrid.innerHTML = gridHtml;

  // Bind the add recipe card click
  const addRecipeCardBtn = document.getElementById("addRecipeCard");
  if (addRecipeCardBtn) {
    bindEvent(addRecipeCardBtn, "click", () => {
      switchView("import");
    });
  }

  const loadMoreBtn = document.getElementById("homeLoadMoreRecipes");
  if (loadMoreBtn) {
    bindEvent(loadMoreBtn, "click", () => {
      const currentLimit = Math.max(HOME_RECIPE_INITIAL, Number(state.homeRecipeLimit) || HOME_RECIPE_INITIAL);
      const nextLimit = Math.min(totalRecipeCount, currentLimit + HOME_RECIPE_STEP);
      state.homeRecipeLimit = nextLimit;
      setSessionNumber(HOME_RECIPE_LIMIT_SESSION_KEY, nextLimit);
      renderRecipeGrid();
      // Intentionally do NOT scroll; keep the user's position stable.
    });
  }
}

function renderDetailRecipe(resetServings = false) {
  const recipe = getSelectedRecipe();
  if (!recipe) return;

  const recipeProgress = getRecipeProgress(recipe.id);
  const baseServings = parseBaseServings(recipe.servings);
  if (resetServings) {
    state.currentServings = baseServings;
  }
  const factor = state.currentServings / baseServings;

  detailHeroImage.src = recipe.image;
  detailHeroImage.alt = recipe.alt;
  detailTitle.textContent = recipe.title;
  detailMealTag.textContent = recipe.mealTag;
  detailTime.textContent = recipe.time;
  detailKcal.textContent = recipe.kcal;
  detailServings.textContent = recipe.servings;
  detailDescription.textContent = recipe.description || "";
  detailDescription.classList.toggle("is-hidden", !recipe.description);
  const iconUrl = getSourceIconUrl(recipe.sourceUrl || "");
  const host = getSourceHost(recipe.sourceUrl || "");
  if (detailSourceIcon) {
    detailSourceIcon.innerHTML = iconUrl
      ? `<span class="source-favicon__inner"><img src="${iconUrl}" alt="" loading="lazy" /></span>`
      : `<span class="source-favicon__inner"><span>${(host || "•").slice(0, 1).toUpperCase()}</span></span>`;
  }
  if (detailSourceLabel) {
    detailSourceLabel.textContent = host || getPlatformLabel(recipe.platform || "website");
  }
  if (reviewImportButton) {
    reviewImportButton.classList.remove("hidden");
    const reviewLabel = recipe.needsReview ? "Import herstellen" : "Recept bewerken";
    reviewImportButton.setAttribute("aria-label", reviewLabel);
    reviewImportButton.setAttribute("title", reviewLabel);
  }
  if (detailIngredientCount) {
    detailIngredientCount.textContent = `${recipe.ingredients.length} items`;
  }
  if (detailAssist) {
    const linkedCookbooks = getCookbooksForRecipe(recipe.id);
    const assistTone = recipe.needsReview ? "warn" : "good";
    const assistTitle = recipe.needsReview ? "Controleer deze import nog even" : "Klaar om te koken";
    const assistCopy = recipe.needsReview
      ? "Loop titel, ingrediënten en bereidingsstappen nog even na voordat je het recept gebruikt."
      : linkedCookbooks.length
        ? `Dit recept staat in ${linkedCookbooks.length} kookboek${linkedCookbooks.length === 1 ? "" : "en"} en is klaar om op je boodschappenlijst te zetten.`
        : "Sla dit recept op in een kookboek of zet de ingrediënten direct op je boodschappenlijst.";
    detailAssist.innerHTML = `
      <article class="detail-assist__card detail-assist__card--${assistTone}">
        <div class="detail-assist__head">
          <strong>${escapeHtml(assistTitle)}</strong>
        </div>
        <p>${escapeHtml(assistCopy)}</p>
      </article>
    `;
  }
  servingsDisplay.textContent = `${state.currentServings} pers.`;
  detailStepCount.textContent = `${recipe.instructions.length} stappen`;
  if (addSelectedToGroceriesButton) {
    addSelectedToGroceriesButton.textContent = `Zet ${recipe.ingredients.length} ingrediënten op boodschappenlijst`;
  }

  detailIngredientList.innerHTML = recipe.ingredients
    .map((ingredient, index) => {
      const checked = isIngredientChecked(recipe.id, ingredient, index);
      return `
        <li>
          <button
            class="ingredient-item ${checked ? "is-checked" : ""}"
            type="button"
            data-detail-ingredient-index="${index}"
            aria-pressed="${checked ? "true" : "false"}"
          >
            <span class="recipe-check" aria-hidden="true"></span>
            <span class="ingredient-amount">${formatIngredientAmount(ingredient, factor)}</span>
            <span class="ingredient-name">${escapeHtml(ingredient.name)}</span>
            <span class="ingredient-image-wrapper" aria-hidden="true">
              <img class="ingredient-image" src="" alt="" loading="lazy" />
              <span class="ingredient-image-fallback" aria-hidden="true">${getIngredientVisualMarkup(ingredient.name)}</span>
            </span>
          </button>
        </li>
      `;
    })
    .join("");

  renderIngredientSwapSuggestions(recipe);

  detailStepList.innerHTML = recipe.instructions
    .map((step, index) => {
      const checked = isStepChecked(recipe.id, index);
      return `
        <li class="step-item" data-step-row="${index}">
          <button class="step-index ${checked ? "is-checked" : ""}" type="button" data-step-check="${index}" aria-pressed="${checked ? "true" : "false"}">
            <span class="step-index__num">${index + 1}</span>
          </button>
          <div class="step-body">
            <p class="step-copy ${checked ? "is-checked" : ""}">${escapeHtml(step)}</p>
          </div>
        </li>`;
    })
    .join("");

  if (detailSaveHeaderButton) {
    detailSaveHeaderButton.classList.toggle("is-active", isRecipeSaved(recipe.id));
  }
  if (favoriteRecipeButton) {
    const isFavorited = isRecipeFavorited(recipe.id);
    const favoriteLabel = isFavorited ? "Verwijder uit favorieten" : "Toevoegen aan favorieten";
    favoriteRecipeButton.setAttribute("aria-label", favoriteLabel);
    favoriteRecipeButton.setAttribute("title", favoriteLabel);
    favoriteRecipeButton.classList.toggle("is-active", isFavorited);
  }
  if (topbarFavoriteButton) {
    const isFavorited = isRecipeFavorited(recipe.id);
    const favoriteLabel = isFavorited ? "Verwijder uit favorieten" : "Toevoegen aan favorieten";
    topbarFavoriteButton.setAttribute("aria-label", favoriteLabel);
    topbarFavoriteButton.setAttribute("title", favoriteLabel);
    topbarFavoriteButton.classList.toggle("is-active", isFavorited);
  }
  if (saveRecipeButton) {
    const saveLabel = isRecipeSaved(recipe.id) ? "Recept bewaard" : "Bewaar recept";
    saveRecipeButton.setAttribute("aria-label", saveLabel);
    saveRecipeButton.setAttribute("title", saveLabel);
    saveRecipeButton.classList.toggle("is-active", isRecipeSaved(recipe.id));
  }
  const deleteRecipeButton = document.getElementById("deleteRecipeButton");
  if (deleteRecipeButton) {
    const isDeletable = !SEED_RECIPE_IDS.has(recipe.id) && !recipe.isSeed;
    deleteRecipeButton.classList.toggle("hidden", !isDeletable);
  }
  renderCookMode(recipe, recipeProgress);
  if (state.kookstandOpen && state.kookstandRecipeId === recipe.id) {
    renderKookstand();
  }
  updateWakeLockUI();
  renderMealPlanCurrentRecipe();

  // Fetch ingredient photos from Albert Heijn
  fetchIngredientPhotos();

  // Load related recipes from same channel
  loadDetailRelatedRecipes(recipe);
}

const _relatedRecipesCache = new Map();

async function loadDetailRelatedRecipes(recipe) {
  const container = document.getElementById("detailRelated");
  const grid = document.getElementById("detailRelatedGrid");
  const titleEl = document.getElementById("detailRelatedTitle");
  if (!container || !grid) return;

  // Only show for recipes from a known channel
  const sourceUrl = recipe.sourceUrl || "";
  let channelId = recipe.channelId || "";
  let channelName = "";
  if (!channelId && sourceUrl) {
    try {
      const host = new URL(sourceUrl).hostname.replace(/^www\./, "");
      const match = getAllChannels().find((ch) => {
        try { return new URL(ch.url || "").hostname.replace(/^www\./, "") === host; } catch { return false; }
      });
      if (match) { channelId = match.id; channelName = match.name; }
    } catch {}
  }
  if (!channelId) { container.classList.add("hidden"); return; }

  // Channel name for heading
  if (!channelName) {
    const ch = getAllChannels().find((c) => c.id === channelId);
    channelName = ch?.name || "";
  }
  if (titleEl && channelName) titleEl.textContent = `Meer van ${channelName}`;

  // Check cache
  const cacheKey = channelId;
  if (_relatedRecipesCache.has(cacheKey)) {
    const cached = _relatedRecipesCache.get(cacheKey);
    renderRelatedGrid(grid, container, cached, recipe.id);
    return;
  }

  container.classList.add("hidden");
  try {
    const searchTerm = recipe.mealTag || recipe.title.split(" ").slice(0, 2).join(" ") || "recept";
    const isCustom = !SEED_CHANNELS.find((c) => c.id === channelId);
    const ch = getAllChannels().find((c) => c.id === channelId);
    if (!ch) return;
    const params = new URLSearchParams({ q: searchTerm, limit: "6" });
    if (isCustom) params.set("customChannels", `${ch.id}|${ch.name}|${ch.url}`);
    else params.set("channels", channelId);
    const resp = await fetch(`/api/search?${params}`, { credentials: "include" });
    if (!resp.ok) return;
    const data = await resp.json();
    const results = (data.results || []).filter((r) => r.url !== (recipe.sourceUrl || "")).slice(0, 4);
    _relatedRecipesCache.set(cacheKey, results);
    renderRelatedGrid(grid, container, results, recipe.id);
  } catch {}
}

function renderRelatedGrid(grid, container, results, currentRecipeId) {
  const filtered = results.filter((r) => r.url !== undefined);
  if (!filtered.length) { container.classList.add("hidden"); return; }
  grid.innerHTML = filtered.map((r) => {
    const img = r.image ? `<img src="${escapeHtml(r.image)}" alt="" loading="lazy" />` : `<div style="aspect-ratio:3/2;background:var(--color-surface)"></div>`;
    return `<button class="detail-related__card" type="button" data-related-url="${escapeHtml(r.url || "")}" data-related-title="${escapeHtml(r.title || "")}">
      ${img}
      <div class="detail-related__card-body">
        <span class="detail-related__card-title">${escapeHtml(r.title || "")}</span>
      </div>
    </button>`;
  }).join("");
  container.classList.remove("hidden");

  // Wire up clicks to import
  grid.querySelectorAll(".detail-related__card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.relatedUrl;
      if (!url) return;
      if (recipeUrlInput) recipeUrlInput.value = url;
      switchView("import");
      // Auto-trigger import after a tick
      setTimeout(() => {
        const submitBtn = document.getElementById("submitImport");
        if (submitBtn) submitBtn.click();
      }, 100);
    });
  });
}

function renderIngredientSwapSuggestions(recipe) {
  if (!ingredientSwapPanel || !ingredientSwapList || !recipe) return;
  const ingKeys = recipe.ingredients.map((i) => normalizeIngredientKey(i?.name || ""));
  const present = new Set(ingKeys.filter(Boolean));
  const suggestions = [];
  for (const [a, b] of INGREDIENT_SWAPS) {
    const aKey = normalizeIngredientKey(a);
    const bKey = normalizeIngredientKey(b);
    if (present.has(aKey) && !present.has(bKey)) suggestions.push({ from: a, to: b });
    else if (present.has(bKey) && !present.has(aKey)) suggestions.push({ from: b, to: a });
  }

  if (!suggestions.length) {
    ingredientSwapPanel.classList.add("hidden");
    ingredientSwapList.innerHTML = "";
    return;
  }

  ingredientSwapPanel.classList.remove("hidden");
  ingredientSwapList.innerHTML = suggestions
    .map(
      (s) => `
        <div class="swap-row">
          <div class="swap-row__copy">
            <div class="swap-row__title">${escapeHtml(s.from)} → ${escapeHtml(s.to)}</div>
            <div class="swap-row__sub">Vervang op je lijst (voor dit recept)</div>
          </div>
          <button class="swap-row__btn" type="button" data-swap-from="${escapeHtml(s.from)}" data-swap-to="${escapeHtml(s.to)}">
            ${WISSEL_SVG}
            Wissel
          </button>
        </div>
      `
    )
    .join("");
}

function renderCookMode(recipe, recipeProgress = getRecipeProgress(recipe.id)) {
  if (!cookModeButton || !cookModePanel || !cookModeProgress || !cookModeStepIndex || !cookModeStepText) {
    return;
  }

  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];
  const hasSteps = instructions.length > 0;
  const boundedStepIndex = hasSteps
    ? Math.min(recipeProgress.currentStep, instructions.length - 1)
    : 0;
  recipeProgress.currentStep = boundedStepIndex;

  cookModeButton.classList.toggle("is-active", recipeProgress.cookMode);
  cookModeButton.setAttribute("aria-pressed", String(recipeProgress.cookMode));
  cookModeButton.textContent = recipeProgress.cookMode ? "Kookmodus: aan" : "Kookmodus: uit";

  cookModePanel.classList.toggle("hidden", !recipeProgress.cookMode);
  cookModeProgress.textContent = hasSteps ? `Stap ${boundedStepIndex + 1} van ${instructions.length}` : "Nog geen stappen";
  cookModeStepIndex.textContent = hasSteps ? String(boundedStepIndex + 1) : "—";
  cookModeStepText.textContent = hasSteps ? instructions[boundedStepIndex] : "Voeg eerst bereidingsstappen toe in Recept bewerken.";

  if (cookModePrevButton) {
    cookModePrevButton.disabled = !hasSteps || boundedStepIndex <= 0;
  }
  if (cookModeNextButton) {
    cookModeNextButton.disabled = !hasSteps || boundedStepIndex >= instructions.length - 1;
  }
  if (cookModeResetButton) {
    cookModeResetButton.disabled = !hasSteps;
  }
}

let kookstandLastFocusedEl = null;
let kookstandBodyOverflowBefore = "";

function getKookstandFocusableElements() {
  if (!kookstandOverlay) return [];
  const root = kookstandOverlay.querySelector(".kookstand-sheet") || kookstandOverlay;
  return [...root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter((el) => el instanceof HTMLElement && !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
}

function onKookstandKeydown(event) {
  if (!state.kookstandOpen) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeKookstand();
    return;
  }
  if (event.key !== "Tab") return;

  const focusables = getKookstandFocusableElements();
  if (!focusables.length) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;
  if (!(active instanceof HTMLElement)) return;

  if (event.shiftKey) {
    if (active === first || !kookstandOverlay.contains(active)) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (active === last) {
    event.preventDefault();
    first.focus();
  }
}

function renderKookstand() {
  if (!kookstandOverlay || !kookstandTitle || !kookstandServings || !kookstandProgress || !kookstandStepIndex || !kookstandStepText) {
    return;
  }
  if (!state.kookstandOpen) {
    kookstandOverlay.classList.add("hidden");
    kookstandOverlay.hidden = true;
    return;
  }

  const recipe = getRecipeById(state.kookstandRecipeId) || getSelectedRecipe();
  if (!recipe) {
    closeKookstand();
    return;
  }

  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];
  const hasSteps = instructions.length > 0;
  const progress = getRecipeProgress(recipe.id);
  const boundedIndex = hasSteps
    ? Math.min(Math.max(0, state.kookstandStepIndex), instructions.length - 1)
    : 0;

  state.kookstandStepIndex = boundedIndex;
  progress.currentStep = boundedIndex;

  kookstandTitle.textContent = recipe.title || "Recept";
  kookstandServings.textContent = `${Math.max(1, state.currentServings || parseBaseServings(recipe.servings) || 2)} pers.`;
  kookstandProgress.textContent = hasSteps ? `Stap ${boundedIndex + 1} van ${instructions.length}` : "Nog geen stappen";
  if (kookstandCounter) {
    kookstandCounter.textContent = hasSteps ? `${boundedIndex + 1}/${instructions.length}` : "—/—";
  }
  kookstandStepIndex.textContent = hasSteps ? String(boundedIndex + 1) : "—";
  kookstandStepText.textContent = hasSteps ? instructions[boundedIndex] : "Voeg eerst bereidingsstappen toe in Recept bewerken.";

  const kookstandStepDoneButton = document.getElementById("kookstandStepDone");
  if (kookstandStepDoneButton) {
    const checked = hasSteps && isStepChecked(recipe.id, boundedIndex);
    kookstandStepDoneButton.classList.toggle("is-active", checked);
    kookstandStepDoneButton.setAttribute("aria-pressed", checked ? "true" : "false");
    kookstandStepDoneButton.textContent = checked ? "Stap: klaar" : "Markeer klaar";
  }

  const jumpPanel = document.getElementById("kookstandJumpPanel");
  const jumpList = document.getElementById("kookstandJumpList");
  if (jumpPanel) {
    jumpPanel.classList.toggle("hidden", !state.kookstandJumpOpen);
  }
  if (jumpList) {
    jumpList.innerHTML = hasSteps
      ? instructions
          .map((_, i) => {
            const active = i === boundedIndex;
            const done = isStepChecked(recipe.id, i);
            return `
              <button
                class="kookstand-jump__chip ${active ? "is-active" : ""} ${done ? "is-done" : ""}"
                type="button"
                data-kookstand-jump-index="${i}"
                aria-label="Ga naar stap ${i + 1}"
              >
                ${i + 1}
              </button>
            `;
          })
          .join("")
      : "";
  }

  if (kookstandPrevButton) kookstandPrevButton.disabled = !hasSteps || boundedIndex <= 0;
  if (kookstandNextButton) kookstandNextButton.disabled = !hasSteps || boundedIndex >= instructions.length - 1;

  if (kookstandIngredientsSection) {
    kookstandIngredientsSection.classList.toggle("hidden", !state.kookstandShowIngredients);
  }
  if (kookstandToggleIngredientsButton) {
    kookstandToggleIngredientsButton.classList.toggle("is-active", state.kookstandShowIngredients);
  }

  if (state.kookstandShowIngredients && kookstandIngredientList) {
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    kookstandIngredientList.innerHTML = ingredients
      .map((ingredient, index) => {
        const checked = isIngredientChecked(recipe.id, ingredient, index);
        const title = splitCompoundIngredientWords(ingredient?.name || "");
        const amount = ingredient?.amount ? String(ingredient.amount) : "";
        return `
          <li>
            <button
              class="kookstand-ingredients__item ${checked ? "is-checked" : ""}"
              type="button"
              data-kookstand-ingredient-index="${index}"
              aria-pressed="${checked ? "true" : "false"}"
            >
              <span class="kookstand-ingredients__title">${escapeHtml(title)}</span>
              <span class="kookstand-ingredients__amount">${escapeHtml(amount)}</span>
            </button>
          </li>
        `;
      })
      .join("");
  }
}

async function openKookstand(recipeId) {
  const id = String(recipeId || state.selectedRecipeId || "").trim();
  const recipe = getRecipeById(id);
  if (!recipe || !kookstandOverlay) {
    return;
  }

  if (!recipe.instructions?.length) {
    showToast("Voeg eerst bereidingsstappen toe bij Recept bewerken.");
    return;
  }

  kookstandLastFocusedEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  kookstandBodyOverflowBefore = document.body.style.overflow || "";
  document.body.style.overflow = "hidden";

  state.kookstandOpen = true;
  state.kookstandRecipeId = recipe.id;
  state.kookstandShowIngredients = false;
  state.kookstandStepIndex = Math.max(0, Math.floor(getRecipeProgress(recipe.id).currentStep || 0));

  kookstandOverlay.hidden = false;
  kookstandOverlay.classList.remove("hidden");

  document.addEventListener("keydown", onKookstandKeydown, true);
  kookstandCloseButton?.focus?.();

  if (!state.wakeLockSentinel) {
    state.kookstandWakeLockOwned = true;
    state.keepAwake = true;
    await requestWakeLock();
  } else {
    state.kookstandWakeLockOwned = false;
  }

  renderKookstand();
  trackClientEvent("client_kookstand", { recipeSteps: recipe.instructions?.length || 0 });
}

async function closeKookstand() {
  if (!kookstandOverlay) {
    state.kookstandOpen = false;
    return;
  }

  state.kookstandOpen = false;
  state.kookstandShowIngredients = false;
  kookstandOverlay.classList.add("hidden");
  kookstandOverlay.hidden = true;

  document.removeEventListener("keydown", onKookstandKeydown, true);
  document.body.style.overflow = kookstandBodyOverflowBefore;

  if (state.kookstandWakeLockOwned) {
    state.kookstandWakeLockOwned = false;
    state.keepAwake = false;
    await releaseWakeLock();
  }

  if (kookstandLastFocusedEl) {
    kookstandLastFocusedEl.focus();
  }
}

function setKookstandStep(nextIndex) {
  if (!state.kookstandOpen) return;
  state.kookstandStepIndex = Math.max(0, Math.floor(nextIndex || 0));
  renderKookstand();
  schedulePersistAppState();
}

function renderGrocerySummary() {
  if (!grocerySummaryChips) {
    return;
  }
  grocerySummaryChips.innerHTML = "";
}

function updateGroceryIntroCopy() {
  const sub = document.getElementById("grocerySubtitle");
  const hint = document.getElementById("groceryContextHint");
  if (!sub || !hint) return;

  const unchecked = state.groceryItems.filter((x) => x && !x.checked);
  if (!state.groceryItems.length) {
    sub.textContent = "";
    sub.classList.add("hidden");
    hint.textContent = "";
    hint.classList.add("hidden");
    return;
  }

  sub.classList.remove("hidden");
  hint.classList.remove("hidden");

  const n = unchecked.length;
  const recipeTitles = [...new Set(unchecked.map((i) => i.recipeTitle || "").filter(Boolean))];
  let line = `${n} ${n === 1 ? "item" : "items"} te gaan`;
  if (recipeTitles.length === 1 && recipeTitles[0]) {
    line += ` · ${recipeTitles[0]}`;
  } else if (recipeTitles.length > 1) {
    line += ` · ${recipeTitles.length} recepten`;
  }
  sub.textContent = line;

  const bits = [
    "Hoeveelheden zijn omgerekend naar de porties in je recept(en).",
    "Bij Albert Heijn zijn dit automatische productvoorstellen — tik Wissel bij twijfel of controleer de sectie ‘Even controleren’.",
  ];
  const hasConcept = unchecked.some((i) => i.recipeId && getRecipeById(i.recipeId)?.needsReview);
  if (hasConcept) {
    bits.push("Er staan nog concept-imports op je lijst; controleer die even voordat je bestelt.");
  }
  hint.textContent = bits.join(" ");
}

// Pantry/optional items (informational): detect common "in huis" ingredients in a recipe
// and show them as a separate section (not part of store basket matching).
const PANTRY_OPTIONAL_POOL = [
  { title: "Olie", icon: "🫒" },
  { title: "Olijfolie", icon: "🫒" },
  { title: "Boter", icon: "🧈" },
  { title: "Bloem", icon: "🌾" },
  { title: "Suiker", icon: "🍬" },
  { title: "Azijn", icon: "🍶" },
  { title: "Sojasaus", icon: "🍶" },
  { title: "Bouillonblokje", icon: "🧊" },
  // Common “optional” seasonings: excluded from auto grocery, but should show in pantry.
  { title: "Zout", icon: "🧂" },
  { title: "Peper", icon: "🌶️" },
];

function recipeHasPantryOptionalItem(recipe, pantryTitle) {
  if (!recipe?.ingredients?.length) return false;
  const key = normalizeIngredientKey(pantryTitle);
  return recipe.ingredients.some((ing) => normalizeIngredientKey(ing?.name || "").includes(key));
}

function getPantryOptionalSuggestionsForRecipe(recipe, existingKeySet) {
  if (!recipe) return [];
  const existing = existingKeySet || new Set();
  return PANTRY_OPTIONAL_POOL
    .filter((p) => recipeHasPantryOptionalItem(recipe, p.title))
    .filter((p) => !existing.has(normalizeIngredientKey(p.title)));
}

function renderGroceryGroups() {
  consolidateUncheckedGroceryDuplicates();
  persistGroceryItemsLocally();
  updateGroceryIntroCopy();
  const uncheckedCount = state.groceryItems.filter((item) => !item.checked).length;
  if (groceryToolbar) {
    groceryToolbar.classList.toggle("hidden", !state.groceryItems.length);
  }
  const clearBtn = document.getElementById("groceryClearButton");
  if (clearBtn) clearBtn.classList.toggle("hidden", !state.groceryItems.length);
  if (groceryOrder) {
    groceryOrder.classList.toggle("hidden", !state.groceryItems.length);
  }
  if (orderAHItemCount) {
    orderAHItemCount.textContent = `Zet ${uncheckedCount} items in je mandje`;
  }
  renderNavBadge();
  renderGrocerySummary();

  if (!state.groceryItems.length) {
    closeBasketModal();
    const recentRecipes = getRecentImportedRecipesForEmptyGrocery(6);
    const recipeCardsHtml = recentRecipes
      .map((recipe) => {
        const faviconUrl = getSourceIconUrl(recipe.sourceUrl || "");
        const faviconHtml = faviconUrl
          ? `<span class="recent-card__favicon"><img src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" /></span>`
          : "";
        return `
          <button class="recent-card" type="button" data-grocery-add-recipe-id="${escapeHtml(recipe.id)}" aria-label="Zet ${escapeHtml(recipe.title || "recept")} op boodschappenlijst">
            <img class="recent-card__img" src="${escapeHtml(recipe.image || "assets/hero-burger.svg")}" alt="${escapeHtml(recipe.title || "")}" loading="lazy" />
            ${faviconHtml}
            <div class="recent-card__body">
              <p class="recent-card__title">${escapeHtml(recipe.title || "Recept")}</p>
              <p class="recent-card__meta">${escapeHtml(recipe.time || "")}</p>
            </div>
          </button>
        `;
      })
      .join("");

    groceryGroups.innerHTML = `
      <div class="grocery-empty-state">
        <p class="grocery-empty">Je boodschappenlijst is leeg.</p>
        <p class="grocery-empty-hint">${
          recipeCardsHtml
            ? "Tik hieronder op een recent geïmporteerd recept om items toe te voegen."
            : "Importeer eerst een recept om je lijst te vullen."
        }</p>
        ${recipeCardsHtml ? `<div class="recipe-grid grocery-empty-recipes">${recipeCardsHtml}</div>` : ""}
      </div>
    `;

    groceryGroups
      .querySelectorAll("[data-grocery-add-recipe-id]")
      .forEach((btn) => {
        bindEvent(btn, "click", () => {
          const recipe = getRecipeById(btn.dataset.groceryAddRecipeId);
          addRecipeToGrocery(recipe);
        });
      });
    return;
  }

  // Determine unique recipes in the list
  const uniqueRecipes = [...new Set(state.groceryItems.map((i) => i.recipeTitle || "Overig").filter(Boolean))];
  const multiRecipe = uniqueRecipes.length > 1;

  function renderGroceryItem(item) {
    const displayTitle = escapeHtml(splitCompoundIngredientWords(item.title || ""));
    const groupKey = String(item.group || "").trim();
    const groupMeta = groupKey ? getGroupMeta(groupKey) : null;
    // In multi-recipe view tonen we per item de categorie-badge — bij single-recipe
    // groeperen we al op categorie dus zou de badge enkel ruis zijn.
    const showCategoryBadge = multiRecipe && groupMeta && groupMeta.title && groupMeta.title !== "Overig";
    const categoryBadge = showCategoryBadge
      ? `<span class="grocery-entry__cat grocery-entry__cat--${escapeHtml(groupKey)}">${escapeHtml(groupMeta.title)}</span>`
      : "";
    return `
      <div class="grocery-entry-wrapper">
        <button class="grocery-entry ${item.checked ? "is-checked" : ""}" type="button" data-grocery-id="${item.id}">
          <span class="grocery-check"></span>
          <span class="grocery-entry__content">
            <p class="grocery-entry__title">${displayTitle}</p>
            ${categoryBadge}
            ${multiRecipe && item.recipeTitle && item.recipeTitle.includes(",")
              ? `<p class="grocery-entry__overlap">Gedeeld ingrediënt</p>` : ""}
          </span>
          <span class="grocery-entry__amount">${item.amount}</span>
          <span class="grocery-entry__img" aria-hidden="true">
            ${item.imageUrl
              ? `<img class="grocery-entry__ah-img" src="${escapeHtml(item.imageUrl)}" alt="" loading="lazy" />`
              : getIngredientVisualMarkup(splitCompoundIngredientWords(item.title || ""))}
          </span>
        </button>
        <button class="grocery-entry-action grocery-entry-action--delete" type="button" data-action="delete" data-grocery-id="${item.id}" aria-label="Verwijderen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 7.5h15M9 7.5V5.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75V7.5M10.5 11.25v6M13.5 11.25v6M5.625 7.5l.9 10.875A1.5 1.5 0 0 0 8.02 19.8h7.96a1.5 1.5 0 0 0 1.495-1.425L18.375 7.5"/>
          </svg>
        </button>
      </div>
    `;
  }

  let html = "";

  if (multiRecipe) {
    const shared = state.groceryItems.filter((i) => i.recipeTitle && i.recipeTitle.includes(","));
    const sharedTitleSet = new Set(shared.map((i) => i.recipeTitle || ""));
    // Group by recipe; samengevoegde titels (“A, B”) alleen onder Gedeelde ingrediënten
    for (const recipeTitle of uniqueRecipes) {
      if (sharedTitleSet.has(recipeTitle)) continue;
      const items = state.groceryItems
        .filter((i) => (i.recipeTitle || "Overig") === recipeTitle)
        .sort((a, b) => Number(a.checked) - Number(b.checked));
      const headId = items.find((i) => i.recipeId)?.recipeId || "";
      const headRecipe = headId ? getRecipeById(headId) : null;
      const conceptBadge =
        headRecipe?.needsReview ?
          `<span class="grocery-group__pill grocery-group__pill--concept">Concept</span>`
        : "";
      html += `
        <section class="grocery-group">
          <div class="grocery-group__header grocery-group__header--recipe">
            <h2>${escapeHtml(recipeTitle)}${conceptBadge}</h2>
            <span class="grocery-group__count">${items.filter((i) => !i.checked).length} over</span>
          </div>
          ${items.map(renderGroceryItem).join("")}
        </section>
      `;
    }
    if (shared.length) {
      const sharedConcept =
        shared.some((i) => i.recipeId && getRecipeById(i.recipeId)?.needsReview) ?
          `<span class="grocery-group__pill grocery-group__pill--concept">Concept</span>`
        : "";
      html =
        `
        <section class="grocery-group">
          <div class="grocery-group__header grocery-group__header--shared">
            <h2>Gedeelde ingrediënten${sharedConcept}</h2>
          </div>
          ${shared.sort((a, b) => Number(a.checked) - Number(b.checked)).map(renderGroceryItem).join("")}
        </section>
      ` + html;
    }
  } else {
    // Single recipe — group by ingredient category as before
    const groups = state.groceryItems.reduce((acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    }, {});

    const soloId = state.groceryItems.find((i) => i.recipeId)?.recipeId || "";
    const soloRecipe = soloId ? getRecipeById(soloId) : null;
    const soloConceptPill =
      soloRecipe?.needsReview ?
        `<span class="grocery-group__pill grocery-group__pill--concept">Concept</span>`
      : "";

    html = Object.entries(groups)
      .map(([group, items], gi) => {
        const meta = getGroupMeta(group);
        const sortedItems = [...items].sort((l, r) => Number(l.checked) - Number(r.checked));
        const conceptInHeading = gi === 0 ? soloConceptPill : "";
        return `
          <section class="grocery-group">
            <div class="grocery-group__header">
              <h2>${meta.title}${conceptInHeading}</h2>
            </div>
            ${sortedItems.map(renderGroceryItem).join("")}
          </section>
        `;
      }).join("");
  }

  groceryGroups.innerHTML = html;

  // Pantry suggestions should only show for the relevant recipe group(s),
  // and should match the rest of the grocery list look & feel.
  const existingKeys = new Set(state.groceryItems.map((i) => normalizeIngredientKey(i.title)));

  const renderPantryEntry = (s, meta) => `
    <div class="grocery-entry-wrapper">
      <button class="grocery-entry" type="button"
        data-pantry-add="${escapeHtml(s.title)}"
        data-pantry-recipe-id="${escapeHtml(meta.recipeId || "")}"
        aria-label="Toevoegen: ${escapeHtml(s.title)}">
        <span class="grocery-check" aria-hidden="true">${escapeHtml(s.icon)}</span>
        <span class="grocery-entry__content">
          <p class="grocery-entry__title">${escapeHtml(s.title)}</p>
        </span>
        <span class="grocery-entry__amount"></span>
        <span class="grocery-entry__img" aria-hidden="true">${getIngredientVisualMarkup(s.title)}</span>
      </button>
      <button class="grocery-entry-action grocery-entry-action--add" type="button"
        data-pantry-add="${escapeHtml(s.title)}"
        data-pantry-recipe-id="${escapeHtml(meta.recipeId || "")}"
        aria-label="Toevoegen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>
  `;

  const appendPantrySection = ({ recipeId, recipeTitle }) => {
    if (!recipeId || !recipeTitle) return;
    const recipe = getRecipeById(recipeId);
    if (!recipe) return;
    const suggestions = getPantryOptionalSuggestionsForRecipe(recipe, existingKeys);
    if (!suggestions.length) return;

    const section = document.createElement("section");
    section.className = "grocery-group grocery-group--smart";
    section.innerHTML = `
      <div class="grocery-group__header grocery-group__header--shared">
        <h2>In huis (optioneel) — ${escapeHtml(recipeTitle)}</h2>
      </div>
      ${suggestions.map((s) => renderPantryEntry(s, { recipeId, recipeTitle })).join("")}
    `;
    groceryGroups.appendChild(section);
  };

  if (multiRecipe) {
    for (const recipeTitle of uniqueRecipes) {
      const recipeId = state.groceryItems.find((i) => (i.recipeTitle || "Overig") === recipeTitle)?.recipeId || "";
      if (recipeId) appendPantrySection({ recipeId, recipeTitle });
    }
  } else {
    const onlyRecipeId = state.groceryItems.find((i) => i.recipeId)?.recipeId || "";
    const onlyRecipeTitle = state.groceryItems.find((i) => i.recipeTitle)?.recipeTitle || "";
    if (onlyRecipeId && onlyRecipeTitle) appendPantrySection({ recipeId: onlyRecipeId, recipeTitle: onlyRecipeTitle });
  }

  groceryGroups.querySelectorAll("[data-pantry-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-pantry-add") || "";
      const recipeId = btn.getAttribute("data-pantry-recipe-id") || "";
      if (!title) return;
      const recipe = recipeId ? getRecipeById(recipeId) : null;
      addGroceryItemByTitle(title, "1 stuk", "", {
        recipeId: recipe?.id || recipeId || "",
        recipeTitle: recipe?.title || "",
        recipeSourceUrl: recipe?.sourceUrl || "",
        recipePlatform: recipe?.platform || "website",
      });
    });
  });

  // Trigger background photo fetch for items without photos (debounced, safe to call always)
  debouncedFetchGroceryPhotos();
}

let _groceryPhotoFetchTimer = null;
function debouncedFetchGroceryPhotos() {
  if (_groceryPhotoFetchTimer) clearTimeout(_groceryPhotoFetchTimer);
  _groceryPhotoFetchTimer = setTimeout(() => {
    _groceryPhotoFetchTimer = null;
    fetchGroceryPhotos();
  }, 1500);
}

async function fetchGroceryPhotos() {
  const itemsWithoutPhoto = state.groceryItems
    .filter((item) => !item.imageUrl && !item.checked)
    .slice(0, 20);
  if (!itemsWithoutPhoto.length) return;
  document.getElementById("groceryScreen")?.classList.add("grocery--loading");
  try {
    const resp = await fetch("/api/grocery-photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: itemsWithoutPhoto.map((item) => ({ id: item.id, title: item.title })),
      }),
    });
    if (!resp.ok) return;
    const data = await resp.json();
    const photos = data.photos || {};
    let changed = false;
    for (const [groceryId, url] of Object.entries(photos)) {
      if (!url) continue;
      const item = state.groceryItems.find((i) => i.id === groceryId);
      if (item && !item.imageUrl) {
        item.imageUrl = url;
        changed = true;
      }
    }
    if (changed && state.view === "grocery") {
      renderGroceryGroups();
    }
  } catch {
    // silently ignore
  } finally {
    document.getElementById("groceryScreen")?.classList.remove("grocery--loading");
  }
}

function singularizeIngredientName(name) {
  // Convert plural to singular for better search results
  // e.g., "kipfilets" -> "kipfilet", "tomaten" -> "tomaat"
  const lowerName = name.toLowerCase().trim();

  // Common Dutch plural patterns
  const pluralPatterns = [
    { plural: /en$/, singular: '' }, // e.g., "tomaten" -> "tomaat"
    { plural: /s$/, singular: '' }, // e.g., "ui" -> "ui" (no change if already ends in s)
  ];

  // Specific Dutch singularization rules
  const singularMap = {
    'tomaten': 'tomaat',
    'kipfilets': 'kipfilet',
    'bonnen': 'boon',
    'erwten': 'erwt',
    'bonen': 'boon',
    'pepers': 'peper',
    'uien': 'ui',
    'aardappelen': 'aardappel',
    'wortelstukken': 'wortelstuk',
    'bosjes': 'bosje',
    'bosjes': 'bosje',
    'kruidenbouillon': 'kruidenbuillon',
  };

  if (singularMap[lowerName]) {
    return singularMap[lowerName];
  }

  // Pattern-based singularization
  if (lowerName.endsWith('en')) {
    const base = lowerName.slice(0, -2);
    // If removing 'en' leaves a valid word, use it
    if (base.length > 2) {
      return base;
    }
  }

  // If it ends with 's' but isn't a plural (keep original)
  return lowerName;
}

async function fetchIngredientPhotos() {
  const recipe = getSelectedRecipe();
  if (!recipe) return;

  const ingredientsWithoutPhoto = recipe.ingredients
    .filter((item) => !item.imageUrl)
    .slice(0, 20);
  if (!ingredientsWithoutPhoto.length) return;

  try {
    // Create search variations: original name and singular form
    const itemsToSearch = ingredientsWithoutPhoto.map((item) => {
      const singular = singularizeIngredientName(item.name);
      return {
        id: item.name,
        title: item.name,
        searchTerms: [item.name, singular].filter((t, i, arr) => arr.indexOf(t) === i), // Remove duplicates
      };
    });

    const resp = await fetch("/api/grocery-photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: itemsToSearch.map((item) => ({
          id: item.id,
          title: item.searchTerms[0], // Try singular first, then original
        })),
      }),
    });
    if (!resp.ok) return;
    const data = await resp.json();
    const photos = data.photos || {};
    let changed = false;

    // Map results back to ingredients
    for (const item of itemsToSearch) {
      // Try singular form first, then original name
      let url = photos[item.searchTerms[0]] || photos[item.searchTerms[1]] || null;
      if (url) {
        const ingredient = recipe.ingredients.find((i) => i.name === item.id);
        if (ingredient && !ingredient.imageUrl) {
          ingredient.imageUrl = url;
          changed = true;
        }
      }
    }

    if (changed && state.view === "detail") {
      updateIngredientImages();
    }
  } catch {
    // silently ignore
  }
}

function updateIngredientImages() {
  const recipe = getSelectedRecipe();
  if (!recipe) return;

  const wrappers = document.querySelectorAll(".ingredient-image-wrapper");
  wrappers.forEach((wrapper, index) => {
    const ingredient = recipe.ingredients[index];
    if (ingredient?.imageUrl) {
      const img = wrapper.querySelector(".ingredient-image");
      const fallback = wrapper.querySelector(".ingredient-image-fallback");
      if (img) {
        img.src = ingredient.imageUrl;
        img.alt = ingredient.name;
        img.onload = () => {
          if (fallback) fallback.style.display = "none";
        };
        img.onerror = () => {
          if (fallback) fallback.style.display = "grid";
        };
      }
    }
  });
}

function getReviewRecipe() {
  return getRecipeById(state.reviewRecipeId || state.selectedRecipeId);
}

/** Sort-key: nieuwere imports eerst (id bevat vaak timestamp; plus concept-timestamp). */
function recipeImportRecencyMs(recipe) {
  const id = String(recipe?.id || "");
  const ms = id.match(/(\d{13,})/);
  if (ms) return Number(ms[1]);
  const sec = id.match(/(?:^|-)(\d{10})(?:\D|$)/);
  if (sec) return Number(sec[1]) * 1000;
  return Number(recipe?._previewCreatedAt || 0);
}

/**
 * Bij lege boodschappenlijst: toon altijd tot 6 recentste geïmporteerde recepten
 * (openstaande concepten eerst, daarna opgeslagen imports, nieuwste voorop).
 */
function getRecentImportedRecipesForEmptyGrocery(limit = 6) {
  const previews = getImportPreviewList();
  const savedImported = getImportedRecipes()
    .slice()
    .sort((a, b) => recipeImportRecencyMs(b) - recipeImportRecencyMs(a));
  const out = [];
  const seen = new Set();
  for (const r of previews) {
    if (r?.id && !seen.has(r.id) && out.length < limit) {
      seen.add(r.id);
      out.push(r);
    }
  }
  for (const r of savedImported) {
    if (r?.id && !seen.has(r.id) && out.length < limit) {
      seen.add(r.id);
      out.push(r);
    }
  }
  return out;
}

function importReviewLeaveShouldWarn() {
  if (state.view !== "review") return false;
  const recipe = getReviewRecipe();
  if (!recipe?.id) return false;
  return !isRecipeSaved(recipe.id);
}

function openImportReview(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) {
    return;
  }
  state.reviewRecipeId = recipe.id;
  renderImportReview();
  switchView("review");
}

function getImportPreviewList() {
  const entries = Object.values(state.importPreviews || {}).filter(Boolean);
  // Sort newest first (fallback to id ordering if no timestamp)
  entries.sort((a, b) => (Number(b._previewCreatedAt || 0) - Number(a._previewCreatedAt || 0)));
  return entries;
}

function updateImportDraftsButton() {
  if (!importDraftsButton) return;
  const count = Object.keys(state.importPreviews || {}).length;
  if (count <= 0) {
    importDraftsButton.style.display = "none";
    return;
  }
  importDraftsButton.style.display = "";
  importDraftsButton.textContent = `Concepten (${count})`;
}

function openDraftsFromImport() {
  const previews = getImportPreviewList();
  if (!previews.length) {
    showToast("Geen concepten gevonden.");
    return;
  }
  openImportReview(previews[0].id);
}

function renderImportDrafts() {
  if (!reviewDrafts) return;
  const previews = getImportPreviewList();
  if (!previews.length) {
    reviewDrafts.innerHTML = "";
    updateImportDraftsButton();
    return;
  }

  const max = 5;
  const items = previews.slice(0, max);
  reviewDrafts.innerHTML = `
    <h3 class="review-drafts__title">CONCEPTEN</h3>
    <div class="review-drafts__list">
      ${items
        .map((r) => {
          const host = getSourceHost(r.sourceUrl || "") || getPlatformLabel(r.platform || "website");
          return `
            <div class="review-draft" data-review-draft-id="${escapeHtml(r.id)}">
              <img class="review-draft__img" src="${escapeHtml(r.image || "assets/hero-burger.svg")}" alt="" loading="lazy" />
              <div class="review-draft__copy">
                <p class="review-draft__title-line">${escapeHtml(r.title || "Concept")}</p>
                <p class="review-draft__meta">${escapeHtml(host)}</p>
                <div class="review-draft__actions">
                  <button class="review-draft__btn" type="button" data-review-draft-open="${escapeHtml(r.id)}">Open</button>
                  <button class="review-draft__btn review-draft__btn--danger" type="button" data-review-draft-delete="${escapeHtml(r.id)}">Verwijder</button>
                </div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
  updateImportDraftsButton();
}

function serializeIngredientsForReview(recipe) {
  return recipe.ingredients
    .map((ingredient) => `${formatIngredientAmount(ingredient)} ${ingredient.name}`.trim())
    .join("\n");
}

function renderImportReview() {
  const recipe = getReviewRecipe();
  if (!recipe || !reviewForm) {
    return;
  }

  reviewPreviewImage.src = recipe.image;
  reviewPreviewImage.alt = recipe.alt;
  reviewPreviewMealTag.textContent = recipe.mealTag;
  reviewPreviewHost.textContent = getSourceHost(recipe.sourceUrl || "") || getPlatformLabel(recipe.platform || "website");
  const previewTitle = document.getElementById("reviewPreviewTitle");
  const metricIngredients = document.getElementById("reviewMetricIngredients");
  const metricSteps = document.getElementById("reviewMetricSteps");
  const heroStatus = document.getElementById("reviewHeroStatus");
  const heroStatusText = document.getElementById("reviewHeroStatusText");
  const ingredientCount = Array.isArray(recipe.ingredients) ? recipe.ingredients.length : 0;
  const stepCount = Array.isArray(recipe.instructions) ? recipe.instructions.length : 0;
  const needsAttention = recipe.needsReview || ingredientCount < 4 || stepCount < 3;
  if (previewTitle) previewTitle.textContent = recipe.title || "Geïmporteerd recept";
  if (metricIngredients) metricIngredients.textContent = `${ingredientCount} ingrediënt${ingredientCount === 1 ? "" : "en"}`;
  if (metricSteps) metricSteps.textContent = `${stepCount} stap${stepCount === 1 ? "" : "pen"}`;
  if (heroStatus) heroStatus.dataset.tone = needsAttention ? "warn" : "good";
  if (heroStatusText) heroStatusText.textContent = needsAttention ? "Even nalopen" : "Ziet er compleet uit";
  reviewTitleInput.value = recipe.title || "";
  reviewDescriptionInput.value = recipe.description || "";
  reviewTimeInput.value = recipe.time || "";
  reviewServingsInput.value = recipe.servings || "";
  reviewMealTagInput.value = recipe.mealTag || "Avond";
  // Sync chips to current mealTag
  const chipsContainer = document.getElementById("mealTagChips");
  if (chipsContainer) {
    const activeTag = recipe.mealTag || "Avond";
    chipsContainer.querySelectorAll(".meal-chip").forEach((chip) => {
      chip.classList.toggle("meal-chip--active", chip.dataset.tag === activeTag);
    });
  }
  reviewIngredientsInput.value = serializeIngredientsForReview(recipe);
  reviewInstructionsInput.value = (recipe.instructions || []).join("\n");
  renderReviewAnalysis();
  reviewFeedback.textContent = "Pas de import aan en sla hem daarna op.";
}

function compactReviewDescription(value, title = "") {
  const clean = normalizeDescription(value, title);
  if (!clean) {
    return "";
  }
  const firstSentence = clean
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean)[0];
  return (firstSentence || clean).slice(0, 140);
}

function cleanupReviewIngredientLine(line) {
  const match = String(line || "").trim().match(
    /^(\d+(?:[.,]\d+)?(?:\s+\d+\/\d+|\/\d+)?\s*(?:g|kg|ml|l|el|tl|tbsp|tsp|cup|cups|oz|dl|stuks?|stuk|krop|bosje|zakje|pot|blik|liter|snuf|teen|tenen|handje|handjes|scheutje|stengels?|takjes?)?)?\s*(.+)$/i
  );
  const prefix = (match?.[1] || "").trim();
  const name = (match?.[2] || String(line || "")).trim();
  const cleanedName = name
    .replace(/\s*\((?:optioneel|naar smaak)\)\s*/gi, " ")
    .replace(/,\s*(fijn)?gesnipperd\b/gi, "")
    .replace(/,\s*fijngesneden\b/gi, "")
    .replace(/,\s*gesneden\b/gi, "")
    .replace(/,\s*geraspt\b/gi, "")
    .replace(/,\s*gerist\b/gi, "")
    .replace(/,\s*in\s+\d+e?\s+gesneden\b/gi, "")
    .replace(/,\s*in\s+stukken\b/gi, "")
    .replace(/,\s*in\s+blokjes\b/gi, "")
    .replace(/,\s*in\s+plakjes\b/gi, "")
    .replace(/^(?:een|één)\s+(kleine|grote|middelgrote|middelgroot)\s+/i, "")
    .replace(/^(kleine|grote|middelgrote|middelgroot)\s+/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return `${prefix ? `${prefix} ` : ""}${cleanedName}`.trim();
}

function cleanupReviewInstructionLine(line) {
  return String(line || "")
    .replace(/\b(?:tip|tips?|extra tip)\s*:\s*.*$/i, "")
    .replace(/\bEet smakelijk!?$/i, "")
    .trim();
}

function getReviewDraft() {
  const recipe = getReviewRecipe();
  const title = reviewTitleInput?.value?.trim() || recipe?.title || "";
  const description = reviewDescriptionInput?.value?.trim() || recipe?.description || "";
  const ingredients = parseReviewLines(reviewIngredientsInput?.value || "");
  const instructions = parseReviewLines(reviewInstructionsInput?.value || "");
  const time = reviewTimeInput?.value?.trim() || recipe?.time || "";
  const host = getSourceHost(recipe?.sourceUrl || "") || getPlatformLabel(recipe?.platform || "website");
  return { recipe, title, description, ingredients, instructions, time, host };
}

function renderReviewSummary(recipe) {
  if (!reviewSummary) {
    return;
  }

  const ingredientCount = (recipe.ingredients || []).length;
  const stepCount = (recipe.instructions || []).length;
  const summaryItems = [
    {
      title: "Bron",
      value: getSourceHost(recipe.sourceUrl || "") || getPlatformLabel(recipe.platform || "website"),
      tone: "muted",
    },
    {
      title: "Ingrediënten",
      value: `${ingredientCount} gevonden`,
      detail: ingredientCount >= 4 ? "Ziet er compleet uit" : "Controleer of er niets mist",
      tone: ingredientCount >= 4 ? "good" : "warn",
    },
    {
      title: "Bereiding",
      value: `${stepCount} stappen`,
      detail: stepCount >= 3 ? "Klaar om te koken" : "Maak losse stappen",
      tone: stepCount >= 3 ? "good" : "warn",
    },
    {
      title: "Tijd",
      value: recipe.time || "Onbekend",
      tone: "muted",
    },
  ];

  reviewSummary.innerHTML = `
    <div class="review-summary__grid">
      ${summaryItems
        .map(
          (item) => `
            <article class="review-summary__card review-summary__card--${item.tone}">
              <span>${escapeHtml(item.title)}</span>
              <strong>${escapeHtml(item.value)}</strong>
              ${item.detail ? `<p>${escapeHtml(item.detail)}</p>` : ""}
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function buildReviewInsights(recipe) {
  const insights = [];

  if ((recipe.title || "").length > 44) {
    insights.push({ tone: "warn", text: "De titel is nog vrij lang. Maak hem kort en duidelijk." });
  } else {
    insights.push({ tone: "good", text: "Titel oogt kort en duidelijk." });
  }

  if (!recipe.description || recipe.description.length < 30) {
    insights.push({ tone: "warn", text: "Voeg een korte omschrijving toe, zodat het recept duidelijker wordt op home." });
  } else {
    insights.push({ tone: "good", text: "Omschrijving is aanwezig." });
  }

  if ((recipe.ingredients || []).length < 4) {
    insights.push({ tone: "warn", text: "Er staan weinig ingrediënten in. Controleer of de import compleet is." });
  } else {
    insights.push({ tone: "good", text: `${recipe.ingredients.length} ingrediënten gevonden.` });
  }

  if ((recipe.instructions || []).length < 3) {
    insights.push({ tone: "warn", text: "De bereidingswijze is waarschijnlijk nog te kort. Voeg losse stappen toe." });
  } else {
    insights.push({ tone: "good", text: `${recipe.instructions.length} bereidingsstappen klaar.` });
  }

  if (recipe.needsReview) {
    insights.unshift({ tone: "warn", text: "Deze import lijkt nog onvolledig. Loop hem even na voordat je gaat koken." });
  }

  return insights;
}

function renderReviewInsights(recipe) {
  if (!reviewInsights) {
    return;
  }

  const insights = buildReviewInsights(recipe);
  reviewInsights.innerHTML = insights
    .map(
      (item) => `
        <article class="review-insight review-insight--${item.tone}">
          <span class="review-insight__dot" aria-hidden="true"></span>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");
}

function buildReviewSuggestions(draft) {
  const suggestions = [];
  const normalizedTitle = normalizeImportedTitle(draft.title);
  if (normalizedTitle && normalizedTitle !== draft.title) {
    suggestions.push({
      key: "title",
      label: "Gebruik kortere titel",
      meta: normalizedTitle,
      value: normalizedTitle,
    });
  }

  const compactDescription = compactReviewDescription(draft.description, draft.title);
  if (compactDescription && compactDescription !== draft.description) {
    suggestions.push({
      key: "description",
      label: "Maak omschrijving compacter",
      meta: compactDescription,
      value: compactDescription,
    });
  }

  const cleanedIngredients = draft.ingredients.map(cleanupReviewIngredientLine);
  if (cleanedIngredients.some((line, index) => line !== draft.ingredients[index])) {
    suggestions.push({
      key: "ingredients",
      label: "Ingrediënten opschonen",
      meta: "Verwijder snij- en prep-tekst uit de namen",
      value: cleanedIngredients.join("\n"),
    });
  }

  const cleanedInstructions = draft.instructions.map(cleanupReviewInstructionLine).filter(Boolean);
  if (
    cleanedInstructions.length &&
    (cleanedInstructions.length !== draft.instructions.length ||
      cleanedInstructions.some((line, index) => line !== draft.instructions[index]))
  ) {
    suggestions.push({
      key: "instructions",
      label: "Stappen opschonen",
      meta: "Haal losse tips en afsluiters uit de bereidingswijze",
      value: cleanedInstructions.join("\n"),
    });
  }

  return suggestions;
}

function renderReviewSuggestions(draft) {
  if (!reviewSuggestions) {
    return;
  }

  const suggestions = buildReviewSuggestions(draft);
  reviewSuggestions.innerHTML = suggestions
    .map(
      (item) => `
        <article class="review-suggestion">
          <div class="review-suggestion__copy">
            <p class="review-suggestion__title">${escapeHtml(item.label)}</p>
            <p class="review-suggestion__meta">${escapeHtml(item.meta)}</p>
          </div>
          <button class="review-suggestion__action" type="button" data-review-apply="${escapeHtml(item.key)}" data-review-value="${escapeHtml(item.value)}">
            Toepassen
          </button>
        </article>
      `
    )
    .join("");
}

function renderReviewAnalysis() {
  const draft = getReviewDraft();
  renderReviewSummary({
    sourceUrl: draft.recipe?.sourceUrl,
    platform: draft.recipe?.platform,
    ingredients: draft.ingredients,
    instructions: draft.instructions,
    time: draft.time,
  });
  renderReviewInsights({
    title: draft.title,
    description: draft.description,
    ingredients: draft.ingredients,
    instructions: draft.instructions,
    needsReview: draft.ingredients.length < 4 || draft.instructions.length < 3,
  });
  renderReviewSuggestions(draft);
}

function parseReviewLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function saveImportReview() {
  const recipe = getReviewRecipe();
  if (!recipe) {
    return;
  }

  const nextIngredients = parseReviewLines(reviewIngredientsInput.value).map((line) => parseIngredientInput(line));
  const nextInstructions = parseReviewLines(reviewInstructionsInput.value);

  const titleInput = reviewTitleInput?.value?.trim() || "";
  const nextTitle = normalizeImportedTitle(titleInput || recipe.title || "Geïmporteerd recept");
  if (!nextIngredients.length) {
    reviewFeedback.textContent = "Voeg minimaal één ingrediënt toe.";
    return;
  }

  // Validate ingredient quantities
  const invalidQtyIngredients = nextIngredients.filter((ing) => {
    const qtyNum = parseFloat(ing.quantity.replace(",", "."));
    return isNaN(qtyNum) || qtyNum <= 0;
  });
  if (invalidQtyIngredients.length > 0) {
    const count = invalidQtyIngredients.length;
    reviewFeedback.textContent = `${count} ingrediënt${count !== 1 ? "en" : ""} hebben ongeldige hoeveelheid. Zet je ingrediënten correct in (bijv. "2 el suiker").`;
    return;
  }

  if (!nextInstructions.length) {
    reviewFeedback.textContent = "Voeg minimaal één bereidingsstap toe.";
    return;
  }

  Object.assign(recipe, {
    title: nextTitle,
    description: normalizeDescription(reviewDescriptionInput.value.trim(), nextTitle),
    time: reviewTimeInput.value.trim() || recipe.time || "30 min",
    servings: parseServingsValue(reviewServingsInput.value.trim() || recipe.servings),
    mealTag: toDutchMealTag(reviewMealTagInput.value.trim() || recipe.mealTag || "Avond"),
    alt: nextTitle,
    ingredients: nextIngredients,
    instructions: nextInstructions,
    needsReview: nextIngredients.length < 4 || nextInstructions.length < 3,
  });

  state.selectedRecipeId = recipe.id;
  state.featuredRecipeId = recipe.id;
  state.currentServings = parseBaseServings(recipe.servings);
  renderAll();
  schedulePersistAppState();
  reviewFeedback.textContent = "Recept bijgewerkt.";
  showToast(`${recipe.title} is opgeslagen.`);
  trackClientEvent("client_import_review_saved", {
    ingredients: nextIngredients.length,
    steps: nextInstructions.length,
    needs_review: Boolean(recipe.needsReview),
  });
  openCookbookSaveModal(recipe.id);
}

function removeEmptyReviewLines(text) {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
}

function splitReviewLinesOnSemicolon(text) {
  const lines = String(text || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim());
  const out = [];
  for (const line of lines) {
    if (!line) continue;
    const parts = line
      .split(/\s*;\s*/g)
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length <= 1) {
      out.push(line);
      continue;
    }
    out.push(...parts);
  }
  return out.join("\n");
}

function combineReviewNumberLines(text) {
  const rawLines = String(text || "")
    .replace(/\r\n/g, "\n")
    .split("\n");
  const out = [];
  for (let i = 0; i < rawLines.length; i++) {
    const line = String(rawLines[i] || "").trim();
    if (!line) continue;
    if (/^\d+\s*[\.)]?$/.test(line)) {
      const next = String(rawLines[i + 1] || "").trim();
      if (next) {
        out.push(`${line.replace(/\s+/g, "")} ${next}`.trim());
        i += 1;
        continue;
      }
    }
    out.push(line);
  }
  return out.join("\n");
}

function getReviewTextareaByTarget(target) {
  return target === "instructions" ? reviewInstructionsInput : reviewIngredientsInput;
}

function applyReviewQuickAction(action, target) {
  const textarea = getReviewTextareaByTarget(target);
  if (!textarea) return;
  const current = textarea.value || "";
  let next = current;
  if (action === "remove-empty") next = removeEmptyReviewLines(current);
  if (action === "split-semicolon") next = splitReviewLinesOnSemicolon(current);
  if (action === "combine-number-lines") next = combineReviewNumberLines(current);
  textarea.value = next;
  renderReviewAnalysis();
  reviewFeedback.textContent = "Snelle actie toegepast.";
  textarea.focus?.();
}

function applyReviewSuggestion(field, value) {
  if (field === "title" && reviewTitleInput) {
    reviewTitleInput.value = value;
  }
  if (field === "description" && reviewDescriptionInput) {
    reviewDescriptionInput.value = value;
  }
  if (field === "ingredients" && reviewIngredientsInput) {
    reviewIngredientsInput.value = value;
  }
  if (field === "instructions" && reviewInstructionsInput) {
    reviewInstructionsInput.value = value;
  }
  renderReviewAnalysis();
  reviewFeedback.textContent = "Suggestie toegepast.";
}

function toggleIngredientChecked(index) {
  const recipe = getSelectedRecipe();
  const ingredient = recipe.ingredients[index];
  if (!ingredient) {
    return;
  }

  const progress = getRecipeProgress(recipe.id);
  const key = getIngredientProgressKey(ingredient, index);
  if (progress.checkedIngredients.includes(key)) {
    progress.checkedIngredients = progress.checkedIngredients.filter((item) => item !== key);
  } else {
    progress.checkedIngredients = [...progress.checkedIngredients, key];
  }

  renderDetailRecipe(false);
  schedulePersistAppState();
}

function checkAllIngredients() {
  const recipe = getSelectedRecipe();
  if (!recipe) return;

  const progress = getRecipeProgress(recipe.id);
  recipe.ingredients.forEach((ingredient, index) => {
    const key = getIngredientProgressKey(ingredient, index);
    if (!progress.checkedIngredients.includes(key)) {
      progress.checkedIngredients.push(key);
    }
  });

  renderDetailRecipe(false);
  schedulePersistAppState();
}

function uncheckAllIngredients() {
  const recipe = getSelectedRecipe();
  if (!recipe) return;

  const progress = getRecipeProgress(recipe.id);
  progress.checkedIngredients = [];

  renderDetailRecipe(false);
  schedulePersistAppState();
}

function setCookModeStep(nextStepIndex) {
  const recipe = getSelectedRecipe();
  const progress = getRecipeProgress(recipe.id);
  const maxIndex = Math.max(0, recipe.instructions.length - 1);
  progress.currentStep = Math.min(Math.max(0, nextStepIndex), maxIndex);
  renderDetailRecipe(false);
  schedulePersistAppState();
}

function toggleCookMode() {
  const recipe = getSelectedRecipe();
  const progress = getRecipeProgress(recipe.id);

  if (!recipe.instructions.length) {
    showToast("Voeg eerst bereidingsstappen toe bij Recept bewerken.");
    return;
  }

  progress.cookMode = !progress.cookMode;
  if (!progress.cookMode) {
    progress.currentStep = 0;
  }

  renderDetailRecipe(false);
  schedulePersistAppState();
}

const LANG_LABELS = { nl: "Nederlands", en: "English" };

// ── Changelog (user-facing release notes) ───────────────────────────────────
const PLATELY_CHANGELOG = [
  {
    version: "1.4",
    date: "mei 2026",
    highlights: [
      "Profiel pagina volledig vernieuwd met eigen sub-pagina's",
      "Mijn account: naam en e-mail aanpassen",
      "Gekoppelde kanalen: overzicht en beheer van jouw kanalen",
      "Taal instelling: Nederlands of Engels",
      "Biologisch filter bij boodschappenlijst AH",
    ],
  },
  {
    version: "1.3",
    date: "april 2026",
    highlights: [
      "Kookboeken als eigen tab in de navigatie",
      "Boodschappenlijst: personen instellen via +/−",
      "Mijn recepten als horizontale slider op de homepage",
      "Importeer recept: groter invoerveld en groenere knop",
    ],
  },
  {
    version: "1.2",
    date: "april 2026",
    highlights: [
      "Zoekresultaten filteren op kanaal",
      "Betere herkenning van recept-URL's (blog-pagina's worden uitgefilterd)",
      "Boodschappenlijst blijft correct leeg na wissen",
    ],
  },
  {
    version: "1.1",
    date: "april 2026",
    highlights: [
      "Profiel pagina met statistieken (recepten, boeken, kanalen)",
      "Nieuw: Kookboeken aanmaken en beheren",
      "Maaltijdplanner toegevoegd",
    ],
  },
];

function renderChangelog() {
  const body = document.getElementById("changelogBody");
  if (!body) return;
  body.innerHTML = PLATELY_CHANGELOG.map((release) => `
    <div class="changelog-release">
      <div class="changelog-release__header">
        <span class="changelog-release__version">v${escapeHtml(release.version)}</span>
        <span class="changelog-release__date">${escapeHtml(release.date)}</span>
      </div>
      <ul class="changelog-release__list">
        ${release.highlights.map((h) => `<li class="changelog-release__item">${escapeHtml(h)}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

function updateLanguagePanel() {
  const active = state.language || "nl";
  document.querySelectorAll(".language-option").forEach((btn) => {
    const lang = btn.dataset.lang;
    const check = btn.querySelector(".lang-check");
    if (check) check.style.display = lang === active ? "" : "none";
  });
  const metaEl = document.getElementById("profileLanguageMeta");
  if (metaEl) metaEl.textContent = LANG_LABELS[active] || "Nederlands";
}

function renderProfileSummary() {
  const isAuth = state.auth.authenticated;

  // Toggle login banner vs full profile hero
  const loginBanner = document.getElementById("profileLoginBanner");
  const profileHero = document.getElementById("profileHero");
  const logoutCard = document.getElementById("logoutCard");
  if (loginBanner) loginBanner.style.display = isAuth ? "none" : "";
  if (profileHero) profileHero.style.display = isAuth ? "" : "none";
  if (logoutCard) logoutCard.style.display = isAuth ? "" : "none";

  if (profileName) {
    profileName.textContent = state.profile.name;
  }
  if (profileHandle) {
    // Hide email when authenticated
    if (state.auth.authenticated) {
      profileHandle.style.display = "none";
    } else {
      profileHandle.style.display = "";
      // Prefer verified email from auth, then profile email, then handle
      const displayEmail = state.auth.email || state.profile.email || state.profile.handle || "";
      profileHandle.textContent = displayEmail;
    }
  }
  if (profileRecipeCount) {
    profileRecipeCount.textContent = String(state.recipes.length);
  }
  if (profileCookbookCount) {
    profileCookbookCount.textContent = String(state.cookbooks.length);
  }
  // Channel count
  const channelCountEl = document.getElementById("profileChannelCount");
  const activeChannelsCount = countActiveFollowedChannels();
  if (channelCountEl) channelCountEl.textContent = String(activeChannelsCount);
  const channelMetaEl = document.getElementById("profileChannelMeta");
  if (channelMetaEl) channelMetaEl.textContent = `${activeChannelsCount} actief`;
  // Favorite supermarket meta
  const supermarketMetaEl = document.getElementById("profileSupermarketMeta");
  if (supermarketMetaEl) {
    const sm = getSupermarketById(state.profile.favoriteSupermarket);
    supermarketMetaEl.textContent = sm.name;
  }
  updateLanguagePanel();
  renderAvatars();
  refreshFeaturePushState().catch(() => {});
}

function renderAvatars() {
  const photo = state.profile.photo;
  document.querySelectorAll(".home-avatar, .grocery-avatar").forEach((btn) => {
    // Clear old content
    btn.innerHTML = "";
    if (photo) {
      const img = document.createElement("img");
      img.src = photo;
      img.alt = state.profile.name || "Profiel";
      img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:999px;";
      btn.appendChild(img);
    } else {
      const bubble = document.createElement("div");
      bubble.className = "avatar-initials";
      bubble.textContent = getInitials(state.profile.name, state.auth.email || state.profile.email);
      btn.appendChild(bubble);
    }
  });

  // Update profile2 avatars (bottom nav + sub-panel + hero on profile screen)
  ["profileAvatarDisplay", "profileSubAvatarDisplay", "profileHeroAvatar"].forEach((id) => {
    const p2avatar = document.getElementById(id);
    if (!p2avatar) return;
    if (photo) {
      p2avatar.innerHTML = "";
      const img = document.createElement("img");
      img.src = photo;
      img.alt = state.profile.name || "";
      img.className = "profile2-avatar__img";
      img.setAttribute("aria-hidden", "true");
      p2avatar.appendChild(img);
    } else {
      p2avatar.innerHTML = "";
      p2avatar.textContent = getInitials(state.profile.name, state.auth.email || state.profile.email);
    }
  });
}

function setCookbooksScreenMode(mode, cookbookName) {
  // mode: "list" | "detail"
  const listHeader = document.getElementById("cookbooksTopbarList");
  const detailHeader = document.getElementById("cookbooksTopbarDetail");
  const grid = document.getElementById("cookbooksScreenGrid");
  if (listHeader) listHeader.style.display = mode === "detail" ? "none" : "";
  if (detailHeader) detailHeader.style.display = mode === "detail" ? "" : "none";
  if (grid) grid.classList.toggle("cookbook-grid--detail", mode === "detail");
  if (mode === "detail" && cookbookName) {
    const titleEl = document.getElementById("cookbooksDetailTitle");
    if (titleEl) titleEl.textContent = cookbookName;
  }
  // Sync home-avatar in cookbook list header
  renderAvatars();
}

function renderCookbookDetail(cookbookId) {
  const cookbook = state.cookbooks.find((cb) => cb.id === cookbookId);
  if (!cookbook) {
    state.openCookbookId = null;
    renderCookbookList();
    return;
  }
  // Ensure detail actions (remove/select/bulk delete) work no matter where
  // the detail view is rendered (settings list vs cookbooks screen grid).
  state.openCookbookId = cookbookId;
  setCookbooksScreenMode("detail", cookbook.name);
  const selecting = Boolean(state.cookbookSelectMode && state.openCookbookId === cookbookId);
  const selectedIds = new Set(state.cookbookSelectedRecipeIds || []);
  const recipes = cookbook.recipeIds.map((id) => getRecipeById(id)).filter(Boolean);
  const _cbScreenGrid = document.getElementById("cookbooksScreenGrid");
  const _detailHtml = `
    <div class="cb-detail ${selecting ? "cb-detail--selecting" : ""}">
      <div class="cb-detail__header">
        <div class="cb-detail__title-row"></div>
        <div class="cb-detail__actions">
          <button class="cb-detail__action-btn" type="button" data-cb-select-mode="true">
            ${selecting ? "Klaar" : "Selecteer"}
          </button>
          <button class="cb-detail__action-btn cb-detail__action-btn--danger" type="button"
            data-cb-delete-selected="true"
            ${selecting && selectedIds.size ? "" : "disabled"}>
            Verwijder (${selecting ? selectedIds.size : 0})
          </button>
        </div>
      </div>
      ${recipes.length ? `
        <div class="cb-detail__grid">
          ${recipes.map((recipe) => `
            <div class="cb-detail__item ${selecting && selectedIds.has(recipe.id) ? "is-selected" : ""}">
              <button class="cb-detail__card" type="button" data-open-recipe-id="${escapeHtml(recipe.id)}">
                <img class="cb-detail__img" src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.title)}" loading="lazy" />
                <div class="cb-detail__card-body">
                  <span class="cb-detail__card-title">${escapeHtml(recipe.title)}</span>
                  <span class="cb-detail__card-time">${escapeHtml(recipe.time)}</span>
                </div>
              </button>
              <button class="cb-detail__select" type="button"
                data-cb-select-recipe="${escapeHtml(recipe.id)}"
                aria-label="Selecteer ${escapeHtml(recipe.title)}">
                ${selecting && selectedIds.has(recipe.id) ? "✓" : ""}
              </button>
              <button class="cb-detail__move" type="button"
                data-move-recipe="${escapeHtml(recipe.id)}"
                aria-label="Verplaats ${escapeHtml(recipe.title)} naar ander kookboek"
                title="Verplaatsen">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button class="cb-detail__remove" type="button"
                data-remove-from-cookbook="${escapeHtml(recipe.id)}"
                aria-label="Verwijder ${escapeHtml(recipe.title)} uit kookboek">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </button>
            </div>
          `).join("")}
        </div>
      ` : `
        <div class="cb-detail__empty-state">
          <div class="cb-detail__empty-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16a4 4 0 0 1 4-4h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3 class="cb-detail__empty-title">Dit kookboek is nog leeg</h3>
          <p class="cb-detail__empty-text">Voeg recepten toe om ze hier te zien en te organiseren</p>
        </div>
      `}
      <button class="cb-detail__add-btn" type="button" data-open-recipe-picker="true">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        Recept toevoegen
      </button>
    </div>
  `;
  cookbookList.innerHTML = _detailHtml;
  if (_cbScreenGrid) _cbScreenGrid.innerHTML = _detailHtml;

  // Defensive: ensure clicks inside detail view are handled even if outer
  // container bindings differ across screens/devices.
  const roots = [cookbookList, _cbScreenGrid].filter(Boolean);
  roots.forEach((root) => {
    const detail = root.querySelector?.(".cb-detail");
    if (!(detail instanceof HTMLElement)) return;
    if (detail.dataset.cbWired === "true") return;
    detail.dataset.cbWired = "true";
    detail.addEventListener("click", handleCookbookGridClick);

    // Even more defensive: bind direct handlers on key buttons, because some
    // mobile WebViews can be finicky with delegated click targets.
    const selectBtn = detail.querySelector('[data-cb-select-mode="true"]');
    if (selectBtn instanceof HTMLElement) {
      selectBtn.addEventListener("click", (event) => handleCookbookGridClick(event), { capture: true });
    }
    const bulkBtn = detail.querySelector('[data-cb-delete-selected="true"]');
    if (bulkBtn instanceof HTMLElement) {
      bulkBtn.addEventListener("click", (event) => handleCookbookGridClick(event), { capture: true });
    }
    detail.querySelectorAll("[data-remove-from-cookbook],[data-cb-select-recipe],[data-open-recipe-id]").forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      el.addEventListener("click", (event) => handleCookbookGridClick(event), { capture: true });
    });
  });

  // Always start the cookbook detail view at the top (some views scroll within containers
  // rather than the window; iOS/Safari can also apply scroll after layout).
  scrollToTopSoon([cookbooksScreen, cookbookList, _cbScreenGrid]);
}

function renderCookbookList() {
  if (state.openCookbookId) {
    renderCookbookDetail(state.openCookbookId);
    renderProfileSummary();
    return;
  }

  // Reset selection state when leaving detail view
  state.cookbookSelectMode = false;
  state.cookbookSelectedRecipeIds = [];

  setCookbooksScreenMode("list");
  const cookbooksScreenGrid = document.getElementById("cookbooksScreenGrid");
  const selecting = Boolean(state.cookbooksSelectMode);
  const selectedIds = new Set(state.cookbooksSelectedIds || []);
  const canBulkDelete = selecting && selectedIds.size > 0 && state.cookbooks.length - selectedIds.size >= 1;
  const html = [
    `
      <div class="cookbook-bulkbar ${selecting ? "" : "hidden"}">
        <div class="cookbook-bulkbar__meta">Geselecteerd: <strong>${selecting ? selectedIds.size : 0}</strong></div>
        <div class="cookbook-bulkbar__actions">
          <button type="button" class="cookbook-bulkbar__btn" data-cb-list-select-mode="true">${selecting ? "Klaar" : "Selecteer"}</button>
          <button type="button" class="cookbook-bulkbar__btn cookbook-bulkbar__btn--danger" data-cb-list-delete-selected="true" ${canBulkDelete ? "" : "disabled"}>
            Verwijder (${selecting ? selectedIds.size : 0})
          </button>
        </div>
      </div>
    `,
    `
      <button class="cookbook-collection cookbook-collection--add" type="button" data-create-cookbook="true">
        <div class="cookbook-collection__cover cookbook-collection__cover--empty">
          <span>＋</span>
        </div>
        <div class="cookbook-collection__head">
          <h3>Nieuwe collectie</h3>
          <p class="cookbook-collection__meta">Maak een nieuw kookboek aan</p>
        </div>
      </button>
    `,
    ...state.cookbooks.map((cookbook) => {
      const recipes = cookbook.recipeIds
        .map((recipeId) => getRecipeById(recipeId))
        .filter(Boolean);
      const coverRecipes = recipes.slice(0, 4);
      // Subtiele cover-tint per kookboek: hash naam → vast kleurnummer (1..6).
      // Zo krijgt elk kookboek een eigen herkenbare wash zonder dat we per
      // kookboek apart een kleur hoeven op te slaan.
      const tintIdx = (() => {
        let h = 0;
        const s = String(cookbook.name || cookbook.id || "");
        for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
        return (Math.abs(h) % 6) + 1;
      })();
      const coverMarkup = coverRecipes.length
        ? `
            <div class="cookbook-collection__cover cookbook-collection__cover--tint-${tintIdx} ${coverRecipes.length > 1 ? "cookbook-collection__cover--grid" : ""}">
              ${coverRecipes
                .map(
                  (recipe) => `
                    <img
                      class="cookbook-collection__img"
                      src="${escapeHtml(recipe.image)}"
                      alt="${escapeHtml(recipe.title)}"
                      loading="lazy"
                    />
                  `
                )
                .join("")}
            </div>
          `
        : `
            <div class="cookbook-collection__cover cookbook-collection__cover--empty cookbook-collection__cover--tint-${tintIdx}">
              <span>＋</span>
            </div>
          `;

      return `
        <div class="cookbook-collection-wrap ${selecting && selectedIds.has(cookbook.id) ? "is-selected" : ""}">
        <button
          class="cookbook-collection ${cookbook.id === state.selectedCookbookId ? "is-active" : ""}"
          type="button"
          data-cookbook-id="${cookbook.id}"
        >
          ${coverMarkup}
          <span class="cookbook-collection__badge">${cookbook.recipeIds.length} recepten</span>
          <div class="cookbook-collection__head">
            <h3>${escapeHtml(cookbook.name)}</h3>
            <p class="cookbook-collection__meta">
              ${cookbook.id === state.selectedCookbookId ? "Standaard kookboek" : "Tik om als standaard te gebruiken"}
            </p>
          </div>
        </button>
        <button class="cookbook-collection__select" type="button" data-cb-select-cookbook="${cookbook.id}" aria-label="Selecteer ${escapeHtml(cookbook.name)}">
          ${selecting && selectedIds.has(cookbook.id) ? "✓" : ""}
        </button>
        <button class="cookbook-options-btn" type="button" data-cookbook-options-id="${cookbook.id}" aria-label="Opties voor ${escapeHtml(cookbook.name)}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>
        </button>
        </div>
      `;
    }),
  ].join("");
  cookbookList.innerHTML = html;
  cookbookList.classList.toggle("cookbooks-grid--selecting", selecting);
  if (cookbooksScreenGrid) {
    cookbooksScreenGrid.innerHTML = html;
    cookbooksScreenGrid.classList.toggle("cookbooks-grid--selecting", selecting);
  }
  renderProfileSummary();
}

function renderMealPlanCurrentRecipe() {
  const recipe = state.selectedRecipeId ? getSelectedRecipe() : null;
  if (!recipe) {
    mealPlanCurrentRecipe.innerHTML = `
      <article class="planner-focus__card planner-focus__card--empty">
        <p class="section-kicker">TIP</p>
        <p class="planner-focus__meta">Open een recept en kom dan hier terug om het in te plannen.</p>
      </article>
    `;
    return;
  }
  mealPlanCurrentRecipe.innerHTML = `
    <article class="planner-focus__card">
      <p class="section-kicker">GESELECTEERD RECEPT</p>
      <h2 class="planner-focus__title">${escapeHtml(recipe.title)}</h2>
      <p class="planner-focus__meta">${escapeHtml(recipe.time)} • ${escapeHtml(recipe.servings)}</p>
      <p class="planner-focus__hint">Klik op "Plan hier" bij een dag hieronder om dit recept in te plannen.</p>
    </article>
  `;
}

function renderMealPlanGrid() {
  const days = [
    ["maandag", "Maandag"],
    ["dinsdag", "Dinsdag"],
    ["woensdag", "Woensdag"],
    ["donderdag", "Donderdag"],
    ["vrijdag", "Vrijdag"],
    ["zaterdag", "Zaterdag"],
    ["zondag", "Zondag"],
  ];

  mealPlanGrid.innerHTML = days
    .map(([dayKey, label]) => {
      const recipe = getRecipeById(state.mealPlan[dayKey]);
      return `
        <article class="planner-day">
          <div class="planner-day__head">
            <h3>${label}</h3>
            <button class="soft-action" type="button" data-plan-day="${dayKey}">Plan hier</button>
          </div>
          <p class="planner-day__recipe ${recipe ? "" : "planner-day__empty"}">
            ${recipe ? escapeHtml(recipe.title) : "Nog niets gepland"}
          </p>
          ${
            recipe
              ? `
                <div class="planner-day__actions">
                  <button class="soft-action" type="button" data-open-planned-recipe="${recipe.id}">Open recept</button>
                  <button class="soft-action" type="button" data-clear-plan-day="${dayKey}">Leegmaken</button>
                </div>
              `
              : ""
          }
        </article>
      `;
    })
    .join("");
}

function saveRecipeToCookbook(recipeId, cookbookId = state.selectedCookbookId, opts = {}) {
  // If the recipe is still a preview (not yet in the real collection),
  // promote it to a real recipe now that the user is saving it.
  const id = String(recipeId || "").trim();
  if (id && !state.recipes.some((r) => r.id === id) && state.importPreviews && state.importPreviews[id]) {
    state.recipes = [state.importPreviews[id], ...state.recipes];
    delete state.importPreviews[id];
  }

  const cookbook = getCookbookById(cookbookId);
  if (!cookbook) {
    return;
  }
  const wasNewToBook = Boolean(id && !cookbook.recipeIds.includes(id));
  state.selectedCookbookId = cookbook.id;
  if (id && !cookbook.recipeIds.includes(id)) {
    cookbook.recipeIds.unshift(id);
  }
  if (wasNewToBook) {
    trackClientEvent("client_cookbook_save", { cookbookIdSuffix: String(cookbookId).slice(-12) });
  }

  // Keep the home screen in sync immediately after saving:
  // "Mijn recepten" (slider + grid) is derived from saved imported recipes,
  // and the focus panel "Onlangs bekeken" is derived from localStorage recents.
  if (id) {
    state.featuredRecipeId = id;
    pushRecentRecipeId(id);
  }
  renderCookbookList();
  renderCookbookFilterBar();
  renderDetailRecipe(false);
  renderRecentImports();
  renderRecipeSlider();
  renderRecipeGrid();
  if (state.view === "home") {
    renderHomeFocusPanel();
  }
  schedulePersistAppState();
  renderCookbookSaveList(recipeId);
  if (!opts || !opts.silentToast) {
    showToast(`Opgeslagen in ${cookbook.name}.`);
  }
}

const FAVORITES_COOKBOOK_NAME = "❤️ Favorieten";
function ensureFavoritesCookbookExists({ persist = true } = {}) {
  let favorites = state.cookbooks.find((cb) => cb && cb.name === FAVORITES_COOKBOOK_NAME);
  if (!favorites) {
    favorites = {
      id: `cookbook-favorites-${Date.now()}`,
      name: FAVORITES_COOKBOOK_NAME,
      recipeIds: [],
    };
    state.cookbooks.unshift(favorites);
    if (!state.selectedCookbookId) {
      state.selectedCookbookId = favorites.id;
    }
    if (persist) schedulePersistAppState();
  }
  if (!state.selectedCookbookId || !state.cookbooks.some((cb) => cb.id === state.selectedCookbookId)) {
    state.selectedCookbookId = favorites.id;
  }
  return favorites;
}

function getOrCreateFavoritesBookmark() {
  return ensureFavoritesCookbookExists({ persist: true });
}

function isRecipeFavorited(recipeId) {
  const favoritesBookmark = state.cookbooks.find((cb) => cb.name === FAVORITES_COOKBOOK_NAME);
  return favoritesBookmark ? favoritesBookmark.recipeIds.includes(recipeId) : false;
}

function toggleRecipeFavorite(recipeId) {
  const favoritesBookmark = getOrCreateFavoritesBookmark();
  const index = favoritesBookmark.recipeIds.indexOf(recipeId);

  if (index !== -1) {
    // Remove from favorites
    favoritesBookmark.recipeIds.splice(index, 1);
    showToast("Verwijderd uit favorieten.");
  } else {
    // Add to favorites
    favoritesBookmark.recipeIds.unshift(recipeId);
    showToast("Toegevoegd aan favorieten!");
  }

  renderDetailRecipe(false);
  renderCookbookList();
  schedulePersistAppState();
}

function createCookbook(name) {
  const cleanName = String(name || "").trim();
  if (!cleanName) {
    showToast("Geef je kookboek eerst een naam.");
    return null;
  }
  const cookbook = {
    id: `cookbook-${Date.now()}`,
    name: cleanName,
    recipeIds: [],
  };
  state.cookbooks.unshift(cookbook);
  state.selectedCookbookId = cookbook.id;
  renderCookbookList();
  renderCookbookFilterBar();
  schedulePersistAppState();
  showToast(`${cookbook.name} aangemaakt.`);
  return cookbook;
}

let cookbookNameModalPurpose = "create"; // "create" or "rename"
let cookbookNameModalTargetId = null;
let cookbookOptionsTargetId = null;

function openCookbookNameModal(purpose = "create", existingName = "", cookbookId = null) {
  cookbookNameModalPurpose = purpose;
  cookbookNameModalTargetId = cookbookId;
  const modal = document.getElementById("cookbookNameModal");
  const titleEl = document.getElementById("cookbookNameModalTitle");
  const input = document.getElementById("cookbookNameInput");
  if (!modal || !titleEl || !input) return;
  titleEl.textContent = purpose === "rename" ? "Hernoem kookboek" : "Nieuw kookboek";
  input.value = existingName;
  renderCookbookNameSuggestions();
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => input.focus(), 80);
}

function closeCookbookNameModal() {
  const modal = document.getElementById("cookbookNameModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function openCreateCookbookPrompt() {
  openCookbookNameModal("create");
}

function renameCookbook(cookbookId, newName) {
  const cleanName = String(newName || "").trim();
  if (!cleanName) { showToast("Geef een naam op."); return; }
  const cookbook = getCookbookById(cookbookId);
  if (!cookbook) return;
  cookbook.name = cleanName;
  renderCookbookList();
  renderCookbookSaveList(state.pendingCookbookSaveRecipeId || "");
  schedulePersistAppState();
  showToast(`Hernoemd naar ${cleanName}.`);
}

function deleteCookbook(cookbookId) {
  if (state.cookbooks.length <= 1) { showToast("Je moet minimaal één kookboek hebben."); return; }
  const cookbook = getCookbookById(cookbookId);
  if (!cookbook) return;
  const name = cookbook.name;
  state.cookbooks = state.cookbooks.filter((cb) => cb.id !== cookbookId);
  if (state.selectedCookbookId === cookbookId) {
    state.selectedCookbookId = state.cookbooks[0]?.id || "";
  }
  renderCookbookList();
  renderCookbookFilterBar();
  renderAll();
  schedulePersistAppState();
  showToast(`${name} verwijderd.`);
}

function assignSelectedRecipeToDay(dayKey) {
  const recipe = getSelectedRecipe();
  state.mealPlan[dayKey] = recipe.id;
  renderMealPlanGrid();
  schedulePersistAppState();
  showToast(`${recipe.title} gepland op ${dayKey[0].toUpperCase()}${dayKey.slice(1)}.`);
}

function openShareCard(recipe) {
  const overlay = document.getElementById("shareCardOverlay");
  if (!overlay || !recipe) return;

  // Populate card
  const img = document.getElementById("shareCardImage");
  if (img) { img.src = recipe.image || ""; img.alt = recipe.alt || recipe.title; }
  const titleEl = document.getElementById("shareCardTitle");
  if (titleEl) titleEl.textContent = recipe.title || "";
  const tagEl = document.getElementById("shareCardTag");
  if (tagEl) tagEl.textContent = recipe.mealTag || "";
  const timeEl = document.getElementById("shareCardTime");
  if (timeEl) timeEl.textContent = recipe.time ? `⏱ ${recipe.time}` : "";
  const servEl = document.getElementById("shareCardServings");
  if (servEl) servEl.textContent = recipe.servings ? `👥 ${recipe.servings}` : "";
  const ingEl = document.getElementById("shareCardIngredients");
  if (ingEl) {
    const top = (recipe.ingredients || []).slice(0, 5);
    ingEl.innerHTML = top.map((i) => `<li>${escapeHtml(i.name)}</li>`).join("");
  }

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeShareCard() {
  const overlay = document.getElementById("shareCardOverlay");
  if (!overlay) return;
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

async function shareSelectedRecipe() {
  const recipe = getSelectedRecipe();
  openShareCard(recipe);
}

bindEvent(document.getElementById("shareCardClose"), "click", closeShareCard);

bindEvent(document.getElementById("shareCardNativeShare"), "click", async () => {
  const recipe = getSelectedRecipe();
  const url = recipe?.sourceUrl || window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title: recipe?.title || "Recept", url });
      return;
    } catch { /* cancelled */ }
  }
  try {
    await navigator.clipboard.writeText(url);
    showToast("Link gekopieerd.");
  } catch {
    showToast("Delen lukte niet in deze browser.");
  }
});

function addRecipeToGrocery(recipe) {
  if (!recipe) return;

  let added = 0;
  let merged = 0;

  const PANTRY_SKIP_KEYS = new Set([
    "olie",
    "olijfolie",
    "zonnebloemolie",
    "boter",
    "roomboter",
    "bloem",
    "suiker",
    "azijn",
    "sojasaus",
    "ketjap",
    "bouillon",
    "bouillonblokje",
    "bouillonblokjes",
  ]);

  const shouldSkipGroceryIngredient = (name) => {
    const key = normalizeIngredientKey(String(name || ""));
    if (!key) return true;
    // Skip items that are not useful to buy.
    if (key === "water" || key === "kraanwater") return true;
    // Common pantry/seasoning items that users typically don't want in the grocery list.
    // Keep this conservative to avoid hiding real ingredients.
    if (key === "zout" || key === "peper") return true;
    if (key === "zout peper" || key === "peper zout") return true;
    if (/^(zout|peper)\b/.test(key) && key.length <= 14) return true;
    if (/\bnaar smaak\b/.test(String(name || "").toLowerCase()) && /^(zout|peper)\b/.test(key)) return true;
    // Kitchen tools / non-food items (no bare "oven" — skip phrases like "kip uit de oven").
    const n = String(name || "");
    if (
      /\b(?:air\s*fryer|airfryer|bakpapier|bakplaat|bakvorm|braadpan|steelpan|cocotte|contactgrill|contact\s+grill|hapjespan|koekenpan|wok(?:pan)?|springvorm|muffinvorm|grillschaal|knoflookpers|knoflook\s*[~–-]?\s*pers|\bknoflook\s+pers\b|garlic\s+press|citruspers|citroenpers|tortilla\s*pers|(?:grill|grilles)\s*[~–-]?\s*pan(?:nen?)?|grillpan(?:nen?)?|\boven[\s~–-]+(?:schaal(?:en)?|bakplaat(?:en)?|vorm(?:en)?|schotel)\b|ovenschalen?|ovenschotel(?:en)?|overnschaal(?:en)?|ovenschaal(?:en)?|ovenvorm(?:en)?|raclett(?:e|edoos)|opvouwgrill|opvouwbaar|staafmixer|blendstick|handmixer|keukenmachine|kitchenaid|pureestok|fijnrasp|grofte\s*rasp|siliconen(?:e)?\s*bakmat|bakmat\b|vergiet|fine\s+mesh\b|kartelmes|schilmes)\b/i.test(
        n
      )
    ) {
      return true;
    }
    // Pantry basics: skip from auto-add, but show as suggestions instead.
    if (PANTRY_SKIP_KEYS.has(key)) return true;
    return false;
  };

  const isOptionalGroceryIngredient = (name) => {
    const raw = String(name || "").toLowerCase();
    return /\boptioneel\b/.test(raw) || /\(optioneel\)/i.test(name) || /\bnaar smaak\b/.test(raw);
  };

  const buildOptionalTitle = (name) => {
    const raw = String(name || "").trim();
    const base = raw
      .replace(/\(\s*optioneel\s*\)/gi, "")
      .replace(/\boptioneel\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!base) return raw;
    return `${base} (optioneel)`;
  };

  recipe.ingredients.forEach((ingredient) => {
    if (shouldSkipGroceryIngredient(ingredient.name)) {
      return;
    }
    const isOptional = isOptionalGroceryIngredient(ingredient.name);
    const nextAmount = formatIngredientAmount(ingredient, state.currentServings / parseBaseServings(recipe.servings));
    const mergeKey = groceryMergeKeyForList({
      title: isOptional ? buildOptionalTitle(ingredient.name) : ingredient.name,
    });
    const existingItem = state.groceryItems.find(
      (item) => !item.checked && groceryMergeKeyForList(item) === mergeKey
    );

    if (existingItem) {
      existingItem.amount = mergeAmountLabels(existingItem.amount, nextAmount);
      if (recipe.title && !String(existingItem.recipeTitle || "").includes(recipe.title)) {
        existingItem.recipeTitle = existingItem.recipeTitle
          ? `${existingItem.recipeTitle}, ${recipe.title}`
          : recipe.title;
      }
      merged += 1;
      return;
    }

    state.groceryItems.push({
      id: `${recipe.id}-${ingredient.name}-${Date.now()}-${added}`,
      title: isOptional ? buildOptionalTitle(ingredient.name) : ingredient.name,
      amount: nextAmount,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      recipeSourceUrl: recipe.sourceUrl || "",
      recipePlatform: recipe.platform || "website",
      group: getIngredientGroup(ingredient.name),
      checked: false,
    });
    added += 1;
  });

  renderGroceryGroups();
  schedulePersistAppState();
  if (added || merged) {
    trackClientEvent("client_grocery_add", { added: added || 0, merged: merged || 0 });
  }
  if (added && merged) {
    showToast(`${recipe.title} toegevoegd. ${merged} ingrediënten zijn samengevoegd.`);
    return;
  }
  if (added) {
    showToast(`${recipe.title} toegevoegd aan je boodschappenlijst.`);
    return;
  }
  if (merged) {
    showToast(`${recipe.title} is samengevoegd met je bestaande lijst.`);
    return;
  }
  showToast("Dit recept stond al op je lijst.");
}

function applyIngredientSwapToGroceryList({ recipeId, from, to } = {}) {
  const rId = String(recipeId || "").trim();
  const fromLabel = String(from || "").trim();
  const toLabel = String(to || "").trim();
  if (!rId || !fromLabel || !toLabel) return;

  const recipe = getRecipeById(rId) || getSelectedRecipe();
  const fromKey = normalizeIngredientKey(fromLabel);
  const toKey = normalizeIngredientKey(toLabel);
  if (!fromKey || !toKey) return;

  let changed = 0;
  for (const item of state.groceryItems) {
    if (item?.recipeId !== rId) continue;
    if (item.checked) continue;
    const itemKey = normalizeIngredientKey(item.title || "");
    if (itemKey !== fromKey) continue;
    item.title = toLabel;
    item.group = getIngredientGroup(toLabel);
    changed += 1;
  }

  if (!changed && recipe) {
    const sourceIngredient = recipe.ingredients.find((i) => normalizeIngredientKey(i?.name || "") === fromKey) || null;
    if (sourceIngredient) {
      const nextAmount = formatIngredientAmount(sourceIngredient, state.currentServings / parseBaseServings(recipe.servings));
      state.groceryItems.push({
        id: `${recipe.id}-swap-${toLabel}-${Date.now()}`,
        title: toLabel,
        amount: nextAmount,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        recipeSourceUrl: recipe.sourceUrl || "",
        recipePlatform: recipe.platform || "website",
        group: getIngredientGroup(toLabel),
        checked: false,
      });
      changed = 1;
    }
  }

  if (!changed) {
    showToast("Kon niets wisselen op je lijst.");
    return;
  }

  renderGroceryGroups();
  schedulePersistAppState();
  showToast("Wissel toegepast op je boodschappenlijst.");
}

function addCustomGroceryItem() {
  const title = window.prompt("Welk item wil je toevoegen?");
  if (title === null) {
    return;
  }

  const cleanTitle = title.trim();
  if (!cleanTitle) {
    showToast("Vul eerst een naam in.");
    return;
  }

  const amount = window.prompt("Hoeveel heb je nodig?", "1 stuk");
  if (amount === null) {
    return;
  }

  const cleanAmount = amount.trim() || "1 stuk";
  const existingItem = state.groceryItems.find(
    (item) => !item.checked && normalizeIngredientKey(item.title) === normalizeIngredientKey(cleanTitle)
  );

  if (existingItem) {
    existingItem.amount = mergeAmountLabels(existingItem.amount, cleanAmount);
  } else {
    state.groceryItems.unshift({
      id: `grocery-custom-${Date.now()}`,
      title: cleanTitle,
      amount: cleanAmount,
      recipeId: "",
      recipeTitle: "",
      recipeSourceUrl: "",
      recipePlatform: "website",
      group: getIngredientGroup(cleanTitle),
      checked: false,
    });
  }
  renderGroceryGroups();
  schedulePersistAppState();
  showToast(existingItem ? `${cleanTitle} samengevoegd op je lijst.` : `${cleanTitle} toegevoegd.`);
}

function getUncheckedIngredientNames() {
  const source = state.groceryItems.filter((item) => !item.checked);
  return (source.length ? source : state.groceryItems).map((item) => item.title);
}

function getActiveGroceryItems() {
  const uncheckedItems = state.groceryItems.filter((item) => !item.checked);
  return uncheckedItems.length ? uncheckedItems : state.groceryItems;
}

function getSingleRecipeContext(items) {
  const contexts = new Map();

  items.forEach((item) => {
    if (!item.recipeSourceUrl) {
      return;
    }
    contexts.set(item.recipeSourceUrl, {
      recipeId: item.recipeId || "",
      recipeTitle: item.recipeTitle || "",
      sourceUrl: item.recipeSourceUrl,
      platform: item.recipePlatform || "website",
    });
  });

  return contexts.size === 1 ? [...contexts.values()][0] : null;
}

function getGroceryText() {
  const lines = state.groceryItems
    .filter((item) => !item.checked)
    .map((item) => `- ${item.title} (${item.amount})`);
  return lines.join("\n");
}

function getBasketClipboardText(preview) {
  return preview.items
    .map((item) => {
      const choice = item.choices?.[item.selectedChoiceIndex || 0];
      const label = choice?.title || item.ingredientTitle;
      return `- ${label}${item.ingredientAmount ? ` (${item.ingredientAmount})` : ""}`;
    })
    .join("\n");
}

function setStoreButtonLoading(button, isLoading) {
  if (!button) {
    return;
  }
  button.disabled = isLoading;
  button.setAttribute("aria-busy", String(isLoading));
}

async function openStoreBasket(storeSlug = "albert-heijn") {
  const activeItems = getActiveGroceryItems();
  if (!activeItems.length) {
    showToast("Voeg eerst ingrediënten toe aan je lijst.");
    return;
  }

  const storeConfig = getStoreConfig(storeSlug);
  const storeName = storeConfig.label;
  const button = orderAHButton;
  if (!button) {
    showToast(`De knop voor ${storeName} ontbreekt nog.`);
    return;
  }
  const destLabel = button.querySelector(".store-cta__dest");

  // Loading state
  button.disabled = true;
  const originalLabel = destLabel ? destLabel.textContent : "";
  if (destLabel) {
    destLabel.textContent = storeConfig.loadingLabel;
  }

  try {
    const payload = await fetchJson(`${state.apiBase}/api/store-basket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        store: storeSlug,
        sourceUrl: getSingleRecipeContext(activeItems)?.sourceUrl || "",
        recipeTitle: getSingleRecipeContext(activeItems)?.recipeTitle || "Boodschappenlijst",
        items: activeItems.map((item) => ({
          title: item.title,
          amount: item.amount,
          recipeTitle: item.recipeTitle,
        })),
      }),
    });

    if (!payload?.items?.length) {
      throw new Error("Geen producten gevonden");
    }

    state.basketPreview = {
      ...payload,
      store: storeSlug,
      storeLabel: storeName,
    };
    openBasketModal(state.basketPreview);
    trackClientEvent("client_ah_basket_open", {
      store: storeSlug,
      itemCount: activeItems.length,
    });
    showToast(`Selectie klaar voor ${storeName}.`);

    // Optional push trigger (per-user) when basket is ready.
    try {
      const prefs = sanitizePushPrefsClient(state.push.prefs || getDefaultPushPrefs());
      const hasBonus = Boolean(payload?.meta?.appliedBonuses?.length);
      if (prefs.categories.ah && prefs.triggers.ahBasketReady) {
        fetchJson(`${state.apiBase}/api/push/trigger`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "ah_basket_ready", url: "/?new=1", hasBonus }),
        }).catch(() => {});
      }
      if (prefs.categories.ah && prefs.triggers.ahBonus && hasBonus) {
        const dayKey = new Date().toISOString().slice(0, 10);
        const seenKey = `plately-bonus-notified-${dayKey}`;
        const already = (() => {
          try { return localStorage.getItem(seenKey) === "1"; } catch { return false; }
        })();
        if (!already) {
          try { localStorage.setItem(seenKey, "1"); } catch {}
          fetchJson(`${state.apiBase}/api/push/trigger`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "ah_bonus", url: "/?new=1", hasBonus: true }),
          }).catch(() => {});
        }
      }
    } catch {
      // ignore
    }
  } catch {
    showToast(`Kon ${storeName} niet voorbereiden.`);
  } finally {
    button.disabled = false;
    if (destLabel) {
      destLabel.textContent = originalLabel;
    }
  }
}

let basketRefetchDebounceTimer = null;

function scheduleRefetchBasketWithPreferences() {
  if (basketRefetchDebounceTimer) {
    clearTimeout(basketRefetchDebounceTimer);
  }
  basketRefetchDebounceTimer = setTimeout(() => {
    basketRefetchDebounceTimer = null;
    refetchBasketWithPreferences({
      bio: state.basketFilter.bio,
      beterLeven1: state.basketFilter.beterLeven1,
      vegetarisch: state.basketFilter.vegetarisch,
      vegan: state.basketFilter.vegan,
      plantaardig: state.basketFilter.plantaardig,
    });
  }, 450);
}

async function refetchBasketWithPreferences(preferences) {
  const preview = state.basketPreview;
  if (!preview || preview.store !== "albert-heijn") {
    renderBasketPreview();
    return;
  }

  // Show loading indicator in the list
  const listEl = document.getElementById("basketSheetList");
  if (listEl) {
    listEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap: 10px;">
        ${Array.from({ length: 5 }).map(() => `
          <div class="basket-product" aria-hidden="true">
            <div class="skeleton" style="width:72px;height:72px;border-radius:12px;flex:0 0 auto;"></div>
            <div style="flex:1; min-width:0; display:grid; gap: 8px;">
              <div class="skeleton" style="height: 12px; width: 70%;"></div>
              <div class="skeleton" style="height: 10px; width: 45%; opacity: .9;"></div>
              <div class="skeleton" style="height: 10px; width: 35%; opacity: .85;"></div>
            </div>
            <div style="display:grid; gap: 8px; justify-items:end;">
              <div class="skeleton skeleton--rounded" style="height: 36px; width: 36px;"></div>
              <div class="skeleton" style="height: 34px; width: 86px; border-radius: 12px;"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  try {
    const activeItems = getActiveGroceryItems();
    const payload = await fetchJson(`${state.apiBase}/api/store-basket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        store: "albert-heijn",
        sourceUrl: preview.sourceUrl || getSingleRecipeContext(activeItems)?.sourceUrl || "",
        recipeTitle: preview.recipeTitle || getSingleRecipeContext(activeItems)?.recipeTitle || "Boodschappenlijst",
        bio: Boolean(preferences?.bio),
        beterLeven1: Boolean(preferences?.beterLeven1),
        vegetarisch: Boolean(preferences?.vegetarisch),
        vegan: Boolean(preferences?.vegan),
        plantaardig: Boolean(preferences?.plantaardig),
        items: activeItems.map((item) => ({
          title: item.title,
          amount: item.amount,
          recipeTitle: item.recipeTitle,
        })),
      }),
    });

    if (payload?.items?.length) {
      const prevItems = Array.isArray(state.basketPreview?.items) ? state.basketPreview.items : [];
      const keyOf = (s) => normalizeBasketToken(s || "");
      const prevByKey = new Map(prevItems.map((it) => [keyOf(it?.ingredientTitle), it]));
      const mergedItems = payload.items.map((it) => {
        const prev = prevByKey.get(keyOf(it?.ingredientTitle));
        if (!prev) return it;
        return {
          ...it,
          qty: prev.qty,
          selectedChoiceIndex: prev.selectedChoiceIndex || 0,
        };
      });

      state.basketPreview = {
        ...state.basketPreview,
        items: mergedItems,
      };
    }
  } catch {
    // Keep existing items on failure — renderBasketPreview will show them
  }

  renderBasketPreview();
}

async function copyGroceryList() {
  const text = getGroceryText();
  if (!text) {
    showToast("Geen items om te kopiëren.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast("Boodschappenlijst gekopieerd.");
  } catch {
    showToast("Kopiëren lukte niet in deze browser.");
  }
}

function normalizeDescription(value, title) {
  const clean = String(value || "").trim();
  if (!clean) {
    return "";
  }

  const normalizedClean = clean.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const normalizedTitle = String(title || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

  if (!normalizedClean || normalizedClean === normalizedTitle) {
    return "";
  }

  if (/#[\p{L}\p{N}_-]+/u.test(clean) || /follow|link in bio|original sound|creator/i.test(clean)) {
    return "";
  }

  return clean;
}

function normalizeImportedTitle(value) {
  const clean = String(value || "")
    .replace(/\s+/g, " ")
    .trim();

  // Some importers occasionally return placeholders like "-" or "—".
  const looksLikePlaceholder = !clean || /^[\s\-–—•·_|]+$/.test(clean);
  if (looksLikePlaceholder) {
    return "Geïmporteerd recept";
  }

  if (clean.length <= 44) {
    return clean;
  }

  const words = clean.split(" ").filter(Boolean);
  return words.slice(0, 7).join(" ");
}

function normalizeImportedTime(value) {
  const clean = String(value || "").trim();
  if (!clean) return "30 min";
  // Fix common glitch where extra digits get appended (e.g. "45 min45").
  const minMatch = clean.match(/(\d+)\s*(?:min|mins|minute|minutes|minuten)\b/i);
  if (minMatch) return `${minMatch[1]} min`;
  const digitMatch = clean.match(/\b(\d{1,3})\b/);
  if (digitMatch) return `${digitMatch[1]} min`;
  return clean;
}

function parseServingsValue(value) {
  const match = String(value || "").match(/\d+/);
  return match ? `${match[0]} Pers.` : "2 Pers.";
}

function normalizeImportedRecipe(recipe) {
  const recipeId = recipe.id || `recipe-${Date.now()}`;
  const platform = recipe.platform || inferPlatformFromUrl(recipe.sourceUrl || "") || state.selectedPlatform;
  const parsedIngredients = recipe.ingredients?.length
    ? recipe.ingredients.map((ingredient) =>
        typeof ingredient === "string" ? parseIngredientInput(ingredient) : ingredient
      )
    : [{ quantity: "1", unit: "x", name: "Controleer originele bron" }];
  const cleanTitle = normalizeImportedTitle(recipe.title || "Geïmporteerd recept");
  const servings = parseServingsValue(recipe.servings || recipe.yield || "2");
  const description = normalizeDescription(recipe.description || recipe.caption || "", cleanTitle);
  const instructions = recipe.instructions?.length
    ? recipe.instructions
    : ["Controleer de bron en vul de bereidingsstappen waar nodig aan."];
  const mealTag = toDutchMealTag(
    recipe.mealTag || (recipe.time && Number.parseInt(recipe.time, 10) <= 15 ? "Tussendoor" : "Avond")
  );

  return {
    id: recipeId,
    title: cleanTitle,
    description,
    time: normalizeImportedTime(recipe.time),
    kcal: recipe.kcal || `${Math.max(280, parsedIngredients.length * 85)} kcal`,
    servings,
    mealTag,
    sourceUrl: recipe.sourceUrl || "#",
    image: recipe.image || "assets/hero-burger.svg",
    alt: cleanTitle,
    platform,
    caption: recipe.caption || "",
    author: recipe.author || "Onbekende maker",
    ingredients: parsedIngredients,
    instructions,
    isSeed: false,
  };
}

function getImportedRecipesForPersistence() {
  const savedIds = new Set(state.cookbooks.flatMap((cookbook) => cookbook.recipeIds));
  return state.recipes
    .filter((recipe) => !SEED_RECIPE_IDS.has(recipe.id) && !recipe.isSeed)
    .filter((recipe) => savedIds.has(recipe.id))
    .map((recipe) => ({ ...recipe, isSeed: false }));
}

function buildPersistedAppState() {
  return {
    profile: { ...state.profile },
    importedRecipes: getImportedRecipesForPersistence(),
    cookbooks: state.cookbooks.map((cookbook) => ({
      ...cookbook,
      recipeIds: [...cookbook.recipeIds],
    })),
    selectedCookbookId: state.selectedCookbookId,
    mealPlan: { ...state.mealPlan },
    groceryItems: state.groceryItems.map((item) => ({ ...item })),
    recipeProgress: Object.fromEntries(
      Object.entries(state.recipeProgress).map(([recipeId, progress]) => [
        recipeId,
        {
          checkedIngredients: [...(progress.checkedIngredients || [])],
          checkedSteps: [...(progress.checkedSteps || [])],
          currentStep: Number.isFinite(progress.currentStep) ? progress.currentStep : 0,
          cookMode: Boolean(progress.cookMode),
        },
      ])
    ),
    featuredRecipeId: state.featuredRecipeId,
    selectedRecipeId: state.selectedRecipeId,
    followedChannelIds: [...state.followedChannelIds],
    customChannels: state.customChannels
      .filter((ch) => !ch.managedByAdmin)
      .map((ch) => ({ ...ch })),
    language: state.language || "nl",
    currentView: state.view || "home",
  };
}

function applyPersistedAppState(user) {
  // If user is null/undefined, clear all user-specific state (logout case)
  if (!user || typeof user !== "object") {
    state.recipes = [];
    state.cookbooks = [];
    state.groceryItems = [];
    state.recipeProgress = {};
    state.mealPlan = {
      maandag: null,
      dinsdag: null,
      woensdag: null,
      donderdag: null,
      vrijdag: null,
      zaterdag: null,
      zondag: null,
    };
    state.selectedCookbookId = "";
    state.selectedRecipeId = "";
    state.featuredRecipeId = "";
    state.session.userId = "";
    state.profile = {
      name: "",
      handle: "",
      email: "",
      photo: "",
      favoriteSupermarket: "ah",
      onboardingSeenAt: null,
    };
    return;
  }

  state.session.userId = user.id || "";
  state.auth.authenticated = Boolean(user.authenticated);
  state.auth.email = user.email || "";

  if (user.profile && typeof user.profile === "object") {
    const onboardingSeenAt =
      user.profile.onboardingSeenAt ??
      user.profile.onboarding_seen_at ??
      user.onboardingSeenAt ??
      user.onboardingSeenAtIso ??
      null;
    state.profile = {
      name: user.profile.name || "",
      handle: user.profile.handle || "",
      email: user.profile.email || "",
      photo: typeof user.profile.photo === "string" ? user.profile.photo : "",
      favoriteSupermarket: user.profile.favoriteSupermarket || "ah",
      onboardingSeenAt: onboardingSeenAt || null,
    };
  } else {
    // Defensive: never keep a previous user's photo around.
    state.profile.photo = "";
  }
  if (typeof user.language === "string" && user.language) {
    state.language = user.language;
  }

  if (user.channelEnabled && typeof user.channelEnabled === "object") {
    const seed = user.channelEnabled.seed && typeof user.channelEnabled.seed === "object" ? user.channelEnabled.seed : {};
    const custom = user.channelEnabled.custom && typeof user.channelEnabled.custom === "object" ? user.channelEnabled.custom : {};
    state.channelEnabled = { seed: { ...seed }, custom: { ...custom } };
  }

  const importedRecipes = Array.isArray(user.importedRecipes)
    ? user.importedRecipes.map((recipe) => normalizeImportedRecipe({ ...recipe, platform: recipe.platform || "website" }))
    : [];
  // Only store imported recipes in state; seed recipes shown dynamically during rendering
  state.recipes = [...importedRecipes];

  if (Array.isArray(user.cookbooks)) {
    state.cookbooks = user.cookbooks.map((cookbook) => ({
      id: cookbook.id,
      name: cookbook.name,
      recipeIds: Array.isArray(cookbook.recipeIds) ? cookbook.recipeIds.filter(Boolean) : [],
    }));
  }

  if (typeof user.selectedCookbookId === "string" && user.selectedCookbookId) {
    state.selectedCookbookId = user.selectedCookbookId;
  }

  // Always ensure favorites + a valid last-used cookbook exist (migration-safe).
  ensureFavoritesCookbookExists({ persist: false });

  if (user.mealPlan && typeof user.mealPlan === "object") {
    state.mealPlan = {
      ...state.mealPlan,
      ...user.mealPlan,
    };
  }

  state.groceryItems = Array.isArray(user.groceryItems) ? user.groceryItems.map((item) => ({ ...item })) : [];
  state.recipeProgress = normalizeRecipeProgressState(user.recipeProgress);

  if (typeof user.featuredRecipeId === "string" && getRecipeById(user.featuredRecipeId)) {
    state.featuredRecipeId = user.featuredRecipeId;
  }

  if (typeof user.selectedRecipeId === "string" && getRecipeById(user.selectedRecipeId)) {
    state.selectedRecipeId = user.selectedRecipeId;
  }

  if (Array.isArray(user.customChannels)) {
    const seenCustomChannels = new Set();
    state.customChannels = user.customChannels
      .filter((ch) => ch && typeof ch.id === "string" && typeof ch.name === "string" && typeof ch.url === "string")
      .filter((ch) => {
        if (seenCustomChannels.has(ch.id)) return false;
        seenCustomChannels.add(ch.id);
        return true;
      })
      .map((ch) => ({ ...ch }));
  }

  if (Array.isArray(user.followedChannelIds) && user.followedChannelIds.length) {
    state.followedChannelIds = user.followedChannelIds.filter((id) => {
      const isSeed = SEED_CHANNELS.some((ch) => ch.id === id);
      const isCustom = state.customChannels.some((ch) => ch.id === id);
      if (!isSeed && !isCustom) return false;
      // Admin-uitgeschakelde kanalen mogen niet meer in de followed-lijst blijven hangen.
      if (isSeed && !isSeedChannelEnabled(id)) return false;
      if (isCustom && !isCustomChannelEnabled(id)) return false;
      return true;
    });
  }

  // Restore the view the user was on
  if (typeof user.currentView === "string" && ["home", "detail", "cookbook", "grocery", "profile", "import"].includes(user.currentView)) {
    state.view = user.currentView;
  }
}

function persistGroceryItemsLocally() {
  try {
    localStorage.setItem("plately-grocery-items", JSON.stringify(state.groceryItems));
    localStorage.setItem("plately-grocery-ts", String(Date.now()));
  } catch {}
}

function renderRecipeSlider() {
  const slider = document.getElementById("recipeSlider");
  if (!slider) return;
  const imported = getSavedImportedRecipes();
  // If user has imports use those, otherwise fall back to showcase seeds
  const seeds = COOKBOOK_SHOWCASE_IDS.map((id) => getRecipeById(id)).filter(Boolean);
  const allRecipes = imported.length ? imported : seeds;
  const recipes = allRecipes.slice(0, 8);
  const hasMore = allRecipes.length > 8;

  // Show/hide "Bekijk alles" button depending on overflow
  const viewAllBtn = document.getElementById("viewAllMyRecipesBtn");
  if (viewAllBtn) viewAllBtn.style.display = hasMore ? "" : "none";

  if (!recipes.length) {
    slider.innerHTML = `<p class="recipe-slider__empty">Importeer je eerste recept via de link hierboven.</p>`;
    return;
  }
  slider.innerHTML = recipes.map((recipe) => `
    <button class="recipe-slider__card" type="button" data-recipe-id="${recipe.id}">
      <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.title)}" loading="lazy" />
      <div class="recipe-slider__body">
        <p class="recipe-slider__title">${escapeHtml(recipe.title)}</p>
        ${recipe.time ? `<p class="recipe-slider__time">⏱ ${escapeHtml(recipe.time)}</p>` : ""}
      </div>
    </button>
  `).join("");
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────
const ADMIN_EMAIL = "pradix@me.com";
const ADMIN_TABS_STORAGE_KEY = "plately-admin-last-tab";
let inAppAdminTabsInitialized = false;

function isAdmin() {
  return state.auth.authenticated && state.auth.email === ADMIN_EMAIL;
}

function setInAppAdminTab(tabId, { persist = true } = {}) {
  const sections = Array.from(document.querySelectorAll("#adminScreen .admin-tab-section"));
  const btns = Array.from(document.querySelectorAll("#inAppAdminTabsRail [data-admin-tab]"));
  if (!sections.length || !btns.length) return;

  const id = String(tabId || "").trim();
  const exists = sections.some((s) => String(s.getAttribute("data-tab") || "") === id);
  const next = exists ? id : "overview";

  sections.forEach((s) => {
    const sId = String(s.getAttribute("data-tab") || "");
    s.classList.toggle("is-active", sId === next);
  });
  btns.forEach((b) => {
    const bId = String(b.getAttribute("data-admin-tab") || "");
    b.setAttribute("aria-selected", bId === next ? "true" : "false");
  });

  if (persist) {
    try { localStorage.setItem(ADMIN_TABS_STORAGE_KEY, next); } catch {}
  }

  // Scroll the admin screen content to top.
  const scrollWrap = document.querySelector("#adminScreen section[style*='overflow-y']");
  if (scrollWrap && typeof scrollWrap.scrollTo === "function") {
    scrollWrap.scrollTo({ top: 0, left: 0, behavior: "auto" });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
}

function initInAppAdminTabs() {
  if (inAppAdminTabsInitialized) return;
  const rail = document.getElementById("inAppAdminTabsRail");
  if (!rail) return;

  rail.addEventListener("click", (e) => {
    const btn = e.target?.closest?.("[data-admin-tab]");
    if (!btn) return;
    e.preventDefault();
    setInAppAdminTab(btn.getAttribute("data-admin-tab") || "");
  });

  inAppAdminTabsInitialized = true;
}

async function fetchAdminStats() {
  try {
    const payload = await fetchJson(`${state.apiBase}/api/admin/stats`);
    return payload?.stats || { users: [], totalUsers: 0, totalRecipes: 0, customChannels: { total: 0, approved: 0, pending: 0, rejected: 0 } };
  } catch (err) {
    console.error("Failed to fetch admin stats:", err);
    return { users: [], totalUsers: 0, totalRecipes: 0, customChannels: { total: 0, approved: 0, pending: 0, rejected: 0 } };
  }
}

async function fetchAdminSearchTerms() {
  try {
    const payload = await fetchJson(`${state.apiBase}/api/admin/search-terms?limit=20`);
    return payload?.searchTerms || { last7d: [], allTime: [] };
  } catch (err) {
    console.error("Failed to fetch admin search terms:", err);
    return { last7d: [], allTime: [] };
  }
}

async function fetchAdminPendingChannels() {
  try {
    const payload = await fetchJson(`${state.apiBase}/api/admin/pending-channels`);
    return {
      pending: Array.isArray(payload?.channels) ? payload.channels : [],
      rejected: Array.isArray(payload?.rejectedChannels) ? payload.rejectedChannels : [],
    };
  } catch (err) {
    console.error("Failed to fetch admin pending channels:", err);
    return { pending: [], rejected: [] };
  }
}

async function fetchAdminChannelCatalog() {
  try {
    const payload = await fetchJson(`${state.apiBase}/api/admin/channels`);
    return {
      seed: Array.isArray(payload?.seedChannels) ? payload.seedChannels : [],
      custom: payload?.customChannels && typeof payload.customChannels === "object"
        ? payload.customChannels
        : { approved: [], pending: [], rejected: [] },
    };
  } catch (err) {
    console.error("Failed to fetch admin channels catalog:", err);
    return { seed: [], custom: { approved: [], pending: [], rejected: [] } };
  }
}

async function setAdminChannelStatus(channelId, status, reason = "") {
  await fetchJson(`${state.apiBase}/api/admin/approve-channel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ channelId, status, reason }),
  });
}

function renderAdminChannelsModeration({ pending, rejected }) {
  const statusEl = document.getElementById("adminChannelsStatus");
  const pendingEl = document.getElementById("adminPendingChannels");
  const rejectedEl = document.getElementById("adminRejectedChannels");
  if (!pendingEl || !rejectedEl) return;

  if (statusEl) {
    const p = Array.isArray(pending) ? pending.length : 0;
    const r = Array.isArray(rejected) ? rejected.length : 0;
    statusEl.textContent = `Pending: ${p}${r ? ` · Afgewezen: ${r}` : ""}`;
  }

  if (!pending?.length) {
    pendingEl.innerHTML = `<p style="color:#989188;font-size:0.9rem;margin:0">Geen wachtende kanalen.</p>`;
  } else {
    pendingEl.innerHTML = `
      <div style="display:grid;gap:8px">
        ${pending.map((ch) => {
          const id = escapeHtml(ch?.id || "");
          const name = escapeHtml(ch?.name || "");
          const url = escapeHtml(ch?.url || "");
          const by = escapeHtml(ch?.createdByEmail || "Onbekend");
          return `
            <div style="display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid #f3f5ef;border-radius:12px;background:#fff">
              <div style="flex:1;min-width:0">
                <div style="font-weight:650;color:#3d3d3b">${name || id}</div>
                <div style="font-size:0.85rem;color:#989188;margin-top:4px;word-break:break-all">
                  <a href="${url}" target="_blank" rel="noopener" style="color:#6b6258;text-decoration:underline">${url}</a>
                </div>
                <div style="font-size:0.8rem;color:#b9ada0;margin-top:4px">Indiener: ${by}</div>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">
                <button class="secondary-button" type="button" data-admin-approve-channel="${id}" style="white-space:nowrap">Goedkeuren</button>
                <button class="secondary-button" type="button" data-admin-reject-channel="${id}" style="white-space:nowrap;border-color:rgba(220,53,69,0.25);color:rgba(140,23,35,0.95)">Afwijzen</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  if (!rejected?.length) {
    rejectedEl.innerHTML = "";
  } else {
    rejectedEl.innerHTML = `
      <div style="margin-top:4px;color:#989188;font-size:0.85rem;font-weight:700;letter-spacing:0.06em">AFGEWEZEN</div>
      <div style="display:grid;gap:8px;margin-top:10px">
        ${rejected.map((ch) => {
          const name = escapeHtml(ch?.name || ch?.id || "");
          const url = escapeHtml(ch?.url || "");
          const reason = escapeHtml(ch?.rejectedReason || "—");
          const rejectedAt = ch?.rejectedAt ? new Date(ch.rejectedAt).toLocaleString("nl-NL") : "—";
          return `
            <div style="display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid #f3f5ef;border-radius:12px;background:#fff">
              <div style="flex:1;min-width:0">
                <div style="font-weight:650;color:#3d3d3b">${name} <span style="margin-left:6px;padding:2px 8px;border-radius:999px;background:rgba(220,53,69,0.10);border:1px solid rgba(220,53,69,0.16);color:rgba(140,23,35,0.95);font-size:0.72rem">AFGEWEZEN</span></div>
                <div style="font-size:0.85rem;color:#989188;margin-top:4px;word-break:break-all">
                  <a href="${url}" target="_blank" rel="noopener" style="color:#6b6258;text-decoration:underline">${url}</a>
                </div>
                <div style="font-size:0.8rem;color:#b9ada0;margin-top:4px">Reden: ${reason}</div>
                <div style="font-size:0.8rem;color:#b9ada0;margin-top:2px">Afgewezen: ${escapeHtml(rejectedAt)}</div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }
}

function setAdminChannelTestError(message) {
  const el = document.getElementById("adminChannelTestError");
  if (!el) return;
  if (!message) {
    el.style.display = "none";
    el.textContent = "";
    return;
  }
  el.style.display = "block";
  el.textContent = "❌ " + message;
}

function getAdminSelectedChannel() {
  const sel = document.getElementById("adminChannelTestSelect");
  const raw = (sel?.value || "").trim();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function renderAdminChannelTestResults(results, backendNote = "") {
  const wrap = document.getElementById("adminChannelTestResults");
  if (!wrap) return;
  const list = Array.isArray(results) ? results : [];
  const note = String(backendNote || "").trim();
  if (!list.length) {
    const tip = note
      ? `<div style="margin-bottom:10px;line-height:1.45;color:#5c534c;font-size:0.9rem">${escapeHtml(note)}</div>`
      : "";
    wrap.innerHTML = `<div>${tip}<div style="color:#989188;font-size:0.9rem">Geen recepten gevonden voor deze zoekterm.</div></div>`;
    return;
  }
  wrap.innerHTML = list.slice(0, 10).map((r) => {
    const title = escapeHtml(r?.title || "—");
    const url = escapeHtml(r?.url || "");
    const src = escapeHtml(r?.channelName || r?.channelId || "");
    const thumb = escapeHtml(r?.imageUrl || r?.thumbnail || r?.image || "");
    const thumbHtml = thumb
      ? `<img src="${thumb}" alt="" loading="lazy" style="width:44px;height:44px;border-radius:10px;object-fit:cover;flex:0 0 auto;background:#f3f5ef" />`
      : `<div aria-hidden="true" style="width:44px;height:44px;border-radius:10px;background:#f3f5ef;flex:0 0 auto"></div>`;
    return `
      <div style="display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid #f3f5ef;border-radius:12px;background:#fff">
        ${thumbHtml}
        <div style="flex:1;min-width:0">
          <div style="font-weight:650;color:#3d3d3b">${title}</div>
          <div style="font-size:0.85rem;color:#989188;margin-top:4px;word-break:break-all">${src} · <a href="${url}" target="_blank" rel="noopener" style="color:#6b6258;text-decoration:underline">${url}</a></div>
        </div>
        <button class="secondary-button" type="button" data-admin-channel-test-import="${url}" style="white-space:nowrap">Import</button>
      </div>
    `;
  }).join("");
}

function getAdminNewChannelDraft() {
  const name = String(document.getElementById("adminNewChannelName")?.value || "").trim();
  const url = String(document.getElementById("adminNewChannelUrl")?.value || "").trim();
  const query = String(document.getElementById("adminNewChannelQuery")?.value || "").trim();
  return { name, url, query };
}

function setAdminNewChannelStatus(message) {
  const el = document.getElementById("adminNewChannelStatus");
  if (el) el.textContent = String(message || "");
}

function renderAdminNewChannelResults(results, backendNote = "") {
  const wrap = document.getElementById("adminNewChannelResults");
  if (!wrap) return;
  const list = Array.isArray(results) ? results : [];
  const note = String(backendNote || "").trim();
  if (!list.length) {
    wrap.innerHTML = note
      ? `<div style="line-height:1.45;color:#5c534c;font-size:0.9rem">${escapeHtml(note)}</div>`
      : "";
    return;
  }
  const hosts = new Set(list.map((r) => getSourceHost(r?.url || "")).filter(Boolean));
  const quality = list.length >= 3 ? "Sterk" : list.length >= 1 ? "Oké" : "Zwak";
  const summary = `
    <div class="admin-channel-preview">
      <span class="admin-channel-preview__favicon" aria-hidden="true">
        ${hosts.size ? `<img src="${escapeHtml(getSourceIconUrl(`https://${[...hosts][0]}`))}" alt="" loading="lazy" />` : ""}
      </span>
      <div>
        <strong>${list.length} recepten gevonden</strong>
        <p>${escapeHtml([...hosts][0] || "Nieuw kanaal")} · importkwaliteit: ${quality}</p>
      </div>
    </div>
  `;
  wrap.innerHTML = list.slice(0, 5).map((r) => {
    const title = escapeHtml(r?.title || "—");
    const url = escapeHtml(r?.url || "");
    return `
      <div style="display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid #f3f5ef;border-radius:12px;background:#fff">
        <div style="flex:1;min-width:0">
          <div style="font-weight:650;color:#3d3d3b">${title}</div>
          <div style="font-size:0.85rem;color:#989188;margin-top:4px;word-break:break-all">
            <a href="${url}" target="_blank" rel="noopener" style="color:#6b6258;text-decoration:underline">${url}</a>
          </div>
        </div>
      </div>
    `;
  }).join("");
  wrap.innerHTML = summary + wrap.innerHTML;
}

async function runAdminNewChannelTest() {
  setAdminChannelTestError("");
  const { name, url, query } = getAdminNewChannelDraft();
  if (!name || !url) {
    setAdminChannelTestError("Vul eerst naam en URL in.");
    return;
  }
  if (!query || query.length < 2) {
    setAdminChannelTestError("Vul een test zoekterm in (min 2 tekens).");
    return;
  }
  setAdminNewChannelStatus("Kanaal testen…");
  renderAdminNewChannelResults([]);
  try {
    const id = `ch-preview-${Date.now()}`;
    const res = await fetchJson(`${state.apiBase}/api/admin/channel-test/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channelKind: "custom",
        customChannel: { id, name, url },
        query,
        limit: 5,
      }),
    });
    const results = Array.isArray(res?.results) ? res.results : [];
    const note = String(res?.searchBackendNote || "").trim();
    const ms = Number(res?.responseTimeMs);
    const timing = Number.isFinite(ms) ? ` (${ms} ms)` : "";
    setAdminNewChannelStatus(
      (results.length ? `✅ Test werkt: ${results.length} resultaten` : "Geen resultaten gevonden bij deze test.") + timing
    );
    renderAdminNewChannelResults(results, note);
    return results;
  } catch (err) {
    setAdminNewChannelStatus("");
    setAdminChannelTestError(err.message);
    return [];
  }
}

async function addAdminGlobalChannel() {
  setAdminChannelTestError("");
  const { name, url } = getAdminNewChannelDraft();
  if (!name || !url) {
    setAdminChannelTestError("Vul eerst naam en URL in.");
    return;
  }
  const addBtn = document.getElementById("adminNewChannelAddBtn");
  if (addBtn) addBtn.disabled = true;
  setAdminNewChannelStatus("Toevoegen aan Plately…");
  try {
    const res = await fetchJson(`${state.apiBase}/api/admin/global-channel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, url }),
    });
    const channel = res?.channel || {};
    setAdminNewChannelStatus(`✅ ${channel.name || name} toegevoegd aan Plately`);
    ["adminNewChannelName", "adminNewChannelUrl", "adminNewChannelQuery"].forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.value = "";
    });
    renderAdminNewChannelResults([]);
    showToast("Kanaal toegevoegd aan Plately");
    await renderAdminScreen();
  } catch (err) {
    setAdminNewChannelStatus("");
    setAdminChannelTestError(err.message);
  } finally {
    if (addBtn) addBtn.disabled = false;
  }
}

async function runAdminChannelTestSearch() {
  setAdminChannelTestError("");
  const channel = getAdminSelectedChannel();
  const query = String(document.getElementById("adminChannelTestQuery")?.value || "").trim();
  const statusEl = document.getElementById("adminChannelTestSearchStatus");
  if (statusEl) statusEl.textContent = "Zoeken…";
  if (!channel) {
    setAdminChannelTestError("Kies eerst een kanaal.");
    if (statusEl) statusEl.textContent = "";
    return;
  }
  if (!query || query.length < 2) {
    setAdminChannelTestError("Vul een query in (min 2 tekens).");
    if (statusEl) statusEl.textContent = "";
    return;
  }
  try {
    const payload = channel.kind === "custom"
      ? { channelKind: "custom", customChannel: channel.customChannel, query, limit: 10 }
      : { channelKind: "seed", channelId: channel.channelId, query, limit: 10 };
    const res = await fetchJson(`${state.apiBase}/api/admin/channel-test/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const results = Array.isArray(res?.results) ? res.results : [];
    const note = String(res?.searchBackendNote || "").trim();
    const ms = Number(res?.responseTimeMs);
    const timing = Number.isFinite(ms) ? ` · ${ms} ms` : "";
    if (statusEl) statusEl.textContent = `${results.length ? `Top ${results.length} resultaten` : "Geen resultaten"}${timing}`;
    renderAdminChannelTestResults(results, note);
  } catch (err) {
    if (statusEl) statusEl.textContent = "";
    setAdminChannelTestError(err.message);
  }
}

async function runAdminChannelTestImport(urlOverride = "") {
  setAdminChannelTestError("");
  const input = document.getElementById("adminChannelTestImportUrl");
  const url = String(urlOverride || input?.value || "").trim();
  const statusEl = document.getElementById("adminChannelTestImportStatus");
  if (!url) {
    setAdminChannelTestError("Vul een URL in om te importeren.");
    if (statusEl) statusEl.textContent = "";
    return;
  }
  if (statusEl) statusEl.textContent = "Importeren…";
  try {
    const res = await fetchJson(`${state.apiBase}/api/admin/channel-test/import`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const r = res?.recipe || {};
    const title = r.title || "—";
    const ing = Number(r.ingredientsCount || 0);
    const steps = Number(r.stepsCount || 0);
    if (statusEl) statusEl.textContent = `✅ ${title} · ingrediënten: ${ing} · stappen: ${steps}`;
  } catch (err) {
    if (statusEl) statusEl.textContent = "";
    setAdminChannelTestError(err.message);
  }
}

function renderAdminSearchTerms(searchTerms) {
  const statusEl = document.getElementById("adminSearchTermsStatus");
  const wrapEl = document.getElementById("adminSearchTermsTableWrap");
  if (!wrapEl) return;

  const last7d = Array.isArray(searchTerms?.last7d) ? searchTerms.last7d : [];
  const allTime = Array.isArray(searchTerms?.allTime) ? searchTerms.allTime : [];
  const allTimeByQuery = new Map(allTime.map((it) => [String(it?.query || ""), it]));

  if (!last7d.length) {
    if (statusEl) statusEl.textContent = "Nog geen zoekwoorden (of analytics staat uit).";
    wrapEl.innerHTML = "";
    return;
  }

  if (statusEl) statusEl.textContent = `Top ${last7d.length} (laatste 7 dagen)`;

  wrapEl.innerHTML = `
    <div class="admin-search-terms">
      <table class="admin-search-terms__table">
        <thead>
          <tr>
            <th>Zoekwoord</th>
            <th class="num">7d</th>
            <th class="num">All</th>
          </tr>
        </thead>
        <tbody>
          ${last7d.map((row) => {
            const q = String(row?.query || "");
            const all = allTimeByQuery.get(q);
            const allCount = Number(all?.count || 0);
            const count7d = Number(row?.count || 0);
            return `
              <tr>
                <td class="query" title="${escapeHtml(q)}">${escapeHtml(q)}</td>
                <td class="num">${Number.isFinite(count7d) ? count7d : 0}</td>
                <td class="num">${Number.isFinite(allCount) ? allCount : 0}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

async function deleteAdminUser(userId) {
  try {
    await fetchJson(`${state.apiBase}/api/admin/delete-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    showToast("Gebruiker verwijderd");
    renderAdminScreen();
  } catch (err) {
    showToast("Verwijdering mislukt: " + err.message);
  }
}

async function renderAdminScreen() {
  if (!isAdmin()) {
    // Hide admin screen if user is not admin
    if (adminScreen) adminScreen.setAttribute("aria-hidden", "true");
    return;
  }

  // Show admin screen
  if (adminScreen) adminScreen.removeAttribute("aria-hidden");

  initInAppAdminTabs();
  try {
    const stored = localStorage.getItem(ADMIN_TABS_STORAGE_KEY);
    setInAppAdminTab(stored || "overview", { persist: false });
  } catch {
    setInAppAdminTab("overview", { persist: false });
  }

  // Fetch admin stats
  const stats = await fetchAdminStats();
  const searchTerms = await fetchAdminSearchTerms();
  const channels = await fetchAdminPendingChannels();
  const catalog = await fetchAdminChannelCatalog();

  // Update analytics cards
  const userCountEl = document.getElementById("adminUserCount");
  const recipeCountEl = document.getElementById("adminRecipeCount");

  if (userCountEl) userCountEl.textContent = stats.totalUsers || 0;
  if (recipeCountEl) {
    const totalRecipes = stats.users.reduce((acc, u) => acc + (Number(u?.recipes || 0) || 0), 0);
    recipeCountEl.textContent = totalRecipes || 0;
  }

  // Admin notifications (templates + history)
  const notifStatus = document.getElementById("adminNotifStatus");
  const notifTemplateKey = document.getElementById("adminNotifTemplateKey");
  const notifCategory = document.getElementById("adminNotifCategory");
  const notifTitle = document.getElementById("adminNotifTitle");
  const notifBody = document.getElementById("adminNotifBody");
  const notifUrl = document.getElementById("adminNotifUrl");
  const notifImage = document.getElementById("adminNotifImageUrl");
  const notifSegAh = document.getElementById("adminNotifSegOnlyAh");
  const notifSegBasketReady = document.getElementById("adminNotifSegOnlyBasketReady");
  const notifSegBonus = document.getElementById("adminNotifSegOnlyBonus");
  const notifTestBtn = document.getElementById("adminNotifTestBtn");
  const notifSendBtn = document.getElementById("adminNotifSendBtn");
  const notifHistoryStatus = document.getElementById("adminNotifHistoryStatus");
  const notifHistoryList = document.getElementById("adminNotifHistoryList");

  const setNotifStatus = (text) => {
    if (notifStatus) notifStatus.textContent = String(text || "");
  };

  const readNotifPayload = () => {
    const templateKey = String(notifTemplateKey?.value || "").trim();
    const category = String(notifCategory?.value || "features").trim();
    const title = String(notifTitle?.value || "").trim();
    const body = String(notifBody?.value || "").trim();
    const url = String(notifUrl?.value || "").trim();
    const imageUrl = String(notifImage?.value || "").trim();
    const onlyAh = Boolean(notifSegAh?.checked);
    const onlyBasketReady = Boolean(notifSegBasketReady?.checked);
    const onlyBonus = Boolean(notifSegBonus?.checked);
    return {
      templateKey,
      category,
      title,
      body,
      url: url || undefined,
      imageUrl: imageUrl || undefined,
      segment: {
        onlyFavoriteSupermarketAh: onlyAh,
        onlyTriggerAhBasketReadyEnabled: onlyBasketReady,
        onlyTriggerAhBonusEnabled: onlyBonus,
      },
    };
  };

  let vapidOk = false;
  try {
    const keyRes = await fetchJson(`${state.apiBase}/api/push/vapid-public-key`, { method: "GET" });
    vapidOk = Boolean(String(keyRes?.publicKey || "").trim());
    if (!vapidOk) setNotifStatus("❌ Push is niet geconfigureerd (VAPID keys ontbreken op de server).");
  } catch {
    vapidOk = false;
    setNotifStatus("⚠️ Kan push-configuratie niet ophalen.");
  }
  if (notifSendBtn) notifSendBtn.disabled = !vapidOk;
  if (notifTestBtn) notifTestBtn.disabled = !vapidOk;

  const renderNotifHistory = (announcements) => {
    if (!notifHistoryList) return;
    const list = Array.isArray(announcements) ? announcements : [];
    if (!list.length) {
      notifHistoryList.innerHTML = `<div style="color:#989188;font-size:0.9rem">Nog geen aankondigingen.</div>`;
      return;
    }
    notifHistoryList.innerHTML = list.slice(0, 30).map((a) => {
      const id = escapeHtml(a?.id || "");
      const key = escapeHtml(a?.templateKey || a?.category || "");
      const title = escapeHtml(a?.title || "");
      const deepLink = `/?announce=${encodeURIComponent(a?.id || "")}`;
      const m = a?.metrics || {};
      const createdAt = a?.createdAt ? new Date(a.createdAt).toLocaleString("nl-NL") : "—";
      return `
        <div style="display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid #f3f5ef;border-radius:12px;background:#fff;margin-bottom:8px">
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;color:#3d3d3b">${key || "—"} · ${title || "—"}</div>
            <div style="font-size:0.85rem;color:#989188;margin-top:4px;word-break:break-all">
              <a href="${deepLink}" target="_blank" rel="noopener" style="color:#6b6258;text-decoration:underline">${escapeHtml(deepLink)}</a>
            </div>
            <div style="font-size:0.8rem;color:#b9ada0;margin-top:4px">
              Matched: ${Number(m.matched || 0)} · Sent: ${Number(m.sent || 0)} · Failed: ${Number(m.failed || 0)} · Removed: ${Number(m.removed || 0)} · ${escapeHtml(createdAt)}
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">
            <button class="secondary-button" type="button" data-admin-notif-resend="${id}" style="white-space:nowrap">Resend</button>
            <button class="secondary-button" type="button" data-admin-notif-delete="${id}" style="white-space:nowrap;border-color:rgba(220,53,69,0.25);color:rgba(140,23,35,0.95)">Delete</button>
          </div>
        </div>
      `;
    }).join("");
  };

  const refreshNotifHistory = async () => {
    if (notifHistoryStatus) notifHistoryStatus.textContent = "Laden…";
    try {
      const res = await fetchJson(`${state.apiBase}/api/admin/push/announcements?limit=50`, { method: "GET" });
      renderNotifHistory(res?.announcements || []);
      if (notifHistoryStatus) notifHistoryStatus.textContent = "";
    } catch (err) {
      if (notifHistoryStatus) notifHistoryStatus.textContent = `⚠️ ${err.message}`;
    }
  };
  refreshNotifHistory().catch(() => {});

  const withNotifBusy = async (fn) => {
    if (notifSendBtn) notifSendBtn.disabled = true;
    if (notifTestBtn) notifTestBtn.disabled = true;
    try { await fn(); } finally {
      if (notifSendBtn) notifSendBtn.disabled = !vapidOk;
      if (notifTestBtn) notifTestBtn.disabled = !vapidOk;
    }
  };

  if (notifSendBtn) {
    notifSendBtn.onclick = () => withNotifBusy(async () => {
      const payload = readNotifPayload();
      if (!payload.title || !payload.body) {
        setNotifStatus("Titel en bericht zijn verplicht.");
        return;
      }
      setNotifStatus("Versturen…");
      const res = await fetchJson(`${state.apiBase}/api/admin/push/announce`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const sent = Number(res?.sent || 0);
      const failed = Number(res?.failed || 0);
      const matched = Number(res?.matched || 0);
      setNotifStatus(`✅ Verstuurd: ${sent}/${matched} · Mislukt: ${failed}`);
      refreshNotifHistory().catch(() => {});
    }).catch((err) => setNotifStatus(`❌ Mislukt: ${err.message}`));
  }

  if (notifTestBtn) {
    notifTestBtn.onclick = () => withNotifBusy(async () => {
      const payload = readNotifPayload();
      if (!payload.title || !payload.body) {
        setNotifStatus("Titel en bericht zijn verplicht.");
        return;
      }
      setNotifStatus("Test sturen…");
      const res = await fetchJson(`${state.apiBase}/api/admin/push/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const sent = Number(res?.sent || 0);
      const failed = Number(res?.failed || 0);
      const matched = Number(res?.matched || 0);
      setNotifStatus(`✅ Test gestuurd: ${sent}/${matched} · Mislukt: ${failed}`);
    }).catch((err) => setNotifStatus(`❌ Mislukt: ${err.message}`));
  }

  document.querySelectorAll("[data-admin-notif-resend]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-admin-notif-resend") || "";
      if (!id) return;
      if (!confirm("Deze aankondiging opnieuw versturen?")) return;
      await withNotifBusy(async () => {
        setNotifStatus("Resend…");
        const res = await fetchJson(`${state.apiBase}/api/admin/push/resend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ announcementId: id, segment: readNotifPayload().segment }),
        });
        const sent = Number(res?.sent || 0);
        const failed = Number(res?.failed || 0);
        const matched = Number(res?.matched || 0);
        setNotifStatus(`✅ Resent: ${sent}/${matched} · Mislukt: ${failed}`);
        refreshNotifHistory().catch(() => {});
      });
    }, { once: true });
  });
  document.querySelectorAll("[data-admin-notif-delete]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-admin-notif-delete") || "";
      if (!id) return;
      if (!confirm("Deze aankondiging verwijderen?")) return;
      await withNotifBusy(async () => {
        setNotifStatus("Verwijderen…");
        await fetchJson(`${state.apiBase}/api/admin/push/delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ announcementId: id }),
        });
        setNotifStatus("✅ Verwijderd");
        refreshNotifHistory().catch(() => {});
      });
    }, { once: true });
  });

  // Render user list
  const usersList = document.getElementById("adminUsersList");
  if (usersList) {
    if (!stats.users || stats.users.length === 0) {
      usersList.innerHTML = "<p style='padding:16px;color:#989188'>Geen gebruikers gevonden</p>";
    } else {
      const renderFollowedChannels = (user) => {
        const channels = Array.isArray(user?.followedChannels) ? user.followedChannels : [];
        let names = channels
          .map((ch) => String(ch?.name || ch?.id || "").trim())
          .filter(Boolean);

        if (!names.length && Array.isArray(user?.followedChannelIds) && user.followedChannelIds.length) {
          const seedNameById = new Map(SEED_CHANNELS.map((ch) => [ch.id, ch.name]));
          const customNameById = new Map((state.customChannels || []).map((ch) => [ch.id, ch.name]));
          names = user.followedChannelIds
            .map((id) => String(customNameById.get(id) || seedNameById.get(id) || id || "").trim())
            .filter(Boolean);
        }
        if (!names.length) {
          return `<span style="color:#b9ada0">—</span>`;
        }

        const maxShown = 4;
        const shown = names.slice(0, maxShown);
        const extra = Math.max(0, names.length - shown.length);
        const chips = shown.map((name) => {
          return `<span title="${escapeHtml(name)}" style="display:inline-flex;align-items:center;padding:2px 8px;border-radius:999px;background:#f6f7f1;color:#6b6258;font-size:0.72rem;line-height:1;border:1px solid #eee9e2;white-space:nowrap;max-width:240px;overflow:hidden;text-overflow:ellipsis;margin-right:6px">${escapeHtml(name)}</span>`;
        }).join("");
        const more = extra ? `<span style="color:#989188;font-size:0.75rem;white-space:nowrap">+${extra}</span>` : "";
        return `${chips}${more}`;
      };

      usersList.innerHTML = stats.users.map((user) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border-bottom:1px solid #f3f5ef">
          <div style="flex:1">
            <div style="font-weight:500;color:#3d3d3b">${escapeHtml(user.email || "Onbekend")}</div>
            <div style="font-size:0.85rem;color:#989188;margin-top:4px">
              ${user.recipes || 0} recepten • ${user.cookbooks || 0} kookboeken
            </div>
            <div style="font-size:0.78rem;color:#989188;margin-top:6px">
              <span style="color:#b9ada0;margin-right:8px">Kanalen</span>
              <span style="display:inline-flex;flex-wrap:wrap;gap:0;align-items:center">${renderFollowedChannels(user)}</span>
            </div>
            ${user.createdAt ? `<div style="font-size:0.8rem;color:#b9ada0;margin-top:2px">Aangemaakt: ${new Date(user.createdAt).toLocaleDateString('nl-NL')}</div>` : ''}
          </div>
          <button class="secondary-button" type="button" style="margin-left:8px;white-space:nowrap" data-admin-delete-user="${escapeHtml(user.id)}">Verwijderen</button>
        </div>
      `).join("");
    }
  }

  renderAdminSearchTerms(searchTerms);

  renderAdminChannelsModeration(channels);

  // Bind moderation actions
  document.querySelectorAll("[data-admin-approve-channel]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-admin-approve-channel") || "";
      if (!id) return;
      if (!confirm("Kanaal goedkeuren?")) return;
      try {
        await setAdminChannelStatus(id, "approved", "");
        showToast("Kanaal goedgekeurd");
        renderAdminScreen();
      } catch (err) {
        showToast("Mislukt: " + err.message);
      }
    }, { once: true });
  });
  document.querySelectorAll("[data-admin-reject-channel]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-admin-reject-channel") || "";
      if (!id) return;
      if (!confirm("Kanaal afwijzen?")) return;
      const reason = prompt("Reden (optioneel):") || "";
      try {
        await setAdminChannelStatus(id, "rejected", reason);
        showToast("Kanaal afgewezen");
        renderAdminScreen();
      } catch (err) {
        showToast("Mislukt: " + err.message);
      }
    }, { once: true });
  });

  // Populate channel test select
  const select = document.getElementById("adminChannelTestSelect");
  if (select) {
    const seed = Array.isArray(catalog?.seed) ? catalog.seed : [];
    const custom = catalog?.custom || { approved: [], pending: [], rejected: [] };
    const opt = (label, valueObj) => `<option value="${escapeHtml(JSON.stringify(valueObj))}">${escapeHtml(label)}</option>`;
    const groups = [];
    if (seed.length) {
      groups.push(`<optgroup label="Seed kanalen">${seed.map((ch) => opt(ch.name, { kind: "seed", channelId: ch.id, label: ch.name })).join("")}</optgroup>`);
    }
    const makeCustomGroup = (label, list) => {
      const arr = Array.isArray(list) ? list : [];
      if (!arr.length) return "";
      return `<optgroup label="${escapeHtml(label)}">${arr.map((ch) => opt(`${ch.name}${ch.url ? ` — ${ch.url}` : ""}`, { kind: "custom", customChannel: { id: ch.id, name: ch.name, url: ch.url }, label: ch.name })).join("")}</optgroup>`;
    };
    groups.push(makeCustomGroup("Custom (approved)", custom.approved));
    groups.push(makeCustomGroup("Custom (pending)", custom.pending));
    groups.push(makeCustomGroup("Custom (rejected)", custom.rejected));
    if (groups.filter(Boolean).length) {
      select.innerHTML = `<option value="">Kanaal kiezen…</option>` + groups.filter(Boolean).join("");
    }
  }

  const searchBtn = document.getElementById("adminChannelTestSearchBtn");
  if (searchBtn) searchBtn.onclick = () => runAdminChannelTestSearch();
  const importBtn = document.getElementById("adminChannelTestImportBtn");
  if (importBtn) importBtn.onclick = () => runAdminChannelTestImport("");
  const newChannelTestBtn = document.getElementById("adminNewChannelTestBtn");
  if (newChannelTestBtn) newChannelTestBtn.onclick = () => runAdminNewChannelTest();
  const newChannelAddBtn = document.getElementById("adminNewChannelAddBtn");
  if (newChannelAddBtn) newChannelAddBtn.onclick = () => addAdminGlobalChannel();

  document.querySelectorAll("[data-admin-channel-test-import]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const url = btn.getAttribute("data-admin-channel-test-import") || "";
      const input = document.getElementById("adminChannelTestImportUrl");
      if (input) input.value = url;
      runAdminChannelTestImport(url);
    }, { once: true });
  });
}

function renderAll() {
  renderHomeStats();
  renderRecentImports();
  renderHomeConcepts();
  renderChannelRow();
  renderHomeCookbooks();
  renderChannelSettings();
  renderCookbookFilterBar();
  renderRecipeSlider();
  renderRecipeGrid();
  renderCookbookList();
  renderNavBadge();
  renderDetailRecipe(true);
  renderImportReview();
  renderGroceryGroups();
  renderMealPlanGrid();
  renderProfileSummary();
  renderAvatars();
  updateAuthUI();
  closeBasketModal();
  // Apply translations for current language (once loaded)
  if (translationsReady) applyTranslations();
  // Render admin screen (async, non-blocking)
  if (isAdmin()) {
    renderAdminScreen();
  }
}

function normalizeUiErrorMessage(message, code = "") {
  const text = String(message || "").trim();
  const errorCode = String(code || "").trim();
  if (!text) {
    return "Importeren mislukt.";
  }

  if (
    text === "not_recipe" ||
    text === "not_receipe" ||
    errorCode === "not_recipe" ||
    errorCode === "not_receipe" ||
    /jsdom is not defined/i.test(text) ||
    /JSDOM is not defined/i.test(text)
  ) {
    return "Je probeert een blog te importeren, geen recept.";
  }

  if (/Meta oEmbed Read|oEmbed Read/i.test(text)) {
    return "Instagram-import wacht nog op Meta-goedkeuring voor deze app. Gebruik voorlopig een publieke post of een website-link.";
  }

  if (/Provide valid app ID|OAuthException/i.test(text)) {
    return "Instagram-import is nog niet goed gekoppeld aan Meta. Controleer App ID, Secret en app review.";
  }

  return text;
}

const AUTH_TOKEN_KEY = "plately-auth-token";

function getStoredAuthToken() {
  try { return localStorage.getItem(AUTH_TOKEN_KEY) || ""; } catch { return ""; }
}

function storeAuthToken(token) {
  try {
    if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
    else localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {}
}

async function fetchJson(url, options = {}) {
  const headers = { ...(options.headers || {}) };
  const token = getStoredAuthToken();
  if (token && !headers.Authorization && !headers.authorization) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const backendCode = payload?.error;
    const backendMessage = payload?.message || payload?.error || "Importeren mislukt.";
    const error = new Error(normalizeUiErrorMessage(backendMessage, backendCode));
    if (typeof backendCode === "string" && /^[a-z0-9_]+$/i.test(backendCode)) {
      error.code = backendCode;
    }
    throw error;
  }

  return payload;
}

async function refreshBackendStatus() {
  try {
    await fetchJson(`${state.apiBase}/api/health`);
  } catch {
    // Keep UI quiet when backend is unavailable.
  }
}

let persistTimeoutId = 0;

async function persistAppState() {
  if (!state.session.ready) {
    return;
  }

  state.session.saving = true;

  try {
    const payload = await fetchJson(`${state.apiBase}/api/app-state`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildPersistedAppState()),
    });

    if (payload?.user?.id) {
      state.session.userId = payload.user.id;
    }
    if (payload?.auth) {
      state.auth.enabled = Boolean(payload.auth.enabled);
      state.auth.authenticated = Boolean(payload.auth.authenticated);
      state.auth.email = payload.auth.email || "";
    }
  } catch {
    // Keep the app usable when persistence fails temporarily.
  } finally {
    state.session.saving = false;
  }
}

function schedulePersistAppState(delay = 350) {
  window.clearTimeout(persistTimeoutId);
  persistTimeoutId = window.setTimeout(() => {
    persistAppState();
  }, delay);
}

// Track if user has ever been authenticated (persisted across refreshes)
const HAS_AUTHED_KEY = "plately-has-authed";
function markUserAsAuthed() {
  try { localStorage.setItem(HAS_AUTHED_KEY, "1"); } catch {}
}
function clearUserAuthedMark() {
  try { localStorage.removeItem(HAS_AUTHED_KEY); } catch {}
}
function hasUserEverAuthed() {
  try { return localStorage.getItem(HAS_AUTHED_KEY) === "1"; } catch { return false; }
}

async function refreshChannelStatusesFromServer() {
  // Pull latest channel statuses (e.g. after admin approval) without wiping local UI state.
  try {
    const payload = await fetchJson(`${state.apiBase}/api/session`);
    const user = payload?.user;
    if (!user || typeof user !== "object") return;
    if (Array.isArray(user.customChannels)) {
      state.customChannels = user.customChannels
        .filter((ch) => ch && typeof ch.id === "string" && typeof ch.name === "string" && typeof ch.url === "string")
        .map((ch) => ({ ...ch }));
    }
    if (Array.isArray(user.followedChannelIds) && user.followedChannelIds.length) {
      state.followedChannelIds = user.followedChannelIds.filter((id) => {
        const isSeed = SEED_CHANNELS.some((ch) => ch.id === id);
        const isCustom = state.customChannels.some((ch) => ch.id === id);
        if (!isSeed && !isCustom) return false;
        // Admin-uitgeschakelde kanalen mogen niet meer in de followed-lijst blijven hangen.
        if (isSeed && !isSeedChannelEnabled(id)) return false;
        if (isCustom && !isCustomChannelEnabled(id)) return false;
        return true;
      });
    }
    renderChannelSettings();
    renderChannelRow();
    renderProfileSummary();
  } catch {
    // ignore
  }
}

const ANNOUNCE_SEEN_KEY = "plately-announcements-seen";

function getSeenAnnouncementIds() {
  try {
    const raw = localStorage.getItem(ANNOUNCE_SEEN_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map((x) => String(x || "")).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function markAnnouncementSeen(id) {
  const safeId = String(id || "").trim();
  if (!safeId) return;
  const ids = new Set(getSeenAnnouncementIds());
  ids.add(safeId);
  try {
    localStorage.setItem(ANNOUNCE_SEEN_KEY, JSON.stringify(Array.from(ids).slice(-200)));
  } catch {
    // ignore
  }
}

function setAnnounceBadgeVisible(visible) {
  const on = Boolean(visible);
  if (homeAnnounceBadge) homeAnnounceBadge.classList.toggle("nav-badge--visible", on);
  if (profileAnnounceBadge) profileAnnounceBadge.classList.toggle("nav-badge--visible", on);
}

function showAnnouncementModal(announcement) {
  const a = announcement && typeof announcement === "object" ? announcement : {};
  const title = String(a.title || "Nieuw");
  const body = String(a.body || "");
  const id = String(a.id || "");
  const url = String(a.url || "");

  state.announce.unseen = true;
  setAnnounceBadgeVisible(true);

  const overlay = document.createElement("div");
  overlay.className = "announce-modal-overlay";
  overlay.innerHTML = `
    <div class="announce-modal" role="dialog" aria-modal="true" aria-label="Nieuw">
      <div class="announce-modal__accent" aria-hidden="true"></div>
      <div class="announce-modal__head">
        <div class="announce-modal__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22a2.4 2.4 0 0 0 2.4-2.4H9.6A2.4 2.4 0 0 0 12 22Z"></path>
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"></path>
          </svg>
        </div>
        <h3 class="announce-modal__title"></h3>
        <button class="announce-modal__close" type="button" aria-label="Sluiten" data-announce-dismiss>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M18 6 6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <p class="announce-modal__body"></p>
      <div class="announce-modal__actions">
        ${url ? `<button class="primary-button" type="button" data-announce-open>Open</button>` : ""}
        <button class="secondary-button" type="button" data-announce-dismiss>Sluiten</button>
      </div>
    </div>
  `;
  const titleEl = overlay.querySelector(".announce-modal__title");
  const bodyEl = overlay.querySelector(".announce-modal__body");
  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.textContent = body;

  const previouslyFocused = document.activeElement;
  const closeBtn = overlay.querySelector(".announce-modal__close");
  const onKeyDown = (e) => {
    if (e.key === "Escape") cleanup();
  };

  const cleanup = () => {
    document.removeEventListener("keydown", onKeyDown);
    overlay.remove();
    if (id) markAnnouncementSeen(id);
    state.announce.unseen = false;
    setAnnounceBadgeVisible(false);
    try { previouslyFocused?.focus?.(); } catch {}
  };

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cleanup();
  });
  overlay.querySelector("[data-announce-dismiss]")?.addEventListener("click", cleanup);
  overlay.querySelector("[data-announce-open]")?.addEventListener("click", () => {
    if (!url) return;
    window.location.assign(url);
    cleanup();
  });

  document.body.appendChild(overlay);
  document.addEventListener("keydown", onKeyDown);
  try { closeBtn?.focus?.(); } catch {}
}

async function handleAnnouncementQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const announceId = String(params.get("announce") || "").trim();
  const isNew = String(params.get("new") || "").trim() === "1";

  if (!announceId && !isNew) {
    setAnnounceBadgeVisible(Boolean(state.announce.unseen));
    return;
  }

  const clearParams = () => {
    try {
      const next = new URL(window.location.href);
      next.searchParams.delete("announce");
      next.searchParams.delete("new");
      window.history.replaceState({}, document.title, next.pathname + next.search);
    } catch {
      // ignore
    }
  };

  if (isNew) {
    clearParams();
    const id = "new-1";
    if (getSeenAnnouncementIds().includes(id)) return;
    showAnnouncementModal({ id, title: "Nieuw", body: "Er is iets nieuws in Plately.", url: "/" });
    return;
  }

  clearParams();
  if (getSeenAnnouncementIds().includes(announceId)) return;

  try {
    const res = await fetchJson(`${state.apiBase}/api/announce/${encodeURIComponent(announceId)}`, { method: "GET" });
    const a = res?.announcement;
    if (!a) return;
    showAnnouncementModal(a);
  } catch {
    // ignore
  }
}

async function bootstrapSession() {
  let sessionCheckSucceeded = false;
  // Save any locally persisted grocery items before applying server state
  let localGroceryItems = null;
  try {
    const saved = localStorage.getItem("plately-grocery-items");
    if (saved !== null) localGroceryItems = JSON.parse(saved);
  } catch {}

  try {
    const payload = await fetchJson(`${state.apiBase}/api/session`);
    sessionCheckSucceeded = true;
    console.log("📥 Session payload received:", {
      auth: payload?.auth,
      user_id: payload?.user?.id
    });

    if (payload?.auth) {
      state.auth.enabled = Boolean(payload.auth.enabled);
      state.auth.authenticated = Boolean(payload.auth.authenticated);
      state.auth.email = payload.auth.email || "";
      console.log("✅ Auth payload applied - authenticated:", state.auth.authenticated);
    }
    applyPersistedAppState(payload.user);
    console.log("📦 After applyPersistedAppState - authenticated:", state.auth.authenticated);

    // If server didn't provide grocery items but we have them locally, restore from localStorage
    if ((!payload?.user?.groceryItems || !Array.isArray(payload.user.groceryItems)) && localGroceryItems) {
      state.groceryItems = localGroceryItems;
      console.log("♻️ Restored grocery items from localStorage (server didn't provide any)");
    }

    // applyPersistedAppState may have reset state.auth.authenticated based on
    // payload.user.authenticated — re-apply the auth payload as the source of truth
    if (payload?.auth) {
      state.auth.authenticated = Boolean(payload.auth.authenticated);
      state.auth.email = payload.auth.email || "";
      console.log("🔐 Auth re-applied after applyPersistedAppState - authenticated:", state.auth.authenticated);
    }
    // Remember authenticated state across refreshes
    if (state.auth.authenticated) {
      markUserAsAuthed();
    }
  } catch {
    // Server unreachable — restore groceryItems from localStorage
    try {
      const saved = localStorage.getItem("plately-grocery-items");
      if (saved !== null) state.groceryItems = JSON.parse(saved);
    } catch {}
  } finally {
    console.log("🔄 Bootstrap session finally block - authenticated:", state.auth.authenticated, "sessionCheckSucceeded:", sessionCheckSucceeded);
    state.session.ready = true;

    renderAll();

    // Restore the view user was on before refresh
    // Priority: sessionStorage > state.view > default to home
    let viewToRestore = "home";
    let recipeIdToRestore = null;
    try {
      const savedView = sessionStorage.getItem("plately-view");
      if (savedView && ["home", "detail", "grocery", "settings", "mealplan", "cookbooks", "import", "review"].includes(savedView)) {
        viewToRestore = savedView;
      }
      // Also restore selectedRecipeId if on detail view
      if (viewToRestore === "detail") {
        recipeIdToRestore = sessionStorage.getItem("plately-selected-recipe");
      }
    } catch { /* ignore */ }

    // If no saved view, use state.view from persisted app state
    if (viewToRestore === "home" && state.view && state.view !== "home" && ["detail", "import", "review", "grocery", "settings", "mealplan", "cookbooks"].includes(state.view)) {
      viewToRestore = state.view;
    }

    // Switch to the restored view
    if (viewToRestore === "detail") {
      // Use saved recipe ID if available, otherwise use current state
      const recipeId = recipeIdToRestore || state.selectedRecipeId;
      if (recipeId && getRecipeById(recipeId)) {
        state.selectedRecipeId = recipeId;
        switchView("detail");
        renderDetailRecipe(true);
      } else {
        // Recipe not found, fallback to home
        switchView("home");
      }
    } else if (viewToRestore !== "home") {
      switchView(viewToRestore);
    } else {
      // Explicitly switch to home to ensure proper initialization
      switchView("home");
    }

    // Scroll to top for non-detail views
    if (state.view !== "detail") {
      scrollToTopSoon();
    }

    // Handle announce deep links (/?announce=... or /?new=1)
    handleAnnouncementQueryParams().catch(() => {});

    // Show auth modal to all unauthenticated users
    // IMPORTANT: Check state.auth.authenticated (from server) NOT cached localStorage
    if (sessionCheckSucceeded && state.auth.authenticated === false) {
      console.log("📱 User not authenticated, showing login modal");
      openAuthModal("login");
    } else {
      console.log("✅ User is authenticated or session check failed. state.auth.authenticated:", state.auth.authenticated);
      // Show tooltips once per login session
      if (state.auth.authenticated) {
        startOnboarding();
      }
    }
  }
}

async function submitAuth(mode, email, password) {
  const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
  const body = {
    email,
    password,
  };

  // For login, sync the current client state with server
  // For registration, create a clean account without inheriting old data
  if (mode === "login") {
    body.currentState = buildPersistedAppState();
  }

  const payload = await fetchJson(`${state.apiBase}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (payload?.auth) {
    state.auth.enabled = Boolean(payload.auth.enabled);
    state.auth.authenticated = Boolean(payload.auth.authenticated);
    state.auth.email = payload.auth.email || "";
    if (payload.auth.token) storeAuthToken(payload.auth.token);
  }
  applyPersistedAppState(payload.user);
  // Keep the account email visible under Profile → Mijn account.
  // (Server user.email is the canonical login email; profile.email is optional UI metadata.)
  if (!state.profile.email && state.auth.email) {
    state.profile.email = state.auth.email;
  }
  if (state.auth.authenticated) markUserAsAuthed();
  renderAll();

  if (mode === "register") {
    showOnboarding();
    showToast("Welkom! Drie snelle stappen — daarna kun je aan de slag.");
  } else {
    closeAuthModal();
    showToast("Je bent ingelogd.");
    scrollToTopSoon();
  }
}

async function logoutAccount() {
  console.log("🔓 Logging out...");

  // Clear token immediately
  storeAuthToken("");
  clearTransientProfilePhoto();

  // Clear session flags so user will see tooltips and install modal again on next login
  try { sessionStorage.removeItem(ONBOARDING_SESSION_KEY); } catch {}
  try { sessionStorage.removeItem(INSTALL_APP_SESSION_KEY); } catch {}
  closeInstallAppModal();

  try {
    const payload = await fetchJson(`${state.apiBase}/api/auth/logout`, {
      method: "POST",
    });

    if (payload?.auth) {
      state.auth.enabled = Boolean(payload.auth.enabled);
      state.auth.authenticated = Boolean(payload.auth.authenticated);
      state.auth.email = payload.auth.email || "";
      console.log("✅ Logout auth state updated - authenticated:", state.auth.authenticated);
    }
    if (payload?.user) {
      applyPersistedAppState(payload.user);
    }
  } catch (error) {
    console.log("⚠️ Logout request failed, but continuing:", error.message);
    // Even if server request fails, clear auth state client-side
    state.auth.authenticated = false;
    state.auth.email = "";
  }

  clearUserAuthedMark();
  renderAll();
  showToast("Je bent uitgelogd.");

  // Show login screen after logout
  if (!state.auth.authenticated) {
    console.log("📱 Showing login screen after logout");
    openAuthModal("login");
  }
}

async function handleImport(url, note) {
  return fetchJson(`${state.apiBase}/api/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      platform: state.selectedPlatform,
      note,
    }),
  });
}

function validateUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function extractUrl(raw) {
  if (!raw) return raw;
  // Extract first https:// or http:// URL from pasted text
  const httpsMatch = raw.match(/https?:\/\/[^\s]+/);
  if (httpsMatch) return httpsMatch[0];
  // Support www. prefix without protocol
  const wwwMatch = raw.match(/(?:^|\s)(www\.[^\s]+)/);
  if (wwwMatch) return "https://" + wwwMatch[1].trim();
  return raw;
}

async function requestWakeLock() {
  if (!("wakeLock" in navigator)) {
    showToast("Scherm-aan functie wordt niet ondersteund op dit apparaat.");
    state.keepAwake = false;
    updateWakeLockUI();
    return;
  }

  try {
    state.wakeLockSentinel = await navigator.wakeLock.request("screen");
    state.keepAwake = true;
    state.wakeLockSentinel.addEventListener("release", () => {
      state.wakeLockSentinel = null;
      if (document.visibilityState !== "visible") {
        return;
      }
      updateWakeLockUI();
    });
    updateWakeLockUI();
  } catch {
    state.keepAwake = false;
    updateWakeLockUI();
    showToast("Scherm kon niet actief gehouden worden.");
  }
}

async function releaseWakeLock() {
  if (state.wakeLockSentinel) {
    try {
      await state.wakeLockSentinel.release();
    } catch {
      // ignore
    }
  }
  state.wakeLockSentinel = null;
  if (state.view !== "detail") {
    state.keepAwake = false;
  }
  updateWakeLockUI();
}

function updateWakeLockUI() {
  const isActive = Boolean(state.keepAwake && state.wakeLockSentinel);
  wakeLockButton.classList.toggle("is-active", isActive);
  wakeLockButton.setAttribute("aria-pressed", String(isActive));
  wakeLockButton.textContent = isActive ? "Scherm tijdens koken: aan" : "Scherm tijdens koken: uit";
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    const buildVersion =
      document.querySelector('meta[name="plately-build"]')?.getAttribute("content") || String(Date.now());
    const registration = await navigator.serviceWorker.register(`/service-worker.js?v=${encodeURIComponent(buildVersion)}`);
    registration.update().catch(() => {});

    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) {
        return;
      }
      refreshing = true;
      window.location.reload();
    });

    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }

    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (!worker) {
        return;
      }

      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          worker.postMessage({ type: "SKIP_WAITING" });
        }
      });
    });
  } catch {
    // Keep the app silent if service worker registration fails.
  }
}

function isFeaturePushSupported() {
  return Boolean("serviceWorker" in navigator && "PushManager" in window && "Notification" in window);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function getFeaturePushRegistration() {
  await registerServiceWorker();
  const reg = await navigator.serviceWorker.ready;
  return reg || null;
}

function setToggleSwitchState(el, on) {
  if (!el) return;
  el.classList.toggle("toggle-switch--on", Boolean(on));
  el.setAttribute("aria-checked", String(Boolean(on)));
}

function getDefaultPushPrefs() {
  return {
    categories: { features: true, ah: false, cookmode: false },
    triggers: { ahBasketReady: false, ahBonus: false },
  };
}

function sanitizePushPrefsClient(prefs) {
  const raw = prefs && typeof prefs === "object" ? prefs : {};
  const cats = raw.categories && typeof raw.categories === "object" ? raw.categories : {};
  const triggers = raw.triggers && typeof raw.triggers === "object" ? raw.triggers : {};
  return {
    categories: {
      features: Boolean(cats.features),
      ah: Boolean(cats.ah),
      cookmode: Boolean(cats.cookmode),
    },
    triggers: {
      ahBasketReady: Boolean(triggers.ahBasketReady),
      ahBonus: Boolean(triggers.ahBonus),
    },
  };
}

async function updatePushPrefsOnServer(prefs) {
  const reg = await getFeaturePushRegistration();
  const sub = await reg?.pushManager?.getSubscription?.();
  if (!sub?.endpoint) {
    throw new Error("Push subscription niet gevonden.");
  }
  await fetchJson(`${state.apiBase}/api/push/preferences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint: sub.endpoint, prefs }),
  });
}

function renderPushCategoryUI() {
  const supported = isFeaturePushSupported();
  const on = Boolean(state.push.subscribed) && supported && (state.push.permission === "granted");
  const prefs = sanitizePushPrefsClient(state.push.prefs || getDefaultPushPrefs());
  state.push.prefs = prefs;

  const rows = [
    [pushCatFeaturesRow, pushCatFeaturesToggle, pushCatFeaturesMeta, "features"],
    [pushCatAhRow, pushCatAhToggle, pushCatAhMeta, "ah"],
    [pushCatCookmodeRow, pushCatCookmodeToggle, pushCatCookmodeMeta, "cookmode"],
  ];

  for (const [row, toggle, meta, key] of rows) {
    if (!row || !toggle) continue;
    row.style.opacity = on ? "" : "0.6";
    toggle.toggleAttribute("disabled", !on);
    toggle.setAttribute("aria-disabled", on ? "false" : "true");
    const enabled = Boolean(prefs.categories[key]);
    setToggleSwitchState(toggle, enabled);
    if (meta) meta.textContent = on ? (enabled ? "Aan" : "Uit") : "Niet actief";
  }

  const triggerRows = [
    [pushTrigAhBasketReadyRow, pushTrigAhBasketReadyToggle, pushTrigAhBasketReadyMeta, "ahBasketReady"],
    [pushTrigAhBonusRow, pushTrigAhBonusToggle, pushTrigAhBonusMeta, "ahBonus"],
  ];
  const triggersEnabled = on && Boolean(prefs.categories.ah);
  for (const [row, toggle, meta, key] of triggerRows) {
    if (!row || !toggle) continue;
    row.style.opacity = triggersEnabled ? "" : "0.6";
    toggle.toggleAttribute("disabled", !triggersEnabled);
    toggle.setAttribute("aria-disabled", triggersEnabled ? "false" : "true");
    const enabled = Boolean(prefs.triggers[key]);
    setToggleSwitchState(toggle, enabled);
    if (meta) meta.textContent = triggersEnabled ? (enabled ? "Aan" : "Uit") : "Schakel eerst AH aan";
  }
}

function renderFeaturePushUI() {
  if (!featurePushRow || !featurePushToggle) return;

  const supported = isFeaturePushSupported();
  state.push.supported = supported;
  state.push.permission = supported ? (Notification.permission || "default") : "default";

  featurePushRow.style.opacity = supported ? "" : "0.6";
  featurePushToggle.toggleAttribute("disabled", !supported);
  featurePushToggle.setAttribute("aria-disabled", supported ? "false" : "true");

  const on = Boolean(state.push.subscribed);
  featurePushToggle.classList.toggle("toggle-switch--on", on);
  featurePushToggle.setAttribute("aria-checked", String(on));

  if (featurePushMeta) {
    if (!supported) featurePushMeta.textContent = "Niet ondersteund";
    else if (state.push.permission === "denied") featurePushMeta.textContent = "Geblokkeerd";
    else featurePushMeta.textContent = on ? "Aan" : "Uit";
  }

  renderPushCategoryUI();
}

async function refreshFeaturePushState() {
  if (!isFeaturePushSupported()) {
    state.push.subscribed = false;
    renderFeaturePushUI();
    return;
  }
  if (state.push.refreshing) return;
  state.push.refreshing = true;

  try {
    const reg = await getFeaturePushRegistration();
    const sub = await reg?.pushManager?.getSubscription?.();
    state.push.subscribed = Boolean(sub);
    state.push.permission = Notification.permission || "default";
  } catch {
    state.push.subscribed = false;
  } finally {
    state.push.refreshing = false;
    renderFeaturePushUI();
  }
}

async function enableFeaturePush() {
  if (!isFeaturePushSupported()) {
    showToast("Push meldingen worden niet ondersteund op dit apparaat.");
    return;
  }

  if (Notification.permission === "denied") {
    showToast("Meldingen zijn geblokkeerd in je browser-instellingen.");
    await refreshFeaturePushState();
    return;
  }

  const permission = await Notification.requestPermission().catch(() => "default");
  if (permission !== "granted") {
    showToast("Geen toestemming voor meldingen.");
    await refreshFeaturePushState();
    return;
  }

  const reg = await getFeaturePushRegistration();
  const publicKeyRes = await fetchJson(`${state.apiBase}/api/push/vapid-public-key`);
  const publicKey = String(publicKeyRes?.publicKey || "");
  if (!publicKey) {
    showToast("Push is niet geconfigureerd (VAPID_PUBLIC_KEY ontbreekt).");
    await refreshFeaturePushState();
    return;
  }

  const existing = await reg.pushManager.getSubscription();
  const subscription = existing || await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  await fetchJson(`${state.apiBase}/api/push/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscription }),
  });

  try {
    const prefs = sanitizePushPrefsClient(state.push.prefs || getDefaultPushPrefs());
    state.push.prefs = prefs;
    await updatePushPrefsOnServer(prefs);
  } catch {
    // best-effort
  }

  state.push.subscribed = true;
  renderFeaturePushUI();
  showToast("Meldingen staan aan.");
}

async function disableFeaturePush() {
  if (!isFeaturePushSupported()) {
    state.push.subscribed = false;
    renderFeaturePushUI();
    return;
  }

  const reg = await getFeaturePushRegistration();
  const subscription = await reg?.pushManager?.getSubscription?.();
  if (subscription) {
    try {
      await fetchJson(`${state.apiBase}/api/push/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
    } catch {
      // best-effort
    }
    try { await subscription.unsubscribe(); } catch { /* ignore */ }
  }

  state.push.subscribed = false;
  renderFeaturePushUI();
  showToast("Meldingen staan uit.");
}

function bindFeaturePushToggle() {
  if (!featurePushToggle) return;

  const act = async () => {
    if (!isFeaturePushSupported() || featurePushToggle.hasAttribute("disabled")) return;
    if (state.push.subscribed) await disableFeaturePush();
    else await enableFeaturePush();
  };

  featurePushToggle.addEventListener("click", () => { act().catch(() => {}); });
  featurePushToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      act().catch(() => {});
    }
  });
}

function bindPushCategoryToggles() {
  const entries = [
    ["features", pushCatFeaturesToggle],
    ["ah", pushCatAhToggle],
    ["cookmode", pushCatCookmodeToggle],
  ];

  for (const [key, el] of entries) {
    if (!el) continue;
    const act = async () => {
      if (el.hasAttribute("disabled")) return;
      const prefs = sanitizePushPrefsClient(state.push.prefs || getDefaultPushPrefs());
      prefs.categories[key] = !prefs.categories[key];
      state.push.prefs = prefs;
      renderPushCategoryUI();
      try {
        await updatePushPrefsOnServer(prefs);
      } catch (err) {
        // Revert UI on failure
        prefs.categories[key] = !prefs.categories[key];
        state.push.prefs = prefs;
        renderPushCategoryUI();
        showToast("Opslaan mislukt: " + (err?.message || "onbekende fout"));
      }
    };

    el.addEventListener("click", () => { act().catch(() => {}); });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        act().catch(() => {});
      }
    });
  }
}

function bindPushTriggerToggles() {
  const entries = [
    ["ahBasketReady", pushTrigAhBasketReadyToggle],
    ["ahBonus", pushTrigAhBonusToggle],
  ];

  for (const [key, el] of entries) {
    if (!el) continue;
    const act = async () => {
      if (el.hasAttribute("disabled")) return;
      const prefs = sanitizePushPrefsClient(state.push.prefs || getDefaultPushPrefs());
      prefs.triggers[key] = !prefs.triggers[key];
      state.push.prefs = prefs;
      renderPushCategoryUI();
      try {
        await updatePushPrefsOnServer(prefs);
      } catch (err) {
        prefs.triggers[key] = !prefs.triggers[key];
        state.push.prefs = prefs;
        renderPushCategoryUI();
        showToast("Opslaan mislukt: " + (err?.message || "onbekende fout"));
      }
    };

    el.addEventListener("click", () => { act().catch(() => {}); });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        act().catch(() => {});
      }
    });
  }
}

async function toggleWakeLock() {
  if (state.keepAwake && state.wakeLockSentinel) {
    state.keepAwake = false;
    await releaseWakeLock();
    return;
  }

  state.keepAwake = true;
  await requestWakeLock();
}

/* ─── Recept-import splash overlay ─── */
const IMPORT_SPLASH_PHASE_COUNT = 4;
const IMPORT_SPLASH_PHASE_LABELS = [
  "URL analyseren",
  "Tekst lezen",
  "Producten matchen",
  "Ingrediënten klaarzetten"
];
const IMPORT_SPLASH_MIN_MS = 3500; // splash blijft minimaal 3.5s zichtbaar voor visueel comfort
const IMPORT_SPLASH_MAX_MS = 30000; // safety: forceer dichtklap als import hangt
let _importSplashTimer = null;
let _importSplashPhase = 0;
let _importSplashShownAt = 0;
let _importSplashHideTimeout = null;
let _importSplashSafetyTimeout = null;
let _importSplashExitTimeout = null;

function _renderImportSplashPhases(activeIdx) {
  const splash = document.getElementById("importSplash");
  const status = document.getElementById("importSplashStatus");
  const items = splash ? splash.querySelectorAll(".import-splash__orbit-step") : [];
  const phaseCount = items.length || IMPORT_SPLASH_PHASE_COUNT;
  const safeIdx = Math.max(0, Math.min(activeIdx, phaseCount - 1));
  if (splash) {
    splash.dataset.phase = String(safeIdx);
    splash.style.setProperty("--import-progress", `${((safeIdx + 1) / phaseCount) * 100}%`);
  }
  if (status) status.textContent = IMPORT_SPLASH_PHASE_LABELS[safeIdx] || "Recept importeren";
  items.forEach((el, i) => {
    el.dataset.state = i < safeIdx ? "done" : i === safeIdx ? "active" : "pending";
  });
}

function _doHideImportSplash() {
  const splash = document.getElementById("importSplash");
  if (!splash) return;
  if (_importSplashExitTimeout) {
    clearTimeout(_importSplashExitTimeout);
    _importSplashExitTimeout = null;
  }
  splash.classList.add("import-splash--leaving");
  _importSplashExitTimeout = window.setTimeout(() => {
    _importSplashExitTimeout = null;
    splash.classList.add("hidden");
    splash.classList.remove("import-splash--leaving", "import-splash--ready");
    splash.setAttribute("aria-hidden", "true");
    splash.style.removeProperty("--import-progress");
    delete splash.dataset.phase;
  }, 260);
  if (_importSplashTimer) {
    clearInterval(_importSplashTimer);
    _importSplashTimer = null;
  }
  if (_importSplashSafetyTimeout) {
    clearTimeout(_importSplashSafetyTimeout);
    _importSplashSafetyTimeout = null;
  }
  _importSplashShownAt = 0;
}

function showImportSplash(url) {
  const splash = document.getElementById("importSplash");
  if (!splash) return;
  // Annuleer een eventueel pending hide zodat een tweede import niet flikkert.
  if (_importSplashHideTimeout) {
    clearTimeout(_importSplashHideTimeout);
    _importSplashHideTimeout = null;
  }
  if (_importSplashExitTimeout) {
    clearTimeout(_importSplashExitTimeout);
    _importSplashExitTimeout = null;
  }
  const sourceEl = document.getElementById("importSplashSource");
  if (sourceEl) {
    let host = "";
    try { host = new URL(String(url || "").trim()).hostname.replace(/^www\./, ""); } catch {}
    sourceEl.textContent = host;
  }
  _importSplashPhase = 0;
  _renderImportSplashPhases(0);
  splash.classList.remove("hidden", "import-splash--leaving", "import-splash--ready");
  splash.setAttribute("aria-hidden", "false");
  _importSplashShownAt = Date.now();
  if (_importSplashTimer) clearInterval(_importSplashTimer);
  _importSplashTimer = setInterval(() => {
    _importSplashPhase = Math.min(_importSplashPhase + 1, IMPORT_SPLASH_PHASE_COUNT - 1);
    _renderImportSplashPhases(_importSplashPhase);
  }, 1100);
  // Safety: als hideImportSplash() onverhoopt nooit wordt aangeroepen
  // (bv. import-promise hangt of een uncaught error), forceer dichtklap.
  if (_importSplashSafetyTimeout) clearTimeout(_importSplashSafetyTimeout);
  _importSplashSafetyTimeout = setTimeout(() => {
    _importSplashSafetyTimeout = null;
    _doHideImportSplash();
  }, IMPORT_SPLASH_MAX_MS);
}

function hideImportSplash() {
  // Garandeer minimum-zichtbaarheid: als import sneller klaar is dan
  // IMPORT_SPLASH_MIN_MS, sluiten we pas wanneer de timer alsnog verlopen is.
  const elapsed = _importSplashShownAt ? Date.now() - _importSplashShownAt : IMPORT_SPLASH_MIN_MS;
  const remaining = Math.max(0, IMPORT_SPLASH_MIN_MS - elapsed);
  if (_importSplashHideTimeout) clearTimeout(_importSplashHideTimeout);
  if (remaining === 0) {
    _doHideImportSplash();
  } else {
    // Forceer dat alle fases zichtbaar geweest zijn — spring direct naar laatste fase.
    _importSplashPhase = IMPORT_SPLASH_PHASE_COUNT - 1;
    _renderImportSplashPhases(IMPORT_SPLASH_PHASE_COUNT - 1);
    const splash = document.getElementById("importSplash");
    if (splash) splash.classList.add("import-splash--ready");
    _importSplashHideTimeout = setTimeout(() => {
      _importSplashHideTimeout = null;
      _doHideImportSplash();
    }, remaining);
  }
}

async function submitImport(url, note, setFeedback, setLoading, onDone) {
  if (!validateUrl(url)) {
    setFeedback("Gebruik een geldige TikTok-, Instagram- of website-link.");
    return;
  }

  const inferredPlatform = inferPlatformFromUrl(url);
  if (inferredPlatform) {
    state.selectedPlatform = inferredPlatform;
    syncPlatformUI();
  }

  setLoading(true);
  setFeedback("Import is bezig: titel, ingrediënten en stappen worden opgeschoond...");
  showImportSplash(url);

  try {
    const data = await handleImport(url, note);
    const importedRecipe = normalizeImportedRecipe(data.recipe);

    const confirmWithAlt = ({ title, subtitle, confirmLabel, altLabel }) =>
      new Promise((resolve) => {
        showConfirm({
          title,
          subtitle,
          confirmLabel,
          altLabel,
          onConfirm: () => resolve("confirm"),
          onAlt: () => resolve("alt"),
        });
      });

    const normalizeImportUrlForDedup = (rawUrl) => {
      const raw = String(rawUrl || "").trim();
      if (!raw) return "";
      try {
        const u = new URL(raw);
        u.hash = "";
        const paramsToDrop = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"];
        paramsToDrop.forEach((p) => u.searchParams.delete(p));
        u.searchParams.sort?.();
        const host = u.hostname.replace(/^www\./, "").toLowerCase();
        const path = u.pathname.replace(/\/+$/, "");
        const search = u.searchParams.toString();
        return `${u.protocol}//${host}${path}${search ? `?${search}` : ""}`;
      } catch {
        return raw;
      }
    };

    const normalizeTitleForDedup = (title) =>
      normalizeImportedTitle(String(title || ""))
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .replace(/\s+/g, " ")
        .trim();

    const findDuplicateImportedRecipe = (candidate) => {
      const urlKey = normalizeImportUrlForDedup(candidate?.sourceUrl || "");
      const titleKey = normalizeTitleForDedup(candidate?.title || "");
      const saved = getSavedImportedRecipes();
      if (!saved.length) return null;

      if (urlKey) {
        const byUrl = saved.find((r) => normalizeImportUrlForDedup(r?.sourceUrl || "") === urlKey);
        if (byUrl) return { recipe: byUrl, reason: "url" };
      }
      if (titleKey) {
        const byTitle = saved.find((r) => normalizeTitleForDedup(r?.title || "") === titleKey);
        if (byTitle) return { recipe: byTitle, reason: "title" };
      }
      return null;
    };

    const applyOverwrite = (existing, incoming) => {
      if (!existing || !incoming) return;
      const keepId = existing.id;
      Object.assign(existing, { ...incoming, id: keepId, isSeed: false });
    };

    const dupe = findDuplicateImportedRecipe(importedRecipe);
    if (dupe?.recipe?.id) {
      const choice = await confirmWithAlt({
        title: "Dubbel recept gevonden",
        subtitle:
          dupe.reason === "url"
            ? "Dit recept lijkt al eerder geïmporteerd (zelfde link). Wil je het bestaande recept overschrijven of als nieuw bewaren?"
            : "Dit recept lijkt al eerder geïmporteerd (zelfde titel). Wil je het bestaande recept overschrijven of als nieuw bewaren?",
        confirmLabel: "Overschrijven",
        altLabel: "Nieuw bewaren",
      });

      if (choice === "confirm") {
        const existing = state.recipes.find((r) => r.id === dupe.recipe.id);
        if (existing) {
          applyOverwrite(existing, importedRecipe);
          state.selectedRecipeId = existing.id;
          state.currentServings = parseBaseServings(existing.servings);
          renderDetailRecipe(true);
          switchView("detail");
          trackClientEvent("client_import_success", { platform: inferredPlatform, mode: "overwrite" });
          onDone(existing);
          showToast("Bestaand recept is bijgewerkt.");
          return;
        }
      }
      // else: "Nieuw bewaren" -> continue as normal (preview)
    }

    // Keep as preview until user actually saves it to a cookbook
    importedRecipe._previewCreatedAt = Date.now();
    state.importPreviews[importedRecipe.id] = importedRecipe;
    state.selectedRecipeId = importedRecipe.id;
    state.currentServings = parseBaseServings(importedRecipe.servings);

    renderDetailRecipe(true);
    switchView("detail");

    if (importedRecipe.needsReview) {
      const choice = await confirmWithAlt({
        title: "Even nalopen?",
        subtitle: "Deze import lijkt nog onvolledig (weinig ingrediënten/stappen). Wil je 'm eerst reviewen?",
        confirmLabel: "Nalopen",
        altLabel: "Later",
      });
      if (choice === "confirm") {
        openImportReview(importedRecipe.id);
      }
    }

    trackClientEvent("client_import_success", {
      platform: inferredPlatform,
      mode: importedRecipe.needsReview ? "needs_review" : "ok",
    });
    onDone(importedRecipe);
  } catch (error) {
    const message = normalizeUiErrorMessage(error?.message || "");
    setFeedback(message);
    if (error?.code === "not_recipe" || /Je probeert een blog te importeren/i.test(message)) {
      showToast(message);
    }
  } finally {
    setLoading(false);
    hideImportSplash();
  }
}

function bindEvent(element, eventName, handler) {
  if (!element) {
    return;
  }
  element.addEventListener(eventName, handler);
}

// + button and filter button → navigate to import screen (universal import)
document.querySelectorAll("#openImportButton, #openImportButton2, #groceryImportButton, #mealplanImportButton, #profileImportButton").forEach((btn) => {
  if (btn) btn.addEventListener("click", () => {
    if (!state.auth.authenticated) {
      showAuthModal();
      return;
    }
    switchView("import");
  });
});

// Edit recipe button → open edit panel
if (reviewImportButton) {
  reviewImportButton.addEventListener("click", () => {
    if (state.view === "detail" && state.selectedRecipeId) {
      openRecipeEditPanel(state.selectedRecipeId);
    }
  });
}

platformButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.selectedPlatform = button.dataset.platformChoice;
    syncPlatformUI();
  });
});

platformCards.forEach((button) => {
  button.addEventListener("click", () => {
    state.selectedPlatform = button.dataset.platformChoice;
    syncPlatformUI();
  });
});

bindEvent(openFeaturedRecipeButton, "click", () => {
  state.selectedRecipeId = getHomeFeaturedRecipe().id;
  renderDetailRecipe(true);
  switchView("detail");
});
bindEvent(featuredCard, "click", () => {
  state.selectedRecipeId = getHomeFeaturedRecipe().id;
  renderDetailRecipe(true);
  switchView("detail");
});
bindEvent(featuredCard, "keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    state.selectedRecipeId = getHomeFeaturedRecipe().id;
    renderDetailRecipe(true);
    switchView("detail");
  }
});

bindEvent(groceryAddButton, "click", () => addRecipeToGrocery(getSelectedRecipe()));
bindEvent(addSelectedToGroceriesButton, "click", () => {
  addRecipeToGrocery(getSelectedRecipe());
  switchView("grocery");
});
bindEvent(clearGroceryListButton, "click", () => {
  state.groceryItems = [];
  renderGroceryGroups();
  persistGroceryItemsLocally(); // save [] to localStorage immediately
  persistAppState();            // save to server immediately (no delay)
  showToast("Boodschappenlijst leeggemaakt.");
});
bindEvent(addCustomGroceryButton, "click", addCustomGroceryItem);
bindEvent(groceryQuickAddTopButton, "click", addCustomGroceryItem);
// Recipe slider clicks
bindEvent(document.getElementById("recipeSlider"), "click", (event) => {
  const card = event.target.closest("[data-recipe-id]");
  if (!card) return;
  state.selectedRecipeId = card.dataset.recipeId;
  switchView("detail");
  renderDetailRecipe(true);
});

// "Bekijk alles" on recipe slider → show full recipe grid
bindEvent(document.getElementById("viewAllMyRecipesBtn"), "click", () => {
  const section = document.getElementById("recipeGridSection");
  if (section) section.style.display = "";
  state.activeCookbookFilter = null;
  state.searchQuery = "";
  renderCookbookFilterBar();
  renderRecipeGrid();
  document.getElementById("recipeGridSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Close recipe grid → scroll back to slider
bindEvent(document.getElementById("closeRecipeGridBtn"), "click", () => {
  const section = document.getElementById("recipeGridSection");
  if (section) section.style.display = "none";
  state.activeCookbookFilter = null;
  state.searchQuery = "";
  renderCookbookFilterBar();
  renderRecipeGrid();
  document.getElementById("recipeSlider")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

bindEvent(document.getElementById("viewAllImportsButton"), "click", () => {
  state.activeCookbookFilter = null;
  state.searchQuery = "";
  renderCookbookFilterBar();
  renderRecipeGrid();
  document.getElementById("recipeGrid")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
// "Mijn kookboeken > Bekijk alles" → go to Kookboeken tab
bindEvent(document.getElementById("viewAllCookbooksBtn"), "click", () => {
  switchView("cookbooks");
});
bindEvent(document.getElementById("groceryClearButton"), "click", () => {
  if (!state.groceryItems.length) return;
  showConfirm({
    title: "Boodschappenlijst leegmaken?",
    subtitle: "Alle items worden verwijderd.",
    confirmLabel: "Leegmaken",
    destructive: true,
    onConfirm: () => {
      state.groceryItems = [];
      renderGroceryGroups();
      renderNavBadge();
      persistGroceryItemsLocally();
      persistAppState();
      showToast("Boodschappenlijst is leeggemaakt.");
    },
  });
});
bindEvent(copyGroceryListButton, "click", () => {
  copyGroceryList().catch(() => {
    showToast("Kopiëren lukte niet.");
  });
});
bindEvent(groceryMoreButton, "click", () => {
  copyGroceryList().catch(() => {
    showToast("Kopiëren lukte niet.");
  });
});
// ── Grocery quick-add with real-time AH suggestions ─────────────────────────

let grocerySuggestTimeout = null;
let grocerySuggestIndex = -1;

function addGroceryItemByTitle(title, amount = "1 stuk", imageUrl = "") {
  if (!title) return;
  const existing = state.groceryItems.find(
    (item) => !item.checked && normalizeIngredientKey(item.title) === normalizeIngredientKey(title)
  );
  if (existing) {
    existing.amount = mergeAmountLabels(existing.amount, amount);
    if (imageUrl && !existing.imageUrl) existing.imageUrl = imageUrl;
  } else {
    state.groceryItems.unshift({
      id: `grocery-quick-${Date.now()}`,
      title,
      amount,
      imageUrl,
      recipeId: "",
      recipeTitle: "",
      recipeSourceUrl: "",
      recipePlatform: "website",
      group: getIngredientGroup(title),
      checked: false,
    });
  }
  if (groceryQuickInput) groceryQuickInput.value = "";
  closeSuggestDropdown();
  renderGroceryGroups();
  renderNavBadge();
  schedulePersistAppState();
}

function closeSuggestDropdown() {
  const dd = document.getElementById("grocerySuggestDropdown");
  if (dd) { dd.classList.add("hidden"); dd.innerHTML = ""; }
  grocerySuggestIndex = -1;
}

function renderSuggestDropdown(suggestions, rawQuery) {
  const dd = document.getElementById("grocerySuggestDropdown");
  if (!dd) return;

  if (!suggestions.length) {
    // Show a "just add it" fallback
    dd.innerHTML = `
      <button class="suggest-item suggest-item--plain" type="button" data-suggest-title="${escapeHtml(rawQuery)}" data-suggest-image="">
        <span class="suggest-item__name">${escapeHtml(rawQuery)}</span>
        <span class="suggest-item__meta">Zelf toevoegen</span>
      </button>`;
  } else {
    dd.innerHTML = suggestions.map((s, i) => `
      <button class="suggest-item" type="button" role="option"
        data-suggest-title="${escapeHtml(s.name)}"
        data-suggest-image="${escapeHtml(s.imageUrl || "")}"
        data-suggest-idx="${i}"
        aria-selected="false">
        <span class="suggest-item__badge">ah</span>
        <span class="suggest-item__name">${escapeHtml(s.name)}</span>
        ${s.price ? `<span class="suggest-item__price">${escapeHtml(s.price)}</span>` : ""}
      </button>`).join("") +
      `<button class="suggest-item suggest-item--plain" type="button" data-suggest-title="${escapeHtml(rawQuery)}" data-suggest-image="">
        <span class="suggest-item__name">"${escapeHtml(rawQuery)}" toevoegen</span>
      </button>`;
  }

  dd.classList.remove("hidden");

  dd.querySelectorAll(".suggest-item").forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
      e.preventDefault(); // don't blur the input
      addGroceryItemByTitle(btn.dataset.suggestTitle, "1 stuk", btn.dataset.suggestImage || "");
    });
  });
}

async function fetchGrocerySuggestions(query) {
  if (!query || query.length < 2) { closeSuggestDropdown(); return; }
  try {
    const resp = await fetch(`/api/grocery-suggest?q=${encodeURIComponent(query)}`);
    const data = await resp.json();
    if (document.getElementById("groceryQuickInput")?.value?.trim() === query) {
      renderSuggestDropdown(data.suggestions || [], query);
    }
  } catch {
    closeSuggestDropdown();
  }
}

if (groceryQuickInput) {
  groceryQuickInput.addEventListener("input", () => {
    const q = groceryQuickInput.value.trim();
    clearTimeout(grocerySuggestTimeout);
    if (!q) { closeSuggestDropdown(); return; }
    // Show a skeleton immediately so it feels instant
    const dd = document.getElementById("grocerySuggestDropdown");
    if (dd) {
      dd.innerHTML = `<p class="suggest-loading">Zoeken…</p>`;
      dd.classList.remove("hidden");
    }
    grocerySuggestTimeout = setTimeout(() => fetchGrocerySuggestions(q), 350);
  });

  groceryQuickInput.addEventListener("keydown", (event) => {
    const dd = document.getElementById("grocerySuggestDropdown");
    const items = dd ? [...dd.querySelectorAll(".suggest-item")] : [];

    if (event.key === "ArrowDown") {
      event.preventDefault();
      grocerySuggestIndex = Math.min(grocerySuggestIndex + 1, items.length - 1);
      items.forEach((el, i) => el.setAttribute("aria-selected", i === grocerySuggestIndex ? "true" : "false"));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      grocerySuggestIndex = Math.max(grocerySuggestIndex - 1, -1);
      items.forEach((el, i) => el.setAttribute("aria-selected", i === grocerySuggestIndex ? "true" : "false"));
      return;
    }
    if (event.key === "Escape") {
      closeSuggestDropdown();
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (grocerySuggestIndex >= 0 && items[grocerySuggestIndex]) {
        addGroceryItemByTitle(items[grocerySuggestIndex].dataset.suggestTitle);
      } else {
        const val = groceryQuickInput.value.trim();
        if (val) addGroceryItemByTitle(val);
      }
    }
  });

  groceryQuickInput.addEventListener("blur", () => {
    // Small delay so mousedown on a suggestion can fire first
    setTimeout(closeSuggestDropdown, 150);
  });
}
bindEvent(clearGroceryToolbarButton, "click", () => {
  state.groceryItems = [];
  renderGroceryGroups();
  schedulePersistAppState();
  showToast("Boodschappenlijst leeggemaakt.");
});
bindEvent(closeImportSecondaryButton, "click", () => closeModal());
bindEvent(orderAHButton, "click", () => openStoreBasket("albert-heijn"));
bindEvent(kookstandButton, "click", () => {
  const recipe = getSelectedRecipe();
  if (recipe) openKookstand(recipe.id);
});
bindEvent(wakeLockButton, "click", toggleWakeLock);
bindEvent(cookModeButton, "click", toggleCookMode);
bindEvent(cookModePrevButton, "click", () => {
  const recipe = getSelectedRecipe();
  const progress = getRecipeProgress(recipe.id);
  setCookModeStep(progress.currentStep - 1);
});
bindEvent(cookModeNextButton, "click", () => {
  const recipe = getSelectedRecipe();
  const progress = getRecipeProgress(recipe.id);
  setCookModeStep(progress.currentStep + 1);
});
bindEvent(cookModeResetButton, "click", () => {
  setCookModeStep(0);
});

bindEvent(kookstandCloseButton, "click", () => {
  closeKookstand();
});
bindEvent(kookstandBackdrop, "click", () => {
  closeKookstand();
});
bindEvent(kookstandPrevButton, "click", () => {
  setKookstandStep(state.kookstandStepIndex - 1);
});
bindEvent(kookstandNextButton, "click", () => {
  setKookstandStep(state.kookstandStepIndex + 1);
});
bindEvent(kookstandToggleIngredientsButton, "click", () => {
  state.kookstandShowIngredients = !state.kookstandShowIngredients;
  renderKookstand();
});
bindEvent(kookstandHideIngredientsButton, "click", () => {
  state.kookstandShowIngredients = false;
  renderKookstand();
});
bindEvent(kookstandIngredientList, "click", (event) => {
  const btn = event.target.closest("[data-kookstand-ingredient-index]");
  if (!(btn instanceof HTMLElement)) return;
  const index = Number(btn.dataset.kookstandIngredientIndex);
  if (!Number.isFinite(index)) return;
  toggleIngredientChecked(index);
  renderKookstand();
});

bindEvent(document.getElementById("kookstandJumpToggle"), "click", () => {
  state.kookstandJumpOpen = !state.kookstandJumpOpen;
  renderKookstand();
});
bindEvent(document.getElementById("kookstandJumpList"), "click", (event) => {
  const btn = event.target.closest("[data-kookstand-jump-index]");
  if (!(btn instanceof HTMLElement)) return;
  const idx = Number(btn.dataset.kookstandJumpIndex);
  if (!Number.isFinite(idx)) return;
  state.kookstandJumpOpen = false;
  setKookstandStep(idx);
});
bindEvent(document.getElementById("kookstandStepDone"), "click", () => {
  const recipe = getRecipeById(state.kookstandRecipeId) || getSelectedRecipe();
  if (!recipe) return;
  toggleStepChecked(recipe.id, state.kookstandStepIndex);
  renderKookstand();
});
brandHomeButtons.forEach((button) => {
  button.addEventListener("click", goHome);
});
bindEvent(shareRecipeButton, "click", shareSelectedRecipe);
bindEvent(favoriteRecipeButton, "click", () => {
  const recipe = getSelectedRecipe();
  if (recipe) toggleRecipeFavorite(recipe.id);
});

bindEvent(topbarFavoriteButton, "click", () => {
  const recipe = getSelectedRecipe();
  if (recipe) toggleRecipeFavorite(recipe.id);
});

bindEvent(checkAllIngredientsButton, "click", () => {
  checkAllIngredients();
});

bindEvent(detailIngredientList, "click", (event) => {
  const btn = event.target.closest("[data-detail-ingredient-index]");
  if (!(btn instanceof HTMLElement)) return;
  const index = Number(btn.dataset.detailIngredientIndex);
  if (!Number.isFinite(index)) return;
  toggleIngredientChecked(index);
});

bindEvent(ingredientSwapList, "click", (event) => {
  const btn = event.target.closest("[data-swap-from][data-swap-to]");
  if (!(btn instanceof HTMLElement)) return;
  const recipe = getSelectedRecipe();
  if (!recipe) return;
  applyIngredientSwapToGroceryList({
    recipeId: recipe.id,
    from: btn.dataset.swapFrom,
    to: btn.dataset.swapTo,
  });
});

bindEvent(uncheckAllIngredientsButton, "click", () => {
  uncheckAllIngredients();
});

function quickSaveSelectedRecipeToLastUsed() {
  const recipe = getSelectedRecipe();
  if (!recipe) return;
  const preferredId = String(state.selectedCookbookId || "").trim();
  const preferred = preferredId ? getCookbookById(preferredId) : null;
  if (!preferred?.id) {
    openCookbookSaveModal(recipe.id);
    return;
  }
  const alreadyInPreferred = preferred.recipeIds?.includes?.(recipe.id);
  if (alreadyInPreferred) {
    openCookbookSaveModal(recipe.id);
    return;
  }
  saveRecipeToCookbook(recipe.id, preferred.id);
}

function bindCookbookQuickSaveButton(button) {
  if (!(button instanceof HTMLElement)) return;
  let longPressTimer = 0;
  let longPressed = false;
  const clear = () => {
    window.clearTimeout(longPressTimer);
    longPressTimer = 0;
  };
  const start = () => {
    clear();
    longPressed = false;
    longPressTimer = window.setTimeout(() => {
      longPressed = true;
      const recipe = getSelectedRecipe();
      if (recipe) openCookbookSaveModal(recipe.id);
    }, 420);
  };
  const end = () => {
    const fired = longPressed;
    clear();
    if (!fired) {
      quickSaveSelectedRecipeToLastUsed();
    }
  };
  button.addEventListener("pointerdown", start);
  button.addEventListener("pointerup", end);
  button.addEventListener("pointercancel", clear);
  button.addEventListener("contextmenu", (e) => e.preventDefault());
}

bindCookbookQuickSaveButton(saveRecipeButton);
bindCookbookQuickSaveButton(detailSaveHeaderButton);
bindEvent(document.getElementById("deleteRecipeButton"), "click", () => {
  const recipe = getSelectedRecipe();
  if (!recipe || SEED_RECIPE_IDS.has(recipe.id) || recipe.isSeed) return;
  showConfirm({
    title: "Recept verwijderen?",
    subtitle: `"${recipe.title}" wordt definitief verwijderd. Dit kan niet ongedaan worden gemaakt.`,
    confirmLabel: "Verwijderen",
    destructive: true,
    onConfirm: () => {
      trackClientEvent("client_recipe_deleted", {
        was_preview: Boolean(state.importPreviews?.[recipe.id]),
        in_cookbooks: state.cookbooks.filter((cb) => (cb.recipeIds || []).includes(recipe.id)).length,
      });
      // Remove from recipes list
      state.recipes = state.recipes.filter((r) => r.id !== recipe.id);
      // Remove from all cookbooks
      state.cookbooks.forEach((cb) => {
        cb.recipeIds = cb.recipeIds.filter((id) => id !== recipe.id);
      });
      if (state.importPreviews?.[recipe.id]) delete state.importPreviews[recipe.id];
      // Reset selectedRecipeId to first remaining recipe
      if (state.selectedRecipeId === recipe.id) {
        state.selectedRecipeId = state.recipes[0]?.id || "";
      }
      schedulePersistAppState();
      renderAll();
      switchView("home");
      showToast(`"${recipe.title}" is verwijderd.`);
    },
  });
});

// Bug report button - report import errors
bindEvent(document.getElementById("reportBugButton"), "click", () => {
  const recipe = getSelectedRecipe();
  if (!recipe) return;
  showConfirm({
    title: "Importfout melden?",
    subtitle: `Iets niet goed gegaan bij het importeren van "${recipe.title}"? We sturen de details naar het Plately team zodat we het kunnen verbeteren.`,
    confirmLabel: "Melden",
    onConfirm: () => {
      const subject = encodeURIComponent(`Importfout: ${recipe.title}`);
      const body = encodeURIComponent(
        `Hallo Plately team,\n\nIk had een probleem met het importeren van dit recept.\n\nRecept: ${recipe.title}\nBron: ${recipe.sourceUrl || "(onbekend)"}\nPlatform: ${recipe.platform || "(onbekend)"}\n\nWat ging er mis?\n(Beschrijf hier wat er niet klopt aan het geïmporteerde recept)\n\n--\nVerstuurd vanuit de Plately app`
      );
      window.location.href = `mailto:pradix@me.com?subject=${subject}&body=${body}`;
      showToast("Bedankt! Je e-mailprogramma wordt geopend.");
    },
  });
});
// ── Profile sub-panels ──────────────────────────────────────────────────────

function openProfileSubPanel(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  // Scroll main window to top to prevent jump effect when panel opens
  scrollToTopSoon();
  panel.classList.add("profile-subpanel--active");
  panel.setAttribute("aria-hidden", "false");
  // Scroll panel to top to avoid showing content from previous state
  panel.scrollTop = 0;

  // Show processing notice only if user has pending (not approved) custom channels
  if (id === "profileSubChannels") {
    const notice = document.querySelector(".channel-processing-notice");
    if (notice) {
      // Only show if there are pending channels
      const hasPendingChannels = state.customChannels.some((ch) => ch.status === "pending");
      notice.style.display = hasPendingChannels ? "flex" : "none";
    }
  }
}

function closeProfileSubPanel(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  panel.classList.remove("profile-subpanel--active");
  panel.setAttribute("aria-hidden", "true");
  // Keep main window at top when closing panel
  scrollToTopSoon();
}

// Helper: resize an image File/Blob to a compact JPEG data URL
function resizeImageToDataUrl(file, maxSize = 320) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Update "foto verwijderen" button visibility
function syncRemovePhotoBtn() {
  const btn = document.getElementById("profileRemovePhotoBtn");
  if (btn) btn.style.display = state.profile.photo ? "" : "none";
}

// "Mijn account" – open panel and pre-fill fields
bindEvent(profileEditButton, "click", () => {
  const nameInput = document.getElementById("profileSubNameInput");
  const emailInput = document.getElementById("profileSubEmailInput");
  const genderInput = document.getElementById("profileSubGenderInput");
  const birthDateInput = document.getElementById("profileSubBirthDateInput");
  if (nameInput) nameInput.value = state.profile.name || "";
  if (emailInput) emailInput.value = state.profile.email || state.profile.handle?.replace(/^@/, "") || "";
  if (genderInput) genderInput.value = state.profile.gender || "";
  if (birthDateInput) birthDateInput.value = state.profile.birthDate || "";
  renderAvatars();
  syncRemovePhotoBtn();
  openProfileSubPanel("profileSubAccount");
});

// Camera button → trigger file picker
bindEvent(document.getElementById("profileSubAvatarBtn"), "click", () => {
  document.getElementById("profileAvatarFileInput")?.click();
});

// Also allow tapping the avatar itself
bindEvent(document.getElementById("profileSubAvatarDisplay"), "click", () => {
  document.getElementById("profileAvatarFileInput")?.click();
});

// File chosen → resize + store
bindEvent(document.getElementById("profileAvatarFileInput"), "change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const dataUrl = await resizeImageToDataUrl(file, 320);
    state.profile.photo = dataUrl;
    renderAvatars();
    syncRemovePhotoBtn();
    schedulePersistAppState();
    showToast("Foto bijgewerkt.");
  } catch {
    showToast("Foto laden mislukt.");
  }
  // Reset so same file can be picked again
  e.target.value = "";
});

// Remove photo
bindEvent(document.getElementById("profileRemovePhotoBtn"), "click", () => {
  state.profile.photo = "";
  renderAvatars();
  syncRemovePhotoBtn();
  schedulePersistAppState();
  showToast("Foto verwijderd.");
});

// Save "Mijn account" changes
bindEvent(document.getElementById("profileSubAccountSave"), "click", () => {
  const nameInput = document.getElementById("profileSubNameInput");
  const emailInput = document.getElementById("profileSubEmailInput");
  const genderInput = document.getElementById("profileSubGenderInput");
  const birthDateInput = document.getElementById("profileSubBirthDateInput");
  const newName = (nameInput?.value || "").trim();
  const newEmail = (emailInput?.value || "").trim();
  const newGender = (genderInput?.value || "").trim();
  const newBirthDate = (birthDateInput?.value || "").trim();
  if (newName) state.profile.name = newName;
  if (newEmail) state.profile.email = newEmail;
  if (newGender) state.profile.gender = newGender;
  if (newBirthDate) state.profile.birthDate = newBirthDate;
  renderProfileSummary();
  schedulePersistAppState();
  closeProfileSubPanel("profileSubAccount");
  showToast("Profiel bijgewerkt.");
});

// Back buttons
bindEvent(document.getElementById("profileSubAccountBack"), "click", () => closeProfileSubPanel("profileSubAccount"));
bindEvent(document.getElementById("profileSubChannelsBack"), "click", () => closeProfileSubPanel("profileSubChannels"));
bindEvent(document.getElementById("profileSubChannelsSave"), "click", () => {
  schedulePersistAppState();
  closeProfileSubPanel("profileSubChannels");
  showToast("Kanalen opgeslagen.");
});
bindEvent(document.getElementById("profileSubLanguageBack"), "click", () => closeProfileSubPanel("profileSubLanguage"));
bindEvent(document.getElementById("profileSubChangelogBack"), "click", () => closeProfileSubPanel("profileSubChangelog"));
bindEvent(document.getElementById("profileSubNotificationsBack"), "click", () => closeProfileSubPanel("profileSubNotifications"));

// Language option selection (select but don't save yet)
bindEvent(document.getElementById("profileSubLanguage"), "click", (e) => {
  const btn = e.target.closest(".language-option");
  if (!btn) return;
  const lang = btn.dataset.lang;
  if (lang) {
    state.language = lang;
    updateLanguagePanel();
  }
});

// Language save button
bindEvent(document.getElementById("profileSubLanguageSave"), "click", () => {
  schedulePersistAppState();
  closeProfileSubPanel("profileSubLanguage");

  // Re-render UI with new language
  renderAll();

  // Show confirmation toast
  showToast(state.language === "nl" ? "Taal opgeslagen." : "Language saved.");
});

// Password change button
bindEvent(document.getElementById("goToPasswordChangeBtn"), "click", () => {
  // Clear password fields when opening
  const currentInput = document.getElementById("passwordCurrentInput");
  const newInput = document.getElementById("passwordNewInput");
  const confirmInput = document.getElementById("passwordConfirmInput");
  if (currentInput) currentInput.value = "";
  if (newInput) newInput.value = "";
  if (confirmInput) confirmInput.value = "";
  openProfileSubPanel("profileSubPasswordChange");
});

// Password change back button
bindEvent(document.getElementById("profileSubPasswordChangeBack"), "click", () => closeProfileSubPanel("profileSubPasswordChange"));

// Password change save button
bindEvent(document.getElementById("profileSubPasswordChangeSave"), "click", async () => {
  const currentInput = document.getElementById("passwordCurrentInput");
  const newInput = document.getElementById("passwordNewInput");
  const confirmInput = document.getElementById("passwordConfirmInput");

  const currentPassword = (currentInput?.value || "").trim();
  const newPassword = (newInput?.value || "").trim();
  const confirmPassword = (confirmInput?.value || "").trim();

  // Validation
  if (!currentPassword) {
    showToast("Voer je huidigie wachtwoord in.");
    return;
  }
  if (!newPassword) {
    showToast("Voer je nieuwe wachtwoord in.");
    return;
  }
  if (newPassword.length < 8) {
    showToast("Wachtwoord moet minstens 8 tekens zijn.");
    return;
  }
  if (newPassword !== confirmPassword) {
    showToast("Wachtwoorden komen niet overeen.");
    return;
  }

  try {
    const response = await fetchJson("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    if (response.success) {
      showToast("Wachtwoord succesvol gewijzigd.");
      closeProfileSubPanel("profileSubPasswordChange");
      // Clear inputs
      if (currentInput) currentInput.value = "";
      if (newInput) newInput.value = "";
      if (confirmInput) confirmInput.value = "";
    } else {
      showToast(response.message || "Wachtwoord wijzigen mislukt.");
    }
  } catch (error) {
    showToast("Fout bij wachtwoord wijzigen.");
    console.error("Password change error:", error);
  }
});

bindEvent(premiumButton, "click", () => showToast("Premium preview staat klaar voor later."));
bindEvent(openRegisterButton, "click", () => openAuthModal("register"));
bindEvent(openLoginButton, "click", () => openAuthModal("login"));
// Profile login banner buttons
bindEvent(document.getElementById("profileLoginBtn"), "click", () => openAuthModal("login"));
bindEvent(document.getElementById("profileRegisterBtn"), "click", () => openAuthModal("register"));
bindEvent(logoutButton, "click", () => {
  logoutAccount().catch(() => {
    showToast("Uitloggen lukte niet.");
  });
});
bindEvent(shareProfileButton, "click", async () => {
  const profileUrl = window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Plately profiel",
        text: "Bekijk mijn recepten en kookboeken in Plately",
        url: profileUrl,
      });
      return;
    } catch {
      // ignore
    }
  }

  try {
    await navigator.clipboard.writeText(profileUrl);
    showToast("Profiellink gekopieerd.");
  } catch {
    showToast("Profiel delen lukte niet.");
  }
});

window.addEventListener("beforeunload", (e) => {
  if (importReviewLeaveShouldWarn()) {
    e.preventDefault();
    e.returnValue = "";
  }
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    // If clicking settings while in settings, close any open sub-panel
    if (item.dataset.view === "settings" && state.view === "settings") {
      // Close all open sub-panels
      document.querySelectorAll(".profile-subpanel--active").forEach((panel) => {
        panel.classList.remove("profile-subpanel--active");
        panel.setAttribute("aria-hidden", "true");
      });
      return;
    }
    switchView(item.dataset.view);
  });
});

// Home avatar → instellingen (op ELKE pagina, niet alleen home)
document.querySelectorAll(".home-avatar").forEach((avatar) => {
  avatar.addEventListener("click", () => {
    const view = avatar.dataset.view || "settings";
    switchView(view);
  });
});

// Kanaal-knoppen → open URL
document.getElementById("channelRow")?.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-channel-url]");
  if (btn instanceof HTMLElement && btn.dataset.channelUrl) {
    window.open(btn.dataset.channelUrl, "_blank", "noopener");
  }
});

function tryAdjustDetailServings(delta) {
  const recipe = getSelectedRecipe();
  if (!recipe || state.view !== "detail") return;
  const next = state.currentServings + delta;
  if (next < 1 || next > 20) return;

  const base = parseBaseServings(recipe.servings);
  const oldN = state.currentServings;
  if (next === oldN) return;

  const hasGroceryForRecipe = state.groceryItems.some(
    (item) => item && item.recipeId === recipe.id && !item.checked
  );

  if (hasGroceryForRecipe) {
    const ratio = next / oldN;
    const pct = Math.round((ratio - 1) * 100);
    const factorLabel =
      Math.abs(ratio - 1) < 0.001
        ? "gelijk"
        : ratio > 1
          ? `ongeveer ${pct > 0 ? "+" : ""}${pct}% meer ingrediënt op je lijst`
          : `ongeveer ${Math.abs(pct)}% minder ingrediënt op je lijst`;
    const doubling =
      Math.abs(ratio - 2) < 0.05 ? " (ongeveer dubbele hoeveelheden)" : Math.abs(ratio - 0.5) < 0.05 ? " (ongeveer halve hoeveelheden)" : "";

    const ok = window.confirm(
      `Personen: ${oldN} → ${next} (recept is oorspronkelijk voor ${base} pers.).\n\n` +
        `Hoeveelheden op je boodschappenlijst voor dit recept worden meegeschaald${
          doubling || ` (${factorLabel})`
        }.\n\nDoorgaan?`
    );
    if (!ok) return;
    rescaleGroceryAmountsForRecipe(recipe.id, ratio);
    schedulePersistAppState();
    renderGroceryGroups();
    if (state.basketPreview) {
      scheduleRefetchBasketWithPreferences();
    }
  }

  state.currentServings = next;
  renderDetailRecipe(false);
}

bindEvent(servingsDown, "click", () => tryAdjustDetailServings(-1));

bindEvent(servingsUp, "click", () => tryAdjustDetailServings(1));

bindEvent(searchInput, "input", (event) => {
  // Debounced channel search — short pause after typing to batch requests
  clearTimeout(channelSearchTimeout);
  const query = event.target.value.trim();
  state.channelSearchQuery = query;
  if (query.length === 0) {
    ensureChannelSearchClosed();
    if (state.view === "home" && document.activeElement === searchInput) {
      showHomeFocusPanel();
    }
    return;
  }
  // Once typing starts, hide the focus panel so it doesn't cover results
  hideHomeFocusPanel();
  if (query.length < 2) {
    return;
  }

  // Reset filter when starting a new search so results aren't hidden by old filter
  state.channelSearchFilter = null;

  channelSearchTimeout = setTimeout(() => searchChannels(query), CHANNEL_SEARCH_DEBOUNCE_MS);
});

bindEvent(searchInput, "keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    clearTimeout(channelSearchTimeout);
    hideHomeFocusPanel();
    searchChannels(searchInput?.value || "");
  }
  if (event.key === "Escape") {
    searchInput.value = "";
    ensureChannelSearchClosed();
    hideHomeFocusPanel();
  }
});

bindEvent(searchInput, "focus", () => {
  if (state.view === "home" && (searchInput?.value || "").trim().length === 0) {
    showHomeFocusPanel();
  }
});

bindEvent(searchInput, "blur", () => {
  // Delay so taps inside the focus panel still register before it hides
  setTimeout(() => {
    const panel = document.getElementById("homeFocusPanel");
    if (!panel) return;
    if (panel.contains(document.activeElement)) return;
    if (document.activeElement === searchInput) return;
    hideHomeFocusPanel();
  }, 180);
});

// Home quick chips (generated on load + when re-entering home)
renderHomeQuickChips();

const openConceptsImportReviewBtn = document.getElementById("openConceptsImportReviewBtn");
if (openConceptsImportReviewBtn) {
  bindEvent(openConceptsImportReviewBtn, "click", () => {
    const list = getImportPreviewList();
    const first = list[0];
    if (first?.id) {
      openImportReview(first.id);
    } else {
      showToast("Geen open concepten.");
    }
  });
}

bindEvent(homeSearchChipsWrap, "click", (event) => {
  const chip = event.target.closest("[data-home-search-chip]");
  if (!(chip instanceof HTMLElement)) return;
  if (!searchInput) return;
  searchInput.value = chip.dataset.homeSearchChip || chip.textContent.trim();
  searchInput.focus();
  searchInput.dispatchEvent(new Event("input", { bubbles: true }));
});

if (homeSearchChipsMore) {
  const iconSlot = homeSearchChipsMore.querySelector(".home-search-more-suggestions__icon");
  if (iconSlot) iconSlot.innerHTML = WISSEL_SVG;

  homeSearchChipsMore.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      renderHomeQuickChips();
    },
    { capture: true }
  );
}

// Focus-state panel: intent chips, recent searches, and recent recipes
bindEvent(document.getElementById("homeFocusPanel"), "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const intent = target.closest("[data-home-intent]");
  if (intent instanceof HTMLElement) {
    runHomeSearchQuery(intent.dataset.homeIntent || "");
    return;
  }
  const recent = target.closest("[data-home-recent-search]");
  if (recent instanceof HTMLElement) {
    runHomeSearchQuery(recent.dataset.homeRecentSearch || "");
    return;
  }
  const recipeBtn = target.closest("[data-home-recent-recipe]");
  if (recipeBtn instanceof HTMLElement) {
    const id = recipeBtn.dataset.homeRecentRecipe;
    if (id && getRecipeById(id)) {
      state.selectedRecipeId = id;
      hideHomeFocusPanel();
      if (searchInput) searchInput.blur();
      renderDetailRecipe(true);
      switchView("detail");
    }
  }
});

// Close channel search panel
bindEvent(document.getElementById("channelSearchClose"), "click", () => {
  if (searchInput) searchInput.value = "";
  ensureChannelSearchClosed();
  renderQuickRecipeGrid();
  renderRecipeGrid();
  hideHomeFocusPanel();
});

bindEvent(document.getElementById("channelSearchSection"), "click", (event) => {
  const openCh = event.target.closest("[data-open-channel-settings]");
  if (openCh instanceof HTMLElement) {
    switchView("settings");
    renderChannelSettings();
    openProfileSubPanel("profileSubChannels");
    return;
  }
  const chip = event.target.closest("[data-ch-filter]");
  if (!(chip instanceof HTMLElement) || !chip.hasAttribute("data-ch-filter")) return;
  const filter = chip.dataset.chFilter || null;
  renderChannelSearchResults(null, filter);
});

// Import button inside channel search results
bindEvent(channelSearchResults, "click", async (event) => {
  const btn = event.target.closest(".ch-card__import");
  if (!(btn instanceof HTMLElement)) return;
  const url = btn.dataset.channelImportUrl;
  if (!url) return;
  const imageHint = btn.dataset.channelImportThumb || "";

  btn.disabled = true;
  btn.innerHTML = getChannelImportLoadingMarkup();

  showImportSplash(url);
  try {
    const resp = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, imageHint }),
    });
    const data = await resp.json();
    if (!resp.ok || !data.recipe)
      throw new Error(data.message || data.error || "Importeren mislukt");
    const recipe = normalizeImportedRecipe({ ...data.recipe, needsReview: true });
    // Keep as preview until user actually saves it to a cookbook
    recipe._previewCreatedAt = Date.now();
    state.importPreviews[recipe.id] = recipe;
    state.selectedRecipeId = recipe.id;
    trackClientEvent("client_channel_search_import", {
      surface: "home_search",
      host: hostnameForAnalytics(url),
    });
    openImportReview(recipe.id);
    showToast(`${recipe.title} klaar om na te lopen.`);
    // Clear search and force-close the channel-search panel so it isn't
    // left visible when the user navigates back to home after the import.
    if (searchInput) searchInput.value = "";
    state.searchQuery = "";
    ensureChannelSearchClosed();
    hideHomeFocusPanel();
  } catch (err) {
    showToast(err.message || "Importeren mislukt");
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`;
  } finally {
    hideImportSplash();
  }
});

[reviewTitleInput, reviewDescriptionInput, reviewTimeInput, reviewServingsInput, reviewMealTagInput, reviewIngredientsInput, reviewInstructionsInput]
  .filter(Boolean)
  .forEach((field) => {
    field.addEventListener("input", () => {
      renderReviewAnalysis();
    });
  });

document.getElementById("cookbookFilterBar")?.addEventListener("click", (event) => {
  const chip = event.target.closest("[data-cookbook-filter]");
  if (!(chip instanceof HTMLElement)) return;
  const val = chip.dataset.cookbookFilter;
  state.activeCookbookFilter = val || null;
  renderCookbookFilterBar();
  renderRecipeGrid();
});

bindEvent(recipeGrid, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const card = target.closest("[data-recipe-id]");
  if (!(card instanceof HTMLElement)) {
    return;
  }

  state.selectedRecipeId = card.dataset.recipeId;
  renderDetailRecipe(true);
  switchView("detail");
});

bindEvent(quickRecipeGrid, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const card = target.closest("[data-recipe-id]");
  if (!(card instanceof HTMLElement)) {
    return;
  }

  state.selectedRecipeId = card.dataset.recipeId;
  renderDetailRecipe(true);
  switchView("detail");
});

if (recentImportList) {
  recentImportList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const card = target.closest("[data-review-recipe-id]");
    if (!(card instanceof HTMLElement)) {
      return;
    }

    openImportReview(card.dataset.reviewRecipeId);
  });
}

bindEvent(reviewSuggestions, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const action = target.closest("[data-review-apply]");
  if (!(action instanceof HTMLElement)) {
    return;
  }

  applyReviewSuggestion(action.dataset.reviewApply, action.dataset.reviewValue || "");
});

bindEvent(groceryGroups, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  // Handle delete action
  const actionBtn = target.closest(".grocery-entry-action");
  if (actionBtn instanceof HTMLElement) {
    const groceryId = actionBtn.dataset.groceryId;
    const itemIndex = state.groceryItems.findIndex((item) => item.id === groceryId);

    if (itemIndex === -1) return;

    state.groceryItems.splice(itemIndex, 1);
    renderGroceryGroups();
    schedulePersistAppState();
    return;
  }

  const entry = target.closest("[data-grocery-id]");
  if (!(entry instanceof HTMLElement)) {
    return;
  }

  const groceryItem = state.groceryItems.find((item) => item.id === entry.dataset.groceryId);
  if (!groceryItem) {
    return;
  }

  // Animate before toggle
  entry.classList.add("is-checking");
  setTimeout(() => {
    groceryItem.checked = !groceryItem.checked;
    renderGroceryGroups();
    schedulePersistAppState();
  }, 160);
});

bindEvent(detailStepList, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const stepCheckBtn = target.closest("[data-step-check]");
  if (stepCheckBtn instanceof HTMLElement) {
    const idx = Number(stepCheckBtn.dataset.stepCheck);
    const recipe = getSelectedRecipe();
    if (recipe && Number.isFinite(idx)) {
      toggleStepChecked(recipe.id, idx);
      renderDetailRecipe(false);
    }
    return;
  }
});

// Basket servings controls (+ bevestiging vóór schalen AH-mand)
function tryAdjustBasketServings(delta) {
  const preview = state.basketPreview;
  if (!preview) return;
  const next = state.basketServings + delta;
  if (next < 1 || next > 24) return;
  if (next === state.basketServings) return;

  const isAh = preview.store === "albert-heijn";
  const hasItems = Array.isArray(preview.items) && preview.items.length > 0;
  if (isAh && hasItems) {
    const oldN = state.basketServings;
    const base = state.basketBaseServings || 2;
    const ok = window.confirm(
      `Porties voor de mand: ${oldN} → ${next} personen (t.o.v. ${base} pers. in het recept).\n\n` +
        `Hoeveelheden en prijzen in dit overzicht schalen mee. Doorgaan?`
    );
    if (!ok) return;
  }

  state.basketServings = next;
  renderBasketPreview();
}

bindEvent(document.getElementById("basketServingsMinus"), "click", () => tryAdjustBasketServings(-1));
bindEvent(document.getElementById("basketServingsPlus"), "click", () => tryAdjustBasketServings(1));

// Bio toggle (only filter chip in basket sheet; per-item Wissel handles diet variants)
bindEvent(document.getElementById("basketFilterRow"), "click", (e) => {
  const chip = e.target.closest("[data-filter]");
  if (!chip) return;
  const f = chip.dataset.filter;
  if (f === "bio") {
    state.basketFilter.bio = !state.basketFilter.bio;
    trackClientEvent("client_ah_bio_toggle", { active: state.basketFilter.bio });
  }
  scheduleRefetchBasketWithPreferences();
});

// Basket overlay close
bindEvent(document.getElementById("basketOverlayClose"), "click", closeBasketModal);
bindEvent(document.getElementById("basketOverlay"), "click", (e) => {
  if (e.target === document.getElementById("basketOverlay")) closeBasketModal();
});

// Removed: bulk optimization buttons (Goedkoopste / BONUS / Bio)

// Basket product interactions (delete, qty, swap)
bindEvent(document.getElementById("basketSheetList"), "click", async (e) => {
  const target = e.target;
  if (!(target instanceof Element) || !state.basketPreview) return;

  const btn = target.closest(
    "[data-basket-delete],[data-basket-qty-minus],[data-basket-qty-plus],[data-basket-wissel],[data-basket-pantry-qty-minus],[data-basket-pantry-qty-plus]"
  );
  if (!btn) return;

  // Optional pantry qty controls (0 -> optional, 1+ -> promote to main list)
  if (btn instanceof HTMLElement && btn.dataset.basketPantryQtyPlus !== undefined) {
    const title = String(btn.dataset.basketPantryQtyPlus || "").trim();
    await setOptionalPantryQty(title, 1);
    return;
  }
  if (btn instanceof HTMLElement && btn.dataset.basketPantryQtyMinus !== undefined) {
    const title = String(btn.dataset.basketPantryQtyMinus || "").trim();
    await setOptionalPantryQty(title, 0);
    return;
  }

  // Delete item
  if (btn.dataset.basketDelete !== undefined) {
    const idx = parseInt(btn.dataset.basketDelete, 10);
    state.basketPreview.items.splice(idx, 1);
    if (!state.basketPreview.items.length) { closeBasketModal(); return; }
    renderBasketPreview();
    return;
  }

  // Qty minus
  if (btn.dataset.basketQtyMinus !== undefined) {
    const idx = parseInt(btn.dataset.basketQtyMinus, 10);
    const item = state.basketPreview.items[idx];
    if (item) {
      const recipeId = state.selectedRecipeId || "";
      const pantryMap = recipeId ? state.basketOptionalQtyByRecipe?.[recipeId] : null;
      const key = normalizeIngredientKey(item.ingredientTitle || "");
      const isPantryOptional = Boolean(pantryMap && key && (Number(pantryMap[key]) || 0) > 0);
      if (isPantryOptional) {
        const nextQty = Math.max(0, (item.qty || 1) - 1);
        await setOptionalPantryQty(item.ingredientTitle || "", nextQty);
      } else {
        item.qty = Math.max(1, (item.qty || 1) - 1);
        const qtyEl = document.getElementById(`basket-qty-${idx}`);
        if (qtyEl) qtyEl.textContent = item.qty;
        renderBasketPreview();
      }
    }
    return;
  }

  // Qty plus
  if (btn.dataset.basketQtyPlus !== undefined) {
    const idx = parseInt(btn.dataset.basketQtyPlus, 10);
    const item = state.basketPreview.items[idx];
    if (item) {
      const recipeId = state.selectedRecipeId || "";
      const pantryMap = recipeId ? state.basketOptionalQtyByRecipe?.[recipeId] : null;
      const key = normalizeIngredientKey(item.ingredientTitle || "");
      const isPantryOptional = Boolean(pantryMap && key && (Number(pantryMap[key]) || 0) > 0);
      if (isPantryOptional) {
        const nextQty = (item.qty || 1) + 1;
        await setOptionalPantryQty(item.ingredientTitle || "", nextQty);
      } else {
        item.qty = (item.qty || 1) + 1;
        const qtyEl = document.getElementById(`basket-qty-${idx}`);
        if (qtyEl) qtyEl.textContent = item.qty;
        renderBasketPreview();
      }
    }
    return;
  }

  // Wissel: open the "Kies een alternatief" full-screen sheet for this item
  if (btn.dataset.basketWissel !== undefined) {
    const idx = parseInt(btn.dataset.basketWissel, 10);
    openAlternativesSheet(idx);
  }
});

// iOS-safe capture handler: ensure "Wissel" always works even if
// event delegation is disrupted by overlays/scroll containers.
document.addEventListener(
  "click",
  (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const btn = target.closest("[data-basket-wissel]");
    if (!btn) return;
    if (!state.basketPreview) return;
    const overlay = document.getElementById("basketOverlay");
    if (overlay && (overlay.hidden || overlay.classList.contains("hidden"))) return;
    e.preventDefault();
    e.stopPropagation();
    const idx = parseInt(btn.dataset.basketWissel, 10);
    if (!Number.isInteger(idx)) return;
    openAlternativesSheet(idx);
  },
  true
);

// ── Alternatives sheet bindings ──────────────────────────────────────────────
bindEvent(document.getElementById("altOverlayBack"), "click", closeAlternativesSheet);
bindEvent(document.getElementById("altOverlay"), "click", (e) => {
  if (e.target === document.getElementById("altOverlay")) closeAlternativesSheet();
});
bindEvent(document.getElementById("altOverlayChips"), "click", (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;
  const btn = target.closest("[data-alt-filter]");
  if (!btn) return;
  const raw = String(btn.dataset.altFilter ?? "");
  const next = raw ? raw : null;
  state.altSheetFilter = state.altSheetFilter === next ? null : next;
  const itemIdx = state.altSheetItemIndex;
  const item = state.basketPreview?.items?.[itemIdx];
  if (item) renderAlternativesSheet(item);
});
bindEvent(document.getElementById("altOverlayList"), "click", (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;
  const btn = target.closest("[data-alt-choose]");
  if (!btn) return;
  const choiceIdx = parseInt(btn.dataset.altChoose, 10);
  const itemIdx = state.altSheetItemIndex;
  const item = state.basketPreview?.items?.[itemIdx];
  if (!item || !Number.isInteger(choiceIdx)) return;
  const prevIdx = Number.isInteger(item.selectedChoiceIndex) ? item.selectedChoiceIndex : 0;
  item.selectedChoiceIndex = choiceIdx;
  trackClientEvent("client_ah_wissel_pick", { from: prevIdx, to: choiceIdx });
  closeAlternativesSheet();
  renderBasketPreview();
});

// ── Recipe picker (add recipe to open cookbook) ───────────────────────────────
const recipePicker = document.getElementById("recipePicker");
const recipePickerList = document.getElementById("recipePickerList");
const recipePickerSearch = document.getElementById("recipePickerSearch");
const recipePickerTitle = document.getElementById("recipePickerTitle");

function openRecipePicker(cookbookId) {
  const cookbook = state.cookbooks.find((cb) => cb.id === cookbookId);
  if (!cookbook || !recipePicker) return;
  if (recipePickerTitle) recipePickerTitle.textContent = `Toevoegen aan "${cookbook.name}"`;
  if (recipePickerSearch) recipePickerSearch.value = "";
  renderRecipePickerList(cookbookId, "");
  recipePicker.classList.remove("hidden");
  recipePicker.setAttribute("aria-hidden", "false");
  recipePickerSearch?.focus();
}

function closeRecipePicker() {
  if (!recipePicker) return;
  recipePicker.classList.add("hidden");
  recipePicker.setAttribute("aria-hidden", "true");
}

function renderRecipePickerList(cookbookId, query) {
  if (!recipePickerList) return;
  const cookbook = state.cookbooks.find((cb) => cb.id === cookbookId);
  const inCookbook = new Set(cookbook?.recipeIds || []);
  const q = query.trim().toLowerCase();

  const candidates = state.recipes.filter((r) => {
    if (inCookbook.has(r.id)) return false; // already in cookbook
    if (!q) return true;
    return (r.title + " " + (r.description || "")).toLowerCase().includes(q);
  });

  if (!candidates.length) {
    recipePickerList.innerHTML = `<li class="recipe-picker__empty">${q ? "Geen recepten gevonden." : "Alle recepten staan al in dit kookboek."}</li>`;
    return;
  }

  recipePickerList.innerHTML = candidates.map((r) => `
    <li>
      <button class="recipe-picker__item" type="button" data-pick-recipe-id="${escapeHtml(r.id)}">
        <img class="recipe-picker__thumb" src="${escapeHtml(r.image)}" alt="" loading="lazy" />
        <span class="recipe-picker__name">${escapeHtml(r.title)}</span>
        <svg class="recipe-picker__add-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
      </button>
    </li>
  `).join("");
}

bindEvent(document.getElementById("recipePickerClose"), "click", closeRecipePicker);
bindEvent(document.getElementById("recipePickerBackdrop"), "click", closeRecipePicker);

bindEvent(recipePickerSearch, "input", (e) => {
  renderRecipePickerList(state.openCookbookId, e.target.value);
});

bindEvent(recipePickerList, "click", (e) => {
  const btn = e.target.closest("[data-pick-recipe-id]");
  if (!(btn instanceof HTMLElement)) return;
  const recipeId = btn.dataset.pickRecipeId;
  const cookbook = state.cookbooks.find((cb) => cb.id === state.openCookbookId);
  if (!cookbook || !recipeId) return;
  if (!cookbook.recipeIds.includes(recipeId)) {
    cookbook.recipeIds.push(recipeId);
    schedulePersistAppState();
  }
  closeRecipePicker();
  renderCookbookDetail(state.openCookbookId);
  showToast(`Recept toegevoegd aan ${cookbook.name}.`);
});

// Cookbooks screen add button
bindEvent(document.getElementById("cookbooksAddBtn"), "click", () => {
  if (!state.auth.authenticated) {
    openAuthModal("login");
    return;
  }
  switchView("import");
});
// Detail topbar back button → back to cookbook list
bindEvent(document.getElementById("cookbooksDetailBackBtn"), "click", () => {
  state.openCookbookId = null;
  renderCookbookList();
});

// "Gekoppelde kanalen" on profile → open sub-panel
bindEvent(document.getElementById("goToChannelsBtn"), "click", () => {
  renderChannelSettings();
  openProfileSubPanel("profileSubChannels");
});

// "Favoriete supermarkt" on profile → open sub-panel
let supermarketDraft = "ah";
function renderSupermarketSettings() {
  const list = document.getElementById("profileSupermarketList");
  if (!list) return;
  supermarketDraft = state.profile.favoriteSupermarket || "ah";
  list.innerHTML = SUPERMARKETS.map((sm) => {
    const faviconUrl = getSupermarketIconUrl(sm);
    const isSelected = supermarketDraft === sm.id;
    const supportedBadge = sm.supported
      ? ""
      : `<span class="onboarding-supermarket-item__badge">Binnenkort</span>`;
    return `
      <label class="onboarding-channel-item onboarding-supermarket-item${isSelected ? " selected" : ""}" data-supermarket-id="${escapeHtml(sm.id)}">
        <input type="radio" name="profileSupermarket" data-supermarket-radio="${escapeHtml(sm.id)}" ${isSelected ? "checked" : ""} />
        <span class="onboarding-channel-avatar" style="background:${escapeHtml(sm.color)}1a">
          ${faviconUrl ? `<img class="onboarding-channel-avatar__favicon" src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/><span style="display:none;font-weight:800;font-size:.65rem">${escapeHtml(sm.name[0])}</span>` : `<span style="font-weight:800;font-size:.65rem">${escapeHtml(sm.name[0])}</span>`}
        </span>
        <span>${escapeHtml(sm.name)}</span>
        ${supportedBadge}
      </label>
    `;
  }).join("");

  list.querySelectorAll("input[type=radio]").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      supermarketDraft = e.target.dataset.supermarketRadio;
      list.querySelectorAll(".onboarding-supermarket-item").forEach((label) => {
        label.classList.toggle("selected", label.dataset.supermarketId === supermarketDraft);
      });
    });
  });
}

bindEvent(document.getElementById("goToSupermarketBtn"), "click", () => {
  renderSupermarketSettings();
  openProfileSubPanel("profileSubSupermarket");
});

bindEvent(document.getElementById("profileSubSupermarketBack"), "click", () => closeProfileSubPanel("profileSubSupermarket"));

bindEvent(document.getElementById("profileSubSupermarketSave"), "click", () => {
  state.profile.favoriteSupermarket = supermarketDraft || "ah";
  schedulePersistAppState();
  renderProfileSummary();
  closeProfileSubPanel("profileSubSupermarket");
  showToast("Voorkeur opgeslagen.");
});

// "Taal" on profile → open language sub-panel
bindEvent(document.getElementById("goToLanguageBtn"), "click", () => {
  updateLanguagePanel();
  openProfileSubPanel("profileSubLanguage");
});

// "Notificaties" on profile → open notifications sub-panel
bindEvent(document.getElementById("goToNotificationsBtn"), "click", () => {
  renderFeaturePushUI();
  openProfileSubPanel("profileSubNotifications");
});

// "Over deze App" → about sub-panel
const APP_VERSION = "3.1.0";
const aboutVersionMeta = document.getElementById("profileAboutVersionMeta");
const aboutVersionDisplay = document.getElementById("profileAboutVersion");
if (aboutVersionMeta) aboutVersionMeta.textContent = `v${APP_VERSION}`;
if (aboutVersionDisplay) aboutVersionDisplay.textContent = APP_VERSION;
bindEvent(document.getElementById("goToAboutBtn"), "click", () => {
  openProfileSubPanel("profileSubAbout");
});
bindEvent(document.getElementById("profileSubAboutBack"), "click", () => closeProfileSubPanel("profileSubAbout"));

// "Nieuw in Plately" → changelog sub-panel
// Profile stat buttons → navigate to relevant screen/panel
bindEvent(document.getElementById("profileStatRecipes"), "click", () => switchView("home"));
bindEvent(document.getElementById("profileStatCookbooks"), "click", () => switchView("cookbooks"));
bindEvent(document.getElementById("profileStatChannels"), "click", () => {
  renderChannelSettings();
  openProfileSubPanel("profileSubChannels");
});

bindEvent(document.getElementById("goToChangelogBtn"), "click", () => {
  renderChangelog();
  openProfileSubPanel("profileSubChangelog");
});

function confirmRemoveRecipeFromOpenCookbook(recipeId) {
  if (!recipeId || !state.openCookbookId) return;
  const cb = state.cookbooks.find((c) => c.id === state.openCookbookId);
  const recipe = getRecipeById(recipeId);
  if (!cb) return;
  openConfirmDialog({
    title: "Recept verwijderen?",
    message: `Wil je "${recipe?.title || "dit recept"}" uit "${cb.name}" verwijderen?`,
    confirmLabel: "Verwijderen",
    cancelLabel: "Annuleren",
    onConfirm: () => {
      cb.recipeIds = cb.recipeIds.filter((id) => id !== recipeId);
      renderCookbookDetail(state.openCookbookId);
      schedulePersistAppState();
      showToast("Recept verwijderd uit kookboek.");
    },
  });
}

// Shared handler for cookbook grid interactions (works for both settings and cookbooks screen)
function handleCookbookGridClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const listSelectModeBtn = target.closest("[data-cb-list-select-mode]");
  if (listSelectModeBtn instanceof HTMLElement && !state.openCookbookId) {
    state.cookbooksSelectMode = !state.cookbooksSelectMode;
    if (!state.cookbooksSelectMode) state.cookbooksSelectedIds = [];
    renderCookbookList();
    return;
  }

  const listBulkDeleteBtn = target.closest("[data-cb-list-delete-selected]");
  if (listBulkDeleteBtn instanceof HTMLElement && !state.openCookbookId) {
    const selected = Array.isArray(state.cookbooksSelectedIds) ? state.cookbooksSelectedIds.filter(Boolean) : [];
    if (!selected.length) return;
    if (state.cookbooks.length - selected.length < 1) return;
    const selectedNames = selected
      .map((id) => getCookbookById(id))
      .filter(Boolean)
      .map((cb) => cb.name)
      .slice(0, 5);
    openConfirmDialog({
      title: "Kookboeken verwijderen?",
      message: `Je staat op het punt ${selected.length} kookboek(en) te verwijderen. Dit kan niet ongedaan gemaakt worden.`,
      confirmLabel: "Verwijderen",
      cancelLabel: "Annuleren",
      onConfirm: () => {
        const selectedSet = new Set(selected);
        state.cookbooks = state.cookbooks.filter((c) => !selectedSet.has(c.id));
        if (selectedSet.has(state.selectedCookbookId)) {
          state.selectedCookbookId = state.cookbooks[0]?.id || null;
        }
        if (state.openCookbookId && selectedSet.has(state.openCookbookId)) {
          state.openCookbookId = null;
        }
        state.cookbooksSelectedIds = [];
        state.cookbooksSelectMode = false;
        renderCookbookList();
        schedulePersistAppState();
        showToast(`${selected.length} kookboek(en) verwijderd.`);
      },
    });
    return;
  }

  const selectCookbookBtn = target.closest("[data-cb-select-cookbook]");
  if (selectCookbookBtn instanceof HTMLElement && !state.openCookbookId) {
    if (!state.cookbooksSelectMode) state.cookbooksSelectMode = true;
    const cookbookId = selectCookbookBtn.getAttribute("data-cb-select-cookbook") || "";
    if (!cookbookId) return;
    const set = new Set(state.cookbooksSelectedIds || []);
    if (set.has(cookbookId)) set.delete(cookbookId);
    else set.add(cookbookId);
    state.cookbooksSelectedIds = [...set];
    renderCookbookList();
    return;
  }

  const selectModeBtn = target.closest("[data-cb-select-mode]");
  if (selectModeBtn instanceof HTMLElement && state.openCookbookId) {
    event.preventDefault();
    event.stopPropagation();
    state.cookbookSelectMode = !state.cookbookSelectMode;
    if (!state.cookbookSelectMode) {
      state.cookbookSelectedRecipeIds = [];
    }
    renderCookbookDetail(state.openCookbookId);
    return;
  }

  const bulkDeleteBtn = target.closest("[data-cb-delete-selected]");
  if (bulkDeleteBtn instanceof HTMLElement && state.openCookbookId) {
    const selected = Array.isArray(state.cookbookSelectedRecipeIds) ? state.cookbookSelectedRecipeIds.filter(Boolean) : [];
    if (!selected.length) return;
    const cb = state.cookbooks.find((c) => c.id === state.openCookbookId);
    if (!cb) return;
    openConfirmDialog({
      title: "Recepten verwijderen?",
      message: `Je staat op het punt ${selected.length} recept(en) uit "${cb.name}" te verwijderen.`,
      confirmLabel: "Verwijderen",
      cancelLabel: "Annuleren",
      onConfirm: () => {
        const selectedSet = new Set(selected);
        cb.recipeIds = cb.recipeIds.filter((id) => !selectedSet.has(id));
        state.cookbookSelectedRecipeIds = [];
        state.cookbookSelectMode = false;
        renderCookbookDetail(state.openCookbookId);
        schedulePersistAppState();
        showToast(`${selected.length} recept(en) verwijderd uit kookboek.`);
      },
    });
    return;
  }

  const removeFromCookbookBtn = target.closest("[data-remove-from-cookbook]");
  if (removeFromCookbookBtn instanceof HTMLElement && state.openCookbookId) {
    const recipeId = removeFromCookbookBtn.getAttribute("data-remove-from-cookbook") || "";
    confirmRemoveRecipeFromOpenCookbook(recipeId);
    return;
  }

  const moveRecipeBtn = target.closest("[data-move-recipe]");
  if (moveRecipeBtn instanceof HTMLElement) {
    const recipeId = moveRecipeBtn.getAttribute("data-move-recipe") || "";
    const currentCookbookId = state.openCookbookId || "";
    if (recipeId && currentCookbookId) {
      state._moveFromCookbookId = currentCookbookId;
      openCookbookSaveModal(recipeId);
    }
    return;
  }

  const selectRecipeBtn = target.closest("[data-cb-select-recipe]");
  if (selectRecipeBtn instanceof HTMLElement && state.openCookbookId) {
    const recipeId = selectRecipeBtn.getAttribute("data-cb-select-recipe") || "";
    if (!recipeId) return;
    const set = new Set(state.cookbookSelectedRecipeIds || []);
    if (set.has(recipeId)) set.delete(recipeId);
    else set.add(recipeId);
    state.cookbookSelectedRecipeIds = [...set];
    renderCookbookDetail(state.openCookbookId);
    return;
  }

  const createCard = target.closest("[data-create-cookbook]");
  if (createCard instanceof HTMLElement) { openCreateCookbookPrompt(); return; }

  const optionsBtn = target.closest("[data-cookbook-options-id]");
  if (optionsBtn instanceof HTMLElement) {
    cookbookOptionsTargetId = optionsBtn.dataset.cookbookOptionsId;
    const label = document.getElementById("cookbookOptionsLabel");
    const cb = getCookbookById(cookbookOptionsTargetId);
    if (label && cb) label.textContent = cb.name;
    const deleteBtn = document.getElementById("cookbookDeleteButton");
    if (deleteBtn) deleteBtn.disabled = state.cookbooks.length <= 1;
    cookbookOptionsSheet?.classList.remove("hidden");
    cookbookOptionsSheet?.setAttribute("aria-hidden", "false");
    return;
  }

  const pickerBtn = target.closest("[data-open-recipe-picker]");
  if (pickerBtn instanceof HTMLElement && state.openCookbookId) { openRecipePicker(state.openCookbookId); return; }

  const backBtn = target.closest("[data-close-cookbook-detail]");
  if (backBtn instanceof HTMLElement) { state.openCookbookId = null; renderCookbookList(); return; }

  const openRecipeBtn = target.closest("[data-open-recipe-id]");
  if (openRecipeBtn instanceof HTMLElement) {
    if (state.cookbookSelectMode && state.openCookbookId) {
      const recipeId = openRecipeBtn.dataset.openRecipeId || "";
      if (!recipeId) return;
      const set = new Set(state.cookbookSelectedRecipeIds || []);
      if (set.has(recipeId)) set.delete(recipeId);
      else set.add(recipeId);
      state.cookbookSelectedRecipeIds = [...set];
      renderCookbookDetail(state.openCookbookId);
      return;
    }
    state.selectedRecipeId = openRecipeBtn.dataset.openRecipeId;
    switchView("detail");
    renderDetailRecipe(true);
    return;
  }

  const cookbookCard = target.closest("[data-cookbook-id]");
  if (!(cookbookCard instanceof HTMLElement)) return;

  if (!state.openCookbookId && state.cookbooksSelectMode) {
    const cookbookId = cookbookCard.dataset.cookbookId || "";
    if (!cookbookId) return;
    const set = new Set(state.cookbooksSelectedIds || []);
    if (set.has(cookbookId)) set.delete(cookbookId);
    else set.add(cookbookId);
    state.cookbooksSelectedIds = [...set];
    renderCookbookList();
    return;
  }

  state.openCookbookId = cookbookCard.dataset.cookbookId;
  renderCookbookList();
}

const cookbooksScreenGrid = document.getElementById("cookbooksScreenGrid");
bindEvent(cookbooksScreenGrid, "click", handleCookbookGridClick);

bindEvent(cookbookList, "click", (event) => {
  // Keep list grid behavior in sync with the cookbooks screen grid
  if (!state.openCookbookId) {
    const targetMaybe = event.target;
    if (targetMaybe instanceof Element) {
      const listSelectModeBtn = targetMaybe.closest("[data-cb-list-select-mode]");
      const listBulkDeleteBtn = targetMaybe.closest("[data-cb-list-delete-selected]");
      const selectCookbookBtn = targetMaybe.closest("[data-cb-select-cookbook]");
      if (listSelectModeBtn || listBulkDeleteBtn || selectCookbookBtn) {
        handleCookbookGridClick(event);
        return;
      }
    }
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  // When cookbook detail is rendered inside the settings list, delegate all
  // detail interactions to the shared grid handler (it already handles:
  // select mode, bulk delete, single remove, open recipe, picker/back).
  if (state.openCookbookId) {
    const detailAction = target.closest(
      "[data-cb-select-mode],[data-cb-delete-selected],[data-cb-select-recipe],[data-remove-from-cookbook],[data-open-recipe-id],[data-open-recipe-picker],[data-close-cookbook-detail]"
    );
    if (detailAction instanceof HTMLElement) {
      handleCookbookGridClick(event);
      return;
    }
  }

  const createCard = target.closest("[data-create-cookbook]");
  if (createCard instanceof HTMLElement) {
    openCreateCookbookPrompt();
    return;
  }

  const optionsBtn = target.closest("[data-cookbook-options-id]");
  if (optionsBtn instanceof HTMLElement) {
    cookbookOptionsTargetId = optionsBtn.dataset.cookbookOptionsId;
    const label = document.getElementById("cookbookOptionsLabel");
    const cb = getCookbookById(cookbookOptionsTargetId);
    if (label && cb) label.textContent = cb.name;
    const deleteBtn = document.getElementById("cookbookDeleteButton");
    if (deleteBtn) deleteBtn.disabled = state.cookbooks.length <= 1;
    cookbookOptionsSheet?.classList.remove("hidden");
    cookbookOptionsSheet?.setAttribute("aria-hidden", "false");
    return;
  }

  // Open recipe picker from detail view
  const pickerBtn = target.closest("[data-open-recipe-picker]");
  if (pickerBtn instanceof HTMLElement && state.openCookbookId) {
    openRecipePicker(state.openCookbookId);
    return;
  }

  // Back button in detail view
  const backBtn = target.closest("[data-close-cookbook-detail]");
  if (backBtn instanceof HTMLElement) {
    state.openCookbookId = null;
    renderCookbookList();
    return;
  }

  // Remove recipe from cookbook (detail view)
  const removeBtn = target.closest("[data-remove-from-cookbook]");
  if (removeBtn instanceof HTMLElement && state.openCookbookId) {
    const recipeId = removeBtn.getAttribute("data-remove-from-cookbook") || "";
    confirmRemoveRecipeFromOpenCookbook(recipeId);
    return;
  }

  // Move recipe to another cookbook
  const moveBtn = target.closest("[data-move-recipe]");
  if (moveBtn instanceof HTMLElement) {
    const recipeId = moveBtn.getAttribute("data-move-recipe") || "";
    const currentCookbookId = state.openCookbookId || "";
    if (recipeId && currentCookbookId) {
      state._moveFromCookbookId = currentCookbookId;
      openCookbookSaveModal(recipeId);
    }
    return;
  }

  // Open recipe from detail view
  const openRecipeBtn = target.closest("[data-open-recipe-id]");
  if (openRecipeBtn instanceof HTMLElement) {
    state.selectedRecipeId = openRecipeBtn.dataset.openRecipeId;
    switchView("detail");
    renderDetailRecipe(true);
    return;
  }

  // Open cookbook detail
  const cookbookCard = target.closest("[data-cookbook-id]");
  if (!(cookbookCard instanceof HTMLElement)) {
    return;
  }

  if (!state.openCookbookId && state.cookbooksSelectMode) {
    handleCookbookGridClick(event);
    return;
  }

  state.openCookbookId = cookbookCard.dataset.cookbookId;
  renderCookbookList();
});

bindEvent(modal, "click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
    closeModal();
  }
});

bindEvent(authModal, "click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeAuth === "true") {
    closeAuthModal();
  }
});

bindEvent(cookbookSaveModal, "click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeCookbookSave === "true") {
    closeCookbookSaveModal();
  }
});

function confirmCookbookSave({ recipeId, cookbookId } = {}) {
  const resolvedCookbookId = cookbookId || state.pendingCookbookSaveCookbookId;
  const selectedRecipe = getSelectedRecipe();
  const resolvedRecipeId = recipeId || state.pendingCookbookSaveRecipeId || selectedRecipe?.id;
  if (!resolvedRecipeId || !resolvedCookbookId) return;

  const moveFromId = state._moveFromCookbookId || "";

  state.selectedRecipeId = resolvedRecipeId;
  saveRecipeToCookbook(resolvedRecipeId, resolvedCookbookId);

  // If this was a move operation, remove from source cookbook
  if (moveFromId && moveFromId !== resolvedCookbookId) {
    const fromCb = state.cookbooks.find((cb) => cb.id === moveFromId);
    if (fromCb) {
      fromCb.recipeIds = (fromCb.recipeIds || []).filter((id) => id !== resolvedRecipeId);
    }
  }

  closeCookbookSaveModal();
  renderDetailRecipe(true);
  switchView("detail");
}

if (cookbookSaveList) {
  cookbookSaveList.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const cookbookButton = target.closest("[data-save-cookbook-id]");
      if (!(cookbookButton instanceof HTMLElement)) return;

      event.preventDefault();

      // Read recipeId from the button itself — most reliable, no state timing issues
      const selectedRecipe = getSelectedRecipe();
      const recipeId =
        cookbookButton.dataset.saveRecipeId || state.pendingCookbookSaveRecipeId || selectedRecipe?.id;
      const cookbookId = cookbookButton.dataset.saveCookbookId;
      if (!recipeId || !cookbookId) return;

      if (state.pendingCookbookSaveCookbookId !== cookbookId) {
        state.pendingCookbookSaveCookbookId = cookbookId;
        renderCookbookSaveList(recipeId);
        syncCookbookSaveConfirmButton();
      }

      // After importing, users expect a single tap here to save & continue.
      confirmCookbookSave({ recipeId, cookbookId });
    },
    { capture: true }
  );
}

bindEvent(cookbookSaveCreateButton, "click", () => {
  openCookbookNameModal("create");
});

bindEvent(cookbookSaveConfirmButton, "click", () => {
  confirmCookbookSave();
});

// Cookbook name modal confirm/cancel
bindEvent(document.getElementById("cookbookNameConfirmButton"), "click", () => {
  const name = document.getElementById("cookbookNameInput")?.value?.trim() || "";
  if (!name) { showToast("Geef een naam op."); return; }
  if (cookbookNameModalPurpose === "rename" && cookbookNameModalTargetId) {
    renameCookbook(cookbookNameModalTargetId, name);
    closeCookbookNameModal();
  } else {
    const cookbook = createCookbook(name);
    const pendingId = state.pendingCookbookSaveRecipeId;
    if (cookbook && pendingId) {
      // Set selectedRecipeId first so every render targets the right recipe
      state.selectedRecipeId = pendingId;
      saveRecipeToCookbook(pendingId, cookbook.id);
      closeCookbookNameModal();
      closeCookbookSaveModal();
      renderHomeCookbooks();
      renderDetailRecipe(true);
      switchView("detail");
    } else {
      closeCookbookNameModal();
    }
  }
});

bindEvent(document.getElementById("cookbookNameCancelButton"), "click", closeCookbookNameModal);
bindEvent(document.getElementById("cookbookNameModalBackdrop"), "click", closeCookbookNameModal);

document.getElementById("cookbookNameInput")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("cookbookNameConfirmButton")?.click();
  if (e.key === "Escape") closeCookbookNameModal();
});

// Cookbook name suggestions (pills + refresh)
bindEvent(cookbookNameSuggestionsPills, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const pill = target.closest("[data-cookbook-name-suggest]");
  if (!(pill instanceof HTMLElement)) return;
  const label = pill.dataset.cookbookNameSuggest || "";
  if (!label) return;
  const input = document.getElementById("cookbookNameInput");
  if (input) {
    input.value = label;
    input.focus();
  }
});

bindEvent(cookbookNameSuggestionsRefresh, "click", () => {
  renderCookbookNameSuggestions();
  if (!cookbookNameSuggestionsRefresh) return;
  cookbookNameSuggestionsRefresh.classList.add("is-spinning");
  window.setTimeout(() => cookbookNameSuggestionsRefresh.classList.remove("is-spinning"), 500);
});

// Cookbook options sheet (⋯ button)
bindEvent(document.getElementById("cookbookOptionsBackdrop"), "click", () => {
  cookbookOptionsSheet?.classList.add("hidden");
  cookbookOptionsSheet?.setAttribute("aria-hidden", "true");
});
bindEvent(document.getElementById("cookbookOptionsCloseButton"), "click", () => {
  cookbookOptionsSheet?.classList.add("hidden");
  cookbookOptionsSheet?.setAttribute("aria-hidden", "true");
});

bindEvent(document.getElementById("cookbookRenameButton"), "click", () => {
  cookbookOptionsSheet?.classList.add("hidden");
  cookbookOptionsSheet?.setAttribute("aria-hidden", "true");
  const cb = getCookbookById(cookbookOptionsTargetId);
  if (cb) openCookbookNameModal("rename", cb.name, cb.id);
});

bindEvent(document.getElementById("cookbookDeleteButton"), "click", () => {
  cookbookOptionsSheet?.classList.add("hidden");
  cookbookOptionsSheet?.setAttribute("aria-hidden", "true");
  if (!cookbookOptionsTargetId) return;
  const cb = getCookbookById(cookbookOptionsTargetId);
  if (!cb) return;
  showConfirm({
    title: "Kookboek verwijderen?",
    subtitle: `"${cb.name}" wordt verwijderd. De recepten blijven bewaard in je collectie.`,
    confirmLabel: "Verwijderen",
    destructive: true,
    onConfirm: () => deleteCookbook(cookbookOptionsTargetId),
  });
});

// Channel toggle click handler
bindEvent(document.getElementById("channelSettingsList"), "click", (event) => {
  // Handle delete button for custom channels
  const deleteBtn = event.target.closest("[data-delete-channel]");
  if (deleteBtn instanceof HTMLElement) {
    event.stopPropagation();
    const id = deleteBtn.dataset.deleteChannel;
    if (!id) return;
    const ch = state.customChannels.find((c) => c.id === id);
    if (!ch) return;
    showConfirm({
      title: "Kanaal verwijderen?",
      subtitle: `"${ch.name}" wordt verwijderd uit je kanalen.`,
      confirmLabel: "Verwijderen",
      destructive: true,
      onConfirm: () => {
        state.customChannels = state.customChannels.filter((c) => c.id !== id);
        state.followedChannelIds = state.followedChannelIds.filter((c) => c !== id);
        renderChannelSettings();
        renderChannelRow();
        renderProfileSummary();
        schedulePersistAppState();
      },
    });
    return;
  }

  // Handle "Kanaal toevoegen" button
  if (event.target.closest("#addCustomChannelButton")) {
    const formContainer = document.getElementById("channelAddForm");
    if (formContainer) formContainer.hidden = !formContainer.hidden;
    return;
  }

  const row = event.target.closest("[data-channel-id]");
  if (!(row instanceof HTMLElement)) return;
  const id = row.dataset.channelId;
  if (!id) return;

  // Check if it's a custom channel that's still pending approval
  const customChannel = state.customChannels.find((c) => c.id === id);
  if (customChannel && (customChannel.status || "approved") === "pending") {
    showToast("Dit kanaal is nog in behandeling. Je kunt het gebruiken zodra het is goedgekeurd.");
    return;
  }
  if (customChannel && (customChannel.status || "approved") === "rejected") {
    showToast("Dit kanaal is afgekeurd en kan niet worden ingeschakeld.");
    return;
  }

  const isSeed = SEED_CHANNELS.some((ch) => ch.id === id);
  if (!state.followedChannelIds.includes(id)) {
    if (isSeed && !isSeedChannelEnabled(id)) {
      showToast("Dit kanaal is uitgeschakeld en kan niet worden ingeschakeld.");
      return;
    }
    if (!isSeed && !isCustomChannelEnabled(id)) {
      showToast("Dit kanaal is uitgeschakeld en kan niet worden ingeschakeld.");
      return;
    }
  }

  if (state.followedChannelIds.includes(id)) {
    // Prevent ending up with zero *active* channels (pending/rejected custom channels don't count)
    const activeCount = countActiveFollowedChannels();
    const isApprovedCustom =
      Boolean(customChannel) && (customChannel.status || "approved") === "approved";
    const removingActive = isSeed || isApprovedCustom;
    if (removingActive && activeCount <= 1) {
      showToast("Volg minstens één kanaal.");
      return;
    }
    state.followedChannelIds = state.followedChannelIds.filter((c) => c !== id);
  } else {
    state.followedChannelIds.push(id);
  }
  renderChannelSettings();
  renderChannelRow();
  renderProfileSummary();
  schedulePersistAppState();
});

// Handle custom channel form
bindEvent(document.getElementById("channelAddFormClose"), "click", () => {
  const formContainer = document.getElementById("channelAddForm");
  if (formContainer) formContainer.hidden = true;
});

bindEvent(document.getElementById("customChannelForm"), "submit", async (event) => {
  event.preventDefault();
  const urlInput = document.getElementById("customChannelUrl");
  const submitBtn = document.getElementById("customChannelSubmit");

  if (!urlInput || !submitBtn) return;

  const trimmedUrl = urlInput.value.trim();
  if (!trimmedUrl) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="animation: hourglass-flip 3s ease-in-out infinite;">
      <path d="M6 2c-1.1 0-2 .9-2 2v1h2V4h12v1h2V4c0-1.1-.9-2-2-2H6zm0 5h12v7c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V7zm12 9H6v1c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1z"/>
    </svg>
    Verwerken...
  `;

  try {
    // Extract domain name from URL
    const url = new URL(trimmedUrl);
    const domain = url.hostname.replace("www.", "");
    const nameParts = domain.split(".")[0];
    const channelName = nameParts.charAt(0).toUpperCase() + nameParts.slice(1);

    const initials = channelName.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase() || "WEB";
    const color = CUSTOM_CHANNEL_COLORS[state.customChannels.length % CUSTOM_CHANNEL_COLORS.length];

    const newChannel = {
      id: `ch-custom-${Date.now()}`,
      name: channelName,
      url: trimmedUrl,
      initials,
      color,
      status: "pending",
      createdBy: state.auth.userId || null,
      createdAt: new Date().toISOString(),
    };

    state.customChannels.push(newChannel);
    state.followedChannelIds.push(newChannel.id);

    // Hide form and reset
    const formContainer = document.getElementById("channelAddForm");
    if (formContainer) formContainer.hidden = true;
    urlInput.value = "";

    renderChannelSettings();
    renderChannelRow();
    schedulePersistAppState();

    showToast(`${channelName} toegevoegd!`);
  } catch (error) {
    showToast("Geldig URL-adres vereist.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
      Kanaal toevoegen
    `;
  }
});

bindEvent(switchAuthModeButton, "click", () => {
  openAuthModal(state.auth.mode === "register" ? "login" : "register");
});

// Instagram link button (opens in new tab — handled by anchor href)

bindEvent(authForm, "submit", async (event) => {
  event.preventDefault();
  const email = authEmail.value.trim();
  const password = authPassword.value;

  // Registration requires name + email (verplicht)
  const nameInput = document.getElementById("authName");
  const name = (nameInput?.value || "").trim();
  if (state.auth.mode === "register") {
    if (!name) {
      showToast("Voer je naam in.");
      nameInput?.focus?.();
      return;
    }
    if (!email) {
      showToast("Voer je e-mailadres in.");
      authEmail?.focus?.();
      return;
    }
    state.profile.name = name;
    if (!state.profile.email) state.profile.email = email;
  }

  submitAuthButton.disabled = true;
  submitAuthButton.textContent = state.auth.mode === "register" ? "Account aanmaken..." : "Inloggen...";
  if (authFeedback) authFeedback.textContent = "";

  try {
    await submitAuth(state.auth.mode, email, password);
  } catch (error) {
    if (authFeedback) authFeedback.textContent = error.message;
  } finally {
    submitAuthButton.disabled = false;
    submitAuthButton.textContent = state.auth.mode === "register" ? "Account aanmaken" : "Inloggen";
  }
});

bindEvent(reviewForm, "submit", (event) => {
  event.preventDefault();
  saveImportReview();
});

bindEvent(reviewDrafts, "click", (event) => {
  const openBtn = event.target.closest("[data-review-draft-open]");
  if (openBtn instanceof HTMLElement) {
    const id = openBtn.dataset.reviewDraftOpen;
    if (!id) return;
    openImportReview(id);
    return;
  }
  const delBtn = event.target.closest("[data-review-draft-delete]");
  if (delBtn instanceof HTMLElement) {
    const id = delBtn.dataset.reviewDraftDelete;
    if (!id) return;
    delete state.importPreviews[id];
    if (state.reviewRecipeId === id) {
      state.reviewRecipeId = "";
      state.selectedRecipeId = "";
      switchView("import");
      return;
    }
    renderImportDrafts();
    showToast("Concept verwijderd.");
  }
});

bindEvent(importDraftsButton, "click", () => {
  openDraftsFromImport();
});

bindEvent(document.getElementById("mealTagChips"), "click", (event) => {
  const chip = event.target.closest(".meal-chip");
  if (!chip) return;
  const tag = chip.dataset.tag;
  // Update hidden input
  const hidden = document.getElementById("reviewMealTagInput");
  if (hidden) hidden.value = tag;
  // Update active chip
  document.querySelectorAll(".meal-chip").forEach((c) => c.classList.remove("meal-chip--active"));
  chip.classList.add("meal-chip--active");
});

bindEvent(skipReviewButton, "click", () => {
  const recipe = getReviewRecipe();
  if (!recipe) {
    switchView("home");
    return;
  }
  state.selectedRecipeId = recipe.id;
  renderDetailRecipe(true);
  openCookbookSaveModal(recipe.id);
});

bindEvent(reviewForm, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const btn = target.closest("[data-review-quickaction]");
  if (!(btn instanceof HTMLElement)) return;
  applyReviewQuickAction(btn.dataset.reviewQuickaction || "", btn.dataset.reviewTarget || "");
});

bindEvent(mealPlanGrid, "click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const planButton = target.closest("[data-plan-day]");
  if (planButton instanceof HTMLElement) {
    assignSelectedRecipeToDay(planButton.dataset.planDay);
    return;
  }

  const clearButton = target.closest("[data-clear-plan-day]");
  if (clearButton instanceof HTMLElement) {
    state.mealPlan[clearButton.dataset.clearPlanDay] = null;
    renderMealPlanGrid();
    schedulePersistAppState();
    return;
  }

  const recipeButton = target.closest("[data-open-planned-recipe]");
  if (!(recipeButton instanceof HTMLElement)) {
    return;
  }

  const recipe = getRecipeById(recipeButton.dataset.openPlannedRecipe);
  if (!recipe) {
    return;
  }

  state.selectedRecipeId = recipe.id;
  renderDetailRecipe(true);
  switchView("detail");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
    return;
  }
  if (event.key === "Escape" && !authModal.classList.contains("hidden")) {
    closeAuthModal();
    return;
  }
  if (event.key === "Escape" && cookbookSaveModal && !cookbookSaveModal.classList.contains("hidden")) {
    closeCookbookSaveModal();
  }
});

bindEvent(basketContinueButton, "click", async () => {
  const preview = state.basketPreview;
  if (!preview) {
    return;
  }

  let url = getBasketHandoffUrl(preview);

  // For AH: rebuild the add-multiple URL from the currently selected choice per item
  // so swapping an alternative product is reflected in the handoff link.
  if (preview.store === "albert-heijn") {
    const selectedIds = (preview.items || [])
      .map((item) => item.choices?.[item.selectedChoiceIndex || 0]?.productId)
      .filter(Boolean);
    if (selectedIds.length) {
      url = `https://www.ah.nl/mijnlijst/add-multiple?${selectedIds
        .map((id) => `p=${encodeURIComponent(id)}:1`)
        .join("&")}`;
    }
  }

  if (!url) {
    showToast("Kon geen supermarktlink opbouwen.");
    return;
  }

  const clipboardText = getBasketClipboardText(preview);
  await navigator.clipboard.writeText(clipboardText).catch(() => {});
  window.location.assign(url);
});

document.addEventListener("visibilitychange", () => {
  if (
    document.visibilityState === "visible" &&
    state.keepAwake &&
    state.view === "detail" &&
    !state.wakeLockSentinel
  ) {
    requestWakeLock();
  }
});

// Phase 1: Instagram paste helper button
bindEvent(document.getElementById("instagramPasteHelper"), "click", async (event) => {
  event.preventDefault();
  try {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
      recipeUrlInput.value = clipboardText;
      recipeUrlInput.focus();
      showToast("Instagram link geplakt!");
    }
  } catch (err) {
    showToast("Kan clipboard niet lezen. Plak handmatig.");
  }
});

bindEvent(importForm, "submit", async (event) => {
  event.preventDefault();

  const url = extractUrl(recipeUrlInput.value.trim());
  const note = recipeNoteInput.value.trim();
  const submitButton = document.getElementById("submitImport");

  await submitImport(
    url,
    note,
    (message) => {
      importFeedback.textContent = message;
    },
    (isLoading) => {
      submitButton.disabled = isLoading;
      submitButton.textContent = isLoading ? "Importeren..." : "Recept importeren";
    },
    (importedRecipe) => {
      importForm.reset();
      state.selectedPlatform = "tiktok";
      syncPlatformUI();
      closeModal();
      openImportReview(importedRecipe.id);
      showToast(`${importedRecipe.title} klaar om na te lopen.`);
    }
  );
});

bindEvent(homeImportForm, "submit", async (event) => {
  event.preventDefault();

  if (!state.auth.authenticated) {
    showAuthModal();
    return;
  }

  const url = extractUrl(homeImportUrl.value.trim());

  await submitImport(
    url,
    (document.getElementById("homeImportCaption")?.value || "").trim(),
    (message) => {
      homeImportFeedback.textContent = message;
    },
    (isLoading) => {
      homeImportSubmit.disabled = isLoading;
      homeImportSubmit.textContent = isLoading ? "Importeren..." : "Importeer";
      if (isLoading) {
        homeImportFeedback.textContent =
          "Import is bezig: titel, ingrediënten en stappen worden opgeschoond...";
      }
    },
    (importedRecipe) => {
      homeImportForm.reset();
      const captionField = document.getElementById("homeImportCaption");
      if (captionField) {
        captionField.value = "";
        captionField.classList.add("hidden");
      }
      const captionToggle = document.getElementById("homeImportCaptionToggle");
      if (captionToggle) captionToggle.textContent = "+ Voeg beschrijving toe";
      homeImportFeedback.textContent = "Voeg direct een recept toe vanuit social media of een receptenwebsite.";
      openImportReview(importedRecipe.id);
      showToast(`${importedRecipe.title} klaar om na te lopen.`);
    }
  );
});

bindEvent(importScreenForm, "submit", async (event) => {
  event.preventDefault();

  if (!state.auth.authenticated) {
    showAuthModal();
    return;
  }

  const url = extractUrl(importScreenUrl.value.trim());

  await submitImport(
    url,
    (document.getElementById("importScreenCaption")?.value || "").trim(),
    (message) => {
      importScreenFeedback.textContent = message;
    },
    (isLoading) => {
      importScreenSubmit.disabled = isLoading;
      if (isLoading) {
        importScreenFeedback.textContent =
          "Import is bezig: titel, ingrediënten en stappen worden opgeschoond...";
      }
    },
    (importedRecipe) => {
      importScreenForm.reset();
      const captionField = document.getElementById("importScreenCaption");
      if (captionField) {
        captionField.value = "";
        captionField.classList.add("hidden");
      }
      const captionToggle = document.getElementById("importScreenCaptionToggle");
      if (captionToggle) captionToggle.textContent = "+ Voeg beschrijving toe";
      importScreenFeedback.textContent = "Kopieer de link uit de app of website en plak hem hierboven.";
      openImportReview(importedRecipe.id);
      showToast(`${importedRecipe.title} klaar om na te lopen.`);
    }
  );
});

// ── Caption toggle handlers ───────────────────────────────────────────────────
bindEvent(document.getElementById("homeImportCaptionToggle"), "click", () => {
  const field = document.getElementById("homeImportCaption");
  if (!field) return;
  field.classList.toggle("hidden");
  const isOpen = !field.classList.contains("hidden");
  document.getElementById("homeImportCaptionToggle").textContent = isOpen ? "− Beschrijving verbergen" : "+ Voeg beschrijving toe";
  if (isOpen) field.focus();
});
bindEvent(document.getElementById("importScreenCaptionToggle"), "click", () => {
  const field = document.getElementById("importScreenCaption");
  if (!field) return;
  field.classList.toggle("hidden");
  const isOpen = !field.classList.contains("hidden");
  document.getElementById("importScreenCaptionToggle").textContent = isOpen ? "− Beschrijving verbergen" : "+ Voeg beschrijving toe";
  if (isOpen) field.focus();
});

// ── Recipe edit panel ─────────────────────────────────────────────────────────
let recipeEditId = null;

function openRecipeEditPanel(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return;
  recipeEditId = recipeId;

  // Fill fields
  const titleEl = document.getElementById("recipeEditTitle");
  const descEl = document.getElementById("recipeEditDescription");
  const timeEl = document.getElementById("recipeEditTime");
  const servEl = document.getElementById("recipeEditServings");
  if (titleEl) titleEl.value = recipe.title || "";
  if (descEl) descEl.value = recipe.description || "";
  if (timeEl) timeEl.value = recipe.time || "";
  if (servEl) servEl.value = recipe.servings || "";

  // Meal chips
  document.querySelectorAll(".recipe-edit__meal-chip").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.meal === (recipe.mealTag || "Avond"));
  });

  // Render ingredients
  renderEditIngredients(recipe.ingredients || []);

  // Render steps
  renderEditSteps(recipe.instructions || []);

  // Open panel
  const panel = document.getElementById("recipeEditPanel");
  if (panel) {
    panel.classList.add("profile-subpanel--active");
    panel.setAttribute("aria-hidden", "false");
    panel.scrollTop = 0;
  }
}

function closeRecipeEditPanel() {
  const panel = document.getElementById("recipeEditPanel");
  if (panel) {
    panel.classList.remove("profile-subpanel--active");
    panel.setAttribute("aria-hidden", "true");
  }
  recipeEditId = null;
}

function renderEditIngredients(ingredients) {
  const list = document.getElementById("recipeEditIngredientList");
  if (!list) return;
  list.innerHTML = ingredients.map((ing, i) => `
    <li class="recipe-edit__ingredient-item" data-ing-index="${i}">
      <div class="recipe-edit__ingredient-inputs">
        <input class="recipe-edit__qty-input" type="text" value="${escapeHtml(ing.quantity || "")}" placeholder="qty" data-ing-qty="${i}" />
        <input class="recipe-edit__unit-input" type="text" value="${escapeHtml(ing.unit === "x" ? "" : (ing.unit || ""))}" placeholder="eenheid" data-ing-unit="${i}" />
        <input class="recipe-edit__name-input" type="text" value="${escapeHtml(ing.name || "")}" placeholder="Ingredient" data-ing-name="${i}" />
      </div>
      <button class="recipe-edit__delete-btn" type="button" data-ing-delete="${i}" aria-label="Verwijder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </li>
  `).join("");
}

function renderEditSteps(steps) {
  const list = document.getElementById("recipeEditStepList");
  if (!list) return;
  list.innerHTML = steps.map((step, i) => `
    <li class="recipe-edit__step-item" data-step-index="${i}">
      <span class="recipe-edit__step-num">${i + 1}</span>
      <textarea class="recipe-edit__step-input" data-step-text="${i}" rows="2">${escapeHtml(step)}</textarea>
      <button class="recipe-edit__delete-btn" type="button" data-step-delete="${i}" aria-label="Verwijder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </li>
  `).join("");
}

function collectEditedRecipe() {
  const titleEl = document.getElementById("recipeEditTitle");
  const descEl = document.getElementById("recipeEditDescription");
  const timeEl = document.getElementById("recipeEditTime");
  const servEl = document.getElementById("recipeEditServings");
  const activeMeal = document.querySelector(".recipe-edit__meal-chip.is-active");

  const ingList = document.getElementById("recipeEditIngredientList");
  const ingredients = [];
  if (ingList) {
    ingList.querySelectorAll(".recipe-edit__ingredient-item").forEach(item => {
      const qty = item.querySelector("[data-ing-qty]")?.value.trim() || "";
      const unit = item.querySelector("[data-ing-unit]")?.value.trim() || "x";
      const name = item.querySelector("[data-ing-name]")?.value.trim() || "";
      if (name) ingredients.push({ quantity: qty || "1", unit: unit || "x", name });
    });
  }

  const stepList = document.getElementById("recipeEditStepList");
  const instructions = [];
  if (stepList) {
    stepList.querySelectorAll("[data-step-text]").forEach(ta => {
      const text = ta.value.trim();
      if (text) instructions.push(text);
    });
  }

  return {
    title: titleEl?.value.trim() || "",
    description: descEl?.value.trim() || "",
    time: timeEl?.value.trim() || "",
    servings: servEl?.value.trim() || "",
    mealTag: activeMeal?.dataset.meal || "Avond",
    ingredients,
    instructions,
  };
}

function saveRecipeEdits() {
  if (!recipeEditId) return;
  const idx = state.recipes.findIndex(r => r.id === recipeEditId);
  if (idx === -1) return;
  const edits = collectEditedRecipe();
  if (!edits.title) { showToast("Vul een naam in."); return; }
  state.recipes[idx] = { ...state.recipes[idx], ...edits };
  schedulePersistAppState();
  const savedId = recipeEditId;
  closeRecipeEditPanel();
  state.selectedRecipeId = savedId;
  switchView("detail");
  renderDetailRecipe(true);
  showToast("Recept opgeslagen.");
}

bindEvent(document.getElementById("recipeEditClose"), "click", closeRecipeEditPanel);
bindEvent(document.getElementById("recipeEditSave"), "click", saveRecipeEdits);

// Ingredient add
bindEvent(document.getElementById("recipeEditAddIngredient"), "click", () => {
  const list = document.getElementById("recipeEditIngredientList");
  if (!list) return;
  const i = list.children.length;
  const li = document.createElement("li");
  li.className = "recipe-edit__ingredient-item";
  li.dataset.ingIndex = i;
  li.innerHTML = `
    <div class="recipe-edit__ingredient-inputs">
      <input class="recipe-edit__qty-input" type="text" value="" placeholder="qty" data-ing-qty="${i}" />
      <input class="recipe-edit__unit-input" type="text" value="" placeholder="eenheid" data-ing-unit="${i}" />
      <input class="recipe-edit__name-input" type="text" value="" placeholder="Ingredient" data-ing-name="${i}" />
    </div>
    <button class="recipe-edit__delete-btn" type="button" data-ing-delete="${i}" aria-label="Verwijder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  `;
  list.appendChild(li);
  li.querySelector(".recipe-edit__name-input")?.focus();
});

// Step add
bindEvent(document.getElementById("recipeEditAddStep"), "click", () => {
  const list = document.getElementById("recipeEditStepList");
  if (!list) return;
  const i = list.children.length;
  const li = document.createElement("li");
  li.className = "recipe-edit__step-item";
  li.dataset.stepIndex = i;
  li.innerHTML = `
    <span class="recipe-edit__step-num">${i + 1}</span>
    <textarea class="recipe-edit__step-input" data-step-text="${i}" rows="2"></textarea>
    <button class="recipe-edit__delete-btn" type="button" data-step-delete="${i}" aria-label="Verwijder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  `;
  list.appendChild(li);
  li.querySelector("textarea")?.focus();
});

// Delete ingredient/step via delegation
bindEvent(document.getElementById("recipeEditIngredientList"), "click", (e) => {
  const btn = e.target.closest("[data-ing-delete]");
  if (!btn) return;
  btn.closest("li")?.remove();
});
bindEvent(document.getElementById("recipeEditStepList"), "click", (e) => {
  const btn = e.target.closest("[data-step-delete]");
  if (!btn) return;
  btn.closest("li")?.remove();
  // Re-number steps
  document.querySelectorAll(".recipe-edit__step-num").forEach((el, i) => { el.textContent = i + 1; });
});

// Meal chip selection
bindEvent(document.getElementById("recipeEditMealChips"), "click", (e) => {
  const chip = e.target.closest(".recipe-edit__meal-chip");
  if (!chip) return;
  document.querySelectorAll(".recipe-edit__meal-chip").forEach(c => c.classList.remove("is-active"));
  chip.classList.add("is-active");
});

// ── Import screen search ──────────────────────────────────────────────────────
let importSearchTimeout = null;
const importSearchInput = document.getElementById("importSearchInput");

if (importSearchInput) {
  importSearchInput.addEventListener("input", () => {
    const q = importSearchInput.value.trim();
    clearTimeout(importSearchTimeout);
    const orRow = document.getElementById("importOrRow");
    const section = document.getElementById("importChannelSearchSection");
    const results = document.getElementById("importChannelSearchResults");
    if (q.length < 2) {
      importChannelSearchAbortController?.abort();
      importChannelSearchAbortController = null;
      if (section) section.classList.add("hidden");
      if (orRow) orRow.classList.remove("hidden");
      return;
    }
    // Lightweight placeholder; the real skeleton is handled inside searchChannelsOnImportScreen.
    if (results) results.innerHTML = `<div style="padding:12px 14px"><div class="skeleton" style="height:12px;width:50%"></div></div>`;
    if (section) section.classList.remove("hidden");
    if (orRow) orRow.classList.add("hidden");
    importSearchTimeout = setTimeout(() => searchChannelsOnImportScreen(q), IMPORT_CHANNEL_SEARCH_DEBOUNCE_MS);
  });
}

bindEvent(document.getElementById("importChannelSearchClose"), "click", () => {
  const section = document.getElementById("importChannelSearchSection");
  const orRow = document.getElementById("importOrRow");
  if (section) section.classList.add("hidden");
  if (orRow) orRow.classList.remove("hidden");
  if (importSearchInput) importSearchInput.value = "";
});

// Import button inside import screen channel results
bindEvent(document.getElementById("importChannelSearchResults"), "click", async (event) => {
  const btn = event.target.closest(".ch-card__import");
  if (!(btn instanceof HTMLElement)) return;
  const url = btn.dataset.channelImportUrl;
  if (!url) return;
  const imageHint = btn.dataset.channelImportThumb || "";

  btn.disabled = true;
  btn.innerHTML = getChannelImportLoadingMarkup();

  showImportSplash(url);
  try {
    const resp = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, imageHint }),
    });
    const data = await resp.json();
    if (!resp.ok || !data.recipe)
      throw new Error(data.message || data.error || "Importeren mislukt");
    const recipe = normalizeImportedRecipe({ ...data.recipe, needsReview: true });
    // Keep as preview until user actually saves it to a cookbook
    recipe._previewCreatedAt = Date.now();
    state.importPreviews[recipe.id] = recipe;
    state.selectedRecipeId = recipe.id;
    // Clear search and go to review
    if (importSearchInput) importSearchInput.value = "";
    const section = document.getElementById("importChannelSearchSection");
    if (section) section.classList.add("hidden");
    trackClientEvent("client_channel_search_import", {
      surface: "import_screen_search",
      host: hostnameForAnalytics(url),
    });
    openImportReview(recipe.id);
  } catch (err) {
    showToast(err.message || "Importeren mislukt");
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg> Importeer`;
  } finally {
    hideImportSplash();
  }
});

// ── Cookbook strip on home screen ──────────────────────────────────────────────
bindEvent(document.getElementById("homeCbStrip"), "click", (event) => {
  // "add cookbook" card
  if (event.target.closest("#homeCookbookAddCard")) {
    openCookbookNameModal("create");
    return;
  }
  const btn = event.target.closest("[data-open-cookbook-home]");
  if (!(btn instanceof HTMLElement)) return;
  const cookbookId = btn.dataset.openCookbookHome;
  state.openCookbookId = cookbookId;
  switchView("cookbooks");
  renderCookbookList();
});

// "Bekijk alles" in cookbook strip heading
bindEvent(document.getElementById("homeCookbooksSectionHead"), "click", (event) => {
  const link = event.target.closest("[data-view]");
  if (!(link instanceof HTMLElement)) return;
  switchView(link.dataset.view);
});

syncPlatformUI();

// ── Onboarding ───────────────────────────────────────────────────────────────
function getOnboardingDoneKey() {
  const email = String(state?.auth?.email || "").trim().toLowerCase();
  return `plately-onboarding-v2:${email || "unknown"}`;
}
const ONBOARDING_SESSION_KEY = "plately-tooltips-shown-this-session"; // One-time per login session
const INSTALL_APP_SESSION_KEY = "plately-install-shown-this-session"; // One-time install modal per login session

const ONBOARDING_STEPS = [
  {
    selector: "#searchInput",
    text: "Zoeken naar recepten op je favoriete kanalen. Typ minimaal 2 letters om resultaten te zien. 🔍",
    dir: "below",
  },
  {
    selector: ".import-banner__input--full",
    text: "Plak hier een link van TikTok, Instagram of een receptwebsite — we importeren het recept automatisch voor je. 🍳",
    dir: "below",
  },
  {
    selector: ".kookboek-heading",
    text: "Al je opgeslagen recepten staan hier. Tik op een recept om het stap voor stap te koken.",
    dir: "below",
  },
  {
    selector: ".cookbook-filter-bar",
    text: "Filter op favorieten, snelle recepten of nieuwste toevoegingen.",
    dir: "below",
  },
  {
    selector: '[data-view="cookbooks"].nav-item',
    text: "Maak kookboeken om recepten te sorteren — handig voor weekmenu's of speciale gelegenheden. 📚",
    dir: "above",
  },
  {
    selector: '[data-view="grocery"].nav-item',
    text: "Voeg ingrediënten van recepten toe aan je boodschappenlijst en bestel ze direct bij Albert Heijn. 🛒",
    dir: "above",
  },
  {
    selector: '[data-view="settings"].nav-item',
    text: "Stel hier je account in, volg kookkanalen en kies je voorkeurstaal. 👤",
    dir: "above",
  },
];

let _obStep = 0;

function _obShow(index) {
  const overlay = document.getElementById("onboardingOverlay");
  const spotlight = document.getElementById("onboardingSpotlight");
  const bubble = document.getElementById("onboardingBubble");
  const textEl = document.getElementById("onboardingText");
  const progressEl = document.getElementById("onboardingProgress");
  const nextBtn = document.getElementById("onboardingNext");
  if (!overlay) return;

  if (index >= ONBOARDING_STEPS.length) {
    _obFinish();
    return;
  }

  const step = ONBOARDING_STEPS[index];
  const target = document.querySelector(step.selector);
  // Skip if target is missing OR not actually visible (display:none, hidden parent)
  if (!target) { _obShow(index + 1); return; }
  const initialRect = target.getBoundingClientRect();
  if (initialRect.width === 0 || initialRect.height === 0) {
    _obShow(index + 1);
    return;
  }

  // Scroll target into view before measuring (block: 'center' centers vertically)
  // Use behavior 'instant' if available so the spotlight lines up immediately.
  try {
    target.scrollIntoView({ block: "center", behavior: "smooth" });
  } catch {}

  // Wait a tick for the scroll to settle, then measure and position
  setTimeout(() => positionTooltip(target, step, index), 380);

  function positionTooltip(target, step, index) {
    overlay.hidden = false;
    overlay.removeAttribute("aria-hidden");

    const PAD = 8;
    const rect = target.getBoundingClientRect();

    // Spotlight
    spotlight.style.left = `${rect.left - PAD}px`;
    spotlight.style.top = `${rect.top - PAD}px`;
    spotlight.style.width = `${rect.width + PAD * 2}px`;
    spotlight.style.height = `${rect.height + PAD * 2}px`;
    spotlight.style.borderRadius = window.getComputedStyle(target).borderRadius || "16px";

    // Content
    textEl.textContent = step.text;
    progressEl.innerHTML = ONBOARDING_STEPS.map((_, i) =>
      `<span class="onboarding-dot ${i === index ? "onboarding-dot--active" : ""}"></span>`
    ).join("");
    nextBtn.textContent = index === ONBOARDING_STEPS.length - 1 ? "Klaar ✓" : "Volgende →";

    // Bubble position
    const BW = Math.min(270, window.innerWidth - 24);
    const MARGIN = 14;
    let bLeft = rect.left + rect.width / 2 - BW / 2;
    bLeft = Math.max(12, Math.min(bLeft, window.innerWidth - BW - 12));

    const arrowX = rect.left + rect.width / 2 - bLeft;
    bubble.style.setProperty("--arrow-x", `${Math.max(20, Math.min(arrowX, BW - 20))}px`);
    bubble.style.left = `${bLeft}px`;
    bubble.style.width = `${BW}px`;

    // Auto-flip direction when there's not enough space in the chosen direction
    let dir = step.dir || "below";
    const bubbleHeightEstimate = 160;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    if (dir === "below" && spaceBelow < bubbleHeightEstimate && spaceAbove > spaceBelow) {
      dir = "above";
    } else if (dir === "above" && spaceAbove < bubbleHeightEstimate && spaceBelow > spaceAbove) {
      dir = "below";
    }

    if (dir === "above") {
      bubble.style.top = "auto";
      bubble.style.bottom = `${Math.max(12, window.innerHeight - rect.top + MARGIN)}px`;
      bubble.dataset.arrow = "down";
    } else {
      bubble.style.bottom = "auto";
      bubble.style.top = `${Math.min(window.innerHeight - bubbleHeightEstimate - 12, rect.bottom + MARGIN)}px`;
      bubble.dataset.arrow = "up";
    }
  }
}

function _obFinish() {
  const overlay = document.getElementById("onboardingOverlay");
  if (overlay) { overlay.hidden = true; overlay.setAttribute("aria-hidden", "true"); }
  if (state?.auth?.authenticated) {
    if (!state.profile) state.profile = {};
    if (!state.profile.onboardingSeenAt) state.profile.onboardingSeenAt = new Date().toISOString();
    try { localStorage.setItem(getOnboardingDoneKey(), "1"); } catch {}
    // Fire-and-forget: mark onboarding seen on server so it's once-per-account.
    fetchJson(`${state.apiBase}/api/onboarding/seen`, { method: "POST" }).catch(() => {});
  }
  window.scrollTo(0, 0);
}

function startOnboarding() {
  // Show tooltips only once per account (persisted across sessions)
  if (!state.auth.authenticated) return;

  // Source of truth: server-provided onboardingSeenAt
  if (state?.profile?.onboardingSeenAt) return;

  // Check if we already showed tooltips in this session
  try { if (sessionStorage.getItem(ONBOARDING_SESSION_KEY)) return; } catch {}

  // Mark tooltips as shown for this session
  try { sessionStorage.setItem(ONBOARDING_SESSION_KEY, "1"); } catch {}

  _obStep = 0;
  setTimeout(() => _obShow(0), 600);
}

document.getElementById("onboardingNext")?.addEventListener("click", () => {
  _obStep++;
  _obShow(_obStep);
});
document.getElementById("onboardingSkip")?.addEventListener("click", _obFinish);

// Don't render yet - wait for bootstrapSession() to check authentication first
// startOnboarding();

// Logo altijd terug naar home
document.querySelectorAll(".brand-logo").forEach((logo) => {
  logo.style.cursor = "pointer";
  logo.addEventListener("click", () => switchView("home"));
});

refreshBackendStatus();
registerServiceWorker();
bindFeaturePushToggle();
bindPushCategoryToggles();
bindPushTriggerToggles();
refreshFeaturePushState().catch(() => {});

// Prevent browser history navigation from restoring scroll position.
try {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
} catch { /* ignore */ }

// Bootstrap session - this will render the app AFTER checking authentication
bootstrapSession();

// ── URL Scheme Handler (for iOS share integration) ────────────────────────────
// Handle plately://import?url=... URL scheme from iOS share sheet
function handleUrlSchemeImport() {
  // Check for importUrl query parameter (set by iOS share handler or Siri Shortcut)
  const params = new URLSearchParams(window.location.search);
  const importUrl = params.get('importUrl');

  if (importUrl) {
    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(importUrl);

    // Clear the URL parameter immediately (so it doesn't persist on page reload)
    window.history.replaceState({}, document.title, window.location.pathname);

    // Switch to import view
    switchView('import');

    // Auto-start import after a short delay to ensure form is ready
    setTimeout(() => {
      if (recipeUrlInput) {
        const url = extractUrl(decodedUrl);
        const submitButton = document.getElementById("submitImport");

        // Populate the recipe URL input
        recipeUrlInput.value = url;
        recipeNoteInput.value = '';

        // Auto-submit the import
        submitImport(
          url,
          '',
          (message) => {
            if (importFeedback) importFeedback.textContent = message;
          },
          (isLoading) => {
            if (submitButton) {
              submitButton.disabled = isLoading;
              submitButton.textContent = isLoading ? "Importeren..." : "Recept importeren";
            }
          },
          (importedRecipe) => {
            // On success: show review screen
            importForm.reset();
            state.selectedPlatform = "tiktok";
            syncPlatformUI();
            closeModal();
            openImportReview(importedRecipe.id);
            showToast(`${importedRecipe.title} klaar om na te lopen.`);
          }
        );
      }
    }, 150);
  }
}

// Call the URL scheme handler after session is loaded
handleUrlSchemeImport();

// ── Onboarding flow (after successful registration) ────────────────────────────
const onboardingScreen = document.getElementById("onboardingScreen");
let onboardingData = {
  channels: [],
  cookbook: "",
  supermarket: "ah",
  suggestedChannels: [],
  firstRecipeSeedId: "",
};

function resetOnboardingData() {
  const sortedSeed = getSeedChannelsSortedByName().filter((ch) => isSeedChannelEnabled(ch.id));
  onboardingData = {
    channels: sortedSeed.map((ch) => ch.id),
    cookbook: "",
    supermarket: "ah",
    suggestedChannels: [],
    firstRecipeSeedId: "",
  };
}

function showOnboarding() {
  resetOnboardingData();
  authModal.classList.add("hidden");
  authModal.setAttribute("aria-hidden", "true");
  onboardingScreen.classList.remove("hidden");

  const cookbookInput = document.getElementById("onboardingCookbookName");
  if (cookbookInput instanceof HTMLInputElement) cookbookInput.value = "";

  const overlay = document.getElementById("onboardingOverlay");
  if (overlay) overlay.setAttribute("hidden", "");

  showOnboardingStep(1);
  renderOnboardingRecipePick();
  renderOnboardingSupermarkets();
}

function showOnboardingStep(step) {
  const safe = Math.min(Math.max(Number(step) || 1, 1), 3);
  ["onboardingStep1", "onboardingStep2", "onboardingStep3"].forEach((id) => {
    document.getElementById(id)?.classList.add("hidden");
  });
  document.getElementById(`onboardingStep${safe}`)?.classList.remove("hidden");
  updateOnboardingProgress(safe);
}

function updateOnboardingProgress(step) {
  document.querySelectorAll(".onboarding-progress-dot").forEach((dot, i) => {
    if (i + 1 === step) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function renderOnboardingRecipePick() {
  const grid = document.getElementById("onboardingRecipePickGrid");
  if (!grid) return;

  grid.innerHTML = ONBOARDING_FIRST_RECIPE_IDS.map((rid) => {
    const r = initialRecipes.find((x) => x && x.id === rid);
    if (!r) return "";
    const sel = onboardingData.firstRecipeSeedId === rid ? " selected" : "";
    const img = escapeHtml(r.image || "");
    const title = escapeHtml(r.title || "");
    const safeId = escapeHtml(rid);
    return `<button type="button" class="onboarding-recipe-card${sel}" data-onboarding-recipe-seed="${safeId}">
      <img class="onboarding-recipe-card__img" src="${img}" alt="" loading="lazy" />
      <div class="onboarding-recipe-card__body"><p class="onboarding-recipe-card__title">${title}</p></div>
    </button>`;
  }).join("");

  grid.querySelectorAll("[data-onboarding-recipe-seed]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.onboardingRecipeSeed || "";
      onboardingData.firstRecipeSeedId = id;
      grid.querySelectorAll(".onboarding-recipe-card").forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        const sid = el.dataset.onboardingRecipeSeed || "";
        el.classList.toggle("selected", Boolean(id) && sid === id);
      });
    });
  });
}

function renderOnboardingSupermarkets() {
  const list = document.getElementById("onboardingSupermarketsList");
  if (!list) return;
  list.innerHTML = SUPERMARKETS.map((sm) => {
    const faviconUrl = getSupermarketIconUrl(sm);
    const isSelected = onboardingData.supermarket === sm.id;
    const supportedBadge = sm.supported
      ? ""
      : `<span class="onboarding-supermarket-item__badge">Binnenkort</span>`;
    return `
      <label class="onboarding-channel-item onboarding-supermarket-item${isSelected ? " selected" : ""}" data-supermarket-id="${escapeHtml(sm.id)}">
        <input type="radio" name="onboardingSupermarket" data-supermarket-radio="${escapeHtml(sm.id)}" ${isSelected ? "checked" : ""} />
        <span class="onboarding-channel-avatar" style="background:${escapeHtml(sm.color)}1a">
          ${faviconUrl ? `<img class="onboarding-channel-avatar__favicon" src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/><span style="display:none;font-weight:800;font-size:.65rem">${escapeHtml(sm.name[0])}</span>` : `<span style="font-weight:800;font-size:.65rem">${escapeHtml(sm.name[0])}</span>`}
        </span>
        <span>${escapeHtml(sm.name)}</span>
        ${supportedBadge}
      </label>
    `;
  }).join("");

  list.querySelectorAll("input[type=radio]").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const id = e.target.dataset.supermarketRadio;
      onboardingData.supermarket = id;
      list.querySelectorAll(".onboarding-supermarket-item").forEach((label) => {
        label.classList.toggle("selected", label.dataset.supermarketId === id);
      });
    });
  });
}

function finishOnboarding() {
  const cookbookInput = document.getElementById("onboardingCookbookName");
  onboardingData.cookbook =
    cookbookInput instanceof HTMLInputElement ? cookbookInput.value.trim() : String(onboardingData.cookbook || "").trim();

  state.followedChannelIds = [...new Set((onboardingData.channels || []).filter((id) => isSeedChannelEnabled(id)))];

  if (Array.isArray(onboardingData.suggestedChannels) && onboardingData.suggestedChannels.length > 0) {
    state.customChannels.push(...onboardingData.suggestedChannels);
  }

  let newCookbookId = "";
  if (onboardingData.cookbook) {
    const newCb = {
      id: "cb-" + Date.now(),
      name: onboardingData.cookbook,
      recipeIds: [],
    };
    state.cookbooks.push(newCb);
    newCookbookId = newCb.id;
    state.selectedCookbookId = newCb.id;
  }

  ensureFavoritesCookbookExists({ persist: false });
  const favoritesRow = state.cookbooks.find((cb) => cb && cb.name === FAVORITES_COOKBOOK_NAME);
  const cookbookForRecipe =
    newCookbookId || state.selectedCookbookId || favoritesRow?.id || state.cookbooks[0]?.id || "";

  const seedPick = onboardingData.firstRecipeSeedId;
  if (seedPick && cookbookForRecipe) {
    const clone = cloneSeedRecipeForUserCollection(seedPick);
    if (clone) {
      state.recipes = [clone, ...state.recipes.filter((r) => r && r.id !== clone.id)];
      saveRecipeToCookbook(clone.id, cookbookForRecipe, { silentToast: true });
    }
  }

  state.profile.favoriteSupermarket = onboardingData.supermarket || "ah";

  onboardingScreen.classList.add("hidden");
  switchView("home");
  renderAll();
  persistAppState();
  showToast("Welkom bij Plately!");
  setTimeout(() => startOnboarding(), 800);
}

function abandonRegistrationOnboarding() {
  state.followedChannelIds = [...new Set((onboardingData.channels || []).filter((id) => isSeedChannelEnabled(id)))];
  state.profile.favoriteSupermarket = onboardingData.supermarket || state.profile.favoriteSupermarket || "ah";
  onboardingScreen.classList.add("hidden");
  switchView("home");
  renderAll();
  persistAppState();
  showToast("Je kunt alles nog instellen onder Instellingen.");
}

// ── Onboarding event listeners ─────────────────────────────────────────────────
bindEvent(document.getElementById("onboardingClose"), "click", () => {
  abandonRegistrationOnboarding();
});

bindEvent(document.getElementById("onboardingStep1Skip"), "click", () => {
  showOnboardingStep(2);
});

bindEvent(document.getElementById("onboardingStep1Next"), "click", () => {
  showOnboardingStep(2);
});

bindEvent(document.getElementById("onboardingStep2Skip"), "click", () => {
  showOnboardingStep(3);
});

bindEvent(document.getElementById("onboardingStep2Next"), "click", () => {
  showOnboardingStep(3);
});

// Suggestion pills for cookbook names
document.querySelectorAll(".onboarding-suggestion-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    const suggestedName = pill.dataset.cookbookSuggest;
    const input = document.getElementById("onboardingCookbookName");
    if (input) {
      input.value = suggestedName;
      input.focus();
    }
  });
});

bindEvent(document.getElementById("onboardingStep3Skip"), "click", () => {
  finishOnboarding();
});

bindEvent(document.getElementById("onboardingStep3Next"), "click", () => {
  finishOnboarding();
});

// ── Confirm sheet ──────────────────────────────────────────────────────────────
bindEvent(document.getElementById("confirmSheetBackdrop"), "click", closeConfirmSheet);
bindEvent(document.getElementById("confirmSheetCancelBtn"), "click", closeConfirmSheet);
bindEvent(document.getElementById("confirmSheetConfirmBtn"), "click", () => {
  // Capture callback BEFORE closing (closeConfirmSheet sets it to null)
  const cb = confirmCallback;
  closeConfirmSheet();
  if (typeof cb === "function") cb();
});
bindEvent(document.getElementById("confirmSheetAltBtn"), "click", () => {
  const cb = confirmAltCallback;
  closeConfirmSheet();
  if (typeof cb === "function") cb();
});

// ── iOS Share Setup Modal ─────────────────────────────────────────────────────
const iosShareSetupBtn = document.getElementById("iosShareSetupBtn");
if (iosShareSetupBtn) {
  iosShareSetupBtn.addEventListener("click", showIosSetupModal);
}

const iosSetupBackdrop = document.getElementById("iosSetupBackdrop");
if (iosSetupBackdrop) {
  iosSetupBackdrop.addEventListener("click", closeIosSetupModal);
}

const iosSetupCloseBtn = document.getElementById("iosSetupCloseBtn");
if (iosSetupCloseBtn) {
  iosSetupCloseBtn.addEventListener("click", closeIosSetupModal);
}

// ── Admin Dashboard ────────────────────────────────────────────────────────────
// Admin dashboard button in settings
const adminDashboardBtn = document.getElementById("adminDashboardBtn");
if (adminDashboardBtn) {
  adminDashboardBtn.addEventListener("click", () => {
    switchView("admin");
    renderAdminScreen();
  });
}

// Home button in admin screen
if (adminScreen) {
  const adminHomeBtn = adminScreen.querySelector(".brand-lockup");
  if (adminHomeBtn) {
    adminHomeBtn.addEventListener("click", () => switchView("home"));
  }
}

// User search filter
const adminUserSearch = document.getElementById("adminUserSearch");
if (adminUserSearch) {
  let adminUserSearchTimeout = null;
  adminUserSearch.addEventListener("input", (e) => {
    clearTimeout(adminUserSearchTimeout);
    const term = String(e?.target?.value || "").trim().toLowerCase();
    adminUserSearchTimeout = setTimeout(() => {
      const userItems = document.querySelectorAll("#adminUsersList > div");
      userItems.forEach((item) => {
        if (!(item instanceof HTMLElement)) return;
        if (!item.dataset.emailLower) {
          const email = item.querySelector("div")?.textContent || "";
          item.dataset.emailLower = String(email).toLowerCase();
        }
        item.style.display = item.dataset.emailLower.includes(term) ? "" : "none";
      });
    }, 160);
  });
}

// User delete buttons (delegated event handling)
const adminUsersList = document.getElementById("adminUsersList");
if (adminUsersList) {
  adminUsersList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest("[data-admin-delete-user]");
    if (deleteBtn instanceof HTMLElement && deleteBtn.dataset.adminDeleteUser) {
      const userId = deleteBtn.dataset.adminDeleteUser;
      const userEmail = deleteBtn.closest("div")?.querySelector("div")?.textContent || "gebruiker";

      // Show confirmation
      showConfirmSheet(
        `Verwijder "${userEmail}"?`,
        "Deze actie kan niet ongedaan gemaakt worden.",
        "Verwijderen",
        () => deleteAdminUser(userId)
      );
    }
  });
}

// ────────────────────────────────────────────────────────────────────────────
// PWA: Add to Home Screen (Android + iOS)
// ────────────────────────────────────────────────────────────────────────────

let installPrompt = null;
const installAppSheet = document.getElementById("installAppSheet");
const installAppBackdrop = document.getElementById("installAppBackdrop");

// Detect iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Show install app modal once per session (after login)
function showInstallAppModal() {
  if (!state.auth.authenticated) return;

  // Check if we already showed the modal this session
  try { if (sessionStorage.getItem(INSTALL_APP_SESSION_KEY)) return; } catch {}

  // Mark modal as shown for this session
  try { sessionStorage.setItem(INSTALL_APP_SESSION_KEY, "1"); } catch {}

  if (installAppSheet && installAppBackdrop) {
    installAppSheet.classList.remove("hidden");
    installAppBackdrop.classList.remove("hidden");
  }
}

// Close install app modal
function closeInstallAppModal() {
  if (installAppSheet && installAppBackdrop) {
    installAppSheet.classList.add("hidden");
    installAppBackdrop.classList.add("hidden");
  }
}

// Listen for the beforeinstallprompt event (Android only)
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the mini-infobar from appearing automatically
  event.preventDefault();
  // Store the event for later use
  installPrompt = event;
});

async function promptInstallApp() {
  if (installPrompt) {
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    installPrompt = null;
    return;
  }

  if (isIOS) {
    showToast("📱 Op iPhone: Tik op Delen → Voeg toe aan startscherm");
    return;
  }

  showToast("📱 Uw browser ondersteunt app-installatie niet via deze knop");
}

// Handle modal buttons
const installAppConfirmBtn = document.getElementById("installAppConfirmBtn");
const installAppSkipBtn = document.getElementById("installAppSkipBtn");

if (installAppConfirmBtn) {
  installAppConfirmBtn.addEventListener("click", async () => {
    closeInstallAppModal();
    promptInstallApp();
  });
}

if (installAppSkipBtn) {
  installAppSkipBtn.addEventListener("click", () => {
    closeInstallAppModal();
  });
}

if (installAppBackdrop) {
  installAppBackdrop.addEventListener("click", closeInstallAppModal);
}

// Hide install button when app is already installed
window.addEventListener("appinstalled", () => {
  console.log("✅ Plately installed successfully!");
});
