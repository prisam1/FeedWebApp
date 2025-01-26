import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./routes/AppRoutes.js";
import { Toaster } from "sonner";
// import "./App.css";

const App = () => (
  <Provider store={store}>
    <AppRoutes />
    <Toaster
      richColors
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: "manrope",
          fontSize: "16px",
          padding: "16px",
          borderRadius: "8px",
        },
      }}
    />
  </Provider>
);

export default App;
