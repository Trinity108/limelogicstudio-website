#!/usr/bin/env bash
# Deploy limelogicstudio.com — stages ONLY public files into dist/ then ships it.
# Whitelist staging exists because `wrangler pages deploy .` uploaded the whole
# project folder, putting docs/, DEPLOY.md and .superpowers/ on the public
# internet (found in the 2026-06-12 audit). Never deploy from the project root.
set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
mkdir -p dist/assets/images

# Pages + config
cp index.html privacy.html terms.html 404.html _headers dist/

# Styles, scripts, fonts, video
cp -R css js dist/
cp -R assets/fonts assets/video dist/assets/

# Images — referenced files only. The original limedroid-hero.jpg stays until
# cached HTML pointing at it (4h TTL) has expired everywhere.
for f in og-image.jpg \
         limedroid-hero-1920.webp \
         limedroid-hero-1280.webp \
         limedroid-hero.jpg \
         logo-symbol.png; do
  cp "assets/images/$f" dist/assets/images/
done

find dist -name ".DS_Store" -delete

npx wrangler pages deploy dist --project-name=limelogicstudio-website --branch=main --commit-dirty=true
