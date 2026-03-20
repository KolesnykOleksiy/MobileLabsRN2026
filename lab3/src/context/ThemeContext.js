import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

const lightColors = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#007AFF',
  secondary: '#5856D6',
  card: '#F2F2F7',
  accent: '#FF9500',
  border: '#C7C7CC',
};

const darkColors = {
  background: '#1C1C1E',
  text: '#FFFFFF',
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  card: '#2C2C2E',
  accent: '#FF9F0A',
  border: '#38383A',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const theme = {
    isDarkMode,
    colors: isDarkMode ? darkColors : lightColors,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);