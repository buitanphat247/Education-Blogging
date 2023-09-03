import React from "react";
import Button from "../../Components/button/Button";
import ViewDateAuthorUpdate from "../../Components/Card/ViewDateAuthorUpdate";

const PostItem = ({
  name_category = "  Kiến Thức",
  url_image = "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  title = "  Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
  author,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-slate-900 p-3 flex flex-col h-[450px] rounded-lg group relative cursor-pointer"
    >
      <div className="rounded-lg cursor-pointer">
        <img className="h-[200px] rounded-lg  w-full object-cover" src={url_image} alt="Tech item" />
      </div>
      <div className="text-white w-full flex-1 pt-5 flex flex-col">
        <div>
          <Button className=" text-red-600 font-bold py-1 rounded-lg w-[130px]  bg-white capitalize">
            <span className="line-clamp-1 text-sm px-3">{name_category}</span>
          </Button>
        </div>
        <div className="flex-1 mb-5">
          <p className="text-2xl font-bold leading-8 capitalize line-clamp-3 mt-2">
            {title}
          </p>
        </div>
        <ViewDateAuthorUpdate
          author={author}
        ></ViewDateAuthorUpdate>
      </div>
      <div
        className="bg-black absolute top-0 w-full h-full rounded-lg left-0 right-0 bottom-0
      opacity-0  group-hover:block group-hover:opacity-30 transition-all
      "
      ></div>
    </div>
  );
};

export default PostItem;
