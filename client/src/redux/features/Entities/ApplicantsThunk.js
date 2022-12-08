import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  applicantsData: [],
};

let url = `hhttp://api.orionhumanresource.gq/`;
export const getApplicantsData = createAsyncThunk(
  "applicant/getApplicantsData",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${url}applicants`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.toString() || "Something went wrong"
      );
    }
  }
);

const applicantSlice = createSlice({
  name: "applicants",
  initialState,
  extraReducers: {
    [getApplicantsData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getApplicantsData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.applicantsData = action.payload;
    },
    [getApplicantsData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = "Something went wrong";
    },
  },
});

export const {} = applicantSlice.actions;
export default applicantSlice.reducer;
