// Wait for DOM content to load and hide loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800); // little delay to show the nice cloud
});

// Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Dark Mode Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check local storage for theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️';
} else {
    themeToggleBtn.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
    }
});

// Scroll Animations (Intersection Observer)
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(el => {
    appearOnScroll.observe(el);
});

// Review Form Handling
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');

reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const nameInput = document.getElementById('reviewer-name').value.trim();
    const messageInput = document.getElementById('review-message').value.trim();
    
    // Get selected rating (radio buttons)
    const ratingRadios = document.getElementsByName('rating');
    let ratingValue = 5; // Default if none selected somehow
    for (let radio of ratingRadios) {
        if (radio.checked) {
            ratingValue = parseInt(radio.value);
            break;
        }
    }

    if (!nameInput || !messageInput) {
        alert('Please fill out all fields.');
        return;
    }

    // Generate stars string
    let starsString = '';
    for (let i = 0; i < 5; i++) {
        if (i < ratingValue) {
            starsString += '★';
        } else {
            starsString += '☆';
        }
    }

    // Generate new review card HTML
    const newReview = document.createElement('div');
    newReview.classList.add('review-card');
    
    newReview.innerHTML = `
        <div class="review-header">
            <strong>${escapeHTML(nameInput)}</strong>
            <span class="stars">${starsString}</span>
        </div>
        <p class="review-text">"${escapeHTML(messageInput)}"</p>
    `;

    // Prepend nicely to list
    reviewsList.insertBefore(newReview, reviewsList.firstChild);

    // Reset Form
    reviewForm.reset();
});

// Simple HTML escaping function to prevent XSS in reviews
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag])
    );
}
