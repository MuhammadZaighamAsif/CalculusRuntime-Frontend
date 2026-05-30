import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/partial-derivatives", label: "Partial Derivatives" },
  { to: "/vector-calculus", label: "Vector Calculus" },
  { to: "/test", label: "Continuity" },
  { to: "/extreme", label: "Extrema" },
  { to: "/volumecalculator", label: "Volume" },
];

function Header({ darkMode, onToggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      {/* Brand */}
      <NavLink className="site-brand" to="/" onClick={() => setMenuOpen(false)}>
        Calculus Studio
      </NavLink>

      {/* Desktop nav — hidden on mobile via CSS */}
      <nav className="site-nav" aria-label="Primary navigation">
        {navLinks.map(({ to, label }) => (
          <NavLink key={to} to={to}>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Right-side controls */}
      <div className="header-controls">
        <button
          className="theme-toggle"
          onClick={onToggleDark}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile drawer — rendered in DOM always, shown/hidden via CSS */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navLinks.map(({ to, label }) => (
          <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
