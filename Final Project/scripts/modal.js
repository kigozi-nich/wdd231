// modal.js - ES Module for Modal Dialog handling

// Cache modal elements
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close');

// Function to open modal with content (HTML string)
export function openModal(contentHTML) {
  if (!modal || !modalContent || !modalCloseBtn) return;

  modalContent.innerHTML = contentHTML;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  modalCloseBtn.focus();

  // Disable scrolling on body when modal is open
  document.body.style.overflow = 'hidden';
}

// Function to close modal
export function closeModal() {
  if (!modal) return;

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modalContent.innerHTML = '';
  
  // Restore scrolling on body
  document.body.style.overflow = '';
}

// Event listeners for modal

// Close button click
modalCloseBtn?.addEventListener('click', () => {
  closeModal();
});

// Close modal when clicking outside the content
modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});
