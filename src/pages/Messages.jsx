import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import AvatarMenu from "../components/AvatarMenu";
import { getListings } from "../services/listingsApi";
import { getProducerLevelFromListings } from "../utils/producerLevel";
import { getConversationsForProducer } from "../utils/contactMessages";

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
);
const IconBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
const IconMessagePlus = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="12" y1="7" x2="12" y2="13"/></svg>
);
const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
);
const IconChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
);
const IconOrder = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const IconVideo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
);
const IconEllipsisV = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
);
const IconCube = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconPaperclip = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
);
const IconSmile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);
const IconSend = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const IconGrid9 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="5" height="5" rx="0.5"/><rect x="10" y="3" width="5" height="5" rx="0.5"/><rect x="17" y="3" width="4" height="5" rx="0.5"/><rect x="3" y="10" width="5" height="5" rx="0.5"/><rect x="10" y="10" width="5" height="5" rx="0.5"/><rect x="17" y="10" width="4" height="5" rx="0.5"/><rect x="3" y="17" width="5" height="4" rx="0.5"/><rect x="10" y="17" width="5" height="4" rx="0.5"/><rect x="17" y="17" width="4" height="4" rx="0.5"/></svg>
);
const IconList = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
);
const IconArrows = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7"/><path d="M17 7H7v10"/></svg>
);
const IconCheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const IconGear = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);

function Stars({ value }) {
  return (
    <span className="messages-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= value ? "filled" : ""}><IconStar /></span>
      ))}
    </span>
  );
}

const CONVERSATIONS = [
  { id: "gt", name: "GreenTech Manufactur", last: "Industrial Polyethylene (HDPE)", time: "10:45 AM", online: true, unread: 2, selected: true },
  { id: "mm", name: "Metro Metals Coi", last: "Scrap Aluminum Mix", time: "Yesterday", online: true, unread: 0, selected: false },
  { id: "ep", name: "EcoPack Solutions", last: "Recycled Cardboard Bales", time: "2 days ago", online: false, unread: 0, selected: false },
  { id: "cs", name: "CleanStream Indu", last: "PET Plastic Bottles", time: "3 days ago", online: false, unread: 0, selected: false },
];

const AVATAR_LABELS = { gt: "GT", mm: "MM", ep: "EP", cs: "CS" };
const AVATAR_COLORS = { gt: "green", mm: "teal", ep: "blue", cs: "purple" };

function getFullNameAndInitials() {
  const fullName = typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "User") : "User";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (fullName.trim()[0] || "U").toUpperCase();
  return { fullName, initials };
}

const DEFAULT_LEVEL = { tierLabel: "Tier 1: Bronze", progressPercent: 0 };

function formatMessageTime(iso) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (diff < 86400000) return "Yesterday";
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export default function Messages() {
  const { pathname } = useLocation();
  const isProducer = pathname.includes("/seller/messages");
  const { fullName, initials } = getFullNameAndInitials();
  const [producerLevel, setProducerLevel] = useState(DEFAULT_LEVEL);
  const [selectedConvId, setSelectedConvId] = useState(null);

  const producerConversations = useMemo(() => {
    if (!isProducer || !fullName) return [];
    return getConversationsForProducer(fullName);
  }, [isProducer, fullName]);

  const selectedConv = useMemo(() => {
    if (!selectedConvId) return null;
    return producerConversations.find((c) => c.id === selectedConvId) || null;
  }, [producerConversations, selectedConvId]);

  useEffect(() => {
    if (!isProducer) return;
    let cancelled = false;
    const base = typeof import.meta !== "undefined" && import.meta.env?.VITE_SCAN_API_URL ? String(import.meta.env.VITE_SCAN_API_URL).replace(/\/$/, "") : "";
    const token = typeof window !== "undefined" && window.localStorage?.getItem("ecoloop_token");
    if (!base || !token) return;
    getListings()
      .then((res) => {
        if (cancelled) return;
        const list = res.listings && Array.isArray(res.listings) ? res.listings : [];
        setProducerLevel(getProducerLevelFromListings(list));
      })
      .catch(() => { if (!cancelled) setProducerLevel(DEFAULT_LEVEL); });
    return () => { cancelled = true; };
  }, [isProducer]);

  return (
    <div className="messages-layout">
      <aside className={isProducer ? "producer-sidebar messages-sidebar" : "buyer-sidebar messages-sidebar"}>
        <Link to="/" className={isProducer ? "producer-sidebar-logo" : "buyer-sidebar-logo"}>
          <img src={ecoLoopLogo} alt="Eco loop" />
        </Link>
        <nav className={isProducer ? "producer-sidebar-nav" : "buyer-sidebar-nav"}>
          {isProducer ? (
            <>
              <Link to="/seller/dashboard" className="producer-nav-item">
                <IconGrid9 /> <span>Dashboard</span>
              </Link>
              <Link to="/seller/inventory" className="producer-nav-item">
                <IconBox /> <span>Inventory</span>
              </Link>
              <Link to="/listings" className="producer-nav-item">
                <IconList /> <span>Listings</span>
              </Link>
              <Link to="/seller/transactions" className="producer-nav-item">
                <IconArrows /> <span>Transactions</span>
              </Link>
              <Link to="/seller/account" className="producer-nav-item">
                <IconGear /> <span>Account Settings</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/buyer/dashboard" className="buyer-nav-item">
                <IconGrid /> <span>Dashboard</span>
              </Link>
              <Link to="/marketplace" className="buyer-nav-item">
                <IconBag /> <span>Marketplace</span>
              </Link>
              <Link to="/buyer/messages" className="buyer-nav-item buyer-nav-item-active">
                <IconMessagePlus /> <span>Message</span>
              </Link>
              <Link to="/buyer/inventory" className="buyer-nav-item">
                <IconBox /> <span>Inventory</span>
              </Link>
              <Link to="/buyer/orders" className="buyer-nav-item">
                <IconOrder /> <span>Orders</span>
              </Link>
            </>
          )}
        </nav>
        {isProducer && (
          <div className="producer-level">
            <div className="producer-level-label">PRODUCER LEVEL</div>
            <div className="producer-level-tier">{producerLevel.tierLabel}</div>
            <div className="producer-level-bar-wrap">
              <div className="producer-level-bar" style={{ width: `${producerLevel.progressPercent}%` }} />
            </div>
          </div>
        )}
      </aside>

      <div className="messages-app">
        <header className="seller-topbar seller-topbar-gray seller-topbar-with-breadcrumb">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span className="breadcrumb-current">Messages</span>
          </nav>
          <div className="seller-topbar-right">
            <button type="button" className="seller-topbar-icon-btn" aria-label="Notifications">
              <IconBell />
            </button>
            <div className="seller-topbar-user">
              <span className="seller-topbar-user-name">{fullName}</span>
            </div>
            <AvatarMenu accountPath={isProducer ? "/seller/account" : "/buyer/account"} variant="seller-topbar" />
          </div>
        </header>

        <div className="messages-panels">
          <aside className="messages-list-pane">
            <h1 className="messages-list-title">Messages</h1>
            <div className="messages-search-wrap">
              <IconSearch />
              <input type="search" placeholder="Search conversations..." className="messages-search-input" aria-label="Search" />
            </div>
            <ul className="messages-conversation-list">
              {isProducer && producerConversations.length > 0
                ? producerConversations.map((c) => {
                    const lastMsg = c.messages && c.messages.length > 0 ? c.messages[c.messages.length - 1] : null;
                    const preview = lastMsg ? (lastMsg.body.length > 40 ? lastMsg.body.slice(0, 40) + "…" : lastMsg.body) : "No messages yet";
                    const time = lastMsg ? formatMessageTime(lastMsg.createdAt) : "—";
                    const buyerInitials = c.buyerName.trim().split(/\s+/).length >= 2
                      ? (c.buyerName.trim().split(/\s+/)[0][0] + c.buyerName.trim().split(/\s+/).pop()[0]).toUpperCase()
                      : (c.buyerName.trim()[0] || "?").toUpperCase();
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          className={"messages-conv-item " + (selectedConvId === c.id ? "messages-conv-item-selected" : "")}
                          onClick={() => setSelectedConvId(c.id)}
                        >
                          <div className="messages-conv-avatar messages-conv-avatar-green">
                            {buyerInitials}
                          </div>
                          <div className="messages-conv-body">
                            <div className="messages-conv-row">
                              <span className="messages-conv-name">{c.buyerName}</span>
                              <span className="messages-conv-time">{time}</span>
                            </div>
                            <div className="messages-conv-preview">
                              <span className="messages-conv-last">{preview}</span>
                              {c.messages && c.messages.length > 0 && <span className="messages-conv-dot" aria-hidden="true" />}
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })
                : CONVERSATIONS.map((c) => (
                    <li key={c.id}>
                      <Link to="#" className={"messages-conv-item " + (c.selected ? "messages-conv-item-selected" : "")}>
                        <div className={"messages-conv-avatar messages-conv-avatar-" + AVATAR_COLORS[c.id]}>
                          {AVATAR_LABELS[c.id]}
                        </div>
                        <div className="messages-conv-body">
                          <div className="messages-conv-row">
                            <span className="messages-conv-name">{c.name}</span>
                            <span className="messages-conv-time">{c.time}</span>
                          </div>
                          <div className="messages-conv-preview">
                            {c.online && <span className="messages-conv-dot" aria-hidden="true" />}
                            <span className="messages-conv-last">{c.last}</span>
                            {c.unread > 0 && <span className="messages-conv-badge">{c.unread}</span>}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
            </ul>
          </aside>

          <main className="messages-chat-pane">
            {selectedConv ? (
              <>
                <header className="messages-chat-header">
                  <div className="messages-chat-header-left">
                    <div className="messages-chat-avatar messages-chat-avatar-green">
                      {selectedConv.buyerName.trim().split(/\s+/).length >= 2
                        ? (selectedConv.buyerName.trim().split(/\s+/)[0][0] + selectedConv.buyerName.trim().split(/\s+/).pop()[0]).toUpperCase()
                        : (selectedConv.buyerName.trim()[0] || "?")}
                    </div>
                    <div>
                      <span className="messages-chat-contact-name">{selectedConv.buyerName}</span>
                      <div className="messages-chat-meta">
                        <span className="messages-chat-online">Buyer • Contact about listing</span>
                      </div>
                    </div>
                  </div>
                  <div className="messages-chat-header-actions">
                    <button type="button" className="messages-chat-action-btn" aria-label="Call">
                      <IconPhone />
                    </button>
                    <button type="button" className="messages-chat-action-btn" aria-label="Video call">
                      <IconVideo />
                    </button>
                    <button type="button" className="messages-chat-action-btn" aria-label="More">
                      <IconEllipsisV />
                    </button>
                  </div>
                </header>

                <div className="messages-listing-card">
                  <IconCube className="messages-listing-icon" />
                  <div className="messages-listing-info">
                    <span className="messages-listing-title">{selectedConv.listingTitle}</span>
                    <span className="messages-listing-qty">Listing ID: #{selectedConv.listingId}</span>
                  </div>
                </div>

                <div className="messages-bubbles">
                  {(selectedConv.messages || []).map((msg, idx) => (
                    <div
                      key={idx}
                      className={msg.from === "buyer" ? "messages-bubble messages-bubble-in" : "messages-bubble messages-bubble-out"}
                    >
                      <p className="messages-bubble-text">{msg.body}</p>
                      <div className="messages-bubble-meta">
                        {formatMessageTime(msg.createdAt)}
                        {msg.from === "buyer" && <IconCheck className="messages-bubble-check" />}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <header className="messages-chat-header">
                  <div className="messages-chat-header-left">
                    <div className="messages-chat-avatar messages-chat-avatar-green">GT</div>
                    <div>
                      <span className="messages-chat-contact-name">GreenTech Manufacturing</span>
                      <div className="messages-chat-meta">
                        <Stars value={5} />
                        <span className="messages-chat-online">
                          <span className="messages-chat-online-dot" /> Online
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="messages-chat-header-actions">
                    <button type="button" className="messages-chat-action-btn" aria-label="Call">
                      <IconPhone />
                    </button>
                    <button type="button" className="messages-chat-action-btn" aria-label="Video call">
                      <IconVideo />
                    </button>
                    <button type="button" className="messages-chat-action-btn" aria-label="More">
                      <IconEllipsisV />
                    </button>
                  </div>
                </header>

                <div className="messages-listing-card">
                  <IconCube className="messages-listing-icon" />
                  <div className="messages-listing-info">
                    <span className="messages-listing-title">Industrial Polyethylene (HDPE)</span>
                    <span className="messages-listing-qty">Qty: 1200 kg</span>
                    <span className="messages-listing-location">
                      <IconMapPin /> Industrial Zone, Lagos
                    </span>
                  </div>
                </div>

                <div className="messages-bubbles">
                  <div className="messages-bubble messages-bubble-out">
                    <p className="messages-bubble-text">
                      Hi, I'm interested in your 1200kg HDPE listing. Is it still available? When can pickup be scheduled?
                    </p>
                    <div className="messages-bubble-meta">
                      <span>10:30 AM</span>
                      <IconCheck className="messages-bubble-check" />
                    </div>
                  </div>
                  <div className="messages-bubble messages-bubble-in">
                    <p className="messages-bubble-text">Hello! Yes, the material is still available.</p>
                    <div className="messages-bubble-meta">10:42 AM</div>
                  </div>
                  <div className="messages-bubble messages-bubble-in">
                    <p className="messages-bubble-text">
                      Yes, the material is still available. We can schedule pickup for tomorrow.
                    </p>
                    <div className="messages-bubble-meta">10:45 AM</div>
                  </div>
                </div>
              </>
            )}

            <div className="messages-input-wrap">
              <button type="button" className="messages-input-attach" aria-label="Attach">
                <IconPaperclip />
              </button>
              <input type="text" placeholder="Type a message..." className="messages-input" aria-label="Message" />
              <button type="button" className="messages-input-emoji" aria-label="Emoji">
                <IconSmile />
              </button>
              <button type="button" className="messages-send-btn" aria-label="Send">
                <IconSend />
              </button>
            </div>
            <p className="messages-input-hint">Press Enter to send • Shift + Enter for new line</p>
          </main>
        </div>
      </div>
    </div>
  );
}
