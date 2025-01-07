document.addEventListener("DOMContentLoaded", async () => {
  const navElement = document.getElementById("nav");
  const contentElement = document.getElementById("content");
  const defaultPage = "index.md";
  const currentPage = window.location.hash.substring(1) || defaultPage;

  // Load navigation
  try {
    const navResponse = await fetch("config/navigation.json");
    const navigation = await navResponse.json();

    // Filter out the current page from the navigation
    const filteredNav = navigation.filter((link) => link.file !== currentPage);

    // Build the navigation bar
    navElement.innerHTML = filteredNav
      .map((link) => `<a href="#${link.file}" onclick="loadPage('${link.file}')">${link.name}</a>`)
      .join(" ");
  } catch (error) {
    console.error("Failed to load navigation:", error);
    navElement.innerHTML = "<p>Navigation could not be loaded.</p>";
  }

  // Load initial page content
  loadPage(currentPage);
});

// Define loadPage as a global function
async function loadPage(file) {
  const contentElement = document.getElementById("content");
  try {
    const response = await fetch(`content/${file}`);
    if (!response.ok) throw new Error("Page not found");
    const text = await response.text();
    contentElement.innerHTML = marked.parse(text); // Convert Markdown to HTML
    history.pushState({}, "", `#${file}`);
  } catch (error) {
    console.error("Failed to load page:", error);
    contentElement.innerHTML = "<h1>404 - Page not found</h1>";
  }
}
