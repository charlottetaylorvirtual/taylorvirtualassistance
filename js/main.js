document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle setup
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

    // Handle dropdown menus on mobile
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

    // Services and benefits animation setup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once animation is done, we can stop observing the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px'
    });
    
    // Observe all
    document.querySelectorAll('.service-card, .benefit-card, .process-step, .package-card, .pricing-card').forEach(card => {
        observer.observe(card);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !e.target.closest('.main-nav')) {
            isMenuOpen = false;
            navLinks.classList.remove('active');
            menuToggle.querySelectorAll('span').forEach(span => {
                span.classList.remove('active');
            });
            // Close all dropdowns
            document.querySelectorAll('.has-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state when returning to desktop view
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

    // Smooth scroll for anchor links
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
});
