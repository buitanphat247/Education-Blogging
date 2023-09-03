import React from "react";
import Label from "../label/Label";

const InputRadio = ({
  register,
  name,
  type = "radio",
  value = "",
  ...props
}) => {
  return (
    <div className="flex gap-x-1">
      <input
        {...register(name)}
        id={value}
        type={type}
        value={value}
        {...props}
        className="hidden"
      />
      <label className="radio-label w-[25px] h-[25px] bg-white rounded-full text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </label>
      <Label htmlFor={value}>{value}</Label>
    </div>
  );
};

export default InputRadio;
