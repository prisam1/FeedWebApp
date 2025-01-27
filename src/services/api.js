import axios from "axios";
import { isMobile } from "../utils/detectDevice";

export const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: !isMobile(), // Enable credentials only for desktop users
});

//Attach token dynamically for mobile users
api.interceptors.request.use((config) => {
  if (isMobile()) {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
export default api;
