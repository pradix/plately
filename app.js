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
    name: "Sarah de Vries",
    handle: "@sarahkookt",
    email: "",
    photo: "",
    favoriteSupermarket: "ah",
  },
  language: "nl",
  groceryItems: [],
  basketPreview: null,
  basketServings: 2, // current persons
  basketBaseServings: 2, // base when basket was opened
  basketFilter: { bio: false },
  cookbooks: [],
  selectedCookbookId: "",
  pendingCookbookSaveRecipeId: "",
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
  homeRecipesExpanded: false,
  followedChannelIds: ["ch-ah"], // Start with only Allerhande (primary Dutch recipe source)
  customChannels: [],
  channelSearchFilter: null,
  channelSearchAllResults: [],
  openCookbookId: null,
  cookbookSelectMode: false,
  cookbookSelectedRecipeIds: [],
  cookbooksSelectMode: false,
  cookbooksSelectedIds: [],
};

const SEED_RECIPE_IDS = new Set(initialRecipes.map((recipe) => recipe.id));

const SEED_CHANNELS = [
  { id: "ch-ah",  initials: "AH",  name: "Allerhande",          color: "#0071c2", url: "https://www.ah.nl/allerhande" },
  { id: "ch-24k", initials: "24K", name: "24 Kitchen",          color: "#e82828", url: "https://www.24kitchen.nl/recepten" },
  { id: "ch-ek",  initials: "EK",  name: "Eef Kookt Zo",        color: "#d4789e", url: "https://www.eefkooktzo.nl" },
  { id: "ch-mj",  initials: "MJ",  name: "Miljuschka",           color: "#2d2d2d", url: "https://miljuschka.nl" },
  { id: "ch-up",  initials: "UP",  name: "Uit Paulines Keuken",  color: "#e8a020", url: "https://uitpaulineskeuken.nl" },
  { id: "ch-clf", initials: "CLF", name: "Chicks Love Food",     color: "#e04458", url: "https://www.chickslovefood.com" },
  { id: "ch-les", initials: "LS",  name: "Lekker & Simpel",      color: "#4d9e5a", url: "https://www.lekkerensimpel.com" },
  { id: "ch-lb",  initials: "LB",  name: "Laura's Bakery",       color: "#e879a0", url: "https://www.laurasbakery.nl" },
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
const homeImportForm = document.getElementById("homeImportForm");
const homeImportUrl = document.getElementById("homeImportUrl");
const homeImportSubmit = document.getElementById("homeImportSubmit");
const homeImportFeedback = document.getElementById("homeImportFeedback");
const recipeUrlInput = document.getElementById("recipeUrl");
const recipeNoteInput = document.getElementById("recipeNote");
const searchInput = document.getElementById("searchInput");
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
const detailStepCount = document.getElementById("detailStepCount");
const detailIngredientCount = document.getElementById("detailIngredientCount");
const servingsDisplay = document.getElementById("servingsDisplay");
const detailIngredientList = document.getElementById("detailIngredientList");
const checkAllIngredientsButton = document.getElementById("checkAllIngredientsButton");
const uncheckAllIngredientsButton = document.getElementById("uncheckAllIngredientsButton");
const detailStepList = document.getElementById("detailStepList");
const addSelectedToGroceriesButton = document.getElementById("addSelectedToGroceriesButton");
const grocerySubtitle = document.getElementById("grocerySubtitle");
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
const cookbookNameModal = document.getElementById("cookbookNameModal");
const cookbookNameInput = document.getElementById("cookbookNameInput");
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
    const currentStep = Number.isFinite(progress.currentStep) ? Math.max(0, Math.floor(progress.currentStep)) : 0;

    accumulator[recipeId] = {
      checkedIngredients,
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
      currentStep: 0,
      cookMode: false,
    };
  }

  if (!state.recipeProgress[cleanId]) {
    state.recipeProgress[cleanId] = {
      checkedIngredients: [],
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
function showConfirm({ title, subtitle, confirmLabel = "Bevestigen", destructive = false, onConfirm }) {
  const sheet = document.getElementById("confirmSheet");
  const titleEl = document.getElementById("confirmSheetTitle");
  const subtitleEl = document.getElementById("confirmSheetSubtitle");
  const confirmBtn = document.getElementById("confirmSheetConfirmBtn");
  if (!sheet) return;
  if (titleEl) titleEl.textContent = title || "";
  if (subtitleEl) subtitleEl.textContent = subtitle || "";
  if (confirmBtn) {
    confirmBtn.textContent = confirmLabel;
    confirmBtn.className = "confirm-sheet__btn confirm-sheet__btn--confirm" + (destructive ? " confirm-sheet__btn--destructive" : "");
  }
  confirmCallback = onConfirm || null;
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

  // Show/hide admin dashboard button based on authentication
  const adminBtn = document.getElementById("adminDashboardBtn");
  const adminDivider = document.getElementById("adminDashboardDivider");
  if (adminBtn && adminDivider) {
    const shouldShowAdmin = isAdmin();
    adminBtn.style.display = shouldShowAdmin ? "" : "none";
    adminDivider.style.display = shouldShowAdmin ? "" : "none";
  }
}

function openAuthModal(mode = "login") {
  console.log("🔐 Opening auth modal, mode:", mode, "authModal element:", authModal);
  state.auth.mode = mode;
  const isRegister = mode === "register";

  if (!authModal) {
    console.error("❌ authModal element not found!");
    return;
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

function getCookbookCoverMarkup(cookbook, modifier = "cookbook-save-option__cover") {
  const recipes = (cookbook?.recipeIds || [])
    .map((recipeId) => getRecipeById(recipeId))
    .filter(Boolean);
  const coverRecipes = recipes.slice(0, 4);

  if (!coverRecipes.length) {
    return `<span class="${modifier} ${modifier}--empty" aria-hidden="true">＋</span>`;
  }

  if (coverRecipes.length === 1) {
    const recipe = coverRecipes[0];
    return `
      <span class="${modifier}" aria-hidden="true">
        <img src="${escapeHtml(recipe.image)}" alt="" loading="lazy" />
      </span>
    `;
  }

  return `
    <span class="${modifier} ${modifier}--grid" aria-hidden="true">
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

  cookbookSaveList.innerHTML = state.cookbooks
    .map((cookbook) => {
      const recipeCount = cookbook.recipeIds.length;
      const containsRecipe = cookbook.recipeIds.includes(recipeId);
      const isDefaultCookbook = cookbook.id === state.selectedCookbookId;
      const meta = containsRecipe
        ? "Staat hier al in"
        : isDefaultCookbook
          ? `Standaard kookboek • ${recipeCount} recepten`
          : `${recipeCount} recepten`;

      return `
        <button
          class="cookbook-save-option ${isDefaultCookbook ? "is-default" : ""}"
          type="button"
          data-save-cookbook-id="${cookbook.id}"
          data-save-recipe-id="${escapeHtml(recipeId)}"
        >
          ${getCookbookCoverMarkup(cookbook)}
          <span class="cookbook-save-option__copy">
            <strong>${escapeHtml(cookbook.name)}</strong>
            <span>${escapeHtml(meta)}</span>
          </span>
          <span class="cookbook-save-option__indicator" aria-hidden="true">
            ${containsRecipe ? "✓" : isDefaultCookbook ? "★" : "+"}
          </span>
        </button>
      `;
    })
    .join("");
}

function openCookbookSaveModal(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe || !cookbookSaveModal) {
    return;
  }

  state.pendingCookbookSaveRecipeId = recipe.id;
  if (cookbookSaveRecipeTitle) {
    cookbookSaveRecipeTitle.textContent = `${recipe.title} opslaan in welk kookboek?`;
  }
  renderCookbookSaveList(recipe.id);
  cookbookSaveModal.classList.remove("hidden");
  cookbookSaveModal.setAttribute("aria-hidden", "false");
}

function closeCookbookSaveModal() {
  if (!cookbookSaveModal) {
    return;
  }

  cookbookSaveModal.classList.add("hidden");
  cookbookSaveModal.setAttribute("aria-hidden", "true");
  state.pendingCookbookSaveRecipeId = "";
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
  state.basketPreview = null;
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

function renderBasketPreview() {
  const preview = state.basketPreview;
  const nameEl = document.getElementById("basketRecipeName");
  const listEl = document.getElementById("basketSheetList");
  const totalEl = document.getElementById("basketSheetTotal");
  const ctaBtn = document.getElementById("basketSheetCta");
  if (!preview || !listEl) return;

  if (nameEl) nameEl.textContent = preview.recipeTitle || "Boodschappenlijst";

  // Update servings label
  const servLabel = document.getElementById("basketServingsLabel");
  if (servLabel) {
    const noun = state.basketServings === 1 ? "persoon" : "personen";
    servLabel.textContent = `${state.basketServings} ${noun}`;
  }

  // Update filter chip active state
  document.getElementById("basketFilterBio")?.classList.toggle("is-active", state.basketFilter.bio);

  let totalCents = 0;
  const servScale = state.basketBaseServings > 0
    ? state.basketServings / state.basketBaseServings
    : 1;

  listEl.innerHTML = preview.items.map((item, itemIndex) => {
    const choice = item.choices?.[item.selectedChoiceIndex || 0];
    if (!choice) return "";

    const priceNum = parseFloat((choice.price || "0").replace("€", "").replace(",", ".")) || 0;
    const qty = Math.max(1, Math.round((item.qty || 1) * servScale));
    totalCents += Math.round(priceNum * qty * 100);

    const img = choice.imageUrl
      ? `<img class="basket-product__img" src="${escapeHtml(choice.imageUrl)}" alt="" loading="lazy" />`
      : `<span class="basket-product__img basket-product__img--placeholder">${escapeHtml(choice.emoji || "🛒")}</span>`;

    const altCount = (item.choices || []).length;

    const bioActive = state.basketFilter.bio;
    const displayTitle = bioActive
      ? `🌱 Biologisch ${choice.title}`
      : choice.title;

    return `
      <div class="basket-product" data-basket-item="${itemIndex}">
        <div class="basket-product__img-wrap">
          ${img}
          ${altCount > 1 ? `<button class="basket-product__swap" type="button" aria-label="Wissel product" data-basket-swap="${itemIndex}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
          </button>` : ""}
        </div>
        <div class="basket-product__info">
          <p class="basket-product__name">${escapeHtml(displayTitle)}</p>
          <p class="basket-product__meta">${escapeHtml(choice.price || "")}${choice.subtitle ? ` · ${escapeHtml(choice.subtitle)}` : ""}</p>
          <p class="basket-product__for">voor ${escapeHtml(item.ingredientAmount || "")} ${escapeHtml(item.ingredientTitle || "")}</p>
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
  }).join("");

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

function openBasketModal(preview) {
  state.basketPreview = preview;
  // Derive base servings from the recipe that was active when basket was built
  const recipe = state.selectedRecipeId ? getRecipeById(state.selectedRecipeId) : null;
  const base = recipe ? parseBaseServings(recipe.servings) : 2;
  state.basketBaseServings = base;
  state.basketServings = base;
  state.basketFilter = { bio: false };
  renderBasketPreview();
  const overlay = document.getElementById("basketOverlay");
  if (overlay) {
    overlay.hidden = false;
    overlay.classList.remove("hidden");
  }
}

function goHome() {
  closeModal();
  closeBasketModal();
  switchView("home");
}

function switchView(view) {
  // Enforce authentication for all protected views
  // Only enforce after session check is complete (state.session.ready)
  if (state.session.ready && !state.auth.authenticated && view !== "detail") {
    // Allow detail view (might be switching from authenticated state)
    // but require login for all other views
    openAuthModal("login");
    return;
  }

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

  if (view !== "detail" && state.keepAwake) {
    releaseWakeLock();
  } else if (view === "detail" && state.keepAwake) {
    requestWakeLock();
  }

  // Reset cookbook detail view when leaving settings
  if (view !== "settings" && state.openCookbookId) {
    state.openCookbookId = null;
  }

  window.scrollTo({ top: 0, behavior: "auto" });

  // When entering grocery screen, kick off a photo fetch for items that don't have one yet
  if (view === "grocery") {
    debouncedFetchGroceryPhotos();
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
  const unit = ingredient.unit === "x" ? "" : ingredient.unit;
  return `${quantity}${unit ? ` ${unit}` : ""}`.trim();
}

function parseIngredientInput(value) {
  const cleanValue = String(value || "").trim();
  const match = cleanValue.match(
    /^(\d+(?:[.,]\d+)?)\s*(gr|gram|grams|g|kg|mg|ml|cl|dl|l|liter|el|eetlepels?|tl|theelepels?|tbsp|tsp|cup|cups|oz|lb|stuks?|stuk(?:ken)?|krop|kroppen|bosje|bosjes|zakje|zakjes|pot(?:je|jes)?|blik(?:je|jes)?|snuf(?:je|jes)?|teen|teentjes|plak(?:je|jes)?|handje|handjes|scheut(?:je)?|bakje|bakjes|pak(?:ken)?|rol(?:len)?|verpakking(?:en)?|takje|takjes|blokje|blokjes)?\s*(.+)$/i
  );
  if (match) {
    // Normalize "gr" and "gram" → "g"
    let unit = (match[2] || "x").toLowerCase();
    if (unit === "gr" || unit === "gram" || unit === "grams") unit = "g";
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
  if (value === "gr" || value === "gram" || value === "grams") return "g";
  if (value === "liter") return "l";
  if (value === "milliliter") return "ml";
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

function getActiveFollowedSeedChannelIds() {
  // Only seed channels can be toggled; custom channels are passed separately via customChannels param.
  // Pending/rejected custom channels should never block seed searching.
  return state.followedChannelIds.filter((id) => SEED_CHANNELS.some((ch) => ch.id === id));
}

function countActiveFollowedChannels() {
  const seedActive = getActiveFollowedSeedChannelIds().length;
  const approvedCustomActive = state.customChannels.filter(
    (ch) => state.followedChannelIds.includes(ch.id) && (ch.status || "approved") === "approved"
  ).length;
  return seedActive + approvedCustomActive;
}

function normalizeChannelThumbnailUrl(url) {
  const raw = String(url || "").trim().replace(/[\\'"]+$/g, "");
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) {
    try {
      const host = new URL(raw).hostname.replace(/^www\./, "").toLowerCase();
      const proxyHosts = new Set(["static.ah.nl", "lekkerensimpel.com", "lekkeren-simpel.nl", "i0.wp.com", "i1.wp.com", "i2.wp.com", "i3.wp.com"]);
      if (proxyHosts.has(host) || host.endsWith(".static.ah.nl")) {
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

function renderChannelSearchResults(results, filter = state.channelSearchFilter) {
  if (!channelSearchSection || !channelSearchResults) return;

  state.channelSearchAllResults = results ?? state.channelSearchAllResults;
  // If the current filter doesn't exist in these results, reset to "Alles"
  // to avoid the UI showing "no results" while there actually are results.
  const presentChannelIds = [...new Set((state.channelSearchAllResults || []).map((r) => r.channelId).filter(Boolean))];
  const effectiveFilter = filter && presentChannelIds.includes(filter) ? filter : "";
  state.channelSearchFilter = effectiveFilter || null;

  const all = state.channelSearchAllResults;

  console.log("📊 renderChannelSearchResults:", {
    receivedResults: results ? results.length : 0,
    allResults: all ? all.length : 0,
    activeFilter: filter,
    searchQuery: state.channelSearchQuery,
    results: all ? all.slice(0, 3) : []  // Show first 3 results for debugging
  });

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
      channelSearchResults.innerHTML = `<p class="ch-result__loading" style="grid-column:1/-1;text-align:center;padding:2rem">Geen resultaten gevonden in de geselecteerde kanalen</p>`;
    }
    return;
  }

  const filtered = effectiveFilter ? all.filter((r) => r.channelId === effectiveFilter) : all;

  console.log("📊 Filtered results:", {
    filterApplied: !!effectiveFilter,
    filteredCount: filtered.length,
    filterChannelId: effectiveFilter,
    resultChannelIds: all.map(r => r.channelId)
  });

  channelSearchSection.classList.remove("hidden");
  renderChannelFilterChips(all);

  if (!filtered.length) {
    // Safety net: if a filter produced zero results, show all results instead.
    console.warn("⚠️  No filtered results! Falling back to all. Filter:", effectiveFilter);
    state.channelSearchFilter = null;
    renderChannelFilterChips(all);
    channelSearchResults.innerHTML = `<div class="ch-result-grid">${all.map((r) => {
      const allCh = getAllChannels();
      const channel = allCh.find((ch) => ch.id === r.channelId);
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
    return;
  }

  channelSearchResults.innerHTML = `<div class="ch-result-grid">${filtered.map((r) => {
    const allCh = getAllChannels();
    const channel = allCh.find((ch) => ch.id === r.channelId);
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
    renderChannelSearchResults([]);
    return;
  }
  state.channelSearchQuery = query.trim();

  if (channelSearchSection) {
    channelSearchSection.classList.remove("hidden");
    if (channelSearchResults) channelSearchResults.innerHTML = `<p class="ch-result__loading"><span class="plately-hourglass"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12v6c0 2-2 3-6 3s-6-1-6-3V2z" fill="#8da485" stroke="#8da485" stroke-width="1.5"/><path d="M6 22h12v-6c0-2-2-3-6-3s-6 1-6 3v6z" fill="#8da485" stroke="#8da485" stroke-width="1.5"/><rect x="11" y="9" width="2" height="6" fill="#f6b69d"/></svg></span>Zoeken…</p>`;
  }
  try {
    const channels = getActiveFollowedSeedChannelIds().join(",");
    // Only include approved custom channels in search
    const followedCustomChannels = state.customChannels.filter((ch) => state.followedChannelIds.includes(ch.id) && (ch.status || "approved") === "approved");
    const customChannelsParam = followedCustomChannels.map((ch) => `${ch.id}|${ch.name}|${ch.url}`).join(",");
    let url = `/api/channel-search?q=${encodeURIComponent(query.trim())}&channels=${encodeURIComponent(channels)}`;
    if (customChannelsParam) url += `&customChannels=${encodeURIComponent(customChannelsParam)}`;

    console.log("🔍 Channel search:", { query: query.trim(), channels, url });

    const resp = await fetch(url);
    const data = await resp.json();
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
    console.error("❌ Channel search error:", error);
    renderChannelSearchResults([]);
  }
}

async function searchChannelsOnImportScreen(query) {
  const section = document.getElementById("importChannelSearchSection");
  const results = document.getElementById("importChannelSearchResults");
  const orRow = document.getElementById("importOrRow");
  if (!query || query.trim().length < 2) {
    if (section) section.classList.add("hidden");
    if (orRow) orRow.classList.remove("hidden");
    return;
  }
  state.channelSearchQuery = query.trim();
  if (section) section.classList.remove("hidden");
  if (results) results.innerHTML = `<p class="ch-result__loading"><span class="plately-hourglass"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12v6c0 2-2 3-6 3s-6-1-6-3V2z" fill="#8da485" stroke="#8da485" stroke-width="1.5"/><path d="M6 22h12v-6c0-2-2-3-6-3s-6 1-6 3v6z" fill="#8da485" stroke="#8da485" stroke-width="1.5"/><rect x="11" y="9" width="2" height="6" fill="#f6b69d"/></svg></span>Zoeken…</p>`;
  if (orRow) orRow.classList.add("hidden");
  try {
    const channels = getActiveFollowedSeedChannelIds().join(",");
    // Only include approved custom channels in search
    const followedCustomChannels = state.customChannels.filter((ch) => state.followedChannelIds.includes(ch.id) && (ch.status || "approved") === "approved");
    const customChannelsParam = followedCustomChannels.map((ch) => `${ch.id}|${ch.name}|${ch.url}`).join(",");
    let url = `/api/channel-search?q=${encodeURIComponent(query.trim())}&channels=${encodeURIComponent(channels)}`;
    if (customChannelsParam) url += `&customChannels=${encodeURIComponent(customChannelsParam)}`;
    const resp = await fetch(url);
    const data = await resp.json();
    const all = data.results || [];
    if (!all.length) {
      if (results) results.innerHTML = `<p class="ch-result__loading">Geen resultaten gevonden.</p>`;
      if (orRow) orRow.classList.remove("hidden");
      return;
    }
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
  } catch {
    if (section) section.classList.add("hidden");
    if (orRow) orRow.classList.remove("hidden");
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

  grid.innerHTML = cards.join("");

  // Recipe card clicks → detail
  grid.querySelectorAll(".recent-card[data-recipe-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.recipeId;
      if (!id) return;
      state.selectedRecipeId = id;
      renderDetailRecipe(true);
      switchView("detail");
    });
  });

  // + card → open import modal
  document.getElementById("recentAddButton")?.addEventListener("click", () => {
    document.getElementById("openImportButton")?.click();
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
  const followed = getAllChannels().filter((ch) =>
    state.followedChannelIds.includes(ch.id) &&
    (ch.status || "approved") === "approved"
  );
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

  const seedRows = SEED_CHANNELS.map((ch) => {
    const followed = state.followedChannelIds.includes(ch.id);
    const faviconUrl = getSourceIconUrl(ch.url);
    return `
      <label class="channel-toggle-row" data-channel-id="${escapeHtml(ch.id)}">
        <span class="channel-toggle-avatar">
          ${faviconUrl ? `<img class="channel-toggle-avatar__favicon" src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/><span style="display:none;font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>` : `<span style="font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>`}
        </span>
        <span class="channel-toggle-name">${escapeHtml(ch.name)}</span>
        <span class="toggle-switch ${followed ? "toggle-switch--on" : ""}" role="switch" aria-checked="${followed}" tabindex="0" data-toggle-channel="${escapeHtml(ch.id)}"></span>
      </label>`;
  }).join("");

  // Separate custom channels section
  let customHTML = "";

  if (state.customChannels.length > 0) {
    customHTML += `<div class="channel-section-label">MIJN KANALEN</div>`;

    // Show custom channels: approved first, then pending, then rejected (sorted A-Z within each)
    const customRows = state.customChannels
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
      const toggleDisabled = (isPending || isRejected) ? "disabled" : "";
      const rowDisabledClass = (isPending || isRejected) ? "channel-toggle-row--disabled" : "";
      const toggleHtml = isRejected
        ? `<span class="toggle-switch disabled" role="switch" aria-checked="${followed}" aria-disabled="true" tabindex="-1"></span>`
        : `<span class="toggle-switch ${followed ? "toggle-switch--on" : ""} ${toggleDisabled}" role="switch" aria-checked="${followed}" tabindex="0" data-toggle-channel="${ch.id}" ${toggleDisabled}></span>`;

      return `
        <div class="channel-toggle-row channel-toggle-row--custom ${rowDisabledClass}" data-channel-id="${ch.id}">
          <span class="channel-toggle-avatar">
            ${faviconUrl ? `<img class="channel-toggle-avatar__favicon" src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/><span style="display:none;font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>` : `<span style="font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>`}
          </span>
          <div class="channel-toggle-info">
            <span class="channel-toggle-name">${escapeHtml(ch.name)}</span>
            <span class="channel-status-badge ${statusClass}">${escapeHtml(statusLabel)}</span>
          </div>
          ${toggleHtml}
          <button class="channel-delete-btn" type="button" aria-label="Verwijder ${escapeHtml(ch.name)}" data-delete-channel="${ch.id}">×</button>
        </div>`;
    }).join("");

    customHTML += customRows;
  }

  const addButton = `
    <button class="channel-add-btn" type="button" id="addCustomChannelButton">
      <span class="channel-add-btn__icon">+</span>
      Kanaal toevoegen
    </button>`;

  container.innerHTML = seedRows + customHTML + addButton;

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
    { id: "favorites", label: "Favorieten" },
    { id: "easy", label: "Makkelijk" },
    { id: "recent", label: "Meest recent" },
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
  }

  const totalRecipeCount = recipes.length;

  // Home screen can get very long with lots of imports; keep it snappy by default.
  const HOME_CAP = 12;
  const shouldCapHome = state.view === "home" && !isSearching && !state.homeRecipesExpanded;
  if (shouldCapHome) recipes = recipes.slice(0, HOME_CAP);

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
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
          </div>
          <h3 class="home-empty-state__title">Je recepten</h3>
          <p class="home-empty-state__text">Importeer je eerste recept</p>
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
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 4.75a5.75 5.75 0 1 0 0 11.5a5.75 5.75 0 0 0 0-11.5Zm0 13.5a7.75 7.75 0 1 1 5.01-13.66a7.75 7.75 0 0 1-5.01 13.66Zm10.04 1.38l-4.42-4.42l1.41-1.41l4.42 4.42l-1.41 1.41Z"/></svg>
          </div>
          <h3 class="home-empty-state__title">Geen resultaten</h3>
          <p class="home-empty-state__text">Probeer een andere zoekterm</p>
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
        return `
        <button class="recent-card" type="button" data-recipe-id="${escapeHtml(recipe.id)}">
          <img class="recent-card__img" src="${escapeHtml(recipe.image || "assets/hero-burger.svg")}" alt="${escapeHtml(recipe.title || "")}" loading="lazy" />
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

  // Home "toon meer" toggle
  if (state.view === "home" && !isSearching && totalRecipeCount > HOME_CAP) {
    const label = state.homeRecipesExpanded
      ? "Toon minder"
      : `Toon alles (${totalRecipeCount})`;
    gridHtml += `
      <div class="recipe-grid-more" style="grid-column:1/-1">
        <button class="secondary-button recipe-grid-more__btn" type="button" id="homeToggleRecipeGrid">${escapeHtml(label)}</button>
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

  const toggleBtn = document.getElementById("homeToggleRecipeGrid");
  if (toggleBtn) {
    bindEvent(toggleBtn, "click", () => {
      state.homeRecipesExpanded = !state.homeRecipesExpanded;
      renderRecipeGrid();
      document.getElementById("recipeGridSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

// ── Step timer ────────────────────────────────────────────────────────────────
const stepTimers = new Map(); // button el → intervalId

function extractStepSeconds(text) {
  const secMatch = text.match(/(\d+)\s*(?:seconden?|sec\.?)\b/i);
  if (secMatch) return parseInt(secMatch[1], 10);
  const minMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:minuten?|min\.?)\b/i);
  if (minMatch) return Math.round(parseFloat(minMatch[1].replace(",", ".")) * 60);
  if (/\bhalf\s+uur\b/i.test(text)) return 1800;
  if (/\b1\s*uur\b/i.test(text) || /\béén?\s+uur\b/i.test(text)) return 3600;
  const hrMatch = text.match(/(\d+)\s*uur\b/i);
  if (hrMatch) return parseInt(hrMatch[1], 10) * 3600;
  return 0;
}

function formatTimerLabel(seconds) {
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return m > 0 ? `${h}u ${m}m` : `${h}u`;
  }
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${m} min`;
  }
  return `${seconds}s`;
}

function startStepTimer(btn, totalSeconds) {
  // Cancel existing timer on this button
  if (stepTimers.has(btn)) {
    clearInterval(stepTimers.get(btn));
    stepTimers.delete(btn);
    btn.classList.remove("step-timer--running");
    btn.dataset.timerOriginal && (btn.innerHTML = btn.dataset.timerOriginal);
    return;
  }

  btn.dataset.timerOriginal = btn.innerHTML;
  btn.classList.add("step-timer--running");
  let remaining = totalSeconds;

  const tick = () => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(stepTimers.get(btn));
      stepTimers.delete(btn);
      btn.classList.remove("step-timer--running");
      btn.classList.add("step-timer--done");
      btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Klaar!`;
      showToast("⏰ Timer afgelopen!");
      setTimeout(() => {
        btn.classList.remove("step-timer--done");
        btn.innerHTML = btn.dataset.timerOriginal || "";
      }, 4000);
      return;
    }
    btn.querySelector(".step-timer__time") && (btn.querySelector(".step-timer__time").textContent = formatTimerLabel(remaining));
  };

  btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 4.5a1 1 0 0 1 3 0v.55A7.5 7.5 0 1 1 9 5.34v-.84Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 9v3.5l2 1.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span class="step-timer__time">${formatTimerLabel(remaining)}</span>`;

  const id = setInterval(tick, 1000);
  stepTimers.set(btn, id);
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
    .map(
      (ingredient, index) => `
        <li class="ingredient-item">
          <span class="ingredient-amount">${formatIngredientAmount(ingredient, factor)}</span>
          <span class="ingredient-name">${ingredient.name}</span>
          <span class="ingredient-image-wrapper">
            <img class="ingredient-image" src="" alt="" loading="lazy" />
            <span class="ingredient-image-fallback" aria-hidden="true">${getIngredientVisualMarkup(ingredient.name)}</span>
          </span>
        </li>
      `
    )
    .join("");

  // Clear any running timers when recipe changes
  stepTimers.forEach((id) => clearInterval(id));
  stepTimers.clear();

  detailStepList.innerHTML = recipe.instructions
    .map((step, index) => {
      const secs = extractStepSeconds(step);
      const timerBtn = secs > 0
        ? `<button class="step-timer" type="button" data-step-seconds="${secs}" aria-label="Start timer ${formatTimerLabel(secs)}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 4.5a1 1 0 0 1 3 0v.55A7.5 7.5 0 1 1 9 5.34v-.84Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 9v3.5l2 1.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
             <span class="step-timer__time">${formatTimerLabel(secs)}</span>
           </button>`
        : "";
      return `
        <li class="step-item">
          <span class="step-index">${index + 1}</span>
          <div class="step-body">
            <p class="step-copy">${escapeHtml(step)}</p>
            ${timerBtn}
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
  updateWakeLockUI();
  renderMealPlanCurrentRecipe();

  // Fetch ingredient photos from Albert Heijn
  fetchIngredientPhotos();
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

function renderGrocerySummary() {
  if (!grocerySummaryChips) {
    return;
  }
  grocerySummaryChips.innerHTML = "";
}

function renderGroceryGroups() {
  persistGroceryItemsLocally();
  const uncheckedCount = state.groceryItems.filter((item) => !item.checked).length;
  if (grocerySubtitle) {
    grocerySubtitle.textContent = `${uncheckedCount} items te gaan`;
    grocerySubtitle.classList.toggle("hidden", !state.groceryItems.length);
  }
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
    groceryGroups.innerHTML = '<p class="grocery-empty">Je boodschappenlijst is nog leeg. Voeg eerst een recept toe.</p>';
    return;
  }

  // Determine unique recipes in the list
  const uniqueRecipes = [...new Set(state.groceryItems.map((i) => i.recipeTitle || "Overig").filter(Boolean))];
  const multiRecipe = uniqueRecipes.length > 1;

  function renderGroceryItem(item) {
    return `
      <div class="grocery-entry-wrapper">
        <button class="grocery-entry ${item.checked ? "is-checked" : ""}" type="button" data-grocery-id="${item.id}">
          <span class="grocery-check"></span>
          <span class="grocery-entry__content">
            <p class="grocery-entry__title">${item.title}</p>
            ${multiRecipe && item.recipeTitle && item.recipeTitle.includes(",")
              ? `<p class="grocery-entry__overlap">Gedeeld ingrediënt</p>` : ""}
          </span>
          <span class="grocery-entry__amount">${item.amount}</span>
          <span class="grocery-entry__img" aria-hidden="true">
            ${item.imageUrl
              ? `<img class="grocery-entry__ah-img" src="${escapeHtml(item.imageUrl)}" alt="" loading="lazy" />`
              : getIngredientVisualMarkup(item.title)}
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
    // Group by recipe, then sort unchecked first
    for (const recipeTitle of uniqueRecipes) {
      const items = state.groceryItems
        .filter((i) => (i.recipeTitle || "Overig") === recipeTitle)
        .sort((a, b) => Number(a.checked) - Number(b.checked));
      html += `
        <section class="grocery-group">
          <div class="grocery-group__header grocery-group__header--recipe">
            <h2>${escapeHtml(recipeTitle)}</h2>
            <span class="grocery-group__count">${items.filter((i) => !i.checked).length} over</span>
          </div>
          ${items.map(renderGroceryItem).join("")}
        </section>
      `;
    }
    // Shared/overlap items (recipeTitle contains ",")
    const shared = state.groceryItems.filter((i) => i.recipeTitle && i.recipeTitle.includes(","));
    if (shared.length) {
      html = `
        <section class="grocery-group">
          <div class="grocery-group__header grocery-group__header--shared">
            <h2>Gedeelde ingrediënten</h2>
          </div>
          ${shared.sort((a, b) => Number(a.checked) - Number(b.checked)).map(renderGroceryItem).join("")}
        </section>
      ` + html.replace(shared.map((i) => `data-grocery-id="${i.id}"`).join("|____|"), ""); // keep shared items only in shared section
    }
  } else {
    // Single recipe — group by ingredient category as before
    const groups = state.groceryItems.reduce((acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    }, {});

    html = Object.entries(groups)
      .map(([group, items]) => {
        const meta = getGroupMeta(group);
        const sortedItems = [...items].sort((l, r) => Number(l.checked) - Number(r.checked));
        return `
          <section class="grocery-group">
            <div class="grocery-group__header">
              <h2>${meta.title}</h2>
            </div>
            ${sortedItems.map(renderGroceryItem).join("")}
          </section>
        `;
      }).join("");
  }

  groceryGroups.innerHTML = html;

  // Pantry suggestions should only show for the relevant recipe group(s),
  // and should match the rest of the grocery list look & feel.
  const pantryItems = [
    { title: "Olie", icon: "🫒" },
    { title: "Olijfolie", icon: "🫒" },
    { title: "Boter", icon: "🧈" },
    { title: "Bloem", icon: "🌾" },
    { title: "Suiker", icon: "🍬" },
    { title: "Azijn", icon: "🍶" },
    { title: "Sojasaus", icon: "🍶" },
    { title: "Bouillonblokje", icon: "🧊" },
  ];

  const existingKeys = new Set(state.groceryItems.map((i) => normalizeIngredientKey(i.title)));
  const recipeHasPantryItem = (recipe, pantryTitle) => {
    if (!recipe?.ingredients?.length) return false;
    const key = normalizeIngredientKey(pantryTitle);
    return recipe.ingredients.some((ing) => normalizeIngredientKey(ing?.name || "").includes(key));
  };

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
    const suggestions = pantryItems
      .filter((p) => recipeHasPantryItem(recipe, p.title))
      .filter((p) => !existingKeys.has(normalizeIngredientKey(p.title)));
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
  // Open the most recent draft in review, then scroll to the drafts section.
  openImportReview(previews[0].id);
  setTimeout(() => {
    document.getElementById("reviewDrafts")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
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
  renderImportDrafts();
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

  const summaryItems = [
    { label: getSourceHost(recipe.sourceUrl || "") || getPlatformLabel(recipe.platform || "website"), tone: "muted" },
    { label: `${(recipe.ingredients || []).length} ingrediënten`, tone: (recipe.ingredients || []).length >= 4 ? "good" : "warn" },
    { label: `${(recipe.instructions || []).length} stappen`, tone: (recipe.instructions || []).length >= 3 ? "good" : "warn" },
    { label: recipe.time || "Tijd onbekend", tone: "muted" },
  ];

  reviewSummary.innerHTML = `
    <div class="review-summary__row">
      ${summaryItems
        .map(
          (item) => `
            <span class="review-summary__pill review-summary__pill--${item.tone}">
              ${escapeHtml(item.label)}
            </span>
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

  if (!reviewTitleInput.value.trim()) {
    reviewFeedback.textContent = "Geef het gerecht eerst een duidelijke titel.";
    return;
  }
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
    title: normalizeImportedTitle(reviewTitleInput.value.trim()),
    description: normalizeDescription(reviewDescriptionInput.value.trim(), reviewTitleInput.value.trim()),
    time: reviewTimeInput.value.trim() || recipe.time || "30 min",
    servings: parseServingsValue(reviewServingsInput.value.trim() || recipe.servings),
    mealTag: toDutchMealTag(reviewMealTagInput.value.trim() || recipe.mealTag || "Avond"),
    alt: normalizeImportedTitle(reviewTitleInput.value.trim()),
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
  openCookbookSaveModal(recipe.id);
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
      // Show first initial
      const initial = (state.profile.name || "?")[0].toUpperCase();
      btn.textContent = initial;
    }
  });

  // Update profile2 avatars (bottom nav + sub-panel + hero on profile screen)
  ["profileAvatarDisplay", "profileSubAvatarDisplay", "profileHeroAvatar"].forEach((id) => {
    const p2avatar = document.getElementById(id);
    if (!p2avatar) return;
    const img = p2avatar.querySelector(".profile2-avatar__img");
    if (photo) {
      if (img) { img.src = photo; img.alt = state.profile.name || ""; }
      p2avatar.style.fontSize = "";
    } else {
      if (img) { img.src = "assets/profile-avatar.svg"; img.alt = ""; }
      p2avatar.style.fontSize = "";
    }
  });
}

function setCookbooksScreenMode(mode, cookbookName) {
  // mode: "list" | "detail"
  const listHeader = document.getElementById("cookbooksTopbarList");
  const detailHeader = document.getElementById("cookbooksTopbarDetail");
  if (listHeader) listHeader.style.display = mode === "detail" ? "none" : "";
  if (detailHeader) detailHeader.style.display = mode === "detail" ? "" : "none";
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
        <div class="cb-detail__title-row">
          <h2 class="cb-detail__name">${escapeHtml(cookbook.name)}</h2>
        </div>
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
  });
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
      const coverMarkup = coverRecipes.length
        ? `
            <div class="cookbook-collection__cover ${coverRecipes.length > 1 ? "cookbook-collection__cover--grid" : ""}">
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
            <div class="cookbook-collection__cover cookbook-collection__cover--empty">
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

function saveRecipeToCookbook(recipeId, cookbookId = state.selectedCookbookId) {
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
  if (!cookbook.recipeIds.includes(recipeId)) {
    cookbook.recipeIds.unshift(recipeId);
  }
  state.featuredRecipeId = recipeId;
  renderCookbookList();
  renderCookbookFilterBar();
  renderDetailRecipe(false);
  schedulePersistAppState();
  renderCookbookSaveList(recipeId);
  showToast(`Opgeslagen in ${cookbook.name}.`);
}

function getOrCreateFavoritesBookmark() {
  let favoritesBookmark = state.cookbooks.find((cb) => cb.name === "❤️ Favorieten");
  if (!favoritesBookmark) {
    favoritesBookmark = {
      id: `cookbook-favorites-${Date.now()}`,
      name: "❤️ Favorieten",
      recipeIds: [],
    };
    state.cookbooks.unshift(favoritesBookmark);
    schedulePersistAppState();
  }
  return favoritesBookmark;
}

function isRecipeFavorited(recipeId) {
  const favoritesBookmark = state.cookbooks.find((cb) => cb.name === "❤️ Favorieten");
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
    // Kitchen tools / non-food items that sometimes leak into ingredient lines.
    if (/\b(?:airfryer|air\s*fryer|oven|koekenpan|hapjespan|bakplaat)\b/i.test(String(name || ""))) return true;
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
    const normalizedTitle = `${normalizeIngredientKey(ingredient.name)}${isOptional ? " optioneel" : ""}`.trim();
    const nextAmount = formatIngredientAmount(ingredient, state.currentServings / parseBaseServings(recipe.servings));
    const existingItem = state.groceryItems.find(
      (item) =>
        !item.checked &&
        normalizeIngredientKey(item.title) === normalizedTitle &&
        item.group === getIngredientGroup(normalizedTitle || ingredient.name)
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
    showToast(`Selectie klaar voor ${storeName}.`);
  } catch {
    showToast(`Kon ${storeName} niet voorbereiden.`);
  } finally {
    button.disabled = false;
    if (destLabel) {
      destLabel.textContent = originalLabel;
    }
  }
}

async function refetchBasketWithBio() {
  const preview = state.basketPreview;
  if (!preview || preview.store !== "albert-heijn") {
    renderBasketPreview();
    return;
  }

  // Show loading indicator in the list
  const listEl = document.getElementById("basketSheetList");
  if (listEl) {
    listEl.innerHTML =
      '<p style="text-align:center;padding:32px 24px;color:#aaa;font-size:0.95rem">🌱 Biologische producten zoeken…</p>';
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
        bio: state.basketFilter.bio,
        items: activeItems.map((item) => ({
          title: item.title,
          amount: item.amount,
          recipeTitle: item.recipeTitle,
        })),
      }),
    });

    if (payload?.items?.length) {
      state.basketPreview = {
        ...state.basketPreview,
        items: payload.items,
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
          currentStep: Number.isFinite(progress.currentStep) ? progress.currentStep : 0,
          cookMode: Boolean(progress.cookMode),
        },
      ])
    ),
    featuredRecipeId: state.featuredRecipeId,
    selectedRecipeId: state.selectedRecipeId,
    followedChannelIds: [...state.followedChannelIds],
    customChannels: state.customChannels.map((ch) => ({ ...ch })),
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
    return;
  }

  state.session.userId = user.id || "";
  state.auth.authenticated = Boolean(user.authenticated);
  state.auth.email = user.email || "";

  if (user.profile && typeof user.profile === "object") {
    state.profile = {
      name: user.profile.name || state.profile.name,
      handle: user.profile.handle || state.profile.handle,
      email: user.profile.email || state.profile.email || "",
      photo: user.profile.photo || state.profile.photo || "",
      favoriteSupermarket: user.profile.favoriteSupermarket || state.profile.favoriteSupermarket || "ah",
    };
  }
  if (typeof user.language === "string" && user.language) {
    state.language = user.language;
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
    state.customChannels = user.customChannels
      .filter((ch) => ch && typeof ch.id === "string" && typeof ch.name === "string" && typeof ch.url === "string")
      .map((ch) => ({ ...ch }));
  }

  if (Array.isArray(user.followedChannelIds) && user.followedChannelIds.length) {
    state.followedChannelIds = user.followedChannelIds.filter((id) =>
      SEED_CHANNELS.some((ch) => ch.id === id) || state.customChannels.some((ch) => ch.id === id)
    );
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

function isAdmin() {
  return state.auth.authenticated && state.auth.email === ADMIN_EMAIL;
}

async function fetchAdminStats() {
  try {
    const stats = await fetchJson(`${state.apiBase}/api/admin/stats`);
    return stats || { users: [], totalUsers: 0, totalRecipes: 0 };
  } catch (err) {
    console.error("Failed to fetch admin stats:", err);
    return { users: [], totalUsers: 0, totalRecipes: 0 };
  }
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

  // Fetch admin stats
  const stats = await fetchAdminStats();

  // Update analytics cards
  const userCountEl = document.getElementById("adminUserCount");
  const recipeCountEl = document.getElementById("adminRecipeCount");

  if (userCountEl) userCountEl.textContent = stats.totalUsers || 0;
  if (recipeCountEl) recipeCountEl.textContent = stats.totalRecipes || 0;

  // Render user list
  const usersList = document.getElementById("adminUsersList");
  if (usersList) {
    if (!stats.users || stats.users.length === 0) {
      usersList.innerHTML = "<p style='padding:16px;color:#989188'>Geen gebruikers gevonden</p>";
    } else {
      usersList.innerHTML = stats.users.map((user) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border-bottom:1px solid #f3f5ef">
          <div style="flex:1">
            <div style="font-weight:500;color:#3d3d3b">${escapeHtml(user.email || "Onbekend")}</div>
            <div style="font-size:0.85rem;color:#989188;margin-top:4px">
              ${user.recipeCount || 0} recepten • ${user.cookbookCount || 0} kookboeken
            </div>
            ${user.createdAt ? `<div style="font-size:0.8rem;color:#b9ada0;margin-top:2px">Aangemaakt: ${new Date(user.createdAt).toLocaleDateString('nl-NL')}</div>` : ''}
          </div>
          <button class="secondary-button" type="button" style="margin-left:8px;white-space:nowrap" data-admin-delete-user="${escapeHtml(user.id)}">Verwijderen</button>
        </div>
      `).join("");
    }
  }
}

function renderAll() {
  renderHomeStats();
  renderRecentImports();
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

function normalizeUiErrorMessage(message) {
  const text = String(message || "").trim();
  if (!text) {
    return "Importeren mislukt.";
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
    credentials: "same-origin",
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(normalizeUiErrorMessage(payload?.error || "Importeren mislukt."));
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
      state.followedChannelIds = user.followedChannelIds.filter((id) =>
        SEED_CHANNELS.some((ch) => ch.id === id) || state.customChannels.some((ch) => ch.id === id)
      );
    }
    renderChannelSettings();
    renderChannelRow();
    renderProfileSummary();
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
      window.scrollTo({ top: 0, behavior: "auto" });
    }

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
    showToast("Account aangemaakt! Volg de stappen om je profiel compleet te maken.");
  } else {
    closeAuthModal();
    showToast("Je bent ingelogd.");
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

async function logoutAccount() {
  console.log("🔓 Logging out...");

  // Clear token immediately
  storeAuthToken("");

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

async function toggleWakeLock() {
  if (state.keepAwake && state.wakeLockSentinel) {
    state.keepAwake = false;
    await releaseWakeLock();
    return;
  }

  state.keepAwake = true;
  await requestWakeLock();
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

  try {
    const data = await handleImport(url, note);
    const importedRecipe = normalizeImportedRecipe(data.recipe);

    // Keep as preview until user actually saves it to a cookbook
    importedRecipe._previewCreatedAt = Date.now();
    state.importPreviews[importedRecipe.id] = importedRecipe;
    state.selectedRecipeId = importedRecipe.id;
    state.reviewRecipeId = importedRecipe.id;
    state.currentServings = parseBaseServings(importedRecipe.servings);

    // Go to review so user can confirm before saving
    renderImportReview();
    switchView("review");

    onDone(importedRecipe);
  } catch (error) {
    setFeedback(error.message);
  } finally {
    setLoading(false);
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

bindEvent(uncheckAllIngredientsButton, "click", () => {
  uncheckAllIngredients();
});

bindEvent(saveRecipeButton, "click", () => {
  const recipe = getSelectedRecipe();
  if (recipe) openCookbookSaveModal(recipe.id);
});
bindEvent(detailSaveHeaderButton, "click", () => {
  const recipe = getSelectedRecipe();
  if (recipe) openCookbookSaveModal(recipe.id);
});
bindEvent(document.getElementById("deleteRecipeButton"), "click", () => {
  const recipe = getSelectedRecipe();
  if (!recipe || SEED_RECIPE_IDS.has(recipe.id) || recipe.isSeed) return;
  showConfirm({
    title: "Recept verwijderen?",
    subtitle: `"${recipe.title}" wordt definitief verwijderd. Dit kan niet ongedaan worden gemaakt.`,
    confirmLabel: "Verwijderen",
    destructive: true,
    onConfirm: () => {
      // Remove from recipes list
      state.recipes = state.recipes.filter((r) => r.id !== recipe.id);
      // Remove from all cookbooks
      state.cookbooks.forEach((cb) => {
        cb.recipeIds = cb.recipeIds.filter((id) => id !== recipe.id);
      });
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
  window.scrollTo({ top: 0, behavior: "auto" });
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
  window.scrollTo({ top: 0, behavior: "auto" });
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

bindEvent(servingsDown, "click", () => {
  if (state.currentServings <= 1) {
    return;
  }
  state.currentServings -= 1;
  renderDetailRecipe(false);
});

bindEvent(servingsUp, "click", () => {
  if (state.currentServings >= 20) {
    return;
  }
  state.currentServings += 1;
  renderDetailRecipe(false);
});

bindEvent(searchInput, "input", (event) => {
  // Debounced channel search — fires after 900 ms of no typing (better results, fewer API calls)
  clearTimeout(channelSearchTimeout);
  const query = event.target.value.trim();
  state.channelSearchQuery = query;
  if (query.length < 2) {
    // Show empty channel results when query is too short
    if (query.length === 0) {
      renderChannelSearchResults([]);
    }
    return;
  }

  // Reset filter when starting a new search so results aren't hidden by old filter
  state.channelSearchFilter = null;

  channelSearchTimeout = setTimeout(() => searchChannels(query), 900);
});

bindEvent(searchInput, "keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    clearTimeout(channelSearchTimeout);
    searchChannels(searchInput?.value || "");
  }
  if (event.key === "Escape") {
    searchInput.value = "";
    state.channelSearchQuery = "";
    renderChannelSearchResults([]);
  }
});

// Close channel search panel
bindEvent(document.getElementById("channelSearchClose"), "click", () => {
  if (searchInput) searchInput.value = "";
  state.channelSearchQuery = "";
  renderQuickRecipeGrid();
  renderRecipeGrid();
  renderChannelSearchResults([]);
});

bindEvent(document.getElementById("channelSearchSection"), "click", (event) => {
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

  try {
    showToast("Plately is bezig met importeren…");
    const resp = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, imageHint }),
    });
    const data = await resp.json();
    if (!resp.ok || !data.recipe) throw new Error(data.error || "Importeren mislukt");
    const recipe = normalizeImportedRecipe({ ...data.recipe, needsReview: true });
    // Keep as preview until user actually saves it to a cookbook
    recipe._previewCreatedAt = Date.now();
    state.importPreviews[recipe.id] = recipe;
    state.selectedRecipeId = recipe.id;
    // Open review screen so user can confirm details before saving
    openImportReview(recipe.id);
    // Clear search
    if (searchInput) searchInput.value = "";
    state.searchQuery = "";
    renderChannelSearchResults([]);
  } catch (err) {
    showToast(err.message || "Importeren mislukt");
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`;
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

  groceryItem.checked = !groceryItem.checked;
  renderGroceryGroups();
  schedulePersistAppState();
});

bindEvent(detailStepList, "click", (event) => {
  const btn = event.target.closest(".step-timer");
  if (!(btn instanceof HTMLElement)) return;
  const secs = parseInt(btn.dataset.stepSeconds || "0", 10);
  if (secs > 0) startStepTimer(btn, secs);
});

// Basket servings controls
bindEvent(document.getElementById("basketServingsMinus"), "click", () => {
  if (state.basketServings <= 1) return;
  state.basketServings -= 1;
  renderBasketPreview();
});
bindEvent(document.getElementById("basketServingsPlus"), "click", () => {
  state.basketServings += 1;
  renderBasketPreview();
});

// Diet filter chips
bindEvent(document.getElementById("basketFilterRow"), "click", (e) => {
  const chip = e.target.closest("[data-filter]");
  if (!chip) return;
  const f = chip.dataset.filter;
  if (f === "bio") state.basketFilter.bio = !state.basketFilter.bio;
  refetchBasketWithBio();
});

// Basket overlay close
bindEvent(document.getElementById("basketOverlayClose"), "click", closeBasketModal);
bindEvent(document.getElementById("basketOverlay"), "click", (e) => {
  if (e.target === document.getElementById("basketOverlay")) closeBasketModal();
});

// Basket product interactions (delete, qty, swap)
bindEvent(document.getElementById("basketSheetList"), "click", (e) => {
  const target = e.target;
  if (!(target instanceof Element) || !state.basketPreview) return;

  const btn = target.closest("[data-basket-delete],[data-basket-qty-minus],[data-basket-qty-plus],[data-basket-swap]");
  if (!btn) return;

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
      item.qty = Math.max(1, (item.qty || 1) - 1);
      const qtyEl = document.getElementById(`basket-qty-${idx}`);
      if (qtyEl) qtyEl.textContent = item.qty;
      renderBasketPreview();
    }
    return;
  }

  // Qty plus
  if (btn.dataset.basketQtyPlus !== undefined) {
    const idx = parseInt(btn.dataset.basketQtyPlus, 10);
    const item = state.basketPreview.items[idx];
    if (item) {
      item.qty = (item.qty || 1) + 1;
      const qtyEl = document.getElementById(`basket-qty-${idx}`);
      if (qtyEl) qtyEl.textContent = item.qty;
      renderBasketPreview();
    }
    return;
  }

  // Swap (cycle to next alternative choice)
  if (btn.dataset.basketSwap !== undefined) {
    const idx = parseInt(btn.dataset.basketSwap, 10);
    const item = state.basketPreview.items[idx];
    if (item && item.choices?.length > 1) {
      item.selectedChoiceIndex = ((item.selectedChoiceIndex || 0) + 1) % item.choices.length;
      renderBasketPreview();
    }
  }
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

// "Over deze App" → about sub-panel
const APP_VERSION = "3.0.0";
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

bindEvent(cookbookSaveList, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const cookbookButton = target.closest("[data-save-cookbook-id]");
  if (!(cookbookButton instanceof HTMLElement)) {
    return;
  }

  // Read recipeId from the button itself — most reliable, no state timing issues
  const selectedRecipe = getSelectedRecipe();
  const recipeId = cookbookButton.dataset.saveRecipeId || state.pendingCookbookSaveRecipeId || selectedRecipe?.id;
  const cookbookId = cookbookButton.dataset.saveCookbookId;
  if (!recipeId || !cookbookId) {
    return;
  }

  state.selectedRecipeId = recipeId;
  saveRecipeToCookbook(recipeId, cookbookId);
  closeCookbookSaveModal();
  renderDetailRecipe(true);
  switchView("detail");
});

bindEvent(cookbookSaveCreateButton, "click", () => {
  openCookbookNameModal("create");
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

  if (state.followedChannelIds.includes(id)) {
    // Prevent ending up with zero *active* channels (pending/rejected custom channels don't count)
    const activeCount = countActiveFollowedChannels();
    const isSeed = SEED_CHANNELS.some((ch) => ch.id === id);
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

  submitAuthButton.disabled = true;
  submitAuthButton.textContent = state.auth.mode === "register" ? "Account aanmaken..." : "Inloggen...";
  if (authFeedback) authFeedback.textContent = "";

  // Grab name for registration
  const nameInput = document.getElementById("authName");
  const name = (nameInput?.value || "").trim();
  if (state.auth.mode === "register" && name) {
    state.profile.name = name;
  }

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
  switchView("detail");
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
      if (section) section.classList.add("hidden");
      if (orRow) orRow.classList.remove("hidden");
      return;
    }
    if (results) results.innerHTML = `<p class="ch-result__loading"><span class="plately-hourglass"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12v6c0 2-2 3-6 3s-6-1-6-3V2z" fill="#8da485" stroke="#8da485" stroke-width="1.5"/><path d="M6 22h12v-6c0-2-2-3-6-3s-6 1-6 3v6z" fill="#8da485" stroke="#8da485" stroke-width="1.5"/><rect x="11" y="9" width="2" height="6" fill="#f6b69d"/></svg></span>Zoeken…</p>`;
    if (section) section.classList.remove("hidden");
    if (orRow) orRow.classList.add("hidden");
    importSearchTimeout = setTimeout(() => searchChannelsOnImportScreen(q), 600);
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

  try {
    showToast("Plately is bezig met importeren…");
    const resp = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, imageHint }),
    });
    const data = await resp.json();
    if (!resp.ok || !data.recipe) throw new Error(data.error || "Importeren mislukt");
    const recipe = normalizeImportedRecipe({ ...data.recipe, needsReview: true });
    // Keep as preview until user actually saves it to a cookbook
    recipe._previewCreatedAt = Date.now();
    state.importPreviews[recipe.id] = recipe;
    state.selectedRecipeId = recipe.id;
    // Clear search and go to review
    if (importSearchInput) importSearchInput.value = "";
    const section = document.getElementById("importChannelSearchSection");
    if (section) section.classList.add("hidden");
    openImportReview(recipe.id);
  } catch (err) {
    showToast(err.message || "Importeren mislukt");
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg> Importeer`;
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
  try { localStorage.setItem(getOnboardingDoneKey(), "1"); } catch {}
  window.scrollTo(0, 0);
}

function startOnboarding() {
  // Show tooltips only once per account (persisted across sessions)
  if (!state.auth.authenticated) return;

  // If already completed for this account, skip
  try { if (localStorage.getItem(getOnboardingDoneKey())) return; } catch {}

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
  handle: "",
  photoData: null,
  supermarket: "ah",
};

function showOnboarding() {
  authModal.classList.add("hidden");
  authModal.setAttribute("aria-hidden", "true");
  onboardingScreen.classList.remove("hidden");

  // Hide tutorial overlays/bubbles while onboarding
  const overlay = document.getElementById("onboardingOverlay");
  if (overlay) overlay.setAttribute("hidden", "");

  showOnboardingStep(1);
  renderOnboardingChannels();
  renderOnboardingSupermarkets();
}

function showOnboardingStep(step) {
  document.getElementById("onboardingStep1")?.classList.add("hidden");
  document.getElementById("onboardingStep2")?.classList.add("hidden");
  document.getElementById("onboardingStep3")?.classList.add("hidden");
  document.getElementById("onboardingStep4")?.classList.add("hidden");
  document.getElementById(`onboardingStep${step}`)?.classList.remove("hidden");
  updateOnboardingProgress(step);
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

function renderOnboardingChannels() {
  const list = document.getElementById("onboardingChannelsList");
  list.innerHTML = SEED_CHANNELS.map((ch) => {
    const faviconUrl = getSourceIconUrl(ch.url);
    return `
      <label class="onboarding-channel-item" data-channel-id="${escapeHtml(ch.id)}">
        <input type="checkbox" data-channel-check="${escapeHtml(ch.id)}" />
        <span class="onboarding-channel-avatar">
          ${faviconUrl ? `<img class="onboarding-channel-avatar__favicon" src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/><span style="display:none;font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>` : `<span style="font-weight:800;font-size:.65rem">${escapeHtml(ch.initials)}</span>`}
        </span>
        <span>${escapeHtml(ch.name)}</span>
      </label>
    `;
  }).join("");

  // Event listeners for checkboxes
  list.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const channelId = e.target.dataset.channelCheck;
      const label = e.target.closest(".onboarding-channel-item");
      if (e.target.checked) {
        onboardingData.channels.push(channelId);
        label.classList.add("selected");
      } else {
        onboardingData.channels = onboardingData.channels.filter((id) => id !== channelId);
        label.classList.remove("selected");
      }
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
  // Apply channels
  if (onboardingData.channels.length > 0) {
    state.followedChannelIds = onboardingData.channels;
  }

  // Persist suggested channels if any
  if (onboardingData.suggestedChannels && onboardingData.suggestedChannels.length > 0) {
    state.customChannels.push(...onboardingData.suggestedChannels);
  }

  // Create first cookbook if name provided
  if (onboardingData.cookbook.trim()) {
    const newCb = {
      id: "cb-" + Date.now(),
      name: onboardingData.cookbook,
      recipeIds: [],
    };
    state.cookbooks.push(newCb);
    if (state.cookbooks.length === 1) state.selectedCookbookId = newCb.id;
  }

  // Update profile if handle provided
  if (onboardingData.handle.trim()) {
    state.profile.handle = onboardingData.handle;
  }
  if (onboardingData.photoData) {
    state.profile.photo = onboardingData.photoData;
  }
  if (onboardingData.gender) {
    state.profile.gender = onboardingData.gender;
  }
  if (onboardingData.birthDate) {
    state.profile.birthDate = onboardingData.birthDate;
  }

  // Save favorite supermarket
  state.profile.favoriteSupermarket = onboardingData.supermarket || "ah";

  persistAppState();
  onboardingScreen.classList.add("hidden");
  switchView("home");
  renderAll();
  showToast("Welkom! Je profiel is klaar.");
  // Show tutorial tooltips for first-time users
  setTimeout(() => startOnboarding(), 800);
}

// ── Onboarding event listeners ─────────────────────────────────────────────────
bindEvent(document.getElementById("onboardingClose"), "click", () => {
  onboardingScreen.classList.add("hidden");
  switchView("home");
});

bindEvent(document.getElementById("onboardingSuggestBtn"), "click", () => {
  const name = prompt("Kanaal naam (bijv. \"Leuke Recepten\"):");
  if (!name || !name.trim()) return;

  const url = prompt("Website URL (bijv. \"https://www.leukerecepten.nl\"):");
  if (!url || !url.trim()) return;

  // Create temporary channel object
  const newChannelId = `ch-custom-${Date.now()}`;
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .filter((c) => /[a-zA-Z]/.test(c))
    .slice(0, 2)
    .join("")
    .toUpperCase() || "NC";

  // Add to onboarding data temporarily
  if (!onboardingData.suggestedChannels) {
    onboardingData.suggestedChannels = [];
  }

  onboardingData.suggestedChannels.push({
    id: newChannelId,
    name: name.trim(),
    url: url.trim(),
    initials: initials,
  });

  // Add to followed channels
  onboardingData.channels.push(newChannelId);

  // Re-render with the new channel
  renderOnboardingChannels();
  showToast(`"${escapeHtml(name)}" voorgesteld! Het wordt gevolgd.`);
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
  const name = document.getElementById("onboardingCookbookName")?.value.trim();
  if (!name) {
    showToast("Voer een naam voor je kookboek in.");
    return;
  }
  onboardingData.cookbook = name;
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
  showOnboardingStep(4);
});

bindEvent(document.getElementById("onboardingStep3Next"), "click", () => {
  showOnboardingStep(4);
});

bindEvent(document.getElementById("onboardingStep4Skip"), "click", () => {
  finishOnboarding();
});

bindEvent(document.getElementById("onboardingStep4Finish"), "click", () => {
  onboardingData.handle = document.getElementById("onboardingHandle")?.value.trim() || "";
  onboardingData.gender = document.getElementById("onboardingGender")?.value || "";
  onboardingData.birthDate = document.getElementById("onboardingBirthDate")?.value || "";
  finishOnboarding();
});

// Photo upload
bindEvent(document.getElementById("onboardingPhotoBtn"), "click", () => {
  document.getElementById("onboardingPhotoInput")?.click();
});

bindEvent(document.getElementById("onboardingPhotoInput"), "change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  resizeImageToDataUrl(file, 320).then((dataUrl) => {
    onboardingData.photoData = dataUrl;
    // Display the photo in the circle
    const circle = document.getElementById("onboardingPhotoCircle");
    const icon = circle?.querySelector(".onboarding-photo-icon");
    if (circle && icon) {
      circle.style.backgroundImage = `url(${dataUrl})`;
      circle.style.backgroundSize = "cover";
      circle.style.backgroundPosition = "center";
      icon.style.display = "none";
    }
    showToast("Foto toegevoegd!");
  });
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
  adminUserSearch.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const userItems = document.querySelectorAll("#adminUsersList > div");
    userItems.forEach((item) => {
      const email = item.querySelector("div").textContent.toLowerCase();
      item.style.display = email.includes(searchTerm) ? "" : "none";
    });
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
const installAppBtn = document.getElementById("installAppBtn");
const installAppSheet = document.getElementById("installAppSheet");
const installAppBackdrop = document.getElementById("installAppBackdrop");

// Detect iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Always show install button (Android has beforeinstallprompt, iOS has manual method)
if (installAppBtn) {
  installAppBtn.style.display = "";
}

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

// Handle install button click (from Account > Plately section)
if (installAppBtn) {
  installAppBtn.addEventListener("click", async () => {
    // Android: Show install prompt if available
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      installPrompt = null;
      installAppBtn.style.display = "none";
      return;
    }

    // iOS: Show instructions in a toast/modal
    if (isIOS) {
      showToast(
        "📱 Op iPhone: Tik op Delen → Voeg toe aan startscherm"
      );
      return;
    }

    // Fallback for other browsers
    showToast(
      "📱 Uw browser ondersteunt app-installatie niet via deze knop"
    );
  });
}

// Handle modal buttons
const installAppConfirmBtn = document.getElementById("installAppConfirmBtn");
const installAppSkipBtn = document.getElementById("installAppSkipBtn");

if (installAppConfirmBtn) {
  installAppConfirmBtn.addEventListener("click", async () => {
    closeInstallAppModal();
    // Trigger the same installation flow as the button
    if (installAppBtn) {
      installAppBtn.click();
    }
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
  if (installAppBtn) {
    installAppBtn.style.display = "none";
  }
});
