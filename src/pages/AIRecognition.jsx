import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import placeholderBottle from "../assets/inventory/hdpe-plastic.png";
import { scanMaterialImage } from "../services/scanApi";

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
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
const IconCloudUpload = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);
const IconSpark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3z"/></svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const STEPS = [
  { num: 1, label: "Upload", completed: true },
  { num: 2, label: "Scan", current: true },
  { num: 3, label: "Quantity" },
  { num: 4, label: "Price" },
  { num: 5, label: "Review" },
];

const UPLOAD_STORAGE_KEY = "ecoloop_create_listing_upload";

function getFullNameAndInitials() {
  const fullName = typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "Producer") : "Producer";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (fullName.trim()[0] || "P").toUpperCase();
  return { fullName, initials };
}

export default function AIRecognition() {
  const { pathname } = useLocation();
  const isCreateListingFlow = pathname.includes("/seller/create-listing/scan");
  const fileInputRef = useRef(null);
  const [hasUpload, setHasUpload] = useState(true);
  const [previewUrl] = useState(placeholderBottle);
  const { fullName, initials } = getFullNameAndInitials();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(UPLOAD_STORAGE_KEY);
  });

  useEffect(() => {
    if (isCreateListingFlow && typeof window !== "undefined") {
      setUploadedImageUrl(sessionStorage.getItem(UPLOAD_STORAGE_KEY));
    }
  }, [isCreateListingFlow, pathname]);

  const handleZoneClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setHasUpload(true);
  };
  const handleRemove = () => setHasUpload(false);

  return (
    <div className="seller-layout ai-recognition-layout">
      <aside className="marketplace-sidebar ai-scan-sidebar">
        <Link to="/" className="marketplace-sidebar-logo">
          <img src={ecoLoopLogo} alt="Eco loop" />
        </Link>
        <nav className="marketplace-sidebar-nav">
          <Link to="/seller/dashboard" className="marketplace-nav-item">
            <IconGrid /> <span>Dashboard</span>
          </Link>
          <Link to="/seller/inventory" className="marketplace-nav-item">
            <IconBox /> <span>Inventory</span>
          </Link>
          <Link to="/listings" className="marketplace-nav-item">
            <IconList /> <span>Listings</span>
          </Link>
          <Link to="/seller/transactions" className="marketplace-nav-item">
            <IconArrows /> <span>Transactions</span>
          </Link>
          <Link to="/seller/confirm" className="marketplace-nav-item">
            <IconCheckCircle /> <span>Comfirm</span>
          </Link>
        </nav>
        <div className="ai-scan-storage">
          <div className="ai-scan-storage-label">Storage Limit</div>
          <div className="ai-scan-storage-bar-wrap">
            <div className="ai-scan-storage-bar" style={{ width: "65%" }} />
          </div>
          <div className="ai-scan-storage-text">650/1000 Tons</div>
        </div>
        <div className="marketplace-sidebar-footer">
          <Link to="/seller/account" className="marketplace-nav-item">
            <IconGear /> <span>Account Settings</span>
          </Link>
        </div>
      </aside>

      <div className="marketplace-main ai-recognition-main">
        <header className="ai-recognition-topbar">
          <nav className="ai-recognition-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="ai-recognition-breadcrumb-sep">&gt;</span>
            <span className="ai-recognition-breadcrumb-current">AI Recognition</span>
          </nav>
          <div className="ai-recognition-topbar-right">
            <button type="button" className="ai-recognition-icon-btn" aria-label="Notifications">
              <IconBell />
            </button>
            <div className="ai-recognition-user">
              <span className="ai-recognition-user-name">{fullName}</span>
            </div>
            <div className="marketplace-avatar marketplace-avatar-orange" aria-hidden="true">{initials}</div>
          </div>
        </header>

        <main className="ai-recognition-content">
          <h1 className="ai-recognition-title">AI Material Recognition</h1>
          <p className="ai-recognition-desc">
            Upload images of your recyclables. Our advanced neural network identifies material types and purity levels automatically for faster listing.
          </p>

          <div className="ai-recognition-stepper">
            {STEPS.map((step, i) => (
              <div key={step.num} className="ai-recognition-step">
                {step.num === 1 ? (
                  <Link to="/seller/create-listing" className="ai-recognition-step-link" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                    <div
                      className={
                        "ai-recognition-step-circle " +
                        (step.completed ? "ai-recognition-step-completed " : "") +
                        (step.current ? "ai-recognition-step-active " : "") +
                        (!step.completed && !step.current ? "ai-recognition-step-pending" : "")
                      }
                    >
                      {step.completed ? <IconCheck /> : step.num}
                    </div>
                    <span className={"ai-recognition-step-label " + (step.current ? "ai-recognition-step-label-active" : "")}>
                      {step.label}
                    </span>
                  </Link>
                ) : step.num === 3 ? (
                  <Link to="/seller/create-listing/material-details" className="ai-recognition-step-link" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                    <div
                      className={
                        "ai-recognition-step-circle " +
                        (step.completed ? "ai-recognition-step-completed " : "") +
                        (step.current ? "ai-recognition-step-active " : "") +
                        (!step.completed && !step.current ? "ai-recognition-step-pending" : "")
                      }
                    >
                      {step.completed ? <IconCheck /> : step.num}
                    </div>
                    <span className={"ai-recognition-step-label " + (step.current ? "ai-recognition-step-label-active" : "")}>
                      {step.label}
                    </span>
                  </Link>
                ) : step.num === 4 ? (
                  <Link to="/seller/create-listing/price" className="ai-recognition-step-link" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                    <div
                      className={
                        "ai-recognition-step-circle " +
                        (step.completed ? "ai-recognition-step-completed " : "") +
                        (step.current ? "ai-recognition-step-active " : "") +
                        (!step.completed && !step.current ? "ai-recognition-step-pending" : "")
                      }
                    >
                      {step.completed ? <IconCheck /> : step.num}
                    </div>
                    <span className={"ai-recognition-step-label " + (step.current ? "ai-recognition-step-label-active" : "")}>
                      {step.label}
                    </span>
                  </Link>
                ) : (
                  <>
                    <div
                      className={
                        "ai-recognition-step-circle " +
                        (step.completed ? "ai-recognition-step-completed " : "") +
                        (step.current ? "ai-recognition-step-active " : "") +
                        (!step.completed && !step.current ? "ai-recognition-step-pending" : "")
                      }
                    >
                      {step.completed ? <IconCheck /> : step.num}
                    </div>
                    <span className={"ai-recognition-step-label " + (step.current ? "ai-recognition-step-label-active" : "")}>
                      {step.label}
                    </span>
                  </>
                )}
                {i < STEPS.length - 1 && (
                  <div className={"ai-recognition-step-line " + (step.completed ? "ai-recognition-step-line-completed" : "")} />
                )}
              </div>
            ))}
          </div>

          <div className="ai-recognition-columns">
            <div className="ai-recognition-left">
              {isCreateListingFlow ? (
                uploadedImageUrl ? (
                  <div className="ai-recognition-current">
                    <div className="ai-recognition-current-header">
                      <span className="ai-recognition-current-dot" aria-hidden="true" />
                      <span className="ai-recognition-current-title">Material for AI scan</span>
                    </div>
                    <div className="ai-recognition-preview-wrap">
                      <img src={uploadedImageUrl} alt="Material from upload step" className="ai-recognition-preview-img" />
                      <span className="ai-recognition-preview-badge">1</span>
                    </div>
                  </div>
                ) : (
                  <div className="ai-recognition-no-upload">
                    <p className="ai-recognition-no-upload-text">No image from upload step.</p>
                    <p className="ai-recognition-no-upload-hint">Go back to Upload to add an image, then continue to Scan.</p>
                    <Link to="/seller/create-listing" className="btn btn-secondary ai-recognition-back-upload-btn">
                      ← Back to Upload
                    </Link>
                  </div>
                )
              ) : hasUpload ? (
                <div className="ai-recognition-current">
                  <div className="ai-recognition-current-header">
                    <span className="ai-recognition-current-dot" aria-hidden="true" />
                    <span className="ai-recognition-current-title">Current Upload</span>
                    <button type="button" className="ai-recognition-remove" onClick={handleRemove}>
                      Remove
                    </button>
                  </div>
                  <div className="ai-recognition-preview-wrap">
                    <img src={previewUrl} alt="Uploaded material" className="ai-recognition-preview-img" />
                    <span className="ai-recognition-preview-badge">1</span>
                  </div>
                </div>
              ) : (
                <div
                  className="ai-recognition-upload-zone"
                  onClick={handleZoneClick}
                  onKeyDown={(e) => e.key === "Enter" && handleZoneClick()}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload material image"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="ai-recognition-file-input"
                    onChange={handleFileChange}
                    aria-hidden
                  />
                  <IconCloudUpload className="ai-recognition-upload-icon" />
                  <h3 className="ai-recognition-upload-title">Upload Material Image</h3>
                  <p className="ai-recognition-upload-hint">Drag and drop your photos here, or click to browse files.</p>
                  <p className="ai-recognition-upload-types">SUPPORTS JPG, PNG UP TO 10MB</p>
                </div>
              )}
            </div>

            <div className="ai-recognition-right">
              <div className="ai-recognition-results-card">
                <h3 className="ai-recognition-results-title">
                  <IconSpark className="ai-recognition-results-icon" />
                  AI Detection Results
                </h3>
                {scanLoading && (
                  <div className="ai-recognition-scan-loading" aria-live="polite">
                    <span className="ai-recognition-scan-loading-text">Scanning...</span>
                  </div>
                )}
                {scanError && !scanLoading && (
                  <div className="ai-recognition-scan-error">
                    <p className="ai-recognition-scan-error-text">{scanError}</p>
                    {imageToScan && (
                      <button type="button" className="ai-recognition-scan-retry-btn" onClick={retryScan}>
                        Retry scan
                      </button>
                    )}
                  </div>
                )}
                {scanResult && !scanLoading && !scanError && (
                  <>
                    <div className="ai-recognition-field ai-recognition-field-highlight">
                      <span className="ai-recognition-field-label">Material Type</span>
                      <span className="ai-recognition-field-value">{scanResult.materialType}</span>
                    </div>
                    <div className="ai-recognition-field">
                      <span className="ai-recognition-field-label">{scanResult.subtype}</span>
                      <span className="ai-recognition-field-meta">Confidence Score: {scanResult.confidence}%</span>
                    </div>
                    <div className="ai-recognition-field ai-recognition-field-with-btn">
                      <div>
                        <span className="ai-recognition-field-label">Recycled</span>
                        <span className="ai-recognition-field-meta">Confidence Score: {scanResult.confidence}%</span>
                      </div>
                      <button type="button" className="ai-recognition-yes-btn">{scanResult.recycled ? "Yes" : "No"}</button>
                    </div>
                  </>
                )}
                {!scanLoading && !scanError && !scanResult && !imageToScan && (
                  <p className="ai-recognition-scan-placeholder">Upload or add an image to scan.</p>
                )}
                {!scanLoading && !scanError && !scanResult && imageToScan && (
                  <p className="ai-recognition-scan-placeholder">Waiting for results...</p>
                )}
              </div>
              {isCreateListingFlow ? (
                <div className="material-details-actions" style={{ marginTop: "1rem" }}>
                  <Link to="/seller/create-listing" className="material-details-back-btn">
                    ← Back
                  </Link>
                  <Link to="/seller/create-listing/material-details" className="btn btn-primary material-details-continue-btn">
                    Continue to details
                  </Link>
                </div>
              ) : (
                <Link to="/seller/create-listing" className="btn btn-primary ai-recognition-create-btn">
                  Create Listing
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
