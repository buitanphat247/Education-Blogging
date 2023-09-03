import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashBoardContent from "../../../Components/layout/DashBoardContent";
import { useForm } from "react-hook-form";
import ImageUpload from "../../../Components/image/ImageUpload";
import Fields from "../../../Components/field/Fields";
import Label from "../../../Components/label/Label";
import Input from "../../../Components/input/Input";
import InputRadio from "../../../Components/input/Radio";
import { Button } from "react-bootstrap";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-app/firebaseconfig";
import { toast } from "react-toastify";
import useHandleImage from "../../../hooks/useHandleImage";
import { deleteObject, getStorage, ref } from "firebase/storage";

const UserUpdate = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, register, setValue, reset } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: "active",
      role: "user",
    },
  });
  const [params] = useSearchParams();
  const params_id = params.get("id");

  useEffect(() => {
    async function data() {
      const docRef = doc(db, "users", params_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        reset({
          fullname: docSnap.data()?.fullname,
          username: docSnap.data()?.username,
          email: docSnap.data()?.email,
          password: docSnap.data()?.password,
          status: docSnap.data()?.status,
          role: docSnap.data()?.role,
        });
      }
    }
    data();
  }, [params_id, reset]);

  if (!params_id) return null;

  const onSubmit = async (data) => {
    try {
      const userRef = doc(db, "users", params_id);
      await updateDoc(userRef, {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
        status: data.status,
        role: data.role,
      });
      toast.success("Update account successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/manage/manage-users");
    } catch (error) {
      toast.success("Update account failed", {
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

  return (
    <>
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
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>

          <h1>Update Users</h1>
        </DashBoardContent>
        <span className="text-gray-400 text-lg mt-5">
          <span className="capitalize">update user by id </span>
          {" " + params_id}
        </span>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-10">
            <Fields>
              <Label htmlFor="fullname">fullname</Label>
              <Input
                control={control}
                name="fullname"
                type="text"
                placeholder="Enter your fullname"
              ></Input>
            </Fields>
            <Fields>
              <Label htmlFor="username">username</Label>
              <Input
                control={control}
                type="text"
                name="username"
                placeholder="Enter your username"
              ></Input>
            </Fields>
            <Fields>
              <Label htmlFor="email">email</Label>
              <Input
                control={control}
                name="email"
                type="email"
                placeholder="Enter your email address"
              ></Input>
            </Fields>
            <Fields>
              <Label htmlFor="password">password</Label>
              <Input
                control={control}
                name="password"
                placeholder="Enter your password"
              ></Input>
            </Fields>
            <Fields>
              <Label>Status</Label>
              <div className="flex gap-x-10 mt-5">
                <InputRadio
                  name="status"
                  register={register}
                  value="active"
                ></InputRadio>
                <InputRadio
                  name="status"
                  register={register}
                  value="inactive"
                ></InputRadio>
                <InputRadio
                  name="status"
                  register={register}
                  value="offline"
                ></InputRadio>
              </div>
            </Fields>
            <Fields>
              <Label>Role Users</Label>
              <div className="flex gap-x-10 mt-5">
                <InputRadio
                  name="role"
                  register={register}
                  value="admin"
                ></InputRadio>
                <InputRadio
                  name="role"
                  register={register}
                  value="user"
                ></InputRadio>
              </div>
            </Fields>
          </div>
          <div className="flex w-full items-center justify-center py-10">
            <Button
              type="submit"
              className="capitalize font-bold text-white bg-blue-500 px-10 h-[50px] rounded-lg"
            >
              Update infor user
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserUpdate;
