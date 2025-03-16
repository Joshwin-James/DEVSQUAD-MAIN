// Smooth scrolling between sections when clicking on nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Contact form validation
document.querySelector('form').addEventListener('submit', function(e) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Check if any field is empty
    if (!name || !email || !message) {
        e.preventDefault(); // Prevent form submission
        alert('Please fill out all fields.');
    } 
    // Validate the email address format
    else if (!validateEmail(email)) {
        e.preventDefault(); // Prevent form submission
        alert('Please enter a valid email address.');
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 1000, // Animation duration
    easing: 'ease-in-out', // Easing function
    once: true, // Trigger animation only once
    offset: 200, // How far from the top the animation will trigger
});

// Mobile menu toggle for hamburger icon
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // Toggle 'active' class to show/hide menu
});

// Scroll to Top Button
const scrollToTopButton = document.getElementById("scroll-to-top-btn");

window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopButton.style.display = "block"; // Show button when scrolled down
    } else {
        scrollToTopButton.style.display = "none"; // Hide button when near the top
    }
};

scrollToTopButton.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fade in/out navbar on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll down
        navbar.classList.add('hidden');
    } else {
        // Scroll up
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});
