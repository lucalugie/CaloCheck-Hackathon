import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import aiPageSlice from "./aiPageSlice";
import setSearch from "./setSearch";
import userGoalSlice from "./userGoalSlice";
import nutritionSlice from "./nutritionSlice";
import barcodeSlice from "./barcodeSlice";
import photoSlice from "./photoSlice";
export default configureStore({
  reducer: {
    user: userSlice,
    aiPage: aiPageSlice,
    search: setSearch,
    goals: userGoalSlice,
    nutrition: nutritionSlice,
    barcode: barcodeSlice,
    photo: photoSlice
  },
});