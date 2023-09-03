import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashBoardContent from "../../../Components/layout/DashBoardContent";
import Fields from "../../../Components/field/Fields";
import Label from "../../../Components/label/Label";
import Input from "../../../Components/input/Input";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-app/firebaseconfig";
import slugify from "slugify";
import { toast } from "react-toastify";
import InputRadio from "../../../Components/input/Radio";

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, register, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      status: "",
    },
  });
  const [params] = useSearchParams();
  const category_id = params.get("id");
  useEffect(() => {
    async function data() {
      const docRef = doc(db, "Categories", category_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        reset({
          name: docSnap.data()?.name,
          slug: docSnap.data()?.slug,
          status: docSnap.data()?.status,
        });
      }
    }
    data();
  }, [category_id, reset]);

  if (!category_id) return null;
  const onSubmit = async (data) => {
    const washingtonRef = doc(db, "Categories", category_id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      name: data.name,
      slug: slugify(data.slug || data.name, { lower: true }),
      status: data.status,
    });
    toast.success("Update Category successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/manage/category");
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
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>

          <h1>Category Update</h1>
        </DashBoardContent>
        <span className="text-gray-400 text-lg mt-5 capitalize">
          update your category by id: {category_id}
        </span>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-10">
            <Fields>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                control={control}
                placeholder="Enter your category name"
                required
              />
            </Fields>
            <Fields>
              <Label htmlFor="slug">slug</Label>
              <Input
                type="text"
                name="slug"
                control={control}
                placeholder="Enter your slug"
              />
            </Fields>
          </div>
          <Fields>
            <h1 className="text-xl font-bold capitalize text-gray-400">
              Status
            </h1>
            <div className="flex gap-x-10 mt-5">
              <InputRadio
                name="status"
                register={register}
                value="approved"
              ></InputRadio>
              <InputRadio
                name="status"
                register={register}
                value="unapproved"
              ></InputRadio>
            </div>
          </Fields>
          <div className="flex w-full items-center justify-center">
            <Button
              type="submit"
              className="capitalize font-bold text-white bg-blue-500 px-10 h-[50px] rounded-lg mt-10"
            >
              Update Category
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryUpdate;
