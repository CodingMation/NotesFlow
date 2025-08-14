import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
}, error => Promise.reject(error));

// Response interceptor - suppresses XHR logs
api.interceptors.response.use(
  response => response,
  error => {
    // Only show important errors
    if (error.response?.status >= 500 || 
        error.code === "ERR_NETWORK" || 
        error.code === "ECONNABORTED") {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;