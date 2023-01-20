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

export const signContract = createAsyncThunk(
  "api/contract",
  async (post, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/contract",
        post
      );
      return result.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
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
  extraReducers: {
    [signContract.pending]: (state) => {
      state.isLoading = true;
    },
    [signContract.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [signContract.rejected]: (state) => {
      state.isLoading = false;
    },
    [getAppointmentsInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getAppointmentsInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.appointmentInfo = action.payload;
    },
    [getAppointmentsInfo.rejected]: (state) => {
      state.isLoading = false;
    },
    [getApplicantsInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getApplicantsInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.applicantsInfo = action.payload;
    },
    [getApplicantsInfo.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { SET_MODAL_STATE, IS_LOADING, SET_SELECTED_APPLICANT } =
  contractSlice.actions;
export default contractSlice.reducer;
