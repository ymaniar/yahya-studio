
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const menuTabs = Array.from(document.querySelectorAll('.menu-tab'));

  function activateTab(tab) {
    const panel = document.getElementById(tab.dataset.tab);
    if (!panel || tab.classList.contains('active')) return;
    menuTabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
      item.setAttribute('tabindex', '-1');
    });
    document.querySelectorAll('.menu-panel').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    panel.classList.add('active');
  }

  menuTabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', (event) => {
      const currentIndex = menuTabs.indexOf(tab);
      let targetIndex = null;
      if (event.key === 'ArrowRight') targetIndex = (currentIndex + 1) % menuTabs.length;
      else if (event.key === 'ArrowLeft') targetIndex = (currentIndex - 1 + menuTabs.length) % menuTabs.length;
      else if (event.key === 'Home') targetIndex = 0;
      else if (event.key === 'End') targetIndex = menuTabs.length - 1;

      if (targetIndex !== null) {
        event.preventDefault();
        const targetTab = menuTabs[targetIndex];
        activateTab(targetTab);
        targetTab.focus();
      }
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
