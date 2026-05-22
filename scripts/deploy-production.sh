#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/plately}"
BRANCH="${BRANCH:-main}"
PM2_APP="${PM2_APP:-plately-beta}"

cd "$APP_DIR"

echo "==> Plately deploy — $APP_DIR (branch: $BRANCH, pm2: $PM2_APP)"
git fetch --prune origin "$BRANCH"

# Runtime files such as data/ah_token.json are intentionally mutable on the VPS.
# Keep deploys fast-forwardable without touching unrelated local diagnostics.
git restore --worktree --staged data/ah_token.json 2>/dev/null || true

git switch "$BRANCH"
git merge --ff-only "origin/$BRANCH"

if [ -f package-lock.json ]; then
  npm ci --omit=dev
else
  npm install --omit=dev
fi

node --check server.js
node --check app.js

pm2 startOrReload ecosystem.config.js --update-env
pm2 save

echo "==> Health check"
curl -fsS "https://app.plately.nl/api/health" >/dev/null
echo "Deploy complete."
