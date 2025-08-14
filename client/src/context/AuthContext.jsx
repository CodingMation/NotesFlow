import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      setCurrentUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      
      // Store both token and user data
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      
      // Set auth header
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      
      // Update current user state
      setCurrentUser({ 
        token: res.data.token,
        user: res.data.user || null 
      });
      
      navigate("/");
      return res.data;
    } catch (err) {
      // Handle different error formats
      const errorMessage = err.response?.data?.errors?.[0]?.msg || 
                          err.response?.data?.msg || 
                          err.message || 
                          "Login failed";
      throw new Error(errorMessage);
    }
  };
  
  const register = async (username, email, password) => {
    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        axios.defaults.headers.common["x-auth-token"] = res.data.token;
        setCurrentUser({ token: res.data.token });
        navigate("/");
      }
      return res.data;
    } catch (err) {
      // Handle the new error format
      const serverError = err.response?.data?.errors?.[0]?.msg;
      const errorMessage = serverError || err.message || "Registration failed";
      throw new Error(errorMessage);
    }
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setCurrentUser(null);
    navigate("/login");
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
