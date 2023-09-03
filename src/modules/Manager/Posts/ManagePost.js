import React, { useEffect, useState } from "react";
import Input from "../../../Components/input/Input";
import CardPost from "../../../Components/Card/CardPost";
import Button from "../../../Components/button/Button";
import DashBoardContent from "../../../Components/layout/DashBoardContent";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase-app/firebaseconfig";
import View from "../../../Components/actions/View";
import Edit from "../../../Components/actions/Edit";
import Remove from "../../../Components/actions/Remove";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { NavLink, useNavigate } from "react-router-dom";
import useSearch from "../../../hooks/useSearch";

const ManagePost = () => {
  const navigate = useNavigate();
  const { item, handleChange } = useSearch({
    path: "posts",
    field: "title",
  });
  const handleRemove = async (id) => {
    Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc muốn xóa mục này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Xử lý xóa mục ở đây
        await deleteDoc(doc(db, "posts", id));

        Swal.fire("Đã xóa!", "Mục đã được xóa thành công.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hủy xóa
        Swal.fire("Hủy", "Hành động đã bị hủy.", "error");
      }
    });
  };
  const handleEdit = (id) => {
    navigate(`/manage/update-post?id=${id}`);
  };
  const handleView = (id) => {
    navigate(`/details-posts?id=${id}`);
  };
  return (
    <>
      <div className="flex justify-between items-end">
        <div>
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <h1>All posts</h1>
          </DashBoardContent>
          <span className="text-gray-400 text-lg mt-5 capitalize">
            Manage Your Posts
          </span>
        </div>
        <NavLink
          to="/manage/writenewpost"
          className="bg-blue-500 text-white font-bold px-5 text-xl h-[50px] rounded-lg
           capitalize flex items-center gap-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          Create Posts
        </NavLink>
      </div>
      <div className="py-5">
        <div className="flex justify-end">
          <input
            onChange={handleChange}
            className="h-[50px] px-5 w-full rounded-lg outline-none text-lg"
            type="text"
            placeholder="Search Posts..."
            name="search_posts"
            id="search_posts"
          />
        </div>
        <table className="w-full mt-5 rounded-xl overflow-hidden bg-gray-50">
          <thead className="h-[50px] ">
            <tr>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/12"
              >
                ID
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold   text-left px-5 text-lg text-gray-500 uppercase w-1/3"
              >
                Posts
              </th>
              <th
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/12"
                scope="col"
              >
                Category
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/6"
              >
                Author
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/12"
              >
                status
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/12"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {item.length > 0 &&
              item.map((item, index) => {
                return (
                  <tr key={index} className="text-gray-800 font-bold">
                    <td className="px-5 py-2">{item.id.slice(0, 6) + "..."}</td>
                    <td className="px-5 py-2">
                      <CardPost
                        url_image={item.URL_img}
                        title={item.title}
                      ></CardPost>
                    </td>
                    <td className="px-5 py-2 capitalize">
                      {item.name_category}
                    </td>
                    <td className="px-5 py-2 capitalize">{item?.author}</td>
                    <td className="px-5 py-2 capitalize">
                      {item?.status === "approved" && (
                        <h1 className="bg-blue-400 text-white w-[150px] py-3 text-center rounded-lg">
                          {item?.status}
                        </h1>
                      )}
                      {item?.status === "reject" && (
                        <h1 className="bg-red-400 text-white w-[150px] py-3 text-center rounded-lg">
                          {item?.status}
                        </h1>
                      )}
                      {item?.status === "pending" && (
                        <h1 className="bg-green-300 text-red-500 w-[150px] py-3 text-center rounded-lg">
                          {item?.status}
                        </h1>
                      )}
                    </td>
                    <td className="px-5 py-2 capitalize flex items-center gap-x-2">
                      <View onClick={() => handleView(item.id)}></View>
                      <Edit onClick={() => handleEdit(item.id)}></Edit>
                      <Remove onClick={() => handleRemove(item.id)}></Remove>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManagePost;
