import React from "react";
import Button from "../../Components/button/Button";
import ViewDateAuthorUpdate from "../../Components/Card/ViewDateAuthorUpdate";

const PostNewestLargeItem = ({
  name_category = "  Kiến Thức",
  url_image = "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  title = "  Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
  author,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer col-span-2 grid gap-y-3 bg-slate-900 p-3 rounded-lg "
    >
      <div className="rounded-lg overflow-hidden">
        <img className="h-full w-full" src={url_image} alt="" />
      </div>
      <div className="text-white ">
        <Button className=" text-red-600 mt-2 font-bold px-5 py-1 rounded-lg bg-white capitalize">
          {name_category}
        </Button>
        <div className="grid gap-y-3 mt-2 text-white">
          <p className="text-3xl font-bold line-clamp-2 capitalize">{title}</p>
          <ViewDateAuthorUpdate
            isview={false}
            author={author}
          ></ViewDateAuthorUpdate>
        </div>
      </div>
      <div
        className="bg-gray-700 absolute top-0 w-full h-full rounded-lg left-0 right-0 bottom-0
      opacity-0  group-hover:block group-hover:opacity-30 transition-all
      "
      ></div>
    </div>
  );
};

export default PostNewestLargeItem;
