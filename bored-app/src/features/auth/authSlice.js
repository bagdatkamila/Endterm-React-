import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebaseConfig";
import { signupUser as apiSignup, loginUser as apiLogin, logoutUser as apiLogout, subscribeToAuth } from "../../api/authService";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// =============== REGISTER ===============
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await apiSignup(email, password);
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// =============== LOGIN ===============
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await apiLogin(email, password);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// =============== LOGOUT ===============
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async () => await apiLogout()
);

// =============== SLICE ===============
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

export const initAuthListener = () => (dispatch) => {
  subscribeToAuth((user) => {
    if (user) dispatch(setUser(user));
    else dispatch(clearUser());
  });
};
