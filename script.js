document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));


    // --- Typing Effect ---
    const typingElement = document.querySelector('.typing-effect');
    const textsToType = ["Tech Enthusiast", "Data Scientist", "Full Stack Web Developer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingElement) return; // Stop if element doesn't exist
        const currentText = textsToType[textIndex];
        const typeSpeed = 100;
        const eraseSpeed = 50;
        const pauseTime = 1500;

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let timeout = isDeleting ? eraseSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            timeout = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textsToType.length;
        }

        setTimeout(type, timeout);
    }
    
    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Animate Progress Bars on Scroll ---
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-bar');

    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%'; 
                });
                observer.unobserve(skillsSection); // Animate only once
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkills, {
        root: null,
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // --- Background Animation ---
    const canvas = document.getElementById('background-animation');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let numbers = [];
    const numberCount = Math.floor(window.innerWidth / 15); // CHANGED: Decreased divisor for more numbers
    const numberSpeed = 1;

    class BinaryNumber {
        constructor(x, y, speed) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.value = Math.random() < 0.5 ? '0' : '1';
        }

        draw() {
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
            ctx.fillStyle = `${primaryColor}55`; // CHANGED: Increased opacity from 33 to 55
            ctx.font = '16px monospace';
            ctx.fillText(this.value, this.x, this.y);
        }

        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0 - Math.random() * 20;
                this.x = Math.random() * canvas.width;
            }
            this.draw();
        }
    }

    function init() {
        numbers = [];
        for (let i = 0; i < numberCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speed = Math.random() * numberSpeed + 0.5;
            numbers.push(new BinaryNumber(x, y, speed));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        numbers.forEach(number => number.update());
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Start everything
    type();
    init();
    animate();
});
