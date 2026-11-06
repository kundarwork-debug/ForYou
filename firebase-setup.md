# ForYou custom letters — Firebase setup

The custom-letter creator uses the existing Firebase project `foryou-b3e03`.

## One-time Firebase Console setup

1. Open [Firebase Console](https://console.firebase.google.com/) and select **foryou-b3e03**.
2. Open **Authentication → Sign-in method** and enable **Anonymous** sign-in. The creator uses an anonymous account so each letter can be written without asking the sender to register.
3. Open **Firestore Database**. If the database is not already created, create it in production mode.
4. In Firestore **Rules**, publish the contents of `firestore.rules` from this repository.
5. Open **Storage** and complete the one-time bucket setup if it has not already been enabled.
6. In Storage **Rules**, publish the contents of `storage.rules` from this repository.

## How sharing works

- The sender's letter text, sections and photo download URLs are saved in Firestore under `letters/{letterId}`.
- Uploaded photos are stored in Cloud Storage under `letters/{anonymousUserId}/{letterId}/`.
- The shared URL contains only the document ID: `custom-letter.html?id=...`.
- Anyone with that link can read that one letter. Listing all letters is blocked.
- Only the anonymous account that created a letter can update or delete its Firestore document or uploaded photos.
- Photos are limited in the creator UI to 4 images, 5 MB each. Storage rules also enforce the 5 MB image limit.

## Important

The Firestore and Storage rules intentionally make shared letter reads public to anyone who has the link. Do not put passwords, private contact details or other sensitive information in a letter. Firebase's generated download URLs are bearer links; anyone who obtains one can view that image.

The rules files are provided for manual publishing in Firebase Console. They are not automatically deployed by GitHub Pages or Vercel.
