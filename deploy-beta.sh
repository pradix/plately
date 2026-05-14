#!/usr/bin/env bash
# Plately beta-deploy op de VPS. GitHub Actions roept dit pad aan: /var/www/plately/deploy-beta.sh
# Vereist: git repo op deze machine, Node/npm voor JSON + dependencies.
#
# Optionele omgevingsvariabelen:
#   PLATELY_DEPLOY_BRANCH   Git branch om te pullen (default: beta)
#   PLATELY_GIT_DIR         Map met .git als die niet gelijk is aan de app-map (server.js).
#                           sudo systemctl restart plately
#                           of: pm2 restart plately

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

BRANCH="${PLATELY_DEPLOY_BRANCH:-beta}"

echo "==> Plately deploy — $ROOT (branch: $BRANCH)"

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
  message: 'deploy-beta.sh',
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
    npx playwright install chromium || echo "⚠️ Playwright Chromium install mislukt; AH browser fallback wordt overgeslagen tot Chromium beschikbaar is."
  fi
fi

if [[ -n "${PLATELY_POST_DEPLOY_CMD:-}" ]]; then
  echo "==> Herstart (PLATELY_POST_DEPLOY_CMD)"
  bash -lc "$PLATELY_POST_DEPLOY_CMD"
else
  echo "==> Herstart systemd service: plately"
  sudo systemctl restart plately
fi

echo "==> Klaar."
