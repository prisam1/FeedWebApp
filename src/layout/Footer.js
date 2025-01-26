import React from "react";

export const Footer = () => {
  return (
    <div className="flex items-center flex-col bg-slate-200 justify-between xl:gap-5 h-30 py-2 px-10 w-full border-t-[2px] border-gray-300">
      <div className="flex flex-row justify-between w-full">
        <h2 className="font-serif font-bold text-2xl">Feed</h2>

        <div className="flex flex-row justify-between w-full max-w-md">
          <a
            target="_blank"
            href="/"
            rel="noreferrer"
            className="hover:text-blue-800 font-semibold"
          >
            Support
          </a>
          <a
            target="_blank"
            href="/"
            rel="noreferrer"
            className="hover:text-blue-800 font-semibold"
          >
            Blog
          </a>
          <a
            target="_blank"
            href="/"
            rel="noreferrer"
            className="hover:text-blue-800 font-semibold"
          >
            About
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <p className="font-semibold">@2025 Feed </p>
        <a
          target="_blank"
          href="/"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold"
        >
          Terms
        </a>
        <a
          target="_blank"
          href="/"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold"
        >
          Privacy
        </a>
        <a
          target="_blank"
          href="https://www.facebook.com"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold"
        >
          Facebook
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold"
        >
          Instagram
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold"
        >
          Youtube
        </a>
      </div>
    </div>
  );
};
