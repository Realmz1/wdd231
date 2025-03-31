const spotlightContainer = document.getElementById('spotlight-container');

// Function to fetch member data and display spotlights
async function getSpotlights() {
    try {
        const response = await fetch('../data/members.json');

        if (!response.ok) {
            throw new Error('Member data not available');
        }

        const data = await response.json();

        // Filter for gold or silver members (membership level 2 or 3)
        const eligibleMembers = data.filter(member => member.membership >= 2);

        // Shuffle the array to get random members
        const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());

        // Get 2-3 random members for spotlight
        const spotlights = shuffledMembers.slice(0, Math.min(3, shuffledMembers.length));

        // Display spotlights
        spotlightContainer.innerHTML = '';

        spotlights.forEach(member => {
            // Map membership level to text
            const membershipText = member.membership === 3 ? 'Gold Member' : 'Silver Member';
            // Add membership class
            const membershipClass = member.membership === 3 ? 'gold' : 'silver';

            spotlightContainer.innerHTML += `
        <div class="card ${membershipClass}">
          <h3>${member.name}</h3>
          <img src="../${member.image}" alt="${member.name} logo">
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">${member.website}</a>
          <p class="membership">${membershipText}</p>
        </div>
      `;
        });

    } catch (error) {
        console.error('Error fetching member data:', error);
        spotlightContainer.innerHTML = '<p>Business spotlights unavailable</p>';
    }
}

// Call the function to load spotlights
getSpotlights(); 