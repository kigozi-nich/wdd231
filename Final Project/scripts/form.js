// form.js - Handles contact form with localStorage and URL params
// Demonstrates DOM manipulation and form handling

document.addEventListener('DOMContentLoaded', function() {
  initializeForm();
  loadBookingData();
  setupFormValidation();
});

function initializeForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  // Add additional form fields for better functionality
  const additionalFields = `
    <label for="phone" class="body-opensans">Phone (Optional):</label>
    <input type="tel" id="phone" name="phone" />
    
    <label for="suite-preference" class="body-opensans">Suite Preference:</label>
    <select id="suite-preference" name="suite-preference">
      <option value="">Select a suite (optional)</option>
      <option value="mountain-view">Mountain View Deluxe</option>
      <option value="presidential">Luxury Presidential Suite</option>
      <option value="honeymoon">Romantic Honeymoon Suite</option>
      <option value="family">Family Adventure Suite</option>
      <option value="business">Business Executive Suite</option>
      <option value="wellness">Wellness Retreat Suite</option>
    </select>
    
    <label for="checkin" class="body-opensans">Check-in Date:</label>
    <input type="date" id="checkin" name="checkin" />
    
    <label for="checkout" class="body-opensans">Check-out Date:</label>
    <input type="date" id="checkout" name="checkout" />
    
    <label for="guests" class="body-opensans">Number of Guests:</label>
    <select id="guests" name="guests">
      <option value="1">1 Guest</option>
      <option value="2">2 Guests</option>
      <option value="3">3 Guests</option>
      <option value="4">4 Guests</option>
      <option value="5">5+ Guests</option>
    </select>
    
    <div class="form-preferences">
      <label class="checkbox-label">
        <input type="checkbox" id="newsletter" name="newsletter" value="yes" />
        <span class="body-opensans">Subscribe to newsletter</span>
      </label>
      
      <label class="checkbox-label">
        <input type="checkbox" id="special-offers" name="special-offers" value="yes" />
        <span class="body-opensans">Receive special offers</span>
      </label>
    </div>
  `;
  
  // Insert additional fields before the submit button
  const submitButton = form.querySelector('.btn-submit');
  submitButton.insertAdjacentHTML('beforebegin', additionalFields);
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('checkin').min = today;
  document.getElementById('checkout').min = today;
  
  // Add form submission handler
  form.addEventListener('submit', handleFormSubmission);
  
  // Auto-save form data as user types
  setupAutoSave();
}

function loadBookingData() {
  // Check if there's booking data from URL params (from suite booking)
  const urlParams = new URLSearchParams(window.location.search);
  const suiteName = urlParams.get('suite');
  const suitePrice = urlParams.get('price');
  const suiteId = urlParams.get('id');
  
  if (suiteName) {
    // Pre-fill form with booking data
    const messageField = document.getElementById('message');
    const suiteSelect = document.getElementById('suite-preference');
    
    if (messageField) {
      messageField.value = `I'm interested in booking the ${suiteName} suite (ID: ${suiteId}, Price: $${suitePrice}/night). Please provide more information about availability and booking process.`;
    }
    
    // Try to match suite in dropdown
    if (suiteSelect) {
      const option = Array.from(suiteSelect.options).find(opt => 
        opt.text.toLowerCase().includes(suiteName.toLowerCase().split(' ')[0])
      );
      if (option) {
        option.selected = true;
      }
    }
    
    // Store this inquiry in localStorage
    const inquiryData = {
      suiteId: suiteId,
      suiteName: suiteName,
      price: suitePrice,
      timestamp: new Date().toISOString(),
      type: 'booking_inquiry'
    };
    
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    inquiries.push(inquiryData);
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
  }
  
  // Load saved form data if user was filling it before
  loadSavedFormData();
}

function setupAutoSave()
       {
  const formFields = ['name', 'email', 'phone', 'message', 'suite-preference', 'checkin', 'checkout', 'guests'];
  
  formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('input', function 
      }