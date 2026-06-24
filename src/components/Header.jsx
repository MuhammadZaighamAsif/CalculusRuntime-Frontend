import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/simple-concepts",      label: "Concepts", type: "Guide" },
  { to: "/partial-derivatives/1",label: "Partials",  type: "Guide" },
  { to: "/vector-calculus/1",    label: "Vectors",   type: "Guide" },
  { to: "/test",                 label: "Continuity",type: "Tool"  },
  { to: "/extreme",              label: "Extrema",   type: "Tool"  },
  { to: "/volumecalculator",     label: "Integrals", type: "Tool"  },
  { to: "/taylorx",              label: "TaylorX",   type: "Tool"  },
  { to: "/ai-solver",            label: "AI Solver", type: "Tool"  },
];

function Header({ darkMode, onToggleDark }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Close menu on outside click OR Escape key — combined into one effect
  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleLogout = () => {
    try {
      logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setMenuOpen(false);
  };

  return (
    <header className="site-header" ref={headerRef}>

      {/* Brand */}
      <NavLink className="site-brand" to="/" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark" aria-hidden="true">∂</span>
        <span className="brand-text">
          <span>CalcVoyager</span>
          <small>Multivariable tools</small>
        </span>
      </NavLink>

      {/* Desktop nav */}
      <nav className="site-nav" aria-label="Primary navigation">
        {navLinks.map(({ to, label, type }) => (
          <NavLink key={to} to={to} title={type}>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Controls: theme toggle + auth + hamburger */}
      <div className="header-controls">
        <button
          className="theme-toggle"
          onClick={onToggleDark}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {user ? (
          <div className="header-user">
            <Link to="/dashboard" className="header-avatar" title="Dashboard">
              {user.username?.[0]?.toUpperCase() ?? "U"}
            </Link>
          </div>
        ) : (
          <div className="header-auth">
            <Link to="/login"  className="header-login">Sign in</Link>
            <Link to="/signup" className="header-signup">Sign up</Link>
          </div>
        )}

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

      {/* Mobile nav */}
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

        <div className="mobile-nav-divider" />

        {user ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
            <button className="mobile-nav-logout" onClick={handleLogout}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link to="/login"  onClick={() => setMenuOpen(false)}>Sign in</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign up</Link>
          </>
        )}
      </nav>

    </header>
  );
}

export default Header;
