document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Header Component
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    fetch("header.html")
      .then(res => res.text())
      .then(html => headerContainer.innerHTML = html)
      .catch(() => {
        // Fallback inline header if running without local web server
        headerContainer.innerHTML = `
          <header class="site-header">
            <div class="header-container">
              <a href="index.html" class="brand-logo"><span class="material-symbols-outlined" style="color: #ff3377;">favorite</span> VibeNotes</a>
              <nav class="nav-links">
                <a href="index.html" class="nav-link">Home</a>
                <a href="free1.html" class="nav-link">Love Letter</a>
              </nav>
              <div class="nav-badge">Virtual Cards</div>
            </div>
          </header>
        `;
      });
  }

  // 2. Inject Footer Component
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => footerContainer.innerHTML = html)
      .catch(() => {
        // Fallback inline footer if running without local web server
        footerContainer.innerHTML = `
          <footer class="site-footer">
            <div class="footer-container">
              <div class="footer-left">© 2026 VibeNotes. Handcrafted with ❤️</div>
              <div class="footer-right"><a href="index.html" class="footer-link">Home</a><a href="free1.html" class="footer-link">Love Letter</a></div>
            </div>
          </footer>
        `;
      });
  }

  // 3. Floating Particle Physics
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

  // 4. Matrix Scroll Controller
  const plane = document.getElementById('matrixPlane');
  if (plane) {
    window.addEventListener('scroll', () => {
      const shiftY = (window.scrollY * 0.25) % 60;
      plane.style.transform = `rotateX(45deg) translateY(${shiftY}px) scale(1.1)`;
    }, { passive: true });
  }
});
