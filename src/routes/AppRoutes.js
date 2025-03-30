import React from "react";
import {
  createHashRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthSelector } from "../redux/slices/authSlice";
import { protectedRoutes } from "./ProtectedRoutes";
import { unprotectedRoutes } from "./UnProtectedRoutes";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRoutes = () => {
  const auth = useSelector(AuthSelector);
  const isAuthenticated = auth.isAuthenticated ?? false;

  const routes = createHashRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/home" replace />
      ) : ( 
        <Navigate to="/login" replace />
      ),
      errorElement: <ErrorBoundary />,
    },
    ...unprotectedRoutes,
    ...protectedRoutes,
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;
