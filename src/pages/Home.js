import React from "react";
import { Feed } from "../components/feed/Feed";
import { TaskBoard } from "../components/task/TaskBoard";

export const Home = () => {
  return (
    <div className="min-h-screen w-full p-10 flex flex-row justify-between pt-40 bg-slate-200">
      <Feed />
      <TaskBoard />
    </div>
  );
};
