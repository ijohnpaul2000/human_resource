import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  requirementInfo: [],
  selectedRequirement: "",
  applicantInfo: [],
  isOpened: false,
  isLoading: false,
};

export const getRequirementsInfo = createAsyncThunk(
  "get/requirements",
  async () => {
    try {
      const res = await axios.get("http://178.128.114.212/api/requirements");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const requirementSlice = createSlice({
  name: "requirements",
  initialState,
  reducers: {
    SET_MODAL_STATE: (state, action) => {
      state.isOpened = action.payload;
    },
    IS_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_SELECTED_REQUIREMENT: (state, action) => {
      state.selectedRequirement = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRequirementsInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequirementsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requirementInfo = action.payload;
      })
      .addCase(getRequirementsInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { SET_MODAL_STATE, IS_LOADING, SET_SELECTED_REQUIREMENT } =
  requirementSlice.actions;
export default requirementSlice.reducer;
