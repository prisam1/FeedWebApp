import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin, useGoogleAuth } from "../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { GoogleOAuth } from "../uiComponents/GoogleOAuth";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, loading } = useLogin();
  const { handleGoogleAuth } = useGoogleAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(formData.email, formData.password);
  };

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    await handleGoogleAuth(credential, "login");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-200 w-full lg:p-8 p-4">
      <div className="flex flex-col mt-16 w-full max-w-md">
        <h3 className="flex lg:mt-6 text-4xl text-left text-[#0040FF] font-bold">
          Welcome back!
        </h3>
        <p className="mt-4 text-[18px] text-gray-500">Login below</p>
      </div>
      <div className="flex flex-col mt-10 items-center w-full">
        <form
          onSubmit={onSubmit}
          className="space-y-4 mt-8 flex w-full flex-col max-w-md"
        >
          <input
            type="email"
            placeholder="Email"
            className="flex h-12 rounded-md w-full border border-input px-5 py-4 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label></label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="flex h-12 w-full rounded-md border border-input px-5 py-4 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <Link
            to="/forgot-password"
            className="mt-[24px] text-right text-[12px] md:text-[14px] text-slate-500 hover:underline"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="h-10 px-4 py-2 bg-purple-600 rounded-md text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <GoogleOAuth
          action="login"
          onSuccess={handleGoogleSuccess}
          onError={() => console.error("Google Login Failed")}
        />

        <div className="flex flex-row justify-between items-center">
          <p className="mt-[24px] text-left text-[12px] md:text-[14px] text-[#A0AEC0]">
            Don't have an account?
            <Link
              to="/register"
              className="text-[#0040FF] text-[12px] md:text-[14px] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
