import React, {  } from "react";
import Button from "../../Components/button/Button";
import ViewDateAuthorUpdate from "../../Components/Card/ViewDateAuthorUpdate";
import useTimeVn from "../../hooks/useTimeVn";

const PostFeatureItem = ({
  name_category = "kiến thức",
  category_id,
  author = "kudo shinichi",
  user_id,
  onClick,
  title = "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
  url_image = "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
}) => {
  // eslint-disable-next-line no-undef
  const { formattedVNTime } = useTimeVn();
  return (
    <div
      onClick={onClick}
      className="bg-slate-900 p-3 flex flex-col h-[480px] rounded-lg group relative cursor-pointer"
    >
      <div className="rounded-lg cursor-pointer overflow-hidden relative h-[300px] ">
        <img className="h-full" src={url_image} alt="Tech item" />
      </div>
      <div className="text-white w-full flex-1 pt-5 flex flex-col">
        <div>
          <Button className=" text-red-600 font-bold py-1 rounded-lg w-[130px]  bg-white capitalize">
            <span className="line-clamp-1 text-sm px-3">{name_category}</span>
          </Button>
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold leading-8 capitalize line-clamp-2 mt-2">
            {title}
          </p>
        </div>
        <ViewDateAuthorUpdate
          date={formattedVNTime}
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

export default PostFeatureItem;
