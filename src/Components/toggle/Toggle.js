import React from "react";

const Toggle = ({ on = false, onClick, ...props }) => {
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={on}
          onClick={onClick}
          onChange={() => {}}
          className="hidden"
        />
        <div
          className={`inline-block w-[100px] h-[52px] relative cursor-pointer rounded-full
        transition-all ${on ? "bg-blue-500" : "bg-gray-400"} p-1`}
        >
          <span
            className={`transition-all w-11 h-11 bg-white ${
              on ? "translate-x-[48px]" : ""
            } inline-block  rounded-full`}
          ></span>
        </div>
      </label>
    </>
  );
};

export default Toggle;
