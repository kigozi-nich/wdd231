// Home page functionality for Kampala Chamber of Commerce
// Company spotlights with random gold/silver member selection

// DOM Elements
const spotlightsContainer = document.querySelector('#spotlights-container');
const hamburgerBtn = document.querySelector('#hamburgerBtn');
const primaryNav = document.querySelector('#primaryNav');
const darkModeToggle = document.querySelector('#darkModeToggle');

// Members data URL
const membersUrl = 'data/members.json';

// Fetch and display company spotlights
async function fetchMembersData() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displayCompanySpotlights(members);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching members data:', error);
        spotlightsContainer.innerHTML = '<p>Member spotlights unavailable</p>';
    }
}

// Display random gold and silver member spotlights
function displayCompanySpotlights(members) {
    // Filter for gold (3) and silver (2) members only
    const goldSilverMembers = members.filter(member => 
        member.membershipLevel === 2 || member.membershipLevel === 3
    );
    
    // Randomly select 2-3 members
    const selectedMembers = getRandomMembers(goldSilverMembers, 3);
    
    // Clear container
    spotlightsContainer.innerHTML = '';
    
    // Create spotlight cards
    selectedMembers.forEach(member => {
        const spotlightCard = createSpotlightCard(member);
        spotlightsContainer.appendChild(spotlightCard);
    });
}

// Get random members from array
function getRandomMembers(members, count) {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Create spotlight card element
function createSpotlightCard(member) {
    const card = document.createElement('div');
    card.className = 'spotlight-card';
    
    const membershipBadge = getMembershipBadge(member.membershipLevel);
    
    card.innerHTML = `
        <div class="spotlight-header">
            <img src="${member.image}" alt="${member.name} Logo" class="spotlight-logo">
            <div class="membership-badge ${membershipBadge.class}">${membershipBadge.text}</div>
        </div>
        <div class="spotlight-content">
            <h3 class="spotlight-name">${member.name}</h3>
            <p class="spotlight-description">${member.description}</p>
            <div class="spotlight-details">
                <p class="spotlight-phone">
                    <span class="icon">📞</span>
                    <a href="tel:${member.phone}">${member.phone}</a>
                </p>
                <p class="spotlight-address">
                    <span class="icon">📍</span>
                    ${member.address}
                </p>
                <p class="spotlight-website">
                    <span class="icon">🌐</span>
                    <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
                </p>
            </div>
        </div>
    `;
    
    return card;
}

// Get membership badge information
function getMembershipBadge(level) {
    switch (level) {
        case 3:
            return { text: 'Gold Member', class: 'gold' };
        case 2:
            return { text: 'Silver Member', class: 'silver' };
        case 1:
            return { text: 'Bronze Member', class: 'bronze' };
        default:
            return { text: 'Member', class: 'basic' };
    }
}

// Hamburger menu functionality
function toggleMenu() {
    primaryNav.classList.toggle('open');
    hamburgerBtn.classList.toggle('open');
    
    // Update aria-expanded for accessibility
    const isOpen = primaryNav.classList.contains('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
}

// Dark mode functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load dark mode preference
function loadDarkModePreference() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
}

// Hero call-to-action button functionality
function initializeHeroButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Add click animation
            ctaButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize page functionality
function initializePage() {
    // Load members data and display spotlights
    fetchMembersData();
    
    // Initialize dark mode
    loadDarkModePreference();
    
    // Initialize hero button
    initializeHeroButton();
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Event listeners
    hamburgerBtn.addEventListener('click', toggleMenu);
    darkModeToggle.addEventListener('change', toggleDarkMode);
    
    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            primaryNav.classList.remove('open');
            hamburgerBtn.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!primaryNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            primaryNav.classList.remove('open');
            hamburgerBtn.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Refresh spotlights every 30 seconds for demonstration
setInterval(() => {
    fetchMembersData();
}, 30000);