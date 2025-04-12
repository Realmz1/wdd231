const cardsContainer = document.querySelector("#location-cards");
const messageContainer = document.querySelector("#visitor-message");

// Load cards from JSON
fetch("data/locations.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(loc => {
      const card = document.createElement("section");
      card.classList.add("location-card");

      card.innerHTML = `
        <h2>${loc.name}</h2>
        <figure>
          <img src="${loc.image}" alt="${loc.name}" loading="lazy">
        </figure>
        <address>${loc.address}</address>
        <p>${loc.description}</p>
        <button>Learn More</button>
      `;
      cardsContainer.appendChild(card);
    });
  });

// Track last visit
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const difference = now - lastVisit;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  if (days === 0) {
    messageContainer.textContent = "Back so soon! Awesome!";
  } else {
    const dayLabel = days === 1 ? "day" : "days";
    messageContainer.textContent = `You last visited ${days} ${dayLabel} ago.`;
  }
}
localStorage.setItem("lastVisit", now);
