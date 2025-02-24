// Menu toggle functionality with improved animations
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking outside with improved touch support
document.addEventListener('click', (e) => {
    if (mainNav && mainNav.classList.contains('active') && 
        !e.target.closest('.main-nav') && 
        !e.target.closest('.menu-toggle')) {
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.classList.remove('active');
    }
});

// Smooth scrolling for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (window.innerWidth < 768) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
});

// Enhanced Ver más button click handlers with better animations
document.querySelectorAll('.ver-mas-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.burger-card');
        const title = card.querySelector('h3').textContent;
        
        // Add visual feedback animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);

        // Show more details (this could be enhanced with a modal)
        alert(`Has seleccionado ${title}. ¡Pronto podrás ver más detalles sobre esta hamburguesa!`);
    });
});

// Add resize handler to reset mobile menu state
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Add scroll-based animations for burger cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to burger cards
document.querySelectorAll('.burger-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});