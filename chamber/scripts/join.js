
        // Set timestamp when form loads
        document.getElementById('timestamp').value = new Date().toISOString();

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
        }

        // Navigation toggle
        document.querySelector('.hamburger').addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });

        // Set last modified date
        document.getElementById('lastModified').textContent = document.lastModified;

        // Add animation classes after page load
        window.addEventListener('load', function() {
            const cards = document.querySelectorAll('.membership-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 200);
            });
        });
