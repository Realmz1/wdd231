// Fetch the location data from the JSON file and dynamically generate location cards
fetch('../data/locations.json')
  .then(response => response.json())
  .then(locations => {
    const locationCardsContainer = document.getElementById('location-cards');

    locations.forEach(location => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <h2>${location.name}</h2>
        <figure>
          <img src="${location.image}" alt="${location.name}" />
        </figure>
        <address>${location.address}</address>
        <p>${location.description}</p>
        <button>Learn More</button>
      `;

      locationCardsContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching location data:', error));

// Display visitor message based on last visit
const visitorMessage = document.getElementById('visitor-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
  visitorMessage.textContent = 'Welcome! Let us know if you have any questions.';
} else {
  const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (daysSinceLastVisit < 1) {
    visitorMessage.textContent = 'Back so soon! Awesome!';
  } else {
    visitorMessage.textContent = `You last visited ${daysSinceLastVisit} day${daysSinceLastVisit > 1 ? 's' : ''} ago.`;
  }
}

localStorage.setItem('lastVisit', now);
