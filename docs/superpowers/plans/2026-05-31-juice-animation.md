# Juice Animation + Footer Wordmark Spacing Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the footer wordmark letter-spacing and add a letter-by-letter entrance animation to "juice." in the hero h1.

**Architecture:** Pure CSS animation (no JS) using `@keyframes` + staggered `animation-delay` per letter. Footer wordmark fix is a single property change. Hero markup wraps each character of `juice.` in an inline `<span>`. All changes compositor-layer only — no layout, no paint, no Lighthouse impact.

**Tech Stack:** Vanilla HTML, vanilla CSS. No build step. No dependencies.

---

### Task 1: Fix footer wordmark letter-spacing

**Files:**
- Modify: `css/style.css` (line ~864 — `.footer .wordmark` rule)

- [ ] **Step 1: Locate the rule**

  Open `css/style.css`. Search for `.footer .wordmark{`. It appears around line 863:

  ```css
  .footer .wordmark{font-family:var(--f-display);font-weight:700;
    font-size:clamp(70px,19vw,260px);line-height:0.84;letter-spacing:-0.04em;
    margin:0;padding:0 var(--pad-x);max-width:100%;color:var(--text);
    text-shadow:0 2px 40px rgba(0,0,0,0.5)}
  ```

- [ ] **Step 2: Change letter-spacing**

  Change `letter-spacing:-0.04em` to `letter-spacing:-0.01em`. Result:

  ```css
  .footer .wordmark{font-family:var(--f-display);font-weight:700;
    font-size:clamp(70px,19vw,260px);line-height:0.84;letter-spacing:-0.01em;
    margin:0;padding:0 var(--pad-x);max-width:100%;color:var(--text);
    text-shadow:0 2px 40px rgba(0,0,0,0.5)}
  ```

- [ ] **Step 3: Verify in browser**

  Open `index.html` in a browser (or the live site). Scroll to the footer. "We Got the Juice." should read with more open, balanced spacing — matching the hero h1 rhythm rather than looking compressed.

- [ ] **Step 4: Commit**

  ```bash
  git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" add css/style.css
  git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" commit -m "fix: loosen footer wordmark letter-spacing to match hero h1"
  ```

---

### Task 2: Add juice letter-animation CSS

**Files:**
- Modify: `css/style.css` (after line ~197 — after `.hero h1 em` rule)

- [ ] **Step 1: Locate the insertion point**

  In `css/style.css`, find this line (~197):

  ```css
  .hero h1 em{font-style:normal;color:var(--lime)}
  ```

- [ ] **Step 2: Insert animation CSS immediately after that line**

  ```css
  @keyframes juice-letter{
    from{opacity:0;transform:translateY(12px)}
    to{opacity:1;transform:translateY(0)}
  }
  .hero h1 em .jl{
    display:inline-block;opacity:0;
    animation:juice-letter .38s cubic-bezier(.16,1,.3,1) forwards}
  .hero h1 em .l1{animation-delay:.65s}
  .hero h1 em .l2{animation-delay:.73s}
  .hero h1 em .l3{animation-delay:.81s}
  .hero h1 em .l4{animation-delay:.89s}
  .hero h1 em .l5{animation-delay:.97s}
  .hero h1 em .l6{animation-delay:1.05s}
  @media(prefers-reduced-motion:reduce){
    .hero h1 em .jl{animation:none;opacity:1}}
  ```

  Keep the same minified style as the surrounding file — no extra whitespace.

- [ ] **Step 3: Commit**

  ```bash
  git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" add css/style.css
  git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" commit -m "feat: add juice letter-by-letter entrance animation CSS"
  ```

---

### Task 3: Update hero h1 markup

**Files:**
- Modify: `index.html` (line 109)

- [ ] **Step 1: Locate the line**

  In `index.html`, find line 109:

  ```html
  <h1>Creative<br>studio<br>for brands<br>with <em>juice.</em></h1>
  ```

- [ ] **Step 2: Replace with span-wrapped version**

  ```html
  <h1>Creative<br>studio<br>for brands<br>with <em><span class="jl l1">j</span><span class="jl l2">u</span><span class="jl l3">i</span><span class="jl l4">c</span><span class="jl l5">e</span><span class="jl l6">.</span></em></h1>
  ```

  No other change to the h1 or its surrounding markup.

- [ ] **Step 3: Verify in browser**

  Hard-refresh the page (`Cmd+Shift+R`). Expected behaviour:
  - "Creative studio for brands with" is visible immediately
  - The lime-green area where "juice." will appear is blank for ~0.65s
  - Letters j, u, i, c, e, . drop in one by one over ~0.4s each, staggered 80ms apart
  - All letters are fully visible by ~1.4s after load
  - No layout shift at any point
  - Scroll to footer and confirm "We Got the Juice." spacing looks open and balanced

  To verify reduced-motion: open DevTools → Rendering → check "Emulate CSS media feature prefers-reduced-motion: reduce". All six letters should appear immediately with no animation.

- [ ] **Step 4: Commit**

  ```bash
  git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" add index.html
  git -C "/Users/homebass/Akashic Records/LimeLogic/Projects/limelogicstudio-website" commit -m "feat: wrap hero juice letters for staggered entrance animation"
  ```

---

## Self-review notes

- Spec Part 1 (footer wordmark spacing) → Task 1. Covered.
- Spec Part 2 (hero animation markup) → Task 3. Covered.
- Spec Part 2 (hero animation CSS) → Task 2. Covered.
- Spec `prefers-reduced-motion` requirement → Task 2 Step 2. Covered.
- CSS class names consistent throughout: `.jl`, `.l1`–`.l6`. No drift.
- Task 2 commits before Task 3 so the CSS is in place before the spans appear in the DOM.
