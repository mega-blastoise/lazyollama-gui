import { createContext, useContext } from 'react';
import { ThemeContextType } from './types';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  }
});

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
