import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from "./slices/userSlice";
import registerReducer from "./slices/registerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    register: registerReducer,
  },
});

 