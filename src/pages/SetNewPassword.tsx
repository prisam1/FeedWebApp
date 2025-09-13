import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useResetPassword } from "../hooks/useAuth";
import { StrengthBar } from "../components/StrengthBar";

type FormData = {
  password: string;
  confirmPassword: string;
};

export const SetNewPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Retrieve email from query params

  const { handleResetPassword, loading } = useResetPassword();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  // const [strength, setStrength] = useState<{
  //   level: number;
  //   label: string;
  //   barColor: string;
  //   textColor: string;
  // }>({
  //   level: 0,
  //   label: "Poor",
  //   barColor: "bg-red-400",
  //   textColor: "text-red-400",
  // });

  // password strength checker
  // useEffect(() => {
  //   if (!password) {
  //     setStrength({
  //       level: 0,
  //       label: "Poor",
  //       barColor: "bg-gray-300",
  //       textColor: "text-gray-400",
  //     });
  //     return;
  //   }

  //   let score = 0;
  //   if (password.length >= 8) score++;
  //   if (/[A-Z]/.test(password)) score++;
  //   if (/[a-z]/.test(password)) score++;
  //   if (/[0-9]/.test(password)) score++;
  //   if (/[^A-Za-z0-9]/.test(password)) score++;

  //   if (score <= 2) {
  //     setStrength({
  //       level: 1,
  //       label: "Poor",
  //       barColor: "bg-red-500",
  //       textColor: "text-red-500",
  //     });
  //   } else if (score === 3) {
  //     setStrength({
  //       level: 2,
  //       label: "Weak",
  //       barColor: "bg-yellow-400",
  //       textColor: "text-yellow-500",
  //     });
  //   } else if (score === 4) {
  //     setStrength({
  //       level: 3,
  //       label: "Good",
  //       barColor: "bg-blue-500",
  //       textColor: "text-blue-500",
  //     });
  //   } else {
  //     setStrength({
  //       level: 4,
  //       label: "Excellent",
  //       barColor: "bg-green-500",
  //       textColor: "text-green-500",
  //     });
  //   }
  // }, [password]);


  const onSubmit = async (data: FormData) => {
    if (email) {
      await handleResetPassword(email, data.password);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button
        onClick={handleGoBack}
        className="mt-40 ml-10 absolute items-center bg-purple-300 rounded-md border px-2 py-1"
      >
        ← back
      </button>
      <div className="flex flex-col h-[90vh] items-center justify-center w-full lg:p-8 p-4">
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
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex w-full flex-col max-w-md"
          >
            {/* Password */}
            <label>
              Password<span className="text-red-800">*</span>
            </label>
            <div className="relative mt-2">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                  validate: {
                    hasUpper: (v) =>
                      /[A-Z]/.test(v) || "Must contain at least one uppercase letter",
                    hasLower: (v) =>
                      /[a-z]/.test(v) || "Must contain at least one lowercase letter",
                    hasNumber: (v) =>
                      /[0-9]/.test(v) || "Must contain at least one number",
                    hasSpecial: (v) =>
                      /[^A-Za-z0-9]/.test(v) || "Must contain at least one special character",
                  },
                }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="flex h-12 w-full rounded-md border border-input px-5 py-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                    {errors.password && (
                      <p className="absolute text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </>
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Strength meter */}
            {password.length > 0 && (
              <div className="mt-5">
                <StrengthBar password={password} />
              </div>
            )}

            {/* Confirm Password */}
            <label className="mt-4">
              Confirm Password<span className="text-red-800">*</span>
            </label>
            <div className="relative mt-2">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Confirm password is required",
                }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      id="confirmPassword"
                      type={showPassword2 ? "text" : "password"}
                      placeholder="********"
                      className="flex h-12 w-full rounded-md border border-input px-5 py-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                    {errors.confirmPassword && (
                      <p className="absolute mt-1 text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                  </>
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                {showPassword2 ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {(password.length > 0 && confirmPassword.length > 0) && (password !== confirmPassword) && (
              <p className="text-red-500 text-sm mt-1 ">Passwords do not match</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-10 mt-10 px-4 py-2 bg-purple-600 rounded-md text-white disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
