document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const basePath = currentPath.includes("/cards/") ? "../" : "";

  // Shared editorial-style site header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <a href="${basePath}" class="brand-logo" aria-label="For You home">
            <img class="brand-mark" src="${basePath}logo.svg" alt="">
            <span class="brand-wordmark">For You<small>DIGITAL LETTER STUDIO</small></span>
          </a>
          <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-menu">
            <span></span><span></span><span></span>
          </button>
          <nav class="site-menu" id="site-menu" aria-label="Main menu" hidden>
            <a href="${basePath}">Home</a>
            <a href="${basePath}index.html#occasions">Occasions</a>
            <a href="${basePath}index.html#designs">Designs</a>
            <a href="${basePath}index.html#how-it-works">How it works</a>
            <a class="menu-create-link" href="${basePath}cards/diwali-wishes.html">Create a Card <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
    `;

  }


  // Accessible hamburger menu shared across all pages.
  const menuToggle = headerContainer && headerContainer.querySelector(".menu-toggle");
  const siteMenu = headerContainer && headerContainer.querySelector(".site-menu");
  if (menuToggle && siteMenu) {
    const closeMenu = () => {
      siteMenu.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    };
    menuToggle.addEventListener("click", () => {
      const opening = siteMenu.hidden;
      siteMenu.hidden = !opening;
      menuToggle.setAttribute("aria-expanded", String(opening));
      menuToggle.setAttribute("aria-label", opening ? "Close menu" : "Open menu");
    });
    siteMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("click", event => {
      if (!siteMenu.hidden && !siteMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Shared footer focused on writing and creative expression
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-main">
            <a href="${basePath}" class="footer-brand" aria-label="For You home">
              <img class="footer-brand-mark" src="${basePath}logo.svg" alt="">
              <span>For You</span>
            </a>
            <p class="footer-tagline">Thoughtful digital letters, made personal.<br>Choose a design, add your words and photos, then share.</p>
          </div>

          <div class="footer-column">
            <h2>Explore</h2>
            <a href="${basePath}">Letter designs</a>
            <a href="${basePath}index.html#designs">Greeting cards</a>
            <a href="${basePath}cards/diwali-wishes.html">Diwali greeting</a>
            <a href="${basePath}about-developer.html">About the Developer</a>
          </div>

          <div class="footer-note">
            <span class="footer-note-mark" aria-hidden="true">Aa</span>
            <p>Your words.<br>Your photos. Your story.</p>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} For You. Digital letters, thoughtfully designed.</span>
          <span class="footer-bottom-note">Made to be written and shared.</span>
        </div>
      </footer>
    `;
  }

  // Shared For You mascot with a gentle greeting and rotating messages.
  if (!document.querySelector(".for-you-mascot")) {
    const mascot = document.createElement("aside");
    mascot.className = "for-you-mascot";
    mascot.setAttribute("aria-label", "For You mascot");
    mascot.innerHTML = `
      <div class="for-you-mascot__message" role="status" aria-live="polite">
        <strong>Hi, welcome!</strong>
        A little note can make someone's day. Have a look around.
      </div>
      <button class="for-you-mascot__button" type="button" aria-label="Show another greeting">
        <span class="for-you-mascot__paper" aria-hidden="true">
          <span class="for-you-mascot__eyes"><i></i><i></i></span>
          <span class="for-you-mascot__smile"></span>
        </span>
      </button>
    `;
    document.body.appendChild(mascot);
    const message = mascot.querySelector(".for-you-mascot__message");
    const greetings = [
      ["A little hello!", "Take your time and find a design that feels just right."],
      ["Words matter.", "Create something thoughtful for someone special."],
      ["Glad you're here!", "Your next little note could become a lovely memory."]
    ];
    let greetingIndex = 0;
    mascot.querySelector("button").addEventListener("click", () => {
      greetingIndex = (greetingIndex + 1) % greetings.length;
      message.innerHTML = `<strong>${greetings[greetingIndex][0]}</strong>${greetings[greetingIndex][1]}`;
    });
  }

  // Hide the floating mascot while the footer is on screen (same footer-aware behavior as APML).
  const siteFooter = document.querySelector(".site-footer");
  const siteMascot = document.querySelector(".for-you-mascot");
  if (siteFooter && siteMascot && "IntersectionObserver" in window) {
    const footerObserver = new IntersectionObserver(([entry]) => {
      siteMascot.classList.toggle("is-footer-visible", entry.isIntersecting);
    }, { threshold: 0.01 });
    footerObserver.observe(siteFooter);
  }

});