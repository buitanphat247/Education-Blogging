import React from "react";

const CardPost = ({ title, url_image }) => {
  return (
    <div className="flex items-center gap-x-3">
      <div className="max-w-[50px] h-[50px]">
        <img
          className="w-full h-full object-cover block rounded-lg"
          src={url_image}
          alt=""
        />
      </div>
      <div className="capitalize font-semibold text-gray-800">
        <h1 className="line-clamp-1">{title}</h1>
        <h1>data: 25 oct 2023</h1>
      </div>
    </div>
  );
};

export default CardPost;
