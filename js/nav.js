/**
 * nav.js
 * ─────────────────────────────────────────────────────────
 * LEARNER NOTE:
 * This script handles tab navigation between sections.
 *
 * How it works:
 *   1. We select all nav links and all sections once.
 *   2. On each nav click, we remove .active from everything.
 *   3. We add .active to the clicked link and its target section.
 *
 * This "deactivate all, then activate one" pattern is very common
 * in tab UIs — simple, predictable, and easy to debug.
 * ─────────────────────────────────────────────────────────
 */

// Wait for the DOM to fully load before querying elements
document.addEventListener('DOMContentLoaded', () => {

  // Select all nav links and all sections
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  /**
   * activateSection(targetId)
   * Shows the section matching targetId, hides all others.
   * Updates nav link active state accordingly.
   */
  function activateSection(targetId) {
    // Deactivate all nav links
    navLinks.forEach(link => link.classList.remove('active'));

    // Deactivate all sections
    sections.forEach(section => section.classList.remove('active'));

    // Activate the matching nav link (data-section matches targetId)
    const activeLink = document.querySelector(`.nav-link[data-section="${targetId}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Activate the matching section
    const activeSection = document.getElementById(targetId);
    if (activeSection) activeSection.classList.add('active');
  }

  // Attach click listener to each nav link
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Stop the page from jumping to the anchor

      // Read which section this link targets
      const target = link.getAttribute('data-section');
      activateSection(target);
    });
  });

  // Set initial active state on page load (default: About)
  activateSection('about');

});
