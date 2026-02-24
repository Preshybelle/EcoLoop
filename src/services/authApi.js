/**
 * Auth API – frontend client for register/login with backend.
 * Base URL from VITE_SCAN_API_URL (same backend as scan).
 */

function getApiBaseUrl() {
  return typeof import.meta !== "undefined" && import.meta.env?.VITE_SCAN_API_URL
    ? String(import.meta.env.VITE_SCAN_API_URL).replace(/\/$/, "")
    : "";
}

/**
 * Register a new user via backend.
 * Request body matches backend: name, email, password, confirmPassword, role, username, termsAccepted.
 * @param {{ name: string, email: string, password: string, confirmPassword: string, role: 'buyer'|'seller', username: string, termsAccepted: boolean }} payload
 * @returns {Promise<object>} API response
 * @throws {Error} on validation or server error
 */
export async function registerUser(payload) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }

  const url = `${base}/api/v1/auth/register`;
  const body = {
    name: (payload.name || "").trim(),
    email: (payload.email || "").trim().toLowerCase(),
    password: payload.password,
    confirmPassword: payload.confirmPassword,
    role: payload.role === "buyer" ? "buyer" : "seller",
    username: (payload.username || "").trim().toLowerCase().replace(/\s+/g, ""),
    termsAccepted: Boolean(payload.termsAccepted),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const firstMessage = details[0]?.message || data.message || data.error || `Registration failed (${res.status})`;
    const msg = data.error && details.length > 0 ? `${data.error}: ${details.map((d) => d.message).join("; ")}` : firstMessage;
    const err = new Error(msg);
    err.details = details;
    throw err;
  }

  return data;
}

/**
 * Login via backend.
 * @param {{ email: string, password: string }} payload
 * @returns {Promise<{ message: string, user: { id: string, name: string, email: string, role: string, username: string, createdAt?: string, updatedAt?: string }, token: string }>}
 * @throws {Error} with .details for validation errors
 */
export async function loginUser(payload) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }

  const url = `${base}/api/v1/auth/login`;
  const body = {
    email: (payload.email || "").trim().toLowerCase(),
    password: payload.password,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const firstMessage = details[0]?.message || data.message || data.error || `Login failed (${res.status})`;
    const msg = data.error && details.length > 0 ? `${data.error}: ${details.map((d) => d.message).join("; ")}` : firstMessage;
    const err = new Error(msg);
    err.details = details;
    throw err;
  }

  return data;
}
