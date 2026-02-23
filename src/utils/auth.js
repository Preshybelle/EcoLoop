/**
 * Client-side auth storage helpers.
 * Users are stored in localStorage keyed by normalized email (lowercase).
 * Passwords are stored as bcrypt hashes only (hashing is done in Register/Login).
 */

const STORAGE_KEY = "ecoloop_users";

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStoredUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/** Normalize email for storage and lookup (lowercase). */
export function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

/**
 * Store a registered user. Overwrites existing entry for the same email.
 * @param {string} email
 * @param {{ passwordHash: string, fullName: string, userType: 'buyer'|'seller' }} user
 */
export function storeUser(email, user) {
  const key = normalizeEmail(email);
  if (!key) return;
  const users = getStoredUsers();
  users[key] = {
    passwordHash: user.passwordHash,
    fullName: (user.fullName || "").trim(),
    userType: user.userType === "buyer" ? "buyer" : "seller",
  };
  setStoredUsers(users);
}

/**
 * Get stored user by email, or null if not found.
 * @param {string} email
 * @returns {{ passwordHash: string, fullName: string, userType: 'buyer'|'seller' } | null}
 */
export function getStoredUser(email) {
  const key = normalizeEmail(email);
  if (!key) return null;
  const users = getStoredUsers();
  return users[key] || null;
}
