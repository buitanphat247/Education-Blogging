import React from "react";

const ImgCard = () => {
  return (
    <div className="py-5">
      <div className="w-[80%] mx-auto rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1626968361222-291e74711449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt=""
        />
      </div>
      <p className="title text-center text-gray-800 text-xl py-2 line-clamp-2">
        Gastronomy atmosphere set aside. Slice butternut cooking home.
      </p>
    </div>
  );
};

export default ImgCard;
