document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");

  // Monitor the footer container for content changes
  const observer = new MutationObserver(() => {
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
      // Attach event listener once the button exists
      backToTopBtn.addEventListener("click", function (e) {
        e.preventDefault();
        scrollToTop(888); // 888ms duration
      });

      // Disconnect the observer since the button is now attached
      observer.disconnect();
    }
  });

  observer.observe(footerContainer, { childList: true, subtree: true });

  // Smooth scroll function
  function scrollToTop(duration) {
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);

      window.scrollTo(0, Math.ceil(start * (1 - easeInOutCubic(time))));

      if (time < 1) {
        requestAnimationFrame(scroll);
      }
    }

    requestAnimationFrame(scroll);
  }
});
