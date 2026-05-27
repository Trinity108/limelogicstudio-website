# Scroll Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Editorial Drift scroll-reveal animations to headlines, portfolio rows, service items, proof cards, process steps, and contact lede across the LimeLogic website.

**Architecture:** Extend the existing IntersectionObserver reveal system. Replace the current CSS transition on `.reveal` with a `drift-up` keyframe animation. Add an auto-tagging phase to `initScrollReveal()` that stamps `.reveal` and `--reveal-delay` onto the target elements at init time, keeping HTML clean.

**Tech Stack:** Vanilla CSS (keyframes + custom properties), Vanilla JS (IntersectionObserver). Zero new dependencies.

---

## Files

| File | Change |
|------|--------|
| `css/style.css` | Replace `.reveal` transition with `drift-up` keyframe animation; update `prefers-reduced-motion` block |
| `js/main.js` | Rewrite `initScrollReveal()` — add auto-tagging phase, lower threshold to 0.08 |

---

## Task 1: Replace `.reveal` CSS with Editorial Drift keyframe

**File:** `css/style.css` — lines 1299–1307

- [ ] **Step 1.1 — Replace the existing `.reveal` block**

Find this exact block in `css/style.css`:

```css
/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL — Intersection Observer, no libraries
   ───────────────────────────────────────────────────────────── */
.reveal{opacity:0;transform:translateY(24px);
  transition:opacity .55s ease, transform .55s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
@media (prefers-reduced-motion:reduce){
  .reveal{opacity:1;transform:none;transition:none}
}
```

Replace it with:

```css
/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL — Editorial Drift keyframe, no libraries
   drift-up fires once via IntersectionObserver. --reveal-delay
   controls per-element stagger (set by initScrollReveal in JS).
   ───────────────────────────────────────────────────────────── */
@keyframes drift-up{
  from{opacity:0;transform:translateY(22px)}
  to{opacity:1;transform:translateY(0)}
}
/* Hidden before observer fires */
.reveal{opacity:0;transform:translateY(22px)}
/* Animation fires on .visible — fill:both holds end state + hides during delay */
.reveal.visible{
  animation:drift-up 0.60s cubic-bezier(0.2,0.8,0.2,1) var(--reveal-delay,0ms) both}
/* Cards + row elements get a slightly snappier duration */
.reveal.reveal-card.visible{animation-duration:0.55s}
/* Accessibility: cancel all animation for reduced-motion preference */
@media (prefers-reduced-motion:reduce){
  .reveal,.reveal.visible{
    opacity:1;transform:none;animation:none;transition:none}
}
```

- [ ] **Step 1.2 — Verify no other `.reveal` or `.visible` rules exist that could conflict**

Run:
```bash
grep -n "\.reveal\|\.visible" "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website/css/style.css"
```

Expected: Only the lines you just wrote, plus any existing `.is-hover` / `.is-expanded` / `.mobile-menu.open` rules (those are unrelated — fine to ignore).

- [ ] **Step 1.3 — Commit**

```bash
cd "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website"
git add css/style.css
git commit -m "feat: add drift-up keyframe — replace .reveal transition with Editorial Drift animation"
```

---

## Task 2: Upgrade `initScrollReveal()` with auto-tagging

**File:** `js/main.js` — lines 613–632

- [ ] **Step 2.1 — Replace the entire `initScrollReveal` function**

Find this function in `js/main.js` (starts at line 613):

```javascript
function initScrollReveal() {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function(el) {
    obs.observe(el);
  });
}
```

Replace it with:

```javascript
function initScrollReveal() {

  // ── 1. Selector maps ──────────────────────────────────────────────────────
  // Section header triplets: eyebrow → heading → right column
  var HEADER_SELECTORS = [
    { sel: '.sec-head .eyebrow',   delay: 0   },
    { sel: '.sec-head .h-section', delay: 80  },
    { sel: '.sec-head .right',     delay: 160 },
  ];

  // Contact lede: h3 → paragraph
  var LEDE_SELECTORS = [
    { sel: '.contact-lede h3', delay: 0  },
    { sel: '.contact-lede p',  delay: 80 },
  ];

  // Stagger groups: each element gets (index × delay)ms
  // card:true adds .reveal-card for the shorter 0.55s duration
  var STAGGER_GROUPS = [
    { selector: '#portIndex .port-index li', delay: 60, card: false },
    { selector: '#servicesNumbered .item',   delay: 60, card: true  },
    { selector: '.proof-card',               delay: 80, card: true  },
    { selector: '.process-step',             delay: 80, card: true  },
  ];

  // ── 2. Auto-tag elements ──────────────────────────────────────────────────
  // classList.add is idempotent — safe to call on elements already tagged in HTML

  HEADER_SELECTORS.forEach(function(item) {
    document.querySelectorAll(item.sel).forEach(function(el) {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', item.delay + 'ms');
    });
  });

  LEDE_SELECTORS.forEach(function(item) {
    document.querySelectorAll(item.sel).forEach(function(el) {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', item.delay + 'ms');
    });
  });

  STAGGER_GROUPS.forEach(function(group) {
    document.querySelectorAll(group.selector).forEach(function(el, i) {
      el.classList.add('reveal');
      if (group.card) el.classList.add('reveal-card');
      el.style.setProperty('--reveal-delay', (i * group.delay) + 'ms');
    });
  });

  // ── 3. Reduced motion: snap everything visible immediately ────────────────
  // CSS prefers-reduced-motion also handles this, but JS belt-and-suspenders
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }

  // ── 4. IntersectionObserver: fires once per element ───────────────────────
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    obs.observe(el);
  });
}
```

- [ ] **Step 2.2 — Confirm init call order in the DOMContentLoaded block**

Find the init block near the bottom of `js/main.js`. It should read:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  renderPortfolio();
  renderServices();
  renderTestimonials();
  initPortfolioHoverCard();
  initHeroParallax();
  initNav();
  initContactForm();
  initScrollReveal();   // ← must be AFTER renderPortfolio + renderServices
  initFooterYear();
});
```

`renderPortfolio()` and `renderServices()` must appear before `initScrollReveal()`. If they do (they already do as of this writing), no change needed. If the order is different, move `initScrollReveal()` to after both render calls.

- [ ] **Step 2.3 — Commit**

```bash
cd "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website"
git add js/main.js
git commit -m "feat: upgrade initScrollReveal — auto-tag elements, Editorial Drift stagger, threshold 0.08"
```

---

## Task 3: Visual verification + deploy

- [ ] **Step 3.1 — Open the site locally**

The project is static HTML — open directly in browser:

```bash
open "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website/index.html"
```

Or serve locally to avoid any file:// quirks:

```bash
cd "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website"
python3 -m http.server 8080
# Then open http://localhost:8080
```

- [ ] **Step 3.2 — Visual checklist (desktop)**

Scroll slowly from top to bottom. Verify each group:

| Element | Expected |
|---------|----------|
| `#work` eyebrow `01 / SELECTED WORK` | Drifts up on scroll into view |
| `#work` heading `Work that moves.` | Drifts up 80ms after eyebrow |
| `#work` right column subtext | Drifts up 160ms after eyebrow |
| Portfolio rows (Summit Cosmetics, Code Red…) | Stagger in 60ms apart, top to bottom |
| `#services` eyebrow + heading + right column | Same pattern as Work |
| Service items (Brand Foundation, Content Engine…) | Stagger in 60ms apart |
| `#proof` eyebrow + heading | Drifts up |
| Proof cards | Stagger in 80ms apart |
| `#process` eyebrow + heading | Drifts up |
| Process steps | Stagger in 80ms apart |
| Contact `h3` + `p` | Drifts up 80ms apart |
| CTA blocks between sections | Drift up (already had `.reveal` — now upgraded curve) |

**Scroll back up, then back down** — elements should stay visible (not re-animate). ✓

- [ ] **Step 3.3 — Visual checklist (mobile)**

Open DevTools → toggle device toolbar → iPhone 14 Pro (390px wide). Repeat the scroll-through. Confirm:
- Animations run smoothly (no jank)
- Dark text-protection cards in `#work` and `#services` appear immediately (they're not animated — only their children are)
- No element is stuck invisible (opacity:0) after scrolling past it

- [ ] **Step 3.4 — Test `prefers-reduced-motion`**

In DevTools → Rendering panel → check "Emulate CSS media feature prefers-reduced-motion: reduce".

Reload page. All content should be immediately visible — no animations, no opacity:0 flicker.

- [ ] **Step 3.5 — Deploy to Cloudflare Pages**

```bash
cd "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website"
npx wrangler pages deploy . --project-name limelogicstudio-website --commit-dirty=true
```

Note the deployment URL from the output (format: `https://xxxxxxxx.limelogicstudio-website.pages.dev`).

- [ ] **Step 3.6 — Final commit (deploy confirmation)**

```bash
cd "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website"
git add -A
git commit -m "deploy: scroll animations live — Editorial Drift reveal system"
```

---

## Self-Review Notes

- **Spec coverage:** All 7 element groups from the scope table are covered in HEADER_SELECTORS, LEDE_SELECTORS, and STAGGER_GROUPS. CTA blocks already have `.reveal` in HTML — upgraded automatically. ✓
- **Call order:** Confirmed `renderPortfolio()` and `renderServices()` run before `initScrollReveal()` in the existing init block. ✓  
- **No placeholders:** All code is complete and exact. ✓
- **Type consistency:** `--reveal-delay` custom property used consistently in both CSS (`var(--reveal-delay,0ms)`) and JS (`el.style.setProperty('--reveal-delay', ...)`). ✓
- **`.reveal-card` class:** Defined in CSS Task 1 (`animation-duration:0.55s`), applied in JS Task 2 (`if (group.card) el.classList.add('reveal-card')`). ✓
