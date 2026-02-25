import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cardImg from "../assets/img2.svg";

const HERO_STATS_FALLBACK = {
  tonsRecycled: 2500,
  revenueNaira: 48_000_000,
  co2SavedTons: 5200,
};

function formatRevenueNaira(n) {
  if (n >= 1e6) return "N" + (n / 1e6).toFixed(0) + "M";
  if (n >= 1e3) return "N" + (n / 1e3).toFixed(0) + "K";
  return "N" + n.toLocaleString();
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function LandingPageCard1() {
  const [stats, setStats] = useState(HERO_STATS_FALLBACK);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const base = typeof import.meta !== "undefined" && import.meta.env?.VITE_SCAN_API_URL
      ? String(import.meta.env.VITE_SCAN_API_URL).replace(/\/$/, "")
      : "";
    if (!base) {
      setStatsLoading(false);
      return;
    }
    fetch(`${base}/api/v1/public/stats`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Not found"))))
      .then((data) => {
        if (cancelled) return;
        setStats({
          tonsRecycled: Number(data.tonsRecycled) || HERO_STATS_FALLBACK.tonsRecycled,
          revenueNaira: Number(data.revenueNaira) || HERO_STATS_FALLBACK.revenueNaira,
          co2SavedTons: Number(data.co2SavedTons) || HERO_STATS_FALLBACK.co2SavedTons,
        });
      })
      .catch(() => {
        if (!cancelled) setStats(HERO_STATS_FALLBACK);
      })
      .finally(() => { if (!cancelled) setStatsLoading(false); });
    return () => { cancelled = true; };
  }, []);

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
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/register" className="btn btn-outline-light">Sign up</Link>
        </div>
        <div className="hero-stats">
          <button
            type="button"
            className="hero-stat hero-stat-btn"
            onClick={() => scrollToSection("about")}
            aria-label="Tons recycled – scroll to About"
          >
            <strong>{statsLoading ? "—" : stats.tonsRecycled.toLocaleString() + "+"}</strong>
            <span>Tons Recycled</span>
          </button>
          <button
            type="button"
            className="hero-stat hero-stat-btn"
            onClick={() => scrollToSection("services")}
            aria-label="Revenue generated – scroll to Services"
          >
            <strong>{statsLoading ? "—" : formatRevenueNaira(stats.revenueNaira)}</strong>
            <span>Revenue Generated</span>
          </button>
          <button
            type="button"
            className="hero-stat hero-stat-btn"
            onClick={() => scrollToSection("about")}
            aria-label="CO2 saved – scroll to About"
          >
            <strong>{statsLoading ? "—" : stats.co2SavedTons.toLocaleString()}</strong>
            <span>Tons CO<sub>2</sub> Saved</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default LandingPageCard1;
