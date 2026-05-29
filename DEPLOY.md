# Deploying limelogicstudio.com

**Host:** Cloudflare **Pages** project `limelogicstudio-website` (direct upload — NOT connected to GitHub).
**Live:** https://limelogicstudio.com · alias: https://limelogicstudio-website.pages.dev
**Production branch:** `main`

## The only correct deploy command

```bash
npx wrangler pages deploy . --project-name=limelogicstudio-website --branch=main --commit-dirty=true
```

Cloudflare Pages automatically ignores `.git`, `node_modules`, and `.wrangler` — they are not uploaded.

## Do NOT

- **Do NOT run `wrangler deploy`.** That reads a Workers config and ships a redundant **Worker**, which is *not* the live site. A stray Worker created this way leaked raw `.git` on its `*.workers.dev` URL; it was deleted 2026-05-29. This project intentionally has **no `wrangler.jsonc`** — pass flags instead.
- **Do NOT rely on `git push`.** Pages is not GitHub-connected, so pushing changes nothing on the live domain. (Pushing to keep the repo in sync is fine; it just doesn't deploy.)

## Verify every deploy

```bash
curl -s "https://limelogicstudio.com/?cb=$(date +%s)" | grep -i clash-display   # font present
curl -s "https://limelogicstudio.com/.git/config" | head -1                      # must be <!doctype html> (catch-all), NOT [core]
```
