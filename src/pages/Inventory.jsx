import { Link } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";

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

const INVENTORY_TABS = [
  { id: "all", label: "All Items", count: 6, active: true },
  { id: "active", label: "Active Listings", count: 3 },
  { id: "drafts", label: "Saved Drafts", count: 1 },
  { id: "pending", label: "Pending Sales", count: 1 },
  { id: "completed", label: "Completed", count: 1 },
];

const INVENTORY_ITEMS = [
  { name: "Steel Scrap", status: "Active", weight: "500kg", price: "15,000", location: "Industrial Zone, Manila", listed: "Feb 10, 2026", views: 24, co2: "125 kg CO2", img: steelScrapImg },
  { name: "HDPE Plastic", status: "Active", weight: "200 kg", price: "8,000", location: "Makati Business District", listed: "Feb 12, 2026", views: 18, co2: "80 kg CO2", img: hdpePlasticImg },
  { name: "Cardboard Boxes", status: "Draft", weight: "150 kg", price: "3,000", location: "Quezon City Warehouse", listed: "Feb 13, 2026", views: 0, co2: "125 kg CO2", img: cardboardBoxesImg },
  { name: "Wood Pallets", status: "Active", weight: "80 kg", price: "12,000", location: "Pasig Logistics Hub", listed: "Feb 8, 2026", views: 32, co2: "200 kg CO2", img: woodPalletsImg },
  { name: "Glass Bottles", status: "Active", weight: "300 kg", price: "5,000", location: "BGC Commercial Area", listed: "Feb 5, 2026", views: 145, co2: "90 kg CO2", img: glassBottlesImg },
  { name: "E-Waste Components", status: "Draft", weight: "120 kg", price: "7,000", location: "Taguig tech pack", listed: "Feb 11, 2026", views: 15, co2: "100 kg CO2", img: cardboardBoxesImg },
];

export default function Inventory() {
  const { fullName, initials } = getFullNameAndInitials();
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
        <header className="seller-topbar producer-dashboard-topbar">
          <p className="seller-topbar-subtitle" />
          <div className="seller-topbar-right">
            <button type="button" className="seller-topbar-icon-btn" aria-label="Notifications">
              <IconBell />
            </button>
            <div className="seller-topbar-user">
              <span className="seller-topbar-user-name">{fullName}</span>
            </div>
            <div className="seller-topbar-avatar seller-topbar-avatar-initials inventory-avatar" aria-hidden="true">{initials}</div>
          </div>
        </header>

        <main className="inventory-content">
          <h1 className="inventory-title">Inventory</h1>
          <p className="inventory-subtitle">Track and manage your listed materials, saved items, and completed sales.</p>

          <div className="inventory-toolbar">
            <div className="inventory-search-wrap">
              <IconSearch />
              <input type="search" className="inventory-search-input" placeholder="Search by material or location..." aria-label="Search" />
            </div>
            <button type="button" className="inventory-filters-btn">
              <IconFilter /> More Filters
            </button>
          </div>

          <div className="inventory-tabs">
            {INVENTORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`inventory-tab ${tab.active ? "inventory-tab-active" : ""}`}
              >
                {tab.label}
                <span className={`inventory-tab-badge ${tab.active ? "inventory-tab-badge-active" : ""}`}>{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="inventory-grid">
            {INVENTORY_ITEMS.map((item, i) => (
              <article key={i} className="inventory-card">
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
                  <div className="inventory-card-price">P{item.price}</div>
                  <div className="inventory-card-meta">
                    <span className="inventory-card-meta-item"><IconMapPin /> {item.location}</span>
                    <span className="inventory-card-meta-item"><IconCalendar /> Listed {item.listed}</span>
                    <span className="inventory-card-meta-item"><IconEye /> {item.views} views</span>
                    <span className="inventory-card-meta-item"><IconCO2 /> {item.co2}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
