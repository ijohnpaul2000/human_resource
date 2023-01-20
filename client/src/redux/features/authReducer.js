import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

export const LOGIN = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post("http://localhost:5000/api/auth", data);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGOUT: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: {
    [LOGIN.pending]: (state) => {
      state.isLoading = true;
    },
    [LOGIN.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [LOGIN.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { LOGOUT } = authSlice.actions;

export default authSlice.reducer;
