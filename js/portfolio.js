/**
 * portfolio.js
 * ─────────────────────────────────────────────────────────
 * LEARNER NOTE:
 * This script handles the lightbox modal for portfolio images.
 * When a portfolio card is clicked, the full image is displayed.
 * ─────────────────────────────────────────────────────────
 */

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  /**
   * Opens the lightbox with the given image source
   */
  function openLightbox(imageSrc, imageAlt) {
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt || 'Portfolio image';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
  }

  /**
   * Closes the lightbox
   */
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImage.src = ''; // Clear the src
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Attach click listeners to all portfolio cards
  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const imageSrc = img.src;
      const imageAlt = img.alt;
      openLightbox(imageSrc, imageAlt);
    });
  });

  // Close lightbox when clicking the close button
  lightboxClose.addEventListener('click', closeLightbox);

  // Close lightbox when clicking outside the image (on the overlay)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});