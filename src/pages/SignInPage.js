import React, { useEffect, useState } from "react";
import Fields from "../Components/field/Fields";
import Label from "../Components/label/Label";
import Input from "../Components/input/Input";
import { useController } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import IconEyeOpen from "../Components/icon/IconEyeOpen";
import IconEyeClose from "../Components/icon/IconEyeClose";
import Button from "../Components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-app/firebaseconfig";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../context/auth-context";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import InputToggle from "../hooks/InputToggle";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Wrong email format"),
  password: yup.string().required("Password is required"),
});
const SignInPage = () => {
  const navigate = useNavigate();
  const { userInfor, setUserInfor } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const handleSignIn = async (data) => {
    if (!isValid) return;
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
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
      navigate("/signup");
    }
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
      <div className="bg-gray-700 min-h-[650px] w-[750px] mx-auto p-[50px] rounded-lg shadow-2xl shadow-black">
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
                <div className="h-[30px] w-[30px] rounded-full border-yellow-600 border-[3px] border-r-0 border-l-0 animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
