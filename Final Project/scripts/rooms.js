// rooms.js (ES Module)

// Sample data URL or local JSON path
const dataURL = 'data/rooms.json'; // Adjust path as needed

export async function loadRoomsData() {
  try {
    const response = await fetch(dataURL);
    if (!response.ok) throw new Error('Network response was not ok');
    const rooms = await response.json();

    displayRooms(rooms);
  } catch (error) {
    console.error('Failed to load rooms data:', error);
    document.getElementById('rooms-container').innerHTML = `<p>Error loading rooms data.</p>`;
  }
}

function displayRooms(rooms) {
  // Ensure at least 15 rooms, fallback if fewer
  const itemsToShow = rooms.slice(0, 15);

  const container = document.getElementById('rooms-container');
  container.innerHTML = ''; // Clear previous content

  itemsToShow.forEach(room => {
    const roomHTML = `
      <article class="room-item">
        <h3>${room.name}</h3>
        <img src="${room.image}" alt="${room.name}" loading="lazy" />
        <p>Type: ${room.type}</p>
        <p>Price per night: $${room.price}</p>
        <p>Amenities: ${room.amenities.join(', ')}</p>
        <button class="details-btn" data-room-id="${room.id}">View Details</button>
      </article>
    `;
    container.insertAdjacentHTML('beforeend', roomHTML);
  });

  // Add event listeners to buttons for modal or details
  container.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const roomId = e.target.dataset.roomId;
      openRoomModal(roomId, rooms);
    });
  });
}

function openRoomModal(id, rooms) {
  const room = rooms.find(r => r.id === id);
  if (!room) return;

  // Example modal content fill and show
  const modal = document.getElementById('modal');
  modal.querySelector('.modal-title').textContent = room.name;
  modal.querySelector('.modal-body').innerHTML = `
    <img src="${room.image}" alt="${room.name}" />
    <p>${room.description}</p>
    <p>Type: ${room.type}</p>
    <p>Price: $${room.price}</p>
    <p>Amenities: ${room.amenities.join(', ')}</p>
  `;

  modal.classList.add('show');
}


function openRoomModal(id, rooms) {
  const room = rooms.find(r => r.id === id);
  if (!room) return;

  const modal = document.getElementById('modal');
  modal.querySelector('.modal-title').textContent = room.name;
  modal.querySelector('.modal-body').innerHTML = `
    <img src="${room.image}" alt="${room.name}" />
    <p>${room.description}</p>
    <p><strong>Type:</strong> ${room.type}</p>
    <p><strong>Price:</strong> $${room.price}</p>
    <p><strong>Amenities:</strong> ${room.amenities.join(', ')}</p>
  `;

  modal.classList.add('show');
  modal.removeAttribute('hidden');

  // Set focus on modal for accessibility
  modal.focus();
}
