import axios from "axios";

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_BASE_URL;

  // When deployed on production domain (like onrender.com), fallback to live backend if envUrl is localhost or missing
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    if (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) {
      return "https://pathshala-backend-seven.vercel.app/api/v1/auth";
    }
  }

  return envUrl || "http://localhost:3000/api/v1/auth";
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

