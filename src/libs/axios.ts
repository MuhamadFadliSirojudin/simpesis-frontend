import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛡️ Interceptor untuk menyisipkan Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // nama key bisa kamu sesuaikan
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
