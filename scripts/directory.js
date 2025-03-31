// Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-list').classList.toggle('open');
});

// Display Year and Last Modified
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Fetch Member Data
const container = document.getElementById("members-container");

async function loadMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  container.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.image}" alt="${member.name}" loading="lazy" width="200" height="200">
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership Level: ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

// View Toggle
document.getElementById("grid-view").addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

document.getElementById("list-view").addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});

loadMembers();
