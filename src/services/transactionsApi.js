/**
 * Transactions API – manage transactions.
 * Uses VITE_SCAN_API_URL and auth token from auth.js.
 * Add endpoints here as backend specs are provided (e.g. GET /api/v1/transactions, PATCH status).
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

// --- Add transaction endpoints below (e.g. getTransactions, getTransactionById, updateTransactionStatus) ---

/**
 * Get current user's transactions.
 * GET /api/v1/transactions/my-transactions
 * 200: { transactions: Array, count: number }
 * 401: { error, details } Unauthorized
 * @returns {Promise<{ transactions: Array<object>, count: number }>}
 * @throws {Error} on 401/4xx/5xx; err.details, err.status set when present
 */
export async function getMyTransactions() {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }

  const url = `${base}/api/v1/transactions/my-transactions`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const msg = data.error || data.message || (details[0]?.message) || `Failed to load transactions (${res.status})`;
    const err = new Error(msg);
    err.details = details;
    err.status = res.status;
    throw err;
  }

  const list = Array.isArray(data.transactions) ? data.transactions : [];
  const count = typeof data.count === "number" ? data.count : list.length;
  return { transactions: list, count };
}

/**
 * Get a single transaction by ID.
 * GET /api/v1/transactions/{id}
 * 200: { transaction: { id, listingId, buyerId, sellerId, status, listing, buyer, seller, ... } }
 * 401: { error, details } Unauthorized
 * 404: { error: "Transaction not found" }
 * @param {string} id - Transaction ID (UUID)
 * @returns {Promise<{ transaction: object }>}
 * @throws {Error} on 401/404/4xx/5xx; err.details, err.status set when present
 */
export async function getTransactionById(id) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }
  if (!id) {
    throw new Error("Transaction ID is required");
  }

  const url = `${base}/api/v1/transactions/${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const msg = res.status === 404
      ? (data.error || data.message || "Transaction not found")
      : (data.error || data.message || (details[0]?.message) || `Failed to load transaction (${res.status})`);
    const err = new Error(msg);
    err.details = details;
    err.status = res.status;
    throw err;
  }

  return { transaction: data.transaction ?? data };
}

/**
 * Update transaction status.
 * PATCH /api/v1/transactions/{id}
 * Body: { status: "COMPLETED" | "pending" | ... }
 * 200: { message, transaction }
 * 400: { error, details } validation or unauthorized
 * 401: { error, details } Unauthorized
 * @param {string} id - Transaction ID (UUID)
 * @param {string} status - New status (e.g. "COMPLETED", "pending")
 * @returns {Promise<{ message: string, transaction: object }>}
 * @throws {Error} on 400/401/4xx/5xx; err.details, err.status set when present
 */
export async function updateTransactionStatus(id, status) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }
  if (!id) {
    throw new Error("Transaction ID is required");
  }

  const url = `${base}/api/v1/transactions/${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status: String(status ?? "").trim() }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const firstMessage = details[0]?.message || data.message || data.error || `Update transaction status failed (${res.status})`;
    const msg = data.error && details.length > 0
      ? `${data.error}: ${details.map((d) => d.message).join("; ")}`
      : firstMessage;
    const err = new Error(msg);
    err.details = details;
    err.status = res.status;
    throw err;
  }

  return {
    message: data.message || "Transaction status updated successfully",
    transaction: data.transaction ?? data,
  };
}

/**
 * Create a new transaction.
 * POST /api/v1/transactions
 * Body: { listingId: string (UUID), quantity: number }
 * 201: { message, transaction } (transaction includes listing, buyer, seller)
 * 400: { error: "Insufficient quantity available" } or validation
 * 401: { error, details } Unauthorized
 * @param {{ listingId: string, quantity: number }} payload
 * @returns {Promise<{ message: string, transaction: object }>}
 * @throws {Error} on 400/401/4xx/5xx; err.details set when present
 */
export async function createTransaction(payload) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API URL not configured. Set VITE_SCAN_API_URL in .env");
  }

  const body = {
    listingId: String(payload.listingId ?? "").trim(),
    quantity: Number(payload.quantity) || 0,
  };

  const url = `${base}/api/v1/transactions`;
  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const details = Array.isArray(data.details) ? data.details : [];
    const msg = data.error || data.message || (details[0]?.message) || (res.status === 400 ? "Insufficient quantity available" : `Create transaction failed (${res.status})`);
    const err = new Error(msg);
    err.details = details;
    err.status = res.status;
    throw err;
  }

  return {
    message: data.message || "Transaction created successfully",
    transaction: data.transaction ?? data,
  };
}
