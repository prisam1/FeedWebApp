import { configureStore } from "@reduxjs/toolkit";
//import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage'
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import registerReducer from "./slices/registerSlice";

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };

// const reducers = combineReducers({
//   auth: authSlice,
//   user: userSlice,
//   register: registerSlice,
//   //search: searchSlice,
// })

//const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    register: registerReducer,
  },
});
