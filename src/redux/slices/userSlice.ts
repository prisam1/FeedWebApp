import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState { 
  _id: string;
  name: string | null;
  email: string | null; 
}

const initialState:UserState = {
  _id: "",
  name: "",
  email: "", 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action:PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const UserSelector = (state : { user: UserState }) => state.user;
export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
