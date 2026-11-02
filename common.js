document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  // Shared editorial-style site header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <a href="index.html" class="brand-logo" aria-label="For You home">
            <span class="brand-mark" aria-hidden="true">F.</span>
            <span class="brand-wordmark">For You<small>DIGITAL LETTER STUDIO</small></span>
          </a>


        </div>
      </header>
    `;

  }

  // Shared footer focused on writing and creative expression
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-main">
            <a href="index.html" class="footer-brand" aria-label="For You home">
              <span class="footer-brand-mark" aria-hidden="true">F.</span>
              <span>For You</span>
            </a>
            <p class="footer-tagline">Thoughtful digital letters, made personal.<br>Choose a design, add your words and photos, then share.</p>
          </div>

          <div class="footer-column">
            <h2>Explore</h2>
            <a href="index.html">Letter designs</a>
            <a href="free1.html">Personal letter</a>
            <a href="page1.html">Festival letter</a>
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

});