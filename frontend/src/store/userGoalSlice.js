import { createSlice } from "@reduxjs/toolkit";

const initState = {
  goals_kcal: 0,
  goals_g: 0,
  goals_protein: 0,
  goals_fat: 0,
  goals_salt: 0,
  goals_sugar: 0,
  goals_veg: 0,
  goals_carb: 0,
};

export const userGoalSlice = createSlice({
  name: "usergoal",
  initialState: initState,
  reducers: {
    setGoalsKcal: (state, action) => {
      state.goals_kcal = action.payload;
    },
    setGoalsG: (state, action) => {
      state.goals_g = action.payload;
    },
    setGoalsProtein: (state, action) => {
      state.goals_protein = action.payload;
    },
    setGoalsFat: (state, action) => {
      state.goals_fat = action.payload;
    },
    setGoalsSalt: (state, action) => {
      state.goals_salt = action.payload;
    },
    setGoalsSugar: (state, action) => {
      state.goals_sugar = action.payload;
    },
    setGoalsVeg: (state, action) => {
      state.goals_veg = action.payload;
    },
    setGoalsCarb: (state, action) => {
      state.goals_carb = action.payload;
    },
  },
});

export const {
  setGoalsKcal,
  setGoalsG,
  setGoalsProtein,
  setGoalsFat,
  setGoalsSalt,
  setGoalsSugar,
  setGoalsVeg,
  setGoalsCarb,
} = userGoalSlice.actions;
export default userGoalSlice.reducer;
