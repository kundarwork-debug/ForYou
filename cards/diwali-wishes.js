const recipientInput = document.getElementById("recipient");
const messageInput = document.getElementById("message");
const senderInput = document.getElementById("sender");
const previewRecipient = document.getElementById("preview-recipient");
const previewMessage = document.getElementById("preview-message");
const previewSender = document.getElementById("preview-sender");
const photoInput = document.getElementById("photo");
const photoFrame = document.getElementById("photo-frame");
const previewPhoto = document.getElementById("preview-photo");
const shareButton = document.getElementById("share-button");
const shareStatus = document.getElementById("share-status");
const shareResult = document.getElementById("share-result");
const shareQr = document.getElementById("share-qr");
const shareShortUrl = document.getElementById("share-short-url");
const copyShortLinkButton = document.getElementById("copy-short-link");
const shareShortLinkButton = document.getElementById("share-short-link");
const greetingCard = document.getElementById("greeting-card");
const revealScreen = document.getElementById("reveal-screen");
const openCardButton = document.getElementById("open-card");

const defaultMessage = messageInput.value;
let currentShortUrl = "";

function updatePreview() {
  previewRecipient.textContent = recipientInput.value.trim() || "To someone special";
  previewMessage.textContent = messageInput.value.trim() || defaultMessage;
  previewSender.textContent = senderInput.value.trim() || "Your name";
}

[recipientInput, messageInput, senderInput].forEach((field) => {
  field.addEventListener("input", () => {
    updatePreview();
    shareResult.hidden = true;
    currentShortUrl = "";
  });
});

photoInput.addEventListener("change", () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) {
    photoFrame.hidden = true;
    previewPhoto.removeAttribute("src");
    return;
  }
  if (!file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = () => {
    previewPhoto.src = reader.result;
    photoFrame.hidden = false;
  };
  reader.readAsDataURL(file);
});

function buildGreetingUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("to", recipientInput.value.trim());
  url.searchParams.set("message", messageInput.value.trim() || defaultMessage);
  url.searchParams.set("from", senderInput.value.trim());
  return url.toString();
}

function loadSharedCard() {
  const params = new URLSearchParams(window.location.search);
  const isSharedCard = params.has("to") || params.has("message") || params.has("from");
  if (!isSharedCard) return false;
  recipientInput.value = params.get("to") || "";
  messageInput.value = params.get("message") || defaultMessage;
  senderInput.value = params.get("from") || "";
  updatePreview();
  document.body.classList.add("recipient-view");
  revealScreen.hidden = false;
  document.title = "A Diwali Wish for You — For You";
  return true;
}

openCardButton.addEventListener("click", () => {
  greetingCard.classList.add("is-opening");
  window.setTimeout(() => {
    revealScreen.hidden = true;
    greetingCard.classList.remove("is-opening");
  }, 900);
});

async function createShortLink(longUrl) {
  const endpoint = "https://is.gd/create.php?format=simple&url=" + encodeURIComponent(longUrl);
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("The short-link service is unavailable.");
  const shortUrl = (await response.text()).trim();
  if (!/^https?:\/\/(is\.gd|v\.gd)\//i.test(shortUrl)) {
    throw new Error(shortUrl || "Could not create a short link.");
  }
  return shortUrl;
}

shareButton.addEventListener("click", async () => {
  shareButton.disabled = true;
  shareButton.textContent = "Creating your QR code…";
  shareStatus.textContent = "";
  shareResult.hidden = true;

  try {
    currentShortUrl = await createShortLink(buildGreetingUrl());
    shareShortUrl.href = currentShortUrl;
    shareShortUrl.textContent = currentShortUrl;
    shareQr.src = "https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&data=" + encodeURIComponent(currentShortUrl);
    shareQr.hidden = false;
    shareResult.hidden = false;
    shareStatus.textContent = "Your QR code and short link are ready.";
  } catch (error) {
    shareStatus.textContent = "Could not create a short link right now. Please try again.";
    console.error("Short-link creation failed:", error);
  } finally {
    shareButton.disabled = false;
    shareButton.innerHTML = 'Create QR & short link <span>↗</span>';
  }
});

copyShortLinkButton.addEventListener("click", async () => {
  if (!currentShortUrl) return;
  try {
    await navigator.clipboard.writeText(currentShortUrl);
    copyShortLinkButton.textContent = "Copied ✓";
  } catch {
    shareShortUrl.focus();
    shareStatus.textContent = "Select the short link above and copy it.";
  }
});

shareShortLinkButton.addEventListener("click", async () => {
  if (!currentShortUrl) return;
  if (navigator.share) {
    try {
      await navigator.share({
        title: "A Diwali wish for you",
        text: "Scan the QR code or open this personal Diwali greeting:",
        url: currentShortUrl
      });
    } catch (error) {
      if (error.name !== "AbortError") shareStatus.textContent = "You can copy the short link to share it.";
    }
  } else {
    try {
      await navigator.clipboard.writeText(currentShortUrl);
      shareStatus.textContent = "Short link copied. Send it to someone special.";
    } catch {
      shareStatus.textContent = "Copy the short link shown above to share it.";
    }
  }
});

loadSharedCard();
updatePreview();
