// main.js — LimeLogic Studio production vanilla JS
// Handles: portfolio render, services render, testimonials, nav, hover card, contact form

// ─── DATA ────────────────────────────────────────────────────────────────────

var PORTFOLIO = [
  {
    id: 'summit', client: 'Summit Cosmetics', project: 'Brand Refresh & Campaign',
    year: '2025', scope: ['Identity', 'Campaign', 'Packaging'],
    kind: 'real', tint: 'summit',
    blurb: 'A confident refresh for the Caribbean’s fastest-growing clean beauty line — new mark, new campaign system, new shelf presence.',
  },
  {
    id: 'coral', client: 'Coral Reef Rum', project: 'Packaging System',
    year: 'Spec', scope: ['Identity', 'Packaging'],
    kind: 'concept', tint: 'coral',
    blurb: 'A premium aged-rum concept — typographic-first label system, no tropical clichés.',
  },
  {
    id: 'atlas', client: 'Atlas Athletics', project: 'Product & Brand',
    year: 'Spec', scope: ['Brand', 'Product', 'Motion'],
    kind: 'concept', tint: 'atlas',
    blurb: 'A fitness platform concept exploring training as ritual, not gamification.',
  },
  {
    id: 'pulse', client: 'Pulse 96.1', project: 'Station Rebrand',
    year: 'Spec', scope: ['Identity', 'Motion', 'Sonic'],
    kind: 'concept', tint: 'pulse',
    blurb: 'Concept rebrand for a fictional T&T radio station — wordmark, on-air system, and station IDs.',
  },
  {
    id: 'northwind', client: 'Northwind', project: 'Fintech Identity',
    year: 'Spec', scope: ['Identity', 'Product', 'Web'],
    kind: 'concept', tint: 'northwind',
    blurb: 'A concept for a regional neobank — confident, civic, restrained.',
  },
  {
    id: 'carnival', client: 'Carnival 2026', project: 'Event Identity',
    year: 'Spec', scope: ['Identity', 'Campaign', 'Wayfinding'],
    kind: 'concept', tint: 'carnival',
    blurb: 'An exploration of mas’ as editorial — typography forward, color disciplined.',
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
// Mirrors the React Artwork / Treatment components from the design handoff.

function renderArtwork(tint) {
  var styles = {
    summit: { bg: 'linear-gradient(135deg,#1B2A1F 0%,#2A3F30 60%,#0F1612 100%)', accent: '#A8FF3E', typeColor: 'rgba(245,245,235,0.92)' },
    coral:  { bg: 'linear-gradient(160deg,#2A1E15 0%,#4A3220 50%,#1A1208 100%)', accent: '#E8C896', typeColor: 'rgba(232,200,150,0.95)' },
    atlas:  { bg: 'linear-gradient(180deg,#1F1F1F 0%,#0E0E0E 100%)', accent: '#F5F5F5', typeColor: 'rgba(245,245,245,0.96)' },
    pulse:  { bg: '#A8FF3E', accent: '#0A0A0A', typeColor: '#0A0A0A' },
    northwind: { bg: 'linear-gradient(160deg,#0F1620 0%,#1A2638 60%,#0A0F18 100%)', accent: '#7DA8E0', typeColor: 'rgba(220,230,245,0.95)' },
    carnival:  { bg: 'linear-gradient(135deg,#1A1A1A 0%,#2A1A2A 60%,#100614 100%)', accent: '#FF6B9D', typeColor: 'rgba(255,107,157,0.95)' },
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
  } else if (tint === 'carnival') {
    treatment = [
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden">',
        '<div style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(64px,10vw,140px);line-height:0.85;letter-spacing:-0.04em;color:' + s.typeColor + ';text-align:center;transform:rotate(-6deg);white-space:nowrap">MAS\'</div>',
      '</div>',
      '<div style="position:absolute;left:8%;bottom:8%;right:8%;display:flex;justify-content:space-between;font-family:JetBrains Mono,monospace;font-size:10px;color:rgba(255,107,157,0.6);letter-spacing:0.1em;text-transform:uppercase">',
        '<span>CARNIVAL &middot; 26</span><span>PORT OF SPAIN</span>',
      '</div>',
    ].join('');
  }

  return '<div class="surface" style="background:' + s.bg + ';position:absolute;inset:0;overflow:hidden">' + treatment + '</div>';
}

// ─── RENDER PORTFOLIO INDEX ──────────────────────────────────────────────────

function renderPortfolio() {
  var list = document.getElementById('portfolioList');
  if (!list) return;

  var html = '';
  PORTFOLIO.forEach(function(item, i) {
    var scopeText = item.scope.join(' &middot; ');
    var scopePills = item.scope.map(function(s){ return '<span>' + s + '</span>'; }).join('');
    var realDot = item.kind === 'real' ? '<b style="color:var(--lime)">&bull;</b> ' : '';

    html += '<li data-id="' + item.id + '">';
    html += '<span class="num">' + String(i + 1).padStart(2, '0') + '</span>';
    html += '<span class="name">' + realDot + item.client + '</span>';
    html += '<span class="scope-x">' + scopeText + '</span>';
    html += '<span class="arrow">&#8599;</span>';

    // Inline panel (mobile tap expand)
    html += '<div class="pi-inline">';
    html += '<div class="pi-inline-art">' + renderArtwork(item.tint) + '</div>';
    html += '<div class="pi-inline-body">';
    html += '<div class="pi-meta">';
    html += '<span class="pi-tag' + (item.kind === 'real' ? ' real' : '') + '">' + (item.kind === 'real' ? '&bull; Real client' : 'Concept') + '</span>';
    html += '<span>' + item.year + '</span>';
    html += '</div>';
    html += '<h4>' + item.project + '</h4>';
    html += '<p>' + item.blurb + '</p>';
    html += '<div class="pi-scope">' + scopePills + '</div>';
    html += '</div>';
    html += '</div>';

    html += '</li>';
  });

  list.innerHTML = html;
}

// ─── PORTFOLIO HOVER CARD ────────────────────────────────────────────────────

function initPortfolioHoverCard() {
  var portIndex = document.getElementById('portIndex');
  var piCard = document.getElementById('piCard');
  var list = document.getElementById('portfolioList');
  if (!portIndex || !piCard || !list) return;

  var isTouch = window.matchMedia('(hover: none)').matches;
  var hoveredItem = null;
  var mouseX = 0, mouseY = 0;

  // Cursor follow on the container
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

  // Hover on each list item
  var items = list.querySelectorAll('li');
  items.forEach(function(li) {
    var id = li.dataset.id;
    var item = PORTFOLIO.find(function(p){ return p.id === id; });
    if (!item) return;

    if (!isTouch) {
      li.addEventListener('mouseenter', function() {
        hoveredItem = item;
        list.classList.add('has-hover');
        li.classList.add('is-hover');

        // Populate card
        var scopePills = item.scope.map(function(s){ return '<span>' + s + '</span>'; }).join('');
        piCard.innerHTML = [
          '<div class="pi-card-art">' + renderArtwork(item.tint) + '</div>',
          '<div class="pi-card-body">',
            '<div class="pi-meta">',
              '<span class="pi-tag' + (item.kind === 'real' ? ' real' : '') + '">' + (item.kind === 'real' ? '&bull; Real client' : 'Concept') + '</span>',
              '<span>' + item.year + '</span>',
            '</div>',
            '<h4>' + item.project + '</h4>',
            '<p>' + item.blurb + '</p>',
            '<div class="pi-scope">' + scopePills + '</div>',
            '<div class="pi-cta">View case study <span>&#8594;</span></div>',
          '</div>',
        ].join('');

        piCard.classList.add('on');
      });

      li.addEventListener('mouseleave', function() {
        hoveredItem = null;
        list.classList.remove('has-hover');
        li.classList.remove('is-hover');
        piCard.classList.remove('on');
      });
    } else {
      // Touch: tap to expand inline panel
      li.addEventListener('click', function(e) {
        var isExpanded = li.classList.contains('is-expanded');
        // Collapse all
        items.forEach(function(x){ x.classList.remove('is-expanded'); });
        if (!isExpanded) {
          li.classList.add('is-expanded');
        }
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
    var delivs = svc.deliverables.map(function(d){ return '<span>' + d + '</span>'; }).join('');
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

  // Wire dot clicks
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

  // Close when a link is clicked
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

  // Service chips toggle
  var chips = form.querySelectorAll('.cf-chip');
  chips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      chip.classList.toggle('on');
      // Update hidden field with selected services
      var selected = [];
      chips.forEach(function(c) {
        if (c.classList.contains('on')) selected.push(c.dataset.value);
      });
      if (servicesHidden) servicesHidden.value = selected.join(', ');
    });
  });

  // Form submit → Formspree
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
