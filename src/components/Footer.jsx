import { NavLink } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="footer-logo">∂</span>
        <div>
          <p>Multivariable Calculus Studio</p>
          <span>Study guides, practice pages, and focused calculators.</span>
        </div>
      </div>

      <nav className="footer-nav" aria-label="Footer navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/partial-derivatives">Partial Derivatives</NavLink>
        <NavLink to="/vector-calculus">Vector Calculus</NavLink>
        <NavLink to="/test">Continuity</NavLink>
        <NavLink to="/extreme">Extrema</NavLink>
        <NavLink to="/volumecalculator">Volume</NavLink>
      </nav>

      <p className="footer-copy">© {year} Calculus Studio</p>
    </footer>
  );
}

export default Footer;
