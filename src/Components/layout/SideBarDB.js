import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../context/auth-context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase-app/firebaseconfig";
import useGetRole from "../../hooks/useGetRole";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";

const SideBarDB = () => {
  const { data } = useGetRole();
  const navigate = useNavigate();
  const handleSignOut = () => {
    Swal.fire({
      title: "Xác nhận đăng xuất",
      text: "Bạn có chắc muốn đăng xuất khỏi trang?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Xử lý xóa mục ở đây
        signOut(auth);
        Swal.fire("Đã đăng xuất!", "Đăng xuất thành công", "success");
        navigate("/");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hủy xóa
        Swal.fire("Hủy", "Đăng xuất đã bị hủy.", "error");
      }
    });
  };
  return (
    <div className="slide-dashboard col-span-1 p-5 border-r-2 border-gray-600">
      <NavLink
        to="/"
        className="flex items-center gap-x-5 text-gray-400 text-2xl"
      >
        <div className="w-[70px]">
          <img
            className="w-full h-full object-cover"
            srcSet="/monkey1.png"
            alt=""
          />
        </div>
        <h1 className="font-bold uppercase">Monkey Blogging</h1>
      </NavLink>
      <ul className="text-gray-400 text-xl mt-5 grid gap-y-3">
        <NavLink
          to="/manage/profile-user"
          style={({ isActive }) => {
            return {
              background: isActive ? "#3b82f6" : "",
              color: isActive ? "white" : null,
            };
          }}
          className="cursor-pointer p-3 flex items-center gap-x-3 rounded-lg"
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
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Profile
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              background: isActive ? "#3b82f6" : "",
              color: isActive ? "white" : null,
            };
          }}
          to="/manage/posts"
          className="cursor-pointer p-3 flex items-center gap-x-3 rounded-lg"
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
          Post
        </NavLink>

        {data && data?.role === "admin" && (
          <>
            {/* quản lí thẻ tag danh mục cần quyền admin */}
            <NavLink
              style={({ isActive }) => {
                return {
                  background: isActive ? "#3b82f6" : "",
                  color: isActive ? "white" : null,
                };
              }}
              className="cursor-pointer p-3 flex items-center gap-x-3 rounded-lg"
              to="/manage/category"
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
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
              Category
            </NavLink>

            {/* quản lí người dùng cần quyền admin */}
            <NavLink
              style={({ isActive }) => {
                return {
                  background: isActive ? "#3b82f6" : "",
                  color: isActive ? "white" : null,
                };
              }}
              to="/manage/manage-users"
              className="cursor-pointer p-3 flex items-center gap-x-3 rounded-lg"
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              User
            </NavLink>
          </>
        )}

        <NavLink
          onClick={handleSignOut}
          className="cursor-pointer p-3 flex items-center gap-x-3 rounded-lg"
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
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Logout
        </NavLink>
      </ul>
    </div>
  );
};

export default SideBarDB;
