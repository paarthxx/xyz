document.addEventListener("DOMContentLoaded", () => {
  const navElement = document.getElementById("nav");
  const contentElement = document.getElementById("content");
  const footerContainer = document.getElementById("footer-container");
  const defaultPage = "index.md";

  // Function to load navigation and exclude the current page
  const loadNavigation = async (currentPage) => {
    try {
      const navResponse = await fetch("config/navigation.json");
      const navigation = await navResponse.json();

      // Filter out the current page from the navigation
      const filteredNav = navigation.filter((link) => link.file !== currentPage);

      // Build the navigation bar
      navElement.innerHTML = filteredNav
        .map((link) => `<a href="#${link.file}" data-file="${link.file}">${link.name}</a>`)
        .join(" ");
    } catch (error) {
      console.error("Failed to load navigation:", error);
      navElement.innerHTML = "<p>Navigation could not be loaded.</p>";
    }
  };

  // Function to load footer content
  const loadFooter = async () => {
    try {
      const response = await fetch("content/footer.html");
      if (!response.ok) throw new Error("Footer not found");
      const footerHtml = await response.text();
      footerContainer.innerHTML = footerHtml;
  
      // Dynamically set the last updated date
      const lastUpdatedElement = document.getElementById("last-updated");
      if (lastUpdatedElement) {
        const lastModified = new Date(document.lastModified); // Get the last modified date of the current document
        const formattedDate = lastModified
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
          .toString(); // Ensure the result is treated as a string
        lastUpdatedElement.textContent = formattedDate.toLowerCase(); // Convert to lowercase
      }
    } catch (error) {
      console.error("Failed to load footer:", error);
      footerContainer.innerHTML = "<p>Footer could not be loaded.</p>";
    }
  };
  

  // Function to load page content
  const loadPage = async (file) => {
    try {
      const response = await fetch(`content/${file}`);
      if (!response.ok) throw new Error("Page not found");
      const text = await response.text();
      contentElement.innerHTML = marked.parse(text); // Convert Markdown to HTML
      history.pushState({}, "", `#${file}`);
      loadNavigation(file); // Update navigation after loading the page
    } catch (error) {
      console.error("Failed to load page:", error);
      contentElement.innerHTML = "<h1>404 - Page not found</h1>";
    }
  };

  // Initial page load
  const initialPage = window.location.hash.substring(1) || defaultPage;
  loadPage(initialPage);
  loadFooter(); // Load the footer once on page load

  // Event delegation for navigation links
  navElement.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A" && target.hasAttribute("data-file")) {
      event.preventDefault();
      const file = target.getAttribute("data-file");
      loadPage(file);
    }
  });

  // Handle browser navigation (back/forward)
  window.addEventListener("popstate", () => {
    const currentPage = window.location.hash.substring(1) || defaultPage;
    loadPage(currentPage);
  });

  // Function to copy to clipboard
  function copyToClipboard(element, text) {
    // Copy the text to clipboard
    navigator.clipboard.writeText(text).then(() => {
    
          
          // Update the link text
          element.textContent = 'copied';

          // Revert to original text after 5 seconds
          setTimeout(() => {
            if (text === '0x3919599C6c6C30487F8c4e162F32e450751D43bF') {
              element.textContent = 'ethereum';
            } else if (text === '657aqFk7BWv4EyQvivrbwB9iA8msNir9zCfjb9EN4YS9') {
              element.textContent = 'solana';
            }
          }, 5000);
      })
            .catch(err => {
                alert("Failed to copy text: " + err);
            });
    };
 });



<script>
  function copyToClipboard(element, text) {
    // Copy the text to clipboard
    navigator.clipboard.writeText(text).then(() => {
      // Change the text of the clicked link to 'copied'
      element.textContent = 'copied';
      
      // Optional: Reset the text back to original after a delay
      setTimeout(() => {
        if (text === '111') {
          element.textContent = 'ethereum';
        } else if (text === '999') {
          element.textContent = 'solana';
        }
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
</script>
