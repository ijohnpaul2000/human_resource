import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let url = `hhttp://api.orionhumanresource.gq/`;

const initialState = {
  isLoading: false,
  appointmentsData: [],
};

export const getAppointments = createAsyncThunk(
  "appointment/getAppointments",
  async (thunkAPI) => {
    try {
      const response = await axios.get(url + "appointments");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.toString() || "Something went wrong."
      );
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  extraReducers: {
    [getAppointments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAppointments.fulfilled]: (state, action) => {
      state.appointmentsData = action.payload;
      state.isLoading = false;
    },
    [getAppointments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = "Something went wrong";
    },
  },
});

export const {} = appointmentSlice.actions;
export default appointmentSlice.reducer;
