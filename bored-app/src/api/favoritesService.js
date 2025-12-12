// src/services/favoritesService.js
import { db } from "../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Получить избранное из Firestore
export const getFirestoreFavorites = async (uid) => {
  if (!uid) return [];
  const docRef = doc(db, "favorites", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().items || [] : [];
};

// Обновить избранное в Firestore
export const updateFirestoreFavorites = async (uid, items) => {
  if (!uid) return;
  const docRef = doc(db, "favorites", uid);
  await setDoc(docRef, { items }, { merge: true });
};
