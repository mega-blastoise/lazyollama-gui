export type Theme = 'mint-light' | 'mint-dark' | 'purple-light' | 'purple-dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleMode: () => void; // Toggles between light/dark while keeping color theme
  isDark: boolean;
  isLight: boolean;
  colorScheme: 'mint' | 'purple';
}
