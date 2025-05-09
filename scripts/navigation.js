// Function to toggle the responsive navigation menu
function toggleMenu() {
    document.getElementById('primaryNav').classList.toggle('responsive');
}

// Get the hamburger button and add an event listener
const hamburgerBtn = document.getElementById('hamburgerBtn');
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
}

// Add active class to the current page link
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // If the link href matches the current path or if we're on the home page and the link is to index.html
        if (link.getAttribute('href') === currentPath || 
            (currentPath.endsWith('/') || currentPath.endsWith('/wdd231/') || currentPath.endsWith('/wdd231')) && link.getAttribute('href') === 'index.html') {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
});