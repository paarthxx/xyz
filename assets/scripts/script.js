document.addEventListener("DOMContentLoaded", () => {
  const navElement = document.getElementById("nav");
  const contentElement = document.getElementById("content");
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
});
