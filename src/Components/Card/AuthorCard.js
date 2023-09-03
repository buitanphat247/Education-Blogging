import React from "react";

const AuthorCard = ({ url_image, text_content }) => {
  return (
    <div className="flex py-5 gap-x-5 px-5 mt-5 items-center rounded-lg overflow-hidden bg-green-800">
      <div className="w-[200px] h-[250px]">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={url_image}
          alt=""
        />
      </div>
      <div className="flex-1">{text_content}</div>
    </div>
  );
};

export default AuthorCard;
