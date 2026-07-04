
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.menu-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const panel = document.getElementById(tab.dataset.tab);
      if (!panel || tab.classList.contains('active')) return;
      document.querySelectorAll('.menu-tab').forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.menu-panel').forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      panel.classList.add('active');
    });
  });

  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach((el) => el.classList.add('in'));
  }

  const progressBar = document.getElementById('progressBar');
  const heroBg = document.getElementById('heroBg');
  let ticking = false;

  function updateScrollEffects() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY || window.pageYOffset;
    if (progressBar) progressBar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
    if (heroBg && !prefersReducedMotion) {
      const offset = Math.min(scrolled * 0.18, 120);
      heroBg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }, { passive: true });
  updateScrollEffects();
