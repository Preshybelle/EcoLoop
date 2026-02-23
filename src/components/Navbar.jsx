import { Link } from "react-router-dom";
import ecoLoopLogo from "../assets/brand/ecoloop-logo.png";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={ecoLoopLogo} alt="EcoLoop" />
      </Link>
      <nav className="navbar-links">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
        <a href="#about">About</a>
        <Link to="/marketplace">Marketplace</Link>
      </nav>
      <div className="navbar-actions">
        <Link to="/login" className="btn btn-outline">Sign in</Link>
        <Link to="/register" className="btn btn-primary">Sign up</Link>
      </div>
    </header>
  );
}

export default Navbar;
