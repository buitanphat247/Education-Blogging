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
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import ViewDateAuthorUpdate from "../Components/Card/ViewDateAuthorUpdate";

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

  // fetch data của card author
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

  // fetch data của bài viết đề xuất
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
  // xử lí sự kiện click qua item khác
  const handleClick = (id) => {
    navigate(`/details-posts?id=${id}`);
  };
  // setloading skeleton
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  return (
    <div className="w-[60%] mx-auto">
      <div className="py-10">
        <div className="grid grid-cols-3 gap-x-5">
          <div className="col-span-2">
            {isLoading === true ? (
              <Skeleton variant="rounded" height={300} />
            ) : (
              <img className="rounded-xl w-full" src={data?.URL_img} alt="" />
            )}
          </div>
          <div className="col-span-1 flex flex-col justify-center gap-y-5">
            <div>
              {isLoading === true ? (
                <Skeleton variant="rounded" width={150} height={40} />
              ) : (
                <Button
                  style={{ background: "#F3EDFF" }}
                  className="px-5 rounded-lg py-1 text-red-500 bg-white text-lg font-bold capitalize"
                >
                  {data?.name_category}
                </Button>
              )}
            </div>
            <h1 className="text-3xl font-bold  line-clamp-3 leading-normal capitalize text-white">
              {isLoading === true ? (
                <>
                  <Stack spacing={1}>
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                  </Stack>{" "}
                </>
              ) : (
                data?.title
              )}
            </h1>
            <span className="text-lg">
              {isLoading === true ? (
                <>
                  <Stack spacing={1}>
                    <Skeleton variant="rounded" width={250} height={30} />
                  </Stack>{" "}
                </>
              ) : (
                <ViewDateAuthorUpdate
                  author={data?.author}
                ></ViewDateAuthorUpdate>
              )}
            </span>
          </div>
        </div>
        <div className="post-content mt-5">
          <div className=" entry-content text-white w-[80%] mx-auto ">
            {isLoading === true ? (
              <>
                <Stack spacing={1}>
                  {new Array(50).fill("").map((item, index) => (
                    <Skeleton variant="rounded" height={10} key={index} />
                  ))}
                </Stack>{" "}
                <div className="flex py-5 gap-x-5 px-5 mt-5 items-center rounded-lg overflow-hidden bg-green-800">
                  <div className="w-[200px] h-[250px]">
                    <Skeleton variant="rounded" width={200} height={250} />
                  </div>
                  <div className="flex-1">
                    <Stack spacing={1}>
                      {new Array(15).fill("").map((item, index) => (
                        <Skeleton variant="rounded" height={10} key={index} />
                      ))}
                    </Stack>
                  </div>
                </div>
              </>
            ) : (
              <>
                {data && data.content && parse(data.content)}
                <AuthorCard
                  url_image={url_image_author?.url_image}
                  text_content={data.desc}
                ></AuthorCard>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl text-purple-200 font-bold uppercase ">
          Bài Viết đề xuất
        </h1>
        <div className="">
          {isLoading === true && (
            <>
              <div className="grid grid-cols-4 gap-x-5">
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
          )}
        </div>
        <></>
      </div>
    </div>
  );
};

export default DetailPage;
