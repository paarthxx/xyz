      let backToTopBtn = document.getElementById("backToTopBtn");
    
      backToTopBtn.addEventListener("click", function(e) {
        e.preventDefault();
        scrollToTop(888); // 1500 milliseconds = 1.5 seconds
      });
    
      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }
    
      function scrollToTop(duration) {
        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    
        function scroll() {
          const now = 'now' in window.performance ? performance.now() : new Date().getTime();
          const time = Math.min(1, ((now - startTime) / duration));
          
          window.scrollTo(0, Math.ceil(start * (1 - easeInOutCubic(time))));
          
          if (time < 1) {
            requestAnimationFrame(scroll);
          }
        }
    
        requestAnimationFrame(scroll);
      }