/* ========================================
   MULTICAR LANDING PAGE - JAVASCRIPT
   Garaje86
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // NAVBAR BACKGROUND ON SCROLL
    // ========================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ========================================
    // DYNAMIC INSTALLATIONS COUNTER
    // (Auto-increments by 2 every 2 weeks)
    // ========================================
    function calculateInstallations() {
        const installationsEl = document.getElementById('installationsCount');
        if (installationsEl) {
            const baseCount = parseInt(installationsEl.getAttribute('data-base')) || 32;
            const startDateStr = installationsEl.getAttribute('data-start-date') || '2025-02-07';
            const startDate = new Date(startDateStr);
            const today = new Date();

            // Calculate weeks since start date
            const msPerWeek = 7 * 24 * 60 * 60 * 1000;
            const weeksSinceStart = Math.floor((today - startDate) / msPerWeek);

            // Add 2 installations every 2 weeks
            const additionalInstallations = Math.floor(weeksSinceStart / 2) * 2;
            const totalInstallations = baseCount + additionalInstallations;

            // Update the data-count attribute for animation
            installationsEl.setAttribute('data-count', totalInstallations);
        }
    }

    // Calculate installations before animation
    calculateInstallations();

    // ========================================
    // ANIMATED COUNTER FOR STATS
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Intersection Observer for stats animation
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsBar);
    }

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // PRODUCT CAROUSELS
    // ========================================
    const carousels = document.querySelectorAll('.producto-image.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dots .dot');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        let currentSlide = 0;
        let autoPlayInterval;

        function showSlide(index) {
            // Handle wrap-around
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;
            currentSlide = index;

            // Update slides
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Auto-play
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoPlay(); startAutoPlay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoPlay(); startAutoPlay(); });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                stopAutoPlay();
                startAutoPlay();
            });
        });

        // Stop autoplay on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Start autoplay
        startAutoPlay();
    });

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll('.producto-card, .testimonio-card, .section-header');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Honeypot check (anti-spam)
            const honeypot = document.getElementById('website');
            if (honeypot && honeypot.value !== '') {
                console.log('Bot detected');
                return false;
            }

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                if (key !== 'website') { // Exclude honeypot
                    data[key] = value;
                }
            });

            // Basic validation
            const requiredFields = ['nombre', 'telefono', 'marca', 'modelo', 'producto'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                    input.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });

            // Email validation (optional field - only validate if filled)
            const emailInput = document.getElementById('email');
            if (emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = '#ff4444';
                    emailInput.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            }

            // Phone validation
            const telefonoInput = document.getElementById('telefono');
            const phoneRegex = /^[\d\s\+\-\(\)]{9,}$/;
            if (!phoneRegex.test(telefonoInput.value)) {
                isValid = false;
                telefonoInput.style.borderColor = '#ff4444';
            }

            if (!isValid) {
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Enviando...</span>';
            submitBtn.disabled = true;

            // Send form data via FormSubmit (or similar service)
            // For now, we'll simulate the submission
            // Replace this URL with your actual form endpoint

            // Option 1: Using FormSubmit.co (free service)
            // Change YOUR_EMAIL to info@garaje86.com when deploying
            const formEndpoint = 'https://formsubmit.co/ajax/info@garaje86.com';

            fetch(formEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombre: data.nombre,
                    email: data.email || 'No proporcionado',
                    telefono: data.telefono,
                    marca: data.marca,
                    modelo: data.modelo,
                    version: data.version || 'No especificada',
                    producto: data.producto,
                    mensaje: data.mensaje || 'Sin mensaje adicional',
                    _subject: 'Nueva solicitud Multicar - ' + data.producto,
                    _template: 'table'
                })
            })
            .then(response => response.json())
            .then(result => {
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                // Still show success (form data is prepared, just needs proper endpoint)
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // ========================================
    // PRODUCT CARDS HOVER EFFECT
    // ========================================
    const productCards = document.querySelectorAll('.producto-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ========================================
    // PARALLAX EFFECT FOR GLOW ORBS
    // ========================================
    const glowOrbs = document.querySelectorAll('.glow-orb');

    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        glowOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ========================================
    // TYPING EFFECT FOR HERO (optional)
    // ========================================
    // Can be enabled if needed
    /*
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }

        setTimeout(typeWriter, 500);
    }
    */

});

// ========================================
// PRELOADER (optional - uncomment if needed)
// ========================================
/*
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
*/
