import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";

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
const IconCamera = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
);
const IconFile = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
);
const IconLightbulb = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
);
const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

const STEPS = [
  { num: 1, label: "Upload" },
  { num: 2, label: "Scan" },
  { num: 3, label: "Quantity" },
  { num: 4, label: "Price" },
  { num: 5, label: "Review" },
];

function getFullNameAndInitials() {
  const fullName = typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "Producer") : "Producer";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (fullName.trim()[0] || "P").toUpperCase();
  return { fullName, initials };
}

const AI_SCAN_PATH = "/seller/create-listing/scan";

export default function CreateListing() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isImage, setIsImage] = useState(true);
  const [previewLoading, setPreviewLoading] = useState(false);
  const { fullName, initials } = getFullNameAndInitials();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPreviewUrl(null);
    const type = (file.type || "").toLowerCase();
    const isImageByType = type.startsWith("image/");
    const isImageByExt = /\.(jpe?g|png|gif|webp|bmp)$/i.test(file.name);
    const isImg = isImageByType || isImageByExt;
    setIsImage(isImg);

    if (isImg) {
      setPreviewLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewLoading(false);
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
          try {
            sessionStorage.setItem("ecoloop_create_listing_upload", reader.result);
          } catch (_) {}
        }
      };
      reader.onerror = () => {
        setPreviewLoading(false);
        setPreviewUrl(null);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewLoading(false);
    }
    e.target.value = "";
  };

  const clearFile = (e) => {
    e?.stopPropagation();
    setPreviewUrl(null);
    setFileName(null);
    setPreviewLoading(false);
    try {
      sessionStorage.removeItem("ecoloop_create_listing_upload");
    } catch (_) {}
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
        <header className="seller-topbar seller-topbar-gray">
          <p className="seller-topbar-subtitle" />
          <div className="seller-topbar-right">
            <button type="button" className="seller-topbar-icon-btn" aria-label="Notifications">
              <IconBell />
            </button>
            <div className="seller-topbar-user">
              <span className="seller-topbar-user-name">{fullName}</span>
            </div>
            <div className="seller-topbar-avatar seller-topbar-avatar-initials" aria-hidden="true">{initials}</div>
          </div>
        </header>

        <main className="create-listing-content">
          <h1 className="create-listing-title">Create New Listing</h1>
          <p className="create-listing-subtitle">Upload your material details to connect with verified recyclers.</p>

          <div className="create-listing-stepper">
            {STEPS.map((step, i) => (
              <div key={step.num} className="create-listing-step">
                {i === 1 ? (
                  <Link to={AI_SCAN_PATH} className="create-listing-step-link">
                    <div className={`create-listing-step-circle ${i === 0 ? "create-listing-step-circle-active" : ""}`}>
                      {step.num}
                    </div>
                    <span className={`create-listing-step-label ${i === 0 ? "create-listing-step-label-active" : ""}`}>
                      {step.label}
                    </span>
                  </Link>
                ) : i === 2 ? (
                  <Link to="/seller/create-listing/material-details" className="create-listing-step-link">
                    <div className={`create-listing-step-circle ${i === 0 ? "create-listing-step-circle-active" : ""}`}>
                      {step.num}
                    </div>
                    <span className={`create-listing-step-label ${i === 0 ? "create-listing-step-label-active" : ""}`}>
                      {step.label}
                    </span>
                  </Link>
                ) : (
                  <>
                    <div className={`create-listing-step-circle ${i === 0 ? "create-listing-step-circle-active" : ""}`}>
                      {step.num}
                    </div>
                    <span className={`create-listing-step-label ${i === 0 ? "create-listing-step-label-active" : ""}`}>
                      {step.label}
                    </span>
                  </>
                )}
                {i < STEPS.length - 1 && <div className="create-listing-step-line" />}
              </div>
            ))}
          </div>

          <div className="create-listing-card">
            <h2 className="create-listing-card-title">Step 1: Upload Material</h2>
            <div
              className="create-listing-upload-zone"
              onClick={() => !previewUrl && !fileName && fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && !previewUrl && !fileName && fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload image or file"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp,.pdf"
                className="create-listing-file-input"
                onChange={handleFileChange}
                aria-hidden
              />
              {previewLoading ? (
                <p className="create-listing-upload-text">Loading preview…</p>
              ) : previewUrl && isImage ? (
                <div className="create-listing-preview-inner">
                  <img src={previewUrl} alt="Upload preview" className="create-listing-preview-img create-listing-preview-img-in-box" />
                </div>
              ) : fileName && !isImage ? (
                <div className="create-listing-preview-file create-listing-preview-file-in-box">
                  <IconFile />
                  <span className="create-listing-preview-filename">{fileName}</span>
                </div>
              ) : (
                <>
                  <IconCamera />
                  <p className="create-listing-upload-text">Upload image of material</p>
                  <p className="create-listing-upload-hint">Supports JPG, PNG, PDF up to 10MB</p>
                </>
              )}
              <div className="create-listing-upload-zone-actions">
                <button type="button" className="create-listing-choose-btn" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                  <IconFile /> {previewUrl || fileName ? "Change file" : "Choose File"}
                </button>
                {(previewUrl || fileName) && (
                  <button type="button" className="create-listing-remove-btn" onClick={(e) => { e.stopPropagation(); clearFile(e); }}>
                    Remove
                  </button>
                )}
              </div>
            </div>
            <div className="create-listing-tips">
              <span className="create-listing-tips-icon">
                <IconLightbulb />
              </span>
              <p className="create-listing-tips-text">Tips for better visibility / Capture the material in natural lighting and show the scale.</p>
            </div>
          </div>

          <div className="create-listing-actions">
            <button
              type="button"
              className="btn btn-primary create-listing-dashboard-btn"
              onClick={() => navigate(AI_SCAN_PATH)}
            >
              Continue to AI Scan <IconArrowRight />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
