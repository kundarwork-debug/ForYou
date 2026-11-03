document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const basePath = currentPath.includes("/cards/") ? "../" : "./";

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
          <label class="hamburger" aria-label="Open menu">
            <input class="menu-toggle" type="checkbox" aria-label="Toggle navigation menu" aria-controls="site-menu" aria-expanded="false">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path class="line" d="M7 16 27 16"></path>
            </svg>
          </label>
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


  // Accessible animated hamburger menu shared across all pages.
  const menuToggle = headerContainer && headerContainer.querySelector(".menu-toggle");
  const siteMenu = headerContainer && headerContainer.querySelector(".site-menu");
  if (menuToggle && siteMenu) {
    const syncMenu = () => {
      siteMenu.hidden = !menuToggle.checked;
      menuToggle.setAttribute("aria-expanded", String(menuToggle.checked));
      menuToggle.setAttribute("aria-label", menuToggle.checked ? "Close menu" : "Open menu");
      menuToggle.parentElement.setAttribute("aria-label", menuToggle.checked ? "Close menu" : "Open menu");
    };
    const closeMenu = () => {
      menuToggle.checked = false;
      syncMenu();
    };
    menuToggle.addEventListener("change", syncMenu);
    siteMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("click", event => {
      if (!siteMenu.hidden && !siteMenu.contains(event.target) && !menuToggle.parentElement.contains(event.target)) closeMenu();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    syncMenu();
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
          ${currentPath === "/" || currentPath.endsWith("/ForYou/") || currentPath.endsWith("/ForYou/index.html") ? '<span class="footer-share-count" id="footer-share-count">✦ Shared with care · <strong>—</strong> times</span>' : ""}
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
    const isSharedLinkView = document.body.classList.contains("shared-link-view");
    const createUrl = window.location.origin + (window.location.pathname.includes("/cards/") ? window.location.pathname.split("/cards/")[0] + "/" : "/");
    if (isSharedLinkView) {
      message.remove();
      mascot.querySelector("button").setAttribute("aria-label", "Go to For You homepage");
      mascot.querySelector("button").setAttribute("title", "Go to For You homepage");
    }
    const greetings = [
      ["A little hello!", "Take your time and find a design that feels just right."],
      ["Words matter.", "Create something thoughtful for someone special."],
      ["Glad you're here!", "Your next little note could become a lovely memory."]
    ];
    let greetingIndex = 0;
    mascot.querySelector("button").addEventListener("click", () => {
      if (isSharedLinkView) {
        window.location.href = createUrl;
        return;
      }
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


  // Firebase Firestore share counter
  (async () => {
    try {
      const version = "10.14.1";
      const appSdk = await import("https://www.gstatic.com/firebasejs/" + version + "/firebase-app.js");
      const dbSdk = await import("https://www.gstatic.com/firebasejs/" + version + "/firebase-firestore.js");
      const firebaseConfig = {
        apiKey: "AIzaSyAljVm-tPfXC12BeRX2EMPW4MLarD4iJmY",
        authDomain: "foryou-b3e03.firebaseapp.com",
        projectId: "foryou-b3e03",
        storageBucket: "foryou-b3e03.firebasestorage.app",
        messagingSenderId: "440679421025",
        appId: "1:440679421025:web:381d94f237010653a18620",
        measurementId: "G-3KFW4GQ4CZ"
      };
      const app = appSdk.initializeApp(firebaseConfig, "for-you-share-counter");
      const db = dbSdk.getFirestore(app);
      const counterRef = dbSdk.doc(db, "siteStats", "shares");
      const countEl = document.getElementById("footer-share-count");
      if (countEl) {
        dbSdk.onSnapshot(counterRef, snapshot => {
          const total = snapshot.exists() ? Number(snapshot.data().total || 0) : 0;
          countEl.innerHTML = '✦ Shared with care · <strong>' + total.toLocaleString() + '</strong> times';
        }, error => console.warn("Share count unavailable:", error));
      }
      document.addEventListener("click", event => {
        const button = event.target.closest("button, a");
        if (!button) return;
        const label = ((button.id || "") + " " + (button.textContent || "") + " " + (button.getAttribute("aria-label") || "")).toLowerCase();
        if (!/(share-button|create share|create link|share link|copy link|share-short-link|copy-short-link)/.test(label)) return;
        dbSdk.setDoc(counterRef, { total: dbSdk.increment(1) }, { merge: true })
          .catch(error => console.warn("Could not record share:", error));
      });
    } catch (error) {
      console.warn("Firebase share counter could not start:", error);
    }
  })();





});