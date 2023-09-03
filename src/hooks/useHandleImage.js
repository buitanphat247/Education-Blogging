import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
const useHandleImage = (setValue) => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [nameImage, setNameImage] = useState("");

  const handleUploadImg = (file) => {
    const storage = getStorage();
    if (!file) return;
    const storageRef = ref(storage, "images/" + file.name);
    setNameImage("images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    setValue("image", file.name);
    setNameImage(file.name);
    handleUploadImg(file);
  };

  const handleDeleteImage = async () => {
    const storage = getStorage();
    const desertRef = ref(storage, nameImage);

    // Delete the file
    await deleteObject(desertRef)
      .then(() => {
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return {
    handleUploadImg,
    progress,
    image,
    handleDeleteImage,
    handleSelectImage,
    setImage,
    setProgress,
    setNameImage,
    nameImage,
  };
};

export default useHandleImage;
