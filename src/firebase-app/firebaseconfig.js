import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Đúng chính tả: 'firestore' thay vì 'fireStore'
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBzri7gIDAOUXOJiXV9qM9OxnC9oOCHLpI",
  authDomain: "monkeyblogging-3efd2.firebaseapp.com",
  projectId: "monkeyblogging-3efd2",
  storageBucket: "monkeyblogging-3efd2.appspot.com",
  messagingSenderId: "832254589597",
  appId: "1:832254589597:web:b0b660e3c51423cbc0f274"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
