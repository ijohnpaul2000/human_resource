import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  employeeInfo: [],
};

export const getApplicantsEmployeeInfo = createAsyncThunk(
  "get/applicantsEmployee",

  async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applicants-employees"
      );
      
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const applicantEmployeeSlice = createSlice({
  name: "applicantEmployee",
  initialState,
  reducers: {
    IS_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    EMPLOYEE_INFO: (state, action) => {
      state.employeeInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicantsEmployeeInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicantsEmployeeInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeInfo = action.payload;
      })
      .addCase(getApplicantsEmployeeInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { IS_LOADING, EMPLOYEE_INFO } =
  applicantEmployeeSlice.actions;

export default applicantEmployeeSlice.reducer;

