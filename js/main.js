// main.js — LimeLogic Studio production vanilla JS
// Handles: portfolio render, services render, testimonials, nav, hover card, contact form

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

var PORTFOLIO = [
  // ── WORK — Real clients ──────────────────────────────────────────────────────
  {
    id: 'summit', client: 'Summit Cosmetics', project: 'Brand Refresh & Campaign',
    year: '2025', scope: ['Identity', 'Campaign', 'Packaging'],
    kind: 'real', tint: 'summit', url: null,
    blurb: 'A confident refresh for the Caribbean’s fastest-growing clean beauty line — new mark, new campaign system, new shelf presence.',
  },
  {
    id: 'codered', client: 'Code Red Security', project: 'Brand & Web Presence',
    year: '2026', scope: ['Identity', 'Web'],
    kind: 'real', tint: 'codered', url: 'https://coderedtt.com',
    blurb: 'A no-nonsense web presence for T&T’s premier security firm — built for trust, built for mobile, built to convert.',
  },
  {
    id: 'mavis', client: 'Kafè Blue', project: 'Steel & Voices — Digital Tribute',
    year: '2026', scope: ['Experience Design', 'Web', 'Cultural'],
    kind: 'real', tint: 'mavis', url: 'https://steel-and-voices-mavis-john.vercel.app',
    blurb: 'A museum-grade digital retrospective for the Soul Queen of the Caribbean — twelve chapters, interactive timeline, and a song constellation across five decades.',
  },
  // ── BUILT — Own products ─────────────────────────────────────────────────────
  {
    id: 'carnivalapp', client: 'LimeLogic', project: 'Carnival Costume Creator',
    year: '2026', scope: ['AI App', 'Product'],
    kind: 'product', tint: 'carnivalapp', url: 'https://carnival-costume-creator-trinidad-edition-833592979318.us-west1.run.app/',
    blurb: 'Drop your photo in. Come out in full mas’. An AI photo experience built for Trinidad Carnival — no costume required.',
  },
  {
    id: 'footballapp', client: 'LimeLogic', project: 'Football Virtual Try-on',
    year: '2026', scope: ['AI App', 'Product'],
    kind: 'product', tint: 'footballapp', url: 'https://football-hero-virtual-try-on-833592979318.us-west1.run.app',
    blurb: 'Pick your kit. Upload your photo. See yourself on the pitch. An AI try-on app for football fans across the Caribbean.',
  },
  // ── EXPLORED — Concept work ──────────────────────────────────────────────────
  {
    id: 'coral', client: 'Coral Reef Rum', project: 'Packaging System',
    year: 'Spec', scope: ['Identity', 'Packaging'],
    kind: 'concept', tint: 'coral', url: null,
    blurb: 'A premium aged-rum concept — typographic-first label system, no tropical clichés.',
  },
  {
    id: 'northwind', client: 'Northwind', project: 'Fintech Identity',
    year: 'Spec', scope: ['Identity', 'Product', 'Web'],
    kind: 'concept', tint: 'northwind', url: null,
    blurb: 'A concept for a regional neobank — confident, civic, restrained.',
  },
  {
    id: 'atlas', client: 'Atlas Athletics', project: 'Product & Brand',
    year: 'Spec', scope: ['Brand', 'Product', 'Motion'],
    kind: 'concept', tint: 'atlas', url: null,
    blurb: 'A fitness platform concept exploring training as ritual, not gamification.',
  },
  {
    id: 'pulse', client: 'Pulse 96.1', project: 'Station Rebrand',
    year: 'Spec', scope: ['Identity', 'Motion', 'Sonic'],
    kind: 'concept', tint: 'pulse', url: null,
    blurb: 'Concept rebrand for a fictional T&T radio station — wordmark, on-air system, and station IDs.',
  },
];

// SERVICES_COPY — confirmed pricing + final outcome copy (updated 2026-05-28)
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
    outcome: 'Consistent, on-brand content every month — planned, produced, and scheduled. You review it. We handle everything else.',
    deliverables: ['Monthly content calendar (shared 1 week ahead)', 'Social graphics + short-form video', 'Captions, scheduling + monthly analytics report'],
    whoFor: 'Brands that need to show up consistently on social without managing it themselves.',
    retainer: true,
    pricingTTD: 'From TTD 4,050 / mo',
  },
  {
    n: '03',
    title: 'AI Production Sprint',
    outcome: 'Campaign-ready visuals and video in days — not weeks. AI-accelerated production without the AI-generic look.',
    deliverables: ['AI-generated imagery + composites', 'Short-form video edits (9:16 + 1:1)', 'Brand-matched delivery, launch-ready'],
    whoFor: 'Launches, campaigns, and moments that cannot wait three weeks for a traditional agency.',
    retainer: false,
    pricingTTD: 'From TTD 2,700',
  },
  {
    n: '04',
    title: 'Web Build',
    outcome: 'A site that loads fast, reads clearly, and turns visitors into leads. The starting point for everything else we do together.',
    deliverables: ['Conversion-focused design + copywriting', 'Mobile-first, SEO-ready build', 'Cloudflare Pages deploy + handoff'],
    whoFor: 'Businesses with a story to tell and a website that does not tell it.',
    retainer: false,
    pricingTTD: 'From TTD 8,000',
  },
  {
    n: '05',
    title: 'Motion + Launch Pack',
    outcome: 'Video content that stops the scroll — from concept to final cut, delivered launch-ready. Built for campaigns, not archives.',
    deliverables: ['Brand reels + promo videos', 'Social video cuts (9:16 + 1:1)', 'Launch campaign assets, packaged for distribution'],
    whoFor: 'Product launches, seasonal campaigns, and brand moments that need movement.',
    retainer: false,
    pricingTTD: 'From TTD 4,000',
  },
  {
    n: '06',
    title: 'Monthly Growth Retainer',
    outcome: 'Content, campaigns, strategy, and creative direction in one monthly partnership. No briefing three agencies. No dropped balls.',
    deliverables: ['Content production + scheduling (3 platforms)', 'Campaign strategy + bi-weekly calls', 'Competitor monitoring + monthly performance review'],
    whoFor: 'Brands ready to treat marketing as infrastructure — not a one-off project.',
    retainer: true,
    pricingTTD: 'From TTD 11,500 / mo',
  },
];

// TESTIMONIALS — kept for reference; real quotes being collected
// Will replace the proof-in-progress scaffold when received
var TESTIMONIALS = [];

// ─── ARTWORK RENDERER ────────────────────────────────────────────────────────
// Generates typographic portfolio card artwork as HTML string.

function renderArtwork(tint) {
  var styles = {
    summit:      { bg: 'linear-gradient(135deg,#1B2A1F 0%,#2A3F30 60%,#0F1612 100%)', accent: '#A8FF3E', typeColor: 'rgba(245,245,235,0.92)' },
    codered:     { bg: 'linear-gradient(160deg,#0A0808 0%,#1A0C0C 60%,#050303 100%)', accent: '#E03A3A', typeColor: 'rgba(240,220,220,0.95)' },
    mavis:       { bg: 'linear-gradient(160deg,#0D1420 0%,#1A2535 60%,#080D15 100%)', accent: '#C9963A', typeColor: 'rgba(220,190,140,0.95)' },
    carnivalapp: { bg: 'linear-gradient(135deg,#1A0A2E 0%,#2D1154 60%,#0D0518 100%)', accent: '#FF3CAC', typeColor: 'rgba(255,60,172,0.95)' },
    footballapp: { bg: 'linear-gradient(180deg,#0A1209 0%,#1A2B18 50%,#050A04 100%)', accent: '#00C851', typeColor: 'rgba(220,245,220,0.95)' },
    coral:       { bg: 'linear-gradient(160deg,#2A1E15 0%,#4A3220 50%,#1A1208 100%)', accent: '#E8C896', typeColor: 'rgba(232,200,150,0.95)' },
    atlas:       { bg: 'linear-gradient(180deg,#1F1F1F 0%,#0E0E0E 100%)', accent: '#F5F5F5', typeColor: 'rgba(245,245,245,0.96)' },
    pulse:       { bg: '#A8FF3E', accent: '#0A0A0A', typeColor: '#0A0A0A' },
    northwind:   { bg: 'linear-gradient(160deg,#0F1620 0%,#1A2638 60%,#0A0F18 100%)', accent: '#7DA8E0', typeColor: 'rgba(220,230,245,0.95)' },
  };
  var s = styles[tint] || styles.atlas;
  var treatment = '';

  if (tint === 'summit') {
    treatment = [
      '<div style="position:absolute;left:8%;right:8%;bottom:32%;height:1px;background:' + s.accent + ';opacity:0.5"></div>',
      '<div style="position:absolute;left:50%;bottom:32%;width:6px;height:6px;border-radius:50%;background:' + s.accent + ';transform:translate(-50%,50%)"></div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:flex-start;padding:8% 8% 12%;flex-direction:column">',
        '<div style="width:100%;display:flex;justify-content:space-between;font-family:JetBrains Mono,monospace;font-size:10px;color:rgba(245,245,235,0.5);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:auto"><span>EST &middot; 2018</span><span>SUMMIT / CAMPAIGN</span></div>',
        '<div style="font-family:var(--f-display);font-weight:700;font-size:clamp(40px,6vw,84px);line-height:0.9;letter-spacing:-0.03em;color:' + s.typeColor + ';text-align:left;width:100%">SUMMIT</div>',
        '<div style="font-family:JetBrains Mono,monospace;font-size:10px;color:rgba(245,245,235,0.4);letter-spacing:0.12em;text-transform:uppercase;margin-top:8px;align-self:flex-start">CLEAN BEAUTY &middot; TT</div>',
      '</div>',
    ].join('');

  } else if (tint === 'codered') {
    // Scan-line overlay + bold type
    treatment = [
      '<div style="position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent 0 3px,rgba(224,58,58,0.04) 3px 4px)"></div>',
      '<div style="position:absolute;top:8%;right:8%;font-family:JetBrains Mono,monospace;font-size:9px;color:rgba(224,58,58,0.5);letter-spacing:0.14em;text-transform:uppercase">LOYALTY &middot; INTEGRITY &middot; COURAGE</div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:flex-start;padding:8%">',
        '<div>',
          '<div style="font-family:var(--f-display);font-weight:700;font-size:clamp(36px,5.8vw,80px);line-height:0.88;letter-spacing:-0.03em;color:' + s.typeColor + '">CODE<br>RED</div>',
          '<div style="margin-top:14px;height:3px;width:48px;background:' + s.accent + '"></div>',
        '</div>',
      '</div>',
      '<div style="position:absolute;left:8%;bottom:8%;font-family:JetBrains Mono,monospace;font-size:10px;color:rgba(224,58,58,0.5);letter-spacing:0.1em;text-transform:uppercase">SECURITY &middot; TT</div>',
    ].join('');

  } else if (tint === 'mavis') {
    // Constellation dots (fixed positions) + ruled line + large type
    var starPos = [[12,15],[35,8],[68,22],[88,10],[20,45],[55,35],[78,50],[15,70],[42,80],[90,65],[30,92],[70,85]];
    var stars = starPos.map(function(p) {
      return '<div style="position:absolute;left:' + p[0] + '%;top:' + p[1] + '%;width:2px;height:2px;border-radius:50%;background:' + s.accent + ';opacity:0.55"></div>';
    }).join('');
    // A couple of brighter stars
    var brightStars = [[22,28],[60,18],[80,38]].map(function(p) {
      return '<div style="position:absolute;left:' + p[0] + '%;top:' + p[1] + '%;width:3px;height:3px;border-radius:50%;background:' + s.accent + ';opacity:0.9;box-shadow:0 0 6px ' + s.accent + '"></div>';
    }).join('');
    treatment = [
      stars, brightStars,
      '<div style="position:absolute;left:8%;right:8%;top:42%;height:1px;background:' + s.accent + ';opacity:0.3"></div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:flex-end;padding:8% 8% 14%">',
        '<div>',
          '<div style="font-family:JetBrains Mono,monospace;font-size:9px;color:rgba(201,150,58,0.6);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:10px">SOUL QUEEN &middot; CARIBBEAN</div>',
          '<div style="font-family:var(--f-display);font-weight:700;font-size:clamp(40px,6vw,88px);line-height:0.88;letter-spacing:-0.03em;color:' + s.typeColor + '">MAVIS</div>',
        '</div>',
      '</div>',
    ].join('');

  } else if (tint === 'carnivalapp') {
    // Confetti dots + rotated type
    var confPos = [[8,12],[22,5],[40,18],[58,6],[74,20],[88,8],[15,55],[30,40],[50,62],[68,48],[82,58],[10,82],[35,75],[60,88],[85,72]];
    var confetti = confPos.map(function(p, idx) {
      var colors = ['#FF3CAC','#FFD700','#A8FF3E','#FF8C00','#FF3CAC'];
      var c = colors[idx % colors.length];
      return '<div style="position:absolute;left:' + p[0] + '%;top:' + p[1] + '%;width:4px;height:4px;border-radius:' + (idx % 2 === 0 ? '50%' : '1px') + ';background:' + c + ';opacity:0.7;transform:rotate(' + (idx * 37) + 'deg)"></div>';
    }).join('');
    treatment = [
      confetti,
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden">',
        '<div style="font-family:var(--f-display);font-weight:700;font-size:clamp(60px,9.5vw,130px);line-height:0.85;letter-spacing:-0.04em;color:' + s.typeColor + ';text-align:center;transform:rotate(-5deg);white-space:nowrap;text-shadow:0 0 40px rgba(255,60,172,0.4)">MAS’</div>',
      '</div>',
      '<div style="position:absolute;left:8%;bottom:8%;right:8%;display:flex;justify-content:space-between;font-family:JetBrains Mono,monospace;font-size:9px;color:rgba(255,60,172,0.6);letter-spacing:0.1em;text-transform:uppercase">',
        '<span>CARNIVAL &middot; TT</span><span>AI APP</span>',
      '</div>',
    ].join('');

  } else if (tint === 'footballapp') {
    // Pitch grid + jersey number badge + type
    treatment = [
      '<div style="position:absolute;inset:0;background-image:linear-gradient(0deg,transparent 0 calc(100% - 1px),rgba(0,200,81,0.07) calc(100% - 1px)),linear-gradient(90deg,transparent 0 calc(100% - 1px),rgba(0,200,81,0.07) calc(100% - 1px));background-size:32px 32px"></div>',
      '<div style="position:absolute;top:8%;right:8%;font-family:var(--f-display);font-weight:700;font-size:clamp(56px,8vw,96px);line-height:1;color:rgba(0,200,81,0.12);letter-spacing:-0.04em">10</div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:flex-start;padding:8%">',
        '<div>',
          '<div style="font-family:var(--f-display);font-weight:700;font-size:clamp(30px,4.8vw,64px);line-height:0.9;letter-spacing:-0.03em;color:' + s.typeColor + '">THE<br>KIT</div>',
          '<div style="margin-top:12px;height:3px;width:40px;background:' + s.accent + '"></div>',
        '</div>',
      '</div>',
      '<div style="position:absolute;left:8%;bottom:8%;font-family:JetBrains Mono,monospace;font-size:9px;color:rgba(0,200,81,0.5);letter-spacing:0.1em;text-transform:uppercase">VIRTUAL TRY-ON &middot; AI</div>',
    ].join('');

  } else if (tint === 'coral') {
    treatment = [
      '<div style="position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,transparent 0 36px,rgba(232,200,150,0.04) 36px 37px)"></div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:8%">',
        '<div style="font-family:var(--f-display);font-weight:700;font-size:clamp(28px,4.4vw,56px);line-height:0.95;letter-spacing:-0.02em;color:' + s.typeColor + ';text-align:center">CORAL<br>REEF</div>',
        '<div style="margin-top:16px;padding:4px 12px;border:1px solid ' + s.accent + ';font-family:JetBrains Mono,monospace;font-size:9px;color:' + s.accent + ';letter-spacing:0.16em;text-transform:uppercase">AGED &middot; 12YR</div>',
      '</div>',
    ].join('');

  } else if (tint === 'atlas') {
    treatment = [
      '<div style="position:absolute;inset:0;background-image:linear-gradient(0deg,transparent 0 calc(100% - 1px),rgba(245,245,245,0.04) calc(100% - 1px)),linear-gradient(90deg,transparent 0 calc(100% - 1px),rgba(245,245,245,0.04) calc(100% - 1px));background-size:40px 40px"></div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:4%">',
        '<div style="font-family:var(--f-display);font-weight:700;font-size:clamp(56px,8vw,120px);line-height:0.9;letter-spacing:-0.04em;color:' + s.typeColor + ';text-align:center;position:relative">',
          'ATLAS',
          '<div style="position:absolute;left:0;right:0;top:50%;height:1px;background:' + s.typeColor + ';opacity:0.4"></div>',
        '</div>',
      '</div>',
      '<div style="position:absolute;left:8%;bottom:8%;font-family:JetBrains Mono,monospace;font-size:10px;color:rgba(245,245,245,0.4);letter-spacing:0.1em;text-transform:uppercase">RUN &middot; LIFT &middot; BREATHE</div>',
    ].join('');

  } else if (tint === 'pulse') {
    var waves = '';
    for (var i = 1; i <= 4; i++) {
      waves += '<div style="position:absolute;left:70%;top:50%;width:' + (80*i) + 'px;height:' + (80*i) + 'px;border-radius:50%;border:1px solid rgba(0,0,0,0.18);transform:translate(-50%,-50%)"></div>';
    }
    treatment = [
      waves,
      '<div style="position:absolute;left:70%;top:50%;width:16px;height:16px;border-radius:50%;background:#0A0A0A;transform:translate(-50%,-50%)"></div>',
      '<div style="position:absolute;left:8%;top:50%;transform:translateY(-50%);font-family:var(--f-display);font-weight:700;font-size:clamp(36px,5.4vw,72px);line-height:0.9;letter-spacing:-0.03em;color:' + s.typeColor + '">',
        'PULSE<br><span style="font-size:0.4em;font-family:JetBrains Mono,monospace;letter-spacing:0.1em">96.1 FM</span>',
      '</div>',
    ].join('');

  } else if (tint === 'northwind') {
    treatment = [
      '<div style="position:absolute;inset:0;background-image:linear-gradient(90deg,transparent 0 calc(100% - 1px),rgba(125,168,224,0.06) calc(100% - 1px));background-size:24px 24px"></div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:flex-end;padding:8%;flex-direction:column;justify-content:space-between">',
        '<div style="width:100%;display:flex;justify-content:space-between;font-family:JetBrains Mono,monospace;font-size:10px;color:rgba(125,168,224,0.5);letter-spacing:0.08em;text-transform:uppercase"><span>FDIC &middot; 0001</span><span>EST. 2026</span></div>',
        '<div style="font-family:var(--f-display);font-weight:700;font-size:clamp(28px,4vw,52px);line-height:0.9;letter-spacing:-0.02em;color:' + s.typeColor + ';text-align:left;width:100%">NORTH<br>WIND</div>',
      '</div>',
    ].join('');
  }

  return '<div class="surface" style="background:' + s.bg + ';position:absolute;inset:0;overflow:hidden">' + treatment + '</div>';
}

// ─── PORTFOLIO TAG HELPER ────────────────────────────────────────────────────

function portfolioTag(kind) {
  if (kind === 'real')    return { cls: 'pi-tag real', text: '&bull; Real client' };
  if (kind === 'product') return { cls: 'pi-tag real', text: '&bull; Built' };
  return { cls: 'pi-tag', text: 'Concept' };
}

// ─── RENDER PORTFOLIO — 3-SECTION LAYOUT ────────────────────────────────────

function renderPortfolio() {
  var container = document.getElementById('portfolioSections');
  if (!container) return;

  var sections = [
    { kind: 'real',    label: 'Work',     kicker: 'Real briefs. Real clients.' },
    { kind: 'product', label: 'Built',    kicker: 'Things we made for ourselves.' },
    { kind: 'concept', label: 'Explored', kicker: 'Spec work. No brief required.' },
  ];

  var html = '';
  sections.forEach(function(sec) {
    var items = PORTFOLIO.filter(function(p) { return p.kind === sec.kind; });
    if (!items.length) return;

    html += '<div class="port-section">';
    html += '<div class="port-sec-head">';
    html += '<span class="port-sec-kicker">' + sec.kicker + '</span>';
    html += '<span class="port-sec-label">' + sec.label + '</span>';
    html += '</div>';
    html += '<ol class="portfolioList">';

    items.forEach(function(item, i) {
      var scopeText = item.scope.join(' &middot; ');
      var scopePills = item.scope.map(function(s) { return '<span>' + s + '</span>'; }).join('');
      var hasAccent = item.kind === 'real' || item.kind === 'product';
      var dot = hasAccent ? '<b style="color:var(--lime)">&bull;</b> ' : '';
      var tag = portfolioTag(item.kind);
      var ctaHtml = item.url
        ? '<a class="pi-cta" href="' + item.url + '" target="_blank" rel="noopener">View project <span>&#8594;</span></a>'
        : '';

      html += '<li data-id="' + item.id + '" role="button" tabindex="0" aria-expanded="false" aria-label="' + item.client + ' — ' + item.project + '. Open details.">';
      html += '<span class="num">' + String(i + 1).padStart(2, '0') + '</span>';
      html += '<span class="name">' + dot + (item.kind === 'product' ? item.project : item.client) + '</span>';
      html += '<span class="scope-x">' + scopeText + '</span>';
      html += '<span class="arrow">&#8599;</span>';

      // Inline expansion panel (touch tap)
      html += '<div class="pi-inline">';
      html += '<div class="pi-inline-art">' + renderArtwork(item.tint) + '</div>';
      html += '<div class="pi-inline-body">';
      html += '<div class="pi-meta">';
      html += '<span class="' + tag.cls + '">' + tag.text + '</span>';
      html += '<span>' + item.year + '</span>';
      html += '</div>';
      html += '<h4>' + item.project + '</h4>';
      html += '<p>' + item.blurb + '</p>';
      html += '<div class="pi-scope">' + scopePills + '</div>';
      html += ctaHtml;
      html += '</div>';
      html += '</div>';

      html += '</li>';
    });

    html += '</ol>';
    html += '</div>';
  });

  container.innerHTML = html;
}

// ─── PORTFOLIO HOVER CARD ────────────────────────────────────────────────────

function initPortfolioHoverCard() {
  var portIndex = document.getElementById('portIndex');
  var piCard = document.getElementById('piCard');
  if (!portIndex || !piCard) return;

  var isTouch = window.matchMedia('(hover: none)').matches;
  var hoveredItem = null;
  var mouseX = 0, mouseY = 0;

  // Cursor follow — scoped to the whole port-index wrapper
  portIndex.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!hoveredItem) return;

    var cardW = 380, cardH = 360, margin = 24;
    var flipX = mouseX + cardW + margin > window.innerWidth;
    var flipY = mouseY + cardH + margin > window.innerHeight;

    piCard.style.left = mouseX + 'px';
    piCard.style.top = mouseY + 'px';
    piCard.classList.toggle('flip-x', flipX);
    piCard.classList.toggle('flip-y', flipY);
  });

  // Wire all items across all 3 lists
  var allItems = portIndex.querySelectorAll('ol li');
  allItems.forEach(function(li) {
    var id = li.dataset.id;
    var item = PORTFOLIO.find(function(p) { return p.id === id; });
    if (!item) return;

    var parentList = li.closest('ol');
    var tag = portfolioTag(item.kind);

    if (!isTouch) {
      li.addEventListener('mouseenter', function() {
        hoveredItem = item;
        if (parentList) parentList.classList.add('has-hover');
        li.classList.add('is-hover');

        var scopePills = item.scope.map(function(s) { return '<span>' + s + '</span>'; }).join('');
        // Hover card is pure preview — no interactive elements.
        // Card follows cursor so nothing inside it can reliably be clicked.
        // Click/keyboard opens the persistent info panel below the row.
        piCard.innerHTML = [
          '<div class="pi-card-art">' + renderArtwork(item.tint) + '</div>',
          '<div class="pi-card-body">',
            '<div class="pi-meta">',
              '<span class="' + tag.cls + '">' + tag.text + '</span>',
              '<span>' + item.year + '</span>',
            '</div>',
            '<h4>' + item.project + '</h4>',
            '<p>' + item.blurb + '</p>',
            '<div class="pi-scope">' + scopePills + '</div>',
          '</div>',
        ].join('');

        piCard.classList.add('on');
      });

      li.addEventListener('mouseleave', function() {
        hoveredItem = null;
        if (parentList) parentList.classList.remove('has-hover');
        li.classList.remove('is-hover');
        piCard.classList.remove('on');
      });
    }

    // Info-first interaction (all devices): click / Enter / Space opens the
    // detail panel. The panel carries the external "View project" link when a
    // live URL exists — we NEVER auto-navigate off-site on the row click.
    function togglePanel() {
      var wasOpen = li.classList.contains('is-expanded');
      allItems.forEach(function(x) {
        x.classList.remove('is-expanded');
        x.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        li.classList.add('is-expanded');
        li.setAttribute('aria-expanded', 'true');
      }
      if (!isTouch && piCard) piCard.classList.remove('on'); // drop hover preview once panel is open
    }

    li.addEventListener('click', function(e) {
      if (e.target.closest('a')) return; // let the "View project" link do its job
      togglePanel();
    });

    li.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        togglePanel();
      }
    });
  });
}

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

// ─── RENDER PROOF IN PROGRESS ────────────────────────────────────────────────
// <!-- TESTIMONIALS_SCAFFOLD -->
// Real testimonials being collected from Summit Cosmetics + early clients.
// Swap proof-in-progress cards for real quotes when received.

function renderTestimonials() {
  var container = document.getElementById('tstEditorial');
  if (!container) return;

  container.innerHTML = [
    '<div class="pip-header">',
      '<span class="pip-kicker">PROOF IN PROGRESS.</span>',
      '<p class="pip-body">Real client testimonials are being collected now. Until they land, here&#8217;s what drives every project: clear strategy, premium output, fast turnaround, and work that earns its place in the market.</p>',
    '</div>',
    '<div class="proof-cards">',
      '<div class="proof-card">',
        '<div class="pc-num">01</div>',
        '<h4>Caribbean businesses need a real creative partner, not another vendor.</h4>',
        '<p>Every client we take on is a candidate for a long-term growth retainer. We build the kind of work that keeps showing up — month after month.</p>',
      '</div>',
      '<div class="proof-card">',
        '<div class="pc-num">02</div>',
        '<h4>AI production means more for your budget. We pass the efficiency to you.</h4>',
        '<p>Work that used to take weeks now takes days. We\'re not charging legacy rates for AI-accelerated output — and that\'s a real difference for Caribbean SMBs.</p>',
      '</div>',
      '<div class="proof-card proof-card--featured">',
        '<div class="pc-num">&#8599;</div>',
        '<h4>Real results are in progress. See the work while they land.</h4>',
        '<a href="#work" class="pc-link">View selected work &#8594;</a>',
      '</div>',
    '</div>',
  ].join('');
}

// ─── HERO HEADLINE PARALLAX ──────────────────────────────────────────────────

function initHeroParallax() {
  var headline = document.getElementById('heroHeadline');
  if (!headline) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('scroll', function() {
    headline.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
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
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────

function initContactForm() {
  var form = document.getElementById('contactForm');
  var successEl = document.getElementById('cfSuccess');
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
        if (window.plausible) window.plausible('Contact Form: Submit');
      } else {
        if (btn) { btn.disabled = false; btn.innerHTML = 'Send it <span class="arrow">&#8594;</span>'; }
        alert('Something went wrong — please email us directly at hello@limelogicstudio.com');
      }
    })
    .catch(function() {
      if (btn) { btn.disabled = false; btn.innerHTML = 'Send it <span class="arrow">&#8594;</span>'; }
      alert('Something went wrong — please email us directly at hello@limelogicstudio.com');
    });
  });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────

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
    { selector: '#portIndex li', delay: 60, card: false },
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

// ─── FOOTER YEAR ─────────────────────────────────────────────────────────────

function initFooterYear() {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ─── INIT ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  renderPortfolio();
  renderServices();
  renderTestimonials();
  initPortfolioHoverCard();
  initHeroParallax();
  initNav();
  initContactForm();
  initScrollReveal();
  initFooterYear();
});
