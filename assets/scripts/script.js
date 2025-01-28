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
  function copyToClipboard(event, element, text) {
    // Prevent the default action (e.g., jumping to the top of the page)
    if (event) {
      event.preventDefault();
    }

    // Copy the text to clipboard
    navigator.clipboard.writeText(text).then(() => {
      // Update the link text to 'copied'
      element.textContent = 'copied';

      // Revert the text back after 5 seconds
      setTimeout(() => {
        if (element.id === 'ethereum') {
          element.textContent = 'ethereum';
        } else if (element.id === 'solana') {
          element.textContent = 'solana';
        }
      }, 5000);
    }).catch(err => {
      console.error('Failed to copy text:', err);
      alert('Failed to copy text. Please try again.');
    });
    };
 });
