import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let url = `http://178.128.114.212/api/`;
const initialState = {
  isLoading: false,
  onlineApplicantsData: [],
};

// //* FETCHING APPLICANTS WHO REGISTERED ONLINE
export const getRegisteredNo = createAsyncThunk(
  "registeredOnline/getRegisteredNo",
  async (thunkAPI) => {
    try {
      const response = await axios.get(url + "registration");
      return { registeredNo: response.data.length };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.toString() || "Something went wrong."
      );
    }
  }
);

const onlineApplicantSlice = createSlice({
  name: "onlineApplicant",
  initialState,
  extraReducers: {
    [getRegisteredNo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getRegisteredNo.fulfilled]: (state, action) => {
      state.onlineApplicantsData = action.payload;
      state.isLoading = false;
    },
    [getRegisteredNo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = "Something went wrong";
    },
  },
});

export const {} = onlineApplicantSlice.actions;
export default onlineApplicantSlice.reducer;
