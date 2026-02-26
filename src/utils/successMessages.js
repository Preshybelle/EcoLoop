/**
 * User-friendly success messages for 200/201 responses and completed actions.
 * Use these in toasts, banners, or confirmation screens so users get clear, positive feedback.
 */

/** Generic success (e.g. when no specific message fits) */
export const SUCCESS_GENERIC =
  "Done! If you don't see your changes yet, try refreshing the page.";

/** After successful login */
export const LOGIN_SUCCESS =
  "You're in! Taking you to your dashboard.";

/** After successful registration */
export const REGISTER_SUCCESS =
  "Your account is ready. Sign in with your email and password to get started.";

/** After publishing a listing */
export const LISTING_PUBLISHED =
  "Your listing is live. Buyers can now see and contact you about it.";

/** After saving a draft */
export const DRAFT_SAVED =
  "Draft saved. You can come back later to finish and publish.";

/** After updating profile/account settings */
export const PROFILE_UPDATED =
  "Your profile has been updated. Changes are saved.";

/** After updating a listing (e.g. status) */
export const LISTING_UPDATED =
  "Listing updated. Your changes are now visible.";

/** After a transaction is created or updated */
export const TRANSACTION_SUCCESS =
  "Transaction recorded. You can track it from your dashboard.";

/**
 * Get a friendly success message for a given context (e.g. after an API 200/201).
 * @param {string} context - One of: "login" | "register" | "listingPublished" | "draftSaved" | "profileUpdated" | "listingUpdated" | "transaction" | "generic"
 * @returns {string} Message to show to the user
 */
export function getSuccessMessage(context = "generic") {
  const map = {
    login: LOGIN_SUCCESS,
    register: REGISTER_SUCCESS,
    listingPublished: LISTING_PUBLISHED,
    draftSaved: DRAFT_SAVED,
    profileUpdated: PROFILE_UPDATED,
    listingUpdated: LISTING_UPDATED,
    transaction: TRANSACTION_SUCCESS,
    generic: SUCCESS_GENERIC,
  };
  return map[context] || SUCCESS_GENERIC;
}
