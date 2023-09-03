import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Main = () => {
  return (
    <>
      <Header></Header>
      <div className="bg-gray-700 mt-10 min-h-[340px]">
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Main;
