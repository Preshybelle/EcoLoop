import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import { getListings } from "../services/listingsApi";
import AvatarMenu from "../components/AvatarMenu";

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
);
const IconPlusSquare = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
);
const IconList = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
);
const IconTag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
);
const IconGear = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const IconFilter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconPencil = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);
const IconRecycle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><path d="M2 12h20"/></svg>
);
const IconDollar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const IconDiamond = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/></svg>
);

const LISTINGS_FALLBACK = [
  { id: 1, name: "PET Flakes (Clear)", sku: "PL-PET-001", category: "Plastics", quantity: "12.5", unit: "Tons", price: "420", priceUnit: "/ Ton", status: "PUBLISHED", created: "Oct 24, 2023", thumb: "https://picsum.photos/seed/pet1/80/80" },
  { id: 2, name: "Copper Wire Scrap", sku: "MT-CU-012", category: "Metals", quantity: "8.2", unit: "Tons", price: "6,200", priceUnit: "/ Ton", status: "SOLD", created: "Oct 20, 2023", thumb: "https://picsum.photos/seed/metal1/80/80" },
  { id: 3, name: "Mixed Paper (OCC)", sku: "PP-OCC-089", category: "Paper", quantity: "25.0", unit: "Tons", price: "180", priceUnit: "/ Ton", status: "PUBLISHED", created: "Oct 18, 2023", thumb: "https://picsum.photos/seed/paper1/80/80" },
  { id: 4, name: "ABS Plastic Regrind", sku: "PL-ABS-044", category: "Plastics", quantity: "5.0", unit: "Tons", price: "890", priceUnit: "/ Ton", status: "DRAFT", created: "Oct 15, 2023", thumb: "https://picsum.photos/seed/abs1/80/80" },
];

function normalizeListing(row) {
  const priceNum = Number(row.price);
  const priceStr = Number.isFinite(priceNum) ? priceNum.toLocaleString() : (row.price ?? "—");
  const created = row.createdAt
    ? new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : (row.created ?? "—");
  const currency = row.currency || "";
  const priceUnit = currency ? `/${currency}` : (row.unit ? ` / ${row.unit}` : " / Ton");
  return {
    id: row.id ?? row._id,
    name: row.title ?? row.name ?? "—",
    sku: row.sku ?? row.skuCode ?? (row.id ? `#${String(row.id).slice(0, 8)}` : "—"),
    category: row.materialType ?? row.category ?? "—",
    quantity: String(row.quantity ?? row.totalWeight ?? "—"),
    unit: row.unit ?? "Tons",
    price: priceStr,
    priceUnit,
    status: (row.status ?? "ACTIVE").toUpperCase(),
    created,
    thumb: row.imageUrl ?? row.image ?? row.thumb ?? "https://picsum.photos/seed/listing/80/80",
  };
}

function filterListings(list, query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (row) =>
      (row.name && row.name.toLowerCase().includes(q)) ||
      (row.sku && row.sku.toLowerCase().includes(q)) ||
      (row.category && row.category.toLowerCase().includes(q)) ||
      (row.quantity && String(row.quantity).toLowerCase().includes(q)) ||
      (row.status && row.status.toLowerCase().includes(q))
  );
}

export default function ListingsManagement() {
  const location = useLocation();
  const highlightId = location.state?.highlightListingId;
  const [listings, setListings] = useState(LISTINGS_FALLBACK);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredListings = filterListings(listings, searchQuery);
  const highlightedRowRef = useRef(null);

  useEffect(() => {
    if (!highlightId || loading || !highlightedRowRef.current) return;
    highlightedRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightId, loading]);

  useEffect(() => {
    let cancelled = false;
    const base = typeof import.meta !== "undefined" && import.meta.env?.VITE_SCAN_API_URL
      ? String(import.meta.env.VITE_SCAN_API_URL).replace(/\/$/, "")
      : "";
    const token = typeof window !== "undefined" && window.localStorage && window.localStorage.getItem("ecoloop_token");
    if (!base || !token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    getListings()
      .then((res) => {
        if (cancelled) return;
        const list = res.listings && Array.isArray(res.listings) ? res.listings : [];
        setListings(list.length ? list.map(normalizeListing) : LISTINGS_FALLBACK);
        setTotalCount(typeof res.count === "number" ? res.count : list.length);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load listings");
          setListings(LISTINGS_FALLBACK);
          setTotalCount(0);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="seller-layout">
      <aside className="seller-sidebar">
        <Link to="/" className="seller-sidebar-logo">
          <img src={ecoLoopLogo} alt="EcoLoop" />
        </Link>
        <nav className="seller-sidebar-nav">
          <Link to="/seller/dashboard" className="seller-nav-item">
            <IconGrid /> <span>Dashboard</span>
          </Link>
          <Link to="/seller/create-listing" className="seller-nav-item">
            <IconPlusSquare /> <span>Create Listing</span>
          </Link>
          <Link to="/listings" className="seller-nav-item seller-nav-item-active">
            <IconList /> <span>Listings (Active)</span>
          </Link>
          <Link to="/seller/offers" className="seller-nav-item">
            <IconTag /> <span>Offers</span>
          </Link>
          <Link to="/seller/account" className="seller-nav-item">
            <IconGear /> <span>Settings</span>
          </Link>
        </nav>
        <div className="seller-sidebar-footer">
          <Link to="/seller/account" className="seller-nav-item">
            <IconGear /> <span>Account Settings</span>
          </Link>
        </div>
      </aside>

      <div className="seller-main-wrap">
        <header className="seller-topbar seller-topbar-gray seller-topbar-with-breadcrumb">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/marketplace">Marketplace</Link>
            <span className="breadcrumb-sep">&gt;</span>
            <span className="breadcrumb-current">Listings</span>
          </nav>
          <div className="seller-topbar-right">
            <button type="button" className="seller-topbar-icon-btn" aria-label="Notifications">
              <IconBell />
            </button>
            <div className="seller-topbar-company">
              <span className="seller-topbar-company-name">Industrial Recycle Co.</span>
              <span className="seller-topbar-badge">Premium Partner</span>
            </div>
            <AvatarMenu accountPath="/seller/account" variant="seller-topbar" />
          </div>
        </header>

        <main className="seller-content">
          {error && (
            <div className="listings-error-banner" role="alert">
              {error}
            </div>
          )}
          <div className="listings-header">
            <div>
              <h1 className="listings-title">Manage Your Materials</h1>
              <p className="listings-desc">Track, edit, and monitor your active recycling inventory.</p>
            </div>
            <Link to="/seller/create-listing" className="btn btn-primary listings-create-btn">
              <IconPlusSquare /> Create New Listing
            </Link>
          </div>

          <div className="listings-toolbar">
            <div className="listings-search-wrap">
              <IconSearch />
              <input
                type="search"
                placeholder="Search materials by name or SKU..."
                className="listings-search-input"
                aria-label="Search materials by name or SKU"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select className="listings-select" aria-label="Category">
              <option>All Categories</option>
            </select>
            <button type="button" className="listings-toolbar-btn" aria-label="Filter">
              <IconFilter />
            </button>
            <button type="button" className="listings-toolbar-btn" aria-label="Download">
              <IconDownload />
            </button>
          </div>

          <div className="listings-table-wrap">
            <table className="listings-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>CATEGORY</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th>CREATED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="listings-loading-cell">Loading listings…</td>
                  </tr>
                ) : filteredListings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="listings-loading-cell">No listings match your search.</td>
                  </tr>
                ) : (
                  filteredListings.map((row) => (
                  <tr
                    key={row.id}
                    ref={String(row.id) === String(highlightId) ? highlightedRowRef : null}
                    data-listing-id={row.id}
                    className={String(row.id) === String(highlightId) ? "listings-table-row-highlight" : undefined}
                  >
                    <td>
                      <div className="listings-table-item">
                        <img src={row.thumb} alt="" className="listings-table-thumb" />
                        <div>
                          <div className="listings-table-name">{row.name}</div>
                          <div className="listings-table-sku">SKU: {row.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="listings-badge">{row.category}</span></td>
                    <td>{row.quantity} {row.unit}</td>
                    <td><span className="listings-price">${row.price} {row.priceUnit}</span></td>
                    <td>
                      <span className={`listings-status listings-status-${row.status.toLowerCase()}`}>
                        <span className="listings-status-dot" /> {row.status}
                      </span>
                    </td>
                    <td>{row.created}</td>
                    <td>
                      <div className="listings-actions">
                        <button type="button" className="listings-action-btn" aria-label="View"><IconEye /></button>
                        <button type="button" className="listings-action-btn" aria-label="Edit"><IconPencil /></button>
                        <button type="button" className="listings-action-btn" aria-label="Delete"><IconTrash /></button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="listings-pagination">
            <p className="listings-pagination-summary">Showing 1 to {filteredListings.length} of {totalCount || listings.length} listings</p>
            <div className="listings-pagination-controls">
              <button type="button" className="listings-page-btn" aria-label="Previous">&lt;</button>
              <button type="button" className="listings-page-btn listings-page-btn-active">1</button>
              <button type="button" className="listings-page-btn">2</button>
              <button type="button" className="listings-page-btn">3</button>
              <button type="button" className="listings-page-btn" aria-label="Next">&gt;</button>
            </div>
          </div>

          <div className="listings-summary-cards">
            <div className="listings-summary-card">
              <div className="listings-summary-icon listings-summary-icon-green">
                <IconRecycle />
              </div>
              <div>
                <div className="listings-summary-label">ACTIVE INVENTORY</div>
                <div className="listings-summary-value">45.7 <span className="listings-summary-unit">Tons</span></div>
              </div>
            </div>
            <div className="listings-summary-card">
              <div className="listings-summary-icon listings-summary-icon-blue">
                <IconDollar />
              </div>
              <div>
                <div className="listings-summary-label">TOTAL VALUE</div>
                <div className="listings-summary-value">$18,450 <span className="listings-summary-unit">USD</span></div>
              </div>
            </div>
            <div className="listings-summary-card">
              <div className="listings-summary-icon listings-summary-icon-purple">
                <IconDiamond />
              </div>
              <div>
                <div className="listings-summary-label">PENDING OFFERS</div>
                <div className="listings-summary-value">12 <span className="listings-summary-unit">Active</span></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
