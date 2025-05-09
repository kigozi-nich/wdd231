// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the current year and insert it into the span with id 'currentYear'
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }
    
    // Get the last modified date of the document and insert it into the element with id 'lastModified'
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Update: ${document.lastModified}`;
    }
});