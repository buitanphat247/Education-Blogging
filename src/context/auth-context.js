import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-app/firebaseconfig";

const AuthContext = createContext();

export function AuthProvider(props) {
  const [userInfor, setUserInfor] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfor(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthContext.Provider
      value={[userInfor, setUserInfor]}
      {...props}
    ></AuthContext.Provider>
  );
}
export default function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
