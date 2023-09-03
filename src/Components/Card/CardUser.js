/* eslint-disable no-undef */
import React from "react";
const { DateTime } = require("luxon");

const vnTime = DateTime.now()
  .setZone("Asia/Ho_Chi_Minh")
  .toFormat("dd/MM/yyyy");

const CardUser = ({
  name = "Bùi Tấn Phát",
  url_image = "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
}) => {
  return (
    <div className="h-full flex items-center gap-x-2">
      <div className="max-w-[50px] h-[50px] ">
        <img
          className="w-full h-full object-cover rounded-md"
          src={url_image}
          alt=""
        />
      </div>
      <div className="text-gray-800">
        <h1 className="line-clamp-1">{name}</h1>
        <h1>{vnTime}</h1>
      </div>
    </div>
  );
};

export default CardUser;
