/**
 * Listings API – create and fetch seller listings.
 * Uses VITE_SCAN_API_URL and auth token from auth.js.
 */

import { getAuthToken } from "../utils/auth";

function getApiBaseUrl() {
  return typeof import.meta !== "undefined" && import.meta.env?.VITE_SCAN_API_URL
    ? String(import.meta.env.VITE_SCAN_API_URL).replace(/\/$/, "")
    : "";
}

function authHeaders() {
  const token = getAuthToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

/**
 * Fetch current user's listings.
 * @returns {Promise<Array<object>>} List of listings (or backend may return { listings: [] })
 * @throws {Error} on auth or server error
 */
export async function getListings() {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }

  const url = `${base}/api/v1/listings`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const msg = data.message || data.error || (details[0]?.message) || `Failed to load listings (${res.status})`;
    const err = new Error(msg);
    err.details = details;
    throw err;
  }

  return Array.isArray(data) ? data : (data.listings || []);
}

/**
 * Create a new listing.
 * POST /api/v1/listings
 * @param {object} payload - { title, materialType, quantity, unit, price, priceUnit?, notes?, image?, allowNegotiation? }
 * @returns {Promise<{ listing: object, message?: string }>}
 * @throws {Error} with .details for validation errors
 */
export async function createListing(payload) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }

  const url = `${base}/api/v1/listings`;
  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const firstMessage = details[0]?.message || data.message || data.error || `Create listing failed (${res.status})`;
    const msg = data.error && details.length > 0
      ? `${data.error}: ${details.map((d) => d.message).join("; ")}`
      : firstMessage;
    const err = new Error(msg);
    err.details = details;
    throw err;
  }

  return data;
}
