import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    change : (state, action) => {
      state.value = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const {change} = accountSlice.actions;

export default accountSlice.reducer;
