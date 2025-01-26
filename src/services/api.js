import axios from "axios";
import { isMobile } from "../utils/detectDevice";
//import { getAuthToken } from "./authServices";

export const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: !isMobile(), // Enable credentials only for desktop users
});

// Attach token dynamically for mobile users
// api.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
export default api;
