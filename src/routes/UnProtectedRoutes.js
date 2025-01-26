import { ForgotPassword } from "../pages/ForgotPassword";
import { SetNewPassword } from "../pages/SetNewPassword";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AuthSelector } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRedirectUnprotected = () => {
  const auth = useSelector(AuthSelector);

  const isAuthenticated = auth.isAuthenticated ?? false;

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export const unprotectedRoutes = [
  {
    path: "/login",
    element: <AuthRedirectUnprotected />,
    children: [{ path: "", element: <Login /> }],
  },
  {
    path: "/register",
    element: <AuthRedirectUnprotected />,
    children: [{ path: "", element: <Register /> }],
  },
  {
    path: "/forgot-password",
    element: <AuthRedirectUnprotected />,
    children: [{ path: "", element: <ForgotPassword /> }],
  },
  {
    path: "/reset-password",
    element: <AuthRedirectUnprotected />,
    children: [{ path: "", element: <SetNewPassword /> }],
  },
];
