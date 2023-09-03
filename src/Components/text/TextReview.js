import React from "react";

const TextReview = ({ title, children }) => {
  return (
    <>
      <h1 className="font-bold uppercase text-4xl py-5 text-gray-800">{title}</h1>
      <p className="text-2xl leading-10 text-justify text-gray-900">
        {children}
      </p>
    </>
  );
};

export default TextReview;
