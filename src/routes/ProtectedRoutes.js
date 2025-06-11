import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthSelector } from "../redux/slices/authSlice";
import { Home } from "../pages/Home";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { ForgotPassword } from "../pages/ForgotPassword";
import { SetNewPassword } from "../pages/SetNewPassword";

const ProtectedRoutes = () => {
  const auth = useSelector(AuthSelector);
  const isAuthenticated = auth.isAuthenticated ?? false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="fixed top-0 left-0 lg:w-full w-full z-50">
        <Header />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export const protectedRoutes = [
  {
    path: "/home",
    element: <ProtectedRoutes />,
    children: [{ path: "", element: <Home /> }],
  },
  {
    path: "/reset-forgot-password",
    element: <ProtectedRoutes />,
    children: [{ path: "", element: <ForgotPassword /> }],
  },
  {
    path: "/set-new-password",
    element: <ProtectedRoutes />,
    children: [{ path: "", element: <SetNewPassword /> }],
  },
];
