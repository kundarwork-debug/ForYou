document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  // Shared site header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <a href="index.html" class="brand-logo" aria-label="For You home">
            <span class="brand-mark" aria-hidden="true">♡</span>
            <span class="brand-wordmark">For <span class="highlight">You</span><small>MAKE IT MEANINGFUL</small></span>
          </a>

          <nav class="nav-links" aria-label="Main navigation">
            <a href="index.html" class="nav-link" data-page="home">Home</a>
            <a href="free1.html" class="nav-link" data-page="letter">Love Letter</a>
            <a href="page1.html" class="nav-link" data-page="rakhi">Rakhi</a>
          </nav>

          <a class="header-cta" href="free1.html">
            Create a card <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
    `;

    const links = headerContainer.querySelectorAll(".nav-link");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      const isHome = href === "index.html" &&
        (currentPath === "/" || currentPath.endsWith("/index.html") || currentPath.endsWith("/"));
      if (isHome || (href !== "index.html" && currentPath.endsWith(href))) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  // Shared site footer
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-main">
            <a href="index.html" class="footer-brand" aria-label="For You home">
              <span class="footer-brand-mark" aria-hidden="true">♡</span>
              <span>For <span>You</span></span>
            </a>
            <p class="footer-tagline">A little thought can mean the world.<br>Make someone feel special, wherever they are.</p>
          </div>

          <div class="footer-column">
            <h2>Explore</h2>
            <a href="index.html">All cards</a>
            <a href="free1.html">Love Letter</a>
            <a href="page1.html">Rakhi greeting</a>
          </div>

          <div class="footer-note">
            <span class="footer-note-heart" aria-hidden="true">♥</span>
            <p>Made for the moments<br>that matter.</p>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} For You. Made with care.</span>
          <span class="footer-bottom-note">Send a little love today <span aria-hidden="true">♡</span></span>
        </div>
      </footer>
    `;
  }
});
