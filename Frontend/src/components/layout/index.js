import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      <main className="mx-auto max-w-7xl bg-gray-100 px-4 py-10 ">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
