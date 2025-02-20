import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (token == null) {
      setIsLoggedin(false);
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
      setIsLoggedin(true);
    }
  });
  return (
    <UserContext.Provider
      value={{ isLoggedin, setIsLoggedin, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
