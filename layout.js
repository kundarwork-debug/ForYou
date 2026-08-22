document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Glow Spots
    const glow1 = document.createElement("div");
    glow1.className = "glow-spot glow-1";
    const glow2 = document.createElement("div");
    glow2.className = "glow-spot glow-2";
    document.body.prepend(glow2);
    document.body.prepend(glow1);

    // 2. Inject Common Header
    const headerElement = document.getElementById("app-header");
    if (headerElement) {
        headerElement.innerHTML = `
            <header class="site-header">
                <div class="header-container">
                    <a href="index.html" class="brand-logo">✨ VibeNotes</a>
                    <nav class="nav-links">
                        <a href="index.html" class="nav-link">Home</a>
                        <a href="free1.html" class="nav-link">Love Letter</a>
                    </nav>
                    <div class="nav-badge">Virtual Cards</div>
                </div>
            </header>
        `;
    }

    // 3. Inject Common Footer
    const footerElement = document.getElementById("app-footer");
    if (footerElement) {
        footerElement.innerHTML = `
            <footer class="site-footer">
                <div class="footer-container">
                    <div class="footer-left">
                        © 2026 VibeNotes. Crafted with ❤️ for special moments.
                    </div>
                    <div class="footer-right">
                        <a href="index.html" class="footer-link">Home</a>
                        <a href="free1.html" class="footer-link">Love Letter</a>
                        <a href="#" class="footer-link">Privacy</a>
                    </div>
                </div>
            </footer>
        `;
    }

    // 4. Floating Hearts Background Effect
    const emojis = ["❤️", "💖", "💕", "✨", "🌸"];
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "particle";
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (18 + Math.random() * 24) + "px";
        heart.style.animationDuration = (4 + Math.random() * 5) + "s";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 9000);
    }, 450);
});
