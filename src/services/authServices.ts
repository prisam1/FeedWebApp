import api from "./api";
import { isMobile } from "../utils/detectDevice";

// Authentication APIs
export const register = async (name: string, email: string, password: string) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

export const login = async (email:string, password:string) => {
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

export const forgotPassword = async (email:string) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
};

export const forgotPasswordOTP = async (email:string, otp:string) => {
  const { data } = await api.post("/auth/forgot-password-otp", { email, otp });
  return data;
};

export const resetPassword = async (email:string, password:string) => {
  const { data } = await api.post("/auth/set-password", { email, password });
  return data;
};

export const getUserData = async (email:string) => {
  const response = await api.get("/auth/user", { params: { email } });
  return response.data;
};

export const googleAuth = (credential:any) => {
  return api.post("/auth/google/verify-token", { credential });
};


export const currentGoogleUser = async () => {
  const response = await api.get("/auth/current-user");
  return response.data;
};
