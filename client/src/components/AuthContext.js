import { createContext, useState, useEffect } from "react";
import { getUser } from "./login/helpers";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (getUser()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [getUser()]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
