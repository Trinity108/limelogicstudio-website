# Deploying limelogicstudio.com

**Host:** Cloudflare **Pages** project `limelogicstudio-website` (direct upload — NOT connected to GitHub).
**Live:** https://limelogicstudio.com · alias: https://limelogicstudio-website.pages.dev
**Production branch:** `main`

## The only correct deploy command

```bash
./deploy.sh
```

The script stages a **whitelist** of public files into `dist/` and deploys that folder.
Never run `wrangler pages deploy .` from the project root — that uploaded `docs/`,
`DEPLOY.md`, and `.superpowers/` to the public internet (caught in the 2026-06-12 audit).
If you add a new public file or image, add it to the whitelist in `deploy.sh`.

## Do NOT

- **Do NOT run `wrangler pages deploy .`** (project root). Internal docs ship publicly. Use `./deploy.sh`.
- **Do NOT run `wrangler deploy`.** That reads a Workers config and ships a redundant **Worker**, which is *not* the live site. A stray Worker created this way leaked raw `.git` on its `*.workers.dev` URL; it was deleted 2026-05-29. This project intentionally has **no `wrangler.jsonc`** — pass flags instead.
- **Do NOT rely on `git push`.** Pages is not GitHub-connected, so pushing changes nothing on the live domain. (Pushing to keep the repo in sync is fine; it just doesn't deploy.)

## Verify every deploy

```bash
curl -s "https://limelogicstudio.com/?cb=$(date +%s)" | grep -i clash-display    # font present
curl -s "https://limelogicstudio.com/.git/config" | head -1                       # must be 404/html, NOT [core]
curl -s -o /dev/null -w "%{http_code}\n" "https://limelogicstudio.com/DEPLOY.md"  # must be 404
curl -sI "https://limelogicstudio.com/assets/images/og-image.jpg" | grep -i content-type  # image/jpeg
```
