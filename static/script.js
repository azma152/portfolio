// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Particles.js
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 50,  // More particles
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#7C3AED", "#00D4FF", "#FF3D71"]  // Back to original colors
            },
            "shape": {
                "type": "",  // Changed to circles
                "stroke": {
                    "width": 1,
                    "color": "#7C3AED"
                }
            },
            "opacity": {
                "value": 0.7,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 3,
                    "opacity_min": 0.3,
                    "sync": false
                }
            },
            "size": {
                "value": 8,  // Smaller size
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 4,
                    "size_min": 4,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 6,  // Faster for better responsiveness
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",  // Changed to out for smoother movement
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "attract"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "attract": {
                    "distance": 150,  // Shorter distance for tighter following
                    "duration": 0.4,
                    "speed": 5,
                    "factor": 25  // Much stronger attraction
                },
                "push": {
                    "particles_nb": 3
                },
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                }
            }
        },
        "retina_detect": true
    }
);

// Initialize cursor elements
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Color Switcher Functionality
const colorPaletteToggle = document.querySelector('.color-palette-toggle');
const colorOptions = document.querySelector('.color-options');
const colorButtons = document.querySelectorAll('.color-option');

// Toggle color palette
colorPaletteToggle.addEventListener('click', () => {
    colorOptions.classList.toggle('show');
    colorPaletteToggle.classList.toggle('active');
});

// Close palette when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.color-switcher')) {
        colorOptions.classList.remove('show');
        colorPaletteToggle.classList.remove('active');
    }
});

colorButtons.forEach(option => {
    option.addEventListener('click', function() {
        const color = this.dataset.color;
        
        // Update cursor border and background
        if (cursor) {
            cursor.style.borderColor = color;
            cursor.style.background = `${color}1A`;
            cursor.style.mixBlendMode = 'normal';
        }
        
        // Update particles color
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.color.value = color;
            window.pJSDom[0].pJS.particles.line_linked.color = color;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', color);
        document.documentElement.style.setProperty('--accent-color', color);
        document.documentElement.style.setProperty('--gradient-1', `linear-gradient(45deg, ${color}, ${adjustColor(color, 20)})`);
        
        // Update cursor hover effect
        document.documentElement.style.setProperty('--cursor-hover-color', `${color}33`);
        
        // Add active state to selected color
        colorButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Update active navigation link color and style
        const activeLink = document.querySelector('.nav-links a.active');
        if (activeLink) {
            activeLink.style.color = color;
            activeLink.style.background = `${color}15`;
        }
    });
});

// Update cursor position with smooth lerp
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Update cursor position with smooth animation
function updateCursor() {
    // Smooth cursor movement with faster response
    cursorX = lerp(cursorX, mouseX, 0.2);
    cursorY = lerp(cursorY, mouseY, 0.2);
    
    // Update main cursor position
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    
    requestAnimationFrame(updateCursor);
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Start cursor animation
updateCursor();

// Handle cursor visibility
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

// Helper function to adjust color brightness
function adjustColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return "#" + (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
}

// Add hover effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .contact-icon, .nav-links li a');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// Typing Animation
const options = {
    strings: ['Full Stack Developer', 'UI/UX Designer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
};

const typed = new Typed('.typing-text', options);

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

navSlide();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add your form submission logic here
    // For example, you could send the data to a server
    const formData = new FormData(form);
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Clear form
    form.reset();
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
});

// Project Cards Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Skills Animation with Glow Effect
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    // Add hover animations
    card.addEventListener('mouseenter', () => {
        card.querySelector('i').style.transform = 'scale(1.2) rotate(360deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('i').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Animated Background
const bgAnimation = document.querySelector('.bg-animation');
for (let i = 0; i < 50; i++) {
    const span = document.createElement('span');
    span.style.width = (Math.random() * 30 + 10) + 'px';
    span.style.height = span.style.width;
    span.style.left = Math.random() * innerWidth + 'px';
    span.style.top = Math.random() * innerHeight + 'px';
    span.style.animationDelay = Math.random() * 2 + 's';
    bgAnimation.appendChild(span);
}

// Education Timeline Animation
const educationSection = document.querySelector('.education-timeline');
const educationCards = document.querySelectorAll('.education-card');
const timelineProgress = document.querySelector('.timeline-progress');

function updateEducationTimeline() {
    const sectionTop = educationSection.getBoundingClientRect().top;
    const sectionHeight = educationSection.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Calculate progress
    let progress = (windowHeight - sectionTop) / (sectionHeight + windowHeight);
    progress = Math.min(Math.max(progress, 0), 1);
    
    // Update progress bar with energy flow effect
    timelineProgress.style.transform = `translateX(-50%) scaleY(${progress})`;
    
    // Update cards with sequential reveal
    educationCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.8;
        
        if (cardTop < revealPoint) {
            // Add delay for sequential reveal
            setTimeout(() => {
                card.classList.add('active');
            }, index * 300); // 300ms delay between each card
        } else {
            card.classList.remove('active');
        }
    });
}

// Initialize timeline on load
window.addEventListener('load', updateEducationTimeline);

// Update on scroll and resize
window.addEventListener('scroll', updateEducationTimeline);
window.addEventListener('resize', updateEducationTimeline);

// Mail Popup Functions
function openMailPopup() {
    const mailtoLink = `mailto:azmatullah03042@gmail.com?subject=Portfolio Contact&body=Hi Azmatullah,%0D%0A%0D%0AI'd like to connect with you regarding...`;
    window.location.href = mailtoLink;
}

// Update navbar active state on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNavigation() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.style.color = 'var(--nav-icon-color)';
                link.style.transform = 'scale(1)';
                link.style.background = 'transparent';
            });

            // Add active class to current section's link
            if (correspondingLink) {
                correspondingLink.classList.add('active');
                correspondingLink.style.color = currentColor;
                correspondingLink.style.transform = 'scale(1.2)';
                correspondingLink.style.background = `${currentColor}15`;
            }
        }
    });
}

// Add scroll event listener with throttling for better performance
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateNavigation();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Update navigation on color change
colorButtons.forEach(option => {
    option.addEventListener('click', function() {
        const color = this.dataset.color;
        
        // Update cursor border and background
        if (cursor) {
            cursor.style.borderColor = color;
            cursor.style.background = `${color}1A`;
            cursor.style.mixBlendMode = 'normal';
        }
        
        // Update particles color
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.color.value = color;
            window.pJSDom[0].pJS.particles.line_linked.color = color;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', color);
        document.documentElement.style.setProperty('--accent-color', color);
        document.documentElement.style.setProperty('--gradient-1', `linear-gradient(45deg, ${color}, ${adjustColor(color, 20)})`);
        
        // Update cursor hover effect
        document.documentElement.style.setProperty('--cursor-hover-color', `${color}33`);
        
        // Add active state to selected color
        colorButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Update active navigation link color and style
        const activeLink = document.querySelector('.nav-links a.active');
        if (activeLink) {
            activeLink.style.color = color;
            activeLink.style.background = `${color}15`;
        }
    });
});

// Initialize navigation state
updateNavigation();

// Projects Navigation
const projectsGrid = document.querySelector('.projects-grid');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentPage = 0;
const projectsPerPage = 3;
const totalProjects = document.querySelectorAll('.project-card').length;
const maxPages = Math.ceil(totalProjects / projectsPerPage);

function updateProjectsView() {
    const offset = currentPage * projectsPerPage * -100;
    projectsGrid.style.transform = `translateX(${offset}%)`;
    
    // Update button states
    prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentPage === 0 ? 'none' : 'all';
    
    nextBtn.style.opacity = currentPage >= maxPages - 1 ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentPage >= maxPages - 1 ? 'none' : 'all';
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateProjectsView();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < maxPages - 1) {
        currentPage++;
        updateProjectsView();
    }
});

// Initialize projects view
updateProjectsView();

// Add custom particle effects
let lastTime = 0;
const particlesContainer = document.getElementById('particles-js');
const canvas = particlesContainer.getElementsByTagName('canvas')[0];

function createRipple(x, y) {
    let ripple = {
        x: x,
        y: y,
        radius: 0,
        opacity: 0.5,
        maxRadius: 100
    };
    
    function drawRipple() {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124, 58, 237, ${ripple.opacity})`;
        ctx.stroke();
        
        ripple.radius += 2;
        ripple.opacity -= 0.01;
        
        if (ripple.radius < ripple.maxRadius && ripple.opacity > 0) {
            requestAnimationFrame(drawRipple);
        }
    }
    
    drawRipple();
}

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    if (currentTime - lastTime > 50) { // Limit ripple creation to every 50ms
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createRipple(x, y);
        lastTime = currentTime;
    }
}); 
