import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import { getListings } from "../services/listingsApi";
import AvatarMenu from "../components/AvatarMenu";
import { STORAGE_KEYS } from "../utils/environmentalImpact";

const DRAFTS_STORAGE_KEY = "ecoloop_inventory_drafts";
const NOTES_STORAGE_KEY = "ecoloop_create_listing_notes";
const ALLOW_NEGOTIATION_KEY = "ecoloop_create_listing_allow_negotiation";
const CO2_KG_PER_TON = 500;

/** Restore draft data to sessionStorage so the Review page shows the draft when we navigate there. */
function restoreDraftToSessionStorage(draft) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(STORAGE_KEYS.quantity, draft.quantity ?? String(draft.quantityTons ?? "5"));
  sessionStorage.setItem(STORAGE_KEYS.unit, draft.unit ?? "tons");
  sessionStorage.setItem(STORAGE_KEYS.materialType, draft.materialType ?? "PLASTIC");
  sessionStorage.setItem(ALLOW_NEGOTIATION_KEY, draft.allowNegotiation ? "true" : "false");
  sessionStorage.setItem(NOTES_STORAGE_KEY, draft.description ?? "");
}

function getSavedDrafts() {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(DRAFTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getFullNameAndInitials() {
  const fullName = typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "Producer") : "Producer";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (fullName.trim()[0] || "P").toUpperCase();
  return { fullName, initials };
}
import steelScrapImg from "../assets/inventory/steel-scrap.png";
import hdpePlasticImg from "../assets/inventory/hdpe-plastic.png";
import cardboardBoxesImg from "../assets/inventory/cardboard-boxes.png";
import woodPalletsImg from "../assets/inventory/wood-pallets.png";
import glassBottlesImg from "../assets/inventory/glass-bottles.png";

const IconGrid9 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="5" height="5" rx="0.5"/><rect x="10" y="3" width="5" height="5" rx="0.5"/><rect x="17" y="3" width="4" height="5" rx="0.5"/><rect x="3" y="10" width="5" height="5" rx="0.5"/><rect x="10" y="10" width="5" height="5" rx="0.5"/><rect x="17" y="10" width="4" height="5" rx="0.5"/><rect x="3" y="17" width="5" height="4" rx="0.5"/><rect x="10" y="17" width="5" height="4" rx="0.5"/><rect x="17" y="17" width="4" height="4" rx="0.5"/></svg>
);
const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);
const IconList = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
);
const IconCamera = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
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
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const IconFilter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconCO2 = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M12 12v10"/></svg>
);
const IconEllipsisV = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
);

function listingToCard(listing, img) {
  const status = (listing.status || "ACTIVE").toUpperCase();
  let displayStatus = "Active";
  if (status === "DRAFT" || status === "PENDING") displayStatus = status === "DRAFT" ? "Draft" : "Pending";
  else if (status === "SOLD" || status === "COMPLETED") displayStatus = status === "SOLD" ? "Completed" : "Completed";

  const title = listing.title || listing.name || "—";
  const quantity = listing.quantity ?? listing.totalWeight ?? listing.weight;
  const weightStr = typeof quantity === "number" ? `${quantity} kg` : (quantity || "—");
  const priceNum = Number(listing.price) ?? 0;
  const priceStr = priceNum >= 1000 ? (priceNum / 1000).toFixed(0) + "K" : String(priceNum);
  const location = listing.location ?? listing.state ?? "—";
  const listed = listing.createdAt || listing.listedAt || listing.listed;
  const listedStr = listed ? new Date(listed).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
  const views = listing.views ?? listing.viewCount ?? 0;
  const tons = Number(listing.quantity) || (listing.totalWeight ? listing.totalWeight / 1000 : 0) || 0;
  const co2Kg = Math.round(tons * CO2_KG_PER_TON);
  const co2Str = co2Kg >= 1000 ? `${(co2Kg / 1000).toFixed(1)} Tons CO₂` : `${co2Kg} kg CO₂`;

  return {
    id: listing.id,
    name: title,
    status: displayStatus,
    weight: weightStr,
    price: priceStr,
    location,
    listed: listedStr,
    views,
    co2: co2Str,
    img: listing.imageUrl || img,
    isDraft: false,
  };
}

function draftToCard(draft, img) {
  const savedAt = draft.savedAt ? new Date(draft.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
  const tons = Number(draft.quantityTons) || 0;
  const co2Kg = Math.round(tons * CO2_KG_PER_TON);
  const co2Str = co2Kg >= 1000 ? `${(co2Kg / 1000).toFixed(1)} Tons CO₂` : `${co2Kg} kg CO₂`;
  const priceNum = Number(draft.price) || 0;
  const priceStr = priceNum >= 1000 ? (priceNum / 1000).toFixed(0) + "K" : String(priceNum);
  return {
    id: draft.id,
    name: draft.title || "Draft listing",
    status: "Draft",
    weight: draft.quantityDisplay || "—",
    price: priceStr,
    location: "—",
    listed: savedAt,
    views: 0,
    co2: co2Str,
    img,
    isDraft: true,
  };
}

export default function Inventory() {
  const navigate = useNavigate();
  const { fullName, initials } = getFullNameAndInitials();
  const [listings, setListings] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleEditDraft = (draftId) => {
    const rawDraft = drafts.find((d) => d.id === draftId);
    if (!rawDraft) return;
    restoreDraftToSessionStorage(rawDraft);
    navigate("/seller/create-listing/review");
  };

  useEffect(() => {
    setDrafts(getSavedDrafts());
  }, []);

  useEffect(() => {
    let cancelled = false;
    const token = typeof window !== "undefined" && window.localStorage && window.localStorage.getItem("ecoloop_token");
    if (!token) {
      setListings([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getListings()
      .then((res) => {
        if (cancelled) return;
        setListings(res.listings || []);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load listings");
          setListings([]);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const publishedCards = listings.map((l) => listingToCard(l, hdpePlasticImg));
  const draftCards = drafts.map((d) => draftToCard(d, cardboardBoxesImg));
  const allItems = [...publishedCards, ...draftCards];

  const filteredByTab = allItems.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "drafts") return item.isDraft;
    if (activeTab === "active") return item.status === "Active";
    if (activeTab === "pending") return item.status === "Pending";
    if (activeTab === "completed") return item.status === "Completed";
    return true;
  });

  const searchLower = searchQuery.trim().toLowerCase();
  const filteredItems = searchLower
    ? filteredByTab.filter((item) => item.name.toLowerCase().includes(searchLower) || (item.location && item.location.toLowerCase().includes(searchLower)))
    : filteredByTab;

  const tabCounts = {
    all: allItems.length,
    active: allItems.filter((i) => i.status === "Active").length,
    drafts: draftCards.length,
    pending: allItems.filter((i) => i.status === "Pending").length,
    completed: allItems.filter((i) => i.status === "Completed").length,
  };

  return (
    <div className="seller-layout producer-dashboard-layout">
      <aside className="producer-sidebar inventory-sidebar">
        <Link to="/" className="producer-sidebar-logo">
          <img src={ecoLoopLogo} alt="Eco loop" />
        </Link>
        <nav className="producer-sidebar-nav">
          <Link to="/seller/dashboard" className="producer-nav-item">
            <IconGrid9 /> <span>Dashboard</span>
          </Link>
          <Link to="/seller/inventory" className="producer-nav-item producer-nav-item-active">
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
        </nav>
      </aside>

      <div className="seller-main-wrap">
        <header className="seller-topbar producer-dashboard-topbar seller-topbar-with-breadcrumb">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/seller/dashboard">Dashboard</Link>
            <span className="breadcrumb-sep">&gt;</span>
            <span className="breadcrumb-current">Inventory</span>
          </nav>
          <div className="seller-topbar-right">
            <button type="button" className="seller-topbar-icon-btn" aria-label="Notifications">
              <IconBell />
            </button>
            <div className="seller-topbar-user">
              <span className="seller-topbar-user-name">{fullName}</span>
            </div>
            <AvatarMenu accountPath="/seller/account" variant="seller-topbar" className="inventory-avatar" />
          </div>
        </header>

        <main className="inventory-content">
          <h1 className="inventory-title">Inventory</h1>
          <p className="inventory-subtitle">Track and manage your listed materials, saved items, and completed sales.</p>

          <div className="inventory-toolbar">
            <div className="inventory-search-wrap">
              <IconSearch />
              <input
                type="search"
                className="inventory-search-input"
                placeholder="Search by material or location..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="button" className="inventory-filters-btn">
              <IconFilter /> More Filters
            </button>
          </div>

          {error && (
            <div className="register-form-errors" role="alert" style={{ marginBottom: "1rem" }}>
              {error}
            </div>
          )}

          <div className="inventory-tabs">
            <button
              type="button"
              className={`inventory-tab ${activeTab === "all" ? "inventory-tab-active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Items
              <span className={`inventory-tab-badge ${activeTab === "all" ? "inventory-tab-badge-active" : ""}`}>{tabCounts.all}</span>
            </button>
            <button
              type="button"
              className={`inventory-tab ${activeTab === "active" ? "inventory-tab-active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Active Listings
              <span className={`inventory-tab-badge ${activeTab === "active" ? "inventory-tab-badge-active" : ""}`}>{tabCounts.active}</span>
            </button>
            <button
              type="button"
              className={`inventory-tab ${activeTab === "drafts" ? "inventory-tab-active" : ""}`}
              onClick={() => setActiveTab("drafts")}
            >
              Saved Drafts
              <span className={`inventory-tab-badge ${activeTab === "drafts" ? "inventory-tab-badge-active" : ""}`}>{tabCounts.drafts}</span>
            </button>
            <button
              type="button"
              className={`inventory-tab ${activeTab === "pending" ? "inventory-tab-active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending Sales
              <span className={`inventory-tab-badge ${activeTab === "pending" ? "inventory-tab-badge-active" : ""}`}>{tabCounts.pending}</span>
            </button>
            <button
              type="button"
              className={`inventory-tab ${activeTab === "completed" ? "inventory-tab-active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
              <span className={`inventory-tab-badge ${activeTab === "completed" ? "inventory-tab-badge-active" : ""}`}>{tabCounts.completed}</span>
            </button>
          </div>

          {loading ? (
            <p className="inventory-subtitle">Loading inventory…</p>
          ) : filteredItems.length === 0 ? (
            <p className="inventory-subtitle">No items match this filter. Publish listings from Create Listing or save drafts on the Review page.</p>
          ) : (
          <div className="inventory-grid">
            {filteredItems.map((item) => (
              <article key={item.id} className="inventory-card">
                <div className="inventory-card-image-wrap">
                  <img src={item.img} alt={item.name} className="inventory-card-image" />
                  <span className={`inventory-card-status inventory-card-status-${item.status.toLowerCase()}`}>{item.status}</span>
                </div>
                <div className="inventory-card-body">
                  <div className="inventory-card-header">
                    <h3 className="inventory-card-name">{item.name}</h3>
                    <button type="button" className="inventory-card-menu" aria-label="Options"><IconEllipsisV /></button>
                  </div>
                  <div className="inventory-card-weight">{item.weight}</div>
                  <div className="inventory-card-price">₦{item.price}</div>
                  <div className="inventory-card-meta">
                    <span className="inventory-card-meta-item"><IconMapPin /> {item.location}</span>
                    <span className="inventory-card-meta-item"><IconCalendar /> {item.isDraft ? "Saved" : "Listed"} {item.listed}</span>
                    <span className="inventory-card-meta-item"><IconEye /> {item.views} views</span>
                    <span className="inventory-card-meta-item"><IconCO2 /> {item.co2}</span>
                  </div>
                  {item.isDraft && (
                    <button
                      type="button"
                      className="inventory-card-edit-draft"
                      onClick={() => handleEditDraft(item.id)}
                    >
                      Continue editing
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
          )}
        </main>
      </div>
    </div>
  );
}
