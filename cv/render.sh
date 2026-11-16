#!/bin/sh
# Renders cv/src/cv-<lang>.html to cv/Andres-del-Toro-Cruz-CV-<LANG>.pdf
# with any installed Chromium browser (Chrome, Brave, Edge, Chromium).
set -eu
cd "$(dirname "$0")"
python3 build_cv.py

for app in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium"; do
  if [ -x "$app" ]; then BROWSER="$app"; break; fi
done
: "${BROWSER:?No Chromium-based browser found}"

for lang in en es pt; do
  upper=$(echo "$lang" | tr '[:lower:]' '[:upper:]')
  "$BROWSER" --headless=new --disable-gpu --no-pdf-header-footer \
    --user-data-dir="${TMPDIR:-/tmp}/cv-render-profile" \
    --print-to-pdf="$PWD/Andres-del-Toro-Cruz-CV-$upper.pdf" \
    "file://$PWD/src/cv-$lang.html" 2>/dev/null
  echo "rendered Andres-del-Toro-Cruz-CV-$upper.pdf"
done
