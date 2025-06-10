import { useState, useEffect, createContext, useContext } from 'react';
import type { Theme } from '../types';

const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#8B5CF6',
    secondary: '#14B8A6',
    accent: '#10B981',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1F2937',
    textSecondary: '#6B7280',
  },
};

const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#A78BFA',
    secondary: '#2DD4BF',
    accent: '#34D399',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeState = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? darkTheme : lightTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme.name);
    document.documentElement.classList.toggle('dark', theme.name === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev.name === 'light' ? darkTheme : lightTheme);
  };

  return { theme, toggleTheme };
};

export { ThemeContext, lightTheme, darkTheme };