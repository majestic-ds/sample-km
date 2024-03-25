// ThemeContext.js
import React, {createContext, useContext, ReactNode} from 'react';

interface ContextProps {}

const ThemeContext = createContext<ContextProps | undefined>(undefined);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
};
