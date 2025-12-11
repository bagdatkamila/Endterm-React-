import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filterActivities, getActivityByKey } from "../../api/boredApi";

// Получаем список активностей с фильтром
export const fetchActivities = createAsyncThunk(
  "items/fetchActivities",
  async ({ type, participants }) => {
    const data = await filterActivities({ type, participants });
    return data;
  }
);

// Получаем активность по ключу
export const fetchActivityByKey = createAsyncThunk(
  "items/fetchActivityByKey",
  async (key) => {
    const data = await getActivityByKey(key);
    return data;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    selectedItem: null,
    loadingList: false,
    loadingItem: false,
    errorList: null,
    errorItem: null,
  },
  reducers: {
    clearSelectedItem(state) {
      state.selectedItem = null;
      state.loadingItem = false;
      state.errorItem = null;
    },
  },
  extraReducers: (builder) => {
    // Список активностей
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.error.message;
      });

    // Детали активности
    builder
      .addCase(fetchActivityByKey.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(fetchActivityByKey.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchActivityByKey.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.error.message;
      });
  },
});

export const { clearSelectedItem } = itemsSlice.actions;
export default itemsSlice.reducer;
