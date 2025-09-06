import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState { 
  name: string | null;
  email: string | null; 
  password: string | null;
}

const initialState :RegisterState = {
  name: "",
  email: "",
  password: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterDetails: (state, action:PayloadAction<RegisterState>) => {
      return { ...state, ...action.payload };
    },
    resetRegisterDetails: () => {
      return initialState;
    },
  },
});

export const RegisterSelector = (state: { register: RegisterState }) => state.register;
export const { setRegisterDetails, resetRegisterDetails } =
  registerSlice.actions;
export default registerSlice.reducer;
