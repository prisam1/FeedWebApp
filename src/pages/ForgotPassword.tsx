import { useNavigate } from "react-router-dom";
import { ResetPassword } from "../components/forgotPassword/forgotPasswordForm";
import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronsLeftIcon } from "lucide-react";

export const ForgotPassword = () => {

  const [otpSent, setOtpSent] = useState<boolean>(false);

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button
        onClick={handleGoBack}
        className="mt-40 ml-10 absolute items-center flex gap-2 bg-purple-300 rounded-md border px-2 py-1.5"
      >
        <ArrowLeft height={24} width={24} />
        Back
      </button>
      <div className="flex flex-col h-[90vh] items-center justify-center w-full lg:p-8 p-4">

        <div className="flex flex-col mt-0 w-full max-w-md">
          <h2 className="text-[8vw] md:text-[32px] mt-[8vw] md:mt-[0px] font-bold text-[#0040FF] dark:text-foreground">
            Reset your password
          </h2>
          <p className="text-[#111827] mt-[4vw] md:mt-[16px] text-[4.5vw] md:text-lg dark:text-gray-500">
            {otpSent ? "Please check your registered email address to reset your password." : `Please press "Send OTP" to receive a password reset code in your registered email.`}
          </p>
        </div>
        <ResetPassword
          otpSent={otpSent}
          setOtpSent={setOtpSent}
        />
      </div>
    </div>
  );
};
