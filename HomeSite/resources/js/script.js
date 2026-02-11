// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${0.8 + (index * 0.1)}s`;
        observer.observe(card);
    });

    // Add cursor glow effect
    initCursorGlow();

    // Add click animation to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 600);
        });
    });

    // Add hover sound feedback (optional - smooth transitions already in CSS)
    const links = document.querySelectorAll('.project-link, .tech-tag');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });

    // Smooth scroll to projects on header click
    const header = document.querySelector('header');
    header.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A') {
            const projectsHeader = document.querySelector('.projects-header');
            projectsHeader.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Cursor glow effect
function initCursorGlow() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';

        if (!isMoving) {
            cursorGlow.style.opacity = '1';
            isMoving = true;
        }
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
        isMoving = false;
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
}

// Add parallax effect to header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    header.style.transform = `translateY(${scrollY * 0.5}px)`;
});

// Add ripple effect on project card click
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
}

// Animate elements on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add keyboard navigation
let currentCardIndex = 0;
const projectCards = document.querySelectorAll('.project-card');

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        currentCardIndex = (currentCardIndex + 1) % projectCards.length;
        projectCards[currentCardIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (e.key === 'ArrowLeft') {
        currentCardIndex = (currentCardIndex - 1 + projectCards.length) % projectCards.length;
        projectCards[currentCardIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

// Count project views (stored in localStorage)
function trackProjectView(projectName) {
    const views = JSON.parse(localStorage.getItem('projectViews') || '{}');
    views[projectName] = (views[projectName] || 0) + 1;
    localStorage.setItem('projectViews', JSON.stringify(views));
}

// Track clicks on project links
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function() {
        const projectName = this.closest('.project-card').querySelector('.project-header').textContent;
        trackProjectView(projectName);
    });
});

// Add scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
});

// Toggle file window visibility
function toggleFiles(elementId) {
    const fileWindow = document.getElementById(elementId);
    const button = fileWindow.nextElementSibling;
    
    if (fileWindow.classList.contains('open')) {
        fileWindow.classList.remove('open');
        button.textContent = '+ Show Files';
    } else {
        fileWindow.classList.add('open');
        button.textContent = '- Hide Files';
    }
}
