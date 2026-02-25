import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";

const ALLOW_NEGOTIATION_KEY = "ecoloop_create_listing_allow_negotiation";

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
);
const IconPlusSquare = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
);
const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);
const IconBarChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
);
const IconGear = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);
const IconInfo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconSpark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3z"/></svg>
);
const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);
const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
);
const IconChartTrend = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const IconChartBar = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
);
const IconShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

const STEPS = [
  { num: 1, label: "Upload", completed: true },
  { num: 2, label: "Scan", completed: true },
  { num: 3, label: "Quantity", completed: true },
  { num: 4, label: "Price", current: true },
  { num: 5, label: "Review" },
];

export default function CreateListingSetPrice() {
  const [allowNegotiation, setAllowNegotiation] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    return sessionStorage.getItem(ALLOW_NEGOTIATION_KEY) === "true";
  });

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(ALLOW_NEGOTIATION_KEY, allowNegotiation ? "true" : "false");
    }
  }, [allowNegotiation]);

  return (
    <div className="seller-layout seller-layout-create">
      <aside className="seller-sidebar seller-sidebar-white">
        <Link to="/" className="seller-sidebar-logo">
          <img src={ecoLoopLogo} alt="EcoLoop" />
        </Link>
        <nav className="seller-sidebar-nav">
          <Link to="/seller/dashboard" className="seller-nav-item">
            <IconGrid /> <span>Dashboard</span>
          </Link>
          <Link to="/seller/create-listing" className="seller-nav-item seller-nav-item-btn-active">
            <IconPlusSquare /> <span>Create Listing</span>
          </Link>
          <Link to="/listings" className="seller-nav-item">
            <IconBox /> <span>Inventory</span>
          </Link>
        </nav>
        <div className="seller-sidebar-footer">
          <Link to="/seller/account" className="seller-nav-item">
            <IconGear /> <span>Account Settings</span>
          </Link>
        </div>
      </aside>

      <div className="seller-main-wrap seller-main-wrap-gray">
        <header className="seller-topbar seller-topbar-gray seller-topbar-with-breadcrumb">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/listings">Marketplace</Link>
            <span className="breadcrumb-sep">&gt;</span>
            <Link to="/seller/create-listing">New Listing</Link>
            <span className="breadcrumb-sep">&gt;</span>
            <span className="breadcrumb-current">Set Price</span>
          </nav>
          <div className="seller-topbar-right">
            <button type="button" className="seller-topbar-icon-btn" aria-label="Notifications">
              <IconBell />
            </button>
            <div className="set-price-help">
              <span className="set-price-help-text">Help Center</span>
              <IconInfo />
            </div>
          </div>
        </header>

        <main className="create-listing-content set-price-content">
          <h1 className="create-listing-title">Create New Listing Set Price</h1>
          <p className="create-listing-subtitle">Define the price for your material or use the suggested range based on real-time market data.</p>

          <div className="create-listing-stepper material-details-stepper set-price-stepper">
            {STEPS.map((step, i) => (
              <div key={step.num} className="create-listing-step">
                <div
                  className={"create-listing-step-circle material-details-step-circle " +
                    (step.completed ? "material-details-step-completed " : "") +
                    (step.current ? "material-details-step-current " : "") +
                    (!step.completed && !step.current ? "material-details-step-pending" : "")}
                >
                  {step.completed ? <IconCheck /> : step.num}
                </div>
                <span className={"create-listing-step-label " + (step.current ? "create-listing-step-label-active" : "")}>
                  {step.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={"create-listing-step-line " + (step.completed ? "material-details-line-completed" : "material-details-line-pending")}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="set-price-market-card">
            <div className="set-price-market-bg">
              <IconChartTrend />
            </div>
            <div className="set-price-market-header">
              <span className="set-price-market-title">
                <IconSpark /> AI-Generated Market Range
              </span>
              <button type="button" className="set-price-market-info" aria-label="More info">
                <IconInfo />
              </button>
            </div>
            <p className="set-price-market-range">₦150,000 – ₦180,000 <span className="set-price-market-unit">per ton</span></p>
            <p className="set-price-market-note">Current demand is 12% higher than last month for this material type.</p>
          </div>

          <div className="create-listing-card set-price-card">
            <label className="material-details-label">Set Your Asking Price</label>
            <div className="set-price-input-row">
              <span className="set-price-currency">₦</span>
              <input
                type="text"
                className="set-price-input"
                placeholder="0.00"
                defaultValue="0.00"
                aria-label="Asking price"
              />
              <div className="material-details-select-wrap set-price-unit-wrap">
                <select className="material-details-select set-price-unit-select" aria-label="Unit">
                  <option>per ton</option>
                </select>
                <IconChevronDown />
              </div>
            </div>
            <p className="material-details-hint set-price-hint">You can also accept bids by setting this as a &quot;Starting Price&quot;.</p>
            <label className="set-price-checkbox-wrap">
              <input
                type="checkbox"
                className="set-price-checkbox"
                checked={allowNegotiation}
                onChange={(e) => setAllowNegotiation(e.target.checked)}
                aria-label="Allow potential buyers to negotiate or send counter-offers"
              />
              <span className="set-price-checkbox-label">Allow potential buyers to negotiate or send counter-offers</span>
            </label>
          </div>

          <div className="material-details-actions">
            <Link to="/seller/create-listing/material-details" className="material-details-back-btn">
              <IconArrowLeft /> Back
            </Link>
            <Link to="/seller/create-listing/review" className="btn btn-primary material-details-continue-btn">
              Continue to review <IconArrowRight />
            </Link>
          </div>

          <div className="set-price-callouts">
            <div className="set-price-callout set-price-callout-blue">
              <IconChartBar />
              <p>Sellers using suggested ranges close deals 40% faster on EcoLoop.</p>
            </div>
            <div className="set-price-callout set-price-callout-orange">
              <IconShield />
              <p>Payment is held in escrow until logistics are confirmed by both parties.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
