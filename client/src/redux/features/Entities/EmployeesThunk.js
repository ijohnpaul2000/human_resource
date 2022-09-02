import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let url = `http://localhost:5000/api/`;

const initialState = {
  isLoading: false,
  employeesData: [],
  deployedEmployeesData: [],
};

//* FETCHING DEPLOYED EMPLOYEE
export const getEmployeesData = createAsyncThunk(
  "dashboard/getEmployeesData",
  async (thunkAPI) => {
    try {
      const response = await axios.get(url + "employees");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.toString() || "Something went wrong."
      );
    }
  }
);

const EmployeeSlice = createSlice({
  name: "deployedEmployee",
  initialState,

  reducers: {
    GET_DEPLOYED_EMPLOYEES: (state, action) => {
      state.deployedEmployeesData = action.payload;
    },
  },
  extraReducers: {
    //* FETCHING DEPLOYED EMPLOYEES
    [getEmployeesData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getEmployeesData.fulfilled]: (state, action) => {
      state.employeesData = action.payload;
      state.isLoading = false;
    },
    [getEmployeesData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = "Something went wrong";
    },
  },
});

export const { GET_DEPLOYED_EMPLOYEES } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
