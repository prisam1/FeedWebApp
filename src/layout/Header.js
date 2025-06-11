import React from "react";
import { LogOut, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { UserSelector } from "../redux/slices/userSlice";

export const Header = () => {
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const user = useSelector(UserSelector);
  return (
    <div className="flex items-center justify-between xl:gap-20 lg:px-10 px-4 h-24 w-full bg-purple-700 border-b shadow-md">
      <div className="flex items-center gap-2 xl:gap-8">
        <button
          onClick={() => navigate("/home")}
          className="flex h-14 w-14 justify-center items-center border-2 rounded-full"
        >
          <User className="w-7 h-7" />
        </button>

        <span className="font-bold lg:text-2xl text-xs">Greetings,</span>
        <span className="font-bold lg:text-2xl text-xs">
          {user?.name?.toUpperCase()?.substring(0, 24)}
        </span>
      </div>
      <div className="flex lg:flex-row flex-col lg:gap-10 gap-2">
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/reset-forgot-password")}
        >
          <Lock className="lg:w-6 lg:h-6 w-4 h-4" />
          <p className="font-medium lg:text-base text-xs">Reset Password</p>
        </button>

        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="lg:w-6 lg:h-6 w-4 h-4" />
          <p className="font-medium lg:text-base text-xs">Sign out</p>
        </button>
      </div>
    </div>
  );
};
