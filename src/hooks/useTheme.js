import { useState, useEffect } from 'react';
import { getTheme, setTheme as saveTheme } from '../utils/localStorage';

export const useTheme = () => {
  const [theme, setThemeState] = useState(() => getTheme());

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return [theme, toggleTheme];
};