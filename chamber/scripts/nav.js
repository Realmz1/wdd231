// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navList.classList.toggle('show');
        });
    }

    // Wayfinding - Add active class to current page
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage.includes(linkPath) && linkPath !== './') {
            link.classList.add('active');
        }
    });
});