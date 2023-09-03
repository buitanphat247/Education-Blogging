import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { LoadingContext } from "../../pages/HomePage";
import Skeleton from "@mui/material/Skeleton";

const data_image = [
  {
    URL: "https://nld.mediacdn.vn/291774122806476800/2021/9/21/z2781481815673bcaa949d3dc23aa2ccc49e55980e4e93-1632229779349784256288.jpg",
  },
  {
    URL: "https://cly.1cdn.vn/2023/04/06/ba-ria-vung-tau-la-mot-trong-nhung-nen-kinh-te-phat-trien-nhanh-cua-vung-dong-nam-bo.jpg",
  },
  {
    URL: "https://baria-vungtau.dcs.vn/portal/images/anh_dep_ba_ria_vung_tau/132466459913947154.jpg",
  },
  {
    URL: "https://baria-vungtau.dcs.vn/portal/editor/images/Anh%20Bai%20Viet/1024px-M%E1%BB%99t_ph%E1%BA%A7n_V%C5%A9ng_T%C3%A0u_2.jpg",
  },

  {
    URL: "https://media.vneconomy.vn/w800/images/upload/2023/03/21/1-1.jpg",
  },
  {
    URL: "https://photo-cms-vovworld.zadn.vn/w500/Uploaded/vovworld/thpsplu/2022_12_03/kpvn-anh1_DIJE.jpg",
  },
  {
    URL: "https://nld.mediacdn.vn/291774122806476800/2021/7/17/z2618195801854c58fc8bffd4ee73bb62665b4a6d5e643-1-1626527491431454758496.jpg",
  },
  {
    URL: "https://vtv1.mediacdn.vn/zoom/640_400/2021/4/3/img-6704-1617415875270391685440.jpg",
  },
];
const HomeBaner = () => {
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  return (
    <div className="py-3 px-3">
      <div className="w-[100%] mx-auto">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          centeredSlides={false}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {isLoading === true && (
            <>
              <SwiperSlide>
                <div className="rounded-lg overflow-hidden group h-[400px] relative cursor-pointer">
                  <Skeleton variant="rectangular" height={440} />
                </div>{" "}
              </SwiperSlide>
              <SwiperSlide>
                <div className="rounded-lg overflow-hidden group h-[400px] relative cursor-pointer">
                  <Skeleton variant="rectangular" height={440} />
                </div>{" "}
              </SwiperSlide>{" "}
              <SwiperSlide>
                <div className="rounded-lg overflow-hidden group h-[400px] relative cursor-pointer">
                  <Skeleton variant="rectangular" height={440} />
                </div>{" "}
              </SwiperSlide>
            </>
          )}

          {isLoading === false &&
            data_image &&
            data_image.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className=" group h-[400px] relative cursor-pointer">
                    <img
                      className="w-full rounded-lg h-full object-cover"
                      src={item.URL}
                      alt=""
                    />
                    <div className="bg-black w-full h-full absolute top-0 right-0 left-0 bottom-0 rounded-lg opacity-40 transition-all"></div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBaner;
