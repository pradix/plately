#!/usr/bin/env bash
# Plately VPS deploy vanaf main. PM2-only, zonder systemd fallback.
# Optionele env:
#   PLATELY_DEPLOY_BRANCH   Git branch om te deployen (default: main)
#   PLATELY_PM2_NAME        PM2 process naam (default: plately-beta)
#   PLATELY_BROWSER_FALLBACK=0  sla Playwright Chromium install over

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

BRANCH="${PLATELY_DEPLOY_BRANCH:-main}"
PM2_NAME="${PLATELY_PM2_NAME:-plately-beta}"

echo "==> Plately deploy — $ROOT (branch: $BRANCH, pm2: $PM2_NAME)"

git fetch origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

COMMIT="$(git rev-parse HEAD)"
REF_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
NOW="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

node -e "
const fs = require('fs');
const o = {
  gitCommit: process.argv[1],
  gitBranch: process.argv[2],
  deployedAt: process.argv[3],
  message: 'deploy-main.sh',
};
fs.writeFileSync('deploy-revision.json', JSON.stringify(o) + '\n', 'utf8');
" "$COMMIT" "$REF_BRANCH" "$NOW"
chmod 644 deploy-revision.json
echo "==> deploy-revision.json → $COMMIT ($REF_BRANCH) @ $NOW"

if [[ -f package.json ]]; then
  echo "==> Dependencies (production)"
  npm ci --omit=dev || npm install --omit=dev
  if [[ "${PLATELY_BROWSER_FALLBACK:-1}" != "0" ]]; then
    echo "==> Browser fallback (Playwright Chromium)"
    npx playwright install chromium || echo "⚠️ Playwright Chromium install mislukt; browser fallback wordt overgeslagen tot Chromium beschikbaar is."
  fi
fi

echo "==> Herstart PM2 process: $PM2_NAME"
pm2 restart "$PM2_NAME" --update-env
pm2 save

echo "==> Klaar."
