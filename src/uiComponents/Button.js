import React from "react";

export const Button = ({ children, onClick, className = "", disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-semibold text-white ${disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600"
        } ${className}`}
    >
      {children}
    </button>
  );
};
