import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const Body = () => {
  return (
    <div className="min-h-screen relative flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
