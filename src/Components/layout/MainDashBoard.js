import React from "react";
import SideBarDB from "./SideBarDB";
import { Outlet } from "react-router-dom";
import Header from "./Header";
const MainDashBoard = () => {
  document.title = "Manage";
  return (
    <>
      <Header></Header>
      <div className="bg-gray-700 my-10 grid grid-cols-5 min-h-[80vh]">
        <SideBarDB></SideBarDB>
        <div className="col-span-4 p-10">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default MainDashBoard;
