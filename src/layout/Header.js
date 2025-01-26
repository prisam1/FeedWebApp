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
    <div className="flex items-center justify-between xl:gap-20 px-10 h-32 w-full bg-purple-700 border-b shadow-md">
      <div className="flex items-center gap-2 xl:gap-8">
        <button
          onClick={() => navigate("/home")}
          className="flex h-14 w-14 justify-center items-center border-2 rounded-full"
        >
          <User className="w-7 h-7" />
        </button>

        <span className="font-bold text-2xl">Greetings,</span>
        <span className="font-bold text-2xl">
          {user?.name?.toUpperCase()?.substring(0, 24)}
        </span>
      </div>
      <div className="flex flex-row gap-10">
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/reset-forgot-password")}
        >
          <Lock className="w-6 h-6 text-sm" />
          <p className="font-medium">Reset Password</p>
        </button>

        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="w-6 h-6 text-sm" />
          <p className="font-medium">Sign out</p>
        </button>
      </div>
    </div>
  );
};
