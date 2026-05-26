// main.js — LimeLogic Studio production vanilla JS
// Handles: portfolio render, services render, testimonials, nav, hover card, contact form

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

var SERVICES = [
  { n: '01', title: 'Brand Identity',
    blurb: 'Marks, systems, and the rules that make them sing across every surface.',
    deliverables: ['Logo systems', 'Brand guidelines', 'Naming', 'Verbal identity'] },
  { n: '02', title: 'Web Design & Build',
    blurb: 'Sites that load fast, read clearly, and convert without shouting.',
    deliverables: ['Landing pages', 'Marketing sites', 'CMS integration', 'Cloudflare Pages deploy'] },
  { n: '03', title: 'Motion & Video',
    blurb: 'From three-second loops to ninety-second brand films.',
    deliverables: ['Social cutdowns', 'Brand films', 'Product motion', 'Title sequences'] },
  { n: '04', title: 'Campaign Direction',
    blurb: 'A through-line for launches, seasons, and product moments.',
    deliverables: ['Creative concept', 'Art direction', 'Media planning', 'Rollout'] },
  { n: '05', title: 'Content Production',
    blurb: 'Photography, video, and editorial — made for how people actually scroll.',
    deliverables: ['Photo direction', 'Video production', 'Editorial', 'Social packages'] },
  { n: '06', title: 'Strategy',
    blurb: 'The reason behind the work — audience, positioning, message, measurement.',
    deliverables: ['Brand strategy', 'Audience research', 'Positioning', 'Naming strategy'] },
];

var TESTIMONIALS = [
  { quote: 'They didn’t just rebrand us — they gave us a system our whole team could actually use. Six months in, we’re still finding new ways to stretch it.',
    name: 'Client Name', role: 'Director of Brand', company: 'Placeholder Co.' },
  { quote: 'The level of craft is genuinely rare for this market. Worth every conversation.',
    name: 'Client Name', role: 'Founder & CEO', company: 'Placeholder Co.' },
  { quote: 'Sharp thinking, fast turnarounds, and they actually push back when we’re wrong. That’s the part you can’t fake.',
    name: 'Client Name', role: 'Head of Marketing', company: 'Placeholder Co.' },
];

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
        '<div style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(40px,6vw,84px);line-height:0.9;letter-spacing:-0.03em;color:' + s.typeColor + ';text-align:left;width:100%">SUMMIT</div>',
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
          '<div style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(36px,5.8vw,80px);line-height:0.88;letter-spacing:-0.03em;color:' + s.typeColor + '">CODE<br>RED</div>',
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
          '<div style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(40px,6vw,88px);line-height:0.88;letter-spacing:-0.03em;color:' + s.typeColor + '">MAVIS</div>',
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
        '<div style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(60px,9.5vw,130px);line-height:0.85;letter-spacing:-0.04em;color:' + s.typeColor + ';text-align:center;transform:rotate(-5deg);white-space:nowrap;text-shadow:0 0 40px rgba(255,60,172,0.4)">MAS’</div>',
      '</div>',
      '<div style="position:absolute;left:8%;bottom:8%;right:8%;display:flex;justify-content:space-between;font-family:JetBrains Mono,monospace;font-size:9px;color:rgba(255,60,172,0.6);letter-spacing:0.1em;text-transform:uppercase">',
        '<span>CARNIVAL &middot; TT</span><span>AI APP</span>',
      '</div>',
    ].join('');

  } else if (tint === 'footballapp') {
    // Pitch grid + jersey number badge + type
    treatment = [
      '<div style="position:absolute;inset:0;background-image:linear-gradient(0deg,transparent 0 calc(100% - 1px),rgba(0,200,81,0.07) calc(100% - 1px)),linear-gradient(90deg,transparent 0 calc(100% - 1px),rgba(0,200,81,0.07) calc(100% - 1px));background-size:32px 32px"></div>',
      '<div style="position:absolute;top:8%;right:8%;font-family:Syne,sans-serif;font-weight:800;font-size:clamp(56px,8vw,96px);line-height:1;color:rgba(0,200,81,0.12);letter-spacing:-0.04em">10</div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:flex-start;padding:8%">',
        '<div>',
          '<div style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(30px,4.8vw,64px);line-height:0.9;letter-spacing:-0.03em;color:' + s.typeColor + '">THE<br>KIT</div>',
          '<div style="margin-top:12px;height:3px;width:40px;background:' + s.accent + '"></div>',
        '</div>',
      '</div>',
      '<div style="position:absolute;left:8%;bottom:8%;font-family:JetBrains Mono,monospace;font-size:9px;color:rgba(0,200,81,0.5);letter-spacing:0.1em;text-transform:uppercase">VIRTUAL TRY-ON &middot; AI</div>',
    ].join('');

  } else if (tint === 'coral') {
    treatment = [
      '<div style="position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,transparent 0 36px,rgba(232,200,150,0.04) 36px 37px)"></div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:8%">',
        '<div style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(28px,4.4vw,56px);line-height:0.95;letter-spacing:-0.02em;color:' + s.typeColor + ';text-align:center">CORAL<br>REEF</div>',
        '<div style="margin-top:16px;padding:4px 12px;border:1px solid ' + s.accent + ';font-family:JetBrains Mono,monospace;font-size:9px;color:' + s.accent + ';letter-spacing:0.16em;text-transform:uppercase">AGED &middot; 12YR</div>',
      '</div>',
    ].join('');

  } else if (tint === 'atlas') {
    treatment = [
      '<div style="position:absolute;inset:0;background-image:linear-gradient(0deg,transparent 0 calc(100% - 1px),rgba(245,245,245,0.04) calc(100% - 1px)),linear-gradient(90deg,transparent 0 calc(100% - 1px),rgba(245,245,245,0.04) calc(100% - 1px));background-size:40px 40px"></div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:4%">',
        '<div style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(56px,8vw,120px);line-height:0.9;letter-spacing:-0.04em;color:' + s.typeColor + ';text-align:center;position:relative">',
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
      '<div style="position:absolute;left:8%;top:50%;transform:translateY(-50%);font-family:Syne,sans-serif;font-weight:800;font-size:clamp(36px,5.4vw,72px);line-height:0.9;letter-spacing:-0.03em;color:' + s.typeColor + '">',
        'PULSE<br><span style="font-size:0.4em;font-family:JetBrains Mono,monospace;letter-spacing:0.1em">96.1 FM</span>',
      '</div>',
    ].join('');

  } else if (tint === 'northwind') {
    treatment = [
      '<div style="position:absolute;inset:0;background-image:linear-gradient(90deg,transparent 0 calc(100% - 1px),rgba(125,168,224,0.06) calc(100% - 1px));background-size:24px 24px"></div>',
      '<div style="position:absolute;inset:0;display:flex;align-items:flex-end;padding:8%;flex-direction:column;justify-content:space-between">',
        '<div style="width:100%;display:flex;justify-content:space-between;font-family:JetBrains Mono,monospace;font-size:10px;color:rgba(125,168,224,0.5);letter-spacing:0.08em;text-transform:uppercase"><span>FDIC &middot; 0001</span><span>EST. 2026</span></div>',
        '<div style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(28px,4vw,52px);line-height:0.9;letter-spacing:-0.02em;color:' + s.typeColor + ';text-align:left;width:100%">NORTH<br>WIND</div>',
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

      html += '<li data-id="' + item.id + '">';
      html += '<span class="num">' + String(i + 1).padStart(2, '0') + '</span>';
      html += '<span class="name">' + dot + item.client + '</span>';
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
        var ctaHtml = item.url
          ? '<div class="pi-cta">View project <span>&#8594;</span></div>'
          : '';

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
            ctaHtml,
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

    } else {
      // Touch: tap to expand inline panel
      li.addEventListener('click', function() {
        var isExpanded = li.classList.contains('is-expanded');
        allItems.forEach(function(x) { x.classList.remove('is-expanded'); });
        if (!isExpanded) li.classList.add('is-expanded');
      });
    }
  });
}

// ─── RENDER SERVICES ────────────────────────────────────────────────────────

function renderServices() {
  var container = document.getElementById('servicesNumbered');
  if (!container) return;

  var html = '';
  SERVICES.forEach(function(svc) {
    var delivs = svc.deliverables.map(function(d) { return '<span>' + d + '</span>'; }).join('');
    html += '<div class="item">';
    html += '<div class="n">' + svc.n + '</div>';
    html += '<div class="body"><h3>' + svc.title + '</h3><p>' + svc.blurb + '</p></div>';
    html += '<div class="deliv">' + delivs + '</div>';
    html += '</div>';
  });

  container.innerHTML = html;
}

// ─── RENDER TESTIMONIALS ─────────────────────────────────────────────────────

var currentTst = 0;

function renderTestimonials() {
  var container = document.getElementById('tstEditorial');
  if (!container) return;

  var t = TESTIMONIALS[currentTst];
  var dots = TESTIMONIALS.map(function(_, k) {
    return '<i class="' + (k === currentTst ? 'on' : '') + '" data-idx="' + k + '"></i>';
  }).join('');

  container.innerHTML = [
    '<div class="quote-mark">&ldquo;</div>',
    '<q>' + t.quote + '</q>',
    '<div class="src">',
      '<div class="av"></div>',
      '<div>',
        '<div class="name"><b>' + t.name + '</b></div>',
        '<div class="role">' + t.role + ' &middot; ' + t.company + '</div>',
      '</div>',
    '</div>',
    '<div class="dots">' + dots + '</div>',
  ].join('');

  container.querySelectorAll('.dots i').forEach(function(dot) {
    dot.addEventListener('click', function() {
      currentTst = parseInt(dot.dataset.idx, 10);
      renderTestimonials();
    });
  });
}

// ─── HERO HEADLINE PARALLAX ──────────────────────────────────────────────────

function initHeroParallax() {
  var headline = document.getElementById('heroHeadline');
  if (!headline) return;
  window.addEventListener('scroll', function() {
    headline.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
  }, { passive: true });
}

// ─── NAV HAMBURGER ───────────────────────────────────────────────────────────

function initNav() {
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
    chip.addEventListener('click', function() {
      chip.classList.toggle('on');
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
        alert('Something went wrong — please email us directly at hello@limelogicstudio.com');
      }
    })
    .catch(function() {
      if (btn) { btn.disabled = false; btn.innerHTML = 'Send it <span class="arrow">&#8594;</span>'; }
      alert('Something went wrong — please email us directly at hello@limelogicstudio.com');
    });
  });
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
});
