// main.js (ES Module)

document.addEventListener('DOMContentLoaded', () => {
  // Navigation menu toggle for small screens
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('show');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', false);
      }
    });
  });

  // Load dynamic data (e.g. rooms info) from local JSON or API
  import('./rooms.js').then(module => {
    module.loadRoomsData();
  });

  // Setup modal dialog functionality if needed
  import('./modal.js').then(module => {
    module.initModal();
  });
});
