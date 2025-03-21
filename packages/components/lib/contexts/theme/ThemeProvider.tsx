import '../../styles/variables.css';
import '../../styles/reset.css';

import React, { useState, useEffect, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import { Theme } from './types';

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'mint-light'
}) => {
  // Initialize theme from localStorage or system preference
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    if (!savedTheme && typeof window !== 'undefined' && window?.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'mint-dark' : 'mint-light';
    }

    return savedTheme || initialTheme;
  });

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);

    // Apply theme to document for potential global CSS selectors
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Set theme while handling side effects
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Calculate theme properties
  const isDark = theme.includes('dark');
  const isLight = !isDark;

  // Determine color scheme
  const colorScheme = theme.startsWith('mint') ? 'mint' : 'purple';

  // Toggle between light and dark modes while keeping color theme
  const toggleMode = () => {
    if (colorScheme === 'mint') {
      setTheme(isDark ? 'mint-light' : 'mint-dark');
    } else {
      setTheme(isDark ? 'purple-light' : 'purple-dark');
    }
  };

  // Cycle through themes
  const toggleTheme = () => {
    const themeOrder: Theme[] = ['mint-light', 'mint-dark', 'purple-light', 'purple-dark'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        toggleMode,
        isDark,
        isLight,
        colorScheme
      }}
    >
      <div className="lazyollama-theme" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
