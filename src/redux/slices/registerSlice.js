import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetRegisterDetails: () => {
      return initialState;
    },
  },
});

export const RegisterSelector = (state) => state.register;
export const { setRegisterDetails, resetRegisterDetails } =
  registerSlice.actions;
export default registerSlice.reducer;
