const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (navLinks) navLinks.classList.remove('open');
  });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
  const dateField = bookingForm.querySelector('input[type="date"]');
  if (dateField) dateField.min = new Date().toISOString().split('T')[0];

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = new FormData(bookingForm);
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const service = data.get('service');
    const date = data.get('date');
    const time = data.get('time');
    const notes = data.get('notes') || 'No additional notes.';

    const subject = encodeURIComponent('Appointment request - ' + service);
    const body = encodeURIComponent(
      'Hi Liberty Fade,\n\n' +
      "I'd like to request an appointment.\n\n" +
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + phone + '\n' +
      'Service: ' + service + '\n' +
      'Preferred date: ' + date + '\n' +
      'Preferred time: ' + time + '\n' +
      'Notes: ' + notes + '\n\nThanks!'
    );

    const message = bookingForm.querySelector('.form-message');
    if (message) {
      message.style.display = 'block';
      message.textContent = 'Your email app will open with the appointment request ready to send.';
    }

    window.location.href = 'mailto:hello@libertyfade.com?subject=' + subject + '&body=' + body;
  });
}
