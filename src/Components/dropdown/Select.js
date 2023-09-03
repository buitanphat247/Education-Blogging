import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { db } from "../../firebase-app/firebaseconfig";
const Select = ({
  children,
  setValue,
  getValues,
  selectedOption,
  setSelectedOption,
  setCategoryDetail,
}) => {
  const handleSelectChange = async (event) => {
    setValue("categoryId", event.target.value);
    setSelectedOption(getValues("categoryId"));
    const docRef = doc(db, "Categories", event.target.value);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCategoryDetail({
        id: docSnap.id,
        ...docSnap.data(),
      });
    }
  };
  return (
    <div>
      <select
        className="w-full h-[50px] px-5 rounded-lg outline-none text-xl capitalize"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Please select an option
        </option>
        {children}
      </select>
    </div>
  );
};

export default Select;
