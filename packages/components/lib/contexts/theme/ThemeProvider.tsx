import '../../styles/variables.css';
import '../../styles/reset.css';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import classnames from 'classnames';
import { ThemeContext } from './ThemeContext';
import { Theme } from './types';

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'light'
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (!savedTheme && typeof window !== "undefined" && window?.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return savedTheme || initialTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme => theme === 'dark' ? 'light' : 'dark');

  const themeClassName = classnames({
    'lazyollama-theme': true,
    'lazyollama-mode--dark': theme === 'dark'
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={themeClassName} data-theme={theme}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
