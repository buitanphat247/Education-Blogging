import React, { useContext, useEffect, useState } from "react";
import PostNewestLargeItem from "../Posts/PostNewestLargeItem";
import PostNewestItem from "../Posts/PostNewestItem";
import PostItem from "../Posts/PostItem";
import { LoadingContext } from "../../pages/HomePage";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase-app/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const PostNewest = () => {
  const [isLoading] = useContext(LoadingContext);
  const navigate = useNavigate("");
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
  return (
    <div className="w-[60%] mx-auto mt-10">
      <h1 className="text-3xl text-purple-200 font-bold uppercase">
        Cập nhật bài viết
      </h1>
      <div className="grid grid-cols-4 gap-x-5 py-5">
        {isLoading === true && (
          <div className="group relative cursor-pointer col-span-2 grid gap-y-3 bg-slate-900 p-3 rounded-lg ">
            <Stack spacing={1} className="col-span-2">
              <Skeleton variant="rounded" height={280} />
              <Skeleton variant="rectangular" height={20} />
              <Skeleton variant="rectangular" height={20} />
              <Skeleton variant="rectangular" height={20} />
              <Skeleton variant="rectangular" height={20} />
              <Skeleton variant="rectangular" height={20} />
              <Skeleton variant="rectangular" height={20} />
              <Skeleton variant="rectangular" height={20} />
            </Stack>
          </div>
        )}
        {isLoading === false && (
          <PostNewestLargeItem
            name_category={data[0]?.name_category}
            title={data[0]?.title}
            author={data[0]?.author}
            url_image={data[0]?.URL_img}
            onClick={() => handleClick(data[0].id)}
          ></PostNewestLargeItem>
        )}
        <div className="col-span-2 grid grid-rows-3  rounded-lg bg-slate-900">
          {isLoading === true && (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="group cursor-pointer grid grid-cols-5 gap-x-5 p-3 relative"
                  key={index}
                >
                  <div className="col-span-2">
                    <Skeleton variant="rounded" height={130} />
                  </div>
                  <div className="col-span-3">
                    <Stack spacing={1} className="col-span-2">
                      <Skeleton variant="rounded" width={100} height={30} />
                      <Skeleton variant="rectangular" height={10} />
                      <Skeleton variant="rectangular" height={10} />
                      <Skeleton variant="rectangular" height={10} />
                      <Skeleton variant="rectangular" height={10} />
                      <Skeleton variant="rectangular" height={10} />
                    </Stack>
                  </div>
                </div>
              ))}
            </>
          )}
          {isLoading === false && (
            <>
              {data.length > 0 &&
                data
                  .slice(1, 4)
                  .map((item, index) => (
                    <PostNewestItem
                      key={index}
                      name_category={item?.name_category}
                      title={item?.title}
                      author={item?.author}
                      url_image={item?.URL_img}
                      onClick={() => handleClick(item.id)}
                    ></PostNewestItem>
                  ))}
            </>
          )}{" "}
        </div>
      </div>
      <div>
        <h1 className="text-3xl text-purple-200 font-bold uppercase">
          Bài viết đề xuất
        </h1>
        <div className="gap-5 py-5">
          {isLoading === true && (
            <>
              <div className="grid grid-cols-4 gap-x-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="group bg-slate-900 p-2 rounded-lg relative   cursor-pointer"
                  >
                    <div className="rounded-lg overflow-hidden relative h-[200px] ">
                      <Skeleton variant="rounded" height={200} />
                    </div>
                    <div className=" w-full py-2 text-white">
                      <Stack spacing={1}>
                        <Skeleton variant="rounded" width={100} height={30} />
                        <Skeleton variant="rectangular" height={10} />
                        <Skeleton variant="rectangular" height={10} />
                        <Skeleton variant="rectangular" height={10} />
                        <Skeleton variant="rectangular" height={10} />
                        <Skeleton variant="rectangular" height={10} />
                      </Stack>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {isLoading === false && (
            <>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                centeredSlides={false}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {data.length > 0 &&
                  data.map((item, index) => (
                    <SwiperSlide key={index}>
                      <PostItem
                        name_category={item?.name_category}
                        title={item?.title}
                        author={item?.author}
                        url_image={item?.URL_img}
                        onClick={() => handleClick(item.id)}
                      ></PostItem>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostNewest;
