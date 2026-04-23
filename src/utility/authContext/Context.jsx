import { createContext, useState } from "react";

export const stateManager = createContext();

export const State = ({ children }) => {
  const [menuNav, setMenuNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <stateManager.Provider value={{ menuNav, setMenuNav }}>
      {children}
    </stateManager.Provider>
  );
};
