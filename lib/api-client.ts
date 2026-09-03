import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for Sanctum stateful cookie authentication
  withXSRFToken: true, // Required for Axios 1.x+ to send X-XSRF-TOKEN cross-origin
});

export const initializeCsrf = async (): Promise<void> => {
  try {
    await apiClient.get("/sanctum/csrf-cookie");
    console.log("CSRF cookie initialized successfully");
  } catch (error) {
    console.error("Error initializing CSRF cookie:", error);
    throw error;
  }
};
