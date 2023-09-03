import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-app/firebaseconfig";
import useAuth from "../context/auth-context";

const useGetRole = () => {
  const [userInfor] = useAuth();
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", userInfor.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    fetchData();
  }, [userInfor.uid]);
  return { data };
};

export default useGetRole;
