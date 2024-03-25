// ThemeContext.js
import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Colors} from './colors';

interface ContextProps {}

const ThemeContext = createContext<ContextProps | undefined>(undefined);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
