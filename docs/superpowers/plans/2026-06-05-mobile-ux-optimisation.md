# Mobile UX Optimisation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 6 mobile UX issues on limelogicstudio.com — snappier card reveals, disabled hero parallax on mobile, better scroll-reveal triggering, animated portfolio tap-expand, service row tap feedback, and tighter section header stagger on small screens.

**Architecture:** Pure vanilla CSS + JS edits — two files only (`css/style.css`, `js/main.js`). No dependencies, no build step. Changes are surgical: find each block, replace it exactly. Deploy via Wrangler Pages after both files are patched.

**Tech Stack:** Vanilla HTML/CSS/JS · Cloudflare Pages · Wrangler CLI (`npx wrangler`)

**Spec:** `docs/superpowers/specs/2026-06-05-mobile-ux-design.md`

**Project root:** `/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website`

---

## Files

| File | Changes |
|---|---|
| `css/style.css` | 3 hunks: animation duration, expand panel, :active tap state |
| `js/main.js` | 4 hunks: stagger delays + cap, parallax guard, observer threshold, header stagger |

---

## Task 1 — CSS: animation duration (Fix 1)

**File:** `css/style.css` lines ~1347–1351

- [ ] **Step 1: Find the reveal animation block**

```bash
grep -n "drift-up 0.70s" "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website/css/style.css"
```

Expected output: one line with the animation declaration inside `.reveal.visible`.

- [ ] **Step 2: Replace the two duration lines**

Find this exact block:
```css
.reveal.visible{
  animation:drift-up 0.70s cubic-bezier(0.2,0.8,0.2,1) var(--reveal-delay,0ms) both}
/* Cards + row elements get a slightly snappier duration */
.reveal.reveal-card.visible{animation-duration:0.65s}
```

Replace with:
```css
.reveal.visible{
  animation:drift-up 0.42s cubic-bezier(0.2,0.8,0.2,1) var(--reveal-delay,0ms) both}
.reveal.reveal-card.visible{animation-duration:0.42s}
```

---

## Task 2 — CSS: portfolio expand panel transition (Fix 4)

**File:** `css/style.css` lines ~589–603

- [ ] **Step 1: Find the pi-inline block**

```bash
grep -n "pi-inline{" "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website/css/style.css"
```

Expected: one match near line 590.

- [ ] **Step 2: Replace pi-inline display:none with max-height transition**

Find this exact block (preserving surrounding whitespace):
```css
.port-index .pi-inline{display:none;grid-column:1/-1;
  margin-top:18px;padding:18px;border-radius:6px;
  background:rgba(15,15,15,0.7);
  border:1px solid rgba(168,255,62,0.25);
  flex-direction:row;gap:18px}
.port-index li.is-expanded .pi-inline{display:flex}
```

Replace with:
```css
.port-index .pi-inline{grid-column:1/-1;
  margin-top:0;padding:0 18px;border-radius:6px;
  background:rgba(15,15,15,0.7);
  border:1px solid transparent;
  flex-direction:row;gap:18px;
  display:flex;
  max-height:0;opacity:0;overflow:hidden;
  transition:max-height .35s cubic-bezier(0.2,0.8,0.2,1),
             opacity .25s ease,
             margin-top .35s ease,
             padding .35s ease,
             border-color .25s ease;
  pointer-events:none}
.port-index li.is-expanded .pi-inline{
  max-height:600px;opacity:1;
  margin-top:18px;padding:18px;
  border-color:rgba(168,255,62,0.25);
  pointer-events:auto}
```

---

## Task 3 — CSS: service row :active tap feedback (Fix 5)

**File:** `css/style.css` — after the `.svc-numbered .item:hover` rules

- [ ] **Step 1: Find the hover rules to insert after**

```bash
grep -n "svc-numbered .item:hover" "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website/css/style.css"
```

Expected: two matches (one plain, one `.s-services` prefixed).

- [ ] **Step 2: Insert :active rules immediately after those hover lines**

Find this exact block:
```css
.svc-numbered .item:hover{padding-left:38px}
.s-services .svc-numbered .item:hover{background:rgba(15,15,15,0.55);
  border-color:rgba(168,255,62,0.3)}
```

Replace with:
```css
.svc-numbered .item:hover{padding-left:38px}
.s-services .svc-numbered .item:hover{background:rgba(15,15,15,0.55);
  border-color:rgba(168,255,62,0.3)}
.svc-numbered .item:active{background:rgba(168,255,62,0.06);border-color:rgba(168,255,62,0.2)}
.s-services .svc-numbered .item:active{background:rgba(168,255,62,0.08);border-color:rgba(168,255,62,0.3)}
```

---

## Task 4 — Commit CSS changes

- [ ] **Step 1: Verify only style.css changed**

```bash
git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" diff --stat
```

Expected: only `css/style.css` listed.

- [ ] **Step 2: Commit**

```bash
git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" add css/style.css && git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" commit -m "$(cat <<'EOF'
fix(mobile): snappier reveal animation, animated expand panel, :active tap feedback

- Reduce drift-up from 0.70s to 0.42s (both reveal + reveal-card)
- Replace display:none toggle on .pi-inline with max-height/opacity transition
- Add :active state to service rows for touch tap feedback

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5 — JS: stagger delays + 160ms cap (Fix 1)

**File:** `js/main.js` — `initScrollReveal()` function

- [ ] **Step 1: Find the STAGGER_GROUPS declaration**

```bash
grep -n "STAGGER_GROUPS" "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website/js/main.js"
```

Expected: 2 matches — declaration and forEach call.

- [ ] **Step 2: Replace STAGGER_GROUPS delays**

Find:
```js
  var STAGGER_GROUPS = [
    { selector: '#portIndex li', delay: 60, card: false },
    { selector: '#servicesNumbered .item',   delay: 60, card: true  },
    { selector: '.proof-card',               delay: 80, card: true  },
    { selector: '.process-step',             delay: 80, card: true  },
  ];
```

Replace with:
```js
  var STAGGER_GROUPS = [
    { selector: '#portIndex li',             delay: 40, card: false },
    { selector: '#servicesNumbered .item',   delay: 40, card: true  },
    { selector: '.proof-card',               delay: 40, card: true  },
    { selector: '.process-step',             delay: 40, card: true  },
  ];
```

- [ ] **Step 3: Apply 160ms cap on the delay setter**

Find:
```js
      el.style.setProperty('--reveal-delay', (i * group.delay) + 'ms');
```

Replace with:
```js
      el.style.setProperty('--reveal-delay', Math.min(i * group.delay, 160) + 'ms');
```

---

## Task 6 — JS: disable hero parallax on mobile (Fix 2)

**File:** `js/main.js` — `initHeroParallax()` function

- [ ] **Step 1: Find the function**

```bash
grep -n "initHeroParallax" "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website/js/main.js"
```

Expected: definition + call site.

- [ ] **Step 2: Add mobile guard**

Find:
```js
function initHeroParallax() {
  var headline = document.getElementById('heroHeadline');
  if (!headline) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('scroll', function() {
```

Replace with:
```js
function initHeroParallax() {
  var headline = document.getElementById('heroHeadline');
  if (!headline) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 880) return;
  window.addEventListener('scroll', function() {
```

---

## Task 7 — JS: observer threshold (Fix 3)

**File:** `js/main.js` — `initScrollReveal()` — IntersectionObserver constructor

- [ ] **Step 1: Find the observer**

```bash
grep -n "threshold: 0.08" "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website/js/main.js"
```

Expected: one match.

- [ ] **Step 2: Update threshold and add rootMargin**

Find:
```js
  }, { threshold: 0.08 });
```

Replace with:
```js
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
```

---

## Task 8 — JS: tighten section header stagger on mobile (Fix 6)

**File:** `js/main.js` — `initScrollReveal()` — HEADER_SELECTORS declaration

- [ ] **Step 1: Find the HEADER_SELECTORS block**

```bash
grep -n "HEADER_SELECTORS" "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website/js/main.js"
```

Expected: declaration + forEach call.

- [ ] **Step 2: Replace with mobile-aware delays**

Find:
```js
  var HEADER_SELECTORS = [
    { sel: '.sec-head .eyebrow',   delay: 0   },
    { sel: '.sec-head .h-section', delay: 80  },
    { sel: '.sec-head .right',     delay: 160 },
  ];
```

Replace with:
```js
  var isMobile = window.innerWidth <= 640;
  var HEADER_SELECTORS = [
    { sel: '.sec-head .eyebrow',   delay: 0                    },
    { sel: '.sec-head .h-section', delay: isMobile ? 50 : 80  },
    { sel: '.sec-head .right',     delay: isMobile ? 100 : 160 },
  ];
```

---

## Task 9 — Commit JS changes

- [ ] **Step 1: Verify only main.js changed**

```bash
git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" diff --stat
```

Expected: only `js/main.js` listed.

- [ ] **Step 2: Commit**

```bash
git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" add js/main.js && git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" commit -m "$(cat <<'EOF'
fix(mobile): snappier stagger cap, disable parallax on touch, better reveal threshold, mobile header timing

- Reduce stagger delays to 40ms, hard-cap at 160ms max
- Skip hero parallax on coarse pointer / width <= 880px
- Raise IntersectionObserver threshold 0.08 → 0.15, add -40px rootMargin
- Section header stagger: 0/50/100ms on mobile vs 0/80/160ms on desktop

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 10 — Deploy to Cloudflare Pages

- [ ] **Step 1: Deploy**

```bash
cd "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" && npx wrangler pages deploy . --project-name=limelogicstudio-website --branch=main --commit-dirty=true
```

Expected output: lines ending in `✨ Deployment complete!` with a `limelogicstudio.com` URL.

If deploy fails with a 502 or upload error, VPN may be off — note this in the session log and stop here.

---

## Task 11 — Verify

- [ ] **Step 1: Confirm site is live**

```bash
curl -sI https://limelogicstudio.com | head -5
```

Expected: `HTTP/2 200` in first line.

- [ ] **Step 2: Confirm JS file updated**

```bash
curl -s https://limelogicstudio.com/js/main.js | grep -c "threshold: 0.15"
```

Expected: `1`

- [ ] **Step 3: Confirm CSS file updated**

```bash
curl -s https://limelogicstudio.com/css/style.css | grep -c "0.42s"
```

Expected: `1` or more (the 0.42s duration appears in multiple rules).

- [ ] **Step 4: Write session log**

Create session log at:
`/Users/homebass/Akashic Records/LimeLogic/Claude/Sessions/2026-06-05 limelogicstudio.com — Mobile UX Optimisation.md`

Use template at `LimeLogic/Claude/Templates/Claude Session.md`. Record:
- All 6 fixes implemented
- Both files changed: `css/style.css`, `js/main.js`
- Deploy confirmed at step above
- Open threads: real testimonials still pending; animated logo loader still pending
