// JavaScript to handle date functionality in the footer

// Set the current year for copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Format the last modified date
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

// Get the document's last modified date and format it
document.getElementById('lastModified').textContent = new Date(document.lastModified)
    .toLocaleDateString('en-US', options)
    .replace(',', '');