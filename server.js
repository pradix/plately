const http = require("node:http");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");

// Load .env file if present (no external dependency needed)
try {
  const envPath = path.join(__dirname, ".env");
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && val) process.env[key] = val; // .env is altijd leidend als waarde niet leeg is
  }
} catch { /* no .env file — that's fine */ }
const crypto = require("node:crypto");
const zlib = require("node:zlib");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");
const gzipAsync = promisify(zlib.gzip);

// Embed the app icon as base64 so email clients don't block it as an external image
const _EMAIL_ICON_B64 = (() => {
  try {
    return fs.readFileSync(path.join(__dirname, "assets/icon-192.png")).toString("base64");
  } catch { return ""; }
})();
const _EMAIL_ICON_SRC = _EMAIL_ICON_B64
  ? `data:image/png;base64,${_EMAIL_ICON_B64}`
  : "https://plately.nl/assets/icon-192.png";

function buildOtpEmailHtml({ heading, intro, code, outro }) {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ebe3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe3;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:480px" cellpadding="0" cellspacing="0">

        <!-- Logo header -->
        <tr><td align="center" style="padding-bottom:24px">
          <img src="${_EMAIL_ICON_SRC}" alt="Plately" width="44" height="44"
               style="display:block;border-radius:12px;border:0" />
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#ffffff;border-radius:20px;padding:36px 36px 28px;box-shadow:0 2px 16px rgba(0,0,0,0.06)">

          <h1 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#1a1a1a;line-height:1.3">${heading}</h1>
          <p style="margin:0 0 28px;font-size:15px;color:#666;line-height:1.6">${intro}</p>

          <!-- Code box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
            <tr><td align="center" style="background:#f5f0ea;border-radius:14px;padding:24px 16px">
              <span style="font-size:38px;font-weight:800;letter-spacing:12px;color:#1a1a1a;font-variant-numeric:tabular-nums">${code}</span>
            </td></tr>
          </table>

          <p style="margin:0;font-size:13px;color:#999;line-height:1.6">${outro}</p>
        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding-top:24px">
          <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">
            © ${new Date().getFullYear()} Plately &nbsp;·&nbsp;
            <a href="https://plately.nl" style="color:#5a7a5e;text-decoration:none">plately.nl</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildWelcomeEmailHtml({ name }) {
  const greeting = name ? `Hoi ${name},` : "Hoi,";
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ebe3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe3;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:480px" cellpadding="0" cellspacing="0">
        <tr><td align="center" style="padding-bottom:24px">
          <img src="${_EMAIL_ICON_SRC}" alt="Plately" width="44" height="44"
               style="display:block;border-radius:12px;border:0" />
        </td></tr>
        <tr><td style="background:#ffffff;border-radius:20px;padding:36px 36px 28px;box-shadow:0 2px 16px rgba(0,0,0,0.06)">
          <h1 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#1a1a1a;line-height:1.3">Welkom bij Plately! 🎉</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.6">${greeting}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.6">Fijn dat je er bent! Met Plately bewaar je al je favoriete recepten op één plek en zet je ze eenvoudig om in een boodschappenlijst.</p>
          <p style="margin:0 0 28px;font-size:15px;color:#444;line-height:1.6">Importeer je eerste recept via een link en ontdek hoe makkelijk koken kan zijn.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
            <tr><td align="center">
              <a href="https://plately.nl" style="display:inline-block;background:#8da485;color:#fff;text-decoration:none;border-radius:14px;padding:14px 28px;font-size:15px;font-weight:600">Open Plately</a>
            </td></tr>
          </table>
          <p style="margin:0;font-size:13px;color:#999;line-height:1.6">Vragen of opmerkingen? Stuur ons een mail via <a href="mailto:hallo@plately.nl" style="color:#5a7a5e;text-decoration:none">hallo@plately.nl</a>.</p>
        </td></tr>
        <tr><td align="center" style="padding-top:24px">
          <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">
            © ${new Date().getFullYear()} Plately &nbsp;·&nbsp;
            <a href="https://plately.nl" style="color:#5a7a5e;text-decoration:none">plately.nl</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Lazy-loaded nodemailer (only when email is needed)
let _nodemailer = null;
function getNodemailer() {
  if (!_nodemailer) _nodemailer = require("nodemailer");
  return _nodemailer;
}

async function sendEmail({ to, subject, html, text }) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass) {
    // Resend fallback if configured
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL || "Plately <noreply@plately.app>", to: [to], subject, html }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
      return;
    }
    // No email service — log to console for dev
    console.log(`📧 [DEV] E-mail naar ${to}\nOnderwerp: ${subject}\n(Stel SMTP_HOST/SMTP_USER/SMTP_PASS in voor echte e-mails)`);
    return;
  }

  const nodemailer = getNodemailer();
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  await transporter.sendMail({ from, to, subject, html, ...(text ? { text } : {}) });
}

const ROOT_DIR = __dirname;
const execFileAsync = promisify(execFile);

const {
  ingredientTermMatchesProductTitle,
  ingredientMatchesAnyProductTerm,
  tokenizeForMatch,
  buildIngredientMatchTerms,
} = require(path.join(ROOT_DIR, "lib", "ah-ingredient-match.js"));

/** ISO tijd bij start Node-proces (voor deploy-status / logs). */
const SERVER_BOOT_AT_ISO = new Date().toISOString();
/** `plately-build` uit index.html (lezen bij boot). */
let CACHED_PLATELY_BUILD_META = "";
try {
  const idx = fs.readFileSync(path.join(ROOT_DIR, "index.html"), "utf8");
  const m = idx.match(/name=["']plately-build["']\s+content=["']([^"']+)["']/i);
  if (m) CACHED_PLATELY_BUILD_META = m[1].trim();
} catch (_) {
  // ignore
}

/**
 * Optioneel bestand geschreven door deploy-script (VPS), zodat commit/tijd zichtbaar zijn
 * zonder Render-env. Standaard: deploy-revision.json naast server.js, of PLATELY_DEPLOY_REVISION_FILE.
 * @returns {{ gitCommit: string, gitBranch: string, deployedAt: string|null, message: string|null }|null}
 */
function readPlatelyDeployRevision() {
  try {
    const overridePath = String(process.env.PLATELY_DEPLOY_REVISION_FILE || "").trim();
    const filePath = overridePath ? path.resolve(overridePath) : path.join(ROOT_DIR, "deploy-revision.json");
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const gitCommit = String(parsed.gitCommit || parsed.commit || "").trim();
    const gitBranch = String(parsed.gitBranch || parsed.branch || "").trim();
    const deployedAt = String(parsed.deployedAt || parsed.deployed_at || "").trim();
    const message = String(parsed.message || "").trim();
    if (!gitCommit && !gitBranch && !deployedAt && !message) return null;
    return { gitCommit, gitBranch, deployedAt: deployedAt || null, message: message || null };
  } catch {
    return null;
  }
}

/** Als deploy-revision.json en env ontbreken: probeer .git (cwd ROOT_DIR of PLATELY_GIT_DIR). */
function readGitWorktreeMeta() {
  try {
    const { execSync } = require("node:child_process");
    const gitCwd = String(process.env.PLATELY_GIT_DIR || "").trim() || ROOT_DIR;
    const opts = { cwd: gitCwd, encoding: "utf8", timeout: 8000, stdio: ["ignore", "pipe", "ignore"] };
    const head = String(execSync("git rev-parse HEAD", opts)).trim();
    const br = String(execSync("git rev-parse --abbrev-ref HEAD", opts)).trim();
    if (!/^[a-f0-9]{7,40}$/i.test(head)) return null;
    return { gitCommit: head, gitBranch: br || "HEAD" };
  } catch {
    return null;
  }
}

function buildPlatelyDeployInfoPayload() {
  const envCommit = String(process.env.RENDER_GIT_COMMIT || process.env.GIT_COMMIT || process.env.GIT_SHA || "").trim();
  const envBranch = String(process.env.RENDER_GIT_BRANCH || process.env.GIT_BRANCH || "").trim();
  const fileRev = readPlatelyDeployRevision();
  const gitMeta = readGitWorktreeMeta();
  const effectiveCommit = String(fileRev?.gitCommit || envCommit || gitMeta?.gitCommit || "").trim();
  const effectiveBranch = String(fileRev?.gitBranch || envBranch || gitMeta?.gitBranch || "").trim();
  const repoSlug = String(process.env.PLATELY_SOURCE_REPO || "pradix/plately")
    .trim()
    .replace(/^github\.com\//i, "")
    .replace(/^\//, "");
  const safeRepo = repoSlug.includes("/") ? repoSlug : "pradix/plately";
  const commitUrl =
    effectiveCommit && /^[a-f0-9]{7,40}$/i.test(effectiveCommit)
      ? `https://github.com/${safeRepo}/commit/${effectiveCommit}`
      : "";

  let lastPush = { source: null, gitCommit: "", gitBranch: "", deployedAt: null, message: null };
  if (fileRev && (fileRev.gitCommit || fileRev.gitBranch || fileRev.deployedAt || fileRev.message)) {
    lastPush = {
      source: "file",
      gitCommit: fileRev.gitCommit || envCommit || "",
      gitBranch: fileRev.gitBranch || envBranch || "",
      deployedAt: fileRev.deployedAt,
      message: fileRev.message,
    };
  } else if (envCommit || envBranch) {
    lastPush = { source: "env", gitCommit: envCommit || "", gitBranch: envBranch || "", deployedAt: null, message: null };
  } else if (gitMeta) {
    lastPush = {
      source: "git-worktree",
      gitCommit: gitMeta.gitCommit,
      gitBranch: gitMeta.gitBranch,
      deployedAt: null,
      message:
        "HEAD op deze server (.git). Zet deploy-revision.json (deploy-beta.sh) voor deploytijd en vaste registratie.",
    };
  }

  return {
    ok: true,
    clientBuild: CACHED_PLATELY_BUILD_META,
    serverBootedAt: SERVER_BOOT_AT_ISO,
    uptimeSeconds: Math.floor(process.uptime()),
    nodeEnv: process.env.NODE_ENV || "development",
    render: {
      serviceName: String(process.env.RENDER_SERVICE_NAME || "").trim(),
      externalUrl: String(process.env.RENDER_EXTERNAL_URL || "").trim(),
      gitCommit: effectiveCommit,
      gitBranch: effectiveBranch,
      commitUrl,
    },
    lastPush,
    displayTimeZone: "Europe/Amsterdam",
    database: { postgresEnabled: isPostgresEnabled() },
  };
}

function hostnameOnly(hostHeader) {
  return String(hostHeader || "").split(":")[0].trim().toLowerCase();
}

/**
 * HTML deploy-log alleen op beta / expliciet toegestane hosts (niet op productie-app domein).
 * Zet PLATELY_DEPLOY_STATUS_PAGE=1 om overal toe te staan, of PLATELY_DEPLOY_STATUS_HOSTS=host1,host2
 */
function isDeployStatusHtmlAllowed(hostHeader) {
  if (String(process.env.PLATELY_DEPLOY_STATUS_PAGE || "").trim() === "1") return true;
  const host = hostnameOnly(hostHeader);
  const extras = String(process.env.PLATELY_DEPLOY_STATUS_HOSTS || "")
    .split(/[,;]+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (extras.includes(host)) return true;
  if (host === "beta.plately.nl") return true;
  if (process.env.NODE_ENV !== "production") return true;
  return false;
}

function computeDefaultDataDir() {
  if (process.env.DATA_DIR) return path.resolve(process.env.DATA_DIR);
  if (process.env.NODE_ENV === "production") return "/data";
  return path.join(ROOT_DIR, "data");
}

// Wordt na start gevalideerd / verplaatst als schrijven op /data niet lukt (Render zonder disk).
let DATA_DIR = computeDefaultDataDir();
let DATA_FILE = path.join(DATA_DIR, "plately-db.json");
let OTP_FILE = path.join(DATA_DIR, "plately-otps.json");

async function loadOtps() {
  try {
    const raw = await fsp.readFile(path.join(DATA_DIR, "plately-otps.json"), "utf8");
    const parsed = JSON.parse(raw);
    // Prune expired entries on load
    const now = Date.now();
    for (const key of Object.keys(parsed)) {
      if (!parsed[key]?.expiresAt || now > new Date(parsed[key].expiresAt).getTime()) {
        delete parsed[key];
      }
    }
    return parsed;
  } catch {
    return {};
  }
}

async function saveOtps(otps) {
  try {
    await fsp.writeFile(path.join(DATA_DIR, "plately-otps.json"), JSON.stringify(otps), "utf8");
  } catch (err) {
    console.error("❌ OTP opslaan mislukt:", err?.message);
  }
}

let resolveDataPathsPromise = null;

async function resolveWritableDataPathsOnce() {
  if (!resolveDataPathsPromise) {
    resolveDataPathsPromise = (async () => {
      const explicit = Boolean(process.env.DATA_DIR);
      const primary = computeDefaultDataDir();
      const fallbacks =
        explicit
          ? [primary]
          : process.env.NODE_ENV === "production"
            ? [primary, path.join(ROOT_DIR, "data"), path.join(os.tmpdir(), "plately-data")]
            : [primary];

      async function probe(dir) {
        await fsp.mkdir(dir, { recursive: true });
        const p = path.join(dir, `.plately-write-${process.pid}-${Date.now()}`);
        await fsp.writeFile(p, "1", "utf8");
        await fsp.unlink(p);
        return dir;
      }

      let lastErr = null;
      for (const dir of fallbacks) {
        try {
          await probe(dir);
          if (!explicit && dir !== primary) {
            console.warn(`📁 Primary data dir (${primary}) not usable — using ${dir}`);
          }
          DATA_DIR = dir;
          DATA_FILE = path.join(DATA_DIR, "plately-db.json");
          console.log(`📁 DATA_DIR: ${DATA_DIR}`);
          console.log(`📄 DATA_FILE: ${DATA_FILE}`);
          console.log(`🌍 NODE_ENV: ${process.env.NODE_ENV}`);
          return;
        } catch (e) {
          lastErr = e;
        }
      }
      console.error(`❌ Geen beschrijfbaar DATA_DIR; laatste fout: ${lastErr?.message || lastErr}`);
    })();
  }
  return resolveDataPathsPromise;
}

console.log(`🌍 NODE_ENV: ${process.env.NODE_ENV}`);

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
const META_APP_ID = process.env.META_APP_ID || "";
const META_APP_SECRET = process.env.META_APP_SECRET || "";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const DATABASE_URL = process.env.DATABASE_URL || "";
/** Services ID (bv. nl.plately.web) — Sign in with Apple, alleen met DATABASE_URL */
const APPLE_CLIENT_ID = String(process.env.APPLE_CLIENT_ID || "").trim();
/** Moet exact overeenkomen met een Return URL in Apple Developer (default: origin + /) */
const APPLE_REDIRECT_URI = String(process.env.APPLE_REDIRECT_URI || "").trim();
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "";

let webPushModule = null;

const importErrors = [];
const IMPORT_ERRORS_MAX = 100;

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
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
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
  accept: "*/*",
  "accept-language": "nl-NL,nl;q=0.9,en-GB;q=0.8,en;q=0.7",
};

/** Correleert alle logregels voor één `/api/import`-aanvraag (grep op traceId). */
function newImportTraceId() {
  return `imp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 11)}`;
}

function shortenUrlForLog(url, maxLen = 180) {
  const s = String(url || "").trim();
  if (!s) return "";
  return s.length <= maxLen ? s : `${s.slice(0, maxLen)}…`;
}

function logImportRequest(phase, traceId, details = {}) {
  try {
    console.log("[import]", { phase, traceId, ...details });
  } catch {
    console.log("[import]", phase, traceId);
  }
}

function isAllowedImageProxyUrl(rawUrl) {
  try {
    const u = new URL(rawUrl);
    if (u.protocol !== "https:") return false;
    // Only allow known safe image CDNs / publishers (avoid SSRF).
    const host = u.hostname.toLowerCase();
    const ALLOW_HOSTS = new Set([
      "static.ah.nl",
      "www.lekkerensimpel.com",
      "lekkerensimpel.com",
      "www.lekkeren-simpel.nl",
      "lekkeren-simpel.nl",
      "www.eefkooktzo.nl",
      "eefkooktzo.nl",
      "miljuschka.nl",
      "www.miljuschka.nl",
      "static.24kitchen.nl",
      "cdn.24kitchen.nl",
      "www.24kitchen.nl",
      "24kitchen.nl",
      "uitpaulineskeuken.nl",
      "www.uitpaulineskeuken.nl",
      "www.chickslovefood.com",
      "chickslovefood.com",
      "www.laurasbakery.nl",
      "laurasbakery.nl",
      "www.culy.nl",
      "culy.nl",
      "img.culy.nl",
      // Common WordPress image CDN used by many recipe blogs
      "i0.wp.com",
      "i1.wp.com",
      "i2.wp.com",
      "i3.wp.com",
      "s0.wp.com",
    ]);
    if (ALLOW_HOSTS.has(host)) return true;
    // Allow subdomains of static.ah.nl (defensive; usually not needed)
    if (host.endsWith(".static.ah.nl")) return true;
    // Serper / Google SERP thumbnails voor kanaalzoek
    if (host.endsWith(".googleusercontent.com") || host.endsWith(".gstatic.com")) return true;
    return false;
  } catch {
    return false;
  }
}

function isDecorativeImageUrl(url) {
  return /favicon|apple-touch-icon|logo/i.test(url);
}

function cleanImageUrl(url) {
  const cleaned = decodeHtmlEntities(String(url || "").trim())
    .replace(/[\\'"]+$/g, "")
    .replace(/\s+/g, "");
  if (cleaned.startsWith("//")) return `https:${cleaned}`;
  return cleaned;
}

function getHtmlAttr(tag, attrName) {
  const match = String(tag || "").match(new RegExp(`${attrName}\\s*=\\s*["']([^"']+)["']`, "i"));
  return match ? decodeHtmlEntities(match[1]) : "";
}

function normalizeImageMatchKey(value) {
  return decodeHtmlEntities(stripHtmlTags(value || ""))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function pickLargestSrcsetImage(srcset) {
  const candidates = String(srcset || "")
    .split(",")
    .map((part) => {
      const [rawUrl, rawWidth = ""] = part.trim().split(/\s+/);
      const url = cleanImageUrl(rawUrl);
      const width = Number((rawWidth.match(/(\d+)w/) || [])[1] || 0);
      const dimensionWidth = Number((url.match(/_(\d{3,4})x\d{3,4}_/i) || [])[1] || 0);
      return { url, width: width || dimensionWidth };
    })
    .filter((item) => item.url && /static\.ah\.nl/i.test(item.url) && !isDecorativeImageUrl(item.url));

  candidates.sort((a, b) => b.width - a.width);
  return candidates[0]?.url || "";
}


/** Hosts waarvan images CF-blocked zijn voor datacenter-IPs — fetchen via ZenRows. */
const CF_BLOCKED_IMAGE_HOSTS = new Set([
  "miljuschka.nl",
  "www.miljuschka.nl",
  "www.eefkooktzo.nl",
  "eefkooktzo.nl",
  "www.culy.nl",
  "culy.nl",
  "img.culy.nl",
]);

/** Leid Content-Type af uit de URL-extensie (ZenRows geeft text/plain terug voor binary). */
function imageContentTypeFromUrl(url) {
  const ext = String(url || "").toLowerCase().match(/\.(jpe?g|png|webp|gif|avif|svg)(?:\?|#|$)/);
  if (!ext) return "application/octet-stream";
  const map = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", avif: "image/avif", svg: "image/svg+xml" };
  return map[ext[1]] || "application/octet-stream";
}

function buildSimpleHtmlPage(title, bodyHtml) {
  return `<!DOCTYPE html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{font-family:system-ui,sans-serif;max-width:680px;margin:40px auto;padding:0 20px;color:#1a1a1a;line-height:1.6}h1{font-size:1.6rem;margin-bottom:.25em}h2{font-size:1.1rem;margin-top:2em}a{color:#4a6b4c}ul,ol{padding-left:1.4em}li{margin:.3em 0}</style></head><body>${bodyHtml}</body></html>`;
}

async function proxyImage(requestUrl, response) {
  const raw = requestUrl.searchParams.get("url") || "";
  if (!raw || !isAllowedImageProxyUrl(raw)) {
    sendJson(response, 400, { ok: false, error: "Invalid image url." });
    return;
  }
  try {
    let parsedHost = "";
    try { parsedHost = new URL(raw).hostname.toLowerCase(); } catch {}
    const apiKey = sanitizeText(process.env.ZENROWS_API_KEY || "").trim();
    const useZenRows = apiKey && CF_BLOCKED_IMAGE_HOSTS.has(parsedHost);

    let buffer = null;
    let contentType = "";

    if (useZenRows) {
      // ZenRows accepteert GET en geeft binary terug, maar met content-type text/plain.
      // Géén antibot=true: dat breekt image-fetches (422). premium_proxy alleen volstaat.
      // ZenRows is intermitterend (~30-40% failure rate gemeten op image-URLs);
      // tot 3 retries met backoff verhoogt slagingskans naar ~99%.
      const zenUrl = `https://api.zenrows.com/v1/?apikey=${encodeURIComponent(apiKey)}&url=${encodeURIComponent(raw)}&premium_proxy=true`;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const upstream = await fetch(zenUrl, { signal: AbortSignal.timeout(20000) });
          if (upstream.ok) {
            const buf = Buffer.from(await upstream.arrayBuffer());
            if (buf.length >= 200) {
              buffer = buf;
              contentType = imageContentTypeFromUrl(raw);
              break;
            }
          }
        } catch {
          /* retry */
        }
        if (attempt < 2) await new Promise((r) => setTimeout(r, 600));
      }
    }

    // Fallback: direct fetch (voor niet-CF-blocked hosts of als ZenRows faalt).
    if (!buffer) {
      const upstream = await fetch(raw, {
        headers: {
          ...FETCH_HEADERS,
          accept: "image/jpeg,image/png,image/webp,image/*,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!upstream.ok) {
        sendJson(response, 502, { ok: false, error: `Upstream error (${upstream.status})` });
        return;
      }
      contentType = upstream.headers.get("content-type") || imageContentTypeFromUrl(raw);
      buffer = Buffer.from(await upstream.arrayBuffer());
    }

    response.writeHead(200, {
      ...HTTP_HEADERS,
      "Content-Type": contentType,
      // Cache proxied images aggressively; they're immutable URLs on the CDN.
      "Cache-Control": "public, max-age=604800, immutable",
    });
    response.end(buffer);
  } catch (err) {
    sendJson(response, 502, { ok: false, error: "Image proxy failed." });
  }
}

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
  /\b(avocado|tomaat|ui|knoflook|kaas|kip|pasta|olie|citroen|koriander|sla|paprika|room|ei|eieren|melk|honing|boter|brood|rijst|zalm|champignon|courgette|spinazie|yoghurt|bloem|suiker|bouillon|peper|zout|salt|pepper|cheese|garlic|onion|egg|rice|bread|flour|butter|cream|lemon|lime|chicken|beef|pork|salmon|shrimp|tomato|potato|beans|lentils|tofu|mushroom|parsley|basil|oregano|cumin|mayonnaise|mayo|sauce|aubergine|bloemkool|broccoli|wortel|selderij|komkommer|paprika|rode|groene|gele|pimiento|rode|witte|bloemkool|bleekselderij|rucola|andijvie|radicchio|witlof|aardappel|zoete|bataat|zwam|eekhoorntjesbrood|ostermossel|inktvis|kabeljauw|schol|tong|forel|baars|paling|gerookt|geraspte|gesneden|fijngehakt|mager|vol|volle|magere|halfvolle|verse|bevroren|ingevroren|gezouten|gerookt|gegrild|gebakken|gekookt|gekookte|instantnoodles|noodles|spaghetti|fettuccini|penne|rigatoni|lasagna|lasagne|macaroni|ravioli|tortellini|risotto|couscous|bulgur|quinoa|haver|muesli|granola|meel|maïzena|bloem|tapioca|polenta|linzen|kikkererwten|snijbonen|tuinbonen|doperwten|erwten|linzen|rode|groene|bruine|onderslagerbonen|abrikoos|aardbei|blauwe|bosbes|framboze|braam|kers|kiwi|mango|papaja|ananas|banaan|appel|peer|druif|watermeloen|meloen|sinaasappel|grapefruit|limoen|augurkje|olijf|kappertjes|ansjovis|tomatenpuree|tomatensaus|rode|witte|balsamico|appelazijn|rijstazijn|honing|stroop|melasse|rietsuiker|bruinsuiker|vanille|vanille-essence|kaneel|kruidnagel|muskaat|gemberpoeder|mosterd|worcestershiresaus|tabasco|pittig|mild|warm|heet|chilisaus|sojasaus|tamari|teriyaki|ketjap|pindakaas|tahini|hummus|avocado-olie|sesam-olie|walnoot-olie|pompoenpitolie|arachideolie|zonnebloemolie|maïsolie|slaaolie|boter|margarine|kokosboter|reuzel|schmaltz|ansjovis|kappertjes|olijven|onderzetjes|augurken|zuurkoolsla|rode|witte|gemarineerde|geconserveerde|vers|gedroogd|gerookt|ingelegd|gekonfijt|gegrild|geroosterd|gebakken|gekookt|ruw|zacht|stevig|kruimig|stijf|luchtig|schuimig|romig|glad|ruw|klonterig|dun|dik|stroperig|schoon|kleurrijk|smakelijk|gezond|voedzaam|lekker)\b/i;
const NON_FOOD_INGREDIENT_PATTERN =
  /\b(keukenpapier|bakpapier|sat[ée]prikkers?|cocktailprikkers?|aluminiumfolie|folie|servetten?|touw|spiesen?|prikker|tandpasta|tandgel|tandenborstel|mondspoeling|floss|shampoo|conditioner|douchegel|bodylotion|bodywash|handlotion|handcrème|zeep|vloeibare\s+zeep|wasmiddel|vaatwasmiddel|afwasmiddel|schoonmaakmiddel|allesreiniger|wc-reiniger|toiletblok|deodorant|anti-transpirant|parfum|eau\s+de|aftershave|scheerschuim|scheermesje?|scheergel|mascara|make-?up|foundation|lipstick|lippenstift|nagellak|zonnebrand|sunscreen|moisturizer|dagcrème|nachtcrème|toiletpapier|wc-papier|tissues?|wegwerpluier|maandverband|tampon|batterij(?:en)?|gloeilamp(?:en)?|spaarlamp|led-lamp|vuilniszak(?:ken)?|afvalzak|handdoek(?:en)?|washandje?|spons|sponzen|schuurspons|dweil|stofdoek)\b/i;

/** Keukengerei dat soms als “ingredient” uit recepttekst komt — hoort niet in de boodschappenlijst-import. */
const KITCHEN_TOOL_INGREDIENT_RE =
  /\b(?:knoflookpers|knoflook\s+[~-–]?\s*pers|garlic\s+press|(?:grill|grilles)[\s~-–]*pan(?:nen?)?|grillpan(?:nen?)?|(?:oven|bak)[\s~-–]+(?:schaal(?:en)?|bakplaat(?:en)?)|(?:oven|bak)schaal(?:en)?|ovenschalen?|ovenschotels?|siliconen(?:e)?\s*bakmat|staafmixer|(?:hand|keuken)?mixer)\b/i;

/**
 * AH-zoekresultaten worden consistenter bij enkelvoud (tomaten/aubergines/courgettes → singular).
 * Alleen veilige lemma’s — geen blinde `-en`/`-s`-strip (anders “gehakt”, “bouillon”, … ).
 */
function singularizeDutchIngredientPhraseForSearch(phrase) {
  let s = sanitizeText(String(phrase || "").toLowerCase()).replace(/\s+/g, " ").trim();
  if (!s) return s;

  /** Langste eerst zodat `cherrytomaten` niet als `tomaten` gematcht wordt. */
  const PLURAL_TO_SINGULAR = [
    ["cherrytomaten", "cherrytomaat"],
    ["kerstomaten", "kerstomaat"],
    ["tomaten", "tomaat"],
    ["rode paprika's", "rode paprika"],
    ["groene paprika's", "groene paprika"],
    ["gele paprika's", "gele paprika"],
    ["oranje paprika's", "oranje paprika"],
    ["puntpaprika's", "puntpaprika"],
    ["blauwe bessen", "blauwe bes"],
    ["braambessen", "braam"],
    ["courgettes", "courgette"],
    ["zucchinis", "zucchini"],
    ["aubergines", "aubergine"],
    ["komkommers", "komkommer"],
    ["paprika's", "paprika"],
    ["paprikas", "paprika"],
    ["aardappeltjes", "aardappel"],
    ["aardappelen", "aardappel"],
    ["worteltjes", "wortel"],
    ["wortelen", "wortel"],
    ["uitjes", "ui"],
    ["uien", "ui"],
    ["sjalotten", "sjalot"],
    ["champignons", "champignon"],
    ["olijven", "olijf"],
    ["eieren", "ei"],
    ["citroenen", "citroen"],
    ["limoenen", "limoen"],
    ["sinaasappels", "sinaasappel"],
    ["frambozen", "framboos"],
    ["pruimen", "pruim"],
    ["appels", "appel"],
    ["peren", "peer"],
  ].sort((a, b) => b[0].length - a[0].length);

  for (const [plural, singular] of PLURAL_TO_SINGULAR) {
    const re = new RegExp(`(^|\\s)${plural.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=\\s|$)`, "gi");
    s = s.replace(re, `$1${singular}`);
  }

  return s.replace(/\s+/g, " ").trim();
}

// ── Ingredient search normalisation ──────────────────────────────────────────
// Strips quantities, descriptors and maps variants to the best AH search term.
function normalizeIngredientForSearch(raw) {
  let t = (raw || "").toLowerCase().trim();

  // Typo's / OCR: “kom kommer”, “kom kommmer” → komkommer (AH catalogue uses one word).
  if (/\bkom\s+kom+m?ers?\b/i.test(t)) {
    t = t.replace(/\bkom\s+kom+m?ers?\b/gi, "komkommers");
  } else if (/\bkom\s+kom+m?er\b/i.test(t)) {
    t = t.replace(/\bkom\s+kom+m?er\b/gi, "komkommer");
  }

  // 1. Strip leading numeric quantity + optional unit
  t = t.replace(
    /^[\d\s½¼¾.,/]+\s*(?:g|gr|kg|mg|ml|dl|cl|l\b|el|tl|tbsp|tsp|oz|lb|stuks?|stuk(?:ken)?|krop(?:pen)?|bosje[s]?|zakje[s]?|pot(?:je[s]?)?|blik(?:je[s]?)?|eetlepels?|theelepels?|teentje[s]?|teen(?:en)?|scheutje?|plak(?:je[s]?)?|handje[s]?|stengels?|snufje?|takje[s]?|blaadje[s]?|filets?|reepje[s]?|blokje[s]?)?\s+/i,
    ""
  );

  // 2. Strip leading colour/state descriptors (repeat for double descriptors)
  const DESC =
    /^(vers(?:e|en)?|biologisch(?:e)?|bio|extra\s+vierge?|extra\s+vergine|extra|groot(?:e)?|klein(?:e)?|fijn(?:gesneden)?|grof(?:gesneden)?|gesneden|gehakt(?:e)?|geraspte?|gedroogde?|gezouten?|gepeld(?:e)?|ongepeld(?:e)?|gewassen?|rood(?:e)?|groen(?:e)?|geel(?:e)?|wit(?:te)?|zwart(?:e)?|halve?|half\s+een|volle?|magere?|licht(?:e)?|geroosterd(?:e)?|gebakken|gekookt(?:e)?|rauw(?:e)?|zacht(?:e)?|koud(?:e)?|warm(?:e)?|in\s+reepjes|in\s+blokjes)\s+/i;
  t = t.replace(DESC, "").replace(DESC, "").trim();

  // 2a. Strip common trailing / inline cooking descriptors ("naar smaak", "optioneel", etc.)
  t = t
    .replace(/\b(naar\s+smaak|om\s+te\s+serveren|ter\s+garnering|optioneel|evt\.?|eventueel|zo\s+nodig|voor\s+erbij)\b/gi, "")
    .replace(/\s*,\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // 2b. A few high-impact Dutch webshop normalizations
  if (/^sinaasappels?$/.test(t)) return "handsinaasappel";
  if (/^gelatine$/.test(t)) return "gelatine blaadjes";
  if (/\bespresso\b/.test(t) && !/\bcapsules?\b/.test(t)) return "espresso";
  if (/\b(ongeklopte|ongeklopt)\s+(slagroom|room)\b/.test(t)) return "slagroom";

  // 3. Pasta-type normalisation (the big one)
  if (/\bspaghetti\b/.test(t)) return "spaghetti";
  if (/\bpenne\b/.test(t))      return "penne";
  if (/\bfusilli\b/.test(t))    return "fusilli";
  if (/\bfarfalle\b/.test(t))   return "farfalle";
  if (/\brigatoni\b/.test(t))   return "rigatoni";
  if (/\blinguine\b/.test(t))   return "linguine";
  if (/\btagliatelle\b/.test(t))return "tagliatelle";
  if (/\bfettuccine\b/.test(t)) return "fettuccine";
  if (/\bconchiglie\b/.test(t)) return "pasta";
  if (/\brotini\b/.test(t))     return "pasta";
  if (/\bmacaroni\b/.test(t))   return "macaroni";
  if (/\bbucatini\b/.test(t))   return "pasta";
  if (/\borecchiette\b/.test(t))return "pasta";
  if (/\btortellini\b/.test(t)) return "tortellini";
  if (
    /\blasagne\s+bladen?\b|\blasagnebladen?\b|\blasagna\s+sheets?\b|\blasagne\s+vellen\b|\blasagne\s+blad\b/i.test(
      t
    )
  ) {
    return "lasagne bladen";
  }

  // Bechamel / witte saus (typo's + varianten)
  if (/\bbechamelsaus\b|\bbechamel\b|becahamelsaus|becahamel/i.test(t)) return "bechamelsaus";

  // 4. Rice
  if (/\b(basmati|jasmijn|jasmine|zilvervlies|bruine|volkoren)\s*rijst/.test(t)) return "rijst";
  if (/\b(arborio|carnaroli|risotto\s*rijst)/.test(t)) return "risottorijst";

  // 5. Bouillon / stock
  const bouillonMatch = t.match(/\b(kip(?:pen)?|groente|vlees|vis|rund(?:er)?)\s*bouillon/);
  if (bouillonMatch) return `${bouillonMatch[1].replace("pen","").replace("er","")} bouillon`.trim();
  if (/bouillon(?:\s*blokje)?/.test(t)) return "bouillon";

  // 6. Oils
  if (/olijfolie/.test(t)) return "olijfolie";
  if (/zonnebloemolie/.test(t)) return "zonnebloemolie";
  if (/sesamolie/.test(t)) return "sesamolie";
  if (/kokosolie/.test(t)) return "kokosolie";

  // 6a. Pantry seasonings: prefer canonical cooking variants
  // Keep conservative and exact to avoid false positives (e.g. "zoutjes", "pepernoten").
  if (/^zout$/.test(t)) return "keukenzout";
  if (/^peper$/.test(t)) return "zwarte peper";

  // 7. Tomato variants (enkelvoud beter voor AH-zoekresultaten)
  if (/kerstomaatje|cherrytomaat|cherrytomaten/.test(t)) return "cherrytomaat";
  if (/zongedroogde.*tomaten?/.test(t))     return "zongedroogde tomaten";
  if (/\b(gezeefde|gepureerde|gehakte|ingeblikte)\s*tomaten?/.test(t)) return "tomaten gepeld";

  // 8. Onion/garlic
  if (/knoflookteen|teentje.*knoflook/.test(t)) return "knoflook";
  if (/\b(rode|gele|witte|zilver)\s*ui\b/.test(t)) return "ui";
  if (/sjalot/.test(t)) return "sjalot";
  if (/lente.?ui/.test(t)) return "lente-ui";

  // 8b. Gember: los zoeken op "gember" treft vaak bier/koek/siroop — duw naar verse knol / poeder expliciet
  if (/^gember$/.test(t)) return "verse gember";
  if (/^verse\s+gember$/.test(t)) return "verse gember";
  if (/\bgemberpoeder\b/.test(t) || /\bgemalen\s+gember\b/.test(t)) return "gemberpoeder";

  // 9. Cheese
  if (/\b(parmigiano(?:\s+reggiano)?|parmigiana|parmezaan(?:se)?(?:\s+kaas)?)\b/.test(t))
    return "parmezaanse kaas";
  if (/\bgrana\s*padano\b/.test(t)) return "grana padano";
  if (/pecorino/.test(t)) return "pecorino";
  if (/\bpecorino\s+romano\b/.test(t)) return "pecorino";
  if (/mozzarella/.test(t)) return "mozzarella";
  if (/burrata/.test(t)) return "burrata";

  // 10. Strip parenthetical notes: "kip (zonder bot)" → "kip"
  t = t.replace(/\s*\([^)]*\)/g, "").trim();

  // 10b. Winkelzoek enkelvoud: aubergines → aubergine, tomaten → tomaat (veilige mapping only)
  t = singularizeDutchIngredientPhraseForSearch(t);

  // 11. Cap at 3 words to avoid overly specific queries
  const words = t.split(/\s+/).filter((w) => w.length > 1);
  return words.slice(0, 3).join(" ");
}
const UNIT_PATTERN =
  "(?:x|g|gr|kg|mg|ml|l|cl|dl|el|tl|tbsp|tsp|cup|cups|oz|lb|stuks?|stuk(?:ken)?|krop|kroppen|bosje|bosjes|zakje|zakjes|pot(?:je|jes)?|blik(?:je|jes)?|liter|snuf(?:je|jes)?|snuif(?:je|jes)?|teen|teentje|teentjes|tenen|plak(?:je|jes)?|gram|grams|milliliter|eetlepel(?:s)?|theelepel(?:s)?|handje|handjes|scheut(?:je)?|bakje|bakjes|verpakking(?:en)?|pak(?:ken)?|rollen?|rol|bunch|clove|cloves|pinch|slices?|stengel|stengels|takje|takjes|blokje|blokjes|blaadje|blaadjes|blad|bladeren|reepje|reepjes|filet|filets)";
const QUANTITY_PATTERN = "(?:\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+(?:[.,]\\d+)?)";
const TIKTOK_CAPTION_FIELD_PATTERN = /(desc|description|caption|shareDesc|seoDesc|text|content)/i;
const TIKTOK_TITLE_FIELD_PATTERN = /(title|shareTitle|seoTitle|recipeName|name)/i;

const DEFAULT_PROFILE = {
  name: "",
  handle: "",
  favoriteSupermarket: "ah",
  gender: "",
  birthDate: "",
};

const DEFAULT_COOKBOOKS = [
  { id: "cookbook-1", name: "Gezond & Fit", recipeIds: ["recipe-3", "recipe-9"] },
  { id: "cookbook-2", name: "Snelle avonden", recipeIds: ["recipe-1", "recipe-2", "recipe-6"] },
  { id: "cookbook-3", name: "Comfort Food", recipeIds: ["recipe-5", "recipe-10"] },
  { id: "cookbook-4", name: "Ontbijt inspiratie", recipeIds: ["recipe-6", "recipe-8"] },
];

// Keep in sync with frontend `SEED_CHANNELS` for admin display / resolving names.
/** WordPress sites met harde bot/WAF-blokkade: scraping + WP-REST falen op VPS; optioneel Serper site:-fallback. */
const CHANNEL_SEARCH_SERPER_FALLBACK_IDS = new Set(["ch-ah", "ch-mj", "ch-ek"]);
/** WP REST API eerst proberen vóór HTML-scrape: Cloudflare blokkeert HTML-zoekpagina's vaker dan JSON-endpoints. */
const SEARCH_WP_REST_FIRST_IDS = new Set(["ch-mj", "ch-ek"]);

/**
 * Miljuschka/Eef (seed) + admin “nieuw kanaal” / user custom (ch-preview-*, ch-custom-*): zelfde Cloudflare-probleem.
 * Zonder Serper (`SERPER_API_KEY`) geeft de server vaak 0 resultaten terwijl de site in de browser wel treffers heeft.
 */
function channelIdUsesSerperFallback(channelId) {
  const id = String(channelId || "");
  if (CHANNEL_SEARCH_SERPER_FALLBACK_IDS.has(id)) return true;
  if (id.startsWith("ch-preview-") || id.startsWith("ch-custom-")) return true;
  return false;
}

/**
 * Kanalen waar zoekresultaten uit de eigen site-index komen; titels herhalen het zoekwoord niet altijd
 * (bv. query „surinaamse” → „Klassieke roti zelf maken”).
 * Miljuschka / Eef: vaak Serper Google `site:` hits — titel/snippet komen van Google, geen strikte woordmatch.
 */
const CHANNEL_SEARCH_TRUST_SITE_INDEXER_IDS = new Set(["ch-ah", "ch-clf", "ch-mj", "ch-ek"]);

const SEED_CHANNELS = [
  { id: "ch-ah", name: "Allerhande" },
  { id: "ch-24k", name: "24 Kitchen" },
  { id: "ch-ek", name: "Eef Kookt Zo" },
  { id: "ch-mj", name: "Miljuschka" },
  { id: "ch-up", name: "Uit Paulines Keuken" },
  { id: "ch-clf", name: "Chicks Love Food" },
  { id: "ch-les", name: "Lekker & Simpel" },
  { id: "ch-lb", name: "Laura's Bakery" },
  { id: "ch-jumbo", name: "Jumbo" },
  { id: "ch-culy", name: "Culy" },
  { id: "ch-fm", name: "Foodies Magazine" },
];

function loadStaticJsonArray(relPath, fallback = []) {
  try {
    const abs = path.join(ROOT_DIR, String(relPath || ""));
    const raw = fs.readFileSync(abs, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((s) => sanitizeText(s)).filter(Boolean) : fallback;
  } catch {
    return fallback;
  }
}

// These are used for admin SEO backfills so public recipe pages are seeded from real search intent.
// Shared with the client via static asset for consistency.
// The NL keyword JSON is curated for dish/cuisine-style queries (not diet macros or “vrije” filters).
const SEO_RECIPE_BACKFILL_KEYWORDS = loadStaticJsonArray("assets/seo-recipe-keywords.nl.json", [
  "Pasta",
  "Kip",
  "Lasagne",
  "Nasi",
  "Bami",
  "Budget",
  "Mealprep",
  "Ovenschotel",
  "Soep",
  "Salade",
]);

// Seed channel search defaults (admin can override baseUrl / searchUrlTemplate).
// - baseUrl: used for WP REST and for building absolute links in scrapers
// - searchUrlTemplate: URL with `{q}` placeholder where q is encodeURIComponent(query)
const SEED_CHANNEL_DEFAULTS = {
  "ch-ah": {
    baseUrl: "https://www.ah.nl/allerhande",
    searchUrlTemplate: "https://www.ah.nl/allerhande/recepten-zoeken?query={q}",
  },
  "ch-jumbo": {
    baseUrl: "https://www.jumbo.com",
    searchUrlTemplate: "https://www.jumbo.com/recepten/zoeken?searchTerms={q}",
  },
  "ch-les": {
    baseUrl: "https://www.lekkerensimpel.com",
    searchUrlTemplate: "https://www.lekkerensimpel.com/?s={q}&maaltijd=all&gerecht=all",
  },
  "ch-lb": {
    baseUrl: "https://www.laurasbakery.nl",
    searchUrlTemplate: "https://www.laurasbakery.nl/zoeken/?_search={q}",
  },
  "ch-ek": {
    baseUrl: "https://www.eefkooktzo.nl",
    searchUrlTemplate: "https://www.eefkooktzo.nl/?s={q}",
  },
  "ch-clf": {
    baseUrl: "https://www.chickslovefood.com",
    searchUrlTemplate: "https://www.chickslovefood.com/?s={q}",
  },
  "ch-culy": {
    baseUrl: "https://www.culy.nl",
    searchUrlTemplate: "https://www.culy.nl/?s={q}&category=Recepten",
  },
  "ch-mj": {
    baseUrl: "https://miljuschka.nl",
    searchUrlTemplate: "https://miljuschka.nl/?s={q}",
  },
  "ch-24k": {
    baseUrl: "https://www.24kitchen.nl",
    searchUrlTemplate: "https://www.24kitchen.nl/recepten/zoeken?q={q}&size=n_12_n",
  },
  "ch-up": {
    baseUrl: "https://uitpaulineskeuken.nl",
    searchUrlTemplate: "https://uitpaulineskeuken.nl/zoeken?_search_keyword=<zoekwoord>&_search_posttypes=pauline_recepten",
  },
  "ch-fm": {
    baseUrl: "https://www.foodiesmagazine.nl",
    searchUrlTemplate: "https://www.foodiesmagazine.nl/zoeken/?_sf_s={q}&post_types=recept",
  },
};

function normalizeChannelUrlForCompare(url) {
  const raw = sanitizeText(url || "").trim();
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

function getWebPush() {
  if (webPushModule) {
    return webPushModule;
  }
  try {
    webPushModule = require("web-push");
    return webPushModule;
  } catch {
    throw new HttpError(500, "Dependency 'web-push' ontbreekt. Run: npm install");
  }
}

function ensureWebPushConfigured() {
  const webPush = getWebPush();
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_SUBJECT) {
    throw new HttpError(
      500,
      "Web Push is niet geconfigureerd. Zet VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY en VAPID_SUBJECT in de env."
    );
  }
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  return webPush;
}

function sanitizePushSubscription(subscription) {
  const endpoint = String(subscription?.endpoint || "").trim();
  const keys = subscription?.keys && typeof subscription.keys === "object" ? subscription.keys : {};
  const p256dh = String(keys?.p256dh || "").trim();
  const auth = String(keys?.auth || "").trim();
  if (!endpoint || !endpoint.startsWith("https://")) {
    throw new HttpError(400, "Ongeldige push subscription endpoint.");
  }
  if (!p256dh || !auth) {
    throw new HttpError(400, "Ongeldige push subscription keys.");
  }
  return { endpoint, keys: { p256dh, auth } };
}

const PUSH_CATEGORIES = Object.freeze({
  features: "Nieuwe functies",
  ah: "AH & boodschappen",
  cookmode: "Kookstand tips",
});

function defaultPushPrefs() {
  return {
    categories: {
      features: true,
      ah: false,
      cookmode: false,
    },
    triggers: {
      ahBasketReady: false,
      ahBonus: false,
    },
  };
}

function sanitizePushPrefs(input) {
  const raw = input && typeof input === "object" ? input : {};
  const rawCats = raw.categories && typeof raw.categories === "object" ? raw.categories : {};
  const rawTriggers = raw.triggers && typeof raw.triggers === "object" ? raw.triggers : {};
  const out = defaultPushPrefs();
  out.categories.features = Boolean(rawCats.features);
  out.categories.ah = Boolean(rawCats.ah);
  out.categories.cookmode = Boolean(rawCats.cookmode);
  out.triggers.ahBasketReady = Boolean(rawTriggers.ahBasketReady);
  out.triggers.ahBonus = Boolean(rawTriggers.ahBonus);
  return out;
}

function ensureAnonIdCookie(request, response) {
  const cookies = parseCookies(request.headers.cookie);
  let anon = String(cookies.plately_anon || "").trim();
  if (anon) {
    return anon;
  }
  anon = crypto.randomBytes(18).toString("hex");
  appendSetCookie(
    response,
    serializeCookie("plately_anon", anon, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
      maxAge: 60 * 60 * 24 * 365,
    })
  );
  return anon;
}

async function resolvePushIdentity(request, response) {
  let authUser = await getAuthenticatedUser(request).catch(() => null);
  if (!authUser && !isPostgresEnabled()) {
    authUser = await getDevAuthenticatedUser(request).catch(() => null);
  }
  if (authUser?.id || authUser?.email) {
    return { userId: String(authUser.id || ""), email: sanitizeText(authUser.email || "") };
  }
  if (!isPostgresEnabled()) {
    const user = await ensureUserSession(request, response);
    return { userId: String(user?.id || ""), email: "" };
  }
  const anonId = ensureAnonIdCookie(request, response);
  return { userId: `anon-${anonId}`, email: "" };
}

async function upsertJsonPushSubscription(identity, subscription) {
  const db = await loadDatabase();
  if (!Array.isArray(db.pushSubscriptions)) {
    db.pushSubscriptions = [];
  }
  const nowIso = new Date().toISOString();
  const endpoint = subscription.endpoint;
  const existingIndex = db.pushSubscriptions.findIndex((it) => String(it?.endpoint || "") === endpoint);
  const next = {
    id: existingIndex >= 0 ? db.pushSubscriptions[existingIndex].id : generateId("pushsub"),
    userId: identity.userId || "",
    email: identity.email || "",
    endpoint,
    keys: subscription.keys,
    prefs:
      existingIndex >= 0 && db.pushSubscriptions[existingIndex]?.prefs
        ? sanitizePushPrefs(db.pushSubscriptions[existingIndex].prefs)
        : defaultPushPrefs(),
    createdAt: existingIndex >= 0 ? (db.pushSubscriptions[existingIndex].createdAt || nowIso) : nowIso,
    updatedAt: nowIso,
  };
  if (existingIndex >= 0) {
    db.pushSubscriptions[existingIndex] = next;
  } else {
    db.pushSubscriptions.push(next);
  }
  await persistDatabase();
  return next;
}

async function updateJsonPushSubscriptionPrefsByEndpoint(endpoint, prefs) {
  const db = await loadDatabase();
  if (!Array.isArray(db.pushSubscriptions) || !endpoint) return null;
  const idx = db.pushSubscriptions.findIndex((it) => String(it?.endpoint || "") === endpoint);
  if (idx < 0) return null;
  const nowIso = new Date().toISOString();
  const prev = db.pushSubscriptions[idx] || {};
  db.pushSubscriptions[idx] = {
    ...prev,
    prefs: sanitizePushPrefs(prefs),
    updatedAt: nowIso,
  };
  await persistDatabase();
  return db.pushSubscriptions[idx];
}

async function removeJsonPushSubscriptionByEndpoint(endpoint) {
  const db = await loadDatabase();
  if (!Array.isArray(db.pushSubscriptions) || !endpoint) return 0;
  const before = db.pushSubscriptions.length;
  db.pushSubscriptions = db.pushSubscriptions.filter((it) => String(it?.endpoint || "") !== endpoint);
  const removed = before - db.pushSubscriptions.length;
  if (removed) {
    await persistDatabase();
  }
  return removed;
}

async function upsertPostgresPushSubscription(identity, subscription) {
  await ensurePostgresSchema();
  const pool = await getPostgresPool();
  const nowIso = new Date().toISOString();
  const endpoint = subscription.endpoint;
  const keysJson = JSON.stringify(subscription.keys);
  const prefsJson = JSON.stringify(defaultPushPrefs());
  const userId = identity.userId || null;
  const email = identity.email || null;

  const result = await pool.query(
    `
      INSERT INTO plately_push_subscriptions (id, user_id, email, endpoint, keys, prefs, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb, NOW(), NOW())
      ON CONFLICT (endpoint)
      DO UPDATE SET
        user_id = EXCLUDED.user_id,
        email = EXCLUDED.email,
        keys = EXCLUDED.keys,
        updated_at = NOW()
      RETURNING *
    `,
    [generateId("pushsub"), userId, email, endpoint, keysJson, prefsJson]
  );
  return { ...result.rows[0], updatedAt: nowIso };
}

async function updatePostgresPushSubscriptionPrefsByEndpoint(endpoint, prefs) {
  await ensurePostgresSchema();
  const pool = await getPostgresPool();
  const prefsJson = JSON.stringify(sanitizePushPrefs(prefs));
  const res = await pool.query(
    `UPDATE plately_push_subscriptions SET prefs = $2::jsonb, updated_at = NOW() WHERE endpoint = $1 RETURNING *`,
    [endpoint, prefsJson]
  );
  return res.rows?.[0] || null;
}

async function removePostgresPushSubscriptionByEndpoint(endpoint) {
  await ensurePostgresSchema();
  const pool = await getPostgresPool();
  const res = await pool.query(`DELETE FROM plately_push_subscriptions WHERE endpoint = $1`, [endpoint]);
  return Number(res.rowCount || 0);
}

async function listAllPushSubscriptions() {
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const res = await pool.query(`SELECT endpoint, keys FROM plately_push_subscriptions`);
    return res.rows.map((r) => ({
      endpoint: r.endpoint,
      keys: r.keys,
    }));
  }
  const db = await loadDatabase();
  const list = Array.isArray(db.pushSubscriptions) ? db.pushSubscriptions : [];
  return list.map((r) => ({ endpoint: r.endpoint, keys: r.keys }));
}

async function listPushSubscriptionsWithMeta() {
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const res = await pool.query(`
      SELECT s.endpoint, s.keys, s.prefs, s.user_id, u.app_state
      FROM plately_push_subscriptions s
      LEFT JOIN plately_users u ON u.id = s.user_id
    `);
    return res.rows.map((r) => ({
      endpoint: r.endpoint,
      keys: r.keys,
      prefs: sanitizePushPrefs(r.prefs),
      userId: String(r.user_id || ""),
      userAppState: r.app_state && typeof r.app_state === "object" ? r.app_state : {},
    }));
  }
  const db = await loadDatabase();
  const subs = Array.isArray(db.pushSubscriptions) ? db.pushSubscriptions : [];
  return subs.map((s) => ({
    endpoint: s.endpoint,
    keys: s.keys,
    prefs: sanitizePushPrefs(s.prefs),
    userId: String(s.userId || ""),
    userAppState: db.users?.[String(s.userId || "")] || {},
  }));
}

async function listPushSubscriptionsForUser(userId) {
  const uid = String(userId || "").trim();
  if (!uid) return [];
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const res = await pool.query(`SELECT endpoint, keys, prefs FROM plately_push_subscriptions WHERE user_id = $1`, [uid]);
    return res.rows.map((r) => ({ endpoint: r.endpoint, keys: r.keys, prefs: sanitizePushPrefs(r.prefs) }));
  }
  const db = await loadDatabase();
  const subs = Array.isArray(db.pushSubscriptions) ? db.pushSubscriptions : [];
  return subs
    .filter((s) => String(s?.userId || "") === uid)
    .map((s) => ({ endpoint: s.endpoint, keys: s.keys, prefs: sanitizePushPrefs(s.prefs) }));
}

function pickFavoriteSupermarketFromAppState(appState) {
  const profile = appState?.profile && typeof appState.profile === "object" ? appState.profile : {};
  return String(profile.favoriteSupermarket || "").toLowerCase().trim();
}

function isCategoryEnabledForPrefs(prefs, categoryKey) {
  const p = sanitizePushPrefs(prefs);
  const key = String(categoryKey || "").trim();
  if (key === "features" || key === "ah" || key === "cookmode") {
    return Boolean(p.categories[key]);
  }
  return false;
}

async function createAnnouncement({ title, body, url, category, imageUrl, templateKey }) {
  const nowIso = new Date().toISOString();
  const id = generateId("ann");
  const row = {
    id,
    title: String(title || "").slice(0, 120),
    body: String(body || "").slice(0, 280),
    url: String(url || "").slice(0, 500),
    imageUrl: String(imageUrl || "").slice(0, 500),
    category: String(category || "").slice(0, 32),
    templateKey: String(templateKey || "").slice(0, 64),
    createdAt: nowIso,
    metrics: { matched: 0, sent: 0, failed: 0, removed: 0 },
  };

  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    await pool.query(
      `
        INSERT INTO plately_announcements (id, title, body, url, image_url, category, template_key, matched_count, sent_count, failed_count, removed_count, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 0, 0, 0, 0, NOW())
      `,
      [row.id, row.title, row.body, row.url, row.imageUrl, row.category, row.templateKey]
    );
    return row;
  }

  const db = await loadDatabase();
  if (!Array.isArray(db.announcements)) {
    db.announcements = [];
  }
  db.announcements.unshift(row);
  db.announcements = db.announcements.slice(0, 200);
  await persistDatabase();
  return row;
}

async function updateAnnouncementMetrics(id, metrics) {
  const safeId = String(id || "").trim();
  if (!safeId) return;
  const m = metrics && typeof metrics === "object" ? metrics : {};
  const next = {
    matched: Number(m.matched || 0),
    sent: Number(m.sent || 0),
    failed: Number(m.failed || 0),
    removed: Number(m.removed || 0),
  };

  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    await pool.query(
      `
        UPDATE plately_announcements
        SET matched_count = $2, sent_count = $3, failed_count = $4, removed_count = $5
        WHERE id = $1
      `,
      [safeId, next.matched, next.sent, next.failed, next.removed]
    );
    return;
  }

  const db = await loadDatabase();
  const list = Array.isArray(db.announcements) ? db.announcements : [];
  const idx = list.findIndex((a) => String(a?.id || "") === safeId);
  if (idx < 0) return;
  list[idx] = { ...list[idx], metrics: next };
  db.announcements = list;
  await persistDatabase();
}

async function getAnnouncementById(id) {
  const safeId = String(id || "").trim();
  if (!safeId) return null;

  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const res = await pool.query(
      `SELECT id, title, body, url, image_url, category, template_key, matched_count, sent_count, failed_count, removed_count, created_at
       FROM plately_announcements
       WHERE id = $1 LIMIT 1`,
      [safeId]
    );
    const row = res.rows?.[0];
    if (!row) return null;
    return {
      id: row.id,
      title: row.title,
      body: row.body,
      url: row.url,
      imageUrl: row.image_url || "",
      category: row.category,
      templateKey: row.template_key || "",
      metrics: {
        matched: Number(row.matched_count || 0),
        sent: Number(row.sent_count || 0),
        failed: Number(row.failed_count || 0),
        removed: Number(row.removed_count || 0),
      },
      createdAt: row.created_at ? new Date(row.created_at).toISOString() : "",
    };
  }

  const db = await loadDatabase();
  const list = Array.isArray(db.announcements) ? db.announcements : [];
  return list.find((a) => String(a?.id || "") === safeId) || null;
}

async function listRecentAnnouncements({ limit = 50 } = {}) {
  const n = Math.max(1, Math.min(200, Number(limit || 50) || 50));
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const res = await pool.query(
      `SELECT id, title, body, url, image_url, category, template_key, matched_count, sent_count, failed_count, removed_count, created_at
       FROM plately_announcements
       ORDER BY created_at DESC
       LIMIT $1`,
      [n]
    );
    return (res.rows || []).map((row) => ({
      id: row.id,
      title: row.title,
      body: row.body,
      url: row.url,
      imageUrl: row.image_url || "",
      category: row.category,
      templateKey: row.template_key || "",
      metrics: {
        matched: Number(row.matched_count || 0),
        sent: Number(row.sent_count || 0),
        failed: Number(row.failed_count || 0),
        removed: Number(row.removed_count || 0),
      },
      createdAt: row.created_at ? new Date(row.created_at).toISOString() : "",
    }));
  }
  const db = await loadDatabase();
  const list = Array.isArray(db.announcements) ? db.announcements : [];
  return list.slice(0, n);
}

async function deleteAnnouncementById(id) {
  const safeId = String(id || "").trim();
  if (!safeId) return false;
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const res = await pool.query(`DELETE FROM plately_announcements WHERE id = $1`, [safeId]);
    return Number(res.rowCount || 0) > 0;
  }
  const db = await loadDatabase();
  const list = Array.isArray(db.announcements) ? db.announcements : [];
  const next = list.filter((a) => String(a?.id || "") !== safeId);
  const deleted = next.length !== list.length;
  db.announcements = next;
  if (deleted) await persistDatabase();
  return deleted;
}

function createEmptyDatabase() {
  return {
    users: {},
    sessions: {},
    authSessions: {}, // Dev-only: simple auth token -> {email, userId} mapping
    pushSubscriptions: [],
    announcements: [],
    shareLinks: {}, // token -> { payload, createdAt }
  };
}

function isPostgresEnabled() {
  return Boolean(DATABASE_URL);
}

// Dev-only fallback: create auth session without database
async function createDevAuthSession(response, userId, email) {
  const token = crypto.randomBytes(24).toString("hex");
  await resolveWritableDataPathsOnce();

  // Wait for any pending writes to complete before modifying cache
  await databaseWriteQueue;

  // Now read fresh from disk to avoid losing concurrent writes
  const rawFile = await fsp.readFile(DATA_FILE, "utf8");
  const db = JSON.parse(rawFile);

  if (!db.authSessions) {
    db.authSessions = {};
  }
  db.authSessions[token] = { userId, email };

  // Update cache with the new state
  databaseCache = db;

  console.log("💾 Saving auth session:", token.substring(0, 8) + "...", "for user", userId);
  await persistDatabase();
  console.log("✅ Auth session persisted", token.substring(0, 8) + "...");

  // Verify it was written
  const verify = await fsp.readFile(DATA_FILE, "utf8").then(JSON.parse).catch(() => null);
  if (verify?.authSessions?.[token]) {
    console.log("✅ Verified: auth session written to disk");
  } else {
    console.warn("⚠️  Warning: auth session not found in file after write");
  }

  appendSetCookie(
    response,
    serializeCookie("plately_auth", token, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  );

  return token;
}

// Dev-only fallback: get authenticated user from dev auth session
async function getDevAuthenticatedUser(request) {
  await resolveWritableDataPathsOnce();

  const authToken = extractAuthToken(request);
  if (!authToken) {
    console.log("🔍 getDevAuthenticatedUser: no auth token found");
    return null;
  }

  try {
    // Read directly from file to avoid cache issues
    const rawFile = await fsp.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(rawFile);
    const authSessions = parsed.authSessions || {};
    const authSession = authSessions[authToken];

    console.log(`🔍 getDevAuthenticatedUser: looking for token ${authToken.substring(0, 8)}... found ${Object.keys(authSessions).length} sessions in file`);

    if (!authSession) {
      console.log(`⚠️  Auth session not found for token ${authToken.substring(0, 8)}...`);
      return null;
    }

    console.log(`✅ Auth session found for user ${authSession.userId}`);

    // Return minimal user object compatible with buildAppStateFromUser
    return {
      id: authSession.userId,
      email: authSession.email,
      authenticated: true,
    };
  } catch (error) {
    console.error("❌ Error in getDevAuthenticatedUser:", error.message);
    return null;
  }
}

// Dev-only fallback: clear dev auth session
async function clearDevAuthSession(request, response) {
  const cookies = parseCookies(request.headers.cookie);
  const authToken = cookies.plately_auth || "";

  if (authToken) {
    const db = await loadDatabase();
    if (db.authSessions?.[authToken]) {
      delete db.authSessions[authToken];
      await persistDatabase();
    }
  }

  // Clear the auth cookie
  appendSetCookie(
    response,
    serializeCookie("plately_auth", "", {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
      maxAge: 1,
    })
  );
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

  console.log("🐘 Connecting to PostgreSQL...");
  postgresPool = new pgModule.Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  });

  // Test the connection
  try {
    const client = await postgresPool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error.message);
    postgresPool = null;
    throw error;
  }

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
      await pool.query(`
        CREATE TABLE IF NOT EXISTS plately_events (
          id TEXT PRIMARY KEY,
          type TEXT NOT NULL,
          user_id TEXT REFERENCES plately_users(id) ON DELETE SET NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          meta JSONB NOT NULL DEFAULT '{}'::jsonb
        );
      `);
      await pool.query(`
        CREATE TABLE IF NOT EXISTS plately_admin_state (
          key TEXT PRIMARY KEY,
          value JSONB NOT NULL DEFAULT '{}'::jsonb,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      await pool.query(`
        CREATE TABLE IF NOT EXISTS plately_push_subscriptions (
          id TEXT PRIMARY KEY,
          user_id TEXT,
          email TEXT,
          endpoint TEXT UNIQUE NOT NULL,
          keys JSONB NOT NULL,
          prefs JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      await pool.query(`
        ALTER TABLE plately_push_subscriptions
        ADD COLUMN IF NOT EXISTS prefs JSONB NOT NULL DEFAULT '{}'::jsonb;
      `);
      await pool.query(`
        CREATE TABLE IF NOT EXISTS plately_announcements (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          body TEXT NOT NULL,
          url TEXT NOT NULL,
          image_url TEXT NOT NULL DEFAULT '',
          category TEXT NOT NULL,
          template_key TEXT NOT NULL DEFAULT '',
          matched_count INT NOT NULL DEFAULT 0,
          sent_count INT NOT NULL DEFAULT 0,
          failed_count INT NOT NULL DEFAULT 0,
          removed_count INT NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      await pool.query(`ALTER TABLE plately_announcements ADD COLUMN IF NOT EXISTS image_url TEXT NOT NULL DEFAULT '';`);
      await pool.query(`ALTER TABLE plately_announcements ADD COLUMN IF NOT EXISTS template_key TEXT NOT NULL DEFAULT '';`);
      await pool.query(`ALTER TABLE plately_announcements ADD COLUMN IF NOT EXISTS matched_count INT NOT NULL DEFAULT 0;`);
      await pool.query(`ALTER TABLE plately_announcements ADD COLUMN IF NOT EXISTS sent_count INT NOT NULL DEFAULT 0;`);
      await pool.query(`ALTER TABLE plately_announcements ADD COLUMN IF NOT EXISTS failed_count INT NOT NULL DEFAULT 0;`);
      await pool.query(`ALTER TABLE plately_announcements ADD COLUMN IF NOT EXISTS removed_count INT NOT NULL DEFAULT 0;`);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_plately_announcements_created_at
        ON plately_announcements (created_at DESC);
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_plately_push_subscriptions_user_id
        ON plately_push_subscriptions (user_id);
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_plately_events_type_created_at
        ON plately_events (type, created_at DESC);
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_plately_events_user_id_created_at
        ON plately_events (user_id, created_at DESC);
      `);
      await pool.query(`ALTER TABLE plately_users ADD COLUMN IF NOT EXISTS apple_sub TEXT;`);
      await pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS plately_users_apple_sub_uidx
        ON plately_users (apple_sub) WHERE apple_sub IS NOT NULL;
      `);
      await pool.query(`ALTER TABLE plately_users ALTER COLUMN password_hash DROP NOT NULL;`);
      await pool.query(`ALTER TABLE plately_users ALTER COLUMN password_salt DROP NOT NULL;`);
    })();
  }

  await postgresReadyPromise;
}

function buildSeedSearchUrlFromTemplate(template, query) {
  const t = sanitizeText(template || "").trim();
  if (!t) return "";
  const q = encodeURIComponent(query || "");
  // Support both legacy `{q}` and the explicit `<zoekwoord>` placeholder.
  // (Admin overrides may use either; seed defaults can evolve over time.)
  return t.replaceAll("{q}", q).replaceAll("<zoekwoord>", q);
}

function normalizeAhAllerhandeSearchQuery(queryOrUrl) {
  const raw = sanitizeText(queryOrUrl || "").trim();
  if (!raw) return "";
  try {
    const u = new URL(raw);
    if (/(^|\.)ah\.nl$/i.test(u.hostname) && /^\/allerhande\/recepten-zoeken\/?$/i.test(u.pathname)) {
      const q = sanitizeText(u.searchParams.get("query") || u.searchParams.get("q") || u.searchParams.get("s") || "");
      return q || raw;
    }
  } catch {
    // Not a URL; use as-is.
  }
  return raw;
}

function isAhAllerhandeSearchUrl(url) {
  try {
    const u = new URL(sanitizeText(url || ""));
    return /(^|\.)ah\.nl$/i.test(u.hostname) && /^\/allerhande(?:\/recepten-zoeken\/?)?$/i.test(u.pathname);
  } catch {
    return false;
  }
}

function getSeedChannelDefaultSearchUrlTemplate(channelId) {
  // Important: keep this in sync with the hardcoded fallbacks used by
  // `searchChannelRecipes` so admin channel testing builds the exact same URLs
  // as the normal multi-channel search.
  switch (sanitizeText(channelId || "")) {
    case "ch-les":
      return "https://www.lekkerensimpel.com/?s={q}&maaltijd=all&gerecht=all";
    case "ch-lb":
      return "https://www.laurasbakery.nl/zoeken/?_search={q}";
    case "ch-ek":
      return "https://www.eefkooktzo.nl/?s={q}";
    case "ch-clf":
      return "https://www.chickslovefood.com/?s={q}";
    case "ch-culy":
      return "https://www.culy.nl/?s={q}&category=Recepten";
    case "ch-mj":
      return "https://miljuschka.nl/?s={q}";
    default:
      return "";
  }
}

function getSeedChannelSearchUrlTemplate(channelId, effectiveSeedConfig) {
  const eff = effectiveSeedConfig && typeof effectiveSeedConfig === "object" ? effectiveSeedConfig : {};
  const t = sanitizeText(eff.searchUrlTemplate || "");
  if (t) return t;
  return getSeedChannelDefaultSearchUrlTemplate(channelId);
}

function buildSeedChannelSearchUrl(channelId, effectiveSeedConfig, query) {
  const template = getSeedChannelSearchUrlTemplate(channelId, effectiveSeedConfig);
  return buildSeedSearchUrlFromTemplate(template, query);
}

function seedSearchTemplateHasPlaceholder(template) {
  const t = sanitizeText(template || "");
  return t.includes("{q}") || t.includes("<zoekwoord>");
}

function seedSearchTemplateForValidation(template) {
  // Replace placeholders so URL parsing doesn't choke on `{` or `<`.
  return String(template || "").replaceAll("{q}", "test").replaceAll("<zoekwoord>", "test");
}

async function getSeedChannelOverrides() {
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const row = await pool.query("SELECT value FROM plately_admin_state WHERE key = $1 LIMIT 1", ["seedChannelOverrides"]);
    const value = row.rows?.[0]?.value;
    return value && typeof value === "object" ? value : {};
  }
  try {
    const rawFile = await fsp.readFile(DATA_FILE, "utf8");
    const db = JSON.parse(rawFile);
    const overrides = db?.adminState?.seedChannelOverrides;
    return overrides && typeof overrides === "object" ? overrides : {};
  } catch {
    return {};
  }
}

async function setSeedChannelOverrides(nextOverrides) {
  const clean = nextOverrides && typeof nextOverrides === "object" ? nextOverrides : {};
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    await pool.query(
      `
        INSERT INTO plately_admin_state (key, value, updated_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
      `,
      ["seedChannelOverrides", JSON.stringify(clean)]
    );
    return;
  }
  const rawFile = await fsp.readFile(DATA_FILE, "utf8");
  const db = JSON.parse(rawFile);
  if (!db.adminState || typeof db.adminState !== "object") db.adminState = {};
  db.adminState.seedChannelOverrides = clean;
  await fsp.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
}

async function getChannelOverrides() {
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const row = await pool.query("SELECT value FROM plately_admin_state WHERE key = $1 LIMIT 1", ["channelOverrides"]);
    const value = row.rows?.[0]?.value;
    return value && typeof value === "object" ? value : {};
  }
  try {
    const rawFile = await fsp.readFile(DATA_FILE, "utf8");
    const db = JSON.parse(rawFile);
    const overrides = db?.adminState?.channelOverrides;
    return overrides && typeof overrides === "object" ? overrides : {};
  } catch {
    return {};
  }
}

async function setChannelOverrides(nextOverrides) {
  const clean = nextOverrides && typeof nextOverrides === "object" ? nextOverrides : {};
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    await pool.query(
      `
        INSERT INTO plately_admin_state (key, value, updated_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
      `,
      ["channelOverrides", JSON.stringify(clean)]
    );
    return;
  }
  const rawFile = await fsp.readFile(DATA_FILE, "utf8");
  const db = JSON.parse(rawFile);
  if (!db.adminState || typeof db.adminState !== "object") db.adminState = {};
  db.adminState.channelOverrides = clean;
  await fsp.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
}

/** Merge hardcoded TEMPORARILY_DISABLED_CHANNEL_IDS in op de seed-state zodat
 * de client ook de "code-level" uitgeschakelde kanalen ziet als enabled=false. */
function _withHardcodedDisables(state) {
  const seed = { ...(state?.seed || {}) };
  for (const id of TEMPORARILY_DISABLED_CHANNEL_IDS) seed[id] = false;
  return { seed, custom: { ...(state?.custom || {}) } };
}

async function getChannelEnabledState() {
  const fallback = { seed: {}, custom: {} };
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const row = await pool.query("SELECT value FROM plately_admin_state WHERE key = $1 LIMIT 1", ["channelEnabledState"]);
    const value = row.rows?.[0]?.value;
    let st = value && typeof value === "object" ? value : {};
    if (value && typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        st = parsed && typeof parsed === "object" ? parsed : {};
      } catch {
        st = {};
      }
    }
    return _withHardcodedDisables({
      seed: st.seed && typeof st.seed === "object" ? st.seed : {},
      custom: st.custom && typeof st.custom === "object" ? st.custom : {},
    });
  }
  try {
    const rawFile = await fsp.readFile(DATA_FILE, "utf8");
    const db = JSON.parse(rawFile);
    const st = db?.adminState?.channelEnabledState;
    return _withHardcodedDisables({
      seed: st?.seed && typeof st.seed === "object" ? st.seed : {},
      custom: st?.custom && typeof st.custom === "object" ? st.custom : {},
    });
  } catch {
    return _withHardcodedDisables(fallback);
  }
}

async function setChannelEnabledState(nextState) {
  const st = nextState && typeof nextState === "object" ? nextState : {};
  const clean = {
    seed: st.seed && typeof st.seed === "object" ? st.seed : {},
    custom: st.custom && typeof st.custom === "object" ? st.custom : {},
  };
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    await pool.query(
      `
        INSERT INTO plately_admin_state (key, value, updated_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
      `,
      ["channelEnabledState", JSON.stringify(clean)]
    );
    return;
  }
  const rawFile = await fsp.readFile(DATA_FILE, "utf8");
  const db = JSON.parse(rawFile);
  if (!db.adminState || typeof db.adminState !== "object") db.adminState = {};
  db.adminState.channelEnabledState = clean;
  await fsp.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
}

function sanitizeGlobalCustomChannel(channel) {
  const id = sanitizeText(channel?.id || "");
  const name = sanitizeText(channel?.name || "").slice(0, 80);
  const url = sanitizeText(channel?.url || "").slice(0, 500);
  if (!id || !name || !url) return null;
  const initials = sanitizeText(channel?.initials || name.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase() || "WEB").slice(0, 4);
  return {
    id,
    name,
    url,
    initials,
    color: sanitizeText(channel?.color || "#8da485").slice(0, 32),
    status: "approved",
    managedByAdmin: true,
    createdBy: sanitizeText(channel?.createdBy || ""),
    createdByEmail: sanitizeText(channel?.createdByEmail || ""),
    createdAt: sanitizeText(channel?.createdAt || ""),
    updatedAt: sanitizeText(channel?.updatedAt || ""),
  };
}

async function getGlobalCustomChannels() {
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const row = await pool.query("SELECT value FROM plately_admin_state WHERE key = $1 LIMIT 1", ["globalCustomChannels"]);
    const value = row.rows?.[0]?.value;
    let list = Array.isArray(value) ? value : [];
    if (value && typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        list = Array.isArray(parsed) ? parsed : [];
      } catch {
        list = [];
      }
    }
    return list.map(sanitizeGlobalCustomChannel).filter(Boolean);
  }
  try {
    const rawFile = await fsp.readFile(DATA_FILE, "utf8");
    const db = JSON.parse(rawFile);
    const list = Array.isArray(db?.adminState?.globalCustomChannels) ? db.adminState.globalCustomChannels : [];
    return list.map(sanitizeGlobalCustomChannel).filter(Boolean);
  } catch {
    return [];
  }
}

async function setGlobalCustomChannels(channels) {
  const clean = (Array.isArray(channels) ? channels : []).map(sanitizeGlobalCustomChannel).filter(Boolean);
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    await pool.query(
      `
        INSERT INTO plately_admin_state (key, value, updated_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
      `,
      ["globalCustomChannels", JSON.stringify(clean)]
    );
    return clean;
  }
  const rawFile = await fsp.readFile(DATA_FILE, "utf8");
  const db = JSON.parse(rawFile);
  if (!db.adminState || typeof db.adminState !== "object") db.adminState = {};
  db.adminState.globalCustomChannels = clean;
  await fsp.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
  return clean;
}

function withGlobalCustomChannels(appState, globalCustomChannels) {
  const globals = (Array.isArray(globalCustomChannels) ? globalCustomChannels : []).map(sanitizeGlobalCustomChannel).filter(Boolean);
  if (!globals.length) return appState;
  const local = Array.isArray(appState?.customChannels) ? appState.customChannels : [];
  const seen = new Set();
  const merged = [];
  for (const channel of [...globals, ...local]) {
    const id = sanitizeText(channel?.id || "");
    if (!id || seen.has(id)) continue;
    seen.add(id);
    merged.push(channel);
  }
  return { ...appState, customChannels: merged };
}

/** Tijdelijk uitgeschakelde kanalen — Cloudflare blokkeert imports/zoek; weer aanzetten zodra dat stabiel is. */
const TEMPORARILY_DISABLED_CHANNEL_IDS = new Set(["ch-mj", "ch-ek"]);

function isChannelEnabled(channelKind, channelId, enabledState) {
  const kind = sanitizeText(channelKind || "");
  const id = sanitizeText(channelId || "");
  if (!id) return true;
  if (TEMPORARILY_DISABLED_CHANNEL_IDS.has(id)) return false;
  if (kind !== "seed" && kind !== "custom") return true;
  const st = enabledState && typeof enabledState === "object" ? enabledState : {};
  const map = st[kind] && typeof st[kind] === "object" ? st[kind] : {};
  return map[id] === false ? false : true;
}

function getEffectiveSeedChannelConfig(channelId, overrides) {
  const id = sanitizeText(channelId || "");
  const base = SEED_CHANNEL_DEFAULTS[id] || {};
  const over = overrides && typeof overrides === "object" ? overrides[id] : null;
  const next = over && typeof over === "object" ? over : {};
  const baseUrl = sanitizeText(next.baseUrl || base.baseUrl || "");
  let searchUrlTemplate = sanitizeText(next.searchUrlTemplate || base.searchUrlTemplate || "");

  // Migration guard: older Pauline overrides used the generic WP `/?s={q}` template,
  // but Pauline recipes live behind the custom `/zoeken?_search_keyword=...` endpoint.
  if (
    id === "ch-up" &&
    searchUrlTemplate &&
    !/_search_keyword=/i.test(searchUrlTemplate) &&
    /\b\?s=|\b\/\?s=/i.test(searchUrlTemplate)
  ) {
    searchUrlTemplate = sanitizeText(base.searchUrlTemplate || "");
  }
  return {
    channelId: id,
    defaultBaseUrl: sanitizeText(base.baseUrl || ""),
    defaultSearchUrlTemplate: sanitizeText(base.searchUrlTemplate || ""),
    baseUrl,
    searchUrlTemplate,
    override: {
      baseUrl: sanitizeText(next.baseUrl || ""),
      searchUrlTemplate: sanitizeText(next.searchUrlTemplate || ""),
    },
  };
}

function getEffectiveChannelOverride(channelId, overrides) {
  const id = sanitizeText(channelId || "");
  const over = overrides && typeof overrides === "object" ? overrides[id] : null;
  return over && typeof over === "object"
    ? {
        baseUrl: sanitizeText(over.baseUrl || ""),
        searchUrlTemplate: sanitizeText(over.searchUrlTemplate || ""),
      }
    : { baseUrl: "", searchUrlTemplate: "" };
}

// Known search parameter names used by recipe sites (checked case-insensitively).
const SEARCH_PARAM_NAMES = new Set([
  "s", "q", "query", "search", "zoeken", "_zoeken", "zoekterm", "zoekwoord",
  "_search", "_search_keyword", "keyword", "searchterms", "searchwp", "term",
  "terms", "tekst", "text", "input", "name",
]);

/**
 * Given a URL (possibly a live search URL with a concrete query term), return a
 * search-URL template with `{q}` in place of the search term.
 *
 * Examples:
 *   "https://brendakookt.nl/recepten/resultaten/?_zoeken=pasta%20pesto"
 *     → "https://brendakookt.nl/recepten/resultaten/?_zoeken={q}"
 *   "https://www.example.nl" (no query params)
 *     → "https://www.example.nl/?s={q}"
 *   "https://example.nl/?s={q}" (already a template)
 *     → "https://example.nl/?s={q}"
 */
function guessSearchTemplateFromUrl(urlStr) {
  const s = sanitizeText(urlStr || "").trim();
  if (!s) return "";
  // Already a template — return as-is.
  if (s.includes("{q}") || s.includes("<zoekwoord>")) return s;
  try {
    const parsed = new URL(s);
    const params = [...parsed.searchParams.entries()];
    // First pass: known search param names (highest confidence).
    for (const [key, val] of params) {
      if (SEARCH_PARAM_NAMES.has(key.toLowerCase())) {
        parsed.searchParams.set(key, "{q}");
        return parsed.toString();
      }
    }
    // Second pass: any param with a non-trivial, non-boolean, non-integer value
    // that could reasonably be a search term.
    for (const [key, val] of params) {
      const v = val.trim();
      if (
        v.length >= 2 &&
        !/^\d+$/.test(v) &&
        !/^(?:true|false|yes|no|1|0|asc|desc|[a-z]{2})$/i.test(v)
      ) {
        parsed.searchParams.set(key, "{q}");
        return parsed.toString();
      }
    }
    // No recognizable search param — use as base URL with standard WP ?s={q}.
    const base = `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "");
    return `${base}/?s={q}`;
  } catch {
    return `${s.replace(/\/+$/, "")}/?s={q}`;
  }
}

function getEffectiveCustomChannelConfig({ channelId, url }, channelOverrides) {
  const id = sanitizeText(channelId || "");
  const rawUrl = sanitizeText(url || "").trim();
  // Template: auto-detect from URL (handles full search URLs with embedded query term).
  const templateDefault = guessSearchTemplateFromUrl(rawUrl);
  // Base URL: origin only (for WP REST API fallback and de-dup logic).
  let baseUrlDefault = rawUrl.replace(/\/+$/, "");
  try {
    const parsed = new URL(rawUrl);
    baseUrlDefault = parsed.origin;
  } catch { /* keep rawUrl */ }
  const over = getEffectiveChannelOverride(id, channelOverrides);
  const baseUrl = sanitizeText(over.baseUrl || baseUrlDefault);
  const searchUrlTemplate = sanitizeText(over.searchUrlTemplate || templateDefault);
  return {
    channelId: id,
    defaultBaseUrl: baseUrlDefault,
    defaultSearchUrlTemplate: templateDefault,
    baseUrl,
    searchUrlTemplate,
    override: over,
  };
}

function generateId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function buildDefaultUserData(userId = generateId("user")) {
  const favoritesCookbookId = generateId("cb");
  return {
    id: userId,
    profile: { ...DEFAULT_PROFILE },
    importedRecipes: [],
    cookbooks: [
      { id: favoritesCookbookId, name: "❤️ Favorieten", recipeIds: [] },
    ],
    selectedCookbookId: favoritesCookbookId,
    onboardingSeenAt: "",
    mealPlan: {
      maandag: null,
      dinsdag: null,
      woensdag: null,
      donderdag: null,
      vrijdag: null,
      zaterdag: null,
      zondag: null,
    },
    groceryItems: [],
    recipeProgress: {},
    featuredRecipeId: "",
    selectedRecipeId: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function ensureDataFile() {
  await resolveWritableDataPathsOnce();

  try {
    await fsp.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    console.log(`⚠️ Could not create DATA_DIR ${DATA_DIR}: ${err.message}`);
    // On Render, /data might not be writable, we'll use in-memory DB instead
  }

  try {
    const stat = await fsp.stat(DATA_FILE);
    // If file exists but is empty or corrupted, use test data
    if (stat.size === 0) {
      console.log("📝 Data file is empty, initializing with test data...");
      await initializeTestData();
    }
  } catch {
    console.log("📝 Data file not found, initializing with empty database...");
    // Create empty database instead of test data
    // Test data should only be used for development, not production
    const emptyDb = createEmptyDatabase();
    try {
      await fsp.writeFile(DATA_FILE, JSON.stringify(emptyDb, null, 2), "utf8");
      console.log("✅ Empty database created");
    } catch (writeErr) {
      console.log(`⚠️ Could not write database file: ${writeErr.message}`);
      console.log("💾 Using in-memory database (will not persist between restarts)");
    }
  }
}

async function initializeTestData() {
  const testDb = {
    users: {
      "user-test-1": {
        id: "user-test-1",
        email: "test1@example.com",
        profile: { name: "Test User 1", handle: "@test1" },
        importedRecipes: ["recipe-1", "recipe-2"],
        cookbooks: [
          { id: "cb-1", name: "Favorites", recipeIds: ["recipe-1"] },
          { id: "cb-2", name: "Quick Meals", recipeIds: ["recipe-2"] }
        ],
        selectedCookbookId: "cb-1",
        mealPlan: { maandag: "recipe-1", dinsdag: null, woensdag: null, donderdag: null, vrijdag: null, zaterdag: null, zondag: null },
        groceryItems: [
          { id: "item-1", title: "Tomatoes", amount: 3 },
          { id: "item-2", title: "Basil", amount: 1 }
        ],
        recipeProgress: {},
        featuredRecipeId: "recipe-1",
        selectedRecipeId: "recipe-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      "user-test-2": {
        id: "user-test-2",
        email: "test2@example.com",
        profile: { name: "Test User 2", handle: "@test2" },
        importedRecipes: ["recipe-3"],
        cookbooks: [
          { id: "cb-3", name: "Healthy", recipeIds: ["recipe-3"] }
        ],
        selectedCookbookId: "cb-3",
        mealPlan: { maandag: null, dinsdag: "recipe-3", woensdag: null, donderdag: null, vrijdag: null, zaterdag: null, zondag: null },
        groceryItems: [
          { id: "item-3", title: "Chicken", amount: 1 },
          { id: "item-4", title: "Rice", amount: 2 }
        ],
        recipeProgress: {},
        featuredRecipeId: "recipe-3",
        selectedRecipeId: "recipe-3",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    sessions: {
      "session-test-1": "user-test-1",
      "session-test-2": "user-test-2",
    },
    authSessions: {},
    pushSubscriptions: [],
  };

  await fsp.writeFile(DATA_FILE, JSON.stringify(testDb, null, 2), "utf8");
  console.log("✅ Test data initialized");
}

async function loadDatabase() {
  if (databaseCache) {
    console.log(`📦 Using cached database: ${Object.keys(databaseCache.users || {}).length} users`);
    return databaseCache;
  }

  await ensureDataFile();

  try {
    console.log(`📖 Loading database from ${DATA_FILE}`);
    const rawContents = await fsp.readFile(DATA_FILE, "utf8");

    try {
      const parsed = JSON.parse(rawContents);
      databaseCache = {
        users: parsed?.users && typeof parsed.users === "object" ? parsed.users : {},
        sessions: parsed?.sessions && typeof parsed.sessions === "object" ? parsed.sessions : {},
        authSessions: parsed?.authSessions && typeof parsed.authSessions === "object" ? parsed.authSessions : {},
        pushSubscriptions: Array.isArray(parsed?.pushSubscriptions) ? parsed.pushSubscriptions : [],
        announcements: Array.isArray(parsed?.announcements) ? parsed.announcements : [],
        shareLinks: parsed?.shareLinks && typeof parsed.shareLinks === "object" ? parsed.shareLinks : {},
      };
      const userCount = Object.keys(databaseCache.users).length;
      const sessionCount = Object.keys(databaseCache.sessions).length;
      const authCount = Object.keys(databaseCache.authSessions).length;
      const pushCount = Array.isArray(databaseCache.pushSubscriptions) ? databaseCache.pushSubscriptions.length : 0;
      const announceCount = Array.isArray(databaseCache.announcements) ? databaseCache.announcements.length : 0;
      const shareCount = databaseCache.shareLinks && typeof databaseCache.shareLinks === "object" ? Object.keys(databaseCache.shareLinks).length : 0;
      console.log(`✅ Database loaded from disk: ${userCount} users, ${sessionCount} sessions, ${authCount} auth sessions`);
      console.log(`   pushSubscriptions=${pushCount}`);
      console.log(`   announcements=${announceCount}, shareLinks=${shareCount}`);
    } catch (parseError) {
      console.error("❌ Database parse error:", parseError.message);
      databaseCache = createEmptyDatabase();
    }
  } catch (readError) {
    console.log(`⚠️ Could not read database file: ${readError.message}`);
    console.log("💾 Using empty in-memory database");
    databaseCache = createEmptyDatabase();
  }

  return databaseCache;
}

async function persistDatabase() {
  databaseWriteQueue = databaseWriteQueue.then(async () => {
    // Always read from the actual databaseCache to ensure we have current state
    const db = databaseCache;
    if (!db) {
      console.warn("⚠️  databaseCache is null when writing");
      return;
    }
    const userCount = Object.keys(db.users || {}).length;
    const sessionCount = Object.keys(db.sessions || {}).length;
    const authCount = Object.keys(db.authSessions || {}).length;
    const pushCount = Array.isArray(db.pushSubscriptions) ? db.pushSubscriptions.length : 0;
    const announceCount = Array.isArray(db.announcements) ? db.announcements.length : 0;
    const shareCount = db.shareLinks && typeof db.shareLinks === "object" ? Object.keys(db.shareLinks).length : 0;
    console.log(`💾 Writing database to ${DATA_FILE}`);
    console.log(
      `   users=${userCount}, sessions=${sessionCount}, authSessions=${authCount}, pushSubscriptions=${pushCount}, announcements=${announceCount}, shareLinks=${shareCount}`
    );
    await fsp.writeFile(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
    console.log(`✅ Database written successfully to ${DATA_FILE}`);
  });
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
    console.log(`🍪 Setting cookie [FULL]: ${cookieValue}`);
    response.setHeader("Set-Cookie", cookieValue);
    return;
  }

  const nextCookies = Array.isArray(existing) ? [...existing, cookieValue] : [existing, cookieValue];
  console.log(`🍪 Appending cookie [FULL]: ${cookieValue}`);
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
    groceryLists: Array.isArray(appState.groceryLists)
      ? appState.groceryLists.map((list) => ({
          id: sanitizeText(list.id || ""),
          name: sanitizeText(list.name || "Mijn lijst").slice(0, 80),
          items: Array.isArray(list.items)
            ? list.items.map((item, index) => sanitizeGroceryItemForStorage(item, index))
            : [],
        }))
      : [],
    activeGroceryListId: sanitizeText(appState.activeGroceryListId || ""),
    recipeProgress: sanitizeRecipeProgressForStorage(appState.recipeProgress),
    featuredRecipeId: sanitizeText(appState.featuredRecipeId || "recipe-1"),
    selectedRecipeId: sanitizeText(appState.selectedRecipeId || "recipe-1"),
    followedChannelIds: Array.isArray(appState.followedChannelIds) ? appState.followedChannelIds.map(sanitizeText).filter(Boolean) : [],
    customChannels: Array.isArray(appState.customChannels) ? appState.customChannels : [],
    language: typeof appState.language === "string" && appState.language ? appState.language : "nl",
    onboardingSeenAt: typeof appState.onboardingSeenAt === "string" ? sanitizeText(appState.onboardingSeenAt) : "",
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

async function createAuthSession(response, userId) {
  try {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const token = crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();

    console.log(`🔐 Creating PostgreSQL auth session for user: ${userId}`);
    await pool.query(
      `
        INSERT INTO plately_auth_sessions (token, user_id, expires_at)
        VALUES ($1, $2, $3)
      `,
      [token, userId, expiresAt]
    );
    console.log(`✅ Auth session created: ${token.substring(0, 8)}...`);

    appendSetCookie(
      response,
      serializeCookie("plately_auth", token, {
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 60 * 60 * 24 * 30,
      })
    );

    return token;
  } catch (error) {
    console.error(`❌ Error creating PostgreSQL auth session: ${error.message}`);
    throw error;
  }
}

async function clearAuthSession(request, response) {
  if (!isPostgresEnabled()) {
    appendSetCookie(
      response,
      serializeCookie("plately_auth", "", {
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
        maxAge: 1,
      })
    );
    return;
  }

  const authToken = extractAuthToken(request);
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
      secure: true,
      maxAge: 1,
    })
  );
}

function extractAuthToken(request) {
  // Prefer Authorization: Bearer <token> header (works around cookie issues)
  const authHeader = request.headers.authorization || request.headers.Authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }
  // Fallback: legacy cookie-based auth
  const cookies = parseCookies(request.headers.cookie);
  return cookies.plately_auth || "";
}

async function getAuthenticatedUser(request) {
  if (!isPostgresEnabled()) {
    return null;
  }

  const authToken = extractAuthToken(request);
  if (!authToken) return null;

  try {
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
  } catch (error) {
    console.error(`[auth] session lookup fout: ${error.message}`);
    return null;
  }
}

const ADMIN_EMAIL = sanitizeText(process.env.ADMIN_EMAIL || "pradix@me.com");

async function requireAdmin(request) {
  // Keep in sync with frontend email-based `isAdmin()`.
  let authUser = await getAuthenticatedUser(request).catch(() => null);
  // Dev-only fallback: allow json-file mode sessions when present.
  if (!authUser && !isPostgresEnabled()) {
    authUser = await getDevAuthenticatedUser(request).catch(() => null);
  }
  const email = sanitizeText(authUser?.email || "");
  if (!email) {
    throw new HttpError(
      403,
      "Geen geldige sessie voor admin. Log opnieuw in op dit domein en open het admin-paneel hier (zelfde origin). Gebruik fetch met credentials en/of Authorization zoals de hoofd-app."
    );
  }
  if (email !== ADMIN_EMAIL) {
    throw new HttpError(
      403,
      `Geen admin-rechten voor dit account (${email}). Alleen het beheerdersaccount (ADMIN_EMAIL) heeft toegang.`
    );
  }
  return authUser;
}

async function createPostgresUser(email, password, currentState) {
  try {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const userId = generateId("user");
    const { salt, hash } = createPasswordHash(password);
    const appState = sanitizeUserStatePayload(currentState, buildDefaultUserData(userId));

    console.log(`📝 Creating PostgreSQL user: ${email}`);
    const result = await pool.query(
      `
        INSERT INTO plately_users (id, email, password_hash, password_salt, profile, app_state)
        VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb)
        RETURNING *
      `,
      [userId, email, hash, salt, JSON.stringify(appState.profile), JSON.stringify(appState)]
    );

    console.log(`✅ User created in PostgreSQL: ${userId}`);
    return result.rows[0];
  } catch (error) {
    console.error(`❌ Error creating PostgreSQL user: ${error.message}`);
    throw error;
  }
}

function getRequestPublicOrigin(request) {
  const xfProto = String(request.headers["x-forwarded-proto"] || "").split(",")[0].trim();
  const proto = xfProto || (request.socket?.encrypted ? "https" : "http");
  const host =
    String(request.headers["x-forwarded-host"] || "")
      .split(",")[0]
      .trim() || String(request.headers.host || "").trim();
  if (!host) return "";
  return `${proto}://${host}`;
}

let appleJwksCache = { keys: null, at: 0 };
const APPLE_JWKS_TTL_MS = 6 * 60 * 60 * 1000;

async function fetchAppleJwksKeys() {
  const now = Date.now();
  if (appleJwksCache.keys && now - appleJwksCache.at < APPLE_JWKS_TTL_MS) {
    return appleJwksCache.keys;
  }
  const res = await fetch("https://appleid.apple.com/auth/keys");
  if (!res.ok) {
    throw new HttpError(503, "Apple-inloggen tijdelijk niet beschikbaar.");
  }
  const data = await res.json();
  const keys = Array.isArray(data.keys) ? data.keys : [];
  appleJwksCache = { keys, at: now };
  return keys;
}

function decodeAppleJwtSegment(segment) {
  return JSON.parse(Buffer.from(String(segment || ""), "base64url").toString("utf8"));
}

async function verifyAppleIdToken(idToken, expectedAud) {
  const parts = String(idToken || "").split(".");
  if (parts.length !== 3) {
    throw new HttpError(400, "Ongeldig Apple-token.");
  }
  let header;
  let payload;
  try {
    header = decodeAppleJwtSegment(parts[0]);
    payload = decodeAppleJwtSegment(parts[1]);
  } catch {
    throw new HttpError(400, "Ongeldig Apple-token.");
  }
  if (header.alg !== "RS256" || !header.kid) {
    throw new HttpError(400, "Ongeldig Apple-token.");
  }
  const keys = await fetchAppleJwksKeys();
  const jwk = keys.find((k) => k && k.kid === header.kid && k.use === "sig" && k.kty === "RSA");
  if (!jwk) {
    throw new HttpError(401, "Apple-token niet te verifiëren.");
  }
  const signingInput = `${parts[0]}.${parts[1]}`;
  const sig = Buffer.from(parts[2], "base64url");
  let keyObj;
  try {
    keyObj = crypto.createPublicKey({ key: jwk, format: "jwk" });
  } catch {
    throw new HttpError(401, "Apple-token niet te verifiëren.");
  }
  const ok = crypto.verify("RSA-SHA256", Buffer.from(signingInput, "utf8"), keyObj, sig);
  if (!ok) {
    throw new HttpError(401, "Apple-token niet geldig.");
  }
  const nowSec = Math.floor(Date.now() / 1000);
  if (payload.iss !== "https://appleid.apple.com") {
    throw new HttpError(401, "Apple-token niet geldig.");
  }
  if (payload.aud !== expectedAud) {
    throw new HttpError(401, "Apple-token niet voor deze app.");
  }
  if (typeof payload.exp !== "number" || payload.exp < nowSec - 120) {
    throw new HttpError(401, "Apple-token verlopen.");
  }
  if (!payload.sub) {
    throw new HttpError(401, "Apple-token onvolledig.");
  }
  const emailRaw = payload.email ? sanitizeEmail(payload.email) : "";
  return {
    sub: String(payload.sub),
    email: emailRaw && isValidEmail(emailRaw) ? emailRaw : "",
  };
}

async function findOrCreateApplePostgresUser(pool, { sub, email, displayName }) {
  const existingByApple = await pool.query(`SELECT * FROM plately_users WHERE apple_sub = $1 LIMIT 1`, [sub]);
  if (existingByApple.rows[0]) {
    return { user: existingByApple.rows[0], isNew: false };
  }

  if (email && isValidEmail(email)) {
    const byEmail = await pool.query(`SELECT * FROM plately_users WHERE lower(email) = lower($1) LIMIT 1`, [email]);
    if (byEmail.rows[0]) {
      const u = byEmail.rows[0];
      if (u.apple_sub && u.apple_sub !== sub) {
        throw new HttpError(409, "Dit e-mailadres is al gekoppeld aan een ander Apple-account.");
      }
      if (!u.apple_sub) {
        await pool.query(`UPDATE plately_users SET apple_sub = $1, updated_at = NOW() WHERE id = $2`, [sub, u.id]);
        u.apple_sub = sub;
      }
      return { user: u, isNew: false };
    }
  }

  const userId = generateId("user");
  let canonicalEmail = email && isValidEmail(email) ? sanitizeEmail(email) : "";
  if (!canonicalEmail) {
    canonicalEmail = `apple_${String(sub).replace(/[^a-z0-9]/gi, "").slice(0, 48)}@plately-user.invalid`;
  }
  for (let attempt = 0; attempt < 6; attempt++) {
    const clash = await pool.query(`SELECT id FROM plately_users WHERE lower(email) = lower($1) LIMIT 1`, [
      canonicalEmail,
    ]);
    if (!clash.rows[0]) break;
    canonicalEmail = `apple_${String(sub).replace(/[^a-z0-9]/gi, "").slice(0, 36)}_${attempt}@plately-user.invalid`;
  }

  const base = buildDefaultUserData(userId);
  if (displayName) {
    base.profile = sanitizeProfilePayload({ ...base.profile, name: sanitizeText(displayName).slice(0, 80) });
  }
  if (email && isValidEmail(email)) {
    base.profile = sanitizeProfilePayload({ ...base.profile, email: sanitizeEmail(email) });
  }
  const appState = sanitizeUserStatePayload({}, base);

  await pool.query(
    `
      INSERT INTO plately_users (id, email, password_hash, password_salt, apple_sub, profile, app_state)
      VALUES ($1, $2, NULL, NULL, $3, $4::jsonb, $5::jsonb)
    `,
    [userId, canonicalEmail, sub, JSON.stringify(appState.profile), JSON.stringify(appState)]
  );
  const ins = await pool.query(`SELECT * FROM plately_users WHERE id = $1 LIMIT 1`, [userId]);
  return { user: ins.rows[0], isNew: true };
}

async function updateAuthenticatedUserState(userId, body) {
  await ensurePostgresSchema();
  const pool = await getPostgresPool();
  const existing = await pool.query(`SELECT * FROM plately_users WHERE id = $1 LIMIT 1`, [userId]);
  const currentUser = existing.rows[0];
  if (!currentUser) {
    throw new HttpError(404, "Gebruiker niet gevonden.");
  }

  const baseState = buildAppStateFromUser(currentUser);
  const prevImported = Array.isArray(baseState.importedRecipes) ? baseState.importedRecipes.length : 0;
  const appState = sanitizeUserStatePayload(body, baseState);
  const nextImported = Array.isArray(appState.importedRecipes) ? appState.importedRecipes.length : 0;
  if (nextImported > prevImported) {
    const last = appState.importedRecipes[nextImported - 1];
    console.log("[app-state]", {
      phase: "imported_recipes_saved",
      userId: String(userId).slice(0, 24),
      prevCount: prevImported,
      nextCount: nextImported,
      lastTitle:
        typeof last?.title === "string" ? shortenUrlForLog(sanitizeText(last.title), 88) : undefined,
      lastId: typeof last?.id === "string" ? sanitizeText(last.id).slice(0, 28) : undefined,
      sourceHost: (() => {
        try {
          return new URL(sanitizeText(last?.sourceUrl || "")).hostname.replace(/^www\./i, "");
        } catch {
          return undefined;
        }
      })(),
    });
  }
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
        secure: true,
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
  const email = sanitizeText(profile?.email || "").slice(0, 200);
  // photo is a base64 data URL or https URL — allow up to 400KB
  const rawPhoto = String(profile?.photo || "");
  const photo = (rawPhoto.startsWith("data:image/") || rawPhoto.startsWith("https://") || rawPhoto.startsWith("http://"))
    ? rawPhoto.slice(0, 400_000)
    : "";
  const allowedSupermarkets = ["ah", "jumbo", "picnic", "vomar", "dirk", "lidl", "aldi", "coop", "hoogvliet"];
  const rawSupermarket = String(profile?.favoriteSupermarket || "ah").toLowerCase();
  const favoriteSupermarket = allowedSupermarkets.includes(rawSupermarket) ? rawSupermarket : "ah";
  const allowedGenders = ["male", "female", "other", "prefer_not"];
  const rawGender = String(profile?.gender || "").toLowerCase();
  const gender = allowedGenders.includes(rawGender) ? rawGender : "";
  const birthDate = /^\d{4}-\d{2}-\d{2}$/.test(profile?.birthDate) ? profile.birthDate : "";
  return {
    name,
    handle: handle.slice(0, 40),
    email,
    photo,
    favoriteSupermarket,
    gender,
    birthDate,
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

  const out = {
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

  const rv = Number(recipe.ratingValue);
  const rc = Number(recipe.ratingCount);
  if (Number.isFinite(rv) && rv >= 1 && rv <= 5 && Number.isFinite(rc) && rc >= 1) {
    out.ratingValue = Math.round(rv);
    out.ratingCount = Math.max(1, Math.round(rc));
    if (recipe.ratingNormalizedFromWideScale) out.ratingNormalizedFromWideScale = true;
  }

  return out;
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

  // Grocery lists (multiple lists feature)
  let groceryLists = currentUser.groceryLists || [];
  if (Array.isArray(body?.groceryLists)) {
    groceryLists = body.groceryLists.map((list) => ({
      id: sanitizeText(list.id || ""),
      name: sanitizeText(list.name || "Mijn lijst").slice(0, 80),
      items: Array.isArray(list.items)
        ? list.items.map((item, index) => sanitizeGroceryItemForStorage(item, index))
        : [],
    }));
  } else if (!groceryLists.length && groceryItems.length) {
    // Backward compat: build default list from flat groceryItems
    groceryLists = [{ id: "gl_default", name: "Mijn lijst", items: groceryItems }];
  }
  const activeGroceryListId = typeof body?.activeGroceryListId === "string"
    ? sanitizeText(body.activeGroceryListId)
    : (currentUser.activeGroceryListId || "");

  const recipeProgress = body?.recipeProgress
    ? sanitizeRecipeProgressForStorage(body.recipeProgress)
    : currentUser.recipeProgress;

  const followedChannelIds = Array.isArray(body?.followedChannelIds)
    ? body.followedChannelIds.map(sanitizeText).filter(Boolean)
    : currentUser.followedChannelIds || [];

  const customChannels = Array.isArray(body?.customChannels)
    ? body.customChannels
    : currentUser.customChannels || [];

  const language = "nl";

  const onboardingSeenAt = typeof body?.onboardingSeenAt === "string"
    ? sanitizeText(body.onboardingSeenAt).slice(0, 80)
    : (typeof currentUser.onboardingSeenAt === "string" ? currentUser.onboardingSeenAt : "");

  return {
    ...currentUser,
    profile: body?.profile ? sanitizeProfilePayload(body.profile) : currentUser.profile,
    importedRecipes,
    cookbooks,
    selectedCookbookId: sanitizeText(body?.selectedCookbookId || currentUser.selectedCookbookId || "cookbook-1"),
    onboardingSeenAt,
    mealPlan,
    groceryItems,
    groceryLists,
    activeGroceryListId,
    recipeProgress,
    featuredRecipeId: sanitizeText(body?.featuredRecipeId || currentUser.featuredRecipeId || "recipe-1"),
    selectedRecipeId: sanitizeText(body?.selectedRecipeId || currentUser.selectedRecipeId || "recipe-1"),
    followedChannelIds,
    customChannels,
    language,
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
  // Set headers individually to preserve any Set-Cookie headers added by appendSetCookie
  response.statusCode = statusCode;
  for (const [key, value] of Object.entries(HTTP_HEADERS)) {
    response.setHeader(key, value);
  }
  response.setHeader("Content-Type", MIME_TYPES[".json"]);
  response.end(JSON.stringify(payload));
}

function sanitizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function splitCompoundIngredientWords(text) {
  const source = String(text || "");
  if (!source.trim()) return "";

  const stripDiacritics = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

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

function mapEnglishIngredientPhraseForNlStore(phrase) {
  const s = sanitizeText(String(phrase || ""))
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return phrase;
  const exact = new Map([
    ["cilantro", "koriander"],
    ["coriander", "koriander"],
    ["green onions", "bosui"],
    ["green onion", "bosui"],
    ["spring onions", "bosui"],
    ["spring onion", "bosui"],
    ["scallions", "bosui"],
    ["scallion", "bosui"],
    ["arugula", "rucola"],
    ["eggplants", "aubergine"],
    ["eggplant", "aubergine"],
    ["zucchinis", "courgette"],
    ["zucchini", "courgette"],
    ["ground beef", "rundgehakt"],
    ["minced beef", "rundgehakt"],
    ["ground pork", "varkensgehakt"],
    ["minced pork", "varkensgehakt"],
    ["heavy cream", "slagroom"],
    ["sour cream", "zure room"],
    ["yogurt", "yoghurt"],
    ["greek yogurt", "griekse yoghurt"],
    ["ginger", "gember"],
    ["fresh ginger", "verse gember"],
    ["ginger root", "verse gember"],
    ["ground ginger", "gemberpoeder"],
    ["all-purpose flour", "bloem"],
    ["confectioners sugar", "poedersuiker"],
    ["powdered sugar", "poedersuiker"],
  ]);
  if (exact.has(s)) return exact.get(s);
  // Alleen hele begintermen (geen losse substring → vermijdt “lime & cilantro”-verkeerde hits).
  const prefixPairs = [
    ["coriander leaves", "koriander"],
    ["fresh coriander", "koriander"],
    ["rocket salad", "rucola"],
  ];
  for (const [pref, nl] of prefixPairs) {
    if (s === pref || s.startsWith(`${pref} `)) return nl;
  }
  return phrase;
}

function canonicalizeIngredientForStoreSearch(value) {
  let scrubbed = sanitizeText(value || "");
  const lowScr = scrubbed.toLowerCase();
  if (/\bkom\s+kom+m?ers?\b/i.test(lowScr)) {
    scrubbed = scrubbed.replace(/\bkom\s+kom+m?ers?\b/gi, "komkommers");
  } else if (/\bkom\s+kom+m?er\b/i.test(lowScr)) {
    scrubbed = scrubbed.replace(/\bkom\s+kom+m?er\b/gi, "komkommer");
  }
  const compound = splitCompoundIngredientWords(scrubbed);
  if (!compound) return "";

  // Gebruik dezelfde normalisatie als ingredient-zoek (AH): hoeveelheden eraf, pasta/olie/etc.
  let core = normalizeIngredientForSearch(compound);
  core = mapEnglishIngredientPhraseForNlStore(core || compound);
  const rawFolded = String(compound || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const coreFolded = String(core || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  if (!core || !String(core).trim()) {
    const singular = singularizeDutchIngredientPhraseForSearch(compound.toLowerCase().trim());
    const key = singular
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (/\b(parmigiano|reggiano|parmigiana)\b/.test(key) || /\bparmezaan(se)?\b/.test(key)) {
      return "Parmezaanse kaas";
    }
    if (/\bgrana\s*padano\b/.test(key) || (/\bgrana\b/.test(key) && /\bpadano\b/.test(key))) {
      return "Grana padano";
    }
    return singular ? singular.charAt(0).toLocaleUpperCase("nl-NL") + singular.slice(1) : "";
  }

  // Herbs: when the ingredient explicitly asks for "verse" herbs, keep that token for AH.
  // This prevents matching spice mixes / dried variants when users mean fresh bunches.
  if (/\bvers(?:e)?\b/.test(rawFolded) || /\bbosje\b/.test(rawFolded)) {
    const herbBase = coreFolded.replace(/^biologisch\s+/i, "");
    const HERBS = new Set(["koriander", "peterselie", "basilicum", "munt", "dille", "bieslook"]);
    if (HERBS.has(herbBase)) {
      core = `verse ${herbBase}`;
    }
  }

  const cleaned = String(core).trim();
  return cleaned ? cleaned.charAt(0).toLocaleUpperCase("nl-NL") + cleaned.slice(1) : "";
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
  if (hostname.endsWith("tiktok.com")) return "tiktok";
  if (hostname.endsWith("instagram.com")) return "instagram";
  if (hostname.endsWith("facebook.com") || hostname.endsWith("fb.com") || hostname.endsWith("fb.watch")) return "facebook";
  if (hostname.endsWith("pinterest.com") || hostname.endsWith("pinterest.nl") || hostname === "pin.it") return "pinterest";
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
  if (/\b(burger|gehakt|vlees|varken|varkens|varkenslappen|varkenshaas|karbonade|schnitzel|speklap|speklappen|procureur|worst|bacon|ham)\b/.test(value))
    return "🥩";
  if (/kip/.test(value)) return "🍗";
  if (/zalm|vis|tonijn/.test(value)) return "🐟";
  if (/\b(ei|eieren)\b/.test(value)) return "🥚";
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

function normalizeChoiceLabelText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectChoiceLabelsFromText(value) {
  const text = normalizeChoiceLabelText(value);
  if (!text) return [];
  const out = new Set();

  if (/\b(biologisch|biologische|bio)\b/.test(text)) out.add("biologisch");
  if (/\bbeter leven\b/.test(text) && /(\b1\b|\b1\s*ster\b|\b1\s*\*\b)/.test(text)) out.add("beter leven 1 ster");
  if (/\bvegetari\w*\b|\bvega\b/.test(text)) out.add("vegetarisch");
  if (/\bvegan\b/.test(text)) out.add("vegan");
  if (/\bplantaardig\b|\bplant based\b|\bplantbased\b/.test(text)) out.add("plantaardig");

  // Inherit hierarchy for better UX downstream.
  if (out.has("vegan")) {
    out.add("vegetarisch");
    out.add("plantaardig");
  }

  return [...out];
}

function createStoreChoice(store, choice) {
  const inferred = detectChoiceLabelsFromText(
    [choice.title, choice.subtitle, choice.badge, choice.searchTerm].filter(Boolean).join(" ")
  );
  const combinedLabels = [
    ...(Array.isArray(choice.labels) ? choice.labels : []),
    ...inferred,
  ]
    .map((l) => sanitizeText(l))
    .filter(Boolean);
  const labels = [...new Set(combinedLabels)];

  const normalizedChoice = {
    ...choice,
    url: choice.url || buildStoreChoiceUrl(store, choice),
    labels,
  };
  return {
    id: `${store}-${String(normalizedChoice.searchTerm || normalizedChoice.title || "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-")}`,
    title: normalizedChoice.title,
    subtitle: normalizedChoice.subtitle,
    price: normalizedChoice.price,
    badge: normalizedChoice.badge || "",
    emoji: normalizedChoice.emoji || "🛒",
    searchTerm: normalizedChoice.searchTerm,
    url: normalizedChoice.url,
    productId: normalizedChoice.productId || "",
    imageUrl: normalizedChoice.imageUrl || "",
    labels: normalizedChoice.labels || [],
    isBonus: Boolean(normalizedChoice.isBonus),
    promotionLabel: sanitizeText(normalizedChoice.promotionLabel || ""),
    matchMeta: normalizedChoice.matchMeta && typeof normalizedChoice.matchMeta === "object" ? normalizedChoice.matchMeta : null,
  };
}

function slugify(value) {
  return sanitizeText(String(value || ""))
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function safeJsonForHtml(value) {
  return JSON.stringify(value || {}).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

function getPublicOrigin(request) {
  const host = sanitizeText(request?.headers?.["x-forwarded-host"] || request?.headers?.host || "localhost");
  const protoHeader = sanitizeText(request?.headers?.["x-forwarded-proto"] || "").split(",")[0].trim();
  const proto = protoHeader || (request?.socket?.encrypted ? "https" : "http");
  return `${proto}://${host}`;
}

function normalizePublicImageUrl(image, origin) {
  const raw = sanitizeText(image || "");
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) return `${origin}${raw}`;
  if (raw && !raw.startsWith("data:")) return `${origin}/${raw.replace(/^\/+/, "")}`;
  return `${origin}/assets/icon-512.png?v=7`;
}

function normalizePublicSourceUrl(url) {
  const raw = sanitizeText(url || "");
  if (!/^https?:\/\//i.test(raw)) return "";
  return raw;
}

function parseRecipeTimeToIsoDuration(value) {
  const text = sanitizeText(value || "");
  const hoursMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:u|uur|hour|hours|h)\b/i);
  const minsMatch = text.match(/(\d+)\s*(?:min|mins|minute|minutes|minuten)\b/i);
  const hours = hoursMatch ? Number(String(hoursMatch[1]).replace(",", ".")) : 0;
  const mins = minsMatch ? Number(minsMatch[1]) : (!hoursMatch && /^\d{1,3}$/.test(text) ? Number(text) : 0);
  const totalMinutes = Math.max(0, Math.round(hours * 60 + mins));
  if (!totalMinutes) return "";
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}`;
}

function getSeoRecipeToken(userId, recipeId) {
  return crypto
    .createHash("sha1")
    .update(`${sanitizeText(userId)}:${sanitizeText(recipeId)}`)
    .digest("base64url")
    .slice(0, 10);
}

function buildSeoRecipeEntry({ userId, email, recipe, updatedAt, origin }) {
  if (!recipe || typeof recipe !== "object") return null;
  const clean = sanitizeRecipeForStorage(recipe);
  if (!clean?.id || !clean?.title) return null;
  const token = getSeoRecipeToken(userId, clean.id);
  const slug = slugify(clean.title) || "recept";
  const seedChannelId = inferSeedChannelIdFromSourceUrl(clean.sourceUrl || "");
  const description =
    sanitizeText(clean.description || "")
      .slice(0, 220) ||
    `Maak ${clean.title} met dit recept op Plately: ingrediënten, bereiding en bron overzichtelijk bij elkaar.`;
  return {
    token,
    slug,
    urlPath: `/recept/${slug}`,
    channelId: seedChannelId,
    userId: sanitizeText(userId),
    email: sanitizeText(email || ""),
    updatedAt: sanitizeText(updatedAt || ""),
    recipe: {
      ...clean,
      description,
      image: normalizePublicImageUrl(clean.image, origin),
      sourceUrl: normalizePublicSourceUrl(clean.sourceUrl),
    },
  };
}

async function listPublicSeoRecipes(origin) {
  const entries = [];

  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const result = await pool.query(`
      SELECT id, email, app_state, updated_at
      FROM plately_users
      WHERE COALESCE(jsonb_array_length(COALESCE(app_state, '{}'::jsonb)->'importedRecipes'), 0) > 0
      ORDER BY updated_at DESC
    `);
    for (const row of result.rows || []) {
      const appState = row.app_state && typeof row.app_state === "object" ? row.app_state : {};
      const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [];
      for (const recipe of recipes) {
        const entry = buildSeoRecipeEntry({
          userId: row.id,
          email: row.email,
          recipe,
          updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : "",
          origin,
        });
        if (entry) {
          entry.seoScore = computeSeoRecipeScore(entry.recipe || recipe);
          entries.push(entry);
        }
      }
    }
  } else {
    const db = await loadDatabase();
    for (const user of Object.values(db.users || {})) {
      const recipes = Array.isArray(user?.importedRecipes) ? user.importedRecipes : [];
      for (const recipe of recipes) {
        const entry = buildSeoRecipeEntry({
          userId: user.id,
          email: user.email || "",
          recipe,
          updatedAt: user.updatedAt || user.createdAt || "",
          origin,
        });
        if (entry) {
          entry.seoScore = computeSeoRecipeScore(entry.recipe || recipe);
          entries.push(entry);
        }
      }
    }
  }

  const byToken = new Map();
  for (const entry of entries) {
    if (!byToken.has(entry.token)) byToken.set(entry.token, entry);
  }
  const uniqueEntries = Array.from(byToken.values());
  const slugCounts = new Map();
  for (const entry of uniqueEntries) {
    const baseSlug = entry.slug || "recept";
    const count = (slugCounts.get(baseSlug) || 0) + 1;
    slugCounts.set(baseSlug, count);
    entry.urlPath = `/recept/${count === 1 ? baseSlug : `${baseSlug}-${count}`}`;
  }
  return uniqueEntries;
}

async function findPublicSeoRecipeByToken(token, origin) {
  const safeToken = sanitizeText(token || "");
  if (!safeToken) return null;
  const entries = await listPublicSeoRecipes(origin);
  return entries.find((entry) => entry.token === safeToken) || null;
}

async function findPublicSeoRecipeByPath(pathSlug, origin) {
  const safeSlug = slugify(pathSlug || "");
  if (!safeSlug) return null;
  const entries = await listPublicSeoRecipes(origin);
  return entries.find((entry) => entry.urlPath === `/recept/${safeSlug}`) || null;
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

function computeSeoRecipeScore(recipe) {
  return getSeoRecipeScoreDetails(recipe).score;
}

function getSeoRecipeScoreDetails(recipe) {
  const issues = getImportedRecipeIssues(recipe);
  const ingredients = Array.isArray(recipe?.ingredients) ? recipe.ingredients.filter((i) => sanitizeText(i?.name || i || "")) : [];
  const instructions = Array.isArray(recipe?.instructions) ? recipe.instructions.filter((s) => sanitizeText(s || "")) : [];
  const checks = [];
  let score = 100;
  function addCheck(key, label, ok, points, kind = "penalty") {
    const delta = kind === "bonus" ? (ok ? points : 0) : (ok ? 0 : -points);
    score += delta;
    checks.push({ key, label, ok: Boolean(ok), points: Math.abs(points), delta });
  }
  addCheck("title", "Titel aanwezig", !issues.includes("missing_title"), 30);
  addCheck("source_url", "Bron-URL aanwezig", !issues.includes("missing_source_url"), 24);
  addCheck("image", "Afbeelding aanwezig", !issues.includes("missing_image"), 14);
  addCheck("ingredients", "Minimaal 2 ingrediënten", !issues.includes("too_few_ingredients"), 22);
  addCheck("steps", "Bereidingsstappen aanwezig", !issues.includes("missing_steps"), 24);
  addCheck("description", "Beschrijving aanwezig", Boolean(sanitizeText(recipe?.description || "")), 8);
  addCheck("ingredient_depth", "Minimaal 5 ingrediënten", ingredients.length >= 5, 4, "bonus");
  addCheck("step_depth", "Minimaal 3 stappen", instructions.length >= 3, 4, "bonus");
  addCheck("rating", "Beoordeling aanwezig", Number(recipe?.ratingCount) > 0 && Number(recipe?.ratingValue) > 0, 4, "bonus");
  const finalScore = Math.max(0, Math.min(100, Math.round(score)));
  return {
    score: finalScore,
    grade: finalScore >= 85 ? "good" : finalScore >= 65 ? "warn" : "bad",
    issues,
    checks,
    reasons: checks.filter((check) => check.delta < 0).map((check) => check.label),
    bonuses: checks.filter((check) => check.delta > 0).map((check) => check.label),
  };
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
  if (/\b(?:ui|uien|sjalot(?:ten)?)\b/.test(value)) {
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
  // Use word boundaries: avoid matching "slagroom" as "sla".
  if (/\b(?:sla|ijsbergsla|rucola|spinazie)\b/.test(value)) {
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
  if (/\b(?:ei|eieren)\b/.test(value)) {
    return choiceSet(
      { title: `${prefix} Scharreleieren`, subtitle: "6 stuks", price: "€2,69", emoji: "🥚", searchTerm: `${prefix} scharreleieren` },
      { title: `${bioPrefix} Eieren`, subtitle: "6 stuks", price: "€3,19", emoji: "🥚", searchTerm: `${bioPrefix} eieren` }
    );
  }
  if (/\b(?:melk|yoghurt|room)\b/.test(value)) {
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
    imageUrl: (() => { const raw = sanitizeText(product.imageUrl || ""); return isAllowedImageProxyUrl(raw) ? `/api/image-proxy?url=${encodeURIComponent(raw)}` : raw; })(),
    labels: Array.isArray(product.labels) ? product.labels : [],
    isBonus: Boolean(product.isBonus),
    promotionLabel: sanitizeText(product.promotionLabel || ""),
    matchMeta: product.matchMeta && typeof product.matchMeta === "object" ? product.matchMeta : null,
  };

  choice.url = buildStoreChoiceUrl(store, choice);
  return createStoreChoice(store, choice);
}

function parseAmountNumberForStore(text) {
  const raw = sanitizeText(text || "").toLowerCase().replace(",", ".");
  const fraction = raw.match(/\b(\d+)\s*\/\s*(\d+)\b/);
  if (fraction) {
    const a = Number(fraction[1]);
    const b = Number(fraction[2]);
    if (Number.isFinite(a) && Number.isFinite(b) && b > 0) return a / b;
  }
  const m = raw.match(/\b(\d+(?:\.\d+)?)\b/);
  const n = m ? Number(m[1]) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function parsePackageAmountForStore(text, unitPattern) {
  const raw = sanitizeText(text || "").toLowerCase().replace(",", ".");
  const multi = raw.match(new RegExp(`\\b(\\d+(?:\\.\\d+)?)\\s*x\\s*(\\d+(?:\\.\\d+)?)\\s*${unitPattern}\\b`, "i"));
  if (multi) {
    const count = Number(multi[1]);
    const size = Number(multi[2]);
    if (Number.isFinite(count) && Number.isFinite(size) && count > 0 && size > 0) return count * size;
  }
  const m = raw.match(new RegExp(`\\b(\\d+(?:\\.\\d+)?)\\s*${unitPattern}\\b`, "i"));
  const n = m ? Number(m[1]) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

function estimateAhHandoffQuantity(item, product) {
  const amount = sanitizeText(item?.amount || item?.ingredientAmount || "");
  const packText = `${sanitizeText(product?.name || product?.title || "")} ${sanitizeText(product?.subtitle || "")}`;
  const grams = parsePackageAmountForStore(amount, "g|gram");
  if (grams) {
    const packGrams = parsePackageAmountForStore(packText, "kg|kilo|kilogram") * 1000 || parsePackageAmountForStore(packText, "g|gram");
    if (packGrams) return Math.max(1, Math.min(24, Math.ceil(grams / packGrams)));
  }
  const kg = parsePackageAmountForStore(amount, "kg|kilo|kilogram");
  if (kg) {
    const packGrams = parsePackageAmountForStore(packText, "kg|kilo|kilogram") * 1000 || parsePackageAmountForStore(packText, "g|gram");
    if (packGrams) return Math.max(1, Math.min(24, Math.ceil((kg * 1000) / packGrams)));
  }
  const ml = parsePackageAmountForStore(amount, "ml|milliliter");
  if (ml) {
    const packMl = parsePackageAmountForStore(packText, "l|liter") * 1000 || parsePackageAmountForStore(packText, "ml|milliliter");
    if (packMl) return Math.max(1, Math.min(24, Math.ceil(ml / packMl)));
  }
  const liters = parsePackageAmountForStore(amount, "l|liter");
  if (liters) {
    const packMl = parsePackageAmountForStore(packText, "l|liter") * 1000 || parsePackageAmountForStore(packText, "ml|milliliter");
    if (packMl) return Math.max(1, Math.min(24, Math.ceil((liters * 1000) / packMl)));
  }
  if (/\b(x|stuks?|stuk|pakken?|blik(?:ken)?|zak(?:ken)?|fles(?:sen)?|pot(?:ten)?)\b/i.test(amount)) {
    return Math.max(1, Math.min(24, Math.ceil(parseAmountNumberForStore(amount))));
  }
  return 1;
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

function stripSocialUiArtifacts(text) {
  const raw = String(text || "");
  if (!raw) return "";

  const scrapedPrefixPattern = /^\s*(?:[-•]\s*)?[\p{L}\p{N}._-]+\s+on\s+[A-Za-z]+\s+\d{1,2},\s+\d{4}\s*:\s*/iu;

  const lines = raw
    .replace(/\r\n/g, "\n")
    .split("\n")
    // Keep some structure (Claude likes paragraphs), but normalize repeated blank lines.
    .map((line) => String(line).replace(/\s+/g, " ").trimEnd());

  const kept = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
      // Preserve paragraph separation but avoid long blank runs.
      if (kept.length && kept[kept.length - 1] !== "") kept.push("");
      continue;
    }

    // If social UI lines were removed above, a scraped prefix might become the new first line.
    // Strip it here as well so the remaining caption starts cleanly.
    line = line.replace(scrapedPrefixPattern, "").replace(/^["“”]+|["“”]+$/g, "").trim();
    if (!line) {
      continue;
    }

    // If we hit a "Likes" section heading (often from reader/markdown),
    // drop it and everything below.
    if (/^(?:#+\s*)?likes\b/i.test(line)) {
      break;
    }

    // Cut trailing social blocks (Instagram UI / scraped metadata).
    const looksLikeUiLine =
      /^(see translation|meer weergeven|more|follow|volgen|original audio|originele audio|add yours|repost|bericht|posts?)\b/i.test(line) ||
      /•\s*(follow|volgen)\b/i.test(line) ||
      /^(liked by|leuk gevonden door)\b/i.test(line) ||
      /^\s*[\d.,]+\s*(likes|comments|reacties|weergaven|views)\b/i.test(line) ||
      /\b(?:likes|comments|reacties|weergaven|views)\b.*\b(?:and|en)\b.*\b(?:others|anderen)\b/i.test(line);

    if (looksLikeUiLine) {
      // These blocks are typically at the end; once they start, everything below is noise.
      // If it appears mid-text, we still drop the line but keep scanning.
      const nearEnd = i >= Math.max(0, lines.length - 6);
      if (nearEnd) break;
      continue;
    }

    kept.push(line);
  }

  return kept
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripSocialNoise(text) {
  let out = normalizeFractions(String(text || ""));

  // Remove common web-scrape prefixes like:
  // 'username on April 26, 2026: "caption..."'
  out = out
    .replace(/^\s*(?:[-•]\s*)?[\p{L}\p{N}._-]+\s+on\s+[A-Za-z]+\s+\d{1,2},\s+\d{4}\s*:\s*/iu, "")
    .replace(/^["“”]+|["“”]+$/g, "");

  // If caption contains multiple quantity tokens in a row, it's often an ingredient run.
  // Turn "voor 1 tosti 1 ui 2 plakken brood ..." into newline-separated items.
  const qtyHits = out.match(new RegExp(`${QUANTITY_PATTERN}(?:\\s*${UNIT_PATTERN})?`, "gi")) || [];
  if (qtyHits.length >= 2) {
    out = out.replace(
      new RegExp(
        `\\s+(?=${QUANTITY_PATTERN}\\s*(?:${UNIT_PATTERN})?\\s+[\\p{L}])`,
        "giu"
      ),
      "\n"
    );
  }

  // Remove Instagram/Facebook "social UI" artifacts that sometimes get scraped into
  // og:description/twitter:description or reader fallbacks (likes/views/comments/etc).
  out = stripSocialUiArtifacts(out);

  return out
    .replace(/https?:\/\/\S+/gi, " ")
    .replace(/#[\p{L}\p{N}_-]+/gu, " ")
    .replace(/@[\p{L}\p{N}._-]+/gu, " ")
    .replace(/(?:^|\s)(fyp|fy|viral|reels?|recipeoftheday|foodtok|foodie|easyrecipe)(?:\s|$)/gi, " ")
    .replace(/\b(link in bio|follow for more|save this|part \d+|original sound|audio by)\b/gi, " ")
    .replace(/\b(controleer\s+bron|check\s+source|source\s*:\s*)\b/gi, " ")
    .replace(/[•●▪◦]/g, "\n- ")
    .replace(/\s-\s(?=[A-Za-zÀ-ÿ0-9])/g, "\n- ")
    // Fix "glued" ingredient lists often seen on Instagram captions:
    // "Recept voor 1 tosti1 ui2 plakken brood..." -> force newlines before numbers when stuck to words.
    .replace(/([\p{L}])(\d)(?=\s*(?:[\p{L}]|\b(?:g|gr|kg|mg|ml|dl|cl|l|el|tl|x|stuks?|stuk|plakken|plak|teen|snuf|handje)\b))/gu, "$1\n$2")
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
  const raw = String(value || "").trim();
  // Jina warning lines look like "Warning: Target URL returned error 403…";
  // splitting on `:` would wrongly yield the 7-letter word "Warning" as the title.
  const withoutLeadingWarning = raw.replace(/^(?:warning|error|notice)\s*:\s*/i, "").trim();
  const splitSource = withoutLeadingWarning || raw;
  const clean = sanitizeText(
    stripSocialNoise(
      splitSource
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
  if (/^(warning|error|notice|forbidden|moment|cloudflare|captcha)$/i.test(clean)) {
    return "";
  }
  if (/^target url returned error\b/i.test(clean)) {
    return "";
  }

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
      // Only strip actual list numbering like "1. " / "2) " — not decimals like "2.5".
      .replace(/^\d+\s*[.)-]\s+/, "")
      .replace(/^[-–]\s*/, "")
  );
}

function isLikelyIngredientLine(line) {
  const clean = cleanListLine(line);
  if (!clean || clean.length > 90 || INSTRUCTION_HEADING_PATTERN.test(clean)) {
    return false;
  }
  if (isLikelyRecipeMarkdownNoiseLine(clean)) {
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

function isLikelyRecipeMarkdownNoiseLine(line) {
  const clean = sanitizeText(line || "");
  if (!clean) return true;
  if (/^!?\[[^\]]+\]\(/.test(clean)) return true;
  if (/^https?:\/\//i.test(clean)) return true;
  if (/^(recepten|italiaanse recepten|makkelijke recepten|noten recepten|pasta recepten|snelle recepten)$/i.test(clean)) return true;
  if (/^(bekijk|koop|shop|winkelmand|in winkelmand|toevoegen|bestel|aanbieding|sale)\b/i.test(clean)) return true;
  if (/\b(miljuschka\s+)?(pastabord|snijplank|pastamachine|servies|bord|borden|pan|pannen|mes|messen|keukenmachine)\b/i.test(clean)) return true;
  if (/^(?:€\s*)?\d{1,4}(?:[,.]\d{2}|,-)?$/.test(clean)) return true;
  if (/^\d{1,4}(?:[,.]\d{2}|,-)$/.test(clean)) return true;
  return false;
}

function isLikelyInstructionLine(line) {
  const clean = cleanListLine(line);
  // Lower minimum length to catch shorter instructions like "Bak 5 min"
  if (!clean || clean.length < 8) {
    return false;
  }
  if (INSTRUCTION_HEADING_PATTERN.test(clean)) {
    return true;
  }
  // Numbered list detection: 1. , 2) , 3- , etc
  if (/^\d+\s*[.)-]\s+/.test(String(line || ""))) {
    return true;
  }
  if (INSTRUCTION_START_PATTERN.test(clean)) {
    return true;
  }
  // Expanded cooking verbs - covers most common cooking actions in Dutch/English
  return /\b(oven|minutes?|minuten|bake|cook|bak|kook|mix|meng|serveer|serve|add|voeg|toevoegen|snij|snijd|slice|slice|finely|fijnsnijden|dice|hakken|chop|hacken|grate|rasp|blend|blender|puree|purreren|beat|klop|whisk|whisk|knead|kneden|knead|fold|vouwen|combine|combineer|combine|combine|combine|stir|roer|stir|fry|bakken|sauté|fruiten|roast|rooster|grill|grillen|toast|roosteren|boil|kook|simmer|sudderen|braise|schmoren|poach|pocheren|steam|stomen|baste|begoten|marinate|marineer|season|kruiden|taste|proeven|adjust|afstellen|transfer|overplaatsen|drain|afgieten|rinse|uitspoelen|wash|was|wassen|peel|pel|peal|schil|core|ontpitten|pit|pitten|pit|stem|steeltje|remove|verwijderen|discard|weggooien|top|garnish|garneren|dust|bestrooien|sprinkle|strooien|drizzle|druppelen|pour|gieten|scoop|scheppen|layer|laag|layer|cool|afkoelen|chill|koud|koel|rest|laten|rest|set|zetten|sit|zit|sit|sit|serve|serveer|plate|presenteren|plate|rest|rustigen|prep|voorbereiden|prep|par|gedeeltelijk|prep|blanch|blancheren|blanch|shock|shock|shock|glaze|glaceer|glaze|caramelize|carameliseren|candy|suiker|candy|candy|candy|pickle|inleggen|pickle|candy|candy|candy|candy|preserve|conserveren|pickle|candy|candy|candy|syrup|stroop|candy|candy|candy|candy|candy|jam|jam|jam|marmalade|marmelade|preserve|jam|jam|jam|candy|candy|candy|candy|candy|candy|candy|candy|candy|candy|jam|jam|jam|jam|jam|jam|jam|jam|jam|jam|jam|jam|jam|laat|wait|wacht|wait|rest|temperature|temperatuur|merk|merk|mark|mark|sear|sear|brown|bruin|bruinen|char|branden|blacken|verbranden|singe|schroeien|smoke|rook|roking|roast|roaster|braise|braiser|stew|stoofpot|mull|overwegen|mulled|glühwein|mulled|mulled|punch|ponch|punch|punch|punch|mulled|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch|punch)\b/i.test(clean);
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
  let pendingListNumber = "";
  for (const rawLine of expanded) {
    const clean = cleanListLine(rawLine);
    if (!clean) {
      continue;
    }
    // Some sites (e.g. Uit Paulines Keuken) render ordered lists as:
    // "1" on its own line, followed by the instruction line. Treat the
    // standalone number as a prefix for the next line, not as its own step.
    const numberOnlyMatch = clean.match(/^(\d{1,3})\s*[.)-]?\s*$/);
    if (numberOnlyMatch) {
      pendingListNumber = numberOnlyMatch[1] || "";
      continue;
    }

    let effectiveClean = clean;
    if (pendingListNumber) {
      const alreadyNumbered = new RegExp(`^${pendingListNumber}\\s*[.)-]\\s+`).test(effectiveClean);
      if (!alreadyNumbered) {
        effectiveClean = `${pendingListNumber}. ${effectiveClean}`;
      }
      pendingListNumber = "";
    }
    const shouldStartNew =
      /^\d+\s*[.)-]\s*/.test(String(rawLine || "")) ||
      INSTRUCTION_START_PATTERN.test(clean) ||
      merged.length === 0;

    if (shouldStartNew) {
      merged.push(effectiveClean);
      continue;
    }

    merged[merged.length - 1] = `${merged[merged.length - 1]} ${effectiveClean}`.trim();
  }
  return [...new Set(merged)].map((step) => sanitizeText(step)).filter(Boolean);
}

function postProcessExtractedSections({ ingredients, instructions }) {
  const safeIngredients = Array.isArray(ingredients) ? ingredients.map((s) => sanitizeText(String(s || ""))).filter(Boolean) : [];
  const safeInstructions = Array.isArray(instructions) ? instructions.map((s) => sanitizeText(String(s || ""))).filter(Boolean) : [];

  const finalIngredients = [];
  const finalInstructions = [];

  // Move instruction-like lines out of ingredients (common failure mode for social captions)
  for (const line of safeIngredients) {
    if (isLikelyInstructionLine(line)) {
      finalInstructions.push(line);
    } else {
      finalIngredients.push(line);
    }
  }

  // Move ingredient-like lines out of instructions (rare but happens: "2 eieren" as a step)
  for (const line of safeInstructions) {
    if (isLikelyIngredientLine(line) && !isLikelyInstructionLine(line)) {
      finalIngredients.push(line);
    } else {
      finalInstructions.push(line);
    }
  }

  return {
    ingredients: [...new Set(finalIngredients)].slice(0, 24),
    instructions: mergeInstructionLines(finalInstructions).slice(0, 14),
  };
}

function mergeSocialExtraction({ claudeIngredients = [], claudeInstructions = [], captionText = "" }) {
  const caption = sanitizeText(String(captionText || ""));
  const heurIngredients = caption ? extractIngredientsFromText(caption) : [];
  const heurInstructions = caption ? extractInstructionsFromText(caption) : [];

  const post = postProcessExtractedSections({
    ingredients: Array.isArray(claudeIngredients) ? claudeIngredients : [],
    instructions: Array.isArray(claudeInstructions) ? claudeInstructions : [],
  });

  // If Claude missed items, fill from heuristics (caption parsing is often better at quantities).
  const mergedIngredients = [
    ...(post.ingredients || []),
    ...(heurIngredients || []).map((i) => i?.name ? `${i.quantity || ""} ${i.unit || ""} ${i.name}`.trim() : "").filter(Boolean),
  ];
  const mergedInstructions = [
    ...(post.instructions || []),
    ...(heurInstructions || []),
  ];

  return postProcessExtractedSections({
    ingredients: mergedIngredients,
    instructions: mergedInstructions,
  });
}

function buildClaudeSocialInput({ titleHint, caption, pageText, note }) {
  const cap = sanitizeText(String(caption || ""));
  const txt = sanitizeText(String(pageText || ""));
  const ttl = sanitizeText(String(titleHint || ""));
  const n = sanitizeText(String(note || ""));

  const structured = cap ? extractStructuredSections(cap) : { ingredients: [], instructions: [], intro: [] };
  const structuredSummary = [
    structured.title ? `TITLE_HINT: ${structured.title}` : "",
    structured.ingredients?.length ? `INGREDIENT_LINES:\n- ${structured.ingredients.slice(0, 24).join("\n- ")}` : "",
    structured.instructions?.length ? `INSTRUCTION_LINES:\n- ${structured.instructions.slice(0, 14).join("\n- ")}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  // Keep it short and information-dense for the model.
  const parts = [
    ttl ? `TITLE_HINT: ${ttl}` : "",
    cap ? `CAPTION:\n${cap}` : "",
    txt ? `PAGE_TEXT:\n${txt.slice(0, 2200)}` : "",
    structuredSummary ? `STRUCTURED_HINTS:\n${structuredSummary}` : "",
    n ? `NOTE:\n${n}` : "",
  ].filter(Boolean);

  return parts.join("\n\n").slice(0, 5000);
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
        /^(.*?)(?:\b(?:instructions?|method|steps?|bereidingswijze|bereiding|werkwijze)\b\s*:?)(.*)$/i
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
  const raw = sanitizeText(String(description || ""));
  // If the "description" accidentally contains embedded ingredient/instruction sections,
  // cut it off at the first heading.
  const cutAtHeading = raw.split(/\b(?:ingredients?|ingrediënten|ingredienten|instructions?|method|steps?|bereiding|bereidingswijze|werkwijze)\b\s*:?\s*/i)[0];
  const clean = sanitizeText(
    cutAtHeading
      .replace(new RegExp(`^${escapeRegex(String(title || ""))}[!.,:\\s-]*`, "i"), "")
      .replace(/^\s*&\s*/i, "") // "& ..." is a common TikTok caption artifact
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

function isMiljuschkaHost(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./i, "").toLowerCase();
    return h === "miljuschka.nl";
  } catch {
    return false;
  }
}

function cleanMiljuschkaDescription(description, title = "") {
  let clean = sanitizeText(String(description || ""));
  if (!clean) return "";
  clean = clean
    .replace(/^.*?\bHome\s*\/\s*/i, "")
    .replace(/\b(Recepten|Italiaanse recepten|Makkelijke recepten|Noten recepten|Pasta recepten|Snelle recepten)\b/gi, " ")
    .replace(/!\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/\b(?:miljuschka\s+)?(?:pastabord|snijplank|pastamachine|servies|shop|winkelmand)\b[^.?!]*/gi, " ")
    .replace(/\b(?:€\s*)?\d{1,4}(?:[,.]\d{2}|,-)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const titleClean = sanitizeText(title || "");
  if (titleClean) {
    clean = clean.replace(new RegExp(`^${escapeRegex(titleClean)}[\\s:.,-]*`, "i"), "").trim();
  }
  if (!clean || clean.length < 30) return "";
  if (/^(recepten|italiaanse recepten|makkelijke recepten|noten recepten|pasta recepten|snelle recepten)\b/i.test(clean)) return "";
  if (/pastabord|snijplank|pastamachine|winkelmand|^\d{1,4}(?:[,.]\d{2}|,-)?$/i.test(clean)) return "";
  const sentences = clean
    .split(/(?<=[.!?])\s+/)
    .map((s) => sanitizeText(s))
    .filter(Boolean)
    .filter((s) => !isLikelyRecipeMarkdownNoiseLine(s));
  return sanitizeText((sentences.length ? sentences.slice(0, 2).join(" ") : clean).slice(0, 220));
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
      .filter((item) => !/^(eet\s+smakelijk|bon\s+app(e|é)tit|buon\s+app(e|é)tit)\b/i.test(String(item.name || "")))
  );
}

// Shared Claude API caller — returns raw parsed JSON or null
async function callClaudeApi(systemPrompt, userPrompt, maxTokens = 2048) {
  if (!ANTHROPIC_API_KEY) return null;
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
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    const rawText = data.content?.[0]?.text || "";
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    const result = JSON.parse(jsonMatch[0]);
    if (!result.title || !Array.isArray(result.ingredients) || !Array.isArray(result.instructions)) return null;
    return result;
  } catch {
    return null;
  }
}

// Extract clean readable text from HTML for Claude input
function removeAdContainers(html) {
  // Remove common ad containers and interrupting elements
  return html
    .replace(/<(?:div|section|aside)[^>]*(?:id|class)="[^"]*(?:ad|advertisement|advert|banner|popup|modal|sidebar|related|recommend|newsletter|subscribe|form|chat|widget)[^"]*"[^>]*>[\s\S]*?<\/(?:div|section|aside)>/gi, " ")
    .replace(/<!-- ?ad[\s\S]*?-->/gi, " ")
    .replace(/<ins[^>]*>[\s\S]*?<\/ins>/gi, " ")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, " ");
}

function extractReadableTextFromHtml(html, maxLength = 6000) {
  // First remove ads and interrupting content
  let noAds = removeAdContainers(html);

  // Remove script, style, nav, footer, aside, header blocks
  let cleaned = noAds
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<aside[\s\S]*?<\/aside>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  // Convert block elements to newlines
  cleaned = cleaned
    .replace(/<\/?(?:p|li|h[1-6]|div|section|article|br)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/&[a-z]+;/gi, " ");
  // Collapse whitespace
  cleaned = cleaned
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return cleaned.slice(0, maxLength);
}

// Social media caption → structured recipe via Claude
// If caption has little info, Claude will infer a complete recipe from the dish name
async function extractWithClaude(caption, note) {
  if (!ANTHROPIC_API_KEY || !caption) return null;

  const systemPrompt =
    "Je bent een culinaire assistent die receptdata extraheert én aanvult. " +
    "Als de tekst ingrediënten en stappen bevat, extraheer je ze. " +
    "Als de tekst alleen een gerechtnaam bevat, genereer je zelf een compleet realistisch recept. " +
    "Je output is altijd alleen geldige JSON, nooit markdown, nooit uitleg.";

  const captionText = caption.slice(0, 4000);
  const noteText = note ? `\nExtra context van de gebruiker: ${note}` : "";

  const userPrompt = [
    "Maak een gestructureerd recept op basis van onderstaande tekst (social media post of video-omschrijving).",
    "BELANGRIJK: Dit is waarschijnlijk een Instagram reel/post. Zoek naar:",
    "- Ingrediënten: kunnen gelabeld zijn met 'Ingrediënten:', '🥘', '📝', of simpel gelistet met hoeveelheden (750 g, 95 ml, etc)",
    "- Bereiding: kunnen gelabeld zijn met 'Bereiding:', 'Stappen:', '👨‍🍳', of genummerd (1., 2., 3. of 1) of met punten",
    "- Serverings-info: vaak bovenaan: '4 PERS.', '60 MIN.', 'voor 4 personen', etc",
    "- Emojis kunnen sectie-scheidingen zijn (🥘 = ingrediënten, 👨‍🍳 = bereiding)",
    "",
    "EXTRACT LETTERLIJK: Als ingrediënten duidelijk gelistet zijn met hoeveelheden, extraheer die precies.",
    "EXTRACT LETTERLIJK: Als bereiding genummerd is (1., 2., 3.) of als stappen duidelijk gescheiden, extraheer die precies.",
    "Lees zeer zorgvuldig door emoji's, regeleinden en formattering heen.",
    "Als de tekst alleen een gerechtnaam bevat, genereer dan zelf een volledig en realistisch recept.",
    "",
    "Tekst:",
    captionText,
    noteText,
    "",
    "Geef precies dit JSON-object terug:",
    '{',
    '  "title": "Naam van het gerecht in het Nederlands. Gebruik ALLEEN wat in de tekst staat. Als er geen duidelijke gerechtnaam is, noem dan de 3-5 hoofdingrediënten (bijv. \'Kip, courgette & tomatensaus\'). NOOIT een gerecht verzinnen.",',
    '  "description": "1-2 zinnen smakelijke omschrijving in het Nederlands. Beschrijf het gerecht en de smaak — GEEN kookinstructies, GEEN vermelding van Instagram of social media.",',
    '  "ingredients": [',
    '    {"quantity": "2", "unit": "x", "name": "avocado"},',
    '    {"quantity": "200", "unit": "g", "name": "kipfilet"},',
    '    {"quantity": "3", "unit": "el", "name": "sojasaus"}',
    '  ],',
    '  "instructions": [',
    '    "Verhit olie in een pan op middelhoog vuur.",',
    '    "Voeg de ui toe en bak 3 minuten tot glazig.",',
    '    "Voeg de kip toe en bak 5-7 minuten tot goudbruin."',
    '  ],',
    '  "time": "25 min",',
    '  "servings": "4"',
    '}',
    "",
    "Strikte regels:",
    "- title: NOOIT 'TikTok', 'Instagram', liedjestitels, hashtags of @-namen. NOOIT een gerecht bedenken dat niet in de tekst staat. Als er geen naam is: gebruik de hoofdingrediënten gescheiden door komma's en &.",
    "- ingredients: minimaal 4, maximaal 16. Gebruik units: g, kg, ml, l, el, tl, x, stuks, krop, bosje, zakje, teen, snuf, handje.",
    "- instructions: 4-8 stappen. Elke stap = één kookhandeling. Nederlands. Concreet (tijden, temperaturen).",
    "- time: totale bereidingstijd in minuten. Als je '4 PERS. – 60 MIN.' ziet, gebruik 60 min.",
    "- servings: aantal porties als getal-string ('4', '6', etc). Als je '4 PERS.' ziet, is servings '4'.",
    "- description: beschrijf smaak, textuur en aanleiding. NOOIT 'Instagram', 'reel', 'post', '@naam', 'recipe', 'recept' als woord erin. Niet beginnen met 'Dit recept' of 'In dit recept'.",
    "- Als informatie ontbreekt: genereer zelf een authentiek, realistisch recept.",
  ].join("\n");

  return callClaudeApi(systemPrompt, userPrompt, 2048);
}

// Website/Facebook page text → structured recipe via Claude
// Used as fallback when JSON-LD parsing fails or is incomplete
async function extractWithClaudeFromWebPage(pageText, title, url, note) {
  if (!ANTHROPIC_API_KEY || (!pageText && !title)) return null;

  const systemPrompt =
    "Je bent een culinaire data-extractor. Extraheer receptinformatie uit webpaginatekst. " +
    "Je output is altijd alleen geldige JSON, nooit markdown, nooit uitleg.";

  const contextText = [title ? `Paginatitel: ${title}` : "", pageText ? pageText.slice(0, 5000) : ""]
    .filter(Boolean)
    .join("\n\n");
  const noteText = note ? `\nExtra context: ${note}` : "";

  const userPrompt = [
    "Extraheer een compleet recept uit onderstaande webpaginatekst.",
    "Als de tekst een volledig recept bevat, extraheer ingrediënten en stappen zo letterlijk mogelijk.",
    "Als details ontbreken, vul ze aan met realistische culinaire kennis.",
    "",
    "Paginatekst:",
    contextText,
    noteText,
    "",
    "Geef precies dit JSON-object terug:",
    '{',
    '  "title": "Naam van het gerecht in het Nederlands",',
    '  "description": "1-2 zinnen omschrijving",',
    '  "ingredients": [',
    '    {"quantity": "200", "unit": "g", "name": "pasta"},',
    '    {"quantity": "2", "unit": "x", "name": "ei"}',
    '  ],',
    '  "instructions": [',
    '    "Kook de pasta volgens de verpakking.",',
    '    "Klop de eieren los met kaas."',
    '  ],',
    '  "time": "30 min",',
    '  "servings": "2"',
    '}',
    "",
    "Regels:",
    "- ingredients: minimaal 3, maximaal 20. Units: g, kg, ml, l, el, tl, x, stuks, krop, bosje, zakje, teen, snuf, handje.",
    "- instructions: 3-10 stappen in het Nederlands. Elke stap = één handeling.",
    "- Gebruik informatie van de pagina zo veel mogelijk letterlijk.",
  ].join("\n");

  return callClaudeApi(systemPrompt, userPrompt, 2048);
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

  // Filter common non-ingredient noise that can leak into ingredient lists
  if (/^(eet\s+smakelijk|enjoy|bon\s+app(e|é)tit|buon\s+app(e|é)tit|serveer\s+maar|succes)\b/i.test(clean)) {
    return { quantity: "", unit: "", name: "" };
  }
  if (isLikelyRecipeMarkdownNoiseLine(clean)) {
    return { quantity: "", unit: "", name: "" };
  }

  // Fix glued number+unit: "1kg kip" -> "1 kg kip"
  const cleanWithUnitSpacing = clean.replace(
    new RegExp(`(${QUANTITY_PATTERN})\\s*(${UNIT_PATTERN})(?=\\s|$)`, "i"),
    "$1 $2"
  );

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

  const match = cleanWithUnitSpacing.match(
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
    if (!item?.name || NON_FOOD_INGREDIENT_PATTERN.test(item.name) || KITCHEN_TOOL_INGREDIENT_RE.test(item.name)) {
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

  // Increased limit to capture more ingredients (was 12, now 20)
  const normalized = normalizeIngredientList(candidates.map(parseIngredientLine));
  return normalized.slice(0, Math.max(16, normalized.length));
}

function extractInstructionsFromText(text) {
  const structured = extractStructuredSections(text);
  const candidates = structured.instructions.length
    ? structured.instructions
    : mergeInstructionLines(splitCaptionLines(text).filter((line) => isLikelyInstructionLine(line)));
  // Increased limit to capture more steps (was 8, now 12)
  const finalized = finalizeInstructionSteps(candidates);
  return finalized.slice(0, Math.max(12, finalized.length));
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

function expandInstructionSteps(rawSteps) {
  const source = Array.isArray(rawSteps) ? rawSteps : [];
  const expanded = [];
  for (const step of source) {
    const clean = sanitizeText(String(step || ""));
    if (!clean) continue;

    // Split arrow chains and hard separators first
    const arrowSplit = clean.split(/\s*(?:→|->|⇒)\s*/g).filter(Boolean);
    for (const chunk of arrowSplit) {
      // If we have a long, punctuation-poor "caption style" instruction blob, insert breaks.
      // Example: "Tomaten halveren Chilipepers snijden Olie in een pan Kip toevoegen ..."
      let normalizedChunk = chunk;
      if (normalizedChunk.length > 80) {
        normalizedChunk = normalizedChunk
          // Break on "Object Verb" patterns (capitalized noun + infinitive verb)
          .replace(
            /(?<!^)\s+(?=(?:[A-ZÀ-Ý][\p{L}]+)\s+(?:halveren|snijden|toevoegen|bakken|mengen|afdekken|serveren|koken|laten)\b)/gu,
            "\n"
          )
          // Break before imperative/verb starts when glued in one line
          .replace(
            /(?<!^)\s+(?=(?:halveer|snijd|verhit|voeg|meng|bak|kook|laat|serveer|afdek|dek|roer|giet|breng|haal|verwijder|pel|marineer|kruid|klop|stamp|prak|pureer)\b)/gi,
            "\n"
          );
      }

      // If the chunk contains multiple actions separated by commas, split when next part starts with a cooking verb.
      const preParts = normalizedChunk.split(/\n+/).map((s) => sanitizeText(s)).filter(Boolean);
      for (const pre of preParts) {
        const commaParts = pre.split(/\s*,\s*(?=(?:mix|add|bake|cook|toast|top|serve|blend|heat|roast|whisk|slice|spread|bak|voeg|snij|snijd|halveer|serveer|kook|maak|meng|verhit|roer|leg|dek|bestrooi|giet|laat|verwarm|doe|gooi|strooi|breng|schenk|haal|verwijder|pel|marineer|kruid|klop|stamp|prak|pureer|grill|stir|fry|airfry|season|drizzle|combine)\b)/i);
        for (const part of commaParts) {
          // Also split sentence-like punctuation
          const sentenceParts = sanitizeText(part).split(STEP_SENTENCE_SPLIT_RE).filter(Boolean);
          for (const s of sentenceParts) expanded.push(sanitizeText(s));
        }
      }
    }
  }
  return expanded.filter(Boolean);
}

function stripInstructionStepPrefix(step) {
  const value = sanitizeText(String(step || ""));
  if (!value) return "";

  // Strip ordered-list style numbering like "1. " / "2) " but keep decimals like "2.5"
  // (requires whitespace after punctuation to match).
  const noNumber = value.replace(/^\s*\d+\s*[.)]\s+/, "");

  // Strip "stap 3: ..." / "step 3 - ..." style prefixes.
  return sanitizeText(noNumber.replace(/^\s*(?:stap|step)\s*\d+\s*[:\-]\s*/i, ""));
}

function finalizeInstructionSteps(steps) {
  const mergeStandaloneListNumbers = (list) => {
    const source = Array.isArray(list) ? list.map((s) => sanitizeText(String(s || ""))).filter(Boolean) : [];
    if (source.length < 2) return source;

    const merged = [];
    for (let i = 0; i < source.length; i += 1) {
      const cur = source[i];
      const next = source[i + 1];
      const numberOnlyMatch = cur.match(/^(\d{1,3})\s*[.)-]?\s*$/);
      if (numberOnlyMatch && next) {
        const num = numberOnlyMatch[1] || "";
        const trimmedNext = String(next || "").trim();
        const alreadyNumbered = new RegExp(`^${num}\\s*[.)-]\\s+`).test(trimmedNext);
        merged.push(alreadyNumbered ? trimmedNext : `${num}. ${trimmedNext}`);
        i += 1;
        continue;
      }
      if (numberOnlyMatch && !next) {
        // Drop trailing number-only tokens.
        continue;
      }
      merged.push(cur);
    }
    return merged;
  };

  const mergeDanglingConjunctions = (list) => {
    const source = Array.isArray(list) ? list.map((s) => sanitizeText(String(s || ""))).filter(Boolean) : [];
    if (source.length < 2) return source;

    const merged = [];
    for (let i = 0; i < source.length; i += 1) {
      const cur = source[i];
      const next = source[i + 1];
      if (!next) {
        merged.push(cur);
        continue;
      }

      const trimmedCur = cur.trim();
      const lastWord = trimmedCur.split(/\s+/).pop() || "";
      const endsDangling =
        ["en", "of", "maar", "tot", "om"].includes(lastWord.toLowerCase()) ||
        /,\s*$/.test(trimmedCur);

      // Merge only when the next step looks like a continuation.
      // (Some sites capitalize the first verb of a continuation step.)
      const nextLooksContinuation =
        /^[a-zà-ÿ]/.test(next) ||
        /^(?:roer|laat|giet|verdeel|voeg|meng|klop|doe|zet|bak|kook|serveer|verwarm|haal|breng|strooi)\b/i.test(next);

      if (endsDangling && nextLooksContinuation) {
        merged.push(sanitizeText(`${cur} ${next}`));
        i += 1;
        continue;
      }

      merged.push(cur);
    }
    return merged;
  };

  const expandedRaw = expandInstructionSteps(steps);
  const expanded = mergeDanglingConjunctions(mergeStandaloneListNumbers(expandedRaw));
  const unique = [
    ...new Set(
      expanded
        .map((step) => stripInstructionStepPrefix(sanitizeInstructionStep(step)))
        .filter(Boolean)
    ),
  ];
  const normalized = unique
    .map((step) =>
      sanitizeText(
        step
          .replace(/\b(?:tip|tips?|extra tip|sandra'?s tip)\s*:\s*.*$/i, "")
          .replace(/\bEet smakelijk!?$/i, "")
          .replace(/\bbuon appetito\b!?$/i, "")
      )
    )
    .filter(Boolean);

  const mergedNormalized = mergeDanglingConjunctions(normalized);
  const shouldTrimOptional = mergedNormalized.length >= 5;
  return mergedNormalized.filter((step) => !shouldTrimOptional || !isLikelyOptionalInstructionStep(step));
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

/** Marketing/tracking query keys — stripping them canonicalises URLs and allows Jina reader fallback. */
const BENIGN_URL_QUERY_PARAM = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "gclid",
  "fbclid",
  "mc_cid",
  "mc_eid",
  "ref",
  "igshid",
  "srsltid",
  "mkt_tok",
  "_gl",
  "_ga",
  "_gid",
  "yclid",
  "gbraid",
  "wbraid",
]);

function stripBenignMarketingParamsFromUrl(urlString) {
  let u;
  try {
    u = new URL(String(urlString || "").trim());
  } catch {
    return String(urlString || "").trim();
  }
  if (!u.search) return u.toString();
  const sp = u.searchParams;
  let changed = false;
  for (const k of [...new Set([...sp.keys()])]) {
    if (BENIGN_URL_QUERY_PARAM.has(String(k).toLowerCase())) {
      sp.delete(k);
      changed = true;
    }
  }
  if (!changed) return u.toString();
  const pathAndQuery = `${u.pathname}${sp.toString() ? `?${sp.toString()}` : ""}`;
  return `${u.origin}${pathAndQuery}${u.hash || ""}`;
}

function isBenignOrEmptyUrlSearch(search) {
  if (!search || search === "?") return true;
  const qs = search.startsWith("?") ? search.slice(1) : search;
  try {
    const sp = new URLSearchParams(qs);
    for (const k of sp.keys()) {
      if (!BENIGN_URL_QUERY_PARAM.has(String(k).toLowerCase())) return false;
    }
    return true;
  } catch {
    return false;
  }
}

/** Miljuschka / EEF: Cloudflare blokkeert datacenter-requests; gebruik Reader als eerste fetch niet lukt. */
const JINA_READER_RECIPE_HOST_ALLOWLIST = new Set(["miljuschka.nl", "eefkooktzo.nl", "culy.nl"]);

/** 422 voor Miljuschka / Eef: Jina CF-/403 of kale 403-HTML — per site, niet “Miljuschka én Eef”. */
function importBlockedReaderAllowlistMessage(hostname) {
  const h = String(hostname || "").toLowerCase().replace(/^www\./, "");
  if (h === "eefkooktzo.nl") {
    return "Eef Kookt Zo geeft onze servers (en Jina Reader) hier geen recepttekst door — dit komt vaak door een beveiligingslaag tegen bots. Open het recept via “Bekijk” in je browser, of probeer later opnieuw.";
  }
  if (h === "miljuschka.nl") {
    return "Miljuschka geeft onze servers (en Jina Reader) hier geen recepttekst door — dit komt vaak door een beveiligingslaag tegen bots. Open het recept via “Bekijk” in je browser, of probeer later opnieuw.";
  }
  return "Deze site laat automatisch importeren vaak niet toe. Open het recept via “Bekijk” of probeer later opnieuw.";
}

function hostMatchesReaderAllowlist(hostname) {
  const h = String(hostname || "").toLowerCase().replace(/^www\./, "");
  return JINA_READER_RECIPE_HOST_ALLOWLIST.has(h);
}

function isSafeForReaderFallback(parsedUrl) {
  if (parsedUrl.username || parsedUrl.password) return false;
  // Social platforms sometimes require query params to be present (e.g. Instagram igsh).
  const host = parsedUrl.hostname.toLowerCase();
  if (
    host.endsWith("instagram.com") ||
    host.endsWith("tiktok.com") ||
    host === "vm.tiktok.com" ||
    host.endsWith("facebook.com") ||
    host.endsWith("fb.com") ||
    host.endsWith("fb.watch")
  ) {
    return true;
  }
  // Recipe blogs with ?utm_=… from Google zijn veilig voor Reader; blokkeer alleen onbekende queries + hash-targets.
  return isBenignOrEmptyUrlSearch(parsedUrl.search) && !parsedUrl.hash;
}

function looksLikeBlockedSocialHtml(url, html) {
  const u = String(url || "").toLowerCase();
  const h = String(html || "").toLowerCase();
  if (!h || h.length < 200) return true;

  const hasRecipeSignals =
    h.includes("recept") ||
    h.includes("ingredients") ||
    h.includes("bereiding") ||
    h.includes("recipe") ||
    h.includes("ingrediënten");

  // Generic bot / WAF pages (Cloudflare, captchas, JS-required)
  // Many recipe sites (e.g. Culy) return 200 OK but serve a challenge page.
  const looksLikeWaf =
    h.includes("attention required") ||
    h.includes("cloudflare") ||
    h.includes("cf-challenge") ||
    h.includes("challenge-platform") ||
    h.includes("/cdn-cgi/") ||
    h.includes("/cdn-cgi/challenge-platform/") ||
    h.includes("cf-ray") ||
    h.includes("__cf_bm") ||
    h.includes("captcha") ||
    h.includes("verify you are human") ||
    h.includes("enable javascript") ||
    h.includes("enable cookies") ||
    h.includes("checking your browser") ||
    h.includes("checking your browser before accessing") ||
    h.includes("just a moment") ||
    h.includes("security verification") ||
    h.includes("performing security verification") ||
    h.includes("ddos protection");
  // "Hard" Cloudflare challenge markers should override any accidental "recipe"
  // words present in the page (some challenge templates contain navigation text).
  const hasHardChallengeSignals =
    h.includes("cf-challenge") ||
    h.includes("challenge-platform") ||
    h.includes("/cdn-cgi/") ||
    h.includes("cf-ray");
  if (hasHardChallengeSignals) return true;
  if (looksLikeWaf && !hasRecipeSignals) return true;

  if (u.includes("instagram.com")) {
    if (h.includes("instagram") && (h.includes("log in") || h.includes("aanmelden"))) {
      if (!hasRecipeSignals) return true;
    }
  }

  if (u.includes("tiktok.com")) {
    if (h.includes("tiktok") && (h.includes("make your day") || h.includes("verify") || h.includes("captcha") || h.includes("log in"))) {
      if (!hasRecipeSignals) return true;
    }
  }

  if (u.includes("facebook.com") || u.includes("fb.watch") || u.includes("fb.com")) {
    // Typical FB response for bots: login wall, cookie/consent page, "You must log in"
    if (
      h.includes("facebook") &&
      (h.includes("log in") ||
        h.includes("aanmelden") ||
        h.includes("you must log in") ||
        h.includes("cookies") ||
        h.includes("cookie") ||
        h.includes("consent") ||
        h.includes("accept all"))
    ) {
      if (!hasRecipeSignals) return true;
    }
  }

  return false;
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
    signal: AbortSignal.timeout(6000), // Reduced from 15s → 6s for fast search results
    redirect: "follow",
  });
}

/** Zet `JINA_API_KEY` of `JINA_READER_API_KEY` op de server om r.jina.ai met Bearer-token aan te roepen (hogere limieten / soms betere origin-toegang). */
function jinaReaderAuthHeaders() {
  const key = String(process.env.JINA_API_KEY || process.env.JINA_READER_API_KEY || "").trim();
  return key ? { Authorization: `Bearer ${key}` } : {};
}

async function fetchReaderFallbackViaCurl(readerUrl) {
  const args = [
    "-L",
    "-sS",
    "--max-time",
    "25",
    "-H",
    `User-Agent: ${FETCH_HEADERS["user-agent"] || "Mozilla/5.0"}`,
    "-H",
    "Accept: text/plain, text/markdown;q=0.9, */*;q=0.8",
    "-H",
    "X-With-Links-Summary: true",
  ];
  for (const [name, value] of Object.entries(jinaReaderAuthHeaders())) {
    if (name && value) args.push("-H", `${name}: ${value}`);
  }
  args.push("-w", "\n%{http_code}", readerUrl);

  const { stdout } = await execFileAsync("curl", args, {
    encoding: "utf8",
    maxBuffer: 3 * 1024 * 1024,
    timeout: 30000,
  });
  const raw = String(stdout || "");
  const match = raw.match(/\n(\d{3})\s*$/);
  const status = match ? Number(match[1]) : 0;
  const body = match ? raw.slice(0, match.index) : raw;
  return { status, body };
}

async function postJsonViaCurl(url, headers = {}, payload = {}) {
  const body = JSON.stringify(payload);
  const args = [
    "-L",
    "-sS",
    "--max-time",
    "25",
    "-X",
    "POST",
  ];
  for (const [name, value] of Object.entries(headers || {})) {
    if (name && value) args.push("-H", `${name}: ${value}`);
  }
  args.push("--data-binary", body, "-w", "\n%{http_code}", url);

  const { stdout } = await execFileAsync("curl", args, {
    encoding: "utf8",
    maxBuffer: 3 * 1024 * 1024,
    timeout: 30000,
  });
  const raw = String(stdout || "");
  const match = raw.match(/\n(\d{3})\s*$/);
  const status = match ? Number(match[1]) : 0;
  const responseBody = match ? raw.slice(0, match.index) : raw;
  return {
    status,
    ok: status >= 200 && status < 300,
    json: status >= 200 && status < 300 ? safelyParseJson(responseBody) : null,
    body: responseBody,
  };
}

async function fetchReaderFallback(url) {
  // Jina Reader expects `https://r.jina.ai/https://example.com/...` (or http://...)
  const target = String(url || "").trim();
  // IMPORTANT: When the target contains `?` or `#`, it MUST be URL-encoded.
  // Otherwise the query/fragment is interpreted as *r.jina.ai's* query/fragment,
  // and the target URL loses its `?q=...` — breaking search pages.
  const readerUrls = [
    `https://r.jina.ai/${encodeURIComponent(target)}`,
  ];
  if (!/[?#]/.test(target)) {
    readerUrls.push(`https://r.jina.ai/${target}`);
    if (/^https:\/\//i.test(target)) readerUrls.push(`https://r.jina.ai/http://${target}`);
    if (/^https?:\/\//i.test(target)) {
      readerUrls.push(`https://r.jina.ai/http://r.jina.ai/http://${target}`);
    }
  }

  let lastStatus = 0;
  let lastError = null;
  for (const readerUrl of [...new Set(readerUrls)]) {
    try {
      const response = await fetch(readerUrl, {
        headers: {
          ...FETCH_HEADERS,
          ...jinaReaderAuthHeaders(),
          accept: "text/plain, text/markdown;q=0.9, */*;q=0.8",
          "x-with-links-summary": "true",
        },
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
      });
      lastStatus = response.status;
      if (!response.ok) {
        console.log(`Jina reader response: ${response.status}`);
        continue;
      }
      return {
        kind: "text",
        body: await response.text(),
        finalUrl: url,
      };
    } catch (error) {
      lastError = error;
    }

    try {
      const curlResult = await fetchReaderFallbackViaCurl(readerUrl);
      lastStatus = curlResult.status || lastStatus;
      if (curlResult.status >= 200 && curlResult.status < 300 && curlResult.body) {
        return {
          kind: "text",
          body: curlResult.body,
          finalUrl: url,
        };
      }
      if (curlResult.status) console.log(`Jina reader curl response: ${curlResult.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  if (lastStatus === 402) {
    throw new HttpError(
      502,
      "Jina Reader limiet bereikt (402). Zet JINA_API_KEY of JINA_READER_API_KEY op de server, of gebruik ZENROWS_API_KEY voor geblokkeerde bronpagina's."
    );
  }
  throw new HttpError(502, `Kon bronpagina niet ophalen (${lastStatus || 403})${lastError ? `: ${lastError.message}` : ""}.`);
}

/** ZenRows API — optionele fallback voor sites die datacenter-IPs blokkeren (bv. Cloudflare). Zet ZENROWS_API_KEY als env var. */
async function fetchWithZenRows(url) {
  const apiKey = sanitizeText(process.env.ZENROWS_API_KEY || "").trim();
  if (!apiKey) return null;
  // premium_proxy + antibot werkt het stabielst voor WPRM-sites (Miljuschka/Eef/Culy).
  // js_render is niet nodig (data zit in statische HTML + JSON-LD) en levert
  // soms een ingekorte/andere HTML op waarmee de parser slechter scoort.
  // ZenRows kan intermitterend 422 RESP001 ("Could not get content") teruggeven —
  // één retry verhoogt de slagingskans aanzienlijk.
  const zenUrl = `https://api.zenrows.com/v1/?apikey=${encodeURIComponent(apiKey)}&url=${encodeURIComponent(url)}&premium_proxy=true&antibot=true`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(zenUrl, { signal: AbortSignal.timeout(35000) });
      if (response.ok) {
        const body = await response.text();
        if (body && body.length >= 300) {
          return { kind: "html", body, finalUrl: url };
        }
      }
    } catch {
      /* retry below */
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, 800));
  }
  return null;
}

async function fetchWebsiteDocument(url, maxRetries = 2) {
  const parsedUrl = new URL(url);
  const originReferer = `${parsedUrl.protocol}//${parsedUrl.host}/`;
  let lastStatus = 0;
  let lastError = null;

  // Geblokkeerde hosts (Cloudflare): voor WP-sites probeer WP REST API eerst (gratis,
  // geen credits), dan Serper Scrape (werkt door CF heen), dan CF Worker proxy.
  if (HTML_PROXY_HOSTS.has(parsedUrl.hostname)) {
    const wpDoc = await fetchViaWordPressApi(url);
    if (wpDoc) return wpDoc;
    const serperDoc = await fetchViaSerperScrape(url);
    if (serperDoc) return serperDoc;
    if (HTML_PROXY_URL) {
      const proxied = await fetchHtmlViaProxy(url);
      if (proxied) return { kind: "html", body: proxied, url };
    }
    console.log(`[Blocked-Host] alle fallbacks mislukt voor ${parsedUrl.hostname}`);
  }

  // Miljuschka / EEF / Culy: directe HTML-profielen zijn vrijwel altijd 403.
  // ZenRows (premium_proxy) levert volledige HTML met JSON-LD + WPRM-structuur;
  // dat is veel beter dan Jina's markdown-extractie (die social-media iconen,
  // rating-widgets en cooking-mode toggles meeneemt). Probeer dus ZenRows eerst.
  if (hostMatchesReaderAllowlist(parsedUrl.hostname) && isSafeForReaderFallback(parsedUrl)) {
    const zenFirst = await fetchWithZenRows(url);
    if (zenFirst) return zenFirst;
    const firecrawlFirst = await fetchWebsiteDocumentViaFirecrawl(url);
    if (firecrawlFirst) return firecrawlFirst;
    // ZenRows niet beschikbaar (geen key) of mislukt: probeer Jina als laatste redmiddel.
    try {
      const prefetch = await fetchReaderFallback(url);
      const raw = String(prefetch?.body || "");
      if (
        !looksLikeJinaReaderCfWall(raw) &&
        raw.length > 450 &&
        /ingredi|bereid|wprm|wp-content\/uploads|(^|\n)#{1,6}\s+\S|\d+\s*(?:el|tl|gram|mg|ml)|recept\b/im.test(raw)
      ) {
        return prefetch;
      }
    } catch {
      /* verder met normale fetches */
    }
  }

  // Try each fetch profile
  for (const profile of HTML_FETCH_PROFILES) {
    let retryCount = 0;
    let success = false;

    // Retry with exponential backoff for 5xx errors
    while (retryCount <= maxRetries && !success) {
      try {
        const response = await fetchWithProfile(url, profile, originReferer);
        lastStatus = response.status;

        if (response.ok) {
          const body = await response.text();
          // Social platforms can return 200 OK with a login wall; treat it as blocked.
          if (looksLikeBlockedSocialHtml(url, body)) {
            lastStatus = 403;
          } else {
            return {
              kind: "html",
              body,
              finalUrl: response.url || url,
            };
          }
        }

        // Retry on 5xx errors (server errors are temporary)
        if (response.status >= 500 && response.status < 600 && retryCount < maxRetries) {
          retryCount++;
          const delayMs = Math.min(1000 * Math.pow(2, retryCount - 1), 8000); // Exponential: 1s, 2s, 4s, 8s
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          continue; // Retry with same profile
        }

        // Don't retry on client errors (4xx)
        break;
      } catch (error) {
        lastError = error;
        // Network errors: retry with backoff
        if (retryCount < maxRetries) {
          retryCount++;
          const delayMs = Math.min(1000 * Math.pow(2, retryCount - 1), 8000);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          continue;
        }
        break;
      }
    }
  }

  // Fallback to Jina reader for 401/403 errors on readable URLs
  if ((lastStatus === 401 || lastStatus === 403) && isSafeForReaderFallback(parsedUrl)) {
    // Some sites are picky about header combinations; try one simple vanilla fetch
    // before falling back to the reader.
    try {
      const simpleRes = await fetch(url, {
        headers: {
          "user-agent": "Mozilla/5.0",
          accept: "text/html,application/xhtml+xml",
        },
        signal: AbortSignal.timeout(12000),
        redirect: "follow",
      });
      if (simpleRes.ok) {
        const body = await simpleRes.text();
        if (!looksLikeBlockedSocialHtml(url, body)) {
          return { kind: "html", body, finalUrl: simpleRes.url || url };
        }
      }
    } catch {
      // ignore and try reader below
    }
    try {
      return await fetchReaderFallback(url);
    } catch (error) {
      // Jina also failed — try Firecrawl as universal 403 fallback before giving up.
      const fcResult = await fetchWebsiteDocumentViaFirecrawl(url);
      if (fcResult) return fcResult;
    }
  }

  // Miljuschka / Eef: direct fetches fail with 5xx or empty; probeer Reader vóór harde fout.
  if (hostMatchesReaderAllowlist(parsedUrl.hostname) && isSafeForReaderFallback(parsedUrl)) {
    const firecrawlResult = await fetchWebsiteDocumentViaFirecrawl(url);
    if (firecrawlResult) return firecrawlResult;
    try {
      return await fetchReaderFallback(url);
    } catch {
      /* fall through */
    }
  }

  // ZenRows: opt-in Cloudflare-bypass via ZENROWS_API_KEY — werkt voor sites die alle datacenter-IPs blokkeren.
  const zenResult = await fetchWithZenRows(url);
  if (zenResult) return zenResult;

  // Serper Scrape: laatste redmiddel voor hardnekkig geblokkeerde sites (werkt door Cloudflare heen).
  const serperFinal = await fetchViaSerperScrape(url);
  if (serperFinal) return serperFinal;

  throw new HttpError(502, `Kon bronpagina niet ophalen (${lastStatus || 403})${lastError ? `: ${lastError.message}` : ""}.`);
}

function isBrowserFallbackEnabled() {
  return !/^(0|false|no)$/i.test(String(process.env.PLATELY_BROWSER_FALLBACK || "1").trim());
}

async function fetchWebsiteDocumentViaBrowser(url) {
  if (!isBrowserFallbackEnabled()) return null;
  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch (error) {
    console.log(`Browser fallback unavailable: ${error.message}`);
    return null;
  }

  let browser = null;
  try {
    const executablePath = String(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || process.env.CHROMIUM_PATH || "").trim();
    browser = await chromium.launch({
      headless: true,
      ...(executablePath ? { executablePath } : {}),
      args: [
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage",
        "--no-sandbox",
      ],
      timeout: 20000,
    });
    const context = await browser.newContext({
      locale: "nl-NL",
      timezoneId: "Europe/Amsterdam",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
      extraHTTPHeaders: {
        "accept-language": "nl-NL,nl;q=0.9,en;q=0.7",
      },
      viewport: { width: 1365, height: 900 },
    });
    const page = await context.newPage();
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 }).catch((error) => {
      console.log(`Browser fallback goto error: ${error.message}`);
      return null;
    });
    await page.waitForTimeout(1800).catch(() => {});
    const status = response?.status?.() || 0;
    const html = await page.content().catch(() => "");
    const lower = String(html || "").toLowerCase();
    const blocked =
      status === 403 ||
      lower.includes("access denied") ||
      lower.includes("checking your browser") ||
      lower.includes("verify you are human");
    console.log(`Browser fallback response: ${status || "unknown"}${blocked ? " (blocked)" : ""}`);
    if (!html || html.length < 600 || blocked) return null;
    return { kind: "html", body: html, finalUrl: page.url() || url };
  } catch (error) {
    console.log(`Browser fallback error: ${error.message}`);
    return null;
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

function firecrawlApiKey() {
  return String(process.env.FIRECRAWL_API_KEY || process.env.FIRECRAWL_KEY || "").trim();
}

async function fetchWebsiteDocumentViaFirecrawl(url) {
  const apiKey = firecrawlApiKey();
  if (!apiKey) return null;
  const proxyMode = String(process.env.FIRECRAWL_PROXY || "auto").trim() || "auto";
  try {
    const response = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats: ["markdown", "html"],
        onlyMainContent: true,
        waitFor: 1500,
        timeout: 60000,
        blockAds: true,
        removeBase64Images: true,
        proxy: proxyMode,
        location: {
          country: "NL",
          languages: ["nl-NL", "nl"],
        },
      }),
      signal: AbortSignal.timeout(70000),
    });
    const text = await response.text();
    const json = safelyParseJson(text);
    if (!response.ok || json?.success === false) {
      console.log(`Firecrawl response: ${response.status}${json?.error ? ` (${json.error})` : ""}`);
      return null;
    }
    const data = json?.data || {};
    const markdown = sanitizeText(data.markdown || "");
    const html = String(data.html || data.rawHtml || "");
    const finalUrl = sanitizeText(data.metadata?.sourceURL || data.metadata?.url || url) || url;
    if (markdown.length >= 300) {
      console.log("Firecrawl response: 200 markdown");
      return { kind: "text", body: data.markdown, finalUrl };
    }
    if (html.length >= 600) {
      console.log("Firecrawl response: 200 html");
      return { kind: "html", body: html, finalUrl };
    }
    console.log("Firecrawl response: 200 empty");
    return null;
  } catch (error) {
    console.log(`Firecrawl error: ${error.message}`);
    return null;
  }
}

const HTML_PROXY_URL = process.env.HTML_PROXY || "";
const HTML_PROXY_SECRET = process.env.HTML_PROXY_SECRET || "PlatelyProxy";

// Hosts that zijn geblokkeerd voor datacenter-IPs — route via CF Worker proxy
const HTML_PROXY_HOSTS = new Set(["miljuschka.nl", "www.miljuschka.nl", "www.eefkooktzo.nl", "eefkooktzo.nl", "www.foodiesmagazine.nl", "foodiesmagazine.nl"]);

/**
 * Serper Scrape API — werkt door Cloudflare heen, retourneert JSON-LD + volledige tekst.
 * Kosten: ~6 credits/verzoek. Gratis vervanging voor ZenRows voor geblokkeerde hosts.
 */
async function fetchViaSerperScrape(url) {
  const apiKey = String(process.env.SERPER_API_KEY || "").trim();
  if (!apiKey) return null;
  try {
    const resp = await fetch("https://scrape.serper.dev", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(15000),
    });
    if (!resp.ok) {
      console.log(`[Serper-Scrape] ${resp.status} voor ${url}`);
      return null;
    }
    const data = await resp.json();
    // Bouw een volledige HTML-pagina zodat bestaande JSON-LD en Open Graph parsers werken
    const meta = data.metadata || {};
    const jsonld = data.jsonld ? JSON.stringify(data.jsonld) : "";
    const title = meta["og:title"] || meta["title"] || "";
    const image = meta["og:image"] || meta["og:image:secure_url"] || "";
    const description = meta["og:description"] || meta["description"] || "";
    const html = `<!DOCTYPE html><html><head>
      <title>${title}</title>
      <meta property="og:title" content="${title.replace(/"/g, "&quot;")}">
      <meta property="og:image" content="${image.replace(/"/g, "&quot;")}">
      <meta property="og:description" content="${description.replace(/"/g, "&quot;")}">
      ${jsonld ? `<script type="application/ld+json">${jsonld}</script>` : ""}
    </head><body>
      <h1>${title}</h1>
      <div class="recipe-content">${data.text || ""}</div>
    </body></html>`;
    console.log(`[Serper-Scrape] ✅ ${new URL(url).hostname} — credits gebruikt: ${data.credits ?? "?"}`);
    return { kind: "html", body: html, url };
  } catch (err) {
    console.log(`[Serper-Scrape] fout voor ${url}: ${err.message}`);
    return null;
  }
}

async function fetchViaWordPressApi(url) {
  let parsedUrl;
  try { parsedUrl = new URL(url); } catch { return null; }

  // Haal slug op uit het URL-pad (laatste niet-lege segment)
  const segments = parsedUrl.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const slug = segments[segments.length - 1];
  if (!slug || slug.length < 2) return null;

  const base = `${parsedUrl.protocol}//${parsedUrl.host}`;

  // Probeer standaard WP posts endpoint, dan custom post types
  const endpoints = [
    `${base}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=title,content,excerpt,link,yoast_head`,
    `${base}/wp-json/wp/v2/recept?slug=${encodeURIComponent(slug)}&_fields=title,content,excerpt,link,yoast_head`,
    `${base}/wp-json/wp/v2/recipe?slug=${encodeURIComponent(slug)}&_fields=title,content,excerpt,link,yoast_head`,
  ];

  for (const endpoint of endpoints) {
    try {
      const resp = await fetch(endpoint, {
        headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(8000),
      });
      if (!resp.ok) continue;
      const data = await resp.json();
      const post = Array.isArray(data) ? data[0] : data;
      if (!post?.content?.rendered) continue;

      const title = post.title?.rendered || "";
      const content = post.content.rendered || "";
      const excerpt = post.excerpt?.rendered || "";
      const yoastHead = post.yoast_head || "";
      const canonicalUrl = post.link || url;

      // Bouw een volledige HTML-pagina zodat bestaande parsers (JSON-LD, WPRM) werken
      const html = `<!DOCTYPE html><html><head>
        <title>${title}</title>
        ${yoastHead}
      </head><body>
        <article>
          <h1>${title}</h1>
          ${excerpt}
          ${content}
        </article>
      </body></html>`;

      console.log(`[WP-API] ✅ ${parsedUrl.hostname} — "${title}" via ${endpoint}`);
      return { kind: "html", body: html, url: canonicalUrl };
    } catch { continue; }
  }
  return null;
}

async function fetchHtmlViaProxy(url) {
  if (!HTML_PROXY_URL) return null;
  try {
    const proxyUrl = `${HTML_PROXY_URL}?url=${encodeURIComponent(url)}`;
    const resp = await fetch(proxyUrl, {
      headers: { "x-plately-secret": HTML_PROXY_SECRET },
      signal: AbortSignal.timeout(12000),
    });
    if (!resp.ok) {
      console.log(`[HTML-Proxy] ${resp.status} voor ${url}`);
      return null;
    }
    const html = await resp.text();
    return html && html.length > 500 ? html : null;
  } catch (e) {
    console.log(`[HTML-Proxy] fout voor ${url}: ${e.message}`);
    return null;
  }
}

async function fetchHtml(url) {
  // Route geblokkeerde hosts via CF Worker proxy
  try {
    const host = new URL(url).hostname;
    if (HTML_PROXY_URL && HTML_PROXY_HOSTS.has(host)) {
      const proxied = await fetchHtmlViaProxy(url);
      if (proxied) return proxied;
      console.log(`[HTML-Proxy] fallback naar directe fetch voor ${host}`);
    }
  } catch { /* ongeldige URL, ga door */ }

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
    // Some sites embed literal newlines/tabs inside JSON string values, which
    // strict JSON forbids. Try to sanitize control chars inside quoted strings
    // and retry once.
    try {
      const sanitized = sanitizeLooseJsonString(rawValue);
      return JSON.parse(sanitized);
    } catch {
      return null;
    }
  }
}

/**
 * Walk through a JSON-ish string and replace literal control characters
 * (newlines, tabs, carriage returns, form feed, backspace) that appear INSIDE
 * quoted strings with their escaped equivalents. Outside of strings we keep
 * whitespace as-is. This salvages JSON-LD blocks that have raw \n inside
 * descriptions or instructions (common with WordPress theme misconfigs).
 */
function sanitizeLooseJsonString(input) {
  let out = "";
  let inString = false;
  let escape = false;
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (escape) {
      out += ch;
      escape = false;
      continue;
    }
    if (ch === "\\") {
      out += ch;
      escape = true;
      continue;
    }
    if (ch === '"') {
      out += ch;
      inString = !inString;
      continue;
    }
    if (inString) {
      // Map invalid control chars to their JSON escape sequences
      switch (ch) {
        case "\n": out += "\\n"; continue;
        case "\r": out += "\\r"; continue;
        case "\t": out += "\\t"; continue;
        case "\f": out += "\\f"; continue;
        case "\b": out += "\\b"; continue;
        default: {
          const code = ch.charCodeAt(0);
          if (code < 0x20) {
            out += `\\u${code.toString(16).padStart(4, "0")}`;
            continue;
          }
        }
      }
    }
    out += ch;
  }
  return out;
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

  // Extract full caption from __NEXT_DATA__ or window._sharedData (Instagram SPA data)
  try {
    const nextDataMatch = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
    const sharedDataMatch = html.match(/window\._sharedData\s*=\s*(\{[\s\S]*?\});\s*<\/script>/);
    const jsonStr = nextDataMatch?.[1] || sharedDataMatch?.[1] || "";
    if (jsonStr) {
      const parsed = JSON.parse(jsonStr);
      // __NEXT_DATA__: props.pageProps.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text
      const media = parsed?.props?.pageProps?.graphql?.shortcode_media ||
                    parsed?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;
      const captionText = media?.edge_media_to_caption?.edges?.[0]?.node?.text;
      if (captionText && isUsefulCaptionCandidate(captionText)) {
        captionCandidates.unshift(captionText); // prefer over og:description
      }
      const ownerName = media?.owner?.full_name || media?.owner?.username;
      if (ownerName) authorCandidates.push(ownerName);
    }
  } catch {
    // ignore malformed JSON
  }

  // Also scan for longer "text" values in raw JSON that look like full captions
  const captionTextMatches = [...html.matchAll(/"text"\s*:\s*"((?:\\.|[^"\\]){40,2000})"/g)];
  for (const m of captionTextMatches) {
    const val = safelyParseJson(`"${m[1]}"`);
    if (val && isUsefulCaptionCandidate(val) && val.length > 60) {
      captionCandidates.push(val);
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

// Lightweight HTML helpers — no jsdom/cheerio needed
function _htmlStripTags(s) {
  return String(s || "").replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();
}
function _htmlAttr(tag, attr) {
  const m = new RegExp(`\\b${attr}=["']([^"']*?)["']`, "i").exec(tag);
  return m ? m[1].trim() : "";
}
/** Return all HTML tags (opening + self-closing) that match a predicate on the raw tag string. */
function _htmlFindTags(html, predicate) {
  const results = [];
  const re = /<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const full = m[0];
    if (predicate(full)) results.push({ tag: full, index: m.index, tagName: m[1].toLowerCase() });
  }
  return results;
}
/** Extract inner text of the first occurrence of a tag that has a given attribute value. */
function _htmlInnerText(html, attrName, attrValue) {
  // Find opening tag
  const escapedVal = attrValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*\\b${attrName}=["'][^"']*${escapedVal}[^"']*["'][^>]*>`, "i");
  const m = re.exec(html);
  if (!m) return "";
  const tagName = m[1];
  const start = m.index + m[0].length;
  // Find matching closing tag (simple non-nested scan)
  const closeRe = new RegExp(`</${tagName}>`, "i");
  const closeM = closeRe.exec(html.slice(start));
  if (!closeM) return _htmlStripTags(html.slice(start, start + 400));
  return _htmlStripTags(html.slice(start, start + closeM.index));
}
/** Extract all inner texts of tags that have an attribute containing attrValue. */
function _htmlInnerTexts(html, attrName, attrValue) {
  const results = [];
  const escapedVal = attrValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*\\b${attrName}=["'][^"']*${escapedVal}[^"']*["']([^>]*)>`, "gi");
  let m;
  while ((m = re.exec(html)) !== null) {
    const tagName = m[1];
    const attrs = m[0];
    // Check for content= attribute (meta tags)
    const contentM = /\bcontent=["']([^"']+)["']/.exec(attrs);
    if (contentM) { results.push(contentM[1].trim()); continue; }
    const start = m.index + m[0].length;
    const closeRe = new RegExp(`</${tagName}>`, "i");
    const closeM = closeRe.exec(html.slice(start));
    const inner = closeM ? html.slice(start, start + closeM.index) : html.slice(start, start + 800);
    const text = _htmlStripTags(inner);
    if (text) results.push(text);
  }
  return results;
}

// Extract recipe using HTML5 Microdata (itemscope/itemtype/itemprop) — regex-based, no jsdom
function extractMicrodataRecipe(html) {
  // Quick bail if page has no microdata recipe marker
  if (!/itemtype=["'][^"']*Recipe["']/i.test(html)) return null;

  const recipe = { title: "", image: "", ingredients: [], instructions: [] };

  // Title
  recipe.title = _htmlInnerText(html, "itemprop", "name");

  // Image — look for itemprop="image" src= or content=
  const imgTagM = /<[^>]+\bitemprop=["']image["'][^>]*>/i.exec(html);
  if (imgTagM) {
    recipe.image = _htmlAttr(imgTagM[0], "src") || _htmlAttr(imgTagM[0], "content") || _htmlAttr(imgTagM[0], "href");
  }

  // Ingredients
  recipe.ingredients = _htmlInnerTexts(html, "itemprop", "recipeIngredient").filter((t) => t.length > 2);

  // Instructions
  recipe.instructions = _htmlInnerTexts(html, "itemprop", "recipeInstructions").filter((t) => t.length > 5);

  if (!recipe.title && recipe.ingredients.length < 2) return null;
  return recipe.ingredients.length > 0 || recipe.instructions.length > 0 ? recipe : null;
}

// Extract recipe using RDFa (typeof/property attributes) — regex-based, no jsdom
function extractRdfaRecipe(html) {
  if (!/typeof=["'][^"']*Recipe["']/i.test(html)) return null;

  const recipe = { title: "", image: "", ingredients: [], instructions: [] };

  // Title
  recipe.title = _htmlInnerText(html, "property", "name") || _htmlInnerText(html, "property", "schema:name");

  // Image
  const imgTagM = /<[^>]+\bproperty=["'][^"']*image[^"']*["'][^>]*>/i.exec(html);
  if (imgTagM) {
    recipe.image = _htmlAttr(imgTagM[0], "src") || _htmlAttr(imgTagM[0], "content") || _htmlAttr(imgTagM[0], "href");
  }

  // Ingredients
  recipe.ingredients = [
    ..._htmlInnerTexts(html, "property", "recipeIngredient"),
    ..._htmlInnerTexts(html, "property", "schema:recipeIngredient"),
  ].filter((t) => t.length > 2);

  // Instructions
  recipe.instructions = [
    ..._htmlInnerTexts(html, "property", "recipeInstructions"),
    ..._htmlInnerTexts(html, "property", "schema:recipeInstructions"),
  ].filter((t) => t.length > 5);

  if (!recipe.title && recipe.ingredients.length < 2) return null;
  return recipe.ingredients.length > 0 || recipe.instructions.length > 0 ? recipe : null;
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

/**
 * Gemiddelde score + aantal uit schema.org Recipe.
 * Geen minimum naar 1 afdwingen — ontbrekende of placeholdertoontjes (vaak 1/5) worden genegeerd.
 * Zonder minstens 1 waardering tonen we geen score (eist consistentie met UI).
 * `ratingNormalizedFromWideScale` als de bron expliciet een schaal >5 gebruikte en we naar /5 rekenden.
 */
function extractAggregateRatingFromRecipeHtml(html) {
  if (!html || typeof html !== "string") return null;
  const recipe = findRecipeJsonLd(html);
  const agg = recipe?.aggregateRating;
  if (!agg || typeof agg !== "object") return null;
  let ratingValue = Number(agg.ratingValue);
  if (!Number.isFinite(ratingValue) || ratingValue <= 0) return null;
  let ratingCount = Number(agg.ratingCount ?? agg.reviewCount ?? 0);
  if (!Number.isFinite(ratingCount) || ratingCount < 1) return null;
  const best = Number(agg.bestRating);
  let normalizedFromWideScale = false;
  if (Number.isFinite(best) && best > 5 && ratingValue <= 10) {
    ratingValue = (ratingValue / best) * 5;
    normalizedFromWideScale = true;
  } else if (!Number.isFinite(best) && ratingValue > 5 && ratingValue <= 10) {
    ratingValue = ratingValue / 2;
    normalizedFromWideScale = true;
  }
  ratingValue = Math.round(ratingValue);
  if (ratingValue < 1 || ratingValue > 5) return null;
  return {
    ratingValue,
    ratingCount,
    ...(normalizedFromWideScale ? { ratingNormalizedFromWideScale: true } : {}),
  };
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

/**
 * WordPress Recipe Maker (WP Recipe Maker) — veel NL foodblogs waaronder Miljuschka.
 * JSON-LD ontbreekt soms; deze DOM-blobs blijven vaak wél in HTML.
 */
function extractWpRecipeMakerIngredientLines(html) {
  const raw = String(html || "");
  const out = [];
  // Some WPRM themes emit a wprm-recipe-ingredient-text span with just the name.
  const reSpan = /<span[^>]*\bwprm-recipe-ingredient-text\b[^>]*>([\s\S]*?)<\/span>/gi;
  let m;
  while ((m = reSpan.exec(raw)) !== null) {
    const line = sanitizeText(stripTags(m[1])).replace(/\s+/g, " ").trim();
    if (line.length > 2) out.push(line);
  }
  if (out.length) return out;
  // Fall back to li-level extraction.
  // Use (?!-) so we don't accidentally match wprm-recipe-ingredient-group,
  // -notes, -checkbox, etc. (CSS hyphen is a non-word char so \b alone isn't enough).
  const reLi = /<li[^>]*\bwprm-recipe-ingredient(?!-)\b[^>]*>([\s\S]*?)<\/li>/gi;
  while ((m = reLi.exec(raw)) !== null) {
    const liHtml = m[1];
    // Prefer structured span extraction: amount + unit + name, skip checkbox span.
    const amountM = liHtml.match(/<span[^>]*\bwprm-recipe-ingredient-amount\b[^>]*>([\s\S]*?)<\/span>/i);
    const unitM   = liHtml.match(/<span[^>]*\bwprm-recipe-ingredient-unit\b[^>]*>([\s\S]*?)<\/span>/i);
    const nameM   = liHtml.match(/<span[^>]*\bwprm-recipe-ingredient-name\b[^>]*>([\s\S]*?)<\/span>/i);
    if (nameM) {
      const amount = amountM ? sanitizeText(stripTags(amountM[1])).trim() : "";
      const unit   = unitM   ? sanitizeText(stripTags(unitM[1])).trim()   : "";
      const name   = sanitizeText(stripTags(nameM[1])).trim();
      if (name.length > 1) {
        const line = [amount, unit, name].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
        out.push(line);
      }
    } else {
      // No structured spans: strip checkbox char and collapse whitespace.
      const noCheckbox = liHtml.replace(/<span[^>]*\bwprm-recipe-ingredient-checkbox\b[^>]*>[\s\S]*?<\/span>/gi, "");
      const line = sanitizeText(stripTags(noCheckbox)).replace(/[▢□☐]/g, "").replace(/\s+/g, " ").trim();
      if (line.length > 2) out.push(line);
    }
  }
  return out;
}

function extractWpRecipeMakerInstructionLines(html) {
  const raw = String(html || "");
  const out = [];
  const reTxt = /<div[^>]*\bwprm-recipe-instruction-text\b[^>]*>([\s\S]*?)<\/div>/gi;
  let m;
  while ((m = reTxt.exec(raw)) !== null) {
    const line = sanitizeText(stripTags(m[1])).replace(/\s+/g, " ").trim();
    if (line.length > 8) out.push(line);
  }
  if (out.length) return out;
  // Same (?!-) fix as ingredient li to avoid matching wprm-recipe-instruction-group etc.
  const reLi = /<li[^>]*\bwprm-recipe-instruction(?!-)\b[^>]*>([\s\S]*?)<\/li>/gi;
  while ((m = reLi.exec(raw)) !== null) {
    const line = sanitizeText(stripTags(m[1])).replace(/\s+/g, " ").trim();
    if (line.length > 8) out.push(line);
  }
  return out;
}

/** Jina Reader geeft deze blob terug als de origin Cloudflare-/botlaag teruggeeft. */
function looksLikeJinaReaderCfWall(markdown) {
  const t = String(markdown || "");
  const lower = t.toLowerCase();
  // Jina prepends `Warning: Target URL returned error 403` when Cloudflare/origin rejects the fetch — always treat as unblockable for datacenter IPs.
  if (/target url returned error\s*403\b/i.test(t)) return true;
  if (/\b403\s*forbidden\b/i.test(lower) && (t.length < 800 || /cloudflare|captcha|security verification/i.test(lower))) {
    return true;
  }
  if (/performing security verification/i.test(lower)) return true;
  if (/this website uses a security service to protect against malicious bots/i.test(lower)) return true;
  if (/maybe requiring captcha|authorized to access this page/i.test(lower)) return true;
  if (/^\s*#\s*just a moment/i.test(lower) && lower.includes("cloudflare")) return true;
  return false;
}

/** Lines Jina / error pages sometimes match `looksLikeRecipeTitle` but must never become the recipe name. */
function isJinaOrErrorPageTitleLine(raw) {
  const t = sanitizeText(String(raw || "")).toLowerCase();
  if (!t || t.length < 3) return true;
  if (/^warning\b|^error\b|^notice\b/i.test(t)) return true;
  if (/target url returned error|url returned error/i.test(t)) return true;
  if (/\berror\s*403\b|\b403\s*forbidden\b|^403\b/i.test(t)) return true;
  if (/^just a moment|performing security verification/i.test(t)) return true;
  if (/requiring captcha|authorized to access this page/i.test(t)) return true;
  if (/^markdown content$/i.test(t)) return true;
  if (/^miljuschka\.nl$/i.test(t) || /^eefkooktzo\.nl$/i.test(t)) return true;
  return false;
}

function parseListAfterHeading(html, headingPattern) {
  // First remove common ad containers that might interrupt lists
  let cleanHtml = removeAdContainers(html);

  // Try ul/ol lists first (increased search distance from 400 to 800)
  const listPattern = new RegExp(
    `<(?:h1|h2|h3|h4|h5|h6|strong|p|b)[^>]*>\\s*(?:<[^>]+>\\s*)?(?:${headingPattern})\\s*[:：]?\\s*(?:[^<]*?)?<\\/(?:h1|h2|h3|h4|h5|h6|strong|p|b)>[\\s\\S]{0,800}?<(ul|ol)[^>]*>([\\s\\S]*?)<\\/\\1>`,
    "i"
  );
  const listMatch = cleanHtml.match(listPattern);
  if (listMatch) {
    return [...listMatch[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((item) => sanitizeText(stripTags(item[1])))
      .filter(Boolean);
  }

  // Fallback: try definition lists (dl/dt/dd) which some recipe sites use
  const dlPattern = new RegExp(
    `<(?:h1|h2|h3|h4|h5|h6|strong|p|b)[^>]*>\\s*(?:<[^>]+>\\s*)?(?:${headingPattern})\\s*[:：]?\\s*(?:[^<]*?)?<\\/(?:h1|h2|h3|h4|h5|h6|strong|p|b)>[\\s\\S]{0,800}?<dl[^>]*>([\\s\\S]*?)<\\/dl>`,
    "i"
  );
  const dlMatch = cleanHtml.match(dlPattern);
  if (dlMatch) {
    // Extract dd (definition) content from dl lists
    return [...dlMatch[1].matchAll(/<dd[^>]*>([\s\S]*?)<\/dd>/gi)]
      .map((item) => sanitizeText(stripTags(item[1])))
      .filter(Boolean);
  }

  return [];
}

function parseParagraphsAfterHeading(html, headingPattern) {
  // First remove ads and interrupting content
  let cleanHtml = removeAdContainers(html);

  // First find the heading position
  const headingPattern2 = new RegExp(
    `<(?:h1|h2|h3|h4|strong|p|b)[^>]*>\\s*(?:<[^>]+>\\s*)?(?:${headingPattern})\\s*[:：]?\\s*(?:[^<]*?)?<\\/(?:h1|h2|h3|h4|strong|p|b)>`,
    "i"
  );
  const headingMatch = cleanHtml.match(headingPattern2);
  if (!headingMatch) {
    return [];
  }

  // Get the content after the heading (up to 12000 chars to capture more content)
  const startIdx = headingMatch.index + headingMatch[0].length;
  const after = cleanHtml.slice(startIdx, startIdx + 12000);

  // Stop at next major section heading (e.g., another bold heading or h2)
  const stopMatch = after.match(/<h[1-3][^>]*>|<(?:strong|b)[^>]*>\s*(?:tip|tips|nutrition|voedingswaarden|gerelateerde|reacties|comments|reviews|over\s)/i);
  const section = stopMatch ? after.slice(0, stopMatch.index) : after;

  // Extract all <p> tags from the section
  const paragraphs = [...section.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((item) => sanitizeText(stripTags(item[1])))
    .filter(Boolean)
    .filter((text) => text.length >= 20) // Filter out very short paragraphs (likely captions)
    .slice(0, 16);

  return paragraphs;
}

function extractMarkdownSection(text, headingPattern, stopPattern) {
  // Headings can include extra trailing text, e.g. "## Bereidingswijze Surinaamse soep".
  const regex = new RegExp(
    `(?:^|\\n)#{2,3}\\s*(?:${headingPattern})(?:\\s+[^\\n]*)?\\s*\\n([\\s\\S]*?)(?=\\n#{2,3}\\s*(?:${stopPattern})(?:\\s+[^\\n]*)?\\s*\\n|$)`,
    "gi"
  );
  const matches = [...String(text || "").matchAll(regex)];
  if (!matches.length) return "";

  // Some pages repeat headings in footers/menus. Pick the most "list-like" section.
  const scoreSection = (body) => {
    const lines = String(body || "")
      .split(/\n+/)
      .map((l) => sanitizeText(l))
      .filter(Boolean);
    if (!lines.length) return 0;
    const bulletish = lines.filter((l) => /^(\*|-|\d+\.)\s+\S/.test(l)).length;
    const hasNumbers = lines.filter((l) => /\d/.test(l)).length;
    const lengthPenalty = Math.max(0, lines.length - 70) * 6;
    return bulletish * 3 + hasNumbers + Math.min(lines.length, 40) - lengthPenalty;
  };

  let best = matches[0][1] || "";
  let bestScore = scoreSection(best);
  for (const m of matches.slice(1)) {
    const body = m[1] || "";
    const s = scoreSection(body);
    if (s > bestScore) {
      best = body;
      bestScore = s;
    }
  }
  return String(best || "").trim();
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
    .replace(/^Published Time:\s.*$/gim, "")
    .replace(/^Markdown Content:\s*$/gim, "")
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/\n{3,}/g, "\n\n");

  const lines = cleanedText
    .split(/\n+/)
    .map((line) => sanitizeText(line.replace(/^#{1,6}\s*/, "")))
    .filter(Boolean);

  const markdownH1Title = (() => {
    const raw = String(cleanedText || "");
    const candidates = [...raw.matchAll(/^\s*#\s+(.+?)\s*$/gm)]
      .map((m) => sanitizeText(m[1] || ""))
      .filter((line) => !isJinaOrErrorPageTitleLine(line))
      .map((line) => normalizeRecipeTitle(line))
      .filter(Boolean)
      .filter((t) => !/chickslovefood\b/i.test(t));
    return candidates[0] || "";
  })();

  const ingredientSection = extractMarkdownSection(
    cleanedText,
    "ingredi[eë]nten|ingredienten|ingredients?|dit heb je nodig",
    "dit heb je nodig|aan de slag|bereiding|bereidingswijze|werkwijze|[^\\n]{0,120}:\\s*recept\\b|recept\\b|voedingswaarden|boodschappen|allerhande|services|albert heijn|dit vind je"
  );
  const instructionSection = extractMarkdownSection(
    cleanedText,
    "en zo doe je het|aan de slag|bereiding|bereidingswijze|werkwijze|instructions?|method|[^\\n]{0,120}:\\s*recept\\b|recept\\b",
    "voedingswaarden|ingredi[eë]nten|ingredienten|ingredients?|boodschappen|allerhande|services|albert heijn|dit vind je|weekmenu|word gratis member|privacy statement|cookie statement|toon meer"
  );

  const title =
    markdownH1Title ||
    normalizeRecipeTitle(
      lines.find(
        (line) =>
          !isJinaOrErrorPageTitleLine(line) &&
          looksLikeRecipeTitle(line) &&
          RECIPE_TITLE_HINT_PATTERN.test(line)
      )
    ) ||
    normalizeRecipeTitle(
      lines.find(
        (line) =>
          !isJinaOrErrorPageTitleLine(line) &&
          looksLikeRecipeTitle(line) &&
          line.split(" ").length <= 8
      )
    ) ||
    "Website recept";

  const introFromMarkdown = (() => {
    const rawLines = String(cleanedText || "").split(/\n+/).map((l) => sanitizeText(l)).filter(Boolean);
    if (!rawLines.length) return "";
    const ingredientHeadingIdxs = rawLines
      .map((line, idx) => ({ line, idx }))
      .filter(({ line }) => /^##\s+\S/.test(line))
      .map(({ line, idx }) => (INGREDIENT_HEADING_PATTERN.test(sanitizeText(line.replace(/^##\s+/, ""))) ? idx : -1))
      .filter((idx) => idx >= 0);

    const h1s = rawLines
      .map((line, idx) => ({ line, idx }))
      .filter(({ line }) => /^#\s+\S/.test(line));

    const picked = h1s
      .map(({ line, idx }) => {
        const nextIng = ingredientHeadingIdxs.find((i) => i > idx);
        const dist = Number.isFinite(nextIng) ? nextIng - idx : 9999;
        const penalty = /[-–]\s*culy\b/i.test(line) ? 200 : 0;
        return { line, idx, score: dist + penalty };
      })
      .sort((a, b) => a.score - b.score)[0];
    const start = picked ? picked.idx + 1 : 0;
    for (const line of rawLines.slice(start, start + 80)) {
      if (!line) continue;
      if (/^##\s+/.test(line)) break;
      const plain = sanitizeText(line.replace(/^\*\*([^*]+)\*\*$/g, "$1"));
      if (!plain) continue;
      if (/^- \[[x ]\]\s+/i.test(plain)) continue;
      if (/(^|\b)(cookie|cookies|privacy|voorkeuren|consent)\b/i.test(plain)) continue;
      if (/(^|\b)(advertentie|advertenties|gepersonaliseerd|doelgroepenonderzoek|productontwikkeling|vendors?|partners?)\b/i.test(plain)) continue;
      if (/^(voorbereiding|kooktijd|bereidingstijd|beoordeling)\b/i.test(plain)) continue;
      if (/^direct in je mandje\b/i.test(plain)) continue;
      if (INGREDIENT_HEADING_PATTERN.test(plain) || INSTRUCTION_HEADING_PATTERN.test(plain)) break;
      if (plain.length >= 30) return plain;
    }
    return "";
  })();

  const description =
    introFromMarkdown ||
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
  // Fix: Allow ## or ### heading levels (Jina uses ##)
  const ingredientSection = extractMarkdownSection(
    text,
    "ingredi[eë]nten|ingredienten|ingredients?|dit heb je nodig",
    "en zo doe je het|aan de slag|bereiding|bereidingswijze|werkwijze|[^\\n]{0,120}:\\s*recept\\b|recept\\b|voedingswaarden|boodschappen|services|ontdek|gerelateerde|ook te zien|direct in je mandje|beoordeling|dit vind je|weekmenu|word gratis member|privacy statement|cookie statement|cookieinstellingen|toon meer"
  );

  if (!ingredientSection) {
    return [];
  }

  // Some pages embed CTAs and prose between ingredients and instructions.
  // Cut at common CTAs that start right after the ingredient list.
  const trimmedSection = ingredientSection.split(/\n\s*(?:direct in je mandje|beoordeling)\b/i)[0] || ingredientSection;

  const parsed = normalizeIngredientList(
    trimmedSection
      .split(/\n+/)
      .map((line) => {
        const raw = sanitizeText(line);
        const cleaned = sanitizeText(
          String(raw || "")
            // remove markdown list prefixes like "*   " or "- "
            .replace(/^(\*|-)\s+/g, "")
            // remove checklist markers anywhere: "- [x] ..."
            .replace(/-\s*\[[x ]\]\s*/gi, "")
            // common CLF helper text
            .replace(/^afvinken maar\b\s*/i, "")
        );
        return { raw, cleaned };
      })
      // Keep only bullet/quantity-looking lines to avoid prose leaking in as ingredients.
      .filter(({ raw, cleaned }) => {
        if (!raw || !cleaned) return false;
        if (/^#{1,6}\s/i.test(raw)) return false; // headings
        if (/^\(.*personen.*\)$/i.test(cleaned)) return false;
        if (/^!\[image\b/i.test(cleaned) || /^\[!\[image\b/i.test(cleaned)) return false;
        if (/^(privacy statement|cookie statement|cookieinstellingen|afmelden voor advertenties)/i.test(cleaned)) return false;
        if (/^\[\]\(javascript:void\(0\)/i.test(cleaned)) return false;
        if (/^tip van\b/i.test(cleaned)) return false;
        // Prefer quantity-looking lines; allow bullet lines as fallback.
        const quantityish = new RegExp(`^${QUANTITY_PATTERN}\\b`, "i").test(cleaned);
        const bulletish = /^(\*|-)\s+\S/.test(raw);
        return quantityish || bulletish;
      })
      .map(({ cleaned }) => {
        const parsed = parseIngredientLine(cleaned);
        if (parsed?.name) return parsed;
        const m = String(cleaned || "").match(new RegExp(`^(${QUANTITY_PATTERN})\\s*(${UNIT_PATTERN})\\s+(.+)$`, "i"));
        if (m) {
          return { quantity: m[1] || "", unit: String(m[2] || "").toLowerCase(), name: sanitizeText(m[3] || "") };
        }
        return parsed;
      })
  );

  // Chickslovefood/Jina quirk: sometimes the first ingredient line includes extra helper text
  // ("afvinken maar - [x] ...") and ends up dropped. Recover a common pasta/gnocchi line if present.
  const recovered = (() => {
    const lower = String(trimmedSection || "").toLowerCase();
    const existing = new Set(parsed.map((i) => String(i?.name || "").toLowerCase()).filter(Boolean));
    const m = lower.match(/\b(\d+(?:[.,]\d+)?)\s*g\s*(penne|gnocchi|pasta)\b/);
    if (!m) return null;
    const qty = sanitizeText(m[1]);
    const name = sanitizeText(m[2]);
    if (!qty || !name) return null;
    if (existing.has(name)) return null;
    return normalizeIngredientObject({ quantity: qty, unit: "g", name });
  })();

  return recovered ? normalizeIngredientList([...parsed, recovered]) : parsed;
}

function parseMarkdownInstructionSection(text) {
  const instructionSection = extractMarkdownSection(
    text,
    "en zo doe je het|aan de slag|bereiding|bereidingswijze|werkwijze|instructions?|method|[^\\n]{0,120}:\\s*recept\\b|recept\\b",
    "voedingswaarden|ingredi[eë]nten|ingredienten|ingredients?|boodschappen|services|dit vind je|weekmenu|word gratis member|privacy statement|cookie statement|cookieinstellingen|toon meer|meer\\s+5\\s+or\\s+less"
  );

  if (!instructionSection) {
    return [];
  }

  return finalizeInstructionSteps(
    instructionSection
      .split(/\n+/)
      .map((line) => {
        const raw = sanitizeText(line);
        const cleaned = sanitizeText(
          String(raw || "")
            .replace(/^(\*|-)\s+/g, "")
            .replace(/-\s*\[[x ]\]\s*/gi, "")
        );
        return { raw, cleaned };
      })
      // Prefer explicit step lines (numbered/bulleted), drop prose/CTA.
      .filter(({ raw, cleaned }) => {
        if (!raw || !cleaned) return false;
        if (/^!\[image\b/i.test(cleaned) || /^\[!\[image\b/i.test(cleaned)) return false;
        if (/^(privacy statement|cookie statement|cookieinstellingen|afmelden voor advertenties)/i.test(cleaned)) return false;
        if (/^(algemeen:|lekker van albert heijn:)/i.test(cleaned)) return false;
        if (/^dit recept is geschreven\b/i.test(cleaned)) return false;
        if (/^doe je met ons mee\??$/i.test(cleaned)) return false;
        if (cleaned.length < 12) return false;
        return /^\d+[\.\)]\s*\S/.test(cleaned) || /^(\*|-)\s+\S/.test(raw) || /[.?!]$/.test(cleaned);
      })
      .map(({ cleaned }) =>
        sanitizeText(String(cleaned || "").replace(/^\d+[\.\)]\s*\d*\s*/i, ""))
      )
      .filter(Boolean)
  );
}

function parseMarkdownServings(text) {
  const match = String(text || "").match(/\(Op basis van\s+(\d+)\s+personen?\)/i);
  return match ? match[1] : "";
}

function extractFirstImageUrlFromMarkdown(markdown) {
  const text = String(markdown || "");
  if (!text) return "";
  // Jina markdown sometimes wraps long image URLs onto multiple lines inside `(...)`.
  // Capture up to the closing `)` and then collapse whitespace.
  const mdCandidates = [...text.matchAll(/!\[[^\]]*\]\(([\s\S]*?)\)/g)]
    .map((m) => String(m[1] || "").replace(/\s+/g, "").trim())
    .filter(Boolean)
    // Some CDNs (e.g. img.culy.nl) embed `quality(80)` parentheses in the URL,
    // which can truncate the markdown capture. We'll also scan raw URLs below.
    .map((raw) => raw.replace(/[)]+$/g, ""));

  const rawUrlCandidates = [...text.matchAll(/https?:\/\/[^\s]+?\.(?:jpg|jpeg|png|webp)(?:\?[^\s]*)?/gi)]
    .map((m) => String(m[0] || "").replace(/\s+/g, "").trim())
    .filter(Boolean);

  const candidates = [...mdCandidates, ...rawUrlCandidates]
    .map((raw) => {
      const encodedIdx = raw.indexOf("https%3A%2F%2F");
      if (encodedIdx >= 0) {
        const encoded = raw.slice(encodedIdx);
        try {
          return decodeURIComponent(encoded);
        } catch {
          return raw;
        }
      }
      return raw;
    })
    .filter((u) => /^https?:\/\/.+\.(?:jpg|jpeg|png|webp)(?:\?.*)?$/i.test(u))
    .filter((u) => !/\.svg(\?|$)/i.test(u));

  if (!candidates.length) return "";

  const score = (u) => {
    const lower = u.toLowerCase();
    let s = 0;
    if (lower.includes("wp-content/uploads")) s += 8;
    if (/\.(jpg|jpeg|webp)(\?|$)/i.test(lower)) s += 5;
    if (/cropped|logo|icon|avatar/.test(lower)) s -= 10;
    if (/\b\d{2,3}x\d{2,3}\b/.test(lower)) s -= 2; // likely thumbnail
    if (lower.includes("culy")) s += 1;
    return s;
  };

  candidates.sort((a, b) => score(b) - score(a));
  return candidates[0] || "";
}

function parseWebsiteRecipe(html, url) {
  // Remove ads before parsing to avoid interruptions in ingredient/instruction lists
  const cleanHtml = removeAdContainers(html);

  const jsonLd = findRecipeJsonLd(cleanHtml);
  const microdataRecipe = !jsonLd ? extractMicrodataRecipe(cleanHtml) : null;
  const rdfaRecipe = !jsonLd && !microdataRecipe ? extractRdfaRecipe(cleanHtml) : null;
  const embeddedRecipe = !jsonLd && !microdataRecipe && !rdfaRecipe ? extractEmbeddedRecipeFields(cleanHtml) : null;
  const metaTitle = parseMetaTag(cleanHtml, "og:title") || parseTitleTag(cleanHtml);
  const metaDescription = parseMetaTag(cleanHtml, "og:description") || parseMetaTag(cleanHtml, "description", "name");
  const metaImage = parseMetaTag(cleanHtml, "og:image");
  const fallbackIngredients = parseListAfterHeading(cleanHtml, "ingrediënten|ingredienten|ingredients?|benodigdheden|wat heb je nodig");
  const fallbackInstructions = [
    ...parseListAfterHeading(cleanHtml, "bereiding|bereidingswijze|instructions?|method|methode|aan de slag"),
    ...parseParagraphsAfterHeading(cleanHtml, "bereiding|bereidingswijze|instructions?|method|methode|aan de slag"),
  ];

  if (jsonLd || microdataRecipe || rdfaRecipe || embeddedRecipe) {
    const recipeSource = jsonLd || microdataRecipe || rdfaRecipe || embeddedRecipe;
    const recipeName = sanitizeText(recipeSource.name || metaTitle);
    const rawLdDesc = sanitizeText(stripTags(recipeSource.description || ""));
    const rawMetaDesc = sanitizeText(stripTags(metaDescription || ""));
    const recipeDescription = (() => {
      let ahHost = false;
      try {
        ahHost = /(\.|^)ah\.nl$/i.test(new URL(url).hostname);
      } catch {
        ahHost = false;
      }
      // Op AH komt marketing (o.a. Premium) soms in schema.description — dan overslaan en meta proberen.
      if (rawLdDesc && !(ahHost && isLikelyAllerhandeSeoMicrocopy(rawLdDesc))) {
        return rawLdDesc;
      }
      try {
        if (ahHost && isLikelyAllerhandeSeoMicrocopy(rawMetaDesc)) {
          return "";
        }
      } catch {
        /* ignore */
      }
      return rawMetaDesc;
    })();
    const recipeIngredients = Array.isArray(recipeSource.recipeIngredient)
      ? normalizeIngredientList(recipeSource.recipeIngredient.map(parseIngredientLine))
      : [];
    // Detect bogus recipeInstructions: some sites stuff the description string into
    // this field instead of an array of steps. Treat strings that match the
    // description (or are very long without paragraph breaks) as suspect.
    let rawInstructions = recipeSource.recipeInstructions;
    if (typeof rawInstructions === "string") {
      const trimmedInstr = rawInstructions.replace(/\s+/g, " ").trim();
      const trimmedDesc = (recipeSource.description || "").replace(/\s+/g, " ").trim();
      const looksLikeDescription =
        trimmedInstr === trimmedDesc ||
        (trimmedInstr.length > 200 && !/\b(stap|step|\d+\.)/i.test(trimmedInstr));
      if (looksLikeDescription) {
        rawInstructions = null; // force HTML fallback
      }
    }
    const recipeInstructions = parseJsonLdInstructions(rawInstructions);
    const fallbackIngredientsList = normalizeIngredientList(fallbackIngredients.map(parseIngredientLine));
    const wprmIngredientsList = normalizeIngredientList(
      extractWpRecipeMakerIngredientLines(cleanHtml).map(parseIngredientLine)
    );

    const ingBuckets = [recipeIngredients, wprmIngredientsList, fallbackIngredientsList].sort(
      (a, b) => b.length - a.length
    );
    const mergedIngredients = ingBuckets.find((c) => c.length >= 2) || ingBuckets[0] || recipeIngredients;

    // Prefer JSON-LD if it has at least 2 steps; otherwise prefer the HTML
    // fallback when it offers significantly more steps.
    const fallbackInstructionsFinal = finalizeInstructionSteps(mergeInstructionLines(fallbackInstructions));
    const jsonLdInstructionsFinal = finalizeInstructionSteps(recipeInstructions);
    const wprmInstructionsFinal = finalizeInstructionSteps(extractWpRecipeMakerInstructionLines(cleanHtml));

    const insBuckets = [jsonLdInstructionsFinal, wprmInstructionsFinal, fallbackInstructionsFinal].sort(
      (a, b) => b.length - a.length
    );
    const mergedInstructions =
      insBuckets.find((c) => c.length >= 3) || insBuckets.find((c) => c.length >= 2) || insBuckets[0] || [];
    const recipeYield = Array.isArray(recipeSource.recipeYield)
      ? sanitizeText(recipeSource.recipeYield.find(Boolean) || recipeSource.recipeYield[0])
      : sanitizeText(recipeSource.recipeYield);
    // Pick the first non-empty image URL from the ld+json (arrays like ["", "url"] are common on AH)
    const recipeImage = (() => {
      // Try JSON-LD image first
      if (Array.isArray(jsonLd?.image)) {
        const first = jsonLd.image.find((img) => typeof img === "string" && img.startsWith("http"));
        if (first) return first;
        const firstObj = jsonLd.image.find((img) => img?.url);
        if (firstObj) return firstObj.url;
      }
      if (typeof jsonLd?.image === "string" && jsonLd.image) return jsonLd.image;
      if (jsonLd?.image?.url) return jsonLd.image.url;

      // Try og:image meta tag
      if (metaImage) return metaImage;

      // Fallback: Extract first image from page (works better for AH recipes)
      const imgMatch = cleanHtml.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
      if (imgMatch && imgMatch[1]) {
        const imgUrl = imgMatch[1];
        // Only use if it's a valid image URL
        if (imgUrl.startsWith("http") || imgUrl.startsWith("/")) {
          return imgUrl;
        }
      }

      return "";
    })();

    return {
      platform: "website",
      sourceUrl: url,
      title: normalizeRecipeTitle(recipeName || metaTitle) || "Website recept",
      description: isMiljuschkaHost(url)
        ? cleanMiljuschkaDescription(recipeDescription, recipeName || metaTitle) || recipeDescription
        : recipeDescription,
      caption: isMiljuschkaHost(url)
        ? cleanMiljuschkaDescription(recipeDescription, recipeName || metaTitle) || recipeDescription
        : recipeDescription,
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
      // Flag for review whenever we have fewer than 3 ingredients or 4 instructions
      // — this triggers the Claude AI fallback in importWebsite when ANTHROPIC_API_KEY
      // is set, which can extract proper steps from messy article bodies.
      // Lower threshold (3 vs 2) means Claude is called more proactively for incomplete recipes.
      needsReview: mergedIngredients.length < 3 || mergedInstructions.length < 4 || !recipeImage,
      sourceLabel: "Imported from Website",
    };
  }

  const fallbackTitle = normalizeRecipeTitle(metaTitle) || "Website recept";
  const fallbackDescription = extractDescription(metaDescription, fallbackTitle);
  const fallbackIngredientsList = normalizeIngredientList(fallbackIngredients.map(parseIngredientLine));
  const fallbackInstructionsList = finalizeInstructionSteps(fallbackInstructions);
  const wprmIngredientsSide = normalizeIngredientList(
    extractWpRecipeMakerIngredientLines(cleanHtml).map(parseIngredientLine)
  );
  const wprmInstructionsSide = finalizeInstructionSteps(extractWpRecipeMakerInstructionLines(cleanHtml));

  const ingPick =
    [wprmIngredientsSide, fallbackIngredientsList].sort((a, b) => b.length - a.length).find((c) => c.length >= 2) ||
    (wprmIngredientsSide.length ? wprmIngredientsSide : fallbackIngredientsList);
  const insPick =
    [wprmInstructionsSide, fallbackInstructionsList].sort((a, b) => b.length - a.length).find((c) => c.length >= 2) ||
    (wprmInstructionsSide.length ? wprmInstructionsSide : fallbackInstructionsList);

  return {
    platform: "website",
    sourceUrl: url,
    title: fallbackTitle,
    description: isMiljuschkaHost(url) ? cleanMiljuschkaDescription(fallbackDescription, fallbackTitle) || fallbackDescription : fallbackDescription,
    caption: isMiljuschkaHost(url) ? cleanMiljuschkaDescription(fallbackDescription, fallbackTitle) || fallbackDescription : fallbackDescription,
    image: metaImage,
    author: new URL(url).hostname.replace(/^www\./, ""),
    ingredients: ingPick,
    instructions: insPick,
    time: estimateTime(fallbackDescription),
    servings: "2",
    needsReview: ingPick.length < 2 || insPick.length < 2,
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
    sourceLabel:
      platform === "tiktok"
        ? "Imported from TikTok"
        : platform === "instagram"
          ? "Imported from Instagram"
          : platform === "facebook"
            ? "Imported from Facebook"
            : `Imported from ${platform}`,
  };
}

// Instagram caption parsing helpers (Phase 1 improvements)
function normalizeInstagramCaption(text) {
  if (!text) return "";

  let normalized = String(text);

  // Remove common Instagram artifacts
  normalized = normalized.replace(/^📍\s*/, ""); // Remove location emoji at start
  normalized = normalized.replace(/\n\s*#\w+/g, "\n"); // Move hashtags to end, clean lines
  normalized = normalized.replace(/@\w+/g, ""); // Remove @mentions

  // Handle emoji separators
  normalized = normalized.replace(/🥘|👨‍🍳|👩‍🍳/g, "\n"); // Convert recipe emojis to newlines

  // Normalize whitespace (multiple spaces → single, multiple newlines → double)
  normalized = normalized.replace(/  +/g, " ");
  normalized = normalized.replace(/\n{3,}/g, "\n\n");

  return normalized.trim();
}

function extractRecipeFromInstagramCaption(caption) {
  if (!caption || caption.length < 10) return { ingredients: [], instructions: [] };

  const normalized = normalizeInstagramCaption(caption);
  const lines = normalized.split(/\n+/);

  const result = { ingredients: [], instructions: [] };
  let currentSection = null; // 'ingredients' or 'instructions'

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Detect section headers
    if (/^(ingrediënten|ingredients|materiaal|supplies|onderdelen)/i.test(trimmed)) {
      currentSection = "ingredients";
      continue;
    }
    if (/(bereid|bereiding|instructions?|method|stappen|steps|werkwijze)/i.test(trimmed)) {
      currentSection = "instructions";
      continue;
    }

    // Extract content based on current section
    if (currentSection === "ingredients") {
      // Ingredient lines often start with: ✓, ✅, •, -, emoji, or number
      if (/^[\s•\-✓✅\d\.🥘👨‍🍳👩‍🍳]*/.test(trimmed)) {
        const ingredient = trimmed.replace(/^[\s•\-✓✅\d\.🥘👨‍🍳👩‍🍳]*/, "").trim();
        if (ingredient && ingredient.length > 2) {
          result.ingredients.push(ingredient);
        }
      }
    } else if (currentSection === "instructions") {
      // Instruction lines
      if (trimmed.length > 5) {
        result.instructions.push(trimmed.replace(/^[\d\.]*\s*/, "")); // Remove numbering
      }
    }
  }

  return result;
}

function extractInstagramHashtagIngredients(caption) {
  // Extract ingredient hints from hashtags like #ingredient_name
  if (!caption) return [];

  const hashtags = caption.match(/#\w+/g) || [];
  const ingredients = [];

  for (const tag of hashtags) {
    const ingredient = tag.slice(1).replace(/_/g, " "); // Remove # and replace underscores
    if (ingredient.length > 2 && ingredient.length < 30 && !/^[a-z]{1,3}$/.test(ingredient)) {
      ingredients.push(ingredient);
    }
  }

  return ingredients;
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
  const titleHint = pickBestTitleCandidate([ogTitle, oembed.title, textDerivedTitle, ...htmlSignals.titles]);
  const claudeInput = buildClaudeSocialInput({
    titleHint,
    caption: bestCaption,
    pageText: textFallback || "",
    note: note || "",
  });
  const claudeResult = await extractWithClaude(claudeInput, "");
  if (claudeResult) {
    const post = postProcessExtractedSections({
      ingredients: claudeResult.ingredients || [],
      instructions: claudeResult.instructions || [],
    });

    const mergedPost = mergeSocialExtraction({
      claudeIngredients: claudeResult.ingredients || [],
      claudeInstructions: claudeResult.instructions || [],
      captionText: stripSocialNoise(bestCaption),
    });

    const parsedIngredients = normalizeIngredientList(
      (mergedPost.ingredients || post.ingredients || []).map((ingredient) =>
        typeof ingredient === "string" ? parseIngredientLine(ingredient) : ingredient
      )
    );

    return {
      platform: "tiktok",
      sourceUrl,
      title: normalizeSocialRecipeTitle(claudeResult.title) || normalizeSocialRecipeTitle(titleHint) || "Geïmporteerd recept",
      description: compactSocialDescription(claudeResult.description || "", claudeResult.title || "") || extractDescription(bestCaption, claudeResult.title || titleHint),
      caption: stripSocialNoise(bestCaption),
      image,
      author,
      ingredients: parsedIngredients,
      instructions: finalizeInstructionSteps(mergedPost.instructions || post.instructions),
      time: sanitizeText(claudeResult.time || "30 min"),
      servings: sanitizeText(String(claudeResult.servings || "2")),
      needsReview: parsedIngredients.length < 3 || finalizeInstructionSteps(mergedPost.instructions || post.instructions).length < 3,
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

  // Extracteer de Instagram shortcode voor embed-URL
  const igShortcode = String(sourceUrl || "").match(/\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/)?.[1] || "";
  const igEmbedUrl = igShortcode ? `https://www.instagram.com/p/${igShortcode}/embed/` : "";

  if (META_APP_ID && META_APP_SECRET) {
    const token = `${META_APP_ID}|${META_APP_SECRET}`;
    const endpoint =
      `https://graph.facebook.com/v23.0/instagram_oembed?url=${encodeURIComponent(sourceUrl)}` +
      `&fields=author_name,author_url,html,thumbnail_url,title,provider_name,provider_url,type,version` +
      `&access_token=${encodeURIComponent(token)}`;
    console.log(`[IG] oEmbed aanroepen voor ${igShortcode || sourceUrl}`);
    oembed = await fetchJson(endpoint).catch((error) => {
      oembedErrorMessage = error instanceof Error ? error.message : String(error || "");
      console.warn(`[IG] oEmbed mislukt: ${oembedErrorMessage}`);
      return null;
    });
    if (oembed) {
      console.log(`[IG] oEmbed OK — author: ${oembed.author_name}, caption-lengte: ${String(oembed.title || "").length}`);
    }
  } else {
    console.warn(`[IG] META_APP_ID/SECRET niet ingesteld — oEmbed overgeslagen`);
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

  // oEmbed.title is de volledige Instagram-caption — zet hem vooraan zodat hij wint van og:description
  const oembedCaption = sanitizeText(oembed?.title || "");
  let image = ogImage || oembed?.thumbnail_url || "";
  const author = oembed?.author_name || htmlSignals.authors[0] || "";
  let captionCandidates = [oembedCaption, ogDescription, textDerivedCaption, ...htmlSignals.captions];
  let bestCaption = (oembedCaption.length > 40 ? oembedCaption : null)
    || pickBestCaptionCandidate(captionCandidates)
    || sanitizeText(ogDescription || oembedCaption || "");

  // Fallback 1: embed URL — bypasses login wall voor publieke posts.
  if (!bestCaption && igShortcode) {
    try {
      const embedHtmlRes = await fetch(`https://www.instagram.com/p/${igShortcode}/embed/captioned/`, {
        headers: { ...FETCH_HEADERS, Accept: "text/html" },
        signal: AbortSignal.timeout(8000),
        redirect: "follow",
      });
      if (embedHtmlRes.ok) {
        const embedHtml = await embedHtmlRes.text();
        const embedSignals = extractInstagramHtmlSignals(embedHtml);
        const embedOgDesc = parseMetaTag(embedHtml, "og:description");
        // Ook plain-text caption uit de embed: zoek in <span class="Caption"> of vergelijkbaar.
        const spanCaption = (() => {
          const m = embedHtml.match(/<(?:span|div)[^>]*class="[^"]*(?:Caption|caption-text|post-caption)[^"]*"[^>]*>([\s\S]{20,3000}?)<\/(?:span|div)>/i);
          if (!m) return "";
          return m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        })();
        captionCandidates = [...captionCandidates, embedOgDesc, spanCaption, ...embedSignals.captions];
        bestCaption = pickBestCaptionCandidate(captionCandidates) || sanitizeText(embedOgDesc || "");
        if (!image) image = parseMetaTag(embedHtml, "og:image") || "";
      }
    } catch {
      // embed fetch failed — continue without
    }
  }

  // Fallback 2: Firecrawl — kan Instagram's login wall soms omzeilen met headless browser.
  if (!bestCaption && igShortcode) {
    const fcDoc = await fetchWebsiteDocumentViaFirecrawl(sourceUrl).catch(() => null);
    if (fcDoc) {
      const fcHtml = fcDoc.kind === "html" ? fcDoc.body : "";
      const fcText = fcDoc.kind === "text" ? fcDoc.body : "";
      const fcSignals = fcHtml ? extractInstagramHtmlSignals(fcHtml) : { titles: [], captions: [], authors: [] };
      const fcCaption = pickBestCaptionCandidate([...fcSignals.captions, isUsefulCaptionCandidate(fcText) ? fcText : ""]) || sanitizeText(fcText || "").slice(0, 3000);
      if (fcCaption && fcCaption.length > 30) {
        captionCandidates = [...captionCandidates, fcCaption];
        bestCaption = pickBestCaptionCandidate(captionCandidates) || fcCaption;
      }
      if (!image && fcHtml) image = parseMetaTag(fcHtml, "og:image") || "";
    }
  }

  // Try Claude extraction even if caption is short/doesn't score high enough
  // (Instagram captions might not have explicit "ingredients" keyword but still contain recipe data)
  const captionForClaude = bestCaption || sanitizeText(ogDescription || textDerivedCaption || oembed?.title || "");

  if (captionForClaude && captionForClaude.length >= 10) {
    const titleHint = pickBestTitleCandidate([ogTitle, oembed?.title, textDerivedTitle, ...htmlSignals.titles]);
    const claudeInput = buildClaudeSocialInput({
      titleHint,
      caption: captionForClaude,
      pageText: textFallback || "",
      note: note || "",
    });
    const claudeResult = await extractWithClaude(claudeInput, "");
    if (claudeResult) {
      const post = postProcessExtractedSections({
        ingredients: claudeResult.ingredients || [],
        instructions: claudeResult.instructions || [],
      });

      const mergedPost = mergeSocialExtraction({
        claudeIngredients: claudeResult.ingredients || [],
        claudeInstructions: claudeResult.instructions || [],
        captionText: stripSocialNoise(captionForClaude),
      });

      const parsedIngredients = normalizeIngredientList(
        (mergedPost.ingredients || post.ingredients || []).map((ingredient) =>
          typeof ingredient === "string" ? parseIngredientLine(ingredient) : ingredient
        )
      );

      return {
        platform: "instagram",
        sourceUrl,
        title: normalizeSocialRecipeTitle(claudeResult.title) || normalizeSocialRecipeTitle(titleHint) || "Geïmporteerd recept",
        description: [compactSocialDescription(claudeResult.description || "", claudeResult.title || "") || extractDescription(captionForClaude, claudeResult.title || titleHint), sourceUrl ? `Bron: ${sourceUrl}` : ""].filter(Boolean).join("\n\n"),
        caption: stripSocialNoise(captionForClaude),
        image,
        author,
        embedUrl: igEmbedUrl,
        ingredients: parsedIngredients,
        instructions: finalizeInstructionSteps(mergedPost.instructions || post.instructions),
        time: sanitizeText(claudeResult.time || "30 min"),
        servings: sanitizeText(String(claudeResult.servings || "2")),
        needsReview: parsedIngredients.length < 3 || finalizeInstructionSteps(mergedPost.instructions || post.instructions).length < 3,
        sourceLabel: "Imported from Instagram",
      };
    }
  }

  if (!oembed && !html && !textFallback) {
    // Provide user-friendly error messages with helpful suggestions
    if (/Meta oEmbed Read|oEmbed Read|Insufficient Permission/i.test(oembedErrorMessage)) {
      throw new HttpError(
        503,
        "Instagram import wacht nog op Meta-goedkeuring. 📱 Probeer:\n" +
        "1️⃣ Zet je post op public\n" +
        "2️⃣ Copy de link rechtstreeks uit je browser\n" +
        "3️⃣ Plak de link hier opnieuw\n\n" +
        "Of gebruik een public receptwebsite-link."
      );
    }

    if (!META_APP_ID || !META_APP_SECRET) {
      throw new HttpError(
        501,
        "Meta app niet geconfigureerd. 🔧 Probeer:\n" +
        "1️⃣ Zet je post op public\n" +
        "2️⃣ Copy de URL uit je browser\n" +
        "3️⃣ Plak hier opnieuw\n\n" +
        "Of voeg je recept handmatig in."
      );
    }

    throw new HttpError(
      502,
      "Instagram post kon niet geladen worden. 🤔 Mogelijke oorzaken:\n" +
      "- Privéaccount\n" +
      "- Verwijderde post\n" +
      "- URL fout\n\n" +
      "Probeer: Link een receptwebsite in je bio, of voeg handmatig in."
    );
  }

  return { ...buildSocialRecipe({
    platform: "instagram",
    sourceUrl,
    rawTitle: ogTitle || oembed?.title || textDerivedTitle,
    rawCaption: bestCaption || oembed?.title || "",
    image,
    author,
    titleCandidates: [ogTitle, oembed?.title, textDerivedTitle, ...htmlSignals.titles],
    captionCandidates,
  }), embedUrl: igEmbedUrl };
}

async function importFacebook(sourceUrl, note) {
  let document;
  try {
    document = await fetchWebsiteDocument(sourceUrl);
  } catch (error) {
    throw new HttpError(
      error?.statusCode || 502,
      "Facebook import kon niet geladen worden. 🤔 Probeer:\n" +
        "- Zorg dat de post public is\n" +
        "- Kopieer de link uit je browser (niet uit de app)\n" +
        "- Probeer opnieuw"
    );
  }

  const html = document.kind === "html" ? document.body : "";
  const textFallback = document.kind === "text" ? document.body : "";

  const ogTitle = html ? parseMetaTag(html, "og:title") : "";
  const ogDescription = html ? parseMetaTag(html, "og:description") : "";
  const twitterDesc = html ? parseMetaTag(html, "twitter:description", "name") : "";
  const ogImage = html ? parseMetaTag(html, "og:image") : "";

  const cleanTextFallback = textFallback ? stripSocialNoise(textFallback).slice(0, 8000) : "";
  const textDerivedTitle = cleanTextFallback
    ? extractDishPhrase(cleanTextFallback) || extractRecipeTitleFromCaption(cleanTextFallback)
    : "";

  // Build a smaller, recipe-like snippet (<= 2400 chars) so it passes caption scoring
  // and can be used by buildSocialRecipe even when Claude is disabled.
  const textDerivedCaption = (() => {
    if (!cleanTextFallback) return "";
    let snippet = cleanTextFallback;
    // Prefer a window around ingredients/instructions headings when present
    const idx = snippet.search(/\b(ingrediënten|ingredients|bereiding|instructions?|method|stappen|steps)\b/i);
    if (idx >= 0) {
      snippet = snippet.slice(Math.max(0, idx - 350), idx + 2200);
    } else {
      // Otherwise take the first chunk (often contains the post text)
      snippet = snippet.slice(0, 2400);
    }
    // Normalize to line-based chunk to help downstream parsers
    snippet = snippet.split(/\n+/).slice(0, 90).join("\n");
    return snippet.slice(0, 2400).trim();
  })();

  // Facebook often puts the full post text in og:description or twitter:description
  const bestCaption = [ogDescription, twitterDesc, textFallback]
    .filter((s) => s && isUsefulCaptionCandidate(s))
    .sort((a, b) => b.length - a.length)[0] || "";

  const pageText = html ? extractReadableTextFromHtml(html, 5000) : textFallback;

  // Try Claude with the caption + page text
  const claudeInput = [bestCaption, pageText].filter(Boolean).join("\n\n").slice(0, 5000);
  if (claudeInput || ogTitle) {
    const claudeResult = await extractWithClaude(claudeInput || ogTitle, note || "");
    if (claudeResult) {
      const parsedIngredients = Array.isArray(claudeResult.ingredients)
        ? claudeResult.ingredients.map((ingredient) =>
            typeof ingredient === "string" ? parseIngredientLine(ingredient) : ingredient
          )
        : [];
      return {
        platform: "facebook",
        sourceUrl,
        title: normalizeSocialRecipeTitle(claudeResult.title) || "Geïmporteerd recept",
        description: compactSocialDescription(claudeResult.description || "", claudeResult.title || ""),
        caption: stripSocialNoise(bestCaption),
        image: ogImage || "",
        author: "",
        ingredients: normalizeIngredientList(parsedIngredients),
        instructions: Array.isArray(claudeResult.instructions) ? finalizeInstructionSteps(claudeResult.instructions) : [],
        time: sanitizeText(claudeResult.time || "30 min"),
        servings: sanitizeText(String(claudeResult.servings || "2")),
        needsReview: parsedIngredients.length === 0,
        sourceLabel: "Imported from Facebook",
      };
    }
  }

  // Fallback: basic heuristic
  return buildSocialRecipe({
    platform: "facebook",
    sourceUrl,
    rawTitle: ogTitle || textDerivedTitle || "",
    rawCaption: bestCaption || textDerivedCaption || ogTitle || textDerivedTitle || "",
    image: ogImage || "",
    author: "",
    titleCandidates: [ogTitle, textDerivedTitle],
    captionCandidates: [bestCaption, twitterDesc, textDerivedCaption],
  });
}

async function importPinterest(sourceUrl) {
  // For pin.it short URLs, follow redirect first
  let finalUrl = sourceUrl;
  if (/pin\.it/.test(sourceUrl)) {
    try {
      const res = await fetch(sourceUrl, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000), headers: FETCH_HEADERS });
      if (res.url) finalUrl = res.url;
    } catch { /* keep original */ }
  }

  // Try Pinterest oembed to get the linked URL
  try {
    const oembedUrl = `https://www.pinterest.com/oembed.json?url=${encodeURIComponent(finalUrl)}`;
    const res = await fetch(oembedUrl, { headers: FETCH_HEADERS, signal: AbortSignal.timeout(8000) });
    if (res.ok) {
      const data = await res.json();
      // Pinterest oembed has a url field pointing to the pin page
      // The actual recipe is at the "url" the pin links to — try to extract from HTML
    }
  } catch { /* ignore */ }

  // Fall back to scraping the Pinterest pin page directly
  const doc = await fetchWebsiteDocument(finalUrl);
  if (doc.kind === "text") {
    return parseTextRecipeDocument(doc.body, doc.finalUrl || finalUrl);
  }

  // Pinterest's HTML has a structured data script with the linked URL
  const linkedUrlMatch = doc.body.match(/"url"\s*:\s*"(https?:\/\/(?!www\.pinterest)[^"]+)"/);
  if (linkedUrlMatch) {
    try {
      const linkedDoc = await fetchWebsiteDocument(linkedUrlMatch[1]);
      if (linkedDoc.kind === "text") return parseTextRecipeDocument(linkedDoc.body, linkedUrlMatch[1]);
      return parseWebsiteRecipe(linkedDoc.body, linkedUrlMatch[1]);
    } catch { /* fall through */ }
  }

  return parseWebsiteRecipe(doc.body, doc.finalUrl || finalUrl);
}

function extractAhRecipeImage(html) {
  // Try og:image first (most reliable for high quality)
  const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (ogMatch && ogMatch[1]) {
    // Upgrade static.ah.nl images to highest quality variant
    let ogImage = ogMatch[1];
    if (ogImage.includes("static.ah.nl")) {
      ogImage = upgradeAhImageQuality(ogImage);
    }
    return ogImage;
  }

  // Try JSON-LD image
  const jsonLdMatch = html.match(/"image"\s*:\s*"([^"]+)"/i);
  if (jsonLdMatch && jsonLdMatch[1] && jsonLdMatch[1].startsWith("http")) {
    let image = jsonLdMatch[1];
    if (image.includes("static.ah.nl")) {
      image = upgradeAhImageQuality(image);
    }
    return image;
  }

  // AH-specific: look for recipe hero images - prefer highest quality
  // AH uses images with static.ah.nl domain for recipe images
  // Get all AH image URLs and pick the highest quality one
  const ahImages = [...html.matchAll(/https:\/\/static\.ah\.nl\/[^"'<>\s]+\.(?:jpg|jpeg|png|webp)/gi)];
  if (ahImages.length > 0) {
    // Try to find the largest resolution image (typically in filename)
    let bestImage = ahImages[0][0];
    for (const match of ahImages) {
      const url = match[0];
      // Look for images with dimensions in filename (e.g., 1224x900, 1200x800)
      if (/\d{3,4}x\d{3,4}/.test(url)) {
        bestImage = url;
        break; // First one with dimensions is usually highest quality
      }
    }
    return upgradeAhImageQuality(bestImage);
  }

  // Fallback: search all img tags for high-quality images
  const allImages = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  for (const match of allImages) {
    const src = match[1];
    if (src.startsWith("http") && (src.includes("static.ah.nl") || src.includes("recepten"))) {
      return upgradeAhImageQuality(src);
    }
  }

  // Last resort: any img src that's a valid URL
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (imgMatch && imgMatch[1] && (imgMatch[1].startsWith("http") || imgMatch[1].startsWith("/"))) {
    return imgMatch[1];
  }

  return "";
}

function upgradeAhImageQuality(imageUrl) {
  // AH CDN supports different size variants
  // Upgrade smaller images to higher quality versions
  // Example: converts *_123x456_* to *_1224x900_* for recipe images

  // If already a high-quality size, return as-is
  if (/\d{4}x\d{3,4}/.test(imageUrl)) {
    return imageUrl;
  }

  // For smaller AH images, try to upgrade to larger variant
  // AH recipe images often have variants like: 400x300, 800x600, 1200x900, 1224x900
  // Replace small dimensions with larger ones
  let upgraded = imageUrl.replace(/_\d{2,3}x\d{2,3}_/, "_1224x900_");

  // If that didn't match, try other patterns
  if (upgraded === imageUrl) {
    upgraded = imageUrl.replace(/_\d{2,3}x\d{2,3}(?=\.)/, "_1224x900");
  }

  return upgraded.startsWith("http") ? upgraded : imageUrl;
}

async function fetchAhRecipeThumbnail(recipeUrl) {
  try {
    const document = await fetchWebsiteDocument(recipeUrl, 0);
    const image = extractAhRecipeImage(document.body);
    if (image) return image;
  } catch {
    /* Try reader fallback below. */
  }

  try {
    const readerDocument = await fetchReaderFallback(recipeUrl);
    return extractAhRecipeImage(readerDocument.body);
  } catch {
    return "";
  }
}

/**
 * Verwijdert vaste Allerhande UI-/marketingregels (Box-label, review-CTA, artikel-CTA's) uit importtekst.
 */
function cleanAllerhandeUiFluff(raw) {
  let s = String(raw ?? "").replace(/\r\n/g, "\n");
  if (!s.trim()) return "";

  const stripInline = (text) => {
    let t = String(text ?? "");
    t = t.replace(/\bDit\s+is\s+een\s+Allerhande\s+Box(?:\s*[-–]?\s*)?recept\.?\b/gi, "");
    t = t.replace(/\bWat\s+vond\s+je\s+van\s+dit\s+recept\??\b/gi, "");
    // "algemeen Meer weten over [kooktechnieken](https://www.ah.nl/allerhande/...)?"
    t = t.replace(
      /\balgemeen\s+meer\s+weten\s+over\s*\[[^\]]*]\([^)]*(?:ah\.nl|albert\s*heijn)[^)]*\)\??/gi,
      ""
    );
    t = t.replace(/\bmeer\s+weten\s+over\s*\[[^\]]*]\([^)]*(?:ah\.nl|allerhande)[^)]*\)\??/gi, "");
    t = t.replace(/\bmeer\s+weten\s+over\s+https?:\/\/[^\s)\]]+(?:allerhande|ah\.nl)[^\s)]*/gi, "");
    t = t.replace(/\s{2,}/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    return t;
  };

  s = stripInline(s);

  const isJunkLine = (line) => {
    const x = String(line || "").trim();
    if (!x) return false;
    if (/^\?\s*$/.test(x)) return true;
    if (/^dit\s+is\s+een\s+allerhande\s+box/i.test(x)) return true;
    if (/^wat\s+vond\s+je\s+van\s+dit\s+recept/i.test(x)) return true;
    if (/^allerhande\s+box(?:\s*[-–]?\s*)?recept\.?$/i.test(x)) return true;
    if (/^algemeen\s+/i.test(x) && /meer\s+weten\s+over/i.test(x)) return true;
    if (/meer\s+weten\s+over\s*\[/i.test(x) && /(?:ah\.nl|allerhande)/i.test(x)) return true;
    return false;
  };

  s = s
    .split("\n")
    .map((line) => stripInline(line))
    .filter((line) => String(line).trim() && !isJunkLine(line))
    .join("\n")
    .trim();

  return stripInline(s);
}

function cleanAllerhandeInstructionSteps(steps) {
  if (!Array.isArray(steps)) return steps;
  return steps
    .map((x) => cleanAllerhandeUiFluff(String(x ?? "")))
    .filter((x) => x.length > 0);
}

/** og:description / meta name=description op AH is vaak generieke SEO ("Zelf … maken? … Allerhande"). */
function isLikelyAllerhandeSeoMicrocopy(text) {
  const s = sanitizeText(String(text || "")).trim();
  if (!s) return true;
  const lower = s.toLowerCase();
  if (/^zelf\s+.+\bmaken\?/i.test(s)) return true;
  if (/met dit recept van allerhande/i.test(lower)) return true;
  if (/bekijk ingrediënten en bereidingswijze/i.test(lower)) return true;
  if (/zet je een feestje op tafel/i.test(lower) && /allerhande/i.test(lower)) return true;
  if (/\|\s*albert\s*heijn\s*$/i.test(s.trim())) return true;
  if (/\|\s*allerhande\s*$/i.test(s.trim())) return true;
  if (/\brecept\s*-\s*allerhande\s*\|/i.test(s)) return true;
  // AH Premium / Plus-lidmaatschap / jaarprijs — géén recepttekst (staat soms in og:description of schema)
  if (/\balbert\s*heijn\s+premium\b/i.test(lower)) return true;
  if (/\bah\s+premium\b/i.test(lower) && /\b(per\s+jaar|jaarlijks|€|euro|\d{3,4}\s*(?:per|\/)\s*jaar)/i.test(lower)) return true;
  if (/\bmijn\s+(ah\s+)?(?:albert\s*heijn\s+)?premium\b/i.test(lower)) return true;
  if (/\bpremium\b/i.test(lower) && /\b(14\s*[,.]?\s*99|1499)\b/.test(lower) && /\b(per\s+jaar|jaar|jaarlijks|\/\s*jaar)\b/i.test(lower)) return true;
  if (/\b(?:plus|premium)?\s*lidmaatschap\b/i.test(lower) && /(albert\s*heijn|\bah\b|ah\.nl|allerhande)/i.test(lower)) return true;
  if (/\bvoor\s+niks\s+bezorgd\b/i.test(lower) && /(premium|plus|lid)/i.test(lower)) return true;
  if (/\bword\s+(?:gratis\s+)?(?:plus|premium)?\s*(?:member|klant|lid)\b/i.test(lower) && /(ah|albert|allerhande)/i.test(lower)) return true;
  return false;
}

/**
 * AH Next.js-bundle bevat vaak `"description":"…","keywords":"…"` voor het hoofdrecept
 * vóór structured data laadt — betrouwbaarder dan og:description.
 */
function extractAllerhandeEmbeddedRecipeDescription(html) {
  if (!html) return "";
  const m = html.match(/"description"\s*:\s*"((?:[^"\\]|\\.){12,4000})"\s*,\s*"keywords"\s*:/i);
  if (!m || !m[1]) return "";
  let decoded;
  try {
    decoded = JSON.parse(`"${m[1].replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
  } catch {
    decoded = m[1].replace(/\\"/g, '"').replace(/\\n/g, "\n");
  }
  const plain = sanitizeText(stripTags(String(decoded || "")));
  if (plain.length < 12 || isLikelyAllerhandeSeoMicrocopy(plain)) return "";
  return plain;
}

function extractAllerhandeIntroParagraphFromDom(html) {
  if (!html) return "";
  const patterns = [
    /data-testhook=["']recipe-introduction["'][^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/i,
    /class=["'][^"']*(?:recipe[-_ ]?intro|recipe[-_ ]?introduction)[^"']*["'][^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/i,
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match && match[1]) {
      const t = sanitizeText(stripTags(match[1]));
      if (t.length >= 20 && !isLikelyAllerhandeSeoMicrocopy(t)) return t;
    }
  }
  return "";
}

/**
 * Kies de beste omschrijving: geen vaste JSON-LD-voorrang (die ontbreekt soms);
 * expliciet SEO-meta en lage kwaliteit naar beneden scoren.
 */
function pickAhDescription(candidates) {
  const items = (Array.isArray(candidates) ? candidates : [])
    .map((c) => {
      if (c && typeof c === "object" && "text" in c) {
        return { text: String(c.text || ""), source: String(c.source || "") };
      }
      return { text: String(c || ""), source: "" };
    })
    .filter((c) => sanitizeText(c.text));

  const baseSourceWeight = (source) => {
    switch (source) {
      case "embeddedJson":
        return 120;
      case "introHtml":
        return 110;
      case "jsonLd":
        return 95;
      case "readerIntro":
        return 100;
      case "readerPrimary":
        return 55;
      case "primaryHtml":
        return 50;
      case "metaOg":
        return 15;
      default:
        return 40;
    }
  };

  const scoreAhDescriptionCandidate = (text, source) => {
    const s = sanitizeText(text);
    if (!s || s.length < 12) return -1e9;
    if (isLikelyAllerhandeSeoMicrocopy(s)) return -1e9;
    if (/^wij gebruiken cookies/i.test(s)) return -1e9;
    if (/^published time:/i.test(s)) return -1e9;
    let score = baseSourceWeight(source);
    const lower = s.toLowerCase();
    if (source === "metaOg" || source === "") {
      score -= 35;
    }
    if (/\b(ingrediënten|ingredients)\b/i.test(s) && /\d+\s*(g|ml|el|tl)\b/i.test(s)) {
      score -= 40;
    }
    if (s.length >= 40 && s.length <= 700) {
      score += 25;
    }
    if (/\b(smaak|krokant|roer|snijd|verhit|oven|pan|bak)\b/i.test(lower)) {
      score += 12;
    }
    return score;
  };

  const scored = items
    .map(({ text, source }) => ({
      text: sanitizeText(text),
      source,
      score: scoreAhDescriptionCandidate(text, source),
    }))
    .filter((x) => x.score > -1e8);

  if (!scored.length) {
    const normalized = items.map((x) => sanitizeText(x.text)).filter(Boolean);
    const cleaned = normalized
      .filter((s) => !isLikelyAllerhandeSeoMicrocopy(s))
      .filter((s) => !/^zelf\b.+\bmaken\?/i.test(s))
      .filter((s) => !/met dit recept van allerhande/i.test(s))
      .filter((s) => !/bekijk ingrediënten/i.test(s))
      .filter((s) => !/^dit\s+is\s+een\s+allerhande\s+box/i.test(String(s || "").trim()))
      .filter((s) => !/^wat\s+vond\s+je\s+van\s+dit\s+recept/i.test(String(s || "").trim()))
      .filter((s) => !/^published time:/i.test(s))
      .filter((s) => !/^title:\s/i.test(s))
      .filter((s) => !/^url source:\s/i.test(s));
    cleaned.sort((a, b) => scoreRecipeText(b) - scoreRecipeText(a));
    const fallback = cleanAllerhandeUiFluff(cleaned[0] || "");
    return fallback.length >= 12 ? fallback : "";
  }

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  const polished = cleanAllerhandeUiFluff(best.text);
  return polished.length >= 12 ? polished : best.text;
}

async function importWebsite(sourceUrl) {
  const parsedUrl = new URL(sourceUrl);
  const isAllerhande = /(^|\.)ah\.nl$/i.test(parsedUrl.hostname) && (/\/allerhande\//i.test(parsedUrl.pathname) || /\/r\/\d+/.test(parsedUrl.pathname));
  const isLekkerSimpel = /lekkerensimpel\.com$/i.test(parsedUrl.hostname);

  if (isLekkerSimpel) {
    const slugToTitle = (url) => {
      try {
        const u = new URL(url);
        const segment = String(u.pathname || "")
          .replace(/\/+$/, "")
          .split("/")
          .pop();
        const slug = String(segment || "").trim();
        if (!slug || slug.length < 3) return "";
        if (!/[a-z]/i.test(slug)) return "";
        return slug
          .split("-")
          .filter((w) => w && !/^\d+$/.test(w))
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
          .trim();
      } catch {
        return "";
      }
    };

    const titleRoughlyMatchesSlug = (title, url) => {
      const candidate = normalizeRecipeTitle(sanitizeText(title || ""));
      const slugTitle = normalizeRecipeTitle(slugToTitle(url) || "");
      if (!candidate || !slugTitle) return true;

      const words = (text) =>
        new Set(
          String(text)
            .toLowerCase()
            .replace(/[^a-z0-9]+/gi, " ")
            .split(/\s+/)
            .map((w) => w.trim())
            .filter((w) => w.length >= 4 && !/^\d+$/.test(w))
        );

      const slugWords = words(slugTitle);
      const titleWords = words(candidate);
      if (slugWords.size < 2 || titleWords.size < 2) return true;

      let overlap = 0;
      for (const w of slugWords) {
        if (titleWords.has(w)) overlap += 1;
      }

      return overlap >= 2 || overlap / Math.max(1, slugWords.size) >= 0.6;
    };

    const document = await fetchWebsiteDocument(sourceUrl);
    const finalUrl = document.finalUrl || sourceUrl;

    const primaryRecipe =
      document.kind === "text"
        ? parseTextRecipeDocument(document.body, finalUrl)
        : parseWebsiteRecipe(document.body, finalUrl);

    if (document.kind !== "html") {
      return primaryRecipe;
    }

    const html = document.body;
    const cleanHtml = removeAdContainers(html);
    const jsonLdRecipe = findRecipeJsonLd(cleanHtml);
    const jsonLdTitle = normalizeRecipeTitle(sanitizeText(jsonLdRecipe?.name || ""));
    const h1Title = normalizeRecipeTitle(
      sanitizeText(stripTags((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "")))
    );
    const ogTitle = normalizeRecipeTitle(parseMetaTag(html, "og:title") || "");

    const picked = jsonLdTitle || h1Title || ogTitle || primaryRecipe.title || "";
    const safeTitle = titleRoughlyMatchesSlug(picked, finalUrl) ? picked : slugToTitle(finalUrl) || picked;

    return {
      ...primaryRecipe,
      title: safeTitle || primaryRecipe.title,
    };
  }

  if (isAllerhande) {
    const graphqlRecipe = await importAhRecipeViaGraphql(sourceUrl);
    if (graphqlRecipe && !graphqlRecipe.needsReview) {
      return graphqlRecipe;
    }

    const [documentSettled, readerSettled, firecrawlSettled, browserSettled] = await Promise.allSettled([
      fetchWebsiteDocument(sourceUrl),
      fetchReaderFallback(sourceUrl),
      fetchWebsiteDocumentViaFirecrawl(sourceUrl),
      fetchWebsiteDocumentViaBrowser(sourceUrl),
    ]);
    const document =
      firecrawlSettled.status === "fulfilled" && firecrawlSettled.value
        ? firecrawlSettled.value
        : browserSettled.status === "fulfilled" && browserSettled.value
          ? browserSettled.value
          : documentSettled.status === "fulfilled"
            ? documentSettled.value
            : readerSettled.status === "fulfilled"
              ? readerSettled.value
              : null;
    const readerDocument =
      readerSettled.status === "fulfilled"
        ? readerSettled.value
        : firecrawlSettled.status === "fulfilled" && firecrawlSettled.value?.kind === "text"
          ? firecrawlSettled.value
          : null;
    if (!document) {
      throw firecrawlSettled.reason || readerSettled.reason || documentSettled.reason || new HttpError(502, "Kon bronpagina niet ophalen.");
    }

    const primaryRecipe =
      document.kind === "text"
        ? parseTextRecipeDocument(document.body, document.finalUrl || sourceUrl)
        : parseWebsiteRecipe(document.body, document.finalUrl || sourceUrl);

    const html = document.kind === "html" ? document.body : "";
    const ahJsonLdRecipe = html ? findRecipeJsonLd(removeAdContainers(html)) : null;
    const ahJsonLdTitle = sanitizeText(ahJsonLdRecipe?.name || "");
    const ahJsonLdDescription = sanitizeText(stripTags(ahJsonLdRecipe?.description || ""));
    const ahJsonLdTime = parseDurationToMinutes(ahJsonLdRecipe?.totalTime || ahJsonLdRecipe?.cookTime || ahJsonLdRecipe?.prepTime) || "";
    const ahJsonLdServings = sanitizeText(ahJsonLdRecipe?.recipeYield || "");
    const ahJsonLdCalories = (() => {
      const raw = sanitizeText(ahJsonLdRecipe?.nutrition?.calories || "");
      const match = raw.match(/(\d+)/);
      return match ? `${match[1]} kcal` : "";
    })();

    const ahH1Title = html
      ? normalizeRecipeTitle(
          sanitizeText(stripTags((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "")))
        )
      : "";
    const ahMetaTitle = html ? normalizeRecipeTitle(parseMetaTag(html, "og:title") || parseTitleTag(html)) : "";
    const extractReaderRecipeTitle = (markdown) => {
      const text = String(markdown || "");
      if (!text) return "";
      const rawLines = text.split(/\n+/).map((l) => sanitizeText(l)).filter(Boolean);
      if (!rawLines.length) return "";

      const ingredientHeadingIdxs = rawLines
        .map((line, idx) => (String(line).trim().startsWith("## ") && INGREDIENT_HEADING_PATTERN.test(sanitizeText(line.replace(/^##\s+/, ""))) ? idx : -1))
        .filter((idx) => idx >= 0);

      const h1Candidates = rawLines
        .map((line, idx) => ({ line, idx }))
        .filter(({ line }) => /^#\s+\S/.test(line));

      const scored = h1Candidates
        .map(({ line, idx }) => {
          const title = normalizeRecipeTitle(line.replace(/^#\s+/, ""));
          const lower = title.toLowerCase();
          const nextIng = ingredientHeadingIdxs.find((i) => i > idx);
          const dist = Number.isFinite(nextIng) ? nextIng - idx : 9999;
          // Prefer titles that are near the ingredients section and not obvious non-recipe headings.
          const penalty =
            /privacy|voorkeuren|cookie|voorwaarden|inloggen|menu|zoek/i.test(lower) ? 5000 : 0;
          const boilerplate = /allerhande|\|\s*albert heijn|recept\s*-\s*/i.test(title) ? 200 : 0;
          return { idx, title, score: dist + penalty + boilerplate };
        })
        .sort((a, b) => a.score - b.score);

      return scored[0]?.title || "";
    };

    const extractIntroFromReaderMarkdown = (markdown, titleHint = "") => {
      const text = String(markdown || "");
      if (!text) return "";
      const rawLines = text.split(/\n+/).map((l) => sanitizeText(l)).filter(Boolean);
      if (!rawLines.length) return "";

      // Prefer the H1 that matches the actual recipe title (when we have a hint),
      // otherwise pick the best candidate near the ingredients section.
      const hint = normalizeRecipeTitle(titleHint || "").toLowerCase();
      const h1Candidates = rawLines
        .map((line, idx) => ({ line, idx }))
        .filter(({ line }) => /^#\s+\S/.test(line));

      const inferredTitle = extractReaderRecipeTitle(markdown);
      const pickedH1 =
        (hint
          ? h1Candidates.find(({ line }) => normalizeRecipeTitle(line.replace(/^#\s+/, "")).toLowerCase() === hint) ||
            h1Candidates.find(({ line }) => normalizeRecipeTitle(line.replace(/^#\s+/, "")).toLowerCase().includes(hint))
          : null) ||
        (inferredTitle
          ? h1Candidates.find(({ line }) => normalizeRecipeTitle(line.replace(/^#\s+/, "")) === inferredTitle)
          : null) ||
        h1Candidates[0];

      const h1Index = pickedH1 ? pickedH1.idx : -1;
      const startIndex = h1Index >= 0 ? h1Index + 1 : 0;
      const scan = rawLines.slice(startIndex, startIndex + 40);

      for (const line of scan) {
        if (!line) continue;
        const plain = sanitizeText(String(line).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"));
        if (!plain) continue;
        if (/^#{1,6}\s/i.test(plain)) continue;
        if (INGREDIENT_HEADING_PATTERN.test(plain) || INSTRUCTION_HEADING_PATTERN.test(plain)) break;
        // Skip nutrition / time / rating snippets and CTA-like lines.
        if (/^\d+\s*kcal\b/i.test(plain)) continue;
        if (/^\d+\s*min\b/i.test(plain) || /^\d+\s*min\.\s*bereiden\b/i.test(plain)) continue;
        if (/^\d+(?:[.,]\d+)?\/5\b/.test(plain)) continue;
        if (/^\(\d+\)$/.test(plain)) continue;
        if (/^kies producten\b/i.test(plain)) continue;
        if (/^ga naar\b/i.test(plain) || /ga naar hoofdinhoud/i.test(plain)) continue;
        if (/^toegankelijkheid\b/i.test(plain)) continue;
        if (isLikelyAllerhandeSeoMicrocopy(plain)) continue;
        if (plain.length >= 30) return plain;
      }
      return "";
    };
    // Only trust primaryRecipe.title when we actually fetched HTML (otherwise it can be reader boilerplate).
    const ahTitle =
      normalizeRecipeTitle(ahJsonLdTitle) ||
      ahH1Title ||
      ahMetaTitle ||
      (html ? primaryRecipe.title : "");

    const ahMetaDescription = html
      ? sanitizeText(
          stripTags(
            parseMetaTag(html, "og:description") || parseMetaTag(html, "description", "name") || ""
          )
        )
      : "";
    // Intro uit echte DOM (testhooks) óf embedded JSON — niet alleen og:description (vaak SEO-microcopy).
    const ahIntroFromHtml = extractAllerhandeIntroParagraphFromDom(html);

    // Extract image specifically from the HTML (before we process it further)
    const imageUrl = extractAhRecipeImage(document.body);

    if (readerDocument?.kind === "text") {
      const readerRecipe = parseTextRecipeDocument(readerDocument.body, readerDocument.finalUrl || sourceUrl);
      const readerIngredients = parseMarkdownIngredientSection(readerDocument.body);
      const readerInstructions = parseMarkdownInstructionSection(readerDocument.body);
      const readerServings = parseMarkdownServings(readerDocument.body);
      const ahReaderDescription = readerRecipe.description || "";
      const ahReaderTitle = normalizeRecipeTitle(extractReaderRecipeTitle(readerDocument.body) || readerRecipe.title || "");
      const titleHintForReader = ahTitle || ahH1Title || ahMetaTitle || ahReaderTitle || primaryRecipe.title;
      const ahReaderIntro = extractIntroFromReaderMarkdown(readerDocument.body, titleHintForReader);
      const mergedAhTitle = ahTitle || ahH1Title || ahMetaTitle || ahReaderTitle || primaryRecipe.title;
      const normalizedAhTitle = normalizeRecipeTitle(mergedAhTitle || "");
      // Allerhande titles sometimes include trailing "en avocado" style add-ons.
      const finalAhTitle = normalizedAhTitle
        .replace(/\s+en\s+avocado$/i, "")
        .replace(/\s+en$/i, "")
        .trim();
      const ahDescription = pickAhDescription([
        { text: extractAllerhandeEmbeddedRecipeDescription(html), source: "embeddedJson" },
        { text: ahJsonLdDescription, source: "jsonLd" },
        { text: ahIntroFromHtml, source: "introHtml" },
        { text: ahMetaDescription, source: "metaOg" },
        { text: ahReaderIntro, source: "readerIntro" },
        { text: ahReaderDescription, source: "readerPrimary" },
        { text: primaryRecipe.description, source: "primaryHtml" },
      ]);
      const pickBestList = (lists, minUseful = 2) => {
        const normalized = lists
          .map((list) => (Array.isArray(list) ? list.filter(Boolean) : []))
          .filter((list) => list.length > 0);
        if (!normalized.length) return [];
        const usable = normalized.filter((list) => list.length >= minUseful);
        const pool = usable.length ? usable : normalized;
        pool.sort((a, b) => b.length - a.length);
        return pool[0] || [];
      };
      const bestIngredients = pickBestList([readerIngredients, readerRecipe.ingredients, primaryRecipe.ingredients], 3);
      const bestInstructions = pickBestList([readerInstructions, readerRecipe.instructions, primaryRecipe.instructions], 3);
      const instructionPick = bestInstructions.length ? bestInstructions : primaryRecipe.instructions;
      const descriptionPick = ahDescription || primaryRecipe.description;
      return {
        ...primaryRecipe,
        image: imageUrl || primaryRecipe.image,
        ingredients: bestIngredients.length ? bestIngredients : primaryRecipe.ingredients,
        instructions: cleanAllerhandeInstructionSteps(instructionPick),
        title: finalAhTitle || mergedAhTitle || primaryRecipe.title,
        description: cleanAllerhandeUiFluff(descriptionPick) || descriptionPick,
        time: ahJsonLdTime || primaryRecipe.time,
        servings: ahJsonLdServings || readerServings || readerRecipe.servings || primaryRecipe.servings,
        kcal: ahJsonLdCalories || primaryRecipe.kcal,
        needsReview:
          bestIngredients.length < 4 ||
          bestInstructions.length < 3,
      };
    }

    const ahHtmlDescription =
      pickAhDescription([
        { text: extractAllerhandeEmbeddedRecipeDescription(html), source: "embeddedJson" },
        { text: ahJsonLdDescription, source: "jsonLd" },
        { text: ahIntroFromHtml, source: "introHtml" },
        { text: ahMetaDescription, source: "metaOg" },
        { text: primaryRecipe.description, source: "primaryHtml" },
      ]) || primaryRecipe.description;
    return {
      ...primaryRecipe,
      image: imageUrl || primaryRecipe.image,
      title: ahTitle || primaryRecipe.title,
      description: cleanAllerhandeUiFluff(ahHtmlDescription) || ahHtmlDescription,
      instructions: cleanAllerhandeInstructionSteps(primaryRecipe.instructions),
      time: ahJsonLdTime || primaryRecipe.time,
      servings: ahJsonLdServings || primaryRecipe.servings,
      kcal: ahJsonLdCalories || primaryRecipe.kcal,
    };
  }

  const document = await fetchWebsiteDocument(sourceUrl);
  if (document.kind === "text") {
    let importHostEarly = "";
    try {
      importHostEarly = new URL(sourceUrl).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      importHostEarly = "";
    }
    if (hostMatchesReaderAllowlist(importHostEarly) && looksLikeJinaReaderCfWall(document.body)) {
      throw new HttpError(422, importBlockedReaderAllowlistMessage(importHostEarly));
    }
    const textRecipe = parseTextRecipeDocument(document.body, document.finalUrl || sourceUrl);
    const mdIngredients = parseMarkdownIngredientSection(document.body);
    const mdInstructions = parseMarkdownInstructionSection(document.body);
    const mdServings = parseMarkdownServings(document.body);
    const mdImage = extractFirstImageUrlFromMarkdown(document.body);

    const mergedTextRecipe = {
      ...textRecipe,
      image: mdImage || textRecipe.image,
      ingredients: mdIngredients.length ? mdIngredients : textRecipe.ingredients,
      instructions: mdInstructions.length ? mdInstructions : textRecipe.instructions,
      servings: mdServings || textRecipe.servings,
      description: isMiljuschkaHost(document.finalUrl || sourceUrl)
        ? cleanMiljuschkaDescription(textRecipe.description, textRecipe.title) || textRecipe.description
        : textRecipe.description,
      caption: isMiljuschkaHost(document.finalUrl || sourceUrl)
        ? cleanMiljuschkaDescription(textRecipe.caption || textRecipe.description, textRecipe.title) || textRecipe.caption || textRecipe.description
        : textRecipe.caption,
      needsReview:
        (mdIngredients.length ? mdIngredients.length : textRecipe.ingredients.length) < 2 ||
        (mdInstructions.length ? mdInstructions.length : textRecipe.instructions.length) < 1,
    };
    // Claude fallback for text documents missing ingredients or instructions
    if (mergedTextRecipe.needsReview && ANTHROPIC_API_KEY) {
      const claudeResult = await extractWithClaudeFromWebPage(
        document.body.slice(0, 8000),
        mergedTextRecipe.title,
        sourceUrl,
        ""
      );
      if (claudeResult) {
        const parsedIngredients = normalizeIngredientList(
          (claudeResult.ingredients || []).map((i) =>
            typeof i === "string" ? parseIngredientLine(i) : i
          )
        );
        const parsedInstructions = finalizeInstructionSteps(claudeResult.instructions || []);
      return {
        ...mergedTextRecipe,
        title: claudeResult.title || mergedTextRecipe.title,
        description: isMiljuschkaHost(document.finalUrl || sourceUrl)
          ? cleanMiljuschkaDescription(claudeResult.description || mergedTextRecipe.description, claudeResult.title || mergedTextRecipe.title) ||
            claudeResult.description ||
            mergedTextRecipe.description
          : claudeResult.description || mergedTextRecipe.description,
        ingredients: parsedIngredients.length ? parsedIngredients : mergedTextRecipe.ingredients,
        instructions: parsedInstructions.length ? parsedInstructions : mergedTextRecipe.instructions,
          time: claudeResult.time || mergedTextRecipe.time,
          servings: claudeResult.servings || mergedTextRecipe.servings,
          needsReview: parsedIngredients.length < 2 || parsedInstructions.length < 1,
        };
      }
    }
    return mergedTextRecipe;
  }

  const htmlRecipe = parseWebsiteRecipe(document.body, document.finalUrl || sourceUrl);

  // Miljuschka / EEF: veel 200/HTML + CF-lagen; andere sites: dunne/consent/Challengewalls.
  const finalUrlEarly = document.finalUrl || sourceUrl;
  let finalParsedUrlEarly = null;
  try {
    finalParsedUrlEarly = new URL(finalUrlEarly);
  } catch {
    try {
      finalParsedUrlEarly = new URL(sourceUrl);
    } catch {
      finalParsedUrlEarly = null;
    }
  }
  const hostNeedsReaderAssist = Boolean(finalParsedUrlEarly?.hostname && hostMatchesReaderAllowlist(finalParsedUrlEarly.hostname));
  const htmlBodyForReader = String(document.body || "");
  const lowerEarly = htmlBodyForReader.toLowerCase();
  const hiEarly = Array.isArray(htmlRecipe.ingredients) ? htmlRecipe.ingredients.length : 0;
  const hsEarly = Array.isArray(htmlRecipe.instructions) ? htmlRecipe.instructions.length : 0;
  const htmlRecipeLooksWeakRecipe = hiEarly < 2 || hsEarly < 1;
  const cfLikeEarly =
    lowerEarly.includes("cloudflare") ||
    lowerEarly.includes("checking your browser") ||
    lowerEarly.includes("__cf_bm") ||
    lowerEarly.includes("cf-browser-verification");

  // Als de HTML-parser al voldoende recept-inhoud vond (bv. via ZenRows), niet alsnog Jina
  // aanroepen puur omdat de pagina Cloudflare-scripts bevat — die zijn op elke pagina aanwezig.
  const htmlRecipeHasSufficientContent = hiEarly >= 2 && hsEarly >= 1;

  const tryReaderMerged =
    htmlRecipe.needsReview || (hostNeedsReaderAssist && (htmlRecipeLooksWeakRecipe || (cfLikeEarly && !htmlRecipeHasSufficientContent)));

  if (tryReaderMerged) {
    const finalUrl = finalUrlEarly;
    let finalParsedUrl = finalParsedUrlEarly;

    const html = htmlBodyForReader;
    const lower = lowerEarly;
    const looksThin = html.length < 2500;
    const looksJsRequired =
      lower.includes("enable javascript") ||
      lower.includes("javascript required") ||
      lower.includes("checking your browser") ||
      lower.includes("attention required") ||
      lower.includes("verify you are human");
    const looksConsentWall =
      (lower.includes("cookie") || lower.includes("cookies")) &&
      (lower.includes("consent") || lower.includes("voorkeur") || lower.includes("privacy")) &&
      !lower.includes("ingrediënten") &&
      !lower.includes("ingredients");

    const shouldTryReader =
      Boolean(finalParsedUrl) &&
      isSafeForReaderFallback(finalParsedUrl) &&
      (looksThin || looksJsRequired || looksConsentWall || hostNeedsReaderAssist);

    if (shouldTryReader) {
      try {
        const readerDocument = await fetchReaderFallback(finalUrl);
        if (readerDocument?.kind === "text") {
          if (looksLikeJinaReaderCfWall(readerDocument.body)) {
            // Jina geeft CF-wall terug — probeer Firecrawl als alternatief.
            const fcDoc = await fetchWebsiteDocumentViaFirecrawl(finalUrl);
            if (fcDoc) {
              const fcRecipe = fcDoc.kind === "text"
                ? parseTextRecipeDocument(fcDoc.body, fcDoc.finalUrl || finalUrl)
                : parseWebsiteRecipe(fcDoc.body, fcDoc.finalUrl || finalUrl);
              if ((fcRecipe.ingredients?.length >= 2) || (fcRecipe.instructions?.length >= 1)) {
                return { ...fcRecipe, image: fcRecipe.image || htmlRecipe.image };
              }
            }
            // Als de HTML-parser (bv. via ZenRows) al voldoende inhoud heeft, niet alsnog 422
            // gooien — val terug op htmlRecipe ipv de gebruiker een fout te tonen.
            if (!htmlRecipeHasSufficientContent) {
              if (hostNeedsReaderAssist) {
                throw new HttpError(422, importBlockedReaderAllowlistMessage(finalParsedUrl?.hostname));
              }
              // Niet-gewhitelistede site: stille fallback naar htmlRecipe ipv harde fout.
            }
            // Jina CF-wall maar HTML heeft voldoende inhoud: skip Jina-pad volledig.
          } else {
          const readerRecipe = parseTextRecipeDocument(readerDocument.body, readerDocument.finalUrl || finalUrl);
          const mdIngredients = parseMarkdownIngredientSection(readerDocument.body);
          const mdInstructions = parseMarkdownInstructionSection(readerDocument.body);
          const mdServings = parseMarkdownServings(readerDocument.body);
          const mdImage = extractFirstImageUrlFromMarkdown(readerDocument.body);

          const mergedReaderRecipe = {
            ...readerRecipe,
            image: mdImage || readerRecipe.image || htmlRecipe.image,
            ingredients: mdIngredients.length ? mdIngredients : readerRecipe.ingredients,
            instructions: mdInstructions.length ? mdInstructions : readerRecipe.instructions,
            servings: mdServings || readerRecipe.servings,
            needsReview:
              (mdIngredients.length ? mdIngredients.length : readerRecipe.ingredients.length) < 2 ||
              (mdInstructions.length ? mdInstructions.length : readerRecipe.instructions.length) < 1,
          };

          const hi = Array.isArray(htmlRecipe.ingredients) ? htmlRecipe.ingredients.length : 0;
          const hs = Array.isArray(htmlRecipe.instructions) ? htmlRecipe.instructions.length : 0;
          const ri = Array.isArray(mergedReaderRecipe.ingredients) ? mergedReaderRecipe.ingredients.length : 0;
          const rs = Array.isArray(mergedReaderRecipe.instructions) ? mergedReaderRecipe.instructions.length : 0;

          const betterThanHtml =
            ri > hi || rs > hs || (hi < 3 && hs < 2 && ri >= 3 && rs >= 2);

          // Miljuschka / EEF: Reader levert vaak waar WordPress-fetch faalt; gebruik bruikbare merge tenzij HTML duidelijk rijker is.
          const readerUsable = ri >= 2 && rs >= 1;
          const readerLooksConfident = ri >= 3 && rs >= 2 && !mergedReaderRecipe.needsReview;
          // cfLikeEarly weggehaald: ZenRows-pagina's bevatten altijd CF-scripts,
          // dus cfLikeEarly is bij ZenRows altijd true — dat mag Jina niet automatisch laten winnen.
          const mjEefPreferReader =
            hostNeedsReaderAssist &&
            readerUsable &&
            (readerLooksConfident ||
              htmlRecipeLooksWeakRecipe ||
              mergedReaderRecipe.needsReview === false);

          if (betterThanHtml || mjEefPreferReader) {
            return mergedReaderRecipe;
          }
          }
        }
      } catch (err) {
        if (err instanceof HttpError) throw err;
        // Jina crashte — probeer Firecrawl als laatste redmiddel vóór Claude/htmlRecipe.
        const fcDocCatch = await fetchWebsiteDocumentViaFirecrawl(finalUrl).catch(() => null);
        if (fcDocCatch) {
          const fcRecipeCatch = fcDocCatch.kind === "text"
            ? parseTextRecipeDocument(fcDocCatch.body, fcDocCatch.finalUrl || finalUrl)
            : parseWebsiteRecipe(fcDocCatch.body, fcDocCatch.finalUrl || finalUrl);
          if ((fcRecipeCatch.ingredients?.length >= 2) || (fcRecipeCatch.instructions?.length >= 1)) {
            return { ...fcRecipeCatch, image: fcRecipeCatch.image || htmlRecipe.image };
          }
        }
      }
    }
  }

  // Claude fallback for HTML pages missing ingredients or instructions
  if (htmlRecipe.needsReview && ANTHROPIC_API_KEY) {
    // Extract more content for better AI analysis (up to 8000 chars instead of 5000)
    const pageText = extractReadableTextFromHtml(document.body, 8000);
    const claudeResult = await extractWithClaudeFromWebPage(
      pageText,
      htmlRecipe.title,
      sourceUrl,
      ""
    );
    if (claudeResult) {
      const parsedIngredients = normalizeIngredientList(
        (claudeResult.ingredients || []).map((i) =>
          typeof i === "string" ? parseIngredientLine(i) : i
        )
      );
      const parsedInstructions = finalizeInstructionSteps(claudeResult.instructions || []);
      return {
        ...htmlRecipe,
        title: claudeResult.title || htmlRecipe.title,
        description: claudeResult.description || htmlRecipe.description,
        ingredients: parsedIngredients.length ? parsedIngredients : htmlRecipe.ingredients,
        instructions: parsedInstructions.length ? parsedInstructions : htmlRecipe.instructions,
        time: claudeResult.time || htmlRecipe.time,
        servings: claudeResult.servings || htmlRecipe.servings,
        needsReview: parsedIngredients.length < 2 || parsedInstructions.length < 1,
      };
    }
  }

  if (
    hostNeedsReaderAssist &&
    (Array.isArray(htmlRecipe.ingredients) ? htmlRecipe.ingredients.length : 0) < 2 &&
    (Array.isArray(htmlRecipe.instructions) ? htmlRecipe.instructions.length : 0) < 1 &&
    (cfLikeEarly ||
      /<h1[^>]*>[^<]*\b403\b/i.test(htmlBodyForReader) ||
      /<title[^>]*>[^<]*\b403\b/i.test(htmlBodyForReader))
  ) {
    throw new HttpError(422, importBlockedReaderAllowlistMessage(finalParsedUrlEarly?.hostname));
  }

  return htmlRecipe;
}

async function importRecipe(url, note, imageHint = "") {
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new HttpError(400, "Voer een geldige URL in.");
  }

  // Expand TikTok short URLs (vm.tiktok.com) by following redirects
  if (parsedUrl.hostname === "vm.tiktok.com") {
    try {
      const expandRes = await fetch(parsedUrl.toString(), {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
        headers: FETCH_HEADERS,
      });
      if (expandRes.url && expandRes.url !== parsedUrl.toString()) {
        parsedUrl = new URL(expandRes.url);
      }
    } catch (error) {
      console.error("⚠️ Failed to expand TikTok short URL, continuing with original:", error.message);
      /* keep original */
    }
  }

  // Expand AH short URLs (ah.nl/r/XXXXXX) by following the redirect
  if (/(^|\.)ah\.nl$/i.test(parsedUrl.hostname) && /^\/r\/\d+/.test(parsedUrl.pathname)) {
    try {
      const expandRes = await fetch(parsedUrl.toString(), {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
        headers: FETCH_HEADERS,
      });
      if (expandRes.url && expandRes.url !== parsedUrl.toString()) {
        parsedUrl = new URL(expandRes.url);
      }
    } catch (error) {
      console.error("⚠️ Failed to expand AH short URL, continuing with original:", error.message);
      /* keep original */
    }
  }

  // Expand Facebook share short URLs (/share/<token>) by following redirects
  if (/(^|\.)facebook\.com$/i.test(parsedUrl.hostname) && /^\/share\/[^/]+\/?$/i.test(parsedUrl.pathname)) {
    try {
      const expandRes = await fetch(parsedUrl.toString(), {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
        headers: FETCH_HEADERS,
      });
      if (expandRes.url && expandRes.url !== parsedUrl.toString()) {
        parsedUrl = new URL(expandRes.url);
      }
    } catch (error) {
      console.error("⚠️ Failed to expand Facebook share URL, continuing with original:", error.message);
      /* keep original */
    }
  }

  try {
    parsedUrl = new URL(stripBenignMarketingParamsFromUrl(parsedUrl.toString()));
  } catch {
    /* keep parsedUrl */
  }

  const platform = detectPlatform(parsedUrl);

  let recipe;
  if (platform === "tiktok") {
    throw new HttpError(400, "TikTok importeren werkt tijdelijk nog niet. Gebruik Instagram of een website-link.");
  } else if (platform === "instagram") {
    recipe = await importInstagram(parsedUrl.toString(), note);
  } else if (platform === "facebook") {
    recipe = await importFacebook(parsedUrl.toString(), note);
  } else if (platform === "pinterest") {
    recipe = await importPinterest(parsedUrl.toString());
  } else {
    recipe = await importWebsite(parsedUrl.toString());
  }

  // Use imageHint as fallback if scraping didn't find an image
  if (imageHint && (!recipe.image || recipe.image === "assets/hero-burger.svg")) {
    recipe.image = sanitizeText(imageHint);
  }

  return recipe;
}

async function recordEvent(type, userId, meta = {}) {
  if (!isPostgresEnabled()) return;
  try {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    await pool.query(
      `INSERT INTO plately_events (id, type, user_id, meta) VALUES ($1, $2, $3, $4)`,
      [generateId("evt"), sanitizeText(type), userId ? sanitizeText(userId) : null, meta && typeof meta === "object" ? meta : {}]
    );
  } catch (error) {
    // Avoid breaking user flows due to analytics failures.
    console.error("⚠️ recordEvent failed:", error.message);
  }
}

const CLIENT_INGEST_EVENT_TYPES = new Set([
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
  "client_recipe_detail_view",
]);

const clientIngestBudget = new Map();

function getRequestClientIp(request) {
  const raw = sanitizeText(request.headers["x-forwarded-for"] || "").split(",")[0].trim();
  if (raw.length >= 3 && raw.length < 96) return raw;
  const ra = sanitizeText(request.socket?.remoteAddress || "");
  return ra.slice(0, 96) || "unknown";
}

function checkClientIngestBudget(ip, eventCount) {
  const now = Date.now();
  const key = ip || "unknown";
  const windowMs = 60 * 60 * 1000;
  const maxEventsPerHour = 4000;
  let row = clientIngestBudget.get(key);
  if (!row || now - row.started > windowMs) {
    row = { started: now, used: 0 };
    clientIngestBudget.set(key, row);
  }
  row.used += eventCount;
  if (clientIngestBudget.size > 5000) {
    for (const [k, v] of clientIngestBudget) {
      if (now - v.started > windowMs) clientIngestBudget.delete(k);
    }
  }
  return row.used <= maxEventsPerHour;
}

function sanitizeAnonId(raw) {
  const s = String(raw || "").trim();
  if (!/^[\w.-]{8,48}$/.test(s)) return "";
  return s;
}

function sanitizeClientIngestMeta(input, depth = 0) {
  if (!input || typeof input !== "object" || Array.isArray(input) || depth > 4) return {};
  const out = {};
  for (const [k, v] of Object.entries(input)) {
    const key = String(k)
      .replace(/[^\w.-]/g, "")
      .slice(0, 32);
    if (!key) continue;
    if (v == null) continue;
    if (typeof v === "boolean") {
      out[key] = v;
      continue;
    }
    if (typeof v === "number" && Number.isFinite(v)) {
      out[key] = Math.round(v * 1000) / 1000;
      continue;
    }
    if (typeof v === "string") {
      let s = v.replace(/\s+/g, " ").trim();
      s = s.replace(/https?:\/\/[^\s]+/gi, (m) => {
        try {
          return new URL(m).hostname.replace(/^www\./i, "");
        } catch {
          return "[url]";
        }
      });
      if (s.length > 180) s = `${s.slice(0, 177)}…`;
      out[key] = s;
    }
  }
  return out;
}

async function ingestClientEvents(request, bodyPayload) {
  if (!isPostgresEnabled()) {
    return { ok: true, accepted: 0, skipped: true };
  }
  const ip = getRequestClientIp(request);
  let body = bodyPayload;
  if (!body || typeof body !== "object") {
    body = {};
  }
  const eventsIn = Array.isArray(body.events) ? body.events.slice(0, 25) : [];
  if (!eventsIn.length) {
    return { ok: true, accepted: 0 };
  }
  const eventCount = eventsIn.length;
  if (!checkClientIngestBudget(ip, eventCount)) {
    throw new HttpError(429, "Te veel activiteits-events (rate limit).");
  }

  const authUser = await getAuthenticatedUser(request).catch(() => null);
  const userId = authUser?.id ? sanitizeText(authUser.id) : null;
  const bodyAnon = sanitizeAnonId(body.anonId);

  let accepted = 0;
  for (const ev of eventsIn) {
    const type = sanitizeText(ev?.type || "");
    if (!CLIENT_INGEST_EVENT_TYPES.has(type)) continue;
    const rawMeta = ev?.meta && typeof ev.meta === "object" ? ev.meta : {};
    const meta = sanitizeClientIngestMeta(rawMeta);
    const ts = Number(ev?.ts);
    if (Number.isFinite(ts) && ts > 1e12 && ts < Date.now() + 60_000) {
      meta.clientTs = Math.round(ts);
    }
    if (bodyAnon) meta.anonId = bodyAnon;
    await recordEvent(type, userId, meta);
    accepted += 1;
  }

  return { ok: true, accepted };
}

function normalizeSearchQuery(raw) {
  const text = String(raw || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!text || text.length < 2) return "";

  // Avoid obvious spam / PII-ish patterns (URLs, emails, long tokens).
  if (/(https?:\/\/|www\.)/i.test(text)) return "";
  if (/\S+@\S+\.\S+/.test(text)) return "";
  if (/[a-f0-9]{24,}/i.test(text)) return "";

  const capped = text.length > 60 ? text.slice(0, 60).trim() : text;
  if (capped.length < 2) return "";
  return capped;
}

/* ── Store product search (AH + Jumbo) ── */

// Proxy support: als AH_API_PROXY is ingesteld, worden alle api.ah.nl calls
// via die URL gerouteerd (bijv. een Cloudflare Worker). Zie workers/ah-proxy.js.
const AH_API_BASE = (process.env.AH_API_PROXY || "https://api.ah.nl").replace(/\/$/, "");
const AH_PROXY_SECRET = process.env.AH_API_PROXY_SECRET || "";
const AH_PROXY_HEADERS = AH_PROXY_SECRET ? { "x-plately-secret": AH_PROXY_SECRET } : {};
// Als de proxy geconfigureerd is, routeer ook www.ah.nl-calls (GraphQL + allerhande-search)
// via dezelfde proxy. De worker detecteert /gql en /allerhande/* en stuurt die naar www.ah.nl.
const AH_WWW_BASE = AH_API_BASE !== "https://api.ah.nl" ? AH_API_BASE : "https://www.ah.nl";

if (AH_API_BASE !== "https://api.ah.nl") {
  console.log(`[AH] Proxy actief: ${AH_API_BASE} (api + www)`);
}

let ahTokenCache = { token: "", expiresAt: 0 };

// Vernieuw het AH-token automatisch elke 6 dagen als er geen statisch token of proxy is ingesteld.
// Met CF Worker (AH_API_PROXY) haalt de worker zelf tokens op; dit is dan alleen een fallback.
{
  const AUTO_REFRESH_INTERVAL = 6 * 24 * 60 * 60 * 1000; // 6 dagen
  // Auto-refresh when no static token is set — works both directly and via the CF Worker proxy.
  const shouldAutoRefresh = () =>
    !String(process.env.AH_ANONYMOUS_TOKEN || "").trim();
  if (shouldAutoRefresh()) {
    setInterval(() => {
      fetchAHAnonymousToken().catch((err) =>
        console.warn(`[AH] Auto token-refresh mislukt: ${err?.message || err}`)
      );
    }, AUTO_REFRESH_INTERVAL);
    // Warm-up: haal direct een token op zodat de eerste request niet hoeft te wachten.
    setImmediate(() =>
      fetchAHAnonymousToken().catch((err) => {
        console.warn(`[AH] Initieel token ophalen mislukt: ${err?.message || err}`);
        console.warn(`[AH] Fix: stel AH_ANONYMOUS_TOKEN in als env-var of gebruik AH_API_PROXY voor een CF Worker.`);
        // Retry elke 60 minuten totdat het lukt (bv. na een netwerk-probleem).
        const retryInterval = setInterval(() => {
          if (ahTokenCache.token) { clearInterval(retryInterval); return; }
          fetchAHAnonymousToken()
            .then(() => { console.log("[AH] Token alsnog verkregen."); clearInterval(retryInterval); })
            .catch(() => {});
        }, 60 * 60 * 1000);
      })
    );
  }
}

// In-memory cache voor AH productzoekopdrachten — vermindert API-calls drastisch
// en maakt de app bestand tegen tijdelijke rate-limits.
const _ahSearchCache = new Map();
const AH_SEARCH_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 uur
const AH_SEARCH_CACHE_MAX = 600;

function _getAHSearchCache(key) {
  const entry = _ahSearchCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { _ahSearchCache.delete(key); return null; }
  return entry.products;
}

function _setAHSearchCache(key, products) {
  if (_ahSearchCache.size >= AH_SEARCH_CACHE_MAX) {
    _ahSearchCache.delete(_ahSearchCache.keys().next().value);
  }
  _ahSearchCache.set(key, { products, expiresAt: Date.now() + AH_SEARCH_CACHE_TTL });
}

async function fetchAHAnonymousToken() {
  // Static token override — handig als api.ah.nl/mobile-auth geblokkeerd is vanuit het server-IP.
  // Zet AH_ANONYMOUS_TOKEN als env var (geldig ~7 dagen).
  // Vernieuwen: voer lokaal uit: node scripts/refresh-ah-token.js
  const staticToken = String(process.env.AH_ANONYMOUS_TOKEN || "").trim();
  if (staticToken) return staticToken;

  if (ahTokenCache.token && Date.now() < ahTokenCache.expiresAt - 60_000) {
    return ahTokenCache.token;
  }
  const response = await fetch(`${AH_API_BASE}/mobile-auth/v1/auth/token/anonymous`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...AH_PROXY_HEADERS },
    body: JSON.stringify({ clientId: "appie" }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    console.warn(`[AH] Auth token mislukt: HTTP ${response.status}`);
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
  const priceEuros = product.currentPrice ?? product.priceBeforeBonus ?? 0;
  const currentPrice = Number(product.currentPrice);
  const priceBeforeBonus = Number(product.priceBeforeBonus);
  const hasDiscountedPrice =
    Number.isFinite(currentPrice) &&
    Number.isFinite(priceBeforeBonus) &&
    currentPrice > 0 &&
    priceBeforeBonus > currentPrice;
  const isBonus = Boolean(
    product.isBonus ||
    product.isBonusPrice ||
    product.bonusMechanism ||
    (Array.isArray(product.discountLabels) && product.discountLabels.length > 0) ||
    hasDiscountedPrice
  );
  const promotionLabel = isBonus ? getAHPromotionLabel(product) : "";
  // Prefer the 200×200 rendition for thumbnails — index 2 in the standard AH image array
  const images = product.images || [];
  const imageUrl = images.find((i) => i.width === 200)?.url || images[0]?.url || "";
  const labels = [];

  const pushLabel = (val) => {
    if (val === null || val === undefined) return;
    if (typeof val === "string") {
      const clean = sanitizeText(val);
      if (clean) labels.push(clean);
      return;
    }
    if (typeof val === "number" && Number.isFinite(val)) {
      labels.push(String(val));
    }
  };

  const getBetterLifeStars = (root) => {
    const visited = new Set();
    let stars = null;

    const walk = (node, depth, inBetterLifeContext) => {
      if (!node || depth > 5) return;
      if (typeof node !== "object") return;
      if (visited.has(node)) return;
      visited.add(node);

      if (Array.isArray(node)) {
        for (const item of node) walk(item, depth + 1, inBetterLifeContext);
        return;
      }

      for (const [rawKey, value] of Object.entries(node)) {
        const key = String(rawKey || "").toLowerCase();
        const nextContext =
          inBetterLifeContext ||
          /\b(beter|better)\b/.test(key) ||
          /\b(beter\s*leven|better\s*life)\b/.test(key) ||
          /\b(keurmerk|quality\s*mark|qualitymark|sustainab|label)\b/.test(key);

        if (typeof value === "string") {
          const text = normalizeChoiceLabelText(value);
          if (/\bbeter leven\b/.test(text) || /\bbetter life\b/.test(text)) {
            // e.g. "Beter Leven 1 ster"
            const m = text.match(/\b([123])\b/);
            if (m) stars = Number(m[1]);
          }
          if (nextContext && stars == null) {
            const m = text.match(/\b([123])\b/);
            if (m) stars = Number(m[1]);
          }
        } else if (typeof value === "number" && Number.isFinite(value)) {
          if (nextContext && [1, 2, 3].includes(value)) stars = value;
        } else if (typeof value === "boolean") {
          // ignore
        } else if (value && typeof value === "object") {
          // Common patterns: {stars: 1}, {star: 1}, {rating: 1}
          if (nextContext && stars == null) {
            const candidates = [
              value.stars,
              value.star,
              value.rating,
              value.score,
              value.value,
              value.level,
            ];
            for (const c of candidates) {
              if (typeof c === "number" && [1, 2, 3].includes(c)) {
                stars = c;
                break;
              }
              if (typeof c === "string") {
                const m = normalizeChoiceLabelText(c).match(/\b([123])\b/);
                if (m) {
                  stars = Number(m[1]);
                  break;
                }
              }
            }
          }
          walk(value, depth + 1, nextContext);
        }
      }
    };

    walk(root, 0, false);
    return stars;
  };

  // Best-effort extraction of metadata from AH product payload (field names vary).
  const collect = (val, depth = 0) => {
    if (!val) return;
    if (depth > 4) return;
    if (Array.isArray(val)) {
      val.forEach((v) => collect(v, depth + 1));
      return;
    }
    if (typeof val === "string" || typeof val === "number") {
      pushLabel(val);
      return;
    }
    if (typeof val === "object") {
      const candidate =
        val.name ||
        val.label ||
        val.title ||
        val.description ||
        val.value ||
        val.text ||
        "";
      if (candidate) pushLabel(candidate);

      // Some AH fields embed nested label-ish objects; walk a bit deeper.
      for (const v of Object.values(val)) {
        if (typeof v === "string" || typeof v === "number") pushLabel(v);
        else if (v && typeof v === "object") collect(v, depth + 1);
      }
    }
  };

  collect(product.dietaryInformation);
  collect(product.characteristics);
  collect(product.qualityMarks);
  collect(product.sustainability);
  collect(product.labels);

  const canonical = detectChoiceLabelsFromText(labels.join(" "));
  const betterLifeStars = getBetterLifeStars(product);
  if (betterLifeStars === 1) canonical.push("beter leven 1 ster");

  return {
    id: numericId,
    name: sanitizeText(product.title),
    price: priceEuros ? `€${Number(priceEuros).toFixed(2).replace(".", ",")}` : "",
    url: numericId ? `https://www.ah.nl/producten/product/wi${numericId}` : "",
    imageUrl,
    labels: [...new Set([...labels.map((l) => sanitizeText(l)).filter(Boolean), ...canonical])],
    isBonus,
    promotionLabel,
    matchMeta:
      product && typeof product === "object" && product._platelyMatchMeta && typeof product._platelyMatchMeta === "object"
        ? product._platelyMatchMeta
        : null,
  };
}

function formatAHCurrency(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "";
  return num.toFixed(2).replace(".", ",");
}

function getAHPromotionLabel(product) {
  const labels = Array.isArray(product?.discountLabels) ? product.discountLabels : [];
  const first = labels.find(Boolean) || {};

  if (first.percentage !== null && first.percentage !== undefined && Number.isFinite(Number(first.percentage))) {
    return `${Number(first.percentage)}%`;
  }
  if (first.precisePercentage !== null && first.precisePercentage !== undefined && Number.isFinite(Number(first.precisePercentage))) {
    return `${Number(first.precisePercentage)}%`;
  }
  if (
    first.count !== null &&
    first.count !== undefined &&
    first.freeCount !== null &&
    first.freeCount !== undefined &&
    Number.isFinite(Number(first.count)) &&
    Number.isFinite(Number(first.freeCount))
  ) {
    return `${Number(first.count)}+${Number(first.freeCount)}`;
  }
  if (
    first.count !== null &&
    first.count !== undefined &&
    first.price !== null &&
    first.price !== undefined &&
    Number.isFinite(Number(first.count)) &&
    Number.isFinite(Number(first.price))
  ) {
    return `${Number(first.count)} voor ${formatAHCurrency(first.price)}`;
  }

  const mechanism = sanitizeText(product?.bonusMechanism || first.defaultDescription || "");
  if (mechanism) return mechanism;
  return "BONUS";
}

// Valt terug op www.ah.nl website-scraping via Firecrawl als het token-endpoint geblokkeerd is.
// Firecrawl rendert de Nuxt-pagina en we extraheren het embedded products-JSON.
async function _fetchAHSearchViaFirecrawlWeb(searchTerm) {
  // Sla over als proxy geconfigureerd is — proxy handelt token af, Firecrawl niet nodig
  if (AH_API_BASE !== "https://api.ah.nl") return null;
  const apiKey = firecrawlApiKey();
  if (!apiKey) return null;
  const searchUrl = `https://www.ah.nl/zoeken?query=${encodeURIComponent(searchTerm)}&sortBy=RELEVANCE`;
  try {
    const resp = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        url: searchUrl,
        formats: ["rawHtml"],
        onlyMainContent: false,
        waitFor: 3000,
        timeout: 30000,
      }),
      signal: AbortSignal.timeout(35000),
    });
    if (!resp.ok) {
      console.warn(`[AH/FC-web] HTTP ${resp.status} voor "${searchTerm}"`);
      return null;
    }
    const json = await resp.json();
    const raw = String(json?.data?.rawHtml || "");
    if (!raw) return null;

    // Walk through the HTML looking for JSON objects with a "products" array.
    // AH Nuxt pages embed the API state in <script> tags.
    let searchFrom = 0;
    while (searchFrom < raw.length) {
      const keyIdx = raw.indexOf('"products"', searchFrom);
      if (keyIdx === -1) break;
      searchFrom = keyIdx + 1;
      // Find the opening brace of the enclosing object
      let objStart = keyIdx - 1;
      while (objStart >= 0 && raw[objStart] !== '{') objStart--;
      if (objStart < 0 || raw[objStart] !== '{') continue;
      // Balance braces to find the closing brace
      let depth = 0, objEnd = -1;
      for (let i = objStart; i < Math.min(raw.length, objStart + 2_000_000); i++) {
        if (raw[i] === '{') depth++;
        else if (raw[i] === '}') { if (--depth === 0) { objEnd = i + 1; break; } }
      }
      if (objEnd === -1) continue;
      const parsed = safelyParseJson(raw.slice(objStart, objEnd));
      if (parsed?.products && Array.isArray(parsed.products) && parsed.products.length > 0) {
        const prods = parsed.products.map(parseAHProduct);
        console.log(`[AH/FC-web] ${prods.length} producten via website voor "${searchTerm}"`);
        return prods;
      }
    }
    console.warn(`[AH/FC-web] Geen products-data in HTML voor "${searchTerm}"`);
    return null;
  } catch (err) {
    console.warn(`[AH/FC-web] Fout voor "${searchTerm}": ${err?.message}`);
    return null;
  }
}

// Haalt AH producten op via Firecrawl als api.ah.nl geblokkeerd is (HTTP 4xx).
// Firecrawl gebruikt zijn eigen IPs en is niet geblokkeerd door AH.
// Geeft null terug als Firecrawl niet beschikbaar is, [] als geen producten gevonden.
async function _fetchAHSearchViaFirecrawl(searchUrl, token, searchTerm) {
  if (AH_API_BASE !== "https://api.ah.nl") return null; // proxy actief, Firecrawl niet nodig
  const apiKey = firecrawlApiKey();
  if (!apiKey) return null;
  try {
    const resp = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        url: searchUrl,
        formats: ["rawHtml"],
        onlyMainContent: false,
        headers: {
          Authorization: `Bearer ${token}`,
          "x-application": "AHWEBSHOP",
          accept: "application/json",
          "accept-language": "nl-NL,nl;q=0.9",
        },
        timeout: 20000,
        waitFor: 0,
      }),
      signal: AbortSignal.timeout(25000),
    });
    if (!resp.ok) {
      console.warn(`[AH/Firecrawl] Scrape mislukt: HTTP ${resp.status}`);
      return null;
    }
    const json = await resp.json();
    const raw = String(json?.data?.rawHtml || json?.data?.html || "");
    const ahData = safelyParseJson(raw) || safelyParseJson(raw.replace(/^[^{[]*/, "").replace(/[^}\]]*$/, ""));
    if (!ahData?.products) {
      console.warn(`[AH/Firecrawl] Geen products-veld in respons voor "${searchTerm}"`);
      return null;
    }
    console.log(`[AH/Firecrawl] ${ahData.products.length} producten via Firecrawl voor "${searchTerm}"`);
    return ahData.products.map(parseAHProduct);
  } catch (err) {
    console.warn(`[AH/Firecrawl] Fout voor "${searchTerm}": ${err?.message || err}`);
    return null;
  }
}

// Returns the best single match (for backward compat with buildMatchedChoiceFromProduct)
async function findAHProduct(ingredient) {
  const results = await findAHProducts(ingredient, 1);
  return results[0] ?? null;
}

// Returns up to `count` product matches from AH for a single ingredient
async function findAHProducts(ingredient, count = 12, queryOverride = null) {
  const baseTerm = normalizeIngredientForSearch(ingredient) || ingredient;
  const searchTerm = queryOverride || baseTerm;
  const searchSize = Math.min(72, Math.max(count * 3, 24));
  const cacheKey = `${searchTerm}:${searchSize}`;

  const cached = _getAHSearchCache(cacheKey);
  if (cached) return cached.slice(0, count);

  try {
    let token;
    try {
      token = await fetchAHAnonymousToken();
    } catch {
      // Token-endpoint is geblokkeerd vanuit dit server-IP — val terug op website-scraping
      console.warn(`[AH] Token geblokkeerd voor "${searchTerm}", probeer Firecrawl web-fallback`);
      const webResults = await _fetchAHSearchViaFirecrawlWeb(searchTerm);
      if (webResults !== null) {
        if (webResults.length > 0) _setAHSearchCache(cacheKey, webResults);
        return webResults.slice(0, count);
      }
      return [];
    }
    const searchUrl =
      `${AH_API_BASE}/mobile-services/product/search/v2` +
      `?query=${encodeURIComponent(searchTerm)}&size=${searchSize}&sortOn=RELEVANCE`;

    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-application": "AHWEBSHOP",
        ...FETCH_HEADERS,
        ...AH_PROXY_HEADERS,
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn(`[AH] Product search HTTP ${response.status} voor "${searchTerm}" — probeer Firecrawl fallback`);
      const fallback = await _fetchAHSearchViaFirecrawl(searchUrl, token, searchTerm);
      if (fallback !== null) {
        if (fallback.length > 0) _setAHSearchCache(cacheKey, fallback);
        return fallback.slice(0, count);
      }
      return [];
    }

    const data = await response.json();
    const baseLower = sanitizeText(baseTerm).toLowerCase();
    const rawLower = sanitizeText(ingredient).toLowerCase();
    const matchTerms = buildIngredientMatchTerms(ingredient, baseTerm);
    const wantsButter = /\bboter\b/.test(baseLower) || /\bboter\b/.test(rawLower);
    const wantsGarlicButter = /\b(kruidenboter|knoflookboter)\b/.test(baseLower) || /\b(kruidenboter|knoflookboter)\b/.test(rawLower);
    const wantsToastLike =
      /\b(toast|toastjes|melba|melbatoast|cracker|crackers|zadencracker|zadencrackers|beschuit|crouton|croutons)\b/.test(baseLower) ||
      /\b(toast|toastjes|melba|melbatoast|cracker|crackers|zadencracker|zadencrackers|beschuit|crouton|croutons)\b/.test(rawLower);

    const isSaltQuery = baseLower === "zout" || baseLower === "keukenzout" || baseLower === "tafelzout" || baseLower === "zeezout";
    const wantsSaltSnackLike =
      /\b(zoutjes|chips|sticks|noten|gezouten)\b/.test(baseLower) || /\b(zoutjes|chips|sticks|noten|gezouten)\b/.test(rawLower);
    const isPepperQuery = baseLower === "peper" || baseLower === "zwarte peper";
    const isPlainMilkQuery =
      baseLower === "melk" ||
      /^(?:volle|halfvolle|magere)\s+melk$/i.test(baseLower) ||
      /^biologisch(?:e)?\s+melk$/i.test(baseLower);
    const wantsCoconutMilk = /\bkokosmelk\b/.test(baseLower) || /\bkokosmelk\b/.test(rawLower);
    const isPlainRiceQuery = baseLower === "rijst" || /\b(basmati|jasmijn|zilvervlies|volkoren)\s*rijst$/i.test(baseLower);
    const isPlainFlourQuery = baseLower === "bloem" && !/\b(amandel|spelt|volkoren|rijst|haver|kokos|ma[iï]s|tapioca|boekweit)\b/.test(rawLower);
    const wantsGemberPowder =
      /\bgemberpoeder\b/.test(baseLower) ||
      /\bgemalen\s+gember\b/.test(baseLower) ||
      /\bgemberpoeder\b/.test(rawLower) ||
      /\bgemalen\s+gember\b/.test(rawLower);
    const isPlainFreshGemberQuery =
      !wantsGemberPowder &&
      (baseLower === "gember" ||
        baseLower === "verse gember" ||
        /^verse\s+gember$/i.test(baseLower) ||
        /^biologisch(?:e)?\s+verse\s+gember$/i.test(baseLower));
    const isPlainCitroenQuery =
      (baseLower === "citroen" || baseLower === "citroenen") &&
      !/\b(sap|sapje|limonade|concentraat|drank|aroma|mix|ijs|tea|thee)\b/.test(rawLower);

    // Spice intent: when user asks for a spice, avoid snacks/drinks/supplements becoming the default.
    const isSpiceLikeQuery =
      /\b(kurkuma|turmeric|komijn|djinten|cumin|kaneel|cinnamon|paprika(?:poeder)?|chilipoeder|chili\s*poeder|chili|cayenne|kerrie|currypoeder|curry\s*poeder|garam\s*masala|ras\s*el\s*hanout|za atar|za'atar|sumak|nootmuskaat|kruidnagel|kardemom|piment|anijs)\b/.test(baseLower) ||
      /\b(kurkuma|turmeric|komijn|djinten|cumin|kaneel|cinnamon|paprika(?:poeder)?|chilipoeder|chili\s*poeder|cayenne|kerrie|currypoeder|curry\s*poeder|garam\s*masala|ras\s*el\s*hanout|sumak|nootmuskaat|kruidnagel|kardemom|piment|anijs)\b/.test(rawLower);

    const isTurmericQuery =
      /\bkurkuma\b/.test(baseLower) ||
      /\bturmeric\b/.test(baseLower) ||
      /\bkurkuma\b/.test(rawLower) ||
      /\bturmeric\b/.test(rawLower);

    const isFreshHerbQuery =
      /^(?:biologisch\s+)?(?:verse\s+)?(koriander|peterselie|basilicum|munt|dille|bieslook)\b/.test(baseLower) ||
      /\bvers(?:e)?\s+(koriander|peterselie|basilicum|munt|dille|bieslook)\b/.test(rawLower);

    const isEggQuery =
      /^(?:biologisch\s+)?(?:scharrel)?eieren?$/.test(baseLower) || baseLower === "ei" || baseLower === "eieren";

    const isPlainOnionQuery =
      baseLower === "ui" ||
      baseLower === "uien" ||
      /^(rode|gele|witte|zilver|biologisch(?:e)?)\s+ui(en)?$/i.test(baseLower);

    const ingredientTokens = tokenizeForMatch(baseLower);
    const produceSynonymTokens = [];
    if (/\bcourgu?ettes?\b/.test(baseLower) || /\bcourgu?ettes?\b/.test(rawLower)) produceSynonymTokens.push("zucchini");
    if (/\baubergines?\b/.test(baseLower) || /\baubergines?\b/.test(rawLower)) produceSynonymTokens.push("eggplant");
    if (/\bkomkommers?\b/.test(baseLower) || /\bkomkommers?\b/.test(rawLower)) produceSynonymTokens.push("cucumber");
    const tokensForOverlap = [...new Set([...ingredientTokens, ...produceSynonymTokens])];
    const allowCheeseEquivs =
      baseLower === "parmezaanse kaas" || /\b(parmezaan|parmigiano|grana\s*padano)\b/.test(rawLower);
    const cheeseEquivTokens = allowCheeseEquivs
      ? ["parmezaan", "parmezaanse", "parmigiano", "reggiano", "grana", "padano"]
      : [];

    const plainFreshVegBase = sanitizeText(baseLower || "")
      .toLowerCase()
      .replace(/^biologisch\s+/i, "")
      .trim();
    const PLAIN_FRESH_VEG_CORE = new Set([
      "tomaat",
      "tomaten",
      "cherrytomaat",
      "cherrytomaten",
      "aubergine",
      "aubergines",
      "courgette",
      "courgettes",
      "komkommer",
      "komkommers",
    ]);
    const isPlainFreshVegIngredient =
      PLAIN_FRESH_VEG_CORE.has(plainFreshVegBase) ||
      /^(?:punt)?paprika$/i.test(plainFreshVegBase) ||
      /^(rode|groene|oranje|gele)\s+(?:punt)?paprika$/i.test(plainFreshVegBase);

    const scoreForIngredientDetailed = (productTitle) => {
      const title = sanitizeText(productTitle).toLowerCase();
      let score = 0;
      const matchedTokens = [];
      const adjustments = [];

      const titleTokens = tokenizeForMatch(title);
      const tokenSet = new Set(titleTokens);

      // Token overlap bonus: more shared tokens means a better match.
      let overlap = 0;
      for (const tok of tokensForOverlap) {
        if (tokenSet.has(tok)) {
          overlap += 1;
          matchedTokens.push(tok);
        }
      }
      if (overlap > 0) {
        const delta = -overlap * 18;
        score += delta;
        adjustments.push({ kind: "bonus", label: `Token overlap (${overlap})`, delta });
      }

      // Phrase hit: whole normalized search term appears inside the product title (strong signal).
      const fold = (s) =>
        String(s || "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
      const titleFolded = fold(title);
      const baseFolded = fold(baseLower);
      // Hele woorden (geen "citroen" in "citroengras", geen substring-bonus op samenstellingen).
      const phraseWholeWordsFolded =
        baseFolded.length >= 3 &&
        (() => {
          const t = ` ${String(titleFolded || "").replace(/\s+/g, " ")} `;
          const wds = String(baseFolded || "")
            .split(/\s+/)
            .map((w) => w.trim())
            .filter((w) => w.length >= 2);
          if (!wds.length) return false;
          const inner = wds.map((w) => escapeRegex(w)).join("[^a-z0-9]+");
          return new RegExp(`[^a-z0-9]${inner}([^a-z0-9]|$)`, "i").test(t);
        })();
      if (phraseWholeWordsFolded) {
        score -= 28;
        adjustments.push({ kind: "bonus", label: "Zoekterm in producttitel", delta: -28 });
      }
      // If there is no meaningful token overlap, the title is often only loosely related
      // (e.g. "met basilicum" style flavour variants). Keep these as alternatives, but
      // make them much less likely to become the default pick.
      if (overlap === 0 && tokensForOverlap.length >= 2) {
        score += 60;
        adjustments.push({ kind: "penalty", label: "Geen token-overlap", delta: 60 });
      }

      // Cheese equivalents: if ingredient is parmesan-like, accept Italian names too.
      if (cheeseEquivTokens.length) {
        for (const tok of cheeseEquivTokens) {
          if (tokenSet.has(tok)) {
            score -= 8;
            adjustments.push({ kind: "bonus", label: "Kaas-equivalent", delta: -8 });
            break;
          }
        }
      }

      // If the ingredient is plain garlic, avoid "knoflook kruidenboter" style matches.
      if (baseLower === "knoflook" && !wantsButter && !wantsGarlicButter) {
        if (/\b(kruidenboter|knoflookboter)\b/.test(title)) {
          score += 70;
          adjustments.push({ kind: "penalty", label: "Knoflook ≠ kruidenboter", delta: 70 });
        }
        if (/\bboter\b/.test(title)) {
          score += 45;
          adjustments.push({ kind: "penalty", label: "Knoflook ≠ boter", delta: 45 });
        }
      }

      // General: don't auto-pick butter-containing products unless the ingredient mentions butter.
      if (!wantsButter && /\bboter\b/.test(title)) {
        score += 25;
        adjustments.push({ kind: "penalty", label: "Bevat boter (niet gevraagd)", delta: 25 });
      }

      // Prefer "net" / "bol" garlic over processed variants when searching for knoflook.
      if (baseLower === "knoflook") {
        // Prefer titles that are basically "knoflook" (fresh garlic) over
        // products that merely *contain* garlic.
        if (!/^(?:ah\s+)?(?:biologisch\s+)?(?:verse\s+)?knoflook\b/i.test(title)) {
          score += 45;
          adjustments.push({ kind: "penalty", label: "Niet puur knoflook", delta: 45 });
        }
        if (/\b(net|bol)\b/.test(title)) {
          score -= 6;
          adjustments.push({ kind: "bonus", label: "Vers (net/bol)", delta: -6 });
        }
        // Avoid "knoflook"-flavoured products when the ingredient is plain garlic.
        if (/\b(roomkaas|kaas|kruidenmix|mix|saus)\b/.test(title)) {
          score += 35;
          adjustments.push({ kind: "penalty", label: "Knoflook als smaak (mix/saus/kaas)", delta: 35 });
        }
        // Avoid "knoflook as flavour" in unrelated products.
        if (/\b(tomatenpuree|tomatenpasta)\b/.test(title)) {
          score += 75;
          adjustments.push({ kind: "penalty", label: "Irrelevant (tomatenpuree/pasta)", delta: 75 });
        }
        if (/\b(aardappel|partjes|wok|smaakmaker|woksmaakmaker)\b/.test(title)) {
          score += 55;
          adjustments.push({ kind: "penalty", label: "Irrelevant (aardappel/wok/smaakmaker)", delta: 55 });
        }
        if (/\b(pasta|puree|poeder|granulaat|zout)\b/.test(title)) {
          score += 15;
          adjustments.push({ kind: "penalty", label: "Verwerkt (poeder/pasta/zout)", delta: 15 });
        }
      }

      // Ui (los / zak uien): liever uien in titel; merk-kant-en-klaar zonder zak uien strafpunten.
      if (isPlainOnionQuery) {
        if (/\buien\b/i.test(title)) {
          score -= 20;
          adjustments.push({ kind: "bonus", label: "Uien (verpakking)", delta: -20 });
        }
        if (/\b(knorr|unox|maggi)\b/i.test(title) && !/\buien\b/i.test(title)) {
          score += 60;
          adjustments.push({ kind: "penalty", label: "Merkgerecht (geen zak uien)", delta: 60 });
        }
        if (/\b(good\s+potatoes|oven\s+aardappel|aardappel\s*partjes|gratin)\b/i.test(title)) {
          score += 70;
          adjustments.push({ kind: "penalty", label: "Aardappel-/ovenschotel", delta: 70 });
        }
        if (/\b(bacon|spek|ham)\b.*\bui\b/i.test(title) || /\bui\b.*\b(bacon|spek|ham)\b/i.test(title)) {
          score += 65;
          adjustments.push({ kind: "penalty", label: "Ui als smaak bij vlees/aardappel", delta: 65 });
        }
      }

      // Fresh herbs: prefer "vers" / bunch-style products and avoid dried mixes/pastes.
      if (isFreshHerbQuery) {
        if (/\b(droog|gedroogd|kruidenmix|kruidenmixen|mix|pasta|puree|poeder|gemalen)\b/.test(title)) {
          score += 70;
          adjustments.push({ kind: "penalty", label: "Verse kruiden ≠ droog/mix/pasta", delta: 70 });
        }
        if (/\bvers\b/.test(title) || /\b(bosje|plant)\b/.test(title)) {
          score -= 18;
          adjustments.push({ kind: "bonus", label: "Verse kruiden match", delta: -18 });
        }
      }

      // Eggs: avoid salad/bakery/candy results when searching for eggs.
      if (isEggQuery) {
        if (/\b(eiersalade|eierkoek|eierkoeken|paasei|paaseieren|chocolade)\b/.test(title)) {
          score += 90;
          adjustments.push({ kind: "penalty", label: "Ei ≠ salade/koek/chocolade", delta: 90 });
        }
        if (/\b(eieren|ei)\b/.test(title)) {
          score -= 16;
          adjustments.push({ kind: "bonus", label: "Ei in titel", delta: -16 });
        }
      }

      // Turmeric (kurkuma): prefer spice powder, avoid shots/drinks/supplements.
      if (isTurmericQuery) {
        if (/\b(shot|super\s*shot|gember\s*shot|wellness|boost|immune|immunity|vitamine|supplement|capsule|tabletten|drank|sap|smoothie|juice)\b/.test(title)) {
          score += 95;
          adjustments.push({ kind: "penalty", label: "Kurkuma ≠ shot/drank/supplement", delta: 95 });
        }
        if (/\b(poeder|gemalen|kruiden|specerij|specerijen)\b/.test(title)) {
          score -= 20;
          adjustments.push({ kind: "bonus", label: "Kurkuma als specerij", delta: -20 });
        }
        // When the title doesn't clearly mention kurkuma, downrank heavily.
        if (!/\bkurkuma\b/.test(title) && !/\bturmeric\b/.test(title)) {
          score += 75;
          adjustments.push({ kind: "penalty", label: "Geen kurkuma in titel", delta: 75 });
        }
      }

      // Specerijen algemeen: voorkom dat (super)shots, drank, snoep of koekjes als default gekozen worden.
      if (isSpiceLikeQuery) {
        if (/\b(shot|super\s*shot|gember\s*shot|wellness|boost|immune|immunity|vitamine|supplement|capsule|tabletten|drank|sap|sapje|smoothie|juice|thee|tea|latte|koffie|coffee)\b/.test(title)) {
          score += 85;
          adjustments.push({ kind: "penalty", label: "Specerij ≠ drank/shot/supplement", delta: 85 });
        }
        if (/\b(pepernoot|pepernoten|kruidnoot|kruidnoten|pepermunt|drop|snoep|chocolade|koek|koeken|cake|gebak|ijs|toetje|dessert|reep)\b/.test(title)) {
          score += 95;
          adjustments.push({ kind: "penalty", label: "Specerij ≠ zoet/snack", delta: 95 });
        }
        // Prefer spice containers / ground spices.
        if (/\b(poeder|gemalen|kruiden|specerij|specerijen)\b/.test(title)) {
          score -= 10;
          adjustments.push({ kind: "bonus", label: "Specerij-verpakking", delta: -10 });
        }
      }

      // Pepper ("peper") should not match pepernoten/pepermunt.
      if (isPepperQuery) {
        if (/\b(pepernoot|pepernoten|kruidnoot|kruidnoten|pepermunt)\b/.test(title)) {
          score += 120;
          adjustments.push({ kind: "penalty", label: "Peper ≠ pepernoten/pepermunt", delta: 120 });
        }
        if (/\b(zwarte\s+peper|peper)\b/.test(title) && /\b(poeder|gemalen|molen|korrel|bolletjes)\b/.test(title)) {
          score -= 12;
          adjustments.push({ kind: "bonus", label: "Peper als specerij", delta: -12 });
        }
      }

      // Pantry: salt ("zout") should match cooking salt, not snacks.
      if (isSaltQuery) {
        if (/\b(keukenzout|tafelzout|zeezout)\b/.test(title)) {
          score -= 35;
          adjustments.push({ kind: "bonus", label: "Keukenzout match", delta: -35 });
        }
        if (/\b(molen)\b/.test(title) && /\bzout\b/.test(title)) {
          score -= 6;
          adjustments.push({ kind: "bonus", label: "Molen (zout)", delta: -6 });
        }
        if (!wantsSaltSnackLike) {
          if (/\b(zoutjes|sticks|chips)\b/.test(title)) {
            score += 110;
            adjustments.push({ kind: "penalty", label: "Snack i.p.v. zout", delta: 110 });
          }
          if (/\bnoten\b/.test(title)) {
            score += 65;
            adjustments.push({ kind: "penalty", label: "Noten i.p.v. zout", delta: 65 });
          }
          if (/\bgezouten\b/.test(title)) {
            score += 55;
            adjustments.push({ kind: "penalty", label: "Gezouten (waarschijnlijk snack)", delta: 55 });
          }
        }
      }

      // Dairy: plain "melk" should not become koffiemelk, kokosmelk of gecondenseerde melk.
      if (isPlainMilkQuery && !wantsCoconutMilk) {
        if (/\bkoffiemelk\b/.test(title)) {
          score += 105;
          adjustments.push({ kind: "penalty", label: "Koffiemelk i.p.v. melk", delta: 105 });
        }
        if (/\b(gecondenseerd(?:e)?|condensed|opgeklopte|opkok)\b/.test(title) && /\bmelk\b/.test(title)) {
          score += 95;
          adjustments.push({ kind: "penalty", label: "Gecondenseerde/kookmelk i.p.v. drinkmelk", delta: 95 });
        }
        if (/\bkokosmelk\b/.test(title)) {
          score += 85;
          adjustments.push({ kind: "penalty", label: "Kokosmelk (niet koemelk)", delta: 85 });
        }
        if (/\b(amandel(?:drank|-drank)|haver(?:drank|-drank)|soja(?:drank)?|zetmelk)\b/.test(title)) {
          score += 65;
          adjustments.push({ kind: "penalty", label: "Plantaardige/zetmelk", delta: 65 });
        }
        if (/\b(volle|halfvolle|magere)\s+melk\b/.test(title) || /\bmelk\s+\d/.test(title)) {
          score -= 12;
          adjustments.push({ kind: "bonus", label: "Drinkmelk (verpakking)", delta: -12 });
        }
      }

      // Rijst: avoid rijstwafels / rijstpapier when user asked for rice.
      if (isPlainRiceQuery) {
        if (/\b(rijstwafel|rijstkoek|rijstpapier|rijstnoedel|mihoen)\b/.test(title)) {
          score += 62;
          adjustments.push({ kind: "penalty", label: "Rijst-afgeleide (geen losse rijst)", delta: 62 });
        }
        if (/\b(basmati|jasmijn|zilvervlies|volkoren|risotto|sushi|pandang)\b/.test(title) && /\brijst\b/.test(title)) {
          score -= 8;
          adjustments.push({ kind: "bonus", label: "Rijstvariant in titel", delta: -8 });
        }
      }

      // Bloem: default "bloem" is tarwebloem; penalize specialty flours unless named in ingredient.
      if (isPlainFlourQuery) {
        if (/\b(amandel|haver|spelt|rijst|kokos|ma[iï]s|tapioca|boekweit|rogge)(?:meel|bloem)\b/.test(title)) {
          score += 58;
          adjustments.push({ kind: "penalty", label: "Speciaalmeel (niet tarwebloem)", delta: 58 });
        }
        if (/\b(patent|tarwe|zelfrijzend)\b/.test(title) && /\bbloem\b/.test(title)) {
          score -= 10;
          adjustments.push({ kind: "bonus", label: "Tarwe-/patentbloem", delta: -10 });
        }
      }

      // Gember: verse knol / stuk (recept) vs bier, gebak, siroop, poeder (afzonderlijk pad)
      if (isPlainFreshGemberQuery) {
        if (/\b(gemberbier|ginger ale|ginger\s*beer)\b/i.test(title)) {
          score += 102;
          adjustments.push({ kind: "penalty", label: "Gemberbier / ginger ale", delta: 102 });
        }
        if (/\b(bier|mout)\b/.test(title) && /\bgember\b/.test(title)) {
          score += 96;
          adjustments.push({ kind: "penalty", label: "Bier (geen verse gember)", delta: 96 });
        }
        if (/\b(koek|koekjes|koeken|speculaas|gebak|cake|biscuit|ontbijtkoek|peperkoek)\b/i.test(title)) {
          score += 94;
          adjustments.push({ kind: "penalty", label: "Gebak met gember", delta: 94 });
        }
        if (/\b(shot|siroop|likeur|bitter|spray)\b/i.test(title) && /\bgember\b/.test(title)) {
          score += 86;
          adjustments.push({ kind: "penalty", label: "Gemberdrank / siroop", delta: 86 });
        }
        if (/\b(wijn|liqueur)\b/i.test(title) && /\bgember\b/.test(title)) {
          score += 92;
          adjustments.push({ kind: "penalty", label: "Alcohol met gember", delta: 92 });
        }
        if (/\bgemberpoeder\b/.test(title) || /\bgemalen\s+gember\b/i.test(title)) {
          score += 52;
          adjustments.push({ kind: "penalty", label: "Gemberpoeder (vers gevraagd)", delta: 52 });
        }
        if (/\b(ingelegd|sushi)\b/.test(title) && /\bgember\b/.test(title)) {
          score += 40;
          adjustments.push({ kind: "penalty", label: "Ingelegde / sushi-gember", delta: 40 });
        }
        if (
          /\b(?:ah\s+)?(?:biologisch\s+)?verse\s+gember\b/i.test(title) ||
          /\bgember\s*(?:staak|stuk|wortel|knol)\b/i.test(title)
        ) {
          score -= 22;
          adjustments.push({ kind: "bonus", label: "Verse gember (product)", delta: -22 });
        }
      }
      if (wantsGemberPowder) {
        if (/\bgemberpoeder\b/.test(title) || /\bgemalen\s+gember\b/i.test(title)) {
          score -= 22;
          adjustments.push({ kind: "bonus", label: "Gemberpoeder", delta: -22 });
        }
        if (
          /\bverse\b.*\bgember\b/i.test(title) &&
          !/\bgemberpoeder\b/.test(title) &&
          !/\bgemalen\b/.test(title)
        ) {
          score += 52;
          adjustments.push({ kind: "penalty", label: "Verse gember i.p.v. poeder", delta: 52 });
        }
      }

      // Citroen (hele vrucht): minder sap / limonade / concentraat
      if (isPlainCitroenQuery) {
        if (/\b(sap|limonade|fris|concentraat|aroma|mix|cordial|syrop|siroop)\b/i.test(title) && !/\b(verse|vrucht|stuk|eet|pers)\b/i.test(title)) {
          score += 78;
          adjustments.push({ kind: "penalty", label: "Citroensap/-drank (geen vrucht)", delta: 78 });
        }
        if (/\b(ijs|sorbet|granita)\b/i.test(title) && /\bcitroen\b/i.test(title)) {
          score += 58;
          adjustments.push({ kind: "penalty", label: "Citroenijs i.p.v. vrucht", delta: 58 });
        }
      }

      // Pantry: pepper ("peper") should match black pepper, not pepernoten/peperoni/etc.
      if (isPepperQuery) {
        if (/\b(zwarte\s+peper|peper\s*\(gemalen\)|gemalen\s+peper|peperkorrels?)\b/.test(title)) {
          score -= 40;
          adjustments.push({ kind: "bonus", label: "Zwarte peper match", delta: -40 });
        }
        if (/\b(molen)\b/.test(title) && /\bpeper\b/.test(title)) {
          score -= 6;
          adjustments.push({ kind: "bonus", label: "Molen (peper)", delta: -6 });
        }
        if (/\bpepernoten\b/.test(title)) { score += 170; adjustments.push({ kind: "penalty", label: "Pepernoten (niet peper)", delta: 170 }); }
        if (/\bpeperkoek\b/.test(title)) { score += 150; adjustments.push({ kind: "penalty", label: "Peperkoek (niet peper)", delta: 150 }); }
        if (/\bpeperoni\b/.test(title)) { score += 140; adjustments.push({ kind: "penalty", label: "Peperoni (niet peper)", delta: 140 }); }
        if (/\bpaprika\b/.test(title)) { score += 120; adjustments.push({ kind: "penalty", label: "Paprika (niet peper)", delta: 120 }); }
        if (/\bsambal\b/.test(title)) { score += 120; adjustments.push({ kind: "penalty", label: "Sambal (niet peper)", delta: 120 }); }
        // Avoid mixes when user asked for plain pepper.
        if (/\b(peper\s*(?:en|&)\s*zout|zout\s*(?:en|&)\s*peper)\b/.test(title)) {
          score += 110;
          adjustments.push({ kind: "penalty", label: "Mix (peper en zout)", delta: 110 });
        }
      }

      // Produce: tomaat/courgette/komkommer/aubergine (en paprika): liever vers per stuk dan potjes, spreads of ingelegde varianten.
      if (isPlainFreshVegIngredient) {
        // Samenstellingen zoals "courgettesoep" / "tomatensoep": geen woordgrens vóór "soep" → apart vangen.
        const compoundVegSoup =
          /(?:tomaten|tomaat|cherrytomaten|courgu?ettes?|zucchini|aubergines?|komkommers?|paprika(?:s)?)\w*(?:soep|bisque)\b|(?:tomaten|tomaat|courgu?ettes?|zucchini|aubergines?|komkommers?|paprika(?:s)?)\s+(?:soep|bisque)\b|(?:courgu?ettes?|tomaten|paprika)soup\b/i;
        if (compoundVegSoup.test(title)) {
          score += 85;
          adjustments.push({ kind: "penalty", label: "Soep (geen verse groente als zodanig)", delta: 85 });
        }
        const processedFreshVeg =
          /\b(?:gegrild|gefrituurde?|gefrituurd|op\s+zuur|gepekeld|ingesneden|ingemaakt|augurk|op\s+sap|op\s+wijn|gevuld|opgiet(?:en)?|spread|dip\b|hummus|humus|pesto|dressing|marinade|tomatenpuree|passata|(?:tomaten\s*)?puree|ketchup|\bblik\b|bouillon|opgemaakt|voorgesneden|reepjes|op\s+zak|zakje|antipasti|carpaccio|soep|chips|snack|sticks|gehakt)\b/i;
        if (processedFreshVeg.test(title)) {
          score += 48;
          adjustments.push({ kind: "penalty", label: "Verwerkte groente (niet puur vers)", delta: 48 });
        }
        if (/\b(?:per\s+stuk|los(?:\s+verkocht)?|rimpel)\b/i.test(title)) {
          score -= 10;
          adjustments.push({ kind: "bonus", label: "Vers (per stuk / los)", delta: -10 });
        }
        // Whole courgette ≠ spiralen/noedels-vervangers (AH catalog heeft veel “spaghetti”).
        if (/\bcourgu?ettes?\b/.test(baseLower) &&
          /\b(?:courgetti|courgette\s*[~-–]\s*spaghetti|vegetable\s+noodles|veg(?:gie)?(?:\s*|-)?(?:pasta|noodles?))\b/i.test(title)) {
          score += 55;
          adjustments.push({ kind: "penalty", label: "Courgette als vermicelli/noedels", delta: 55 });
        }
      }

      // Penalize processed / "extra" items unless explicitly asked for.
      const processedPenalty = [
        { re: /\b(kruidenboter|knoflookboter)\b/, score: 55, okIf: wantsGarlicButter || wantsButter },
        { re: /\broomkaas\b/, score: 45, okIf: /\broomkaas\b/.test(baseLower) || /\broomkaas\b/.test(rawLower) },
        { re: /\b(saus|dressing|marinade)\b/, score: 55, okIf: /\b(saus|dressing|marinade)\b/.test(baseLower) },
        { re: /\b(mix|kruidenmix|kruiden)\b/, score: 35, okIf: /\b(mix|kruiden)\b/.test(baseLower) },
        { re: /\b(pasta|poeder|granulaat|puree)\b/, score: 28, okIf: /\b(pasta|poeder|granulaat|puree)\b/.test(baseLower) },
        { re: /\b(snack|toast|toastjes|crackers?|chips|noten)\b/, score: 55, okIf: wantsToastLike || /\b(not(en)?|chips)\b/.test(baseLower) },
        // Guard: herbs/veg terms like "basilicum" can accidentally match snack products (e.g. melbatoast).
        { re: /\b(melbatoast|toastjes?|toast|crackers?|zadencrackers?|beschuit|croutons?)\b/, score: 80, okIf: wantsToastLike },
      ];
      for (const p of processedPenalty) {
        if (!p.okIf && p.re.test(title)) {
          score += p.score;
          adjustments.push({ kind: "penalty", label: `Verwerkt: ${p.re.source}`, delta: p.score });
        }
      }

      // Extra guardrail: never auto-pick melbatoast unless the ingredient asked for toast/crackers.
      if (!wantsToastLike && /\bmelbatoast\b/.test(title)) {
        score += 200;
        adjustments.push({ kind: "penalty", label: "Melbatoast guardrail", delta: 200 });
      }

      // Cheese-specific "avoid": parmesan is often matched to sauces/spreads; avoid those.
      if (baseLower === "parmezaanse kaas") {
        if (/\b(saus|pesto|kruidenboter|spread)\b/.test(title)) {
          score += 80;
          adjustments.push({ kind: "penalty", label: "Parmezaan ≠ saus/spread", delta: 80 });
        }
      }

      const appliedPenalties = adjustments.filter((a) => a.kind === "penalty");
      const appliedBonuses = adjustments.filter((a) => a.kind === "bonus");
      return {
        score,
        matchedTokens: [...new Set(matchedTokens)].slice(0, 18),
        appliedPenalties,
        appliedBonuses,
      };
    };

    const scoreCache = new Map();
    const getDetailedScore = (productTitle) => {
      const key = String(productTitle || "");
      if (scoreCache.has(key)) return scoreCache.get(key);
      const detail = scoreForIngredientDetailed(key);
      scoreCache.set(key, detail);
      return detail;
    };

    const products = (data.products || [])
      .filter((p) => !NON_FOOD_INGREDIENT_PATTERN.test(sanitizeText(p.title)))
      .filter((p) => ingredientMatchesAnyProductTerm(matchTerms, sanitizeText(p.title)))
      // Guardrail: avoid melbatoast unless explicitly asked for toast/crackers.
      .filter((p) => (wantsToastLike ? true : !/\bmelbatoast\b/i.test(String(p?.title || ""))))
      .sort((a, b) => {
        const sa = getDetailedScore(a.title || "");
        const sb = getDetailedScore(b.title || "");
        const pa = a.currentPrice ?? a.priceBeforeBonus ?? 9999;
        const pb = b.currentPrice ?? b.priceBeforeBonus ?? 9999;
        if (pa !== pb) return pa - pb;
        if (sa.score !== sb.score) return sa.score - sb.score;
        const ba = a.isBonus || a.isBonusPrice ? 1 : 0;
        const bb = b.isBonus || b.isBonusPrice ? 1 : 0;
        if (ba !== bb) return bb - ba;
        return 0;
      })
      .slice(0, count);

    // Attach match metadata for "Waarom?" explanations.
    for (const p of products) {
      try {
        const detail = getDetailedScore(p?.title || "");
        p._platelyMatchMeta = {
          score: Number.isFinite(detail?.score) ? detail.score : null,
          matchedTokens: Array.isArray(detail?.matchedTokens) ? detail.matchedTokens : [],
          appliedPenalties: Array.isArray(detail?.appliedPenalties) ? detail.appliedPenalties : [],
          appliedBonuses: Array.isArray(detail?.appliedBonuses) ? detail.appliedBonuses : [],
          searchTerm: sanitizeText(searchTerm || ""),
          baseTerm: sanitizeText(baseTerm || ""),
        };
      } catch {
        // ignore
      }
    }

    const parsed = products.map(parseAHProduct);
    if (parsed.length > 0) _setAHSearchCache(cacheKey, parsed);
    return parsed;
  } catch (err) {
    console.warn(`[AH] findAHProducts fout voor "${searchTerm}": ${err?.message || err}`);
    return [];
  }
}

// Searches the AH catalog for a single ingredient using multiple label-specific
// query variants in parallel so the basket alternatives screen can group by
// dietary preference. Returns a deduplicated list of up to `maxCount` products
// (gesorteerd: eerst voordeligste prijs, dan match-score, dan bonus).
async function findAHAlternativesGrouped(ingredient, prefs = {}, maxCount = 30) {
  const rawBase = sanitizeText(ingredient || "");
  const base = normalizeIngredientForSearch(rawBase) || rawBase;
  if (!base) return [];

  // We want a richer pool than the on-screen cap so the frontend can:
  // - show more products overall
  // - filter/sort by dietary chips without returning an empty list
  const BASE_COUNT = 20; // broad results
  const LABEL_COUNT = 12; // per-label variants (deduped afterwards)

  const variants = [];
  // Always pull a plain-base search so we never end up with an empty result.
  variants.push({ tag: null, query: base, count: BASE_COUNT });
  // If the user already toggled bio in the basket, also pull a biologisch-boosted base set.
  if (prefs?.bio) variants.push({ tag: "biologisch", query: `biologisch ${base}`, count: BASE_COUNT });

  // Always pull label-specific alternatives so we can categorize them.
  variants.push(
    { tag: "biologisch", query: `biologisch ${base}`, count: LABEL_COUNT },
    { tag: "beter leven 1 ster", query: `beter leven 1 ster ${base}`, count: LABEL_COUNT },
    // Broader query to ensure we still retrieve Beter Leven items even when "1 ster"
    // isn't matched in AH's search index. Star-level is then inferred from metadata.
    { tag: null, query: `beter leven ${base}`, count: Math.max(LABEL_COUNT, 10) },
    { tag: "vegetarisch", query: `vegetarisch ${base}`, count: LABEL_COUNT },
    { tag: "vegan", query: `vegan ${base}`, count: LABEL_COUNT },
    { tag: "plantaardig", query: `plantaardig ${base}`, count: LABEL_COUNT },
    // AH huismerk levert goedkope basisvarianten die door de gewone zoekopdracht soms gemist worden.
    { tag: "huismerk", query: `AH ${base}`, count: LABEL_COUNT }
  );

  const matchSeed = sanitizeText(rawBase || base || ingredient || "");

  const buckets = await Promise.all(
    variants.map(async (v) => {
      // Use raw ingredient text for scorer (baseLower/rawLower nuance); query override stays `v.query`.
      const products = await findAHProducts(matchSeed, v.count || LABEL_COUNT, v.query);
      return { tag: v.tag, products };
    })
  );

  // Merge by product id while collecting all the label tags that yielded the same product.
  const byId = new Map();
  for (const bucket of buckets) {
    for (const product of bucket.products) {
      const key = product.id || `${product.name}|${product.imageUrl}`;
      const pScore = Number(product.matchMeta?.score);

      if (!byId.has(key)) {
        const entry = {
          ...product,
          labels: Array.isArray(product.labels) ? [...product.labels] : [],
        };
        if (bucket.tag) entry.labels.push(bucket.tag);
        byId.set(key, entry);
        continue;
      }

      const entry = byId.get(key);
      if (bucket.tag) entry.labels.push(bucket.tag);
      if (Number.isFinite(pScore)) {
        const cur = Number(entry.matchMeta?.score);
        if (!Number.isFinite(cur) || pScore < cur) {
          entry.matchMeta = { ...product.matchMeta };
        }
      }
    }
  }

  // Always keep at least the base bucket as a safety net (already merged above).
  const merged = [...byId.values()].map((p) => ({
    ...p,
    labels: [...new Set(p.labels.map((l) => sanitizeText(l)).filter(Boolean))],
  }));

  const parseAhPriceNum = (p) =>
    parseFloat(String(p.price || "").replace("€", "").replace(",", ".").trim()) || 9999;

  // Voordeligste eerst (actuele prijs), daarna match-score; bonus als extra tie-break.
  merged.sort((a, b) => {
    const pa = parseAhPriceNum(a);
    const pb = parseAhPriceNum(b);
    if (pa !== pb) return pa - pb;
    const sa = Number(a.matchMeta?.score);
    const sb = Number(b.matchMeta?.score);
    const fa = Number.isFinite(sa) ? sa : 9999;
    const fb = Number.isFinite(sb) ? sb : 9999;
    if (fa !== fb) return fa - fb;
    const ba = a.isBonus ? 1 : 0;
    const bb = b.isBonus ? 1 : 0;
    if (ba !== bb) return bb - ba;
    return 0;
  });

  return merged.slice(0, maxCount);
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
  const params = found
    .map((r) => {
      const qty = Math.max(1, Math.min(24, Math.ceil(Number(r.quantity || 1) || 1)));
      // Colon must NOT be percent-encoded — AH's add-multiple parser expects literal `p=ID:QTY`
      return `p=${encodeURIComponent(r.product.id)}:${qty}`;
    })
    .join("&");
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

function parseAhBasketPriceEuro(value) {
  const raw = sanitizeText(value || "");
  if (!raw) return Number.POSITIVE_INFINITY;
  const cleaned = raw
    .replace(/[^\d,.\-]/g, "")
    .replace(/\.(?=\d{3}\b)/g, "")
    .replace(",", ".");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
}

/** Te zwakke semantic match of zware AH-penalty → niet als standaard bij AH-lijst/mandje. */
function ahProductPassesListAddQualityBar(product) {
  if (!product) return false;
  const meta = product.matchMeta;
  if (!meta || meta.score === null || meta.score === undefined || !Number.isFinite(Number(meta.score))) {
    return true;
  }
  const score = Number(meta.score);
  if (score > 56) return false;
  const penalties = Array.isArray(meta.appliedPenalties) ? meta.appliedPenalties : [];
  if (penalties.some((p) => Number(p.delta) >= 92)) return false;
  return true;
}

function isAhProductBioLabeled(product) {
  return Array.isArray(product?.labels) && product.labels.some((l) => /\b(biologisch|bio)\b/i.test(String(l || "")));
}

/**
 * Standaard AH-productkeuze: binnen de kwaliteitsband eerst **voordeligste prijs** (actuele prijs),
 * dan match-score, dan BONUS-treffer. prefs.bio: pool beperken tot bio binnen dezelfde band.
 */
function pickAhBasketDefaultProduct(products, prefs) {
  const list = Array.isArray(products) ? products.filter(Boolean) : [];
  if (!list.length) return null;

  const scored = list
    .map((p, idx) => ({
      idx,
      product: p,
      score: Number.isFinite(Number(p?.matchMeta?.score)) ? Number(p.matchMeta.score) : null,
      price: parseAhBasketPriceEuro(p?.price),
      bio: isAhProductBioLabeled(p),
      bonus: Boolean(p?.isBonus),
    }))
    .filter((x) => x.product);

  if (!scored.length) return list[0] || null;

  const finiteScores = scored.map((s) => s.score).filter((s) => Number.isFinite(s));
  const bestScore = finiteScores.length ? Math.min(...finiteScores) : null;
  const cutoff = bestScore === null ? null : Math.min(bestScore + 32, 76);
  let pool = cutoff === null ? scored : scored.filter((s) => s.score === null || s.score <= cutoff);

  if (prefs?.bio) {
    const bioOnly = pool.filter((s) => s.bio);
    if (bioOnly.length) pool = bioOnly;
  }

  const goodSorted = [...pool].sort((a, b) => {
    const sa = Number.isFinite(a.score) ? a.score : Infinity;
    const sb = Number.isFinite(b.score) ? b.score : Infinity;
    if (Math.abs(sa - sb) > 10) return sa - sb;
    if (a.price !== b.price) return a.price - b.price;
    if (sa !== sb) return sa - sb;
    if (Boolean(a.bonus) !== Boolean(b.bonus)) return (b.bonus ? 1 : 0) - (a.bonus ? 1 : 0);
    return a.idx - b.idx;
  });

  return goodSorted[0].product;
}

/**
 * Voor de AH-preview: liever een product binnen de kwaliteitsdrempel als de pool dat toelaat,
 * anders best effort (zelfde gedrag als eerder voor moeilijke ingrediënten).
 */
function selectAhProductForGroceryHandoff(products, prefs) {
  const picked = pickAhBasketDefaultProduct(products, prefs);
  const strictPool = (Array.isArray(products) ? products : []).filter(ahProductPassesListAddQualityBar);
  if (!strictPool.length) return picked;
  return pickAhBasketDefaultProduct(strictPool, prefs) || picked;
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

// ── HTML helpers for search scraping ──────────────────────────────────────
function decodeHtmlEntities(str) {
  return (str || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&[a-z]+;/g, "");
}

function stripHtmlTags(str) {
  return (str || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Split HTML into top-level <article> blocks, handling nesting. */
function extractArticleBlocks(html) {
  const blocks = [];
  let i = 0;
  while (i < html.length) {
    const start = html.indexOf("<article", i);
    if (start === -1) break;
    let depth = 1, pos = start + 8;
    while (depth > 0 && pos < html.length) {
      const nextOpen = html.indexOf("<article", pos);
      const nextClose = html.indexOf("</article>", pos);
      if (nextClose === -1) { pos = html.length; break; }
      if (nextOpen !== -1 && nextOpen < nextClose) { depth++; pos = nextOpen + 8; }
      else { depth--; pos = nextClose + 10; if (depth === 0) blocks.push(html.slice(start, pos)); }
    }
    i = pos;
  }
  return blocks;
}

/**
 * Lekker & Simpel structure:
 *   <article class="post-item ...">
 *     <a href="URL" class="post-item__anchor"></a>
 *     <div class="post-item__image"><picture><img data-src="THUMB" src="[base64 placeholder]"></picture></div>
 *     <div class="post-item__inner"><h2 class="post-item__title ...">TITLE</h2></div>
 *   </article>
 */
function parseLekkerSimpel(html, baseUrl, channelName, channelId, count) {
  const results = [];
  const seenUrls = new Set();
  const blocks = extractArticleBlocks(html);

  for (const block of blocks) {
    if (results.length >= count) break;

    const anchorMatch = block.match(/class="[^"]*post-item__anchor[^"]*"[^>]*href="(https?:\/\/[^"]+)"/i)
      || block.match(/href="(https?:\/\/[^"]+)"[^>]*class="[^"]*post-item__anchor[^"]*"/i);
    if (!anchorMatch) continue;
    const url = anchorMatch[1];
    if (seenUrls.has(url) || /\/(tag|categor|author|page)\//i.test(url)) continue;

    const titleMatch = block.match(/class="[^"]*post-item__title[^"]*"[^>]*>([^<]+)</i);
    const title = decodeHtmlEntities(titleMatch?.[1] || "").trim();
    if (!title) continue;

    // data-src preferred (real URL), src may be a base64 placeholder
    const thumbMatch = block.match(/data-src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)
      || block.match(/src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i);
    const thumbnail = thumbMatch?.[1] || "";

    seenUrls.add(url);
    results.push({ title, url, thumbnail, channel: channelName, channelId, description: "", time: "" });
  }
  return results;
}

/**
 * Laura's Bakery structure:
 *   <div class="column column-block item ...">
 *     <div class="post">
 *       <div class="image" data-src="THUMB"><img src="THUMB" alt="TITLE"></div>
 *       <div class="content"><h3>TITLE</h3></div>
 *       <a href="URL" class="link">...</a>
 *     </div>
 *   </div>
 */
function parseLaurasBakery(html, baseUrl, channelName, channelId, count) {
  const results = [];
  const seenUrls = new Set();
  const chunks = html.split(/(?=<div[^>]+class="[^"]*column[^"]*\bitem\b[^"]*")/i);

  for (const chunk of chunks.slice(1)) {
    if (results.length >= count) break;
    const block = chunk.slice(0, 1500); // first ~1500 chars is enough

    const linkMatch = block.match(/href="(https?:\/\/[^"]+)"[^>]*class="[^"]*\blink\b[^"]*"/i)
      || block.match(/class="[^"]*\blink\b[^"]*"[^>]*href="(https?:\/\/[^"]+)"/i);
    if (!linkMatch) continue;
    const url = linkMatch[1];
    if (seenUrls.has(url)) continue;

    const h3Match = block.match(/<h3[^>]*>([^<]+)<\/h3>/i);
    const altMatch = block.match(/alt="([^"]+)"/i);
    const title = decodeHtmlEntities(h3Match?.[1] || altMatch?.[1] || "").trim();
    if (!title) continue;

    // data-src on .image div is the real thumbnail
    const thumbMatch = block.match(/class="[^"]*\bimage\b[^"]*"[^>]*data-src="(https?:\/\/[^"]+)"/i)
      || block.match(/data-src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)
      || block.match(/src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i);
    const thumbnail = thumbMatch?.[1] || "";

    seenUrls.add(url);
    results.push({ title, url, thumbnail, channel: channelName, channelId, description: "", time: "" });
  }
  return results;
}

/**
 * Chicks Love Food structure (server-rendered, no <article> tags):
 *   <ul class="recipe-list ...">
 *     <li>
 *       <div class="recipe-item">
 *         <div class="recipe-image"><a href="URL"><img src="THUMB" alt="TITLE"></a></div>
 *         <div class="recipe-content">
 *           <span class="recipe-info">CATEGORY • TIME</span>
 *           <h4><a href="URL">TITLE</a></h4>
 *         </div>
 *       </div>
 *     </li>
 *   </ul>
 */
function parseChicksLoveFood(html, baseUrlRaw, channelName, channelId, count) {
  const results = [];
  const seenUrls = new Set();
  const base = String(baseUrlRaw || "https://www.chickslovefood.com").replace(/\/+$/, "");
  const abs = (u) => {
    const raw = sanitizeText(u || "");
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw.replace(/^http:\/\//i, "https://");
    if (raw.startsWith("//")) return `https:${raw}`;
    if (raw.startsWith("/")) return `${base}${raw}`;
    return `${base}/${raw.replace(/^\.\//, "")}`;
  };

  const ulMatch = html.match(/<ul[^>]*\brecipe-list\b[^>]*>/i);
  if (!ulMatch || ulMatch.index === undefined) return results;
  const afterOpen = ulMatch.index + ulMatch[0].length;
  let depth = 1;
  let pos = afterOpen;
  let listEnd = -1;
  const lower = html;
  while (pos < lower.length && depth > 0) {
    const openAt = lower.indexOf("<ul", pos);
    const closeAt = lower.indexOf("</ul>", pos);
    if (closeAt === -1) break;
    if (openAt !== -1 && openAt < closeAt) {
      depth += 1;
      pos = openAt + 3;
    } else {
      depth -= 1;
      if (depth === 0) listEnd = closeAt + 5;
      pos = closeAt + 5;
    }
  }

  const listHtml =
    listEnd > afterOpen
      ? html.slice(ulMatch.index, listEnd)
      : html.slice(ulMatch.index, ulMatch.index + Math.min(html.length - ulMatch.index, 120_000));

  const items = listHtml.split(/<li[\s>]/).slice(1);
  const hrefGrab = (item) =>
    item.match(/<div[^>]*class="[^"]*recipe-image[^"]*"[\s\S]*?href=["']([^"']+)["']/i)
      || item.match(/<h4[^>]*>[\s\S]*?href=["']([^"']+)["']/i);

  for (const item of items) {
    if (results.length >= count) break;

    const urlMatch = hrefGrab(item);
    if (!urlMatch) continue;
    const url = abs(urlMatch[1]);
    if (!url || seenUrls.has(url) || !/\/recept\//i.test(url)) continue;

    const titleMatch = item.match(/<h4[^>]*>[\s\S]*?<a[^>]*>([\s\S]+?)<\/a>/i)
      || item.match(/alt=["']([^"']+)["']/i);
    const title = decodeHtmlEntities(stripHtmlTags(titleMatch?.[1] || "")).trim();
    if (!title) continue;

    const thumbMatch =
      item.match(/srcset\s*=\s*["']([^"']+)["']/i)
      || item.match(/<div[^>]*class="[^"]*recipe-image[^"]*"[\s\S]*?data-src=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)["']/i)
      || item.match(/<div[^>]*class="[^"]*recipe-image[^"]*"[\s\S]*?src=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)["']/i)
      || item.match(/src=["'](https?:\/\/[^"']+\.(?:jpe?g|png|webp)[^"']*)["']/i);
    let thumbnail = "";
    if (thumbMatch?.[1]) {
      const rawSet = thumbMatch[1];
      const pick =
        /^https?:\/\//i.test(rawSet.trim())
          ? rawSet.split(",").pop()
          : rawSet.split(",").pop() || rawSet;
      thumbnail = abs((pick || "").trim().split(/\s+/)[0]);
    }

    const timeMatch = item.match(/class=["'][^"']*recipe-info[^"']*["'][^>]*>[\s\S]*?•\s*([^<]+)/i);
    const time = timeMatch ? timeMatch[1].trim() : "";

    seenUrls.add(url);
    results.push({ title, url, thumbnail, channel: channelName, channelId, description: "", time });
  }
  return results;
}

function parse24Kitchen(html, baseUrl, channelName, channelId, count) {
  const results = [];
  const seenUrls = new Set();
  const text = String(html || "");
  const base = String(baseUrl || "").replace(/\/+$/, "");

  const abs = (u) => {
    const raw = sanitizeText(u || "");
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.startsWith("/")) return `${base}${raw}`;
    return raw;
  };

  const push = (titleRaw, urlRaw, thumbRaw) => {
    if (results.length >= count) return;
    const url = abs(urlRaw);
    if (!url || seenUrls.has(url)) return;
    // 24Kitchen search sometimes surfaces image assets as "results".
    // Exclude URLs that point directly to JPEGs.
    if (/\.jpeg/i.test(url)) return;
    if (/\/recepten\/(?:zoeken|search)(?:\/|$)/i.test(url)) return;
    if (!urlLooksLikeRecipe(url)) return;

    const title = decodeHtmlEntities(stripHtmlTags(titleRaw || "")).trim();
    if (!title || title.length < 3) return;
    if (!titleLooksLikeRecipe(title)) return;

    const thumbnail = cleanImageUrl(thumbRaw || "");
    if (thumbnail && (/\.svg(?:\?|$)/i.test(thumbnail) || isDecorativeImageUrl(thumbnail))) return;

    seenUrls.add(url);
    results.push({ title, url, thumbnail, channel: channelName, channelId, description: "", time: "" });
  };

  const hrefRe = /<a[^>]+href="([^"]*\/recepten\/[^"]+)"[^>]*>/gi;
  for (const m of text.matchAll(hrefRe)) {
    if (results.length >= count) break;
    const href = m[1] || "";
    const url = abs(href);
    if (!url || seenUrls.has(url)) continue;
    if (/\/recepten\/(?:zoeken|search)(?:\/|$)/i.test(url)) continue;

    const start = Math.max(0, (m.index || 0) - 300);
    const block = text.slice(start, start + 2600);

    const title =
      block.match(/aria-label="([^"]{3,200})"/i)?.[1]
      || block.match(/title="([^"]{3,200})"/i)?.[1]
      || block.match(/<h[2-4][^>]*>([\s\S]{0,300}?)<\/h[2-4]>/i)?.[1]
      || block.match(/<img[^>]+alt="([^"]{3,200})"/i)?.[1]
      || "";

    const thumb =
      block.match(/data-src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)?.[1]
      || block.match(/src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)?.[1]
      || block.match(/srcset="(https?:\/\/[^"\s]+?\.(?:jpe?g|png|webp)[^"\s]*)/i)?.[1]
      || "";

    push(title, url, thumb);
  }

  if (results.length === 0) {
    const urlRe = /https?:\/\/(?:www\.)?24kitchen\.nl\/recepten\/(?!zoeken\b)[^"'<\s]+/gi;
    for (const m of text.matchAll(urlRe)) {
      if (results.length >= count) break;
      const url = m[0];
      if (!url || seenUrls.has(url)) continue;
      const start = Math.max(0, (m.index || 0) - 250);
      const block = text.slice(start, start + 2200);
      const title =
        block.match(/<h[2-4][^>]*>([\s\S]{0,300}?)<\/h[2-4]>/i)?.[1]
        || block.match(/<img[^>]+alt="([^"]{3,200})"/i)?.[1]
        || "";
      const thumb =
        block.match(/data-src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)?.[1]
        || block.match(/src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)?.[1]
        || "";
      push(title, url, thumb);
    }
  }

  return results.slice(0, count);
}

let cached24KitchenFacPath = { path: "", at: 0 };
async function search24KitchenFac(query, count, effectiveSeedConfig, options = {}) {
  const channelName = "24 Kitchen";
  const channelId = "ch-24k";
  const eff = effectiveSeedConfig && typeof effectiveSeedConfig === "object" ? effectiveSeedConfig : {};
  const baseUrl = sanitizeText(eff.baseUrl || "https://www.24kitchen.nl").replace(/\/+$/, "");
  const q = sanitizeText(query || "").trim();
  if (!q) return [];

  const now = Date.now();
  const MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6h
  let facPath = cached24KitchenFacPath.path;
  if (!facPath || (now - cached24KitchenFacPath.at) > MAX_AGE_MS) {
    try {
      const probeUrl = `${baseUrl}/recepten/zoeken?q=${encodeURIComponent(q.slice(0, 6) || "pasta")}`;
      const html = await fetchHtml(probeUrl);
      const settingsJson =
        html?.match(/<script[^>]+data-drupal-selector="drupal-settings-json"[^>]*>([\s\S]*?)<\/script>/i)?.[1] || "";
      const settings = settingsJson ? safelyParseJson(settingsJson.trim()) : null;
      const nextPath = sanitizeText(settings?.fac?.search?.jsonFilesPath || "");
      if (nextPath) {
        facPath = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
        cached24KitchenFacPath = { path: facPath, at: now };
      }
    } catch {
      // ignore
    }
  }
  if (!facPath) return [];

  const facKey = q.trim().replace(/\s*\/\s*/g, "_").replace(/\s+/g, "_").slice(0, 15);
  if (!facKey) return [];

  const url = `${baseUrl}${facPath.replace(/\/+$/, "")}/${encodeURIComponent(facKey)}.json`;
  try {
    const resp = await fetch(url, {
      headers: { ...FETCH_HEADERS, accept: "application/json" },
      signal: AbortSignal.timeout(6000),
    });
    if (!resp.ok) return [];
    const data = await resp.json().catch(() => null);
    const items = data?.items?.results;
    if (!Array.isArray(items) || items.length === 0) return [];

    const results = [];
    const seen = new Set();
    for (const item of items) {
      if (results.length >= count) break;
      if (!item || item.type !== "recipe") continue;
      const title = sanitizeText(item.title || "");
      const rel = sanitizeText(item.url || "");
      const thumbnail = cleanImageUrl(String(item.thumbnail || "").replace(/\s+/g, ""));
      const absUrl = rel && rel.startsWith("http") ? rel : (rel.startsWith("/") ? `${baseUrl}${rel}` : "");
      if (!title || !absUrl || seen.has(absUrl)) continue;
      if (/\.jpeg/i.test(absUrl)) continue;
      if (!urlLooksLikeRecipe(absUrl) || !titleLooksLikeRecipe(title) || !channelSearchResultTitleMatchesQuery(channelId, title, q, options)) continue;
      if (thumbnail && (/\.svg(?:\?|$)/i.test(thumbnail) || isDecorativeImageUrl(thumbnail))) continue;
      seen.add(absUrl);
      results.push({ title, url: absUrl, thumbnail, channel: channelName, channelId, description: "", time: "" });
    }
    return results.slice(0, count);
  } catch {
    return [];
  }
}

function parsePaulineSearch(html, baseUrl, channelName, channelId, count) {
  const results = [];
  const seenUrls = new Set();
  const text = String(html || "");
  const base = String(baseUrl || "").replace(/\/+$/, "");

  const abs = (u) => {
    const raw = sanitizeText(u || "");
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.startsWith("/")) return `${base}${raw}`;
    return raw;
  };

  const push = (titleRaw, urlRaw, thumbRaw) => {
    if (results.length >= count) return;
    const url = abs(urlRaw);
    if (!url || seenUrls.has(url)) return;
    if (!/\/recept\//i.test(url)) return;
    if (!urlLooksLikeRecipe(url)) return;

    const title = sanitizeText(decodeHtmlEntities(stripHtmlTags(titleRaw || ""))).trim();
    if (!title || title.length < 3) return;
    if (!titleLooksLikeRecipe(title)) return;

    const thumbnail = cleanImageUrl(String(thumbRaw || "").replace(/\s+/g, ""));
    if (thumbnail && (/\.svg(?:\?|$)/i.test(thumbnail) || isDecorativeImageUrl(thumbnail))) return;

    seenUrls.add(url);
    results.push({ title, url, thumbnail, channel: channelName, channelId, description: "", time: "" });
  };

  const hrefRe = /<a[^>]+href="([^"]*\/recept\/[^"]+)"[^>]*>/gi;
  for (const m of text.matchAll(hrefRe)) {
    if (results.length >= count) break;
    const href = m[1] || "";
    const start = Math.max(0, (m.index || 0) - 280);
    const block = text.slice(start, start + 2600);

    const title =
      block.match(/aria-label="([^"]{3,200})"/i)?.[1]
      || block.match(/title="([^"]{3,200})"/i)?.[1]
      || block.match(/<h[2-4][^>]*>([\s\S]{0,300}?)<\/h[2-4]>/i)?.[1]
      || block.match(/<img[^>]+alt="([^"]{3,200})"/i)?.[1]
      || "";

    const thumb =
      block.match(/data-src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)?.[1]
      || block.match(/src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)?.[1]
      || block.match(/srcset="(https?:\/\/[^"\s]+?\.(?:jpe?g|png|webp)[^"\s]*)/i)?.[1]
      || "";

    push(title, href, thumb);
  }

  // Fallback: pull plain URLs if cards aren’t link-wrapped.
  if (results.length === 0) {
    const urlRe = /https?:\/\/(?:www\.)?uitpaulineskeuken\.nl\/recept\/[^"'<\s]+/gi;
    for (const m of text.matchAll(urlRe)) {
      if (results.length >= count) break;
      const url = m[0];
      const start = Math.max(0, (m.index || 0) - 250);
      const block = text.slice(start, start + 2200);
      const title =
        block.match(/<h[2-4][^>]*>([\s\S]{0,300}?)<\/h[2-4]>/i)?.[1]
        || block.match(/<img[^>]+alt="([^"]{3,200})"/i)?.[1]
        || "";
      const thumb =
        block.match(/data-src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)?.[1]
        || block.match(/src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i)?.[1]
        || "";
      push(title, url, thumb);
    }
  }

  return results.slice(0, count);
}

/** www.miljuschka.nl ↔ miljuschka.nl variants for REST + host checks */
function wordpressOriginVariants(baseUrl) {
  const raw = sanitizeText(baseUrl || "").replace(/\/+$/, "");
  if (!raw) return [];
  try {
    const u = new URL(raw);
    const h = String(u.hostname || "").toLowerCase();
    const withWww = h.startsWith("www.") ? h : `www.${h}`;
    const sansWww = h.startsWith("www.") ? h.slice(4) : h;
    const a = `${u.protocol}//${withWww}`;
    const b = `${u.protocol}//${sansWww}`;
    return [...new Set([raw, a, b].map((x) => x.replace(/\/+$/, "")))];
  } catch {
    return [raw];
  }
}

/**
 * When WP search HTML has no `<article>` blocks (common on modern/block themes),
 * still collect plausible same-site recipe URLs from anchors.
 */
function parseWpSearchAnchorFallback(html, baseUrl, channelName, channelId, count) {
  const results = [];
  const seenNorm = new Set();
  let siteHost = "";
  try {
    siteHost = new URL(baseUrl).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return results;
  }
  const navTitle = /^(home|homepage|welkom|lees meer|meer laden|bewaar|opgeslagen|opslaan)$/i;

  let siteHostVariants;
  try {
    const variants = wordpressOriginVariants(baseUrl);
    siteHostVariants = new Set(variants.map((o) => new URL(o).hostname.replace(/^www\./i, "").toLowerCase()));
  } catch {
    siteHostVariants = new Set([siteHost]);
  }

  const lim = Math.min(Math.max(Number(count) || 12, 1), 48);
  const anchorRe =
    /<a\b[^>]*\bhref\s*=\s*["']([^"'>\s]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = anchorRe.exec(html)) !== null && results.length < lim * 4) {
    const rawHref = String(m[1] || "")
      .trim()
      .replace(/&amp;/gi, "&");
    let u;
    try {
      u = new URL(rawHref.split("#")[0], baseUrl);
    } catch {
      continue;
    }
    const linkHostNorm = u.hostname.replace(/^www\./i, "").toLowerCase();
    if (!siteHostVariants.has(linkHostNorm)) continue;

    const pathname = `${u.pathname || ""}`;
    if (/\b(?:mailto:|tel:)\b/i.test(rawHref)) continue;

    let urlNorm = `${u.origin}${pathname.replace(/\/?$/, "") || "/"}`;
    if (seenNorm.has(urlNorm)) continue;

    let title = decodeHtmlEntities(stripHtmlTags(m[2] || "")).replace(/\s+/g, " ").trim();
    title = title.replace(/\s+[»«]+$/u, "").trim();

    const segs = pathname.split("/").filter(Boolean);
    if (!title || title.length < 4 || navTitle.test(title)) {
      const slug = segs[segs.length - 1] || "";
      const fromSlug = decodeURIComponent(slug).replace(/[-_]+/g, " ").trim();
      title = /^https?:?\/?\/?$/i.test(fromSlug) ? "" : fromSlug;
    }

    const imgInAnchor =
      m[0].match(/(?:src|data-src)\s*=\s*["'](https?:\/\/[^"']+\.(?:jpe?g|png|webp)[^"']*)["']/i)?.[1] ||
      "";

    const lowPath = pathname.toLowerCase();

    const skipUrl =
      !pathname ||
      pathname === "/" ||
      /\b(wp-login\.php|wp-admin)\b/i.test(urlNorm) ||
      /\/(?:feed|rss)\/?$/i.test(pathname) ||
      /\.(?:pdf|zip|php)(\?|$)/i.test(lowPath);

    if (!title || skipUrl) continue;

    seenNorm.add(urlNorm);

    if (/\/(?:tag|categor(?:y|ie)|auteur|author|page|zoek)\b/i.test(lowPath)) continue;
    if (!urlLooksLikeRecipe(urlNorm)) continue;
    const looksRecipeish =
      RECIPE_URL_RE.test(urlNorm) ||
      titleLooksLikeRecipe(title) ||
      (segs.length >= 2 && title.length >= 10);
    if (!looksRecipeish) continue;

    results.push({
      title,
      url: urlNorm,
      thumbnail: cleanImageUrl(imgInAnchor || ""),
      channel: channelName,
      channelId,
      description: "",
      time: "",
    });
  }

  return results.slice(0, Math.max(lim, count));
}

/**
 * Generic WordPress search HTML parser.
 * Handles standard WP themes where <article> contains <h2 class="entry-title"><a href="...">
 */
function parseWPStandard(html, baseUrl, channelName, channelId, count) {
  const results = [];
  const seenUrls = new Set();
  const blocks = extractArticleBlocks(html);

  for (const block of blocks) {
    if (results.length >= count) break;

    const headingLink =
      block.match(/<h[1-5][^>]*>[\s\S]{0,300}?<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]+?)<\/a>/i);
    if (!headingLink) continue;

    const url = headingLink[1];
    const title = decodeHtmlEntities(stripHtmlTags(headingLink[2])).trim();
    if (!title || title.length < 3 || seenUrls.has(url)) continue;
    if (/\/(tag|category|categorie|auteur|author|page)\//.test(url)) continue;
    if (!urlLooksLikeRecipe(url)) continue;

    const imgMatch =
      block.match(/data-src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i) ||
      block.match(/src="(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/i);
    const thumbnail = imgMatch?.[1] || "";

    seenUrls.add(url);
    results.push({ title, url, thumbnail, channel: channelName, channelId, description: "", time: "" });
  }

  // Many sites (Miljuschka, refreshed WP themes) no longer emit search hits inside <article>.
  if (results.length === 0) {
    const extra = parseWpSearchAnchorFallback(html, baseUrl, channelName, channelId, Math.max(Number(count) || 12, 12));
    for (const row of extra) {
      const u = row?.url || "";
      if (!u || seenUrls.has(u)) continue;
      seenUrls.add(u);
      results.push(row);
      if (results.length >= Math.max(Number(count) || 12, 24)) break;
    }
  }

  return results;
}

function parseReaderSearchResults(markdown, channelName, channelId, count, query, options = {}) {
  const results = [];
  const seenUrls = new Set();
  const text = String(markdown || "");

  const normalizeThumb = (raw) => {
    const rawThumb = String(raw || "");
    const extractedThumbRaw =
      rawThumb.match(/https?:\/\/[^\s]+?\.(?:jpe?g|png|webp)(?:\?[^\s\)]*)?/i)?.[0] || rawThumb;
    const extractedThumb = extractedThumbRaw.replace(/[)\]]+$/g, "");
    return cleanImageUrl(extractedThumb.replace(/\s+/g, ""));
  };

  // Pattern A: [![alt](img)](url)
  // Allow parentheses inside img URLs by matching until the `)` before `](`.
  const linkedImages = [...text.matchAll(/\[!\[([^\]]*)\]\((https?:\/\/[\s\S]*?)\)\]\((https?:\/\/[^)\s]+)\)/gi)];
  for (let i = 0; i < linkedImages.length && results.length < count; i += 1) {
    const match = linkedImages[i];
    const alt = decodeHtmlEntities(match[1] || "").replace(/^Image\s+\d+:\s*/i, "").trim();
    const thumbnail = normalizeThumb(match[2]);
    const url = sanitizeText(match[3] || "");
    if (!alt || !url || seenUrls.has(url)) continue;
    if (thumbnail && (/\.svg(?:\?|$)/i.test(thumbnail) || isDecorativeImageUrl(thumbnail))) continue;
    if (!urlLooksLikeRecipe(url)) continue;

    const title = sanitizeText(alt);
    if (!title || !titleLooksLikeRecipe(title) || !channelSearchResultTitleMatchesQuery(channelId, title, query, options)) continue;

    seenUrls.add(url);
    results.push({ title, url, thumbnail, channel: channelName, channelId, description: "", time: "" });
  }

  // Pattern B: ![alt](img) ... later in same bullet/paragraph a recipe URL appears.
  if (results.length === 0) {
    const imageOnly = [...text.matchAll(/!\[([^\]]*)\]\((https?:\/\/[\s\S]*?)\)(?=\s)/gi)];
    for (let i = 0; i < imageOnly.length && results.length < count; i += 1) {
      const match = imageOnly[i];
      const alt = decodeHtmlEntities(match[1] || "").replace(/^Image\s+\d+:\s*/i, "").trim();
      const thumbnail = normalizeThumb(match[2]);
      if (!alt) continue;
      if (thumbnail && (/\.svg(?:\?|$)/i.test(thumbnail) || isDecorativeImageUrl(thumbnail))) continue;

      const start = (match.index || 0) + match[0].length;
      const nearby = text.slice(start, start + 1200);
      const urlMatch = nearby.match(/https?:\/\/[^\s\)]+/i);
      const url = sanitizeText(urlMatch?.[0] || "");
      const title = sanitizeText(alt);
      if (!url || seenUrls.has(url)) continue;
      if (!urlLooksLikeRecipe(url) || !titleLooksLikeRecipe(title) || !channelSearchResultTitleMatchesQuery(channelId, title, query, options)) continue;

      seenUrls.add(url);
      results.push({ title, url, thumbnail, channel: channelName, channelId, description: "", time: "" });
    }
  }

  // Pattern C: last resort — just pull recipe URLs and derive a title.
  if (results.length === 0) {
    const urlMatches = [...text.matchAll(/https?:\/\/[^\s\)]+/gi)];
    for (const m of urlMatches) {
      if (results.length >= count) break;
      const url = sanitizeText(m[0] || "");
      if (!url || seenUrls.has(url) || !urlLooksLikeRecipe(url)) continue;
      const slug = (() => {
        try { return new URL(url).pathname.split("/").filter(Boolean).pop() || ""; } catch { return ""; }
      })();
      const title = sanitizeText(decodeURIComponent(slug).replace(/[-_]+/g, " ").trim());
      if (!title || !titleLooksLikeRecipe(title) || !channelSearchResultTitleMatchesQuery(channelId, title, query, options))
        continue;
      seenUrls.add(url);
      results.push({ title, url, thumbnail: "", channel: channelName, channelId, description: "", time: "" });
    }
  }

  return results
    .sort((a, b) => titleQueryScore(b.title, query) - titleQueryScore(a.title, query))
    .slice(0, count);
}


function sanitizeCulySearchTitle(raw) {
  let s = sanitizeText(decodeHtmlEntities(stripHtmlTags(String(raw || "")))).trim();
  // Strip leading editorial/category + Dutch-style dates like "8 mrt 2026 , 16:00"
  s = s.replace(/^(?:recepten|homemade|culy kids|culy)\b[^\n]{0,120}?\n?/i, "").trim();
  s = s.replace(/^(?:[^\n]{0,60}?\s+)?\d{1,2}\s+[a-zà-ž]{3,15}\s+\d{4}\s*,?\s*\d{1,2}:\d{2}\s*/i, "").trim();
  s = s.replace(/^(?:\d{1,2}\s+[a-zà-ž]{3,15}\s+\d{4}\s*,?\s*)?(?:\d{1,2}:\d{2}\s*)?/i, "").trim();
  s = s.replace(/^[,;:\s]+/, "").trim();
  return s;
}

function normalizeCulyThumbnailUrl(raw, baseUrl = "https://www.culy.nl") {
  let s = cleanImageUrl(String(raw || "").trim());
  if (!s) return "";
  s = decodeHtmlEntities(s).replace(/[)\]]+$/g, "").trim();

  // Protocol-relative URLs: //img.culy.nl/...
  if (s.startsWith("//")) s = `https:${s}`;
  // Prefer https always.
  if (/^http:\/\//i.test(s)) s = s.replace(/^http:/i, "https:");

  // Relative URLs: /wp-content/... or wp-content/...
  if (!/^https:\/\//i.test(s)) {
    try {
      s = new URL(s, baseUrl).toString();
    } catch {
      return "";
    }
  }

  if (!/^https:\/\//i.test(s)) return "";
  if (/\.svg(?:\?|$)/i.test(s) || isDecorativeImageUrl(s)) return "";
  return s;
}

function pickCulyResultTitle(headingRaw, anchorRaw) {
  const h = sanitizeCulySearchTitle(headingRaw);
  const a = sanitizeCulySearchTitle(anchorRaw);
  if (/^recepten\b/i.test(String(headingRaw || "")) && /\d{4}/.test(String(headingRaw || "")) && a.length > 6) return a;
  if (h.length >= 8) return h;
  return a || h;
}

/**
 * Parse Culy.nl HTML search results: anchors to `/recepten/<slug>/`, deduped by URL.
 * Title: nearest preceding h1–h4 text, else anchor text, else slug words.
 */
function parseCulySearchHtml(html, baseUrl, channelName, channelId, count) {
  const results = [];
  const seen = new Set();
  const base = sanitizeText(baseUrl || "").replace(/\/$/, "") || "https://www.culy.nl";
  const max = Math.min(Math.max(Number(count) || 12, 1), 48);
  const re = /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (results.length >= max) break;
    const hrefRaw = m[1];
    const inner = m[2] || "";
    if (!/\/recepten\//i.test(hrefRaw)) continue;

    let abs;
    try {
      abs = new URL(hrefRaw, base).href.split("#")[0];
    } catch {
      continue;
    }

    let host;
    try {
      host = new URL(abs).hostname.toLowerCase().replace(/^www\./, "");
    } catch {
      continue;
    }
    if (host !== "culy.nl") continue;

    try {
      const u = new URL(abs);
      const pathname = u.pathname.replace(/\/+$/, "") || "/";
      if (pathname === "/" || pathname === "") continue;
      const segments = pathname.split("/").filter(Boolean);
      const ri = segments.indexOf("recepten");
      if (ri === -1 || segments.length < ri + 2) continue;
    } catch {
      continue;
    }

    const dedupeKey = abs.replace(/^http:/i, "https:").replace(/\/+$/, "").toLowerCase();
    if (seen.has(dedupeKey)) continue;

    const idx = m.index || 0;
    const before = html.slice(Math.max(0, idx - 1400), idx);
    let headingRaw = "";
    const headings = [...before.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)];
    if (headings.length) {
      headingRaw = headings[headings.length - 1][1];
    }
    let title = pickCulyResultTitle(headingRaw, inner);
    if (!title || title.length < 3) {
      try {
        const slug = new URL(abs).pathname.split("/").filter(Boolean).pop() || "";
        title = sanitizeText(decodeURIComponent(slug).replace(/[-_]+/g, " ")).trim();
      } catch {
        title = "";
      }
    }

    let thumbnail = "";
    // Prefer an image inside the anchor itself (common for card markup).
    const innerImgMatch =
      inner.match(/srcset\s*=\s*["']([^"']+)["']/i) ||
      inner.match(/data-srcset\s*=\s*["']([^"']+)["']/i) ||
      inner.match(/data-src\s*=\s*["']([^"']+)["']/i) ||
      inner.match(/src\s*=\s*["']([^"']+)["']/i);

    if (innerImgMatch?.[1]) {
      const raw = innerImgMatch[0].toLowerCase().includes("srcset")
        ? (String(innerImgMatch[1]).split(",").pop() || "").trim().split(/\s+/)[0]
        : innerImgMatch[1];
      thumbnail = normalizeCulyThumbnailUrl(raw, base);
    }

    // Otherwise, look just before the link (some themes place the image ahead of the anchor text).
    if (!thumbnail) {
      const imgSlice = before.slice(Math.max(0, before.length - 1400));
      const imgMatch =
        imgSlice.match(/srcset\s*=\s*["']([^"']+)["']/i) ||
        imgSlice.match(/data-srcset\s*=\s*["']([^"']+)["']/i) ||
        imgSlice.match(/data-src\s*=\s*["']([^"']+)["']/i) ||
        imgSlice.match(/src\s*=\s*["']([^"']+)["']/i);
      if (imgMatch?.[1]) {
        const raw = imgMatch[0].toLowerCase().includes("srcset")
          ? (String(imgMatch[1]).split(",").pop() || "").trim().split(/\s+/)[0]
          : imgMatch[1];
        thumbnail = normalizeCulyThumbnailUrl(raw, base);
      }
    }

    seen.add(dedupeKey);
    results.push({
      title,
      url: abs,
      thumbnail,
      channel: channelName,
      channelId,
      description: "",
      time: "",
    });
  }
  return results;
}

function finalizeCulySearchResults(rows, query, cap, options = {}) {
  const limit = Math.min(Math.max(Number(cap) || 12, 1), 24);
  const deduped = [];
  const byKey = new Map();
  for (const r of rows || []) {
    if (!r?.url) continue;
    let key;
    try {
      const u = new URL(r.url);
      key = `${u.hostname.replace(/^www\./i, "")}${u.pathname.replace(/\/$/, "")}`.toLowerCase();
    } catch {
      key = String(r.url);
    }
    if (byKey.has(key)) continue;
    byKey.set(key, true);
    deduped.push(r);
  }

  return deduped
    .filter((r) => r.title && r.url)
    .filter((r) => urlLooksLikeRecipe(r.url))
    .filter((r) => titleLooksLikeRecipe(r.title))
    .filter((r) => !isLikelyBlogPage(r.title, r.url, r.description))
    .filter((r) => channelSearchResultTitleMatchesQuery(r.channelId, r.title, query, options))
    .sort((a, b) => titleQueryScore(b.title, query) - titleQueryScore(a.title, query))
    .slice(0, limit);
}

/**
 * Culy channel search: direct HTML, then r.jina.ai passthrough (https origin preferred) when blocked or empty parse.
 */
async function searchCulyRecipes(query, count = 12, opts = {}) {
  const channelName = "Culy";
  const channelId = "ch-culy";
  const eff = opts && typeof opts === "object" ? opts : {};
  const template =
    sanitizeText(eff.searchUrlTemplate || "") ||
    SEED_CHANNEL_DEFAULTS["ch-culy"]?.searchUrlTemplate ||
    "https://www.culy.nl/?s={q}&category=Recepten";
  const baseUrl = sanitizeText(eff.baseUrl || "") || "https://www.culy.nl";
  const searchUrl = buildSeedSearchUrlFromTemplate(template, query);
  if (!searchUrl) return [];
  const matchOptions = { relaxedQueryMatch: shouldRelaxQueryTitleMatch(eff) };

  const qEnc = encodeURIComponent(query || "");
  const httpsOrigin = `https://www.culy.nl/?s=${qEnc}&category=Recepten`;
  const httpOrigin = `http://www.culy.nl/?s=${qEnc}&category=Recepten`;
  const cap = Math.min(Math.max(Number(count) || 12, 1), 24);

  async function fetchCulyOgImage(recipeUrl) {
    const target = sanitizeText(recipeUrl || "");
    if (!target) return "";
    try {
      const response = await fetch(target, {
        headers: {
          ...FETCH_HEADERS,
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "nl-NL,nl;q=0.9,en;q=0.8",
          referer: "https://www.culy.nl/",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(2200),
      });
      if (!response.ok) return "";
      const html = await response.text();
      if (!html || html.length < 200) return "";
      const og = parseMetaTag(html, "og:image") || parseMetaTag(html, "twitter:image", "name") || "";
      return normalizeCulyThumbnailUrl(og, "https://www.culy.nl");
    } catch {
      return "";
    }
  }

  async function maybeHydrateMissingThumbnails(results) {
    const rows = Array.isArray(results) ? results : [];
    const missing = rows.filter((r) => r && r.url && !r.thumbnail);
    if (!missing.length) return rows;

    // Avoid lots of requests: cap to first few missing thumbnails.
    const capN = Math.min(3, missing.length);
    const settle = await Promise.allSettled(missing.slice(0, capN).map((r) => fetchCulyOgImage(r.url)));
    const byUrl = new Map();
    settle.forEach((s, i) => {
      if (s.status === "fulfilled" && s.value) byUrl.set(missing[i].url, s.value);
    });
    if (!byUrl.size) return rows;

    return rows.map((r) => {
      if (!r || r.thumbnail) return r;
      const thumb = byUrl.get(r.url) || "";
      return thumb ? { ...r, thumbnail: thumb } : r;
    });
  }

  async function fetchDirectHtml() {
    try {
      const response = await fetch(searchUrl, {
        headers: {
          ...FETCH_HEADERS,
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "nl-NL,nl;q=0.9,en;q=0.8",
          referer: `${baseUrl.replace(/\/$/, "")}/`,
        },
        redirect: "follow",
        signal: AbortSignal.timeout(4500),
      });
      if (!response.ok) return { html: "", blocked: true };
      const html = await response.text();
      if (!html || html.length < 400) return { html: "", blocked: true };
      if (looksLikeBlockedSocialHtml(searchUrl, html)) return { html: "", blocked: true };
      return { html, blocked: false };
    } catch {
      return { html: "", blocked: true };
    }
  }

  async function fetchJinaMarkdown(readerUrl, timeoutMs) {
    try {
      const response = await fetch(readerUrl, {
        headers: { ...FETCH_HEADERS, ...jinaReaderAuthHeaders() },
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) return "";
      const body = await response.text();
      return body && body.length > 40 ? body : "";
    } catch {
      return "";
    }
  }

  async function parseJinaBody(body) {
    const htmlTry = finalizeCulySearchResults(
      parseCulySearchHtml(body, baseUrl, channelName, channelId, cap * 2),
      query,
      cap,
      matchOptions
    );
    if (htmlTry.length) return htmlTry;
    const mdTry = finalizeCulySearchResults(
      parseCulyReaderSearchResults(body, channelName, channelId, cap * 2, query, matchOptions),
      query,
      cap,
      matchOptions
    );
    return mdTry.length ? mdTry : [];
  }

  const direct = await fetchDirectHtml();
  let parsed =
    direct.html && direct.html.length > 500
      ? finalizeCulySearchResults(
          parseCulySearchHtml(direct.html, baseUrl, channelName, channelId, cap * 2),
          query,
          cap,
          matchOptions
        )
      : [];

  const needJina = direct.blocked || parsed.length === 0;
  if (!needJina) return await maybeHydrateMissingThumbnails(parsed);

  const jinaHttps = `https://r.jina.ai/${httpsOrigin}`;
  const jinaHttp = `https://r.jina.ai/${httpOrigin}`;

  let body = await fetchJinaMarkdown(jinaHttps, 9500);
  let jinaParsed = body ? await parseJinaBody(body) : [];
  if (jinaParsed.length) return await maybeHydrateMissingThumbnails(jinaParsed);

  body = await fetchJinaMarkdown(jinaHttp, 7500);
  jinaParsed = body ? await parseJinaBody(body) : [];
  if (jinaParsed.length) return await maybeHydrateMissingThumbnails(jinaParsed);
  return await maybeHydrateMissingThumbnails(parsed);
}


function parseCulyReaderSearchResults(markdown, channelName, channelId, count, query, options = {}) {
  const text = String(markdown || "");
  const results = [];
  const seen = new Set();
  const q = sanitizeText(query || "");

  // Extract distinct recipe URLs in-order (keep indices so we can look around).
  const urlMatches = [...text.matchAll(/https?:\/\/(?:www\.)?culy\.nl\/recepten\/[^\s\)]+/gi)];
  const urls = [];
  for (const m of urlMatches) {
    const url = sanitizeText(m[0] || "");
    if (!url || seen.has(url)) continue;
    seen.add(url);
    urls.push({ url, index: m.index || 0 });
    if (urls.length >= Math.max(12, count * 4)) break;
  }

  const decodeTitle = (raw) => {
    const cleaned = String(raw || "")
      // Common Jina pattern: `Title](https://...)`
      .replace(/\]\(\s*https?:\/\/[^\)]+\s*\)\s*$/i, "")
      .replace(/\]\(\s*https?:\/\/[^\)]+\s*\)/gi, "")
      .replace(/^\[+/, "")
      .replace(/\]+$/, "");
    return sanitizeText(decodeHtmlEntities(stripHtmlTags(cleaned))).trim();
  };

  const findNearestTitle = (idx) => {
    const start = Math.max(0, idx - 1200);
    const block = text.slice(start, idx + 200);

    // Culy Jina pages frequently contain `### <title>` near the recipe card.
    const headings = [...block.matchAll(/###\s+([^\n#][^\n]{3,180})/g)];
    if (headings.length) return decodeTitle(headings[headings.length - 1][1]);

    // Or a markdown image alt: `![Image 1: <title>](...)`
    const alts = [...block.matchAll(/!\[Image\s+\d+:\s*([^\]]{3,220})\]/gi)];
    if (alts.length) return decodeTitle(alts[alts.length - 1][1]);

    return "";
  };

  const findNearestThumbnail = (idx) => {
    const start = Math.max(0, idx - 1600);
    const block = text.slice(start, idx + 100);

    // Prefer markdown image syntax: ![alt](url) — common in Jina reader cards.
    const mdImgs = [...block.matchAll(/!\[[^\]]*\]\(([^)\s]+)[^\)]*\)/g)];
    if (mdImgs.length) {
      const raw = mdImgs[mdImgs.length - 1][1] || "";
      return normalizeCulyThumbnailUrl(raw, "https://www.culy.nl");
    }

    // Fallback: any nearby image-like URL (including protocol-relative //...).
    const imgs = [...block.matchAll(/(?:https?:\/\/|\/\/)[^\s\)]+?\.(?:jpe?g|png|webp)(?:\?[^\s\)]*)?/gi)];
    const last = imgs.length ? imgs[imgs.length - 1][0] : "";
    return normalizeCulyThumbnailUrl(last, "https://www.culy.nl");
  };

  for (const u of urls) {
    if (results.length >= count) break;
    const url = u.url;
    const title = findNearestTitle(u.index) || (() => {
      try {
        const slug = new URL(url).pathname.split("/").filter(Boolean).pop() || "";
        return decodeTitle(decodeURIComponent(slug).replace(/[-_]+/g, " "));
      } catch {
        return "";
      }
    })();

    if (!title) continue;
    if (!urlLooksLikeRecipe(url) || !titleLooksLikeRecipe(title) || !channelSearchResultTitleMatchesQuery(channelId, title, q, options)) continue;
    const thumbnail = findNearestThumbnail(u.index);

    results.push({ title, url, thumbnail, channel: channelName, channelId, description: "", time: "" });
  }

  return results
    .sort((a, b) => titleQueryScore(b.title, q) - titleQueryScore(a.title, q))
    .slice(0, count);
}

async function readerSearchFallback(searchUrl, channelName, channelId, count, query, options = {}) {
  try {
    const target = String(searchUrl || "").trim();
    if (!target) return [];
    const readerUrl = `https://r.jina.ai/${encodeURIComponent(target)}`;
    const response = await fetch(readerUrl, {
      headers: { ...FETCH_HEADERS, ...jinaReaderAuthHeaders() },
      signal: AbortSignal.timeout(14000),
    });
    if (!response.ok) return [];

    const markdown = await response.text();
    if (channelId === "ch-culy") {
      const parsed = parseCulyReaderSearchResults(markdown, channelName, channelId, count, query || "", options);
      if (parsed.length) return parsed;
    }
    return parseReaderSearchResults(markdown, channelName, channelId, count, query || "", options);
  } catch {
    return [];
  }
}

/** WP REST API fallback — returns results mapped to our format. */
// URL patterns that strongly suggest a non-recipe (blog/article/tip/news) post
const BLOG_POST_URL_RE = /\/(blog|artikel|artikelen|nieuws|tips?|advies|inspiratie|over-ons|contact|vacature|actie|winactie|review|test|colofon|interviews?|winnen|video|videos|podcast|categorie|category|tag|author|auteur|page|zoeken|search|webshop|shop|product|cadeau|aanbieding|kookboek)\//i;
// URL patterns that strongly suggest a recipe post
const RECIPE_URL_RE = /\/(recept|recepten|recipe|recipes|gerecht|gerechten|bakken|koken|lekker|snack|ontbijt|lunch|diner|avondeten|dessert|taart|cake|soep|salade|pasta|vlees|vis|vegetarisch|vegan|borrelhap|hapje|saus|dressing)\//i;
// Title keywords that strongly suggest a non-recipe post (opinion / list / guide).
const BLOG_TITLE_RE = /\b(tips?|review|gids|uitleg|interview|podcast|blog|nieuws|aankondiging|aanbieding|webshop|kookboek|artikel|weekmenu|week\s*menu|wat\s+is|waarom|zo\s+doe\s+je|10\s+x\b|\d+\s+keer\b)\b/i;

function isLikelyBlogPage(title, url, description = "") {
  const t = sanitizeText(String(title || "")).trim();
  const u = String(url || "").trim();
  const d = sanitizeText(String(description || "")).trim();

  // If URL is explicitly recipe-like, keep it (safer than dropping valid recipes).
  if (u && RECIPE_URL_RE.test(u)) return false;

  // Strong negative indicators.
  if ((u && BLOG_POST_URL_RE.test(u)) || (t && BLOG_TITLE_RE.test(t))) return true;

  const combined = `${t} ${d}`.trim();
  if (!combined) return false;

  // Listicle heuristics: "10x beste ...", "5 keer tips ...", "top 10 ...".
  // Avoid removing real recipes like "10-minuten pasta" (no x/keer + listicle words combo).
  const hasListicleCount = /\b\d+\s*(?:x|keer)\b/i.test(combined) || /\btop\s*\d+\b/i.test(combined);
  const hasListicleWords = /\b(beste|lekkerste|tips?|idee[eë]n|inspiratie|lijst|top)\b/i.test(combined);
  if (hasListicleCount && hasListicleWords) return true;

  // Spam: long runs.
  if (/(.)\1{5,}/i.test(t)) return true;

  // Spam: low character diversity.
  if (t.length >= 14) {
    const stripped = t.toLowerCase().replace(/\s+/g, "");
    const unique = new Set(stripped.split("")).size;
    const diversity = unique / Math.max(1, stripped.length);
    if (diversity > 0 && diversity < 0.32) return true;
  }

  // Spam: repeated tokens.
  const tokens = t
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length >= 3 && !/^\d+$/.test(w));
  if (tokens.length >= 5) {
    const counts = new Map();
    for (const tok of tokens) counts.set(tok, (counts.get(tok) || 0) + 1);
    const maxCount = Math.max(...counts.values());
    if (maxCount / tokens.length >= 0.6) return true;
  }

  return false;
}

// ── In-memory caches ──────────────────────────────────────────────────────────
// Simple per-process cache to keep channel search snappy for repeated queries.
// This resets on deploy/restart (fine for our use-case). Longer TTL = sneller bij herhaalde termen
// (lege resultaten worden sowieso niet gecached).
const CHANNEL_SEARCH_CACHE_TTL_MS = 15 * 60_000;
const CHANNEL_SEARCH_CACHE_MAX_ENTRIES = 250;
const channelSearchCache = new Map(); // key -> { at:number, results:any[] }

/** Succesvolle JSON-LD-rating per recept-URL (enrich); verlaagt dubbele fetches. */
const RECIPE_RATING_LD_CACHE_TTL_MS = 2 * 60 * 60 * 1000;
const RECIPE_RATING_LD_CACHE_MAX_ENTRIES = 600;
const recipeRatingLdCache = new Map(); // normalizedUrl -> { at, value }

/** Cumulatieve statistieken JSON-LD enrich (per hostname, voor logs/monitoring). */
const ratingEnrichHostStats = new Map();

// Public SEO recipes index: fast, in-memory search helper.
const SEO_RECIPE_SEARCH_CACHE_TTL_MS = 2 * 60_000;
const seoRecipeSearchCache = new Map(); // origin -> { at:number, entries:any[] }

/** Admin SEO-recepten backfill: async job-status (in-memory; herstart wist jobs). */
const seoBackfillJobStore = new Map();
const SEO_BACKFILL_JOB_TTL_MS = 2 * 60 * 60 * 1000;

function pruneSeoBackfillJobs() {
  const now = Date.now();
  for (const [id, job] of seoBackfillJobStore) {
    if (now - (job.createdAt || 0) > SEO_BACKFILL_JOB_TTL_MS) seoBackfillJobStore.delete(id);
  }
}

function getChannelSearchCacheKey({ query, allowedChannels, customChannelsParam }) {
  const q = String(query || "").trim().toLowerCase();
  let channels;
  if (allowedChannels === null) {
    channels = "*";
  } else if (Array.isArray(allowedChannels)) {
    channels = allowedChannels.length
      ? [...allowedChannels].map((s) => String(s || "").trim()).filter(Boolean).sort().join(",")
      : "∅";
  } else {
    channels = "*";
  }
  const custom = String(customChannelsParam || "").trim();
  // Bump when API-resultaatscherm wijzigt (bijv. ratingvelden) — oude cache mist die velden.
  const schema = "cs-v8";
  return `${q}||${channels}||${custom}||${schema}`;
}

/**
 * Ingelogd: zoek alleen op seed- en customkanalen uit het account (volgen + niet rejected + admin enabled).
 * Niet ingelogd: queryparameters blijven gelden; seed-IDs worden tegen SEED_CHANNEL_DEFAULTs gevalideerd.
 */
async function resolveAllowedChannelSearchForRequest(authUser, channelsParamPresent, channelsParam, customChannelsParamRaw) {
  if (authUser) {
    const globalCustom = await getGlobalCustomChannels().catch(() => []);
    const appState = withGlobalCustomChannels(buildAppStateFromUser(authUser), globalCustom);
    const channelEnabled = await getChannelEnabledState();
    const followed = Array.isArray(appState.followedChannelIds)
      ? appState.followedChannelIds.map((id) => sanitizeText(id)).filter(Boolean)
      : [];
    const allowedSeedIds = followed.filter(
      (id) => Boolean(SEED_CHANNEL_DEFAULTS[id]) && isChannelEnabled("seed", id, channelEnabled)
    );
    const customList = (Array.isArray(appState.customChannels) ? appState.customChannels : []).filter((ch) => {
      const id = sanitizeText(ch?.id || "");
      if (!id || !followed.includes(id)) return false;
      if (String(ch?.status || "approved") === "rejected") return false;
      return isChannelEnabled("custom", id, channelEnabled);
    });
    const customChannelsParam = customList
      .map((ch) => {
        const id = sanitizeText(ch.id || "");
        const name = sanitizeText(ch.name || "").slice(0, 80);
        const url = sanitizeText(ch.url || "").slice(0, 500);
        if (!id || !name || !url) return "";
        return `${id}|${name}|${url}`;
      })
      .filter(Boolean)
      .join(",");
    return { allowedChannels: allowedSeedIds, customChannelsParam };
  }

  const rawCustom = String(customChannelsParamRaw || "").trim();
  let allowedChannels = channelsParamPresent
    ? channelsParam.split(",").map((s) => s.trim()).filter(Boolean)
    : null;
  if (Array.isArray(allowedChannels)) {
    allowedChannels = allowedChannels.filter((id) => Boolean(SEED_CHANNEL_DEFAULTS[sanitizeText(id)]));
  }
  return { allowedChannels, customChannelsParam: rawCustom };
}

function getCachedChannelSearch(key) {
  const entry = channelSearchCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.at > CHANNEL_SEARCH_CACHE_TTL_MS) {
    channelSearchCache.delete(key);
    return null;
  }
  return entry.results || [];
}

function setCachedChannelSearch(key, results) {
  channelSearchCache.set(key, { at: Date.now(), results: Array.isArray(results) ? results : [] });
  if (channelSearchCache.size <= CHANNEL_SEARCH_CACHE_MAX_ENTRIES) return;
  // Prune oldest entries (very small + cheap)
  const entries = [...channelSearchCache.entries()].sort((a, b) => a[1].at - b[1].at);
  const toRemove = Math.max(0, entries.length - CHANNEL_SEARCH_CACHE_MAX_ENTRIES);
  for (let i = 0; i < toRemove; i++) channelSearchCache.delete(entries[i][0]);
}

function inferSeedChannelIdFromSourceUrl(sourceUrl) {
  const raw = sanitizeText(sourceUrl || "");
  if (!raw) return "";
  let host = "";
  try {
    host = new URL(raw).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
  for (const [id, cfg] of Object.entries(SEED_CHANNEL_DEFAULTS || {})) {
    const base = sanitizeText(cfg?.baseUrl || "");
    if (!base) continue;
    try {
      const baseHost = new URL(base).hostname.replace(/^www\./i, "").toLowerCase();
      if (baseHost && host === baseHost) return sanitizeText(id);
    } catch {
      // ignore
    }
  }
  return "";
}

async function listPublicSeoRecipesCached(origin) {
  const o = sanitizeText(origin || "");
  if (!o) return await listPublicSeoRecipes(origin);
  const entry = seoRecipeSearchCache.get(o);
  if (entry && Date.now() - entry.at <= SEO_RECIPE_SEARCH_CACHE_TTL_MS && Array.isArray(entry.entries)) {
    return entry.entries;
  }
  const entries = await listPublicSeoRecipes(origin);
  seoRecipeSearchCache.set(o, { at: Date.now(), entries });
  return entries;
}

function searchPublicSeoRecipesLocal({ entries, query, allowedChannels, limit }) {
  const q = sanitizeText(query || "").trim().toLowerCase();
  if (!q || q.length < 2) return [];
  const words = q.split(/\s+/).map((w) => w.trim()).filter(Boolean).slice(0, 6);
  const cap = Math.min(60, Math.max(1, Number(limit) || 18));

  const allowAllSeeds = allowedChannels === null;
  const allowNoneSeeds = Array.isArray(allowedChannels) && allowedChannels.length === 0;
  const allowedSet = Array.isArray(allowedChannels) ? new Set(allowedChannels.map((s) => sanitizeText(s)).filter(Boolean)) : null;

  if (allowNoneSeeds) return [];

  const scored = [];
  for (const e of Array.isArray(entries) ? entries : []) {
    const r = e?.recipe || {};
    const title = sanitizeText(r.title || "");
    if (!title) continue;
    const channelId = sanitizeText(e.channelId || "");
    if (!allowAllSeeds && allowedSet && channelId && !allowedSet.has(channelId)) continue;
    if (!allowAllSeeds && allowedSet && !channelId) continue;

    const hay = `${title} ${sanitizeText(r.mealTag || "")}`.toLowerCase();
    let ok = hay.includes(q);
    if (!ok && words.length) {
      ok = words.every((w) => hay.includes(w));
    }
    if (!ok) continue;

    // naive score: exact phrase > all words > partial
    const score = hay.includes(q) ? 3 : 2;
    scored.push({ score, e });
  }
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, cap).map(({ e }) => {
    const r = e.recipe || {};
    const channelId = sanitizeText(e.channelId || "") || "plately";
    return {
      url: e.urlPath,
      title: sanitizeText(r.title || ""),
      thumbnail: sanitizeText(r.image || ""),
      channelId,
      channel: channelId === "plately" ? "Plately" : getSeedChannelName(channelId),
      time: sanitizeText(r.time || ""),
      sourceUrl: sanitizeText(r.sourceUrl || ""),
      _source: "plately",
    };
  });
}

/**
 * Returns true when a WP post URL looks like a recipe (not a blog/tip/news article).
 * - If the URL matches a known-recipe pattern → keep
 * - If the URL matches a known-blog pattern → drop
 * - Otherwise → keep (safer than dropping valid recipes)
 */
function urlLooksLikeRecipe(url) {
  if (isAhAllerhandeUrl(url)) return isAhAllerhandeRecipeUrl(url);
  if (RECIPE_URL_RE.test(url)) return true; // explicit recipe path → keep
  if (BLOG_POST_URL_RE.test(url)) return false; // explicit blog path → drop
  return true; // keep by default
}

function isAhAllerhandeUrl(url) {
  try {
    const u = new URL(String(url || ""));
    return /(^|\.)ah\.nl$/i.test(u.hostname) && /^\/allerhande\//i.test(u.pathname);
  } catch {
    return false;
  }
}

function isAhAllerhandeRecipeUrl(url) {
  try {
    const u = new URL(String(url || ""));
    if (!/(^|\.)ah\.nl$/i.test(u.hostname)) return false;
    return /^\/allerhande\/recept\/r-r\d+\/[^/?#]+\/?$/i.test(u.pathname);
  } catch {
    return false;
  }
}

/**
 * Returns true when the title looks like a recipe (not a tip/review/guide post).
 * Improved to also look for positive recipe indicators.
 */
function titleLooksLikeRecipe(title) {
  if (!title) return true;

  // Strong positive indicators for recipes
  const recipeKeywords = /\b(?:recept|recipe|maken|bereid|bak|ingredient|snelle|makkelijke|gezonde|eenvoudige|lekker|vers|huisgemaakte|homemade|how\s+to\s+make|how\s+to\s+bake|voor|met|soep|pizza|pasta|diner|ontbijt|tart|cake|koekje|cookies?)\b/i;

  // If it has strong recipe keywords, it's likely a recipe
  if (recipeKeywords.test(title)) {
    return true;
  }

  // Otherwise check if it fails the blog pattern test
  return !BLOG_TITLE_RE.test(title);
}

/**
 * Returns a score 0..1 for how well the title matches the query.
 *  - 1.0 → all 3+-letter query words appear in the title
 *  - 0.5 → at least half of them appear
 *  - 0.0 → none appear
 * Use threshold 0.5 to keep results that share most key terms.
 * Bonus points for exact phrase matches and word order.
 */
function titleQueryScore(title, query) {
  if (!title || !query) return 1; // can't determine — pass
  const t = title.toLowerCase();
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
  if (!words.length) return 1;

  const escWords = words.map((w) => String(w || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  // Strict whole-word hits
  let hits = escWords.filter((ew, i) => new RegExp(`\\b${ew}\\b`, "i").test(t)).length;
  // Dutch compounds: „pastasaus”, „pastarecept” voor querywoord „pasta”
  if (hits / words.length < 0.5) {
    const prefixHits = escWords.filter((ew) => new RegExp(`\\b${ew}`, "i").test(t)).length;
    hits = Math.max(hits, prefixHits);
  }

  const baseScore = hits / words.length;

  // Bonus: exact phrase match (higher confidence)
  if (t.includes(query.toLowerCase())) {
    return Math.min(1, baseScore + 0.3);
  }

  // Bonus: consecutive words appear in order
  const wordsInOrder = words.filter((w, i) => {
    if (i === 0) return t.includes(w);
    const prevWord = words[i - 1];
    const prevIdx = t.indexOf(prevWord);
    const currIdx = t.indexOf(w);
    return prevIdx >= 0 && currIdx > prevIdx;
  }).length;

  if (wordsInOrder > 1) {
    return Math.min(1, baseScore + 0.2);
  }

  return baseScore;
}

function titleMatchesQuery(title, query) {
  // Stricter: at least HALF of the 3+-letter words must hit the title.
  // For single-word queries this still requires a hit.
  return titleQueryScore(title, query) >= 0.5;
}

function shouldRelaxQueryTitleMatch(options) {
  return Boolean(options && (options.relaxedQueryMatch || options.seoBackfill));
}

function channelSearchTrustsSiteIndexer(channelId) {
  const id = String(channelId || "");
  return CHANNEL_SEARCH_TRUST_SITE_INDEXER_IDS.has(id) || id.startsWith("ch-custom-") || id.startsWith("ch-preview-");
}

/** Voor sommige kanalen: site-zoekindex is al relevant — geen verplichte woord-match in de titel. */
function channelSearchResultTitleMatchesQuery(channelId, title, query, options = {}) {
  const q = String(query || "").trim();
  if (!q) return true;
  if (shouldRelaxQueryTitleMatch(options)) return true;
  if (channelSearchTrustsSiteIndexer(channelId)) return true;
  return titleMatchesQuery(String(title || ""), q);
}

function ahSeoBackfillResultMatchesQuery(title, slug, query) {
  const rawWords = String(query || "")
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2);
  if (!rawWords.length) return true;

  const aliasMap = {
    kip: ["kip", "chicken"],
    rijst: ["rijst", "rice"],
  };
  const haystack = `${String(title || "")} ${String(slug || "")}`.toLowerCase();
  const words = rawWords.flatMap((word) => aliasMap[word] || [word]);
  return words.some((word) => haystack.includes(word));
}

async function wpRestSearch(baseUrl, channelName, channelId, query, count, meta = null, options = {}) {
  const params = `search=${encodeURIComponent(query)}&per_page=${count}&_embed=wp:featuredmedia`;
  const headers = { ...FETCH_HEADERS, accept: "application/json" };
  const origins = wordpressOriginVariants(baseUrl);

  function mapWPItem(r) {
    const thumbnail =
      r._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url ||
      r._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
    return {
      title: sanitizeText(decodeHtmlEntities(stripHtmlTags(r.title?.rendered || ""))),
      url: sanitizeText(r.link || ""),
      thumbnail,
      channel: channelName,
      channelId,
      description: sanitizeText(stripHtmlTags(r.excerpt?.rendered || "").slice(0, 140)),
      time: "",
    };
  }

  for (const origin of origins) {
    const root = String(origin || "").replace(/\/+$/, "");
    if (!root) continue;
    for (const type of ["recipe", "recepten", "recipes", "posts"]) {
      try {
        const usedUrl = `${root}/wp-json/wp/v2/${type}?${params}`;
        if (meta && typeof meta === "object" && !meta.usedUrl) meta.usedUrl = usedUrl;
        const resp = await fetch(usedUrl, {
          headers,
          signal: AbortSignal.timeout(6500),
        });
        if (resp.ok) {
          const data = await resp.json();
          const mapped = (Array.isArray(data) ? data : [])
            .map(mapWPItem)
            .filter((r) => r.title && r.url)
            // Filter out blog/non-recipe URLs for all endpoint types
            .filter((r) => urlLooksLikeRecipe(r.url))
            // Filter out posts whose title looks like a tip/review/guide
            .filter((r) => titleLooksLikeRecipe(r.title))
            .filter((r) => !isLikelyBlogPage(r.title, r.url, r.description))
            .filter((r) => channelSearchResultTitleMatchesQuery(channelId, r.title, query, options))
            // Sort by relevance — best title-match first
            .sort((a, b) => titleQueryScore(b.title, query) - titleQueryScore(a.title, query))
            .slice(0, count);
          if (mapped.length > 0) return mapped;
        }
      } catch { /* try next */ }
    }
  }
  return [];
}

/**
 * When a site blocks datacenter IPs (Cloudflare), Google "site:host query" via Serper still returns URLs.
 * API key: https://serper.dev/ — set SERPER_API_KEY or PLATELY_SERP_API_KEY.
 */
async function serperGoogleSiteSearchRecipes({ baseUrl, channelName, channelId, query, count, relaxedQueryMatch = false, force = false }) {
  if (!force && !channelIdUsesSerperFallback(channelId)) return [];
  const apiKey = sanitizeText(process.env.SERPER_API_KEY || process.env.PLATELY_SERP_API_KEY || "").trim();
  if (!apiKey) return [];
  let host = "";
  try {
    host = new URL(baseUrl).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return [];
  }
  if (!host) return [];

  const q = `site:${host} ${String(query || "").trim()}`.trim();
  const num = Math.min(Math.max(Number(count) || 10, 4), 15);
  const cap = Math.min(Math.max(Number(count) || 10, 1), 30);

  try {
    const resp = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": apiKey },
      body: JSON.stringify({ q, num, gl: "nl", hl: "nl" }),
      signal: AbortSignal.timeout(15000),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    const organic = Array.isArray(data.organic) ? data.organic : [];
    // Serper geeft afbeeldingen terug in een apart `images`-array — URL matchen met organische resultaten.
    const serpImages = Array.isArray(data.images) ? data.images : [];
    const imgByUrl = new Map();
    for (const img of serpImages) {
      const link = sanitizeText(img.link || "");
      const imgUrl = sanitizeText(img.imageUrl || img.thumbnailUrl || "");
      if (link && imgUrl) imgByUrl.set(stripBenignMarketingParamsFromUrl(link), imgUrl);
    }
    const rows = [];
    for (const it of organic) {
      const urlRaw = sanitizeText(it.link || it.url || "");
      const title = sanitizeText(it.title || "");
      const description = sanitizeText(it.snippet || "");
      if (!urlRaw || !title) continue;
      const urlNorm = stripBenignMarketingParamsFromUrl(urlRaw);
      const thumbnail =
        imgByUrl.get(urlNorm) ||
        sanitizeText(it.imageUrl || it.thumbnailUrl || it.image || it.img || "");
      let linkHost = "";
      try {
        linkHost = new URL(urlNorm).hostname.replace(/^www\./i, "").toLowerCase();
      } catch {
        continue;
      }
      if (linkHost !== host) continue;
      rows.push({
        title,
        url: urlNorm,
        thumbnail,
        channel: channelName,
        channelId,
        description: description.slice(0, 160),
        time: "",
      });
    }
    const filtered = rows
      .filter((r) => urlLooksLikeRecipe(r.url))
      .filter((r) => titleLooksLikeRecipe(r.title))
      .filter((r) => !isLikelyBlogPage(r.title, r.url, r.description))
      .filter((r) => channelSearchResultTitleMatchesQuery(channelId, r.title, query, { relaxedQueryMatch }))
      .sort((a, b) => titleQueryScore(b.title, query) - titleQueryScore(a.title, query))
      .slice(0, cap);
    return await hydrateMissingSearchThumbnails(filtered, channelId);
  } catch {
    return [];
  }
}

async function fetchSearchResultThumbnail(url, channelId = "") {
  const u = sanitizeText(url || "");
  if (!u) return "";
  if (channelId === "ch-ah" || isAhAllerhandeRecipeUrl(u)) {
    return fetchAhRecipeThumbnail(u);
  }
  try {
    const doc = await fetchWebsiteDocument(u, 0);
    if (doc.kind === "html") {
      const html = String(doc.body || "");
      return cleanImageUrl(
        parseMetaTag(html, "og:image") ||
        parseMetaTag(html, "twitter:image", "name") ||
        ""
      );
    }
    if (doc.kind === "text") {
      return cleanImageUrl(extractFirstImageUrlFromMarkdown(doc.body));
    }
  } catch {
    /* ignore */
  }
  return "";
}

async function hydrateMissingSearchThumbnails(results, channelId = "") {
  const rows = Array.isArray(results) ? results : [];
  const missing = rows.filter((r) => r && r.url && !r.thumbnail).slice(0, 4);
  if (!missing.length) return rows;
  const settled = await Promise.allSettled(missing.map((r) => fetchSearchResultThumbnail(r.url, channelId)));
  const byUrl = new Map();
  settled.forEach((s, idx) => {
    if (s.status === "fulfilled" && s.value) byUrl.set(missing[idx].url, s.value);
  });
  if (!byUrl.size) return rows;
  return rows.map((r) => {
    if (!r || r.thumbnail) return r;
    const thumb = byUrl.get(r.url) || "";
    return thumb ? { ...r, thumbnail: thumb } : r;
  });
}

function channelSearchBackendNote(channelId, resultCount) {
  const n = Number(resultCount || 0);
  if (n > 0) return "";
  if (!channelIdUsesSerperFallback(channelId)) return "";
  const label = channelId === "ch-mj" ? "Miljuschka" : channelId === "ch-ek" ? "Eef Kookt Zo" : "Deze site";
  const serperOn = Boolean(sanitizeText(process.env.SERPER_API_KEY || process.env.PLATELY_SERP_API_KEY || "").trim());
  if (!serperOn) {
    return `${label} blokkeert zoekrequests van servers (bv. Cloudflare). Zet SERPER_API_KEY voor Google site:-zoeken via serper.dev — zie .env.example.`;
  }
  return "Serper heeft geen recepten voor deze combinatie van site en zoekterm (of ze voldoen niet aan de receptfilters).";
}

/**
 * Allerhande-zoek HTML bevat GraphQL/Flight-data met RecipeSummary + RecipeRating.
 * We indexeren op recept-id (r-r…) én op `slug:` + url-pad voor betere match met Jina-links.
 */
function extractAhSearchRatingsFromAllerhandeHtml(html) {
  const map = new Map();
  if (!html || typeof html !== "string" || html.length < 800) return map;
  if (!html.includes("RecipeSummary") || !html.includes("RecipeRating")) return map;

  function put(entryKey, entry) {
    if (!entryKey || !entry) return;
    if (!map.has(entryKey)) map.set(entryKey, entry);
  }

  const rowSlug =
    /\\"__typename\\":\\"RecipeSummary\\",\\"id\\":(\d+),\\"title\\":[\s\S]{0,8000}?\\"slug\\":\\"([^"\\]+)\\"[\s\S]{0,32000}?\\"rating\\":\{\\"__typename\\":\\"RecipeRating\\",\\"average\\":(\d+|null),\\"count\\":(\d+)/g;
  let m;
  while ((m = rowSlug.exec(html)) !== null) {
    const averageRaw = m[3];
    if (averageRaw === "null") continue;
    const ratingValue = Number(averageRaw);
    if (!Number.isFinite(ratingValue) || ratingValue < 1 || ratingValue > 5) continue;
    const ratingCount = Number(m[4]);
    if (!Number.isFinite(ratingCount) || ratingCount < 1) continue;
    const entry = { ratingValue, ratingCount };
    put(`r-r${m[1]}`.toLowerCase(), entry);
    const sl = String(m[2] || "").trim().toLowerCase();
    if (sl) put(`slug:${sl}`, entry);
  }

  if (map.size === 0) {
    const rowLegacy =
      /\\"__typename\\":\\"RecipeSummary\\",\\"id\\":(\d+)[\s\S]{0,32000}?\\"rating\\":\{\\"__typename\\":\\"RecipeRating\\",\\"average\\":(\d+|null),\\"count\\":(\d+)/g;
    while ((m = rowLegacy.exec(html)) !== null) {
      const averageRaw = m[2];
      if (averageRaw === "null") continue;
      const ratingValue = Number(averageRaw);
      if (!Number.isFinite(ratingValue) || ratingValue < 1 || ratingValue > 5) continue;
      const ratingCount = Number(m[3]);
      if (!Number.isFinite(ratingCount) || ratingCount < 1) continue;
      put(`r-r${m[1]}`.toLowerCase(), { ratingValue, ratingCount });
    }
  }

  return map;
}

function decodeEscapedJsonString(value) {
  const raw = String(value || "");
  if (!raw) return "";
  try {
    return JSON.parse(`"${raw.replace(/"/g, '\\"')}"`);
  } catch {
    return raw
      .replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .replace(/\\\//g, "/");
  }
}

function extractAhRecipeSummariesFromAllerhandeHtml(html, query, count) {
  const text = String(html || "");
  if (!text || text.length < 800 || !text.includes("RecipeSummary")) return [];
  const cap = Math.min(Math.max(Number(count) || 4, 1), 40);
  const ratingMap = extractAhSearchRatingsFromAllerhandeHtml(text);
  const out = [];
  const seen = new Set();
  const rowRe = /\\?"__typename\\?"\s*:\s*\\?"RecipeSummary\\?"[\s\S]{0,9000}?\\?"id\\?"\s*:\s*"?(\d+)"?[\s\S]{0,9000}?\\?"title\\?"\s*:\s*\\?"((?:\\\\.|[^"\\]){2,220})\\?"[\s\S]{0,12000}?\\?"slug\\?"\s*:\s*\\?"((?:\\\\.|[^"\\]){2,220})\\?"/g;
  let m;
  while ((m = rowRe.exec(text)) !== null && out.length < cap * 3) {
    const idDigits = String(m[1] || "").trim();
    const title = sanitizeText(decodeEscapedJsonString(m[2] || ""));
    const slug = sanitizeText(decodeEscapedJsonString(m[3] || ""));
    if (!idDigits || !title || !slug) continue;
    const recipeId = `r-r${idDigits}`;
    const url = `https://www.ah.nl/allerhande/recept/${recipeId}/${slug}`;
    const key = url.toLowerCase();
    if (seen.has(key)) continue;
    if (!isAhAllerhandeRecipeUrl(url)) continue;
    if (!ahSeoBackfillResultMatchesQuery(title, slug, query)) continue;
    seen.add(key);
    const ratingEntry = lookupAhSearchRating(ratingMap, url, recipeId);
    out.push({
      title,
      url,
      thumbnail: "",
      channel: "Allerhande",
      channelId: "ch-ah",
      description: "",
      time: "",
      ...(ratingEntry ? { ratingValue: ratingEntry.ratingValue, ratingCount: ratingEntry.ratingCount } : {}),
    });
  }
  return out.slice(0, cap);
}

function extractAhRecipeCardsFromAllerhandeHtml(html, query, count) {
  const text = String(html || "");
  if (!text || text.length < 800) return [];
  const cap = Math.min(Math.max(Number(count) || 4, 1), 40);
  const out = [];
  const seen = new Set();
  const push = (titleRaw, urlRaw, thumbRaw = "") => {
    if (out.length >= cap) return;
    const title = sanitizeText(decodeHtmlEntities(titleRaw || "").replace(/^Recept:\s*/i, ""));
    let url = sanitizeText(decodeHtmlEntities(urlRaw || ""));
    if (!url) return;
    if (url.startsWith("/")) url = `https://www.ah.nl${url}`;
    if (!/^https?:\/\//i.test(url)) return;
    if (!isAhAllerhandeRecipeUrl(url)) return;
    const slug = (() => {
      try {
        return new URL(url).pathname.split("/").filter(Boolean).pop() || "";
      } catch {
        return "";
      }
    })();
    if (!title || !ahSeoBackfillResultMatchesQuery(title, slug, query)) return;
    const key = url.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({
      title,
      url,
      thumbnail: cleanImageUrl(thumbRaw || ""),
      channel: "Allerhande",
      channelId: "ch-ah",
      description: "",
      time: "",
    });
  };

  const itemListRe = /"name"\s*:\s*"([^"]{3,220})"\s*,\s*"url"\s*:\s*"(https:\/\/www\.ah\.nl\/allerhande\/recept\/R-R\d+\/[^"]+)"/g;
  let m;
  while ((m = itemListRe.exec(text)) !== null) push(m[1], m[2]);

  if (out.length < cap) {
    const anchorRe = /<a\b[^>]*\btitle\s*=\s*"Recept:\s*([^"]{3,220})"[^>]*\bhref\s*=\s*"([^"]*\/allerhande\/recept\/R-R\d+\/[^"]+)"[\s\S]{0,1800}?<img\b[^>]*(?:srcSet|srcset)\s*=\s*"([^"]*)"/gi;
    while ((m = anchorRe.exec(text)) !== null) {
      const srcset = pickLargestSrcsetImage(m[3] || "");
      push(m[1], m[2], srcset);
    }
  }

  return out.slice(0, cap);
}

function lookupAhSearchRating(ratingMap, url, recipeId) {
  if (!ratingMap || !(ratingMap instanceof Map) || ratingMap.size === 0) return null;
  const rid = String(recipeId || "").trim().toLowerCase();
  if (rid && ratingMap.has(rid)) return ratingMap.get(rid);
  const u = String(url || "");
  const urlId = u.match(/\/(R-R|r-r)(\d+)\//i);
  if (urlId) {
    const k = `r-r${urlId[2]}`.toLowerCase();
    if (ratingMap.has(k)) return ratingMap.get(k);
  }
  let pathSlug = "";
  try {
    pathSlug = (new URL(u).pathname.split("/").filter(Boolean).pop() || "").toLowerCase();
  } catch {
    pathSlug = "";
  }
  if (pathSlug && ratingMap.has(`slug:${pathSlug}`)) return ratingMap.get(`slug:${pathSlug}`);
  return null;
}

const AH_RECIPE_SEARCH_V2_QUERY = `
query recipeSearchV2($searchText: String, $start: Int, $size: PageSize, $sortBy: RecipeSearchSortOption, $filters: [RecipeSearchQueryFilter!], $priorityRecipeIds: [Int!], $favoriteRecipeIds: [Int!], $recipeIds: [Int!]) {
  recipeSearchV2(searchText: $searchText, start: $start, size: $size, sortBy: $sortBy, filters: $filters, priorityRecipeIds: $priorityRecipeIds, favoriteRecipeIds: $favoriteRecipeIds, recipeIds: $recipeIds) {
    page { total __typename }
    result {
      id
      title
      slugifiedTitle: slug
      time { cook oven wait __typename }
      rating { average count __typename }
      images(renditions: [D220X162, D302X220, D440X324, D612X450, D1024X748, D1224X900, XXS, XS, S, M, L, XL]) {
        rendition
        url
        width
        height
        __typename
      }
      __typename
    }
    __typename
  }
}`;

const AH_RECIPE_DETAIL_QUERY = `
query recipe($id: Int!) {
  recipe(id: $id) {
    id
    title
    description
    cookTime
    ovenTime
    waitTime
    servings { number type }
    rating { average count }
    images(renditions: [D1224X900, D1024X748, D612X450, D440X324, D302X220, D220X162]) {
      url
      width
      height
    }
    ingredients {
      text
      quantity
      name { singular plural }
    }
    preparation { steps }
    author {
      brand { name }
      origin { hostName url }
    }
  }
}`;

function formatAhRecipeTime(time) {
  if (!time || typeof time !== "object") return "";
  const minutes = ["cook", "oven", "wait"].reduce((sum, key) => {
    const value = Number(time[key]);
    return Number.isFinite(value) && value > 0 ? sum + value : sum;
  }, 0);
  return minutes > 0 ? `${minutes} min` : "";
}

function pickAhGraphqlRecipeImage(images) {
  if (!Array.isArray(images) || images.length === 0) return "";
  const ranked = images
    .map((img) => ({
      url: cleanImageUrl(img?.url || ""),
      score: (Number(img?.width) || 0) * (Number(img?.height) || 0),
    }))
    .filter((img) => img.url && !isDecorativeImageUrl(img.url))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.url || "";
}

function extractAhRecipeIdFromUrl(url) {
  const match = String(url || "").match(/\/(?:recept\/)?R-R(\d+)(?:\/|$)/i) || String(url || "").match(/\/r\/(\d+)/i);
  return match ? Number(match[1]) : 0;
}

function formatAhGraphqlMinutes(recipe) {
  const minutes = ["cookTime", "ovenTime", "waitTime"].reduce((sum, key) => {
    const value = Number(recipe?.[key]);
    return Number.isFinite(value) && value > 0 ? sum + value : sum;
  }, 0);
  return minutes > 0 ? `${minutes} min` : "";
}

function ahGraphqlHeaders(referer = "https://www.ah.nl/allerhande") {
  return {
    ...FETCH_HEADERS,
    ...AH_PROXY_HEADERS,
    accept: "*/*",
    "accept-language": "nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/json",
    origin: "https://www.ah.nl",
    referer,
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-client-name": "ah-allerhande",
    "x-client-platform-type": "Web",
    "x-client-version": "1.1025.2",
  };
}

async function importAhRecipeViaGraphql(sourceUrl) {
  const recipeId = extractAhRecipeIdFromUrl(sourceUrl);
  if (!recipeId) return null;
  if (/^(1|true|yes)$/i.test(String(process.env.PLATELY_DISABLE_AH_GRAPHQL || "").trim())) {
    return null;
  }
  const headers = ahGraphqlHeaders(sourceUrl);
  const payload = {
    operationName: "recipe",
    variables: { id: recipeId },
    query: AH_RECIPE_DETAIL_QUERY,
  };
  const parseAhGraphqlRecipe = (json) => {
    const data = json?.data?.recipe;
    if (!data?.id || !data?.title) return null;
    const ingredients = normalizeIngredientList(
      (Array.isArray(data.ingredients) ? data.ingredients : [])
        .map((item) => parseIngredientLine(sanitizeText(item?.text || item?.name?.singular || item?.name?.plural || "")))
    );
    const instructions = cleanAllerhandeInstructionSteps(finalizeInstructionSteps(data?.preparation?.steps || []));
    const ratingValue = Number(data?.rating?.average);
    const ratingCount = Number(data?.rating?.count);
    const servingsNumber = Number(data?.servings?.number);
    const servingsType = sanitizeText(data?.servings?.type || "personen");
    const author =
      sanitizeText(data?.author?.brand?.name || "") ||
      sanitizeText(data?.author?.origin?.hostName || "") ||
      "Albert Heijn";
    return {
      platform: "website",
      sourceUrl,
      title: normalizeRecipeTitle(data.title) || sanitizeText(data.title || ""),
      description: cleanAllerhandeUiFluff(sanitizeText(stripTags(data.description || ""))),
      caption: cleanAllerhandeUiFluff(sanitizeText(stripTags(data.description || ""))),
      image: pickAhGraphqlRecipeImage(data.images) || "assets/hero-burger.svg",
      author,
      ingredients,
      instructions,
      time: formatAhGraphqlMinutes(data),
      servings: Number.isFinite(servingsNumber) && servingsNumber > 0
        ? `${servingsNumber} ${servingsType}`.trim()
        : "",
      needsReview: ingredients.length < 2 || instructions.length < 1,
      sourceLabel: "Imported from Allerhande",
      ...(Number.isFinite(ratingValue) && ratingValue > 0 ? { ratingValue } : {}),
      ...(Number.isFinite(ratingCount) && ratingCount > 0 ? { ratingCount } : {}),
    };
  };
  try {
    const resp = await fetch(`${AH_WWW_BASE}/gql`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(9000),
    });
    if (!resp?.ok) {
      console.log(`AH GraphQL import response: ${resp?.status || "failed"}`);
      try {
        const curlResult = await postJsonViaCurl(`${AH_WWW_BASE}/gql`, headers, payload);
        if (!curlResult.ok) {
          console.log(`AH GraphQL curl import response: ${curlResult.status || "failed"}`);
          return null;
        }
        return parseAhGraphqlRecipe(curlResult.json);
      } catch (curlErr) {
        console.log(`AH GraphQL curl import error: ${curlErr.message}`);
        return null;
      }
    }
    const json = await resp.json().catch(() => null);
    return parseAhGraphqlRecipe(json);
  } catch (err) {
    console.log(`AH GraphQL import error: ${err.message}`);
    try {
      const curlResult = await postJsonViaCurl(`${AH_WWW_BASE}/gql`, headers, payload);
      if (!curlResult.ok) {
        console.log(`AH GraphQL curl import response: ${curlResult.status || "failed"}`);
        return null;
      }
      return parseAhGraphqlRecipe(curlResult.json);
    } catch (curlErr) {
      console.log(`AH GraphQL curl import error: ${curlErr.message}`);
      return null;
    }
  }
}

async function searchAhRecipesViaGraphql(query, count = 4) {
  const searchText = sanitizeText(query || "").trim();
  if (!searchText) return [];
  const cap = Math.min(Math.max(Number(count) || 4, 1), 40);
  try {
    const resp = await fetch(`${AH_WWW_BASE}/gql`, {
      method: "POST",
      headers: ahGraphqlHeaders(`https://www.ah.nl/allerhande/recepten-zoeken?query=${encodeURIComponent(searchText)}`),
      body: JSON.stringify({
        operationName: "recipeSearchV2",
        variables: {
          searchText,
          filters: [],
          sortBy: null,
          start: 0,
          size: Math.max(9, cap),
          recipeIds: null,
          favoriteRecipeIds: null,
          priorityRecipeIds: [],
        },
        query: AH_RECIPE_SEARCH_V2_QUERY,
      }),
      signal: AbortSignal.timeout(9000),
    });
    if (!resp?.ok) {
      console.log(`AH GraphQL response: ${resp?.status || "failed"}`);
      return [];
    }
    const json = await resp.json().catch(() => null);
    const rows = json?.data?.recipeSearchV2?.result;
    if (!Array.isArray(rows) || rows.length === 0) return [];
    const results = rows
      .map((row) => {
        const id = String(row?.id || "").replace(/\D+/g, "");
        const title = sanitizeText(row?.title || "");
        const slug = sanitizeText(row?.slugifiedTitle || row?.slug || "")
          .toLowerCase()
          .replace(/[^a-z0-9-]+/g, "-")
          .replace(/^-+|-+$/g, "");
        if (!id || !title || !slug) return null;
        const url = `https://www.ah.nl/allerhande/recept/R-R${id}/${slug}`;
        if (!isAhAllerhandeRecipeUrl(url)) return null;
        if (!ahSeoBackfillResultMatchesQuery(title, slug, searchText)) return null;
        const ratingValue = Number(row?.rating?.average);
        const ratingCount = Number(row?.rating?.count);
        return {
          title,
          url,
          thumbnail: pickAhGraphqlRecipeImage(row?.images),
          channel: "Allerhande",
          channelId: "ch-ah",
          description: "",
          time: formatAhRecipeTime(row?.time),
          ...(Number.isFinite(ratingValue) && ratingValue > 0 ? { ratingValue } : {}),
          ...(Number.isFinite(ratingCount) && ratingCount > 0 ? { ratingCount } : {}),
        };
      })
      .filter(Boolean)
      .slice(0, cap);
    if (results.length) console.log(`✅ AH GraphQL returned ${results.length} results`);
    return results;
  } catch (err) {
    console.log(`AH GraphQL fetch error: ${err.message}`);
    return [];
  }
}

function normalizeRecipeRatingCacheUrl(url) {
  try {
    const u = new URL(String(url || "").trim());
    u.hash = "";
    return u.href;
  } catch {
    return String(url || "").trim();
  }
}

function getCachedRecipeLdRating(url) {
  const key = normalizeRecipeRatingCacheUrl(url);
  const e = recipeRatingLdCache.get(key);
  if (!e) return undefined;
  if (Date.now() - e.at > RECIPE_RATING_LD_CACHE_TTL_MS) {
    recipeRatingLdCache.delete(key);
    return undefined;
  }
  return e.value;
}

function setCachedRecipeLdRating(url, value) {
  const key = normalizeRecipeRatingCacheUrl(url);
  if (recipeRatingLdCache.size >= RECIPE_RATING_LD_CACHE_MAX_ENTRIES) {
    const drop = recipeRatingLdCache.keys().next().value;
    if (drop) recipeRatingLdCache.delete(drop);
  }
  recipeRatingLdCache.set(key, { at: Date.now(), value });
}

function bumpRatingEnrichHostStat(host, field) {
  if (!host) return;
  let o = ratingEnrichHostStats.get(host);
  if (!o) {
    o = { cacheHit: 0, fetch: 0, schemaHit: 0, schemaMiss: 0, httpErr: 0 };
    ratingEnrichHostStats.set(host, o);
  }
  o[field] = (o[field] || 0) + 1;
}

/** URLs waar JSON-LD Recipe-snippets zelden zinvol zijn (niet-HTML / geen schema). */
function urlEligibleForChannelSearchRatingFetch(url) {
  const u = String(url || "").trim().toLowerCase();
  if (!/^https?:\/\//.test(u)) return false;
  if (
    /tiktok\.com|instagram\.com|facebook\.com|pinterest\.com\/pin|youtu\.be|youtube\.com\/(watch|shorts|embed)/i.test(
      u
    )
  ) {
    return false;
  }
  return true;
}

/** Eén bron-URL: aggregateRating uit Recipe JSON-LD (zelfde aanpak als channel-search enrichment). */
async function fetchAggregateRatingForRecipePageUrl(url, timeoutMs = 6500) {
  const uKey = normalizeRecipeRatingCacheUrl(String(url || "").trim());
  if (!uKey || !urlEligibleForChannelSearchRatingFetch(uKey)) return null;
  const cached = getCachedRecipeLdRating(uKey);
  if (cached !== undefined) {
    return cached && typeof cached === "object" ? cached : null;
  }
  try {
    const resp = await fetch(uKey, {
      headers: {
        ...FETCH_HEADERS,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
      },
      signal: AbortSignal.timeout(Math.max(1500, Math.min(Number(timeoutMs) || 6500, 20000))),
      redirect: "follow",
    });
    if (!resp.ok) {
      return null;
    }
    const html = await resp.text();
    const rt = extractAggregateRatingFromRecipeHtml(html);
    if (rt) {
      setCachedRecipeLdRating(uKey, rt);
      return rt;
    }
    setCachedRecipeLdRating(uKey, null);
    return null;
  } catch {
    return null;
  }
}

function pickChannelSearchCandidateRating(candidate) {
  if (!candidate || typeof candidate !== "object") return null;
  const rv = Number(candidate.ratingValue);
  const rc = Number(candidate.ratingCount);
  if (!Number.isFinite(rv) || rv < 1 || rv > 5 || !Number.isFinite(rc) || rc < 1) return null;
  const out = { ratingValue: Math.round(rv), ratingCount: Math.max(1, Math.round(rc)) };
  if (candidate.ratingNormalizedFromWideScale) out.ratingNormalizedFromWideScale = true;
  return out;
}

/**
 * Voor alle kanalen: ontbrekende beoordeling aanvullen via schema.org op de receptpagina.
 * Limiet + parallel om zoektijd te cappen.
 * @param {any[]} results
 * @param {{ maxUrls?: number, concurrency?: number, timeoutMs?: number }} [opts]
 */
async function enrichChannelSearchResultsWithRatings(results, opts = {}) {
  const MAX_URLS = Number.isFinite(opts.maxUrls) ? Math.min(200, Math.max(1, opts.maxUrls)) : 20;
  const CONCURRENCY = Number.isFinite(opts.concurrency) ? Math.min(16, Math.max(1, opts.concurrency)) : 6;
  const TIMEOUT_MS = Number.isFinite(opts.timeoutMs) ? Math.min(12_000, Math.max(1500, opts.timeoutMs)) : 5000;
  if (!Array.isArray(results) || !results.length) return results;

  const candidates = [];
  const seen = new Set();
  for (const r of results) {
    if (!r || r.ratingValue != null) continue;
    const u = String(r.url || "").trim();
    if (!urlEligibleForChannelSearchRatingFetch(u)) continue;
    if (seen.has(u)) continue;
    seen.add(u);
    candidates.push(r);
    if (candidates.length >= MAX_URLS) break;
  }
  if (!candidates.length) return results;

  const ratingByUrl = new Map();
  let next = 0;
  const batch = {
    queued: candidates.length,
    cacheHitsWithRating: 0,
    fetches: 0,
    jsonLdRatingsNew: 0,
    jsonLdMiss: 0,
    httpErr: 0,
  };

  async function worker() {
    for (;;) {
      const i = next++;
      if (i >= candidates.length) return;
      const row = candidates[i];
      const uKey = normalizeRecipeRatingCacheUrl(row.url);

      let host = "";
      try {
        host = new URL(uKey).hostname;
      } catch {
        /* ignore */
      }

      const cached = getCachedRecipeLdRating(uKey);
      if (cached !== undefined) {
        bumpRatingEnrichHostStat(host, "cacheHit");
        if (cached && typeof cached === "object") {
          batch.cacheHitsWithRating++;
          bumpRatingEnrichHostStat(host, "schemaHit");
          ratingByUrl.set(String(row.url).trim(), cached);
        }
        continue;
      }

      try {
        batch.fetches++;
        bumpRatingEnrichHostStat(host, "fetch");
        const resp = await fetch(uKey, {
          headers: {
            ...FETCH_HEADERS,
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
          },
          signal: AbortSignal.timeout(TIMEOUT_MS),
          redirect: "follow",
        });
        if (!resp.ok) {
          batch.httpErr++;
          bumpRatingEnrichHostStat(host, "httpErr");
          continue;
        }
        const html = await resp.text();
        const rt = extractAggregateRatingFromRecipeHtml(html);
        if (rt) {
          batch.jsonLdRatingsNew++;
          bumpRatingEnrichHostStat(host, "schemaHit");
          ratingByUrl.set(String(row.url).trim(), rt);
          setCachedRecipeLdRating(uKey, rt);
        } else {
          batch.jsonLdMiss++;
          bumpRatingEnrichHostStat(host, "schemaMiss");
        }
      } catch {
        batch.httpErr++;
        bumpRatingEnrichHostStat(host, "httpErr");
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, candidates.length) }, () => worker())
  );

  if (candidates.length > 0) {
    batch.urlsWithRatingMerged = ratingByUrl.size;
    const totals = [...ratingEnrichHostStats.entries()]
      .map(([h, v]) => ({ h, n: (v.fetch || 0) + (v.cacheHit || 0), v }))
      .sort((a, b) => b.n - a.n)
      .slice(0, 12);
    console.log(
      `[rating-enrich] batch ${JSON.stringify(batch)} cumulative_by_host=${JSON.stringify(
        Object.fromEntries(totals.map(({ h, v }) => [h, v]))
      )}`
    );
  }

  if (!ratingByUrl.size) return results;
  return results.map((r) => {
    if (!r || r.ratingValue != null) return r;
    const u = String(r.url || "").trim();
    const rt = ratingByUrl.get(u);
    return rt ? { ...r, ...rt } : r;
  });
}

/** Populariteitsscore voor SEO-backfill sortering (ratingCount × ratingValue). */
function scoreSeoBackfillCandidatePopularity(candidate) {
  const rv = Number(candidate?.ratingValue);
  const rc = Number(candidate?.ratingCount);
  if (Number.isFinite(rv) && rv >= 1 && rv <= 5 && Number.isFinite(rc) && rc >= 1) {
    return rc * rv;
  }
  return 0;
}

/**
 * Haalt waar nodig JSON-LD-ratings binnen, sorteert op populariteit, houdt top N.
 */
async function rankSeoBackfillCandidatesByPopularity(candidates, opts = {}) {
  const topN = Math.min(200, Math.max(1, Number(opts.popularTopN) || 100));
  if (!Array.isArray(candidates) || candidates.length <= 1) return candidates;
  const maxEnrich = Math.min(topN, candidates.length, 120);
  const enriched = await enrichChannelSearchResultsWithRatings([...candidates], {
    maxUrls: maxEnrich,
    concurrency: 8,
    timeoutMs: 5500,
  });
  return [...enriched]
    .sort((a, b) => scoreSeoBackfillCandidatePopularity(b) - scoreSeoBackfillCandidatePopularity(a))
    .slice(0, topN);
}

async function backfillImportedRecipeRatingsForAllUsers({
  dryRun = true,
  maxUsers = 250,
  maxRecipes = 1200,
  concurrency = 6,
  timeoutMs = 6500,
} = {}) {
  const out = {
    ok: true,
    dryRun: Boolean(dryRun),
    maxUsers,
    maxRecipes,
    concurrency,
    timeoutMs,
    scannedUsers: 0,
    scannedRecipes: 0,
    candidates: 0,
    updatedRecipes: 0,
    updatedUsers: 0,
    skippedNotEligible: 0,
    skippedNoSourceUrl: 0,
    skippedAlreadyHasRating: 0,
    httpErr: 0,
    schemaMiss: 0,
    cacheHitWithRating: 0,
  };

  const candidates = [];
  const seen = new Set();

  function addCandidate({ userId, recipeIndex, sourceUrl }) {
    const u = String(sourceUrl || "").trim();
    if (!u) return;
    const key = `${sanitizeText(userId)}::${normalizeRecipeRatingCacheUrl(u)}::${recipeIndex}`;
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push({ userId: sanitizeText(userId), recipeIndex, sourceUrl: u });
  }

  // 1) Collect candidates
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const res = await pool.query(
      `
      SELECT id, app_state
      FROM plately_users
      WHERE COALESCE(jsonb_array_length(COALESCE(app_state, '{}'::jsonb)->'importedRecipes'), 0) > 0
      ORDER BY updated_at DESC NULLS LAST
      LIMIT $1
      `,
      [Math.max(1, Math.min(Number(maxUsers) || 250, 2000))]
    );
    for (const row of res.rows || []) {
      if (out.scannedUsers >= maxUsers) break;
      out.scannedUsers += 1;
      const userId = sanitizeText(row.id || "");
      const appState = row.app_state && typeof row.app_state === "object" ? row.app_state : {};
      const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [];
      for (let i = 0; i < recipes.length; i += 1) {
        if (out.scannedRecipes >= maxRecipes) break;
        const r = recipes[i];
        out.scannedRecipes += 1;
        const sourceUrl = sanitizeText(r?.sourceUrl || r?.source || "");
        if (!sourceUrl) {
          out.skippedNoSourceUrl += 1;
          continue;
        }
        if (r?.ratingValue != null && r?.ratingCount != null) {
          out.skippedAlreadyHasRating += 1;
          continue;
        }
        if (!urlEligibleForChannelSearchRatingFetch(sourceUrl)) {
          out.skippedNotEligible += 1;
          continue;
        }
        out.candidates += 1;
        addCandidate({ userId, recipeIndex: i, sourceUrl });
        if (candidates.length >= maxRecipes) break;
      }
      if (out.scannedRecipes >= maxRecipes) break;
    }
  } else {
    const db = await loadDatabase();
    const users = Object.values(db.users || {}).slice(0, Math.max(1, Math.min(Number(maxUsers) || 250, 5000)));
    for (const u of users) {
      if (out.scannedUsers >= maxUsers) break;
      if (!u || !u.id) continue;
      out.scannedUsers += 1;
      const userId = sanitizeText(u.id || "");
      const recipes = Array.isArray(u.importedRecipes) ? u.importedRecipes : [];
      for (let i = 0; i < recipes.length; i += 1) {
        if (out.scannedRecipes >= maxRecipes) break;
        const r = recipes[i];
        out.scannedRecipes += 1;
        const sourceUrl = sanitizeText(r?.sourceUrl || r?.source || "");
        if (!sourceUrl) {
          out.skippedNoSourceUrl += 1;
          continue;
        }
        if (r?.ratingValue != null && r?.ratingCount != null) {
          out.skippedAlreadyHasRating += 1;
          continue;
        }
        if (!urlEligibleForChannelSearchRatingFetch(sourceUrl)) {
          out.skippedNotEligible += 1;
          continue;
        }
        out.candidates += 1;
        addCandidate({ userId, recipeIndex: i, sourceUrl });
        if (candidates.length >= maxRecipes) break;
      }
      if (out.scannedRecipes >= maxRecipes) break;
    }
  }

  if (!candidates.length) return { ...out, message: "Geen recepten gevonden om ratings aan te vullen." };

  // 2) Fetch ratings (parallel)
  const ratingByKey = new Map(); // key: userId::recipeIndex -> ratingEntry
  let next = 0;
  async function worker() {
    for (;;) {
      const idx = next++;
      if (idx >= candidates.length) return;
      const c = candidates[idx];
      const uKey = normalizeRecipeRatingCacheUrl(c.sourceUrl);
      const cached = getCachedRecipeLdRating(uKey);
      if (cached !== undefined) {
        if (cached && typeof cached === "object") {
          out.cacheHitWithRating += 1;
          ratingByKey.set(`${c.userId}::${c.recipeIndex}`, cached);
        }
        continue;
      }
      try {
        const resp = await fetch(uKey, {
          headers: {
            ...FETCH_HEADERS,
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
          },
          signal: AbortSignal.timeout(Math.max(1500, Math.min(Number(timeoutMs) || 6500, 20000))),
          redirect: "follow",
        });
        if (!resp.ok) {
          out.httpErr += 1;
          continue;
        }
        const html = await resp.text();
        const rt = extractAggregateRatingFromRecipeHtml(html);
        if (rt) {
          setCachedRecipeLdRating(uKey, rt);
          ratingByKey.set(`${c.userId}::${c.recipeIndex}`, rt);
        } else {
          setCachedRecipeLdRating(uKey, null);
          out.schemaMiss += 1;
        }
      } catch {
        out.httpErr += 1;
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(Math.max(1, Number(concurrency) || 6), candidates.length) }, () => worker())
  );

  if (!ratingByKey.size) return { ...out, message: "Geen schema.org beoordelingen gevonden op de bronpagina's." };
  if (out.dryRun) return { ...out, foundRatings: ratingByKey.size };

  // 3) Persist updates
  const touchedUsers = new Set();
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const byUser = new Map();
    for (const c of candidates) {
      const rt = ratingByKey.get(`${c.userId}::${c.recipeIndex}`);
      if (!rt) continue;
      if (!byUser.has(c.userId)) byUser.set(c.userId, []);
      byUser.get(c.userId).push({ recipeIndex: c.recipeIndex, rt });
    }
    for (const [userId, patches] of byUser.entries()) {
      const res = await pool.query(`SELECT app_state FROM plately_users WHERE id = $1 LIMIT 1`, [userId]);
      const row = res.rows[0];
      const appState = row?.app_state && typeof row.app_state === "object" ? row.app_state : {};
      const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [];
      let changed = 0;
      for (const p of patches) {
        const r = recipes[p.recipeIndex];
        if (!r || (r.ratingValue != null && r.ratingCount != null)) continue;
        const rv = Number(p.rt.ratingValue);
        const rc = Number(p.rt.ratingCount);
        if (!Number.isFinite(rv) || rv < 1 || rv > 5 || !Number.isFinite(rc) || rc < 1) continue;
        recipes[p.recipeIndex] = {
          ...r,
          ratingValue: rv,
          ratingCount: rc,
          ...(p.rt.ratingNormalizedFromWideScale ? { ratingNormalizedFromWideScale: true } : {}),
        };
        changed += 1;
      }
      if (!changed) continue;
      appState.importedRecipes = recipes;
      await pool.query(
        `
          UPDATE plately_users
          SET app_state = $2::jsonb,
              updated_at = NOW()
          WHERE id = $1
        `,
        [userId, JSON.stringify(appState)]
      );
      touchedUsers.add(userId);
      out.updatedRecipes += changed;
    }
  } else {
    const db = await loadDatabase();
    for (const c of candidates) {
      const rt = ratingByKey.get(`${c.userId}::${c.recipeIndex}`);
      if (!rt) continue;
      const user = db.users?.[c.userId];
      if (!user) continue;
      const recipes = Array.isArray(user.importedRecipes) ? user.importedRecipes : [];
      const r = recipes[c.recipeIndex];
      if (!r || (r.ratingValue != null && r.ratingCount != null)) continue;
      const rv = Number(rt.ratingValue);
      const rc = Number(rt.ratingCount);
      if (!Number.isFinite(rv) || rv < 1 || rv > 5 || !Number.isFinite(rc) || rc < 1) continue;
      recipes[c.recipeIndex] = {
        ...r,
        ratingValue: rv,
        ratingCount: rc,
        ...(rt.ratingNormalizedFromWideScale ? { ratingNormalizedFromWideScale: true } : {}),
      };
      user.importedRecipes = recipes;
      user.updatedAt = new Date().toISOString();
      db.users[c.userId] = user;
      touchedUsers.add(c.userId);
      out.updatedRecipes += 1;
    }
    await persistDatabase();
  }
  out.updatedUsers = touchedUsers.size;
  return out;
}

/** AH zoek-HTML voor datacenters die 403/lege body geven op de eerste fetch. */
async function fetchAllerhandeSearchHtmlWithRetry(searchUrl) {
  // Als de proxy geconfigureerd is, stuur de URL door de proxy.
  const effectiveUrl = AH_WWW_BASE !== "https://www.ah.nl"
    ? searchUrl.replace("https://www.ah.nl", AH_WWW_BASE)
    : searchUrl;
  const baseHeaders = {
    ...AH_PROXY_HEADERS,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.5",
    Referer: "https://www.ah.nl/allerhande/",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  };
  const attempts = [
    {
      ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      timeout: 16_000,
    },
    {
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0",
      timeout: 16_000,
    },
    {
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
      timeout: 18_000,
    },
  ];
  for (const att of attempts) {
    try {
      const r = await fetch(effectiveUrl, {
        headers: { ...baseHeaders, "User-Agent": att.ua },
        signal: AbortSignal.timeout(att.timeout),
        redirect: "follow",
      });
      if (!r.ok) continue;
      const t = await r.text();
      if (t && t.includes("RecipeSummary") && t.length > 4000) return t;
    } catch (err) {
      console.log(`AH HTML retry fetch: ${err?.message || err}`);
    }
  }
  return "";
}

/**
 * Search AH Allerhande — tries the API with anonymous token.
 */
async function searchAHRecipes(query, count = 4, opts = {}) {
  query = normalizeAhAllerhandeSearchQuery(query);
  const seoBackfill = Boolean(opts && opts.seoBackfill);
  console.log(`🔍 AH recipe search for: "${query}"${seoBackfill ? " (seoBackfill)" : ""}`);

  // Skip AH API - it requires authentication token we don't have
  // Use Jina reader fallback directly (much more reliable)
  console.log(`⏭️  Skipping old AH API (unauthorized), trying GraphQL + Jina reader`);

  const graphqlResults = await searchAhRecipesViaGraphql(query, count);
  if (graphqlResults.length > 0) return graphqlResults;

  // Fallback: Use Jina reader to get AH search results as markdown
  try {
    const searchUrlTemplate = sanitizeText(opts?.searchUrlTemplate || SEED_CHANNEL_DEFAULTS["ch-ah"]?.searchUrlTemplate || "") ||
      "https://www.ah.nl/allerhande/recepten-zoeken?query={q}";
    const searchUrl = buildSeedSearchUrlFromTemplate(searchUrlTemplate, query);
    const readerUrl = `https://r.jina.ai/http://${searchUrl}`;

    console.log(`📖 Trying Jina reader for: ${searchUrl}`);

    // Start Jina as fallback, but don't let it block if AH's own HTML already exposes RecipeSummary data.
    const markdownPromise = fetch(readerUrl, {
        headers: { ...FETCH_HEADERS, ...jinaReaderAuthHeaders() },
        signal: AbortSignal.timeout(15000),
      }).catch((err) => {
        console.log(`Jina fetch error: ${err.message}`);
        return null;
      });
    const effectiveSearchUrl = AH_WWW_BASE !== "https://www.ah.nl"
      ? searchUrl.replace("https://www.ah.nl", AH_WWW_BASE)
      : searchUrl;
    const htmlResp = await fetch(effectiveSearchUrl, {
        headers: {
          ...AH_PROXY_HEADERS,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "nl-NL,nl;q=0.9",
          "Referer": "https://www.ah.nl/allerhande/",
          "Cache-Control": "no-cache",
        },
        signal: AbortSignal.timeout(14_000),
        redirect: "follow",
      }).catch((err) => {
        console.log(`HTML fetch error: ${err.message}`);
        return null;
      });

    let html = "";
    if (htmlResp?.ok) {
      try {
        html = await htmlResp.text();
      } catch (err) {
        console.log(`HTML text parse error: ${err.message}`);
      }
    }
    console.log(`HTML response: ${htmlResp?.status || 'failed'}, HTML: ${html.length} chars`);

    let ahRatingByRecipeId = extractAhSearchRatingsFromAllerhandeHtml(html);
    if (ahRatingByRecipeId.size === 0) {
      console.log("⭐ AH ratings: none from HTML — retrying dedicated fetch for RecipeSummary JSON");
      const htmlRetry = await fetchAllerhandeSearchHtmlWithRetry(searchUrl);
      if (htmlRetry) {
        if (htmlRetry.length > (html || "").length) {
          html = htmlRetry;
        } else if (!(html || "").includes("RecipeSummary")) {
          html = htmlRetry;
        }
        ahRatingByRecipeId = extractAhSearchRatingsFromAllerhandeHtml(html);
      }
      console.log(`⭐ AH ratings map size: ${ahRatingByRecipeId.size} (HTML after retry: ${(html || "").length} chars)`);
    } else {
      console.log(`⭐ AH ratings map size: ${ahRatingByRecipeId.size}`);
    }

    const summaryResults = extractAhRecipeSummariesFromAllerhandeHtml(html, query, count);
    if (summaryResults.length > 0) {
      console.log(`✅ AH RecipeSummary parser returned ${summaryResults.length} results`);
      if (summaryResults.some((r) => !r.thumbnail)) {
        const withThumbs = await Promise.all(summaryResults.map(async (r) => {
          if (r.thumbnail) return r;
          const thumbnail = await fetchAhRecipeThumbnail(r.url).catch(() => "");
          return thumbnail ? { ...r, thumbnail } : r;
        }));
        return withThumbs;
      }
      return summaryResults;
    }
    const cardResults = extractAhRecipeCardsFromAllerhandeHtml(html, query, count);
    if (cardResults.length > 0) {
      console.log(`✅ AH card/ItemList parser returned ${cardResults.length} results`);
      return cardResults;
    }

    const markdownResp = await markdownPromise;
    console.log(`Jina response: ${markdownResp?.status || "failed"}, HTML response: ${htmlResp?.status || "failed"}`);
    if (markdownResp?.ok) {
      const markdown = await markdownResp.text();
      console.log(`✅ Jina returned ${markdown.length} chars, HTML: ${html.length} chars`);
      const markdownCardResults = extractAhRecipeCardsFromAllerhandeHtml(markdown, query, count);
      if (markdownCardResults.length > 0) {
        console.log(`✅ AH Jina card/ItemList parser returned ${markdownCardResults.length} results`);
        return markdownCardResults;
      }

      // Extract recipe links from Jina markdown — `/recept/…` met Allerhande-id `r-r123…/slug`.
      // seoBackfill: ook http(s), ah.nl zonder www, en relatieve `/allerhande/recept/` (Jina varieert).
      const urlMatches = [];
      const seenAhReceptUrls = new Set();
      function pushAhJinaReceptMatch(fullUrl, slugPart) {
        const canon = String(fullUrl || "").split("#")[0].split("?")[0];
        if (!canon || seenAhReceptUrls.has(canon)) return;
        seenAhReceptUrls.add(canon);
        urlMatches.push([canon, slugPart]);
      }
      for (const m of markdown.matchAll(/https?:\/\/(?:www\.)?ah\.nl\/allerhande\/recept\/(R-R\d+\/[a-z0-9][a-z0-9\-]*)/gi)) {
        const slug = m[1];
        pushAhJinaReceptMatch(`https://www.ah.nl/allerhande/recept/${slug}`, slug);
      }
      for (const m of markdown.matchAll(/(?:^|[^\w/])(\/allerhande\/recept\/(R-R\d+\/[a-z0-9][a-z0-9\-]*))/gi)) {
        const path = m[1];
        const slug = m[2];
        if (slug) pushAhJinaReceptMatch(`https://www.ah.nl${path}`, slug);
      }

      // Strategy 2: Extract URLs and derive titles from slug (most reliable).
      // Alleen `/recept/…`: `/recepten/asperges` e.d. zijn hubs, geen recepten (veroorzaakte nutteloze logs).
      const urlsWithContext = [];

      for (const match of urlMatches) {
        const url = match[0];
        const slug = match[1];

        // Allerhande-receptpagina's gebruiken vrijwel altijd dit id-patroon in de URL.
        if (!/^r-r\d+\//i.test(slug)) {
          continue;
        }

        // Skip obvious category links
        if (slug.endsWith('recepten') || slug.endsWith('gerechten') || slug.includes('categor') ||
            /^(lente|bbq|picknick|airfryer|makkelijke|snelle|gezonde|zomer|herfst|winter)(-recepten)?$/.test(slug)) {
          continue;
        }

        // Derive title from slug - this is most reliable
        // Examples: "surinaamse-bami" → "Surinaamse Bami"
        // Slugs can be "R1202302/surinaamse-bami" — only keep the recipe part
        const recipeSlug = String(slug || "").split("/").pop() || "";
        const title = recipeSlug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        if (title.length > 2) {
          const idMatch = slug.match(/^(r-r\d+)/i);
          urlsWithContext.push({ 0: null, 1: title, 2: url, recipeId: idMatch ? idMatch[1] : "" });
        }
      }

      const pattern1 = [];
      const pattern2 = urlsWithContext.length > 0 ? urlsWithContext :
        urlMatches.map((m) => {
          const url = m[0];
          const slug = m[1];
          if (!/^r-r\d+\//i.test(slug)) {
            return null;
          }
          if (slug.endsWith('recepten') || slug.endsWith('gerechten')) {
            return null;
          }

          // Parse slug: "r-r1193911/surinaamse-eiersalade" → ID + recipe name
          const parts = slug.split('/');
          let recipeId = '';
          let recipeName = '';

          if (parts.length === 2) {
            // Has ID/name format
            recipeId = parts[0];
            recipeName = parts[1];
          } else {
            // Just recipe name, no ID
            recipeName = slug;
          }

          // Format title: capitalize words from recipe name
          const title = recipeName
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

          return { 0: null, 1: title, 2: url, recipeId };
        }).filter(Boolean);

      const allLinks = pattern2.length > 0 ? pattern2 : pattern1;
      console.log(`🔗 Found links: ${allLinks.length}`);

      // Extract images - try HTML first, then Jina markdown
      const imageMap = new Map();
      const imagesByUrl = new Map(); // Alternative map by URL for fallback matching
      const fallbackImages = []; // Ordered list fallback (best-effort)

      if (html && html.length > 100) {
        // Try to extract from AH search cards. AH often puts the real recipe
        // photo only in img[srcset], with the recipe title in alt.
        const imgTags = [...html.matchAll(/<img\b[^>]*(?:static\.ah\.nl|card-image_image__)[^>]*>/gi)];
        for (const tagMatch of imgTags) {
          const tag = tagMatch[0];
          const altText = getHtmlAttr(tag, "alt");
          const srcsetImage = pickLargestSrcsetImage(getHtmlAttr(tag, "srcset"));
          const srcImage = cleanImageUrl(getHtmlAttr(tag, "src"));
          const imgUrl = srcsetImage || srcImage;

          if (imgUrl && imgUrl.includes("static.ah.nl") && !isDecorativeImageUrl(imgUrl)) {
            const upgraded = upgradeAhImageQuality(imgUrl);
            if (altText) {
              imageMap.set(normalizeImageMatchKey(altText), upgraded);
            }
            imagesByUrl.set(imgUrl, upgraded);
          }
        }

        // Additional fallback: the search page often uses <source srcset>, data-attrs, or JSON blobs.
        // Capture any static.ah.nl image URLs in order of appearance.
        const looseMatches = [
          ...html.matchAll(/https?:\/\/static\.ah\.nl\/[^"'<>\s]+\.(?:jpg|jpeg|png|webp)[^"'<>\s]*/gi),
          ...html.matchAll(/\/\/static\.ah\.nl\/[^"'<>\s]+\.(?:jpg|jpeg|png|webp)[^"'<>\s]*/gi),
        ];
        const seen = new Set();
        for (const m of looseMatches) {
          const rawUrl = cleanImageUrl(m[0].startsWith("//") ? `https:${m[0]}` : m[0]);
          if (!rawUrl) continue;
          if (isDecorativeImageUrl(rawUrl)) continue;
          const upgraded = upgradeAhImageQuality(rawUrl);
          if (!seen.has(upgraded)) {
            seen.add(upgraded);
            fallbackImages.push(upgraded);
          }
        }
        console.log(`📸 Found ${imageMap.size} alt-mapped images + ${fallbackImages.length} fallback images in HTML`);
      }

      // Fallback: Try to extract images from Jina markdown
      // Jina converts images to ![alt](url) format
      if (imageMap.size === 0) {
        const markdownImages = [...markdown.matchAll(/!\[([^\]]*)\]\((https:\/\/[^)]*static\.ah\.nl[^)]*\.(?:jpg|jpeg|png|webp))\)/gi)];
        for (const match of markdownImages) {
          const altText = match[1] || "";
          const imgUrl = cleanImageUrl(match[2]);
          if (imgUrl) {
            if (isDecorativeImageUrl(imgUrl)) continue;
            const upgraded = upgradeAhImageQuality(imgUrl);
            if (altText) {
              imageMap.set(normalizeImageMatchKey(altText), upgraded);
            }
            imagesByUrl.set(imgUrl, upgraded);
          }
        }
        if (markdownImages.length > 0) {
          console.log(`📸 Found ${markdownImages.length} images in Jina markdown`);
        }
      }

      const links = allLinks
        .map(match => {
          // Extract slug from URL (handle both /recept/ and /recepten/)
          const slugParts = match[2].split(/\/recept(?:en)?\//);
          const slugFromUrl = (slugParts[1] || "").toLowerCase();
          return {
            title: match[1] || "",
            url: match[2],
            slug: slugFromUrl,
            recipeId: match.recipeId || "", // Preserve recipe ID from earlier extraction
          };
        })
        .filter(item => {
          const { title, slug } = item;

          console.log(`  📌 Processing: "${title}" (slug: ${slug})`);

          // 1. Filter out obvious categories and generic pages
          // More specific: reject if slug is ONLY generic words without search-term specificity
          if (slug === 'recepten' || slug === 'gerechten' || slug.includes('categor') ||
              /^(lente|bbq|picknick|airfryer|makkelijke|snelle|gezonde|zomer|herfst|winter)(-recepten)?$/.test(slug)) {
            console.log(`    ❌ Category filter`);
            return false;
          }

          // 2. Need multi-word recipe names (2+ hyphens = 3+ words)
          // RELAXED: Allow single-word recipes too (like "Surinaamse")
          const wordCount = (slug.match(/-/g) || []).length + 1;
          if (wordCount < 1) {
            console.log(`    ❌ Too short slug (${wordCount} words)`);
            return false;
          }

          // 3. Skip numeric/pagination slugs
          if (/^\d+/.test(slug)) {
            return false;
          }

          // 4. Skip very short titles (likely not real recipes)
          const minTitleLen = seoBackfill ? 3 : 5;
          if (title.trim().length < minTitleLen) {
            return false;
          }

          // 5. Search query relevance.
          // SEO backfill still needs this for AH: the search page can include high-rated
          // promotional recipes unrelated to the query, and popularity sorting would
          // otherwise import those first.
          if (seoBackfill) {
            const pass = ahSeoBackfillResultMatchesQuery(title, slug, query);
            console.log(`    🔍 Relevance: ${pass ? "passed" : "failed"} (seoBackfill AH)`);
            if (!pass) return false;
          } else {
            const searchWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
            const titleLower = title.toLowerCase();
            const slugLower = slug;

            const matchScore = searchWords.reduce((score, word) => {
              if (titleLower.includes(word)) return score + 2;
              if (slugLower.includes(word)) return score + 1;
              return score;
            }, 0);

            const minMatches = Math.ceil(searchWords.length * 0.5);
            console.log(`    🔍 Relevance: score=${matchScore}, min=${minMatches}, words=[${searchWords.join(',')}]`);
            if (matchScore < minMatches) {
              console.log(`    ❌ Relevance filter failed`);
              return false;
            }
          }

          console.log(`    ✅ PASSED all filters`);
          return true;
        });

      console.log(`Found ${links.length} highly relevant recipes (filtered from ${allLinks.length} total for "${query}")`);

      if (links.length > 0) {
        let results = links.slice(0, count).map((linkItem, idx) => {
          const title = sanitizeText(linkItem.title || "");
          const recipeId = linkItem.recipeId || "";

          // Try to match image from HTML by recipe title or ID
          let thumbnail = "";
          if (imageMap.size > 0) {
            const titleKey = normalizeImageMatchKey(title);
            const titleWords = titleKey.split(/\s+/).filter((word) => word.length > 2);
            const idLower = recipeId.toLowerCase();

            // Try matching by title first
            for (const [altKey, imgUrl] of imageMap.entries()) {
              const altWords = altKey.split(/\s+/).filter((word) => word.length > 2);
              const sharedWords = altWords.filter((word) => titleWords.includes(word)).length;
              if (
                titleKey.includes(altKey) ||
                altKey.includes(titleKey) ||
                (altWords.length > 0 && sharedWords >= Math.min(2, altWords.length))
              ) {
                thumbnail = imgUrl;
                break;
              }
            }

            // Try matching by ID if title match failed
            if (!thumbnail && idLower) {
              for (const [altKey, imgUrl] of imageMap.entries()) {
                if (altKey.includes(idLower)) {
                  thumbnail = imgUrl;
                  break;
                }
              }
            }
          }

          // Fallback: use first available image if no specific match
          if (!thumbnail && imagesByUrl.size > 0) {
            thumbnail = imagesByUrl.entries().next().value[1] || "";
          }
          // Final fallback: if we only have an alt-text map, take the first image
          if (!thumbnail && imageMap.size > 0) {
            thumbnail = imageMap.values().next().value || "";
          }
          // Ordered fallback: map nth result to nth image found on page (best-effort)
          if (!thumbnail && fallbackImages.length > 0) {
            thumbnail = fallbackImages[idx] || fallbackImages[0] || "";
          }

          console.log(`  📄 Mapping: "${title}" (ID: ${recipeId || 'none'}) - Image: ${thumbnail ? 'found' : 'missing'}`);
          const ratingEntry = lookupAhSearchRating(ahRatingByRecipeId, linkItem.url, recipeId);
          return {
            title,
            url: linkItem.url,
            thumbnail,
            channel: "ALLERHANDE",
            channelId: "ch-ah",
            description: "",
            time: "",
            ...(ratingEntry
              ? { ratingValue: ratingEntry.ratingValue, ratingCount: ratingEntry.ratingCount }
              : {}),
          };
        }).filter((r) => {
          const pass = r.title && r.url && r.title.length > 2;
          if (!pass) {
            console.log(`  ⚠️  Filtered out: title="${r.title}" (length=${r.title.length}), url=${r.url ? 'present' : 'missing'}`);
          }
          return pass;
        });

        if (results.some((r) => !r.thumbnail)) {
          results = await Promise.all(results.map(async (result) => {
            if (result.thumbnail) return result;
            const thumbnail = await fetchAhRecipeThumbnail(result.url);
            if (thumbnail) {
              console.log(`  🖼️  Recipe page image fallback: "${result.title}" - found`);
              return { ...result, thumbnail };
            }
            console.log(`  🖼️  Recipe page image fallback: "${result.title}" - missing`);
            return result;
          }));
        }

        console.log(`🔗 Returning ${results.length} AH search results with ${results.filter(r => r.thumbnail).length} images`);
        return results;
      }
    }
  } catch (err) {
    console.log(`⚠️  Jina failed: ${err.message}`);
  }

  const serperResults = await serperGoogleSiteSearchRecipes({
    baseUrl: "https://www.ah.nl/allerhande",
    channelName: "Allerhande",
    channelId: "ch-ah",
    query,
    count,
    relaxedQueryMatch: seoBackfill,
  });
  if (serperResults.length > 0) {
    console.log(`✅ AH Serper fallback returned ${serperResults.length} results`);
    return serperResults;
  }

  // Final fallback: Direct HTML scraping met proxy indien geconfigureerd
  try {
    const scrapeBase = `${AH_WWW_BASE}/allerhande/recepten-zoeken?query=${encodeURIComponent(query)}`;
    const searchUrl = scrapeBase;
    console.log(`🔗 Trying direct HTML scrape: ${searchUrl}`);

    const html = await fetch(searchUrl, {
      headers: {
        ...AH_PROXY_HEADERS,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "nl-NL,nl;q=0.9",
        "Accept-Encoding": "gzip, deflate",
        "DNT": "1",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
      signal: AbortSignal.timeout(8000),
    }).then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    });

    console.log(`Got ${html.length} chars of HTML`);

    const ahRatingByRecipeId = extractAhSearchRatingsFromAllerhandeHtml(html);

    // Look for concrete recipe links only. `/recepten/...` pages are hubs and can
    // import an unrelated first recipe when treated as a source URL.
    const recipeUrls = new Set();
    const matches = [...html.matchAll(/href=["']([^"']*\/allerhande\/recept\/r-r\d+\/[^"']+)["']/gi)];

    for (const match of matches) {
      let url = match[1];
      if (!url.startsWith("http")) {
        url = `https://www.ah.nl${url}`;
      }

      if (!isAhAllerhandeRecipeUrl(url)) continue;

      const slug = url.split('/recept/')[1] || "";

      // Skip if ends with common category indicators
      if (slug.endsWith('recepten') || slug.endsWith('gerechten')) {
        continue;
      }

      // Allow both single-word (like "Surinaamse") and multi-word recipes
      const wordCount = (slug.match(/-/g) || []).length + 1;
      // No wordCount requirement - allow all

      // Skip numeric slugs (pagination)
      if (/^\d+/.test(slug)) {
        continue;
      }

      recipeUrls.add(url);
      if (recipeUrls.size >= count) break;
    }

    if (recipeUrls.size > 0) {
      // Try to get titles and images by fetching the first few recipes
      const results = await Promise.all(
        Array.from(recipeUrls).slice(0, count).map(async (url) => {
          try {
            console.log(`  📄 HTML scraper fetching: ${url}`);
            const recipeHtml = await fetch(url, {
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "text/html,application/xhtml+xml",
              },
              signal: AbortSignal.timeout(5000),
            }).then(r => {
              if (!r.ok) {
                console.log(`  HTTP ${r.status}`);
                return "";
              }
              return r.text();
            }).catch((err) => {
              console.log(`  Error: ${err.message}`);
              return "";
            });

            if (!recipeHtml || recipeHtml.length < 100) {
              console.log(`  ⚠️  No HTML received`);
              return null;
            }

            const titleMatch = recipeHtml.match(/<h1[^>]*>([^<]+)<\/h1>/i) ||
                             recipeHtml.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
            const title = titleMatch ? sanitizeText(titleMatch[1]) : sanitizeText(url.split("/").pop() || "");

            if (title.length <= 2) {
              console.log(`  ⚠️  Title too short: "${title}"`);
              return null;
            }

            const thumbnail = extractAhRecipeImage(recipeHtml);
            console.log(`  ✅ ${title} - Image: ${thumbnail ? "YES" : "NO"}`);

            const fromSearch = lookupAhSearchRating(ahRatingByRecipeId, url, "");
            const fromPageLd = extractAggregateRatingFromRecipeHtml(recipeHtml);
            const ratingEntry = fromSearch || fromPageLd;

            return {
              title,
              url,
              thumbnail,
              channel: "Allerhande",
              channelId: "ch-ah",
              description: "",
              time: "",
              ...(ratingEntry
                ? { ratingValue: ratingEntry.ratingValue, ratingCount: ratingEntry.ratingCount }
                : {}),
            };
          } catch (err) {
            console.log(`  ❌ Error: ${err.message}`);
            return null;
          }
        })
      );

      const validResults = results.filter(Boolean);
      console.log(`✅ HTML scraper found ${validResults.length} recipes`);
      return validResults;
    }
  } catch (err) {
    console.log(`⚠️  HTML scraper failed: ${err.message}`);
  }

  console.log(`❌ AH search for "${query}" returned no results`);
  return [];
}

async function searchJumboRecipes(query, count = 4, opts = {}) {
  const channelName = "Jumbo";
  const channelId = "ch-jumbo";
  const matchOptions = { relaxedQueryMatch: shouldRelaxQueryTitleMatch(opts) };
  const searchUrlTemplate = sanitizeText(opts?.searchUrlTemplate || SEED_CHANNEL_DEFAULTS["ch-jumbo"]?.searchUrlTemplate || "") ||
    "https://www.jumbo.com/recepten/zoeken?searchTerms={q}";
  const searchUrl = buildSeedSearchUrlFromTemplate(searchUrlTemplate, query || "");

  async function fetchJumboPage(url, timeoutMs = 12000) {
    try {
      const response = await fetch(url, {
        headers: {
          ...FETCH_HEADERS,
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "nl-NL,nl;q=0.9,en;q=0.8",
          referer: "https://www.jumbo.com/recepten/",
          "cache-control": "no-cache",
          pragma: "no-cache",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) return "";
      return await response.text();
    } catch {
      return "";
    }
  }

  function absUrl(href) {
    const raw = sanitizeText(href || "");
    if (!raw) return "";
    try {
      return new URL(raw, "https://www.jumbo.com").toString();
    } catch {
      return "";
    }
  }

  function extractMetaContent(html, attr, value) {
    try {
      const escaped = String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const tag = html.match(new RegExp(`<meta[^>]+${attr}=["']${escaped}["'][^>]*>`, "i"))?.[0] || "";
      return tag.match(/content=["']([^"']+)["']/i)?.[1] || "";
    } catch {
      return "";
    }
  }

  async function fetchRecipeDetails(url) {
    const recipeHtml = await fetchJumboPage(url, 12000);
    if (!recipeHtml || recipeHtml.length < 200) return null;

    const rawTitle =
      extractMetaContent(recipeHtml, "property", "og:title") ||
      extractMetaContent(recipeHtml, "name", "og:title") ||
      recipeHtml.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ||
      "";
    const title = sanitizeText(decodeHtmlEntities(stripHtmlTags(rawTitle)));
    if (!title) return null;

    const rawImg =
      extractMetaContent(recipeHtml, "property", "og:image") ||
      extractMetaContent(recipeHtml, "name", "og:image") ||
      extractMetaContent(recipeHtml, "name", "twitter:image") ||
      "";
    const thumbnail = absUrl(rawImg);

    const rawDesc =
      extractMetaContent(recipeHtml, "property", "og:description") ||
      extractMetaContent(recipeHtml, "name", "og:description") ||
      extractMetaContent(recipeHtml, "name", "description") ||
      "";
    const description = sanitizeText(decodeHtmlEntities(stripHtmlTags(rawDesc))).slice(0, 160);

    // Try JSON-LD to get time if present
    let time = "";
    const ldBlocks = [...recipeHtml.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    for (const m of ldBlocks) {
      const payload = safelyParseJson((m[1] || "").trim());
      const items = Array.isArray(payload) ? payload : [payload];
      for (const item of items) {
        const type = item?.["@type"];
        const isRecipe = (Array.isArray(type) ? type : [type]).filter(Boolean).some((t) => String(t).toLowerCase() === "recipe");
        if (!isRecipe) continue;
        time = parseDurationToMinutes(item?.totalTime || item?.cookTime || item?.prepTime) || "";
        break;
      }
      if (time) break;
    }

    const ldRating = extractAggregateRatingFromRecipeHtml(recipeHtml);
    return {
      title,
      url,
      thumbnail,
      channel: channelName,
      channelId,
      description,
      time,
      ...(ldRating || {}),
    };
  }

  try {
    const html = await fetchJumboPage(searchUrl, 15000);
    if (!html || html.length < 500) return [];

    const urlCandidates = [];
    const seen = new Set();
    const urlRe = /\/recepten\/[a-z0-9][a-z0-9\-_%]*-\d+(?:-\d+)?/gi;
    for (const m of html.matchAll(urlRe)) {
      const url = absUrl(m[0]);
      if (!url || seen.has(url)) continue;
      if (/\/recepten\/(?:zoeken|search)(?:\/|$)/i.test(url)) continue;
      seen.add(url);
      urlCandidates.push(url);
      if (urlCandidates.length >= Math.max(10, count * 4)) break;
    }

    const settled = await Promise.allSettled(urlCandidates.slice(0, Math.max(6, count * 2)).map(fetchRecipeDetails));
    const raw = settled
      .filter((r) => r.status === "fulfilled" && r.value)
      .map((r) => r.value);

    const filtered = raw
      .filter((r) => r && r.title && r.url)
      .filter((r) => urlLooksLikeRecipe(r.url))
      .filter((r) => titleLooksLikeRecipe(r.title))
      .filter((r) => !isLikelyBlogPage(r.title, r.url, r.description))
      .filter((r) => channelSearchResultTitleMatchesQuery(channelId, r.title, query || "", matchOptions))
      .sort((a, b) => titleQueryScore(b.title, query || "") - titleQueryScore(a.title, query || ""))
      .slice(0, count);

    return filtered;
  } catch {
    return [];
  }
}

async function scrapeOrRestPublic(baseUrl, channelName, channelId, searchUrl, parser, count, query, options = {}) {
  const matchOptions = { relaxedQueryMatch: shouldRelaxQueryTitleMatch(options) };
  const forceSerperFallback = Boolean(options && options.forceSerperFallback);
  // Miljuschka / Eef Kookt Zo block datacenter + reader IPs (403 / Cloudflare). Serper runs in
  // parallel so we don't wait on slow HTML → REST → Jina timeouts before hitting Google site:.
  const serpEarly =
    (forceSerperFallback || channelIdUsesSerperFallback(channelId)) &&
    serperGoogleSiteSearchRecipes({
      baseUrl,
      channelName,
      channelId,
      query: query || "",
      count,
      relaxedQueryMatch: matchOptions.relaxedQueryMatch,
      force: forceSerperFallback,
    });
  // ch-mj / ch-ek: WP REST eerst — HTML-zoekpagina is vrijwel altijd achter Cloudflare,
  // JSON-endpoints worden minder agressief geblokkeerd.
  if (SEARCH_WP_REST_FIRST_IDS.has(channelId)) {
    const rest = await wpRestSearch(baseUrl, channelName, channelId, query || "", count, null, matchOptions);
    if (rest.length > 0) return rest;
  }
  try {
    const html = await fetchHtml(searchUrl);
    if (html && html.length > 500) {
      const scraped = parser(html, baseUrl, channelName, channelId, count);
      const filtered = scraped
        .filter((r) => r.title && r.url)
        .filter((r) => urlLooksLikeRecipe(r.url))
        .filter((r) => titleLooksLikeRecipe(r.title))
        .filter((r) => !isLikelyBlogPage(r.title, r.url, r.description))
        .filter((r) => channelSearchResultTitleMatchesQuery(channelId, r.title, query || "", matchOptions))
        .sort((a, b) => titleQueryScore(b.title, query || "") - titleQueryScore(a.title, query || ""))
        .slice(0, count);
      if (filtered.length > 0) return filtered;
    }
  } catch { /* fall through */ }
  if (!SEARCH_WP_REST_FIRST_IDS.has(channelId)) {
    const rest = await wpRestSearch(baseUrl, channelName, channelId, query || "", count, null, matchOptions);
    if (rest.length > 0) return rest;
  }
  // Bij MJ/EEF is Jina-langzaam vaak useless (Cloudflare); Google site: eerst als SERPER aan staat.
  try {
    const serp = await serpEarly;
    if (Array.isArray(serp) && serp.length) return serp;
  } catch {
    /* ignore */
  }
  const reader = await readerSearchFallback(searchUrl, channelName, channelId, count, query || "", matchOptions);
  if (reader.length > 0) return reader;
  return [];
}

async function searchChannelRecipes(query, allowedChannels = null, options = {}) {
  const q = encodeURIComponent(query);
  const seoBackfill = Boolean(options && options.seoBackfill);
  /** Iets hogere caps voor SEO-backfill (normale app-zoek blijft snel met 3–4/12). */
  const pc = seoBackfill ? 14 : 4;
  const pcTight = seoBackfill ? 12 : 3;
  const pcCuly = seoBackfill ? 24 : 12;
  const maxMerged = seoBackfill ? 80 : 30;
  const matchOptions = { relaxedQueryMatch: seoBackfill };
  // null = alle seed-kanalen; [] = géén seeds (alleen custom via /api/channel-search); anders = alleen die IDs
  const allow =
    allowedChannels === null
      ? null
      : new Set(Array.isArray(allowedChannels) ? allowedChannels.map((s) => String(s || "").trim()).filter(Boolean) : []);
  const seedOverrides = await getSeedChannelOverrides();
  const cfg = (id) => getEffectiveSeedChannelConfig(id, seedOverrides);

  async function scrapeOrRest(baseUrl, channelName, channelId, searchUrl, parser, count) {
    const serpEarly =
      channelIdUsesSerperFallback(channelId) &&
      serperGoogleSiteSearchRecipes({
        baseUrl,
        channelName,
        channelId,
        query,
        count,
        relaxedQueryMatch: matchOptions.relaxedQueryMatch,
      });
    // ch-mj / ch-ek: WP REST eerst — HTML-zoekpagina is vrijwel altijd achter Cloudflare,
    // JSON-endpoints worden minder agressief geblokkeerd.
    if (SEARCH_WP_REST_FIRST_IDS.has(channelId)) {
      const rest = await wpRestSearch(baseUrl, channelName, channelId, query, count, null, matchOptions);
      if (rest.length > 0) return rest;
    }
    try {
      const html = await fetchHtml(searchUrl);
      if (html && html.length > 500) {
        const scraped = parser(html, baseUrl, channelName, channelId, count);
        // Apply the same relevance filters here so HTML-scraped results aren't
        // less filtered than the WP REST fallback.
        const filtered = scraped
          .filter((r) => r.title && r.url)
          .filter((r) => urlLooksLikeRecipe(r.url))
          .filter((r) => titleLooksLikeRecipe(r.title))
          .filter((r) => !isLikelyBlogPage(r.title, r.url, r.description))
          .filter((r) => channelSearchResultTitleMatchesQuery(channelId, r.title, query, matchOptions))
          .sort((a, b) => titleQueryScore(b.title, query) - titleQueryScore(a.title, query))
          .slice(0, count);
        if (filtered.length > 0) return filtered;
      }
    } catch { /* fall through */ }
    if (!SEARCH_WP_REST_FIRST_IDS.has(channelId)) {
      const rest = await wpRestSearch(baseUrl, channelName, channelId, query, count, null, matchOptions);
      if (rest.length > 0) return rest;
    }
    try {
      const serp = await serpEarly;
      if (Array.isArray(serp) && serp.length) return serp;
    } catch {
      /* ignore */
    }
    const reader = await readerSearchFallback(searchUrl, channelName, channelId, count, query, matchOptions);
    if (reader.length > 0) return reader;
    return [];
  }

  function maybeSearch(channelId, fn) {
    if (allow && !allow.has(channelId)) return Promise.resolve([]);
    return fn();
  }

  // Run ALL searches in PARALLEL (not sequential).
  // Important: return results FAST — do not wait for slow channels/timeouts before responding.
  // We'll collect results as they arrive and return after a short global deadline.
  const collected = [];
  const searches = [
    // FAST: Reliable, quick-responding channels
    maybeSearch("ch-ah", () =>
      searchAHRecipes(query, pc, {
        searchUrlTemplate: cfg("ch-ah").searchUrlTemplate,
        ...(seoBackfill ? { seoBackfill: true } : {}),
      })
    ),
    maybeSearch("ch-jumbo", () => searchJumboRecipes(query, pc, { searchUrlTemplate: cfg("ch-jumbo").searchUrlTemplate, seoBackfill })),
    maybeSearch("ch-les", () => scrapeOrRest(cfg("ch-les").baseUrl || "https://www.lekkerensimpel.com", "Lekker & Simpel", "ch-les",
      buildSeedChannelSearchUrl("ch-les", cfg("ch-les"), query),
      parseLekkerSimpel, pc)),
    maybeSearch("ch-24k", () => scrapeOrRest(cfg("ch-24k").baseUrl || "https://www.24kitchen.nl", "24 Kitchen", "ch-24k",
      buildSeedChannelSearchUrl("ch-24k", cfg("ch-24k"), query),
      parse24Kitchen, pc).then(async (items) => {
        const cleaned = (Array.isArray(items) ? items : []).filter((r) => r && r.url && !/\.jpeg/i.test(String(r.url)));
        if (process.env.NODE_ENV !== "production" && Array.isArray(items) && cleaned.length !== items.length) {
          console.warn("🧹 Filtered 24Kitchen .jpeg search result(s)");
        }
        if (cleaned.length) return cleaned;
        const fac = await search24KitchenFac(query, pc, cfg("ch-24k"), matchOptions);
        const facCleaned = (Array.isArray(fac) ? fac : []).filter((r) => r && r.url && !/\.jpeg/i.test(String(r.url)));
        if (process.env.NODE_ENV !== "production" && Array.isArray(fac) && facCleaned.length !== fac.length) {
          console.warn("🧹 Filtered 24Kitchen FAC .jpeg result(s)");
        }
        return facCleaned;
      })),

    // MEDIUM: May be slower, but try anyway
    maybeSearch("ch-lb", () => scrapeOrRest(cfg("ch-lb").baseUrl || "https://www.laurasbakery.nl", "Laura's Bakery", "ch-lb",
      buildSeedChannelSearchUrl("ch-lb", cfg("ch-lb"), query),
      parseLaurasBakery, pc)),
    maybeSearch("ch-ek", () => scrapeOrRest(cfg("ch-ek").baseUrl || "https://www.eefkooktzo.nl", "Eef Kookt Zo", "ch-ek",
      buildSeedChannelSearchUrl("ch-ek", cfg("ch-ek"), query),
      parseWPStandard, pcTight)),
    maybeSearch("ch-up", () => scrapeOrRest(cfg("ch-up").baseUrl || "https://uitpaulineskeuken.nl", "Uit Paulines Keuken", "ch-up",
      buildSeedChannelSearchUrl("ch-up", cfg("ch-up"), query),
      parsePaulineSearch, pc)),
    maybeSearch("ch-clf", () => scrapeOrRest(cfg("ch-clf").baseUrl || "https://www.chickslovefood.com", "Chicks Love Food", "ch-clf",
      buildSeedChannelSearchUrl("ch-clf", cfg("ch-clf"), query),
      parseChicksLoveFood, pcTight)),
    maybeSearch("ch-culy", () => searchCulyRecipes(query, pcCuly, { ...cfg("ch-culy"), seoBackfill })),

    // SLOW: Include but expect timeouts
    maybeSearch("ch-mj", () => scrapeOrRest(cfg("ch-mj").baseUrl || "https://miljuschka.nl", "Miljuschka", "ch-mj",
      buildSeedChannelSearchUrl("ch-mj", cfg("ch-mj"), query),
      parseWPStandard, pc)),
    maybeSearch("ch-fm", () => scrapeOrRest(cfg("ch-fm").baseUrl || "https://www.foodiesmagazine.nl", "Foodies Magazine", "ch-fm",
      buildSeedChannelSearchUrl("ch-fm", cfg("ch-fm"), query),
      parseWPStandard, pc)),
  ];

  const instrumented = searches.map((p) =>
    Promise.resolve(p)
      .then((items) => {
        if (Array.isArray(items) && items.length) collected.push(items);
        return items;
      })
      .catch(() => [])
  );

  const waitMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const hasChannel = (lists, channelId) =>
    lists.some((list) => Array.isArray(list) && list.some((item) => item?.channelId === channelId));

  // When the client passes exactly one allowed channel, we must wait for that source
  // (often AH via Jina reader — multi-second) instead of racing short deadlines meant
  // for multi-channel variety. Otherwise Promise.race timeouts return [] before the
  // only requested channel finishes.
  const singleChannelMode = Boolean(allow && allow.size === 1);
  // ch-mj / ch-ek + custom/preview channels may need Serper; give their Google round-trip time to land.
  const allowNeedsSerperSlack =
    !allow || [...allow].some((id) => channelIdUsesSerperFallback(id));
  // Few channels selected: extra “variety” waits add latency without much benefit.
  const tightMode = Boolean(allow && allow.size > 0 && allow.size <= 4);
  // First slice: keep snappy, but Serper + some store APIs often need 3–6s in multi-channel mode.
  const GLOBAL_DEADLINE_MS = singleChannelMode
    ? 20_000
    : allowNeedsSerperSlack
      ? 5200
      : tightMode
        ? 1100
        : 1200;
  await Promise.race([Promise.allSettled(instrumented), waitMs(GLOBAL_DEADLINE_MS)]);

  const countDistinctChannels = (lists) => {
    const ids = new Set();
    for (const list of lists) {
      for (const item of Array.isArray(list) ? list : []) {
        if (item && item.channelId) ids.add(item.channelId);
      }
    }
    return ids.size;
  };

  // If nothing has arrived yet: admin single-channel tests await the full stack, but here we
  // previously raced too short — Serper fallbacks (Miljuschka / Eef) often land after 2–8s.
  if (collected.length === 0 && !singleChannelMode) {
    const lingerMs = allowNeedsSerperSlack ? 10_500 : tightMode ? 900 : 1600;
    await Promise.race([Promise.allSettled(instrumented), waitMs(lingerMs)]);
  }

  // If AH is enabled but hasn't arrived yet, wait a short extra window.
  // This fixes cases where AH is slightly slower than other sources.
  const ahEnabled = !allow || allow.has("ch-ah");
  if (!singleChannelMode && ahEnabled && !hasChannel(collected, "ch-ah")) {
    await Promise.race([Promise.allSettled(instrumented), waitMs(tightMode ? 450 : 1200)]);
  }

  // If we only have results from a single channel, wait a bit longer to improve variety.
  // (We still cap waiting so search stays snappy.) Skip when only one channel was
  // requested — distinct-channel variety does not apply.
  if (!singleChannelMode && !tightMode) {
    const MIN_DISTINCT_CHANNELS = 3;
    const distinct = countDistinctChannels(collected);
    if (collected.length > 0 && distinct < MIN_DISTINCT_CHANNELS) {
      await Promise.race([Promise.allSettled(instrumented), waitMs(700)]);
    }
  }

  // Interleave results from all channels for balanced variety
  const all = [];
  const channelResults = collected;

  if (channelResults.length > 0) {
    const maxLen = Math.max(...channelResults.map((r) => r.length));
    // Interleave: 1st result from each channel, then 2nd from each, etc.
    for (let i = 0; i < maxLen; i++) {
      for (const ch of channelResults) {
        if (ch[i]) all.push(ch[i]);
      }
    }
  }

  return all.slice(0, maxMerged);
}

function getSeedChannelName(channelId) {
  return SEED_CHANNELS.find((channel) => channel.id === channelId)?.name || sanitizeText(channelId || "Kanaal");
}

function normalizeRecipeSourceKey(url) {
  const raw = sanitizeText(url || "");
  if (!raw) return "";
  try {
    const u = new URL(raw);
    u.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"].forEach((key) => {
      u.searchParams.delete(key);
    });
    return `${u.hostname.replace(/^www\./i, "").toLowerCase()}${u.pathname.replace(/\/+$/, "") || "/"}`;
  } catch {
    return raw.toLowerCase();
  }
}

function isValidImportedSeoRecipe(recipe) {
  if (!recipe || typeof recipe !== "object") return false;
  const title = sanitizeText(recipe.title || "");
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.filter((item) => sanitizeText(item?.name || item || "")) : [];
  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions.filter((step) => sanitizeText(step || "")) : [];
  return Boolean(title && ingredients.length >= 2 && instructions.length >= 1);
}

async function searchSeoBackfillCandidatesForChannel({ channelId, keywords, limit, onKeyword }) {
  const seen = new Set();
  const candidates = [];
  const usedKeywords = [];
  const keywordTotal = Array.isArray(keywords) ? keywords.length : 0;
  let keywordIndex = 0;
  const shouldReportKeyword = (idx) => {
    if (keywordTotal <= 40) return true;
    if (keywordTotal <= 200) return idx % 5 === 0 || idx === keywordTotal;
    return idx % 25 === 0 || idx === keywordTotal;
  };
  for (const keyword of keywords) {
    if (candidates.length >= limit) break;
    const query = sanitizeText(keyword || "");
    if (query.length < 2) continue;
    keywordIndex += 1;
    if (shouldReportKeyword(keywordIndex)) {
      onKeyword?.({ keyword: query, keywordIndex, keywordTotal, channelId, targetKind: "seed" });
    }
    usedKeywords.push(query);
    let results = [];
    try {
      results = await searchChannelRecipes(query, [channelId], { seoBackfill: true });
    } catch {
      results = [];
    }
    for (const result of Array.isArray(results) ? results : []) {
      if (result?.channelId !== channelId) continue;
      const url = sanitizeText(result.url || "");
      const key = normalizeRecipeSourceKey(url);
      if (!url || !key || seen.has(key)) continue;
      seen.add(key);
      candidates.push({
        title: sanitizeText(result.title || ""),
        url,
        thumbnail: sanitizeText(result.thumbnail || ""),
        channelId,
        channel: sanitizeText(result.channel || getSeedChannelName(channelId)),
        keyword: query,
      });
      if (candidates.length >= limit) break;
    }
  }
  return { candidates, usedKeywords };
}

async function listSeoBackfillCustomChannelEntries(authUser, enabledSeedChannelIds, channelEnabledState) {
  const globalCustom = await getGlobalCustomChannels().catch(() => []);
  const adminCustom = [];
  const seenAdminCustomIds = new Set();
  const pushAdminCustom = (ch) => {
    const id = sanitizeText(ch?.id || "");
    const name = sanitizeText(ch?.name || "").slice(0, 80);
    const url = sanitizeText(ch?.url || "").slice(0, 500);
    if (!id || !name || !url || seenAdminCustomIds.has(id)) return;
    const clean = {
      ...ch,
      id,
      name,
      url,
      status: sanitizeText(ch?.status || "approved") || "approved",
      managedByAdmin: Boolean(ch?.managedByAdmin),
    };
    seenAdminCustomIds.add(clean.id);
    adminCustom.push(clean);
  };
  for (const ch of Array.isArray(globalCustom) ? globalCustom : []) pushAdminCustom(ch);
  try {
    if (isPostgresEnabled()) {
      await ensurePostgresSchema();
      const pool = await getPostgresPool();
      const result = await pool.query("SELECT app_state FROM plately_users");
      for (const row of result.rows || []) {
        const appState = typeof row.app_state === "object" ? row.app_state : JSON.parse(row.app_state || "{}");
        for (const ch of Array.isArray(appState.customChannels) ? appState.customChannels : []) pushAdminCustom(ch);
      }
    } else {
      const rawFile = await fsp.readFile(DATA_FILE, "utf8");
      const parsed = JSON.parse(rawFile);
      for (const u of Object.values(parsed.users || {})) {
        for (const ch of Array.isArray(u.customChannels) ? u.customChannels : []) pushAdminCustom(ch);
      }
    }
  } catch {
    /* global custom channels are still enough as fallback */
  }
  const appState = withGlobalCustomChannels(buildAppStateFromUser(authUser), globalCustom);
  const followed = Array.isArray(appState.followedChannelIds)
    ? appState.followedChannelIds.map((id) => sanitizeText(id)).filter(Boolean)
    : [];
  const globalCustomIds = new Set(
    adminCustom
      .map((ch) => sanitizeText(ch?.id || ""))
      .filter(Boolean)
  );
  const combinedCustom = [];
  const seenCombinedCustomIds = new Set();
  for (const ch of [...adminCustom, ...(Array.isArray(appState.customChannels) ? appState.customChannels : [])]) {
    const id = sanitizeText(ch?.id || "");
    if (!id || seenCombinedCustomIds.has(id)) continue;
    seenCombinedCustomIds.add(id);
    combinedCustom.push(ch);
  }
  const customList = combinedCustom.filter((ch) => {
    const id = sanitizeText(ch?.id || "");
    if (!id) return false;
    const isGlobalAdminChannel = Boolean(ch?.managedByAdmin) || globalCustomIds.has(id);
    if (!isGlobalAdminChannel && !followed.includes(id)) return false;
    if (String(ch?.status || "approved") === "rejected") return false;
    return isChannelEnabled("custom", id, channelEnabledState);
  });
  const enabledSeedBaseUrls = (Array.isArray(enabledSeedChannelIds) ? enabledSeedChannelIds : [])
    .map((id) => SEED_CHANNEL_DEFAULTS[sanitizeText(id)]?.baseUrl || "")
    .filter(Boolean);
  return customList
    .map((ch) => ({
      channelId: sanitizeText(ch.id || ""),
      name: sanitizeText(ch.name || "").slice(0, 80),
      url: sanitizeText(ch.url || "").slice(0, 500),
    }))
    .filter((ch) => ch.channelId && ch.name && ch.url)
    .filter((ch) => {
      for (const seedBaseUrl of enabledSeedBaseUrls) {
        if (channelUrlsMatchByBaseOrPrefix(ch.url, seedBaseUrl)) return false;
      }
      return true;
    })
    .slice(0, 10);
}

async function searchSeoBackfillCandidatesForCustomChannel({
  channelId,
  channelName,
  channelUrl,
  keywords,
  limit,
  onKeyword,
}) {
  const seen = new Set();
  const candidates = [];
  const usedKeywords = [];
  const channelOverrides = await getChannelOverrides();
  const eff = getEffectiveCustomChannelConfig({ channelId, url: channelUrl }, channelOverrides);
  const keywordTotal = Array.isArray(keywords) ? keywords.length : 0;
  let keywordIndex = 0;
  const shouldReportKeyword = (idx) => {
    if (keywordTotal <= 40) return true;
    if (keywordTotal <= 200) return idx % 5 === 0 || idx === keywordTotal;
    return idx % 25 === 0 || idx === keywordTotal;
  };
  for (const keyword of keywords) {
    if (candidates.length >= limit) break;
    const query = sanitizeText(keyword || "");
    if (query.length < 2) continue;
    keywordIndex += 1;
    if (shouldReportKeyword(keywordIndex)) {
      onKeyword?.({ keyword: query, keywordIndex, keywordTotal, channelId, targetKind: "custom" });
    }
    usedKeywords.push(query);
    let results = [];
    try {
      const usedUrl = buildSeedSearchUrlFromTemplate(eff.searchUrlTemplate, query);
      const merged = await scrapeOrRestPublic(eff.baseUrl, channelName, channelId, usedUrl, parseWPStandard, 14, query, {
        relaxedQueryMatch: true,
        forceSerperFallback: true,
      });
      results = (Array.isArray(merged) ? merged : []).filter((r) =>
        channelSearchResultTitleMatchesQuery(channelId, r.title, query, { relaxedQueryMatch: true })
      );
    } catch {
      results = [];
    }
    for (const result of results) {
      if (result?.channelId !== channelId) continue;
      const url = sanitizeText(result.url || "");
      const key = normalizeRecipeSourceKey(url);
      if (!url || !key || seen.has(key)) continue;
      seen.add(key);
      candidates.push({
        title: sanitizeText(result.title || ""),
        url,
        thumbnail: sanitizeText(result.thumbnail || ""),
        channelId,
        channel: sanitizeText(result.channel || channelName),
        keyword: query,
      });
      if (candidates.length >= limit) break;
    }
  }
  return { candidates, usedKeywords };
}

async function importSeoBackfillCandidate(candidate) {
  if (candidate?.channelId === "ch-ah" && !isAhAllerhandeRecipeUrl(candidate.url)) {
    throw new HttpError(400, "Geen echte Allerhande recept-URL.");
  }
  const recipe = await importRecipe(candidate.url, "", candidate.thumbnail || "");
  if (!isValidImportedSeoRecipe(recipe)) {
    throw new HttpError(400, "Geen geldig recept gevonden.");
  }
  const sourceUrl = sanitizeText(recipe.sourceUrl || candidate.url || "");
  const merged = {
    ...recipe,
    id: recipe.id || `seo-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    sourceUrl: sourceUrl || candidate.url,
    image: recipe.image || candidate.thumbnail || "assets/hero-burger.svg",
    platform: recipe.platform || "website",
    author: recipe.author || candidate.channel,
  };

  const rv0 = Number(recipe.ratingValue);
  const rc0 = Number(recipe.ratingCount);
  const fromImport =
    Number.isFinite(rv0) && rv0 >= 1 && rv0 <= 5 && Number.isFinite(rc0) && rc0 >= 1
      ? {
          ratingValue: Math.round(rv0),
          ratingCount: Math.max(1, Math.round(rc0)),
          ...(recipe.ratingNormalizedFromWideScale ? { ratingNormalizedFromWideScale: true } : {}),
        }
      : null;
  const fromCandidate = pickChannelSearchCandidateRating(candidate);
  let ratingPatch = fromImport || fromCandidate;
  if (!ratingPatch) {
    ratingPatch = await fetchAggregateRatingForRecipePageUrl(sourceUrl || candidate.url);
  }
  if (ratingPatch) {
    Object.assign(merged, ratingPatch);
  }

  return sanitizeRecipeForStorage(merged);
}

async function saveSeoBackfillRecipesForUser(userId, recipes, options = {}) {
  const forceReimport = Boolean(options.forceReimport);
  const cleanRecipes = (Array.isArray(recipes) ? recipes : []).map(sanitizeRecipeForStorage).filter(Boolean);
  if (!cleanRecipes.length) return { added: 0, updated: 0, skipped: 0, importedRecipes: [] };

  let currentUser = null;
  if (isPostgresEnabled()) {
    await ensurePostgresSchema();
    const pool = await getPostgresPool();
    const result = await pool.query(`SELECT * FROM plately_users WHERE id = $1 LIMIT 1`, [userId]);
    currentUser = result.rows[0] || null;
  } else {
    const db = await loadDatabase();
    currentUser = db.users?.[userId] || null;
  }
  if (!currentUser) throw new HttpError(404, "Gebruiker niet gevonden.");

  const appState = buildAppStateFromUser(currentUser);
  const existingRecipes = (Array.isArray(appState.importedRecipes) ? appState.importedRecipes : []).map((r) => ({ ...r }));
  const existingSourceKeys = new Set(existingRecipes.map((recipe) => normalizeRecipeSourceKey(recipe.sourceUrl)).filter(Boolean));
  const existingIds = new Set(existingRecipes.map((recipe) => sanitizeText(recipe.id || "")).filter(Boolean));
  const newRecipes = [];
  let skipped = 0;
  let updated = 0;

  for (const recipe of cleanRecipes) {
    const sourceKey = normalizeRecipeSourceKey(recipe.sourceUrl);
    const existingIdx =
      sourceKey !== "" ? existingRecipes.findIndex((r) => normalizeRecipeSourceKey(r.sourceUrl) === sourceKey) : -1;

    if (existingIdx >= 0) {
      if (forceReimport) {
        const old = existingRecipes[existingIdx];
        const next = sanitizeRecipeForStorage({ ...old, ...recipe, id: old.id });
        if (!next) {
          skipped += 1;
          continue;
        }
        existingRecipes[existingIdx] = next;
        updated += 1;
        continue;
      }
      skipped += 1;
      continue;
    }

    if (existingIds.has(recipe.id)) {
      skipped += 1;
      continue;
    }
    if (sourceKey && existingSourceKeys.has(sourceKey)) {
      skipped += 1;
      continue;
    }
    existingSourceKeys.add(sourceKey);
    existingIds.add(recipe.id);
    newRecipes.push(recipe);
  }

  if (!newRecipes.length && !updated) {
    return {
      added: 0,
      updated: 0,
      skipped,
      importedRecipes: existingRecipes,
    };
  }

  const cookbookName = "SEO recepten";
  const cookbooks = Array.isArray(appState.cookbooks) && appState.cookbooks.length
    ? appState.cookbooks.map((cookbook, index) => sanitizeCookbookForStorage(cookbook, `cookbook-${index + 1}`))
    : DEFAULT_COOKBOOKS.map((cookbook) => ({ ...cookbook, recipeIds: [...cookbook.recipeIds] }));
  let cookbook = cookbooks.find((item) => item.name === cookbookName);
  if (!cookbook) {
    cookbook = { id: "cookbook-seo-recipes", name: cookbookName, recipeIds: [] };
    cookbooks.unshift(cookbook);
  }
  for (const recipe of newRecipes) {
    if (!cookbook.recipeIds.includes(recipe.id)) cookbook.recipeIds.unshift(recipe.id);
  }

  const nextState = {
    ...appState,
    importedRecipes: newRecipes.length ? [...newRecipes, ...existingRecipes] : existingRecipes,
    cookbooks,
    selectedCookbookId: appState.selectedCookbookId || cookbook.id,
    featuredRecipeId: newRecipes[0]?.id || appState.featuredRecipeId,
    selectedRecipeId: newRecipes[0]?.id || appState.selectedRecipeId,
  };

  if (isPostgresEnabled()) {
    await updateAuthenticatedUserState(userId, nextState);
  } else {
    const db = await loadDatabase();
    db.users[userId] = sanitizeUserStatePayload(nextState, currentUser);
    await persistDatabase();
  }

  return {
    added: newRecipes.length,
    updated,
    skipped,
    importedRecipes: nextState.importedRecipes,
  };
}

function dedupeImportedRecipesBySourceUrlForUser(user) {
  const appState = buildAppStateFromUser(user);
  const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [];
  const kept = [];
  const firstBySource = new Map();
  const duplicateIdToKeptId = new Map();
  const duplicateGroups = new Map();

  for (const recipe of recipes) {
    const id = sanitizeText(recipe?.id || "");
    const sourceKey = normalizeRecipeSourceKey(recipe?.sourceUrl || recipe?.source || "");
    if (!sourceKey) {
      kept.push(recipe);
      continue;
    }
    const existing = firstBySource.get(sourceKey);
    if (!existing) {
      firstBySource.set(sourceKey, { id, title: sanitizeText(recipe?.title || "Recept"), sourceUrl: sanitizeText(recipe?.sourceUrl || recipe?.source || "") });
      kept.push(recipe);
      continue;
    }
    if (id) duplicateIdToKeptId.set(id, existing.id);
    const group = duplicateGroups.get(sourceKey) || {
      sourceKey,
      sourceUrl: existing.sourceUrl,
      keptId: existing.id,
      keptTitle: existing.title,
      removed: [],
    };
    group.removed.push({ id, title: sanitizeText(recipe?.title || "Recept") });
    duplicateGroups.set(sourceKey, group);
  }

  if (!duplicateIdToKeptId.size) {
    return { changed: false, removed: 0, nextState: appState, duplicateGroups: [] };
  }

  const rewriteRecipeIds = (ids) => {
    const out = [];
    const seen = new Set();
    for (const rawId of Array.isArray(ids) ? ids : []) {
      const id = sanitizeText(rawId || "");
      const nextId = duplicateIdToKeptId.get(id) || id;
      if (!nextId || seen.has(nextId)) continue;
      seen.add(nextId);
      out.push(nextId);
    }
    return out;
  };

  const nextCookbooks = (Array.isArray(appState.cookbooks) ? appState.cookbooks : []).map((cookbook) => ({
    ...cookbook,
    recipeIds: rewriteRecipeIds(cookbook.recipeIds),
  }));
  const selectedRecipeId = duplicateIdToKeptId.get(sanitizeText(appState.selectedRecipeId || "")) || appState.selectedRecipeId;
  const featuredRecipeId = duplicateIdToKeptId.get(sanitizeText(appState.featuredRecipeId || "")) || appState.featuredRecipeId;

  return {
    changed: true,
    removed: duplicateIdToKeptId.size,
    nextState: {
      ...appState,
      importedRecipes: kept,
      cookbooks: nextCookbooks,
      selectedRecipeId,
      featuredRecipeId,
    },
    duplicateGroups: Array.from(duplicateGroups.values()),
  };
}

function getImportedRecipeSourceHost(recipe) {
  const sourceUrl = sanitizeText(recipe?.sourceUrl || recipe?.source || "");
  if (!sourceUrl) return "";
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

function getImportedRecipeChannelInfo(recipe) {
  const sourceUrl = sanitizeText(recipe?.sourceUrl || recipe?.source || "");
  const channelId = inferSeedChannelIdFromSourceUrl(sourceUrl) || sanitizeText(recipe?.channelId || "");
  const host = getImportedRecipeSourceHost(recipe);
  return {
    id: channelId || host || "unknown",
    label: channelId ? getSeedChannelName(channelId) : (host || "Onbekend"),
    host,
    channelId,
  };
}

function getImportedRecipeIssues(recipe) {
  const issues = [];
  const title = sanitizeText(recipe?.title || "");
  const sourceUrl = sanitizeText(recipe?.sourceUrl || recipe?.source || "");
  const image = sanitizeText(recipe?.image || "");
  const ingredients = Array.isArray(recipe?.ingredients)
    ? recipe.ingredients.filter((item) => sanitizeText(item?.name || item || ""))
    : [];
  const instructions = Array.isArray(recipe?.instructions)
    ? recipe.instructions.filter((step) => sanitizeText(step || ""))
    : [];
  if (!title) issues.push("missing_title");
  if (!sourceUrl) issues.push("missing_source_url");
  if (!image || /hero-burger\.svg$/i.test(image)) issues.push("missing_image");
  if (ingredients.length < 2) issues.push("too_few_ingredients");
  if (instructions.length < 1) issues.push("missing_steps");
  return issues;
}

function collectImportQualityForUsers(users) {
  const rowsById = new Map();
  const sourceSeen = new Map();
  let totalRecipes = 0;
  for (const user of users || []) {
    const appState = buildAppStateFromUser(user);
    const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [];
    for (const recipe of recipes) {
      totalRecipes += 1;
      const info = getImportedRecipeChannelInfo(recipe);
      const row = rowsById.get(info.id) || {
        id: info.id,
        label: info.label,
        host: info.host,
        total: 0,
        valid: 0,
        missingImage: 0,
        missingSourceUrl: 0,
        invalidRecipe: 0,
        duplicateSourceUrl: 0,
        lastTitle: "",
        lastSourceUrl: "",
      };
      const issues = getImportedRecipeIssues(recipe);
      row.total += 1;
      if (!issues.some((issue) => issue !== "missing_image")) row.valid += 1;
      if (issues.includes("missing_image")) row.missingImage += 1;
      if (issues.includes("missing_source_url")) row.missingSourceUrl += 1;
      if (issues.some((issue) => issue !== "missing_image")) row.invalidRecipe += 1;
      row.lastTitle = sanitizeText(recipe?.title || row.lastTitle || "");
      row.lastSourceUrl = sanitizeText(recipe?.sourceUrl || recipe?.source || row.lastSourceUrl || "");
      rowsById.set(info.id, row);

      const sourceKey = normalizeRecipeSourceKey(recipe?.sourceUrl || recipe?.source || "");
      if (sourceKey) {
        const previous = sourceSeen.get(sourceKey);
        if (previous) {
          row.duplicateSourceUrl += 1;
          previous.duplicateSourceUrl += 1;
        } else {
          sourceSeen.set(sourceKey, row);
        }
      }
    }
  }
  const rows = Array.from(rowsById.values()).map((row) => ({
    ...row,
    successRate: row.total ? Math.round((row.valid / row.total) * 100) : 0,
    issueCount: row.missingSourceUrl + row.invalidRecipe + row.duplicateSourceUrl,
  })).sort((a, b) => (b.issueCount - a.issueCount) || (b.total - a.total));
  return { totalRecipes, rows };
}

function cleanSeoRecipesForUser(user) {
  const appState = buildAppStateFromUser(user);
  const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [];
  const cookbooks = Array.isArray(appState.cookbooks) ? appState.cookbooks : [];
  const seoCookbook = cookbooks.find((c) => sanitizeText(c?.name || "") === "SEO recepten");
  const seoIds = new Set(Array.isArray(seoCookbook?.recipeIds) ? seoCookbook.recipeIds.map((id) => sanitizeText(id)).filter(Boolean) : []);
  if (!seoIds.size) return { changed: false, nextState: appState, removed: [], keptIssueCount: 0 };

  const recipeById = new Map(recipes.map((recipe) => [sanitizeText(recipe?.id || ""), recipe]));
  const seenSources = new Set();
  const removeIds = new Set();
  const removed = [];
  let keptIssueCount = 0;

  for (const id of seoIds) {
    const recipe = recipeById.get(id);
    if (!recipe) {
      removeIds.add(id);
      removed.push({ id, title: "(ontbreekt)", reason: "recipe_missing" });
      continue;
    }
    const issues = getImportedRecipeIssues(recipe);
    const sourceKey = normalizeRecipeSourceKey(recipe?.sourceUrl || recipe?.source || "");
    let reason = "";
    if (issues.includes("missing_source_url")) reason = "missing_source_url";
    else if (issues.includes("missing_title") || issues.includes("too_few_ingredients") || issues.includes("missing_steps")) reason = "invalid_recipe";
    else if (sourceKey && seenSources.has(sourceKey)) reason = "duplicate_source_url";

    if (sourceKey) seenSources.add(sourceKey);
    if (reason) {
      removeIds.add(id);
      removed.push({ id, title: sanitizeText(recipe?.title || "Recept"), reason, sourceUrl: sanitizeText(recipe?.sourceUrl || "") });
    } else if (issues.length) {
      keptIssueCount += 1;
    }
  }

  if (!removeIds.size) return { changed: false, nextState: appState, removed, keptIssueCount };
  const nextRecipes = recipes.filter((recipe) => !removeIds.has(sanitizeText(recipe?.id || "")));
  const nextCookbooks = cookbooks.map((cookbook) => ({
    ...cookbook,
    recipeIds: (Array.isArray(cookbook.recipeIds) ? cookbook.recipeIds : []).filter((id) => !removeIds.has(sanitizeText(id || ""))),
  }));
  const fallbackId = nextRecipes[0]?.id || "";
  const nextState = {
    ...appState,
    importedRecipes: nextRecipes,
    cookbooks: nextCookbooks,
    selectedRecipeId: removeIds.has(sanitizeText(appState.selectedRecipeId || "")) ? fallbackId : appState.selectedRecipeId,
    featuredRecipeId: removeIds.has(sanitizeText(appState.featuredRecipeId || "")) ? fallbackId : appState.featuredRecipeId,
  };
  return { changed: true, nextState, removed, keptIssueCount };
}

async function repairSeoRecipesForUser(user, options = {}) {
  const maxRecipes = Math.max(1, Math.min(Number(options.maxRecipes) || 20, 100));
  const mode = ["image", "rating", "reimport"].includes(options.mode) ? options.mode : "reimport";
  const lowestFirst = Boolean(options.lowestFirst);
  const maxScore = Number.isFinite(Number(options.maxScore)) ? Math.max(0, Math.min(Number(options.maxScore), 100)) : null;
  const appState = buildAppStateFromUser(user);
  const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes.map((r) => ({ ...r })) : [];
  const cookbooks = Array.isArray(appState.cookbooks) ? appState.cookbooks : [];
  const seoCookbook = cookbooks.find((c) => sanitizeText(c?.name || "") === "SEO recepten");
  const seoIds = new Set(Array.isArray(seoCookbook?.recipeIds) ? seoCookbook.recipeIds.map((id) => sanitizeText(id)).filter(Boolean) : []);
  if (!seoIds.size) return { changed: false, nextState: appState, repaired: [], failed: [] };

  const repaired = [];
  const failed = [];
  const seenSources = new Set();
  const repairOrder = recipes
    .map((recipe, index) => ({ index, recipe, score: computeSeoRecipeScore(recipe) }))
    .filter((item) => seoIds.has(sanitizeText(item.recipe?.id || "")))
    .filter((item) => maxScore === null || item.score <= maxScore);
  if (lowestFirst) {
    repairOrder.sort((a, b) => (a.score - b.score) || a.index - b.index);
  }

  for (const item of repairOrder) {
    if (repaired.length + failed.length >= maxRecipes) break;
    const i = item.index;
    const recipe = recipes[i];
    const id = sanitizeText(recipe?.id || "");
    const issues = getImportedRecipeIssues(recipe);
    const sourceUrl = sanitizeText(recipe?.sourceUrl || recipe?.source || "");
    const sourceKey = normalizeRecipeSourceKey(sourceUrl);
    const duplicate = sourceKey && seenSources.has(sourceKey);
    if (sourceKey) seenSources.add(sourceKey);
    const repairable =
      sourceUrl &&
      (mode === "rating" ||
        issues.includes("missing_image") ||
        issues.includes("too_few_ingredients") ||
        issues.includes("missing_steps") ||
        issues.includes("missing_title"));
    if (!repairable || duplicate) continue;

    try {
      let merged = null;
      if (mode === "rating") {
        const ratingPatch = await fetchAggregateRatingForRecipePageUrl(sourceUrl);
        if (!ratingPatch) {
          failed.push({ id, title: sanitizeText(recipe?.title || "Recept"), sourceUrl, error: "geen_rating_gevonden" });
          continue;
        }
        merged = sanitizeRecipeForStorage({ ...recipe, ...ratingPatch, id });
      } else {
        const fresh = await importRecipe(sourceUrl, "", sanitizeText(recipe?.image || ""));
        merged = sanitizeRecipeForStorage({
          ...recipe,
          ...(mode === "image" ? { image: fresh?.image || recipe?.image || "" } : fresh),
          id,
          sourceUrl: sanitizeText(fresh?.sourceUrl || sourceUrl),
          image: sanitizeText(fresh?.image || recipe?.image || ""),
          platform: sanitizeText(fresh?.platform || recipe?.platform || "website"),
        });
      }
      if (!merged || !isValidImportedSeoRecipe(merged)) {
        failed.push({ id, title: sanitizeText(recipe?.title || "Recept"), sourceUrl, error: "nog_ongeldig" });
        continue;
      }
      recipes[i] = merged;
      repaired.push({ id, title: sanitizeText(merged.title || "Recept"), sourceUrl, mode, scoreBefore: item.score, scoreAfter: computeSeoRecipeScore(merged), fixed: issues });
    } catch (error) {
      failed.push({
        id,
        title: sanitizeText(recipe?.title || "Recept"),
        sourceUrl,
        error: sanitizeText(error?.message || "reparatie mislukt").slice(0, 180),
      });
    }
  }

  if (!repaired.length) return { changed: false, nextState: appState, repaired, failed };
  return {
    changed: true,
    nextState: { ...appState, importedRecipes: recipes },
    repaired,
    failed,
  };
}

async function runSeoRecipeBackfillForUser(authUser, options = {}) {
  const onProgress = typeof options.onProgress === "function" ? options.onProgress : null;
  const forceReimport = Boolean(options.forceReimport);
  const appState = buildAppStateFromUser(authUser);
  const channelEnabled = await getChannelEnabledState().catch(() => ({ seed: {}, custom: {} }));
  const requestedChannels = Array.isArray(options.channels)
    ? options.channels.map((id) => sanitizeText(id || "")).filter(Boolean)
    : [];
  const followedSeedChannels = Array.isArray(appState.followedChannelIds)
    ? appState.followedChannelIds.filter((id) => SEED_CHANNEL_DEFAULTS[id] && isChannelEnabled("seed", id, channelEnabled))
    : [];
  const fallbackSeedChannels = SEED_CHANNELS.map((c) => sanitizeText(c.id || "")).filter(
    (id) => SEED_CHANNEL_DEFAULTS[id] && isChannelEnabled("seed", id, channelEnabled)
  );
  const channelSource = requestedChannels.length
    ? requestedChannels
    : followedSeedChannels.length
      ? followedSeedChannels
      : fallbackSeedChannels;
  const channels = channelSource
    .filter((id) => SEED_CHANNEL_DEFAULTS[id] && isChannelEnabled("seed", id, channelEnabled))
    .slice(0, 10);
  const channelSelection = requestedChannels.length ? "explicit" : followedSeedChannels.length ? "followed" : "fallback";
  const limitPerChannel = Math.min(40, Math.max(1, Number.parseInt(options.limitPerChannel, 10) || 10));
  const popularTopRaw = options.popularTopN ?? options.preferPopularTop;
  let popularTopN = 0;
  if (popularTopRaw === true || popularTopRaw === "true") popularTopN = 100;
  else {
    const n = Number.parseInt(String(popularTopRaw ?? ""), 10);
    if (Number.isFinite(n) && n > 0) popularTopN = Math.min(200, n);
  }
  const allPoolKeywords = Boolean(options.allPoolKeywords || options.useAllPoolKeywords);
  const customKeywordList = Array.isArray(options.keywords)
    ? options.keywords.map((keyword) => sanitizeText(keyword || "")).filter((keyword) => keyword.length >= 2)
    : [];
  const usingCustomKeywords = !allPoolKeywords && customKeywordList.length > 0;
  const parsedKeywordCap = Number.parseInt(options.keywordLimit, 10);
  const poolLen = Array.isArray(SEO_RECIPE_BACKFILL_KEYWORDS) ? SEO_RECIPE_BACKFILL_KEYWORDS.length : 0;
  const maxPoolSlice = 5000;

  let keywords = [];
  let keywordMode = "defaultSlice";
  if (allPoolKeywords) {
    keywordMode = "allPool";
    const cap = Number.isFinite(parsedKeywordCap) && parsedKeywordCap > 0
      ? Math.min(maxPoolSlice, Math.max(1, parsedKeywordCap))
      : Math.min(maxPoolSlice, poolLen);
    keywords = (SEO_RECIPE_BACKFILL_KEYWORDS || []).slice(0, cap);
  } else if (usingCustomKeywords) {
    keywordMode = "custom";
    const keywordLimit = Math.min(200, Math.max(1, Number.isFinite(parsedKeywordCap) ? parsedKeywordCap : customKeywordList.length));
    keywords = customKeywordList.slice(0, keywordLimit);
  } else {
    keywordMode = "defaultSlice";
    const keywordLimit = Math.min(
      poolLen,
      Math.max(6, Number.isFinite(parsedKeywordCap) ? parsedKeywordCap : 28)
    );
    keywords = (SEO_RECIPE_BACKFILL_KEYWORDS || []).slice(0, keywordLimit);
  }
  const dryRun = Boolean(options.dryRun);

  const requestedCustomChannels = Array.isArray(options.customChannels)
    ? options.customChannels.map((id) => sanitizeText(id || "")).filter(Boolean)
    : Array.isArray(options.customChannelIds)
      ? options.customChannelIds.map((id) => sanitizeText(id || "")).filter(Boolean)
      : [];
  let customEntries = await listSeoBackfillCustomChannelEntries(authUser, channels, channelEnabled);
  if (requestedCustomChannels.length) {
    const requestedCustomSet = new Set(requestedCustomChannels);
    customEntries = customEntries.filter((ch) => requestedCustomSet.has(sanitizeText(ch.channelId || "")));
  }
  const targets = [
    ...channels.map((channelId) => ({
      kind: "seed",
      channelId,
      name: getSeedChannelName(channelId),
      url: "",
      label: getSeedChannelName(channelId),
    })),
    ...customEntries.map((ch) => ({
      kind: "custom",
      channelId: ch.channelId,
      name: ch.name,
      url: ch.url,
      label: `${ch.name} (custom)`,
    })),
  ];

  if (!targets.length) {
    throw new HttpError(
      400,
      "Geen actieve seed- of custom-kanalen gevonden. Zet kanalen aan in admin, volg (custom)kanalen in de app, of stuur body.channels met seed-id's (bijv. [\"ch-ah\",\"ch-jumbo\"])."
    );
  }
  if (!keywords.length) {
    throw new HttpError(400, "Geen zoekwoorden om te gebruiken (pool leeg of keywordLimit te klein).");
  }

  const recipesInAccountBefore = Array.isArray(appState.importedRecipes) ? appState.importedRecipes.length : 0;
  const allImported = [];
  const mergeImportStats = (patch) => ({
    recipesInAccountBefore,
    importedThisRun: allImported.length,
    importedSoFar: allImported.length,
    recipesApproxInAccount: recipesInAccountBefore + allImported.length,
    ...patch,
  });

  onProgress?.(
    mergeImportStats({
      phase: "init",
      message: `${targets.length} kanaal/kanalen, ${keywords.length} zoekwoorden · ${recipesInAccountBefore} recepten in account vóór run`,
      targetTotal: targets.length,
      keywordTotal: keywords.length,
      dryRun,
    })
  );

  const report = [];
  let targetIndex = 0;
  for (const target of targets) {
    targetIndex += 1;
    onProgress?.(
      mergeImportStats({
        phase: "search",
        message: `Zoeken: ${target.label}`,
        targetKind: target.kind,
        channelId: target.channelId,
        targetIndex,
        targetTotal: targets.length,
      })
    );

    const searchLimit = Math.max(64, limitPerChannel * 4);
    const onKw = (kw) =>
      onProgress?.(
        mergeImportStats({
          phase: "search",
          message: `Zoeken: ${target.label} — ${kw.keyword} (${kw.keywordIndex}/${kw.keywordTotal})`,
          targetKind: kw.targetKind || target.kind,
          channelId: target.channelId,
          targetIndex,
          targetTotal: targets.length,
          keyword: kw.keyword,
          keywordIndex: kw.keywordIndex,
          keywordTotal: kw.keywordTotal,
        })
      );

    let candidates = [];
    let usedKeywords = [];
    if (target.kind === "seed") {
      const res = await searchSeoBackfillCandidatesForChannel({
        channelId: target.channelId,
        keywords,
        limit: searchLimit,
        onKeyword: onKw,
      });
      candidates = res.candidates;
      usedKeywords = res.usedKeywords;
    } else {
      const res = await searchSeoBackfillCandidatesForCustomChannel({
        channelId: target.channelId,
        channelName: target.name,
        channelUrl: target.url,
        keywords,
        limit: searchLimit,
        onKeyword: onKw,
      });
      candidates = res.candidates;
      usedKeywords = res.usedKeywords;
    }

    const candidatesDiscovered = candidates.length;
    if (popularTopN > 0 && candidates.length > 1) {
      onProgress?.(
        mergeImportStats({
          phase: "rank",
          message: `Top-${popularTopN} op populariteit (ratings): ${candidatesDiscovered} kandidaten sorteren (${target.label})`,
          targetKind: target.kind,
          channelId: target.channelId,
          targetIndex,
          targetTotal: targets.length,
        })
      );
      candidates = await rankSeoBackfillCandidatesByPopularity(candidates, { popularTopN });
    }

    const imported = [];
    const failed = [];
    if (!dryRun) {
      let candIdx = 0;
      const capThisTarget = Math.min(candidates.length, limitPerChannel);
      for (const candidate of candidates) {
        if (imported.length >= limitPerChannel) break;
        candIdx += 1;
        try {
          const recipe = await importSeoBackfillCandidate(candidate);
          imported.push({ recipe, candidate });
          allImported.push(recipe);
          onProgress?.(
            mergeImportStats({
              phase: "import",
              message: `${target.label}: ${imported.length}/${capThisTarget} in dit kanaal · ${allImported.length} geïmporteerd in deze run`,
              targetKind: target.kind,
              channelId: target.channelId,
              targetIndex,
              targetTotal: targets.length,
              candidateUrl: candidate.url,
              candidateIndex: candIdx,
            })
          );
        } catch (error) {
          failed.push({
            title: candidate.title,
            url: candidate.url,
            keyword: candidate.keyword,
            error: sanitizeText(error?.message || "Import mislukt").slice(0, 180),
          });
        }
      }
    }
    report.push({
      targetKind: target.kind,
      channelId: target.channelId,
      channel: target.name,
      customChannelUrl: target.kind === "custom" ? target.url : undefined,
      candidatesDiscovered: popularTopN > 0 ? candidatesDiscovered : undefined,
      candidatesFound: candidates.length,
      popularTopN: popularTopN > 0 ? popularTopN : undefined,
      imported: dryRun ? 0 : imported.length,
      failed: failed.length,
      usedKeywords,
      candidates: dryRun ? candidates.slice(0, limitPerChannel) : undefined,
      failures: failed.slice(0, 10),
    });
  }

  onProgress?.(
    mergeImportStats({
      phase: "save",
      message: dryRun
        ? `Dry-run: geen opslag · ${recipesInAccountBefore} recepten in account`
        : `${allImported.length} geïmporteerd in deze run, opslaan… · was ${recipesInAccountBefore} in account`,
    })
  );

  const saved = dryRun
    ? { added: 0, updated: 0, skipped: 0, importedRecipes: appState.importedRecipes || [] }
    : await saveSeoBackfillRecipesForUser(authUser.id, allImported, { forceReimport });

  if (!dryRun && onProgress && Array.isArray(saved.importedRecipes)) {
    const recipesInAccountAfter = saved.importedRecipes.length;
    onProgress?.(
      mergeImportStats({
        phase: "saved",
        message: `+${saved.added} nieuw, ${saved.updated || 0} bijgewerkt, ${saved.skipped} overgeslagen`,
        recipesInAccountAfter,
        recipesApproxInAccount: recipesInAccountAfter,
        savedAdded: saved.added,
        savedUpdated: saved.updated || 0,
        skippedExisting: saved.skipped,
      })
    );
  }

  return {
    ok: true,
    dryRun,
    channelSelection,
    keywordMode,
    keywordCount: keywords.length,
    keywordsUsed: keywords,
    customChannelTargets: customEntries.length,
    ...(popularTopN > 0 ? { popularTopN } : {}),
    channels: report,
    totals: {
      targets: targets.length,
      seedTargets: channels.length,
      customTargets: customEntries.length,
      candidates: report.reduce((sum, item) => sum + (item.candidatesFound || 0), 0),
      imported: report.reduce((sum, item) => sum + item.imported, 0),
      saved: saved.added,
      updated: saved.updated || 0,
      skippedExisting: saved.skipped,
      totalPublicRecipes: Array.isArray(saved.importedRecipes) ? saved.importedRecipes.length : 0,
    },
  };
}

async function buildStoreBasket(body) {
  const store = normalizeStoreSlug(body.store);
  const items = Array.isArray(body.items) ? body.items : [];
  const preferences = {
    bio: Boolean(body.bio), // when true, prefix "biologisch" to all AH searches
    beterLeven1: Boolean(body.beterLeven1),
    vegetarisch: Boolean(body.vegetarisch),
    vegan: Boolean(body.vegan),
    plantaardig: Boolean(body.plantaardig),
  };

  if (!items.length) {
    throw new HttpError(400, "Er staan geen boodschappen klaar om te bestellen.");
  }

  const recipeTitle = sanitizeText(body.recipeTitle || "Boodschappenlijst");
  const sourceUrl = sanitizeText(body.sourceUrl || "");

  if (sourceUrl) {
    try {
      const html = await fetchHtml(sourceUrl);
      const directUrl = extractFoodInfluencersDirectUrl(html, store);

      if (directUrl && store !== "albert-heijn") {
        return {
          kind: "direct",
          store,
          storeLabel: getStoreLabel(store),
          recipeTitle,
          sourceUrl,
          directUrl,
          note: `Ik heb op de bronpagina een bestaande mandje-koppeling gevonden voor ${getStoreLabel(store)}.`,
          items: [],
          provider: "foodinfluencersunited",
        };
      }
    } catch {
      // Fall back to store search when the source page cannot be inspected.
    }
  }

  // For AH: fetch up to 3 real product matches per ingredient so the user can pick alternatives.
  // Preferences are currently applied by prefixing query tokens. This is best-effort:
  // if AH doesn't expose explicit label filters in the API response, query tokens help
  // steer search results toward matching products.
  // For other stores: keep single-match behaviour.
  const buildAHSearchQuery = (rawName, prefs) => {
    const base = canonicalizeIngredientForStoreSearch(rawName || "");
    if (!base) return "";
    const tokens = [];
    if (prefs?.bio) tokens.push("biologisch");
    if (prefs?.beterLeven1) tokens.push("beter leven 1 ster");
    if (prefs?.vegetarisch) tokens.push("vegetarisch");
    if (prefs?.vegan) tokens.push("vegan");
    if (prefs?.plantaardig) tokens.push("plantaardig");
    return tokens.length ? `${tokens.join(" ")} ${base}` : base;
  };

  let searchResults;
  if (store === "albert-heijn") {
    searchResults = await Promise.all(
      items.map(async (item) => {
        const rawName = sanitizeText(item.title || "");
        const ingredientName = canonicalizeIngredientForStoreSearch(rawName);
        if (!ingredientName) return { ingredient: ingredientName, product: null, products: [] };

        // Fetch a wider, label-tagged set of alternatives so the AH "Wissel"
        // sheet can group by Meest voordelig / Bio / Beter Leven / etc.
        let products = await findAHAlternativesGrouped(ingredientName, preferences, 30);

        // If the broad fetch returned nothing, fall back to the legacy single
        // query so the basket is never empty for that item.
        if (!products || products.length === 0) {
          const searchQuery = buildAHSearchQuery(ingredientName, preferences);
          products = await findAHProducts(searchQuery || ingredientName, 14);
          if ((!products || products.length === 0) && searchQuery && searchQuery !== ingredientName) {
            products = await findAHProducts(ingredientName, 14);
          }
        }
        const picked = selectAhProductForGroceryHandoff(products, preferences);

        // Ensure the selected product is also the first choice shown in the UI.
        // The basket UI assumes `choices[0]` is the current pick (selectedChoiceIndex = 0).
        const ordered =
          picked && Array.isArray(products) && products.length > 1
            ? [picked, ...products.filter((p) => (p?.id || p?.name) !== (picked?.id || picked?.name))]
            : products;

        return { ingredient: ingredientName, product: picked, products: ordered, quantity: estimateAhHandoffQuantity(item, picked) };
      })
    ).catch(() => items.map((item) => ({ ingredient: sanitizeText(item.title || ""), product: null, products: [] })));
  } else {
    const raw = await searchProductsForStore(
      store,
      items.map((item) => splitCompoundIngredientWords(sanitizeText(item.title || ""))).filter(Boolean)
    ).catch(() => []);
    searchResults = raw.map((r) => ({ ...r, products: r.product ? [r.product] : [] }));
  }

  const matchedItems = items.map((item, index) => {
    const result = searchResults[index] || { product: null, products: [] };
    let choices;

    if (store === "albert-heijn" && result.products.length) {
      const ahChoices = result.products
        .map((product, i) =>
          buildMatchedChoiceFromProduct(store, item, product, i === 0 ? "Meest voordelig" : "Alternatief")
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

    // AH gets a larger alternatives pool so the Wissel sheet can show more
    // products and allow chip-based filtering without starving the list.
    const choicesCap = store === "albert-heijn" ? 30 : 3;

    return {
      id: `basket-item-${index}`,
      ingredientTitle: canonicalizeIngredientForStoreSearch(item.title || "Ingrediënt"),
      ingredientAmount: sanitizeText(item.amount || "1 verpakking"),
      confidence: result.product ? "Gevonden in winkel" : getMatchConfidenceLabel(item.title || ""),
      choices: choices.slice(0, choicesCap),
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

async function researchAHChoices(body) {
  const rawTitle = sanitizeText(body.ingredientTitle || body.title || "");
  const ingredientTitle = canonicalizeIngredientForStoreSearch(rawTitle);
  if (!ingredientTitle) {
    throw new HttpError(400, "Geen ingrediënt opgegeven.");
  }

  const preferences = {
    bio: Boolean(body.bio),
    beterLeven1: Boolean(body.beterLeven1),
    vegetarisch: Boolean(body.vegetarisch),
    vegan: Boolean(body.vegan),
    plantaardig: Boolean(body.plantaardig),
  };

  const exclude = new Set(
    (Array.isArray(body.excludeProductIds) ? body.excludeProductIds : [])
      .map((id) => sanitizeText(id))
      .filter(Boolean)
  );

  let products = await findAHAlternativesGrouped(ingredientTitle, preferences, 30);
  if (!products || products.length === 0) {
    products = await findAHProducts(ingredientTitle, 30);
  }

  let filtered = (Array.isArray(products) ? products : []).filter((p) => !exclude.has(String(p?.id || "")));
  const best = selectAhProductForGroceryHandoff(filtered, preferences);
  if (best && filtered.length > 1) {
    filtered = [best, ...filtered.filter((p) => String(p?.id || "") !== String(best?.id || ""))];
  }

  const item = { title: ingredientTitle, amount: sanitizeText(body.amount || "1 verpakking") };
  const choices = filtered
    .map((product, i) => buildMatchedChoiceFromProduct("albert-heijn", item, product, i === 0 ? "Meest voordelig" : "Alternatief"))
    .filter(Boolean);

  return {
    ingredientTitle,
    choices,
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

const GZIP_EXTENSIONS = new Set([".html", ".css", ".js", ".svg", ".json", ".xml", ".txt", ".webmanifest"]);

async function serveStaticFile(requestPath, response, request) {
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
    const basename = path.basename(resolvedPath);

    // Cache policy: HTML stays fresh (no-cache), versioned CSS/JS gets long immutable cache,
    // images get a week, everything else gets a day.
    const cacheControl =
      basename === "service-worker.js"
        ? "no-cache, no-store, must-revalidate"
        : extension === ".html"
          ? "no-cache"
          : extension === ".css" || extension === ".js"
            ? "public, max-age=31536000, immutable"
            : extension === ".png" || extension === ".jpg" || extension === ".jpeg" || extension === ".svg" || extension === ".ico" || extension === ".webp"
              ? "public, max-age=604800, immutable"
              : "public, max-age=86400";

    // Gzip compress text-based files when the client supports it.
    const acceptEncoding = request?.headers?.["accept-encoding"] || "";
    const canGzip = GZIP_EXTENSIONS.has(extension) && /gzip/i.test(acceptEncoding);
    const body = canGzip ? await gzipAsync(fileContents) : fileContents;

    response.writeHead(200, {
      ...HTTP_HEADERS,
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Cache-Control": cacheControl,
      "Vary": "Accept-Encoding",
      ...(canGzip ? { "Content-Encoding": "gzip" } : {}),
    });
    response.end(body);
  } catch {
    sendJson(response, 404, { error: "Bestand niet gevonden." });
  }
}

function renderPublicSeoRecipePage(entry, origin) {
  const recipe = entry.recipe || {};
  const title = sanitizeText(recipe.title || "Recept");
  const description = sanitizeText(recipe.description || "Een recept op Plately.");
  const canonicalUrl = `${origin}${entry.urlPath}`;
  const recipeParam = encodeURIComponent(entry.urlPath);
  const loginUrl = `/?intent=save-recipe&recipe=${recipeParam}`;
  const saveUrl = `/?register=1&intent=save-recipe&recipe=${recipeParam}`;
  const groceryUrl = `/?register=1&intent=shopping-list&recipe=${recipeParam}`;
  const mealPlanUrl = `/?register=1&intent=meal-plan&recipe=${recipeParam}`;
  const sourceUrl = normalizePublicSourceUrl(recipe.sourceUrl);
  const shareText = `${title} recept via Plately`;
  const imageUrl = recipe.image
    ? (/^https?:\/\//i.test(recipe.image) ? recipe.image : `${origin}${String(recipe.image).startsWith("/") ? "" : "/"}${recipe.image}`)
    : `${origin}/assets/icon-512.png?v=7`;
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];
  const ratingValue = Number(recipe.ratingValue);
  const ratingCount = Number(recipe.ratingCount);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: title,
    description,
    image: recipe.image ? [recipe.image] : undefined,
    author: recipe.author ? { "@type": "Person", name: sanitizeText(recipe.author) } : { "@type": "Organization", name: "Plately" },
    recipeCategory: sanitizeText(recipe.mealTag || ""),
    recipeYield: sanitizeText(recipe.servings || ""),
    totalTime: parseRecipeTimeToIsoDuration(recipe.time),
    aggregateRating:
      Number.isFinite(ratingValue) && ratingValue >= 1 && ratingValue <= 5 && Number.isFinite(ratingCount) && ratingCount >= 1
        ? {
            "@type": "AggregateRating",
            ratingValue,
            ratingCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    recipeIngredient: ingredients
      .map((i) => [i?.quantity, i?.unit, i?.name].map((part) => sanitizeText(part || "")).filter(Boolean).join(" "))
      .filter(Boolean),
    recipeInstructions: instructions
      .map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text: sanitizeText(step || ""),
      }))
      .filter((step) => step.text),
    mainEntityOfPage: canonicalUrl,
    isBasedOn: sourceUrl || undefined,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Plately", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: "Recepten", item: `${origin}/recepten` },
      { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
    ],
  };
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${title} recept`,
    description,
    url: canonicalUrl,
    breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
    primaryImageOfPage: imageUrl ? { "@type": "ImageObject", url: imageUrl } : undefined,
  };

  return `<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} recept — Plately</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta name="theme-color" content="#8da485" />
    <meta property="og:site_name" content="Plately" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)} recept" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    ${sourceUrl ? `<meta property="article:author" content="${escapeHtml(sourceUrl)}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)} recept" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <link rel="icon" href="/assets/favicon.ico?v=7" sizes="any" />
    <link rel="stylesheet" href="/styles.css?v=${escapeHtml(CACHED_PLATELY_BUILD_META || "1.0.19.36")}" />
    <script type="application/ld+json">${safeJsonForHtml(jsonLd)}</script>
    <script type="application/ld+json">${safeJsonForHtml(breadcrumbLd)}</script>
    <script type="application/ld+json">${safeJsonForHtml(webPageLd)}</script>
  </head>
  <body class="public-recipe-page">
    <main class="public-recipe" id="publicRecipeRoot">
      <header class="public-recipe__top">
        <a class="public-recipe__brand" href="/" aria-label="Open Plately">
          <img src="/assets/plately.png" alt="" width="34" height="34" decoding="async" class="public-recipe__brand-logo" />
        </a>
        <div class="public-recipe__cta">
          <a class="btn-secondary public-recipe__cta-btn" href="${escapeHtml(saveUrl)}">Bewaar recept</a>
          <a class="btn-primary public-recipe__cta-btn" href="${escapeHtml(groceryUrl)}">Maak boodschappenlijst</a>
        </div>
      </header>

      <article class="public-recipe__card">
        ${recipe.image ? `<div class="public-recipe__hero"><img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.alt || title)}" draggable="false" loading="eager" decoding="async"/><div class="public-recipe__hero-fade" aria-hidden="true"></div></div>` : ""}
        <div class="public-recipe__card-inner">
          <p class="section-kicker public-recipe__kicker">${escapeHtml(recipe.mealTag || "Recept")}</p>
          <h1 class="public-recipe__title">${escapeHtml(title)}</h1>
          <button class="btn-secondary public-recipe__copy" type="button" data-public-share>Deel recept</button>
          <p class="public-recipe__sub">${escapeHtml(description)}</p>
          <div class="public-recipe__meta">${escapeHtml([recipe.time ? `Bereiding: ${recipe.time}` : "", recipe.servings ? `Porties: ${recipe.servings}` : ""].filter(Boolean).join(" · "))}</div>
          <div class="public-recipe__action-band" aria-label="Plately acties">
            <div>
              <strong>Maak koken makkelijker met Plately</strong>
              <span>Bewaar dit recept en zet de ingrediënten automatisch op je boodschappenlijst.</span>
            </div>
            <a class="btn-primary public-recipe__action-main" href="${escapeHtml(groceryUrl)}">Maak mijn boodschappenlijst</a>
          </div>

          <div class="public-recipe__grid">
            <section class="public-recipe__panel" aria-label="Ingrediënten">
              <div class="public-recipe__panel-head">
                <h2 class="public-recipe__h2">Ingrediënten</h2>
                <a class="public-recipe__mini-cta" href="${escapeHtml(groceryUrl)}">Zet op lijst</a>
              </div>
              <ul class="public-recipe__list">
                ${ingredients
                  .slice(0, 80)
                  .map((i) => {
                    const n = sanitizeText(i?.name || "");
                    const q = sanitizeText(i?.quantity || "");
                    const u = sanitizeText(i?.unit || "");
                    const right = [q, u].filter(Boolean).join(" ").trim();
                    return n ? `<li><strong>${escapeHtml(n)}</strong>${right ? `<span>${escapeHtml(right)}</span>` : ""}</li>` : "";
                  })
                  .join("")}
              </ul>
            </section>

            <section class="public-recipe__panel" aria-label="Bereiding">
              <h2 class="public-recipe__h2">Bereiding</h2>
              <ol class="public-recipe__steps">
                ${instructions
                  .slice(0, 80)
                  .map((s) => sanitizeText(s || ""))
                  .filter(Boolean)
                  .map((s) => `<li>${escapeHtml(s)}</li>`)
                  .join("")}
              </ol>
            </section>
          </div>

          <section class="public-recipe__conversion" aria-label="Recept bewaren">
            <p class="section-kicker public-recipe__kicker">Kook je dit later?</p>
            <h2 class="public-recipe__conversion-title">Stuur dit recept naar je eigen Plately.</h2>
            <p class="public-recipe__conversion-copy">Dan staat het klaar tussen je recepten en maak je met één klik een boodschappenlijst.</p>
            <div class="public-recipe__conversion-actions">
              <a class="btn-primary public-recipe__cta-btn" href="${escapeHtml(saveUrl)}">Bewaar gratis</a>
              <a class="btn-secondary public-recipe__cta-btn" href="${escapeHtml(loginUrl)}">Inloggen voor Plately</a>
            </div>
          </section>

          <p class="public-recipe__trust">Receptinhoud en beeld komen van de oorspronkelijke maker of bronsite. Plately bewaart het recept overzichtelijk en linkt waar mogelijk terug naar de bron.</p>

          <footer class="public-recipe__footer">
            ${sourceUrl ? `<a class="public-recipe__source" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">Bekijk originele bron</a>` : `<a class="public-recipe__source" href="/">Open in Plately</a>`}
            <button class="btn-secondary public-recipe__copy" type="button" data-public-share>Deel recept</button>
          </footer>
        </div>
      </article>
    </main>
    <nav class="public-recipe__sticky-cta" aria-label="Snelle actie">
      <a class="btn-primary public-recipe__sticky-btn" href="${escapeHtml(groceryUrl)}">Bewaar + boodschappenlijst</a>
    </nav>
    <script>
      (function () {
        var shareData = { title: ${safeJsonForHtml(`${title} recept`)}, text: ${safeJsonForHtml(shareText)}, url: location.href };
        function fallback(button) {
          if (!navigator.clipboard) return;
          navigator.clipboard.writeText(location.href).then(function () {
            var old = button.textContent;
            button.textContent = "Link gekopieerd";
            setTimeout(function () { button.textContent = old || "Deel recept"; }, 1400);
          }).catch(function () {});
        }
        document.querySelectorAll("[data-public-share]").forEach(function (button) {
          button.addEventListener("click", function () {
            if (navigator.share) {
              navigator.share(shareData).catch(function () {});
              return;
            }
            fallback(button);
          });
        });
      })();
    </script>
  </body>
</html>`;
}

function renderPublicRecipeIndexPage(entries, origin) {
  const list = Array.isArray(entries) ? entries : [];
  const totalCount = list.length;
  const countLine =
    totalCount === 0
      ? "Nog geen publieke recepten."
      : totalCount === 1
        ? "1 recept"
        : `${totalCount.toLocaleString("nl-NL")} recepten`;
  const items = list
    .slice(0, 200)
    .map((entry) => {
      const recipe = entry.recipe || {};
      const score = Number.isFinite(Number(entry.seoScore)) ? Number(entry.seoScore) : computeSeoRecipeScore(recipe);
      const scoreClass = score >= 80 ? "good" : score >= 60 ? "warn" : "bad";
      return `<a class="recent-card" href="${escapeHtml(entry.urlPath)}">
        <img class="recent-card__img" src="${escapeHtml(recipe.image || "/assets/hero-burger.svg")}" alt="" loading="lazy" decoding="async" />
        <span class="recent-card__body">
          <strong class="recent-card__title">${escapeHtml(recipe.title || "Recept")}</strong>
          <span class="recent-card__meta">${escapeHtml([recipe.mealTag, recipe.time].filter(Boolean).join(" · "))}</span>
          <span class="seo-score seo-score--${scoreClass}">SEO ${score}/100</span>
        </span>
      </a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recepten — Plately</title>
    <meta name="description" content="Ontdek recepten die met Plately zijn opgeslagen: ingrediënten, bereiding en originele bron overzichtelijk bij elkaar." />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="${escapeHtml(origin)}/recepten" />
    <link rel="stylesheet" href="/styles.css?v=${escapeHtml(CACHED_PLATELY_BUILD_META || "1.0.19.36")}" />
    <script type="application/ld+json">${safeJsonForHtml({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Recepten",
      description: "Publieke recepten opgeslagen met Plately.",
      url: `${origin}/recepten`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: totalCount,
        itemListElement: list.slice(0, 100).map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${origin}${entry.urlPath}`,
          name: sanitizeText(entry.recipe?.title || "Recept"),
        })),
      },
    })}</script>
  </head>
  <body>
    <main class="page">
      <section class="app-shell" style="padding:24px 18px 90px">
        <header class="section-heading" style="align-items:flex-start">
          <div>
            <h1>Recepten</h1>
            <p class="muted" style="margin:6px 0 0;font-size:0.95rem;line-height:1.4">${escapeHtml(countLine)}</p>
          </div>
          <a class="ghost-link" href="/">Open Plately</a>
        </header>
        <section class="recipe-grid recipe-grid--cookbook">${items || `<p class="recipe-slider__empty">Nog geen publieke recepten.</p>`}</section>
      </section>
    </main>
  </body>
</html>`;
}

function parseAdminAnalyticsDaysParam(raw, fallback = 7) {
  const n = Number.parseInt(String(raw ?? ""), 10);
  const fb = [7, 14, 30, 90].includes(Number(fallback)) ? Number(fallback) : 7;
  return [7, 14, 30, 90].includes(n) ? n : fb;
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
    // ── Public SEO recipe pages ─────────────────────────────────────────────
    if (requestUrl.pathname === "/robots.txt" && (request.method === "GET" || request.method === "HEAD")) {
      const origin = getPublicOrigin(request);
      response.writeHead(200, { ...HTTP_HEADERS, "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" });
      response.end(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
      return;
    }

    if (requestUrl.pathname === "/sitemap.xml" && (request.method === "GET" || request.method === "HEAD")) {
      const origin = getPublicOrigin(request);
      const entries = await listPublicSeoRecipes(origin);
      const urls = [
        { loc: `${origin}/`, lastmod: SERVER_BOOT_AT_ISO, priority: "0.8" },
        { loc: `${origin}/recepten`, lastmod: SERVER_BOOT_AT_ISO, priority: "0.7" },
        ...entries.map((entry) => ({
          loc: `${origin}${entry.urlPath}`,
          lastmod: entry.updatedAt || SERVER_BOOT_AT_ISO,
          priority: "0.6",
        })),
      ];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls
          .map((url) => `  <url><loc>${xmlEscape(url.loc)}</loc><lastmod>${xmlEscape(url.lastmod)}</lastmod><priority>${url.priority}</priority></url>`)
          .join("\n") +
        `\n</urlset>\n`;
      response.writeHead(200, { ...HTTP_HEADERS, "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-cache" });
      response.end(xml);
      return;
    }

    if (requestUrl.pathname === "/recepten" && (request.method === "GET" || request.method === "HEAD")) {
      const origin = getPublicOrigin(request);
      const entries = await listPublicSeoRecipes(origin);
      response.writeHead(200, { ...HTTP_HEADERS, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
      response.end(renderPublicRecipeIndexPage(entries, origin));
      return;
    }

    if (requestUrl.pathname === "/api/public-recipe" && request.method === "GET") {
      const origin = getPublicOrigin(request);
      const rawPath = sanitizeText(requestUrl.searchParams.get("path") || "");
      const pathSlug = rawPath.startsWith("/recept/") ? rawPath.slice("/recept/".length) : rawPath;
      const oldToken = pathSlug.match(/-([A-Za-z0-9_-]{10})$/)?.[1] || "";
      const entry = oldToken
        ? await findPublicSeoRecipeByToken(oldToken, origin)
        : await findPublicSeoRecipeByPath(pathSlug, origin);
      if (!entry) {
        sendJson(response, 404, { error: "Recept niet gevonden." });
        return;
      }
      sendJson(response, 200, {
        ok: true,
        url: entry.urlPath,
        recipe: entry.recipe,
      });
      return;
    }

    if (requestUrl.pathname.startsWith("/recept/") && (request.method === "GET" || request.method === "HEAD")) {
      const origin = getPublicOrigin(request);
      const raw = decodeURIComponent(requestUrl.pathname.slice("/recept/".length) || "");
      const oldToken = raw.match(/-([A-Za-z0-9_-]{10})$/)?.[1] || "";
      const entry = oldToken
        ? await findPublicSeoRecipeByToken(oldToken, origin)
        : await findPublicSeoRecipeByPath(raw, origin);
      if (!entry) {
        sendJson(response, 404, { error: "Recept niet gevonden." });
        return;
      }
      if (requestUrl.pathname !== entry.urlPath) {
        response.writeHead(301, { Location: entry.urlPath, ...HTTP_HEADERS });
        response.end();
        return;
      }
      response.writeHead(200, { ...HTTP_HEADERS, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
      response.end(renderPublicSeoRecipePage(entry, origin));
      return;
    }

    // ── Public recipe share shortlinks ───────────────────────────────────────
    if ((requestUrl.pathname === "/share" || requestUrl.pathname.startsWith("/share/")) && request.method === "GET") {
      const token =
        requestUrl.pathname.startsWith("/share/") ? requestUrl.pathname.slice("/share/".length) : requestUrl.searchParams.get("t") || "";
      const safeToken = sanitizeText(String(token || "")).trim();
      const db = await loadDatabase();
      const record = db.shareLinks && safeToken ? db.shareLinks[safeToken] : null;
      if (!record || !record.payload) {
        response.writeHead(302, { Location: "/recipe.html", ...HTTP_HEADERS });
        response.end();
        return;
      }

      const payload = record.payload || {};
      const title = sanitizeText(payload.title || "Recept");
      const desc = sanitizeText(payload.description || "Een recept gedeeld via Plately.");
      const rawImage = sanitizeText(payload.image || "");
      const image = /^https?:\/\//i.test(rawImage) ? rawImage : "/assets/icon-512.png?v=7";
      const canonicalUrl = `${getPublicOrigin(request)}${requestUrl.pathname}`;

      // Track basic share views (anonymous aggregate)
      try {
        record.views = Number(record.views || 0) + 1;
        record.lastViewedAt = new Date().toISOString();
        if (db.shareLinks && safeToken) db.shareLinks[safeToken] = record;
        await persistDatabase();
      } catch {
        // ignore
      }

      const html = `<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} — Plately</title>
    <meta name="description" content="${escapeHtml(desc)}" />
    <meta name="theme-color" content="#8da485" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:site_name" content="Plately" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(desc)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(desc)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <link rel="icon" href="/assets/favicon.ico?v=7" sizes="any" />
    <link rel="stylesheet" href="/styles.css?v=1.0.19.33" />
    <script>
      (function () {
        document.addEventListener(
          "contextmenu",
          function (ev) {
            if (ev.target && ev.target.closest && ev.target.closest("img")) ev.preventDefault();
          },
          true
        );
        document.addEventListener(
          "dragstart",
          function (ev) {
            if (ev.target && ev.target.closest && ev.target.closest("img")) ev.preventDefault();
          },
          true
        );
      })();
    </script>
  </head>
  <body class="public-recipe-page">
    <main class="public-recipe" id="publicRecipeRoot">
      <header class="public-recipe__top">
        <a class="public-recipe__brand" href="/index.html" aria-label="Open Plately">
          <img src="/assets/plately.png" alt="" width="34" height="34" decoding="async" class="public-recipe__brand-logo" />
        </a>
        <div class="public-recipe__cta">
          <a class="btn-secondary public-recipe__cta-btn" href="/index.html">Inloggen</a>
          <a class="btn-primary public-recipe__cta-btn" href="/index.html">Account maken</a>
        </div>
      </header>

      <section class="public-recipe__card" aria-live="polite">
        ${/^https?:\/\//i.test(rawImage) ? `<div class="public-recipe__hero"><img src="${escapeHtml(rawImage)}" alt="" draggable="false" loading="lazy" decoding="async"/><div class="public-recipe__hero-fade" aria-hidden="true"></div></div>` : ""}
        <div class="public-recipe__card-inner">
        <p class="section-kicker public-recipe__kicker">${escapeHtml(payload.mealTag || "Gedeeld recept")}</p>
        <h1 class="public-recipe__title">${escapeHtml(title)}</h1>
        <p class="public-recipe__sub">${escapeHtml(desc)}</p>
        <div class="public-recipe__meta">${escapeHtml([payload.time ? "⏱ " + payload.time : "", payload.servings ? "👥 " + payload.servings : ""].filter(Boolean).join(" · "))}</div>

        <div class="public-recipe__grid">
          <section class="public-recipe__panel" aria-label="Ingrediënten">
            <h2 class="public-recipe__h2">Ingrediënten</h2>
            <ul class="public-recipe__list">
              ${(Array.isArray(payload.ingredients) ? payload.ingredients : [])
                .slice(0, 80)
                .map((i) => {
                  const n = sanitizeText(i?.name || "");
                  const q = sanitizeText(i?.quantity || "");
                  const u = sanitizeText(i?.unit || "");
                  const right = [q, u].filter(Boolean).join(" ").trim();
                  return `<li><strong>${escapeHtml(n)}</strong>${right ? `<span>${escapeHtml(right)}</span>` : ""}</li>`;
                })
                .join("")}
            </ul>
          </section>

          <section class="public-recipe__panel" aria-label="Bereiding">
            <h2 class="public-recipe__h2">Bereiding</h2>
            <ol class="public-recipe__steps">
              ${(Array.isArray(payload.instructions) ? payload.instructions : [])
                .slice(0, 80)
                .map((s) => `<li>${escapeHtml(s)}</li>`)
                .join("")}
            </ol>
          </section>
        </div>

        <p class="public-recipe__trust">Receptinhoud en beelden komen van de maker of bronsite. Deel met respect — link waar het kan naar het origineel.</p>

        <footer class="public-recipe__footer">
          <a class="public-recipe__source" href="${escapeHtml(sanitizeText(payload.sourceUrl || "/index.html"))}" target="_blank" rel="noopener noreferrer">Bekijk originele bron</a>
          <button class="btn-secondary public-recipe__copy" type="button" onclick="navigator.clipboard&&navigator.clipboard.writeText(location.href)">Link kopiëren</button>
        </footer>
        </div>
      </section>
    </main>
  </body>
</html>`;

      response.writeHead(200, { ...HTTP_HEADERS, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
      response.end(html);
      return;
    }

    if (requestUrl.pathname === "/api/health" && request.method === "GET") {
      const ahProxyUrl = String(process.env.AH_API_PROXY || "").trim();
      const ahStaticToken = String(process.env.AH_ANONYMOUS_TOKEN || "").trim();
      sendJson(response, 200, {
        ok: true,
        app: "Plately",
        version: {
          commit: process.env.RENDER_GIT_COMMIT || process.env.GIT_COMMIT || process.env.GIT_SHA || "",
        },
        env: process.env.NODE_ENV || "development",
        persistence: {
          mode: "json-file",
          dataDir: DATA_DIR,
        },
        auth: {
          postgresEnabled: isPostgresEnabled(),
        },
        ah: {
          proxy: ahProxyUrl ? { configured: true, url: ahProxyUrl } : { configured: false },
          staticToken: ahStaticToken ? { configured: true, prefix: ahStaticToken.slice(0, 12) + "…" } : { configured: false },
          cachedToken: ahTokenCache.token
            ? { present: true, expiresAt: new Date(ahTokenCache.expiresAt).toISOString() }
            : { present: false },
          searchCacheSize: _ahSearchCache.size,
        },
        platforms: {
          tiktok: { configured: false, message: "TikTok importeren werkt tijdelijk nog niet." },
          instagram: { configured: Boolean(META_APP_ID && META_APP_SECRET) },
          website: { configured: true },
        },
        firecrawl: {
          configured: Boolean(firecrawlApiKey()),
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/deploy-info" && request.method === "GET") {
      sendJson(response, 200, buildPlatelyDeployInfoPayload());
      return;
    }

    if (
      (requestUrl.pathname === "/deploy-status.html" || requestUrl.pathname === "/deploy-status") &&
      request.method === "GET"
    ) {
      if (!isDeployStatusHtmlAllowed(request.headers.host || "")) {
        sendJson(response, 404, { error: "Not found." });
        return;
      }
      if (requestUrl.pathname === "/deploy-status") {
        response.writeHead(302, { Location: "/deploy-status.html", ...HTTP_HEADERS });
        response.end();
        return;
      }
      await serveStaticFile("/deploy-status.html", response, request);
      return;
    }

    if (requestUrl.pathname === "/api/image-proxy" && request.method === "GET") {
      await proxyImage(requestUrl, response);
      return;
    }

    if (
      (requestUrl.pathname === "/privacy-policy" || requestUrl.pathname === "/privacy") &&
      request.method === "GET"
    ) {
      const html = buildSimpleHtmlPage("Privacybeleid — Plately", `
        <h1>Privacybeleid</h1>
        <p><strong>Laatst bijgewerkt:</strong> mei 2025</p>

        <h2>1. Wie zijn wij</h2>
        <p>Plately is een webapp waarmee je recepten kunt opslaan, importeren en organiseren. De app is bereikbaar via <a href="https://app.plately.nl">app.plately.nl</a>.</p>

        <h2>2. Welke gegevens verzamelen we</h2>
        <ul>
          <li><strong>E-mailadres</strong> — alleen als je een account aanmaakt.</li>
          <li><strong>Recepten en kookboeken</strong> — door jou opgeslagen inhoud.</li>
          <li><strong>Boodschappenlijst</strong> — lokaal opgeslagen in je browser en optioneel gesynchroniseerd met je account.</li>
          <li><strong>Gebruiksgegevens</strong> — anonieme interacties (bijv. welke features je gebruikt) voor verbetering van de app.</li>
        </ul>

        <h2>3. Hoe gebruiken we je gegevens</h2>
        <ul>
          <li>Om de app-functionaliteit te leveren (recepten opslaan, synchroniseren).</li>
          <li>Om je in te loggen en je account te beveiligen.</li>
          <li>Om de app te verbeteren op basis van geanonimiseerd gebruik.</li>
        </ul>

        <h2>4. Delen met derden</h2>
        <p>We verkopen geen persoonsgegevens. We gebruiken de volgende externe diensten:</p>
        <ul>
          <li><strong>Albert Heijn API</strong> — voor productzoekresultaten (geen persoonsgegevens doorgegeven).</li>
          <li><strong>Instagram / Meta</strong> — receptlinks worden geïmporteerd via de publieke Instagram-pagina. We slaan geen Instagram-inloggegevens op.</li>
          <li><strong>Jina / Firecrawl</strong> — voor websitescraping van receptpagina's (URL's worden doorgegeven, geen persoonsgegevens).</li>
        </ul>

        <h2>5. Bewaartermijn</h2>
        <p>Je gegevens worden bewaard zolang je account actief is. Na verwijdering van je account worden alle gekoppelde gegevens binnen 30 dagen verwijderd.</p>

        <h2>6. Jouw rechten</h2>
        <p>Je hebt het recht om je gegevens in te zien, te corrigeren of te laten verwijderen. Stuur een verzoek naar <a href="mailto:hallo@plately.nl">hallo@plately.nl</a>.</p>

        <h2>7. Contact</h2>
        <p>Vragen over dit privacybeleid? Mail naar <a href="mailto:hallo@plately.nl">hallo@plately.nl</a>.</p>
      `);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", ...HTTP_HEADERS });
      response.end(html);
      return;
    }

    if (
      (requestUrl.pathname === "/data-deletion" || requestUrl.pathname === "/data-deletion-instructions") &&
      request.method === "GET"
    ) {
      const html = buildSimpleHtmlPage("Gegevens verwijderen — Plately", `
        <h1>Je gegevens verwijderen</h1>
        <p>Je kunt op elk moment je gegevens en account laten verwijderen uit Plately.</p>

        <h2>Optie 1 — Via de app</h2>
        <ol>
          <li>Open <a href="https://app.plately.nl">app.plately.nl</a>.</li>
          <li>Ga naar <strong>Profiel → Instellingen → Account verwijderen</strong>.</li>
          <li>Bevestig de verwijdering. Je account en alle bijbehorende gegevens worden direct verwijderd.</li>
        </ol>

        <h2>Optie 2 — Via e-mail</h2>
        <p>Stuur een e-mail naar <a href="mailto:hallo@plately.nl">hallo@plately.nl</a> met als onderwerp <em>"Account verwijderen"</em> en vermeld het e-mailadres van je account. We verwerken je verzoek binnen 5 werkdagen.</p>

        <h2>Wat wordt verwijderd</h2>
        <ul>
          <li>Je e-mailadres en accountgegevens.</li>
          <li>Al je opgeslagen recepten en kookboeken.</li>
          <li>Je boodschappenlijst en voorkeuren.</li>
        </ul>

        <p style="margin-top:2rem;color:#888;font-size:.9rem;">Plately · <a href="/privacy-policy">Privacybeleid</a></p>
      `);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", ...HTTP_HEADERS });
      response.end(html);
      return;
    }

    if (
      (requestUrl.pathname === "/terms" || requestUrl.pathname === "/terms-of-service") &&
      request.method === "GET"
    ) {
      const html = buildSimpleHtmlPage("Gebruiksvoorwaarden — Plately", `
        <h1>Gebruiksvoorwaarden</h1>
        <p><strong>Laatst bijgewerkt:</strong> mei 2025</p>

        <h2>1. Over Plately</h2>
        <p>Plately is een webapp waarmee je recepten kunt opslaan, importeren en organiseren. Door gebruik te maken van Plately ga je akkoord met deze gebruiksvoorwaarden.</p>

        <h2>2. Gebruik van de app</h2>
        <ul>
          <li>Je mag Plately uitsluitend gebruiken voor persoonlijk, niet-commercieel gebruik.</li>
          <li>Je bent verantwoordelijk voor de inhoud die je opslaat in de app.</li>
          <li>Je mag de app niet gebruiken voor het verspreiden van schadelijke, illegale of misleidende inhoud.</li>
          <li>Je mag de app niet proberen te reverse-engineeren, kopiëren of misbruiken.</li>
        </ul>

        <h2>3. Account</h2>
        <p>Als je een account aanmaakt, ben je verantwoordelijk voor de beveiliging van je inloggegevens. Meld ongeautoriseerd gebruik zo snel mogelijk via <a href="mailto:hallo@plately.nl">hallo@plately.nl</a>.</p>

        <h2>4. Intellectueel eigendom</h2>
        <p>De app en de bijbehorende technologie zijn eigendom van Plately. Recepten die je importeert blijven eigendom van de oorspronkelijke makers. Plately claimt geen eigendom over door jou opgeslagen inhoud.</p>

        <h2>5. Beschikbaarheid</h2>
        <p>We streven naar een betrouwbare beschikbaarheid van de app, maar kunnen geen ononderbroken toegang garanderen. We behouden het recht om de app (tijdelijk) aan te passen of offline te halen voor onderhoud.</p>

        <h2>6. Aansprakelijkheid</h2>
        <p>Plately is niet aansprakelijk voor schade die voortvloeit uit het gebruik van de app, onjuiste receptinformatie, of het tijdelijk niet beschikbaar zijn van de service.</p>

        <h2>7. Wijzigingen</h2>
        <p>We kunnen deze voorwaarden op elk moment aanpassen. Bij ingrijpende wijzigingen informeren we je via de app of per e-mail. Voortgezet gebruik na wijziging geldt als acceptatie.</p>

        <h2>8. Toepasselijk recht</h2>
        <p>Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.</p>

        <h2>9. Contact</h2>
        <p>Vragen over deze voorwaarden? Mail naar <a href="mailto:hallo@plately.nl">hallo@plately.nl</a>.</p>

        <p style="margin-top:2rem;color:#888;font-size:.9rem;">Plately · <a href="/privacy-policy">Privacybeleid</a> · <a href="/data-deletion">Gegevens verwijderen</a></p>
      `);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", ...HTTP_HEADERS });
      response.end(html);
      return;
    }

    if (requestUrl.pathname === "/api/share/create" && request.method === "POST") {
      const body = await readRequestBody(request);
      const payload = body?.payload && typeof body.payload === "object" ? body.payload : null;
      if (!payload) {
        sendJson(response, 400, { ok: false, error: "Missing payload." });
        return;
      }

      const safePayload = {
        v: 1,
        id: sanitizeText(payload.id || ""),
        title: sanitizeText(payload.title || "").slice(0, 140),
        description: sanitizeText(payload.description || "").slice(0, 240),
        time: sanitizeText(payload.time || "").slice(0, 40),
        servings: sanitizeText(payload.servings || "").slice(0, 40),
        mealTag: sanitizeText(payload.mealTag || "").slice(0, 40),
        image: sanitizeText(payload.image || "").slice(0, 900),
        sourceUrl: sanitizeText(payload.sourceUrl || "").slice(0, 900),
        ingredients: Array.isArray(payload.ingredients)
          ? payload.ingredients.slice(0, 80).map((i) => ({
              quantity: sanitizeText(i?.quantity || "").slice(0, 40),
              unit: sanitizeText(i?.unit || "").slice(0, 40),
              name: sanitizeText(i?.name || "").slice(0, 120),
            }))
          : [],
        instructions: Array.isArray(payload.instructions)
          ? payload.instructions.slice(0, 80).map((s) => sanitizeText(String(s || "")).slice(0, 500))
          : [],
      };

      try {
        const authUser = await getAuthenticatedUser(request);
        if (authUser && safePayload.id) {
          const appState = buildAppStateFromUser(authUser);
          const isSavedRecipe = Array.isArray(appState.importedRecipes)
            ? appState.importedRecipes.some((recipe) => sanitizeText(recipe?.id || "") === safePayload.id)
            : false;
          if (isSavedRecipe) {
            const token = getSeoRecipeToken(authUser.id, safePayload.id);
            const entries = await listPublicSeoRecipes(getPublicOrigin(request));
            const seoPath = entries.find((entry) => entry.token === token)?.urlPath || `/recept/${slugify(safePayload.title) || "recept"}`;
            sendJson(response, 200, { ok: true, url: seoPath, seo: true });
            return;
          }
        }
      } catch {
        // Fall back to stored shortlink below.
      }

      const token = crypto.randomBytes(5).toString("base64url"); // ~8 chars, URL-safe
      const db = await loadDatabase();
      if (!db.shareLinks || typeof db.shareLinks !== "object") db.shareLinks = {};
      db.shareLinks[token] = { payload: safePayload, createdAt: new Date().toISOString() };
      let sharePersisted = false;
      try {
        await persistDatabase();
        sharePersisted = true;
      } catch (persistErr) {
        // Shortlinks blijven in databaseCache maar overleven geen redeploy als schijf ontbreekt of /data niet schrijfbaar is.
        console.error("[share/create] persistDatabase failed:", persistErr?.message || persistErr);
      }

      const shareHost = sanitizeText(request.headers.host || "").slice(0, 160);
      try {
        console.log(
          JSON.stringify({
            evt: "plately_share_created",
            host: shareHost,
            persisted: sharePersisted,
            titleLen: safePayload.title.length,
          })
        );
      } catch {
        /* ignore logging */
      }

      const shareUrl = new URL(`/share/${encodeURIComponent(token)}`, `http://${request.headers.host || "localhost"}`);
      sendJson(response, 200, { ok: true, token, url: shareUrl.pathname });
      return;
    }

    if (requestUrl.pathname === "/api/push/vapid-public-key" && request.method === "GET") {
      sendJson(response, 200, { ok: true, publicKey: VAPID_PUBLIC_KEY || "" });
      return;
    }

    if (requestUrl.pathname === "/api/push/subscribe" && request.method === "POST") {
      const body = await readRequestBody(request);
      const subscription = sanitizePushSubscription(body?.subscription || body);
      const identity = await resolvePushIdentity(request, response);
      if (isPostgresEnabled()) {
        await upsertPostgresPushSubscription(identity, subscription);
      } else {
        await upsertJsonPushSubscription(identity, subscription);
      }
      sendJson(response, 200, { ok: true });
      return;
    }

    if (requestUrl.pathname === "/api/push/preferences" && request.method === "POST") {
      const body = await readRequestBody(request);
      const endpoint = String(body?.endpoint || "").trim();
      const prefs = sanitizePushPrefs(body?.prefs || body?.preferences || {});
      if (!endpoint) {
        throw new HttpError(400, "endpoint is verplicht.");
      }
      const updated = isPostgresEnabled()
        ? await updatePostgresPushSubscriptionPrefsByEndpoint(endpoint, prefs)
        : await updateJsonPushSubscriptionPrefsByEndpoint(endpoint, prefs);
      if (!updated) {
        throw new HttpError(404, "Subscription niet gevonden.");
      }
      sendJson(response, 200, { ok: true });
      return;
    }

    if (requestUrl.pathname === "/api/push/trigger" && request.method === "POST") {
      const body = await readRequestBody(request);
      const identity = await resolvePushIdentity(request, response);
      const type = sanitizeText(body?.type || "").slice(0, 64);
      const url = sanitizeText(body?.url || "").slice(0, 500) || "/?new=1";
      const hasBonus = Boolean(body?.hasBonus);

      if (!type) {
        throw new HttpError(400, "type is verplicht.");
      }

      const subs = await listPushSubscriptionsForUser(identity.userId);
      if (!subs.length) {
        sendJson(response, 200, { ok: true, sent: 0, skipped: true });
        return;
      }

      const webPush = ensureWebPushConfigured();
      const endpointsToRemove = new Set();
      let sent = 0;
      let failed = 0;

      const shouldSend = (prefs) => {
        const p = sanitizePushPrefs(prefs);
        if (!p.categories.ah) return false;
        if (type === "ah_basket_ready") return Boolean(p.triggers.ahBasketReady);
        if (type === "ah_bonus") return Boolean(hasBonus && p.triggers.ahBonus);
        return false;
      };

      const targets = subs.filter((s) => shouldSend(s.prefs));
      if (!targets.length) {
        sendJson(response, 200, { ok: true, sent: 0, skipped: true });
        return;
      }

      const title = type === "ah_bonus" ? "Bonus items in je lijst" : "Boodschappenlijst klaar";
      const msg = type === "ah_bonus" ? "Er staan bonus aanbiedingen in je AH lijst." : "Je AH boodschappenlijst staat klaar om te openen.";
      const payload = JSON.stringify({ title, body: msg, url, category: "ah", triggerType: type });

      for (const sub of targets) {
        try {
          await webPush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload, { TTL: 60 * 60 * 6 });
          sent += 1;
        } catch (err) {
          failed += 1;
          const status = Number(err?.statusCode || err?.status || 0);
          if (status === 404 || status === 410) endpointsToRemove.add(String(sub?.endpoint || ""));
        }
      }

      if (endpointsToRemove.size) {
        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          await pool.query(`DELETE FROM plately_push_subscriptions WHERE endpoint = ANY($1::text[])`, [
            Array.from(endpointsToRemove),
          ]);
        } else {
          for (const endpoint of endpointsToRemove) await removeJsonPushSubscriptionByEndpoint(endpoint);
        }
      }

      sendJson(response, 200, { ok: true, sent, failed, removed: endpointsToRemove.size });
      return;
    }

    if (requestUrl.pathname === "/api/push/unsubscribe" && request.method === "POST") {
      const body = await readRequestBody(request);
      const endpoint = String(body?.endpoint || body?.subscription?.endpoint || "").trim();
      if (!endpoint) {
        throw new HttpError(400, "endpoint is verplicht.");
      }
      const removed = isPostgresEnabled()
        ? await removePostgresPushSubscriptionByEndpoint(endpoint)
        : await removeJsonPushSubscriptionByEndpoint(endpoint);
      sendJson(response, 200, { ok: true, removed });
      return;
    }

    if (requestUrl.pathname.startsWith("/api/announce/") && request.method === "GET") {
      const id = decodeURIComponent(requestUrl.pathname.slice("/api/announce/".length) || "").trim();
      const announcement = await getAnnouncementById(id);
      if (!announcement) {
        throw new HttpError(404, "Aankondiging niet gevonden.");
      }
      sendJson(response, 200, { ok: true, announcement });
      return;
    }

    if (requestUrl.pathname === "/api/session" && request.method === "GET") {
      try {
        const cookies = parseCookies(request.headers.cookie);

        // Prevent any cached /api/session responses (browser or proxy)
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");

        let authUser = await getAuthenticatedUser(request);

      // Fallback to dev auth if Postgres not available
      if (!authUser && !isPostgresEnabled()) {
        authUser = await getDevAuthenticatedUser(request);
      }

      const channelEnabled = await getChannelEnabledState().catch(() => ({ seed: {}, custom: {} }));
      const globalCustomChannels = await getGlobalCustomChannels().catch(() => []);

      if (authUser) {
        const appState = withGlobalCustomChannels(
          isPostgresEnabled() ? buildAppStateFromUser(authUser) : (await ensureUserSession(request, response)),
          globalCustomChannels
        );
        sendJson(response, 200, {
          ok: true,
          user: {
            ...appState,
            authenticated: true,
            email: authUser.email,
            channelEnabled,
          },
          auth: {
            enabled: isPostgresEnabled(),
            authenticated: true,
            email: authUser.email,
          },
        });
        return;
      }

        const user = withGlobalCustomChannels(await ensureUserSession(request, response), globalCustomChannels);
        sendJson(response, 200, {
          ok: true,
          user: {
            ...user,
            authenticated: false,
            email: "",
            channelEnabled,
          },
          auth: {
            enabled: isPostgresEnabled(),
            authenticated: false,
            email: "",
          },
        });
        return;
      } catch (error) {
        console.error(`❌ /api/session error: ${error.message}`);
        // Return guest session even if auth check fails
        try {
          const channelEnabled = await getChannelEnabledState().catch(() => ({ seed: {}, custom: {} }));
          const user = await ensureUserSession(request, response);
          sendJson(response, 200, {
            ok: true,
            user: {
              ...user,
              authenticated: false,
              email: "",
              channelEnabled,
            },
            auth: {
              enabled: false,
              authenticated: false,
              email: "",
            },
          });
        } catch {
          // Fallback: return minimal guest session
          sendJson(response, 200, {
            ok: true,
            user: { authenticated: false, email: "", recipes: [], cookbooks: [] },
            auth: { enabled: false, authenticated: false, email: "" },
          });
        }
        return;
      }
    }

    if (requestUrl.pathname === "/api/admin/push/announce" && request.method === "POST") {
      const adminUser = await requireAdmin(request);
      const body = await readRequestBody(request);
      const title = sanitizeText(body?.title || "").slice(0, 120);
      const message = sanitizeText(body?.body || "").slice(0, 280);
      const url = sanitizeText(body?.url || "").slice(0, 500);
      const imageUrl = sanitizeText(body?.imageUrl || body?.image || "").slice(0, 500);
      const category = sanitizeText(body?.category || "features").slice(0, 32);
      const templateKey = sanitizeText(body?.templateKey || body?.template || "").slice(0, 64);
      const segment = body?.segment && typeof body.segment === "object" ? body.segment : {};
      if (!title || !message) {
        throw new HttpError(400, "title en body zijn verplicht.");
      }
      if (!PUSH_CATEGORIES[category]) {
        throw new HttpError(400, "Ongeldige category.");
      }

      const webPush = ensureWebPushConfigured();
      const announcement = await createAnnouncement({ title, body: message, url: url || "", category, imageUrl, templateKey });
      const deepLink = `/?announce=${encodeURIComponent(announcement.id)}`;
      const effectiveUrl = url || deepLink;
      const payload = JSON.stringify({ title, body: message, url: effectiveUrl, imageUrl: imageUrl || undefined, announcementId: announcement.id });
      const subscriptions = await listPushSubscriptionsWithMeta();
      const onlyAh = Boolean(segment?.onlyFavoriteSupermarketAh);
      const onlyBasketReady = Boolean(segment?.onlyTriggerAhBasketReadyEnabled);
      const onlyBonus = Boolean(segment?.onlyTriggerAhBonusEnabled);
      const filtered = subscriptions.filter((sub) => {
        if (!isCategoryEnabledForPrefs(sub.prefs, category)) return false;
        if (onlyAh) {
          const fav = pickFavoriteSupermarketFromAppState(sub.userAppState);
          if (fav !== "ah") return false;
        }
        if (onlyBasketReady && !Boolean(sub?.prefs?.triggers?.ahBasketReady)) return false;
        if (onlyBonus && !Boolean(sub?.prefs?.triggers?.ahBonus)) return false;
        return true;
      });

      const endpointsToRemove = new Set();
      let sent = 0;
      let failed = 0;

      const concurrency = 10;
      const queue = filtered.slice();
      const workers = Array.from({ length: Math.min(concurrency, queue.length || 1) }).map(async () => {
        while (queue.length) {
          const sub = queue.shift();
          if (!sub) return;
          try {
            await webPush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload, { TTL: 60 * 60 * 24 });
            sent += 1;
          } catch (err) {
            failed += 1;
            const status = Number(err?.statusCode || err?.status || 0);
            if (status === 404 || status === 410) {
              endpointsToRemove.add(String(sub?.endpoint || ""));
            }
          }
        }
      });
      await Promise.all(workers);

      if (endpointsToRemove.size) {
        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          await pool.query(`DELETE FROM plately_push_subscriptions WHERE endpoint = ANY($1::text[])`, [
            Array.from(endpointsToRemove),
          ]);
        } else {
          for (const endpoint of endpointsToRemove) {
            await removeJsonPushSubscriptionByEndpoint(endpoint);
          }
        }
      }

      await updateAnnouncementMetrics(announcement.id, {
        matched: filtered.length,
        sent,
        failed,
        removed: endpointsToRemove.size,
      });

      sendJson(response, 200, {
        ok: true,
        sent,
        failed,
        removed: endpointsToRemove.size,
        category,
        matched: filtered.length,
        announcementId: announcement.id,
        deepLink,
        templateKey,
        admin: { userId: String(adminUser?.id || ""), email: String(adminUser?.email || "") },
      });
      return;
    }

    if (requestUrl.pathname === "/api/admin/push/announcements" && request.method === "GET") {
      await requireAdmin(request);
      const limit = Number(requestUrl.searchParams.get("limit") || 50) || 50;
      const announcements = await listRecentAnnouncements({ limit });
      const vapidConfigured = Boolean(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY && VAPID_SUBJECT);
      sendJson(response, 200, {
        ok: true,
        announcements,
        config: {
          vapidConfigured,
          vapidSubject: VAPID_SUBJECT ? String(VAPID_SUBJECT) : "",
          vapidPublicKeyPresent: Boolean(VAPID_PUBLIC_KEY),
          vapidPrivateKeyPresent: Boolean(VAPID_PRIVATE_KEY),
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/admin/push/delete" && request.method === "POST") {
      await requireAdmin(request);
      const body = await readRequestBody(request);
      const announcementId = sanitizeText(body?.announcementId || body?.id || "").trim();
      if (!announcementId) throw new HttpError(400, "announcementId is verplicht.");
      const deleted = await deleteAnnouncementById(announcementId);
      if (!deleted) throw new HttpError(404, "Aankondiging niet gevonden.");
      sendJson(response, 200, { ok: true, deleted: true, announcementId });
      return;
    }

    if (requestUrl.pathname === "/api/admin/push/resend" && request.method === "POST") {
      await requireAdmin(request);
      const body = await readRequestBody(request);
      const announcementId = sanitizeText(body?.announcementId || body?.id || "").trim();
      const segment = body?.segment && typeof body.segment === "object" ? body.segment : {};
      if (!announcementId) throw new HttpError(400, "announcementId is verplicht.");
      const existing = await getAnnouncementById(announcementId);
      if (!existing) throw new HttpError(404, "Aankondiging niet gevonden.");

      const title = sanitizeText(existing.title || "").slice(0, 120);
      const message = sanitizeText(existing.body || "").slice(0, 280);
      const url = sanitizeText(existing.url || "").slice(0, 500);
      const imageUrl = sanitizeText(existing.imageUrl || "").slice(0, 500);
      const category = sanitizeText(existing.category || "features").slice(0, 32);
      const templateKey = sanitizeText(existing.templateKey || "").slice(0, 64);
      if (!PUSH_CATEGORIES[category]) throw new HttpError(400, "Ongeldige category.");

      const webPush = ensureWebPushConfigured();
      const announcement = await createAnnouncement({ title, body: message, url: url || "", category, imageUrl, templateKey });
      const deepLink = `/?announce=${encodeURIComponent(announcement.id)}`;
      const effectiveUrl = url || deepLink;
      const payload = JSON.stringify({ title, body: message, url: effectiveUrl, imageUrl: imageUrl || undefined, announcementId: announcement.id });

      const subscriptions = await listPushSubscriptionsWithMeta();
      const onlyAh = Boolean(segment?.onlyFavoriteSupermarketAh);
      const onlyBasketReady = Boolean(segment?.onlyTriggerAhBasketReadyEnabled);
      const onlyBonus = Boolean(segment?.onlyTriggerAhBonusEnabled);
      const filtered = subscriptions.filter((sub) => {
        if (!isCategoryEnabledForPrefs(sub.prefs, category)) return false;
        if (onlyAh) {
          const fav = pickFavoriteSupermarketFromAppState(sub.userAppState);
          if (fav !== "ah") return false;
        }
        if (onlyBasketReady && !Boolean(sub?.prefs?.triggers?.ahBasketReady)) return false;
        if (onlyBonus && !Boolean(sub?.prefs?.triggers?.ahBonus)) return false;
        return true;
      });

      const endpointsToRemove = new Set();
      let sent = 0;
      let failed = 0;
      const concurrency = 10;
      const queue = filtered.slice();
      const workers = Array.from({ length: Math.min(concurrency, queue.length || 1) }).map(async () => {
        while (queue.length) {
          const sub = queue.shift();
          if (!sub) return;
          try {
            await webPush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload, { TTL: 60 * 60 * 24 });
            sent += 1;
          } catch (err) {
            failed += 1;
            const status = Number(err?.statusCode || err?.status || 0);
            if (status === 404 || status === 410) {
              endpointsToRemove.add(String(sub?.endpoint || ""));
            }
          }
        }
      });
      await Promise.all(workers);

      if (endpointsToRemove.size) {
        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          await pool.query(`DELETE FROM plately_push_subscriptions WHERE endpoint = ANY($1::text[])`, [
            Array.from(endpointsToRemove),
          ]);
        } else {
          for (const endpoint of endpointsToRemove) {
            await removeJsonPushSubscriptionByEndpoint(endpoint);
          }
        }
      }

      await updateAnnouncementMetrics(announcement.id, {
        matched: filtered.length,
        sent,
        failed,
        removed: endpointsToRemove.size,
      });

      sendJson(response, 200, {
        ok: true,
        resentFrom: announcementId,
        announcementId: announcement.id,
        deepLink,
        category,
        templateKey,
        matched: filtered.length,
        sent,
        failed,
        removed: endpointsToRemove.size,
      });
      return;
    }

    if (requestUrl.pathname === "/api/admin/push/test" && request.method === "POST") {
      const adminUser = await requireAdmin(request);
      const body = await readRequestBody(request);
      const title = sanitizeText(body?.title || "").slice(0, 120);
      const message = sanitizeText(body?.body || "").slice(0, 280);
      const url = sanitizeText(body?.url || "").slice(0, 500);
      const imageUrl = sanitizeText(body?.imageUrl || body?.image || "").slice(0, 500);
      const category = sanitizeText(body?.category || "features").slice(0, 32);
      if (!title || !message) throw new HttpError(400, "title en body zijn verplicht.");
      if (!PUSH_CATEGORIES[category]) throw new HttpError(400, "Ongeldige category.");

      const webPush = ensureWebPushConfigured();
      const subs = await listPushSubscriptionsForUser(adminUser?.id || "");
      const payload = JSON.stringify({ title, body: message, url: url || "/", imageUrl: imageUrl || undefined });
      let sent = 0;
      let failed = 0;
      for (const sub of subs) {
        try {
          await webPush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload, { TTL: 60 * 15 });
          sent += 1;
        } catch {
          failed += 1;
        }
      }
      sendJson(response, 200, { ok: true, sent, failed, matched: subs.length });
      return;
    }

    if (requestUrl.pathname === "/api/client-events" && request.method === "POST") {
      try {
        const body = await readRequestBody(request);
        const result = await ingestClientEvents(request, body);
        sendJson(response, 200, result);
      } catch (error) {
        if (error instanceof HttpError) {
          sendJson(response, error.statusCode || 400, {
            ok: false,
            error: error.message || "Request mislukt",
          });
        } else {
          console.error("/api/client-events error:", error?.message || error);
          sendJson(response, 400, { ok: false, error: "Ongeldige payload" });
        }
      }
      return;
    }

    if (requestUrl.pathname === "/api/app-state" && request.method === "PUT") {
      const body = await readRequestBody(request);
      const authUser = await getAuthenticatedUser(request);
      if (authUser) {
        const updatedUser = await updateAuthenticatedUserState(authUser.id, body);
        const channelEnabled = await getChannelEnabledState().catch(() => ({ seed: {}, custom: {} }));
        const globalCustomChannels = await getGlobalCustomChannels().catch(() => []);
        sendJson(response, 200, {
          ok: true,
          user: { ...withGlobalCustomChannels(buildAppStateFromUser(updatedUser), globalCustomChannels), channelEnabled },
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
      const prevImportedGuest = Array.isArray(user.importedRecipes) ? user.importedRecipes.length : 0;
      const nextUser = sanitizeUserStatePayload(body, user);
      const nextImportedGuest = Array.isArray(nextUser.importedRecipes) ? nextUser.importedRecipes.length : 0;
      if (nextImportedGuest > prevImportedGuest) {
        const lastGuest = nextUser.importedRecipes[nextImportedGuest - 1];
        console.log("[app-state]", {
          phase: "imported_recipes_saved",
          guest: true,
          userId: String(nextUser.id).slice(0, 24),
          prevCount: prevImportedGuest,
          nextCount: nextImportedGuest,
          lastTitle:
            typeof lastGuest?.title === "string"
              ? shortenUrlForLog(sanitizeText(lastGuest.title), 88)
              : undefined,
          lastId:
            typeof lastGuest?.id === "string" ? sanitizeText(lastGuest.id).slice(0, 28) : undefined,
          sourceHost: (() => {
            try {
              return new URL(sanitizeText(lastGuest?.sourceUrl || "")).hostname.replace(/^www\./i, "");
            } catch {
              return undefined;
            }
          })(),
        });
      }
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

    if (requestUrl.pathname === "/api/onboarding/seen" && request.method === "POST") {
      // Auth required: store a server-side flag so it survives cache clears.
      const nowIso = new Date().toISOString();

      // Postgres auth (production path)
      let authUser = await getAuthenticatedUser(request);

      // Dev-only fallback auth (json-file mode)
      if (!authUser && !isPostgresEnabled()) {
        authUser = await getDevAuthenticatedUser(request);
      }

      if (!authUser) {
        sendJson(response, 401, { ok: false, error: "Niet ingelogd." });
        return;
      }

      if (isPostgresEnabled()) {
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const existing = await pool.query(`SELECT id, email, app_state, created_at, updated_at FROM plately_users WHERE id = $1 LIMIT 1`, [authUser.id]);
        const row = existing.rows[0];
        if (!row) {
          throw new HttpError(404, "Gebruiker niet gevonden.");
        }
        const appState = row?.app_state && typeof row.app_state === "object" ? row.app_state : {};
        appState.onboardingSeenAt = nowIso;
        const updated = await pool.query(
          `
            UPDATE plately_users
            SET app_state = $2::jsonb,
                updated_at = NOW()
            WHERE id = $1
            RETURNING *
          `,
          [authUser.id, JSON.stringify(appState)]
        );
        sendJson(response, 200, { ok: true, onboardingSeenAt: nowIso, user: buildAppStateFromUser(updated.rows[0]) });
        return;
      }

      // json-file mode: persist in the user object
      const db = await loadDatabase();
      const userId = authUser.id;
      const user = db.users?.[userId];
      if (!user) {
        throw new HttpError(404, "Gebruiker niet gevonden.");
      }
      user.onboardingSeenAt = nowIso;
      user.updatedAt = new Date().toISOString();
      db.users[userId] = user;
      await persistDatabase();

      sendJson(response, 200, { ok: true, onboardingSeenAt: nowIso, user: { ...user, authenticated: true, email: authUser.email || user.email || "" } });
      return;
    }

    if (requestUrl.pathname === "/auth/magic" && request.method === "GET") {
      const secret = String(requestUrl.searchParams.get("s") || "").trim();
      const magicSecret = String(process.env.MAGIC_LINK_SECRET || "").trim();
      if (!magicSecret || !secret || secret !== magicSecret) {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Not found");
        return;
      }
      if (!isPostgresEnabled()) {
        response.writeHead(302, { Location: "/?error=db_required" });
        response.end();
        return;
      }
      await ensurePostgresSchema();
      const pool = await getPostgresPool();
      const result = await pool.query(`SELECT * FROM plately_users WHERE lower(email) = lower($1) LIMIT 1`, [ADMIN_EMAIL]);
      const user = result.rows[0];
      if (!user) {
        response.writeHead(302, { Location: "/?error=no_account" });
        response.end();
        return;
      }
      await createAuthSession(response, user.id);
      response.writeHead(302, { Location: "/" });
      response.end();
      return;
    }

    if (requestUrl.pathname === "/api/auth/apple-config" && request.method === "GET") {
      const enabled = isPostgresEnabled() && Boolean(APPLE_CLIENT_ID);
      const origin = getRequestPublicOrigin(request).replace(/\/$/, "");
      const redirectUri = APPLE_REDIRECT_URI || (origin ? `${origin}/` : "");
      sendJson(response, 200, {
        apple: {
          enabled,
          clientId: enabled ? APPLE_CLIENT_ID : "",
          redirectUri: enabled ? redirectUri : "",
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/auth/apple" && request.method === "POST") {
      if (!isPostgresEnabled() || !APPLE_CLIENT_ID) {
        throw new HttpError(503, "Apple-inloggen is niet ingeschakeld.");
      }
      const body = await readRequestBody(request);
      const idToken = String(body?.idToken || "").trim();
      if (!idToken) {
        throw new HttpError(400, "Apple-token ontbreekt.");
      }
      const displayName = sanitizeText(body?.name || "").slice(0, 80);

      await ensurePostgresSchema();
      const pool = await getPostgresPool();
      const { sub, email } = await verifyAppleIdToken(idToken, APPLE_CLIENT_ID);
      let { user, isNew } = await findOrCreateApplePostgresUser(pool, { sub, email, displayName });

      if (isNew && body?.currentState && typeof body.currentState === "object") {
        user = await updateAuthenticatedUserState(user.id, body.currentState);
      }

      const token = await createAuthSession(response, user.id);
      void recordEvent(isNew ? "auth_register_apple" : "auth_login_apple", user.id, { isNew: Boolean(isNew) });
      sendJson(response, 200, {
        ok: true,
        isNewUser: isNew,
        user: buildAppStateFromUser(user),
        auth: {
          enabled: true,
          authenticated: true,
          email: user.email,
          token,
        },
      });
      return;
    }

    if (requestUrl.pathname === "/api/auth/register" && request.method === "POST") {
      const body = await readRequestBody(request);
      const email = sanitizeEmail(body.email);
      const password = String(body.password || "");
      if (!isValidEmail(email)) {
        throw new HttpError(400, "Gebruik een geldig e-mailadres.");
      }
      if (!isValidPassword(password)) {
        throw new HttpError(400, "Gebruik een wachtwoord van minimaal 8 tekens.");
      }

      if (isPostgresEnabled()) {
        // Postgres-backed registration
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const existing = await pool.query(`SELECT id FROM plately_users WHERE email = $1 LIMIT 1`, [email]);
        if (existing.rows[0]) {
          throw new HttpError(409, "Er bestaat al een account met dit e-mailadres.");
        }

        const createdUser = await createPostgresUser(email, password, body.currentState || {});
        const token = await createAuthSession(response, createdUser.id);
        void recordEvent("auth_register", createdUser.id, { method: "password" });
        sendJson(response, 200, {
          ok: true,
          user: buildAppStateFromUser(createdUser),
          auth: {
            enabled: true,
            authenticated: true,
            email: createdUser.email,
            token,
          },
        });
        return;
      } else {
        // Dev fallback: simple in-memory auth without database
        const db = await loadDatabase();
        const existingEmail = Object.values(db.users || {}).some(u => u.email === email);
        if (existingEmail) {
          throw new HttpError(409, "Er bestaat al een account met dit e-mailadres.");
        }

        const userId = generateId("user");
        const { salt, hash } = createPasswordHash(password);
        let user = buildDefaultUserData(userId);
        user.email = email;
        user.password_hash = hash;
        user.password_salt = salt;
        user = sanitizeUserStatePayload(body.currentState || {}, user);
        db.users[userId] = user;
        await persistDatabase();

        const token = await createDevAuthSession(response, userId, email);
        sendJson(response, 200, {
          ok: true,
          user: { ...user, authenticated: true, email },
          auth: {
            enabled: false,
            authenticated: true,
            email: email,
            token,
          },
        });
        return;
      }
    }

    if (requestUrl.pathname === "/api/auth/login" && request.method === "POST") {
      const body = await readRequestBody(request);
      const email = sanitizeEmail(body.email);
      const password = String(body.password || "");

      if (isPostgresEnabled()) {
        // Postgres-backed login
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const result = await pool.query(`SELECT * FROM plately_users WHERE email = $1 LIMIT 1`, [email]);
        const user = result.rows[0];
        if (!user) {
          throw new HttpError(401, "Onjuiste inloggegevens.");
        }

        if (!user.password_hash || !user.password_salt) {
          throw new HttpError(
            401,
            "Dit account gebruikt Inloggen met Apple. Kies ‘Inloggen met Apple’ of gebruik ‘Wachtwoord vergeten?’ om een wachtwoord te zetten."
          );
        }

        const { hash } = createPasswordHash(password, user.password_salt);
        if (hash !== user.password_hash) {
          throw new HttpError(401, "Onjuiste inloggegevens.");
        }

        const token = await createAuthSession(response, user.id);
        void recordEvent("auth_login", user.id, { method: "password" });
        sendJson(response, 200, {
          ok: true,
          user: buildAppStateFromUser(user),
          auth: {
            enabled: true,
            authenticated: true,
            email: user.email,
            token,
          },
        });
        return;
      } else {
        // Dev fallback: simple in-memory auth without database
        const db = await loadDatabase();
        const userId = Object.entries(db.users || {}).find(
          ([_, u]) => u.email === email && u.password_hash && u.password_salt
        )?.[0];

        if (!userId) {
          throw new HttpError(401, "Onjuiste inloggegevens.");
        }

        const user = db.users[userId];
        const { hash } = createPasswordHash(password, user.password_salt);
        if (hash !== user.password_hash) {
          throw new HttpError(401, "Onjuiste inloggegevens.");
        }

        const token = await createDevAuthSession(response, userId, email);
        sendJson(response, 200, {
          ok: true,
          user: { ...user, authenticated: true, email },
          auth: {
            enabled: false,
            authenticated: true,
            email: user.email,
            token,
          },
        });
        return;
      }
    }

    if (requestUrl.pathname === "/api/auth/request-login-otp" && request.method === "POST") {
      const body = await readRequestBody(request);
      const email = sanitizeEmail(body.email);
      const name = String(body.name || "").trim();

      if (!isValidEmail(email)) {
        throw new HttpError(400, "Voer een geldig e-mailadres in.");
      }

      const loginOtps = await loadOtps();

      // Rate-limit: max 1 OTP per 60 seconds
      const existing = loginOtps[`login:${email}`];
      if (existing && Date.now() < new Date(existing.expiresAt).getTime() - 9 * 60 * 1000) {
        const isNewUserCached = existing.isNewUser ?? false;
        sendJson(response, 200, { ok: true, isNewUser: isNewUserCached });
        return;
      }

      let isNewUser = false;
      if (isPostgresEnabled()) {
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const result = await pool.query(`SELECT id FROM plately_users WHERE email = $1 LIMIT 1`, [email]);
        isNewUser = result.rows.length === 0;
      } else {
        const db = await loadDatabase();
        isNewUser = !Object.values(db.users || {}).some((u) => String(u.email || "").toLowerCase() === email);
      }

      const otpCode = String(Math.floor(100000 + crypto.randomInt(900000)));
      loginOtps[`login:${email}`] = { code: otpCode, expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), name, attempts: 0, isNewUser };
      await saveOtps(loginOtps);

      try {
        await sendEmail({
          to: email,
          subject: `${otpCode} — jouw Plately inlogcode`,
          text: `Jouw inlogcode voor Plately:\n\n${otpCode}\n\nDeze code is 10 minuten geldig.\nHeb je dit niet aangevraagd? Dan kun je deze e-mail veilig negeren.`,
          html: buildOtpEmailHtml({
            heading: isNewUser ? "Welkom bij Plately! 🎉" : "Jouw inlogcode",
            intro: `Gebruik de onderstaande code om ${isNewUser ? "je account aan te maken" : "in te loggen"}. De code is <strong>10 minuten</strong> geldig.`,
            code: otpCode,
            outro: "Heb je dit niet aangevraagd? Dan kun je deze e-mail veilig negeren.",
          }),
        });
      } catch (err) {
        console.error("❌ Login OTP e-mail mislukt:", err?.message || err);
      }

      sendJson(response, 200, { ok: true, isNewUser });
      return;
    }

    if (requestUrl.pathname === "/api/auth/verify-login-otp" && request.method === "POST") {
      const body = await readRequestBody(request);
      const email = sanitizeEmail(body.email);
      const code = String(body.code || "").trim();
      const name = String(body.name || "").trim();

      if (!isValidEmail(email) || !code) {
        throw new HttpError(400, "Verplichte velden ontbreken.");
      }

      const loginOtps = await loadOtps();
      const record = loginOtps[`login:${email}`];

      if (!record) throw new HttpError(400, "Geen actieve code. Vraag een nieuwe code aan via 'Opnieuw versturen'.");
      if (new Date() > new Date(record.expiresAt)) {
        delete loginOtps[`login:${email}`];
        await saveOtps(loginOtps);
        throw new HttpError(400, "Code is verlopen. Vraag een nieuwe aan.");
      }
      record.attempts = (record.attempts || 0) + 1;
      if (record.attempts > 5) {
        delete loginOtps[`login:${email}`];
        await saveOtps(loginOtps);
        throw new HttpError(400, "Te veel pogingen. Vraag een nieuwe code aan.");
      }
      if (record.code !== code) {
        await saveOtps(loginOtps);
        throw new HttpError(400, `Onjuiste code. Nog ${6 - record.attempts} poging${6 - record.attempts === 1 ? "" : "en"}.`);
      }
      const storedName = record.name || name;
      delete loginOtps[`login:${email}`];
      await saveOtps(loginOtps);

      if (isPostgresEnabled()) {
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        let result = await pool.query(`SELECT * FROM plately_users WHERE email = $1 LIMIT 1`, [email]);
        let user = result.rows[0];
        if (user) {
          const existingProfile = typeof user.profile === "object" ? user.profile : JSON.parse(user.profile || "{}");
          if (existingProfile.active === false) throw new HttpError(403, "Dit account is gedeactiveerd. Neem contact op met hallo@plately.nl.");
        }

        if (!user) {
          // Create passwordless user
          const userId = generateId("user");
          const appState = sanitizeUserStatePayload(
            { profile: { name: storedName, email }, ...(body.currentState || {}) },
            buildDefaultUserData(userId)
          );
          const inserted = await pool.query(
            `INSERT INTO plately_users (id, email, password_hash, password_salt, profile, app_state)
             VALUES ($1, $2, NULL, NULL, $3::jsonb, $4::jsonb) RETURNING *`,
            [userId, email, JSON.stringify(appState.profile), JSON.stringify(appState)]
          );
          user = inserted.rows[0];
          void recordEvent("auth_register", user.id, { method: "otp" });
          void sendEmail({
            to: email,
            subject: "Welkom bij Plately! 🎉",
            html: buildWelcomeEmailHtml({ name: storedName }),
          }).catch((err) => console.error("❌ Welkomstmail mislukt:", err?.message || err));
        } else {
          void recordEvent("auth_login", user.id, { method: "otp" });
          // Restore client state if the server account has no recipes yet
          const clientRecipes = Array.isArray(body.currentState?.importedRecipes) ? body.currentState.importedRecipes : [];
          const serverState = buildAppStateFromUser(user);
          if (!serverState.importedRecipes.length && clientRecipes.length) {
            const restored = sanitizeUserStatePayload(body.currentState, buildDefaultUserData(user.id));
            const updated = await pool.query(
              `UPDATE plately_users SET app_state = $2::jsonb, profile = $3::jsonb, updated_at = NOW() WHERE id = $1 RETURNING *`,
              [user.id, JSON.stringify(restored), JSON.stringify(restored.profile)]
            );
            user = updated.rows[0];
          }
        }
        const token = await createAuthSession(response, user.id);
        sendJson(response, 200, {
          ok: true,
          user: buildAppStateFromUser(user),
          auth: { enabled: true, authenticated: true, email: user.email, token },
        });
        return;
      } else {
        const db = await loadDatabase();
        let userId = Object.entries(db.users || {}).find(
          ([_, u]) => String(u.email || "").toLowerCase() === email
        )?.[0];
        if (userId && db.users[userId]?.active === false) {
          throw new HttpError(403, "Dit account is gedeactiveerd. Neem contact op met hallo@plately.nl.");
        }
        if (!userId) {
          userId = generateId("user");
          let user = buildDefaultUserData(userId);
          user.email = email;
          user = sanitizeUserStatePayload(
            { profile: { name: storedName, email }, ...(body.currentState || {}) },
            user
          );
          db.users[userId] = user;
          await persistDatabase();
          void sendEmail({
            to: email,
            subject: "Welkom bij Plately! 🎉",
            html: buildWelcomeEmailHtml({ name: storedName }),
          }).catch((err) => console.error("❌ Welkomstmail mislukt:", err?.message || err));
        } else {
          // Restore client state if the existing JSON db account has no recipes yet
          const existingUser = db.users[userId];
          const clientRecipes = Array.isArray(body.currentState?.importedRecipes) ? body.currentState.importedRecipes : [];
          if (!(Array.isArray(existingUser.importedRecipes) && existingUser.importedRecipes.length) && clientRecipes.length) {
            db.users[userId] = sanitizeUserStatePayload(body.currentState, existingUser);
            await persistDatabase();
          }
        }
        const user = db.users[userId];
        const token = await createDevAuthSession(response, userId, email);
        sendJson(response, 200, {
          ok: true,
          user: { ...user, authenticated: true, email },
          auth: { enabled: false, authenticated: true, email, token },
        });
        return;
      }
    }

    if (requestUrl.pathname === "/api/auth/logout" && request.method === "POST") {
      if (isPostgresEnabled()) {
        await clearAuthSession(request, response);
      } else {
        await clearDevAuthSession(request, response);
      }
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

    if (requestUrl.pathname === "/api/auth/account" && request.method === "DELETE") {
      let authUser = await getAuthenticatedUser(request).catch(() => null);
      if (!authUser) authUser = await getDevAuthenticatedUser(request).catch(() => null);
      if (!authUser) throw new HttpError(401, "Niet ingelogd.");

      if (isPostgresEnabled()) {
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        await pool.query("DELETE FROM plately_auth_sessions WHERE user_id = $1", [authUser.id]);
        await pool.query("DELETE FROM plately_users WHERE id = $1", [authUser.id]);
      } else {
        const db = await loadDatabase();
        if (db.users?.[authUser.id]) delete db.users[authUser.id];
        if (db.authSessions) {
          for (const token of Object.keys(db.authSessions)) {
            if (db.authSessions[token]?.userId === authUser.id) delete db.authSessions[token];
          }
        }
        await persistDatabase();
      }

      await clearAuthSession(request, response).catch(() => {});
      await clearDevAuthSession(request, response).catch(() => {});
      sendJson(response, 200, { ok: true });
      return;
    }

    if (requestUrl.pathname === "/api/auth/change-password" && request.method === "POST") {
      const authUser = await getDevAuthenticatedUser(request);
      if (!authUser) {
        throw new HttpError(401, "Niet ingelogd.");
      }

      const body = await readRequestBody(request);
      const currentPassword = String(body.currentPassword || "");
      const newPassword = String(body.newPassword || "");

      if (newPassword.length < 8) {
        throw new HttpError(400, "Wachtwoord moet minstens 8 tekens zijn.");
      }

      if (isPostgresEnabled()) {
        // Postgres-backed password change
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const result = await pool.query(`SELECT * FROM plately_users WHERE id = $1 LIMIT 1`, [authUser.id]);
        const user = result.rows[0];
        if (!user) {
          throw new HttpError(401, "Gebruiker niet gevonden.");
        }

        const { hash } = createPasswordHash(currentPassword, user.password_salt);
        if (hash !== user.password_hash) {
          throw new HttpError(401, "Huidig wachtwoord is incorrect.");
        }

        const { hash: newHash, salt: newSalt } = createPasswordHash(newPassword);
        await pool.query(
          `UPDATE plately_users SET password_hash = $1, password_salt = $2 WHERE id = $3`,
          [newHash, newSalt, authUser.id]
        );

        sendJson(response, 200, {
          success: true,
          message: "Wachtwoord succesvol gewijzigd.",
        });
        return;
      } else {
        // Dev fallback: in-memory password change
        const db = await loadDatabase();
        const user = db.users[authUser.id];
        if (!user) {
          throw new HttpError(401, "Gebruiker niet gevonden.");
        }

        const { hash } = createPasswordHash(currentPassword, user.password_salt);
        if (hash !== user.password_hash) {
          throw new HttpError(401, "Huidig wachtwoord is incorrect.");
        }

        const { hash: newHash, salt: newSalt } = createPasswordHash(newPassword);
        user.password_hash = newHash;
        user.password_salt = newSalt;
        await saveDatabase(db);

        sendJson(response, 200, {
          success: true,
          message: "Wachtwoord succesvol gewijzigd.",
        });
        return;
      }
    }

    if (requestUrl.pathname === "/api/auth/profile-photo" && request.method === "POST") {
      const authUser = await getAuthenticatedUser(request).catch(() => null)
        || await getDevAuthenticatedUser(request).catch(() => null);
      if (!authUser) throw new HttpError(401, "Niet ingelogd.");

      const body = await readRequestBody(request);
      const rawPhoto = String(body.photo || "");

      if (!rawPhoto.startsWith("data:image/jpeg;base64,") && !rawPhoto.startsWith("data:image/png;base64,")) {
        throw new HttpError(400, "Alleen JPEG of PNG afbeeldingen zijn toegestaan.");
      }
      const base64Part = rawPhoto.split(",")[1] || "";
      const byteLength = Math.ceil(base64Part.length * 0.75);
      if (byteLength > 2 * 1024 * 1024) {
        throw new HttpError(400, "Afbeelding mag maximaal 2MB zijn.");
      }

      if (isPostgresEnabled()) {
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const existing = await pool.query(`SELECT profile FROM plately_users WHERE id = $1 LIMIT 1`, [authUser.id]);
        if (!existing.rows[0]) throw new HttpError(404, "Gebruiker niet gevonden.");
        const currentProfile = existing.rows[0].profile || {};
        const updatedProfile = { ...currentProfile, photo: rawPhoto };
        await pool.query(
          `UPDATE plately_users SET profile = $2::jsonb, updated_at = NOW() WHERE id = $1`,
          [authUser.id, JSON.stringify(updatedProfile)]
        );
      } else {
        const db = await loadDatabase();
        const user = db.users[authUser.id];
        if (!user) throw new HttpError(404, "Gebruiker niet gevonden.");
        if (!user.profile) user.profile = {};
        user.profile.photo = rawPhoto;
        await persistDatabase();
      }

      sendJson(response, 200, { ok: true, photoUrl: rawPhoto });
      return;
    }

    if (requestUrl.pathname === "/api/auth/request-password-reset" && request.method === "POST") {
      const body = await readRequestBody(request);
      const email = String(body.email || "").trim().toLowerCase();

      if (!email || !email.includes("@")) {
        throw new HttpError(400, "Geldig e-mailadres vereist.");
      }

      const resetOtps = await loadOtps();

      // Rate-limit: one OTP per email per 60 seconds
      const existingReset = resetOtps[`reset:${email}`];
      if (existingReset && Date.now() < new Date(existingReset.expiresAt).getTime() - 14 * 60 * 1000) {
        sendJson(response, 200, { ok: true, step: "code" });
        return;
      }

      // Check if user exists (always respond OK to avoid user enumeration)
      let userExists = false;
      if (isPostgresEnabled()) {
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const result = await pool.query(`SELECT id FROM plately_users WHERE LOWER(email) = $1 LIMIT 1`, [email]);
        userExists = result.rows.length > 0;
      } else {
        const db = await loadDatabase();
        userExists = Object.values(db.users).some((u) => String(u.email || "").toLowerCase() === email);
      }

      if (!userExists) {
        sendJson(response, 200, { ok: true, step: "code" });
        return;
      }

      // Generate 6-digit OTP
      const otpCode = String(Math.floor(100000 + crypto.randomInt(900000)));
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      resetOtps[`reset:${email}`] = { code: otpCode, expiresAt, attempts: 0 };
      await saveOtps(resetOtps);

      // Send OTP by email
      const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
      const hasResend = !!process.env.RESEND_API_KEY;
      try {
        await sendEmail({
          to: email,
          subject: `${otpCode} — Plately wachtwoord resetten`,
          text: `Jouw herstelcode voor Plately:\n\n${otpCode}\n\nDeze code is 15 minuten geldig.\nHeb je dit niet aangevraagd? Dan kun je deze e-mail veilig negeren.`,
          html: buildOtpEmailHtml({
            heading: "Wachtwoord vergeten?",
            intro: "Gebruik de onderstaande code om je wachtwoord opnieuw in te stellen. De code is <strong>15 minuten</strong> geldig.",
            code: otpCode,
            outro: "Heb je dit niet aangevraagd? Dan kun je deze e-mail veilig negeren.",
          }),
        });
      } catch (err) {
        console.error("❌ E-mail verzenden mislukt:", err?.message || err);
      }

      sendJson(response, 200, {
        ok: true,
        step: "code",
        ...(!hasSmtp && !hasResend && { _devCode: otpCode }),
      });
      return;
    }

    if (requestUrl.pathname === "/api/auth/verify-reset-otp" && request.method === "POST") {
      const body = await readRequestBody(request);
      const email = String(body.email || "").trim().toLowerCase();
      const code = String(body.code || "").trim();
      const newPassword = String(body.newPassword || "");

      if (!email || !code || !newPassword) {
        throw new HttpError(400, "Verplichte velden ontbreken.");
      }
      if (newPassword.length < 8) {
        throw new HttpError(400, "Wachtwoord moet minstens 8 tekens zijn.");
      }

      const resetOtps = await loadOtps();
      const record = resetOtps[`reset:${email}`];

      if (!record) {
        throw new HttpError(400, "Geen actieve resetcode. Vraag een nieuwe aan.");
      }
      if (new Date() > new Date(record.expiresAt)) {
        delete resetOtps[`reset:${email}`];
        await saveOtps(resetOtps);
        throw new HttpError(400, "Code is verlopen. Vraag een nieuwe aan.");
      }

      record.attempts = (record.attempts || 0) + 1;
      if (record.attempts > 5) {
        delete resetOtps[`reset:${email}`];
        await saveOtps(resetOtps);
        throw new HttpError(400, "Te veel pogingen. Vraag een nieuwe code aan.");
      }
      if (record.code !== code) {
        await saveOtps(resetOtps);
        throw new HttpError(400, `Onjuiste code. Nog ${6 - record.attempts} poging${6 - record.attempts === 1 ? "" : "en"}.`);
      }

      // Code correct — update password
      delete resetOtps[`reset:${email}`];
      await saveOtps(resetOtps);
      const { hash: newHash, salt: newSalt } = createPasswordHash(newPassword);

      if (isPostgresEnabled()) {
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        await pool.query(
          `UPDATE plately_users SET password_hash = $1, password_salt = $2 WHERE LOWER(email) = $3`,
          [newHash, newSalt, email]
        );
      } else {
        const db = await loadDatabase();
        const user = Object.values(db.users).find((u) => u.email.toLowerCase() === email);
        if (user) {
          user.password_hash = newHash;
          user.password_salt = newSalt;
          await saveDatabase(db);
        }
      }

      sendJson(response, 200, { ok: true, message: "Wachtwoord succesvol gewijzigd. Je kunt nu inloggen." });
      return;
    }

    if (requestUrl.pathname === "/api/grocery-suggest" && request.method === "GET") {
      const raw = sanitizeText(requestUrl.searchParams.get("q") || "");
      if (!raw || raw.length < 2) {
        sendJson(response, 200, { ok: true, suggestions: [] });
        return;
      }
      let products = await findAHProducts(raw, 14);
      const best = pickAhBasketDefaultProduct(products, {});
      if (best && products.length > 1) {
        products = [best, ...products.filter((p) => String(p?.id || "") !== String(best?.id || ""))];
      }
      sendJson(response, 200, {
        ok: true,
        suggestions: products.slice(0, 5).map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          url: p.url,
          imageUrl: p.imageUrl,
        })),
      });
      return;
    }

    if (requestUrl.pathname === "/api/channel-search" && request.method === "GET") {
      const searchStarted = Date.now();
      const responseTimeMs = () => Date.now() - searchStarted;
      const queryRaw = sanitizeText(requestUrl.searchParams.get("q") || "");
      const query = queryRaw;
      const normalizedForAnalytics = normalizeSearchQuery(queryRaw);
      if (!query || query.length < 2) {
        sendJson(response, 200, { ok: true, results: [], responseTimeMs: responseTimeMs() });
        return;
      }
      const channelsParamPresent = requestUrl.searchParams.has("channels");
      const channelsParam = sanitizeText(requestUrl.searchParams.get("channels") || "");
      const customChannelsRaw = requestUrl.searchParams.get("customChannels") || "";

      const authUser = await getAuthenticatedUser(request).catch(() => null);
      const { allowedChannels, customChannelsParam } = await resolveAllowedChannelSearchForRequest(
        authUser,
        channelsParamPresent,
        channelsParam,
        customChannelsRaw
      );
      const channelOverrides = await getChannelOverrides();

      // Analytics: record channel search (best-effort, avoids PII beyond user id)
      if (normalizedForAnalytics) {
        await recordEvent("channel_search", authUser?.id || null, { query: normalizedForAnalytics });
      }

      const cacheKey = getChannelSearchCacheKey({ query, allowedChannels, customChannelsParam });
      const cached = getCachedChannelSearch(cacheKey);
      if (cached) {
        sendJson(response, 200, { ok: true, results: cached, responseTimeMs: responseTimeMs() });
        return;
      }

      const runCustomChannelExtras = async () => {
        if (!customChannelsParam) return [];
        const customChannelEntries = customChannelsParam
          .split(",")
          .map((entry) => {
            const parts = entry.split("|");
            if (parts.length < 3) return null;
            const [id, name, url] = parts;
            return { id: id.trim(), name: name.trim(), url: url.trim() };
          })
          .filter((ch) => ch && ch.id && ch.name && ch.url);

        const enabledSeedIds =
          allowedChannels === null ? Object.keys(SEED_CHANNEL_DEFAULTS) : allowedChannels;
        const enabledSeedBaseUrls = enabledSeedIds
          .map((id) => SEED_CHANNEL_DEFAULTS[id]?.baseUrl || "")
          .filter(Boolean);
        const dedupedCustomChannelEntries = customChannelEntries.filter((ch) => {
          for (const seedBaseUrl of enabledSeedBaseUrls) {
            if (channelUrlsMatchByBaseOrPrefix(ch.url, seedBaseUrl)) return false;
          }
          return true;
        });
        if (!dedupedCustomChannelEntries.length) return [];

        const customSearches = await Promise.allSettled(
          dedupedCustomChannelEntries.map((ch) => {
            const eff = getEffectiveCustomChannelConfig({ channelId: ch.id, url: ch.url }, channelOverrides);
            const usedUrl = buildSeedSearchUrlFromTemplate(eff.searchUrlTemplate, query);
            return scrapeOrRestPublic(eff.baseUrl, ch.name, ch.id, usedUrl, parseWPStandard, 4, query, {
              relaxedQueryMatch: true,
              forceSerperFallback: true,
            });
          })
        );
        const merged = [];
        for (const s of customSearches) {
          if (s.status === "fulfilled" && Array.isArray(s.value)) {
            merged.push(
              ...s.value
                .filter((r) => channelSearchResultTitleMatchesQuery(r.channelId, r.title, query, { relaxedQueryMatch: true }))
                .slice(0, 4)
            );
          }
        }
        return merged;
      };

      const [seedResults, customResults] = await Promise.all([
        searchChannelRecipes(query, allowedChannels),
        runCustomChannelExtras(),
      ]);
      const merged = [...(Array.isArray(seedResults) ? seedResults : []), ...customResults];
      const results =
        merged.length > 0 ? await enrichChannelSearchResultsWithRatings(merged) : merged;

      // Never cache empty responses: a cold multi-channel race often returns [] once, then succeeds
      // a second later — caching [] poisons the app while admin "test channel" (no cache) works.
      if (Array.isArray(results) && results.length > 0) {
        setCachedChannelSearch(cacheKey, results);
      }
      sendJson(response, 200, { ok: true, results, responseTimeMs: responseTimeMs() });
      return;
    }

    if (requestUrl.pathname === "/api/seo-recipe-search" && request.method === "GET") {
      const searchStarted = Date.now();
      const responseTimeMs = () => Date.now() - searchStarted;
      const queryRaw = sanitizeText(requestUrl.searchParams.get("q") || "");
      const query = queryRaw;
      if (!query || query.length < 2) {
        sendJson(response, 200, { ok: true, results: [], responseTimeMs: responseTimeMs() });
        return;
      }
      const channelsParamPresent = requestUrl.searchParams.has("channels");
      const channelsParam = sanitizeText(requestUrl.searchParams.get("channels") || "");
      const customChannelsRaw = requestUrl.searchParams.get("customChannels") || "";
      const limitRaw = Number.parseInt(String(requestUrl.searchParams.get("limit") || ""), 10);
      const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 60) : 18;

      const authUser = await getAuthenticatedUser(request).catch(() => null);
      const { allowedChannels } = await resolveAllowedChannelSearchForRequest(
        authUser,
        channelsParamPresent,
        channelsParam,
        customChannelsRaw
      );

      const origin = getPublicOrigin(request);
      const entries = await listPublicSeoRecipesCached(origin);
      const results = searchPublicSeoRecipesLocal({ entries, query, allowedChannels, limit });
      sendJson(response, 200, { ok: true, results, responseTimeMs: responseTimeMs() });
      return;
    }

    if (requestUrl.pathname === "/api/ah-debug" && request.method === "GET") {
      const diag = { cacheSize: _ahSearchCache.size };
      try {
        const token = await fetchAHAnonymousToken();
        diag.tokenOk = true;
        diag.tokenPrefix = String(token || "").slice(0, 12) + "…";
      } catch (err) {
        diag.tokenOk = false;
        diag.tokenError = String(err?.message || err);
      }
      if (diag.tokenOk) {
        try {
          const products = await findAHProducts("kipfilet", 2);
          diag.searchOk = products.length > 0;
          diag.searchCount = products.length;
          diag.firstProduct = products[0]?.name || null;
          diag.firstImageUrl = products[0]?.imageUrl || null;
        } catch (err) {
          diag.searchOk = false;
          diag.searchError = String(err?.message || err);
        }
      }
      sendJson(response, 200, { ok: true, ...diag });
      return;
    }

    if (requestUrl.pathname === "/api/grocery-photos" && request.method === "POST") {
      const body = await readRequestBody(request);
      const items = Array.isArray(body.items) ? body.items.slice(0, 20) : [];
      const photoResults = await Promise.allSettled(
        items.map(async (item) => {
          const rawTitle = sanitizeText(item.title || "");
          const searchTitle = canonicalizeIngredientForStoreSearch(rawTitle) || rawTitle;
          let parsed = await findAHAlternativesGrouped(searchTitle, {}, 16);
          if (!parsed.length) parsed = await findAHProducts(searchTitle, 12);
          const best = selectAhProductForGroceryHandoff(parsed, {});
          return { id: item.id, imageUrl: best?.imageUrl || parsed[0]?.imageUrl || "" };
        })
      );
      const photos = {};
      for (const result of photoResults) {
        if (result.status === "fulfilled" && result.value.imageUrl) {
          const raw = result.value.imageUrl;
          photos[result.value.id] = isAllowedImageProxyUrl(raw)
            ? `/api/image-proxy?url=${encodeURIComponent(raw)}`
            : raw;
        }
      }
      sendJson(response, 200, { ok: true, photos });
      return;
    }

    if (requestUrl.pathname === "/api/import" && request.method === "POST") {
      const traceId = newImportTraceId();
      let cleanUrl = "";
      let sourceHost = "";
      try {
        const body = await readRequestBody(request);
        // Strip surrounding text — extract the first http(s) URL from whatever was pasted
        const rawInput = String(body.url || "").trim();
        const urlMatch = rawInput.match(/https?:\/\/[^\s]+/);
        cleanUrl = urlMatch ? urlMatch[0] : rawInput;
        try {
          sourceHost = new URL(cleanUrl).hostname.replace(/^www\./, "");
        } catch {
          sourceHost = "";
        }
        const imageHintPresent = Boolean(String(body.imageHint || "").trim());
        logImportRequest("start", traceId, {
          url: shortenUrlForLog(cleanUrl),
          host: sourceHost || undefined,
          hasNote: Boolean(String(body.note || "").trim()),
          hasImageHint: imageHintPresent,
        });

        const recipe = await importRecipe(cleanUrl, body.note || "", body.imageHint || "");

        const isInvalidRecipe = (candidate) => {
          if (!candidate || typeof candidate !== "object") return true;
          const title = sanitizeText(candidate.title || "");
          const ingredients = Array.isArray(candidate.ingredients) ? candidate.ingredients.filter(Boolean) : [];
          const instructions = Array.isArray(candidate.instructions) ? candidate.instructions.filter(Boolean) : [];
          if (!title) return true;
          if (ingredients.length < 2 && instructions.length < 1) return true;
          return false;
        };

        // Social imports (instagram/facebook/pinterest) that have a title are kept even without
        // ingredients/instructions — the user can fill those in after import.
        const isSocialImport = ["instagram", "facebook", "pinterest"].includes(recipe?.platform || "");
        const socialHasTitle = isSocialImport && Boolean(sanitizeText(recipe?.title || ""));
        if (isInvalidRecipe(recipe) && !socialHasTitle) {
          const ig = Array.isArray(recipe?.ingredients) ? recipe.ingredients.filter(Boolean).length : 0;
          const st = Array.isArray(recipe?.instructions) ? recipe.instructions.filter(Boolean).length : 0;
          logImportRequest("reject_not_recipe", traceId, {
            url: shortenUrlForLog(cleanUrl),
            host: sourceHost || undefined,
            platform: sanitizeText(recipe?.platform || "") || undefined,
            titleLen: sanitizeText(recipe?.title || "").length,
            ingredientsCount: ig,
            stepsCount: st,
          });
          sendJson(response, 400, {
            ok: false,
            error: "not_recipe",
            message: "Geen recept gevonden om te importeren, waarschijnlijk is het een blog.",
          });
          return;
        }

        // Analytics: record import event (best-effort)
        const authUser = await getAuthenticatedUser(request).catch(() => null);
        const igOk = Array.isArray(recipe?.ingredients) ? recipe.ingredients.filter(Boolean).length : 0;
        const stOk = Array.isArray(recipe?.instructions) ? recipe.instructions.filter(Boolean).length : 0;
        logImportRequest("ok", traceId, {
          url: shortenUrlForLog(cleanUrl),
          host: sourceHost || undefined,
          title: shortenUrlForLog(sanitizeText(recipe.title || ""), 80),
          platform: sanitizeText(recipe?.platform || "") || undefined,
          channelId: sanitizeText(recipe?.channelId || "") || undefined,
          ingredientsCount: igOk,
          stepsCount: stOk,
          needsReview: Boolean(recipe?.needsReview),
          userId: authUser?.id ? String(authUser.id).slice(0, 24) : undefined,
        });

        await recordEvent("import", authUser?.id || null, {
          sourceUrl: cleanUrl,
          sourceHost,
          platform: recipe?.platform || "",
          channelId: recipe?.channelId || "",
        });
        sendJson(response, 200, { ok: true, recipe });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        const rawMessage = String(error?.message || "");
        console.error("[import] error", traceId, {
          statusCode,
          name: error?.name,
          message: rawMessage.slice(0, 500),
          stack:
            typeof error?.stack === "string"
              ? error.stack
                  .split("\n")
                  .slice(0, 8)
                  .join(" → ")
                  .slice(0, 900)
              : undefined,
        });

        if (
          /jsdom is not defined/i.test(rawMessage) ||
          /JSDOM is not defined/i.test(rawMessage) ||
          /not[_\\s-]*recei?pe/i.test(rawMessage)
        ) {
          logImportRequest("reject_not_recipe_exception", traceId, {
            reason: rawMessage.slice(0, 200),
          });
          sendJson(response, 400, {
            ok: false,
            error: "not_recipe",
            message: "Geen recept gevonden om te importeren, waarschijnlijk is het een blog.",
          });
          return;
        }

        logImportRequest("fail", traceId, {
          httpStatus: statusCode,
          error: sanitizeText(rawMessage).slice(0, 280) || "import_failed",
        });
        try {
          const authUser = await getAuthenticatedUser(request).catch(() => null);
          await recordEvent("import_failed", authUser?.id || null, {
            traceId,
            sourceUrl: cleanUrl,
            sourceHost,
            httpStatus: statusCode,
            error: sanitizeText(rawMessage).slice(0, 500),
          });
          importErrors.unshift({ url: cleanUrl, error: sanitizeText(rawMessage).slice(0, 500), userId: authUser?.id || null, timestamp: new Date().toISOString() });
          if (importErrors.length > IMPORT_ERRORS_MAX) importErrors.length = IMPORT_ERRORS_MAX;
          console.log(
            JSON.stringify({
              evt: "plately_import_failed",
              traceId,
              httpStatus: statusCode,
              err: sanitizeText(rawMessage).slice(0, 200),
            })
          );
        } catch {
          /* ignore logging */
        }
        const errorMessage = rawMessage || "Import mislukt. Controleer de link en probeer opnieuw.";
        sendJson(response, statusCode, { ok: false, error: "import_failed", message: errorMessage });
      }
      return;
    }

    if (requestUrl.pathname === "/api/store-basket" && request.method === "POST") {
      const body = await readRequestBody(request);
      const basket = await buildStoreBasket(body);
      sendJson(response, 200, { ok: true, ...basket });
      return;
    }

    if (requestUrl.pathname === "/api/ah-research" && request.method === "POST") {
      const body = await readRequestBody(request);
      const result = await researchAHChoices(body);
      sendJson(response, 200, { ok: true, ...result });
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
      // AH only opens Mijn lijst; Jumbo can still use a direct cart handoff when SKUs are available.
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

    if (requestUrl.pathname === "/admin" && request.method === "GET") {
      // Serve admin.html - authentication check happens in admin.html with fetch calls
      // The API endpoints (/api/admin/*) will enforce authentication
      await serveStaticFile("/admin.html", response, request);
      return;
    }

    if (requestUrl.pathname === "/api/debug/db" && request.method === "GET") {
      console.log("🔍 /api/debug/db called");
      try {
        const rawFile = await fsp.readFile(DATA_FILE, "utf8");
        const parsed = JSON.parse(rawFile);
        sendJson(response, 200, {
          ok: true,
          dataFile: DATA_FILE,
          fileSize: rawFile.length,
          users: Object.keys(parsed.users || {}).length,
          sessions: Object.keys(parsed.sessions || {}).length,
          authSessions: Object.keys(parsed.authSessions || {}).length,
          firstUserKeys: Object.keys(parsed.users || {}).slice(0, 3),
        });
      } catch (error) {
        sendJson(response, 500, {
          ok: false,
          error: error.message,
          dataFile: DATA_FILE,
        });
      }
      return;
    }

    if (requestUrl.pathname === "/api/admin/deploy-info" && request.method === "GET") {
      try {
        await requireAdmin(request);
        sendJson(response, 200, buildPlatelyDeployInfoPayload());
      } catch (error) {
        const status = error instanceof HttpError ? error.statusCode : 500;
        sendJson(response, status, { ok: false, error: error.message || "Error" });
      }
      return;
    }

    if (requestUrl.pathname === "/api/admin/stats" && request.method === "GET") {
      console.log("📊 /api/admin/stats called");

      try {
        await requireAdmin(request);
        let users = [];
        let sessions = [];

        if (isPostgresEnabled()) {
          // Get users from PostgreSQL
          console.log("📦 Loading users from PostgreSQL...");
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const result = await pool.query("SELECT * FROM plately_users ORDER BY created_at DESC");
          users = result.rows.map((u) => {
            const appState = typeof u.app_state === 'object' ? u.app_state : JSON.parse(u.app_state || '{}');
            const profile = typeof u.profile === 'object' ? u.profile : JSON.parse(u.profile || '{}');
            const importedRecipes = appState.importedRecipes || [];
            const cookbooksList = appState.cookbooks || [];
            const customChannelsList = Array.isArray(appState.customChannels) ? appState.customChannels : [];
            const followedChannelIds = Array.isArray(appState.followedChannelIds)
              ? appState.followedChannelIds.map((id) => sanitizeText(id)).filter(Boolean)
              : [];
            const channelNameById = new Map(
              [
                ...SEED_CHANNELS.map((ch) => ({ id: ch.id, name: ch.name })),
                ...customChannelsList.map((ch) => ({ id: sanitizeText(ch?.id || ""), name: sanitizeText(ch?.name || "") })),
              ]
                .filter((ch) => ch.id)
                .map((ch) => [ch.id, ch.name || ch.id])
            );
            const followedChannels = followedChannelIds.map((id) => ({ id, name: channelNameById.get(id) || id }));
            const customChannelsCounts = customChannelsList.reduce(
              (acc, ch) => {
                const status = (ch?.status || "approved");
                acc.total += 1;
                if (status === "pending") acc.pending += 1;
                else if (status === "rejected") acc.rejected += 1;
                else acc.approved += 1;
                return acc;
              },
              { total: 0, approved: 0, pending: 0, rejected: 0 }
            );
            return {
              id: u.id,
              email: u.email,
              recipes: importedRecipes.length,
              cookbooks: cookbooksList.length,
              groceryItems: (appState.groceryItems || []).length,
              createdAt: u.created_at,
              updatedAt: u.updated_at,
              hasProfile: Boolean(profile.name),
              profileName: profile.name || "",
              profilePhoto: profile.photo || "",
              importedRecipes: importedRecipes.map(r => ({ title: r.title || "Naamloos recept" })),
              cookbookList: cookbooksList.map(c => ({ name: c.name || "Naamloos kookboek" })),
              customChannels: customChannelsList.map((ch) => ({
                id: ch?.id || "",
                name: ch?.name || "",
                url: ch?.url || "",
                status: ch?.status || "approved",
                createdAt: ch?.createdAt || "",
              })),
              followedChannelIds,
              followedChannels,
              customChannelsCounts,
            };
          });
          console.log(`✅ Loaded ${users.length} users from PostgreSQL`);
        } else {
          // Read from JSON file
          console.log("📖 Loading users from JSON file...");
          const rawFile = await fsp.readFile(DATA_FILE, "utf8");
          const parsed = JSON.parse(rawFile);
          users = Object.values(parsed.users || {}).map((u) => {
            const importedRecipes = u.importedRecipes || [];
            const cookbooksList = u.cookbooks || [];
            const customChannelsList = Array.isArray(u.customChannels) ? u.customChannels : [];
            const followedChannelIds = Array.isArray(u.followedChannelIds)
              ? u.followedChannelIds.map((id) => sanitizeText(id)).filter(Boolean)
              : [];
            const channelNameById = new Map(
              [
                ...SEED_CHANNELS.map((ch) => ({ id: ch.id, name: ch.name })),
                ...customChannelsList.map((ch) => ({ id: sanitizeText(ch?.id || ""), name: sanitizeText(ch?.name || "") })),
              ]
                .filter((ch) => ch.id)
                .map((ch) => [ch.id, ch.name || ch.id])
            );
            const followedChannels = followedChannelIds.map((id) => ({ id, name: channelNameById.get(id) || id }));
            const customChannelsCounts = customChannelsList.reduce(
              (acc, ch) => {
                const status = (ch?.status || "approved");
                acc.total += 1;
                if (status === "pending") acc.pending += 1;
                else if (status === "rejected") acc.rejected += 1;
                else acc.approved += 1;
                return acc;
              },
              { total: 0, approved: 0, pending: 0, rejected: 0 }
            );
            return {
              id: u.id,
              email: u.email || "Guest",
              recipes: importedRecipes.length,
              cookbooks: cookbooksList.length,
              groceryItems: (u.groceryItems || []).length,
              createdAt: u.createdAt,
              updatedAt: u.updatedAt,
              hasProfile: Boolean(u.profile?.name),
              profileName: u.profile?.name || "",
              profilePhoto: u.profile?.photo || "",
              importedRecipes: importedRecipes.map(r => ({ title: r.title || "Naamloos recept" })),
              cookbookList: cookbooksList.map(c => ({ name: c.name || "Naamloos kookboek" })),
              customChannels: customChannelsList.map((ch) => ({
                id: ch?.id || "",
                name: ch?.name || "",
                url: ch?.url || "",
                status: ch?.status || "approved",
                createdAt: ch?.createdAt || "",
              })),
              followedChannelIds,
              followedChannels,
              customChannelsCounts,
            };
          });
          sessions = Object.values(parsed.sessions || {});
          console.log(`✅ Loaded ${users.length} users from file`);
        }

        const customChannelTotals = users.reduce(
          (acc, u) => {
            const c = u.customChannelsCounts || { total: 0, approved: 0, pending: 0, rejected: 0 };
            acc.total += c.total || 0;
            acc.approved += c.approved || 0;
            acc.pending += c.pending || 0;
            acc.rejected += c.rejected || 0;
            return acc;
          },
          { total: 0, approved: 0, pending: 0, rejected: 0 }
        );

        const stats = {
          totalUsers: users.length,
          totalSessions: sessions.length,
          users: users,
          customChannels: customChannelTotals,
        };

        console.log("✅ Returning stats:", stats.totalUsers, "users");
        sendJson(response, 200, { ok: true, stats });
      } catch (error) {
        console.error("❌ Error in /api/admin/stats:", error.message);
        sendJson(response, 500, {
          ok: false,
          error: error.message,
        });
      }
      return;
    }

    if (requestUrl.pathname === "/api/admin/diagnose" && request.method === "GET") {
      try {
        await requireAdmin(request);
        const projectDataFile = path.join(ROOT_DIR, "data", "plately-db.json");
        const currentDataFile = DATA_FILE;

        let projectDb = null, currentDb = null;
        try { projectDb = JSON.parse(await fsp.readFile(projectDataFile, "utf8")); } catch {}
        try { currentDb = JSON.parse(await fsp.readFile(currentDataFile, "utf8")); } catch {}

        const countUsers = (db) => db ? Object.keys(db.users || {}).length : null;
        const countUsersWithEmail = (db) => db
          ? Object.values(db.users || {}).filter(u => u.email).length : null;
        const countUsersWithRecipes = (db) => db
          ? Object.values(db.users || {}).filter(u => (u.importedRecipes || []).length > 0).length : null;

        let postgresUsers = null;
        if (isPostgresEnabled()) {
          try {
            await ensurePostgresSchema();
            const pool = await getPostgresPool();
            const r = await pool.query("SELECT id, email, app_state FROM plately_users");
            postgresUsers = r.rows.map(u => ({
              id: u.id,
              email: u.email,
              recipes: Array.isArray(u.app_state?.importedRecipes) ? u.app_state.importedRecipes.length : 0,
            }));
          } catch (e) { postgresUsers = { error: e.message }; }
        }

        sendJson(response, 200, {
          ok: true,
          postgresEnabled: isPostgresEnabled(),
          dataDir: DATA_DIR,
          dataFile: currentDataFile,
          projectDataFile,
          sameFile: currentDataFile === projectDataFile,
          currentDb: {
            exists: currentDb !== null,
            totalUsers: countUsers(currentDb),
            usersWithEmail: countUsersWithEmail(currentDb),
            usersWithRecipes: countUsersWithRecipes(currentDb),
          },
          projectDb: currentDataFile !== projectDataFile ? {
            exists: projectDb !== null,
            totalUsers: countUsers(projectDb),
            usersWithEmail: countUsersWithEmail(projectDb),
            usersWithRecipes: countUsersWithRecipes(projectDb),
            users: projectDb ? Object.values(projectDb.users || {})
              .filter(u => u.email)
              .map(u => ({ email: u.email, name: u.profile?.name || "", recipes: (u.importedRecipes || []).length }))
              : [],
          } : null,
          postgresUsers,
        });
      } catch (e) {
        sendJson(response, 500, { ok: false, error: e.message });
      }
      return;
    }

    if (requestUrl.pathname === "/api/admin/restore-users" && request.method === "POST") {
      try {
        await requireAdmin(request);

        // Determine the source JSON db — prefer project data dir if different from current
        const projectDataFile = path.join(ROOT_DIR, "data", "plately-db.json");
        const sourceFile = DATA_FILE !== projectDataFile && await fsp.access(projectDataFile).then(() => true).catch(() => false)
          ? projectDataFile
          : DATA_FILE;

        const raw = await fsp.readFile(sourceFile, "utf8").catch(() => null);
        if (!raw) { sendJson(response, 404, { ok: false, error: `Geen data gevonden in ${sourceFile}` }); return; }
        const sourceDb = JSON.parse(raw);
        const sourceUsers = Object.values(sourceDb.users || {}).filter(u => u.email && (u.importedRecipes || []).length > 0);

        if (!sourceUsers.length) { sendJson(response, 200, { ok: true, message: "Geen gebruikers met recepten gevonden om te herstellen.", sourceFile }); return; }

        const results = [];

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          for (const u of sourceUsers) {
            const email = sanitizeEmail(u.email);
            const appState = sanitizeUserStatePayload(u, u);
            try {
              const existing = await pool.query("SELECT id FROM plately_users WHERE email = $1 LIMIT 1", [email]);
              if (existing.rows[0]) {
                // Update existing user's app_state if they have fewer recipes
                const cur = await pool.query("SELECT app_state FROM plately_users WHERE id = $1", [existing.rows[0].id]);
                const curRecipes = Array.isArray(cur.rows[0]?.app_state?.importedRecipes) ? cur.rows[0].app_state.importedRecipes.length : 0;
                if (curRecipes < (appState.importedRecipes || []).length) {
                  await pool.query(
                    "UPDATE plately_users SET app_state = $2::jsonb, profile = $3::jsonb, updated_at = NOW() WHERE id = $1",
                    [existing.rows[0].id, JSON.stringify(appState), JSON.stringify(appState.profile)]
                  );
                  results.push({ email, action: "updated", recipes: appState.importedRecipes.length });
                } else {
                  results.push({ email, action: "skipped (already has data)", recipes: curRecipes });
                }
              } else {
                const userId = u.id || generateId("user");
                await pool.query(
                  "INSERT INTO plately_users (id, email, password_hash, password_salt, profile, app_state) VALUES ($1,$2,$3,$4,$5::jsonb,$6::jsonb) ON CONFLICT (email) DO NOTHING",
                  [userId, email, u.password_hash || null, u.password_salt || null, JSON.stringify(appState.profile), JSON.stringify(appState)]
                );
                results.push({ email, action: "inserted", recipes: (appState.importedRecipes || []).length });
              }
            } catch (e) {
              results.push({ email, action: "error", error: e.message });
            }
          }
        } else {
          // JSON db mode: copy to current DATA_FILE
          const destDb = currentDb || { users: {}, sessions: {}, authSessions: {} };
          let restored = 0;
          for (const u of sourceUsers) {
            const email = sanitizeEmail(u.email);
            const existing = Object.values(destDb.users || {}).find(x => String(x.email || "").toLowerCase() === email);
            if (!existing || !(existing.importedRecipes || []).length) {
              destDb.users[u.id] = u;
              restored++;
              results.push({ email, action: "restored", recipes: (u.importedRecipes || []).length });
            } else {
              results.push({ email, action: "skipped", recipes: (existing.importedRecipes || []).length });
            }
          }
          if (restored > 0) {
            await fsp.writeFile(DATA_FILE, JSON.stringify(destDb), "utf8");
          }
        }

        sendJson(response, 200, { ok: true, sourceFile, results });
      } catch (e) {
        sendJson(response, 500, { ok: false, error: e.message });
      }
      return;
    }

    if (requestUrl.pathname === "/api/admin/overview" && request.method === "GET") {
      console.log("🧾 /api/admin/overview called");
      try {
        await requireAdmin(request);
        const nowIso = new Date().toISOString();

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();

          const totalsRes = await pool.query(
            `
            SELECT
              COUNT(*)::int AS total_users,
              COALESCE(SUM(COALESCE(jsonb_array_length(app_state->'importedRecipes'), 0)), 0)::int AS total_recipes,
              COALESCE(SUM(COALESCE(jsonb_array_length(app_state->'cookbooks'), 0)), 0)::int AS total_cookbooks,
              COALESCE(SUM(COALESCE(jsonb_array_length(app_state->'customChannels'), 0)), 0)::int AS total_custom_channels
            FROM plately_users
            `
          );

          const activeRes = await pool.query(
            `
            SELECT
              COUNT(*)::int AS active_users_7d,
              COALESCE(SUM(COALESCE(jsonb_array_length(app_state->'importedRecipes'), 0)), 0)::int AS active_recipes_7d,
              COALESCE(SUM(COALESCE(jsonb_array_length(app_state->'cookbooks'), 0)), 0)::int AS active_cookbooks_7d
            FROM plately_users
            WHERE updated_at >= NOW() - INTERVAL '7 days'
            `
          );

          const customBreakdownRes = await pool.query(
            `
            SELECT
              COALESCE(SUM(CASE WHEN COALESCE(ch->>'status','approved') = 'approved' THEN 1 ELSE 0 END), 0)::int AS approved,
              COALESCE(SUM(CASE WHEN COALESCE(ch->>'status','approved') = 'pending' THEN 1 ELSE 0 END), 0)::int AS pending,
              COALESCE(SUM(CASE WHEN COALESCE(ch->>'status','approved') = 'rejected' THEN 1 ELSE 0 END), 0)::int AS rejected,
              COALESCE(COUNT(*), 0)::int AS total
            FROM plately_users u
            CROSS JOIN LATERAL jsonb_array_elements(COALESCE(u.app_state->'customChannels','[]'::jsonb)) ch
            `
          );

          const topUsersByRecipesRes = await pool.query(
            `
            SELECT
              id,
              email,
              COALESCE(jsonb_array_length(app_state->'importedRecipes'), 0)::int AS recipes
            FROM plately_users
            ORDER BY recipes DESC, updated_at DESC
            LIMIT 10
            `
          );

          const topUsersByCookbooksRes = await pool.query(
            `
            SELECT
              id,
              email,
              COALESCE(jsonb_array_length(app_state->'cookbooks'), 0)::int AS cookbooks
            FROM plately_users
            ORDER BY cookbooks DESC, updated_at DESC
            LIMIT 10
            `
          );

          const topChannelsByImportsRes = await pool.query(
            `
            SELECT
              COALESCE(meta->>'channelId','') AS channel_id,
              COUNT(*)::int AS count
            FROM plately_events
            WHERE type = 'import'
              AND created_at >= NOW() - INTERVAL '30 days'
              AND COALESCE(meta->>'channelId','') <> ''
            GROUP BY 1
            ORDER BY 2 DESC
            LIMIT 10
            `
          );

          const totals = totalsRes.rows[0] || {};
          const active = activeRes.rows[0] || {};
          const channels = customBreakdownRes.rows[0] || { total: 0, approved: 0, pending: 0, rejected: 0 };

          const activeUsers7d = active.active_users_7d || 0;
          const avgRecipesPerActiveUser7d = activeUsers7d ? (active.active_recipes_7d || 0) / activeUsers7d : 0;
          const avgCookbooksPerActiveUser7d = activeUsers7d ? (active.active_cookbooks_7d || 0) / activeUsers7d : 0;

          return sendJson(response, 200, {
            ok: true,
            overview: {
              generatedAt: nowIso,
              totals: {
                users: totals.total_users || 0,
                recipes: totals.total_recipes || 0,
                cookbooks: totals.total_cookbooks || 0,
                customChannels: channels,
              },
              active7d: {
                users: activeUsers7d,
                avgRecipesPerActiveUser: avgRecipesPerActiveUser7d,
                avgCookbooksPerActiveUser: avgCookbooksPerActiveUser7d,
              },
              top: {
                usersByRecipes: topUsersByRecipesRes.rows.map((r) => ({
                  id: r.id,
                  email: r.email,
                  recipes: r.recipes || 0,
                })),
                usersByCookbooks: topUsersByCookbooksRes.rows.map((r) => ({
                  id: r.id,
                  email: r.email,
                  cookbooks: r.cookbooks || 0,
                })),
                channelsByImports30d: topChannelsByImportsRes.rows.map((r) => ({
                  channelId: r.channel_id,
                  count: r.count || 0,
                })),
              },
            },
          });
        }

        // JSON-file mode (dev/local without Postgres)
        const rawFile = await fsp.readFile(DATA_FILE, "utf8");
        const parsed = JSON.parse(rawFile);
        const users = Object.values(parsed.users || {});

        const totals = users.reduce(
          (acc, u) => {
            acc.users += 1;
            acc.recipes += (u.importedRecipes || []).length;
            acc.cookbooks += (u.cookbooks || []).length;
            const list = Array.isArray(u.customChannels) ? u.customChannels : [];
            for (const ch of list) {
              const status = (ch?.status || "approved");
              acc.customChannels.total += 1;
              if (status === "pending") acc.customChannels.pending += 1;
              else if (status === "rejected") acc.customChannels.rejected += 1;
              else acc.customChannels.approved += 1;
            }
            return acc;
          },
          { users: 0, recipes: 0, cookbooks: 0, customChannels: { total: 0, approved: 0, pending: 0, rejected: 0 } }
        );

        const activeUsers = users.filter((u) => {
          const updated = new Date(u.updatedAt || "").getTime();
          return Number.isFinite(updated) && (Date.now() - updated) < 604800000;
        });

        const activeTotals = activeUsers.reduce(
          (acc, u) => {
            acc.recipes += (u.importedRecipes || []).length;
            acc.cookbooks += (u.cookbooks || []).length;
            return acc;
          },
          { recipes: 0, cookbooks: 0 }
        );

        const topUsersByRecipes = users
          .map((u) => ({ id: u.id, email: u.email || "Guest", recipes: (u.importedRecipes || []).length, updatedAt: u.updatedAt || "" }))
          .sort((a, b) => (b.recipes - a.recipes) || String(b.updatedAt).localeCompare(String(a.updatedAt)))
          .slice(0, 10);

        const topUsersByCookbooks = users
          .map((u) => ({ id: u.id, email: u.email || "Guest", cookbooks: (u.cookbooks || []).length, updatedAt: u.updatedAt || "" }))
          .sort((a, b) => (b.cookbooks - a.cookbooks) || String(b.updatedAt).localeCompare(String(a.updatedAt)))
          .slice(0, 10);

        // No reliable events table in JSON mode; expose an empty list
        const activeUsers7d = activeUsers.length;
        const avgRecipesPerActiveUser7d = activeUsers7d ? activeTotals.recipes / activeUsers7d : 0;
        const avgCookbooksPerActiveUser7d = activeUsers7d ? activeTotals.cookbooks / activeUsers7d : 0;

        return sendJson(response, 200, {
          ok: true,
          overview: {
            generatedAt: nowIso,
            totals,
            active7d: {
              users: activeUsers7d,
              avgRecipesPerActiveUser: avgRecipesPerActiveUser7d,
              avgCookbooksPerActiveUser: avgCookbooksPerActiveUser7d,
            },
            top: {
              usersByRecipes: topUsersByRecipes,
              usersByCookbooks: topUsersByCookbooks,
              channelsByImports30d: [],
            },
          },
        });
      } catch (error) {
        console.error("❌ Error in /api/admin/overview:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/search-terms" && request.method === "GET") {
      console.log("🔎 /api/admin/search-terms called");
      try {
        await requireAdmin(request);
        const limitRaw = Number.parseInt(String(requestUrl.searchParams.get("limit") || ""), 10);
        const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 50) : 20;

        if (!isPostgresEnabled()) {
          return sendJson(response, 200, { ok: true, searchTerms: { last7d: [], allTime: [] } });
        }

        await ensurePostgresSchema();
        const pool = await getPostgresPool();

        const last7dRes = await pool.query(
          `
          SELECT
            COALESCE(meta->>'query','') AS query,
            COUNT(*)::int AS count,
            MAX(created_at) AS last_seen_at
          FROM plately_events
          WHERE type = 'channel_search'
            AND created_at >= NOW() - INTERVAL '7 days'
          GROUP BY 1
          HAVING COALESCE(meta->>'query','') <> ''
          ORDER BY 2 DESC, 3 DESC
          LIMIT $1
          `,
          [limit]
        );

        const allTimeRes = await pool.query(
          `
          SELECT
            COALESCE(meta->>'query','') AS query,
            COUNT(*)::int AS count,
            MAX(created_at) AS last_seen_at
          FROM plately_events
          WHERE type = 'channel_search'
          GROUP BY 1
          HAVING COALESCE(meta->>'query','') <> ''
          ORDER BY 2 DESC, 3 DESC
          LIMIT $1
          `,
          [limit]
        );

        return sendJson(response, 200, {
          ok: true,
          searchTerms: {
            last7d: last7dRes.rows.map((r) => ({ query: r.query, count: r.count || 0, lastSeenAt: r.last_seen_at })),
            allTime: allTimeRes.rows.map((r) => ({ query: r.query, count: r.count || 0, lastSeenAt: r.last_seen_at })),
          },
        });
      } catch (error) {
        console.error("❌ Error in /api/admin/search-terms:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/seo-recipe-keyword-suggestions" && request.method === "GET") {
      try {
        await requireAdmin(request);
        return sendJson(response, 200, { ok: true, suggestions: SEO_RECIPE_BACKFILL_KEYWORDS });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        return sendJson(response, statusCode, {
          ok: false,
          error: error.message || "Kon zoeksuggesties niet laden.",
        });
      }
    }

    if (requestUrl.pathname === "/api/admin/seo-recipe-import-one" && request.method === "POST") {
      console.log("🍽️ /api/admin/seo-recipe-import-one called");
      try {
        const adminUser = await requireAdmin(request);
        const body = await readRequestBody(request);
        const rawInput = sanitizeText(body?.url || "");
        const urlMatch = rawInput.match(/https?:\/\/[^\s]+/);
        const cleanUrl = urlMatch ? urlMatch[0] : rawInput;
        if (!cleanUrl || !/^https?:\/\//i.test(cleanUrl)) {
          throw new HttpError(400, "Geldige recept-URL ontbreekt.");
        }

        const channelId = sanitizeText(body?.channelId || inferSeedChannelIdFromSourceUrl(cleanUrl) || "");
        const candidate = {
          title: sanitizeText(body?.title || ""),
          url: cleanUrl,
          thumbnail: sanitizeText(body?.thumbnail || body?.image || ""),
          channelId,
          channel: sanitizeText(body?.channel || (channelId ? getSeedChannelName(channelId) : "") || ""),
        };
        const recipe = await importSeoBackfillCandidate(candidate);
        const saved = await saveSeoBackfillRecipesForUser(adminUser.id, [recipe], {
          forceReimport: Boolean(body?.forceReimport),
        });

        const sourceKey = normalizeRecipeSourceKey(recipe.sourceUrl || cleanUrl);
        const entries = await listPublicSeoRecipes(getPublicOrigin(request)).catch(() => []);
        const publicEntry = entries.find((entry) => {
          if (sanitizeText(entry?.userId || "") !== sanitizeText(adminUser.id || "")) return false;
          const entrySourceKey = normalizeRecipeSourceKey(entry?.recipe?.sourceUrl || "");
          return sourceKey && entrySourceKey === sourceKey;
        }) || null;

        return sendJson(response, 200, {
          ok: true,
          recipe: {
            id: sanitizeText(recipe.id || ""),
            title: sanitizeText(recipe.title || ""),
            sourceUrl: sanitizeText(recipe.sourceUrl || cleanUrl),
            image: sanitizeText(recipe.image || ""),
            ratingValue: recipe.ratingValue || null,
            ratingCount: recipe.ratingCount || null,
          },
          saved: {
            added: saved.added || 0,
            updated: saved.updated || 0,
            skipped: saved.skipped || 0,
            totalPublicRecipes: Array.isArray(saved.importedRecipes) ? saved.importedRecipes.length : 0,
          },
          publicPath: publicEntry?.urlPath || "",
        });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/seo-recipe-import-one:", error.message);
        return sendJson(response, statusCode, {
          ok: false,
          error: error.message || "SEO-recept importeren mislukt.",
        });
      }
    }

    if (requestUrl.pathname === "/api/admin/seo-recipe-backfill/status" && request.method === "GET") {
      try {
        await requireAdmin(request);
        pruneSeoBackfillJobs();
        const jobId = sanitizeText(requestUrl.searchParams.get("jobId") || "");
        if (!jobId) throw new HttpError(400, "jobId ontbreekt.");
        const job = seoBackfillJobStore.get(jobId);
        if (!job) throw new HttpError(404, "Job niet gevonden of verlopen.");
        return sendJson(response, 200, {
          ok: true,
          jobId,
          status: job.status,
          progress: job.progress || null,
          result: job.result,
          error: job.error || null,
        });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        return sendJson(response, statusCode, {
          ok: false,
          error: error.message || "Status niet beschikbaar.",
        });
      }
    }

    if (requestUrl.pathname === "/api/admin/seo-recipe-backfill" && request.method === "POST") {
      console.log("🍽️ /api/admin/seo-recipe-backfill called");
      try {
        const adminUser = await requireAdmin(request);
        const body = await readRequestBody(request);
        const wantProgress = Boolean(body?.progress);
        const { progress: _progressIgnored, ...runBody } = body || {};

        if (wantProgress) {
          pruneSeoBackfillJobs();
          const jobId = crypto.randomBytes(12).toString("hex");
          seoBackfillJobStore.set(jobId, {
            status: "running",
            createdAt: Date.now(),
            progress: { phase: "start", message: "Gestart…", at: Date.now() },
            result: null,
            error: null,
          });
          void (async () => {
            try {
              const result = await runSeoRecipeBackfillForUser(adminUser, {
                ...runBody,
                onProgress: (patch) => {
                  const job = seoBackfillJobStore.get(jobId);
                  if (job?.status === "running") {
                    job.progress = { ...(job.progress || {}), ...patch, at: Date.now() };
                  }
                },
              });
              const job = seoBackfillJobStore.get(jobId);
              if (job) {
                job.status = "done";
                job.result = result;
                job.progress = { ...(job.progress || {}), phase: "done", message: "Klaar", at: Date.now() };
              }
            } catch (error) {
              const job = seoBackfillJobStore.get(jobId);
              if (job) {
                job.status = "error";
                job.error = error.message || "SEO recepten aanvullen mislukt.";
                job.progress = {
                  ...(job.progress || {}),
                  phase: "error",
                  message: job.error,
                  at: Date.now(),
                };
              }
            }
          })();
          return sendJson(response, 202, {
            ok: true,
            jobId,
            status: "running",
            message: "Job gestart. Haal voortgang op met GET /api/admin/seo-recipe-backfill/status?jobId=…",
          });
        }

        const result = await runSeoRecipeBackfillForUser(adminUser, body || {});
        return sendJson(response, 200, result);
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/seo-recipe-backfill:", error.message);
        return sendJson(response, statusCode, {
          ok: false,
          error: error.message || "SEO recepten aanvullen mislukt.",
        });
      }
    }

    if (requestUrl.pathname === "/api/admin/seo-recipe-ratings-backfill" && request.method === "POST") {
      console.log("⭐️ /api/admin/seo-recipe-ratings-backfill called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);
        const dryRun = body?.dryRun !== false;
        const maxUsers = Number.isFinite(Number(body?.maxUsers)) ? Math.max(1, Math.min(Number(body.maxUsers), 2000)) : 250;
        const maxRecipes = Number.isFinite(Number(body?.maxRecipes)) ? Math.max(1, Math.min(Number(body.maxRecipes), 8000)) : 1200;
        const concurrency = Number.isFinite(Number(body?.concurrency)) ? Math.max(1, Math.min(Number(body.concurrency), 10)) : 6;
        const timeoutMs = Number.isFinite(Number(body?.timeoutMs)) ? Math.max(1500, Math.min(Number(body.timeoutMs), 20000)) : 6500;
        const result = await backfillImportedRecipeRatingsForAllUsers({ dryRun, maxUsers, maxRecipes, concurrency, timeoutMs });
        return sendJson(response, 200, result);
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/seo-recipe-ratings-backfill:", error.message);
        return sendJson(response, statusCode, {
          ok: false,
          error: error.message || "SEO ratings aanvullen mislukt.",
        });
      }
    }

    if (requestUrl.pathname === "/api/admin/dedupe-imported-recipes" && request.method === "POST") {
      console.log("🧹 /api/admin/dedupe-imported-recipes called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);
        const dryRun = body?.dryRun !== false;
        let usersScanned = 0;
        let usersChanged = 0;
        let removedRecipes = 0;
        const sampleGroups = [];

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const res = await pool.query(`SELECT * FROM plately_users`);
          for (const row of res.rows || []) {
            usersScanned += 1;
            const result = dedupeImportedRecipesBySourceUrlForUser(row);
            if (!result.changed) continue;
            usersChanged += 1;
            removedRecipes += result.removed;
            sampleGroups.push(...result.duplicateGroups.slice(0, Math.max(0, 20 - sampleGroups.length)));
            if (!dryRun) await updateAuthenticatedUserState(row.id, result.nextState);
          }
        } else {
          const db = await loadDatabase();
          for (const user of Object.values(db.users || {})) {
            usersScanned += 1;
            const result = dedupeImportedRecipesBySourceUrlForUser(user);
            if (!result.changed) continue;
            usersChanged += 1;
            removedRecipes += result.removed;
            sampleGroups.push(...result.duplicateGroups.slice(0, Math.max(0, 20 - sampleGroups.length)));
            if (!dryRun) db.users[user.id] = sanitizeUserStatePayload(result.nextState, user);
          }
          if (!dryRun && usersChanged) await persistDatabase();
        }

        return sendJson(response, 200, {
          ok: true,
          dryRun,
          usersScanned,
          usersChanged,
          removedRecipes,
          sampleGroups,
        });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/dedupe-imported-recipes:", error.message);
        return sendJson(response, statusCode, { ok: false, error: error.message || "Ontdubbelen mislukt." });
      }
    }

    if (requestUrl.pathname === "/api/admin/import-quality" && request.method === "GET") {
      try {
        await requireAdmin(request);
        let users = [];
        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const res = await pool.query(`SELECT * FROM plately_users`);
          users = res.rows || [];
        } else {
          const db = await loadDatabase();
          users = Object.values(db.users || {});
        }
        const report = collectImportQualityForUsers(users);
        return sendJson(response, 200, { ok: true, usersScanned: users.length, ...report });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/import-quality:", error.message);
        return sendJson(response, statusCode, { ok: false, error: error.message || "Importkwaliteit laden mislukt." });
      }
    }

    if (requestUrl.pathname === "/api/admin/seo-recipes-cleanup" && request.method === "POST") {
      console.log("🧽 /api/admin/seo-recipes-cleanup called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);
        const dryRun = body?.dryRun !== false;
        let usersScanned = 0;
        let usersChanged = 0;
        let removedRecipes = 0;
        let keptIssueCount = 0;
        const sampleRemoved = [];

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const res = await pool.query(`SELECT * FROM plately_users`);
          for (const row of res.rows || []) {
            usersScanned += 1;
            const result = cleanSeoRecipesForUser(row);
            keptIssueCount += result.keptIssueCount || 0;
            if (!result.changed) continue;
            usersChanged += 1;
            removedRecipes += result.removed.length;
            sampleRemoved.push(...result.removed.slice(0, Math.max(0, 30 - sampleRemoved.length)));
            if (!dryRun) await updateAuthenticatedUserState(row.id, result.nextState);
          }
        } else {
          const db = await loadDatabase();
          for (const user of Object.values(db.users || {})) {
            usersScanned += 1;
            const result = cleanSeoRecipesForUser(user);
            keptIssueCount += result.keptIssueCount || 0;
            if (!result.changed) continue;
            usersChanged += 1;
            removedRecipes += result.removed.length;
            sampleRemoved.push(...result.removed.slice(0, Math.max(0, 30 - sampleRemoved.length)));
            if (!dryRun) db.users[user.id] = sanitizeUserStatePayload(result.nextState, user);
          }
          if (!dryRun && usersChanged) await persistDatabase();
        }

        return sendJson(response, 200, {
          ok: true,
          dryRun,
          usersScanned,
          usersChanged,
          removedRecipes,
          keptIssueCount,
          sampleRemoved,
        });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/seo-recipes-cleanup:", error.message);
        return sendJson(response, statusCode, { ok: false, error: error.message || "SEO recepten opschonen mislukt." });
      }
    }

    if (requestUrl.pathname === "/api/admin/seo-recipes-repair" && request.method === "POST") {
      console.log("🛠️ /api/admin/seo-recipes-repair called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);
        const dryRun = body?.dryRun !== false;
        const maxRecipes = Math.max(1, Math.min(Number(body?.maxRecipes) || 20, 100));
        const mode = ["image", "rating", "reimport"].includes(sanitizeText(body?.mode || "")) ? sanitizeText(body.mode) : "reimport";
        const lowestFirst = Boolean(body?.lowestFirst);
        const maxScore = Number.isFinite(Number(body?.maxScore)) ? Math.max(0, Math.min(Number(body.maxScore), 100)) : null;
        let usersScanned = 0;
        let usersChanged = 0;
        let repairedRecipes = 0;
        const sampleRepaired = [];
        const sampleFailed = [];

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const res = await pool.query(`SELECT * FROM plately_users`);
          for (const row of res.rows || []) {
            usersScanned += 1;
            const result = await repairSeoRecipesForUser(row, { maxRecipes, mode, lowestFirst, maxScore });
            sampleFailed.push(...result.failed.slice(0, Math.max(0, 30 - sampleFailed.length)));
            if (!result.changed) continue;
            usersChanged += 1;
            repairedRecipes += result.repaired.length;
            sampleRepaired.push(...result.repaired.slice(0, Math.max(0, 30 - sampleRepaired.length)));
            if (!dryRun) await updateAuthenticatedUserState(row.id, result.nextState);
          }
        } else {
          const db = await loadDatabase();
          for (const user of Object.values(db.users || {})) {
            usersScanned += 1;
            const result = await repairSeoRecipesForUser(user, { maxRecipes, mode, lowestFirst, maxScore });
            sampleFailed.push(...result.failed.slice(0, Math.max(0, 30 - sampleFailed.length)));
            if (!result.changed) continue;
            usersChanged += 1;
            repairedRecipes += result.repaired.length;
            sampleRepaired.push(...result.repaired.slice(0, Math.max(0, 30 - sampleRepaired.length)));
            if (!dryRun) db.users[user.id] = sanitizeUserStatePayload(result.nextState, user);
          }
          if (!dryRun && usersChanged) await persistDatabase();
        }

        return sendJson(response, 200, {
          ok: true,
          dryRun,
          mode,
          lowestFirst,
          maxScore,
          usersScanned,
          usersChanged,
          repairedRecipes,
          sampleRepaired,
          sampleFailed,
        });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/seo-recipes-repair:", error.message);
        return sendJson(response, statusCode, { ok: false, error: error.message || "SEO recepten repareren mislukt." });
      }
    }

    // Endpoint to update the AH anonymous token from an external cron (Mac/CI).
    // Protected by AH_TOKEN_REFRESH_SECRET env var (shared secret in X-Plately-Key header).
    if (requestUrl.pathname === "/api/admin/ah-token-status" && request.method === "GET") {
      await requireAdmin(request);
      const hasToken = Boolean(ahTokenCache.token);
      const expiresAt = ahTokenCache.expiresAt || 0;
      const staticToken = String(process.env.AH_ANONYMOUS_TOKEN || "").trim();
      sendJson(response, 200, {
        ok: true,
        hasToken,
        source: staticToken ? "env" : "dynamic",
        tokenPreview: hasToken ? ahTokenCache.token.slice(0, 12) + "…" : null,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        expiresInMs: expiresAt ? Math.max(0, expiresAt - Date.now()) : 0,
        proxyUrl: String(process.env.AH_API_PROXY || ""),
        proxyEnabled: Boolean(process.env.AH_API_PROXY),
      });
      return;
    }

    if (requestUrl.pathname === "/api/admin/ah-token-refresh" && request.method === "POST") {
      const expectedKey = String(process.env.AH_TOKEN_REFRESH_SECRET || "").trim();
      const providedKey = String(request.headers["x-plately-key"] || "").trim();
      if (!expectedKey || !providedKey || providedKey !== expectedKey) {
        sendJson(response, 403, { ok: false, error: "Ongeldige sleutel." });
        return;
      }
      const body = await readRequestBody(request);
      const token = sanitizeText(body.token || "");
      if (!token || token.length < 10) {
        sendJson(response, 400, { ok: false, error: "Geen geldig token opgegeven." });
        return;
      }
      // Update in-memory cache (expires_in from AH is ~604800s = 7 days)
      ahTokenCache = { token, expiresAt: Date.now() + 6 * 24 * 60 * 60 * 1000 };
      console.log(`[AH] Token bijgewerkt via /api/admin/ah-token-refresh (eerste 12 chars: ${token.slice(0, 12)}…)`);
      sendJson(response, 200, { ok: true, message: "AH token bijgewerkt." });
      return;
    }

    if (requestUrl.pathname === "/api/admin/send-welcome" && request.method === "POST") {
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);
        const to = sanitizeText(body.email || "");
        const name = sanitizeText(body.name || "");
        if (!to) { sendJson(response, 400, { ok: false, error: "Geen e-mailadres opgegeven." }); return; }
        await sendEmail({
          to,
          subject: "Welkom bij Plately! 🎉",
          html: buildWelcomeEmailHtml({ name }),
        });
        sendJson(response, 200, { ok: true, message: `Welkomstmail verstuurd naar ${to}.` });
      } catch (err) {
        sendJson(response, err.status || 500, { ok: false, error: err.message });
      }
      return;
    }

    if (requestUrl.pathname === "/api/admin/import-errors" && request.method === "GET") {
      try {
        await requireAdmin(request);
        if (!isPostgresEnabled()) {
          return sendJson(response, 200, { ok: true, rows: [], recent: importErrors, postgresEnabled: false });
        }
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const days = Math.max(1, Math.min(Number(requestUrl.searchParams.get("days") || 14), 90));
        const host = sanitizeText(requestUrl.searchParams.get("host") || "").replace(/^www\./i, "").toLowerCase();
        const hostClause = host ? ` AND COALESCE(NULLIF(meta->>'sourceHost',''), 'unknown') = $2` : "";
        const params = host ? [days, host] : [days];
        const rowsRes = await pool.query(
          `
            SELECT
              COALESCE(NULLIF(meta->>'sourceHost',''), 'unknown') AS source_host,
              COUNT(*)::int AS failures,
              MAX(created_at) AS last_at,
              (ARRAY_AGG(meta->>'error' ORDER BY created_at DESC))[1] AS last_error,
              (ARRAY_AGG(meta->>'traceId' ORDER BY created_at DESC))[1] AS last_trace_id,
              (ARRAY_AGG(meta->>'httpStatus' ORDER BY created_at DESC))[1] AS last_http_status
            FROM plately_events
            WHERE type = 'import_failed'
              AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
              ${hostClause}
            GROUP BY 1
            ORDER BY failures DESC, last_at DESC
            LIMIT 40
          `,
          params
        );
        const recentRes = await pool.query(
          `
            SELECT created_at, user_id, meta
            FROM plately_events
            WHERE type = 'import_failed'
              AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
              ${hostClause}
            ORDER BY created_at DESC
            LIMIT 20
          `,
          params
        );
        return sendJson(response, 200, {
          ok: true,
          days,
          host,
          rows: rowsRes.rows || [],
          recent: (recentRes.rows || []).map((r) => ({ createdAt: r.created_at, userId: r.user_id || "", meta: r.meta || {} })),
          postgresEnabled: true,
        });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/import-errors:", error.message);
        return sendJson(response, statusCode, { ok: false, error: error.message || "Importfouten laden mislukt." });
      }
    }

    if (requestUrl.pathname === "/api/admin/ah-basket-check" && request.method === "POST") {
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);
        const preset = sanitizeText(body?.preset || "");
        const presets = {
          basis: [
            { title: "tomaten", amount: "4 stuks" },
            { title: "pasta", amount: "500 g" },
            { title: "melk", amount: "2 l" },
          ],
          pasta: [
            { title: "spaghetti", amount: "500 g" },
            { title: "tomatenblokjes", amount: "800 g" },
            { title: "parmezaanse kaas", amount: "75 g" },
            { title: "kipfilet", amount: "400 g" },
          ],
          nasi: [
            { title: "rijst", amount: "400 g" },
            { title: "nasi groente", amount: "400 g" },
            { title: "ketjap manis", amount: "100 ml" },
            { title: "eieren", amount: "4 stuks" },
          ],
          stamppot: [
            { title: "aardappelen", amount: "1.2 kg" },
            { title: "boerenkool", amount: "500 g" },
            { title: "rookworst", amount: "1 stuk" },
            { title: "melk", amount: "250 ml" },
          ],
          bakken: [
            { title: "bloem", amount: "500 g" },
            { title: "suiker", amount: "250 g" },
            { title: "boter", amount: "250 g" },
            { title: "eieren", amount: "4 stuks" },
          ],
        };
        const items = Array.isArray(body?.items) && body.items.length
          ? body.items.slice(0, 12)
          : (presets[preset] || presets.basis);
        const basket = await buildStoreBasket({ store: "albert-heijn", items });
        return sendJson(response, 200, { ok: true, preset: presets[preset] ? preset : "basis", items, basket, handoffUrl: basket.directUrl || "" });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/ah-basket-check:", error.message);
        return sendJson(response, statusCode, { ok: false, error: error.message || "AH mandje check mislukt." });
      }
    }

    if (requestUrl.pathname === "/api/admin/imports-by-channel" && request.method === "GET") {
      try {
        const adminUser = await requireAdmin(request);
        const userId = sanitizeText(requestUrl.searchParams.get("userId") || adminUser.id || "");
        const groupByRaw = sanitizeText(requestUrl.searchParams.get("groupBy") || "channel");
        const groupBy = groupByRaw === "source" ? "source" : "channel";
        if (!userId) throw new HttpError(400, "userId ontbreekt.");

        let currentUser = null;
        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const res = await pool.query(`SELECT * FROM plately_users WHERE id = $1 LIMIT 1`, [userId]);
          currentUser = res.rows[0] || null;
        } else {
          const db = await loadDatabase();
          currentUser = db.users?.[userId] || null;
        }
        if (!currentUser) throw new HttpError(404, "Gebruiker niet gevonden.");

        const appState = buildAppStateFromUser(currentUser);
        const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [];
        const cookbooks = Array.isArray(appState.cookbooks) ? appState.cookbooks : [];
        const seoCb = cookbooks.find((c) => sanitizeText(c?.name || "") === "SEO recepten");
        const seoIds = new Set(Array.isArray(seoCb?.recipeIds) ? seoCb.recipeIds.map((id) => sanitizeText(id)).filter(Boolean) : []);

        const rowsById = new Map();
        const bump = (idRaw, label, { seo = false, channelId = "" } = {}) => {
          const id = sanitizeText(idRaw || "") || "unknown";
          const row = rowsById.get(id) || { id, label: label || id, channelId: sanitizeText(channelId || ""), total: 0, seoCookbook: 0 };
          row.total += 1;
          if (seo) row.seoCookbook += 1;
          rowsById.set(id, row);
        };

        for (const r of recipes) {
          const sourceUrl = sanitizeText(r?.sourceUrl || r?.source || "");
          const channelId = inferSeedChannelIdFromSourceUrl(sourceUrl) || sanitizeText(r?.channelId || "");
          const isSeo = seoIds.has(sanitizeText(r?.id || ""));
          if (groupBy === "source") {
            let host = "";
            try {
              host = sourceUrl ? new URL(sourceUrl).hostname.replace(/^www\./i, "").toLowerCase() : "";
            } catch {
              host = "";
            }
            bump(host || "unknown", host ? host : "Onbekend", { seo: isSeo, channelId });
          } else {
            const label = channelId ? getSeedChannelName(channelId) : "Onbekend";
            const id = channelId || "unknown";
            bump(id, label, { seo: isSeo, channelId });
          }
        }

        const rows = Array.from(rowsById.values()).sort((a, b) => (b.seoCookbook - a.seoCookbook) || (b.total - a.total));
        return sendJson(response, 200, { ok: true, userId: sanitizeText(userId), groupBy, rows });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        return sendJson(response, statusCode, { ok: false, error: error.message || "Kon imports per kanaal niet laden." });
      }
    }

    if (requestUrl.pathname === "/api/admin/delete-imports-by-channel" && request.method === "POST") {
      console.log("🧹 /api/admin/delete-imports-by-channel called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);
        const channelId = sanitizeText(body?.channelId || "");
        const channelUrl = sanitizeText(body?.channelUrl || "");
        let host = sanitizeText(body?.host || "");
        if (!host && channelUrl) {
          try {
            host = new URL(channelUrl).hostname.replace(/^www\./i, "").toLowerCase();
          } catch {
            host = "";
          }
        }
        host = host.replace(/^www\./i, "").toLowerCase();
        if (!channelId && !host) throw new HttpError(400, "channelId of host ontbreekt.");
        const dryRun = body?.dryRun !== false;

        const sourceMatches = (recipe) => {
          const sourceUrl = sanitizeText(recipe?.sourceUrl || recipe?.source || "");
          const inferred = inferSeedChannelIdFromSourceUrl(sourceUrl);
          if (channelId && inferred && inferred === channelId) return true;
          if (!host) return false;
          try {
            const sourceHost = new URL(sourceUrl).hostname.replace(/^www\./i, "").toLowerCase();
            return sourceHost === host || sourceHost.endsWith(`.${host}`);
          } catch {
            return false;
          }
        };

        const cleanState = (user) => {
          const appState = buildAppStateFromUser(user);
          const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [];
          const removedIds = new Set();
          const keptRecipes = [];
          for (const recipe of recipes) {
            if (sourceMatches(recipe)) {
              removedIds.add(sanitizeText(recipe?.id || ""));
            } else {
              keptRecipes.push(recipe);
            }
          }
          if (!removedIds.size) return { changed: false, removed: 0, nextState: appState };
          const nextCookbooks = (Array.isArray(appState.cookbooks) ? appState.cookbooks : []).map((cookbook) => ({
            ...cookbook,
            recipeIds: (Array.isArray(cookbook.recipeIds) ? cookbook.recipeIds : []).filter((id) => !removedIds.has(sanitizeText(id || ""))),
          }));
          const nextState = {
            ...appState,
            importedRecipes: keptRecipes,
            cookbooks: nextCookbooks,
            selectedRecipeId: removedIds.has(sanitizeText(appState.selectedRecipeId || "")) ? (keptRecipes[0]?.id || "") : appState.selectedRecipeId,
            featuredRecipeId: removedIds.has(sanitizeText(appState.featuredRecipeId || "")) ? (keptRecipes[0]?.id || "") : appState.featuredRecipeId,
          };
          return { changed: true, removed: removedIds.size, nextState };
        };

        let usersScanned = 0;
        let usersChanged = 0;
        let removedRecipes = 0;
        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const res = await pool.query(`SELECT * FROM plately_users`);
          for (const row of res.rows || []) {
            usersScanned += 1;
            const { changed, removed, nextState } = cleanState(row);
            if (!changed) continue;
            usersChanged += 1;
            removedRecipes += removed;
            if (!dryRun) await updateAuthenticatedUserState(row.id, nextState);
          }
        } else {
          const db = await loadDatabase();
          for (const user of Object.values(db.users || {})) {
            usersScanned += 1;
            const { changed, removed, nextState } = cleanState(user);
            if (!changed) continue;
            usersChanged += 1;
            removedRecipes += removed;
            if (!dryRun) db.users[user.id] = sanitizeUserStatePayload(nextState, user);
          }
          if (!dryRun && usersChanged) await persistDatabase();
        }
        return sendJson(response, 200, {
          ok: true,
          dryRun,
          channelId,
          host,
          usersScanned,
          usersChanged,
          removedRecipes,
        });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        console.error("❌ Error in /api/admin/delete-imports-by-channel:", error.message);
        return sendJson(response, statusCode, { ok: false, error: error.message || "Imports verwijderen mislukt." });
      }
    }

    if (requestUrl.pathname === "/api/admin/imports-by-channel" && request.method === "DELETE") {
      try {
        const adminUser = await requireAdmin(request);
        const body = await readRequestBody(request);
        const userId = sanitizeText(body.userId || adminUser.id || "");
        const groupBy = sanitizeText(body.groupBy || "channel") === "source" ? "source" : "channel";
        const id = sanitizeText(body.id || "");
        if (!userId) throw new HttpError(400, "userId ontbreekt.");
        if (!id) throw new HttpError(400, "Kanaal/source ontbreekt.");

        let currentUser = null;
        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const res = await pool.query(`SELECT * FROM plately_users WHERE id = $1 LIMIT 1`, [userId]);
          currentUser = res.rows[0] || null;
        } else {
          const db = await loadDatabase();
          currentUser = db.users?.[userId] || null;
        }
        if (!currentUser) throw new HttpError(404, "Gebruiker niet gevonden.");

        const appState = buildAppStateFromUser(currentUser);
        const recipes = Array.isArray(appState.importedRecipes) ? appState.importedRecipes : [];
        const removedIds = new Set();
        const keptRecipes = recipes.filter((r) => {
          const sourceUrl = sanitizeText(r?.sourceUrl || r?.source || "");
          const channelId = inferSeedChannelIdFromSourceUrl(sourceUrl) || sanitizeText(r?.channelId || "");
          let sourceId = "unknown";
          try {
            sourceId = sourceUrl ? new URL(sourceUrl).hostname.replace(/^www\./i, "").toLowerCase() : "unknown";
          } catch {
            sourceId = "unknown";
          }
          const matches = groupBy === "source" ? sourceId === id : (channelId || "unknown") === id;
          if (matches) removedIds.add(sanitizeText(r?.id || ""));
          return !matches;
        });

        const nextCookbooks = (Array.isArray(appState.cookbooks) ? appState.cookbooks : []).map((cookbook) => ({
          ...cookbook,
          recipeIds: (Array.isArray(cookbook?.recipeIds) ? cookbook.recipeIds : []).filter((recipeId) => !removedIds.has(sanitizeText(recipeId))),
        }));
        const nextState = { ...appState, importedRecipes: keptRecipes, cookbooks: nextCookbooks };

        if (isPostgresEnabled()) {
          await updateAuthenticatedUserState(userId, nextState);
        } else {
          const db = await loadDatabase();
          db.users[userId] = sanitizeUserStatePayload(nextState, currentUser);
          await persistDatabase();
        }
        seoRecipeSearchCache.clear();
        return sendJson(response, 200, { ok: true, removed: removedIds.size, userId, groupBy, id });
      } catch (error) {
        const statusCode = error.statusCode || 400;
        return sendJson(response, statusCode, { ok: false, error: error.message || "Kon imports niet verwijderen." });
      }
    }

    if (requestUrl.pathname === "/api/admin/inventory" && request.method === "GET") {
      console.log("📚 /api/admin/inventory called");
      try {
        await requireAdmin(request);
        const typeRaw = sanitizeText(requestUrl.searchParams.get("type") || "cookbooks");
        const type = typeRaw === "recipes" ? "recipes" : "cookbooks";
        const q = sanitizeText(requestUrl.searchParams.get("q") || "");
        const userId = sanitizeText(requestUrl.searchParams.get("user_id") || "");
        const limitRaw = Number.parseInt(String(requestUrl.searchParams.get("limit") || ""), 10);
        const offsetRaw = Number.parseInt(String(requestUrl.searchParams.get("offset") || ""), 10);
        const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 30;
        const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0;

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();

          if (type === "cookbooks") {
            const res = await pool.query(
              `
              SELECT
                u.id AS user_id,
                u.email AS user_email,
                u.created_at AS user_created_at,
                u.updated_at AS user_updated_at,
                cb AS cookbook,
                COALESCE(u.app_state->'importedRecipes','[]'::jsonb) AS imported_recipes
              FROM plately_users u
              CROSS JOIN LATERAL jsonb_array_elements(COALESCE(u.app_state->'cookbooks','[]'::jsonb)) cb
              WHERE ($1::text = '' OR u.id = $1)
                AND ($2::text = '' OR (cb->>'name') ILIKE ('%' || $2 || '%'))
              ORDER BY u.updated_at DESC NULLS LAST, u.created_at DESC NULLS LAST
              LIMIT $3 OFFSET $4
              `,
              [userId, q, limit, offset]
            );

            const items = res.rows.map((row) => {
              const cookbook = row.cookbook || {};
              const recipeIds = Array.isArray(cookbook.recipeIds) ? cookbook.recipeIds.filter(Boolean) : [];
              const importedRecipes = Array.isArray(row.imported_recipes) ? row.imported_recipes : [];
              const byId = new Map(importedRecipes.map((r) => [r?.id, r]));
              const coverImages = [];
              for (const id of recipeIds) {
                const r = byId.get(id);
                const img = sanitizeText(r?.image || "");
                if (img && !coverImages.includes(img)) {
                  coverImages.push(img);
                }
                if (coverImages.length >= 4) break;
              }
              return {
                id: sanitizeText(cookbook.id || ""),
                name: sanitizeText(cookbook.name || ""),
                user_id: sanitizeText(row.user_id || ""),
                user_name: sanitizeText(row.user_email || ""),
                recipe_count: recipeIds.length,
                cover_images: coverImages,
                created_at: row.user_created_at || "",
                updated_at: row.user_updated_at || "",
              };
            }).filter((it) => it.id);

            return sendJson(response, 200, { ok: true, type, limit, offset, q, user_id: userId, items });
          }

          // recipes
          const res = await pool.query(
            `
            SELECT
              u.id AS user_id,
              u.email AS user_email,
              u.created_at AS user_created_at,
              u.updated_at AS user_updated_at,
              r AS recipe
            FROM plately_users u
            CROSS JOIN LATERAL jsonb_array_elements(COALESCE(u.app_state->'importedRecipes','[]'::jsonb)) r
            WHERE ($1::text = '' OR u.id = $1)
              AND ($2::text = '' OR (COALESCE(r->>'title','')) ILIKE ('%' || $2 || '%'))
            ORDER BY u.updated_at DESC NULLS LAST, u.created_at DESC NULLS LAST
            LIMIT $3 OFFSET $4
            `,
            [userId, q, limit, offset]
          );

          const items = res.rows.map((row) => {
            const recipe = row.recipe || {};
            const seoDetails = getSeoRecipeScoreDetails(recipe);
            return {
              id: sanitizeText(recipe.id || ""),
              title: sanitizeText(recipe.title || ""),
              image: sanitizeText(recipe.image || ""),
              user_id: sanitizeText(row.user_id || ""),
              user_name: sanitizeText(row.user_email || ""),
              source: sanitizeText(recipe.sourceUrl || recipe.source || ""),
              channel: sanitizeText(recipe.channelId || recipe.platform || ""),
              seo_score: seoDetails.score,
              seo_grade: seoDetails.grade,
              seo_reasons: seoDetails.reasons,
              seo_bonuses: seoDetails.bonuses,
              seo_issues: seoDetails.issues,
              created_at: row.user_created_at || "",
              updated_at: row.user_updated_at || "",
            };
          }).filter((it) => it.id);

          return sendJson(response, 200, { ok: true, type, limit, offset, q, user_id: userId, items });
        }

        // JSON-file mode: best-effort (no SQL, but we still support paging/search)
        const db = await loadDatabase();
        const users = Object.values(db.users || {});
        const filteredUsers = userId ? users.filter((u) => String(u.id) === userId) : users;

        if (type === "cookbooks") {
          const allCookbooks = [];
          for (const u of filteredUsers) {
            const cookbooks = Array.isArray(u.cookbooks) ? u.cookbooks : [];
            const imported = Array.isArray(u.importedRecipes) ? u.importedRecipes : [];
            const byId = new Map(imported.map((r) => [r?.id, r]));
            for (const cb of cookbooks) {
              const name = sanitizeText(cb?.name || "");
              if (q && !name.toLowerCase().includes(q.toLowerCase())) continue;
              const recipeIds = Array.isArray(cb?.recipeIds) ? cb.recipeIds.filter(Boolean) : [];
              const coverImages = [];
              for (const id of recipeIds) {
                const r = byId.get(id);
                const img = sanitizeText(r?.image || "");
                if (img && !coverImages.includes(img)) coverImages.push(img);
                if (coverImages.length >= 4) break;
              }
              allCookbooks.push({
                id: sanitizeText(cb?.id || ""),
                name,
                user_id: sanitizeText(u.id || ""),
                user_name: sanitizeText(u.email || ""),
                recipe_count: recipeIds.length,
                cover_images: coverImages,
                created_at: u.createdAt || "",
                updated_at: u.updatedAt || "",
              });
            }
          }
          const items = allCookbooks.slice(offset, offset + limit);
          return sendJson(response, 200, { ok: true, type, limit, offset, q, user_id: userId, items });
        }

        const allRecipes = [];
        for (const u of filteredUsers) {
          const imported = Array.isArray(u.importedRecipes) ? u.importedRecipes : [];
          for (const r of imported) {
            const title = sanitizeText(r?.title || "");
            if (q && !title.toLowerCase().includes(q.toLowerCase())) continue;
            const seoDetails = getSeoRecipeScoreDetails(r);
            allRecipes.push({
              id: sanitizeText(r?.id || ""),
              title,
              image: sanitizeText(r?.image || ""),
              user_id: sanitizeText(u.id || ""),
              user_name: sanitizeText(u.email || ""),
              source: sanitizeText(r?.sourceUrl || r?.source || ""),
              channel: sanitizeText(r?.channelId || r?.platform || ""),
              seo_score: seoDetails.score,
              seo_grade: seoDetails.grade,
              seo_reasons: seoDetails.reasons,
              seo_bonuses: seoDetails.bonuses,
              seo_issues: seoDetails.issues,
              created_at: u.createdAt || "",
              updated_at: u.updatedAt || "",
            });
          }
        }
        const items = allRecipes.slice(offset, offset + limit);
        return sendJson(response, 200, { ok: true, type, limit, offset, q, user_id: userId, items });
      } catch (error) {
        console.error("❌ Error in /api/admin/inventory:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/analytics" && request.method === "GET") {
      console.log("📈 /api/admin/analytics called");
      try {
        await requireAdmin(request);
        if (!isPostgresEnabled()) {
          const emptyActivity = {
            clientEvents7d: 0,
            uniqueActors7d: 0,
            events24h: 0,
            events7d: 0,
            events30d: 0,
            serverEvents7d: 0,
            byType7d: [],
            byType30d: [],
            serverTypes7d: [],
            dailyEvents7d: [],
            hourlyEvents24h: [],
            topUsers7d: [],
            topAnon7d: [],
            navigationViews7d: [],
            channelSearchQueries7d: [],
            importPlatforms7d: [],
            importHosts7d: [],
            recent: [],
            userInsights: null,
            funnel: null,
            extraStats: null,
          };
          return sendJson(response, 200, {
            ok: true,
            analytics: {
              meta: { activityDays: 7, compareDays: 30, chartDays: 30, signupChartDays: 14 },
              imports: { last30Days: [], total30d: 0, total7d: 0, topSources: [], topPlatforms: [] },
              activity: emptyActivity,
            },
          });
        }

        await ensurePostgresSchema();
        const pool = await getPostgresPool();

        const activityDays = parseAdminAnalyticsDaysParam(requestUrl.searchParams.get("days"), 7);
        const compareDays = parseAdminAnalyticsDaysParam(requestUrl.searchParams.get("compareDays"), 30);
        const chartDays = Math.min(90, Math.max(activityDays, compareDays, 7));
        const signupChartDays = Math.min(90, Math.max(14, activityDays));
        const recentWindowDays = Math.min(180, Math.max(chartDays, 30));
        const meta = { activityDays, compareDays, chartDays, signupChartDays };

        const daily = await pool.query(
          `
          SELECT date_trunc('day', created_at) AS day, COUNT(*)::int AS count
          FROM plately_events
          WHERE type = 'import'
            AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
          GROUP BY 1
          ORDER BY 1 ASC
          `,
          [chartDays]
        );

        const totals = await pool.query(
          `
          SELECT
            (SELECT COUNT(*)::int FROM plately_events WHERE type = 'import' AND created_at >= NOW() - ($1::int * INTERVAL '1 day')) AS total_primary,
            (SELECT COUNT(*)::int FROM plately_events WHERE type = 'import' AND created_at >= NOW() - ($2::int * INTERVAL '1 day')) AS total_compare
          `,
          [activityDays, compareDays]
        );

        const topSources = await pool.query(
          `
          SELECT COALESCE(meta->>'sourceHost','') AS source, COUNT(*)::int AS count
          FROM plately_events
          WHERE type = 'import'
            AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
          GROUP BY 1
          HAVING COALESCE(meta->>'sourceHost','') <> ''
          ORDER BY 2 DESC
          LIMIT 10
          `,
          [compareDays]
        );

        const topPlatforms = await pool.query(
          `
          SELECT COALESCE(meta->>'platform','') AS platform, COUNT(*)::int AS count
          FROM plately_events
          WHERE type = 'import'
            AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
          GROUP BY 1
          HAVING COALESCE(meta->>'platform','') <> ''
          ORDER BY 2 DESC
          LIMIT 10
          `,
          [compareDays]
        );

        const clientEvents7dRes = await pool.query(
          `
          SELECT COUNT(*)::int AS n
          FROM plately_events
          WHERE type ~ '^client_'
            AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
          `,
          [activityDays]
        );

        const activityByType7d = await pool.query(
          `
          SELECT type, COUNT(*)::int AS count
          FROM plately_events
          WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
          GROUP BY type
          ORDER BY count DESC
          LIMIT 50
          `,
          [activityDays]
        );

        const activityByType30d = await pool.query(
          `
          SELECT type, COUNT(*)::int AS count
          FROM plately_events
          WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
          GROUP BY type
          ORDER BY count DESC
          LIMIT 50
          `,
          [compareDays]
        );

        const serverOnlyTypes7d = await pool.query(
          `
          SELECT type, COUNT(*)::int AS count
          FROM plately_events
          WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
            AND type !~ '^client_'
          GROUP BY type
          ORDER BY count DESC
          LIMIT 30
          `,
          [activityDays]
        );

        const uniqueActors7dRes = await pool.query(
          `
          SELECT COUNT(*)::int AS n
          FROM (
            SELECT DISTINCT COALESCE(user_id::text, meta->>'anonId', '') AS actor
            FROM plately_events
            WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
              AND ((user_id IS NOT NULL) OR ((meta->>'anonId') <> ''))
          ) s
          WHERE COALESCE(actor,'') <> ''
          `,
          [activityDays]
        );

        const recentEventsRes = await pool.query(
          `
          SELECT type, user_id, meta, created_at
          FROM plately_events
          WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
          ORDER BY created_at DESC
          LIMIT 220
          `,
          [recentWindowDays]
        );

        const [
          eventsVolumeRes,
          dailyEvents7dRes,
          hourlyEvents24hRes,
          topUsers7dRes,
          topAnon7dRes,
          navViews7dRes,
          channelSearch7dRes,
          importPlatform7dRes,
          importHost7dRes,
        ] = await Promise.all([
          pool.query(
            `
            SELECT
              SUM(CASE WHEN created_at >= NOW() - INTERVAL '24 hours' THEN 1 ELSE 0 END)::int AS h24,
              SUM(CASE WHEN created_at >= NOW() - ($1::int * INTERVAL '1 day') THEN 1 ELSE 0 END)::int AS d7,
              SUM(CASE WHEN created_at >= NOW() - ($2::int * INTERVAL '1 day') THEN 1 ELSE 0 END)::int AS d30,
              SUM(CASE WHEN created_at >= NOW() - ($1::int * INTERVAL '1 day') AND type ~ '^client_' THEN 1 ELSE 0 END)::int AS client7,
              SUM(CASE WHEN created_at >= NOW() - ($1::int * INTERVAL '1 day') AND type !~ '^client_' THEN 1 ELSE 0 END)::int AS server7
            FROM plately_events
            WHERE created_at >= NOW() - ($3::int * INTERVAL '1 day')
            `,
            [activityDays, compareDays, chartDays]
          ),
          pool.query(
            `
            SELECT date_trunc('day', created_at) AS day, COUNT(*)::int AS count
            FROM plately_events
            WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
            GROUP BY 1
            ORDER BY 1 ASC
            `,
            [activityDays]
          ),
          pool.query(`
            SELECT date_trunc('hour', created_at) AS hr, COUNT(*)::int AS count
            FROM plately_events
            WHERE created_at >= NOW() - INTERVAL '24 hours'
            GROUP BY 1
            ORDER BY 1 ASC
          `),
          pool.query(
            `
            SELECT e.user_id, u.email, COUNT(*)::int AS count
            FROM plately_events e
            LEFT JOIN plately_users u ON u.id = e.user_id
            WHERE e.created_at >= NOW() - ($1::int * INTERVAL '1 day')
              AND e.user_id IS NOT NULL
            GROUP BY e.user_id, u.email
            ORDER BY count DESC
            LIMIT 22
            `,
            [activityDays]
          ),
          pool.query(
            `
            SELECT COALESCE(meta->>'anonId', '') AS anon_id, COUNT(*)::int AS count
            FROM plately_events
            WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
              AND user_id IS NULL
              AND COALESCE(meta->>'anonId', '') <> ''
            GROUP BY 1
            ORDER BY count DESC
            LIMIT 12
            `,
            [activityDays]
          ),
          pool.query(
            `
            SELECT COALESCE(meta->>'view', '') AS view, COUNT(*)::int AS count
            FROM plately_events
            WHERE type = 'client_navigation'
              AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
              AND COALESCE(meta->>'view', '') <> ''
            GROUP BY 1
            ORDER BY count DESC
            LIMIT 24
            `,
            [activityDays]
          ),
          pool.query(
            `
            SELECT COALESCE(meta->>'query', '') AS query, COUNT(*)::int AS count
            FROM plately_events
            WHERE type = 'channel_search'
              AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
              AND COALESCE(meta->>'query', '') <> ''
            GROUP BY 1
            ORDER BY count DESC
            LIMIT 32
            `,
            [activityDays]
          ),
          pool.query(
            `
            SELECT COALESCE(NULLIF(meta->>'platform', ''), '(onbekend)') AS platform, COUNT(*)::int AS count
            FROM plately_events
            WHERE type = 'import'
              AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
            GROUP BY 1
            ORDER BY count DESC
            LIMIT 14
            `,
            [activityDays]
          ),
          pool.query(
            `
            SELECT COALESCE(NULLIF(meta->>'sourceHost', ''), '(onbekend)') AS source_host, COUNT(*)::int AS count
            FROM plately_events
            WHERE type = 'import'
              AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
            GROUP BY 1
            ORDER BY count DESC
            LIMIT 14
            `,
            [activityDays]
          ),
        ]);

        const [
          userRollupsRes,
          signupDaily14dRes,
          recipeHistRes,
          groceryHistRes,
          superRes,
          importDistinctUsers7dRes,
          authTypes30dRes,
          funnelRes,
        ] = await Promise.all([
          pool.query(
            `
            SELECT
              SUM(CASE WHEN created_at >= NOW() - ($1::int * INTERVAL '1 day') THEN 1 ELSE 0 END)::int AS new_users_7d,
              SUM(CASE WHEN created_at >= NOW() - ($2::int * INTERVAL '1 day') THEN 1 ELSE 0 END)::int AS new_users_30d,
              SUM(CASE WHEN created_at < NOW() - ($1::int * INTERVAL '1 day') AND updated_at >= NOW() - ($1::int * INTERVAL '1 day') THEN 1 ELSE 0 END)::int AS returning_active_7d,
              COUNT(*)::int AS total_accounts
            FROM plately_users
            `,
            [activityDays, compareDays]
          ),
          pool.query(
            `
            SELECT date_trunc('day', created_at) AS day, COUNT(*)::int AS count
            FROM plately_users
            WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
            GROUP BY 1
            ORDER BY 1 ASC
            `,
            [signupChartDays]
          ),
          pool.query(`
            SELECT
              SUM(CASE WHEN COALESCE(jsonb_array_length(app_state->'importedRecipes'), 0) = 0 THEN 1 ELSE 0 END)::int AS b0,
              SUM(CASE WHEN COALESCE(jsonb_array_length(app_state->'importedRecipes'), 0) BETWEEN 1 AND 5 THEN 1 ELSE 0 END)::int AS b1_5,
              SUM(CASE WHEN COALESCE(jsonb_array_length(app_state->'importedRecipes'), 0) BETWEEN 6 AND 20 THEN 1 ELSE 0 END)::int AS b6_20,
              SUM(CASE WHEN COALESCE(jsonb_array_length(app_state->'importedRecipes'), 0) > 20 THEN 1 ELSE 0 END)::int AS b21p
            FROM plately_users
          `),
          pool.query(`
            SELECT
              SUM(CASE WHEN COALESCE(jsonb_array_length(app_state->'groceryItems'), 0) = 0 THEN 1 ELSE 0 END)::int AS g0,
              SUM(CASE WHEN COALESCE(jsonb_array_length(app_state->'groceryItems'), 0) BETWEEN 1 AND 8 THEN 1 ELSE 0 END)::int AS g1_8,
              SUM(CASE WHEN COALESCE(jsonb_array_length(app_state->'groceryItems'), 0) BETWEEN 9 AND 24 THEN 1 ELSE 0 END)::int AS g9_24,
              SUM(CASE WHEN COALESCE(jsonb_array_length(app_state->'groceryItems'), 0) > 24 THEN 1 ELSE 0 END)::int AS g25p
            FROM plately_users
          `),
          pool.query(`
            SELECT COALESCE(NULLIF(LOWER(TRIM(profile->>'favoriteSupermarket')), ''), '(niet gezet)') AS sm, COUNT(*)::int AS count
            FROM plately_users
            GROUP BY 1
            ORDER BY count DESC
            LIMIT 14
          `),
          pool.query(
            `
            SELECT COUNT(DISTINCT user_id)::int AS n
            FROM plately_events
            WHERE type = 'import'
              AND user_id IS NOT NULL
              AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
            `,
            [activityDays]
          ),
          pool.query(
            `
            SELECT type, COUNT(*)::int AS count
            FROM plately_events
            WHERE type LIKE 'auth_%'
              AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
            GROUP BY type
            ORDER BY count DESC
            LIMIT 20
            `,
            [compareDays]
          ),
          pool.query(
            `
            WITH cohort AS (
              SELECT id, created_at FROM plately_users
              WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
            )
            SELECT
              (SELECT COUNT(*)::int FROM cohort) AS signups,
              (SELECT COUNT(DISTINCT c.id)::int FROM cohort c
                WHERE EXISTS (
                  SELECT 1 FROM plately_events e
                  WHERE e.user_id = c.id AND e.type = 'import'
                    AND e.created_at >= c.created_at
                    AND e.created_at < c.created_at + INTERVAL '7 days'
                )) AS did_import,
              (SELECT COUNT(DISTINCT c.id)::int FROM cohort c
                WHERE EXISTS (
                  SELECT 1 FROM plately_events e
                  WHERE e.user_id = c.id AND e.type = 'client_import_review_saved'
                    AND e.created_at >= c.created_at
                    AND e.created_at < c.created_at + INTERVAL '7 days'
                )) AS did_save
            `,
            [activityDays]
          ),
        ]);

        const vol = eventsVolumeRes.rows[0] || {};
        const ur = userRollupsRes.rows[0] || {};
        const rh = recipeHistRes.rows[0] || {};
        const gh = groceryHistRes.rows[0] || {};
        const funnelRow = funnelRes.rows[0] || {};

        const extraStatsRes = await pool.query(
          `
          SELECT
            (SELECT COUNT(*)::int FROM (
              SELECT DISTINCT user_id FROM plately_events
              WHERE user_id IS NOT NULL AND created_at >= NOW() - INTERVAL '24 hours'
            ) z) AS dau_logged_in,
            (SELECT COUNT(*)::int FROM (
              SELECT DISTINCT user_id FROM plately_events
              WHERE user_id IS NOT NULL AND created_at >= NOW() - ($1::int * INTERVAL '1 day')
            ) z2) AS wau_logged_in_window,
            (SELECT COUNT(*)::int FROM plately_users WHERE updated_at >= NOW() - INTERVAL '24 hours') AS profiles_touched_24h,
            (SELECT COUNT(*)::int FROM plately_users WHERE updated_at >= NOW() - ($1::int * INTERVAL '1 day')) AS profiles_touched_window,
            (SELECT COUNT(*)::int FROM plately_users WHERE updated_at < NOW() - INTERVAL '90 days') AS dormant_accounts_90d,
            (SELECT COALESCE(SUM(COALESCE(jsonb_array_length(COALESCE(app_state, '{}'::jsonb)->'importedRecipes'), 0)), 0)::bigint FROM plately_users) AS total_recipe_slots,
            (SELECT COALESCE(SUM(COALESCE(jsonb_array_length(COALESCE(app_state, '{}'::jsonb)->'cookbooks'), 0)), 0)::bigint FROM plately_users) AS total_cookbook_slots,
            (SELECT COUNT(*)::int FROM plately_users
              WHERE COALESCE(jsonb_array_length(COALESCE(app_state, '{}'::jsonb)->'importedRecipes'), 0) >= 1) AS users_with_recipes,
            (SELECT COALESCE(SUM(COALESCE(jsonb_array_length(COALESCE(app_state, '{}'::jsonb)->'followedChannelIds'), 0)), 0)::bigint FROM plately_users) AS total_followed_channel_slots,
            (SELECT COUNT(*)::int FROM plately_users
              WHERE COALESCE(jsonb_array_length(COALESCE(app_state, '{}'::jsonb)->'followedChannelIds'), 0) >= 1) AS users_following_any,
            (SELECT COALESCE(SUM(COALESCE(jsonb_array_length(COALESCE(app_state, '{}'::jsonb)->'customChannels'), 0)), 0)::bigint FROM plately_users) AS total_custom_channel_slots,
            (SELECT COUNT(*)::int FROM plately_users
              WHERE COALESCE(jsonb_array_length(COALESCE(app_state, '{}'::jsonb)->'customChannels'), 0) >= 1) AS users_with_custom_channels,
            (SELECT COALESCE((
              SELECT n_live_tup::bigint FROM pg_stat_all_tables
              WHERE schemaname = 'public' AND relname = 'plately_events'
              LIMIT 1
            ), 0)) AS events_rows_estimate,
            (SELECT COUNT(*) FILTER (WHERE type = 'client_import_success' AND created_at >= NOW() - ($1::int * INTERVAL '1 day'))::int FROM plately_events) AS client_import_success,
            (SELECT COUNT(*) FILTER (WHERE type = 'client_recipe_detail_view' AND created_at >= NOW() - ($1::int * INTERVAL '1 day'))::int FROM plately_events) AS client_recipe_detail_views,
            (SELECT COUNT(*) FILTER (WHERE type = 'client_kookstand' AND created_at >= NOW() - ($1::int * INTERVAL '1 day'))::int FROM plately_events) AS client_kookstand,
            (SELECT COUNT(*) FILTER (WHERE type = 'client_ah_basket_open' AND created_at >= NOW() - ($1::int * INTERVAL '1 day'))::int FROM plately_events) AS client_ah_basket_open,
            (SELECT COUNT(*) FILTER (WHERE type = 'client_grocery_add' AND created_at >= NOW() - ($1::int * INTERVAL '1 day'))::int FROM plately_events) AS client_grocery_add,
            (SELECT COUNT(*) FILTER (WHERE type = 'client_cookbook_save' AND created_at >= NOW() - ($1::int * INTERVAL '1 day'))::int FROM plately_events) AS client_cookbook_save,
            (SELECT COUNT(*) FILTER (WHERE type = 'client_import_review_saved' AND created_at >= NOW() - ($1::int * INTERVAL '1 day'))::int FROM plately_events) AS client_import_review_saved,
            (SELECT COUNT(*) FILTER (WHERE type = 'client_recipe_deleted' AND created_at >= NOW() - ($1::int * INTERVAL '1 day'))::int FROM plately_events) AS client_recipe_deleted
          `,
          [activityDays]
        );
        const ex = extraStatsRes.rows[0] || {};

        return sendJson(response, 200, {
          ok: true,
          analytics: {
            meta,
            imports: {
              last30Days: daily.rows.map((r) => ({ day: r.day, count: r.count })),
              total7d: totals.rows[0]?.total_primary || 0,
              total30d: totals.rows[0]?.total_compare || 0,
              topSources: topSources.rows,
              topPlatforms: topPlatforms.rows,
            },
            activity: {
              clientEvents7d: clientEvents7dRes.rows[0]?.n || 0,
              uniqueActors7d: uniqueActors7dRes.rows[0]?.n || 0,
              events24h: vol.h24 || 0,
              events7d: vol.d7 || 0,
              events30d: vol.d30 || 0,
              serverEvents7d: vol.server7 || 0,
              byType7d: activityByType7d.rows || [],
              byType30d: activityByType30d.rows || [],
              serverTypes7d: serverOnlyTypes7d.rows || [],
              dailyEvents7d: (dailyEvents7dRes.rows || []).map((r) => ({
                day: r.day,
                count: r.count || 0,
              })),
              hourlyEvents24h: (hourlyEvents24hRes.rows || []).map((r) => ({
                hr: r.hr,
                count: r.count || 0,
              })),
              topUsers7d: (topUsers7dRes.rows || []).map((r) => ({
                user_id: r.user_id,
                email: r.email || "",
                count: r.count || 0,
              })),
              topAnon7d: (topAnon7dRes.rows || []).map((r) => ({
                anon_id: r.anon_id,
                count: r.count || 0,
              })),
              navigationViews7d: (navViews7dRes.rows || []).map((r) => ({
                view: r.view,
                count: r.count || 0,
              })),
              channelSearchQueries7d: (channelSearch7dRes.rows || []).map((r) => ({
                query: r.query,
                count: r.count || 0,
              })),
              importPlatforms7d: (importPlatform7dRes.rows || []).map((r) => ({
                platform: r.platform,
                count: r.count || 0,
              })),
              importHosts7d: (importHost7dRes.rows || []).map((r) => ({
                source_host: r.source_host,
                count: r.count || 0,
              })),
              recent: (recentEventsRes.rows || []).map((r) => ({
                type: r.type,
                user_id: r.user_id || null,
                created_at: r.created_at,
                meta: r.meta && typeof r.meta === "object" ? r.meta : {},
              })),
              funnel: {
                cohortSignupWindowDays: activityDays,
                firstWeekDays: 7,
                cohortSignups: Number(funnelRow.signups) || 0,
                importInFirstWeek: Number(funnelRow.did_import) || 0,
                savedReviewInFirstWeek: Number(funnelRow.did_save) || 0,
              },
              extraStats: {
                primaryWindowDays: activityDays,
                dauLoggedIn: Number(ex.dau_logged_in) || 0,
                wauLoggedInWindow: Number(ex.wau_logged_in_window) || 0,
                profilesTouched24h: Number(ex.profiles_touched_24h) || 0,
                profilesTouchedWindow: Number(ex.profiles_touched_window) || 0,
                dormantAccounts90d: Number(ex.dormant_accounts_90d) || 0,
                totalRecipeSlots: Number(ex.total_recipe_slots) || 0,
                totalCookbookSlots: Number(ex.total_cookbook_slots) || 0,
                usersWithRecipes: Number(ex.users_with_recipes) || 0,
                totalFollowedChannelSlots: Number(ex.total_followed_channel_slots) || 0,
                usersFollowingAny: Number(ex.users_following_any) || 0,
                totalCustomChannelSlots: Number(ex.total_custom_channel_slots) || 0,
                usersWithCustomChannels: Number(ex.users_with_custom_channels) || 0,
                eventsRowsEstimate: Number(ex.events_rows_estimate) || 0,
                clientImportSuccess: Number(ex.client_import_success) || 0,
                clientRecipeDetailViews: Number(ex.client_recipe_detail_views) || 0,
                clientKookstand: Number(ex.client_kookstand) || 0,
                clientAhBasketOpen: Number(ex.client_ah_basket_open) || 0,
                clientGroceryAdd: Number(ex.client_grocery_add) || 0,
                clientCookbookSave: Number(ex.client_cookbook_save) || 0,
                clientImportReviewSaved: Number(ex.client_import_review_saved) || 0,
                clientRecipeDeleted: Number(ex.client_recipe_deleted) || 0,
              },
              userInsights: {
                newUsers7d: ur.new_users_7d || 0,
                newUsers30d: ur.new_users_30d || 0,
                returningActive7d: ur.returning_active_7d || 0,
                totalAccounts: ur.total_accounts || 0,
                signupDaily14d: (signupDaily14dRes.rows || []).map((r) => ({ day: r.day, count: r.count || 0 })),
                recipeBuckets: {
                  zero: rh.b0 || 0,
                  oneToFive: rh.b1_5 || 0,
                  sixToTwenty: rh.b6_20 || 0,
                  twentyOnePlus: rh.b21p || 0,
                },
                groceryBuckets: {
                  zero: gh.g0 || 0,
                  oneToEight: gh.g1_8 || 0,
                  nineToTwentyFour: gh.g9_24 || 0,
                  twentyFivePlus: gh.g25p || 0,
                },
                favoriteSupermarket: (superRes.rows || []).map((r) => ({
                  key: r.sm || "",
                  count: r.count || 0,
                })),
                distinctUsersWithImport7d: importDistinctUsers7dRes.rows[0]?.n || 0,
                authEvents30d: (authTypes30dRes.rows || []).map((r) => ({
                  type: r.type,
                  count: r.count || 0,
                })),
              },
            },
          },
        });
      } catch (error) {
        console.error("❌ Error in /api/admin/analytics:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/analytics-export" && request.method === "GET") {
      try {
        await requireAdmin(request);
        if (!isPostgresEnabled()) {
          return sendJson(response, 400, { ok: false, error: "PostgreSQL vereist voor export." });
        }
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const activityDays = parseAdminAnalyticsDaysParam(requestUrl.searchParams.get("days"), 7);
        const compareDays = parseAdminAnalyticsDaysParam(requestUrl.searchParams.get("compareDays"), 30);
        const exportDays = Math.min(90, Math.max(activityDays, compareDays, 7));
        const limitRaw = Number.parseInt(String(requestUrl.searchParams.get("limit") || "8000"), 10);
        const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 20000) : 8000;
        const res = await pool.query(
          `
          SELECT type, user_id, meta, created_at
          FROM plately_events
          WHERE created_at >= NOW() - ($1::int * INTERVAL '1 day')
          ORDER BY created_at DESC
          LIMIT $2
          `,
          [exportDays, limit]
        );
        const csvEscape = (v) => {
          const s = v == null ? "" : String(v);
          if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
          return s;
        };
        const lines = ["type,user_id,created_at,meta_json"];
        for (const row of res.rows) {
          let metaJson = "{}";
          try {
            metaJson = JSON.stringify(row.meta && typeof row.meta === "object" ? row.meta : {});
          } catch {
            metaJson = "{}";
          }
          const ts =
            row.created_at instanceof Date
              ? row.created_at.toISOString()
              : String(row.created_at || "");
          lines.push(
            [csvEscape(row.type), csvEscape(row.user_id ?? ""), csvEscape(ts), csvEscape(metaJson)].join(",")
          );
        }
        const body = `${lines.join("\n")}\n`;
        response.writeHead(200, {
          ...HTTP_HEADERS,
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="plately-events-${exportDays}d.csv"`,
        });
        response.end(body);
        return;
      } catch (error) {
        console.error("❌ Error in /api/admin/analytics-export:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/events-purge" && request.method === "POST") {
      try {
        await requireAdmin(request);
        if (!isPostgresEnabled()) {
          return sendJson(response, 400, { ok: false, error: "PostgreSQL vereist." });
        }
        let body = "";
        for await (const chunk of request) body += chunk.toString();
        let payload = {};
        try {
          payload = JSON.parse(body || "{}");
        } catch {
          return sendJson(response, 400, { ok: false, error: "Ongeldige JSON body." });
        }
        const olderThanDays = Number.parseInt(String(payload.olderThanDays ?? ""), 10);
        const MIN_RETENTION = 180;
        if (!Number.isFinite(olderThanDays) || olderThanDays < MIN_RETENTION) {
          return sendJson(response, 400, {
            ok: false,
            error: `olderThanDays moet een geheel getal >= ${MIN_RETENTION} zijn.`,
          });
        }
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const del = await pool.query(
          `DELETE FROM plately_events WHERE created_at < NOW() - ($1::int * INTERVAL '1 day')`,
          [olderThanDays]
        );
        return sendJson(response, 200, {
          ok: true,
          deleted: del.rowCount || 0,
          olderThanDays,
        });
      } catch (error) {
        console.error("❌ Error in /api/admin/events-purge:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/user-events" && request.method === "GET") {
      try {
        await requireAdmin(request);
        if (!isPostgresEnabled()) {
          return sendJson(response, 200, { ok: true, events: [] });
        }
        const userId = sanitizeText(requestUrl.searchParams.get("userId") || "");
        const limitRaw = Number.parseInt(String(requestUrl.searchParams.get("limit") || "100"), 10);
        const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 250) : 100;
        if (!userId) {
          return sendJson(response, 400, { ok: false, error: "userId required" });
        }
        await ensurePostgresSchema();
        const pool = await getPostgresPool();
        const ev = await pool.query(
          `
          SELECT type, meta, created_at
          FROM plately_events
          WHERE user_id = $1
          ORDER BY created_at DESC
          LIMIT $2
          `,
          [userId, limit]
        );
        return sendJson(response, 200, {
          ok: true,
          events: (ev.rows || []).map((r) => ({
            type: r.type,
            created_at: r.created_at,
            meta: r.meta && typeof r.meta === "object" ? r.meta : {},
          })),
        });
      } catch (error) {
        console.error("❌ Error in /api/admin/user-events:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/delete-user" && request.method === "POST") {
      console.log("🗑️ /api/admin/delete-user called");

      try {
        await requireAdmin(request);
        let body = "";
        for await (const chunk of request) body += chunk.toString();
        const { userId } = JSON.parse(body);

        if (!userId) {
          return sendJson(response, 400, { ok: false, error: "userId required" });
        }

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();

          // Delete user
          await pool.query("DELETE FROM plately_users WHERE id = $1", [userId]);
          // Delete sessions
          await pool.query("DELETE FROM plately_auth_sessions WHERE user_id = $1", [userId]);

          console.log(`✅ Deleted user ${userId}`);
          return sendJson(response, 200, { ok: true, message: "User deleted" });
        } else {
          // Delete from JSON file
          const rawFile = await fsp.readFile(DATA_FILE, "utf8");
          const parsed = JSON.parse(rawFile);

          if (parsed.users && parsed.users[userId]) {
            delete parsed.users[userId];
            await fsp.writeFile(DATA_FILE, JSON.stringify(parsed, null, 2));
            console.log(`✅ Deleted user ${userId}`);
            return sendJson(response, 200, { ok: true, message: "User deleted" });
          }
          return sendJson(response, 404, { ok: false, error: "User not found" });
        }
      } catch (error) {
        console.error("❌ Error in /api/admin/delete-user:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/delete-users" && request.method === "POST") {
      console.log("🗑️ /api/admin/delete-users called");

      try {
        await requireAdmin(request);
        let body = "";
        for await (const chunk of request) body += chunk.toString();
        const payload = JSON.parse(body || "{}");
        const userIds = Array.isArray(payload.userIds) ? payload.userIds.map((id) => sanitizeText(id)).filter(Boolean) : [];

        if (!userIds.length) {
          return sendJson(response, 400, { ok: false, error: "userIds required" });
        }
        if (userIds.length > 50) {
          return sendJson(response, 400, { ok: false, error: "Too many userIds (max 50)" });
        }

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const client = await pool.connect();
          try {
            await client.query("BEGIN");
            await client.query("DELETE FROM plately_auth_sessions WHERE user_id = ANY($1)", [userIds]);
            const res = await client.query("DELETE FROM plately_users WHERE id = ANY($1)", [userIds]);
            await client.query("COMMIT");
            return sendJson(response, 200, { ok: true, deleted: res.rowCount || 0 });
          } catch (error) {
            await client.query("ROLLBACK");
            throw error;
          } finally {
            client.release();
          }
        }

        // JSON file
        const rawFile = await fsp.readFile(DATA_FILE, "utf8");
        const parsed = JSON.parse(rawFile);
        let deleted = 0;
        for (const userId of userIds) {
          if (parsed.users && parsed.users[userId]) {
            delete parsed.users[userId];
            deleted += 1;
          }
        }
        await fsp.writeFile(DATA_FILE, JSON.stringify(parsed, null, 2));
        return sendJson(response, 200, { ok: true, deleted });
      } catch (error) {
        console.error("❌ Error in /api/admin/delete-users:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/pending-channels" && request.method === "GET") {
      console.log("⏳ /api/admin/pending-channels called");

      try {
        await requireAdmin(request);

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const result = await pool.query("SELECT id, email, app_state FROM plately_users");

          const pendingChannels = [];
          const rejectedChannels = [];
          for (const row of result.rows) {
            const appState = typeof row.app_state === 'object' ? row.app_state : JSON.parse(row.app_state || '{}');
            const customChannels = Array.isArray(appState.customChannels) ? appState.customChannels : [];
            for (const ch of customChannels) {
              if (ch.status === "pending") {
                pendingChannels.push({
                  id: ch.id,
                  name: ch.name,
                  url: ch.url,
                  createdAt: ch.createdAt || new Date().toISOString(),
                  createdById: ch.createdBy,
                  createdByEmail: row.email || "unknown",
                });
              } else if (ch.status === "rejected") {
                rejectedChannels.push({
                  id: ch.id,
                  name: ch.name,
                  url: ch.url,
                  createdAt: ch.createdAt || "",
                  rejectedAt: ch.rejectedAt || ch.updatedAt || "",
                  rejectedReason: ch.rejectedReason || "",
                  createdById: ch.createdBy,
                  createdByEmail: row.email || "unknown",
                });
              }
            }
          }

          return sendJson(response, 200, { ok: true, channels: pendingChannels, rejectedChannels });
        } else {
          // JSON file
          const rawFile = await fsp.readFile(DATA_FILE, "utf8");
          const parsed = JSON.parse(rawFile);
          const pendingChannels = [];
          const rejectedChannels = [];

          for (const [userId, user] of Object.entries(parsed.users || {})) {
            const customChannels = Array.isArray(user.customChannels) ? user.customChannels : [];
            for (const ch of customChannels) {
              if (ch.status === "pending") {
                pendingChannels.push({
                  id: ch.id,
                  name: ch.name,
                  url: ch.url,
                  createdAt: ch.createdAt || new Date().toISOString(),
                  createdById: ch.createdBy,
                  createdByEmail: user.email || "unknown",
                });
              } else if (ch.status === "rejected") {
                rejectedChannels.push({
                  id: ch.id,
                  name: ch.name,
                  url: ch.url,
                  createdAt: ch.createdAt || "",
                  rejectedAt: ch.rejectedAt || ch.updatedAt || "",
                  rejectedReason: ch.rejectedReason || "",
                  createdById: ch.createdBy,
                  createdByEmail: user.email || "unknown",
                });
              }
            }
          }

          return sendJson(response, 200, { ok: true, channels: pendingChannels, rejectedChannels });
        }
      } catch (error) {
        console.error("❌ Error in /api/admin/pending-channels:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/channels" && request.method === "GET") {
      console.log("🧩 /api/admin/channels called");
      try {
        await requireAdmin(request);

        const seedOverrides = await getSeedChannelOverrides();
        const channelOverrides = await getChannelOverrides();
        const enabledState = await getChannelEnabledState().catch(() => ({ seed: {}, custom: {} }));
        const globalCustomChannels = await getGlobalCustomChannels().catch(() => []);
        const seedChannels = Array.isArray(SEED_CHANNELS)
          ? SEED_CHANNELS.map((ch) => ({
              id: sanitizeText(ch?.id || ""),
              name: sanitizeText(ch?.name || ""),
              url: sanitizeText(getEffectiveSeedChannelConfig(ch?.id || "", seedOverrides).baseUrl || ""),
              searchUrlTemplate: sanitizeText(getEffectiveSeedChannelConfig(ch?.id || "", seedOverrides).searchUrlTemplate || ""),
              defaultUrl: sanitizeText(getEffectiveSeedChannelConfig(ch?.id || "", seedOverrides).defaultBaseUrl || ""),
              defaultSearchUrlTemplate: sanitizeText(getEffectiveSeedChannelConfig(ch?.id || "", seedOverrides).defaultSearchUrlTemplate || ""),
              overrideUrl: sanitizeText(getEffectiveSeedChannelConfig(ch?.id || "", seedOverrides).override.baseUrl || ""),
              overrideSearchUrlTemplate: sanitizeText(getEffectiveSeedChannelConfig(ch?.id || "", seedOverrides).override.searchUrlTemplate || ""),
              kind: "seed",
              enabled: isChannelEnabled("seed", ch?.id || "", enabledState),
            })).filter((ch) => ch.id && ch.name)
          : [];

        const customChannels = { approved: [], pending: [], rejected: [] };
        const seen = new Set();

        const pushCustom = (ch, ownerEmail) => {
          const id = sanitizeText(ch?.id || "");
          if (!id || seen.has(id)) return;
          seen.add(id);
          const status = sanitizeText(ch?.status || "approved") || "approved";
          const effective = getEffectiveCustomChannelConfig({ channelId: id, url: sanitizeText(ch?.url || "") }, channelOverrides);
          const entry = {
            id,
            name: sanitizeText(ch?.name || ""),
            url: sanitizeText(ch?.url || ""),
            baseUrl: sanitizeText(effective.baseUrl || ""),
            searchUrlTemplate: sanitizeText(effective.searchUrlTemplate || ""),
            defaultBaseUrl: sanitizeText(effective.defaultBaseUrl || ""),
            defaultSearchUrlTemplate: sanitizeText(effective.defaultSearchUrlTemplate || ""),
            overrideBaseUrl: sanitizeText(effective.override.baseUrl || ""),
            overrideSearchUrlTemplate: sanitizeText(effective.override.searchUrlTemplate || ""),
            status,
            createdAt: sanitizeText(ch?.createdAt || ""),
            updatedAt: sanitizeText(ch?.updatedAt || ""),
            rejectedAt: sanitizeText(ch?.rejectedAt || ""),
            rejectedReason: sanitizeText(ch?.rejectedReason || ""),
            ownerEmail: sanitizeText(ownerEmail || ""),
            managedByAdmin: Boolean(ch?.managedByAdmin),
            kind: "custom",
            enabled: isChannelEnabled("custom", id, enabledState),
          };
          if (status === "pending") customChannels.pending.push(entry);
          else if (status === "rejected") customChannels.rejected.push(entry);
          else customChannels.approved.push(entry);
        };

        for (const ch of globalCustomChannels) pushCustom(ch, ch.createdByEmail || "Plately");

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const result = await pool.query("SELECT email, app_state FROM plately_users");
          for (const row of result.rows) {
            const appState = typeof row.app_state === "object" ? row.app_state : JSON.parse(row.app_state || "{}");
            const list = Array.isArray(appState.customChannels) ? appState.customChannels : [];
            for (const ch of list) pushCustom(ch, row.email || "");
          }
        } else {
          const rawFile = await fsp.readFile(DATA_FILE, "utf8");
          const parsed = JSON.parse(rawFile);
          for (const u of Object.values(parsed.users || {})) {
            const list = Array.isArray(u.customChannels) ? u.customChannels : [];
            for (const ch of list) pushCustom(ch, u.email || "");
          }
        }

        return sendJson(response, 200, { ok: true, seedChannels, customChannels });
      } catch (error) {
        console.error("❌ Error in /api/admin/channels:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/seed-channel-override" && request.method === "POST") {
      console.log("🔧 /api/admin/seed-channel-override called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);

        const channelId = sanitizeText(body.channelId || "");
        const nextBaseUrlRaw = sanitizeText(body.baseUrl || "");
        const nextTemplateRaw = sanitizeText(body.searchUrlTemplate || "");
        const clear = Boolean(body.clear);

        if (!channelId) {
          return sendJson(response, 400, { ok: false, error: "channelId required" });
        }
        if (!SEED_CHANNELS.some((ch) => ch.id === channelId)) {
          return sendJson(response, 400, { ok: false, error: "Unknown seed channel" });
        }

        const overrides = await getSeedChannelOverrides();
        if (clear) {
          if (overrides && typeof overrides === "object") {
            delete overrides[channelId];
            await setSeedChannelOverrides(overrides);
          }
          const eff = getEffectiveSeedChannelConfig(channelId, overrides);
          return sendJson(response, 200, { ok: true, channelId, overrides: null, effective: eff });
        }

        const next = {};
        if (nextBaseUrlRaw) {
          try {
            const parsed = new URL(nextBaseUrlRaw);
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
              return sendJson(response, 400, { ok: false, error: "baseUrl must be http(s)" });
            }
            next.baseUrl = parsed.toString().replace(/\/+$/, "");
          } catch {
            return sendJson(response, 400, { ok: false, error: "Invalid baseUrl" });
          }
        }
        if (nextTemplateRaw) {
          try {
            const parsed = new URL(seedSearchTemplateForValidation(nextTemplateRaw));
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
              return sendJson(response, 400, { ok: false, error: "searchUrlTemplate must be http(s)" });
            }
            if (!seedSearchTemplateHasPlaceholder(nextTemplateRaw)) {
              return sendJson(response, 400, { ok: false, error: "searchUrlTemplate must include {q} or <zoekwoord>" });
            }
            next.searchUrlTemplate = nextTemplateRaw;
          } catch {
            return sendJson(response, 400, { ok: false, error: "Invalid searchUrlTemplate" });
          }
        }

        if (!next.baseUrl && !next.searchUrlTemplate) {
          return sendJson(response, 400, { ok: false, error: "baseUrl or searchUrlTemplate required (or clear=true)" });
        }

        overrides[channelId] = {
          ...(overrides[channelId] && typeof overrides[channelId] === "object" ? overrides[channelId] : {}),
          ...next,
        };
        await setSeedChannelOverrides(overrides);
        const eff = getEffectiveSeedChannelConfig(channelId, overrides);
        return sendJson(response, 200, { ok: true, channelId, overrides: overrides[channelId], effective: eff });
      } catch (error) {
        console.error("❌ Error in /api/admin/seed-channel-override:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/global-channel" && request.method === "POST") {
      console.log("➕ /api/admin/global-channel called");
      try {
        const adminUser = await requireAdmin(request);
        const body = await readRequestBody(request);
        const name = sanitizeText(body.name || "").slice(0, 80);
        const rawUrl = sanitizeText(body.url || "").slice(0, 500);
        if (!name || !rawUrl) {
          return sendJson(response, 400, { ok: false, error: "name and url required" });
        }

        let normalizedUrl = "";
        let slug = "";
        try {
          const parsed = new URL(rawUrl);
          if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            return sendJson(response, 400, { ok: false, error: "URL must be http(s)" });
          }
          normalizedUrl = parsed.toString().replace(/\/+$/, "");
          slug = parsed.hostname.replace(/^www\./i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        } catch {
          return sendJson(response, 400, { ok: false, error: "Invalid URL" });
        }

        const nowIso = new Date().toISOString();
        const globals = await getGlobalCustomChannels();
        const normalizedCompare = normalizeChannelUrlForCompare(normalizedUrl);
        const existing = globals.find((ch) => {
          const cmp = normalizeChannelUrlForCompare(ch.url || "");
          return cmp && normalizedCompare && cmp.host === normalizedCompare.host && cmp.path === normalizedCompare.path;
        });
        if (existing) {
          return sendJson(response, 409, { ok: false, error: "Kanaal bestaat al in Plately", channel: existing });
        }

        const initials = name.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase() || "WEB";
        const channel = sanitizeGlobalCustomChannel({
          id: `ch-global-${slug || Date.now()}-${Date.now()}`,
          name,
          url: normalizedUrl,
          initials,
          color: "#8da485",
          managedByAdmin: true,
          createdBy: adminUser?.id || "",
          createdByEmail: adminUser?.email || "",
          createdAt: nowIso,
          updatedAt: nowIso,
        });
        globals.push(channel);
        await setGlobalCustomChannels(globals);
        const enabledState = await getChannelEnabledState();
        enabledState.custom[channel.id] = true;
        await setChannelEnabledState(enabledState);
        return sendJson(response, 200, { ok: true, channel });
      } catch (error) {
        console.error("❌ Error in /api/admin/global-channel:", error.message);
        return sendJson(response, error.statusCode || 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/custom-channel-url" && request.method === "POST") {
      console.log("🔧 /api/admin/custom-channel-url called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);

        const channelId = sanitizeText(body.channelId || "");
        const nextUrlRaw = sanitizeText(body.url || "");

        if (!channelId || !nextUrlRaw) {
          return sendJson(response, 400, { ok: false, error: "channelId and url required" });
        }
        if (SEED_CHANNELS.some((ch) => ch.id === channelId)) {
          return sendJson(response, 400, { ok: false, error: "Cannot edit seed channels" });
        }

        let normalizedUrl = "";
        try {
          const parsed = new URL(nextUrlRaw);
          if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            return sendJson(response, 400, { ok: false, error: "URL must be http(s)" });
          }
          // Store origin+pathname without trailing slash noise, keep query if present
          normalizedUrl = parsed.toString();
        } catch {
          return sendJson(response, 400, { ok: false, error: "Invalid URL" });
        }

        const nowIso = new Date().toISOString();

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const result = await pool.query("SELECT id, app_state FROM plately_users");

          for (const row of result.rows) {
            const appState = typeof row.app_state === "object" ? row.app_state : JSON.parse(row.app_state || "{}");
            const customChannels = Array.isArray(appState.customChannels) ? appState.customChannels : [];
            const idx = customChannels.findIndex((ch) => ch && ch.id === channelId);
            if (idx === -1) continue;

            customChannels[idx].url = normalizedUrl;
            customChannels[idx].updatedAt = nowIso;
            appState.customChannels = customChannels;

            await pool.query("UPDATE plately_users SET app_state = $1 WHERE id = $2", [
              JSON.stringify(appState),
              row.id,
            ]);

            return sendJson(response, 200, {
              ok: true,
              channel: {
                id: sanitizeText(customChannels[idx].id || ""),
                name: sanitizeText(customChannels[idx].name || ""),
                url: sanitizeText(customChannels[idx].url || ""),
                status: sanitizeText(customChannels[idx].status || "approved") || "approved",
                updatedAt: sanitizeText(customChannels[idx].updatedAt || ""),
              },
            });
          }

          return sendJson(response, 404, { ok: false, error: "Channel not found" });
        }

        // JSON file
        const rawFile = await fsp.readFile(DATA_FILE, "utf8");
        const parsed = JSON.parse(rawFile);
        for (const user of Object.values(parsed.users || {})) {
          const customChannels = Array.isArray(user.customChannels) ? user.customChannels : [];
          const idx = customChannels.findIndex((ch) => ch && ch.id === channelId);
          if (idx === -1) continue;

          customChannels[idx].url = normalizedUrl;
          customChannels[idx].updatedAt = nowIso;
          user.customChannels = customChannels;

          await fsp.writeFile(DATA_FILE, JSON.stringify(parsed, null, 2));
          return sendJson(response, 200, {
            ok: true,
            channel: {
              id: sanitizeText(customChannels[idx].id || ""),
              name: sanitizeText(customChannels[idx].name || ""),
              url: sanitizeText(customChannels[idx].url || ""),
              status: sanitizeText(customChannels[idx].status || "approved") || "approved",
              updatedAt: sanitizeText(customChannels[idx].updatedAt || ""),
            },
          });
        }

        return sendJson(response, 404, { ok: false, error: "Channel not found" });
      } catch (error) {
        console.error("❌ Error in /api/admin/custom-channel-url:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/channel-override" && request.method === "POST") {
      console.log("🔧 /api/admin/channel-override called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);

        const channelId = sanitizeText(body.channelId || "");
        const nextBaseUrlRaw = sanitizeText(body.baseUrl || "");
        const nextTemplateRaw = sanitizeText(body.searchUrlTemplate || "");
        const clear = Boolean(body.clear);

        if (!channelId) {
          return sendJson(response, 400, { ok: false, error: "channelId required" });
        }

        const overrides = await getChannelOverrides();
        if (clear) {
          if (overrides && typeof overrides === "object") {
            delete overrides[channelId];
            await setChannelOverrides(overrides);
          }
          return sendJson(response, 200, { ok: true, channelId, overrides: null });
        }

        const next = {};
        if (nextBaseUrlRaw) {
          try {
            const parsed = new URL(nextBaseUrlRaw);
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
              return sendJson(response, 400, { ok: false, error: "baseUrl must be http(s)" });
            }
            next.baseUrl = parsed.toString().replace(/\/+$/, "");
          } catch {
            return sendJson(response, 400, { ok: false, error: "Invalid baseUrl" });
          }
        }
        if (nextTemplateRaw) {
          try {
            const parsed = new URL(seedSearchTemplateForValidation(nextTemplateRaw));
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
              return sendJson(response, 400, { ok: false, error: "searchUrlTemplate must be http(s)" });
            }
            if (!seedSearchTemplateHasPlaceholder(nextTemplateRaw)) {
              return sendJson(response, 400, { ok: false, error: "searchUrlTemplate must include {q} or <zoekwoord>" });
            }
            next.searchUrlTemplate = nextTemplateRaw;
          } catch {
            return sendJson(response, 400, { ok: false, error: "Invalid searchUrlTemplate" });
          }
        }

        if (!next.baseUrl && !next.searchUrlTemplate) {
          return sendJson(response, 400, { ok: false, error: "baseUrl or searchUrlTemplate required (or clear=true)" });
        }

        overrides[channelId] = {
          ...(overrides[channelId] && typeof overrides[channelId] === "object" ? overrides[channelId] : {}),
          ...next,
        };
        await setChannelOverrides(overrides);
        return sendJson(response, 200, { ok: true, channelId, overrides: overrides[channelId] });
      } catch (error) {
        console.error("❌ Error in /api/admin/channel-override:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (/^\/api\/admin\/channels\/([^/]+)\/toggle$/.test(requestUrl.pathname) && request.method === "POST") {
      try {
        await requireAdmin(request);
        const channelId = sanitizeText(decodeURIComponent(requestUrl.pathname.split("/")[4] || ""));
        if (!channelId) return sendJson(response, 400, { ok: false, error: "channelId required" });

        const body = await readRequestBody(request);
        const channelKind = SEED_CHANNELS.some((ch) => ch.id === channelId) ? "seed" : "custom";
        const st = await getChannelEnabledState();
        const currentEnabled = channelKind === "seed" ? (st.seed[channelId] ?? Boolean(SEED_CHANNEL_DEFAULTS[channelId])) : (st.custom[channelId] ?? true);
        const nextEnabled = body.enabled !== undefined ? Boolean(body.enabled) : !currentEnabled;
        if (channelKind === "seed") st.seed[channelId] = nextEnabled;
        else st.custom[channelId] = nextEnabled;
        await setChannelEnabledState(st);
        return sendJson(response, 200, { ok: true, channelId, channelKind, enabled: nextEnabled });
      } catch (error) {
        console.error("❌ Error in /api/admin/channels/:channelId/toggle:", error.message);
        return sendJson(response, error.statusCode || 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/channel-enabled" && request.method === "POST") {
      console.log("🔧 /api/admin/channel-enabled called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);

        const channelKind = sanitizeText(body.channelKind || "");
        const channelId = sanitizeText(body.channelId || "");
        const enabled = Boolean(body.enabled);

        if (!channelKind || !channelId) {
          return sendJson(response, 400, { ok: false, error: "channelKind and channelId required" });
        }
        if (channelKind !== "seed" && channelKind !== "custom") {
          return sendJson(response, 400, { ok: false, error: "channelKind must be seed|custom" });
        }
        if (channelKind === "seed" && !SEED_CHANNELS.some((ch) => ch.id === channelId)) {
          return sendJson(response, 400, { ok: false, error: "Unknown seed channel" });
        }

        const st = await getChannelEnabledState();
        if (channelKind === "seed") st.seed[channelId] = enabled;
        else st.custom[channelId] = enabled;
        await setChannelEnabledState(st);
        return sendJson(response, 200, { ok: true, channelKind, channelId, enabled });
      } catch (error) {
        console.error("❌ Error in /api/admin/channel-enabled:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/approve-channel" && request.method === "POST") {
      console.log("✅ /api/admin/approve-channel called");

      try {
        await requireAdmin(request);

        let body = "";
        for await (const chunk of request) body += chunk.toString();
        const { channelId, status, reason } = JSON.parse(body);

        if (!channelId || !status) {
          return sendJson(response, 400, { ok: false, error: "channelId and status required" });
        }

        const nextStatus = sanitizeText(status);
        const reasonText = sanitizeText(reason || "").slice(0, 240);
        const nowIso = new Date().toISOString();

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const result = await pool.query("SELECT id, app_state FROM plately_users");

          let found = false;
          for (const row of result.rows) {
            const appState = typeof row.app_state === 'object' ? row.app_state : JSON.parse(row.app_state || '{}');
            const customChannels = Array.isArray(appState.customChannels) ? appState.customChannels : [];
            const channelIndex = customChannels.findIndex(ch => ch.id === channelId);
            if (channelIndex !== -1) {
              customChannels[channelIndex].status = nextStatus;
              customChannels[channelIndex].updatedAt = nowIso;
              if (nextStatus === "rejected") {
                customChannels[channelIndex].rejectedAt = nowIso;
                if (reasonText) customChannels[channelIndex].rejectedReason = reasonText;
              } else if (nextStatus === "approved") {
                customChannels[channelIndex].approvedAt = nowIso;
              }
              appState.customChannels = customChannels;
              await pool.query(
                "UPDATE plately_users SET app_state = $1 WHERE id = $2",
                [JSON.stringify(appState), row.id]
              );
              found = true;
              break;
            }
          }

          if (found) {
            return sendJson(response, 200, { ok: true, message: `Channel ${nextStatus}` });
          }
          return sendJson(response, 404, { ok: false, error: "Channel not found" });
        } else {
          // JSON file
          const rawFile = await fsp.readFile(DATA_FILE, "utf8");
          const parsed = JSON.parse(rawFile);

          let found = false;
          for (const [userId, user] of Object.entries(parsed.users || {})) {
            const customChannels = Array.isArray(user.customChannels) ? user.customChannels : [];
            const channelIndex = customChannels.findIndex(ch => ch.id === channelId);
            if (channelIndex !== -1) {
              customChannels[channelIndex].status = nextStatus;
              customChannels[channelIndex].updatedAt = nowIso;
              if (nextStatus === "rejected") {
                customChannels[channelIndex].rejectedAt = nowIso;
                if (reasonText) customChannels[channelIndex].rejectedReason = reasonText;
              } else if (nextStatus === "approved") {
                customChannels[channelIndex].approvedAt = nowIso;
              }
              user.customChannels = customChannels;
              found = true;
              break;
            }
          }

          if (found) {
            await fsp.writeFile(DATA_FILE, JSON.stringify(parsed, null, 2));
            return sendJson(response, 200, { ok: true, message: `Channel ${nextStatus}` });
          }
          return sendJson(response, 404, { ok: false, error: "Channel not found" });
        }
      } catch (error) {
        console.error("❌ Error in /api/admin/approve-channel:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/channel-test/search" && request.method === "POST") {
      console.log("🧪 /api/admin/channel-test/search called");
      const adminSearchT0 = Date.now();
      const adminSearchElapsedMs = () => Date.now() - adminSearchT0;
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);
        const query = sanitizeText(body.query || "");
        const channelKind = sanitizeText(body.channelKind || "seed"); // seed | custom
        const limitRaw = Number.parseInt(String(body.limit || ""), 10);
        const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 30) : 10;

        if (!query || query.length < 2) {
          return sendJson(response, 200, {
            ok: true,
            results: [],
            usedQuery: query,
            usedUrl: "",
            responseTimeMs: adminSearchElapsedMs(),
          });
        }

        if (channelKind === "custom") {
          const customChannel = body.customChannel && typeof body.customChannel === "object" ? body.customChannel : {};
          const id = sanitizeText(customChannel.id || "");
          const name = sanitizeText(customChannel.name || "");
          const url = sanitizeText(customChannel.url || "");
          if (!id || !name || !url) {
            return sendJson(response, 400, {
              ok: false,
              error: "customChannel (id,name,url) required",
              responseTimeMs: adminSearchElapsedMs(),
            });
          }
          const channelOverrides = await getChannelOverrides();
          const eff = getEffectiveCustomChannelConfig({ channelId: id, url }, channelOverrides);
          const usedUrl = buildSeedSearchUrlFromTemplate(eff.searchUrlTemplate, query);
          const results = isAhAllerhandeSearchUrl(eff.baseUrl) || isAhAllerhandeSearchUrl(usedUrl)
            ? await searchAHRecipes(query, Math.min(limit, 15), { searchUrlTemplate: eff.searchUrlTemplate })
            : await scrapeOrRestPublic(eff.baseUrl, name, id, usedUrl, parseWPStandard, Math.min(limit, 15), query, {
              relaxedQueryMatch: true,
              forceSerperFallback: true,
            });
          const slicedCustom = (results || []).slice(0, limit);
          const enrichedCustom =
            slicedCustom.length > 0 ? await enrichChannelSearchResultsWithRatings(slicedCustom) : slicedCustom;
          return sendJson(response, 200, {
            ok: true,
            results: enrichedCustom,
            searchBackendNote: channelSearchBackendNote(id, enrichedCustom.length),
            usedQuery: query,
            usedUrl,
            usedSearchUrlTemplate: sanitizeText(eff.searchUrlTemplate || ""),
            usedBaseUrl: sanitizeText(eff.baseUrl || ""),
            channelId: id,
            responseTimeMs: adminSearchElapsedMs(),
          });
        }

        const channelId = sanitizeText(body.channelId || "");
        if (!channelId) {
          return sendJson(response, 400, {
            ok: false,
            error: "channelId required",
            responseTimeMs: adminSearchElapsedMs(),
          });
        }

        const overrides = await getSeedChannelOverrides();
        const eff = getEffectiveSeedChannelConfig(channelId, overrides);
        let usedUrl = "";
        let results = [];
        const count = Math.min(limit, 15);

        if (channelId === "ch-ah") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await searchAHRecipes(query, count, { searchUrlTemplate: eff.searchUrlTemplate });
        } else if (channelId === "ch-jumbo") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await searchJumboRecipes(query, count, { searchUrlTemplate: eff.searchUrlTemplate });
        } else if (channelId === "ch-24k") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await scrapeOrRestPublic(
            eff.baseUrl || "https://www.24kitchen.nl",
            "24 Kitchen",
            "ch-24k",
            usedUrl,
            parse24Kitchen,
            count,
            query
          );
          if (!results || results.length === 0) {
            results = await search24KitchenFac(query, count, eff);
          }
        } else if (channelId === "ch-up") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await scrapeOrRestPublic(
            eff.baseUrl || "https://uitpaulineskeuken.nl",
            "Uit Paulines Keuken",
            "ch-up",
            usedUrl,
            parsePaulineSearch,
            count,
            query
          );
        } else if (channelId === "ch-les") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await scrapeOrRestPublic(eff.baseUrl || "https://www.lekkerensimpel.com", "Lekker & Simpel", "ch-les", usedUrl, parseLekkerSimpel, count, query);
        } else if (channelId === "ch-lb") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await scrapeOrRestPublic(eff.baseUrl || "https://www.laurasbakery.nl", "Laura's Bakery", "ch-lb", usedUrl, parseLaurasBakery, count, query);
        } else if (channelId === "ch-ek") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await scrapeOrRestPublic(eff.baseUrl || "https://www.eefkooktzo.nl", "Eef Kookt Zo", "ch-ek", usedUrl, parseWPStandard, count, query);
        } else if (channelId === "ch-clf") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await scrapeOrRestPublic(eff.baseUrl || "https://www.chickslovefood.com", "Chicks Love Food", "ch-clf", usedUrl, parseChicksLoveFood, count, query);
        } else if (channelId === "ch-culy") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await searchCulyRecipes(query, count, eff);
        } else if (channelId === "ch-mj") {
          usedUrl = buildSeedChannelSearchUrl(channelId, eff, query);
          results = await scrapeOrRestPublic(eff.baseUrl || "https://miljuschka.nl", "Miljuschka", "ch-mj", usedUrl, parseWPStandard, count, query);
        } else {
          const seed = SEED_CHANNELS.find((ch) => ch && ch.id === channelId) || {};
          const name = sanitizeText(seed.name || channelId);
          usedUrl = buildSeedSearchUrlFromTemplate(eff.searchUrlTemplate, query);
          results = await scrapeOrRestPublic(eff.baseUrl, name, channelId, usedUrl, parseWPStandard, count, query);
        }

        const slicedSeed = (results || []).slice(0, limit);
        const enrichedSeed =
          slicedSeed.length > 0 ? await enrichChannelSearchResultsWithRatings(slicedSeed) : slicedSeed;
        return sendJson(response, 200, {
          ok: true,
          results: enrichedSeed,
          searchBackendNote: channelSearchBackendNote(channelId, enrichedSeed.length),
          usedQuery: query,
          usedUrl,
          usedSearchUrlTemplate: sanitizeText(eff.searchUrlTemplate || ""),
          usedBaseUrl: sanitizeText(eff.baseUrl || ""),
          channelId,
          responseTimeMs: adminSearchElapsedMs(),
        });
      } catch (error) {
        console.error("❌ Error in /api/admin/channel-test/search:", error.message);
        return sendJson(response, 500, {
          ok: false,
          error: error.message,
          responseTimeMs: adminSearchElapsedMs(),
        });
      }
    }

    if (requestUrl.pathname === "/api/admin/channel-test/import" && request.method === "POST") {
      console.log("🧪 /api/admin/channel-test/import called");
      try {
        await requireAdmin(request);
        const body = await readRequestBody(request);
        const rawInput = sanitizeText(body.url || "");
        const urlMatch = rawInput.match(/https?:\/\/[^\s]+/);
        const cleanUrl = urlMatch ? urlMatch[0] : rawInput;
        if (!cleanUrl) {
          return sendJson(response, 400, { ok: false, error: "url required" });
        }
        const recipe = await importRecipe(cleanUrl, "", "");
        const title = sanitizeText(recipe?.title || "");
        const intro = sanitizeText(recipe?.description || recipe?.intro || "");
        const ingredientsRaw = Array.isArray(recipe?.ingredients) ? recipe.ingredients.filter(Boolean) : [];
        const stepsRaw = Array.isArray(recipe?.instructions) ? recipe.instructions.filter(Boolean) : [];
        const ingredients = ingredientsRaw.map((it) => {
          if (typeof it === "string") return { quantity: "", unit: "", name: it };
          return {
            quantity: sanitizeText(it.quantity || ""),
            unit: sanitizeText(it.unit || ""),
            name: sanitizeText(it.name || ""),
          };
        });
        const instructions = stepsRaw.map((s) => sanitizeText(typeof s === "string" ? s : s?.text || ""));
        const platform = sanitizeText(recipe?.platform || "");
        const channelId = sanitizeText(recipe?.channelId || "");
        const image = sanitizeText(recipe?.image || "");
        const sourceUrl = sanitizeText(recipe?.sourceUrl || cleanUrl);
        const author = sanitizeText(recipe?.author || "");
        const time = sanitizeText(String(recipe?.time || ""));
        const servings = sanitizeText(String(recipe?.servings || ""));
        const needsReview = Boolean(recipe?.needsReview);
        return sendJson(response, 200, {
          ok: true,
          recipe: {
            title,
            intro,
            ingredientsCount: ingredients.length,
            stepsCount: instructions.length,
            ingredients,
            instructions,
            platform,
            channelId,
            image,
            sourceUrl,
            author,
            time,
            servings,
            needsReview,
          },
        });
      } catch (error) {
        console.error("❌ Error in /api/admin/channel-test/import:", error.message);
        return sendJson(response, 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/users" && request.method === "GET") {
      try {
        await requireAdmin(request);
        let users = [];
        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const result = await pool.query("SELECT id, email, created_at, profile, app_state FROM plately_users ORDER BY created_at DESC");
          users = result.rows.map((row) => {
            const profile = typeof row.profile === "object" ? row.profile : JSON.parse(row.profile || "{}");
            const appState = typeof row.app_state === "object" ? row.app_state : JSON.parse(row.app_state || "{}");
            return {
              id: row.id,
              email: row.email,
              createdAt: row.created_at,
              recipeCount: Array.isArray(appState.importedRecipes) ? appState.importedRecipes.length : 0,
              active: profile.active !== false,
            };
          });
        } else {
          const db = await loadDatabase();
          users = Object.entries(db.users || {}).map(([id, u]) => ({
            id,
            email: u.email || "",
            createdAt: u.createdAt || null,
            recipeCount: Array.isArray(u.importedRecipes) ? u.importedRecipes.length : 0,
            active: u.active !== false,
          }));
        }
        return sendJson(response, 200, { ok: true, users });
      } catch (error) {
        console.error("❌ Error in /api/admin/users:", error.message);
        return sendJson(response, error.statusCode || 500, { ok: false, error: error.message });
      }
    }

    if (/^\/api\/admin\/users\/([^/]+)\/deactivate$/.test(requestUrl.pathname) && request.method === "POST") {
      try {
        await requireAdmin(request);
        const userId = sanitizeText(decodeURIComponent(requestUrl.pathname.split("/")[4] || ""));
        if (!userId) return sendJson(response, 400, { ok: false, error: "userId required" });

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const result = await pool.query("SELECT profile FROM plately_users WHERE id = $1 LIMIT 1", [userId]);
          if (!result.rows.length) return sendJson(response, 404, { ok: false, error: "Gebruiker niet gevonden." });
          const profile = typeof result.rows[0].profile === "object" ? result.rows[0].profile : JSON.parse(result.rows[0].profile || "{}");
          profile.active = false;
          await pool.query("UPDATE plately_users SET profile = $2::jsonb, updated_at = NOW() WHERE id = $1", [userId, JSON.stringify(profile)]);
        } else {
          const db = await loadDatabase();
          if (!db.users?.[userId]) return sendJson(response, 404, { ok: false, error: "Gebruiker niet gevonden." });
          db.users[userId].active = false;
          await persistDatabase();
        }
        return sendJson(response, 200, { ok: true, userId, active: false });
      } catch (error) {
        console.error("❌ Error in /api/admin/users/:id/deactivate:", error.message);
        return sendJson(response, error.statusCode || 500, { ok: false, error: error.message });
      }
    }

    if (/^\/api\/admin\/users\/[^/]+$/.test(requestUrl.pathname) && request.method === "DELETE") {
      try {
        await requireAdmin(request);
        const userId = sanitizeText(decodeURIComponent(requestUrl.pathname.split("/")[4] || ""));
        if (!userId) return sendJson(response, 400, { ok: false, error: "userId required" });

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          await pool.query("DELETE FROM plately_auth_sessions WHERE user_id = $1", [userId]);
          await pool.query("DELETE FROM plately_users WHERE id = $1", [userId]);
        } else {
          const db = await loadDatabase();
          if (db.users?.[userId]) delete db.users[userId];
          if (db.authSessions) {
            for (const token of Object.keys(db.authSessions)) {
              if (db.authSessions[token]?.userId === userId) delete db.authSessions[token];
            }
          }
          await persistDatabase();
        }
        return sendJson(response, 200, { ok: true, userId });
      } catch (error) {
        console.error("❌ Error in DELETE /api/admin/users/:id:", error.message);
        return sendJson(response, error.statusCode || 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/channel-stats" && request.method === "GET") {
      try {
        await requireAdmin(request);
        const channelMap = new Map();

        if (isPostgresEnabled()) {
          await ensurePostgresSchema();
          const pool = await getPostgresPool();
          const result = await pool.query("SELECT app_state FROM plately_users");
          for (const row of result.rows) {
            const appState = typeof row.app_state === "object" ? row.app_state : JSON.parse(row.app_state || "{}");
            for (const recipe of Array.isArray(appState.importedRecipes) ? appState.importedRecipes : []) {
              let domain = "";
              try { domain = new URL(recipe.sourceUrl || "").hostname.replace(/^www\./, ""); } catch { domain = "onbekend"; }
              if (!domain) domain = "onbekend";
              channelMap.set(domain, (channelMap.get(domain) || 0) + 1);
            }
          }
        } else {
          const db = await loadDatabase();
          for (const user of Object.values(db.users || {})) {
            for (const recipe of Array.isArray(user.importedRecipes) ? user.importedRecipes : []) {
              let domain = "";
              try { domain = new URL(recipe.sourceUrl || "").hostname.replace(/^www\./, ""); } catch { domain = "onbekend"; }
              if (!domain) domain = "onbekend";
              channelMap.set(domain, (channelMap.get(domain) || 0) + 1);
            }
          }
        }

        const total = Array.from(channelMap.values()).reduce((a, b) => a + b, 0) || 1;
        const channels = Array.from(channelMap.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([domain, count]) => ({ domain, count, percentage: Math.round((count / total) * 1000) / 10 }));

        return sendJson(response, 200, { ok: true, channels, total });
      } catch (error) {
        console.error("❌ Error in /api/admin/channel-stats:", error.message);
        return sendJson(response, error.statusCode || 500, { ok: false, error: error.message });
      }
    }

    if (requestUrl.pathname === "/api/admin/logs" && request.method === "GET") {
      try {
        const fs = require("fs");
        const os = require("os");
        const path = require("path");
        const lines = parseInt(requestUrl.searchParams.get("lines") || "200", 10);
        const pm2LogDir = path.join(os.homedir(), ".pm2", "logs");
        const candidates = ["plately-beta-out.log", "plately-beta-error.log", "plately-out.log", "plately-error.log"];
        const result = {};
        for (const name of candidates) {
          const fullPath = path.join(pm2LogDir, name);
          try {
            const stat = fs.statSync(fullPath);
            if (stat.isFile()) {
              const size = stat.size;
              const fd = fs.openSync(fullPath, "r");
              let readSize = Math.min(size, lines * 200);
              let buf = Buffer.alloc(readSize);
              fs.readSync(fd, buf, 0, readSize, Math.max(0, size - readSize));
              fs.closeSync(fd);
              const text = buf.toString("utf8");
              const allLines = text.split("\n");
              // Drop first line (may be partial), take last `lines` lines
              result[name] = allLines.slice(allLines.length > 1 ? 1 : 0).slice(-lines).join("\n");
            }
          } catch {
            // file doesn't exist or unreadable
          }
        }
        return sendJson(response, 200, { ok: true, logs: result });
      } catch (err) {
        return sendJson(response, 500, { ok: false, error: err.message });
      }
    }

    await serveStaticFile(requestUrl.pathname, response, request);
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

if (require.main === module) {
  resolveWritableDataPathsOnce()
    .catch((e) => console.error("[boot] DATA_DIR-resolve:", e?.message || e))
    .finally(() => {
      server.listen(PORT, () => {
        console.log(`Plately draait op http://localhost:${PORT}`);
      });
    });
}

module.exports = {
  stripSocialNoise,
  stripSocialUiArtifacts,
  __dev: {
    buildSeedSearchUrlFromTemplate,
    buildSeedChannelSearchUrl,
    getSeedChannelSearchUrlTemplate,
    getEffectiveSeedChannelConfig,
    getEffectiveCustomChannelConfig,
    getSeedChannelOverrides,
    getChannelOverrides,
    finalizeInstructionSteps,
    mergeInstructionLines,
    importWebsite,
    importRecipe,
    parseWebsiteRecipe,
    findRecipeJsonLd,
    isAhAllerhandeRecipeUrl,
    ahSeoBackfillResultMatchesQuery,
    urlLooksLikeRecipe,
  },
};
