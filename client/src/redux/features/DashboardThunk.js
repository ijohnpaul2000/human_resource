import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  isLoading: false,
  error: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    RESET_ERRORS: (state) => {
      state.error = [];
    },
  },
});

export const { RESET_ERRORS } = dashboardSlice.actions;

export default dashboardSlice.reducer;
