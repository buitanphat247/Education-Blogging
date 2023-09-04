import React, { useEffect, useState } from "react";
import DashBoardContent from "../Components/layout/DashBoardContent";
import PostFeatureItem from "../modules/Posts/PostFeatureItem";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-app/firebaseconfig";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Button from "../Components/button/Button";
import useTimeVn from "../hooks/useTimeVn";
import ViewDateAuthorUpdate from "../Components/Card/ViewDateAuthorUpdate";
const OverViewPage = () => {
  const { formattedVNTime } = useTimeVn();
  const navigate = useNavigate();
  document.title = "Posts Overview";
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"));
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setData(data);
    });
  }, []);
  const handleClick = (id) => {
    navigate(`/details-posts?id=${id}`);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Sau 5 giây, đánh dấu là đã tải xong
    }, 2500);
  }, []); //
  return (
    <div className="w-[70%] mx-auto  p-5">
      <DashBoardContent>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
          />
        </svg>
        <h1>Search Posts Detail</h1>
      </DashBoardContent>
      <div className="mt-5 grid grid-cols-5 gap-x-10">
        <div className="col-span-4">
          <input
            type="text"
            className="p-5 text-xl rounded-lg outline-none h-[50px] w-full"
            placeholder="Search your posts..."
          />
        </div>
        <div>
          <select className="w-full h-full text-xl px-5 rounded-lg">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-5 gap-5">
        {isLoading === false && (
          <>
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <PostFeatureItem
                    key={index}
                    onClick={() => handleClick(item.id)}
                    id={item.id}
                    url_image={item.URL_img}
                    category_id={item.category_ID}
                    title={item.title}
                    author={item.author}
                    user_id={item.user_ID}
                    name_category={item.name_category}
                  ></PostFeatureItem>
                );
              })}
            <div
              onClick={() => navigate("/view-all-posts/album-ba-ria-vung-tau")}
              className="bg-slate-900 p-3 flex flex-col h-[480px] rounded-lg group relative cursor-pointer"
            >
              <div className="rounded-lg cursor-pointer overflow-hidden relative h-[300px] ">
                <img
                  className="h-full"
                  src={
                    "https://soct.baria-vungtau.gov.vn/portal/images/hinh_anh_hoat_dong/132463893454733565.jpg"
                  }
                  alt="Tech item"
                />
              </div>
              <div className="text-white w-full flex-1 pt-5 flex flex-col">
                <div>
                  <Button className=" text-red-600 font-bold py-1 rounded-lg w-[130px]  bg-white capitalize">
                    <span className="line-clamp-1 text-sm px-3">Album</span>
                  </Button>
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold leading-8 capitalize line-clamp-2 mt-2">
                    Bộ sưu tập ảnh truyền thống và đặc sắc của tỉnh bà rịa -
                    vũng tàu
                  </p>
                </div>
                <ViewDateAuthorUpdate
                  date={formattedVNTime}
                  author={"Admin"}
                ></ViewDateAuthorUpdate>
              </div>
              <div className="bg-black absolute top-0 w-full h-full rounded-lg left-0 right-0 bottom-0 opacity-0  group-hover:block group-hover:opacity-30 transition-all"></div>
            </div>
          </>
        )}
        {isLoading === true &&
          new Array(21).fill("").map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <Skeleton variant="rectangular" height={480} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OverViewPage;
