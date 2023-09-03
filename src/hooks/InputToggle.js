import React, { useState } from "react";
import Fields from "../Components/field/Fields";
import Label from "../Components/label/Label";
import Input from "../Components/input/Input";
import IconEyeOpen from "../Components/icon/IconEyeOpen";
import IconEyeClose from "../Components/icon/IconEyeClose";

const InputToggle = ({ control, titleLabel, placeholder, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Fields>
      <Label htmlFor={name}>{titleLabel}</Label>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        control={control}
      >
        {showPassword ? (
          <IconEyeOpen
            onClick={() => setShowPassword(!showPassword)}
          ></IconEyeOpen>
        ) : (
          <IconEyeClose
            onClick={() => setShowPassword(!showPassword)}
          ></IconEyeClose>
        )}
      </Input>
    </Fields>
  );
};

export default InputToggle;
