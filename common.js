document.addEventListener("DOMContentLoaded", () => {
  // Inject Header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <a href="index.html" class="brand-logo">
            <img src="logo.svg" alt="For You Logo" />
            <span>For <span class="highlight">You</span></span>
          </a>
          <nav class="nav-links">
            <a href="index.html" class="nav-link">Home</a>
            <a href="free1.html" class="nav-link">Love Letter</a>
            <a href="page1.html" class="nav-link">Rakhi</a>
          </nav>
        </div>
      </header>
    `;

    // Active page highlighting
    const currentPath = window.location.pathname;
    const links = headerContainer.querySelectorAll(".nav-link");
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href && (currentPath.endsWith(href) || (href === "index.html" && (currentPath === "/" || currentPath.endsWith("/"))))) {
        link.classList.add("active");
      }
    });
  }

  // Inject Footer
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-left">
            © 2026 For You. Crafted for meaningful moments.
          </div>
          <div class="footer-right">
            <a href="index.html" class="footer-link">Home</a>
            <a href="free1.html" class="footer-link">Love Letter</a>
            <a href="page1.html" class="footer-link">Rakhi</a>
          </div>
        </div>
      </footer>
    `;
  }
});
