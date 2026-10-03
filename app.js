import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SellPage from "./pages/SellPage";
import BrowsePage from "./pages/BrowsePage";
import RequestPage from "./pages/RequestPage";
import "./app.css";

function App() {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Explore" },
    { to: "/sell", label: "Sell with us" },
    { to: "/request", label: "Get in touch" },
  ];

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <NavLink className="brand" to="/" aria-label="Hearth and Home, home">
            <span className="brand-mark" aria-hidden="true">H</span>
            <span>hearth<span className="brand-ampersand">&</span>home</span>
          </NavLink>
          <nav className="nav" aria-label="Main navigation">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <NavLink className="nav-cta" to="/browse">Find your piece <span aria-hidden="true">↗</span></NavLink>
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

      <footer className="site-footer">
        <div className="footer-inner">
          <NavLink className="brand footer-brand" to="/">
            <span className="brand-mark" aria-hidden="true">H</span>
            <span>hearth<span className="brand-ampersand">&</span>home</span>
          </NavLink>
          <p>Good things find their way home.</p>
          <span className="footer-note">Made for homes with a story.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
