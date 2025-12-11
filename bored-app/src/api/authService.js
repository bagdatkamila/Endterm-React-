// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged 
// } from "firebase/auth";
// import { auth } from "../firebase/firebaseConfig";

// export const registerUser = (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// export const loginUser = (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

// export const logoutUser = () => {
//   return signOut(auth);
// };


import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Регистрация нового пользователя
export async function signupUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Вход пользователя
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Выход пользователя
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}

export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};
