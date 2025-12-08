/**
 * FRIENDSHIP BAPTIST CHURCH - MAIN JAVASCRIPT
 * Handles navigation, forms, animations, and interactions
 */

// ===== MOBILE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const header = document.getElementById('header');

    // Toggle mobile menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active')) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-toggle')) {
                mainNav.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
    });

    // Close mobile menu when window is resized
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav) {
            mainNav.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
        }
    });

    // ===== STICKY HEADER =====
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== FORM VALIDATION =====
    const forms = document.querySelectorAll('form[data-netlify="true"]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Let Netlify handle the submission
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#800000';
                } else {
                    field.style.borderColor = '#DDDDDD';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // ===== EVENT CALENDAR FILTERING =====
    const eventFilters = document.querySelectorAll('.event-filter');
    if (eventFilters.length > 0) {
        eventFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                const events = document.querySelectorAll('.event-item');

                // Update active filter
                eventFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');

                // Filter events
                events.forEach(event => {
                    if (category === 'all' || event.getAttribute('data-category') === category) {
                        event.style.display = 'block';
                        setTimeout(() => event.style.opacity = '1', 10);
                    } else {
                        event.style.opacity = '0';
                        setTimeout(() => event.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // ===== SERMON FILTERING =====
    const sermonFilters = document.querySelectorAll('.sermon-filter');
    if (sermonFilters.length > 0) {
        sermonFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const series = this.getAttribute('data-series');
                const sermons = document.querySelectorAll('.sermon-item');

                // Update active filter
                sermonFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');

                // Filter sermons
                sermons.forEach(sermon => {
                    if (series === 'all' || sermon.getAttribute('data-series') === series) {
                        sermon.style.display = 'block';
                        setTimeout(() => sermon.style.opacity = '1', 10);
                    } else {
                        sermon.style.opacity = '0';
                        setTimeout(() => sermon.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // ===== GIVING AMOUNT QUICK SELECT =====
    const quickAmounts = document.querySelectorAll('.quick-amount');
    const customAmountInput = document.getElementById('customAmount');

    if (quickAmounts.length > 0) {
        quickAmounts.forEach(btn => {
            btn.addEventListener('click', function() {
                quickAmounts.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (customAmountInput) {
                    customAmountInput.value = this.getAttribute('data-amount');
                }
            });
        });
    }

    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            quickAmounts.forEach(b => b.classList.remove('active'));
        });
    }

    // ===== ANIMATION ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation
    const animatedElements = document.querySelectorAll('.event-card, .quick-link-card, .ministry-card, .sermon-card, .team-member');
    animatedElements.forEach(el => observer.observe(el));

    // ===== LIVE STREAM STATUS =====
    const liveIndicator = document.getElementById('liveStatus');
    if (liveIndicator) {
        checkLiveStatus();
        setInterval(checkLiveStatus, 60000); // Check every minute
    }

    function checkLiveStatus() {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const time = hours * 60 + minutes;

        // Sunday 10:30 AM - 12:00 PM (630 - 720 minutes)
        const sundayMorning = day === 0 && time >= 630 && time <= 720;
        // Sunday 6:00 PM - 7:30 PM (1080 - 1170 minutes)
        const sundayEvening = day === 0 && time >= 1080 && time <= 1170;
        // Wednesday 7:00 PM - 8:30 PM (1140 - 1230 minutes)
        const wednesday = day === 3 && time >= 1140 && time <= 1230;

        if (sundayMorning || sundayEvening || wednesday) {
            if (liveIndicator) {
                liveIndicator.innerHTML = '<span class="live-badge">🔴 LIVE NOW</span>';
            }
        }
    }

    // ===== ACCORDION FUNCTIONALITY =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = this.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            // Open clicked accordion if it was closed
            if (!isOpen) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ===== NEWSLETTER SIGNUP =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Netlify Forms will handle this
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // ===== PRAYER REQUEST FORM =====
    const prayerForm = document.getElementById('prayerForm');
    if (prayerForm) {
        prayerForm.addEventListener('submit', function(e) {
            // Netlify will handle the actual submission
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        });
    }

    // ===== IMAGE LAZY LOADING =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== ANNOUNCEMENT BANNER DISMISS =====
    const announcementBanner = document.querySelector('.announcement-banner');
    const dismissBtn = document.querySelector('.dismiss-announcement');

    if (dismissBtn) {
        dismissBtn.addEventListener('click', function() {
            announcementBanner.style.display = 'none';
            localStorage.setItem('announcementDismissed', 'true');
        });
    }

    // Check if announcement was already dismissed
    if (announcementBanner && localStorage.getItem('announcementDismissed') === 'true') {
        announcementBanner.style.display = 'none';
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #800000;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 999;
        pointer-events: none;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== EMAIL VALIDATION =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== PHONE NUMBER FORMATTING =====
function formatPhoneNumber(input) {
    const cleaned = ('' + input).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return input;
}

// ===== FADE IN ANIMATION CSS =====
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .live-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        background-color: #FF0000;
        color: white;
        border-radius: 20px;
        font-weight: 700;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);
