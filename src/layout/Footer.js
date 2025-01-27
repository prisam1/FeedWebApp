import React from "react";

export const Footer = () => {
  return (
    <div className="flex items-center flex-col bg-slate-200 justify-between xl:gap-5 h-[10vh] py-2 lg:px-10 px-4 w-full border-t-[2px] border-gray-300">
      <div className="flex flex-row justify-between w-full">
        <h2 className="font-serif font-bold text-2xl">Feed</h2>

        <div className="flex flex-row items-center justify-between w-full lg:max-w-md max-w-32">
          <a
            target="_blank"
            href="/"
            rel="noreferrer"
            className="hover:text-blue-800 font-semibold lg:text-base text-sm"
          >
            Support
          </a>
          <a
            target="_blank"
            href="/"
            rel="noreferrer"
            className="hover:text-blue-800 font-semibold lg:text-base text-sm"
          >
            Blog
          </a>
          <a
            target="_blank"
            href="/"
            rel="noreferrer"
            className="hover:text-blue-800 font-semibold lg:text-base text-sm"
          >
            About
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <p className="font-semibold lg:text-base text-xs">@2025 Feed </p>
        <a
          target="_blank"
          href="/"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold lg:text-base text-xs"
        >
          Terms
        </a>
        <a
          target="_blank"
          href="/"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold lg:text-base text-xs"
        >
          Privacy
        </a>
        <a
          target="_blank"
          href="https://www.facebook.com"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold lg:text-base text-xs"
        >
          Facebook
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold lg:text-base text-xs"
        >
          Instagram
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com"
          rel="noreferrer"
          className="hover:text-blue-800 font-semibold lg:text-base text-xs"
        >
          Youtube
        </a>
      </div>
    </div>
  );
};
