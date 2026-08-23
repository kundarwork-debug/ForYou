document.addEventListener("DOMContentLoaded", () => {
  // Inject Header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <a href="index.html" class="brand-logo">
            <span class="dot"></span>
            <span>VibeNotes</span>
          </a>
          <nav class="nav-links">
            <a href="index.html" class="nav-link active">Home</a>
            <a href="free1.html" class="nav-link">Love Letter</a>
          </nav>
          <div class="nav-badge">Workspace</div>
        </div>
      </header>
    `;
  }

  // Inject Footer
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-left">
            © 2026 VibeNotes. All rights reserved.
          </div>
          <div class="footer-right">
            <a href="index.html" class="footer-link">Home</a>
            <a href="free1.html" class="footer-link">Love Letter</a>
            <a href="#" class="footer-link">Privacy Policy</a>
          </div>
        </div>
      </footer>
    `;
  }
});
