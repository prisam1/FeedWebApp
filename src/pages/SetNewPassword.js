import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useResetPassword } from "../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

export const SetNewPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Retrieve email from state

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { handleResetPassword, loading } = useResetPassword();

  useEffect(() => {
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError(""); // Clear the error when they match
    }
  }, [formData.password, formData.confirmPassword]); // Run whenever passwords change

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleResetPassword(email, formData.password);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-200 w-full lg:p-8 p-4">
      <div className="flex flex-col mt-0 w-full max-w-md">
        <h2 className="text-[8vw] md:text-[32px] mt-[8vw] md:mt-[0px] font-bold text-[#0040FF] dark:text-foreground">
          Change Your Password.
        </h2>
        <p className="text-[#111827] mt-[4vw] md:mt-[16px] text-[4.5vw] md:text-lg dark:text-gray-500">
          Enter Your New Password.
        </p>
      </div>
      <div className="flex flex-col mt-10 items-center w-full">
        <form
          onSubmit={onSubmit}
          className="space-y-4 mt-8 flex w-full flex-col max-w-md"
        >
          <label>
            Password<span className="text-red-800">*</span>
          </label>
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

          <label>
            Confirm Password<span className="text-red-800">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="********"
              className={`flex h-12 w-full rounded-md border px-5 py-4 text-sm ${
                passwordError ? "border-red-500" : "border-input"
              } placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 ${
                passwordError
                  ? "focus-visible:ring-red-500"
                  : "focus-visible:ring-ring"
              } focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute inset-y-0 right-0 flex items-center px-2  focus:outline-none"
            >
              {showPassword2 ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm mt-[10px]">{passwordError}</p>
          )}
          <button
            type="submit"
            className="h-10 px-4 py-2 bg-purple-600 rounded-md text-white disabled:bg-gray-400"
            disabled={!!passwordError || loading} // Disable button if there's an error
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {loading ? "Registering..." : ""}
        </form>
      </div>
    </div>
  );
};
