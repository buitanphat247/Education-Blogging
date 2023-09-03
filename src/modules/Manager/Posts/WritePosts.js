import React, { useEffect, useState } from "react";
import Fields from "../../../Components/field/Fields";
import Label from "../../../Components/label/Label";
import Input from "../../../Components/input/Input";
import { useForm } from "react-hook-form";
import InputRadio from "../../../Components/input/Radio";
import Button from "../../../Components/button/Button";
import slugify from "slugify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import ImageUpload from "../../../Components/image/ImageUpload";
import useHandleImage from "../../../hooks/useHandleImage";
import Toggle from "../../../Components/toggle/Toggle";
import { db } from "../../../firebase-app/firebaseconfig";
import { toast } from "react-toastify";
import useAuth from "../../../context/auth-context";
import DashBoardContent from "../../../Components/layout/DashBoardContent";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import MenuSelect from "../../../Components/dropdown/MenuSelect";
import Editor from "../../Editor/Editor";
import EditorWithUseQuill from "../../Editor/EditorWithUseQuill";

const WritePosts = () => {
  const navigate = useNavigate();
  const [userInfor] = useAuth();
  const [category_detail, set_Category_Detail] = useState(""); // tải thông tin của category đó
  const [category, setCategory] = useState([]); // dùng lấy ra danh mục bài viết
  const [content, set_Content] = useState("");
  const { handleSubmit, control, register, watch, reset, setValue, getValues } =
    useForm({
      mode: "onChange",
      defaultValues: {
        title: "",
        slug: "",
        status: "pending",
        trending: false,
        image: "",
        category_ID: "",
      },
    });
  // xử lí chức năng upload ảnh
  const {
    handleUploadImg,
    progress,
    image,
    handleDeleteImage,
    handleSelectImage,
    setImage,
    setProgress,
    setNameImage,
    nameImage,
  } = useHandleImage(setValue);

  // handle event submit form
  const onSubmit = async (values) => {
    try {
      values.slug = slugify(values.slug || values.title, {
        lower: true,
      });
      // Add a new document with a generated id.
      await addDoc(collection(db, "posts"), {
        slug: slugify(values.slug || values.title, { lower: true }),
        category_ID: category_detail.id,
        status: values.status,
        title: values.title,
        trending: values.trending,
        user_ID: userInfor.uid,
        URL_img: image,
        name_category: category_detail.name,
        slug_category: category_detail.slug,
        status_category: category_detail.status,
        author: userInfor.displayName,
        name_image: values.image,
        content: content,
        desc: values.description,
      });

      toast.success("Create new post successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // reset trạng thái sau khi submit
      reset({
        title: "",
        slug: "",
        status: "pending",
        trending: false,
        description: "",
        category_ID: "",
      });
      setImage("");
      setProgress(0);
      set_Content("");
      navigate("/manage/posts");
    } catch (error) {
      toast.error("Select category before submit", {
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

  // lấy ra danh mục bài viêts
  useEffect(() => {
    async function getData() {
      let results = [];
      const postRef = collection(db, "Categories");
      const q = query(postRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(results);
    }
    getData();
  }, []);

  const watchTrending = watch("trending");
  return (
    <>
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
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        <h1>Write new posts</h1>
      </DashBoardContent>

      <form onSubmit={handleSubmit(onSubmit)} className="py-5">
        <div className=" grid grid-cols-2 gap-y-5 gap-x-20">
          <Fields>
            <Label htmlFor="title" addClass={"text-xl"}>
              Title
            </Label>
            <Input
              control={control}
              name="title"
              placeholder="Enter your title"
              addClass={"mt-5"}
              type="text"
              required
            ></Input>
          </Fields>
          <Fields>
            <Label htmlFor="slug" addClass={"text-xl"}>
              slug
            </Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
              addClass={"mt-5"}
              type="text"
            ></Input>
          </Fields>

          <Fields>
            <Label htmlFor="image" addClass={"text-xl"}>
              image
            </Label>
            <ImageUpload
              onChange={handleSelectImage}
              name="image"
              type="file"
              className="hidden"
              progress={progress}
              image={image}
              handleDelete={handleDeleteImage}
            ></ImageUpload>
          </Fields>
          <div>
            <div className="mt-5 flex flex-col gap-y-5">
              <Label htmlFor="category" addClass={"text-xl"}>
                category
              </Label>

              <MenuSelect
                values={[category_detail, set_Category_Detail]}
                className="h-[50px] rounded-lg px-5 text-2xl outline-none capitalize"
                register={register}
                name="category_ID"
                options={category}
              ></MenuSelect>
            </div>
            <Fields>
              <Label htmlFor="desc">description</Label>
              <textarea
                required
                values={getValues("description")}
                onChange={(e) => setValue("desc", e.target.value)}
                name="description"
                {...register("description")}
                id="desc"
                className="min-h-[244px] rounded-lg outline-none p-5 text-xl"
              />
            </Fields>
          </div>

          {/* toggle trending */}
          <div className="mt-5 flex flex-col gap-y-5 col-start-1">
            <Label htmlFor="trending" addClass={"text-xl"}>
              trending
            </Label>
            <Toggle
              on={watchTrending}
              onClick={() => setValue("trending", !watchTrending)}
            ></Toggle>
          </div>
          {/* status */}
          <Fields>
            <h1 className="text-xl font-bold capitalize text-gray-400">
              Status
            </h1>
            <div className="flex gap-x-10 mt-5">
              <InputRadio
                name="status"
                register={register}
                value="pending"
              ></InputRadio>
              <InputRadio
                name="status"
                register={register}
                value="reject"
              ></InputRadio>
              <InputRadio
                name="status"
                register={register}
                value="approved"
              ></InputRadio>
            </div>
          </Fields>
          <div className="col-span-2  rounded-2xl">
            <label className="text-xl font-bold text-gray-400">Content</label>
            <EditorWithUseQuill
              content={content}
              set_Content={set_Content}
            ></EditorWithUseQuill>
          </div>
        </div>
        <div className="flex w-full items-center justify-center py-10">
          <Button
            type="submit"
            className="capitalize font-bold text-white bg-blue-500 px-10 h-[50px] rounded-lg"
          >
            Add new posts
          </Button>
        </div>
      </form>
    </>
  );
};

export default WritePosts;
