import { useState } from "react";
import { Link } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import AvatarMenu from "../components/AvatarMenu";

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
);
const IconBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
const IconMessage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const IconOrder = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const IconDoc = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
);
const IconDollar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const IconGlobe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
const IconLeaf = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
);
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
);

function Stars({ value }) {
  const v = Math.min(5, Math.max(0, value));
  const full = Math.floor(v);
  const half = v % 1 >= 0.5;
  return (
    <span className="buyer-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= full || (i === full + 1 && half) ? "filled" : ""}><IconStar /></span>
      ))}
      <span className="buyer-stars-num">{value}</span>
    </span>
  );
}

const PENDING_PICKUPS = [
  { material: "Industrial Polyethylene (HDPE)", quantity: "1200 kg", seller: "GreenTech Manufacturing", rating: 4.5, location: "Tondo, Manila - 3.5 km" },
  { material: "Scrap Aluminum Mix", quantity: "900 kg", seller: "Metro Metals Corp", rating: 4.0, location: "Quezon - 5.8 km" },
  { material: "Recycled Cardboard Bales", quantity: "2.4 Tons", seller: "EcoPack Solutions", rating: 5.0, location: "Makati, Manila - 3.2 km" },
];

const RECOMMENDED = [
  { title: "HDPE Plastic Pellets", tag: "20% MORE", qty: "800 kg", price: "P24,000", seller: "PlantCycle Industries", rating: 4, location: "800 kg, Taguig - 4.9 km", co2: "~700 kg CO2 saved", img: "https://picsum.photos/seed/hdpe2/400/300" },
  { title: "Steel Scrap MIX", tag: "30% MORE", qty: "1500 kg", price: "P45,000", seller: "Industrial Metal Works", rating: 4, location: "Pasig Industrial Park - 6.1 km", co2: "~700 kg CO2 saved", img: "https://picsum.photos/seed/steel2/400/300" },
  { title: "Corrugated Cardboard", tag: "20% MORE", qty: "800 kg", price: "P12,000", seller: "EcoCycle Manila", rating: 3.5, location: "Mandaluyong City - 3.8 km", co2: "~180 kg CO2 saved", img: "https://picsum.photos/seed/card2/400/300" },
  { title: "Wood Pellets (Grade A)", tag: "70% MORE", qty: "150 pieces", price: "P22,500", seller: "LogistiPal", rating: 4, location: "Valenzuela Logistics Hub - 9.5 km", co2: "~450 kg CO2 saved", img: "https://picsum.photos/seed/wood2/400/300" },
];

const COMPARISON_MATERIALS = [
  { name: "HDPE", recycled: 28, virgin: 42 },
  { name: "Steel", recycled: 35, virgin: 55 },
  { name: "Cardboard", recycled: 15, virgin: 28 },
  { name: "Aluminum", recycled: 45, virgin: 72 },
  { name: "Glass", recycled: 12, virgin: 22 },
];

function matchesSearch(query, ...values) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return true;
  return values.some((v) => String(v || "").toLowerCase().includes(q));
}

const TAB_OVERVIEW = "overview";
const TAB_PICKUP_ROUTE = "pickup-route";

export default function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(TAB_OVERVIEW);

  const filteredPickups = PENDING_PICKUPS.filter((row) =>
    matchesSearch(searchQuery, row.material, row.quantity, row.seller, row.location)
  );
  const filteredRecommended = RECOMMENDED.filter((item) =>
    matchesSearch(searchQuery, item.title, item.qty, item.price, item.seller, item.location, item.co2)
  );
  const filteredComparison = COMPARISON_MATERIALS.filter((m) =>
    matchesSearch(searchQuery, m.name)
  );

  return (
    <div className="buyer-layout">
      <aside className="buyer-sidebar">
        <Link to="/" className="buyer-sidebar-logo">
          <img src={ecoLoopLogo} alt="Eco loop" />
        </Link>
        <nav className="buyer-sidebar-nav">
          <Link to="/buyer/dashboard" className="buyer-nav-item buyer-nav-item-active">
            <IconGrid /> <span>Dashboard</span>
          </Link>
          <Link to="/marketplace" className="buyer-nav-item">
            <IconBag /> <span>My Marketplace</span>
          </Link>
          <Link to="/buyer/messages" className="buyer-nav-item">
            <IconMessage /> <span>Messages</span>
          </Link>
          <Link to="/buyer/orders" className="buyer-nav-item">
            <IconOrder /> <span>Order</span>
          </Link>
          <Link to="/buyer/account" className="buyer-nav-item">
            <IconUser /> <span>Account Settings</span>
          </Link>
        </nav>
        <div className="buyer-progress">
          <div className="buyer-progress-label">PROGRESS LEVEL</div>
          <div className="buyer-progress-bar-wrap">
            <div className="buyer-progress-bar-inner">
              <span className="buyer-progress-tier">Tier 2: Gold</span>
              <div className="buyer-progress-fill" style={{ width: "82%" }} />
            </div>
          </div>
        </div>
      </aside>

      <div className="buyer-main">
        <header className="seller-topbar seller-topbar-gray seller-topbar-with-breadcrumb buyer-dashboard-topbar">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span className="breadcrumb-current">Dashboard</span>
          </nav>
          <div className="seller-topbar-right">
            <div className="buyer-search-wrap buyer-search-in-topbar">
              <IconSearch />
              <input
                type="search"
                placeholder="Search listings, materials, or orders..."
                className="buyer-search-input"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="seller-topbar-user">
              <span className="seller-topbar-user-name">{typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "Buyer") : "Buyer"}</span>
            </div>
            <AvatarMenu accountPath="/buyer/account" variant="seller-topbar" />
          </div>
        </header>

        <div className="buyer-stats">
          <Link to="/buyer/orders" className="buyer-stat-card buyer-stat-card-link">
            <div className="buyer-stat-icon buyer-stat-icon-blue">
              <IconDoc />
              <span className="buyer-stat-badge buyer-stat-badge-down">-1</span>
            </div>
            <div className="buyer-stat-title">Active Orders</div>
            <div className="buyer-stat-value">{String(PENDING_PICKUPS.length).padStart(2, "0")}</div>
            <div className="buyer-stat-meta">pending</div>
          </Link>
          <Link to="/buyer/orders" className="buyer-stat-card buyer-stat-card-link">
            <div className="buyer-stat-icon buyer-stat-icon-green">
              <IconDollar />
              <span className="buyer-stat-badge buyer-stat-badge-up">+12%</span>
            </div>
            <div className="buyer-stat-title">Total Spend</div>
            <div className="buyer-stat-value">P112,500</div>
          </Link>
          <Link to="/marketplace" className="buyer-stat-card buyer-stat-card-link">
            <div className="buyer-stat-icon buyer-stat-icon-purple">
              <IconGlobe />
              <span className="buyer-stat-badge buyer-stat-badge-up">+0.2t</span>
            </div>
            <div className="buyer-stat-title">Materials Acquired</div>
            <div className="buyer-stat-value">18.7</div>
            <div className="buyer-stat-meta">tons</div>
          </Link>
          <Link to="/buyer/dashboard#sustainability" className="buyer-stat-card buyer-stat-card-link">
            <div className="buyer-stat-icon buyer-stat-icon-leaf">
              <IconLeaf />
              <span className="buyer-stat-badge buyer-stat-badge-up">+850kg</span>
            </div>
            <div className="buyer-stat-title">CO2 Impact</div>
            <div className="buyer-stat-value">4.2</div>
            <div className="buyer-stat-meta">tons saved</div>
          </Link>
        </div>

        <div className="buyer-tabs">
          <button
            type="button"
            className={"buyer-tab " + (activeTab === TAB_OVERVIEW ? "buyer-tab-active" : "buyer-tab-outline")}
            onClick={() => setActiveTab(TAB_OVERVIEW)}
          >
            Overview
          </button>
          <button
            type="button"
            className={"buyer-tab " + (activeTab === TAB_PICKUP_ROUTE ? "buyer-tab-active" : "buyer-tab-outline")}
            onClick={() => setActiveTab(TAB_PICKUP_ROUTE)}
          >
            <IconPlus /> Create Pickup Route
          </button>
        </div>

        {activeTab === TAB_OVERVIEW && (
        <>
        <h3 className="buyer-section-title">Quick Actions</h3>
        <div className="buyer-quick-actions">
          <Link to="/marketplace" className="buyer-quick-card">
            <IconBag className="buyer-quick-icon buyer-quick-icon-green" />
            <span>Browse Marketplace</span>
          </Link>
          <Link to="/buyer/orders" className="buyer-quick-card">
            <IconBox className="buyer-quick-icon buyer-quick-icon-blue" />
            <span>My Orders</span>
          </Link>
          <Link to="/buyer/pickup-routes" className="buyer-quick-card">
            <IconMapPin className="buyer-quick-icon buyer-quick-icon-purple" />
            <span>Pickup Routes</span>
          </Link>
          <Link to="/buyer/saved-sellers" className="buyer-quick-card">
            <span className="buyer-quick-icon buyer-quick-icon-gold">★</span>
            <span>Saved Sellers</span>
          </Link>
        </div>

        <div className="buyer-two-col">
          <div className="buyer-pickups">
            <div className="buyer-pickups-header">
              <div>
                <h3 className="buyer-pickups-title">Pending Pickups</h3>
                <p className="buyer-pickups-desc">Track and manage your committed material pickups.</p>
              </div>
              <Link to="/buyer/orders" className="buyer-pickups-link">View All Orders</Link>
            </div>
            <div className="buyer-table-wrap">
              <table className="buyer-table">
                <thead>
                  <tr>
                    <th>MATERIAL</th>
                    <th>QUANTITY</th>
                    <th>SELLER</th>
                    <th>LOCATION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPickups.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="buyer-table-empty">
                        {searchQuery.trim() ? "No pending pickups match your search." : "No pending pickups."}
                      </td>
                    </tr>
                  ) : (
                    filteredPickups.map((row, i) => (
                      <tr key={i}>
                        <td>{row.material}</td>
                        <td>{row.quantity}</td>
                        <td>
                          <span className="buyer-table-seller">{row.seller}</span>
                          <Stars value={row.rating} />
                        </td>
                        <td>{row.location}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="buyer-right-col">
            <div id="sustainability" className="buyer-pulse-card">
              <h4 className="buyer-pulse-title"><IconLeaf /> Sustainability Pulse</h4>
              <div className="buyer-pulse-value">850 <span className="buyer-pulse-unit">kg</span></div>
              <div className="buyer-pulse-label">SAVED THIS MONTH</div>
              <div className="buyer-pulse-desc">18.7 tons from landfill</div>
              <div className="buyer-pulse-score-label">GREEN SCORE</div>
              <div className="buyer-pulse-score-value">82</div>
              <div className="buyer-pulse-score-bar">
                <div className="buyer-pulse-score-fill" style={{ width: "82%" }} />
              </div>
              <div className="buyer-pulse-chart">
                <div className="buyer-pulse-chart-bars">
                  {[40, 55, 45, 65, 70, 80, 82].map((h, i) => (
                    <div key={i} className="buyer-pulse-chart-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="buyer-pulse-chart-labels">
                  <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
                </div>
              </div>
            </div>
            <div className="buyer-supplier-card">
              <h4 className="buyer-supplier-title">Supplier Network</h4>
              <p className="buyer-supplier-desc">Proximity seller locations.</p>
              <div className="buyer-supplier-map">
                <img src="https://picsum.photos/seed/map/600/280" alt="Map" />
                <div className="buyer-supplier-pins" aria-hidden="true">
                  <span className="buyer-pin" style={{ top: "30%", left: "25%" }} />
                  <span className="buyer-pin" style={{ top: "45%", left: "50%" }} />
                  <span className="buyer-pin" style={{ top: "60%", left: "70%" }} />
                </div>
              </div>
              <div className="buyer-supplier-meta">Metro Manila Region</div>
              <div className="buyer-supplier-count">5 active suppliers within 10km</div>
            </div>
          </div>
        </div>

        <div className="buyer-recommended">
          <h3 className="buyer-section-title">Recommended for You</h3>
          <p className="buyer-section-desc">Based on your purchase history and preferences.</p>
          <div className="buyer-recommended-grid">
            {filteredRecommended.length === 0 ? (
              <p className="buyer-rec-empty">
                {searchQuery.trim() ? "No recommended items match your search." : "No recommendations yet."}
              </p>
            ) : (
              filteredRecommended.map((item, i) => (
                <Link key={i} to="/marketplace" className="buyer-rec-card">
                  <div className="buyer-rec-image-wrap">
                    <img src={item.img} alt="" />
                    <span className="buyer-rec-tag">{item.tag}</span>
                  </div>
                  <div className="buyer-rec-body">
                    <h4 className="buyer-rec-title">{item.title}</h4>
                    <div className="buyer-rec-qty-price">{item.qty} · {item.price}</div>
                    <div className="buyer-rec-seller">{item.seller} <Stars value={item.rating} /></div>
                    <div className="buyer-rec-location">{item.location}</div>
                    <div className="buyer-rec-co2">{item.co2}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="buyer-analytics">
          <h3 className="buyer-section-title">Spending Analytics</h3>
          <p className="buyer-section-desc">Track your costs and savings compared to virgin materials.</p>
          <div className="buyer-analytics-cards">
            <div className="buyer-analytics-card buyer-analytics-card-green">
              <IconDollar />
              <span>Total Savings P19,580</span>
              <small>vs virgin materials</small>
            </div>
            <div className="buyer-analytics-card buyer-analytics-card-blue">
              <span className="buyer-analytics-pct">%</span>
              <span>Avg. Cost Reduction 38%</span>
              <small>across all materials</small>
            </div>
            <div className="buyer-analytics-card buyer-analytics-card-purple">
              <IconBox />
              <span>Materials Sourced 18.7 t</span>
              <small>this month</small>
            </div>
          </div>
          <div className="buyer-chart-card">
            <h4 className="buyer-chart-title">Monthly Spending Trends</h4>
            <div className="buyer-chart-trends">
              <svg viewBox="0 0 400 120" className="buyer-trend-svg">
                <polyline points="0,100 50,85 100,90 150,70 200,55 250,45 300,50 350,40 400,25" fill="none" stroke="var(--green-primary)" strokeWidth="2"/>
                <polyline points="0,110 50,95 100,80 150,65 200,50 250,35 300,30 350,20 400,15" fill="none" stroke="#3b82f6" strokeWidth="2"/>
              </svg>
              <div className="buyer-chart-legend">
                <span className="buyer-legend-dot buyer-legend-green" /> Spending
                <span className="buyer-legend-dot buyer-legend-blue" /> Savings
              </div>
              <div className="buyer-chart-x-labels">
                <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
              </div>
            </div>
          </div>
            <div className="buyer-chart-card">
            <h4 className="buyer-chart-title">Price Comparison: Recycled vs Virgin Materials</h4>
            <div className="buyer-comparison">
              {filteredComparison.length === 0 ? (
                <p className="buyer-comparison-empty">
                  {searchQuery.trim() ? "No materials match your search." : "No comparison data."}
                </p>
              ) : (
                filteredComparison.map((m, i) => (
                <div key={i} className="buyer-comparison-row">
                  <span className="buyer-comparison-name">{m.name}</span>
                  <div className="buyer-comparison-bars">
                    <div className="buyer-comparison-bar-wrap">
                      <div className="buyer-comparison-bar buyer-comparison-recycled" style={{ width: `${(m.recycled / 80) * 100}%` }} />
                      <span className="buyer-comparison-val">{m.recycled} P/kg</span>
                    </div>
                    <div className="buyer-comparison-bar-wrap">
                      <div className="buyer-comparison-bar buyer-comparison-virgin" style={{ width: `${(m.virgin / 80) * 100}%` }} />
                      <span className="buyer-comparison-val">{m.virgin} P/kg</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="buyer-comparison-legend">
              <span><span className="buyer-legend-dot buyer-legend-green" /> Recycled P/kg</span>
              <span><span className="buyer-legend-dot buyer-legend-gray" /> Virgin P/kg</span>
            </div>
          </div>
        </div>
        </>
        )}

        {activeTab === TAB_PICKUP_ROUTE && (
          <div className="buyer-tab-content buyer-pickup-route-placeholder">
            <h3 className="buyer-section-title">Create Pickup Route</h3>
            <p className="buyer-section-desc">Plan a route to collect materials from multiple sellers in one trip.</p>
            <Link to="/buyer/pickup-routes" className="btn btn-primary buyer-pickup-route-btn">
              <IconMapPin /> Open Pickup Routes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
