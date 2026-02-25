import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import { getListings } from "../services/listingsApi";
import { getProducerLevel } from "../utils/producerLevel";
import { getDisplayName } from "../utils/userDisplay";
import AvatarMenu from "../components/AvatarMenu";

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
const IconMessage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const IconDocList = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
);
const IconLeaf = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
);
const IconStarburst = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3z"/></svg>
);
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconBarChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
);
const RECENT_LISTINGS_FALLBACK = [
  { id: 1, material: "Industrial Polyethylene (HDPE)", quantity: "1,200 kg", quantityNum: 1.2, price: "₦5,100,000", priceNum: 5100000, status: "ACTIVE" },
  { id: 2, material: "Scrap Aluminum Mix", quantity: "500 kg", quantityNum: 0.5, price: "₦1,275,000", priceNum: 1275000, status: "PENDING" },
  { id: 3, material: "Recycled Cardboard Bales", quantity: "2.4 Tons", quantityNum: 2.4, price: "₦1,800,000", priceNum: 1800000, status: "SOLD" },
  { id: 4, material: "Mixed Glass Cullet", quantity: "800 kg", quantityNum: 0.8, price: "₦630,000", priceNum: 630000, status: "ACTIVE" },
];

const PULSE_BARS_DEFAULT = [35, 45, 40, 55, 65, 75, 90];

/** Derive bar heights (%) from listing tonnage – each bar = one listing's share of total, up to 7 bars. */
function getPulseBarsFromListings(rows) {
  if (!rows.length) return PULSE_BARS_DEFAULT;
  const total = rows.reduce((sum, r) => sum + (r.quantityNum ?? 0), 0);
  if (total <= 0) return PULSE_BARS_DEFAULT;
  const shares = rows.slice(0, 7).map((r) => ((r.quantityNum ?? 0) / total) * 100);
  while (shares.length < 7) shares.push(0);
  return shares.slice(0, 7);
}

const USD_TO_NGN = 1500;

function toDashboardRow(apiRow) {
  const title = apiRow.title ?? apiRow.name ?? "—";
  const quantity = apiRow.quantity ?? apiRow.totalWeight ?? 0;
  const unit = apiRow.unit ?? "Tons";
  const quantityStr = typeof quantity === "number" ? `${Number(quantity).toLocaleString()} ${unit}` : `${quantity} ${unit}`;
  let quantityNum = typeof quantity === "number" ? quantity : parseFloat(String(quantity).replace(/[^0-9.]/g, "")) || 0;
  if (String(unit).toLowerCase().includes("kg") && quantityNum >= 1000) quantityNum /= 1000;
  const priceNum = Number(apiRow.price) ?? 0;
  const currency = (apiRow.currency || "").toUpperCase();
  const inNaira = currency === "NGN" || currency === "NAIRA" ? priceNum : priceNum * USD_TO_NGN;
  const priceStr = "₦" + (inNaira >= 1e6 ? (inNaira / 1e6).toFixed(1) + "M" : inNaira.toLocaleString("en-NG", { maximumFractionDigits: 0 }));
  const status = (apiRow.status ?? "ACTIVE").toUpperCase();
  return {
    material: title,
    quantity: quantityStr,
    quantityNum,
    price: priceStr,
    priceNum: inNaira,
    status,
  };
}

/** Rough kg CO2 equivalent saved per ton of material recycled (industry estimate). */
const CO2_KG_PER_TON = 500;

function computeMetrics(rows) {
  const active = rows.filter((r) => r.status === "ACTIVE" || r.status === "PUBLISHED").length;
  const pending = rows.filter((r) => r.status === "PENDING" || r.status === "DRAFT").length;
  const totalTons = rows.reduce((sum, r) => sum + (r.quantityNum ?? 0), 0);
  const totalRevenueNaira = rows.reduce((sum, r) => sum + (r.priceNum ?? 0), 0);
  const co2SavedKg = totalTons * CO2_KG_PER_TON;
  return { active, pending, totalTons, totalRevenueNaira, co2SavedKg };
}

function filterRecentListings(list, query, statusFilter) {
  let out = list;
  const q = (query || "").trim().toLowerCase();
  if (q) {
    out = out.filter(
      (row) =>
        (row.material && row.material.toLowerCase().includes(q)) ||
        (row.quantity && row.quantity.toLowerCase().includes(q)) ||
        (row.price && row.price.toLowerCase().includes(q)) ||
        (row.status && row.status.toLowerCase().includes(q))
    );
  }
  if (statusFilter) {
    const s = statusFilter.toUpperCase();
    out = out.filter((row) => {
      const r = (row.status || "").toUpperCase();
      if (s === "ACTIVE") return r === "ACTIVE" || r === "PUBLISHED";
      if (s === "PENDING") return r === "PENDING" || r === "DRAFT";
      return r === s;
    });
  }
  return out;
}

export default function ProducerDashboard() {
  const [newMessagesCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [metricFilter, setMetricFilter] = useState(null);
  const [dashboardListings, setDashboardListings] = useState(RECENT_LISTINGS_FALLBACK);
  const [metrics, setMetrics] = useState(() => computeMetrics(RECENT_LISTINGS_FALLBACK));
  const [metricsLoading, setMetricsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const base = typeof import.meta !== "undefined" && import.meta.env?.VITE_SCAN_API_URL ? String(import.meta.env.VITE_SCAN_API_URL).replace(/\/$/, "") : "";
    const token = typeof window !== "undefined" && window.localStorage && window.localStorage.getItem("ecoloop_token");
    if (!base || !token) {
      setMetricsLoading(false);
      return;
    }
    setMetricsLoading(true);
    getListings()
      .then((res) => {
        if (cancelled) return;
        const list = res.listings && Array.isArray(res.listings) ? res.listings : [];
        const rows = list.length ? list.map(toDashboardRow) : RECENT_LISTINGS_FALLBACK;
        setDashboardListings(rows);
        setMetrics(computeMetrics(rows));
      })
      .catch(() => {
        if (!cancelled) {
          setDashboardListings(RECENT_LISTINGS_FALLBACK);
          setMetrics(computeMetrics(RECENT_LISTINGS_FALLBACK));
        }
      })
      .finally(() => { if (!cancelled) setMetricsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const recentFiltered = filterRecentListings(dashboardListings, searchQuery, metricFilter);
  const recentSlice = recentFiltered.slice(0, 5);
  const fullName = getDisplayName();


  return (
    <div className="seller-layout producer-dashboard-layout">
      <aside className="producer-sidebar">
        <Link to="/" className="producer-sidebar-logo">
          <img src={ecoLoopLogo} alt="Eco loop" />
        </Link>
        <nav className="producer-sidebar-nav">
          <Link to="/seller/dashboard" className="producer-nav-item producer-nav-item-active">
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
          <Link to="/seller/messages" className="producer-nav-item">
            <IconMessage /> <span>Messages</span>
          </Link>
          <Link to="/seller/account" className="producer-nav-item">
            <IconGear /> <span>Account Settings</span>
          </Link>
        </nav>
        <div className="producer-level">
          <div className="producer-level-label">PRODUCER LEVEL</div>
          <div className="producer-level-tier">
            {metricsLoading ? "—" : getProducerLevel(metrics.totalRevenueNaira).tierLabel}
          </div>
          <div className="producer-level-bar-wrap">
            <div
              className="producer-level-bar"
              style={{ width: metricsLoading ? "0%" : `${getProducerLevel(metrics.totalRevenueNaira).progressPercent}%` }}
            />
          </div>
        </div>
      </aside>

      <div className="seller-main-wrap">
        <header className="seller-topbar producer-dashboard-topbar seller-topbar-with-breadcrumb">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span className="breadcrumb-current">Dashboard</span>
          </nav>
          <div className="seller-topbar-right">
            <Link to="/seller/messages" className="seller-topbar-icon-btn producer-bell-link" aria-label={newMessagesCount > 0 ? `${newMessagesCount} new messages` : "Messages"}>
              <span className="producer-bell-wrap">
                <IconBell />
                {newMessagesCount > 0 && (
                  <span className="producer-bell-badge" aria-hidden="true">{newMessagesCount > 99 ? "99+" : newMessagesCount}</span>
                )}
              </span>
            </Link>
            <div className="seller-topbar-user">
              <span className="seller-topbar-user-name">{fullName}</span>
            </div>
            <AvatarMenu accountPath="/seller/account" variant="seller-topbar" />
          </div>
        </header>

        <main className="producer-dashboard-content">
          <h1 className="producer-dashboard-title">Producer Dashboard</h1>
          <p className="producer-dashboard-subtitle">Overview of your listings, orders, and sustainability performance</p>

          <div className="producer-search-wrap">
            <IconSearch />
            <input
              type="search"
              className="producer-search-input"
              placeholder="Search listings, materials, or orders..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="producer-metrics">
            <button
              type="button"
              className={`producer-metric-card ${metricFilter === "ACTIVE" ? "producer-metric-card-active" : ""}`}
              onClick={() => setMetricFilter(metricFilter === "ACTIVE" ? null : "ACTIVE")}
              aria-pressed={metricFilter === "ACTIVE"}
              aria-label="Filter by Active listings"
            >
              <span className="producer-metric-badge producer-metric-badge-green">Active</span>
              <div className="producer-metric-icon"><IconDocList /></div>
              <div className="producer-metric-value">{metricsLoading ? "—" : metrics.active}</div>
              <div className="producer-metric-desc">Active</div>
            </button>
            <button
              type="button"
              className="producer-metric-card"
              onClick={() => setMetricFilter(null)}
              aria-label="Show all listings"
            >
              <span className="producer-metric-badge producer-metric-badge-green">Revenue</span>
              <div className="producer-metric-icon"><IconLeaf /></div>
              <div className="producer-metric-value">
                {metricsLoading ? "—" : "₦" + (metrics.totalRevenueNaira >= 1e6 ? (metrics.totalRevenueNaira / 1e6).toFixed(1) + "M" : metrics.totalRevenueNaira.toLocaleString("en-NG", { maximumFractionDigits: 0 }))}
              </div>
              <div className="producer-metric-desc">&nbsp;</div>
            </button>
            <button
              type="button"
              className={`producer-metric-card ${metricFilter === "PENDING" ? "producer-metric-card-active" : ""}`}
              onClick={() => setMetricFilter(metricFilter === "PENDING" ? null : "PENDING")}
              aria-pressed={metricFilter === "PENDING"}
              aria-label="Filter by Pending listings"
            >
              <span className="producer-metric-badge producer-metric-badge-gray">Pending</span>
              <div className="producer-metric-icon"><IconStarburst /></div>
              <div className="producer-metric-value">{metricsLoading ? "—" : metrics.pending}</div>
              <div className="producer-metric-desc">Pending</div>
            </button>
            <button
              type="button"
              className="producer-metric-card"
              onClick={() => setMetricFilter(null)}
              aria-label="Total tons"
            >
              <span className="producer-metric-badge producer-metric-badge-green">Tons</span>
              <div className="producer-metric-icon"><IconLeaf /></div>
              <div className="producer-metric-value">{metricsLoading ? "—" : metrics.totalTons.toFixed(1)} <span className="producer-metric-unit">Tons</span></div>
              <div className="producer-metric-desc">&nbsp;</div>
            </button>
          </div>

          <div className="producer-main-grid">
            <div className="producer-main-left">
              <section className="producer-actions-section">
                <h2 className="producer-actions-title">Producer Actions</h2>
                <p className="producer-actions-desc">Manage your waste materials and listing lifecycle.</p>
                <div className="producer-actions-btns">
                  <Link to="/seller/create-listing" className="btn btn-primary producer-action-btn">
                    <IconPlus /> Create Listing
                  </Link>
                  <Link to="/seller/offers" className="btn producer-action-btn-outline">
                    <IconEye /> View Offers
                  </Link>
                </div>
              </section>

              <section className="producer-listings-section">
                <div className="producer-listings-header">
                  <h2 className="producer-listings-title">Recent Listings</h2>
                  <Link to="/listings" className="producer-listings-viewall">View All</Link>
                </div>
                <div className="producer-table-wrap">
                  <table className="producer-table">
                    <thead>
                      <tr>
                        <th>MATERIAL</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentFiltered.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="producer-table-empty">No listings match your search.</td>
                        </tr>
                      ) : (
                        recentSlice.map((row, i) => (
                          <tr key={row.id || i}>
                            <td>{row.material}</td>
                            <td>{row.quantity}</td>
                            <td>{row.price}</td>
                            <td><span className={`producer-status producer-status-${(row.status || "").toLowerCase()}`}>{row.status}</span></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {recentFiltered.length > 5 && (
                  <p className="producer-listings-more">Showing 5 of {recentFiltered.length}</p>
                )}
              </section>
            </div>

            <div className="producer-main-right">
              <div className="producer-pulse-card">
                <div className="producer-pulse-header">
                  <span className="producer-pulse-icon"><IconBarChart /></span>
                  <h3 className="producer-pulse-title">Sustainability Pulse</h3>
                </div>
                <div className="producer-pulse-label">CO₂ SAVINGS (est.)</div>
                <div className="producer-pulse-value">
                  {metricsLoading ? "—" : (metrics.co2SavedKg >= 1000 ? (metrics.co2SavedKg / 1000).toFixed(1) + " t" : metrics.co2SavedKg.toFixed(1) + " kg")}
                  <span className="producer-pulse-unit"> total</span>
                </div>
                <div className="producer-pulse-bars" aria-hidden="true">
                  {(dashboardListings.length ? getPulseBarsFromListings(dashboardListings) : PULSE_BARS_DEFAULT).map((w, i) => (
                    <div key={i} className="producer-pulse-bar" style={{ height: `${Math.max(w, 4)}%` }} title={`${w.toFixed(0)}%`} />
                  ))}
                </div>
              </div>
              <div className="producer-facility-card">
                <h3 className="producer-facility-title">FACILITY MAP</h3>
                <div className="producer-facility-map">
                  <svg viewBox="0 0 200 200" className="producer-facility-radar" aria-hidden="true">
                    <defs>
                      <radialGradient id="facility-radar-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(34, 197, 94, 0.15)" />
                        <stop offset="100%" stopColor="transparent" />
                      </radialGradient>
                    </defs>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <circle key={i} cx="100" cy="100" r={20 + i * 25} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    ))}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                      const rad = (angle * Math.PI) / 180;
                      const x = 100 + 120 * Math.cos(rad);
                      const y = 100 + 120 * Math.sin(rad);
                      return <line key={i} x1="100" y1="100" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />;
                    })}
                    <path d="M100 58 L106 78 L100 88 L94 78 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="1" />
                  </svg>
                </div>
                <div className="producer-facility-name">Midwest Processing Hub</div>
                <div className="producer-facility-address">124 Industrial Way, Chicago IL</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
