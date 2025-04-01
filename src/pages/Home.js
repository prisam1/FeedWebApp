import React from "react";
import { Feed } from "../components/feed/Feed";
import { TaskBoard } from "../components/task/TaskBoard";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";

export const Home = () => {

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const location = useLocation();

  return (
    <div className="min-h-screen w-full lg:p-10 p-4 flex flex-row lg:justify-between lg:pt-40 pt-28 bg-slate-200">
      <Feed />
      <TaskBoard />
    </div>
  );
};
