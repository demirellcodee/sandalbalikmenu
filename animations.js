function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const targets = document.querySelectorAll(
    '.menu-card, .category-card, .carousel-item, .section-intro, .page-note, .carousel-header, .search-wrap, .featured-spotlight, .contact-section'
  );

  targets.forEach((el, i) => {
    el.classList.add('animate-on-scroll');
    el.style.setProperty('--anim-delay', `${Math.min(i % 8, 7) * 0.07}s`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

function initPageLoad() {
  document.body.classList.add('page-loaded');
}

function initCarouselGuard() {
  const track = document.getElementById('carouselTrack');
  const prev = document.getElementById('carouselPrev');
  const next = document.getElementById('carouselNext');
  if (!track || !prev || !next) return;

  function getStep() {
    const item = track.querySelector('.carousel-item');
    if (!item) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 32;
    return item.offsetWidth + gap;
  }

  function updateButtons() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= maxScroll - 4;
  }

  prev.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));
  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
}

document.addEventListener('DOMContentLoaded', () => {
  initPageLoad();
  initScrollAnimations();
  initCarouselGuard();
});
