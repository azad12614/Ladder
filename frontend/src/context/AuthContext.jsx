// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/admin/login", { email, password });
      const { token } = res.data;

      const decoded = jwtDecode(token);
      setAdmin(decoded); // Now admin.role will exist
      setToken(token);

      localStorage.setItem("admin", JSON.stringify(decoded));
      localStorage.setItem("token", token);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken("");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ admin, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
