import { Link } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import imgHDPE from "../assets/services/hdpe.png";

function getFullNameAndInitials() {
  const fullName = typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "User") : "User";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (fullName.trim()[0] || "U").toUpperCase();
  return { fullName, initials };
}

// Marketplace listing images (place in public/marketplace/): aluminum.png, cardboard-bales.png, pet-bottles.png
const IMG = (name) => `${import.meta.env.BASE_URL}marketplace/${name}`;

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
);
const IconPlusSquare = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
);
const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);
const IconShoppingBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
const IconChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
);
const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);
const IconGear = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const IconUserGear = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><path d="M12 12v2"/><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const IconMapPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

function StarRating({ value }) {
  const full = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;
  return (
    <span className="marketplace-stars" aria-label={`${value} stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={"marketplace-star " + (i <= full ? "filled" : i === full + 1 && hasHalf ? "half" : "")}>
          ★
        </span>
      ))}
      <span className="marketplace-rating-num">({value})</span>
    </span>
  );
}

const FILTERS = [
  { id: "all", label: "All Materials" },
  { id: "plastics", label: "Plastics" },
  { id: "metals", label: "Metals", active: true },
  { id: "paper", label: "Paper & Cardboard" },
];

const LISTINGS = [
  {
    id: 1,
    title: "Industrial Polyethylene (HDPE)",
    img: imgHDPE,
    price: "₦36,000",
    co2: "180 kg CO₂ saved",
    quantity: "1200 kg",
    grade: "Virgin Grade",
    condition: "Excellent",
    seller: "GreenTech Manufacturing",
    rating: 5.0,
    location: "Industrial Zone, Lagos",
    distance: "2.5 km",
    listed: "2 days ago",
  },
  {
    id: 2,
    title: "Scrap Aluminum Mix",
    img: IMG("aluminum.png"),
    price: "₦17,500",
    co2: "95 kg CO₂ saved",
    quantity: "500 kg",
    grade: "Mixed Grade",
    condition: "Good",
    seller: "Metro Metals Corp",
    rating: 4.0,
    location: "Ikeja Industrial",
    distance: "5.8 km",
    listed: "5 hours ago",
  },
  {
    id: 3,
    title: "Recycled Cardboard Bales",
    img: IMG("cardboard-bales.png"),
    price: "₦48,000",
    co2: "320 kg CO₂ saved",
    quantity: "2.4 Tons",
    grade: "Grade A",
    condition: "Excellent",
    seller: "EcoPack Solutions",
    rating: 5.0,
    location: "Victoria Island",
    distance: "3.2 km",
    listed: "1 day ago",
  },
  {
    id: 4,
    title: "PET Plastic Bottles",
    img: IMG("pet-bottles.png"),
    price: "₦24,000",
    co2: "240 kg CO₂ saved",
    quantity: "800 kg",
    grade: "Food Grade",
    condition: "Very Good",
    seller: "CleanStream Industries",
    rating: 5.0,
    location: "Lekki Phase 1",
    distance: "7.1 km",
    listed: "3 hours ago",
  },
];

export default function Marketplace() {
  const { fullName, initials } = getFullNameAndInitials();
  return (
    <div className="seller-layout marketplace-layout">
      <aside className="marketplace-sidebar">
        <Link to="/" className="marketplace-sidebar-logo">
          <img src={ecoLoopLogo} alt="Eco loop" />
        </Link>
        <nav className="marketplace-sidebar-nav">
          <Link to="/seller/dashboard" className="marketplace-nav-item">
            <IconGrid /> <span>Dashboard</span>
          </Link>
          <Link to="/seller/create-listing" className="marketplace-nav-item">
            <IconPlusSquare /> <span>Create Listing</span>
          </Link>
          <Link to="/seller/inventory" className="marketplace-nav-item">
            <IconBox /> <span>Inventory</span>
          </Link>
          <Link to="/marketplace" className="marketplace-nav-item marketplace-nav-item-active">
            <IconShoppingBag /> <span>Marketplace</span>
          </Link>
          <Link to="/seller/orders" className="marketplace-nav-item">
            <IconCart /> <span>Orders</span>
          </Link>
        </nav>
        <div className="marketplace-sidebar-footer">
          <Link to="/seller/account" className="marketplace-nav-item">
            <IconUserGear /> <span>Account Settings</span>
          </Link>
        </div>
      </aside>

      <div className="marketplace-main">
        <header className="marketplace-topbar">
          <div className="marketplace-topbar-user">
            <span className="marketplace-user-name">{fullName}</span>
          </div>
          <button type="button" className="marketplace-topbar-icon" aria-label="Notifications">
            <IconBell />
          </button>
          <div className="marketplace-avatar marketplace-avatar-orange" aria-hidden="true">{initials}</div>
        </header>

        <main className="marketplace-content">
          <h1 className="marketplace-title">Marketplace</h1>
          <p className="marketplace-desc">Discover available materials from nearby sellers</p>

          <div className="marketplace-search-row">
            <div className="marketplace-search-wrap">
              <IconSearch />
              <input type="search" placeholder="Search by material type or seller name..." className="marketplace-search-input" aria-label="Search" />
            </div>
            <div className="marketplace-filters">
              {FILTERS.map((f) => (
                <button key={f.id} type="button" className={"marketplace-filter-pill " + (f.active ? "marketplace-filter-pill-active" : "")}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <p className="marketplace-count">Showing 6 listings</p>

          <div className="marketplace-grid">
            {LISTINGS.map((item) => (
              <article key={item.id} className="marketplace-card">
                <div className="marketplace-card-image-wrap">
                  <img src={item.img} alt="" className="marketplace-card-image" />
                  <span className="marketplace-card-price">{item.price}</span>
                  <span className="marketplace-card-co2">{item.co2}</span>
                </div>
                <div className="marketplace-card-body">
                  <h2 className="marketplace-card-title">{item.title}</h2>
                  <p className="marketplace-card-quantity">{item.quantity}</p>
                  <ul className="marketplace-card-details">
                    <li>Grade: {item.grade}</li>
                    <li>Condition: {item.condition}</li>
                  </ul>
                  <div className="marketplace-card-seller">
                    <span className="marketplace-card-seller-name">{item.seller}</span>
                    <StarRating value={item.rating} />
                    <span className="marketplace-card-location">
                      <IconMapPin /> {item.location} • {item.distance}
                    </span>
                    <span className="marketplace-card-listed">{item.listed}</span>
                  </div>
                  <Link to="/marketplace/contact" className="btn btn-primary marketplace-card-btn">
                    Contact Seller
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
