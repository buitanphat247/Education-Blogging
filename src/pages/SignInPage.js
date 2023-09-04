import React, { useEffect } from "react";
import Fields from "../Components/field/Fields";
import Label from "../Components/label/Label";
import Input from "../Components/input/Input";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebaseconfig";
import { NavLink, useNavigate } from "react-router-dom";
import InputToggle from "../hooks/InputToggle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Components/button/Button";
const schema = yup
  .object()
  .shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const SignInPage = () => {
  // hàm chuyển hướng
  const navigate = useNavigate();

  // react hook form
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // xử lí sự kiện đăng nhập
  const handleSignIn = async (data) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      toast.error("Not found Account", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // nếu đăng nhập thật bại hoặc gặp error load thông thông báo toastify
  useEffect(() => {
    const arrErrors = Object.values(errors);
    
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [errors]);
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center">
      <div className="bg-gray-700 min-h-[650px] w-[750px] mx-auto p-[50px] rounded-lg shadow-2xl shadow-black">
        {/* bọc logo */}
        <div className="mx-auto grid justify-center gap-y-3 text-3xl font-bold capitalize text-blue-300">
          <NavLink to="/">
            <img
              className="block mx-auto w-[100px] object-cover"
              srcSet="/monkey1.png"
              alt="monkey-bloggin-logo"
            />
            <h1>Monkey Blogging</h1>
          </NavLink>
        </div>
        {/* thành phần form đăng nhập */}
        <form onSubmit={handleSubmit(handleSignIn)} autoComplete="off">
          <Fields>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Please enter your email address"
              name="email"
              control={control}
            ></Input>
          </Fields>
          <InputToggle
            control={control}
            placeholder="Please enter your password address"
            name="password"
            titleLabel="password address"
          ></InputToggle>
          <div className="flex flex-col mt-5 text-gray-400">
            <span className="text-think text-lg capitalize block py-2">
              You have not had an account?{" "}
              <span
                className="text-blue-300 cursor-pointer underline"
                onClick={() => navigate("/signup")}
              >
                Register an account
              </span>
            </span>
            <Button
              className="h-[50px] flex items-center justify-center bg-blue-700 w-full text-white font-bold text-2xl rounded-lg "
              type="submit"
              disabled={isSubmitting ? true : false}
            >
              {isSubmitting ? (
                <div className="h-[40px] w-[40px] rounded-full border-white border-[3px] border-l-transparent animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
        <div className=" my-5 gap-3 flex flex-col">
          <h1 className="text-gray-400 text-center capitalize text-xl">Or you can Singin With</h1>
          <div className="flex items-center justify-center gap-x-5">
            <div className="cursor-pointer text-4xl h-[50px] w-[50px] flex items-center justify-center text-white bg-blue-700 rounded-xl p-0 m-0">
              <i className="fa-brands fa-facebook"></i>
            </div>
            <div className="cursor-pointer text-4xl h-[50px] w-[50px] flex items-center justify-center text-white bg-blue-700 rounded-xl p-0 m-0">
              <i className="fa-brands fa-github"></i>
            </div>
            <div className="cursor-pointer text-4xl h-[50px] w-[50px] flex items-center justify-center text-white bg-blue-700 rounded-xl p-0 m-0">
              <i className="fa-brands fa-twitter"></i>
            </div>
            <div className="cursor-pointer text-4xl h-[50px] w-[50px] flex items-center justify-center text-white bg-blue-700 rounded-xl p-0 m-0">
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
