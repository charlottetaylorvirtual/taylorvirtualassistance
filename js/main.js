document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Setup =====
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownLinks = document.querySelectorAll('.has-dropdown > a');
    let isMenuOpen = false;

    // Toggle mobile menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // ===== Dropdown Menu Handling =====
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const parent = this.parentElement;
                
                // Close other open dropdowns
                dropdownLinks.forEach(otherLink => {
                    if (otherLink !== this) {
                        otherLink.parentElement.classList.remove('active');
                    }
                });
                parent.classList.toggle('active');
            }
        });
    });

    // ===== Scroll Animations Setup =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .benefit-card, .process-step, .package-card, .directory-card'
    );
    animatedElements.forEach(element => observer.observe(element));

    // ===== Click Outside Handler =====
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !e.target.closest('.main-nav')) {
            closeMobileMenu();
        }
    });

    // ===== Window Resize Handler =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== Helper Functions =====
    function closeMobileMenu() {
        isMenuOpen = false;
        navLinks.classList.remove('active');
        menuToggle.querySelectorAll('span').forEach(span => {
            span.classList.remove('active');
        });
        document.querySelectorAll('.has-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});
