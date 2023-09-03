import React, { useEffect, useState } from "react";
import CardPost from "../../../Components/Card/CardPost";
import { Button } from "react-bootstrap";
import View from "../../../Components/actions/View";
import Edit from "../../../Components/actions/Edit";
import Remove from "../../../Components/actions/Remove";
import Swal from "sweetalert2";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-app/firebaseconfig";
import debounce from "lodash/debounce";
import { NavLink, useNavigate } from "react-router-dom";
import DashBoardContent from "../../../Components/layout/DashBoardContent";
import Fields from "../../../Components/field/Fields";
import Input from "../../../Components/input/Input";
import useSearch from "../../../hooks/useSearch";
const Category = () => {
  const navigate = useNavigate("");
  const { item, handleChange } = useSearch({
    path: "Categories",
    field: "name",
  });

  const handleClick = async (doc_id) => {
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
        await deleteDoc(doc(db, "Categories", doc_id));

        Swal.fire("Đã xóa!", "Mục đã được xóa thành công.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hủy xóa
        Swal.fire("Hủy", "Hành động đã bị hủy.", "error");
      }
    });
  };
  const handleClickEdit = (id) => {
    navigate(`/manage/update-category?id=${id}`);
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
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>

            <h1>Category</h1>
          </DashBoardContent>
          <span className="text-gray-400 text-lg mt-5 capitalize">
            Manage your category
          </span>
        </div>
        <NavLink
          to="/manage/add-category"
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
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
          Create Category
        </NavLink>
      </div>
      <div className="flex justify-center mt-5">
        <input
          type="text"
          placeholder="Search Your Category"
          onChange={handleChange}
          className="h-[50px] px-5 w-full outline-none text-lg rounded-lg"
        />
      </div>
      <div>
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
                Name
              </th>
              <th
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/6"
                scope="col"
              >
                Slug
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/6"
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
                  <tr className="text-gray-800 font-bold" key={item.id}>
                    <td className="px-5 py-2">{item.id}</td>
                    <td className="px-5 py-2 capitalize">{item.name}</td>
                    <td className="px-5 py-2 italic">{item.slug}</td>
                    <td className="px-5 py-2 capitalize ">
                      {item.status === "approved" && (
                        <Button className="bg-blue-400 text-white w-[150px] py-3 rounded-lg capitalize">
                          Aprroved
                        </Button>
                      )}
                      {item.status === "unapproved" && (
                        <Button className="bg-green-200 text-red-800 w-[150px] py-3 rounded-lg capitalize">
                          unapproved
                        </Button>
                      )}
                    </td>
                    <td className="px-5 py-2 capitalize flex items-center gap-x-2">
                      <Edit onClick={() => handleClickEdit(item.id)}></Edit>
                      <Remove onClick={() => handleClick(item.id)}></Remove>
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

export default Category;
