// ==========================================================================
// LimeLogic Media Lab - JavaScript
// "Global Level. Caribbean Soul."
// ==========================================================================

// --------------------------------------------------------------------------
// Mobile Menu Toggle
// --------------------------------------------------------------------------
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.main-nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        if (this.toggle && this.nav) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking a nav link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.site-header')) {
                    this.closeMenu();
                }
            });
        }
    }
    
    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.nav.classList.toggle('active');
    }
    
    closeMenu() {
        this.toggle.classList.remove('active');
        this.nav.classList.remove('active');
    }
}

// --------------------------------------------------------------------------
// Smooth Scroll for Navigation Links
// --------------------------------------------------------------------------
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#' || targetId === '#hero') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// --------------------------------------------------------------------------
// Scroll Animations
// --------------------------------------------------------------------------
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }
    
    init() {
        // Create Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.2, // Trigger when 20% of element is visible
                rootMargin: '0px 0px -50px 0px' // Slight offset
            }
        );
        
        // Observe all elements
        this.elements.forEach((element) => {
            this.observer.observe(element);
        });
    }
}

// --------------------------------------------------------------------------
// Scroll Indicator Click Handler
// --------------------------------------------------------------------------
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const credibilitySection = document.querySelector('#credibility');
            if (credibilitySection) {
                credibilitySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// --------------------------------------------------------------------------
// Parallax Effect for Hero Background
// --------------------------------------------------------------------------
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroCarousel = document.querySelector('.hero-carousel');
    
    if (hero && heroCarousel) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            // Only apply parallax while hero is visible
            if (scrollPosition < heroHeight) {
                const parallaxOffset = scrollPosition * 0.5;
                heroCarousel.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    }
}

// --------------------------------------------------------------------------
// Credibility Cards Stagger Animation
// --------------------------------------------------------------------------
function initCredibilityCards() {
    const cards = document.querySelectorAll('.credibility-card');
    
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// --------------------------------------------------------------------------
// Button Hover Effects Enhancement
// --------------------------------------------------------------------------
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach((button) => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// --------------------------------------------------------------------------
// Header Glassmorphism Scroll Effect
// --------------------------------------------------------------------------
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            // Add 'scrolled' class when user scrolls down 50px
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// --------------------------------------------------------------------------
// Performance Optimization: Debounce Function
// --------------------------------------------------------------------------
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// --------------------------------------------------------------------------
// Lazy Loading Images (for future portfolio section)
// --------------------------------------------------------------------------
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach((img) => imageObserver.observe(img));
}

// --------------------------------------------------------------------------
// Analytics Event Tracking (Placeholder)
// --------------------------------------------------------------------------
function trackEvent(category, action, label) {
    // Placeholder for future analytics integration (Google Analytics, etc.)
    console.log('Event tracked:', { category, action, label });
}

// CTA Click Tracking
function initAnalytics() {
    // Track "Book a Call" button clicks
    const bookCallButtons = document.querySelectorAll('a[href*="cal.com"]');
    bookCallButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'book_call_clicked', {
                    event_category: 'Conversion',
                    event_label: button.textContent.trim(),
                    value: 1
                });
            }
        });
    });
    
    // Track WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_clicked', {
                    event_category: 'Contact',
                    event_label: 'WhatsApp Direct',
                    value: 1
                });
            }
        });
    });
    
    // Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_clicked', {
                    event_category: 'Contact',
                    event_label: link.getAttribute('href'),
                    value: 1
                });
            }
        });
    });
    
    // Track social media clicks
    const socialLinks = document.querySelectorAll('a[href*="instagram.com"], a[href*="facebook.com"]');
    socialLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const platform = link.href.includes('instagram') ? 'Instagram' : 'Facebook';
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_media_clicked', {
                    event_category: 'Social',
                    event_label: platform,
                    value: 1
                });
            }
        });
    });
    
    // Track work grid filter usage
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'work_filter_used', {
                    event_category: 'Engagement',
                    event_label: button.dataset.filter,
                    value: 1
                });
            }
        });
    });
    
    // Track FAQ accordion interactions
    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'faq_opened', {
                    event_category: 'Engagement',
                    event_label: button.textContent.trim().substring(0, 50),
                    value: 1
                });
            }
        });
    });
    
    // Track video play
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('play', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'video_play', {
                    event_category: 'Engagement',
                    event_label: 'Hero Video',
                    value: 1
                });
            }
        });
    }
}

// --------------------------------------------------------------------------
// Page Load Performance Logging
// --------------------------------------------------------------------------
function logPagePerformance() {
    window.addEventListener('load', () => {
        if ('performance' in window && window.performance.timing) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            // Only log if we have valid timing data
            if (pageLoadTime > 0 && pageLoadTime < 60000) { // Less than 60 seconds
                console.log(`Page load time: ${pageLoadTime}ms`);
            }
        }
    });
}

// --------------------------------------------------------------------------
// Work Grid Filter Functionality
// --------------------------------------------------------------------------
class WorkGridFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.workCards = document.querySelectorAll('.work-card');
        this.init();
    }
    
    init() {
        if (this.filterButtons.length === 0) return;
        
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.handleFilter(button));
        });
    }
    
    handleFilter(clickedButton) {
        const filter = clickedButton.dataset.filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        
        // Filter cards with smooth animation
        this.workCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category === filter) {
                // Show card
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                card.classList.remove('hidden');
                
                // Animate in
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                // Hide card
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
        
        // Track filter event
        trackEvent('Work Grid', 'Filter', filter);
    }
}

// --------------------------------------------------------------------------
// FAQ Accordion Functionality
// --------------------------------------------------------------------------
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        if (this.faqItems.length === 0) return;
        
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleFAQ(item));
        });
    }
    
    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// --------------------------------------------------------------------------
// Contact Form Handler (Formspree)
// --------------------------------------------------------------------------
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form?.querySelector('button[type="submit"]');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable button during submission
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success message
                form.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px;">
                        <i class="fas fa-check-circle" style="font-size: 64px; color: var(--lime-green); margin-bottom: 20px;"></i>
                        <h3 style="color: var(--lime-green); margin-bottom: 15px;">Message Sent Successfully!</h3>
                        <p style="color: #ccc; margin-bottom: 30px;">We'll get back to you within 24 hours.</p>
                        <a href="https://wa.me/18687053555?text=Hi%20LimeLogic%20-%20I%20just%20submitted%20the%20contact%20form" 
                           class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                        </a>
                    </div>
                `;
                
                // Track successful submission
                if (window.gtag) {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: 'Contact Form Success'
                    });
                }
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error message
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = 'color: #ff6b6b; margin-top: 15px; text-align: center;';
            errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try WhatsApp instead.';
            form.appendChild(errorMsg);
            
            setTimeout(() => errorMsg.remove(), 5000);
        }
    });
}

// --------------------------------------------------------------------------
// Initialize Everything on DOM Ready
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 LimeLogic Media Lab - Initializing...');
    
    // Initialize all features
    new MobileMenu();
    new ScrollAnimations();
    new SmoothScroll();
    new WorkGridFilter(); // Work Grid filtering
    new FAQAccordion(); // FAQ accordion
    
    initScrollIndicator();
    initParallax();
    initCredibilityCards();
    initButtonEffects();
    initLazyLoading();
    initAnalytics();
    initHeaderScroll(); // Glassmorphism scroll effect
    initContactForm(); // Formspree contact form handler
    logPagePerformance();
    
    console.log('✅ LimeLogic Media Lab - Ready!');
    console.log('💚 "Global Level. Caribbean Soul."');
});

// --------------------------------------------------------------------------
// Window Resize Handler (Debounced)
// --------------------------------------------------------------------------
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments if needed
    console.log('Window resized');
}, 250));

// --------------------------------------------------------------------------
// Scroll Event Handler (Debounced)
// --------------------------------------------------------------------------
window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based features can be added here
}, 100));