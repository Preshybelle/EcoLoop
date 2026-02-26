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
const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
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

export default function BuyerOrders() {
  return (
    <div className="buyer-layout">
      <aside className="buyer-sidebar">
        <Link to="/" className="buyer-sidebar-logo">
          <img src={ecoLoopLogo} alt="EcoLoop" />
        </Link>
        <nav className="buyer-sidebar-nav">
          <Link to="/buyer/dashboard" className="buyer-nav-item">
            <IconGrid /> <span>Dashboard</span>
          </Link>
          <Link to="/marketplace" className="buyer-nav-item">
            <IconBag /> <span>My Marketplace</span>
          </Link>
          <Link to="/buyer/messages" className="buyer-nav-item">
            <IconMessage /> <span>Messages</span>
          </Link>
          <Link to="/buyer/orders" className="buyer-nav-item buyer-nav-item-active">
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
            <Link to="/buyer/dashboard">Dashboard</Link>
            <span className="breadcrumb-sep">&gt;</span>
            <span className="breadcrumb-current">Orders</span>
          </nav>
          <div className="seller-topbar-right">
            <div className="seller-topbar-user">
              <span className="seller-topbar-user-name">{typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "Buyer") : "Buyer"}</span>
            </div>
            <AvatarMenu accountPath="/buyer/account" variant="seller-topbar" />
          </div>
        </header>

        <div className="buyer-orders-page">
          <h1 className="buyer-orders-title">My Orders</h1>
          <p className="buyer-orders-desc">Track and manage your committed material pickups and order history.</p>

          <div className="buyer-pickups">
            <div className="buyer-pickups-header">
              <div>
                <h3 className="buyer-pickups-title">Pending Pickups</h3>
                <p className="buyer-pickups-desc">Your active orders awaiting pickup or delivery.</p>
              </div>
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
                  {PENDING_PICKUPS.map((row, i) => (
                    <tr key={i}>
                      <td>{row.material}</td>
                      <td>{row.quantity}</td>
                      <td>
                        <span className="buyer-table-seller">{row.seller}</span>
                        <Stars value={row.rating} />
                      </td>
                      <td>{row.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="buyer-orders-summary">
            <div className="buyer-orders-summary-card">
              <span className="buyer-orders-summary-label">Total Spend (all time)</span>
              <span className="buyer-orders-summary-value">P112,500</span>
            </div>
            <div className="buyer-orders-summary-card">
              <span className="buyer-orders-summary-label">Active orders</span>
              <span className="buyer-orders-summary-value">{PENDING_PICKUPS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
