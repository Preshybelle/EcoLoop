import { Link } from "react-router-dom";
import cardImg from "../assets/img2.svg";

function LandingPageCard1() {
  return (
    <section className="hero">
      <img src={cardImg} alt="" className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <span className="hero-badge">Transforming Industrial Waste Management</span>
        <h1 className="hero-title">
          Turn Industrial Waste Into Revenue<br />
          <span className="hero-title-brand">EcoLoop</span>
        </h1>
        <p className="hero-desc">
          EcoLoop connects SME factories across Africa with verified buyers who turn
          your metal scraps, plastic remnants, and wood offcuts into valuable
          resources while reducing environmental impact.
        </p>
        <div className="hero-cta">
          <a href="#challenge" className="btn btn-primary">Learn more</a>
          <Link to="/register" className="btn btn-outline-light">Sign up</Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>2,500+</strong>
            <span>Tons Recycled</span>
          </div>
          <div className="hero-stat">
            <strong>N48M</strong>
            <span>Revenue Generated</span>
          </div>
          <div className="hero-stat">
            <strong>5,200</strong>
            <span>Tons CO<sub>2</sub> Saved</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPageCard1;
