import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";
import { registerUser } from "../services/authApi";
import { setAuthSession } from "../utils/auth";

const IconPerson = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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

const initialErrors = { fullName: "", email: "", password: "", confirmPassword: "", agreeTerms: "", userType: "" };

/** Map raw API/backend messages to user-friendly UI messages */
function getUserFriendlyMessage(rawMessage, field) {
  const msg = (rawMessage || "").toLowerCase();
  // Field-specific mappings
  if (field === "email" || msg.includes("email")) {
    if (msg.includes("already") || msg.includes("exists") || msg.includes("taken")) return "This email is already registered. Please sign in or use a different email.";
    if (msg.includes("invalid") || msg.includes("valid")) return "Please enter a valid email address.";
  }
  if (field === "name" || msg.includes("name")) {
    if (msg.includes("required")) return "Full name is required.";
    if (msg.includes("length") || msg.includes("short")) return "Please enter your full name.";
  }
  if (field === "password" || msg.includes("password")) {
    if (msg.includes("match") || msg.includes("confirm")) return "Passwords do not match.";
    if (msg.includes("length") || msg.includes("6") || msg.includes("minimum")) return "Password must be at least 6 characters.";
    if (msg.includes("uppercase") || msg.includes("capital")) return "Password must include at least one capital letter.";
    if (msg.includes("lowercase") || msg.includes("lower")) return "Password must include at least one lowercase letter.";
    if (msg.includes("special") || msg.includes("symbol") || msg.includes("character")) return "Password must include at least one special character (e.g. ! @ # $).";
    if (msg.includes("required")) return "Password is required.";
  }
  if (field === "confirmPassword") return "Passwords do not match. Please confirm your password.";
  if (field === "role" || msg.includes("role")) return "Please select whether you are a Buyer or Seller/Producer.";
  if (msg.includes("terms")) return "You must agree to the Terms and Conditions.";
  // Generic API/status mappings
  if (msg.includes("network") || msg.includes("fetch")) return "Unable to connect. Please check your internet connection and try again.";
  if (msg.includes("409") || msg.includes("conflict")) return "This email is already registered. Please sign in or use a different email.";
  if (msg.includes("400") || msg.includes("bad request")) return "Please check your details and try again.";
  if (msg.includes("500") || msg.includes("server")) return "Something went wrong on our end. Please try again in a moment.";
  if (msg.includes("403") || msg.includes("forbidden")) return "Registration is not allowed. Please contact support if this continues.";
  return "Something went wrong. Please check your details and try again.";
}

function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const next = { ...initialErrors };
    if (!fullName.trim()) next.fullName = "Full name is required.";
    if (!email.trim()) next.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (!userType) next.userType = "Please select Buyer or Seller/Producer.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    else if (!/[A-Z]/.test(password)) next.password = "Password must include at least one capital letter.";
    else if (!/[a-z]/.test(password)) next.password = "Password must include at least one lowercase letter.";
    else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) next.password = "Password must include at least one special character (e.g. ! @ # $).";
    if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) next.confirmPassword = "Passwords do not match.";
    if (!agreeTerms) next.agreeTerms = "You must agree to the Terms and Conditions.";
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const name = fullName.trim();
      const type = userType === "buyer" ? "buyer" : "seller";
      const username = name.toLowerCase().replace(/\s+/g, "");
      const data = await registerUser({
        name,
        email: email.trim(),
        password,
        confirmPassword,
        userType: type,
        username: username || email.trim().toLowerCase().split("@")[0],
        termsAccepted: agreeTerms,
      });
      setAuthSession(data.token, data.user);
      if (type === "buyer") {
        navigate("/buyer/dashboard");
      } else {
        navigate("/seller/dashboard");
      }
    } catch (err) {
      const rawMessage = err instanceof Error ? err.message : "Registration failed.";
      setApiError(getUserFriendlyMessage(rawMessage));
      if (err.details && Array.isArray(err.details)) {
        const next = { ...initialErrors };
        err.details.forEach((d) => {
          const field = d.field;
          const friendlyMsg = getUserFriendlyMessage(d.message || "", field);
          if (field === "name") next.fullName = friendlyMsg;
          else if (field === "email") next.email = friendlyMsg;
          else if (field === "password") next.password = friendlyMsg;
          else if (field === "confirmPassword") next.confirmPassword = friendlyMsg;
          else if (field === "role") next.userType = friendlyMsg;
        });
        setErrors((prev) => ({ ...prev, ...next }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="register-page">
        <div className="auth-card-container">
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
        </div>

        <div className="auth-card-container">
          <div className="register-page-right">
            <div className="register-card">
          <h2 className="register-card-title">Create Account</h2>
          <p className="register-card-subtitle">Join EcoLoop today</p>

          <form className="register-form" onSubmit={handleSubmit} noValidate>
            {(Object.values(errors).some(Boolean) || apiError) && (
              <div className="register-form-errors" role="alert">
                {apiError || "Please correct the errors below and try again."}
              </div>
            )}
            <label className="register-field">
              <span className="register-field-label">Full Name</span>
              <span className="register-input-wrap">
                <span className="register-input-icon" aria-hidden="true"><IconPerson /></span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setErrors((err) => ({ ...err, fullName: "" })); setApiError(""); }}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "register-fullName-error" : undefined}
                />
              </span>
              {errors.fullName && <span id="register-fullName-error" className="register-field-error">{errors.fullName}</span>}
            </label>

            <label className="register-field">
              <span className="register-field-label">Email Address</span>
              <span className="register-input-wrap">
                <span className="register-input-icon" aria-hidden="true"><IconEnvelope /></span>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((err) => ({ ...err, email: "" })); }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "register-email-error" : undefined}
                />
              </span>
              {errors.email && <span id="register-email-error" className="register-field-error">{errors.email}</span>}
            </label>

            <div className="register-field">
              <span className="register-field-label">I am a...</span>
              <div className="register-type-toggle">
                <button
                  type="button"
                  className={`register-type-btn ${userType === "buyer" ? "register-type-btn-active" : ""}`}
                  onClick={() => { setUserType("buyer"); setErrors((err) => ({ ...err, userType: "" })); }}
                >
                  Buyer
                </button>
                <button
                  type="button"
                  className={`register-type-btn ${userType === "seller" ? "register-type-btn-active" : ""}`}
                  onClick={() => { setUserType("seller"); setErrors((err) => ({ ...err, userType: "" })); }}
                >
                  Seller/Producer
                </button>
              </div>
              {errors.userType && <span className="register-field-error">{errors.userType}</span>}
            </div>

            <div className="register-field">
              <span className="register-field-label">Password</span>
              <p className="register-password-hint" aria-live="polite">
                Must include: a capital letter, a lowercase letter, and a special character (e.g. ! @ # $).
              </p>
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
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((err) => ({ ...err, password: "" })); }}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "register-password-error" : undefined}
                />
              </span>
              {errors.password && <span id="register-password-error" className="register-field-error">{errors.password}</span>}
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
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setErrors((err) => ({ ...err, confirmPassword: "" })); }}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "register-confirmPassword-error" : undefined}
                />
              </span>
              {errors.confirmPassword && <span id="register-confirmPassword-error" className="register-field-error">{errors.confirmPassword}</span>}
            </div>

            <label className="register-field register-terms-wrap">
              <input
                type="checkbox"
                name="agreeTerms"
                className="register-terms-checkbox"
                aria-describedby="register-terms-desc"
                checked={agreeTerms}
                onChange={(e) => { setAgreeTerms(e.target.checked); setErrors((err) => ({ ...err, agreeTerms: "" })); }}
                aria-invalid={!!errors.agreeTerms}
              />
              <span id="register-terms-desc" className="register-terms-label">
                I agree to the <Link to="/terms" className="register-terms-link">Terms and Conditions</Link>
              </span>
            </label>
            {errors.agreeTerms && <span className="register-field-error register-field-error-checkbox">{errors.agreeTerms}</span>}

            <button type="submit" className="register-submit" disabled={submitting}>
              {submitting ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="register-signin">
            Already have an account? <Link to="/login" className="register-signin-link">Sign In</Link>
          </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
