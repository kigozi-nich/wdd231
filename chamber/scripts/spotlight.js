// Member Spotlight JavaScript File
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the members data from your existing JSON file
    fetch('data/members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display member spotlights
            displayMemberSpotlights(data);
        })
        .catch(error => {
            console.error('Error fetching member data:', error);
            document.querySelector('.spotlight-container').innerHTML = 
                '<p class="error-message">Error loading member spotlights. Please try again later.</p>';
        });
});

// Function to display member spotlights
function displayMemberSpotlights(membersData) {
    // Filter gold and silver members
    const eligibleMembers = membersData.filter(member => 
        member.membershipLevel === 'gold' || member.membershipLevel === 'silver'
    );
    
    // Check if we have eligible members
    if (eligibleMembers.length === 0) {
        document.querySelector('.spotlight-container').innerHTML = 
            '<p>No gold or silver members found.</p>';
        return;
    }
    
    // Randomly select 2 or 3 members (randomly decide how many to show)
    const numberOfSpotlights = Math.min(eligibleMembers.length, Math.random() < 0.5 ? 2 : 3);
    
    // Create shuffled copy of eligible members
    const shuffledMembers = [...eligibleMembers];
    shuffleArray(shuffledMembers);
    
    // Take the first 2 or 3 members
    const selectedMembers = shuffledMembers.slice(0, numberOfSpotlights);
    
    // Generate and display HTML
    const spotlightContainer = document.querySelector('.spotlight-container');
    spotlightContainer.innerHTML = '';
    
    selectedMembers.forEach(member => {
        const spotlight = document.createElement('div');
        spotlight.classList.add('spotlight');
        
        // Adjust the property names to match your existing JSON structure
        // These property names should match your members.json file
        spotlight.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="membership-level">${member.membershipLevel} member</p>
        `;
        
        spotlightContainer.appendChild(spotlight);
    });
}

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}