// main.js — LimeLogic Studio production vanilla JS
// Handles: services render, nav, contact form, showreel, work reels

// ─── SCROLL RESTORATION ───────────────────────────────────────────────────────
// Nav links append a hash to the URL (e.g. /#proof). When that URL is reopened,
// the browser scrolls straight to the anchor — scrollRestoration doesn't prevent
// hash-based jumps. Strip the hash on load so the page always opens at the hero.
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);
window.addEventListener('pageshow', function() { window.scrollTo(0, 0); });

// ─── DATA ────────────────────────────────────────────────────────────────────

// SERVICES_COPY — confirmed pricing + outcome copy (offer reset approved 2026-10-28;
// canonical source: wiki/agency-operations/limelogic-service-pricing.md)
var SERVICES = [
  {
    n: '01',
    title: 'Brand Foundation',
    outcome: 'A clear positioning, a confident identity system, and brand guidelines your team can actually use — delivered once, built to last.',
    deliverables: ['Brand positioning + messaging', 'Logo system + visual identity', 'Brand guidelines document'],
    whoFor: 'New businesses and brands that have outgrown their current look.',
    retainer: false,
    pricingTTD: 'From TTD 8,100',
  },
  {
    n: '02',
    title: 'Campaign Content Engine',
    outcome: 'Twelve posts a month on Instagram and Facebook, four of them reels. You approve the calendar. We write it, make it, and schedule it.',
    deliverables: ['12 posts / month incl. 4 reels', 'Instagram + Facebook, scheduled', 'Monthly report + 30-min call'],
    whoFor: 'Brands that need to show up consistently on social without managing it themselves.',
    retainer: true,
    pricingTTD: 'From TTD 4,050 / mo',
  },
  {
    n: '03',
    title: 'Web Build',
    outcome: 'A site that loads fast, reads clearly, and turns visitors into leads. The starting point for everything else we do together.',
    deliverables: ['Conversion-focused design + copywriting', 'Mobile-first, SEO-ready build', 'Cloudflare Pages deploy + handoff'],
    whoFor: 'Businesses with a story to tell and a website that does not tell it.',
    retainer: false,
    pricingTTD: 'From TTD 8,000',
  },
  {
    n: '04',
    title: 'Launch Pack',
    outcome: 'Everything a launch needs to move — imagery, reels, promo video and cuts for every feed. Ready in 5 to 7 days.',
    deliverables: ['AI imagery + composites', 'Brand reels + promo videos', 'Social cuts (9:16 + 1:1), launch-ready'],
    whoFor: 'Product launches, seasonal campaigns, and moments that cannot wait three weeks.',
    retainer: false,
    pricingTTD: 'From TTD 4,000',
  },
  {
    n: '05',
    title: 'Monthly Growth Retainer',
    outcome: 'Content, campaigns and strategy in one monthly partnership, with story reels voiced by Peter Sandy. Three clients at a time.',
    deliverables: ['3 platforms, 8 reels / month', '2 story reels voiced in-studio', 'Bi-weekly calls + competitor summary', '1 paid campaign set up'],
    whoFor: 'Brands ready to treat marketing as infrastructure — not a one-off project.',
    retainer: true,
    pricingTTD: 'From TTD 11,500 / mo',
  },
];

// ─── RENDER SERVICES ────────────────────────────────────────────────────────

function renderServices() {
  var container = document.getElementById('servicesNumbered');
  if (!container) return;

  var html = '';
  SERVICES.forEach(function(svc) {
    var delivs = svc.deliverables.map(function(d) { return '<span>' + d + '</span>'; }).join('');
    var badge = svc.retainer
      ? '<span class="svc-retainer-badge" aria-label="Monthly retainer">Retainer</span>'
      : '';
    var ttd = svc.pricingTTD
      ? '<div class="svc-ttd">' + svc.pricingTTD + '</div>'
      : '';
    html += '<div class="item">';
    html += '<div class="n">' + svc.n + '</div>';
    html += '<div class="body">';
    html += '<div class="svc-title-row"><h3>' + svc.title + '</h3>' + badge + '</div>';
    html += '<p class="svc-outcome">' + svc.outcome + '</p>';
    html += '<p class="svc-who"><b>For:</b> ' + svc.whoFor + '</p>';
    html += ttd;
    html += '</div>';
    html += '<div class="deliv">' + delivs + '</div>';
    html += '</div>';
  });

  container.innerHTML = html;
}

// ─── HERO HEADLINE PARALLAX ──────────────────────────────────────────────────

function initHeroParallax() {
  var headline = document.getElementById('heroHeadline');
  if (!headline) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 880) return;
  var rafPending = false;
  window.addEventListener('scroll', function() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function() {
      headline.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
      rafPending = false;
    });
  }, { passive: true });
}

// ─── NAV HAMBURGER ───────────────────────────────────────────────────────────

function initNav() {
  // ── Scroll-aware nav: add .scrolled once user leaves the hero zone ──
  var nav = document.querySelector('.nav');
  if (nav) {
    // Threshold = 12% of viewport height — just enough to clear the hero tag pill
    var scrollThreshold = Math.round(window.innerHeight * 0.12);
    function onNavScroll() {
      nav.classList.toggle('scrolled', window.scrollY > scrollThreshold);
    }
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll(); // evaluate immediately on load (handles refresh-at-anchor)
  }

  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function() {
    var isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Esc to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });

  // Focus trap inside open mobile menu
  mobileMenu.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab' || !mobileMenu.classList.contains('open')) return;
    var focusables = mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────

function initContactForm() {
  var form = document.getElementById('contactForm');
  var successEl = document.getElementById('cfSuccess');
  var errorEl = document.getElementById('cfError');
  var servicesHidden = document.getElementById('servicesHidden');
  if (!form) return;

  var chips = form.querySelectorAll('.cf-chip');
  chips.forEach(function(chip) {
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', function() {
      var on = chip.classList.toggle('on');
      chip.setAttribute('aria-pressed', String(on));
      var selected = [];
      chips.forEach(function(c) {
        if (c.classList.contains('on')) selected.push(c.dataset.value);
      });
      if (servicesHidden) servicesHidden.value = selected.join(', ');
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    var data = new FormData(form);
    fetch('https://formspree.io/f/xeezjedk', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' },
    })
    .then(function(res) {
      if (res.ok) {
        form.style.display = 'none';
        if (successEl) successEl.style.display = '';
      } else {
        if (btn) { btn.disabled = false; btn.innerHTML = 'Send it <span class="arrow">&#8594;</span>'; }
        if (errorEl) { errorEl.textContent = 'Something went wrong — please email us at hello@limelogicstudio.com'; errorEl.style.display = ''; }
      }
    })
    .catch(function() {
      if (btn) { btn.disabled = false; btn.innerHTML = 'Send it <span class="arrow">&#8594;</span>'; }
      if (errorEl) { errorEl.textContent = 'Something went wrong — please email us at hello@limelogicstudio.com'; errorEl.style.display = ''; }
    });
  });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────

function initScrollReveal() {

  // ── 1. Selector maps ──────────────────────────────────────────────────────
  // Section header triplets: eyebrow → heading → right column
  var isMobile = window.innerWidth <= 640;
  var HEADER_SELECTORS = [
    { sel: '.sec-head .eyebrow',   delay: 0                     },
    { sel: '.sec-head .h-section', delay: isMobile ? 50 : 80   },
    { sel: '.sec-head .right',     delay: isMobile ? 100 : 160  },
  ];

  // Contact lede: h3 → paragraph
  var LEDE_SELECTORS = [
    { sel: '.contact-lede h3', delay: 0  },
    { sel: '.contact-lede p',  delay: 80 },
  ];

  // Stagger groups: each element gets (index × delay)ms
  // card:true adds .reveal-card for the shorter 0.55s duration
  var STAGGER_GROUPS = [
    { selector: '.work-tile',                delay: 40, card: true  },
    { selector: '#servicesNumbered .item',   delay: 40, card: true  },
    { selector: '.proof-stat',               delay: 40, card: true  },
    { selector: '.process-step',             delay: 40, card: true  },
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
      el.style.setProperty('--reveal-delay', Math.min(i * group.delay, 160) + 'ms');
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
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    obs.observe(el);
  });
}

// ─── FOOTER YEAR ─────────────────────────────────────────────────────────────

function initFooterYear() {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}


// ─── SHOWREEL ────────────────────────────────────────────────────────────────
// Loads the reel only when it nears the viewport; plays while visible.
// Reduced-motion users get the poster + a play button instead of autoplay.
function initShowreel() {
  var v = document.getElementById('reelVideo');
  if (!v) return;
  var playBtn = document.getElementById('reelPlay');
  var soundBtn = document.getElementById('reelSound');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var loaded = false, inView = false, userPlay = false;
  function load() { if (!loaded) { v.src = v.dataset.src; loaded = true; } }
  function tryPlay() { load(); var p = v.play(); if (p && p.catch) p.catch(function() { playBtn.hidden = false; }); }
  if (reduce) playBtn.hidden = false;
  playBtn.addEventListener('click', function() { userPlay = true; playBtn.hidden = true; tryPlay(); });
  soundBtn.addEventListener('click', function() {
    v.muted = !v.muted;
    soundBtn.setAttribute('aria-pressed', String(!v.muted));
    soundBtn.innerHTML = v.muted ? 'Sound on &#9834;' : 'Sound off';
    if (!v.muted) { userPlay = true; playBtn.hidden = true; if (v.paused) { v.currentTime = 0; tryPlay(); } }
  });
  if (!('IntersectionObserver' in window)) { if (!reduce) tryPlay(); return; }
  new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      inView = e.isIntersecting;
      if (inView && (!reduce || userPlay)) tryPlay();
      else if (!inView && !v.paused) v.pause();
    });
  }, { rootMargin: '200px 0px', threshold: 0.25 }).observe(v);
}

// ─── WORK REELS ──────────────────────────────────────────────────────────────
// Portfolio loops: muted, no controls. Fetched only when near the viewport,
// played while on screen, paused off screen. Reduced-motion keeps the poster.

function initWorkReels() {
  var reels = document.querySelectorAll('video.work-reel');
  if (!reels.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function load(v) { if (!v.src && v.dataset.src) { v.src = v.dataset.src; } }
  function play(v) { load(v); var p = v.play(); if (p && p.catch) p.catch(function() {}); }
  if (!('IntersectionObserver' in window)) { reels.forEach(play); return; }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) play(e.target);
      else if (!e.target.paused) e.target.pause();
    });
  }, { rootMargin: '200px 0px', threshold: 0.2 });
  reels.forEach(function(v) { obs.observe(v); });
}

// ─── INIT ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  renderServices();
  initHeroParallax();
  initNav();
  initContactForm();
  initScrollReveal();
  initFooterYear();
  initShowreel();
  initWorkReels();
});
