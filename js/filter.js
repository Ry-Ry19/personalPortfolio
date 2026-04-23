/**
 * filter.js
 * ─────────────────────────────────────────────────────────
 * LEARNER NOTE:
 * This script filters portfolio cards by category.
 *
 * Key concept: "data attributes"
 *   Each card has data-category="webdesign" (or similar).
 *   Each button has data-filter="webdesign".
 *   When a button is clicked, we compare these values.
 *
 * We add .hidden to non-matching cards (CSS: display:none).
 * We remove .hidden from matching cards to show them again.
 *
 * No libraries needed — pure vanilla JS!
 * ─────────────────────────────────────────────────────────
 */

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns  = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  /**
   * applyFilter(filter)
   * Shows cards whose data-category matches filter (or "all").
   * Hides cards that don't match.
   */
  function applyFilter(filter) {
    portfolioCards.forEach(card => {
      const category = card.getAttribute('data-category');

      // "all" shows every card; otherwise match the category
      const shouldShow = (filter === 'all') || (category === filter);

      if (shouldShow) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // Attach click listeners to all filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Read the filter value and apply it
      const filter = btn.getAttribute('data-filter');
      applyFilter(filter);
    });
  });

  // Default: show all on load
  applyFilter('all');

});
