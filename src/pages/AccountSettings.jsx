import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import { getListings } from "../services/listingsApi";
import { getProducerLevelFromListings } from "../utils/producerLevel";
import { getFullNameAndInitials } from "../utils/userDisplay";
import Avatar from "../components/Avatar";

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
const IconPerson = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const IconBuilding = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>
);
const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const IconCameraSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
);

const ACCOUNT_SUB_NAV = [
  { id: "profile", label: "Profile", icon: IconPerson, active: true },
  { id: "business", label: "Business Info", icon: IconBuilding, active: false },
  { id: "notifications", label: "Notifications", icon: IconBell, active: false },
  { id: "privacy", label: "Privacy & Security", icon: IconLock, active: false },
];

const DEFAULT_LEVEL = { tierLabel: "Tier 1: Bronze", progressPercent: 0 };

export default function AccountSettings() {
  const { fullName, initials } = getFullNameAndInitials();
  const [activeSub, setActiveSub] = useState("profile");
  const [formFullName, setFormFullName] = useState(() =>
    typeof window !== "undefined" ? (localStorage.getItem("ecoloop_fullName") || "") : ""
  );
  const [email, setEmail] = useState("john.doe@greentech.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [bio, setBio] = useState("");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("UTC+1 (WAT)");
  const [currency, setCurrency] = useState("NGN");
  const [producerLevel, setProducerLevel] = useState(DEFAULT_LEVEL);

  useEffect(() => {
    let cancelled = false;
    const base = typeof import.meta !== "undefined" && import.meta.env?.VITE_SCAN_API_URL ? String(import.meta.env.VITE_SCAN_API_URL).replace(/\/$/, "") : "";
    const token = typeof window !== "undefined" && window.localStorage?.getItem("ecoloop_token");
    if (!base || !token) return;
    getListings()
      .then((res) => {
        if (cancelled) return;
        const list = res.listings && Array.isArray(res.listings) ? res.listings : [];
        setProducerLevel(getProducerLevelFromListings(list));
      })
      .catch(() => { if (!cancelled) setProducerLevel(DEFAULT_LEVEL); });
    return () => { cancelled = true; };
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (formFullName.trim()) localStorage.setItem("ecoloop_fullName", formFullName.trim());
  };

  return (
    <div className="seller-layout producer-dashboard-layout account-settings-layout">
      <aside className="producer-sidebar">
        <Link to="/" className="producer-sidebar-logo">
          <img src={ecoLoopLogo} alt="Eco loop" />
        </Link>
        <nav className="producer-sidebar-nav">
          <Link to="/seller/dashboard" className="producer-nav-item">
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
          <Link to="/seller/account" className="producer-nav-item producer-nav-item-active">
            <IconGear /> <span>Account Settings</span>
          </Link>
        </nav>
        <div className="producer-level">
          <div className="producer-level-label">PRODUCER LEVEL</div>
          <div className="producer-level-tier">{producerLevel.tierLabel}</div>
          <div className="producer-level-bar-wrap">
            <div className="producer-level-bar" style={{ width: `${producerLevel.progressPercent}%` }} />
          </div>
        </div>
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
              <span className="seller-topbar-user-role">Waste Producer</span>
            </div>
            <Avatar variant="seller-topbar" />
          </div>
        </header>

        <main className="account-settings-main">
          <h1 className="account-settings-title">Account Settings</h1>
          <p className="account-settings-subtitle">Manage your profile, business info, and preferences</p>

          <div className="account-settings-content">
            <nav className="account-settings-subnav" aria-label="Account sections">
              {ACCOUNT_SUB_NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`account-settings-subnav-item ${activeSub === item.id ? "account-settings-subnav-item-active" : ""}`}
                  onClick={() => setActiveSub(item.id)}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="account-settings-panel">
              <form className="account-settings-form" onSubmit={handleSave}>
                <section className="account-settings-section">
                  <h2 className="account-settings-section-title">Personal Information</h2>
                  <div className="account-settings-profile-row">
                    <div className="account-settings-avatar-wrap">
                      <Avatar variant="account-settings" />
                      <span className="account-settings-avatar-camera" aria-hidden="true">
                        <IconCameraSmall />
                      </span>
                    </div>
                    <div className="account-settings-avatar-actions">
                      <button type="button" className="account-settings-btn-upload">Upload Photo</button>
                      <button type="button" className="account-settings-btn-remove">Remove</button>
                      <p className="account-settings-avatar-hint">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>
                  <div className="account-settings-fields">
                    <label className="account-settings-field">
                      <span className="account-settings-field-label">Full Name</span>
                      <input
                        type="text"
                        className="account-settings-input"
                        value={formFullName}
                        onChange={(e) => setFormFullName(e.target.value)}
                        placeholder="John Doe"
                      />
                    </label>
                    <div className="account-settings-field">
                      <span className="account-settings-field-label">User Role</span>
                      <span className="account-settings-role-link">Waste Producer</span>
                    </div>
                    <div className="account-settings-field account-settings-field-with-badge">
                      <span className="account-settings-field-label">Email Address</span>
                      <span className="account-settings-input-wrap">
                        <input
                          type="email"
                          className="account-settings-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="account-settings-verified">
                          <IconCheck /> Verified
                        </span>
                      </span>
                    </div>
                    <div className="account-settings-field account-settings-field-with-badge">
                      <span className="account-settings-field-label">Phone Number</span>
                      <span className="account-settings-input-wrap">
                        <input
                          type="tel"
                          className="account-settings-input"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <span className="account-settings-verified">
                          <IconCheck /> Verified
                        </span>
                      </span>
                    </div>
                    <label className="account-settings-field">
                      <span className="account-settings-field-label">Bio/Description (Optional)</span>
                      <textarea
                        className="account-settings-textarea"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell buyers about yourself and your business..."
                        rows={4}
                      />
                      <span className="account-settings-field-hint">Maximum 500 characters</span>
                    </label>
                  </div>
                </section>

                <section className="account-settings-section">
                  <h2 className="account-settings-section-title">Language & Region</h2>
                  <div className="account-settings-fields">
                    <label className="account-settings-field">
                      <span className="account-settings-field-label">Language</span>
                      <span className="account-settings-select-wrap">
                        <select
                          className="account-settings-select"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <option>English</option>
                          <option>French</option>
                          <option>Spanish</option>
                        </select>
                        <IconChevronDown />
                      </span>
                    </label>
                    <label className="account-settings-field">
                      <span className="account-settings-field-label">Timezone</span>
                      <span className="account-settings-select-wrap">
                        <select
                          className="account-settings-select"
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                        >
                          <option>UTC+1 (WAT)</option>
                          <option>UTC (GMT)</option>
                          <option>UTC-5 (EST)</option>
                        </select>
                        <IconChevronDown />
                      </span>
                    </label>
                    <label className="account-settings-field">
                      <span className="account-settings-field-label">Currency</span>
                      <span className="account-settings-select-wrap">
                        <select
                          className="account-settings-select"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option>NGN</option>
                          <option>USD</option>
                          <option>EUR</option>
                        </select>
                        <IconChevronDown />
                      </span>
                    </label>
                  </div>
                </section>

                <div className="account-settings-actions">
                  <button type="submit" className="account-settings-btn-save">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
