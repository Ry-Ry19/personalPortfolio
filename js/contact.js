/**
 * contact.js
 * ─────────────────────────────────────────────────────────
 * Handles contact form submission via EmailJS
 * ─────────────────────────────────────────────────────────
 */

document.addEventListener('DOMContentLoaded', () => {

  const sendBtn  = document.getElementById('sendBtn');
  const feedback = document.getElementById('formFeedback');

  if (!sendBtn) return;

  sendBtn.addEventListener('click', () => {

    const name    = document.getElementById('c-name').value.trim();
    const email   = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim();
    const message = document.getElementById('c-msg').value.trim();

    if (!name || !email || !subject || !message) {
      showFeedback('⚠️ Please fill in all fields.', '#f87171');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showFeedback('⚠️ Please enter a valid email address.', '#f87171');
      return;
    }

    sendBtn.textContent = 'Sending…';
    sendBtn.disabled = true;

    emailjs.send(
      'service_atogehs',
      'template_vlnh8zh',
      {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'ryanrecososa16@gmail.com'
      },
      'RZnl-c-h_BmoivSEI'
    )
    .then(() => {
      showFeedback('✅ Message sent! I\'ll get back to you soon.', '#00d4aa');
      sendBtn.textContent = 'Send Message';
      sendBtn.disabled = false;
      ['c-name', 'c-email', 'c-subject', 'c-msg'].forEach(id => {
        document.getElementById(id).value = '';
      });
    })
    .catch((err) => {
      showFeedback('⚠️ Failed to send. Please try again.', '#f87171');
      sendBtn.textContent = 'Send Message';
      sendBtn.disabled = false;
      console.error('EmailJS error:', err);
    });
  });

  function showFeedback(text, color) {
    feedback.textContent = text;
    feedback.style.color = color;
    setTimeout(() => { feedback.textContent = ''; }, 5000);
  }

});