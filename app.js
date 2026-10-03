import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SellPage from "./pages/SellPage";
import BrowsePage from "./pages/BrowsePage";
import RequestPage from "./pages/RequestPage";

function App() {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/sell", label: "Sell" },
    { to: "/browse", label: "Browse" },
    { to: "/request", label: "Request" },
  ];

  return (
    <>
      <style>{`
        :root {
          --bg: #f7f3ee;
          --panel: rgba(255,255,255,0.82);
          --primary: #9d6b53;
          --primary-dark: #6f4535;
          --accent: #f3c7a4;
          --text: #2d231d;
          --muted: #6f5d56;
          --shadow: 0 18px 45px rgba(96, 64, 43, 0.12);
          --border: rgba(134, 96, 76, 0.18);
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: "Segoe UI", Arial, sans-serif;
          background:
            radial-gradient(circle at top left, rgba(243,199,164,0.7), transparent 20%),
            linear-gradient(135deg, #f9f5f2 0%, #f3e6df 40%, #f8efe8 100%);
          color: var(--text);
        }

        a { text-decoration: none; }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(157,107,83,0.12);
        }

        .nav-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .brand {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: var(--primary-dark);
        }

        .nav {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .nav-link {
          padding: 10px 16px;
          border-radius: 999px;
          color: var(--primary-dark);
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          background: linear-gradient(135deg, rgba(157,107,83,0.12), rgba(243,199,164,0.35));
          box-shadow: 0 8px 20px rgba(157,107,83,0.12);
        }

        .page-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 22px 60px;
        }

        .hero {
          background: linear-gradient(135deg, rgba(157,107,83,0.12), rgba(243,199,164,0.3));
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 28px 30px;
          margin-bottom: 22px;
          box-shadow: var(--shadow);
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(2.2rem, 3vw, 3.4rem);
          letter-spacing: -0.05em;
        }

        .eyebrow {
          margin: 0 0 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.74rem;
          font-weight: 800;
          color: var(--primary);
        }

        .hero p {
          margin: 10px 0 0;
          color: var(--muted);
          font-size: 1.04rem;
          line-height: 1.6;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 18px;
        }

        .info-card {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(157,107,83,0.12);
          border-radius: 20px;
          padding: 22px;
          box-shadow: 0 12px 24px rgba(88, 64, 53, 0.06);
        }

        .info-card h3 {
          margin-top: 0;
          color: var(--primary-dark);
        }

        .info-card p {
          margin-bottom: 0;
          color: var(--muted);
          line-height: 1.7;
        }

        .panel {
          background: var(--panel);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 22px;
          box-shadow: var(--shadow);
        }

        .page-panel {
          max-width: 1000px;
          margin: 0 auto;
        }

        .panel h2 {
          margin-top: 0;
          margin-bottom: 18px;
          font-size: 1.6rem;
          color: var(--primary-dark);
        }

        .field, .textarea, .button, .chip {
          transition: all 0.2s ease;
        }

        .field, .textarea {
          width: 100%;
          border: 1.5px solid rgba(120, 94, 80, 0.18);
          border-radius: 14px;
          padding: 12px 14px;
          margin-bottom: 12px;
          font-size: 0.98rem;
          background: rgba(255,255,255,0.7);
          color: var(--text);
          outline: none;
        }

        .field:focus, .textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(157,107,83,0.12);
        }

        .textarea {
          min-height: 92px;
          resize: vertical;
        }

        .cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 14px;
          padding: 12px 18px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: white;
          background: linear-gradient(135deg, var(--primary) 0%, #b98568 100%);
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(157,107,83,0.26);
        }

        .button.secondary {
          background: rgba(255,255,255,0.8);
          color: var(--primary-dark);
          border: 1px solid rgba(157,107,83,0.2);
          box-shadow: none;
        }

        .button:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 14px 32px rgba(157,107,83,0.32);
        }

        .filter-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 16px;
        }

        .item-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,247,240,0.9));
          border: 1px solid rgba(157,107,83,0.12);
          border-radius: 18px;
          padding: 16px;
          margin: 12px 0;
          box-shadow: 0 12px 20px rgba(88, 64, 53, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .item-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 28px rgba(88, 64, 53, 0.12);
        }

        .item-card img {
          width: 100%;
          max-height: 220px;
          object-fit: cover;
          border-radius: 14px;
          margin-top: 10px;
          border: 1px solid rgba(157,107,83,0.12);
        }

        .pill {
          display: inline-block;
          background: rgba(243,199,164,0.34);
          color: var(--primary-dark);
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-right: 8px;
          margin-bottom: 8px;
        }

        .status {
          margin-top: 12px;
          font-weight: 600;
          color: var(--primary-dark);
        }

        .empty-state {
          color: var(--muted);
          background: rgba(255,255,255,0.5);
          border: 1px dashed rgba(157,107,83,0.22);
          border-radius: 14px;
          padding: 18px;
          text-align: center;
        }

        @media (max-width: 960px) {
          .feature-grid, .filter-row {
            grid-template-columns: 1fr;
          }

          .nav-wrap {
            justify-content: center;
          }
        }
      `}</style>

      <header className="site-header">
        <div className="nav-wrap">
          <div className="brand">HOME DECOR</div>
          <nav className="nav">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;