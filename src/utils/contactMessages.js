/**
 * Contact-seller messages: buyer sends from Marketplace, producer sees in Messages.
 * Stored in localStorage for capstone; key: ecoloop_contact_messages.
 */

const STORAGE_KEY = "ecoloop_contact_messages";

function getConversations() {
  try {
    const raw = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveConversations(conversations) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  } catch (_) {}
}

/**
 * Find or create a conversation for this listing + seller + buyer.
 * @param {{ listingId: string|number, listingTitle: string, sellerName: string }} listing
 * @param {string} buyerName
 * @returns {{ id: string, listingId, listingTitle, sellerName, buyerName, messages: Array }}
 */
function getOrCreateConversation(listing, buyerName) {
  const conversations = getConversations();
  const { listingId, listingTitle, sellerName } = listing;
  const existing = conversations.find(
    (c) =>
      String(c.listingId) === String(listingId) &&
      c.sellerName === sellerName &&
      c.buyerName === buyerName
  );
  if (existing) return existing;
  const id = `conv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const newConv = {
    id,
    listingId,
    listingTitle,
    sellerName,
    buyerName,
    messages: [],
  };
  conversations.push(newConv);
  saveConversations(conversations);
  return newConv;
}

/**
 * Buyer sends a message from Marketplace. Adds to conversation and saves.
 * @param {{ listingId, listingTitle, sellerName }} listing
 * @param {string} buyerName
 * @param {string} body
 */
export function sendContactMessage(listing, buyerName, body) {
  const trimmed = (body || "").trim();
  if (!trimmed) return null;
  const conversations = getConversations();
  const conv = getOrCreateConversation(listing, buyerName);
  const msg = {
    from: "buyer",
    body: trimmed,
    createdAt: new Date().toISOString(),
  };
  const convInList = conversations.find((c) => c.id === conv.id);
  if (!convInList) {
    conv.messages.push(msg);
    conversations.push(conv);
  } else {
    convInList.messages = convInList.messages || [];
    convInList.messages.push(msg);
  }
  saveConversations(conversations);
  return msg;
}

/**
 * Get all conversations for the producer (seller). Used on Messages page when isProducer.
 * @param {string} sellerName - current user's name (ecoloop_fullName or company name)
 */
export function getConversationsForProducer(sellerName) {
  const all = getConversations();
  return all.filter((c) => c.sellerName === sellerName);
}
