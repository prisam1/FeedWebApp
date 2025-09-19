import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthSelector } from "../redux/slices/authSlice";
import { Home } from "../pages/Home";
import { ForgotPassword } from "../pages/ForgotPassword";
import { SetNewPassword } from "../pages/SetNewPassword";
import Layout from "../layout";

const ProtectedRoutes = () => {
  const auth = useSelector(AuthSelector);
  const isAuthenticated = auth.isAuthenticated ?? false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
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
