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
export GIT_COMMIT="$(git rev-parse --short HEAD)"

install_runtime_deps() {
  if [ -f package-lock.json ]; then
    npm ci --omit=dev --no-audit --no-fund
  else
    npm install --omit=dev --no-audit --no-fund
  fi
}

verify_runtime_deps() {
  node - <<'NODE'
const required = ["pg", "nodemailer", "web-push"];
for (const mod of required) {
  require.resolve(mod);
}
console.log(`Runtime dependencies OK: ${required.join(", ")}`);
NODE
}

install_runtime_deps
if ! verify_runtime_deps; then
  echo "Runtime dependencies are incomplete; rebuilding node_modules once." >&2
  rm -rf node_modules
  install_runtime_deps
  verify_runtime_deps
fi

node --check server.js
node --check app.js

pm2 startOrReload ecosystem.config.js --update-env
pm2 save

echo "==> Health check"
for attempt in 1 2 3 4 5; do
  if curl -fsS "https://app.plately.nl/api/health" >/dev/null; then
    break
  fi
  if [ "$attempt" = "5" ]; then
    echo "Health check failed after $attempt attempts." >&2
    exit 1
  fi
  sleep 2
done
echo "Deploy complete."
