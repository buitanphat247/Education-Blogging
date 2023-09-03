import React from "react";

const ImageUpload = ({
  onChange,
  name,
  type,
  progress = 0,
  handleDelete,
  image = "",
  ...props
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className=" rounded-lg mt-5 relative overflow-hidden group"
      >
        {image === "" ? (
          <input
            name={name}
            id={name}
            type={type}
            onChange={onChange}
            {...props}
          ></input>
        ) : null}
        <div className="h-[350px] bg-white rounded-xl cursor-pointer select-none relative flex items-center justify-center transition-all">
          {image === "" && progress === 0 && (
            <div
              className="text-gray-800 h-full rounded-lg
          text-2xl font-bold capitalize flex flex-col items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[125px] h-[125px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <h1>Choose Picture</h1>
            </div>
          )}
          {image === "" && progress !== 0 && (
            <div className="border-4 border-t-transparent  border-blue-500 rounded-full animate-spin w-[50px] h-[50px]"></div>
          )}
          {image !== "" && progress === 100 && (
            <div className="relative layer-image-in-addpost">
              <img src={image} className="w-full h-full object-cover" alt="" />
              <span
                onClick={handleDelete}
                className="group-hover:visible flex opacity-0 group-hover:opacity-100 transition-all invisible bg-white  absolute text-black w-[50px] h-[50px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full  items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
            </div>
          )}
        </div>
        <div
          className="border-2 absolute bottom-0 left-0 right-0 border-blue-500 transition-all"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      </label>
    </>
  );
};

export default ImageUpload;
