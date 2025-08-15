// ==============================================
// Theme Management
// ==============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Initialize theme from localStorage or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ==============================================
// Particle System
// ==============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ==============================================
// Smooth Scrolling Navigation
// ==============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==============================================
// Header Scroll Effects
// ==============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// ==============================================
// Hero Slider
// ==============================================
function initHeroSlider() {
    let currentSlide = 0;
    const slides = document.getElementById('slides');
    const totalSlides = 4;
    const dots = document.querySelectorAll('.nav-dot');

    function updateSlider() {
        const translateX = -currentSlide * 100;
        slides.style.transform = `translateX(${translateX}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // Expose functions globally so HTML onclick works
    window.nextSlide = nextSlide;
    window.previousSlide = previousSlide;
    window.goToSlide = goToSlide;

    setInterval(nextSlide, 5000);

    document.querySelectorAll('.slide').forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            slide.style.transform = 'scale(1.02)';
        });
        slide.addEventListener('mouseleave', () => {
            slide.style.transform = 'scale(1)';
        });
    });
}

// ==============================================
// Scroll Progress Indicator
// ==============================================
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
}

// ==============================================
// Scroll-Based Animations
// ==============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate service cards with stagger
                if (entry.target.classList.contains('services-grid')) {
                    const cards = entry.target.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Observe services grid specifically
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        observer.observe(servicesGrid);
    }
}

// ==============================================
// Form Handling
// ==============================================
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Contact form handling
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'var(--accent-gradient)';
                submitButton.disabled = false;
            }, 3000);
        }, 2000);
    });

    // Newsletter form handling
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitButton = newsletterForm.querySelector('.newsletter-btn');
        const input = newsletterForm.querySelector('input[type="email"]');
        const originalText = submitButton.textContent;
        
        if (!input.value) return;
        
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        // Simulate subscription
        setTimeout(() => {
            submitButton.textContent = 'Subscribed!';
            submitButton.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            
            // Clear input
            input.value = '';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'var(--accent-gradient)';
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ==============================================
// Counter Animation
// ==============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                const duration = 2000;
                const start = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const current = Math.floor(progress * target);
                    counter.textContent = current + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : counter.textContent.includes('/') ? '/7' : '');
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// ==============================================
// Initialize Everything
// ==============================================
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initSmoothScrolling();
    initHeaderScroll();
    initHeroSlider();
    initScrollProgress();
    initScrollAnimations();
    initFormHandling();
    animateCounters();

    // Remove loading bar after animation
    setTimeout(() => {
        const loadingBar = document.querySelector('.loading-bar');
        if (loadingBar) {
            loadingBar.style.opacity = '0';
            setTimeout(() => loadingBar.remove(), 300);
        }
    }, 2000);

    // Add hero section animation on load
    setTimeout(() => {
        document.querySelector('.hero').classList.add('animate-in');
    }, 500);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll-based functionality can go here
}, 16)); // ~60fps