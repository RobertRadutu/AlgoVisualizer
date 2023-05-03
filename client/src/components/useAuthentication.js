import { useState, useEffect } from "react";
import { getUser } from "./login/helpers";

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (getUser()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [getUser()]);

  return [isLoggedIn, setIsLoggedIn];
};

export default useAuthentication;
