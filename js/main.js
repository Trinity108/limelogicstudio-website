/* ═══════════════════════════════════════════════
   LimeLogic Studio — main.js
   Nav · Mobile Menu · FAQ Accordion · Form Submit
════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     NAV — Scroll class + active link
  ───────────────────────────────────────────── */
  const navHeader = document.querySelector('.nav-header');

  function handleNavScroll() {
    if (window.scrollY > 20) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  /* ─────────────────────────────────────────────
     MOBILE MENU — Hamburger toggle
  ───────────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.hidden = isOpen;
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navHeader.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      }
    });
  }

  /* ─────────────────────────────────────────────
     FAQ ACCORDION
  ───────────────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-question');

  faqItems.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const answerId = this.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      // Close all others
      faqItems.forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherId = other.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherId);
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      // Toggle this one
      this.setAttribute('aria-expanded', String(!isExpanded));
      if (answer) answer.hidden = isExpanded;
    });
  });

  /* ─────────────────────────────────────────────
     HERO VIDEO — Play once, hold on final frame
  ───────────────────────────────────────────── */
  const heroVideo = document.querySelector('.hero-video');

  if (heroVideo) {
    heroVideo.addEventListener('ended', function () {
      // Seek to last frame and pause — holds the final frame
      this.currentTime = this.duration;
      this.pause();
    });

    // Fallback: if video fails to load, show static image
    heroVideo.addEventListener('error', function () {
      this.style.display = 'none';
      const fallback = document.querySelector('.hero-fallback');
      if (fallback) fallback.style.display = 'block';
    });
  }

  /* ─────────────────────────────────────────────
     INTAKE FORM — Fetch submit
  ───────────────────────────────────────────── */
  const intakeForm = document.getElementById('intake-form');

  if (intakeForm) {
    // Read endpoint from meta tag
    const endpointMeta = document.querySelector('meta[name="intake-endpoint"]');
    const endpoint = endpointMeta ? endpointMeta.getAttribute('content') : null;

    const submitBtn = intakeForm.querySelector('.btn-submit');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-submit__text') : null;
    const btnLoading = submitBtn ? submitBtn.querySelector('.btn-submit__loading') : null;
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    const errorText = document.getElementById('form-error-message');

    function setLoading(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      if (btnText) btnText.hidden = loading;
      if (btnLoading) btnLoading.hidden = !loading;
    }

    function showSuccess() {
      if (successMsg) successMsg.hidden = false;
      if (errorMsg) errorMsg.hidden = true;
      intakeForm.reset();
    }

    function showError(msg) {
      if (errorMsg) errorMsg.hidden = false;
      if (errorText) errorText.textContent = msg || 'Something went wrong. Try again or message us on WhatsApp.';
      if (successMsg) successMsg.hidden = true;
    }

    intakeForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Hide previous messages
      if (successMsg) successMsg.hidden = true;
      if (errorMsg) errorMsg.hidden = true;

      // Basic validation
      const requiredFields = intakeForm.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.focus();
          valid = false;
        }
      });

      if (!valid) {
        showError('Please fill in all required fields.');
        return;
      }

      // Build payload
      const formData = new FormData(intakeForm);
      const payload = {};
      formData.forEach(function (value, key) {
        payload[key] = value;
      });

      setLoading(true);

      // If no endpoint configured, graceful fallback
      if (!endpoint) {
        console.warn('No intake endpoint configured.');
        setTimeout(function () {
          setLoading(false);
          showSuccess();
        }, 800);
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          showSuccess();
          // GA4 event
          if (typeof gtag === 'function') {
            gtag('event', 'form_submit', {
              event_category: 'Intake',
              event_label: payload.service || 'unknown',
            });
          }
        } else {
          const data = await response.json().catch(function () { return {}; });
          showError(data.message || 'Submission failed. Please try again.');
        }
      } catch (err) {
        console.error('Form submit error:', err);
        showError('Network error. Check your connection or message us on WhatsApp.');
      } finally {
        setLoading(false);
      }
    });
  }

  /* ─────────────────────────────────────────────
     SMOOTH SCROLL — anchor links with offset
  ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = navHeader ? navHeader.offsetHeight : 72;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
    });
  });

  /* ─────────────────────────────────────────────
     LAZY IMAGE LOADING — IntersectionObserver
  ───────────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
    });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  }

})();
