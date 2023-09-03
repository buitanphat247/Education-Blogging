import React, { useContext, useEffect, useState } from "react";
import Button from "../../Components/button/Button";
import PostFeatureItem from "../Posts/PostFeatureItem";
import Skeleton from "@mui/material/Skeleton";
// Import Swiper styles
import "swiper/css";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../pages/HomePage";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const PostFeature = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("trending", "==", true));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setData(posts);
      });
    }
    getData();
  }, []);
  const handleClick = (id) => {
    navigate(`/details-posts?id=${id}`);
  };
  const [isLoading] = useContext(LoadingContext);
  return (
    <div className="w-[60%] mx-auto mt-10">
      <h1 className="text-3xl text-purple-200 font-bold uppercase ">
        Bài viết nổi bật
      </h1>
      <div className=" py-5 gap-5">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
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
          {isLoading === true && (
            <>
              <div className="grid grid-cols-3 gap-x-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <Skeleton variant="rectangular" height={450} />
                  </div>
                ))}
              </div>
            </>
          )}
          {isLoading === false &&
            data.length > 0 &&
            data.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <PostFeatureItem
                    onClick={() => handleClick(item.id)}
                    id={item.id}
                    url_image={item.URL_img}
                    category_id={item.category_ID}
                    title={item.title}
                    author={item.author}
                    user_id={item.user_ID}
                    name_category={item.name_category}
                  ></PostFeatureItem>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default PostFeature;
