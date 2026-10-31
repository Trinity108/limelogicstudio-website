# limelogicstudio.com — Portfolio Conversion Audit
**Date:** 2026-10-31 · **Input:** live site + source (`index.html`, `js/main.js`) + vault work inventory
**Business goal assumed:** discovery calls and Fix Kit orders from business owners who land on the site

---

## The short version

The portfolio doesn't fail because it looks bad. It fails because **it shows no work.**

- **Zero images or video of real work.** The section is a list of names. Hover or tap one and you get a CSS gradient with the client's name typed on it (`renderArtwork()` in `js/main.js`). Three real images are already in `assets/images/` (`summit-campaign.png`, `code-red-brand.jpg`, `kafé-blue-event.png`), and none of them are used.
- **4 of 9 pieces are made-up brands:** Northwind, Atlas Athletics, Pulse 96.1 ("fictional"), Coral Reef Rum. To a business owner, spec work says "not enough clients yet".
- **The Proof section admits there's no proof:** "Proof in progress… Real results are in progress."
- Meanwhile, **20 real pieces from June to October are sitting in the vault unused**, and some of them have real numbers.

**Traffic is unverified.** The Cloudflare beacon is live on the page (confirmed today), but the only Cloudflare token on this Mac is DNS-only, so neither visitor numbers nor referrers could be read. Lion's hunch that "nobody's visiting" is plausible, but it's not proven yet. See the analytics section.

---

## Scorecard: portfolio and proof, as a business owner sees it

| Lens | Score | Verdict |
|---|---|---|
| Clarity | 6 | Hero is clear. Portfolio says "Work that moves" and then shows nothing moving |
| Offer strength | 6 | Fix Kit at TT$950 is a strong entry offer. The portfolio never links work to an offer |
| Visual hierarchy | 4 | Showreel strip is strong. Portfolio is a text index behind hover cards |
| Trust signals | 2 | No real visuals, no numbers, no client words, spec brands mixed in, placeholder proof |
| User flow | 5 | Plenty of CTAs, but no "I want this" moment after any piece of work |
| Mobile | 5 | Tap-to-expand list on mobile means the work is two taps deep and still not shown |
| Emotional resonance | 5 | Brand energy is high in the hero; the portfolio goes flat |
| **Overall** | **4.7** | The craft is real. The page just doesn't show it |

---

## Top 5 issues, ranked by conversion impact

**1. The portfolio shows no actual work**
- What: name list plus typographic gradient cards. No reel plays, no screenshots, no live demos.
- Why it hurts: for an agency site, the work *is* the trust signal. Nobody books a call off a client name.
- Fix: a video-first proof wall. Short muted 9:16 loops play inline, one per case, plus a screenshot or live link for each web build.

**2. Spec brands dilute the real clients**
- What: Northwind, Atlas, Pulse 96.1 and Coral Reef Rum sit beside Summit, Code Red and Kafé Blue.
- Why it hurts: invented brands read as padding and make the real work look thin.
- Fix: cut all four. The real inventory is deep enough (below).

**3. The Summit card makes claims nothing backs up**
- What: "2025", "EST · 2018" and "the Caribbean's fastest-growing clean beauty line". The engagement started in Q2 2026, and no vault source supports either the year or the superlative. (The logo redesign and packaging work are real: `Clients/Summit Cosmetics/Project Overview.md` lines 43 and 46.)
- Why it hurts: one wrong claim found by a prospect, or by June, costs more than the card earns.
- Also: the live site already **names Summit**. The standing rule is that naming Summit, or using their numbers, needs Lion's OK (`project_summit_ok_showcase_work`). Whether that was cleared is unconfirmed.
- Fix: rewrite the card from vault facts only, and confirm naming with Lion.

**4. Proof is a placeholder, and its copy undersells the agency**
- What: "Real results are in progress." "AI production means more for your budget… we're not charging legacy rates."
- Why it hurts: the first line admits there's nothing to show. The second makes price the reason to choose LimeLogic, and the brand never sells on price.
- Fix: replace it with a results strip of real numbers (each traced to its source) and the first two client quotes once collected.

**5. No path from "that's sick" to "I want that"**
- What: no case ends in a CTA, and the only link inside a card is "View project".
- Why it hurts: the moment a visitor is impressed is the best moment to ask, and it passes with nothing.
- Fix: every case ends with "Want this for your business?", linked to its matching offer (reel → Content Engine or Launch Pack, website → Web Build, any of them → Fix Kit as the low-risk start).

---

## Conversion leaks

| Drop-off point | Likely cause | Evidence |
|---|---|---|
| Before the site | No traffic or wrong traffic | Unverified: no analytics access. LimeLogic Meta shows 0 leads and 0 conversations for Sep 30 to Oct 27 (vault Meta pull) |
| Portfolio section | Nothing to look at | Source: `renderArtwork()` draws gradients only |
| Proof section | "Results in progress" | Live copy |
| Contact form | Possibly broken, unconfirmed | Formspree `xeezjedk` is untested this session. **One test submission from Lion would rule this out** |
| Footer tools | Register out of date | The AI Audit is live and working at limelogic-ai-audit.pages.dev, but `live-destinations.md` says "HELD, tool not built". Fix the register |

---

## What we have to show: real inventory, strongest first

| Case | Proof | Asset | Gate |
|---|---|---|---|
| **"The Shell": AI character reel for a Trini haircare brand** | IG reach 285, about 150% of the ~190 follower base; 64.6% watched past 3s (`Summit/Research/2026-10-05-september-performance-review.md:23-24, 46`) | `~/Projects/summit-reels-endeavour/out/ai-d_the-shell_fixed.mp4` | Unnamed and without numbers: OK. Named or with numbers: Lion |
| **Mango Match: booth game for a 5K event** | A live game that works offline, collected draw entries on the day, and ranks winners by time. Event reel: 473 reach, 52.3% view rate (the three vault sources disagree by a few points; cite SepRev:113 only) | https://summit-mango-game.pages.dev | Same as above |
| **Sparrow Monument: interactive web tribute** | Lighthouse mobile scores of 96 / 100 / 100 / 100, CLS 0 (`sparrow-monument/README.md:14`) | https://sparrow-monument.pages.dev | Lion OK'd showing it respectfully. Never imply he's alive |
| **Code Red Security website** | Live at coderedtt.com (confirmed today to be our build) | screenshot | None |
| **Hair-match quiz with lead capture** | Live quiz that emails each result automatically | https://summit-hair-quiz.pages.dev | Unnamed: OK |
| **Late Nite Special showreel (Kafé Blue)** | Video craft. No numbers; the LimeLogic repost's numbers must stay private | `~/Downloads/Late_Nite_Special_Showreel_V2.mp4` | Lion |
| **Steel & Voices: Mavis John retrospective** | Live site | vercel URL | None |
| **Brother Valentino memorial reel** | Built the day after his passing (died 21 Oct, built 22 Oct) | Desktop MP4 | Lion. The vault says "do not re-post"; an embed may count as a re-post |
| *Tools we built:* Hook Generator, AI Audit, Carnival Mirror | Live | links | None |

**Do not show:** LimeLogic's own channel numbers (5 views, reach 1 to 3), Summit deck contents, or the Boothman spec reel without his OK.

---

## Recommended rebuild: "The Proof Wall"

1. **Section head:** "Work that moves." is already the headline; now make it literal. Subhead: *Real Caribbean brands. Real numbers. Built in days, not months.*
2. **Video-first grid:** 6 cases with 9:16 muted loops, 6 to 8 seconds each, under ~1.5 MB, autoplaying only while on screen, and new filenames to get around the immutable cache. Web builds get a scrolling screenshot loop plus a "Try it live" button.
3. **Each card, three lines:** *The problem → what we built and how long it took → the result.* Then "Want this for your business?" linked to the matching offer.
4. **Results strip** (replaces "proof in progress"): three verified figures with their sources in small print. Example: "~1.5× the follower base reached by one reel" · "96/100 mobile performance" · "Booth game live and collecting entries in a weekend".
5. **Cut** the 4 spec brands and the gradient art engine (about 140 lines of JS).
6. **"Tools we built" row:** small cards for Hook Generator, AI Audit and Carnival Mirror, each with a free-to-try CTA. These are lead magnets, so treat them like it.
7. **Testimonials:** ask June (Summit) and Wayde (Code Red) for two sentences each. Until those arrive, show no quotes and no placeholder.

**Estimated lift:** a portfolio that shows real work, real numbers and a CTA per case is the single biggest trust gain available on this site. It can't be measured yet (see analytics), so the honest claim is "from near-zero proof to proof on every card".

---

## Analytics: closing the gap

- Beacon: live (`cloudflareinsights.com/beacon.min.js` is injected on the homepage, confirmed 2026-10-31).
- Access: the DNS token's GraphQL call failed with "not authorized" / missing `zone.analytics.read`, and the wrangler OAuth token has expired.
- Built: `~/scripts/cf_traffic.py` gives page views, visits, top pages, referrers, countries and devices for the last N days. **Needs a one-time token from Lion** (the script prints the steps). Not yet tested against the live API, because no token exists yet.

## Quick wins (24 to 48 hours)
- [ ] Cut the 4 spec brands
- [ ] Fix the Summit card claims (2025, EST 2018, "fastest-growing")
- [ ] Replace "proof in progress" with the verified results strip
- [ ] Lion: one test submission of the contact form
- [ ] Lion: create the analytics token, then run `python3 ~/scripts/cf_traffic.py`
- [ ] Fix the AI Audit row in `live-destinations.md` (it's LIVE)
