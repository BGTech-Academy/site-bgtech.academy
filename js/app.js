
// Header scroll effect with hide/show on scroll
const header = document.getElementById('header');
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class when scrolled down
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide header when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                header.classList.add('hidden');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        });
        
        ticking = true;
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Animation Effect
const typingElement = document.querySelector('.typing-line');
if (typingElement) {
    const lines = [
        { text: 'Aprenda.', gradient: false },
        { text: 'Publique.', gradient: false },
        { text: 'Desenvolva.', gradient: false },
        { text: 'Construa seu portfólio.', gradient: true },
        { text: 'Seja um profissional.', gradient: false }
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let isStarted = false;
    
    function showInitialCursor() {
        typingElement.innerHTML = '<span class="typing-cursor"></span>';
    }
    
    function type() {
        if (!isStarted) {
            isStarted = true;
            // Wait 2 seconds with blinking cursor before starting
            setTimeout(() => {
                typeNextChar();
            }, 2000);
            return;
        }
        
        typeNextChar();
    }
    
    function typeNextChar() {
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];
            const fullText = currentLine.text;
            
            if (charIndex <= fullText.length) {
                const displayText = fullText.substring(0, charIndex);
                
                // Build the entire HTML content
                let tempHTML = '';
                
                // Add completed lines
                for (let i = 0; i < lineIndex; i++) {
                    if (lines[i].gradient) {
                        tempHTML += '<span class="text-gradient">' + lines[i].text + '</span><br>';
                    } else {
                        tempHTML += lines[i].text + '<br>';
                    }
                }
                
                // Add current line being typed
                if (currentLine.gradient) {
                    tempHTML += '<span class="text-gradient">' + displayText + '</span>';
                } else {
                    tempHTML += displayText;
                }
                
                // Add cursor
                tempHTML += '<span class="typing-cursor"></span>';
                
                typingElement.innerHTML = tempHTML;
                charIndex++;
                
                if (charIndex > fullText.length) {
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeNextChar, 2000); // Pause 2 seconds before next line
                } else {
                    setTimeout(typeNextChar, 50); // Typing speed
                }
            }
        } else {
            // Finished typing - wait 1 second before removing cursor
            setTimeout(() => {
                const cursor = typingElement.querySelector('.typing-cursor');
                if (cursor) {
                    cursor.classList.add('finished');
                }
            }, 1000);
        }
    }
    
    // Show cursor immediately and start typing after delay
    showInitialCursor();
    setTimeout(type, 0);
}

// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

// Check icons animation - appearing one by one
const courseCards = document.querySelectorAll('.course-card');

courseCards.forEach(card => {
    const checkIcons = card.querySelectorAll('.check-icon');
    
    const checkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icons = entry.target.querySelectorAll('.check-icon');
                icons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.classList.add('show');
                    }, index * 200); // 200ms delay between each check
                });
                checkObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    if (checkIcons.length > 0) {
        checkObserver.observe(card);
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore empty href or just "#"
        if (!href || href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileNav = document.querySelector('.mobile-nav');
            const mobileToggle = document.querySelector('.mobile-toggle');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const body = document.body;

function toggleMobileMenu() {
    const isActive = mobileNav.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileToggle.classList.add('active');
    mobileNav.classList.add('active');
    body.style.overflow = 'hidden';
    
    // Add animation delay for menu items
    const menuItems = document.querySelectorAll('.mobile-nav .nav-links li');
    menuItems.forEach((item, index) => {
        item.style.transitionDelay = `${(index + 1) * 0.1}s`;
    });
}

function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    body.style.overflow = 'auto';
    
    // Reset animation delays
    const menuItems = document.querySelectorAll('.mobile-nav .nav-links li');
    menuItems.forEach(item => {
        item.style.transitionDelay = '0s';
    });
}

mobileToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            closeMobileMenu();
        }, 300); // Small delay for better UX
    });
});

// Close mobile menu when clicking outside
mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
        closeMobileMenu();
    }
});

// Close mobile menu with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Prevent scrolling on touch devices when menu is open
let startY = 0;
mobileNav.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

mobileNav.addEventListener('touchmove', (e) => {
    if (mobileNav.classList.contains('active')) {
        e.preventDefault();
    }
});