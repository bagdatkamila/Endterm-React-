import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import itemsReducer from "./features/items/itemsSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    favorites: favoritesReducer,
  },
});
