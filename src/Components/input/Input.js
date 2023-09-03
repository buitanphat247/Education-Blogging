import React from "react";
import { useController } from "react-hook-form";
import IconEyeOpen from "../icon/IconEyeOpen";
import IconEyeClose from "../icon/IconEyeClose";

const Input = ({
  control,
  name = "",
  placeholder = "",
  type = "text",
  hasIcon = false,
  children,
  addClass,
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
    // rules: { required: true },
  });
  return (
    <div className="rounded-lg relative">
      <input
        className={`${addClass} block w-full rounded-lg h-[50px] p-5 outline-none
               bg-white transition-all `}
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        {...field}
        {...props}
      />
      {children}
    </div>
  );
};

export default Input;
