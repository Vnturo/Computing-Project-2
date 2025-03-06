import React, { createContext, useState, useContext } from 'react';

// Create Context
const AppContext = createContext();

// Create Provider Component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user authentication info
  const [theme, setTheme] = useState('light'); // Store theme settings

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to Use Context
export const useAppContext = () => {
  return useContext(AppContext);
};
