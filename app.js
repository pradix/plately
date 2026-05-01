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
  recipes: initialRecipes,
  selectedRecipeId: initialRecipes[0].id,
  featuredRecipeId: initialRecipes[0].id,
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
    photo: "",
  },
  groceryItems: [],
  basketPreview: null,
  cookbooks: [
    { id: "cookbook-1", name: "Gezond & Fit", recipeIds: [initialRecipes[2].id, initialRecipes[8].id] },
    { id: "cookbook-2", name: "Snelle avonden", recipeIds: [initialRecipes[0].id, initialRecipes[1].id, initialRecipes[6].id] },
    { id: "cookbook-3", name: "Comfort Food", recipeIds: [initialRecipes[4].id, initialRecipes[9].id] },
    { id: "cookbook-4", name: "Ontbijt inspiratie", recipeIds: [initialRecipes[5].id, initialRecipes[7].id] },
  ],
  selectedCookbookId: "cookbook-1",
  pendingCookbookSaveRecipeId: "",
  mealPlan: {
    maandag: initialRecipes[0].id,
    dinsdag: null,
    woensdag: initialRecipes[1].id,
    donderdag: null,
    vrijdag: null,
    zaterdag: null,
    zondag: null,
  },
  searchQuery: "",
  activeCookbookFilter: null,
};

const SEED_RECIPE_IDS = new Set(initialRecipes.map((recipe) => recipe.id));

const SEED_CHANNELS = [
  { id: "ch-ah", initials: "AH", name: "Allerhande", color: "#0071c2", url: "https://www.ah.nl/allerhande", icon: "" },
  { id: "ch-ek", initials: "EK", name: "Eef Kookt Zo", color: "#ef9fad", url: "https://www.eefkooktzo.nl", icon: "" },
  { id: "ch-mj", initials: "M", name: "Miljuschka", color: "#1a1a1a", url: "https://miljuschka.nl", icon: "" },
  { id: "ch-up", initials: "UP", name: "Uit Paulines Keuken", color: "#f8bb47", url: "https://uitpaulineskeuken.nl", icon: "" },
];

const homeScreen = document.getElementById("homeScreen");
const detailScreen = document.getElementById("detailScreen");
const groceryScreen = document.getElementById("groceryScreen");
const mealPlanScreen = document.getElementById("mealPlanScreen");
const settingsScreen = document.getElementById("settingsScreen");
const importScreen = document.getElementById("importScreen");
const reviewScreen = document.getElementById("reviewScreen");
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
const closeImportSecondaryButton = document.getElementById("closeImportSecondaryButton");
const openFeaturedRecipeButton = document.getElementById("openFeaturedRecipeButton");
const platformButtons = [...document.querySelectorAll(".platform-button[data-platform-choice]")];
const platformCards = [...document.querySelectorAll(".platform-card[data-platform-choice]")];
const navItems = [...document.querySelectorAll(".nav-item[data-view]")];
const detailBackButton = document.getElementById("detailBackButton");
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
const profileEditAvatarButton = document.getElementById("profileEditAvatarButton");
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
const reviewTitleInput = document.getElementById("reviewTitleInput");
const reviewDescriptionInput = document.getElementById("reviewDescriptionInput");
const reviewTimeInput = document.getElementById("reviewTimeInput");
const reviewServingsInput = document.getElementById("reviewServingsInput");
const reviewMealTagInput = document.getElementById("reviewMealTagInput");
const reviewIngredientsInput = document.getElementById("reviewIngredientsInput");
const reviewInstructionsInput = document.getElementById("reviewInstructionsInput");
const reviewFeedback = document.getElementById("reviewFeedback");
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

function getSelectedRecipe() {
  return state.recipes.find((recipe) => recipe.id === state.selectedRecipeId) || state.recipes[0];
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
  return state.recipes.find((recipe) => recipe.id === recipeId) || null;
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
}

function openAuthModal(mode = "login") {
  state.auth.mode = mode;
  authModal.classList.remove("hidden");
  authModal.setAttribute("aria-hidden", "false");
  authKicker.textContent = mode === "register" ? "ACCOUNT AANMAKEN" : "INLOGGEN";
  authTitle.textContent = mode === "register" ? "Maak je Plately account" : "Inloggen bij Plately";
  submitAuthButton.textContent = mode === "register" ? "Account maken" : "Inloggen";
  switchAuthModeButton.textContent =
    mode === "register" ? "Heb je al een account? Inloggen" : "Nog geen account? Registreren";
  authFeedback.textContent =
    mode === "register"
      ? "Maak een account om jouw recepten en kookboeken ook op andere apparaten terug te zien."
      : "Log in om jouw recepten, kookboeken, planning en lijstjes terug te zien.";
  authForm.reset();
  authEmail.focus();
}

function closeAuthModal() {
  authModal.classList.add("hidden");
  authModal.setAttribute("aria-hidden", "true");
}

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
  if (storeAssistant) {
    storeAssistant.classList.add("is-hidden");
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
  if (!preview) {
    basketSummary.innerHTML = "";
    basketList.innerHTML = "";
    return;
  }

  const storeConfig = getStoreConfig(preview.store);
  const storeLabel = preview.storeLabel || storeConfig.label;
  const itemCount = preview.items.length;

  storeAssistantKicker.textContent = storeConfig.kicker;
  storeAssistantTitle.textContent = `${preview.recipeTitle || "Boodschappenlijst"} voor ${storeLabel}`;
  storeAssistantCopy.textContent = storeConfig.helperCopy;
  basketNote.textContent =
    preview.note ||
    "Plately kiest de beste productmatch per ingrediënt en stuurt je daarna door naar de winkel.";
  basketContinueButton.textContent =
    preview.directUrl && preview.directUrl !== preview.fallbackUrl
      ? storeConfig.directLabel
      : storeConfig.continueLabel;

  basketSummary.innerHTML = `
    <article class="basket-summary__card">
      <div class="basket-summary__copy">
        <p class="basket-summary__eyebrow">${escapeHtml(storeLabel)}</p>
        <p class="basket-summary__title">${escapeHtml(preview.recipeTitle || "Plately selectie")}</p>
      </div>
      <span class="basket-summary__badge">
        ${itemCount} matches
      </span>
    </article>
  `;

  basketList.innerHTML = preview.items
    .map((item, itemIndex) => {
      const selectedChoice = item.choices?.[item.selectedChoiceIndex || 0];
      if (!selectedChoice) {
        return "";
      }

      return `
        <article class="basket-item">
          <div class="basket-item__head">
            <div>
              <p class="basket-item__ingredient">${escapeHtml(item.ingredientTitle)}</p>
              <p class="basket-item__amount">${escapeHtml(item.ingredientAmount)}</p>
            </div>
            <p class="basket-item__confidence">${escapeHtml(item.confidence || "Slimme match")}</p>
          </div>

          <div class="basket-item__product">
            <span class="basket-item__emoji" aria-hidden="true">${escapeHtml(selectedChoice.emoji || "🛒")}</span>
            <div>
              <p class="basket-item__product-title">${escapeHtml(selectedChoice.title)}</p>
              <p class="basket-item__product-meta">${escapeHtml(selectedChoice.subtitle || "")}</p>
            </div>
            <p class="basket-item__price">${escapeHtml(selectedChoice.price || "")}</p>
          </div>

          <div class="basket-item__actions">
            <a
              class="basket-item__link"
              href="${escapeHtml(selectedChoice.url || buildStoreSearchUrl(preview.store, [{ title: item.ingredientTitle }]))}"
              target="_blank"
              rel="noreferrer"
            >
              Bekijk in winkel
            </a>
          </div>

          <div class="basket-item__choices">
            ${item.choices
              .map(
                (choice, choiceIndex) => `
                  <button
                    class="basket-choice-pill ${choiceIndex === (item.selectedChoiceIndex || 0) ? "is-selected" : ""}"
                    type="button"
                    data-basket-item-index="${itemIndex}"
                    data-basket-choice-index="${choiceIndex}"
                  >
                    ${escapeHtml(choice.badge || `Optie ${choiceIndex + 1}`)}
                  </button>
                `
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function openBasketModal(preview) {
  state.basketPreview = preview;
  renderBasketPreview();
  if (storeAssistant) {
    storeAssistant.classList.remove("is-hidden");
    storeAssistant.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function goHome() {
  closeModal();
  closeBasketModal();
  switchView("home");
}

function switchView(view) {
  state.view = view;
  homeScreen.classList.toggle("screen--active", view === "home");
  detailScreen.classList.toggle("screen--active", view === "detail");
  groceryScreen.classList.toggle("screen--active", view === "grocery");
  mealPlanScreen.classList.toggle("screen--active", view === "mealplan");
  settingsScreen.classList.toggle("screen--active", view === "settings");
  importScreen.classList.toggle("screen--active", view === "import");
  reviewScreen.classList.toggle("screen--active", view === "review");

  navItems.forEach((item) => {
    const isRecipesNav = item.dataset.view === "home" && (view === "home" || view === "detail" || view === "import" || view === "review");
    item.classList.toggle("nav-item--active", isRecipesNav || item.dataset.view === view);
  });

  if (view !== "detail" && state.keepAwake) {
    releaseWakeLock();
  } else if (view === "detail" && state.keepAwake) {
    requestWakeLock();
  }

  window.scrollTo({ top: 0, behavior: "auto" });
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
    /^(\d+(?:[.,]\d+)?)\s*(g|kg|ml|l|el|tl|tbsp|tsp|cup|cups|oz|dl|stuks?|stuk|krop|bosje|zakje|pot|blik|liter|snuf|teen|plak(?:jes)?)?\s*(.+)$/i
  );
  if (match) {
    return {
      quantity: match[1],
      unit: (match[2] || "x").toLowerCase(),
      name: match[3].trim(),
    };
  }
  return { quantity: "1", unit: "x", name: cleanValue || "Ingredient" };
}

function normalizeUnit(unit) {
  const value = String(unit || "").trim().toLowerCase();
  if (!value || value === "x") return "stuk";
  if (value === "stuks") return "stuk";
  if (value === "grams") return "g";
  if (value === "liter") return "l";
  if (value === "milliliter") return "ml";
  return value;
}

function normalizeIngredientKey(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
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

  // Take the 4 most recently added recipes (last in array = newest for seeded, first for imported)
  const recent = [...state.recipes].reverse().slice(0, 4);

  if (!recent.length) {
    heading.classList.add("hidden");
    grid.innerHTML = "";
    return;
  }

  heading.classList.remove("hidden");
  grid.innerHTML = recent.map((recipe) => `
    <button class="recent-card" type="button" data-recipe-id="${escapeHtml(recipe.id)}">
      <img class="recent-card__img" src="${escapeHtml(recipe.image || "assets/hero-burger.svg")}" alt="${escapeHtml(recipe.title)}" loading="lazy" />
      <div class="recent-card__body">
        <p class="recent-card__title">${escapeHtml(recipe.title)}</p>
        <p class="recent-card__meta">${escapeHtml(recipe.time || "")}</p>
      </div>
    </button>
  `).join("");

  // Click handler
  grid.querySelectorAll(".recent-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.recipeId;
      if (!id) return;
      state.selectedRecipeId = id;
      renderDetailRecipe(true);
      switchView("detail");
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
  const featuredId = getFeaturedRecipe().id;
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
  row.innerHTML = SEED_CHANNELS.map((ch) => `
    <button class="channel-item" type="button" data-channel-url="${escapeHtml(ch.url)}" aria-label="${escapeHtml(ch.name)} openen">
      <span class="channel-avatar" style="background:${escapeHtml(ch.color)}">
        <span class="channel-avatar__initials">${escapeHtml(ch.initials)}</span>
      </span>
      <span class="channel-name">${escapeHtml(ch.name)}</span>
    </button>
  `).join("");
}

function renderNavBadge() {
  const badge = document.getElementById("groceryNavBadge");
  if (!badge) return;
  const count = state.groceryItems.filter((item) => !item.checked).length;
  badge.textContent = count > 0 ? String(count) : "";
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
  let recipes;
  if (!state.searchQuery.trim() && !state.activeCookbookFilter) {
    recipes = COOKBOOK_SHOWCASE_IDS.map((recipeId) => getRecipeById(recipeId)).filter(Boolean);
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

  recipes = recipes.slice(0, 4);
  if (!recipes.length) {
    recipeGrid.innerHTML = `
      <article class="recipe-card recipe-card--empty">
        <div class="recipe-card__body">
          <h3>Geen resultaten</h3>
          <div class="recipe-card__meta"><span>Probeer een andere zoekterm</span></div>
        </div>
      </article>
    `;
    return;
  }

  recipeGrid.innerHTML = recipes
    .map(
      (recipe) => `
        <button class="recipe-card" type="button" data-recipe-id="${recipe.id}">
          <img src="${recipe.image}" alt="${recipe.alt}" />
          <div class="recipe-card__body">
            <h3>${recipe.title}</h3>
            <div class="recipe-card__meta">
              <span><span class="recipe-card__clock" aria-hidden="true">◔</span>${recipe.time}</span>
            </div>
          </div>
        </button>
      `
    )
    .join("");
}

function renderDetailRecipe(resetServings = false) {
  const recipe = getSelectedRecipe();
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
          <span>${escapeHtml(recipe.platform ? getPlatformLabel(recipe.platform) : "Recept")}</span>
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
        <li>
          <button
            class="ingredient-item ${isIngredientChecked(recipe.id, ingredient, index) ? "is-checked" : ""}"
            type="button"
            data-ingredient-index="${index}"
            aria-pressed="${String(isIngredientChecked(recipe.id, ingredient, index))}"
          >
            <span class="ingredient-amount">${formatIngredientAmount(ingredient, factor)}</span>
            <span class="ingredient-name">${ingredient.name}</span>
            <span class="ingredient-thumb" aria-hidden="true">${getIngredientVisualMarkup(ingredient.name)}</span>
          </button>
        </li>
      `
    )
    .join("");

  detailStepList.innerHTML = recipe.instructions
    .map(
      (step, index) => `
        <li class="step-item">
          <span class="step-index">${index + 1}</span>
          <p class="step-copy">${step}</p>
        </li>
      `
    )
    .join("");

  if (detailSaveHeaderButton) {
    detailSaveHeaderButton.classList.toggle("is-active", isRecipeSaved(recipe.id));
  }
  if (saveRecipeButton) {
    const saveLabel = isRecipeSaved(recipe.id) ? "Recept bewaard" : "Bewaar recept";
    saveRecipeButton.setAttribute("aria-label", saveLabel);
    saveRecipeButton.setAttribute("title", saveLabel);
    saveRecipeButton.classList.toggle("is-active", isRecipeSaved(recipe.id));
  }
  renderCookMode(recipe, recipeProgress);
  updateWakeLockUI();
  renderMealPlanCurrentRecipe();
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

  const groups = state.groceryItems.reduce((accumulator, item) => {
    if (!accumulator[item.group]) {
      accumulator[item.group] = [];
    }
    accumulator[item.group].push(item);
    return accumulator;
  }, {});

  groceryGroups.innerHTML = Object.entries(groups)
    .map(([group, items]) => {
      const meta = getGroupMeta(group);
      const bought = items.filter((item) => item.checked).length;
      const sortedItems = [...items].sort((left, right) => Number(left.checked) - Number(right.checked));

      return `
        <section class="grocery-group">
          <div class="grocery-group__header">
            <h2>${meta.title}</h2>
          </div>
          ${sortedItems
            .map(
              (item) => `
                <button class="grocery-entry ${item.checked ? "is-checked" : ""}" type="button" data-grocery-id="${item.id}">
                  <span class="grocery-entry__img" aria-hidden="true">${getIngredientVisualMarkup(item.title)}</span>
                  <span class="grocery-entry__content">
                    <p class="grocery-entry__title">${item.title}</p>
                  </span>
                  <span class="grocery-entry__amount">${item.amount}</span>
                  <span class="grocery-check"></span>
                </button>
              `
            )
            .join("")}
        </section>
      `;
    })
    .join("");
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

function renderProfileSummary() {
  if (profileName) {
    profileName.textContent = state.profile.name;
  }
  if (profileHandle) {
    profileHandle.textContent = state.profile.handle;
  }
  if (profileRecipeCount) {
    profileRecipeCount.textContent = `${state.recipes.length} recepten`;
  }
  if (profileCookbookCount) {
    profileCookbookCount.textContent = `${state.cookbooks.length} collecties`;
  }
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
}

function renderCookbookList() {
  cookbookList.innerHTML = [
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
      `;
    }),
  ].join("");
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
  renderFeaturedRecipe();
  renderDetailRecipe(false);
  schedulePersistAppState();
  renderCookbookSaveList(recipeId);
  showToast(`Opgeslagen in ${cookbook.name}.`);
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

function openCreateCookbookPrompt() {
  const cookbookName = window.prompt("Naam van je nieuwe kookboek");
  if (cookbookName === null) {
    return;
  }
  createCookbook(cookbookName);
}

function assignSelectedRecipeToDay(dayKey) {
  const recipe = getSelectedRecipe();
  state.mealPlan[dayKey] = recipe.id;
  renderMealPlanGrid();
  schedulePersistAppState();
  showToast(`${recipe.title} gepland op ${dayKey[0].toUpperCase()}${dayKey.slice(1)}.`);
}

async function shareSelectedRecipe() {
  const recipe = getSelectedRecipe();
  const shareUrl = recipe.sourceUrl || window.location.href;
  const shareText = `${recipe.title} • ${recipe.time}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: recipe.title,
        text: shareText,
        url: shareUrl,
      });
      return;
    } catch {
      // user cancelled or not supported
    }
  }

  try {
    await navigator.clipboard.writeText(`${recipe.title}\n${shareUrl}`);
    showToast("Receptlink gekopieerd.");
  } catch {
    showToast("Delen lukte niet in deze browser.");
  }
}

function addRecipeToGrocery(recipe) {
  let added = 0;
  let merged = 0;

  recipe.ingredients.forEach((ingredient) => {
    const normalizedTitle = normalizeIngredientKey(ingredient.name);
    const nextAmount = formatIngredientAmount(ingredient, state.currentServings / parseBaseServings(recipe.servings));
    const existingItem = state.groceryItems.find(
      (item) =>
        !item.checked &&
        normalizeIngredientKey(item.title) === normalizedTitle &&
        item.group === getIngredientGroup(ingredient.name)
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
      title: ingredient.name,
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
    renderBasketPreview();
    if (storeAssistant) {
      storeAssistant.classList.remove("is-hidden");
      storeAssistant.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

  if (!clean) {
    return "Geïmporteerd recept";
  }

  if (clean.length <= 44) {
    return clean;
  }

  const words = clean.split(" ").filter(Boolean);
  return words.slice(0, 7).join(" ");
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
    time: recipe.time || "30 min",
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
  return state.recipes
    .filter((recipe) => !SEED_RECIPE_IDS.has(recipe.id) && !recipe.isSeed)
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
  };
}

function applyPersistedAppState(user) {
  if (!user || typeof user !== "object") {
    return;
  }

  state.session.userId = user.id || "";
  state.auth.authenticated = Boolean(user.authenticated);
  state.auth.email = user.email || "";

  if (user.profile && typeof user.profile === "object") {
    state.profile = {
      name: user.profile.name || state.profile.name,
      handle: user.profile.handle || state.profile.handle,
    };
  }

  const importedRecipes = Array.isArray(user.importedRecipes)
    ? user.importedRecipes.map((recipe) => normalizeImportedRecipe({ ...recipe, platform: recipe.platform || "website" }))
    : [];
  state.recipes = [...importedRecipes, ...initialRecipes];

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
}

function renderAll() {
  renderHomeStats();
  renderRecentImports();
  renderChannelRow();
  renderFeaturedRecipe();
  renderQuickRecipeGrid();
  renderCategoryGrid();
  renderCookbookFilterBar();
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

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
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

async function bootstrapSession() {
  try {
    const payload = await fetchJson(`${state.apiBase}/api/session`);
    if (payload?.auth) {
      state.auth.enabled = Boolean(payload.auth.enabled);
      state.auth.authenticated = Boolean(payload.auth.authenticated);
      state.auth.email = payload.auth.email || "";
    }
    applyPersistedAppState(payload.user);
  } catch {
    // Fall back to the in-memory demo state if the backend is unreachable.
  } finally {
    state.session.ready = true;
    renderAll();
  }
}

async function submitAuth(mode, email, password) {
  const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
  const payload = await fetchJson(`${state.apiBase}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      currentState: buildPersistedAppState(),
    }),
  });

  if (payload?.auth) {
    state.auth.enabled = Boolean(payload.auth.enabled);
    state.auth.authenticated = Boolean(payload.auth.authenticated);
    state.auth.email = payload.auth.email || "";
  }
  applyPersistedAppState(payload.user);
  renderAll();
  closeAuthModal();
  showToast(mode === "register" ? "Account aangemaakt." : "Je bent ingelogd.");
}

async function logoutAccount() {
  const payload = await fetchJson(`${state.apiBase}/api/auth/logout`, {
    method: "POST",
  });

  if (payload?.auth) {
    state.auth.enabled = Boolean(payload.auth.enabled);
    state.auth.authenticated = Boolean(payload.auth.authenticated);
    state.auth.email = payload.auth.email || "";
  }
  applyPersistedAppState(payload.user);
  renderAll();
  showToast("Je bent uitgelogd.");
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

    state.recipes = [importedRecipe, ...state.recipes];
    state.selectedRecipeId = importedRecipe.id;
    state.featuredRecipeId = importedRecipe.id;
    state.currentServings = parseBaseServings(importedRecipe.servings);

    renderHomeStats();
    renderRecentImports();
    renderFeaturedRecipe();
    renderQuickRecipeGrid();
    renderCategoryGrid();
    renderRecipeGrid();
    renderDetailRecipe(true);
    schedulePersistAppState();

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

bindEvent(document.getElementById("openImportButton"), "click", () => openModal());
bindEvent(document.getElementById("openImportButton2"), "click", () => openModal());

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

bindEvent(detailBackButton, "click", () => switchView("home"));
bindEvent(groceryAddButton, "click", () => addRecipeToGrocery(getSelectedRecipe()));
bindEvent(addSelectedToGroceriesButton, "click", () => {
  addRecipeToGrocery(getSelectedRecipe());
  switchView("grocery");
});
bindEvent(clearGroceryListButton, "click", () => {
  state.groceryItems = [];
  renderGroceryGroups();
  schedulePersistAppState();
  showToast("Boodschappenlijst leeggemaakt.");
});
bindEvent(addCustomGroceryButton, "click", addCustomGroceryItem);
bindEvent(groceryQuickAddTopButton, "click", addCustomGroceryItem);
bindEvent(document.getElementById("viewAllImportsButton"), "click", () => {
  switchView("home");
  document.getElementById("recipeGrid")?.scrollIntoView({ behavior: "smooth" });
});
bindEvent(document.getElementById("groceryClearButton"), "click", () => {
  if (!state.groceryItems.length) return;
  if (!confirm("Wil je de hele boodschappenlijst leegmaken?")) return;
  state.groceryItems = [];
  renderGroceryGroups();
  renderNavBadge();
  schedulePersistAppState();
  showToast("Boodschappenlijst is leeggemaakt.");
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
if (groceryQuickInput) {
  groceryQuickInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    const value = groceryQuickInput.value.trim();
    if (!value) {
      return;
    }

    const existingItem = state.groceryItems.find(
      (item) => !item.checked && normalizeIngredientKey(item.title) === normalizeIngredientKey(value)
    );

    if (existingItem) {
      existingItem.amount = mergeAmountLabels(existingItem.amount, "1 stuk");
    } else {
      state.groceryItems.unshift({
        id: `grocery-quick-${Date.now()}`,
        title: value,
        amount: "1 stuk",
        recipeId: "",
        recipeTitle: "",
        recipeSourceUrl: "",
        recipePlatform: "website",
        group: getIngredientGroup(value),
        checked: false,
      });
    }

    groceryQuickInput.value = "";
    renderGroceryGroups();
    schedulePersistAppState();
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
bindEvent(saveRecipeButton, "click", () => openCookbookSaveModal(getSelectedRecipe().id));
bindEvent(detailSaveHeaderButton, "click", () => openCookbookSaveModal(getSelectedRecipe().id));
bindEvent(reviewImportButton, "click", () => openImportReview(getSelectedRecipe().id));
bindEvent(profileEditButton, "click", () => {
  const nextName = window.prompt("Naam van je profiel", state.profile.name);
  if (nextName === null) {
    return;
  }

  const nextHandle = window.prompt("Gebruikersnaam", state.profile.handle);
  if (nextHandle === null) {
    return;
  }

  state.profile = {
    name: String(nextName || "").trim() || state.profile.name,
    handle: String(nextHandle || "")
      .trim()
      .replace(/\s+/g, "") || state.profile.handle,
  };

  if (!state.profile.handle.startsWith("@")) {
    state.profile.handle = `@${state.profile.handle}`;
  }

  renderProfileSummary();
  schedulePersistAppState();
  showToast("Profiel bijgewerkt.");
});
bindEvent(profileEditAvatarButton, "click", () => showToast("Avatar aanpassen volgt in de volgende stap."));
bindEvent(premiumButton, "click", () => showToast("Premium preview staat klaar voor later."));
bindEvent(openRegisterButton, "click", () => openAuthModal("register"));
bindEvent(openLoginButton, "click", () => openAuthModal("login"));
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
    switchView(item.dataset.view);
  });
});

// Home avatar → instellingen
document.querySelector(".home-avatar")?.addEventListener("click", () => switchView("settings"));

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
  state.searchQuery = event.target.value;
  renderQuickRecipeGrid();
  renderRecipeGrid();
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

bindEvent(detailIngredientList, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const ingredientButton = target.closest("[data-ingredient-index]");
  if (!(ingredientButton instanceof HTMLElement)) {
    return;
  }

  toggleIngredientChecked(Number(ingredientButton.dataset.ingredientIndex));
});

bindEvent(storeAssistant, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element) || !state.basketPreview) {
    return;
  }

  const choiceButton = target.closest("[data-basket-item-index]");
  if (!(choiceButton instanceof HTMLElement)) {
    return;
  }

  const itemIndex = Number(choiceButton.dataset.basketItemIndex);
  const choiceIndex = Number(choiceButton.dataset.basketChoiceIndex);
  const previewItem = state.basketPreview.items[itemIndex];
  if (!previewItem || !previewItem.choices?.[choiceIndex]) {
    return;
  }

  previewItem.selectedChoiceIndex = choiceIndex;
  renderBasketPreview();
});

bindEvent(cookbookList, "click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const createCard = target.closest("[data-create-cookbook]");
  if (createCard instanceof HTMLElement) {
    openCreateCookbookPrompt();
    return;
  }

  const cookbookCard = target.closest("[data-cookbook-id]");
  if (!(cookbookCard instanceof HTMLElement)) {
    return;
  }

  state.selectedCookbookId = cookbookCard.dataset.cookbookId;
  renderCookbookList();
  schedulePersistAppState();
  showToast(`${getCookbookById(state.selectedCookbookId).name} is nu je standaard kookboek.`);
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

  const recipeId = state.pendingCookbookSaveRecipeId || getSelectedRecipe().id;
  const cookbookId = cookbookButton.dataset.saveCookbookId;
  if (!recipeId || !cookbookId) {
    return;
  }

  saveRecipeToCookbook(recipeId, cookbookId);
  closeCookbookSaveModal();
  state.selectedRecipeId = recipeId;
  renderDetailRecipe(true);
  switchView("detail");
});

bindEvent(cookbookSaveCreateButton, "click", () => {
  const cookbookName = window.prompt("Naam van je nieuwe kookboek");
  if (cookbookName === null) {
    return;
  }

  const cookbook = createCookbook(cookbookName);
  if (!cookbook) {
    return;
  }

  const recipeId = state.pendingCookbookSaveRecipeId || getSelectedRecipe().id;
  if (recipeId) {
    saveRecipeToCookbook(recipeId, cookbook.id);
  }
  closeCookbookSaveModal();
  if (recipeId) {
    state.selectedRecipeId = recipeId;
    renderDetailRecipe(true);
    switchView("detail");
  }
});

bindEvent(switchAuthModeButton, "click", () => {
  openAuthModal(state.auth.mode === "register" ? "login" : "register");
});

bindEvent(authForm, "submit", async (event) => {
  event.preventDefault();
  const email = authEmail.value.trim();
  const password = authPassword.value;

  submitAuthButton.disabled = true;
  submitAuthButton.textContent = state.auth.mode === "register" ? "Account maken..." : "Inloggen...";

  try {
    await submitAuth(state.auth.mode, email, password);
  } catch (error) {
    authFeedback.textContent = error.message;
  } finally {
    submitAuthButton.disabled = false;
    submitAuthButton.textContent = state.auth.mode === "register" ? "Account maken" : "Inloggen";
  }
});

bindEvent(reviewForm, "submit", (event) => {
  event.preventDefault();
  saveImportReview();
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

  const url = getBasketHandoffUrl(preview);
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

bindEvent(importForm, "submit", async (event) => {
  event.preventDefault();

  const url = recipeUrlInput.value.trim();
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
  const url = homeImportUrl.value.trim();

  await submitImport(
    url,
    "",
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
      homeImportFeedback.textContent = "Voeg direct een recept toe vanuit social media of een receptenwebsite.";
      openImportReview(importedRecipe.id);
      showToast(`${importedRecipe.title} klaar om na te lopen.`);
    }
  );
});

bindEvent(importScreenForm, "submit", async (event) => {
  event.preventDefault();
  const url = importScreenUrl.value.trim();

  await submitImport(
    url,
    "",
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
      importScreenFeedback.textContent = "Kopieer de link uit de app of website en plak hem hierboven.";
      openImportReview(importedRecipe.id);
      showToast(`${importedRecipe.title} klaar om na te lopen.`);
    }
  );
});

syncPlatformUI();
renderAll();
refreshBackendStatus();
registerServiceWorker();
bootstrapSession();
