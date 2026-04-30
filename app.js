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

const initialRecipes = [
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

const state = {
  apiBase: window.location.protocol === "file:" ? "http://localhost:3000" : "",
  selectedPlatform: "tiktok",
  view: "home",
  recipes: initialRecipes,
  selectedRecipeId: initialRecipes[0].id,
  featuredRecipeId: initialRecipes[0].id,
  reviewRecipeId: "",
  currentServings: 2,
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
};

const SEED_RECIPE_IDS = new Set(initialRecipes.map((recipe) => recipe.id));

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
const featuredTime = document.getElementById("featuredTime");
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
const wakeLockButton = document.getElementById("wakeLockButton");
const detailStepCount = document.getElementById("detailStepCount");
const detailIngredientCount = document.getElementById("detailIngredientCount");
const servingsDisplay = document.getElementById("servingsDisplay");
const detailIngredientList = document.getElementById("detailIngredientList");
const detailStepList = document.getElementById("detailStepList");
const addSelectedToGroceriesButton = document.getElementById("addSelectedToGroceriesButton");
const grocerySubtitle = document.getElementById("grocerySubtitle");
const groceryGroups = document.getElementById("groceryGroups");
const grocerySummaryChips = document.getElementById("grocerySummaryChips");
const groceryAddButton = document.getElementById("groceryAddButton");
const clearGroceryListButton = document.getElementById("clearGroceryListButton");
const addCustomGroceryButton = document.getElementById("addCustomGroceryButton");
const copyGroceryListButton = document.getElementById("copyGroceryListButton");
const clearGroceryToolbarButton = document.getElementById("clearGroceryToolbarButton");
const orderAHButton = document.getElementById("orderAHButton");
const orderJumboButton = document.getElementById("orderJumboButton");
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

function getSelectedRecipe() {
  return state.recipes.find((recipe) => recipe.id === state.selectedRecipeId) || state.recipes[0];
}

function getFeaturedRecipe() {
  return state.recipes.find((recipe) => recipe.id === state.featuredRecipeId) || state.recipes[0];
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
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
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

function getStoreLabel(store) {
  if (store === "albert-heijn" || store === "ah") {
    return "Albert Heijn";
  }
  return "Jumbo";
}

function buildStoreSearchUrl(store, terms) {
  const query = encodeURIComponent(terms.filter(Boolean).join(" "));
  if (store === "albert-heijn" || store === "ah") {
    return `https://www.ah.nl/zoeken?query=${query}`;
  }
  return `https://www.jumbo.com/zoeken/?searchTerms=${query}`;
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
  if (preview.store === "jumbo") {
    return "https://www.jumbo.com/mandje/";
  }
  return (
    preview.directUrl ||
    preview.fallbackUrl ||
    "https://www.ah.nl/mijnlijst/"
  );
}

function renderBasketPreview() {
  const preview = state.basketPreview;
  if (!preview) {
    basketSummary.innerHTML = "";
    basketList.innerHTML = "";
    return;
  }

  const storeLabel = getStoreLabel(preview.store);
  const itemCount = preview.items.length;

  storeAssistantKicker.textContent = preview.store === "albert-heijn" ? "ALBERT HEIJN LIJSTJE" : "JUMBO MANDJE";
  storeAssistantTitle.textContent = `${preview.recipeTitle || "Boodschappenlijst"} voor ${storeLabel}`;
  storeAssistantCopy.textContent =
    preview.store === "albert-heijn"
      ? "We tonen nu je beste productmatches. Waar mogelijk openen we direct je Albert Heijn-lijst."
      : "We tonen nu je beste productmatches. Waar mogelijk openen we direct je Jumbo-mandje.";
  basketNote.textContent =
    preview.note ||
    "Plately kiest de beste productmatch per ingrediënt en stuurt je daarna door naar de winkel.";
  basketContinueButton.textContent =
    preview.store === "albert-heijn"
      ? preview.directUrl && preview.directUrl !== preview.fallbackUrl
        ? "Open Albert Heijn-lijst"
        : "Open Albert Heijn"
      : "Open Jumbo-mandje";

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
              href="${escapeHtml(selectedChoice.url || buildStoreSearchUrl(preview.store, [item.ingredientTitle]))}"
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

function getIngredientEmoji(name) {
  const value = name.toLowerCase();
  if (/avocado/.test(value)) return "🥑";
  if (/(sla|spinazie|kool|broccoli)/.test(value)) return "🥬";
  if (/tomaat/.test(value)) return "🍅";
  if (/(ui|sjalot)/.test(value)) return "🧅";
  if (/knoflook/.test(value)) return "🧄";
  if (/banaan/.test(value)) return "🍌";
  if (/citroen|limoen|lime/.test(value)) return "🍋";
  if (/paprika/.test(value)) return "🫑";
  if (/komkommer|courgette/.test(value)) return "🥒";
  if (/wortel/.test(value)) return "🥕";
  if (/aardappel|friet/.test(value)) return "🍟";
  if (/burger|gehakt|vlees/.test(value)) return "🥩";
  if (/kip/.test(value)) return "🍗";
  if (/zalm|vis|tonijn/.test(value)) return "🐟";
  if (/ei/.test(value)) return "🥚";
  if (/yoghurt|melk/.test(value)) return "🥛";
  if (/feta|kaas/.test(value)) return "🧀";
  if (/honing/.test(value)) return "🍯";
  if (/mayonaise|mayo|saus/.test(value)) return "🫙";
  if (/rijst/.test(value)) return "🍚";
  if (/pasta|spaghetti|penne|linguine|noodle/.test(value)) return "🍝";
  if (/brood|toast|bun/.test(value)) return "🍞";
  return "🛒";
}

function getIngredientGroup(name) {
  const value = name.toLowerCase();
  if (/(avocado|sla|tomaat|ui|koriander|banaan|citroen|limoen|lime|paprika|komkommer|courgette|wortel|spinazie)/.test(value)) {
    return "produce";
  }
  if (/(burger|kip|tofu|ei|feta|kaas|zalm|vis)/.test(value)) {
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
        title: "Vers & Fruit",
        icon:
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.2c1.1-1.5 2.7-2.2 4.5-2.2c2.8 0 5 2.2 5 5c0 5-4.4 8.8-9.5 10.4C6.9 17.8 2.5 14 2.5 9c0-2.8 2.2-5 5-5c1.8 0 3.4.7 4.5 2.2ZM12 6.2c-.9-1.7-.8-3.4.7-4.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        className: "group-icon group-icon--produce",
      };
    case "protein":
      return {
        title: "Plantaardig",
        icon:
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 4.5c-5.7.4-9.6 3.1-11.7 8.1c-.8 2-.9 3.9-.8 6.9c3-1.4 4.8-2.9 6.1-4.7c2.8-3.7 3-7.4 6.4-10.3Zm-12 15c3-2 5.9-3.3 8.8-3.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        className: "group-icon group-icon--protein",
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
        title: "Voorraad",
        icon:
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M6.5 6l1 12h9l1-12M9 10v5M12 10v5M15 10v5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        className: "group-icon group-icon--pantry",
      };
  }
}

function getVisibleRecipes() {
  const query = state.searchQuery.trim().toLowerCase();
  if (!query) {
    return state.recipes;
  }

  return state.recipes.filter((recipe) => {
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

function renderFeaturedRecipe() {
  const recipe = getFeaturedRecipe();
  featuredImage.src = recipe.image;
  featuredImage.alt = recipe.alt;
  featuredTitle.textContent = recipe.title;
  featuredTime.textContent = recipe.time;
  const iconUrl = getSourceIconUrl(recipe.sourceUrl || "");
  const host = getSourceHost(recipe.sourceUrl || "");
  featuredSourceIcon.innerHTML = iconUrl
    ? `<span class="source-favicon__inner"><img src="${iconUrl}" alt="" loading="lazy" /></span>`
    : `<span class="source-favicon__inner"><span>${(host || "•").slice(0, 1).toUpperCase()}</span></span>`;
}

function getImportedRecipes() {
  return state.recipes.filter((recipe) => !SEED_RECIPE_IDS.has(recipe.id) && !recipe.isSeed);
}

function renderHomeStats() {
  if (!homeStats) {
    return;
  }

  const importedCount = getImportedRecipes().length;
  const savedCount = state.cookbooks.reduce((total, cookbook) => total + cookbook.recipeIds.length, 0);
  const groceryCount = state.groceryItems.filter((item) => !item.checked).length;

  homeStats.innerHTML = `
    <article class="home-stat-card">
      <span class="home-stat-card__value">${importedCount}</span>
      <span class="home-stat-card__label">Geïmporteerd</span>
    </article>
    <article class="home-stat-card">
      <span class="home-stat-card__value">${savedCount}</span>
      <span class="home-stat-card__label">Bewaard</span>
    </article>
    <article class="home-stat-card">
      <span class="home-stat-card__value">${groceryCount}</span>
      <span class="home-stat-card__label">Op je lijstje</span>
    </article>
  `;
}

function renderRecentImports() {
  if (!recentImportList) {
    return;
  }

  const recipes = getImportedRecipes().slice(0, 3);
  if (!recipes.length) {
    recentImportList.innerHTML = `
      <article class="recent-import-card recent-import-card--empty">
        <p>Nog niets geïmporteerd. Plak hierboven een link van TikTok, Instagram of een website.</p>
      </article>
    `;
    return;
  }

  recentImportList.innerHTML = recipes
    .map(
      (recipe) => `
        <button class="recent-import-card" type="button" data-review-recipe-id="${recipe.id}">
          <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.alt)}" />
          <div class="recent-import-card__copy">
            <span class="recent-import-card__kicker">${escapeHtml(getPlatformLabel(recipe.platform))}</span>
            <strong>${escapeHtml(recipe.title)}</strong>
            <span>${escapeHtml(recipe.ingredients.length)} ingrediënten • ${escapeHtml(recipe.instructions.length)} stappen</span>
          </div>
        </button>
      `
    )
    .join("");
}

function parseMinutesLabel(value) {
  const match = String(value || "").match(/(\d+)/);
  return match ? Number(match[1]) : 999;
}

function getQuickRecipes() {
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
    .map(
      (recipe) => `
        <button class="quick-card" type="button" data-recipe-id="${recipe.id}">
          <span class="quick-card__radio" aria-hidden="true"></span>
          <span class="quick-card__img" aria-hidden="true">${getIngredientEmoji(recipe.ingredients[0]?.name || recipe.title)}</span>
          <span class="quick-card__copy">
            <strong>${escapeHtml(recipe.title)}</strong>
            <span>${escapeHtml(recipe.time)}</span>
          </span>
        </button>
      `
    )
    .join("");
}

function renderCategoryGrid() {
  const categories = [
    { title: "Ontbijt", count: state.recipes.filter((recipe) => /ontbijt/i.test(recipe.mealTag)).length || 12 },
    { title: "Salades", count: 12 },
    { title: "Dips", count: 12 },
    { title: "Hoofdgerechten", count: state.recipes.filter((recipe) => /avond|lunch/i.test(recipe.mealTag)).length || 12 },
  ];

  categoryGrid.innerHTML = categories
    .map(
      (category) => `
        <article class="category-card">
          <h3>${escapeHtml(category.title)}</h3>
          <p>${category.count} recepten</p>
        </article>
      `
    )
    .join("");
}

function renderRecipeGrid() {
  const featuredId = getFeaturedRecipe().id;
  const quickIds = new Set(getQuickRecipes().map((recipe) => recipe.id));
  const recipes = getVisibleRecipes().filter((recipe) => recipe.id !== featuredId && !quickIds.has(recipe.id));
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
          ${getSourceIconMarkup(recipe)}
          <img src="${recipe.image}" alt="${recipe.alt}" />
          <div class="recipe-card__body">
            <h3>${recipe.title}</h3>
            <div class="recipe-card__meta">
              <span>${recipe.time}</span>
              <span>${recipe.servings}</span>
            </div>
          </div>
        </button>
      `
    )
    .join("");
}

function renderDetailRecipe(resetServings = false) {
  const recipe = getSelectedRecipe();
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
    reviewImportButton.classList.toggle("hidden", Boolean(recipe.isSeed || SEED_RECIPE_IDS.has(recipe.id)));
  }
  if (detailIngredientCount) {
    detailIngredientCount.textContent = `${recipe.ingredients.length} items`;
  }
  servingsDisplay.textContent = `${state.currentServings} pers.`;
  detailStepCount.textContent = `${recipe.instructions.length} stappen`;

  detailIngredientList.innerHTML = recipe.ingredients
    .map(
      (ingredient) => `
        <li class="ingredient-item">
          <span class="ingredient-amount">${formatIngredientAmount(ingredient, factor)}</span>
          <span class="ingredient-name">${ingredient.name}</span>
          <span class="ingredient-circle" aria-hidden="true"></span>
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
    saveRecipeButton.textContent = isRecipeSaved(recipe.id) ? "Bewaard" : "Bewaar recept";
  }
  updateWakeLockUI();
  renderMealPlanCurrentRecipe();
}

function renderGrocerySummary() {
  if (!grocerySummaryChips) {
    return;
  }
  const total = state.groceryItems.length;
  const open = state.groceryItems.filter((item) => !item.checked).length;
  const checked = total - open;
  grocerySummaryChips.innerHTML = `
    <span class="summary-chip">${total} totaal</span>
    <span class="summary-chip">${open} te halen</span>
    <span class="summary-chip">${checked} gekocht</span>
  `;
}

function renderGroceryGroups() {
  const uncheckedCount = state.groceryItems.filter((item) => !item.checked).length;
  grocerySubtitle.textContent = `${uncheckedCount} items te gaan`;
  renderGrocerySummary();

  if (!state.groceryItems.length) {
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
            <span class="${meta.className}">${meta.icon}</span>
            <h2>${meta.title}</h2>
            <p class="grocery-group__progress">${bought}/${items.length} gekocht</p>
          </div>
          ${sortedItems
            .map(
              (item) => `
                <button class="grocery-entry ${item.checked ? "is-checked" : ""}" type="button" data-grocery-id="${item.id}">
                  <span class="grocery-check">${item.checked ? "✓" : ""}</span>
                  <span class="grocery-entry__img" aria-hidden="true">${getIngredientEmoji(item.title)}</span>
                  <span class="grocery-entry__content">
                    <p class="grocery-entry__title">${item.title}</p>
                    <p class="grocery-entry__meta">${item.amount}</p>
                  </span>
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
  reviewMealTagInput.value = recipe.mealTag || "";
  reviewIngredientsInput.value = serializeIngredientsForReview(recipe);
  reviewInstructionsInput.value = (recipe.instructions || []).join("\n");
  reviewFeedback.textContent = "Pas de import aan en sla hem daarna op.";
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
  });

  state.selectedRecipeId = recipe.id;
  state.featuredRecipeId = recipe.id;
  state.currentServings = parseBaseServings(recipe.servings);
  renderAll();
  schedulePersistAppState();
  reviewFeedback.textContent = "Recept bijgewerkt.";
  switchView("detail");
  showToast(`${recipe.title} is bijgewerkt.`);
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
  const recipe = getSelectedRecipe();
  mealPlanCurrentRecipe.innerHTML = `
    <article class="planner-focus__card">
      <p class="section-kicker">GESELECTEERD RECEPT</p>
      <h2 class="planner-focus__title">${escapeHtml(recipe.title)}</h2>
      <p class="planner-focus__meta">${escapeHtml(recipe.time)} • ${escapeHtml(recipe.servings)}</p>
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
  renderCookbookList();
  renderDetailRecipe(false);
  schedulePersistAppState();
  showToast(`Opgeslagen in ${cookbook.name}.`);
}

function createCookbook(name) {
  const cleanName = String(name || "").trim();
  if (!cleanName) {
    showToast("Geef je kookboek eerst een naam.");
    return;
  }
  const cookbook = {
    id: `cookbook-${Date.now()}`,
    name: cleanName,
    recipeIds: [],
  };
  state.cookbooks.unshift(cookbook);
  state.selectedCookbookId = cookbook.id;
  renderCookbookList();
  schedulePersistAppState();
  showToast(`${cookbook.name} aangemaakt.`);
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
  const existingKeys = new Set(
    state.groceryItems.map((item) => `${item.recipeTitle.toLowerCase()}::${item.title.toLowerCase()}`)
  );
  let added = 0;

  recipe.ingredients.forEach((ingredient) => {
    const key = `${recipe.title.toLowerCase()}::${ingredient.name.toLowerCase()}`;
    if (existingKeys.has(key)) {
      return;
    }

    state.groceryItems.push({
      id: `${recipe.id}-${ingredient.name}-${Date.now()}-${added}`,
      title: ingredient.name,
      amount: formatIngredientAmount(ingredient, state.currentServings / parseBaseServings(recipe.servings)),
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      recipeSourceUrl: recipe.sourceUrl || "",
      recipePlatform: recipe.platform || "website",
      group: getIngredientGroup(ingredient.name),
      checked: false,
    });
    existingKeys.add(key);
    added += 1;
  });

  renderGroceryGroups();
  schedulePersistAppState();
  showToast(added ? `${recipe.title} toegevoegd aan je boodschappenlijst.` : "Dit recept stond al op je lijst.");
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

  state.groceryItems.unshift({
    id: `grocery-custom-${Date.now()}`,
    title: cleanTitle,
    amount: amount.trim() || "1 stuk",
    recipeId: "",
    recipeTitle: "",
    recipeSourceUrl: "",
    recipePlatform: "website",
    group: getIngredientGroup(cleanTitle),
    checked: false,
  });
  renderGroceryGroups();
  schedulePersistAppState();
  showToast(`${cleanTitle} toegevoegd.`);
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

async function openStoreBasket(store) {
  const activeItems = getActiveGroceryItems();
  if (!activeItems.length) {
    showToast("Voeg eerst ingrediënten toe aan je lijst.");
    return;
  }

  const storeSlug = store === "ah" ? "albert-heijn" : "jumbo";
  const storeName = store === "ah" ? "Albert Heijn" : "Jumbo";
  const button = store === "ah" ? orderAHButton : orderJumboButton;
  const destLabel = button.querySelector(".store-cta__dest");

  // Loading state
  button.disabled = true;
  const originalLabel = destLabel ? destLabel.textContent : "";
  if (destLabel) {
    destLabel.textContent = "Zoeken…";
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
  renderFeaturedRecipe();
  renderQuickRecipeGrid();
  renderCategoryGrid();
  renderRecipeGrid();
  renderCookbookList();
  renderDetailRecipe(true);
  renderImportReview();
  renderGroceryGroups();
  renderMealPlanGrid();
  renderProfileSummary();
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
    const registration = await navigator.serviceWorker.register("/service-worker.js");
    registration.update().catch(() => {});
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

document.getElementById("openImportButton").addEventListener("click", () => openModal());

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

openFeaturedRecipeButton.addEventListener("click", () => {
  state.selectedRecipeId = state.featuredRecipeId;
  renderDetailRecipe(true);
  switchView("detail");
});
featuredCard.addEventListener("click", () => {
  state.selectedRecipeId = state.featuredRecipeId;
  renderDetailRecipe(true);
  switchView("detail");
});
featuredCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    state.selectedRecipeId = state.featuredRecipeId;
    renderDetailRecipe(true);
    switchView("detail");
  }
});

detailBackButton.addEventListener("click", () => switchView("home"));
groceryAddButton.addEventListener("click", () => addRecipeToGrocery(getSelectedRecipe()));
addSelectedToGroceriesButton.addEventListener("click", () => {
  addRecipeToGrocery(getSelectedRecipe());
  switchView("grocery");
});
clearGroceryListButton.addEventListener("click", () => {
  state.groceryItems = [];
  renderGroceryGroups();
  schedulePersistAppState();
  showToast("Boodschappenlijst leeggemaakt.");
});
if (addCustomGroceryButton) {
  addCustomGroceryButton.addEventListener("click", addCustomGroceryItem);
}
if (copyGroceryListButton) {
  copyGroceryListButton.addEventListener("click", () => {
    copyGroceryList().catch(() => {
      showToast("Kopiëren lukte niet.");
    });
  });
}
if (clearGroceryToolbarButton) {
  clearGroceryToolbarButton.addEventListener("click", () => {
    state.groceryItems = [];
    renderGroceryGroups();
    schedulePersistAppState();
    showToast("Boodschappenlijst leeggemaakt.");
  });
}
closeImportSecondaryButton.addEventListener("click", () => closeModal());
orderAHButton.addEventListener("click", () => openStoreBasket("ah"));
orderJumboButton.addEventListener("click", () => openStoreBasket("jumbo"));
wakeLockButton.addEventListener("click", toggleWakeLock);
brandHomeButtons.forEach((button) => {
  button.addEventListener("click", goHome);
});
if (shareRecipeButton) {
  shareRecipeButton.addEventListener("click", shareSelectedRecipe);
}
if (saveRecipeButton) {
  saveRecipeButton.addEventListener("click", () => saveRecipeToCookbook(getSelectedRecipe().id));
}
if (detailSaveHeaderButton) {
  detailSaveHeaderButton.addEventListener("click", () => saveRecipeToCookbook(getSelectedRecipe().id));
}
if (reviewImportButton) {
  reviewImportButton.addEventListener("click", () => openImportReview(getSelectedRecipe().id));
}
profileEditButton.addEventListener("click", () => {
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
profileEditAvatarButton.addEventListener("click", () => showToast("Avatar aanpassen volgt in de volgende stap."));
premiumButton.addEventListener("click", () => showToast("Premium preview staat klaar voor later."));
openRegisterButton.addEventListener("click", () => openAuthModal("register"));
openLoginButton.addEventListener("click", () => openAuthModal("login"));
logoutButton.addEventListener("click", () => {
  logoutAccount().catch(() => {
    showToast("Uitloggen lukte niet.");
  });
});
shareProfileButton.addEventListener("click", async () => {
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

servingsDown.addEventListener("click", () => {
  if (state.currentServings <= 1) {
    return;
  }
  state.currentServings -= 1;
  renderDetailRecipe(false);
});

servingsUp.addEventListener("click", () => {
  if (state.currentServings >= 20) {
    return;
  }
  state.currentServings += 1;
  renderDetailRecipe(false);
});

searchInput.addEventListener("input", (event) => {
  state.searchQuery = event.target.value;
  renderQuickRecipeGrid();
  renderRecipeGrid();
});

recipeGrid.addEventListener("click", (event) => {
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

quickRecipeGrid.addEventListener("click", (event) => {
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

groceryGroups.addEventListener("click", (event) => {
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

storeAssistant.addEventListener("click", (event) => {
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

cookbookList.addEventListener("click", (event) => {
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

modal.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
    closeModal();
  }
});

authModal.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeAuth === "true") {
    closeAuthModal();
  }
});

switchAuthModeButton.addEventListener("click", () => {
  openAuthModal(state.auth.mode === "register" ? "login" : "register");
});

authForm.addEventListener("submit", async (event) => {
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

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveImportReview();
});

skipReviewButton.addEventListener("click", () => {
  const recipe = getReviewRecipe();
  if (!recipe) {
    switchView("home");
    return;
  }
  state.selectedRecipeId = recipe.id;
  renderDetailRecipe(true);
  switchView("detail");
});

mealPlanGrid.addEventListener("click", (event) => {
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
});

basketContinueButton.addEventListener("click", async () => {
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

importForm.addEventListener("submit", async (event) => {
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

homeImportForm.addEventListener("submit", async (event) => {
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

importScreenForm.addEventListener("submit", async (event) => {
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
