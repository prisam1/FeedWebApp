import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated:
    localStorage.getItem("isAuthenticated") === "true" ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const AuthSelector = (state) => state.auth;

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
