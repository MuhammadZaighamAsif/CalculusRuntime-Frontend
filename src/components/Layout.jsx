import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot/Chatbot"; // <-- Chatbot yahaan import ho gaya

function Layout({ body }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("calculus-dark") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
    } else {
      root.setAttribute("data-theme", "light");
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("calculus-dark", String(darkMode));
    } catch {}
  }, [darkMode]);

  const toggle = () => setDarkMode((v) => !v);

  return (
    <>
      <Header darkMode={darkMode} onToggleDark={toggle} />
      {body}
      <Chatbot /> {/* <-- Chatbot ab har page par footer se upar show hoga */}
      <Footer />
    </>
  );
}

export default Layout;