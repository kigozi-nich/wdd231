// rooms.js - Handles dynamic suite listings with API simulation
// Demonstrates async functionality, array methods, and template literals

// Suite data (simulating API response)
const suitesData = [
  {
    id: 1,
    name: "Mountain View Deluxe",
    price: 299,
    size: "45 sqm",
    capacity: 2,
    amenities: ["King Bed", "Mountain View", "Mini Bar", "Free WiFi", "Room Service"],
    image: "images/suite1.jpg",
    rating: 4.8,
    availability: true,
    description: "Experience breathtaking mountain views from your private balcony"
  },
  {
    id: 2,
    name: "Luxury Presidential Suite",
    price: 599,
    size: "85 sqm",
    capacity: 4,
    amenities: ["2 Bedrooms", "Living Room", "Kitchenette", "Jacuzzi", "Butler Service"],
    image: "images/suite2.jpg",
    rating: 4.9,
    availability: true,
    description: "The ultimate luxury experience with premium amenities"
  },
  {
    id: 3,
    name: "Romantic Honeymoon Suite",
    price: 399,
    size: "55 sqm",
    capacity: 2,
    amenities: ["Heart-shaped Bed", "Fireplace", "Rose Petals", "Champagne", "Spa Access"],
    image: "images/suite3.jpg",
    rating: 4.7,
    availability: false,
    description: "Perfect for couples seeking a romantic getaway"
  },
  {
    id: 4,
    name: "Family Adventure Suite",
    price: 449,
    size: "70 sqm",
    capacity: 6,
    amenities: ["3 Beds", "Play Area", "Refrigerator", "Gaming Console", "Kid-Safe Balcony"],
    image: "images/suite4.jpg",
    rating: 4.6,
    availability: true,
    description: "Spacious accommodation perfect for family vacations"
  },
  {
    id: 5,
    name: "Business Executive Suite",
    price: 379,
    size: "50 sqm",
    capacity: 2,
    amenities: ["Work Desk", "Meeting Area", "High-Speed Internet", "Printer Access", "Coffee Machine"],
    image: "images/suite5.jpg",
    rating: 4.5,
    availability: true,
    description: "Ideal for business travelers with work-friendly amenities"
  },
  {
    id: 6,
    name: "Wellness Retreat Suite",
    price: 349,
    size: "48 sqm",
    capacity: 2,
    amenities: ["Yoga Mat", "Aromatherapy", "Meditation Corner", "Healthy Mini Bar", "Spa Products"],
    image: "images/suite6.jpg",
    rating: 4.4,
    availability: true,
    description: "Designed for relaxation and wellness enthusiasts"
  },
  {
    id: 7,
    name: "Garden View Standard",
    price: 199,
    size: "35 sqm",
    capacity: 2,
    amenities: ["Queen Bed", "Garden View", "Tea/Coffee Maker", "Free WiFi", "Daily Housekeeping"],
    image: "images/suite7.jpg",
    rating: 4.2,
    availability: true,
    description: "Comfortable accommodation with beautiful garden views"
  },
  {
    id: 8,
    name: "Penthouse Sky Suite",
    price: 799,
    size: "120 sqm",
    capacity: 6,
    amenities: ["Rooftop Terrace", "360° View", "Premium Furnishing", "Private Elevator", "Concierge Service"],
    image: "images/suite8.jpg",
    rating: 4.9,
    availability: false,
    description: "The pinnacle of luxury with unmatched city and mountain views"
  },
  {
    id: 9,
    name: "Eco-Friendly Green Suite",
    price: 279,
    size: "42 sqm",
    capacity: 2,
    amenities: ["Solar Power", "Organic Linens", "Recycled Furniture", "Plant Wall", "Natural Toiletries"],
    image: "images/suite9.jpg",
    rating: 4.3,
    availability: true,
    description: "Sustainable luxury for environmentally conscious guests"
  },
  {
    id: 10,
    name: "Adventure Base Camp",
    price: 229,
    size: "40 sqm",
    capacity: 3,
    amenities: ["Hiking Gear Storage", "Weather Station", "Trail Maps", "Energy Bars", "Equipment Rental"],
    image: "images/suite10.jpg",
    rating: 4.1,
    availability: true,
    description: "Perfect starting point for outdoor adventures"
  },
  {
    id: 11,
    name: "Artist's Inspiration Loft",
    price: 329,
    size: "52 sqm",
    capacity: 2,
    amenities: ["Art Supplies", "Natural Light", "Easel", "Gallery Wall", "Creative Corner"],
    image: "images/suite11.jpg",
    rating: 4.4,
    availability: true,
    description: "Inspiring space for creative minds and artists"
  },
  {
    id: 12,
    name: "Tech Innovator Suite",
    price: 419,
    size: "58 sqm",
    capacity: 2,
    amenities: ["Smart Home Features", "VR Setup", "High-Tech Entertainment", "USB Charging Stations", "Voice Control"],
    image: "images/suite12.jpg",
    rating: 4.6,
    availability: true,
    description: "Cutting-edge technology meets comfortable accommodation"
  },
  {
    id: 13,
    name: "Cultural Heritage Room",
    price: 259,
    size: "38 sqm",
    capacity: 2,
    amenities: ["Traditional Decor", "Cultural Artifacts", "Local Music", "Heritage Books", "Traditional Tea Set"],
    image: "images/suite13.jpg",
    rating: 4.0,
    availability: true,
    description: "Immerse yourself in local culture and traditions"
  },
  {
    id: 14,
    name: "Stargazer's Observatory",
    price: 369,
    size: "46 sqm",
    capacity: 2,
    amenities: ["Telescope", "Star Charts", "Dark Sky View", "Astronomy Books", "Night Vision Lighting"],
    image: "images/suite14.jpg",
    rating: 4.5,
    availability: false,
    description: "Perfect for astronomy enthusiasts and romantic stargazing"
  },
  {
    id: 15,
    name: "Zen Minimalist Suite",
    price: 289,
    size: "41 sqm",
    capacity: 2,
    amenities: ["Minimalist Design", "Meditation Space", "Natural Materials", "Essential Oils", "Silence Guarantee"],
    image: "images/suite15.jpg",
    rating: 4.3,
    availability: true,
    description: "Clean, serene space for those seeking simplicity and peace"
  }
];

// Simulate API delay
function simulateAPIDelay(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Async function to fetch suite data (simulating API call)
async function fetchSuitesData() {
  try {
    console.log('Fetching suites data...');
    await simulateAPIDelay(800);
    
    // Simulate potential API error (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('API temporarily unavailable');
    }
    
    return {
      success: true,
      data: suitesData,
      totalSuites: suitesData.length,
      availableSuites: suitesData.filter(suite => suite.availability).length
    };
  } catch (error) {
    console.error('Error fetching suites:', error);
    throw error;
  }
}

// Initialize suites page
document.addEventListener('DOMContentLoaded', async function() {
  await initializeSuitesPage();
});

async function initializeSuitesPage() {
  const suiteList = document.querySelector('.suite-list');
  if (!suiteList) return;
  
  // Show loading state
  suiteList.innerHTML = '<div class="loading">Loading suites...</div>';
  
  try {
    // Fetch data with error handling
    const response = await fetchSuitesData();
    const suites = response.data;
    
    // Array methods demonstration
    const availableSuites = suites.filter(suite => suite.availability);
    const sortedSuites = suites.sort((a, b) => b.rating - a.rating);
    const premiumSuites = suites.filter(suite => suite.price > 400);
    
    console.log(`Total suites: ${suites.length}`);
    console.log(`Available suites: ${availableSuites.length}`);
    console.log(`Premium suites: ${premiumSuites.length}`);
    
    // Display suites
    displaySuites(sortedSuites);
    
    // Setup filters
    setupFilters(suites);
    
    // Store in localStorage
    localStorage.setItem('suitesData', JSON.stringify(suites));
    localStorage.setItem('lastSuitesUpdate', new Date().toISOString());
    
  } catch (error) {
    // Error handling with fallback
    console.error('Failed to load suites:', error);
    suiteList.innerHTML = `
      <div class="error-message">
        <h3>Unable to load suites</h3>
        <p>Please try again later or contact support.</p>
        <button onclick="location.reload()">Retry</button>
      </div>
    `;
  }
}

// Display suites using template literals
function displaySuites(suites) {
  const suiteList = document.querySelector('.suite-list');
  
  const suitesHTML = suites.map(suite => createSuiteCard(suite)).join('');
  
  suiteList.innerHTML = `
    <div class="suites-header">
      <h2 class="heading-montserrat">Choose Your Perfect Suite</h2>
      <p class="body-opensans">Discover luxury and comfort in every room</p>
    </div>
    <div class="suites-grid">
      ${suitesHTML}
    </div>
  `;
}

// Template literal for suite cards
function createSuiteCard(suite) {
  const amenitiesList = suite.amenities
    .slice(0, 3)
    .map(amenity => `<span class="amenity">${amenity}</span>`)
    .join('');
  
  const availabilityClass = suite.availability ? 'available' : 'unavailable';
  const availabilityText = suite.availability ? 'Available' : 'Booked';
  
  return `
    <div class="suite-card ${availabilityClass}" data-suite-id="${suite.id}">
      <div class="suite-image">
        <img src="${suite.image}" alt="${suite.name}" loading="lazy" />
        <div class="suite-rating">⭐ ${suite.rating}</div>
      </div>
      <div class="suite-content">
        <h3 class="heading-montserrat">${suite.name}</h3>
        <p class="body-opensans suite-description">${suite.description}</p>
        <div class="suite-details">
          <div class="suite-info">
            <span class="price">$${suite.price}/night</span>
            <span class="size">${suite.size}</span>
            <span class="capacity">${suite.capacity} guests</span>
          </div>
          <div class="suite-amenities">
            ${amenitiesList}
          </div>
        </div>
        <div class="suite-actions">
          <span class="availability ${availabilityClass}">${availabilityText}</span>
          <button class="btn-book" ${!suite.availability ? 'disabled' : ''} 
                  onclick="bookSuite(${suite.id})">
            ${suite.availability ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  `;
}

// Setup filter functionality
function setupFilters(suites) {
  const filtersHTML = `
    <div class="suite-filters">
      <h3>Filter Suites</h3>
      <div class="filter-options">
        <select id="price-filter">
          <option value="">All Prices</option>
          <option value="budget">Under $300</option>
          <option value="mid">$300-$500</option>
          <option value="luxury">Over $500</option>
        </select>
        <select id="capacity-filter">
          <option value="">All Capacities</option>
          <option value="2">2 guests</option>
          <option value="4">Up to 4 guests</option>
          <option value="6">6+ guests</option>
        </select>
        <select id="availability-filter">
          <option value="">All Suites</option>
          <option value="available">Available Only</option>
        </select>
        <button id="clear-filters">Clear Filters</button>
      </div>
    </div>
  `;
  
  document.querySelector('.suites-header').insertAdjacentHTML('afterend', filtersHTML);
  
  // Add event listeners for filters
  document.getElementById('price-filter').addEventListener('change', () => applyFilters(suites));
  document.getElementById('capacity-filter').addEventListener('change', () => applyFilters(suites));
  document.getElementById('availability-filter').addEventListener('change', () => applyFilters(suites));
  document.getElementById('clear-filters').addEventListener('click', () => clearFilters(suites));
}

// Apply filters using array methods
function applyFilters(allSuites) {
  const priceFilter = document.getElementById('price-filter').value;
  const capacityFilter = document.getElementById('capacity-filter').value;
  const availabilityFilter = document.getElementById('availability-filter').value;
  
  let filteredSuites = [...allSuites];
  
  // Price filtering
  if (priceFilter) {
    filteredSuites = filteredSuites.filter(suite => {
      switch (priceFilter) {
        case 'budget': return suite.price < 300;
        case 'mid': return suite.price >= 300 && suite.price <= 500;
        case 'luxury': return suite.price > 500;
        default: return true;
      }
    });
  }
  
  // Capacity filtering
  if (capacityFilter) {
    const capacity = parseInt(capacityFilter);
    filteredSuites = filteredSuites.filter(suite => {
      if (capacity === 6) return suite.capacity >= 6;
      if (capacity === 4) return suite.capacity <= 4;
      return suite.capacity === capacity;
    });
  }
  
  // Availability filtering
  if (availabilityFilter === 'available') {
    filteredSuites = filteredSuites.filter(suite => suite.availability);
  }
  
  // Update display
  const suiteCards = document.querySelectorAll('.suite-card');
  suiteCards.forEach(card => {
    const suiteId = parseInt(card.dataset.suiteId);
    const isVisible = filteredSuites.some(suite => suite.id === suiteId);
    card.style.display = isVisible ? 'block' : 'none';
  });
  
  // Save filter state
  const filterState = { priceFilter, capacityFilter, availabilityFilter };
  localStorage.setItem('suiteFilters', JSON.stringify(filterState));
}

function clearFilters(allSuites) {
  document.getElementById('price-filter').value = '';
  document.getElementById('capacity-filter').value = '';
  document.getElementById('availability-filter').value = '';
  
  // Show all suites
  document.querySelectorAll('.suite-card').forEach(card => {
    card.style.display = 'block';
  });
  
  localStorage.removeItem('suiteFilters');
}

// Booking function
function bookSuite(suiteId) {
  const suite = suitesData.find(s => s.id === suiteId);
  if (!suite || !suite.availability) return;
  
  // Store booking attempt in localStorage
  const bookingData = {
    suiteId: suiteId,
    suiteName: suite.name,
    price: suite.price,
    timestamp: new Date().toISOString()
  };
  
  const bookingHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
  bookingHistory.push(bookingData);
  localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
  
  // Redirect to contact form with pre-filled data
  const bookingUrl = `contact.html?suite=${encodeURIComponent(suite.name)}&price=${suite.price}&id=${suiteId}`;
  window.location.href = bookingUrl;
}

// Export for use in other modules
export { fetchSuitesData, bookSuite };