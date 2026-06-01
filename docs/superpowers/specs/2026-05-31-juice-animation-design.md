# Design Spec — "juice." Letter Animation + Footer Wordmark Spacing Fix
**Date:** 2026-05-31
**Project:** limelogicstudio.com
**Status:** Approved — ready for implementation

---

## Problem

1. **Footer wordmark spacing** — `.footer .wordmark` has `letter-spacing: -0.04em`. At `clamp(70px, 19vw, 260px)` this compresses characters by up to 10px each, making the text feel dense and unbalanced compared to the hero h1 (`-0.01em`).

2. **Hero headline "juice." is static** — the brand hook word appears at the same moment as all other text. The desired experience: white text loads first, then "juice." animates in letter by letter as a payoff reveal.

---

## Constraints

- Performance is the top priority — no JS, no extra network requests, no layout/paint triggers
- Must respect `prefers-reduced-motion`
- No changes to any other element or section
- Two files touched: `index.html` and `css/style.css`

---

## Part 1 — Footer Wordmark Letter-Spacing Fix

**File:** `css/style.css`
**Selector:** `.footer .wordmark`
**Change:** `letter-spacing: -0.04em` → `letter-spacing: -0.01em`

Brings the footer wordmark into line with the hero h1 tracking. No other properties on this selector change.

---

## Part 2 — Hero h1 "juice." Letter-by-Letter Animation

### Markup change

**File:** `index.html`, line 109

**Before:**
```html
<h1>Creative<br>studio<br>for brands<br>with <em>juice.</em></h1>
```

**After:**
```html
<h1>Creative<br>studio<br>for brands<br>with <em><span class="jl l1">j</span><span class="jl l2">u</span><span class="jl l3">i</span><span class="jl l4">c</span><span class="jl l5">e</span><span class="jl l6">.</span></em></h1>
```

6 inline `<span>` elements. No structural or semantic change — they sit inside the existing `<em>`.

### CSS additions

**File:** `css/style.css` — append after existing `.hero h1` rules

```css
@keyframes juice-letter {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero h1 em .jl {
  display: inline-block;
  opacity: 0;
  animation: juice-letter 0.38s cubic-bezier(0.16,1,0.3,1) forwards;
}

.hero h1 em .l1 { animation-delay: 0.65s; }
.hero h1 em .l2 { animation-delay: 0.73s; }
.hero h1 em .l3 { animation-delay: 0.81s; }
.hero h1 em .l4 { animation-delay: 0.89s; }
.hero h1 em .l5 { animation-delay: 0.97s; }
.hero h1 em .l6 { animation-delay: 1.05s; }

@media (prefers-reduced-motion: reduce) {
  .hero h1 em .jl { animation: none; opacity: 1; }
}
```

### Behaviour

- White text ("Creative studio for brands with") is visible immediately — no change to existing h1 styles
- Each letter of "juice." enters at 80ms intervals starting at 0.65s after page load
- Full entrance completes at ~1.43s — well within the hero dwell time
- Trigger: page load (CSS animation fires automatically — no JS, no IntersectionObserver needed)
- Fallback: `animation-fill-mode: forwards` keeps letters visible after animation ends
- Accessibility: `prefers-reduced-motion` override renders all letters fully visible with no animation

### Performance profile

| Property used | Compositor layer | Triggers layout | Triggers paint |
|---|---|---|---|
| `opacity` | Yes | No | No |
| `transform: translateY` | Yes | No | No |

Zero Lighthouse impact. Zero JS parse cost. No additional network requests.

---

## Files to change

| File | Line(s) | Change |
|---|---|---|
| `css/style.css` | ~864 | `letter-spacing: -0.04em` → `-0.01em` on `.footer .wordmark` |
| `css/style.css` | after line ~197 | Add `@keyframes juice-letter` + `.jl` rules + reduced-motion override |
| `index.html` | 109 | Wrap `juice.` characters in `.jl .l1–.l6` spans |
