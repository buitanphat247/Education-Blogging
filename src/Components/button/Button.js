import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({ children, isLoading, to, ...props }) => {
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <button {...props}>{children}</button>
      </NavLink>
    );
  }
  return <button {...props}>{children}</button>;
};

export default Button;
