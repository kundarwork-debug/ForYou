(() => {
  "use strict";

  // Send at most one visit notification per browser every 30 minutes.
  // No names, email addresses, cookies, or persistent visitor IDs are collected.
  const STORAGE_KEY = "foryou_visit_notice_at";
  const COOLDOWN_MS = 30 * 60 * 1000;
  const API_URL = "https://foryou-bot-api.kundar-work.workers.dev/api/visit";

  function sendVisitNotice() {
    try {
      const now = Date.now();
      const previous = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (previous && now - previous < COOLDOWN_MS) return;
      localStorage.setItem(STORAGE_KEY, String(now));
    } catch {
      // If browser storage is unavailable, avoid repeated notifications in this tab.
      if (window.__foryouVisitNoticeSent) return;
      window.__foryouVisitNoticeSent = true;
    }

    const payload = {
      page: window.location.pathname,
      title: document.title.slice(0, 100),
      referrer: (() => {
        try {
          return document.referrer ? new URL(document.referrer).hostname : "";
        } catch {
          return "";
        }
      })(),
      visitedAt: new Date().toISOString()
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {
      // Visitor analytics must never interrupt the website experience.
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", sendVisitNotice, { once: true });
  } else {
    sendVisitNotice();
  }
})();
