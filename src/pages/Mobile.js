import React from "react";

const Mobile = () => {
  return (
    <div className=" h-[100vh] bg-slate-900 flex items-center justify-center flex-col gap-5 text-white text-2xl text-center">
      <div>
        <h1 className="capitalize font-bold text-3xl">
          Giao diện mobile hiện chưa cập nhật vui lòng thử lại bằng cách truy
          cập máy tính
        </h1>
      </div>

      <div className="w-[50px] h-[50px] border-4 border-t-transparent animate-spin rounded-full"></div>
    </div>
  );
};

export default Mobile;
