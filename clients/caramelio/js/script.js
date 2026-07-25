(function () {
  "use strict";

  /* Mobile navigation toggle */
  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll(".site-nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* Mark the current page's nav link as active */
  function initActiveNavLink() {
    var currentPage = (window.location.pathname.split("/").pop() || "index.html");
    document.querySelectorAll(".site-nav__link").forEach(function (link) {
      var linkPage = link.getAttribute("href");
      if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* Accessible FAQ accordion */
  function initFaqAccordion() {
    var questions = document.querySelectorAll(".faq-question");
    questions.forEach(function (button) {
      button.addEventListener("click", function () {
        var expanded = button.getAttribute("aria-expanded") === "true";
        var answer = document.getElementById(button.getAttribute("aria-controls"));

        button.setAttribute("aria-expanded", String(!expanded));

        if (answer) {
          answer.style.maxHeight = expanded ? "0px" : answer.scrollHeight + "px";
        }
      });
    });
  }

  /* Header shadow/background intensifies slightly on scroll */
  function initHeaderScrollState() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* Carte page: open the target <details> category when a nav link (or any
     #id link) jumps to it, so the jump target is never hidden/collapsed.
     Also reveals + activates the right "Carte sur place" / "Menu en ligne"
     toggle if the target lives inside the other (currently hidden) part. */
  function initMenuDeepLinks() {
    var groups = document.querySelectorAll(".menu-group");
    if (!groups.length) return;

    function openTarget() {
      var id = window.location.hash.slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;

      var part = target.closest(".menu-part");
      if (part && part.hasAttribute("hidden")) {
        var key = part.getAttribute("data-menu-part");
        document.querySelectorAll(".menu-part").forEach(function (p) {
          p.hidden = p.getAttribute("data-menu-part") !== key;
        });
        document.querySelectorAll(".menu-toggle").forEach(function (btn) {
          btn.classList.toggle("is-active", btn.getAttribute("data-menu-toggle") === key);
        });
      }

      if (target.tagName === "DETAILS") {
        target.open = true;
      }
    }

    openTarget();
    window.addEventListener("hashchange", openTarget);
  }

  /* Carte page: sticky toggle (Carte sur place / Menu en ligne) and a live
     text search across every menu item's name + description. */
  function initMenuControls() {
    var toggles = document.querySelectorAll(".menu-toggle");
    var parts = document.querySelectorAll(".menu-part");
    var search = document.getElementById("menu-search");
    if (!parts.length) return;

    toggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-menu-toggle");
        toggles.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        parts.forEach(function (part) {
          part.hidden = part.getAttribute("data-menu-part") !== key;
        });
      });
    });

    if (search) {
      search.addEventListener("input", function () {
        var query = search.value.trim().toLowerCase();
        document.querySelectorAll(".menu-group").forEach(function (group) {
          var anyMatch = false;
          group.querySelectorAll(".menu-item").forEach(function (item) {
            var match = !query || item.textContent.toLowerCase().indexOf(query) !== -1;
            item.classList.toggle("is-hidden", !match);
            if (match) anyMatch = true;
          });
          group.classList.toggle("is-hidden", query.length > 0 && !anyMatch);
          if (query.length > 0 && anyMatch) {
            group.open = true;
          }
        });
      });
    }
  }

  /* Galerie page: simple accessible lightbox — click a tile to view it
     larger, close via the close button, Escape, or clicking the backdrop. */
  function initGalerieLightbox() {
    var tiles = document.querySelectorAll(".galerie-tile");
    var lightbox = document.getElementById("lightbox");
    if (!tiles.length || !lightbox) return;

    var img = lightbox.querySelector(".lightbox__img");
    var caption = lightbox.querySelector(".lightbox__caption");
    var closeBtn = lightbox.querySelector(".lightbox__close");
    var lastTrigger = null;

    function open(tile) {
      var tileImg = tile.querySelector("img");
      lastTrigger = tile;
      img.src = tileImg.src;
      img.alt = tileImg.alt || "";
      caption.textContent = tile.getAttribute("data-caption") || "";
      lightbox.hidden = false;
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
      img.src = "";
      if (lastTrigger) lastTrigger.focus();
    }

    tiles.forEach(function (tile) {
      tile.addEventListener("click", function () {
        open(tile);
      });
    });

    closeBtn.addEventListener("click", close);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !lightbox.hidden) close();
    });
  }

  /* Contact page: cake-order form — block past dates in the native picker
     and reject a hand-typed past date on submit. */
  function initOrderFormDateGuard() {
    var dateInput = document.getElementById("of-date");
    if (!dateInput) return;

    var today = new Date();
    var iso = today.getFullYear() + "-" +
      String(today.getMonth() + 1).padStart(2, "0") + "-" +
      String(today.getDate()).padStart(2, "0");
    dateInput.setAttribute("min", iso);

    function validate() {
      if (dateInput.value && dateInput.value < iso) {
        dateInput.setCustomValidity("Veuillez choisir une date à partir d'aujourd'hui.");
      } else {
        dateInput.setCustomValidity("");
      }
    }

    dateInput.addEventListener("input", validate);
    dateInput.addEventListener("change", validate);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initActiveNavLink();
    initFaqAccordion();
    initHeaderScrollState();
    initMenuDeepLinks();
    initMenuControls();
    initGalerieLightbox();
    initOrderFormDateGuard();
  });
})();
