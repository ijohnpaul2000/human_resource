import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  applicantInfo: [],
  isModalOpened: false,
  selectedApplicant: "",
};

export const getApplicantsInfo = createAsyncThunk(
  "get/applicants",

  async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/applicants");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    IS_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    APPLICATION_INFO: (state, action) => {
      state.applicantInfo = action.payload;
    },
    IS_MODAL_OPENED: (state, action) => {
      state.isModalOpened = action.payload;
    },
    SET_SELECTED_APPLICANT: (state, action) => {
      state.selectedApplicant = action.payload;
      console.log(state.selectedApplicant);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicantsInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicantsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applicantInfo = action.payload;
      })
      .addCase(getApplicantsInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  IS_LOADING,
  APPLICATION_INFO,
  IS_MODAL_OPENED,
  SET_SELECTED_APPLICANT,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
