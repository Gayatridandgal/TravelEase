// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('login-form');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const bookButtons = document.querySelectorAll('.book-btn');
const contactForm = document.getElementById('contact-form');

// Dummy user database
const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
];

// Current user state
let currentUser = null;

// Show the login modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Close the login modal
closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target == loginModal) {
        loginModal.style.display = 'none';
    }
});

// Handle login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Check if user exists
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            currentUser = username;
            alert('Login successful!');
            loginModal.style.display = 'none';
            
            // Update login button to show username
            loginBtn.textContent = username;
            
            // Store login state in session storage
            sessionStorage.setItem('currentUser', username);
        } else {
            alert('Invalid username or password!');
        }
    });
}

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Handle booking buttons (requires login)
bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentUser || sessionStorage.getItem('currentUser')) {
            const packageName = button.closest('.package-card').querySelector('h2').textContent;
            alert(`Booking confirmed for: ${packageName}`);
        } else {
            alert('Please login to book this package');
            loginModal.style.display = 'block';
        }
    });
});

// Handle contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Check if user is already logged in (page refresh)
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        loginBtn.textContent = savedUser;
    }
});