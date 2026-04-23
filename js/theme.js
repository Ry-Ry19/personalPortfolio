/*
 * theme.js
 * ─────────────────────────────────────────────────────────
 * Light / Dark mode toggle with localStorage persistence
 * ─────────────────────────────────────────────────────────
 */

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  html.classList.add('light-mode');
}

// Toggle theme on button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('light-mode');
    const isLight = html.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}