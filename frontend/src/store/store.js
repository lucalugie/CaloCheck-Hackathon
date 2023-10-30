import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import aiPageSlice from "./aiPageSlice";
import setSearch from "./setSearch";
import userGoalSlice from "./userGoalSlice";
import nutritionSlice from "./nutritionSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    aiPage: aiPageSlice,
    search: setSearch,
    goals: userGoalSlice,
    nutrition: nutritionSlice,
  },
});
