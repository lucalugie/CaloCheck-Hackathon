import { createSlice } from "@reduxjs/toolkit";

const initState = {
  ach_kcal: 0,
  ach_g: 0,
  ach_protein: 0,
  ach_fat: 0,
  ach_salt: 0,
  ach_sugar: 0,
  ach_veg: 0,
  ach_carb: 0,
};

export const nutritionSlice = createSlice({
  name: "usernutrition",
  initialState: initState,
  reducers: {
    setAchKcal: (state, action) => {
      state.ach_kcal = action.payload;
    },
    setAchG: (state, action) => {
      state.ach_g = action.payload;
    },
    setAchProtein: (state, action) => {
      state.ach_protein = action.payload;
    },
    setAchFat: (state, action) => {
      state.ach_fat = action.payload;
    },
    setAchSalt: (state, action) => {
      state.ach_salt = action.payload;
    },
    setAchSugar: (state, action) => {
      state.ach_sugar = action.payload;
    },
    setAchVeg: (state, action) => {
      state.ach_veg = action.payload;
    },
    setAchCarb: (state, action) => {
      state.ach_carb = action.payload;
    },
  },
});

export const {
  setAchKcal,
  setAchG,
  setAchProtein,
  setAchFat,
  setAchSalt,
  setAchSugar,
  setAchVeg,
  setAchCarb,
} = nutritionSlice.actions;
export default nutritionSlice.reducer;

// userlineid
// ach_kcal
// ach_g:
// ach_protein
// ach_fat
// ach_salt
// ach_sugar
// ach_veg
// ach_carb