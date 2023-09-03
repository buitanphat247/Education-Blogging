import React, { useEffect, useState } from "react";
import PostItem from "../modules/Posts/PostItem";
import DashBoardContent from "../Components/layout/DashBoardContent";
import PostFeatureItem from "../modules/Posts/PostFeatureItem";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-app/firebaseconfig";
import { useNavigate } from "react-router-dom";

const OverViewPage = () => {
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
  console.log(data);
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
      </div>
    </div>
  );
};

export default OverViewPage;
