#!/usr/bin/env bash
# Backwards-compatible wrapper. Gebruik voortaan ./scripts/deploy-production.sh.
# Optionele env:
#   PLATELY_DEPLOY_BRANCH   Git branch om te deployen (default: main)
#   PLATELY_PM2_NAME        PM2 process naam (default: plately-beta)
#   PLATELY_BROWSER_FALLBACK=0  sla Playwright Chromium install over

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANCH="${PLATELY_DEPLOY_BRANCH:-main}" PM2_APP="${PLATELY_PM2_NAME:-plately-beta}" exec "$ROOT/scripts/deploy-production.sh"
