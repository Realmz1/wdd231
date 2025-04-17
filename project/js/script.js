/**
 * Desert Drive - Main JavaScript
 * Handles image slider and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Image Slider Functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');

    if (slider && slides.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        const slideWidth = 100; // 100% width for each slide

        // Set initial position
        updateSliderPosition();

        // Event listeners for slider controls
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateSliderPosition();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSliderPosition();
        });

        // Auto slide every 5 seconds
        let autoSlideInterval = setInterval(autoSlide, 5000);

        // Pause auto-sliding when hovering over slider
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(autoSlide, 5000);
        });

        function autoSlide() {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSliderPosition();
        }

        function updateSliderPosition() {
            slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        }

        // Touch swipe support for slider
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            // Minimum swipe distance (px)
            const swipeThreshold = 50;

            if (touchStartX - touchEndX > swipeThreshold) {
                // Left swipe - next slide
                document.querySelector('.next-slide').click();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Right swipe - previous slide
                document.querySelector('.prev-slide').click();
            }
        }
    }

    // Mobile Navigation Menu Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.main-header nav');

    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('nav-active');

            // Prevent body scrolling when menu is open
            document.body.classList.toggle('nav-open');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.main-header nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    nav.classList.remove('nav-active');
                    document.body.classList.remove('nav-open');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                !e.target.closest('.mobile-nav-toggle') &&
                !e.target.closest('.main-header nav') &&
                nav.classList.contains('nav-active')) {
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('nav-active');
                document.body.classList.remove('nav-open');
            }
        });

        // Update mobile nav visibility on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('nav-active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current page's nav link
    const highlightCurrentPage = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.main-header nav a');

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    };

    highlightCurrentPage();
});