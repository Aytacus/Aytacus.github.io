import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900 && open) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <a href="#home" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-dot" />
          Yücel Aytaç Akgün
        </a>

        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          <li><a href="#home" onClick={closeMenu}>{t.nav.home}</a></li>
          <li><a href="#about" onClick={closeMenu}>{t.nav.about}</a></li>
          <li><a href="#achievements" onClick={closeMenu}>{t.nav.achievements}</a></li>
          <li><a href="#projects" onClick={closeMenu}>{t.nav.projects}</a></li>
          <li><a href="#blog" onClick={closeMenu}>{t.nav.blog}</a></li>
          <li><a href="#contact" onClick={closeMenu}>{t.nav.contact}</a></li>
        </ul>

        <div className="navbar-actions">
          <button
            className="lang-toggle"
            onClick={toggleLanguage}
            aria-label={t.a11y.languageToggle}
            title={t.a11y.languageToggle}
          >
            <span className={language === 'tr' ? 'active' : ''}>TR</span>
            <span className="lang-divider">/</span>
            <span className={language === 'en' ? 'active' : ''}>EN</span>
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.a11y.themeLight : t.a11y.themeDark}
            title={theme === 'dark' ? t.a11y.themeLight : t.a11y.themeDark}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            className="nav-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label={t.a11y.menuToggle}
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
