#!/usr/bin/env node
/**
 * Haal een nieuw AH anoniem token op en print de SSH-opdracht om het op de VPS in te stellen.
 * Voer dit lokaal uit als het token verlopen is (~elke 7 dagen).
 *
 * Gebruik: node scripts/refresh-ah-token.js
 */

const VPS = process.env.PLATELY_VPS || "xidarideas@149.210.174.51";
const APP_DIR = process.env.PLATELY_APP_DIR || "/var/www/plately";

async function main() {
  console.log("🔑 AH token ophalen...");
  const res = await fetch("https://api.ah.nl/mobile-auth/v1/auth/token/anonymous", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId: "appie" }),
  });
  if (!res.ok) {
    console.error(`❌ Mislukt: HTTP ${res.status}`);
    process.exit(1);
  }
  const data = await res.json();
  const token = data.access_token;
  const expiresInDays = Math.round((data.expires_in || 0) / 86400);
  console.log(`✅ Token opgehaald (geldig ~${expiresInDays} dagen)\n`);
  console.log("Voer dit uit op de VPS om het token in te stellen:\n");
  console.log(`ssh ${VPS} "cd ${APP_DIR} && pm2 restart plately-beta --update-env AH_ANONYMOUS_TOKEN='${token}'"`);
  console.log("\nOf via /etc/environment (persistenter):");
  console.log(`ssh ${VPS} "sed -i '/^AH_ANONYMOUS_TOKEN=/d' /etc/environment && echo \\"AH_ANONYMOUS_TOKEN=${token}\\" >> /etc/environment && source /etc/environment && cd ${APP_DIR} && pm2 restart plately-beta --update-env"`);
}

main().catch((err) => { console.error(err); process.exit(1); });
