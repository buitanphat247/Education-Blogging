import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-app/firebaseconfig";
import { debounce } from "lodash";

const useSearch = ({ path, field }) => {
  const [item, setItem] = useState([]);
  const [querySearch, setQuerySearch] = useState("");
  useEffect(() => {
    if (querySearch === "") {
      const q = query(collection(db, path));
      onSnapshot(q, (querySnapshot) => {
        let results = [];
        querySnapshot.forEach((doc) => {
          results.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setItem(results);
      });
    } else {
      const q = query(
        collection(db, path),
        where(field, ">=", querySearch),
        where(field, "<=", querySearch + "utf8")
      );
      onSnapshot(q, (querySnapshot) => {
        let results = [];
        querySnapshot.forEach((doc) => {
          results.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setItem(results);
      });
    }
  }, [field, path, querySearch]);
  const handleChange = debounce((e) => {
    setQuerySearch(e.target.value);
  }, 500);
  return {
    item,
    handleChange,
  };
};

export default useSearch;
