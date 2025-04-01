import { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  login,
  forgotPassword,
  forgotPasswordOTP,
  resetPassword,
  googleAuth,
} from "../services/authServices";
import { setUserDetails, UserSelector } from "../redux/slices/userSlice";
import { AuthSelector } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  loginSuccess as loginAction,
  logout as logoutAction,
} from "../redux/slices/authSlice";
import { getUserData, logout } from "../services/authServices";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (name, email, password) => {
    setLoading(true);
    setError(null);

    try {
      await register(name, email, password);
      toast.success("Please login to continue");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      if (data) {
        dispatch(setUserDetails(data.userData));
        dispatch(loginAction());
        return data;
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleForgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await forgotPassword(email); // API call to send OTP
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading, error };
};

export const useForgotPasswordOTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleForgotPasswordOTP = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const data = await forgotPasswordOTP(email, otp); // API call to verify OTP

      return data;
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPasswordOTP, loading, error };
};

export const useResetPassword = () => {
  const auth = useSelector(AuthSelector);
  const isAuthenticated = auth.isAuthenticated ?? false;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleResetPassword = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resetPassword(email, password); // API call to reset Password
      toast.success("Password successfully changed");
      if (isAuthenticated) {
        navigate("/home", { replace: true });
      } else { 
        navigate("/login", { replace: true });
      }
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleResetPassword, loading, error };
};

export const useUserData = async () => {
  const user = useSelector(UserSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    await logout();
    dispatch(logoutAction());
    navigate("/login", { replace: true });
  } else if (user) {
    const userData = getUserData(user?.email);
    return userData;
  }
};

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logout();
      dispatch(logoutAction());
      navigate("/login", { replace: true });
      toast.success("Logout Successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
};

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleGoogleAuth = async (credential, action) => {
    setLoading(true);
    setError(null);

    try {
      await googleAuth();
      //const { user } = response.data;

      //dispatch(setUserDetails(user));
      dispatch(loginAction());

      return user;
    } catch (err) {
      console.error(`${action} Error:`, err.response?.data || err.message);
      setError(err.response?.data || "Google Authentication failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleGoogleAuth, loading, error };
};
