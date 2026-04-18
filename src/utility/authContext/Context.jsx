import { createContext, useState } from "react";

export const maneger = createContext();

export const State = ({ children }) => {
  const [logouter, setLogout] = useState(false);
  return (
    <maneger.Provider value={{ logouter, setLogout }}>
      {children}
    </maneger.Provider>
  );
};
