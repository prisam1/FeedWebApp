import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import AppRoutes from "./routes/AppRoutes.js";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
// import "./App.css";

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
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
    </PersistGate>
  </Provider>
);

export default App;
