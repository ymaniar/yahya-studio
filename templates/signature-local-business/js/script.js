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
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initActiveNavLink();
    initFaqAccordion();
    initHeaderScrollState();
  });
})();
