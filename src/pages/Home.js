import React, { useState } from "react";
import { Feed } from "../components/feed/Feed";
import { TaskBoard } from "../components/task/TaskBoard";

export const Home = () => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-100 p-4 lg:p-10 flex flex-col items-center">
      {/* Tab Navigation */}
      <div className="mb-8 mt-20 flex gap-4 bg-white shadow-md rounded-full px-4 py-2">
        <button
          onClick={() => setActiveTab("feed")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeTab === "feed"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-blue-100"
          }`}
        >
          Social Feed
        </button>
        <button
          onClick={() => setActiveTab("tasks")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeTab === "tasks"
              ? "bg-purple-600 text-white shadow-md"
              : "text-gray-700 hover:bg-purple-100"
          }`}
        >
          Task Board
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full max-w-2xl p-6 md:p-10 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {activeTab === "feed" ? "Your Social Feed" : "Your Task Board"}
        </h2>
        {activeTab === "feed" ? <Feed /> : <TaskBoard />}
      </div>
    </div>
  );
};
