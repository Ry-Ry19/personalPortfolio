/**
 * animations.js
 * ─────────────────────────────────────────────────────────
 * LEARNER NOTE:
 * This file handles scroll-triggered reveal animations using
 * the Intersection Observer API — a modern, performant way
 * to detect when elements enter the viewport.
 *
 * Why not just CSS animations?
 *   CSS animations fire on page load. IntersectionObserver
 *   fires only when the element becomes visible, creating the
 *   "elements appear as you scroll" effect.
 *
 * We also trigger skill bar animations when the Resume section
 * becomes active in the DOM.
 * ─────────────────────────────────────────────────────────
 */

// ── Typing Animation ──
function typeWriter(element, text, speed = 80, callback) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      setTimeout(callback, 1500);
    }
  }
  type();
}

document.addEventListener('DOMContentLoaded', () => {

  // ── Typing animation for subtitle (badges) ──
  const subtitle = document.querySelector('.sidebar__badge');
  if (subtitle) {
    const texts = ['Software Developer', 'Data Analyst', 'General VA'];
    let textIndex = 0;
    let isTyping = false;

    subtitle.style.borderRight = '2px solid var(--clr-accent)';
    subtitle.style.paddingRight = '1px';

    function typeNext() {
      isTyping = true;
      typeWriter(subtitle, texts[textIndex], 80, () => {
        textIndex = (textIndex + 1) % texts.length;
        isTyping = false;
        setTimeout(typeNext, 800);
      });
    }
    typeNext();

    // Blinking cursor effect
    setInterval(() => {
      if (isTyping) {
        subtitle.style.borderColor = subtitle.style.borderColor === 'transparent' ? 'var(--clr-accent)' : 'transparent';
      } else {
        subtitle.style.borderColor = 'var(--clr-accent)';
      }
    }, 500);
  }

  // ── 1. Observe timeline items for staggered reveal ──
  const timelineItems = document.querySelectorAll('.timeline__item');

  // IntersectionObserver fires when element enters the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger each item by 100ms
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, i * 100);

          // Unobserve after animation — no need to keep watching
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 } // Trigger when 15% of item is visible
  );

  // Set initial hidden state and start observing
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-12px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(item);
  });


  // ── 2. Blog card staggered reveal ──
  const blogCards = document.querySelectorAll('.blog-card');

  const blogObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 120);
          blogObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  blogCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    blogObserver.observe(card);
  });


  // ── 3. Cursor accent dot (subtle, non-distracting) ──
  // LEARNER NOTE:
  // A custom cursor dot adds polish without being intrusive.
  // We track mousemove and move the dot with a small lag (lerp).
  // This is optional — remove if you don't want a custom cursor.

  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    width: 6px; height: 6px;
    background: #6c63ff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(dot);

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.opacity = '0.7';
    dot.style.left = mouseX - 3 + 'px';
    dot.style.top  = mouseY - 3 + 'px';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
  });

  // Scale up on interactive elements
  const interactables = document.querySelectorAll('a, button, .portfolio-card, .service-card');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'scale(3)';
      dot.style.opacity = '0.4';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'scale(1)';
      dot.style.opacity = '0.7';
    });
  });

});
