import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token; // Match backend expectation
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;