import { Link } from "react-router-dom";
import { useState } from "react";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";

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
const IconEllipsisV = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
);

const RECENT_LISTINGS = [
  { material: "Industrial Polyethylene (HDPE)", quantity: "1,200 kg", price: "$3,400.00", status: "ACTIVE" },
  { material: "Scrap Aluminum Mix", quantity: "500 kg", price: "$850.00", status: "PENDING" },
  { material: "Recycled Cardboard Bales", quantity: "2.4 Tons", price: "$1,200.00", status: "SOLD" },
  { material: "Mixed Glass Cullet", quantity: "800 kg", price: "$420.00", status: "ACTIVE" },
];

const PULSE_BARS = [35, 45, 40, 55, 65, 75, 90];

export default function ProducerDashboard() {
  const [newMessagesCount] = useState(3); // Replace with real data (e.g. from API) when available
  const fullName = typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "Producer") : "Producer";
  const initials = (() => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return (fullName.trim()[0] || "P").toUpperCase();
  })();

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
          <Link to="/seller/confirm" className="producer-nav-item">
            <IconCheckCircle /> <span>Confirm</span>
          </Link>
          <Link to="/seller/account" className="producer-nav-item">
            <IconGear /> <span>Account Settings</span>
          </Link>
        </nav>
        <div className="producer-level">
          <div className="producer-level-label">PRODUCER LEVEL</div>
          <div className="producer-level-tier">Tier 2: Gold</div>
          <div className="producer-level-bar-wrap">
            <div className="producer-level-bar" style={{ width: "85%" }} />
          </div>
        </div>
      </aside>

      <div className="seller-main-wrap">
        <header className="seller-topbar producer-dashboard-topbar">
          <p className="seller-topbar-subtitle" />
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
            <div className="seller-topbar-avatar seller-topbar-avatar-initials" aria-hidden="true">{initials}</div>
          </div>
        </header>

        <main className="producer-dashboard-content">
          <h1 className="producer-dashboard-title">Producer Dashboard</h1>
          <p className="producer-dashboard-subtitle">Overview of your listings, orders, and sustainability performance</p>

          <div className="producer-search-wrap">
            <IconSearch />
            <input type="search" className="producer-search-input" placeholder="Search listings, materials, or orders..." aria-label="Search" />
          </div>

          <div className="producer-metrics">
            <div className="producer-metric-card">
              <span className="producer-metric-badge producer-metric-badge-green">+4.5%</span>
              <div className="producer-metric-icon"><IconDocList /></div>
              <div className="producer-metric-value">24</div>
              <div className="producer-metric-desc">Active</div>
            </div>
            <div className="producer-metric-card">
              <span className="producer-metric-badge producer-metric-badge-green">+12%</span>
              <div className="producer-metric-icon"><IconLeaf /></div>
              <div className="producer-metric-value">$12,450.00</div>
              <div className="producer-metric-desc">&nbsp;</div>
            </div>
            <div className="producer-metric-card">
              <span className="producer-metric-badge producer-metric-badge-gray">New</span>
              <div className="producer-metric-icon"><IconStarburst /></div>
              <div className="producer-metric-value">08</div>
              <div className="producer-metric-desc">Pending</div>
            </div>
            <div className="producer-metric-card">
              <span className="producer-metric-badge producer-metric-badge-green">+2.1t</span>
              <div className="producer-metric-icon"><IconLeaf /></div>
              <div className="producer-metric-value">45.2 <span className="producer-metric-unit">Tons</span></div>
              <div className="producer-metric-desc">&nbsp;</div>
            </div>
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
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_LISTINGS.map((row, i) => (
                        <tr key={i}>
                          <td>{row.material}</td>
                          <td>{row.quantity}</td>
                          <td>{row.price}</td>
                          <td><span className={`producer-status producer-status-${row.status.toLowerCase()}`}>{row.status}</span></td>
                          <td><button type="button" className="producer-table-action" aria-label="Actions"><IconEllipsisV /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div className="producer-main-right">
              <div className="producer-pulse-card">
                <div className="producer-pulse-header">
                  <span className="producer-pulse-icon"><IconBarChart /></span>
                  <h3 className="producer-pulse-title">Sustainability Pulse</h3>
                </div>
                <div className="producer-pulse-label">CO2 SAVINGS</div>
                <div className="producer-pulse-value">12.4 <span className="producer-pulse-unit">kg/mo</span></div>
                <div className="producer-pulse-bars">
                  {PULSE_BARS.map((w, i) => (
                    <div key={i} className="producer-pulse-bar" style={{ height: `${w}%` }} />
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
