import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashBoardContent from "../../../Components/layout/DashBoardContent";
import { useForm } from "react-hook-form";
import Fields from "../../../Components/field/Fields";
import Label from "../../../Components/label/Label";
import Input from "../../../Components/input/Input";
import Toggle from "../../../Components/toggle/Toggle";
import InputRadio from "../../../Components/input/Radio";
import { Button } from "react-bootstrap";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase-app/firebaseconfig";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import slugify from "slugify";
import MenuSelect from "../../../Components/dropdown/MenuSelect";
import EditorWithUseQuill from "../../Editor/EditorWithUseQuill";
Quill.register("modules/imageUploader", ImageUploader);
const PostsUpdate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const post_update_id = params.get("id");
  const [selectedOption, setSelectedOption] = useState(""); // Trạng thái lựa chọn
  const [category, setCategory] = useState([]); // load ra danh sách category
  const [category_detail, set_Category_Detail] = useState(""); // tải thông tin của category đó

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
        description: "",
      },
    });
  const [content, set_Content] = useState("");

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "posts", post_update_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        reset({
          title: docSnap.data().title,
          slug: docSnap.data().slug,
          trending: docSnap.data().trending,
          status: docSnap.data().status,
          description: docSnap.data()?.desc,
        });
        setValue("category_ID", docSnap.data().category_ID);
        set_Content(docSnap.data().content);
      }
    }
    fetchData();
  }, [post_update_id, reset, selectedOption, setValue]);

  // hàm load ra danh sách category
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
  // function update posts
  const handUpdatePost = async (data) => {
    console.log(data);

    const docRef = doc(db, "posts", post_update_id);
    if (category_detail === "") {
      await updateDoc(docRef, {
        title: data?.title,
        slug: slugify(data?.slug || data?.title, { lower: true }),
        status: data?.status,
        trending: data?.trending,
        desc: data?.description,
        content,
      });
    } else {
      await updateDoc(docRef, {
        title: data?.title,
        slug: slugify(data?.slug || data?.title, { lower: true }),
        status: data?.status,
        trending: data?.trending,
        content,
        desc: data?.description,
        category_ID: category_detail.id,
        name_category: category_detail.name,
        slug_category: category_detail.slug,
      });
    }
    toast.success("Update post successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/manage/posts");
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <h1>update post</h1>
          </DashBoardContent>
          <span className="text-gray-400 text-lg mt-5 capitalize">
            Update Your Posts by id: {" " + post_update_id}
          </span>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(handUpdatePost)} className="py-5">
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
                  values={getValues("description")}
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
              Update Post
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostsUpdate;
