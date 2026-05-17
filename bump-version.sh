#!/usr/bin/env bash
# Bump Plately build version, commit en push.
# Gebruik: ./bump-version.sh
# Past aan: index.html (meta + CSS/JS refs), service-worker.js
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

# Lees huidige versie uit index.html
CURRENT=$(grep -o 'plately-build" content="[^"]*"' index.html | grep -o '[0-9][^"]*')
if [[ -z "$CURRENT" ]]; then
  echo "❌ Kan huidige versie niet lezen uit index.html"; exit 1
fi

# Splits op punten en bump het laatste getal
IFS='.' read -ra PARTS <<< "$CURRENT"
LAST=$(( ${PARTS[${#PARTS[@]}-1]} + 1 ))
PARTS[${#PARTS[@]}-1]=$LAST
NEW=$(IFS='.'; echo "${PARTS[*]}")

echo "==> Versie: $CURRENT → $NEW"

# index.html: meta tag
sed -i '' "s/plately-build\" content=\"$CURRENT\"/plately-build\" content=\"$NEW\"/" index.html

# index.html: CSS/JS query params (alle ?v=CURRENT vervangen)
sed -i '' "s/?v=$CURRENT/?v=$NEW/g" index.html

# service-worker.js: SW versie
sed -i '' "s/__PLATELY_SW_VERSION__ = \"$CURRENT\"/__PLATELY_SW_VERSION__ = \"$NEW\"/" service-worker.js

echo "==> Gewijzigd: index.html, service-worker.js"

# Commit en push
git add index.html service-worker.js
git commit -m "Bump version $CURRENT → $NEW"
git push origin main

echo "==> Klaar. Voer op de server uit:"
echo "    cd /var/www/plately && git pull && pm2 restart plately-beta"
