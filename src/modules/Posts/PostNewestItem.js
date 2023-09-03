import React from "react";
import Button from "../../Components/button/Button";
import ViewDateAuthorUpdate from "../../Components/Card/ViewDateAuthorUpdate";

const PostNewestItem = ({
  name_category = "  Kiến Thức",
  url_image = "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  title = "  Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
  author,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer grid grid-cols-5 gap-2 p-3 relative"
    >
      <div className="rounded-lg overflow-hidden col-span-2 flex items-center justify-center">
        <img className="rounded-lg h-full" src={url_image} alt="" />
      </div>
      <div className=" w-full h-full col-span-3 text-gray-800 flex flex-col">
        <div>
          <Button className=" text-red-600 capitalize w-[150px] font-bold px-5 py-1 rounded-lg mb-2 bg-white">
            {name_category}
          </Button>
        </div>

        <p className="text-xl line-clamp-2 flex-1 capitalize  font-bold leading-8 text-white">
          {title}
        </p>
        <ViewDateAuthorUpdate
          isview={false}
          author={author}
        ></ViewDateAuthorUpdate>
      </div>
      <div
        className="bg-gray-700 absolute top-0 w-full h-full rounded-lg left-0 right-0 bottom-0
      opacity-0  group-hover:block group-hover:opacity-30 transition-all
      "
      ></div>
    </div>
  );
};

export default PostNewestItem;
