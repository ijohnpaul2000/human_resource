import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: null,
    globalFilterValue: ""
}

const filterSlice = createSlice({
    name: "filtration",
    initialState,
    reducers: {
        SET_FILTER: (state, action) => {
            state.filters = action.payload;
        },
        SET_GLOBAL_VALUE: (state, action) => {
            state.globalFilterValue = action.payload;
        }
    }
});

export const { SET_FILTER, SET_GLOBAL_VALUE } =
  filterSlice.actions;
export default filterSlice.reducer;