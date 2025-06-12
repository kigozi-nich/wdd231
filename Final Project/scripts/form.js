// form.js (ES Module)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm(form)) {
      // Serialize form data and send to form-action.html using URLSearchParams
      const params = new URLSearchParams(new FormData(form)).toString();
      window.location.href = `form-action.html?${params}`;
    } else {
      alert('Please fill out all required fields correctly.');
    }
  });
});

function validateForm(form) {
  // Simple example validation: required fields must not be empty
  let valid = true;
  form.querySelectorAll('[required]').forEach(input => {
    if (!input.value.trim()) {
      valid = false;
      input.classList.add('input-error');
    } else {
      input.classList.remove('input-error');
    }
  });
  return valid;
}
