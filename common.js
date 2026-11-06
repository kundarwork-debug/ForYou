document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const basePath = currentPath.includes("/cards/") ? "../" : "./";

  // Give simple ready-made cards a proper long-scroll recipient experience too.
  if (currentPath.includes('/cards/') && document.body.classList.contains('recipient-view') && !document.querySelector('.recipient-story, .story-section, .ready-made-story')) {
    const slug = currentPath.split('/').pop().replace(/\.html?$/i, '').toLowerCase();
    const stories = {
      diwali: {title:'A little more light for you',items:[['A little light goes a long way','May every small light remind you that hope can begin in the simplest places. May your days feel brighter, your heart feel lighter and your home be filled with warmth.'],['Room for new beginnings','May the year ahead bring fresh possibilities, kind people and the courage to welcome every good thing coming your way.'],['A home full of warmth','Wishing you laughter around the table, peace in your heart and moments with the people who make life feel like home.']]},
      holi: {title:'A little more colour for your day',items:[['A little more colour','May life surprise you with bright moments, unexpected happiness and reasons to smile even on ordinary days.'],['Joy in the little moments','May laughter find its way into your conversations, your plans and all the small things that make a day memorable.'],['Together is the best colour','Here is to kind hearts, good company and memories that stay colourful long after the celebrations are over.']]},
      rakhi: {title:'A bond worth celebrating',items:[['A bond beyond the thread','Some connections are made of shared laughter, familiar silences and a thousand little acts of care. May yours always stay strong.'],['Memories that stay','From silly arguments to the moments that matter, may every memory remind you how special this bond is.'],['Always in each other’s corner','No matter where life takes you, may you always find comfort in knowing someone is cheering you on.']]},
      default: {title:'A few more words for you',items:[['The little things matter','May you find happiness in ordinary moments, comfort in familiar places and kindness in unexpected corners.'],['Keep this close','You deserve to feel appreciated, supported and remembered. May this little note bring a smile whenever you need one.'],['Here’s to what comes next','May the days ahead bring new reasons to celebrate, good memories to keep and plenty of moments worth sharing.']] }
    };
    let theme = stories.default;
    if (slug.includes('diwali')) theme = stories.diwali;
    else if (slug.includes('holi')) theme = stories.holi;
    else if (slug.includes('rakhi')) theme = stories.rakhi;
    else if (slug.includes('raksha-bandhan')) theme = stories.rakhi;
    const host = document.querySelector('main .preview, main .greeting, main .card-frame');
    if (host) {
      const story = document.createElement('div'); story.className = 'ready-made-story';
      const heading = document.createElement('h2'); heading.textContent = theme.title; story.append(heading);
      theme.items.forEach((item,index) => { const section = document.createElement('section'); section.className = 'ready-made-story__section'; const number = document.createElement('span'); number.textContent = '0' + (index + 1); const title = document.createElement('h3'); title.textContent = item[0]; const copy = document.createElement('p'); copy.textContent = item[1]; section.append(number,title,copy); story.append(section); });
      const signoff = document.createElement('p'); signoff.className = 'ready-made-story__signoff'; signoff.textContent = 'A little note, made with care · For You'; story.append(signoff); host.insertAdjacentElement('afterend', story);
    }
  }

  // Offer two distinct ways to create a greeting on every card page.
  if (currentPath.includes('/cards/') && !document.body.classList.contains('recipient-view')) {
    const intro = document.querySelector('main .intro, main header.intro');
    const editor = document.querySelector('main .editor, main form');
    if (intro && editor && !document.querySelector('.experience-choice')) {
      const title = (intro.querySelector('h1') || document.querySelector('title')).textContent.replace(/\s+/g, ' ').trim();
      const slug = currentPath.split('/').pop().replace(/\.html?$/i, '');
      const panel = document.createElement('section');
      panel.className = 'experience-choice';
      panel.innerHTML = '<div class="experience-choice__intro"><span>MAKE IT YOURS</span><h2>How would you like to create it?</h2><p>Choose a ready-made design or create a personal letter with your own memories and photos.</p></div><div class="experience-choice__actions"><button type="button" class="experience-choice__button is-ready"><span class="choice-icon">✧</span><span><strong>Ready-made experience</strong><small>Use this design and your message</small></span><b>↘</b></button><button type="button" class="experience-choice__button is-custom"><span class="choice-icon">Aa</span><span><strong>Custom experience</strong><small>Add memories, dates, photos and more</small></span><b>↗</b></button></div>';
      intro.insertAdjacentElement('afterend', panel);
      panel.querySelector('.is-ready').addEventListener('click', () => editor.scrollIntoView({behavior:'smooth', block:'center'}));
      panel.querySelector('.is-custom').addEventListener('click', () => {
        const params = new URLSearchParams({occasion:slug, title:title});
        const recipient = document.querySelector('#recipient, #to, [name="recipient"]');
        const message = document.querySelector('#message, #msg, [name="message"]');
        const sender = document.querySelector('#sender, #from, [name="sender"]');
        if (recipient && recipient.value.trim()) params.set('to', recipient.value.trim());
        if (message && message.value.trim()) params.set('message', message.value.trim());
        if (sender && sender.value.trim()) params.set('from', sender.value.trim());
        window.location.href = basePath + 'custom-letter.html?' + params.toString();
      });
    }
  }

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