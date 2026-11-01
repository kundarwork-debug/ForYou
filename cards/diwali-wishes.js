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
  document.title = "A Diwali Wish for You — For You";
  return true;
}

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
      shareStatus.textContent = "Copy this link from your browser's address bar after creating it.";
      window.history.replaceState({}, "", shareUrl);
    }
  } catch (error) {
    if (error.name !== "AbortError") shareStatus.textContent = "Couldn't open sharing. Please try copying the page link.";
  }
});

loadSharedCard();
updatePreview();