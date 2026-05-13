import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const palette = {
  dark: {
    background: '#1a2b3d',
    backgroundAlt: '#2a3f54',
    surface: 'rgba(255, 255, 255, 0.06)',
    text: '#f5ead8',
    textMuted: '#c4b8a5',
    primary: '#ffb084',
    primaryDark: '#ff9770',
    accent: '#a3d9b1',
    sky: '#7badd3',
    cream: '#f5ead8',
    border: 'rgba(255, 176, 132, 0.22)',
  },
  light: {
    background: '#fef8f0',
    backgroundAlt: '#fdf1de',
    surface: 'rgba(255, 255, 255, 0.78)',
    text: '#2d4a5b',
    textMuted: '#6b8294',
    primary: '#5ba9d4',
    primaryDark: '#3d8bb8',
    accent: '#ff9770',
    sky: '#a8dadc',
    cream: '#fdf6e3',
    border: 'rgba(91, 169, 212, 0.25)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const colors = palette[theme];
    const root = document.documentElement;
    root.style.setProperty('--bg', colors.background);
    root.style.setProperty('--bg-alt', colors.backgroundAlt);
    root.style.setProperty('--surface', colors.surface);
    root.style.setProperty('--text', colors.text);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-dark', colors.primaryDark);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--sky', colors.sky);
    root.style.setProperty('--cream', colors.cream);
    root.style.setProperty('--border', colors.border);
  }, [theme]);

  const colors = palette[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
