# Mobile UX Optimisation — limelogicstudio.com
**Date:** 2026-06-05  
**Status:** Approved — ready for implementation  
**Files touched:** `css/style.css`, `js/main.js`  
**Deploy:** `npx wrangler pages deploy . --project-name=limelogicstudio-website --branch=main --commit-dirty=true`

---

## Context

limelogicstudio.com uses a scroll-driven video hero with a fixed background image on mobile (fallback mode). Content sections animate in via `IntersectionObserver` + CSS `drift-up` keyframe. Six mobile UX issues were identified and approved for this session.

---

## Fix 1 — Animation stagger: Option A (Snappy)

**Problem:** Stagger delay is `index × delay_ms` with no cap. Portfolio item #9 gets 480ms delay + 700ms animation = 1.18s before it fully appears. On mobile where all items are visible at once, this reads as slowness.

**Change — `css/style.css`:**

```css
/* BEFORE */
.reveal.visible {
  animation: drift-up 0.70s cubic-bezier(0.2,0.8,0.2,1) var(--reveal-delay,0ms) both;
}
.reveal.reveal-card.visible { animation-duration: 0.65s }

/* AFTER */
.reveal.visible {
  animation: drift-up 0.42s cubic-bezier(0.2,0.8,0.2,1) var(--reveal-delay,0ms) both;
}
.reveal.reveal-card.visible { animation-duration: 0.42s }
```

**Change — `js/main.js` — `initScrollReveal()`:**

STAGGER_GROUPS currently:
```js
{ selector: '#portIndex li',             delay: 60, card: false },
{ selector: '#servicesNumbered .item',   delay: 60, card: true  },
{ selector: '.proof-card',               delay: 80, card: true  },
{ selector: '.process-step',             delay: 80, card: true  },
```

Change to:
```js
{ selector: '#portIndex li',             delay: 40, card: false },
{ selector: '#servicesNumbered .item',   delay: 40, card: true  },
{ selector: '.proof-card',               delay: 40, card: true  },
{ selector: '.process-step',             delay: 40, card: true  },
```

And apply a 160ms cap when setting the delay:
```js
// BEFORE
el.style.setProperty('--reveal-delay', (i * group.delay) + 'ms');

// AFTER
el.style.setProperty('--reveal-delay', Math.min(i * group.delay, 160) + 'ms');
```

---

## Fix 2 — Disable hero parallax on mobile

**Problem:** `initHeroParallax()` fires a `translateY` on every scroll event on all devices including mobile. On mid-range Android this costs frames for zero visual gain (the hero image is static on mobile anyway — it's fallback-mode).

**Change — `js/main.js` — `initHeroParallax()`:**

```js
// BEFORE
function initHeroParallax() {
  var headline = document.getElementById('heroHeadline');
  if (!headline) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('scroll', function() {
    headline.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
  }, { passive: true });
}

// AFTER
function initHeroParallax() {
  var headline = document.getElementById('heroHeadline');
  if (!headline) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 880) return;
  window.addEventListener('scroll', function() {
    headline.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
  }, { passive: true });
}
```

---

## Fix 3 — Reveal observer threshold

**Problem:** `IntersectionObserver` fires at `threshold: 0.08` (8% visible). On mobile portrait this can trigger elements that are barely peeking from below the fold, causing an abrupt pop rather than a deliberate reveal.

**Change — `js/main.js` — `initScrollReveal()`:**

```js
// BEFORE
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// AFTER
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
```

---

## Fix 4 — Animate portfolio tap-expand panel

**Problem:** On touch devices, tapping a portfolio row shows the inline expansion panel via `display:none → display:flex`. This snaps open with no animation — feels broken on mobile compared to native app conventions.

**Approach:** Replace the display toggle with a `max-height` + `opacity` transition. The panel is always rendered in the DOM; collapsed state is `max-height:0; opacity:0; overflow:hidden`. Expanded state is `max-height:600px; opacity:1`.

**Change — `css/style.css`:**

```css
/* BEFORE */
.port-index .pi-inline {
  display: none;
  grid-column: 1/-1;
  margin-top: 18px; padding: 18px; border-radius: 6px;
  background: rgba(15,15,15,0.7);
  border: 1px solid rgba(168,255,62,0.25);
  flex-direction: row; gap: 18px;
}
.port-index li.is-expanded .pi-inline { display: flex }

/* AFTER */
.port-index .pi-inline {
  grid-column: 1/-1;
  margin-top: 0; padding: 0 18px; border-radius: 6px;
  background: rgba(15,15,15,0.7);
  /* border-color starts transparent so 1px line doesn't show at max-height:0 */
  border: 1px solid transparent;
  flex-direction: row; gap: 18px;
  display: flex;
  max-height: 0; opacity: 0; overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.2,0.8,0.2,1),
              opacity 0.25s ease,
              margin-top 0.35s ease,
              padding 0.35s ease,
              border-color 0.25s ease;
  pointer-events: none;
}
.port-index li.is-expanded .pi-inline {
  max-height: 600px; opacity: 1;
  margin-top: 18px; padding: 18px;
  border-color: rgba(168,255,62,0.25);
  pointer-events: auto;
}
```

**Change — `js/main.js`:** The `togglePanel()` function already toggles `is-expanded` on the `<li>` — no JS change needed. The CSS transition handles the animation.

---

## Fix 5 — Active tap feedback on service rows

**Problem:** `.svc-numbered .item` only has `:hover` states. On touch devices, hover never fires, so items feel unresponsive when tapped. Add `:active` pseudo-class to give instant visual tap confirmation.

**Change — `css/style.css` — add after existing hover rules:**

```css
/* After: .svc-numbered .item:hover { ... } */
.svc-numbered .item:active {
  background: rgba(168,255,62,0.06);
  border-color: rgba(168,255,62,0.2);
}
.s-services .svc-numbered .item:active {
  background: rgba(168,255,62,0.08);
  border-color: rgba(168,255,62,0.3);
}
```

---

## Fix 6 — Tighten section header stagger on mobile

**Problem:** Section headers stagger at 0 / 80 / 160ms (eyebrow → heading → right column). On mobile the right column lands 160ms after the heading, which is perceptible and feels sluggish in a narrow viewport.

**Change — `js/main.js` — `initScrollReveal()`:**

```js
// BEFORE
var HEADER_SELECTORS = [
  { sel: '.sec-head .eyebrow',   delay: 0   },
  { sel: '.sec-head .h-section', delay: 80  },
  { sel: '.sec-head .right',     delay: 160 },
];

// AFTER
var isMobile = window.innerWidth <= 640;
var HEADER_SELECTORS = [
  { sel: '.sec-head .eyebrow',   delay: 0              },
  { sel: '.sec-head .h-section', delay: isMobile ? 50  : 80  },
  { sel: '.sec-head .right',     delay: isMobile ? 100 : 160 },
];
```

---

## Implementation order

Execute in this order — CSS first, then JS. Each fix is independent; if one fails, skip it and continue.

1. Fix 1 CSS — animation duration (style.css)
2. Fix 4 CSS — portfolio expand panel (style.css)
3. Fix 5 CSS — service row :active (style.css)
4. Fix 1 JS — stagger delay + cap (main.js)
5. Fix 2 JS — hero parallax guard (main.js)
6. Fix 3 JS — observer threshold (main.js)
7. Fix 6 JS — header stagger mobile (main.js)

## Verification checklist

After all changes:
- [ ] Open site on mobile browser (or DevTools mobile emulation, iPhone SE / 390px)
- [ ] Scroll through portfolio list — all items reveal within 600ms of entering viewport
- [ ] Tap a portfolio row — expansion panel slides open smoothly
- [ ] Tap a service row — subtle background flash confirms tap
- [ ] Section headers (Work, Services, Proof) — eyebrow/heading/subhead appear tightly
- [ ] Scroll through full page — no jank, no layout shift
- [ ] `git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" diff --stat` — only style.css and main.js changed

## Deploy command

```bash
cd "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" && npx wrangler pages deploy . --project-name=limelogicstudio-website --branch=main --commit-dirty=true
```

Confirm HTTP 200 on deploy output before finishing.
