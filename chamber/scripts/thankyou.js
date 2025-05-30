
// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to format timestamp
function formatTimestamp(timestamp) {
    if (!timestamp) return '--';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
}

// Display form data
document.addEventListener('DOMContentLoaded', function() {
    // Get all the form data from URL parameters
    const firstName = getUrlParameter('firstName');
    const lastName = getUrlParameter('lastName');
    const email = getUrlParameter('email');
    const phone = getUrlParameter('phone');
    const businessName = getUrlParameter('businessName');
    const timestamp = getUrlParameter('timestamp');

    // Display the data
    document.getElementById('displayFirstName').textContent = firstName || '--';
    document.getElementById('displayLastName').textContent = lastName || '--';
    document.getElementById('displayEmail').textContent = email || '--';
    document.getElementById('displayPhone').textContent = phone || '--';
    document.getElementById('displayBusinessName').textContent = businessName || '--';
    document.getElementById('displayTimestamp').textContent = formatTimestamp(timestamp);
});

// Navigation toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Set last modified date
document.getElementById('lastModified').textContent = document.lastModified;
