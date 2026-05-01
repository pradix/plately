const http = require("node:http");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const ROOT_DIR = __dirname;
const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT_DIR, "data");
const DATA_FILE = path.join(DATA_DIR, "plately-db.json");

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
const META_APP_ID = process.env.META_APP_ID || "";
const META_APP_SECRET = process.env.META_APP_SECRET || "";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const DATABASE_URL = process.env.DATABASE_URL || "";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

const HTTP_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
};

const FETCH_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  "accept-language": "en-US,en;q=0.9,nl;q=0.8",
};

const HTML_FETCH_PROFILES = [
  {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "cache-control": "no-cache",
    pragma: "no-cache",
    "upgrade-insecure-requests": "1",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
  },
  {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "cache-control": "max-age=0",
    "upgrade-insecure-requests": "1",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
  },
];

const FRACTION_MAP = {
  "¼": "1/4",
  "½": "1/2",
  "¾": "3/4",
  "⅐": "1/7",
  "⅑": "1/9",
  "⅒": "1/10",
  "⅓": "1/3",
  "⅔": "2/3",
  "⅕": "1/5",
  "⅖": "2/5",
  "⅗": "3/5",
  "⅘": "4/5",
  "⅙": "1/6",
  "⅚": "5/6",
  "⅛": "1/8",
  "⅜": "3/8",
  "⅝": "5/8",
  "⅞": "7/8",
};

const INGREDIENT_HEADING_PATTERN = /^(ingredients?|ingrediënten|ingredienten|what you need|dit heb je nodig|benodigdheden)$/i;
const INSTRUCTION_HEADING_PATTERN = /^(instructions?|method|steps?|bereiding|bereidingswijze|werkwijze)$/i;
const RECIPE_TITLE_HINT_PATTERN =
  /\b(burger|pasta|salade|toast|smoothie|wrap|curry|soep|bowl|guacamole|egg|eggs|avocado|rijst|kip|zalm|cake|soup|salad|taco|noodle|ramen|lasagne|risotto|pizza|sandwich|quesadilla|salsa|omelet|omelette|stew|stoof|couscous|gnocchi|bake|gratin|frittata|shakshuka)\b/i;
const INSTRUCTION_START_PATTERN =
  /^(mix|add|bake|cook|toast|top|serve|blend|heat|roast|whisk|slice|spread|bak|voeg|snij|snijd|halveer|serveer|kook|maak|meng|verhit|roer|leg|dek|bestrooi|giet|laat|verwarm|doe|gooi|strooi|breng|schenk|haal|verwijder|pel|marineer|kruid|klop|stamp|prak|pureer|grill|oven|stir|fry|airfry|season|drizzle|combine|wash|was|dry|droog|scheur|cut|place|zet|wip|blus)\b/i;
const INGREDIENT_WORD_PATTERN =
  /\b(avocado|tomaat|ui|knoflook|kaas|kip|pasta|olie|citroen|koriander|sla|paprika|room|ei|eieren|melk|honing|boter|brood|rijst|zalm|champignon|courgette|spinazie|yoghurt|bloem|suiker|bouillon|peper|zout|salt|pepper|cheese|garlic|onion|egg|rice|bread|flour|butter|cream|lemon|lime|chicken|beef|pork|salmon|shrimp|tomato|potato|beans|lentils|tofu|mushroom|parsley|basil|oregano|cumin|mayonnaise|mayo|sauce)\b/i;
const NON_FOOD_INGREDIENT_PATTERN =
  /\b(keukenpapier|bakpapier|sat[ée]prikkers?|cocktailprikkers?|aluminiumfolie|folie|servetten?|touw|spiesen?|prikker|tandpasta|tandgel|tandenborstel|mondspoeling|floss|shampoo|conditioner|douchegel|bodylotion|bodywash|handlotion|handcrème|zeep|vloeibare\s+zeep|wasmiddel|vaatwasmiddel|afwasmiddel|schoonmaakmiddel|allesreiniger|wc-reiniger|toiletblok|deodorant|anti-transpirant|parfum|eau\s+de|aftershave|scheerschuim|scheermesje?|scheergel|mascara|make-?up|foundation|lipstick|lippenstift|nagellak|zonnebrand|sunscreen|moisturizer|dagcrème|nachtcrème|toiletpapier|wc-papier|tissues?|wegwerpluier|maandverband|tampon|batterij(?:en)?|gloeilamp(?:en)?|spaarlamp|led-lamp|vuilniszak(?:ken)?|afvalzak|handdoek(?:en)?|washandje?|spons|sponzen|schuurspons|dweil|stofdoek)\b/i;

// Check that an ingredient appears as a meaningful word start in a product title.
// This prevents "pasta" from matching "tandpasta" (no word boundary before "pasta").
function ingredientMatchesProduct(ingredient, productTitle) {
  try {
    const cleaned = ingredient.toLowerCase().replace(/^\d[\d\s/,.-]*/, "").trim();
    if (!cleaned || cleaned.length < 2) return true;
    const escaped = cleaned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}`, "i").test(productTitle);
  } catch {
    return true;
  }
}
const UNIT_PATTERN =
  "(?:x|g|gr|kg|mg|ml|l|cl|dl|el|tl|tbsp|tsp|cup|cups|oz|lb|stuks?|stuk(?:ken)?|krop|kroppen|bosje|bosjes|zakje|zakjes|pot(?:je|jes)?|blik(?:je|jes)?|liter|snuf(?:je|jes)?|teen|tenen|teentjes|plak(?:je|jes)?|gram|grams|milliliter|eetlepel(?:s)?|theelepel(?:s)?|handje|handjes|scheut(?:je)?|bakje|bakjes|verpakking(?:en)?|pak(?:ken)?|rollen?|rol|bunch|clove|cloves|pinch|slices?|stengel|stengels|takje|takjes|blokje|blokjes|blaadje|blaadjes|blad|bladeren|reepje|reepjes|filet|filets)";
const QUANTITY_PATTERN = "(?:\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+(?:[.,]\\d+)?)";
const TIKTOK_CAPTION_FIELD_PATTERN = /(desc|description|caption|shareDesc|seoDesc|text|content)/i;
const TIKTOK_TITLE_FIELD_PATTERN = /(title|shareTitle|seoTitle|recipeName|name)/i;

const DEFAULT_PROFILE = {
  name: "Sarah de Vries",
  handle: "@sarahkookt",
};

const DEFAULT_COOKBOOKS = [
  { id: "cookbook-1", name: "Gezond & Fit", recipeIds: ["recipe-3", "recipe-9"] },
  { id: "cookbook-2", name: "Snelle avonden", recipeIds: ["recipe-1", "recipe-2", "recipe-6"] },
  { id: "cookbook-3", name: "Comfort Food", recipeIds: ["recipe-5", "recipe-10"] },
  { id: "cookbook-4", name: "Ontbijt inspiratie", recipeIds: ["recipe-6", "recipe-8"] },
];

const DEFAULT_MEAL_PLAN = {
  maandag: "recipe-1",
  dinsdag: null,
  woensdag: "recipe-2",
  donderdag: null,
  vrijdag: null,
  zaterdag: null,
  zondag: null,
};

let databaseCache = null;
let databaseWriteQueue = Promise.resolve();
let postgresPool = null;
let postgresReadyPromise = null;

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

function createEmptyDatabase() {
  return {
    users: {},
    sessions: {},
  };
}

function isPostgresEnabled() {
  return Boolean(DATABASE_URL);
}

async function getPostgresPool() {
  if (!isPostgresEnabled()) {
    return null;
  }

  if (postgresPool) {
    return postgresPool;
  }

  let pgModule;
  try {
    pgModule = require("pg");
  } catch {
    throw new HttpError(500, "Postgres is geconfigureerd, maar dependency 'pg' ontbreekt.");
  }

  postgresPool = new pgModule.Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  });
  return postgresPool;
}

async function ensurePostgresSchema() {
  if (!isPostgresEnabled()) {
    return;
  }

  if (!postgresReadyPromise) {
    postgresReadyPromise = (async () => {
      const pool = await getPostgresPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS plately_users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          profile JSONB NOT NULL,
          app_state JSONB NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      await pool.query(`
        CREATE TABLE IF NOT EXISTS plately_auth_sessions (
          token TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES plately_users(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          expires_at TIMESTAMPTZ NOT NULL
        );
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_plately_auth_sessions_user_id
        ON plately_auth_sessions (user_id);
      `);
    })();
  }

  await postgresReadyPromise;
}

function generateId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function buildDefaultUserData(userId = generateId("user")) {
  return {
    id: userId,
    profile: { ...DEFAULT_PROFILE },
    importedRecipes: [],
    cookbooks: DEFAULT_COOKBOOKS.map((cookbook) => ({
      ...cookbook,
      recipeIds: [...cookbook.recipeIds],
    })),
    selectedCookbookId: "cookbook-1",
    mealPlan: { ...DEFAULT_MEAL_PLAN },
    groceryItems: [],
    recipeProgress: {},
    featuredRecipeId: "recipe-1",
    selectedRecipeId: "recipe-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function ensureDataFile() {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  try {
    await fsp.access(DATA_FILE);
  } catch {
    await fsp.writeFile(DATA_FILE, JSON.stringify(createEmptyDatabase(), null, 2), "utf8");
  }
}

async function loadDatabase() {
  if (databaseCache) {
    return databaseCache;
  }

  await ensureDataFile();
  const rawContents = await fsp.readFile(DATA_FILE, "utf8");

  try {
    const parsed = JSON.parse(rawContents);
    databaseCache = {
      users: parsed?.users && typeof parsed.users === "object" ? parsed.users : {},
      sessions: parsed?.sessions && typeof parsed.sessions === "object" ? parsed.sessions : {},
    };
  } catch {
    databaseCache = createEmptyDatabase();
  }

  return databaseCache;
}

async function persistDatabase() {
  const db = await loadDatabase();
  databaseWriteQueue = databaseWriteQueue.then(() =>
    fsp.writeFile(DATA_FILE, JSON.stringify(db, null, 2), "utf8")
  );
  return databaseWriteQueue;
}

function parseCookies(cookieHeader) {
  return String(cookieHeader || "")
    .split(/;\s*/)
    .filter(Boolean)
    .reduce((accumulator, entry) => {
      const separatorIndex = entry.indexOf("=");
      if (separatorIndex === -1) {
        return accumulator;
      }
      const key = entry.slice(0, separatorIndex).trim();
      const value = entry.slice(separatorIndex + 1).trim();
      accumulator[key] = decodeURIComponent(value);
      return accumulator;
    }, {});
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (options.maxAge) {
    parts.push(`Max-Age=${options.maxAge}`);
  }
  if (options.path) {
    parts.push(`Path=${options.path}`);
  }
  if (options.httpOnly) {
    parts.push("HttpOnly");
  }
  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }
  if (options.secure) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

function appendSetCookie(response, cookieValue) {
  const existing = response.getHeader("Set-Cookie");
  if (!existing) {
    response.setHeader("Set-Cookie", cookieValue);
    return;
  }

  const nextCookies = Array.isArray(existing) ? [...existing, cookieValue] : [existing, cookieValue];
  response.setHeader("Set-Cookie", nextCookies);
}

function createPasswordHash(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(password, salt, 150000, 64, "sha512").toString("hex");
  return { salt, hash };
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 8;
}

function sanitizeEmail(value) {
  return sanitizeText(value || "").toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildAppStateFromUser(user) {
  const appState = user?.app_state && typeof user.app_state === "object" ? user.app_state : {};
  return {
    id: user.id,
    email: user.email,
    authenticated: true,
    profile: appState.profile ? sanitizeProfilePayload(appState.profile) : { ...DEFAULT_PROFILE },
    importedRecipes: Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [],
    cookbooks: Array.isArray(appState.cookbooks)
      ? appState.cookbooks.map((cookbook, index) => sanitizeCookbookForStorage(cookbook, `cookbook-${index + 1}`))
      : DEFAULT_COOKBOOKS.map((cookbook) => ({ ...cookbook, recipeIds: [...cookbook.recipeIds] })),
    selectedCookbookId: sanitizeText(appState.selectedCookbookId || "cookbook-1"),
    mealPlan: {
      ...DEFAULT_MEAL_PLAN,
      ...(appState.mealPlan && typeof appState.mealPlan === "object" ? appState.mealPlan : {}),
    },
    groceryItems: Array.isArray(appState.groceryItems)
      ? appState.groceryItems.map((item, index) => sanitizeGroceryItemForStorage(item, index))
      : [],
    recipeProgress: sanitizeRecipeProgressForStorage(appState.recipeProgress),
    featuredRecipeId: sanitizeText(appState.featuredRecipeId || "recipe-1"),
    selectedRecipeId: sanitizeText(appState.selectedRecipeId || "recipe-1"),
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

async function createAuthSession(response, userId) {
  await ensurePostgresSchema();
  const pool = await getPostgresPool();
  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
  await pool.query(
    `
      INSERT INTO plately_auth_sessions (token, user_id, expires_at)
      VALUES ($1, $2, $3)
    `,
    [token, userId, expiresAt]
  );
  appendSetCookie(
    response,
    serializeCookie("plately_auth", token, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
    })
  );
}

async function clearAuthSession(request, response) {
  if (!isPostgresEnabled()) {
    appendSetCookie(
      response,
      serializeCookie("plately_auth", "", {
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1,
      })
    );
    return;
  }

  const cookies = parseCookies(request.headers.cookie);
  const authToken = cookies.plately_auth || "";
  if (authToken) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    await pool.query(`DELETE FROM plately_auth_sessions WHERE token = $1`, [authToken]).catch(() => {});
  }

  appendSetCookie(
    response,
    serializeCookie("plately_auth", "", {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1,
    })
  );
}

async function getAuthenticatedUser(request) {
  if (!isPostgresEnabled()) {
    return null;
  }

  const cookies = parseCookies(request.headers.cookie);
  const authToken = cookies.plately_auth || "";
  if (!authToken) {
    return null;
  }

  await ensurePostgresSchema();
  const pool = await getPostgresPool();
  const result = await pool.query(
    `
      SELECT u.*
      FROM plately_auth_sessions s
      JOIN plately_users u ON u.id = s.user_id
      WHERE s.token = $1
        AND s.expires_at > NOW()
      LIMIT 1
    `,
    [authToken]
  );

  return result.rows[0] || null;
}

async function createPostgresUser(email, password, currentState) {
  await ensurePostgresSchema();
  const pool = await getPostgresPool();
  const userId = generateId("user");
  const { salt, hash } = createPasswordHash(password);
  const appState = sanitizeUserStatePayload(currentState, buildDefaultUserData(userId));

  const result = await pool.query(
    `
      INSERT INTO plately_users (id, email, password_hash, password_salt, profile, app_state)
      VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb)
      RETURNING *
    `,
    [userId, email, hash, salt, JSON.stringify(appState.profile), JSON.stringify(appState)]
  );

  return result.rows[0];
}

async function updateAuthenticatedUserState(userId, body) {
  await ensurePostgresSchema();
  const pool = await getPostgresPool();
  const existing = await pool.query(`SELECT * FROM plately_users WHERE id = $1 LIMIT 1`, [userId]);
  const currentUser = existing.rows[0];
  if (!currentUser) {
    throw new HttpError(404, "Gebruiker niet gevonden.");
  }

  const appState = sanitizeUserStatePayload(body, buildAppStateFromUser(currentUser));
  const nextProfile = appState.profile;

  const updated = await pool.query(
    `
      UPDATE plately_users
      SET profile = $2::jsonb,
          app_state = $3::jsonb,
          updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [userId, JSON.stringify(nextProfile), JSON.stringify(appState)]
  );

  return updated.rows[0];
}

async function ensureUserSession(request, response) {
  const db = await loadDatabase();
  const cookies = parseCookies(request.headers.cookie);
  let sessionToken = cookies.plately_session || "";
  let userId = sessionToken ? db.sessions[sessionToken] : "";
  let shouldWrite = false;

  if (!userId || !db.users[userId]) {
    userId = generateId("user");
    db.users[userId] = buildDefaultUserData(userId);
    shouldWrite = true;
  }

  if (!sessionToken || db.sessions[sessionToken] !== userId) {
    sessionToken = crypto.randomBytes(24).toString("hex");
    db.sessions[sessionToken] = userId;
    appendSetCookie(
      response,
      serializeCookie("plately_session", sessionToken, {
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365,
      })
    );
    shouldWrite = true;
  }

  if (shouldWrite) {
    await persistDatabase();
  }

  return db.users[userId];
}

function sanitizeProfilePayload(profile) {
  const name = sanitizeText(profile?.name || DEFAULT_PROFILE.name).slice(0, 80) || DEFAULT_PROFILE.name;
  let handle = sanitizeText(profile?.handle || DEFAULT_PROFILE.handle).replace(/\s+/g, "");
  handle = handle.replace(/[^@\p{L}\p{N}._-]/gu, "");
  if (!handle) {
    handle = DEFAULT_PROFILE.handle;
  }
  if (!handle.startsWith("@")) {
    handle = `@${handle}`;
  }
  return {
    name,
    handle: handle.slice(0, 40),
  };
}

function sanitizeStringArray(value) {
  return Array.isArray(value) ? value.map((item) => sanitizeText(item)).filter(Boolean) : [];
}

function sanitizeRecipeForStorage(recipe) {
  if (!recipe || typeof recipe !== "object") {
    return null;
  }

  const id = sanitizeText(recipe.id || generateId("recipe"));
  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
        .map((ingredient) => ({
          quantity: sanitizeText(ingredient?.quantity || ""),
          unit: sanitizeText(ingredient?.unit || ""),
          name: sanitizeText(ingredient?.name || ""),
        }))
        .filter((ingredient) => ingredient.name)
    : [];

  const instructions = sanitizeStringArray(recipe.instructions);

  return {
    id,
    title: sanitizeText(recipe.title || "Geïmporteerd recept"),
    description: sanitizeText(recipe.description || ""),
    time: sanitizeText(recipe.time || "30 min"),
    kcal: sanitizeText(recipe.kcal || ""),
    servings: sanitizeText(recipe.servings || "2 Pers."),
    mealTag: sanitizeText(recipe.mealTag || "Avond"),
    sourceUrl: sanitizeText(recipe.sourceUrl || ""),
    image: sanitizeText(recipe.image || "assets/hero-burger.svg"),
    alt: sanitizeText(recipe.alt || recipe.title || "Receptafbeelding"),
    platform: sanitizeText(recipe.platform || "website"),
    caption: sanitizeText(recipe.caption || ""),
    author: sanitizeText(recipe.author || ""),
    ingredients,
    instructions,
    isSeed: false,
  };
}

function sanitizeCookbookForStorage(cookbook, fallbackId) {
  return {
    id: sanitizeText(cookbook?.id || fallbackId || generateId("cookbook")),
    name: sanitizeText(cookbook?.name || "Nieuw kookboek").slice(0, 80),
    recipeIds: sanitizeStringArray(cookbook?.recipeIds),
  };
}

function sanitizeGroceryItemForStorage(item, index) {
  return {
    id: sanitizeText(item?.id || `grocery-${index}-${Date.now()}`),
    title: sanitizeText(item?.title || "Ingrediënt"),
    amount: sanitizeText(item?.amount || "1 verpakking"),
    recipeId: sanitizeText(item?.recipeId || ""),
    recipeTitle: sanitizeText(item?.recipeTitle || ""),
    recipeSourceUrl: sanitizeText(item?.recipeSourceUrl || ""),
    recipePlatform: sanitizeText(item?.recipePlatform || "website"),
    group: sanitizeText(item?.group || "pantry"),
    checked: Boolean(item?.checked),
  };
}

function sanitizeRecipeProgressForStorage(value) {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.entries(value).reduce((accumulator, [recipeId, progress]) => {
    const cleanId = sanitizeText(recipeId);
    if (!cleanId || !progress || typeof progress !== "object") {
      return accumulator;
    }

    accumulator[cleanId] = {
      checkedIngredients: Array.isArray(progress.checkedIngredients)
        ? progress.checkedIngredients.map((item) => sanitizeText(item)).filter(Boolean)
        : [],
      currentStep: Number.isFinite(progress.currentStep) ? Math.max(0, Math.floor(progress.currentStep)) : 0,
      cookMode: Boolean(progress.cookMode),
    };
    return accumulator;
  }, {});
}

function sanitizeUserStatePayload(body, currentUser) {
  const importedRecipes = Array.isArray(body?.importedRecipes)
    ? body.importedRecipes.map((recipe) => sanitizeRecipeForStorage(recipe)).filter(Boolean)
    : currentUser.importedRecipes;

  const cookbooks = Array.isArray(body?.cookbooks)
    ? body.cookbooks
        .map((cookbook, index) => sanitizeCookbookForStorage(cookbook, `cookbook-${index + 1}`))
        .filter((cookbook) => cookbook.name)
    : currentUser.cookbooks;

  const mealPlan = {
    ...DEFAULT_MEAL_PLAN,
    ...(body?.mealPlan && typeof body.mealPlan === "object" ? body.mealPlan : currentUser.mealPlan),
  };

  const groceryItems = Array.isArray(body?.groceryItems)
    ? body.groceryItems.map((item, index) => sanitizeGroceryItemForStorage(item, index))
    : currentUser.groceryItems;

  const recipeProgress = body?.recipeProgress
    ? sanitizeRecipeProgressForStorage(body.recipeProgress)
    : currentUser.recipeProgress;

  return {
    ...currentUser,
    profile: body?.profile ? sanitizeProfilePayload(body.profile) : currentUser.profile,
    importedRecipes,
    cookbooks,
    selectedCookbookId: sanitizeText(body?.selectedCookbookId || currentUser.selectedCookbookId || "cookbook-1"),
    mealPlan,
    groceryItems,
    recipeProgress,
    featuredRecipeId: sanitizeText(body?.featuredRecipeId || currentUser.featuredRecipeId || "recipe-1"),
    selectedRecipeId: sanitizeText(body?.selectedRecipeId || currentUser.selectedRecipeId || "recipe-1"),
    updatedAt: new Date().toISOString(),
  };
}

function loadEnvFile() {
  const envPath = path.join(ROOT_DIR, ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContents = fs.readFileSync(envPath, "utf8");
  for (const rawLine of envContents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    ...HTTP_HEADERS,
    "Content-Type": MIME_TYPES[".json"],
  });
  response.end(JSON.stringify(payload));
}

function sanitizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => {
      const parsed = Number(code);
      return Number.isFinite(parsed) ? String.fromCodePoint(parsed) : _;
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => {
      const parsed = Number.parseInt(code, 16);
      return Number.isFinite(parsed) ? String.fromCodePoint(parsed) : _;
    })
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'");
}

function stripTags(value) {
  return decodeHtml(String(value || "").replace(/<[^>]+>/g, " "));
}

function escapeRegex(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detectPlatform(inputUrl) {
  const hostname = inputUrl.hostname.replace(/^www\./, "");
  if (hostname.endsWith("tiktok.com")) {
    return "tiktok";
  }
  if (hostname.endsWith("instagram.com")) {
    return "instagram";
  }
  return "website";
}

function normalizeStoreSlug(value) {
  const clean = String(value || "")
    .trim()
    .toLowerCase();

  if (clean === "ah" || clean === "albert-heijn" || clean === "albertheijn") {
    return "albert-heijn";
  }
  if (clean === "jumbo") {
    return "jumbo";
  }
  throw new HttpError(400, "Onbekende supermarkt.");
}

function getStoreLabel(store) {
  return store === "albert-heijn" ? "Albert Heijn" : "Jumbo";
}

function getStoreBrandPrefix(store) {
  return store === "albert-heijn" ? "AH" : "Jumbo";
}

function getStoreBioPrefix(store) {
  return store === "albert-heijn" ? "AH Biologisch" : "Jumbo Biologisch";
}

function toTitleCase(value) {
  return sanitizeText(value)
    .toLowerCase()
    .replace(/\b[\p{L}]/gu, (match) => match.toUpperCase());
}

function getBasketEmoji(name) {
  const value = String(name || "").toLowerCase();
  if (/avocado/.test(value)) return "🥑";
  if (/(sla|spinazie|kool|broccoli|asperge)/.test(value)) return "🥬";
  if (/tomaat/.test(value)) return "🍅";
  if (/(ui|sjalot)/.test(value)) return "🧅";
  if (/knoflook/.test(value)) return "🧄";
  if (/banaan/.test(value)) return "🍌";
  if (/citroen|limoen|lime/.test(value)) return "🍋";
  if (/paprika/.test(value)) return "🫑";
  if (/komkommer|courgette/.test(value)) return "🥒";
  if (/wortel/.test(value)) return "🥕";
  if (/aardappel|friet/.test(value)) return "🥔";
  if (/burger|gehakt|vlees/.test(value)) return "🥩";
  if (/kip/.test(value)) return "🍗";
  if (/zalm|vis|tonijn/.test(value)) return "🐟";
  if (/ei/.test(value)) return "🥚";
  if (/yoghurt|melk|room/.test(value)) return "🥛";
  if (/feta|kaas|parmezaan|pecorino|mascarpone/.test(value)) return "🧀";
  if (/honing/.test(value)) return "🍯";
  if (/mayonaise|mayo|saus|pesto/.test(value)) return "🫙";
  if (/rijst/.test(value)) return "🍚";
  if (/pasta|spaghetti|penne|linguine|lasagne/.test(value)) return "🍝";
  if (/brood|toast|wrap|tortilla/.test(value)) return "🍞";
  if (/bonen|mais/.test(value)) return "🥫";
  return "🛒";
}

function createStoreChoice(store, choice) {
  const normalizedChoice = {
    ...choice,
    url: choice.url || buildStoreChoiceUrl(store, choice),
  };
  return {
    id: `${store}-${normalizedChoice.searchTerm.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-")}`,
    title: normalizedChoice.title,
    subtitle: normalizedChoice.subtitle,
    price: normalizedChoice.price,
    badge: normalizedChoice.badge || "",
    emoji: normalizedChoice.emoji || "🛒",
    searchTerm: normalizedChoice.searchTerm,
    url: normalizedChoice.url,
    productId: normalizedChoice.productId || "",
  };
}

function slugify(value) {
  return sanitizeText(String(value || ""))
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function buildStoreChoiceUrl(store, choice) {
  if (choice.url) {
    return choice.url;
  }
  if (store === "albert-heijn") {
    return `https://www.ah.nl/zoeken?query=${encodeURIComponent(choice.searchTerm)}`;
  }
  if (choice.productId) {
    return `https://www.jumbo.com/producten/${slugify(choice.title)}-${choice.productId}`;
  }
  return `https://www.jumbo.com/zoeken/?searchTerms=${encodeURIComponent(choice.searchTerm)}`;
}

function buildGenericChoices(store, ingredientTitle, amount) {
  const prefix = getStoreBrandPrefix(store);
  const bioPrefix = getStoreBioPrefix(store);
  const clean = toTitleCase(ingredientTitle);
  const emoji = getBasketEmoji(clean);

  return [
    createStoreChoice(store, {
      title: `${prefix} ${clean}`,
      subtitle: amount || "1 verpakking",
      price: store === "albert-heijn" ? "€2,69" : "€2,49",
      badge: "Beste match",
      emoji,
      searchTerm: `${prefix} ${clean}`,
      url: buildStoreChoiceUrl(store, { title: `${prefix} ${clean}`, searchTerm: `${prefix} ${clean}` }),
    }),
    createStoreChoice(store, {
      title: `${bioPrefix} ${clean}`,
      subtitle: amount || "1 verpakking",
      price: store === "albert-heijn" ? "€2,99" : "€2,79",
      badge: "Biologisch",
      emoji,
      searchTerm: `${bioPrefix} ${clean}`,
      url: buildStoreChoiceUrl(store, { title: `${bioPrefix} ${clean}`, searchTerm: `${bioPrefix} ${clean}` }),
    }),
  ];
}

function buildStoreProductChoices(store, item) {
  const ingredientTitle = sanitizeText(item.title || "Ingrediënt");
  const amount = sanitizeText(item.amount || "1 verpakking");
  const value = ingredientTitle.toLowerCase();
  const prefix = getStoreBrandPrefix(store);
  const bioPrefix = getStoreBioPrefix(store);

  const choiceSet = (primary, alternative) => [
    createStoreChoice(store, { ...primary, badge: primary.badge || "Beste match" }),
    createStoreChoice(store, { ...alternative, badge: alternative.badge || "Alternatief" }),
  ];

  if (/avocado/.test(value)) {
    return choiceSet(
      { title: `${prefix} Avocado eetrijp 2 stuks`, subtitle: "2 stuks", price: "€2,49", emoji: "🥑", searchTerm: `${prefix} avocado eetrijp` },
      { title: `${bioPrefix} Avocado`, subtitle: "2 stuks", price: "€2,99", emoji: "🥑", searchTerm: `${bioPrefix} avocado` }
    );
  }
  if (/spaghetti|pasta|penne|linguine|lasagne/.test(value)) {
    return choiceSet(
      { title: `${prefix} Italiaanse pasta`, subtitle: amount, price: "€1,39", emoji: "🍝", searchTerm: `${prefix} pasta` },
      { title: `${bioPrefix} Pasta`, subtitle: amount, price: "€1,89", emoji: "🍝", searchTerm: `${bioPrefix} pasta` }
    );
  }
  if (/wrap|tortilla/.test(value)) {
    return choiceSet(
      { title: `${prefix} Tortilla wraps`, subtitle: "8 stuks", price: "€2,29", emoji: "🌯", searchTerm: `${prefix} tortilla wraps` },
      { title: `${bioPrefix} Volkoren wraps`, subtitle: "6 stuks", price: "€2,79", emoji: "🌯", searchTerm: `${bioPrefix} wraps` }
    );
  }
  if (/kip/.test(value)) {
    return choiceSet(
      { title: `${prefix} Kipfilet`, subtitle: amount, price: "€5,49", emoji: "🍗", searchTerm: `${prefix} kipfilet` },
      { title: `${bioPrefix} Kipfilet`, subtitle: amount, price: "€6,49", emoji: "🍗", searchTerm: `${bioPrefix} kipfilet` }
    );
  }
  if (/burger|vegetarisch/.test(value)) {
    return choiceSet(
      { title: `${prefix} Vegetarische burger`, subtitle: amount, price: "€3,49", emoji: "🥩", searchTerm: `${prefix} vegetarische burger` },
      { title: `${prefix} Vega burger deluxe`, subtitle: "2 stuks", price: "€3,99", emoji: "🥩", searchTerm: `${prefix} vega burger` }
    );
  }
  if (/gehakt/.test(value)) {
    return choiceSet(
      { title: `${prefix} Rundergehakt`, subtitle: amount, price: "€4,99", emoji: "🥩", searchTerm: `${prefix} rundergehakt` },
      { title: `${prefix} Half-om-half gehakt`, subtitle: amount, price: "€4,49", emoji: "🥩", searchTerm: `${prefix} half om half gehakt` }
    );
  }
  if (/tomaat/.test(value)) {
    return choiceSet(
      { title: `${prefix} Trostomaten`, subtitle: amount, price: "€2,19", emoji: "🍅", searchTerm: `${prefix} trostomaten` },
      { title: `${bioPrefix} Trostomaten`, subtitle: amount, price: "€2,79", emoji: "🍅", searchTerm: `${bioPrefix} tomaten` }
    );
  }
  if (/(ui|sjalot)/.test(value)) {
    return choiceSet(
      { title: `${prefix} Gele uien`, subtitle: amount, price: "€1,19", emoji: "🧅", searchTerm: `${prefix} uien` },
      { title: `${prefix} Rode uien`, subtitle: amount, price: "€1,49", emoji: "🧅", searchTerm: `${prefix} rode uien` }
    );
  }
  if (/knoflook/.test(value)) {
    return choiceSet(
      { title: `${prefix} Knoflook`, subtitle: "1 net", price: "€1,29", emoji: "🧄", searchTerm: `${prefix} knoflook` },
      { title: `${bioPrefix} Knoflook`, subtitle: "1 net", price: "€1,59", emoji: "🧄", searchTerm: `${bioPrefix} knoflook` }
    );
  }
  if (/paprika/.test(value)) {
    return choiceSet(
      { title: `${prefix} Rode paprika`, subtitle: amount, price: "€1,19", emoji: "🫑", searchTerm: `${prefix} rode paprika` },
      { title: `${prefix} Paprikamix`, subtitle: "3 stuks", price: "€2,59", emoji: "🫑", searchTerm: `${prefix} paprika mix` }
    );
  }
  if (/sla|ijsbergsla|rucola|spinazie/.test(value)) {
    return choiceSet(
      { title: `${prefix} ${/rucola/.test(value) ? "Rucola" : "IJsbergsla"}`, subtitle: amount, price: "€1,49", emoji: "🥬", searchTerm: `${prefix} ${/rucola/.test(value) ? "rucola" : "ijsbergsla"}` },
      { title: `${bioPrefix} Sla mix`, subtitle: "1 zak", price: "€2,29", emoji: "🥬", searchTerm: `${bioPrefix} sla` }
    );
  }
  if (/aardappel|friet/.test(value)) {
    return choiceSet(
      { title: `${prefix} Aardappelen`, subtitle: amount, price: "€2,99", emoji: "🥔", searchTerm: `${prefix} aardappelen` },
      { title: `${prefix} Zoete aardappelfriet`, subtitle: "600 g", price: "€3,49", emoji: "🥔", searchTerm: `${prefix} zoete aardappelfriet` }
    );
  }
  if (/rijst/.test(value)) {
    return choiceSet(
      { title: `${prefix} Witte rijst`, subtitle: amount, price: "€1,99", emoji: "🍚", searchTerm: `${prefix} witte rijst` },
      { title: `${prefix} Basmatirijst`, subtitle: amount, price: "€2,69", emoji: "🍚", searchTerm: `${prefix} basmati rijst` }
    );
  }
  if (/ei/.test(value)) {
    return choiceSet(
      { title: `${prefix} Scharreleieren`, subtitle: "6 stuks", price: "€2,69", emoji: "🥚", searchTerm: `${prefix} scharreleieren` },
      { title: `${bioPrefix} Eieren`, subtitle: "6 stuks", price: "€3,19", emoji: "🥚", searchTerm: `${bioPrefix} eieren` }
    );
  }
  if (/melk|yoghurt|room/.test(value)) {
    return choiceSet(
      { title: `${prefix} ${/room/.test(value) ? "Kookroom" : "Halfvolle melk"}`, subtitle: amount, price: "€1,39", emoji: "🥛", searchTerm: `${prefix} ${/room/.test(value) ? "kookroom" : "melk"}` },
      { title: `${bioPrefix} ${/room/.test(value) ? "Room" : "Melk"}`, subtitle: amount, price: "€1,89", emoji: "🥛", searchTerm: `${bioPrefix} ${/room/.test(value) ? "room" : "melk"}` }
    );
  }
  if (/parmezaan|pecorino|kaas|feta|mascarpone/.test(value)) {
    return choiceSet(
      { title: `${prefix} ${/mascarpone/.test(value) ? "Mascarpone" : "Geraspte kaas"}`, subtitle: amount, price: "€2,79", emoji: "🧀", searchTerm: `${prefix} ${/mascarpone/.test(value) ? "mascarpone" : "geraspte kaas"}` },
      { title: `${bioPrefix} ${/feta/.test(value) ? "Feta" : "Kaas"}`, subtitle: amount, price: "€3,29", emoji: "🧀", searchTerm: `${bioPrefix} kaas` }
    );
  }
  if (/pesto|saus|mayonaise|mayo|tomatenblokjes|tomatenpuree/.test(value)) {
    return choiceSet(
      { title: `${prefix} ${/pesto/.test(value) ? "Groene pesto" : /mayonaise|mayo/.test(value) ? "Mayonaise" : "Pastasaus"}`, subtitle: amount, price: "€1,99", emoji: "🫙", searchTerm: `${prefix} ${/pesto/.test(value) ? "pesto" : /mayonaise|mayo/.test(value) ? "mayonaise" : "pastasaus"}` },
      { title: `${bioPrefix} ${/pesto/.test(value) ? "Pesto" : "Saus"}`, subtitle: amount, price: "€2,49", emoji: "🫙", searchTerm: `${bioPrefix} ${/pesto/.test(value) ? "pesto" : "saus"}` }
    );
  }
  if (/bonen|mais/.test(value)) {
    return choiceSet(
      { title: `${prefix} ${/mais/.test(value) ? "Maïs" : "Kidneybonen"}`, subtitle: amount, price: "€1,19", emoji: "🥫", searchTerm: `${prefix} ${/mais/.test(value) ? "mais" : "kidneybonen"}` },
      { title: `${bioPrefix} ${/mais/.test(value) ? "Maïs" : "Bonen"}`, subtitle: amount, price: "€1,69", emoji: "🥫", searchTerm: `${bioPrefix} ${/mais/.test(value) ? "mais" : "bonen"}` }
    );
  }
  if (/bloem|suiker|cacao|lange vingers|koffie/.test(value)) {
    return choiceSet(
      { title: `${prefix} ${toTitleCase(ingredientTitle)}`, subtitle: amount, price: "€1,89", emoji: getBasketEmoji(value), searchTerm: `${prefix} ${ingredientTitle}` },
      { title: `${bioPrefix} ${toTitleCase(ingredientTitle)}`, subtitle: amount, price: "€2,39", emoji: getBasketEmoji(value), searchTerm: `${bioPrefix} ${ingredientTitle}` }
    );
  }

  return buildGenericChoices(store, ingredientTitle, amount);
}

function buildMatchedChoiceFromProduct(store, item, product, badge = "Gevonden") {
  if (!product) {
    return null;
  }

  const ingredientTitle = sanitizeText(item.title || "Ingrediënt");
  const productId = store === "albert-heijn" ? product.id || "" : product.sku || "";
  const choice = {
    title: sanitizeText(product.name || ingredientTitle),
    subtitle: sanitizeText(item.amount || "1 verpakking"),
    price: sanitizeText(product.price || ""),
    badge,
    emoji: getBasketEmoji(ingredientTitle),
    searchTerm: ingredientTitle,
    productId,
  };

  choice.url = buildStoreChoiceUrl(store, choice);
  return createStoreChoice(store, choice);
}

function getMatchConfidenceLabel(ingredientTitle) {
  const value = String(ingredientTitle || "").toLowerCase();
  if (
    /(avocado|spaghetti|pasta|kip|burger|gehakt|tomaat|ui|knoflook|paprika|sla|rijst|ei|kaas|pesto|mayonaise|bonen|mais)/.test(
      value
    )
  ) {
    return "Sterke match";
  }
  return "Slimme match";
}

function parseMetaTag(html, key, attribute = "property") {
  const patternA = new RegExp(
    `<meta[^>]+${attribute}=["']${escapeRegex(key)}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  const patternB = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+${attribute}=["']${escapeRegex(key)}["'][^>]*>`,
    "i"
  );
  const match = html.match(patternA) || html.match(patternB);
  return match ? decodeHtml(match[1]) : "";
}

function parseTitleTag(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? sanitizeText(stripTags(match[1])) : "";
}

function decodeEscapedSlashes(value) {
  return String(value || "").replace(/\\\//g, "/").replace(/&amp;/g, "&");
}

function splitTextUnits(text) {
  return String(text || "")
    .split(/[\n\r]+|[.!?]\s+/)
    .map((item) => sanitizeText(item))
    .filter(Boolean);
}

function normalizeFractions(value) {
  return String(value || "").replace(/(\d+)?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])/g, (_, whole, fraction) => {
    const normalizedFraction = FRACTION_MAP[fraction] || fraction;
    return whole ? `${whole} ${normalizedFraction}` : normalizedFraction;
  });
}

function stripSocialNoise(text) {
  return normalizeFractions(String(text || ""))
    .replace(/https?:\/\/\S+/gi, " ")
    .replace(/#[\p{L}\p{N}_-]+/gu, " ")
    .replace(/@[\p{L}\p{N}._-]+/gu, " ")
    .replace(/(?:^|\s)(fyp|fy|viral|reels?|recipeoftheday|foodtok|foodie|easyrecipe)(?:\s|$)/gi, " ")
    .replace(/\b(link in bio|follow for more|save this|part \d+|original sound|audio by)\b/gi, " ")
    .replace(/[•●▪◦]/g, "\n- ")
    .replace(/\s-\s(?=[A-Za-zÀ-ÿ0-9])/g, "\n- ")
    .replace(/\b(ingredients?|ingrediënten|ingredienten|what you need|dit heb je nodig)\s*[:\-]/gi, "\n$1:\n")
    .replace(/\b(instructions?|method|steps?|bereiding|bereidingswijze|werkwijze)\s*[:\-]/gi, "\n$1:\n")
    .replace(/(\d+)\s*[\)\.:-]\s+(?=[\p{L}])/gu, "\n$1. ")
    .replace(/(\d+\.)\s*(?=[\p{L}])/gu, "\n$1 ")
    .replace(/\p{Extended_Pictographic}/gu, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function looksLikeRecipeTitle(value) {
  const text = sanitizeText(value);
  if (!text || text.length < 4 || text.length > 64) {
    return false;
  }
  if (/original sound|audio|follow|link in bio|on tiktok|on instagram|@\w+/i.test(text)) {
    return false;
  }
  if (/#/.test(text) || INGREDIENT_HEADING_PATTERN.test(text) || INSTRUCTION_HEADING_PATTERN.test(text)) {
    return false;
  }
  if (/[.!?]$/.test(text) && text.split(" ").length > 8) {
    return false;
  }
  return /[a-zA-ZÀ-ÿ]{3,}/.test(text);
}

function normalizeRecipeTitle(value) {
  const clean = sanitizeText(
    stripSocialNoise(
      String(value || "")
        .replace(/\s+on\s+tiktok$/i, "")
        .replace(/\s+on\s+instagram$/i, "")
        .replace(/^how to make\s+/i, "")
        .replace(/^recipe[:\s-]+/i, "")
        .replace(/^making\s+/i, "")
        .replace(/^this\s+is\s+/i, "")
        .replace(/\|\s*[^|]+$/g, "")
        .replace(/[-–]\s*[^-–]+(?:tiktok|instagram)$/i, "")
        .split(/[:|]/)[0]
    )
  );

  const words = clean.split(/\s+/).filter(Boolean);
  if (clean.length <= 42 || words.length <= 7) {
    return clean;
  }

  return words.slice(0, 7).join(" ");
}

function extractRecipeTitleFromCaption(caption) {
  const lines = splitCaptionLines(caption)
    .map((line) => normalizeRecipeTitle(line))
    .filter(Boolean);

  for (const line of lines) {
    if (looksLikeRecipeTitle(line) && RECIPE_TITLE_HINT_PATTERN.test(line)) {
      return line;
    }
  }

  for (const line of lines) {
    if (looksLikeRecipeTitle(line) && line.split(" ").length <= 8) {
      return line;
    }
  }

  return "";
}

function extractDishPhrase(text) {
  const source = sanitizeText(String(text || ""));
  if (!source) {
    return "";
  }

  const match = source.match(
    /\b((?:[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'&-]*\s+){0,4}(?:burger|pasta|salad|salade|toast|soup|soep|curry|wrap|smoothie|guacamole|omelet|omelette|lasagne|risotto|pizza|sandwich|quesadilla|salsa|taco|ramen|noodles?|bagel|shakshuka|frittata|dip|creme|cr[eè]me|bowl))\b/i
  );

  return match ? normalizeRecipeTitle(match[1]) : "";
}

function extractRecipeHashtagTitle(caption) {
  const hashtags = [...String(caption || "").matchAll(/#([\p{L}\p{N}_-]+)/gu)].map((match) => match[1]);
  const cleaned = hashtags
    .map((tag) =>
      tag
        .replace(/recipe(s)?$/i, "")
        .replace(/tok$/i, "")
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
    )
    .map((tag) => sanitizeText(tag))
    .filter(Boolean);

  for (const tag of cleaned) {
    if (looksLikeRecipeTitle(tag) && RECIPE_TITLE_HINT_PATTERN.test(tag)) {
      return normalizeRecipeTitle(tag);
    }
  }

  return "";
}

function scoreRecipeText(text) {
  const value = String(text || "");
  let score = 0;

  if (/\b(ingredients?|ingrediënten|recipe|instructions?|steps?|method)\b/i.test(value)) {
    score += 55;
  }

  const quantityMatches = value.match(new RegExp(`${QUANTITY_PATTERN}(?:\\s+${UNIT_PATTERN}(?=\\s|$))?`, "gi")) || [];
  score += Math.min(quantityMatches.length, 10) * 10;

  const instructionMatches = value.match(
    /\b(mix|add|bake|cook|toast|serve|blend|heat|slice|bak|voeg|snij|snijd|serveer|kook|maak|meng|verhit|roer|leg|giet|laat|verwarm|breng|haal|verwijder|prak|oven)\b/gi
  ) || [];
  score += Math.min(instructionMatches.length, 10) * 8;

  if (/\n/.test(value)) {
    score += 20;
  }

  if (value.length >= 120 && value.length <= 1800) {
    score += 20;
  }

  if (/original sound|link in bio|follow for more/i.test(value)) {
    score -= 60;
  }

  const hashtags = value.match(/#[\p{L}\p{N}_-]+/gu) || [];
  score -= Math.min(hashtags.length, 8) * 3;

  return score;
}

function isUsefulCaptionCandidate(text) {
  const value = sanitizeText(text);
  if (!value || value.length < 24 || value.length > 2400) {
    return false;
  }
  if (/^log in|sign up|for you|explore more|watch more|tiktok/i.test(value)) {
    return false;
  }
  return scoreRecipeText(value) >= 18;
}

function isUsefulTitleCandidate(text) {
  const value = normalizeRecipeTitle(text);
  return Boolean(value) && scoreTitleCandidate(value) > 0;
}

function scoreTitleCandidate(text) {
  const value = normalizeRecipeTitle(text);
  if (!looksLikeRecipeTitle(value)) {
    return -999;
  }

  let score = 0;
  const words = value.split(/\s+/).filter(Boolean);

  if (RECIPE_TITLE_HINT_PATTERN.test(value)) {
    score += 70;
  }
  if (words.length >= 2 && words.length <= 6) {
    score += 25;
  } else if (words.length <= 8) {
    score += 10;
  }
  if (/^full recipe|^recipe|^easy recipe|^how to make|^need a quick bite|^this is\b/i.test(value)) {
    score -= 50;
  }
  if (/tiktok|instagram|viral|fyp|fy\b|creator/i.test(value)) {
    score -= 40;
  }

  return score;
}

function pickBestCaptionCandidate(candidates) {
  const uniqueCandidates = [
    ...new Set(candidates.map((item) => sanitizeText(item)).filter((item) => isUsefulCaptionCandidate(item))),
  ];
  uniqueCandidates.sort((left, right) => scoreRecipeText(right) - scoreRecipeText(left));
  return uniqueCandidates[0] || "";
}

function pickBestTitleCandidate(candidates) {
  const uniqueCandidates = [
    ...new Set(candidates.map((item) => normalizeRecipeTitle(item)).filter((item) => isUsefulTitleCandidate(item))),
  ];
  uniqueCandidates.sort((left, right) => scoreTitleCandidate(right) - scoreTitleCandidate(left));
  return uniqueCandidates[0] || "";
}

function splitCaptionLines(text) {
  return stripSocialNoise(text)
    .replace(/\r/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .split(/\n+/)
    .flatMap((line) =>
      line
        .split(/\s*[;|]\s*/)
        .map((item) => sanitizeText(item))
        .filter(Boolean)
    )
    .filter(Boolean);
}

function splitInlineIngredientBody(text) {
  const clean = sanitizeText(text);
  if (!clean) {
    return [];
  }

  let expanded = clean
    .replace(
      new RegExp(
        `\\s+(?=${QUANTITY_PATTERN}\\s*(?:(?:flinke|kleine|grote|halve|half|volle|verse)\\s+)?(?:${UNIT_PATTERN})?\\s+[\\p{L}(])`,
        "giu"
      ),
      "\n"
    )
    .replace(/\s+(?=een\s+(?:kleine|grote|halve|flinke|verse)\s+\p{L})/giu, "\n")
    .replace(/\s+(?=scheut(?:je)?\s+\p{L})/giu, "\n")
    .replace(/\s+(?=handje\s+\p{L})/giu, "\n")
    .replace(/\s+(?=snuf(?:je)?\s+\p{L})/giu, "\n");

  return expanded
    .split(/\n+/)
    .map((item) => cleanListLine(item))
    .filter(Boolean);
}

function normalizeInlineRecipeSections(text) {
  let clean = stripSocialNoise(text)
    .replace(/\b(Voor\s+\d+\s+personen?)\s*:/gi, "\n$1:\n")
    .replace(/\b(Ingredi[eë]nten|Ingredienten|Ingredients?|Dit heb je nodig)\s*:/gi, "\n$1:\n")
    .replace(/\b(Bereiding|Bereidingswijze|Instructions?|Method|Werkwijze|Steps?)\s*:/gi, "\n$1:\n");

  const ingredientSectionMatch = clean.match(
    /((?:Voor\s+\d+\s+personen?:|Ingredi[eë]nten:|Ingredienten:|Ingredients?:|Dit heb je nodig:))([\s\S]*?)(?=\n(?:Bereiding|Bereidingswijze|Instructions?|Method|Werkwijze|Steps?)\b|$)/i
  );

  if (ingredientSectionMatch) {
    const [fullMatch, heading, body] = ingredientSectionMatch;
    const splitBody = splitInlineIngredientBody(body);
    if (splitBody.length >= 2) {
      clean = clean.replace(fullMatch, `${heading}\n${splitBody.join("\n")}\n`);
    }
  }

  return clean;
}

function cleanListLine(line) {
  return sanitizeText(
    String(line || "")
      .replace(/^[\-\u2022\u2023\u25E6\u2043\u2219•●▪◦]+\s*/, "")
      .replace(/^(step|stap)\s*\d+\s*[:.)-]?\s*/i, "")
      .replace(/^\d+\s*[.)-]\s*/, "")
      .replace(/^[-–]\s*/, "")
  );
}

function isLikelyIngredientLine(line) {
  const clean = cleanListLine(line);
  if (!clean || clean.length > 90 || INSTRUCTION_HEADING_PATTERN.test(clean)) {
    return false;
  }
  if (/^voor\s+\d+\s+personen?\s*:?\s*$/i.test(clean)) {
    return true;
  }
  if (INGREDIENT_HEADING_PATTERN.test(clean)) {
    return true;
  }
  if (
    new RegExp(
      `^${QUANTITY_PATTERN}(?:\\s*(?:flinke|kleine|grote|halve|half|volle|verse)\\s+)?(?:\\s*${UNIT_PATTERN}(?=\\s|$))?\\s+`,
      "i"
    ).test(clean)
  ) {
    return true;
  }
  if (/^\d+\s*x\b/i.test(clean)) {
    return true;
  }
  if (/^(een\s+(?:kleine|grote|halve|flinke|verse)\s+|scheut(?:je)?\s+|handje\s+|snuf(?:je)?\s+)/i.test(clean)) {
    return true;
  }
  return clean.split(" ").length <= 8 && INGREDIENT_WORD_PATTERN.test(clean);
}

function isLikelyInstructionLine(line) {
  const clean = cleanListLine(line);
  if (!clean || clean.length < 12) {
    return false;
  }
  if (INSTRUCTION_HEADING_PATTERN.test(clean)) {
    return true;
  }
  if (/^\d+\s*[.)-]\s*/.test(String(line || ""))) {
    return true;
  }
  if (INSTRUCTION_START_PATTERN.test(clean)) {
    return true;
  }
  return /\b(oven|minutes?|minuten|bake|cook|bak|kook|mix|meng|serveer|serve)\b/i.test(clean);
}

// Splits "Verhit olie. Bak de ui. Voeg toe." into separate steps when each
// sentence starts with a Dutch/English cooking verb.
const STEP_SENTENCE_SPLIT_RE =
  /\.\s+(?=(?:mix|add|bake|cook|toast|top|serve|blend|heat|roast|whisk|slice|spread|bak|voeg|snij|snijd|halveer|serveer|kook|maak|meng|verhit|roer|leg|dek|bestrooi|giet|laat|verwarm|doe|gooi|strooi|breng|schenk|haal|verwijder|pel|marineer|kruid|klop|stamp|prak|pureer|grill|stir|fry|airfry|season|drizzle|combine|wash|was|dry|droog|scheur|cut|place|zet|blus)\b)/i;

function splitIntoSentenceSteps(line) {
  const parts = sanitizeText(line).split(STEP_SENTENCE_SPLIT_RE);
  return parts.length >= 2
    ? parts.map((s) => cleanListLine(s)).filter((s) => s.length >= 8)
    : [line];
}

function mergeInstructionLines(lines) {
  // First, expand lines that contain multiple period-separated steps
  const expanded = lines.flatMap((line) => splitIntoSentenceSteps(line));

  const merged = [];
  for (const rawLine of expanded) {
    const clean = cleanListLine(rawLine);
    if (!clean) {
      continue;
    }
    const shouldStartNew =
      /^\d+\s*[.)-]\s*/.test(String(rawLine || "")) ||
      INSTRUCTION_START_PATTERN.test(clean) ||
      merged.length === 0;

    if (shouldStartNew) {
      merged.push(clean);
      continue;
    }

    merged[merged.length - 1] = `${merged[merged.length - 1]} ${clean}`.trim();
  }
  return [...new Set(merged)].map((step) => sanitizeText(step)).filter(Boolean);
}

function extractStructuredSections(text) {
  const lines = splitCaptionLines(normalizeInlineRecipeSections(text));
  const sections = {
    title: "",
    intro: [],
    ingredients: [],
    instructions: [],
  };

  let mode = "intro";

  for (const rawLine of lines) {
    const line = cleanListLine(rawLine);
    if (!line) {
      continue;
    }

    if (INGREDIENT_HEADING_PATTERN.test(line.replace(/:$/, ""))) {
      mode = "ingredients";
      continue;
    }

    const servingsHeadingMatch = line.match(/^voor\s+\d+\s+personen?\s*:?\s*(.*)$/i);
    if (servingsHeadingMatch) {
      mode = "ingredients";
      if (servingsHeadingMatch[1]) {
        sections.ingredients.push(cleanListLine(servingsHeadingMatch[1]));
      }
      continue;
    }

    if (INSTRUCTION_HEADING_PATTERN.test(line.replace(/:$/, ""))) {
      mode = "instructions";
      continue;
    }

    if (!sections.title && looksLikeRecipeTitle(line) && line.split(" ").length <= 8 && !isLikelyInstructionLine(line)) {
      sections.title = normalizeRecipeTitle(line);
      continue;
    }

    if (mode === "intro") {
      if (isLikelyIngredientLine(line) && sections.ingredients.length === 0) {
        mode = "ingredients";
        sections.ingredients.push(line);
        continue;
      }
      if (isLikelyInstructionLine(line) && sections.instructions.length === 0 && sections.ingredients.length > 0) {
        mode = "instructions";
        sections.instructions.push(line);
        continue;
      }
      sections.intro.push(line);
      continue;
    }

    if (mode === "ingredients") {
      const inlineInstructionMatch = line.match(
        /^(.*?)(?:\b(?:instructions?|method|steps?|bereiding|bereidingswijze|werkwijze)\s*:?)(.*)$/i
      );
      if (inlineInstructionMatch && inlineInstructionMatch[1]) {
        sections.ingredients.push(cleanListLine(inlineInstructionMatch[1]));
        mode = "instructions";
        if (inlineInstructionMatch[2]) {
          sections.instructions.push(cleanListLine(inlineInstructionMatch[2]));
        }
        continue;
      }

      if (isLikelyInstructionLine(line) && sections.ingredients.length >= 2) {
        mode = "instructions";
        sections.instructions.push(line);
        continue;
      }

      if (isLikelyIngredientLine(line) || sections.ingredients.length === 0) {
        sections.ingredients.push(line);
      }
      continue;
    }

    if (mode === "instructions") {
      sections.instructions.push(line);
    }
  }

  return {
    title: sections.title,
    intro: [...new Set(sections.intro)],
    ingredients: [...new Set(sections.ingredients)],
    instructions: mergeInstructionLines(sections.instructions),
  };
}

function extractDescription(caption, title) {
  const structured = extractStructuredSections(caption);
  const lines = structured.intro
    .map((line) =>
      sanitizeText(
        String(line || "")
          .replace(new RegExp(`^${escapeRegex(String(title || ""))}[!.,:\\s-]*`, "i"), "")
          .replace(/\b(recept|recipe)\b[:\s-]*/i, "")
          .replace(/\bvoor\s+\d+\s+personen?.*$/i, "")
      )
    )
    .filter((line) => {
      if (!line) {
        return false;
      }
      if (line.toLowerCase() === String(title || "").toLowerCase()) {
        return false;
      }
      if (/^\d+\s?(g|kg|ml|l|el|tl|cup|cups|stuks?|stuk|krop|bosje|zakje|pot|blik)\b/i.test(line)) {
        return false;
      }
      if (/^(ingredients?|ingrediënten|bereiding|instructions?|method|recipe)$/i.test(line)) {
        return false;
      }
      return line.length >= 18;
    });

  const description = sanitizeText(lines.slice(0, 2).join(" "));
  if (!description) {
    return "";
  }

  if (description.length <= 180) {
    return description;
  }

  const sentenceChunks = description
    .split(/(?<=[.!?])\s+/)
    .map((item) => sanitizeText(item))
    .filter(Boolean);
  return sanitizeText(sentenceChunks.slice(0, 2).join(" ")).slice(0, 180);
}

function normalizeSocialRecipeTitle(title) {
  const clean = normalizeRecipeTitle(title);
  if (!clean) {
    return "";
  }

  return sanitizeText(
    clean
      .replace(/\bone pot\b/gi, "One Pot")
      .replace(/\bmac and cheese\b/gi, "Mac and Cheese")
      .replace(/\bair fryer\b/gi, "Airfryer")
  );
}

function inferIngredientDefaults(name) {
  const value = sanitizeText(name).toLowerCase();
  if (!value) {
    return { quantity: "", unit: "" };
  }
  if (/^(verse\s+)?(peterselie|koriander|basilicum|bieslook|munt|dille)$/.test(value)) {
    return { quantity: "1", unit: "handje" };
  }
  if (/^(peper en zout|zout en peper)(?:\s+naar smaak)?$/.test(value)) {
    return { quantity: "1", unit: "snuf" };
  }
  if (/^(olijfolie|zonnebloemolie|sesamolie|bakolie)$/.test(value)) {
    return { quantity: "1", unit: "scheutje" };
  }
  return { quantity: "", unit: "" };
}

function cleanupIngredientName(name) {
  const raw = sanitizeText(name);
  if (!raw) {
    return "";
  }

  const withoutPrep = sanitizeText(
    raw
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
      .replace(/,\s*grof gehakt\b/gi, "")
      .replace(/,\s*fijngehakt\b/gi, "")
      .replace(/\s{2,}/g, " ")
  );

  return sanitizeText(
    withoutPrep
      .replace(/^(?:een|één)\s+(kleine|grote|middelgrote|middelgroot)\s+/i, "")
      .replace(/^(kleine|grote|middelgrote|middelgroot)\s+/i, "")
  );
}

function compactSocialDescription(description, title) {
  const clean = sanitizeText(
    String(description || "")
      .replace(new RegExp(`^${escapeRegex(String(title || ""))}[!.,:\\s-]*`, "i"), "")
      .replace(/\bvoor\s+\d+\s+personen?.*$/i, "")
      .replace(/\b(?:recept|recipe)\b[:\s-]*/i, "")
  );

  if (!clean) {
    return "";
  }

  const sentences = clean
    .split(/(?<=[.!?])\s+/)
    .map((item) => sanitizeText(item))
    .filter(Boolean);
  const firstSentence = sanitizeText(sentences[0] || clean);
  return firstSentence.slice(0, 140);
}

function normalizeIngredientObject(ingredient) {
  if (!ingredient?.name) {
    return ingredient;
  }

  const normalizedName = cleanupIngredientName(ingredient.name);
  const defaults = inferIngredientDefaults(normalizedName);
  return {
    quantity: sanitizeText(String(ingredient.quantity || defaults.quantity || "")),
    unit: sanitizeText(String(ingredient.unit || defaults.unit || "")).toLowerCase(),
    name: normalizedName,
  };
}

function normalizeIngredientList(items) {
  return uniqueByName(
    items
      .map((item) => normalizeIngredientObject(item))
      .filter((item) => item?.name)
  );
}

async function extractWithClaude(caption, note) {
  if (!ANTHROPIC_API_KEY || !caption) {
    return null;
  }

  const systemPrompt =
    "Je bent een culinaire data-extractor. Je output is altijd alleen geldige JSON, nooit markdown, nooit uitleg.";

  const userPrompt = [
    "Extraheer gestructureerde receptdata uit onderstaande social media caption (TikTok/Instagram).",
    "",
    "Caption:",
    caption.slice(0, 1800),
    note ? `\nExtra context: ${note}` : "",
    "",
    "Geef precies dit JSON-object terug:",
    '{',
    '  "title": "Recept naam in het Nederlands (3-7 woorden, geen hashtags, geen liedjestitels, geen @users)",',
    '  "description": "1-2 zinnen omschrijving van het gerecht in het Nederlands",',
    '  "ingredients": [',
    '    {"quantity": "2", "unit": "x", "name": "avocado"},',
    '    {"quantity": "200", "unit": "g", "name": "gehakt"}',
    '  ],',
    '  "instructions": [',
    '    "Stap één kookactie in het Nederlands.",',
    '    "Stap twee kookactie in het Nederlands."',
    '  ],',
    '  "time": "25 min",',
    '  "servings": "2"',
    '}',
    "",
    "Regels:",
    "- title: de werkelijke naam van het gerecht (bv. 'Avocado Burger', 'Pasta Carbonara'). NOOIT 'TikTok', liedjestitels, of hashtags.",
    "- unit: gebruik g, kg, ml, l, el, tl, x, stuks, krop, bosje, zakje, teen, snuf, handje.",
    "- instructions: 3-8 duidelijke stappen. Elke stap = één kookhandeling. Splits samengestelde zinnen. Schrijf in het Nederlands.",
    "- Als informatie ontbreekt: maak een redelijke culinaire schatting.",
    "- time: schat in minuten als niet vermeld.",
  ].join("\n");

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text || "";
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return null;
    }

    const result = JSON.parse(jsonMatch[0]);
    if (!result.title || !Array.isArray(result.ingredients) || !Array.isArray(result.instructions)) {
      return null;
    }

    return result;
  } catch {
    return null;
  }
}

function parseIngredientLine(line) {
  const clean = sanitizeText(
    cleanListLine(stripSocialNoise(line))
      .replace(/\*\*([^*]+)\*\*(?=[\p{L}])/gu, "$1 ")
      .replace(/[_*`]+/g, "")
      .replace(/^\[\s*[x ]\s*\]\s*/i, "")
      .replace(/^voor\s+\d+\s+personen?\s*:?\s*/i, "")
      .replace(/\b(?:instructions?|method|steps?|bereiding|bereidingswijze|werkwijze)\s*:?\s*$/i, "")
  );
  if (!clean) {
    return {
      quantity: "",
      unit: "",
      name: "",
    };
  }

  const normalizedSimpleName = clean
    .toLowerCase()
    .replace(/^(verse|versee|vers|fijngesneden|gesneden|geraspte|geraspt|gehakte|gehakt)\s+/i, "")
    .trim();

  if (/^peper en zout(?:\s+naar smaak)?$/i.test(clean)) {
    return {
      quantity: "1",
      unit: "snuf",
      name: clean,
    };
  }

  if (/^(verse\s+)?(peterselie|koriander|basilicum|bieslook|munt)$/i.test(clean)) {
    return {
      quantity: "1",
      unit: "handje",
      name: clean,
    };
  }

  if (/^(citroen|limoen)rasp$/i.test(normalizedSimpleName)) {
    return {
      quantity: "1",
      unit: "x",
      name: clean,
    };
  }

  const match = clean.match(
    new RegExp(
      `^(${QUANTITY_PATTERN})(?:\\s*(?:flinke|kleine|grote|halve|half|volle|verse|middelgrote|middelgroot|klein|groot)\\s+)?(?:\\s*(${UNIT_PATTERN})(?=\\s|$))?\\s+(.+)$`,
      "i"
    )
  );
  if (match) {
    return {
      quantity: match[1],
      unit: (match[2] || "x").toLowerCase(),
      name: sanitizeText(match[3]),
    };
  }

  const verbalQuantityMatch = clean.match(
    /^(een|één|halve|half|paar|scheut(?:je)?|handje|handjes|snuf(?:je)?|bosje|takje)\s+(.+)$/i
  );
  if (verbalQuantityMatch) {
    const token = verbalQuantityMatch[1].toLowerCase();
    return {
      quantity:
        token === "halve" || token === "half"
          ? "0.5"
          : token === "paar"
            ? "2"
            : token === "handjes"
              ? "2"
              : "1",
      unit:
        token === "scheutje" ||
        token === "handje" ||
        token === "handjes" ||
        token === "snufje" ||
        token === "bosje" ||
        token === "takje"
          ? token
          : "x",
      name: sanitizeText(verbalQuantityMatch[2]),
    };
  }

  const implicitHerbMatch = clean.match(/^(verse\s+)?(peterselie|koriander|basilicum|bieslook|munt|dille)$/i);
  if (implicitHerbMatch) {
    return {
      quantity: "1",
      unit: "handje",
      name: clean,
    };
  }

  return normalizeIngredientObject({
    quantity: "",
    unit: "",
    name: clean,
  });
}

function uniqueByName(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.name || NON_FOOD_INGREDIENT_PATTERN.test(item.name)) {
      return false;
    }
    const key = `${item.quantity}|${item.unit}|${item.name}`.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function extractFirstIngredientAfterServings(text) {
  const match = normalizeFractions(String(text || "")).match(
    new RegExp(
      `voor\\s+\\d+\\s+personen?:\\s*(${QUANTITY_PATTERN}\\s*(?:(?:flinke|kleine|grote|halve|half|volle|verse)\\s+)?(?:${UNIT_PATTERN})?\\s+[\\p{L}(][\\s\\S]*?)(?=\\s+(?:een\\s+(?:kleine|grote|halve|flinke|verse)\\s+\\p{L}|${QUANTITY_PATTERN}\\s*(?:(?:flinke|kleine|grote|halve|half|volle|verse)\\s+)?(?:${UNIT_PATTERN})?\\s+[\\p{L}(]|scheut(?:je)?\\s+\\p{L}|handje\\s+\\p{L}|snuf(?:je)?\\s+\\p{L}|bereiding\\s*:))`,
      "iu"
    )
  );

  return match ? cleanListLine(match[1]) : "";
}

function extractIngredientsFromText(text) {
  const structured = extractStructuredSections(text);
  const sourceLines = structured.ingredients.length ? structured.ingredients : splitCaptionLines(text);
  const firstServingIngredient = extractFirstIngredientAfterServings(text);
  const candidates = [
    ...(firstServingIngredient ? [firstServingIngredient] : []),
    ...sourceLines.filter((line) => isLikelyIngredientLine(line)),
  ];

  return normalizeIngredientList(candidates.map(parseIngredientLine)).slice(0, 12);
}

function extractInstructionsFromText(text) {
  const structured = extractStructuredSections(text);
  const candidates = structured.instructions.length
    ? structured.instructions
    : mergeInstructionLines(splitCaptionLines(text).filter((line) => isLikelyInstructionLine(line)));
  return finalizeInstructionSteps(candidates).slice(0, 8);
}

function isLikelyOptionalInstructionStep(step) {
  const value = sanitizeText(step).toLowerCase();
  if (!value) {
    return false;
  }

  return (
    /^(tip|tips?|extra tip|sandra[’']?s tip|sandra[’']?s)\b/.test(value) ||
    /\b(lekker met|ook lekker met|vegetarische variant|voor een vegetarische variant|serveer .* frisse salade)\b/.test(
      value
    )
  );
}

function finalizeInstructionSteps(steps) {
  const unique = [...new Set(steps.map((step) => sanitizeInstructionStep(step)).filter(Boolean))];
  const normalized = unique
    .map((step) =>
      sanitizeText(
        step
          .replace(/\b(?:tip|tips?|extra tip|sandra'?s tip)\s*:\s*.*$/i, "")
          .replace(/\bEet smakelijk!?$/i, "")
      )
    )
    .filter(Boolean);

  const shouldTrimOptional = normalized.length >= 5;
  return normalized.filter((step) => !shouldTrimOptional || !isLikelyOptionalInstructionStep(step));
}

function estimateTime(text) {
  const match = String(text || "").match(/(\d+)\s?(min|mins|minute|minutes)/i);
  return match ? `${match[1]} min` : "35 min";
}

function parseDurationToMinutes(value) {
  const match = String(value || "").match(/PT(?:(\d+)H)?(?:(\d+)M)?/i);
  if (!match) {
    return "";
  }
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes ? `${totalMinutes} min` : "";
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: FETCH_HEADERS,
    signal: AbortSignal.timeout(15000),
    ...options,
  });

  const text = await response.text();
  let payload = null;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`Unexpected response from upstream: ${text.slice(0, 180)}`);
  }

  if (!response.ok) {
    throw new Error(payload.error?.message || payload.error || `Upstream returned ${response.status}`);
  }

  return payload;
}

function isSafeForReaderFallback(parsedUrl) {
  return !parsedUrl.username && !parsedUrl.password && !parsedUrl.search && !parsedUrl.hash;
}

async function fetchWithProfile(url, profileHeaders = {}, referer = "") {
  const headers = {
    ...FETCH_HEADERS,
    ...profileHeaders,
  };

  if (referer) {
    headers.referer = referer;
  }

  return fetch(url, {
    headers,
    signal: AbortSignal.timeout(15000),
    redirect: "follow",
  });
}

async function fetchReaderFallback(url) {
  const response = await fetch(`https://r.jina.ai/http://${url}`, {
    headers: {
      ...FETCH_HEADERS,
      accept: "text/plain, text/markdown;q=0.9, */*;q=0.8",
      "x-with-links-summary": "true",
    },
    signal: AbortSignal.timeout(20000),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new HttpError(502, `Kon bronpagina niet ophalen (${response.status}).`);
  }

  return {
    kind: "text",
    body: await response.text(),
    finalUrl: url,
  };
}

async function fetchWebsiteDocument(url) {
  const parsedUrl = new URL(url);
  const originReferer = `${parsedUrl.protocol}//${parsedUrl.host}/`;
  let lastStatus = 0;

  for (const profile of HTML_FETCH_PROFILES) {
    const response = await fetchWithProfile(url, profile, originReferer);
    lastStatus = response.status;

    if (response.ok) {
      return {
        kind: "html",
        body: await response.text(),
        finalUrl: response.url || url,
      };
    }
  }

  if ((lastStatus === 401 || lastStatus === 403) && isSafeForReaderFallback(parsedUrl)) {
    return fetchReaderFallback(url);
  }

  throw new HttpError(502, `Kon bronpagina niet ophalen (${lastStatus || 403}).`);
}

async function fetchHtml(url) {
  const document = await fetchWebsiteDocument(url);
  if (document.kind !== "html") {
    return "";
  }
  return document.body;
}

function safelyParseJson(rawValue) {
  if (!rawValue) {
    return null;
  }
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

function extractJsonScriptById(html, id) {
  const match = html.match(
    new RegExp(
      `<script[^>]*id=["']${escapeRegex(id)}["'][^>]*>([\\s\\S]*?)<\\/script>`,
      "i"
    )
  );

  return match ? safelyParseJson(decodeHtml(match[1]).trim()) : null;
}

function collectStringFields(node, results = [], path = []) {
  if (!node || results.length > 400) {
    return results;
  }

  if (typeof node === "string") {
    const value = sanitizeText(node);
    if (value) {
      results.push({
        path: path.join("."),
        value,
      });
    }
    return results;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      collectStringFields(item, results, path);
    }
    return results;
  }

  if (typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      collectStringFields(value, results, [...path, key]);
    }
  }

  return results;
}

function extractTikTokHtmlSignals(html) {
  const titleCandidates = [];
  const captionCandidates = [];
  const authorCandidates = [];

  const ogTitle = parseMetaTag(html, "og:title");
  const ogDescription = parseMetaTag(html, "og:description");
  const titleTag = parseTitleTag(html);

  if (ogTitle) {
    titleCandidates.push(ogTitle);
  }
  if (ogDescription) {
    captionCandidates.push(ogDescription);
  }
  if (titleTag) {
    titleCandidates.push(titleTag);
  }

  const rawFieldMatches = [...html.matchAll(/"([A-Za-z0-9_]+)"\s*:\s*"((?:\\.|[^"\\])*)"/g)];
  for (const match of rawFieldMatches) {
    const key = match[1];
    const value = safelyParseJson(`"${match[2]}"`);
    if (!value) {
      continue;
    }
    if (TIKTOK_CAPTION_FIELD_PATTERN.test(key)) {
      captionCandidates.push(value);
    }
    if (TIKTOK_TITLE_FIELD_PATTERN.test(key)) {
      titleCandidates.push(value);
    }
    if (/author|creator|nickname|uniqueId/i.test(key)) {
      authorCandidates.push(value);
    }
  }

  const jsonRoots = [
    extractJsonScriptById(html, "__UNIVERSAL_DATA_FOR_REHYDRATION__"),
    extractJsonScriptById(html, "SIGI_STATE"),
    extractJsonScriptById(html, "__NEXT_DATA__"),
    extractJsonScriptById(html, "__DEFAULT_SCOPE__"),
  ].filter(Boolean);

  for (const root of jsonRoots) {
    const fields = collectStringFields(root);
    for (const field of fields) {
      const normalizedPath = field.path.toLowerCase();
      const likelyContentPath = /(item|video|share|meta|seo|post|desc|caption|contents?)/i.test(normalizedPath);
      const likelyTitlePath = /(item|video|share|meta|seo|title|name)/i.test(normalizedPath);

      if (TIKTOK_CAPTION_FIELD_PATTERN.test(field.path) && likelyContentPath && isUsefulCaptionCandidate(field.value)) {
        captionCandidates.push(field.value);
      }
      if (TIKTOK_TITLE_FIELD_PATTERN.test(field.path) && likelyTitlePath && isUsefulTitleCandidate(field.value)) {
        titleCandidates.push(field.value);
      }
      if (/author|creator|nickname|uniqueId/i.test(field.path)) {
        authorCandidates.push(field.value);
      }
    }
  }

  return {
    titles: [...new Set(titleCandidates.map((item) => sanitizeText(item)).filter((item) => isUsefulTitleCandidate(item)))],
    captions: [...new Set(captionCandidates.map((item) => sanitizeText(item)).filter((item) => isUsefulCaptionCandidate(item)))],
    authors: [...new Set(authorCandidates.map((item) => sanitizeText(item)).filter(Boolean))],
  };
}

function extractInstagramHtmlSignals(html) {
  const titleCandidates = [];
  const captionCandidates = [];
  const authorCandidates = [];

  const ogTitle = parseMetaTag(html, "og:title");
  const ogDescription = parseMetaTag(html, "og:description");
  const twitterTitle = parseMetaTag(html, "twitter:title", "name");
  const twitterDescription = parseMetaTag(html, "twitter:description", "name");
  const titleTag = parseTitleTag(html);

  if (ogTitle) {
    titleCandidates.push(ogTitle);
  }
  if (ogDescription) {
    captionCandidates.push(ogDescription);
  }
  if (twitterTitle) {
    titleCandidates.push(twitterTitle);
  }
  if (twitterDescription) {
    captionCandidates.push(twitterDescription);
  }
  if (titleTag) {
    titleCandidates.push(titleTag);
  }

  const rawFieldMatches = [...html.matchAll(/"([A-Za-z0-9_]+)"\s*:\s*"((?:\\.|[^"\\])*)"/g)];
  for (const match of rawFieldMatches) {
    const key = match[1];
    const value = safelyParseJson(`"${match[2]}"`);
    if (!value) {
      continue;
    }
    if (/caption|description|accessibility_caption|text/i.test(key) && isUsefulCaptionCandidate(value)) {
      captionCandidates.push(value);
    }
    if (/title|name/i.test(key) && isUsefulTitleCandidate(value)) {
      titleCandidates.push(value);
    }
    if (/author|creator|username|full_name|owner/i.test(key)) {
      authorCandidates.push(value);
    }
  }

  return {
    titles: [...new Set(titleCandidates.map((item) => sanitizeText(item)).filter((item) => isUsefulTitleCandidate(item)))],
    captions: [...new Set(captionCandidates.map((item) => sanitizeText(item)).filter((item) => isUsefulCaptionCandidate(item)))],
    authors: [...new Set(authorCandidates.map((item) => sanitizeText(item)).filter(Boolean))],
  };
}

function extractJsonLdObjects(html) {
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const results = [];

  for (const script of scripts) {
    const raw = decodeHtml(script[1]).trim();
    if (!raw) {
      continue;
    }
    try {
      results.push(JSON.parse(raw));
    } catch {
      // ignore malformed JSON-LD blocks
    }
  }

  return results;
}

function flattenJsonLd(node) {
  if (!node) {
    return [];
  }
  if (Array.isArray(node)) {
    return node.flatMap(flattenJsonLd);
  }
  const items = [node];
  if (node["@graph"]) {
    items.push(...flattenJsonLd(node["@graph"]));
  }
  if (node.mainEntity) {
    items.push(...flattenJsonLd(node.mainEntity));
  }
  return items;
}

function findRecipeJsonLd(html) {
  const objects = extractJsonLdObjects(html).flatMap(flattenJsonLd);
  return (
    objects.find((item) => {
      const type = item?.["@type"];
      if (Array.isArray(type)) {
        return type.includes("Recipe");
      }
      return type === "Recipe";
    }) || null
  );
}

function extractBalancedJsonValue(source, key, startIndex = 0) {
  const keyPattern = `"${key}"`;
  const keyIndex = source.indexOf(keyPattern, startIndex);
  if (keyIndex === -1) {
    return "";
  }

  const colonIndex = source.indexOf(":", keyIndex + keyPattern.length);
  if (colonIndex === -1) {
    return "";
  }

  let valueStart = colonIndex + 1;
  while (/\s/.test(source[valueStart] || "")) {
    valueStart += 1;
  }

  const firstChar = source[valueStart];
  if (!firstChar) {
    return "";
  }

  if (firstChar === '"') {
    let escaped = false;
    for (let index = valueStart + 1; index < source.length; index += 1) {
      const char = source[index];
      if (!escaped && char === '"') {
        return source.slice(valueStart, index + 1);
      }
      escaped = !escaped && char === "\\";
      if (char !== "\\") {
        escaped = false;
      }
    }
    return "";
  }

  if (firstChar !== "[" && firstChar !== "{") {
    const endIndex = source.slice(valueStart).search(/[,\]}]/);
    return endIndex === -1 ? source.slice(valueStart).trim() : source.slice(valueStart, valueStart + endIndex).trim();
  }

  const stack = [firstChar];
  let inString = false;
  let escaped = false;

  for (let index = valueStart + 1; index < source.length; index += 1) {
    const char = source[index];

    if (inString) {
      if (!escaped && char === '"') {
        inString = false;
      }
      escaped = !escaped && char === "\\";
      if (char !== "\\") {
        escaped = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "[" || char === "{") {
      stack.push(char);
      continue;
    }

    if (char === "]" || char === "}") {
      const opener = stack.pop();
      if (!opener) {
        return "";
      }
      if ((opener === "[" && char !== "]") || (opener === "{" && char !== "}")) {
        return "";
      }
      if (stack.length === 0) {
        return source.slice(valueStart, index + 1);
      }
    }
  }

  return "";
}

function extractEmbeddedRecipeFields(html) {
  const ingredientIndex = html.indexOf('"recipeIngredient"');
  const instructionIndex = html.indexOf('"recipeInstructions"');

  if (ingredientIndex === -1 && instructionIndex === -1) {
    return null;
  }

  const startIndex = Math.max(0, Math.min(...[ingredientIndex, instructionIndex].filter((index) => index !== -1)) - 400);
  const recipeIngredient = safelyParseJson(extractBalancedJsonValue(html, "recipeIngredient", startIndex)) || [];
  const recipeInstructions = safelyParseJson(extractBalancedJsonValue(html, "recipeInstructions", startIndex)) || [];
  const recipeYield = safelyParseJson(extractBalancedJsonValue(html, "recipeYield", startIndex));
  const totalTime = safelyParseJson(extractBalancedJsonValue(html, "totalTime", startIndex));
  const cookTime = safelyParseJson(extractBalancedJsonValue(html, "cookTime", startIndex));
  const prepTime = safelyParseJson(extractBalancedJsonValue(html, "prepTime", startIndex));

  if (!recipeIngredient.length && !recipeInstructions.length) {
    return null;
  }

  return {
    recipeIngredient,
    recipeInstructions,
    recipeYield,
    totalTime,
    cookTime,
    prepTime,
  };
}

function sanitizeInstructionStep(value) {
  return sanitizeText(stripTags(String(value || "").replace(/&nbsp;/gi, " ")));
}

function parseJsonLdInstructions(value) {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return finalizeInstructionSteps(
      value.flatMap((item) => {
        if (typeof item === "string") {
          return [sanitizeInstructionStep(item)];
        }
        if (item?.itemListElement) {
          return parseJsonLdInstructions(item.itemListElement);
        }
        if (item?.text || item?.name) {
          return [sanitizeInstructionStep(item.text || item.name)];
        }
        return [];
      })
    );
  }
  if (typeof value === "string") {
    return finalizeInstructionSteps(mergeInstructionLines(splitTextUnits(sanitizeInstructionStep(value))));
  }
  if (value.itemListElement) {
    return parseJsonLdInstructions(value.itemListElement);
  }
  if (value.text || value.name) {
    return finalizeInstructionSteps([sanitizeInstructionStep(value.text || value.name)]);
  }
  return [];
}

function parseListAfterHeading(html, headingPattern) {
  const pattern = new RegExp(
    `<(?:h1|h2|h3|h4|strong|p)[^>]*>\\s*(?:${headingPattern})\\s*<\\/(?:h1|h2|h3|h4|strong|p)>[\\s\\S]{0,400}?<(ul|ol)[^>]*>([\\s\\S]*?)<\\/\\1>`,
    "i"
  );
  const match = html.match(pattern);
  if (!match) {
    return [];
  }

  return [...match[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((item) => sanitizeText(stripTags(item[1])))
    .filter(Boolean);
}

function parseParagraphsAfterHeading(html, headingPattern) {
  const pattern = new RegExp(
    `<(?:h1|h2|h3|h4|strong|p)[^>]*>\\s*(?:${headingPattern})\\s*<\\/(?:h1|h2|h3|h4|strong|p)>[\\s\\S]{0,600}?((?:<p[^>]*>[\\s\\S]*?<\\/p>){1,8})`,
    "i"
  );
  const match = html.match(pattern);
  if (!match) {
    return [];
  }

  return [...match[1].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((item) => sanitizeText(stripTags(item[1])))
    .filter(Boolean);
}

function extractMarkdownSection(text, headingPattern, stopPattern) {
  const regex = new RegExp(`(?:^|\\n)#{2,3}\\s*(?:${headingPattern})\\s*\\n([\\s\\S]*?)(?=\\n#{2,3}\\s*(?:${stopPattern})\\b|$)`, "gi");
  const matches = [...String(text || "").matchAll(regex)];
  return matches.length ? matches[matches.length - 1][1].trim() : "";
}

function parseTextRecipeDocument(text, url) {
  const cleanedText = String(text || "")
    .replace(/\*\*([^*]+)\*\*(?=[\p{L}])/gu, "$1 ")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__(?=[\p{L}])/gu, "$1 ")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1")
    .replace(/^\*\s+-\s+\[[x ]\]\s+/gim, "")
    .replace(/^\*\s+/gim, "")
    .replace(/^Title:\s.*$/gim, "")
    .replace(/^URL Source:\s.*$/gim, "")
    .replace(/^Markdown Content:\s*$/gim, "")
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/\n{3,}/g, "\n\n");

  const lines = cleanedText
    .split(/\n+/)
    .map((line) => sanitizeText(line.replace(/^#{1,6}\s*/, "")))
    .filter(Boolean);

  const ingredientSection = extractMarkdownSection(
    cleanedText,
    "ingredi[eë]nten|ingredienten|ingredients?",
    "dit heb je nodig|aan de slag|bereiding|voedingswaarden|boodschappen|allerhande|services|albert heijn"
  );
  const instructionSection = extractMarkdownSection(
    cleanedText,
    "aan de slag|bereiding|bereidingswijze|instructions?|method",
    "voedingswaarden|ingredi[eë]nten|ingredienten|boodschappen|allerhande|services|albert heijn"
  );

  const title =
    normalizeRecipeTitle(lines.find((line) => looksLikeRecipeTitle(line) && RECIPE_TITLE_HINT_PATTERN.test(line))) ||
    normalizeRecipeTitle(lines.find((line) => looksLikeRecipeTitle(line) && line.split(" ").length <= 8)) ||
    "Website recept";

  const description =
    extractDescription(cleanedText, title) ||
    sanitizeText(lines.find((line) => line.length >= 30 && !INGREDIENT_HEADING_PATTERN.test(line) && !INSTRUCTION_HEADING_PATTERN.test(line))) ||
    "";

  const ingredients = extractIngredientsFromText(ingredientSection || cleanedText);
  const instructions = extractInstructionsFromText(instructionSection || cleanedText);
  const time =
    estimateTime(cleanedText) ||
    "35 min";

  return {
    platform: "website",
    sourceUrl: url,
    title,
    description,
    caption: description,
    image: "",
    author: new URL(url).hostname.replace(/^www\./, ""),
    ingredients,
    instructions,
    time,
    servings: "2",
    needsReview: ingredients.length === 0 || instructions.length === 0,
    sourceLabel: "Imported from Website",
  };
}

function parseMarkdownIngredientSection(text) {
  const ingredientSection = extractMarkdownSection(
    text,
    "ingredi[eë]nten|ingredienten|ingredients?",
    "dit heb je nodig|aan de slag|bereiding|voedingswaarden|boodschappen|allerhande|services|albert heijn"
  );

  if (!ingredientSection) {
    return [];
  }

  return normalizeIngredientList(
    ingredientSection
      .split(/\n+/)
      .map((line) => sanitizeText(line))
      .filter((line) => line && !/^\(.*personen.*\)$/i.test(line))
      .map((line) => parseIngredientLine(line))
  );
}

function parseMarkdownInstructionSection(text) {
  const instructionSection = extractMarkdownSection(
    text,
    "aan de slag|bereiding|bereidingswijze|instructions?|method",
    "voedingswaarden|ingredi[eë]nten|ingredienten|boodschappen|allerhande|services|albert heijn"
  );

  if (!instructionSection) {
    return [];
  }

  return finalizeInstructionSteps(
    instructionSection
      .split(/\n+/)
      .map((line) => sanitizeText(line.replace(/^\d+\.\s*\d*\s*/i, "").replace(/^\*\s*/i, "")))
      .filter((line) => !/^(algemeen:|lekker van albert heijn:)/i.test(line))
      .filter(Boolean)
  );
}

function parseMarkdownServings(text) {
  const match = String(text || "").match(/\(Op basis van\s+(\d+)\s+personen?\)/i);
  return match ? match[1] : "";
}

function parseWebsiteRecipe(html, url) {
  const jsonLd = findRecipeJsonLd(html);
  const embeddedRecipe = extractEmbeddedRecipeFields(html);
  const metaTitle = parseMetaTag(html, "og:title") || parseTitleTag(html);
  const metaDescription = parseMetaTag(html, "og:description") || parseMetaTag(html, "description", "name");
  const metaImage = parseMetaTag(html, "og:image");
  const fallbackIngredients = parseListAfterHeading(html, "ingrediënten|ingredienten|ingredients?");
  const fallbackInstructions = [
    ...parseListAfterHeading(html, "bereiding|bereidingswijze|instructions?|method|methode"),
    ...parseParagraphsAfterHeading(html, "bereiding|bereidingswijze|instructions?|method|methode"),
  ];

  if (jsonLd || embeddedRecipe) {
    const recipeSource = jsonLd || embeddedRecipe;
    const recipeName = sanitizeText(recipeSource.name || metaTitle);
    const recipeDescription = sanitizeText(stripTags(recipeSource.description || metaDescription));
    const recipeIngredients = Array.isArray(recipeSource.recipeIngredient)
      ? normalizeIngredientList(recipeSource.recipeIngredient.map(parseIngredientLine))
      : [];
    const recipeInstructions = parseJsonLdInstructions(recipeSource.recipeInstructions);
    const mergedIngredients = recipeIngredients.length
      ? recipeIngredients
      : normalizeIngredientList(fallbackIngredients.map(parseIngredientLine)).slice(0, 16);
    const mergedInstructions = recipeInstructions.length
      ? finalizeInstructionSteps(recipeInstructions)
      : finalizeInstructionSteps(mergeInstructionLines(fallbackInstructions)).slice(0, 12);
    const recipeYield = Array.isArray(recipeSource.recipeYield)
      ? sanitizeText(recipeSource.recipeYield.find(Boolean) || recipeSource.recipeYield[0])
      : sanitizeText(recipeSource.recipeYield);
    const recipeImage = Array.isArray(jsonLd?.image)
      ? typeof jsonLd.image[0] === "string"
        ? jsonLd.image[0]
        : jsonLd.image[0]?.url || metaImage
      : typeof jsonLd?.image === "string"
        ? jsonLd.image
        : jsonLd?.image?.url || metaImage;

    return {
      platform: "website",
      sourceUrl: url,
      title: normalizeRecipeTitle(recipeName || metaTitle) || "Website recept",
      description: recipeDescription,
      caption: recipeDescription,
      image: recipeImage || metaImage,
      author:
        sanitizeText(
          typeof jsonLd?.author === "string"
            ? jsonLd.author
            : Array.isArray(jsonLd?.author)
              ? jsonLd.author.map((item) => item?.name || item).join(", ")
              : jsonLd?.author?.name
        ) || new URL(url).hostname.replace(/^www\./, ""),
      ingredients: mergedIngredients,
      instructions: mergedInstructions,
      time:
        parseDurationToMinutes(
          recipeSource.totalTime || recipeSource.cookTime || recipeSource.prepTime || jsonLd?.totalTime || jsonLd?.cookTime || jsonLd?.prepTime
        ) || estimateTime(recipeDescription),
      servings: recipeYield || "2",
      needsReview: mergedIngredients.length === 0 || mergedInstructions.length === 0,
      sourceLabel: "Imported from Website",
    };
  }

  const fallbackTitle = normalizeRecipeTitle(metaTitle) || "Website recept";
  const fallbackDescription = extractDescription(metaDescription, fallbackTitle);

  return {
    platform: "website",
    sourceUrl: url,
    title: fallbackTitle,
    description: fallbackDescription,
    caption: fallbackDescription,
    image: metaImage,
    author: new URL(url).hostname.replace(/^www\./, ""),
    ingredients: normalizeIngredientList(fallbackIngredients.map(parseIngredientLine)).slice(0, 12),
    instructions: finalizeInstructionSteps(fallbackInstructions).slice(0, 10),
    time: estimateTime(fallbackDescription),
    servings: "2",
    needsReview: fallbackIngredients.length === 0 || fallbackInstructions.length === 0,
    sourceLabel: "Imported from Website",
  };
}

function buildSocialRecipe({ platform, sourceUrl, rawTitle, rawCaption, image, author, titleCandidates = [], captionCandidates = [] }) {
  const bestCaption =
    pickBestCaptionCandidate([rawCaption, ...captionCandidates]) ||
    rawCaption ||
    "";
  const cleanCaption = stripSocialNoise(bestCaption);
  const structured = extractStructuredSections(cleanCaption);
  const ingredients = extractIngredientsFromText(cleanCaption);
  const derivedTitleCandidates = [
    rawTitle,
    ...titleCandidates,
    structured.title,
    extractRecipeTitleFromCaption(rawCaption),
    extractRecipeTitleFromCaption(cleanCaption),
    extractRecipeHashtagTitle(rawCaption),
    extractDishPhrase(cleanCaption),
  ].filter(Boolean);
  const finalTitle =
    normalizeSocialRecipeTitle(pickBestTitleCandidate(derivedTitleCandidates)) ||
    extractDishPhrase(cleanCaption) ||
    (ingredients[0] ? `Recept met ${ingredients[0].name}` : "Geïmporteerd recept");

  const finalDescription = compactSocialDescription(extractDescription(cleanCaption, finalTitle), finalTitle);
  const instructions = extractInstructionsFromText(cleanCaption);

  return {
    platform,
    sourceUrl,
    title: finalTitle,
    description: finalDescription,
    caption: cleanCaption,
    image: image || "",
    author: author || "Unknown creator",
    ingredients,
    instructions,
    time: estimateTime(cleanCaption),
    servings: "2",
    needsReview: ingredients.length === 0 || instructions.length === 0,
    sourceLabel: `Imported from ${platform === "tiktok" ? "TikTok" : "Instagram"}`,
  };
}

async function importTikTok(sourceUrl, note) {
  const [oembed, document] = await Promise.all([
    fetchJson(`https://www.tiktok.com/oembed?url=${encodeURIComponent(sourceUrl)}`),
    fetchWebsiteDocument(sourceUrl).catch(() => null),
  ]);

  const html = document?.kind === "html" ? document.body : "";
  const textFallback = document?.kind === "text" ? document.body : "";
  const htmlSignals = html ? extractTikTokHtmlSignals(html) : { titles: [], captions: [], authors: [] };
  const ogTitle = html ? parseMetaTag(html, "og:title") : "";
  const ogDescription = html ? parseMetaTag(html, "og:description") : "";
  const ogImage = html ? parseMetaTag(html, "og:image") : "";
  const textDerivedTitle = textFallback ? extractDishPhrase(textFallback) || extractRecipeTitleFromCaption(textFallback) : "";
  const textDerivedCaption = textFallback && isUsefulCaptionCandidate(textFallback) ? textFallback : "";

  const image = ogImage || oembed.thumbnail_url || "";
  const author = oembed.author_name || htmlSignals.authors[0] || "";

  // Gather the best caption candidate for Claude (or heuristics)
  const captionCandidates = [ogDescription, textDerivedCaption, ...htmlSignals.captions, oembed.title];
  const bestCaption = pickBestCaptionCandidate(captionCandidates) || sanitizeText(ogDescription || oembed.title);

  // Try Claude extraction first — gives much better title + step-by-step bereiding
  const claudeResult = await extractWithClaude(bestCaption, note || "");
  if (claudeResult) {
    const parsedIngredients = Array.isArray(claudeResult.ingredients)
      ? claudeResult.ingredients.map((ingredient) =>
          typeof ingredient === "string" ? parseIngredientLine(ingredient) : ingredient
        )
      : [];

    return {
      platform: "tiktok",
      sourceUrl,
      title: normalizeSocialRecipeTitle(claudeResult.title) || "Geïmporteerd recept",
      description: compactSocialDescription(claudeResult.description || "", claudeResult.title || ""),
      caption: stripSocialNoise(bestCaption),
      image,
      author,
      ingredients: normalizeIngredientList(parsedIngredients),
      instructions: Array.isArray(claudeResult.instructions) ? finalizeInstructionSteps(claudeResult.instructions) : [],
      time: sanitizeText(claudeResult.time || "30 min"),
      servings: sanitizeText(String(claudeResult.servings || "2")),
      needsReview: parsedIngredients.length === 0,
      sourceLabel: "Imported from TikTok",
    };
  }

  // Fall back to heuristic extraction
  return buildSocialRecipe({
    platform: "tiktok",
    sourceUrl,
    rawTitle: ogTitle || oembed.title,
    rawCaption: bestCaption,
    image,
    author,
    titleCandidates: [ogTitle, oembed.title, textDerivedTitle, ...htmlSignals.titles],
    captionCandidates,
  });
}

async function importInstagram(sourceUrl, note) {
  let oembed = null;
  let oembedErrorMessage = "";

  if (META_APP_ID && META_APP_SECRET) {
    const token = `${META_APP_ID}|${META_APP_SECRET}`;
    const endpoint =
      `https://graph.facebook.com/v23.0/instagram_oembed?url=${encodeURIComponent(sourceUrl)}` +
      `&omitscript=false&access_token=${encodeURIComponent(token)}`;

    oembed = await fetchJson(endpoint).catch((error) => {
      oembedErrorMessage = error instanceof Error ? error.message : String(error || "");
      return null;
    });
  }

  const document = await fetchWebsiteDocument(sourceUrl).catch(() => null);
  const html = document?.kind === "html" ? document.body : "";
  const textFallback = document?.kind === "text" ? document.body : "";
  const htmlSignals = html ? extractInstagramHtmlSignals(html) : { titles: [], captions: [], authors: [] };
  const ogTitle = html ? parseMetaTag(html, "og:title") : "";
  const ogDescription = html ? parseMetaTag(html, "og:description") : "";
  const ogImage = html ? parseMetaTag(html, "og:image") : "";
  const textDerivedTitle = textFallback ? extractDishPhrase(textFallback) || extractRecipeTitleFromCaption(textFallback) : "";
  const textDerivedCaption = textFallback && isUsefulCaptionCandidate(textFallback) ? textFallback : "";

  const image = ogImage || oembed?.thumbnail_url || "";
  const author = oembed?.author_name || htmlSignals.authors[0] || "";
  const captionCandidates = [ogDescription, textDerivedCaption, ...htmlSignals.captions, oembed?.title];
  const bestCaption = pickBestCaptionCandidate(captionCandidates) || sanitizeText(ogDescription || oembed?.title || "");

  if (bestCaption) {
    const claudeResult = await extractWithClaude(bestCaption, note || "");
    if (claudeResult) {
      const parsedIngredients = Array.isArray(claudeResult.ingredients)
        ? claudeResult.ingredients.map((ingredient) =>
            typeof ingredient === "string" ? parseIngredientLine(ingredient) : ingredient
          )
        : [];

      return {
        platform: "instagram",
        sourceUrl,
        title: normalizeSocialRecipeTitle(claudeResult.title) || "Geïmporteerd recept",
        description: compactSocialDescription(claudeResult.description || "", claudeResult.title || ""),
        caption: stripSocialNoise(bestCaption),
        image,
        author,
        ingredients: normalizeIngredientList(parsedIngredients),
        instructions: Array.isArray(claudeResult.instructions) ? finalizeInstructionSteps(claudeResult.instructions) : [],
        time: sanitizeText(claudeResult.time || "30 min"),
        servings: sanitizeText(String(claudeResult.servings || "2")),
        needsReview: parsedIngredients.length === 0,
        sourceLabel: "Imported from Instagram",
      };
    }
  }

  if (!oembed && !html && !textFallback) {
    if (/Meta oEmbed Read|oEmbed Read/i.test(oembedErrorMessage)) {
      throw new HttpError(
        503,
        "Instagram import wacht nog op Meta-goedkeuring voor deze app. Gebruik voorlopig een publieke website-link of probeer een openbare post."
      );
    }

    if (!META_APP_ID || !META_APP_SECRET) {
      throw new HttpError(
        501,
        "Instagram import kon geen openbare brondata lezen. Voeg META_APP_ID en META_APP_SECRET toe of gebruik een publieke post."
      );
    }

    throw new HttpError(
      502,
      "Instagram import kon geen brondata ophalen voor deze post. Probeer een publieke reel/post of gebruik de website-link van het recept."
    );
  }

  return buildSocialRecipe({
    platform: "instagram",
    sourceUrl,
    rawTitle: ogTitle || oembed?.title || textDerivedTitle,
    rawCaption: bestCaption || oembed?.title || "",
    image,
    author,
    titleCandidates: [ogTitle, oembed?.title, textDerivedTitle, ...htmlSignals.titles],
    captionCandidates,
  });
}

async function importWebsite(sourceUrl) {
  const parsedUrl = new URL(sourceUrl);
  const isAllerhande = /(^|\.)ah\.nl$/i.test(parsedUrl.hostname) && /\/allerhande\//i.test(parsedUrl.pathname);

  if (isAllerhande) {
    const [document, readerDocument] = await Promise.all([
      fetchWebsiteDocument(sourceUrl),
      fetchReaderFallback(sourceUrl).catch(() => null),
    ]);

    const primaryRecipe =
      document.kind === "text"
        ? parseTextRecipeDocument(document.body, document.finalUrl || sourceUrl)
        : parseWebsiteRecipe(document.body, document.finalUrl || sourceUrl);

    if (readerDocument?.kind === "text") {
      const readerRecipe = parseTextRecipeDocument(readerDocument.body, readerDocument.finalUrl || sourceUrl);
      const readerIngredients = parseMarkdownIngredientSection(readerDocument.body);
      const readerInstructions = parseMarkdownInstructionSection(readerDocument.body);
      const readerServings = parseMarkdownServings(readerDocument.body);
      return {
        ...primaryRecipe,
        ingredients: readerIngredients.length ? readerIngredients : readerRecipe.ingredients.length ? readerRecipe.ingredients : primaryRecipe.ingredients,
        instructions:
          readerInstructions.length ? readerInstructions : readerRecipe.instructions.length ? readerRecipe.instructions : primaryRecipe.instructions,
        title: primaryRecipe.title,
        description: primaryRecipe.description,
        servings: readerServings || readerRecipe.servings || primaryRecipe.servings,
        needsReview:
          !(readerIngredients.length || readerRecipe.ingredients.length) ||
          !(readerInstructions.length || readerRecipe.instructions.length) ||
          (readerIngredients.length || readerRecipe.ingredients.length) < 4 ||
          (readerInstructions.length || readerRecipe.instructions.length) < 3,
      };
    }

    return primaryRecipe;
  }

  const document = await fetchWebsiteDocument(sourceUrl);
  if (document.kind === "text") {
    return parseTextRecipeDocument(document.body, document.finalUrl || sourceUrl);
  }
  return parseWebsiteRecipe(document.body, document.finalUrl || sourceUrl);
}

async function importRecipe(url, note) {
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new HttpError(400, "Voer een geldige URL in.");
  }

  const platform = detectPlatform(parsedUrl);

  if (platform === "tiktok") {
    return importTikTok(parsedUrl.toString(), note);
  }
  if (platform === "instagram") {
    return importInstagram(parsedUrl.toString(), note);
  }
  return importWebsite(parsedUrl.toString());
}

/* ── Store product search (AH + Jumbo) ── */

let ahTokenCache = { token: "", expiresAt: 0 };

async function fetchAHAnonymousToken() {
  if (ahTokenCache.token && Date.now() < ahTokenCache.expiresAt - 60_000) {
    return ahTokenCache.token;
  }
  const response = await fetch("https://api.ah.nl/mobile-auth/v1/auth/token/anonymous", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId: "appie" }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    throw new Error(`AH auth mislukt (${response.status})`);
  }
  const data = await response.json();
  ahTokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (Number(data.expires_in) || 3600) * 1000,
  };
  return ahTokenCache.token;
}

function parseAHProduct(product) {
  // AH webshopId can be "wi123456" or "wi_123456" — strip prefix correctly
  const webshopId = String(product.webshopId || product.id || "");
  const numericId = webshopId.replace(/^wi_?/i, "");
  const priceEuros = product.priceBeforeBonus ?? product.currentPrice ?? 0;
  return {
    id: numericId,
    name: sanitizeText(product.title),
    price: priceEuros ? `€${Number(priceEuros).toFixed(2).replace(".", ",")}` : "",
    url: numericId ? `https://www.ah.nl/producten/product/wi${numericId}` : "",
  };
}

// Returns the best single match (for backward compat with buildMatchedChoiceFromProduct)
async function findAHProduct(ingredient) {
  const results = await findAHProducts(ingredient, 1);
  return results[0] ?? null;
}

// Returns up to `count` product matches from AH for a single ingredient
async function findAHProducts(ingredient, count = 3) {
  try {
    const token = await fetchAHAnonymousToken();
    const searchUrl =
      `https://api.ah.nl/mobile-services/product/search/v2` +
      `?query=${encodeURIComponent(ingredient)}&size=${count * 2}&sortOn=RELEVANCE`;

    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-application": "AHWEBSHOP",
        ...FETCH_HEADERS,
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const products = (data.products || [])
      .filter((p) => !NON_FOOD_INGREDIENT_PATTERN.test(sanitizeText(p.title)))
      .filter((p) => ingredientMatchesProduct(ingredient, sanitizeText(p.title)))
      .slice(0, count);

    return products.map(parseAHProduct);
  } catch {
    return [];
  }
}

async function findJumboProduct(ingredient) {
  // Jumbo's public product search API is no longer available.
  // We parse their search results page for structured product data (JSON-LD or embedded JSON).
  try {
    const searchUrl = `https://www.jumbo.com/zoeken/?searchTerms=${encodeURIComponent(ingredient)}`;
    const response = await fetch(searchUrl, {
      headers: {
        ...FETCH_HEADERS,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
      },
      signal: AbortSignal.timeout(12000),
      redirect: "follow",
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    // The Jumbo website embeds product data as JSON in script tags or in the page's initial state.
    // Typical pattern: {"id":"213178STK","title":"Jumbo Avocado...",...}
    const idMatch = html.match(/"id"\s*:\s*"(\d+[A-Z]+\d*)"[^}]{0,120}"title"\s*:\s*"([^"]+)"/);
    if (!idMatch) {
      // Try reversed key order
      const reversed = html.match(/"title"\s*:\s*"([^"]{3,60})"[^}]{0,120}"id"\s*:\s*"(\d+[A-Z]+\d*)"/);
      if (!reversed) {
        return null;
      }
      const name = sanitizeText(reversed[1]);
      if (NON_FOOD_INGREDIENT_PATTERN.test(name)) {
        return null;
      }
      return { sku: reversed[2], name, price: "" };
    }

    const name = sanitizeText(idMatch[2]);
    if (NON_FOOD_INGREDIENT_PATTERN.test(name)) {
      return null;
    }

    return {
      sku: idMatch[1],
      name,
      price: "",
    };
  } catch {
    return null;
  }
}

async function searchProductsForStore(store, ingredientNames) {
  const searches = ingredientNames.map(async (name) => {
    const product =
      store === "albert-heijn"
        ? await findAHProduct(name)
        : await findJumboProduct(name);
    return { ingredient: name, product };
  });
  return Promise.all(searches);
}

function buildAHDirectAddUrl(results) {
  const found = results.filter((r) => r.product?.id);
  if (!found.length) {
    return "https://www.ah.nl/mijnlijst/";
  }
  const params = found.map((r) => `p=${encodeURIComponent(r.product.id)}:1`).join("&");
  return `https://www.ah.nl/mijnlijst/add-multiple?${params}`;
}

function buildJumboDirectAddUrl(results) {
  const found = results.filter((r) => r.product?.sku);
  if (found.length) {
    // Build the direct cart-add URL when SKUs are available
    const items = found.map((r) => ({ sku: r.product.sku, quantity: 1 }));
    return `https://www.jumbo.com/mandje/?add=${encodeURIComponent(JSON.stringify(items))}`;
  }

  return "https://www.jumbo.com/mandje/";
}

function buildStoreSearchUrl(store, items) {
  const query = encodeURIComponent(
    items
      .map((item) => sanitizeText(item?.title || ""))
      .filter(Boolean)
      .join(" ")
  );

  if (store === "albert-heijn") {
    return `https://www.ah.nl/zoeken?query=${query}`;
  }
  return `https://www.jumbo.com/zoeken/?searchTerms=${query}`;
}

function buildFoodInfluencersUrl(recipeId, store, biaIds = []) {
  const params = new URLSearchParams();
  biaIds
    .filter(Boolean)
    .forEach((id) => {
      params.append("biaIds[]", id);
    });
  params.set("channel", "origin");
  params.set("locale", "nl-NL");
  return `https://modal.foodinfluencersunited.com/recipe/${recipeId}/${store}?${params.toString()}`;
}

function extractFoodInfluencersDirectUrl(html, store) {
  const source = decodeEscapedSlashes(html);
  const fullUrlPattern =
    /https?:\/\/modal\.foodinfluencersunited\.com\/recipe\/[0-9a-f-]{36}\/(?:jumbo|albert-heijn)(?:\?[^"'`\s<>\\]*)?/gi;
  const fullUrls = [...source.matchAll(fullUrlPattern)].map((match) => match[0]);

  const matchingFullUrl = fullUrls.find((url) => url.includes(`/${store}`));
  if (matchingFullUrl) {
    return matchingFullUrl;
  }

  const routePattern = /\/recipe\/([0-9a-f-]{36})\/(jumbo|albert-heijn)(?:\?([^"'`\s<>\\]*))?/gi;
  const routeMatches = [...source.matchAll(routePattern)];
  const matchingRoute = routeMatches.find((match) => match[2] === store);

  if (matchingRoute) {
    return `https://modal.foodinfluencersunited.com${matchingRoute[0].startsWith("/") ? "" : "/"}${matchingRoute[0]}`;
  }

  const recipeIdMatch =
    source.match(/"recipeId"\s*:\s*"([0-9a-f-]{36})"/i) ||
    source.match(/"id"\s*:\s*"([0-9a-f-]{36})"/i) ||
    source.match(/\/recipe\/([0-9a-f-]{36})\/(?:jumbo|albert-heijn)/i);

  if (!recipeIdMatch) {
    return "";
  }

  const recipeId = recipeIdMatch[1];
  const biaIds = [
    ...new Set(
      [...source.matchAll(/biaIds(?:%5B%5D|\[\])(?:=|%3D)([0-9a-f-]{36})/gi)].map((match) => match[1])
    ),
  ];

  return buildFoodInfluencersUrl(recipeId, store, biaIds);
}

// ── Channel recipe search ─────────────────────────────────────────────────────

async function searchAHRecipes(query, count = 4) {
  try {
    const url =
      `https://api.ah.nl/mobile-services/recipes/v2` +
      `?query=${encodeURIComponent(query)}&size=${count}`;
    const resp = await fetch(url, {
      headers: { ...FETCH_HEADERS },
      signal: AbortSignal.timeout(8000),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    return (data.recipes || [])
      .slice(0, count)
      .map((r) => ({
        title: sanitizeText(r.title || ""),
        url: r.webPath ? `https://www.ah.nl${r.webPath}` : "",
        thumbnail: r.images?.[0]?.url || r.image?.url || "",
        channel: "Allerhande",
        channelId: "ch-ah",
        description: sanitizeText((r.description || "").slice(0, 140)),
        time: r.cookTime ? `${r.cookTime} min` : "",
      }))
      .filter((r) => r.title && r.url);
  } catch {
    return [];
  }
}

async function searchWordPressRecipes(baseUrl, channelName, channelId, query, count = 3) {
  try {
    const url =
      `${baseUrl}/wp-json/wp/v2/posts` +
      `?search=${encodeURIComponent(query)}&per_page=${count}&_embed=wp:featuredmedia`;
    const resp = await fetch(url, {
      headers: { ...FETCH_HEADERS, accept: "application/json" },
      signal: AbortSignal.timeout(9000),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    return (Array.isArray(data) ? data : [])
      .slice(0, count)
      .map((r) => {
        const thumbnail =
          r._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url ||
          r._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "";
        return {
          title: sanitizeText((r.title?.rendered || "").replace(/&amp;/g, "&").replace(/<[^>]+>/g, "")),
          url: sanitizeText(r.link || ""),
          thumbnail,
          channel: channelName,
          channelId,
          description: sanitizeText((r.excerpt?.rendered || "").replace(/<[^>]+>/g, "").trim().slice(0, 140)),
          time: "",
        };
      })
      .filter((r) => r.title && r.url);
  } catch {
    return [];
  }
}

async function searchChannelRecipes(query) {
  const searches = await Promise.allSettled([
    searchAHRecipes(query, 3),
    searchWordPressRecipes("https://www.eefkooktzo.nl", "Eef Kookt Zo", "ch-ek", query, 2),
    searchWordPressRecipes("https://uitpaulineskeuken.nl", "Uit Paulines Keuken", "ch-up", query, 2),
    searchWordPressRecipes("https://miljuschka.nl", "Miljuschka", "ch-mj", query, 2),
    searchWordPressRecipes("https://www.chickslovefood.com", "Chicks Love Food", "ch-clf", query, 2),
    searchWordPressRecipes("https://www.lekkerensimpel.com", "Lekker & Simpel", "ch-les", query, 2),
    searchWordPressRecipes("https://www.laurasbakery.nl", "Laura's Bakery", "ch-lb", query, 1),
  ]);
  const all = [];
  for (const settled of searches) {
    if (settled.status === "fulfilled") all.push(...settled.value);
  }
  return all.slice(0, 10);
}

async function buildStoreBasket(body) {
  const store = normalizeStoreSlug(body.store);
  const items = Array.isArray(body.items) ? body.items : [];

  if (!items.length) {
    throw new HttpError(400, "Er staan geen boodschappen klaar om te bestellen.");
  }

  const recipeTitle = sanitizeText(body.recipeTitle || "Boodschappenlijst");
  const sourceUrl = sanitizeText(body.sourceUrl || "");

  if (sourceUrl) {
    try {
      const html = await fetchHtml(sourceUrl);
      const directUrl = extractFoodInfluencersDirectUrl(html, store);

      if (directUrl) {
        return {
          kind: "direct",
          store,
          storeLabel: getStoreLabel(store),
          recipeTitle,
          sourceUrl,
          directUrl,
          note: `Ik heb op de bronpagina een bestaande mandje-koppeling gevonden voor ${getStoreLabel(store)}.`,
          items: matchedItems,
          provider: "foodinfluencersunited",
        };
      }
    } catch {
      // Fall back to store search when the source page cannot be inspected.
    }
  }

  // For AH: fetch up to 3 real product matches per ingredient so the user can pick alternatives.
  // For other stores: keep single-match behaviour.
  let searchResults;
  if (store === "albert-heijn") {
    searchResults = await Promise.all(
      items.map(async (item) => {
        const name = sanitizeText(item.title || "");
        if (!name) return { ingredient: name, product: null, products: [] };
        const products = await findAHProducts(name, 3);
        return { ingredient: name, product: products[0] ?? null, products };
      })
    ).catch(() => items.map((item) => ({ ingredient: sanitizeText(item.title || ""), product: null, products: [] })));
  } else {
    const raw = await searchProductsForStore(
      store,
      items.map((item) => sanitizeText(item.title || "")).filter(Boolean)
    ).catch(() => []);
    searchResults = raw.map((r) => ({ ...r, products: r.product ? [r.product] : [] }));
  }

  const matchedItems = items.map((item, index) => {
    const result = searchResults[index] || { product: null, products: [] };
    let choices;

    if (store === "albert-heijn" && result.products.length) {
      const ahChoices = result.products
        .map((product, i) =>
          buildMatchedChoiceFromProduct(store, item, product, i === 0 ? "Beste match" : "Alternatief")
        )
        .filter(Boolean);
      choices = ahChoices.length ? ahChoices : buildStoreProductChoices(store, item);
    } else {
      const directChoice = result.product ? buildMatchedChoiceFromProduct(store, item, result.product) : null;
      const fallbackChoices = buildStoreProductChoices(store, item);
      choices = directChoice
        ? [directChoice, ...fallbackChoices.filter((c) => c.title !== directChoice.title)]
        : fallbackChoices;
    }

    return {
      id: `basket-item-${index}`,
      ingredientTitle: sanitizeText(item.title || "Ingrediënt"),
      ingredientAmount: sanitizeText(item.amount || "1 verpakking"),
      confidence: result.product ? "Gevonden in winkel" : getMatchConfidenceLabel(item.title || ""),
      choices: choices.slice(0, 3),
      selectedChoiceIndex: 0,
    };
  });

  const foundResults = searchResults.filter((result) => result?.product);
  const directUrl =
    foundResults.length > 0
      ? store === "albert-heijn"
        ? buildAHDirectAddUrl(foundResults)
        : buildJumboDirectAddUrl(foundResults)
      : "";

  return {
    kind: directUrl ? "direct" : "preview",
    store,
    storeLabel: getStoreLabel(store),
    recipeTitle,
    sourceUrl,
    directUrl,
    fallbackUrl: store === "jumbo" ? "https://www.jumbo.com/mandje/" : buildStoreSearchUrl(store, items),
    note:
      foundResults.length
        ? "Plately heeft echte winkelmatches gevonden. Controleer eventueel per ingrediënt en ga daarna door."
        : "Plately heeft nog niet voor elk ingrediënt een exacte winkelmatch gevonden. Controleer per ingrediënt en open daarna de winkel.",
    items: matchedItems,
  };
}

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new HttpError(400, "Request body moet geldige JSON zijn.");
  }
}

async function serveStaticFile(requestPath, response) {
  const cleanPath = requestPath === "/" ? "/index.html" : requestPath;
  const relativePath = path.normalize(cleanPath).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]+/, "");
  const resolvedPath = path.join(ROOT_DIR, relativePath);

  if (!resolvedPath.startsWith(ROOT_DIR)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  try {
    const fileContents = await fsp.readFile(resolvedPath);
    const extension = path.extname(resolvedPath).toLowerCase();
    const cacheControl =
      path.basename(resolvedPath) === "service-worker.js"
        ? "no-cache, no-store, must-revalidate"
        : extension === ".html" || extension === ".css" || extension === ".js"
          ? "no-cache"
          : extension === ".png" || extension === ".jpg" || extension === ".jpeg" || extension === ".svg"
            ? "public, max-age=604800, immutable"
            : "public, max-age=86400";

    response.writeHead(200, {
      ...HTTP_HEADERS,
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Cache-Control": cacheControl,
    });
    response.end(fileContents);
  } catch {
    sendJson(response, 404, { error: "Bestand niet gevonden." });
  }
}

const server = http.createServer(async (request, response) => {
  if (!request.url) {
    sendJson(response, 400, { error: "Invalid request." });
    return;
  }

  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, HTTP_HEADERS);
    response.end();
    return;
  }

  try {
    if (requestUrl.pathname === "/api/health" && request.method === "GET") {
      sendJson(response, 200, {
        ok: true,
        app: "Plately",
      env: process.env.NODE_ENV || "development",
      persistence: {
        mode: "json-file",
        dataDir: DATA_DIR,
      },
      auth: {
        postgresEnabled: isPostgresEnabled(),
      },
      platforms: {
        tiktok: { configured: true },
        instagram: { configured: Boolean(META_APP_ID && META_APP_SECRET) },
          website: { configured: true },
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/session" && request.method === "GET") {
      const authUser = await getAuthenticatedUser(request);
      if (authUser) {
        sendJson(response, 200, {
          ok: true,
          user: buildAppStateFromUser(authUser),
          auth: {
            enabled: isPostgresEnabled(),
            authenticated: true,
            email: authUser.email,
          },
        });
        return;
      }

      const user = await ensureUserSession(request, response);
      sendJson(response, 200, {
        ok: true,
        user: {
          ...user,
          authenticated: false,
          email: "",
        },
        auth: {
          enabled: isPostgresEnabled(),
          authenticated: false,
          email: "",
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/app-state" && request.method === "PUT") {
      const body = await readRequestBody(request);
      const authUser = await getAuthenticatedUser(request);
      if (authUser) {
        const updatedUser = await updateAuthenticatedUserState(authUser.id, body);
        sendJson(response, 200, {
          ok: true,
          user: buildAppStateFromUser(updatedUser),
          auth: {
            enabled: isPostgresEnabled(),
            authenticated: true,
            email: updatedUser.email,
          },
        });
        return;
      }

      const user = await ensureUserSession(request, response);
      const db = await loadDatabase();
      const nextUser = sanitizeUserStatePayload(body, user);
      db.users[nextUser.id] = nextUser;
      await persistDatabase();
      sendJson(response, 200, {
        ok: true,
        user: {
          ...nextUser,
          authenticated: false,
          email: "",
        },
        auth: {
          enabled: isPostgresEnabled(),
          authenticated: false,
          email: "",
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/auth/register" && request.method === "POST") {
      if (!isPostgresEnabled()) {
        throw new HttpError(400, "Postgres login is nog niet geconfigureerd.");
      }

      const body = await readRequestBody(request);
      const email = sanitizeEmail(body.email);
      const password = String(body.password || "");
      if (!isValidEmail(email)) {
        throw new HttpError(400, "Gebruik een geldig e-mailadres.");
      }
      if (!isValidPassword(password)) {
        throw new HttpError(400, "Gebruik een wachtwoord van minimaal 8 tekens.");
      }

      await ensurePostgresSchema();
      const pool = await getPostgresPool();
      const existing = await pool.query(`SELECT id FROM plately_users WHERE email = $1 LIMIT 1`, [email]);
      if (existing.rows[0]) {
        throw new HttpError(409, "Er bestaat al een account met dit e-mailadres.");
      }

      const createdUser = await createPostgresUser(email, password, body.currentState || {});
      await createAuthSession(response, createdUser.id);
      sendJson(response, 200, {
        ok: true,
        user: buildAppStateFromUser(createdUser),
        auth: {
          enabled: true,
          authenticated: true,
          email: createdUser.email,
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/auth/login" && request.method === "POST") {
      if (!isPostgresEnabled()) {
        throw new HttpError(400, "Postgres login is nog niet geconfigureerd.");
      }

      const body = await readRequestBody(request);
      const email = sanitizeEmail(body.email);
      const password = String(body.password || "");
      await ensurePostgresSchema();
      const pool = await getPostgresPool();
      const result = await pool.query(`SELECT * FROM plately_users WHERE email = $1 LIMIT 1`, [email]);
      const user = result.rows[0];
      if (!user) {
        throw new HttpError(401, "Onjuiste inloggegevens.");
      }

      const { hash } = createPasswordHash(password, user.password_salt);
      if (hash !== user.password_hash) {
        throw new HttpError(401, "Onjuiste inloggegevens.");
      }

      await createAuthSession(response, user.id);
      sendJson(response, 200, {
        ok: true,
        user: buildAppStateFromUser(user),
        auth: {
          enabled: true,
          authenticated: true,
          email: user.email,
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/auth/logout" && request.method === "POST") {
      await clearAuthSession(request, response);
      const guestUser = await ensureUserSession(request, response);
      sendJson(response, 200, {
        ok: true,
        user: {
          ...guestUser,
          authenticated: false,
          email: "",
        },
        auth: {
          enabled: isPostgresEnabled(),
          authenticated: false,
          email: "",
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/channel-search" && request.method === "GET") {
      const query = sanitizeText(requestUrl.searchParams.get("q") || "");
      if (!query || query.length < 2) {
        sendJson(response, 200, { ok: true, results: [] });
        return;
      }
      const results = await searchChannelRecipes(query);
      sendJson(response, 200, { ok: true, results });
      return;
    }

    if (requestUrl.pathname === "/api/import" && request.method === "POST") {
      const body = await readRequestBody(request);
      const recipe = await importRecipe(body.url, body.note || "");
      sendJson(response, 200, { ok: true, recipe });
      return;
    }

    if (requestUrl.pathname === "/api/store-basket" && request.method === "POST") {
      const body = await readRequestBody(request);
      const basket = await buildStoreBasket(body);
      sendJson(response, 200, { ok: true, ...basket });
      return;
    }

    if (requestUrl.pathname === "/api/store-products" && request.method === "POST") {
      const body = await readRequestBody(request);
      const store = normalizeStoreSlug(body.store);
      const ingredients = Array.isArray(body.ingredients)
        ? body.ingredients.map((s) => sanitizeText(s)).filter(Boolean).slice(0, 20)
        : [];

      if (!ingredients.length) {
        throw new HttpError(400, "Geen ingrediënten opgegeven.");
      }

      const results = await searchProductsForStore(store, ingredients);
      const directUrl =
        store === "albert-heijn"
          ? buildAHDirectAddUrl(results)
          : buildJumboDirectAddUrl(results);

      const found = results.filter((r) => r.product).length;
      // AH supports direct add-multiple; Jumbo falls back to combined search when no SKUs found
      const isDirectAdd = store === "albert-heijn" || found > 0;

      sendJson(response, 200, {
        ok: true,
        store,
        found,
        total: results.length,
        directUrl,
        isDirectAdd,
        results,
      });
      return;
    }

    await serveStaticFile(requestUrl.pathname, response);
  } catch (error) {
    const statusCode = error instanceof HttpError ? error.statusCode : 500;
    sendJson(response, statusCode, {
      error:
        error instanceof HttpError
          ? error.message
          : `Import mislukt. ${error.message || "Onbekende fout."}`,
    });
  }
});

server.listen(PORT, () => {
  console.log(`Plately draait op http://localhost:${PORT}`);
});
