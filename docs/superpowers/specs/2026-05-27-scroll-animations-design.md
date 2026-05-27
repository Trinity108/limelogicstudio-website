# Scroll Animation Design — LimeLogic Website
**Date:** 2026-05-27  
**Status:** Approved — ready for implementation  
**Scope:** `css/style.css` + `js/main.js` only. No new files, no new dependencies.

---

## Goal

Add Editorial Drift scroll-reveal animations to headlines and cards across the site. Smooth, premium, once-only. Extends the existing IntersectionObserver reveal system already in place.

---

## Animation Personality

**Editorial Drift** — slow, silky, premium agency feel.

```
Keyframe name:  drift-up
From:           opacity:0, translateY(22px)
To:             opacity:1, translateY(0)
Easing:         cubic-bezier(0.2, 0.8, 0.2, 1)
Duration:       0.60s — section headings
                0.55s — cards, list rows, body elements
Fill mode:      both (holds at end, stays hidden during delay window)
```

---

## Scope — What Animates

Elements animate **once only** — on first entry into the viewport. IntersectionObserver unobserves after firing.

| Group | Elements | Stagger |
|-------|----------|---------|
| **Section headers** | `.sec-head .eyebrow` → `.sec-head .h-section` → `.sec-head .right` | 0ms / 80ms / 160ms |
| **Portfolio rows** | `#portIndex .port-index li` | 60ms per row |
| **Service items** | `#servicesNumbered .item` | 60ms per item |
| **Proof cards** | `.proof-card` | 80ms per card |
| **Process steps** | `.process-step` | 80ms per step |
| **Contact lede** | `.contact-lede h3` → `.contact-lede p` | 0ms / 80ms |
| **CTA blocks** | `.cta-block` (already `.reveal` in HTML) | 0ms — upgraded curve only |

**Not animated:** hero (already has parallax), marquee bands (always running), trust strip, legal bar, dividers.

---

## CSS Changes — `style.css`

### 1. Add `@keyframes drift-up`

```css
@keyframes drift-up {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### 2. Replace existing `.reveal` transition with animation

**Remove:**
```css
.reveal { opacity:0; transform:translateY(24px);
  transition:opacity .55s ease, transform .55s ease }
.reveal.visible { opacity:1; transform:translateY(0) }
```

**Replace with:**
```css
.reveal {
  opacity: 0;
  transform: translateY(22px);
}
.reveal.visible {
  animation: drift-up 0.60s cubic-bezier(0.2, 0.8, 0.2, 1)
             var(--reveal-delay, 0ms) both;
}
/* Cards and row elements use a slightly shorter duration */
.reveal.reveal-card.visible {
  animation-duration: 0.55s;
}
```

### 3. `prefers-reduced-motion` override (already exists — no change needed)

```css
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity:1; transform:none; transition:none }
}
```

Update this block to also cancel animations:
```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.visible {
    opacity: 1;
    transform: none;
    animation: none;
    transition: none;
  }
}
```

---

## JS Changes — `main.js`

### Update `initScrollReveal()`

The function gains an **auto-tagging phase** before the Observer is created. It queries specific selectors, stamps `.reveal` (and `.reveal-card` where appropriate) onto each element, and sets `--reveal-delay` for stagger groups.

The Observer itself is unchanged: `threshold: 0.08`, adds `.visible`, unobserves.

**Selector map (defined once at top of function):**

```javascript
// Groups that animate as a unit with stagger
var STAGGER_GROUPS = [
  { selector: '#portIndex .port-index li',      delay: 60,  card: false },
  { selector: '#servicesNumbered .item',         delay: 60,  card: true  },
  { selector: '.proof-card',                     delay: 80,  card: true  },
  { selector: '.process-step',                   delay: 80,  card: true  },
];

// Section header triplets — eyebrow / heading / right — fixed delays
var HEADER_SELECTORS = [
  { sel: '.sec-head .eyebrow',   delay: 0   },
  { sel: '.sec-head .h-section', delay: 80  },
  { sel: '.sec-head .right',     delay: 160 },
];

// Contact lede
var LEDE_SELECTORS = [
  { sel: '.contact-lede h3', delay: 0  },
  { sel: '.contact-lede p',  delay: 80 },
];
```

**Tagging logic:**

```javascript
// Tag section headers
HEADER_SELECTORS.forEach(function(item) {
  document.querySelectorAll(item.sel).forEach(function(el) {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', item.delay + 'ms');
  });
});

// Tag contact lede
LEDE_SELECTORS.forEach(function(item) {
  document.querySelectorAll(item.sel).forEach(function(el) {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', item.delay + 'ms');
  });
});

// Tag stagger groups
STAGGER_GROUPS.forEach(function(group) {
  document.querySelectorAll(group.selector).forEach(function(el, i) {
    el.classList.add('reveal');
    if (group.card) el.classList.add('reveal-card');
    el.style.setProperty('--reveal-delay', (i * group.delay) + 'ms');
  });
});
```

**Observer** — unchanged except query now covers all `.reveal` elements including newly tagged ones:

```javascript
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
```

---

## Edge Cases

- **Portfolio rows rendered async** — `initPortfolio()` renders rows via JS after DOM ready. `initScrollReveal()` must run after `initPortfolio()` to tag the rendered rows. Execution order in `DOMContentLoaded` must be: `initPortfolio()` → `initServices()` → `initScrollReveal()`. Verify call order in the init block.
- **Service items rendered async** — same issue. `initServices()` must complete before `initScrollReveal()` tags `.item` elements.
- **Elements already in viewport on load** — IntersectionObserver fires immediately for elements already visible. This is correct behaviour — they animate in as the page loads, not stuck invisible.
- **Stagger cap** — for very long lists (e.g. 8 portfolio rows × 60ms = 480ms max delay), the last item animates in within half a second of scrolling to the section. Acceptable.

---

## What Does Not Change

- Hero parallax (`initHeroParallax`) — untouched
- Nav scroll state (`initNav`) — untouched  
- Video/fallback logic — untouched
- Any section background, text shadow, or layout CSS — untouched
- Mobile legibility fixes from this session — untouched

---

## Files Changed

| File | Change |
|------|--------|
| `css/style.css` | Add `@keyframes drift-up`, replace `.reveal` transition with animation, update `prefers-reduced-motion` block |
| `js/main.js` | Update `initScrollReveal()` — add auto-tagging phase, verify init call order |

Estimated: ~40 lines CSS, ~35 lines JS.
