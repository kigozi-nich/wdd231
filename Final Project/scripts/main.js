// Main JavaScript file for Naran Suites
// Demonstrates DOM manipulation, array methods, template literals, and localStorage

// Array of hotel features for dynamic content
const hotelFeatures = [
  { id: 1, name: "Luxury Spa", description: "Relax and rejuvenate", icon: "🧘‍♀️", category: "wellness" },
  { id: 2, name: "Fine Dining", description: "Exquisite culinary experiences", icon: "🍽️", category: "dining" },
  { id: 3, name: "Mountain Views", description: "Breathtaking scenery", icon: "🏔️", category: "views" },
  { id: 4, name: "Heated Pool", description: "Year-round swimming", icon: "🏊‍♂️", category: "recreation" },
  { id: 5, name: "Fitness Center", description: "State-of-the-art equipment", icon: "💪", category: "fitness" },
  { id: 6, name: "Conference Rooms", description: "Business meeting facilities", icon: "👥", category: "business" }
];

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
let modal = null;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  createModal();
  loadUserPreferences();
  displayFeatures();
  setupEventListeners();
}

// Navigation functionality
function setupNavigation() {
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      // Store navigation state in localStorage
      const isOpen = navLinks.classList.contains('active');
      localStorage.setItem('navState', isOpen.toString());
    });
  }
}

// Create modal dialog structure
function createModal() {
  const modalHTML = `
    <div id="feature-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2 id="modal-title"></h2>
        <div id="modal-body"></div>
        <button id="modal-action-btn" class="btn-primary">Learn More</button>
      </div>
    </div>
  `;
  
  // DOM manipulation - append modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  modal = document.getElementById('feature-modal');
  
  // Modal event listeners
  const closeBtn = document.querySelector('.close-modal');
  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Display features dynamically using array methods and template literals
function displayFeatures() {
  const featuresContainer = document.querySelector('.intro');
  if (!featuresContainer) return;
  
  // Filter and map array methods
  const displayFeatures = hotelFeatures
    .filter(feature => feature.category !== 'business') // Filter out business features
    .map(feature => createFeatureCard(feature)); // Map to HTML elements
  
  const featuresHTML = `
    <section class="features-section">
      <h2 class="heading-montserrat">Our Premium Features</h2>
      <div class="features-grid">
        ${displayFeatures.join('')}
      </div>
    </section>
  `;
  
  featuresContainer.insertAdjacentHTML('afterend', featuresHTML);
}

// Template literal function for creating feature cards
function createFeatureCard(feature) {
  return `
    <div class="feature-card" data-feature-id="${feature.id}">
      <div class="feature-icon">${feature.icon}</div>
      <h3 class="heading-montserrat">${feature.name}</h3>
      <p class="body-opensans">${feature.description}</p>
      <button class="feature-btn" onclick="openFeatureModal(${feature.id})">
        View Details
      </button>
    </div>
  `;
}

// Modal functions
function openFeatureModal(featureId) {
  const feature = hotelFeatures.find(f => f.id === featureId);
  if (!feature || !modal) return;
  
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  modalTitle.textContent = feature.name;
  modalBody.innerHTML = `
    <div class="modal-feature">
      <div class="modal-icon">${feature.icon}</div>
      <p class="body-opensans">${feature.description}</p>
      <p class="body-opensans">Category: <strong>${feature.category}</strong></p>
      <p class="body-opensans">Experience the finest ${feature.name.toLowerCase()} at Naran Suites.</p>
    </div>
  `;
  
  modal.style.display = 'block';
  
  // Store modal interaction in localStorage
  const modalViews = JSON.parse(localStorage.getItem('modalViews') || '[]');
  modalViews.push({
    featureId: featureId,
    timestamp: new Date().toISOString(),
    featureName: feature.name
  });
  localStorage.setItem('modalViews', JSON.stringify(modalViews));
}

function closeModal() {
  if (modal) {
    modal.style.display = 'none';
  }
}

// Local Storage functionality
function loadUserPreferences() {
  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }
  
  // Load visit count
  let visitCount = parseInt(localStorage.getItem('visitCount') || '0');
  visitCount++;
  localStorage.setItem('visitCount', visitCount.toString());
  
  // Load last visit
  const lastVisit = localStorage.getItem('lastVisit');
  const currentVisit = new Date().toISOString();
  localStorage.setItem('lastVisit', currentVisit);
  
  console.log(`Welcome back! Visit #${visitCount}`);
  if (lastVisit) {
    console.log(`Last visit: ${new Date(lastVisit).toLocaleDateString()}`);
  }
}

function saveUserPreference(key, value) {
  localStorage.setItem(key, value);
}

function setupEventListeners() {
  // Theme toggle functionality
  const themeToggle = document.createElement('button');
  themeToggle.textContent = '🌙';
  themeToggle.className = 'theme-toggle';
  themeToggle.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0,0,0,0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 1000;
  `;
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    saveUserPreference('theme', isDark ? 'dark-theme' : '');
  });
  
  document.body.appendChild(themeToggle);
}

// Export functions for use in other modules
export { openFeatureModal, closeModal, saveUserPreference };