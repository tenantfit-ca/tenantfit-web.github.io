const baseUrl = "https://api.tenantfit.ca";

function saveLead(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const agreedToReceiveNews = document.getElementById('agreedToReceiveNews').checked;
    const source = leadForm.querySelector('input[name="leadSource"]').value;
    
    showOverlay();
    fetch(baseUrl + '/save-prescreening-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email,
        agreedToReceiveNews,
        source
    })
    })
    .then(res => res.json())
    .then(data => {
    if (data.success) {
        leadForm.style.display = 'none';
        document.getElementById('leadSuccessMsg').style.display = '';
        showAlert('Email sent to: ' + email);
    } else {
        showAlert(data.message || 'Submission failed. Please try again.', 'danger');
    }
    })
    .catch(() => {
        showAlert('Submission failed. Please try again.', 'danger');
    })
    .finally(hideOverlay);
}

function registerListeners() {
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', saveLead);
  }
}

document.addEventListener('DOMContentLoaded', registerListeners);

function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.textContent = message;
    alertContainer.className = `alert alert-${type}`;
    alertContainer.classList.remove('hidden');

    setTimeout(() => {
        alertContainer.classList.add('hidden');
    }, 3000); // Disappear after 3 seconds
}

function showOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    overlay.classList.add('d-flex');
}

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('d-flex');
    overlay.classList.add('d-none');
}