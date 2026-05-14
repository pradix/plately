#!/usr/bin/env bash
# Backwards-compatible wrapper. Gebruik voortaan ./deploy-main.sh.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLATELY_DEPLOY_BRANCH="${PLATELY_DEPLOY_BRANCH:-main}" exec "$ROOT/deploy-main.sh"
