import React, { useState, useEffect } from "react";
import { useForgotPassword, useForgotPasswordOTP } from "../../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../redux/slices/authSlice";

export const ResetPassword = () => {
  const auth = useSelector(AuthSelector);
  const isAuthenticated = auth.isAuthenticated ?? false;

  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otpResetTime, setOtpResetTime] = useState(0);

  const { handleForgotPassword, loading: sendingOtpLoading } =
    useForgotPassword();
  const { handleForgotPasswordOTP, loading: verifyingOtpLoading } =
    useForgotPasswordOTP();

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const result = await handleForgotPassword(formData.email);
    if (result) {
      setOtpSent(true); // Show OTP input box on successful OTP send
      toast.success("OTP sent successfully. Please check your email.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const result = await handleForgotPasswordOTP(formData.email, formData.otp);

    if (result) {
      toast.success("OTP verified successfully!");
      if (isAuthenticated) {
        navigate(`/set-new-password?email=${formData.email}`);
      } else {
        navigate(`/reset-password?email=${formData.email}`);
      }
    }
  };

  useEffect(() => {
    if (otpResetTime > 0) {
      const timer = setTimeout(() => setOtpResetTime(otpResetTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpResetTime]);

  return (
    <div className="flex flex-col mt-10 items-center w-full">
      <form
        onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
        className="space-y-4 mt-8 flex w-full flex-col max-w-md"
      >
        <label>
          Email<span className="text-red-800">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="flex h-12 w-full rounded-md border border-input px-5 py-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={otpSent} // Disable email input after OTP is sent
        />

        {otpSent && (
          <>
            <label>
              Otp<span className="text-red-800">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="flex h-12 w-full rounded-md border border-input px-5 py-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
                if (value.length <= 6) {
                  setFormData({ ...formData, otp: value });
                }
              }}
              required
            />
          </>
        )}
        {formData.otp?.length < 6 && otpSent && (
          <p className="text-red-800">OTP must be 6 digits.</p>
        )}
        <button
          type="submit"
          className={`h-10 px-4 py-2 rounded-md text-white ${
            otpSent
              ? "bg-green-600 hover:bg-green-700"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={
            sendingOtpLoading ||
            verifyingOtpLoading ||
            (formData.otp?.length < 6 && otpSent) ||
            otpResetTime > 0
          }
        >
          {otpSent
            ? verifyingOtpLoading
              ? "Verifying OTP..."
              : "Verify OTP"
            : sendingOtpLoading
              ? "Sending OTP..."
              : otpResetTime > 0
                ? `Resend OTP in ${otpResetTime}s`
                : "Send OTP"}
        </button>
      </form>
    </div>
  );
};
