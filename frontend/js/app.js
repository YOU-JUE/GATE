/* ================================================================
   宥爵智能科技 — 公司官網 JavaScript
   YouJue Intelligent Technology Co., Ltd.
   ================================================================ */

(function() {
    'use strict';

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll);

    // Mobile nav toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        var scrollY = window.scrollY + 100;
        sections.forEach(function(section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');
            var navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ---- Back to Top ----
    var backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Scroll Reveal Animation ----
    function initScrollReveal() {
        var revealElements = document.querySelectorAll(
            '.value-card, .philosophy-card, .industry-card, .future-card, ' +
            '.tech-card, .contact-card, .about-card-intro, .product-featured, ' +
            '.arch-diagram, .contact-form-wrapper, .philosophy-flow'
        );

        revealElements.forEach(function(el) {
            el.classList.add('reveal');
        });

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ---- Hero Particles ----
    function initHeroParticles() {
        var container = document.getElementById('heroParticles');
        if (!container) return;

        for (var i = 0; i < 30; i++) {
            var particle = document.createElement('div');
            particle.style.cssText =
                'position:absolute;' +
                'width:' + (Math.random() * 4 + 2) + 'px;' +
                'height:' + (Math.random() * 4 + 2) + 'px;' +
                'background:rgba(99,102,241,' + (Math.random() * 0.3 + 0.1) + ');' +
                'border-radius:50%;' +
                'left:' + (Math.random() * 100) + '%;' +
                'top:' + (Math.random() * 100) + '%;' +
                'animation:particleFloat ' + (Math.random() * 6 + 4) + 's ease-in-out infinite;' +
                'animation-delay:' + (Math.random() * 4) + 's;';
            container.appendChild(particle);
        }

        // Add particle animation CSS
        var style = document.createElement('style');
        style.textContent =
            '@keyframes particleFloat {' +
            '  0%, 100% { transform: translate(0, 0); opacity: 0.3; }' +
            '  50% { transform: translate(' + (Math.random() * 40 - 20) + 'px, ' + (Math.random() * 40 - 20) + 'px); opacity: 0.8; }' +
            '}';
        document.head.appendChild(style);
    }

    // ---- Contact Form ----
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var submitBtn = document.getElementById('contactSubmitBtn');
            var originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送出中...';

            var formData = {
                name: document.getElementById('contactName').value.trim(),
                email: document.getElementById('contactEmail').value.trim(),
                company: document.getElementById('contactCompany').value.trim(),
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value.trim()
            };

            // Try to submit to backend API
            var apiUrl = getApiUrl();
            fetch(apiUrl + '/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(function(response) {
                if (!response.ok) throw new Error('API error');
                return response.json();
            })
            .then(function() {
                showToast('success', '訊息已送出！我們會儘快與您聯繫。');
                form.reset();
            })
            .catch(function() {
                // Fallback: mailto
                var mailtoUrl = 'mailto:jennie@youjue.ai'
                    + '?subject=' + encodeURIComponent('[官網聯繫] ' + formData.subject)
                    + '&body=' + encodeURIComponent(
                        '姓名：' + formData.name + '\n'
                        + '信箱：' + formData.email + '\n'
                        + '公司：' + (formData.company || '未填寫') + '\n'
                        + '主旨：' + formData.subject + '\n\n'
                        + formData.message
                    );
                window.location.href = mailtoUrl;
                showToast('info', '正在開啟您的郵件程式...');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }

    // ---- API URL Helper ----
    function getApiUrl() {
        // In production, the API is on a different domain (Railway)
        // In development, it's localhost:8000
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:8000';
        }
        return window.API_URL || 'https://api.youjue.ai';
    }

    // ---- Toast Notification ----
    function showToast(type, message) {
        var existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast-notification toast-' + type;

        var icon = type === 'success' ? 'fa-check-circle'
            : type === 'error' ? 'fa-exclamation-circle'
            : 'fa-info-circle';

        toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';

        // Toast styles
        toast.style.cssText =
            'position:fixed;top:90px;right:24px;z-index:9999;' +
            'display:flex;align-items:center;gap:10px;' +
            'padding:16px 24px;border-radius:12px;' +
            'font-size:0.95rem;font-weight:500;' +
            'box-shadow:0 10px 30px rgba(0,0,0,0.15);' +
            'animation:fadeInUp 0.4s ease;' +
            'max-width:400px;';

        if (type === 'success') {
            toast.style.background = '#D1FAE5';
            toast.style.color = '#065F46';
        } else if (type === 'error') {
            toast.style.background = '#FEE2E2';
            toast.style.color = '#991B1B';
        } else {
            toast.style.background = '#DBEAFE';
            toast.style.color = '#1E40AF';
        }

        document.body.appendChild(toast);

        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(function() { toast.remove(); }, 300);
        }, 4000);
    }

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = navbar.offsetHeight + 20;
                var targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ---- Initialize ----
    document.addEventListener('DOMContentLoaded', function() {
        initScrollReveal();
        initHeroParticles();
        initContactForm();
        handleNavScroll();
        handleBackToTop();
    });

})();
