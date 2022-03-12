import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  product: [],
};

export const showValueSlice = createSlice({
  name: "showValue",
  initialState,
  reducers: {
    setValue: (state, action) => {
      const addedItem = action.payload;
      state.product = [...state.product, addedItem];
      state.value = state.product.length;
    },
    removeValue: (state, action) => {
      const addedItem = action.payload;
      const newList = state.product.filter((e) => e.slug !== addedItem.slug);
      state.product = newList;
      state.value = state.product.length;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValue,removeValue } = showValueSlice.actions;

export default showValueSlice.reducer;
