import React, { createContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import HomeBaner from "../modules/Home/HomeBaner";
import PostFeature from "../modules/Home/HomeFeature";
import PostNewest from "../modules/Home/HomeNewest";
export const LoadingContext = createContext();
const HomePage = () => {
  document.title = "Home";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Sau 5 giây, đánh dấu là đã tải xong
    }, 2500);
  }, []); // [] để
  return (
    <div>
      <LoadingContext.Provider value={[isLoading, setIsLoading]}>
        <HomeBaner></HomeBaner>
        <PostFeature></PostFeature>
        <PostNewest></PostNewest>
      </LoadingContext.Provider>
    </div>
  );
};

export default HomePage;
