import { collection, doc, getDoc, query } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { db } from "../../firebase-app/firebaseconfig";

const MenuSelect = ({
  getValues,
  values,
  register,
  options,
  name,
  ...rest
}) => {
  const [, set_Category_Detail] = values;
  const [selected_id, set_Selected_id] = useState("");
  useEffect(() => {
    async function fetchData() {
      if (selected_id !== "") {
        const docRef = doc(db, "Categories", selected_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          set_Category_Detail({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      }
    }
    fetchData();
  }, [selected_id, set_Category_Detail]);
  const handleChange = (e) => {
    set_Selected_id(e.target.value);
  };

  return (
    <select {...register(name)} {...rest} onChange={handleChange}>
      <option value="" disabled>
        Please select an option
      </option>
      {options.map((value, index) => (
        <option value={value.id} key={value.id}>
          {value.name}
        </option>
      ))}
    </select>
  );
};

export default MenuSelect;
