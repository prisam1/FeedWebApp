import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const UserSelector = (state) => state.user;
export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
