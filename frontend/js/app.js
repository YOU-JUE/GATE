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

    // ---- Scroll Reveal Animation (with stagger) ----
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
                    // Stagger siblings: find index among revealed siblings
                    var parent = entry.target.parentElement;
                    var siblings = parent.querySelectorAll('.reveal');
                    var index = 0;
                    for (var i = 0; i < siblings.length; i++) {
                        if (siblings[i] === entry.target) { index = i; break; }
                    }
                    entry.target.style.transitionDelay = (index * 0.1) + 's';
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

    // ---- Hero Particles (multi-color for dark theme) ----
    function initHeroParticles() {
        var container = document.getElementById('heroParticles');
        if (!container) return;

        var colors = [
            'rgba(99,102,241,',   // indigo
            'rgba(6,182,212,',    // cyan
            'rgba(236,72,153,',   // pink
            'rgba(16,185,129,',   // emerald
        ];

        for (var i = 0; i < 40; i++) {
            var particle = document.createElement('div');
            var color = colors[Math.floor(Math.random() * colors.length)];
            var size = Math.random() * 3 + 1;
            particle.style.cssText =
                'position:absolute;' +
                'width:' + size + 'px;' +
                'height:' + size + 'px;' +
                'background:' + color + (Math.random() * 0.4 + 0.1) + ');' +
                'border-radius:50%;' +
                'left:' + (Math.random() * 100) + '%;' +
                'top:' + (Math.random() * 100) + '%;' +
                'animation:particleFloat ' + (Math.random() * 8 + 6) + 's ease-in-out infinite;' +
                'animation-delay:' + (Math.random() * 5) + 's;' +
                'box-shadow:0 0 ' + (size * 3) + 'px ' + color + '0.3);';
            container.appendChild(particle);
        }

        // Add particle animation CSS
        var style = document.createElement('style');
        style.textContent =
            '@keyframes particleFloat {' +
            '  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }' +
            '  25% { transform: translate(' + (Math.random() * 60 - 30) + 'px, ' + (Math.random() * 60 - 30) + 'px) scale(1.5); opacity: 0.6; }' +
            '  50% { transform: translate(' + (Math.random() * 40 - 20) + 'px, ' + (Math.random() * 40 - 20) + 'px) scale(1); opacity: 0.8; }' +
            '  75% { transform: translate(' + (Math.random() * 60 - 30) + 'px, ' + (Math.random() * 60 - 30) + 'px) scale(1.3); opacity: 0.4; }' +
            '}';
        document.head.appendChild(style);
    }

    // ---- Mouse Glow Effect on Cards ----
    function initCardGlow() {
        document.addEventListener('mousemove', function(e) {
            var cards = document.querySelectorAll(
                '.value-card, .philosophy-card, .industry-card, .future-card, ' +
                '.tech-card, .contact-card, .about-card-intro, .contact-form-wrapper, .arch-diagram'
            );
            cards.forEach(function(card) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;

                if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
                    card.style.setProperty('--mouse-x', x + 'px');
                    card.style.setProperty('--mouse-y', y + 'px');
                    card.style.background =
                        'radial-gradient(300px circle at ' + x + 'px ' + y + 'px, ' +
                        'rgba(99, 102, 241, 0.06), transparent 60%), ' +
                        'rgba(255, 255, 255, 0.04)';
                } else {
                    card.style.background = 'rgba(255, 255, 255, 0.04)';
                }
            });
        });
    }

    // ---- Contact Form (Web3Forms) ----
    // 取得 Access Key：https://web3forms.com （用 jennie@youjue.ai 註冊）
    var WEB3FORMS_KEY = '4baa0302-03cf-4bd5-b3b1-4d3d7eb698a2';

    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var submitBtn = document.getElementById('contactSubmitBtn');
            var originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送出中...';

            var subjectMap = {
                'product': '產品諮詢',
                'enterprise': '企業合作洽談',
                'technical': '技術支援',
                'media': '媒體採訪',
                'other': '其他'
            };

            var subjectValue = document.getElementById('contactSubject').value;
            var formData = {
                access_key: WEB3FORMS_KEY,
                subject: '【官網聯繫】' + (subjectMap[subjectValue] || subjectValue),
                from_name: '宥爵官網聯繫表單',
                name: document.getElementById('contactName').value.trim(),
                email: document.getElementById('contactEmail').value.trim(),
                company: document.getElementById('contactCompany').value.trim() || '未填寫',
                message: document.getElementById('contactMessage').value.trim()
            };

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.success) {
                    showToast('success', '訊息已送出！我們會儘快與您聯繫。');
                    form.reset();
                } else {
                    showToast('error', '送出失敗，請稍後再試或直接寄信至 jennie@youjue.ai');
                }
            })
            .catch(function() {
                showToast('error', '網路連線異常，請稍後再試或直接寄信至 jennie@youjue.ai');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }

    // ---- Toast Notification (dark theme) ----
    function showToast(type, message) {
        var existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast-notification toast-' + type;

        var icon = type === 'success' ? 'fa-check-circle'
            : type === 'error' ? 'fa-exclamation-circle'
            : 'fa-info-circle';

        toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';

        // Toast styles (dark theme compatible)
        toast.style.cssText =
            'position:fixed;top:90px;right:24px;z-index:9999;' +
            'display:flex;align-items:center;gap:10px;' +
            'padding:16px 24px;border-radius:12px;' +
            'font-size:0.95rem;font-weight:500;' +
            'box-shadow:0 10px 30px rgba(0,0,0,0.4);' +
            'animation:fadeInUp 0.4s ease;' +
            'max-width:400px;backdrop-filter:blur(12px);';

        if (type === 'success') {
            toast.style.background = 'rgba(16, 185, 129, 0.15)';
            toast.style.color = '#34D399';
            toast.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        } else if (type === 'error') {
            toast.style.background = 'rgba(239, 68, 68, 0.15)';
            toast.style.color = '#F87171';
            toast.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        } else {
            toast.style.background = 'rgba(99, 102, 241, 0.15)';
            toast.style.color = '#818CF8';
            toast.style.border = '1px solid rgba(99, 102, 241, 0.3)';
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
        initCardGlow();
        initContactForm();
        handleNavScroll();
        handleBackToTop();
    });

})();
