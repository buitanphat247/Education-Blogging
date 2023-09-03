import React from "react";

const Fields = ({ children, ...props }) => {
  return <div className="grid mt-5">{children}</div>;
};

export default Fields;
