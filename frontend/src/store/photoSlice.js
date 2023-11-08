import { createSlice } from "@reduxjs/toolkit";

const initState = {
  photo: "",
  blob: "",
};

export const photoSlice = createSlice({
  name: "photo",
  initialState: initState,
  reducers: {
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setBlob: (state, action) => {
      state.blob = action.payload;
    },
  },
});

export const { setPhoto, setBlob } = photoSlice.actions;
export default photoSlice.reducer;
