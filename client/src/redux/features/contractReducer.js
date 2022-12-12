import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appointmentInfo: [],
  applicantsInfo: [],
  selectedApplicant: "",
  isOpened: false,
  isLoading: false,
};

export const getAppointmentsInfo = createAsyncThunk(
  "get/appointments",
  async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      return res.data.filter((element) => {
        return element.appointment_type === "Contract Signing";
      });
    } catch (error) {
      console.log(error);
    }
  }
);

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

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    SET_MODAL_STATE: (state, action) => {
      state.isOpened = action.payload;
    },
    IS_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_SELECTED_APPLICANT: (state, action) => {
      state.selectedApplicant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointmentsInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointmentsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointmentInfo = action.payload;
      })
      .addCase(getAppointmentsInfo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getApplicantsInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicantsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applicantsInfo = action.payload;
      })
      .addCase(getApplicantsInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { SET_MODAL_STATE, IS_LOADING, SET_SELECTED_APPLICANT } =
  contractSlice.actions;
export default contractSlice.reducer;
