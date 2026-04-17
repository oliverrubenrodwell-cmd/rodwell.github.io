document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var toggle = document.querySelector('.nav-toggle');
  var overlay = document.querySelector('.nav-overlay');
  var navLinks = document.querySelectorAll('.nav-list a');
  var header = document.querySelector('.header');
  var hero = document.querySelector('.hero');

  // Hamburger toggle
  toggle.addEventListener('click', function () {
    var open = body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
    overlay.setAttribute('aria-hidden', !open);
  });

  // Close nav when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', false);
      overlay.setAttribute('aria-hidden', true);
    });
  });

  // Scroll-triggered solid header
  if (hero && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          header.classList.remove('header-solid');
        } else {
          header.classList.add('header-solid');
        }
      });
    }, { threshold: 0 });

    observer.observe(hero);
  }
});
