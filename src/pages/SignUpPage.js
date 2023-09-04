import React, { useEffect } from "react";
import Label from "../Components/label/Label";
import { useForm } from "react-hook-form";
import Input from "../Components/input/Input";
import Fields from "../Components/field/Fields";
import Button from "../Components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebaseconfig";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import InputToggle from "../hooks/InputToggle";
import slugify from "slugify";
const schema = yup.object({
  fullname: yup.string().required(" Fullname is required"),
  email: yup.string().required("Email is required").email("Wrong email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (data) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: data.fullname,
      });
      toast.success("Create account successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        username: slugify(data.fullname, { lower: true }),
        createdAt: serverTimestamp(),
        status: "active",
        role: "user",
        id: auth.currentUser.uid,
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

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
      <div className="bg-gray-700 w-[750px] min-h-[650px] mx-auto p-[50px] rounded-lg shadow-2xl shadow-black">
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
        <form onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
          <Fields>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              placeholder="Please enter your full name"
              name="fullname"
              control={control}
            ></Input>
          </Fields>
          <Fields>
            <Label htmlFor="email">email address</Label>
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
            <span className="text-think text-lg capitalize block ">
              You already have an account?{" "}
              <span
                className="text-blue-300 cursor-pointer underline"
                onClick={() => navigate("/signin")}
              >
                login
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
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
        <div className=" my-5 gap-3 flex flex-col">
          <h1 className="text-gray-400 text-center capitalize text-xl">
            Or you can Singup With
          </h1>
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

export default SignUpPage;
