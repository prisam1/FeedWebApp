import React from "react";
import { ResetPassword } from "../components/forgotPassword/forgotPasswordForm";

export const ForgotPassword = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-200 w-full lg:p-8 p-4">
      <div className="flex flex-col mt-0 w-full max-w-md">
        <h2 className="text-[8vw] md:text-[32px] mt-[8vw] md:mt-[0px] font-bold text-[#0040FF] dark:text-foreground">
          Reset your password
        </h2>
        <p className="text-[#111827] mt-[4vw] md:mt-[16px] text-[4.5vw] md:text-lg dark:text-gray-500">
          Please enter your registered email address to reset your password.
        </p>
      </div>
      <ResetPassword />
    </div>
  );
};
