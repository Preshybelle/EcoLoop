import { useState } from "react";
import { Link } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";

const IconPerson = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconBuilding = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M8 10h.01M8 14h.01M16 14h.01" />
  </svg>
);
const IconEnvelope = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconLockOpen = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
  </svg>
);

function Register() {
  const [userType, setUserType] = useState("seller");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="register-page">
      <div className="register-page-left">
        <Link to="/" className="register-logo">
          <img src={ecoLoopLogo} alt="EcoLoop" />
        </Link>
        <div className="register-hero">
          <h1 className="register-headline">Turn Waste into Opportunity</h1>
          <p className="register-desc">
            Connect, trade, and grow sustainably with verified eco-businesses. Join the world's most trusted circular economy marketplace.
          </p>
        </div>
        <p className="register-footer">
          © 2026 EcoLoop Inc. • <Link to="/privacy">Privacy Policy</Link>
        </p>
      </div>

      <div className="register-page-right">
        <div className="register-card">
          <h2 className="register-card-title">Create Account</h2>
          <p className="register-card-subtitle">Join EcoLoop today</p>

          <form className="register-form" onSubmit={(e) => e.preventDefault()}>
            <label className="register-field">
              <span className="register-field-label">Full Name</span>
              <span className="register-input-wrap">
                <span className="register-input-icon" aria-hidden="true"><IconPerson /></span>
                <input type="text" name="fullName" placeholder="John Doe" />
              </span>
            </label>

            <label className="register-field">
              <span className="register-field-label">Business Name</span>
              <span className="register-input-wrap">
                <span className="register-input-icon" aria-hidden="true"><IconBuilding /></span>
                <input type="text" name="businessName" placeholder="Eco Solutions Ltd" />
              </span>
            </label>

            <label className="register-field">
              <span className="register-field-label">Email Address</span>
              <span className="register-input-wrap">
                <span className="register-input-icon" aria-hidden="true"><IconEnvelope /></span>
                <input type="email" name="email" placeholder="john@example.com" />
              </span>
            </label>

            <div className="register-field">
              <span className="register-field-label">I am a...</span>
              <div className="register-type-toggle">
                <button
                  type="button"
                  className={`register-type-btn ${userType === "buyer" ? "register-type-btn-active" : ""}`}
                  onClick={() => setUserType("buyer")}
                >
                  Buyer
                </button>
                <button
                  type="button"
                  className={`register-type-btn ${userType === "seller" ? "register-type-btn-active" : ""}`}
                  onClick={() => setUserType("seller")}
                >
                  Seller/Producer
                </button>
              </div>
            </div>

            <div className="register-field">
              <span className="register-field-label">Password</span>
              <span className="register-input-wrap">
                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassword((p) => !p);
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IconLockOpen /> : <IconLock />}
                </button>
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </span>
            </div>

            <div className="register-field">
              <span className="register-field-label">Confirm Password</span>
              <span className="register-input-wrap">
                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowConfirmPassword((p) => !p);
                  }}
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <IconLockOpen /> : <IconLock />}
                </button>
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </span>
            </div>

            <button type="submit" className="register-submit">Create Account</button>
          </form>

          <p className="register-signin">
            Already have an account? <Link to="/login" className="register-signin-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
