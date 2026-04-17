document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
});

function initCarousel(carousel) {
  var track = carousel.querySelector('.carousel-track');
  var slides = carousel.querySelectorAll('.carousel-slide');
  var prevBtn = carousel.querySelector('.carousel-btn--prev');
  var nextBtn = carousel.querySelector('.carousel-btn--next');
  var dotsContainer = carousel.querySelector('.carousel-dots');

  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (dotsContainer) dotsContainer.style.display = 'none';
    return;
  }

  // Generate dots
  var dots = [];
  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  // Navigation
  prevBtn.addEventListener('click', function () { scrollBy(-1); });
  nextBtn.addEventListener('click', function () { scrollBy(1); });

  // Keyboard support
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { scrollBy(-1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { scrollBy(1); e.preventDefault(); }
  });

  // Update state on scroll
  var scrollTimeout;
  track.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateState, 60);
  });

  function getSlideWidth() {
    return slides[0].getBoundingClientRect().width;
  }

  function getCurrentIndex() {
    return Math.round(track.scrollLeft / getSlideWidth());
  }

  function scrollBy(direction) {
    track.scrollBy({ left: direction * getSlideWidth(), behavior: 'smooth' });
  }

  function goTo(index) {
    track.scrollTo({ left: index * getSlideWidth(), behavior: 'smooth' });
  }

  function updateState() {
    var index = getCurrentIndex();

    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
  }

  // Initial state
  updateState();
}
