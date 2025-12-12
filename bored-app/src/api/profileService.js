// src/api/profileService.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Сохраняет profile picture в Firestore под документом пользователя
 * @param {string} uid - UID пользователя
 * @param {string} base64Image - base64 изображение
 * @returns {Promise<string>} URL изображения (в нашем случае просто base64)
 */
export const updateProfilePicture = async (uid, base64Image) => {
  if (!uid) throw new Error("User UID is required");

  const userDocRef = doc(db, "users", uid);

  // Используем setDoc с { merge: true }, чтобы не перезаписывать весь документ
  await setDoc(
    userDocRef,
    {
      photoURL: base64Image,
    },
    { merge: true }
  );

  return base64Image;
};
