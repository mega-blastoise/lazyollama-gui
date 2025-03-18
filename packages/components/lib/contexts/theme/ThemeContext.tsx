import { createContext, useContext } from 'react';
import { Theme, ThemeContextType } from './types';

const defaultContext: ThemeContextType = {
  theme: 'mint-light',
  setTheme: () => {},
  toggleTheme: () => {},
  toggleMode: () => {},
  isDark: false,
  isLight: true,
  colorScheme: 'mint'
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
