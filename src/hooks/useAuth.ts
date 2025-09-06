import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  login,
  forgotPassword,
  forgotPasswordOTP,
  resetPassword,
  googleAuth,
  getUserData,
  logout,
  currentGoogleUser,
} from "../services/authServices";
import { setUserDetails, UserSelector } from "../redux/slices/userSlice";
import { AuthSelector } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  loginSuccess as loginAction,
  logout as logoutAction,
} from "../redux/slices/authSlice";
import { User } from "../types/types";


export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await register(name, email, password);
      toast.success("Please login to continue");
      navigate("/login");
    } catch (err: unknown) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
};

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      if (data) {
        dispatch(setUserDetails(data.userData));
        dispatch(loginAction());
        return data;
      }
    } catch (err: unknown) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export const useForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await forgotPassword(email);
      return data;
    } catch (err: unknown) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading, error };
};

export const useForgotPasswordOTP = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPasswordOTP = async (email: string, otp: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await forgotPasswordOTP(email, otp);
      return data;
    } catch (err: unknown) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPasswordOTP, loading, error };
};

export const useResetPassword = () => {

  const auth = useSelector(AuthSelector);
  const isAuthenticated = auth.isAuthenticated ?? false;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleResetPassword = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resetPassword(email, password);
      toast.success("Password successfully changed");
      if (isAuthenticated) {
        navigate("/home", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
      return data;
    } catch (err: unknown) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleResetPassword, loading, error };
};

export const useUserData = () => {
  
  const user = useSelector(UserSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        await logout();
        dispatch(logoutAction());
        navigate("/login", { replace: true });
      } else {
        const fetchedData = await getUserData(user.email);
        setUserData(fetchedData);
      }
    };
    fetchUserData();
  }, [user?.email, dispatch, navigate]);

  return { userData };
};

export const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
    } catch (err: unknown) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
};

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleGoogleAuth = async (credential: any) => {
    setLoading(true);
    setError(null);
    try {
      await googleAuth(credential);
      const user = await currentGoogleUser();
      if (user) {
        dispatch(setUserDetails(user));
        dispatch(loginAction());
      }
      return user;
    } catch (err: unknown) {
      const errorMessage = (err as any)?.response?.data || (err as any)?.message || "Google Authentication failed";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleGoogleAuth, loading, error };
};