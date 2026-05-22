#!/usr/bin/env bash
# Backwards-compatible wrapper. Gebruik voortaan ./scripts/deploy-production.sh.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANCH="${PLATELY_DEPLOY_BRANCH:-main}" exec "$ROOT/scripts/deploy-production.sh"
