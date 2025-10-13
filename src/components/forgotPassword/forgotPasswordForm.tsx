import { useState, useEffect } from "react";
import { useForgotPassword, useForgotPasswordOTP } from "../../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../redux/slices/authSlice";
import { ResetFormInputs } from "../../types/types";
import { UserSelector } from "../../redux/slices/userSlice";
import { useForm, Controller } from "react-hook-form";

interface ResetPasswordProps {
  otpSent: boolean;
  setOtpSent: (otpSent: boolean) => void;
}

export const ResetPassword = ({ otpSent, setOtpSent }: ResetPasswordProps) => {

  const auth = useSelector(AuthSelector);
  const user = useSelector(UserSelector);

  const isAuthenticated = auth.isAuthenticated ?? false;
  const resetPassword = user && isAuthenticated ? user.email : "";

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormInputs>({
    defaultValues: {
      email: resetPassword,
      otp: "",
    },
  });

  const email = watch("email");
  const otp = watch("otp"); // live OTP value

  const [otpResetTime, setOtpResetTime] = useState<number>(0);

  const { handleForgotPassword, loading: sendingOtpLoading } = useForgotPassword();
  const { handleForgotPasswordOTP, loading: verifyingOtpLoading } = useForgotPasswordOTP();

  const navigate = useNavigate();

  // Send OTP
  const onSendOtp = async () => {
    const result = await handleForgotPassword(email);
    if (result) {
      setOtpSent(true);
      setOtpResetTime(60);
      toast.success("OTP sent successfully. Please check your email.");
    }
  };

  // Verify OTP
  const onVerifyOtp = async () => {
    const result = await handleForgotPasswordOTP(email, otp);
    if (result) {
      toast.success("OTP verified successfully!");
      const redirectPath = isAuthenticated ? "/set-new-password" : "/reset-password";
      navigate(`${redirectPath}?email=${email}`);
    }
  };

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpResetTime > 0) {
      timer = setTimeout(() => setOtpResetTime((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpResetTime]);

  return (
    <div className="flex flex-col mt-10 items-center w-full">
      <form
        onSubmit={handleSubmit(otpSent ? onVerifyOtp : onSendOtp)}
        className="mt-8 flex w-full flex-col max-w-md"
      >
        {/* Email */}
        <label htmlFor="email">
          Email<span className="text-red-800">*</span>
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
          }}
          render={({ field }) => (
            <>
              <input
                {...field}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="flex h-12 w-full mt-1 rounded-md border border-input px-5 py-4 text-sm"
                disabled={isAuthenticated}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </>
          )}
        />

        {/* OTP */}
        {otpSent && (
          <>
            <label htmlFor="otp" className="mt-3">
              OTP<span className="text-red-800">*</span>
            </label>
            <Controller
              name="otp"
              control={control}
              rules={{
                required: "OTP is required",
                minLength: { value: 6, message: "OTP must be 6 digits" },
                maxLength: { value: 6, message: "OTP must be 6 digits" },
                pattern: { value: /^[0-9]+$/, message: "OTP must contain only numbers" },
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    className="flex h-12 mt-1 w-full rounded-md border border-input px-5 py-4 text-sm"
                  />
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                  )}
                </>
              )}
            />
          </>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className={`h-10 mt-5 px-4 py-2 rounded-md text-white ${otpSent ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"
            }`}
          disabled={
            sendingOtpLoading ||
            verifyingOtpLoading ||
            (otpSent && otp.length < 6)
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
