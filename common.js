document.addEventListener("DOMContentLoaded", () => {
  // Inject Common Header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <a href="index.html" class="brand-logo">
            <span class="material-symbols-outlined" style="color: #ff3377; font-size: 22px;">favorite</span>
            <span>VibeNotes</span>
          </a>
          <nav class="nav-links">
            <a href="index.html" class="nav-link">Home</a>
            <a href="free1.html" class="nav-link">Love Letter</a>
          </nav>
          <div class="nav-badge">Virtual Cards Hub</div>
        </div>
      </header>
    `;

    // Highlight active link
    const currentPath = window.location.pathname;
    const links = headerContainer.querySelectorAll(".nav-link");
    links.forEach(link => {
      if (link.getAttribute("href") && currentPath.endsWith(link.getAttribute("href"))) {
        link.classList.add("active");
      }
    });
  }

  // Inject Common Footer
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-left">
            © 2026 VibeNotes Workspace. Designed & developed with ❤️ by Prasad.
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

  // Floating Particle Hearts
  const emojis = ["❤️", "💖", "💕", "✨", "🌸"];
  setInterval(() => {
    const p = document.createElement("div");
    p.className = "particle";
    p.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.fontSize = (18 + Math.random() * 24) + "px";
    p.style.animationDuration = (4 + Math.random() * 5) + "s";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 9000);
  }, 450);

  // Background Matrix Scroll Movement
  const plane = document.getElementById('matrixPlane');
  if (plane) {
    window.addEventListener('scroll', () => {
      const shiftY = (window.scrollY * 0.25) % 60;
      plane.style.transform = `rotateX(45deg) translateY(${shiftY}px) scale(1.1)`;
    }, { passive: true });
  }
});
