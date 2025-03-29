const container = document.getElementById('spotlight-container');

async function getSpotlights() {
  const response = await fetch("data/members.json");
  const data = await response.json();

  const spotlights = data.members
    .filter(m => m.membership === "gold" || m.membership === "silver")
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  container.innerHTML = spotlights.map(m => `
    <div class="card">
      <h3>${m.name}</h3>
      <img src="images/${m.image}" alt="${m.name}">
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <a href="${m.website}" target="_blank">${m.website}</a>
      <p class="membership">${m.membership}</p>
    </div>
  `).join('');
}

getSpotlights();
