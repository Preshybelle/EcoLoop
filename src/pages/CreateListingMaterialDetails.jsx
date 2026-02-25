import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import { STORAGE_KEYS } from "../utils/environmentalImpact";
import AvatarMenu from "../components/AvatarMenu";

function getFullNameAndInitials() {
  const fullName = typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "Producer") : "Producer";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (fullName.trim()[0] || "P").toUpperCase();
  return { fullName, initials };
}

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
);
const IconPlusSquare = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
);
const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);
const IconBarChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
);
const IconGear = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);
const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
);

const STEPS = [
  { num: 1, label: "Upload", completed: true },
  { num: 2, label: "Scan", completed: true },
  { num: 3, label: "Quantity", current: true },
  { num: 4, label: "Price" },
  { num: 5, label: "Review" },
];

export default function CreateListingMaterialDetails() {
  const { fullName, initials } = getFullNameAndInitials();
  const [materialType, setMaterialType] = useState(() =>
    typeof sessionStorage !== "undefined" ? sessionStorage.getItem(STORAGE_KEYS.materialType) || "" : ""
  );
  const [quantity, setQuantity] = useState(() =>
    typeof sessionStorage !== "undefined" ? sessionStorage.getItem(STORAGE_KEYS.quantity) || "" : ""
  );
  const [unit, setUnit] = useState(() =>
    typeof sessionStorage !== "undefined" ? sessionStorage.getItem(STORAGE_KEYS.unit) || "tons" : "tons"
  );

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      if (materialType !== undefined) sessionStorage.setItem(STORAGE_KEYS.materialType, materialType);
    }
  }, [materialType]);
  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      if (quantity !== undefined) sessionStorage.setItem(STORAGE_KEYS.quantity, quantity);
    }
  }, [quantity]);
  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      if (unit !== undefined) sessionStorage.setItem(STORAGE_KEYS.unit, unit);
    }
  }, [unit]);

  return (
    <div className="seller-layout seller-layout-create">
      <aside className="seller-sidebar seller-sidebar-white seller-sidebar-with-plan">
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
        <div className="seller-sidebar-plan">
          <div className="seller-sidebar-plan-label">PRODUCER PLAN</div>
          <div className="seller-sidebar-plan-bar-wrap">
            <div className="seller-sidebar-plan-bar" style={{ width: "85%" }} />
          </div>
          <div className="seller-sidebar-plan-text">85% of monthly limit used</div>
        </div>
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
            <span className="breadcrumb-current">Material Details</span>
          </nav>
          <div className="seller-topbar-right">
            <button type="button" className="seller-topbar-icon-btn" aria-label="Notifications">
              <IconBell />
            </button>
            <div className="seller-topbar-user">
              <span className="seller-topbar-user-name">{fullName}</span>
            </div>
            <AvatarMenu accountPath="/seller/account" variant="seller-topbar" />
          </div>
        </header>

        <main className="create-listing-content material-details-content">
          <h1 className="create-listing-title">Create New Listing Material Details</h1>
          <p className="create-listing-subtitle">Provide detailed information about your material.</p>

          <div className="create-listing-stepper material-details-stepper">
            {STEPS.map((step, i) => (
              <div key={step.num} className="create-listing-step">
                {step.num === 1 ? (
                  <Link to="/seller/create-listing" className="create-listing-step-link">
                    <div className={`create-listing-step-circle material-details-step-circle ${step.completed ? "material-details-step-completed" : ""}`}>
                      {step.completed ? <IconCheck /> : step.num}
                    </div>
                    <span className="create-listing-step-label">{step.label}</span>
                  </Link>
                ) : step.num === 2 ? (
                  <Link to="/seller/create-listing/scan" className="create-listing-step-link">
                    <div className={`create-listing-step-circle material-details-step-circle ${step.completed ? "material-details-step-completed" : ""}`}>
                      {step.completed ? <IconCheck /> : step.num}
                    </div>
                    <span className="create-listing-step-label">{step.label}</span>
                  </Link>
                ) : step.num === 4 ? (
                  <Link to="/seller/create-listing/price" className="create-listing-step-link">
                    <div className={`create-listing-step-circle material-details-step-circle ${step.current ? "material-details-step-current" : ""} ${!step.completed && !step.current ? "material-details-step-pending" : ""}`}>
                      {step.completed ? <IconCheck /> : step.num}
                    </div>
                    <span className={`create-listing-step-label ${step.current ? "create-listing-step-label-active" : ""}`}>{step.label}</span>
                  </Link>
                ) : (
                  <>
                    <div
                      className={`create-listing-step-circle material-details-step-circle ${
                        step.completed ? "material-details-step-completed" : ""
                      } ${step.current ? "material-details-step-current" : ""} ${
                        !step.completed && !step.current ? "material-details-step-pending" : ""
                      }`}
                    >
                      {step.completed ? <IconCheck /> : step.num}
                    </div>
                    <span className={`create-listing-step-label ${step.current ? "create-listing-step-label-active" : ""}`}>{step.label}</span>
                  </>
                )}
                {i < STEPS.length - 1 && (
                  <div className={`create-listing-step-line ${step.completed ? "material-details-line-completed" : "material-details-line-pending"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="create-listing-card material-details-card">
            <div className="material-details-field">
              <label className="material-details-label">Material Type</label>
              <input
                type="text"
                className="material-details-input"
                placeholder="e.g., Polyethylene (PE)"
                aria-label="Material type"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
              />
            </div>
            <div className="material-details-field">
              <label className="material-details-label">Quantity Available</label>
              <div className="material-details-quantity-row">
                <input
                  type="text"
                  className="material-details-input"
                  placeholder="e.g., 500"
                  aria-label="Quantity available"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <div className="material-details-select-wrap material-details-unit-wrap">
                  <select
                    className="material-details-select material-details-unit-select"
                    aria-label="Unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="tons">tons</option>
                  </select>
                  <IconChevronDown />
                </div>
              </div>
              <p className="material-details-hint">Minimum listing requirement is 100kg</p>
            </div>
            <div className="material-details-field">
              <label className="material-details-label material-details-label-optional">
                Notes (Optional)
                <span className="material-details-optional-tag">OPTIONAL</span>
              </label>
              <textarea
                className="material-details-textarea"
                placeholder="Describe the condition, packaging, or purity of the waste..."
                rows={4}
                aria-label="Notes (optional)"
              />
            </div>
          </div>

          <div className="material-details-actions">
            <Link to="/seller/create-listing/scan" className="material-details-back-btn">
              <IconArrowLeft /> Back
            </Link>
            <Link to="/seller/create-listing/price" className="btn btn-primary material-details-continue-btn">
              Continue <IconArrowRight />
            </Link>
          </div>

          <p className="material-details-support">
            Need help with your listing? <a href="/support" className="material-details-support-link">Contact EcoLoop Support</a>
          </p>
        </main>
      </div>
    </div>
  );
}
