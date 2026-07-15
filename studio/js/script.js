(function () {
  'use strict';

  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    primaryNav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Hero starfield ----
  var canvas = document.getElementById('heroStarfield');
  var heroSection = document.querySelector('.hero');

  if (canvas && heroSection && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    var interactive = !prefersReducedMotion && !isCoarsePointer;

    var stars = [];
    var width = 0;
    var height = 0;
    var dpr = 1;
    var mouse = { x: 0, y: 0, active: false };
    var rafId = null;
    var resizeTimer = null;

    function starCount(w, h) {
      var count = Math.round((w * h) / 9000);
      return Math.max(30, Math.min(count, 110));
    }

    function createStars(w, h) {
      var count = starCount(w, h);
      var list = [];
      for (var i = 0; i < count; i++) {
        var baseX = Math.random() * w;
        var baseY = Math.random() * h;
        list.push({
          baseX: baseX,
          baseY: baseY,
          x: baseX,
          y: baseY,
          r: Math.random() * 1.2 + 0.4,
          alpha: Math.random() * 0.5 + 0.3,
          driftX: (Math.random() - 0.5) * 0.05,
          driftY: (Math.random() - 0.5) * 0.05
        });
      }
      return list;
    }

    function resizeCanvas() {
      var rect = heroSection.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.beginPath();
        ctx.fillStyle = 'rgba(226, 240, 255, ' + s.alpha + ')';
        ctx.arc(s.baseX, s.baseY, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      if (interactive && mouse.active) {
        var glowRadius = 140;
        var glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        glow.addColorStop(0, 'rgba(45, 212, 238, 0.16)');
        glow.addColorStop(0.55, 'rgba(109, 94, 252, 0.07)');
        glow.addColorStop(1, 'rgba(109, 94, 252, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];

        s.baseX += s.driftX;
        s.baseY += s.driftY;
        if (s.baseX < 0) s.baseX = width;
        if (s.baseX > width) s.baseX = 0;
        if (s.baseY < 0) s.baseY = height;
        if (s.baseY > height) s.baseY = 0;

        var targetX = s.baseX;
        var targetY = s.baseY;
        var brightness = s.alpha;

        if (interactive && mouse.active) {
          var dx = s.baseX - mouse.x;
          var dy = s.baseY - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var radius = 120;
          if (dist < radius) {
            var force = 1 - dist / radius;
            var safeDist = dist || 1;
            targetX = s.baseX + (dx / safeDist) * force * 18;
            targetY = s.baseY + (dy / safeDist) * force * 18;
            brightness = Math.min(1, s.alpha + force * 0.5);
          }
        }

        s.x += (targetX - s.x) * 0.08;
        s.y += (targetY - s.y) * 0.08;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(226, 240, 255, ' + brightness + ')';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(drawFrame);
    }

    function startAnimation() {
      if (rafId === null) {
        rafId = requestAnimationFrame(drawFrame);
      }
    }

    function stopAnimation() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function handleMouseMove(event) {
      var rect = heroSection.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    }

    function handleMouseLeave() {
      mouse.active = false;
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resizeCanvas();
        if (prefersReducedMotion) {
          drawStatic();
        }
      }, 150);
    }

    resizeCanvas();

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      var heroInView = true;
      var tabVisible = !document.hidden;

      function updateAnimationState() {
        if (heroInView && tabVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      }

      updateAnimationState();

      if (interactive) {
        heroSection.addEventListener('mousemove', handleMouseMove);
        heroSection.addEventListener('mouseleave', handleMouseLeave);
      }

      if ('IntersectionObserver' in window) {
        var heroVisibilityObserver = new IntersectionObserver(
          function (entries) {
            heroInView = entries[0].isIntersecting;
            updateAnimationState();
          },
          { threshold: 0 }
        );
        heroVisibilityObserver.observe(heroSection);
      }

      document.addEventListener('visibilitychange', function () {
        tabVisible = !document.hidden;
        updateAnimationState();
      });
    }

    window.addEventListener('resize', handleResize);
  }

  // ---- Website Planner ----
  var plannerSection = document.getElementById('planner');

  if (plannerSection) {
    var businessRadios = plannerSection.querySelectorAll('input[name="planner-business-type"]');
    var goalRadios = plannerSection.querySelectorAll('input[name="planner-main-goal"]');
    var featureChecks = plannerSection.querySelectorAll('input[name="planner-features"]');
    var styleRadios = plannerSection.querySelectorAll('input[name="planner-style"]');
    var timelineRadios = plannerSection.querySelectorAll('input[name="planner-timeline"]');

    var plannerTypeEl = document.getElementById('plannerType');
    var plannerSectionsEl = document.getElementById('plannerSections');
    var plannerPriorityEl = document.getElementById('plannerPriority');
    var plannerExplanationEl = document.getElementById('plannerExplanation');
    var plannerUseButton = document.getElementById('plannerUseButton');
    var contactSection = document.getElementById('contact');
    var messageField = document.getElementById('message');

    var BUSINESS_SECTIONS = {
      'Café / Restaurant': ['Menu', 'Gallery', 'Location', 'WhatsApp / Contact'],
      'Barbershop': ['Services', 'Prices', 'Booking message', 'Gallery', 'WhatsApp'],
      'Beauty / Salon': ['Services', 'Gallery', 'Booking / Contact', 'Location'],
      'Shop / Retail': ['Products / Catalog', 'Location', 'WhatsApp / Contact'],
      'Service business': ['Services', 'Trust section', 'Contact form', 'Google Maps'],
      'Other': ['Services / Info', 'Contact', 'Location']
    };

    var FEATURE_LABELS = {
      'Services / prices': 'Services / Prices',
      'Menu / product list': 'Menu',
      'Photo gallery': 'Gallery',
      'WhatsApp button': 'WhatsApp',
      'Google Maps / location': 'Location',
      'Contact form': 'Contact form',
      'Booking message': 'Booking message'
    };

    var PRIORITY_BY_TIMELINE = {
      'As soon as possible': 'High — start this week',
      'This week': 'High — plan to start soon',
      'This month': 'Medium — plenty of time to prepare',
      'No rush': 'Low — no pressure, plan when ready'
    };

    var STYLE_DESCRIPTORS = {
      'Clean and minimal': 'clean and minimal',
      'Premium and elegant': 'premium and elegant',
      'Dark and bold': 'dark and bold',
      'Warm and friendly': 'warm and inviting',
      'Modern tech': 'modern, tech-forward'
    };

    var GOAL_PHRASES = {
      'Look more professional': 'look more professional online',
      'Show services or prices': 'clearly show its services and prices',
      'Get more calls / WhatsApp messages': 'get more calls and WhatsApp messages',
      'Show menu or products': 'showcase its menu or products',
      'Improve Google presence': 'improve its presence on Google',
      'Replace an old website': 'replace an outdated website with something modern'
    };

    function getCheckedValue(radios) {
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;
      }
      return radios.length ? radios[0].value : '';
    }

    function getCheckedValues(checks) {
      var values = [];
      checks.forEach(function (input) {
        if (input.checked) values.push(input.value);
      });
      return values;
    }

    function getPlannerAnswers() {
      return {
        businessType: getCheckedValue(businessRadios),
        mainGoal: getCheckedValue(goalRadios),
        features: getCheckedValues(featureChecks),
        style: getCheckedValue(styleRadios),
        timeline: getCheckedValue(timelineRadios)
      };
    }

    function buildSections(answers) {
      var base = BUSINESS_SECTIONS[answers.businessType] || BUSINESS_SECTIONS.Other;
      var merged = base.slice();
      answers.features.forEach(function (feature) {
        var label = FEATURE_LABELS[feature] || feature;
        if (merged.indexOf(label) === -1) {
          merged.push(label);
        }
      });
      return merged;
    }

    function buildExplanation(answers, sections) {
      var styleText = STYLE_DESCRIPTORS[answers.style] || 'clean and minimal';
      var goalPhrase = GOAL_PHRASES[answers.mainGoal] || 'grow online';
      return (
        'A one-page website built ' + styleText + ', designed to help a ' + answers.businessType + ' ' +
        goalPhrase + '. Suggested focus: ' + sections.slice(0, 3).join(', ') + '.'
      );
    }

    function updateRecommendation() {
      var answers = getPlannerAnswers();
      var sections = buildSections(answers);

      plannerTypeEl.textContent = 'One-page website';

      plannerSectionsEl.innerHTML = '';
      sections.forEach(function (section) {
        var li = document.createElement('li');
        li.textContent = section;
        plannerSectionsEl.appendChild(li);
      });

      plannerPriorityEl.textContent = PRIORITY_BY_TIMELINE[answers.timeline] || PRIORITY_BY_TIMELINE['No rush'];
      plannerExplanationEl.textContent = buildExplanation(answers, sections);
    }

    var plannerInputs = plannerSection.querySelectorAll('input');
    plannerInputs.forEach(function (input) {
      input.addEventListener('change', updateRecommendation);
    });

    updateRecommendation();

    if (plannerUseButton && contactSection) {
      plannerUseButton.addEventListener('click', function () {
        var answers = getPlannerAnswers();
        var sections = buildSections(answers);

        if (messageField) {
          var summary = [
            'Website planner summary:',
            '- Business type: ' + answers.businessType,
            '- Main goal: ' + answers.mainGoal,
            '- Needed features: ' + (answers.features.length ? answers.features.join(', ') : 'Not specified'),
            '- Visual style: ' + answers.style,
            '- Timeline: ' + answers.timeline,
            '',
            buildExplanation(answers, sections)
          ].join('\n');
          messageField.value = summary;
        }

        contactSection.scrollIntoView({ block: 'start' });

        if (messageField) {
          messageField.focus();
        }
      });
    }
  }
})();
