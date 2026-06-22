import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import { useState, useEffect } from 'react';

// PAGES:
import Home from './pages/Home';

// UTILS:
import ScrollToTop from './utils/ScrollToTop';
import ContinuityFinder from "./pages/ContinuityFinder";
import ExtremeValueFunction from "./pages/ExtremeValueFinder";
import VolumeCalculator from "./pages/VolumeCalculator";

function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('cv-theme') ?? 'auto'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('cv-theme', theme);
  }, [theme]);

  const cycle = () =>
    setTheme(t => t === 'auto' ? 'dark' : t === 'dark' ? 'light' : 'auto');

  const icon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🌗';

  return (
    <button className="cv-theme-toggle" onClick={cycle} aria-label="Toggle theme">
      <span className="cv-theme-icon">{icon}</span>
      {theme === 'auto' ? 'Auto' : theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout toggle={<ThemeToggle />} body={<Home />} />} />
          <Route path="/test" element={<Layout toggle={<ThemeToggle />} body={<ContinuityFinder />} />} />
          <Route path="/extreme" element={<Layout toggle={<ThemeToggle />} body={<ExtremeValueFunction />} />} />
          <Route path="/volumecalculator" element={<Layout toggle={<ThemeToggle />} body={<VolumeCalculator />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;