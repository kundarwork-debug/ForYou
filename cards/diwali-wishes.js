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
const greetingCard = document.getElementById("greeting-card");
const revealScreen = document.getElementById("reveal-screen");
const openCardButton = document.getElementById("open-card");

const defaultMessage = messageInput.value;

function updatePreview() {
  previewRecipient.textContent = recipientInput.value.trim() || "To someone special";
  previewMessage.textContent = messageInput.value.trim() || defaultMessage;
  previewSender.textContent = senderInput.value.trim() || "Your name";
}

[recipientInput, messageInput, senderInput].forEach((field) => {
  field.addEventListener("input", updatePreview);
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

shareButton.addEventListener("click", async () => {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("to", recipientInput.value.trim());
  url.searchParams.set("message", messageInput.value.trim() || defaultMessage);
  url.searchParams.set("from", senderInput.value.trim());
  const shareUrl = url.toString();

  try {
    if (navigator.share) {
      await navigator.share({ title: "A Diwali wish for you", text: "A little festive greeting, made personal.", url: shareUrl });
      shareStatus.textContent = "Your share options are ready.";
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
      shareStatus.textContent = "Share link copied. Send it to someone special.";
    } else {
      await navigator.clipboard.writeText(shareUrl);
      shareStatus.textContent = "Share link copied. Send it to someone special.";
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      window.history.replaceState({}, "", shareUrl);
      shareStatus.textContent = "Your personal link is ready in the address bar. Copy it to share.";
    }
  }
});

loadSharedCard();
updatePreview();