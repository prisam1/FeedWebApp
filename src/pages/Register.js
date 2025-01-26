import React, { useState } from "react";
import { useRegister,useGoogleAuth } from "../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { GoogleOAuth } from "../uiComponents/GoogleOAuth";
import { Link } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { handleRegister, loading, error } = useRegister();
  const { handleGoogleAuth } = useGoogleAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(formData.name, formData.email, formData.password);
  };

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    await handleGoogleAuth(credential, "signup");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-200 w-full lg:p-8 p-4">
      <div className="flex flex-col mt-16 items-center w-full max-w-md">
        <h3 className="flex lg:mt-6 text-4xl  text-[#0040FF] font-bold">
          Create your Account now!
        </h3>
        <p className="mt-4 text-[18px] text-gray-500">
          Register your free account now.
        </p>
      </div>
      <div className="flex flex-col mt-10 items-center w-full">
        <form
          onSubmit={onSubmit}
          className="space-y-4 mt-8 flex w-full flex-col max-w-md"
        >
          <input
            type="text"
            placeholder="Name"
            className="flex h-12 rounded-md w-full border border-input px-5 py-4 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="flex h-12 rounded-md w-full border border-input px-5 py-4 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
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
          <button
            type="submit"
            className="h-10 px-4 py-2 bg-purple-600 rounded-md text-white"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

           {/* Google Signup */}
           <GoogleOAuth
          action="signup"
          onSuccess={handleGoogleSuccess}
          onError={() => console.error("Google Signup Failed")}
        />

        <div className="flex flex-row justify-between items-center">
          <p className="mt-[24px] text-left text-[12px] md:text-[14px] text-[#A0AEC0]">
            Already have an account?
            <Link
              to="/login"
              className="text-[#0040FF] text-[12px] md:text-[14px] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
