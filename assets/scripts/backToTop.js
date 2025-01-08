document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor click behavior

      // Smooth scroll to the top using requestAnimationFrame
      const scrollToTop = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if (currentScroll > 0) {
          // Reduce scroll position by a fixed amount (e.g., 20px)
          window.scrollTo(0, currentScroll - 20);

          // Continue animation
          requestAnimationFrame(scrollToTop);
        }
      };

      scrollToTop(); // Start the animation
    });
  }
});
