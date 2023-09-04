import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-app/firebaseconfig";
import useAuth from "../context/auth-context";

const useGetRole = (id_user) => {
  const [userInfor] = useAuth();
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", id_user || userInfor.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    fetchData();
  }, [id_user, userInfor.uid]);
  return { data };
};

export default useGetRole;
