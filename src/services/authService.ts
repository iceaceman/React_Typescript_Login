import axios from "axios";

const APP_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: `${APP_URL}/api`,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

// A function to get the CSRF cookie from the backend
const getCsrfToken = async () => {
  try {
    // Make a GET request to the correct, non-prefixed /sanctum/csrf-cookie endpoint
    // by using a different base URL for this specific request.
    await axios.get(`${APP_URL}/sanctum/csrf-cookie`, { withCredentials: true });
    console.log("CSRF cookie retrieved successfully.");
  } catch (error) {
    console.error("Failed to get CSRF cookie:", error);
    throw error;
  }
};

api.interceptors.request.use(async (config) => {
  if (config.method !== "get") {
    await getCsrfToken();
  }
  return config;
});

export const register = (data: any) => api.post(`/register`, data);
export const login = (data: any) => api.post(`/login`, data);
export const profile = (data: any, token: string) => api.post(`/profile`, data, {
    headers: {
    Authorization: `Bearer ${token}`,
  },
}); 

export default api;