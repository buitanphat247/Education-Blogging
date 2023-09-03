import React from "react";
import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../context/auth-context";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../firebase-app/firebaseconfig";

const Header = () => {
  const value = useAuth();
  const [userInfor] = value;
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
    <div className="bg-teal-500 p-5 sticky top-0 z-50">
      <div className=" grid grid-cols-6 w-[60%] mx-auto">
        <div className="flex col-span-4 gap-x-5  items-center capitalize font-bold">
          <NavLink to="/" className="w-[50px] h-[50px] ">
            <img
              className="w-[50px] h-[50px] "
              srcSet="/monkey1.png"
              alt="logo"
            />
          </NavLink>
          <div className="flex gap-x-10">
            <NavLink
              className="text-xl cursor-pointer flex gap-x-2 items-center"
              to="/"
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Home
            </NavLink>
            <NavLink
              to="/view-all-posts"
              className="text-xl flex items-center gap-x-2"
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
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
              Blog
            </NavLink>
            <NavLink
              to="/manage/profile-user"
              className="text-xl flex items-center gap-x-2"
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
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              Manage
            </NavLink>
            <NavLink
              to="/about-page"
              className="text-xl flex items-center gap-x-2"
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
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              About
            </NavLink>
            <NavLink
              to="/about-page"
              className=" relative text-xl flex cursor-pointer items-center gap-x-2 group"
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              Docs
            </NavLink>
          </div>
        </div>
        <div className="col-span-2 flex justify-end gap-x-5">
          {!userInfor ? (
            <Button
              to="/signup"
              className="bg-blue-500 h-full font-bold text-white px-10 rounded-lg"
            >
              Sign Up
            </Button>
          ) : (
            <>
              <div className="relative rounded-lg">
                <Button
                  onClick={handleSignOut}
                  className="bg-blue-400 outline-none h-full text-white tex-2xl font-bold px-10 rounded-lg"
                >
                  Sign out
                </Button>
              </div>
              <NavLink to="/manage/profile-user" className="h-[50px] w-[50px]">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt=""
                />
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
