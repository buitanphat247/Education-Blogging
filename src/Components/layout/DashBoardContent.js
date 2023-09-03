import React from "react";

const DashBoardContent = ({ children }) => {
  return (
    <div className="font-bold uppercase text-gray-400 text-3xl flex items-center gap-x-2">
      {children}
    </div>
  );
};

export default DashBoardContent;
