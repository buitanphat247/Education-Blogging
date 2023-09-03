import React from "react";

const Label = ({ htmlFor = "", children, addClass, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={`font-bold capitalize cursor-pointer text-xl mb-2 ${addClass} text-gray-400`}
    >
      {children}
    </label>
  );
};

export default Label;
