import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import AvatarMenu from "../components/AvatarMenu";
import listingPlaceholder from "../assets/inventory/hdpe-plastic.png";
import { createListingManual, createListingAi } from "../services/listingsApi";
import {
  getQuantityTonsFromStorage,
  getMaterialTypeFromStorage,
  getCo2Savings,
  getRecyclabilityPercent,
  STORAGE_KEYS,
} from "../utils/environmentalImpact";
import { DRAFT_SAVED } from "../utils/successMessages";

function getFullNameAndInitials() {
  const fullName = typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "Producer") : "Producer";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (fullName.trim()[0] || "P").toUpperCase();
  return { fullName, initials };
}

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
);
const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);
const IconList = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
);
const IconScan = () => (
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
const IconLeaf = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconDoc = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
const IconSpark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3z"/></svg>
);
const IconRecycle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16l-4-4m0 0l4-4m-4 4h10a4 4 0 014 4v1M17 8l4 4m0 0l-4 4m4-4H7a4 4 0 01-4-4V7"/></svg>
);
const IconMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const IconHelp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const IconArrowUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
);

const STEPS = [
  { num: 1, label: "Upload", completed: true },
  { num: 2, label: "Scan", completed: true },
  { num: 3, label: "Quantity", completed: true },
  { num: 4, label: "Price", completed: true },
  { num: 5, label: "Review", completed: true },
];

const NOTES_STORAGE_KEY = "ecoloop_create_listing_notes";
const DRAFTS_STORAGE_KEY = "ecoloop_inventory_drafts";
const DEFAULT_NOTES = "Material is already sorted and baled. Pick-up required between 8 AM and 4 PM. Loading assistance available on site with forklift. Please confirm vehicle size before dispatch.";

function getSavedDrafts() {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(DRAFTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDraftToInventory(draft) {
  const drafts = getSavedDrafts();
  drafts.unshift({ ...draft, id: `draft-${Date.now()}`, savedAt: new Date().toISOString() });
  localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
}

export default function CreateListingReview() {
  const { fullName, initials } = getFullNameAndInitials();
  const navigate = useNavigate();
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState(() => {
    if (typeof sessionStorage === "undefined") return DEFAULT_NOTES;
    return sessionStorage.getItem(NOTES_STORAGE_KEY) || DEFAULT_NOTES;
  });
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesEditDraft, setNotesEditDraft] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);

  const startEditingNotes = () => {
    setNotesEditDraft(specialInstructions);
    setIsEditingNotes(true);
  };
  const saveNotes = () => {
    const trimmed = notesEditDraft.trim() || DEFAULT_NOTES;
    setSpecialInstructions(trimmed);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(NOTES_STORAGE_KEY, trimmed);
    setIsEditingNotes(false);
  };
  const cancelEditingNotes = () => {
    setNotesEditDraft(specialInstructions);
    setIsEditingNotes(false);
  };

  const handleSaveDraft = () => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("ecoloop_create_listing_draft_saved_at", new Date().toISOString());
    }
    const allowNegotiation = typeof sessionStorage !== "undefined" && sessionStorage.getItem("ecoloop_create_listing_allow_negotiation") === "true";
    const quantity = typeof sessionStorage !== "undefined" ? sessionStorage.getItem(STORAGE_KEYS.quantity) || String(quantityTons) : String(quantityTons);
    const unit = typeof sessionStorage !== "undefined" ? sessionStorage.getItem(STORAGE_KEYS.unit) || "tons" : "tons";
    const draft = {
      title: "Grade A Plastic Scrap",
      description: specialInstructions,
      quantityDisplay,
      quantityTons,
      quantity,
      unit,
      materialType: materialType || "PLASTIC",
      price: 165000,
      currency: "NGN",
      allowNegotiation,
    };
    if (typeof localStorage !== "undefined") {
      saveDraftToInventory(draft);
    }
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const quantityTons = getQuantityTonsFromStorage();
  const materialType = getMaterialTypeFromStorage();
  const { display: co2Display } = getCo2Savings(quantityTons);
  const recyclabilityPercent = getRecyclabilityPercent(materialType);
  const quantityDisplay = quantityTons >= 1
    ? `${quantityTons.toFixed(1)} Tons`
    : `${Math.round(quantityTons * 1000)} kg`;

  const priceFromStorage = typeof sessionStorage !== "undefined"
    ? parseFloat(String(sessionStorage.getItem("ecoloop_create_listing_price") || "").replace(/[^0-9.]/g, "")) || 165000
    : 165000;
  const weightKg = Math.round(quantityTons * 1000) || 5000;
  const titleFromFlow = materialType ? `${materialType.trim() || "Material"} Scrap` : "Grade A Plastic Scrap";

  /** Publish listing to the marketplace only when the user clicks "Publish Listing". No auto-publish on load or navigation. */
  const handlePublish = async (e) => {
    e.preventDefault();
    setPublishError("");
    setPublishing(true);
    try {
      const image = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("ecoloop_create_listing_upload") : null;
      const allowNegotiation = typeof sessionStorage !== "undefined" && sessionStorage.getItem("ecoloop_create_listing_allow_negotiation") === "true";
      const title = titleFromFlow;
      const description = specialInstructions;
      const price = priceFromStorage;
      const currency = "NGN";
      const state = "lagos";
      const materialTypeStr = (materialType || "PLASTIC").trim().toUpperCase();

      let data;
      if (image && image.startsWith("data:")) {
        data = await createListingAi({ image, title, description, price, currency, state, allowNegotiation });
      } else {
        data = await createListingManual({
          title,
          description,
          materialType: materialTypeStr,
          weight: weightKg,
          price,
          currency,
          state,
          allowNegotiation,
        });
      }
      const listingId = data.listing?.id ?? data.id ?? data.listingId;
      const listing = data.listing ?? data;
      navigate("/seller/listing-published", {
        state: {
          listingId,
          listing: { ...listing, allowNegotiation },
          allowNegotiation,
        },
      });
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : "Failed to publish listing");
    } finally {
      setPublishing(false);
    }
  };
  return (
    <div className="seller-layout seller-layout-create seller-layout-review">
      <aside className="seller-sidebar seller-sidebar-green seller-sidebar-with-plan">
        <Link to="/" className="seller-sidebar-logo">
          <img src={ecoLoopLogo} alt="EcoLoop" />
        </Link>
        <nav className="seller-sidebar-nav">
          <Link to="/seller/dashboard" className="seller-nav-item">
            <IconGrid /> <span>Dashboard</span>
          </Link>
          <Link to="/seller/inventory" className="seller-nav-item">
            <IconBox /> <span>Inventory</span>
          </Link>
          <Link to="/listings" className="seller-nav-item seller-nav-item-btn-active">
            <IconList /> <span>Listings</span>
          </Link>
          <Link to="/seller/transactions" className="seller-nav-item">
            <IconArrows /> <span>Transactions</span>
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
            <span className="breadcrumb-current">Review</span>
          </nav>
          <div className="seller-topbar-right">
            <span className="review-topbar-leaf" aria-hidden="true">
              <IconLeaf />
            </span>
            <div className="seller-topbar-user">
              <span className="seller-topbar-user-name">{fullName}</span>
            </div>
            <AvatarMenu accountPath="/seller/account" variant="seller-topbar" />
          </div>
        </header>

        <main className="create-listing-content review-content">
          <h1 className="create-listing-title">Review & Publish Listing</h1>
          <p className="create-listing-subtitle">Confirm all details. The listing will only go live on the marketplace when you click &quot;Publish Listing&quot; below.</p>

          {publishError && (
            <div className="register-form-errors review-publish-error" role="alert">
              {publishError}
            </div>
          )}
          {draftSaved && (
            <p className="review-draft-saved-msg" role="status">
              {DRAFT_SAVED}
            </p>
          )}
          <div className="review-progress-row">
            <span className="review-step-label">STEP 5 OF 5: REVIEW</span>
            <span className="review-percent">100% Complete</span>
          </div>
          <div className="create-listing-stepper material-details-stepper review-stepper">
            {STEPS.map((step, i) => {
              const isCurrent = step.num === 5;
              return (
                <div key={step.num} className="create-listing-step">
                  <div
                    className={
                      "create-listing-step-circle material-details-step-circle " +
                      (isCurrent ? "review-step-current" : "review-step-completed")
                    }
                  >
                    {isCurrent ? <span className="review-step-dot" /> : <IconCheck />}
                  </div>
                  <span
                    className={
                      "create-listing-step-label " +
                      (isCurrent ? "create-listing-step-label-active" : "review-step-label-completed")
                    }
                  >
                    {step.label.toUpperCase()}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div className="create-listing-step-line material-details-line-completed" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="review-card review-listing-card">
            <div className="review-listing-image-wrap">
              <img src={listingPlaceholder} alt="Grade A Plastic Scrap" className="review-listing-image" />
            </div>
            <div className="review-listing-details">
              <button type="button" className="review-listing-menu-btn" aria-label="More options">
                <IconMenu />
              </button>
              <h2 className="review-listing-name">Grade A Plastic Scrap</h2>
              <p className="review-listing-type">Industrial Polymer • Recyclable</p>
              <div className="review-listing-meta">
                <div className="review-listing-meta-item">
                  <span className="review-listing-meta-label">QUANTITY</span>
                  <span className="review-listing-meta-value">{quantityDisplay}</span>
                </div>
                <div className="review-listing-meta-item">
                  <span className="review-listing-meta-label">PRICING</span>
                  <span className="review-listing-meta-value">₦165,000 / ton</span>
                </div>
              </div>
            </div>
          </div>

          <section className="review-section">
            <div className="review-section-header">
              <span className="review-section-title">
                <IconDoc className="review-section-icon" />
                SPECIAL INSTRUCTIONS
              </span>
              {!isEditingNotes ? (
                <button type="button" className="review-edit-notes" onClick={startEditingNotes}>
                  EDIT NOTES
                </button>
              ) : null}
            </div>
            {isEditingNotes ? (
              <div className="review-instructions-edit">
                <textarea
                  className="review-instructions-textarea"
                  value={notesEditDraft}
                  onChange={(e) => setNotesEditDraft(e.target.value)}
                  placeholder="Add special instructions for buyers (pick-up, loading, contact, etc.)"
                  rows={4}
                  aria-label="Special instructions"
                />
                <div className="review-instructions-edit-actions">
                  <button type="button" className="btn btn-primary review-edit-save-btn" onClick={saveNotes}>
                    Save notes
                  </button>
                  <button type="button" className="review-edit-cancel-btn" onClick={cancelEditingNotes}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="review-instructions-box">
                {specialInstructions}
              </div>
            )}
          </section>

          <section className="review-section">
            <h3 className="review-section-title review-section-title-main">
              <IconSpark className="review-section-icon" />
              ENVIRONMENTAL IMPACT INSIGHTS
            </h3>
            <div className="review-impact-cards">
              <div className="review-impact-card">
                <div className="review-impact-icon review-impact-icon-green">
                  <IconLeaf />
                </div>
                <span className="review-impact-label">CO₂ SAVINGS</span>
                <span className="review-impact-value">{co2Display}</span>
              </div>
              <div className="review-impact-card">
                <div className="review-impact-icon review-impact-icon-green">
                  <IconRecycle />
                </div>
                <span className="review-impact-label">RECYCLABILITY</span>
                <span className="review-impact-value">{recyclabilityPercent}%</span>
              </div>
            </div>
          </section>

          <div className="material-details-actions review-actions">
            <Link to="/seller/create-listing/price" className="material-details-back-btn">
              <IconHelp /> Back to Pricing
            </Link>
            <button
              type="button"
              className="btn btn-secondary review-save-draft-btn"
              onClick={handleSaveDraft}
              disabled={publishing}
            >
              Save Draft
            </button>
            <button
              type="button"
              className="btn btn-primary material-details-continue-btn review-publish-btn"
              onClick={handlePublish}
              disabled={publishing}
            >
              <IconArrowUp /> {publishing ? "Publishing…" : "Publish Listing"}
            </button>
          </div>

          <p className="review-disclaimer">
            BY PUBLISHING, YOU AGREE TO ECOLOOP'S SELLER GUIDELINES AND CONFIRM THAT ALL MATERIAL SPECIFICATIONS PROVIDED ARE ACCURATE AND REPRESENT THE ACTUAL WASTE QUALITY.
          </p>
        </main>
      </div>
    </div>
  );
}
