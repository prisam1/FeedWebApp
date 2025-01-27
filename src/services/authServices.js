import api from "./api";
import { isMobile } from "../utils/detectDevice";

// Authentication APIs
export const register = async (name, email, password) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  if (isMobile() && data.access_token) {
    localStorage.setItem("authToken", data.access_token); // Store token in localStorage for mobile
  }
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
};

export const forgotPasswordOTP = async (email, otp) => {
  const { data } = await api.post("/auth/forgot-password-otp", { email, otp });
  return data;
};

export const resetPassword = async (email, password) => {
  const { data } = await api.post("/auth/set-password", { email, password });
  return data;
};

export const getUserData = async (email) => {
  const response = await api.get("/auth/user", { email });
  return response.data;
};

export const googleAuth = async (credential, action) => {
  const response = await api.post(`/auth/google`, {
    credential,
    action,
  });

  return response.data;
};
