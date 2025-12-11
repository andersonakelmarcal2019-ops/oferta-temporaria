// Set the date we're counting down to (24 hours from now for demo purposes, or a fixed date)
// Since it's a "scarcity" timer, it often resets or targets a near future time.
// Let's set it to end of the day or 24h. Let's do a 48 hour countdown that loops or stays fixed.

// For this demo, let's just make it hardcoded to match the image mostly, but ticking down.
// Image says: 01 Days, 23 Hours, 34 Minutes, 56 Seconds.

// Check for saved time in localStorage
let savedTime = localStorage.getItem('growPlanTime');
let duration;

if (savedTime && !isNaN(savedTime)) {
    duration = parseInt(savedTime);
} else {
    // Default: 1 day, 23 hours, 34 minutes, 56 seconds
    duration = (1 * 24 * 60 * 60) + (23 * 60 * 60) + (34 * 60) + 56;
}

// Function to update timer
function updateTimer() {
    duration--;

    if (duration < 0) {
        // Reset if expired (looping for scarcity effect)
        duration = (1 * 24 * 60 * 60) + (23 * 60 * 60) + (34 * 60) + 56;
    }

    // Save to localStorage
    localStorage.setItem('growPlanTime', duration);

    const days = Math.floor(duration / (24 * 60 * 60));
    const hours = Math.floor((duration % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((duration % (60 * 60)) / 60);
    const seconds = Math.floor(duration % 60);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Update every second
setInterval(updateTimer, 1000);

// Initialize immediately
updateTimer();

// Add some nice scroll reveal effects if not using a library like AOS (though I added data-aos in html, I'll simulate it with simple JS if user didn't load library, but I didn't include the library script. Let's add simple intersection observer).

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.plan-card');
    cards.forEach(card => {
        // Init styles for JS animation fallback
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

        observer.observe(card);
    });
});
