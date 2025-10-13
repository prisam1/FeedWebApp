import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
