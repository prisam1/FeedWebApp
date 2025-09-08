import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useForgotPassword, useForgotPasswordOTP } from "../../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../redux/slices/authSlice";
import { FormData } from "../../types/types";

export const ResetPassword = () => {
  const auth = useSelector(AuthSelector);
  const isAuthenticated = auth.isAuthenticated ?? false;

  const [formData, setFormData] = useState<FormData>({ email: "", otp: "" });
  const [otpSent, setOtpSent] = useState<boolean>(true);
  const [otpResetTime, setOtpResetTime] = useState<number>(0);

  const { handleForgotPassword, loading: sendingOtpLoading } = useForgotPassword();
  const { handleForgotPasswordOTP, loading: verifyingOtpLoading } = useForgotPasswordOTP();

  const navigate = useNavigate();

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await handleForgotPassword(formData.email);
    if (result) {
      setOtpSent(true);
      setOtpResetTime(60); // Start the timer for 60 seconds
      toast.success("OTP sent successfully. Please check your email.");
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await handleForgotPasswordOTP(formData.email, formData.otp);

    if (result) {
      toast.success("OTP verified successfully!");
      const redirectPath = isAuthenticated ? "/set-new-password" : "/reset-password";
      navigate(`${redirectPath}?email=${formData.email}`);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpResetTime > 0) {
      timer = setTimeout(() => setOtpResetTime(prevTime => prevTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpResetTime]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "otp") {
      const sanitizedValue = value.replace(/\D/g, ""); // Allow only numbers
      if (sanitizedValue.length <= 6) {
        setFormData(prevData => ({ ...prevData, [name]: sanitizedValue }));
      }
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <div className="flex flex-col mt-10 items-center w-full">
      <form
        onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
        className="mt-8 flex w-full flex-col max-w-md"
      >
        <label htmlFor="email">
          Email<span className="text-red-800">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="flex h-12 w-full mt-2 rounded-md border border-input px-5 py-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={otpSent}
        />
        {otpSent && <p
          onClick={() => setOtpSent(false)}
          className="underline w-14 mb-4 text-blue-600 hover:text-blue-800 cursor-pointer">
          change
        </p>
        }

        {otpSent && (
          <>
            <label htmlFor="otp">
              OTP<span className="text-red-800">*</span>
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter OTP"
              className="flex h-12 mt-2 w-full rounded-md border border-input px-5 py-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </>
        )}
        {formData.otp?.length < 6 && otpSent && (
          <p className="text-red-800">OTP must be 6 digits.</p>
        )}
        <button
          type="submit"
          className={`h-10 mt-4 px-4 py-2 rounded-md text-white ${otpSent
            ? "bg-green-600 hover:bg-green-700"
            : "bg-purple-600 hover:bg-purple-700"
            }`}
          disabled={
            sendingOtpLoading ||
            verifyingOtpLoading ||
            (formData.otp?.length < 6 && otpSent)
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