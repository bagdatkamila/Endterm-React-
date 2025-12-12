// useProfilePicture.js
import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

export function useProfilePicture() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const uploadPicture = async (uid, dataUrl) => {
    setLoading(true);
    setError(null);

    try {
      // сохраняем URL в Firestore
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, { photoURL: dataUrl }, { merge: true });

      // обновляем глобальный стейт
      dispatch(setUser({ uid, photoURL: dataUrl }));

      setLoading(false);
      return dataUrl;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { uploadPicture, loading, error };
}
