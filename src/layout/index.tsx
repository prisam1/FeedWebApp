import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      <div className="">
        <main className="">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
