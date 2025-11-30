import { createContext, useState } from "react";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("ai_user") || "null"));
  const [token, setToken] = useState(() => localStorage.getItem("ai_token") || null);

  const login = (u, t) => {
    setUser(u); setToken(t);
    localStorage.setItem("ai_user", JSON.stringify(u));
    localStorage.setItem("ai_token", t);
  };
  const logout = () => {
    setUser(null); setToken(null);
    localStorage.removeItem("ai_user"); localStorage.removeItem("ai_token");
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
