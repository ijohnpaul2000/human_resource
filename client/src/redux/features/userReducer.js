import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  userInfo: [],
  isModalOpened: false,
  selectedUser: "",
};

export const getUsersInfo = createAsyncThunk(
  "get/users",

  async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    IS_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    USER_INFO: (state, action) => {
      state.userInfo = action.payload;
    },
    IS_MODAL_OPENED: (state, action) => {
      state.isModalOpened = action.payload;
    },
    SET_SELECTED_USER: (state, action) => {
      state.selectedUser = action.payload;
      console.log(state.selectedUser);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getUsersInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { IS_LOADING, USER_INFO, IS_MODAL_OPENED, SET_SELECTED_USER } =
  userSlice.actions;

export default userSlice.reducer;
