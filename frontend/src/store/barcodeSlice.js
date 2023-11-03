import { createSlice } from "@reduxjs/toolkit";

const initState = {
  sku: "",
  status: false,
  loading: true,
};

export const barcodeSlice = createSlice({
  name: "barcode",
  initialState: initState,
  reducers: {
    setSku: (state, action) => {
      state.sku = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    //* lugie modify
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSku, setStatus, setLoading } = barcodeSlice.actions;
export default barcodeSlice.reducer;
