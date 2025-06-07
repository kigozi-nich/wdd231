document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("discover-cards");

  fetch("data/discover.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const card = document.createElement("section");

        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure>
            <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;

        container.appendChild(card);
      });
    });

  // Visitor message with localStorage
  const sidebar = document.getElementById("visit-message");
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    sidebar.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (days === 0) {
      sidebar.textContent = "Back so soon! Awesome!";
    } else {
      sidebar.textContent = `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
});
