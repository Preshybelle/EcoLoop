import { Link } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={ecoLoopLogo} alt="EcoLoop" />
      </Link>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <a href="#challenge">Solution</a>
        <a href="#services">Marketplace</a>
      </nav>
      <div className="navbar-actions">
        <Link to="/login" className="btn btn-outline">Sign in</Link>
        <Link to="/register" className="btn btn-primary">Sign up</Link>
      </div>
    </header>
  );
}

export default Navbar;
