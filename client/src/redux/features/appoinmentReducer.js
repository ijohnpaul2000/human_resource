import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  applicantInfo: [],
  isModalOpened: false,
  selectedApplicant: "",
  selectedAppointment: "", //Single Appointment Information
  appointmentInfo: [],
  singleAppointmentInfo: "",
};

export const getApplicantsInfo = createAsyncThunk(
  "get/applicants",

  async () => {
    try {
      const res = await axios.get("http://157.245.146.115:5000/api/applicants");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAppoinmentsInfo = createAsyncThunk(
  "get/appointments",
  async () => {
    try {
      const res = await axios.get(
        "http://157.245.146.115:5000/api/appointments"
      );
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
    SET_APPOINTMENT_INFO: (state, action) => {
      state.appointmentInfo = action.payload;
    },
    SET_SELECTED_APPOINTMENT: (state, action) => {
      state.selectedAppointment = action.payload;
    },
    GET_SINGLE_APPOINTMENT: (state, action) => {
      state.singleAppointmentInfo = action.payload;
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
      })
      .addCase(getAppoinmentsInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppoinmentsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointmentInfo = action.payload;
      })
      .addCase(getAppoinmentsInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  IS_LOADING,
  APPLICATION_INFO,
  IS_MODAL_OPENED,
  SET_SELECTED_APPLICANT,
  SET_APPOINTMENT_INFO,
  SET_SELECTED_APPOINTMENT,
  GET_SINGLE_APPOINTMENT,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
