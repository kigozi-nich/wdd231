// Function to toggle between grid and list views
document.getElementById('gridBtn').addEventListener('click', function() {
    document.getElementById('directoryContainer').className = 'directory-container grid';
    this.classList.add('active');
    document.getElementById('listBtn').classList.remove('active');
});

document.getElementById('listBtn').addEventListener('click', function() {
    document.getElementById('directoryContainer').className = 'directory-container list';
    this.classList.add('active');
    document.getElementById('gridBtn').classList.remove('active');
});

// Function to toggle dark/light mode
document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check if dark mode was previously enabled
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').checked = true;
}

// Mobile menu toggle
document.getElementById('hamburgerBtn').addEventListener('click', function() {
    document.getElementById('primaryNav').classList.toggle('responsive');
    this.classList.toggle('open');
});

// Fetch and display directory data
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members data:', error);
        document.getElementById('directoryContainer').innerHTML = `
            <p class="error-message">Sorry, we could not load the business directory. Please try again later.</p>
        `;
    }
}

// Function to display members based on current view
function displayMembers(members) {
    const container = document.getElementById('directoryContainer');
    container.innerHTML = ''; // Clear container
    
    members.forEach(member => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'member-card';
        
        // Create membership badge based on level
        let membershipBadge = '';
        if (member.membershipLevel === 3) {
            membershipBadge = '<span class="badge gold">Gold Member</span>';
        } else if (member.membershipLevel === 2) {
            membershipBadge = '<span class="badge silver">Silver Member</span>';
        } else {
            membershipBadge = '<span class="badge bronze">Member</span>';
        }
        
        // Format website URL for display
        const websiteDisplay = member.website.replace(/^https?:\/\/(www\.)?/, '');
        
        // Build card HTML
        card.innerHTML = `
            <div class="card-content">
                <img src="${member.image}" alt="${member.name} Logo" class="member-image">
                <div class="member-info">
                    <h3>${member.name} ${membershipBadge}</h3>
                    <p class="member-description">${member.description}</p>
                    <p class="member-category"><strong>Category:</strong> ${member.category}</p>
                    <div class="member-contact">
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${websiteDisplay}</a></p>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Initialize the directory
getMembers();