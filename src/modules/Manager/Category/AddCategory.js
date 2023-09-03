import { Field } from "formik";
import React from "react";
import Label from "../../../Components/label/Label";
import { useForm } from "react-hook-form";
import Input from "../../../Components/input/Input";
import Fields from "../../../Components/field/Fields";
import InputRadio from "../../../Components/input/Radio";
import { Button } from "react-bootstrap";
import slugify from "slugify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase-app/firebaseconfig";
import { toast } from "react-toastify";
import DashBoardContent from "../../../Components/layout/DashBoardContent";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      status: "approved",
    },
  });
  const onSubmit = async (data) => {
    if (data.slug === "") data.slug = slugify(data.name, { lower: true });
    else data.slug = slugify(data.slug, { lower: true });
    try {
      await addDoc(collection(db, "Categories"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new category successfully", {
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
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        name: "",
        slug: "",
        status: "approved",
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
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>

          <h1>New Category</h1>
        </DashBoardContent>
        <span className="text-gray-400 text-lg mt-5 capitalize">
          add New category
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
              Add new category
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
