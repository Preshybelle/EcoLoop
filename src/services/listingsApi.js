/**
 * Listings API – create and fetch seller listings.
 * Uses VITE_SCAN_API_URL and auth token from auth.js.
 */

import { getAuthToken } from "../utils/auth";
import { getFriendlyMessage } from "../utils/errorMessages";
import { LISTING_UPDATED } from "../utils/successMessages";

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
 * Fetch current user's listings (my-listings).
 * GET /api/v1/listings/my-listings
 * 200: { listings: Array, count: number }
 * 401: { error: string, details?: [{ field, message }] }
 * @returns {Promise<{ listings: Array<object>, count: number }>}
 * @throws {Error} on 401 (unauthorized), 4xx/5xx; err.details set when present
 */
export async function getListings() {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }

  const url = `${base}/api/v1/listings/my-listings`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const raw = data.message || data.error || (details[0]?.message) || "";
    const msg = getFriendlyMessage(res.status, raw);
    const err = new Error(msg);
    err.details = details;
    err.status = res.status;
    throw err;
  }

  const list = Array.isArray(data.listings) ? data.listings : [];
  const count = typeof data.count === "number" ? data.count : list.length;
  return { listings: list, count };
}

/**
 * Get a single listing by ID.
 * GET /api/v1/listings/{id}
 * 200: { listing: { id, title, description, materialType, ... } }
 * 404: Listing not found (err.message, err.status === 404)
 * @param {string} id - Listing ID (UUID)
 * @returns {Promise<{ listing: object }>}
 * @throws {Error} on 404 (listing not found), 4xx/5xx; err.details, err.status set when present
 */
export async function getListingById(id) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }
  if (!id) {
    throw new Error("Listing ID is required");
  }

  const url = `${base}/api/v1/listings/${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const raw = data.message || data.error || (details[0]?.message) || "";
    const msg = getFriendlyMessage(res.status, raw, "listing");
    const err = new Error(msg);
    err.details = details;
    err.status = res.status;
    throw err;
  }

  return { listing: data.listing ?? data };
}

/**
 * Update listing status.
 * PATCH /api/v1/listings/{id}/status
 * Body: { status: "COMPLETED" | "ACTIVE" | "DRAFT" | ... }
 * 200: { message, listing }
 * 400: { error, details } validation error
 * 401: { error, details } Unauthorized
 * 403: { error, details } Forbidden (SELLER role required)
 * @param {string} id - Listing ID (UUID)
 * @param {string} status - New status (e.g. "COMPLETED", "ACTIVE", "DRAFT")
 * @returns {Promise<{ message: string, listing: object }>}
 * @throws {Error} on 400/401/403/4xx/5xx; err.details, err.status set when present
 */
export async function updateListingStatus(id, status) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }
  if (!id) {
    throw new Error("Listing ID is required");
  }

  const url = `${base}/api/v1/listings/${encodeURIComponent(id)}/status`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status: String(status ?? "").trim() }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const firstMessage = details[0]?.message || data.message || data.error || `Update status failed (${res.status})`;
    const msg = data.error && details.length > 0
      ? `${data.error}: ${details.map((d) => d.message).join("; ")}`
      : firstMessage;
    const err = new Error(msg);
    err.details = details;
    err.status = res.status;
    throw err;
  }

  return {
    message: data.message || LISTING_UPDATED,
    listing: data.listing ?? data,
  };
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

/**
 * Create a new listing (manual).
 * POST /api/v1/listings/manual
 * 201: Listing created successfully | 400: Validation error | 401: Unauthorized | 403: Forbidden
 * @param {object} payload - { title, description, materialType, weight, price, currency, state, allowNegotiation?: boolean }
 * @returns {Promise<object>} Created listing or response body
 * @throws {Error} with .details for validation errors (400)
 */
export async function createListingManual(payload) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }

  const url = `${base}/api/v1/listings/manual`;
  const body = {
    title: String(payload.title ?? "").trim(),
    description: String(payload.description ?? "").trim(),
    materialType: String(payload.materialType ?? "").trim(),
    weight: Number(payload.weight) || 0,
    price: Number(payload.price) || 0,
    currency: String(payload.currency ?? "").trim(),
    state: String(payload.state ?? "").trim(),
  };
  if (payload.allowNegotiation === true) {
    body.allowNegotiation = true;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
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

/**
 * Create a new listing using AI image analysis.
 * POST /api/v1/listings/ai (multipart/form-data)
 * 201: AI listing created successfully | 400: Image missing | 502: AI analysis failed
 * @param {object} payload - { image: string (data URL or base64) or File/Blob, title: string, description?: string, price: number, currency?: string, state?: string }
 * @returns {Promise<object>} Created listing or response body
 * @throws {Error} on 400 (image missing), 502 (AI analysis failed), or other error
 */
export async function createListingAi(payload) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }

  const form = new FormData();
  let imageValue = payload.image;
  if (imageValue instanceof File || imageValue instanceof Blob) {
    form.append("image", imageValue);
  } else if (typeof imageValue === "string" && imageValue.length > 0) {
    if (imageValue.startsWith("data:")) {
      const res = await fetch(imageValue);
      const blob = await res.blob();
      form.append("image", blob, "image.jpg");
    } else {
      form.append("image", imageValue);
    }
  } else {
    throw new Error("Image is required");
  }

  form.append("title", String(payload.title ?? "").trim());
  if (payload.description != null && String(payload.description).trim()) {
    form.append("description", String(payload.description).trim());
  }
  form.append("price", String(Number(payload.price) || 0));
  if (payload.currency != null && String(payload.currency).trim()) {
    form.append("currency", String(payload.currency).trim());
  }
  if (payload.state != null && String(payload.state).trim()) {
    form.append("state", String(payload.state).trim());
  }
  if (payload.allowNegotiation === true) {
    form.append("allowNegotiation", "true");
  }

  const token = getAuthToken();
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const url = `${base}/api/v1/listings/ai`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: form,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.message || data.error || (res.status === 400 ? "Image missing" : res.status === 502 ? "AI analysis failed" : `AI listing failed (${res.status})`);
    const err = new Error(msg);
    err.details = Array.isArray(data.details) ? data.details : [];
    throw err;
  }

  return data;
}
