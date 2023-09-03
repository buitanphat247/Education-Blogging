import React, { useEffect, useState } from "react";
import Button from "../Components/button/Button";
import PostItem from "../modules/Posts/PostItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-app/firebaseconfig";
import parse from "html-react-parser";
import AuthorCard from "../Components/Card/AuthorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const DetailPage = () => {
  const [params] = useSearchParams();
  const params_id = params.get("id");
  const [data, setData] = useState("");
  const [url_image_author, set_url_image_author] = useState();

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "posts", params_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    }
    fetchData();
  }, [params_id]);
  useEffect(() => {
    async function fetchData() {
      if (data !== "") {
        const docRef = doc(db, "users", data.user_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          set_url_image_author(docSnap.data());
        }
      }
    }
    fetchData();
  }, [data]);
  const navigate = useNavigate("");
  const [data_posts, setDataPosts] = useState([]);
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
      setDataPosts(data);
    });
  }, []);
  console.log(data);
  const handleClick = (id) => {
    navigate(`/details-posts?id=${id}`);
  };
  return (
    <div className="w-[60%] mx-auto">
      <div className="py-10">
        <div className="grid grid-cols-3 gap-x-5">
          <div className="col-span-2">
            <img className="rounded-xl w-full" src={data?.URL_img} alt="" />
          </div>
          <div className="col-span-1 flex flex-col justify-center gap-y-5">
            <div>
              <Button
                style={{ background: "#F3EDFF" }}
                className="px-5 rounded-lg py-1 text-red-500 bg-white text-lg font-bold capitalize"
              >
                {data?.name_category}
              </Button>
            </div>
            <h1 className="text-3xl font-bold  line-clamp-3 leading-normal capitalize text-white">
              {data?.title}
            </h1>
          </div>
        </div>
        <div className="post-content mt-5">
          <div className=" entry-content text-white w-[80%] mx-auto ">
            {data && data.content && parse(data.content)}
            <AuthorCard
              url_image={url_image_author?.url_image}
              text_content={data?.desc}
            ></AuthorCard>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl text-purple-200 font-bold uppercase ">
          Bài Viết Liên Quan
        </h1>
        <div className="gap-5 py-5">
          <>
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
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
              {data_posts.length > 0 &&
                data_posts.map((item, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
