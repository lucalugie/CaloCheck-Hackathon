import axios from "axios";
import {
  setDisplayName,
  setPictureUrl,
  setGender,
  setWeight,
  setHeight,
  setBmi,
  setAge,
} from "../store/userSlice";

import {
  setGoalsKcal,
  setGoalsG,
  setGoalsProtein,
  setGoalsFat,
  setGoalsSalt,
  setGoalsSugar,
  setGoalsVeg,
  setGoalsCarb,
} from "../store/userGoalSlice";

import {
  kcal_total,
  grams_total,
  g_gramsVeg,
  g_gramsSodium,
  g_gramsCarb,
  g_gramsSugar,
  g_gramsFat,
  g_gramsProtein,
  findDefaultInfo,
} from "./defaltFunction";

import {
  setAchKcal,
  setAchG,
  setAchProtein,
  setAchFat,
  setAchSalt,
  setAchSugar,
  setAchVeg,
  setAchCarb,
} from "./../store/nutritionSlice";


const fetchUserData = async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/PersonalInformations`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const userData = response.data;

    if (userData) {
      dispatch(setDisplayName(userData.displayName));
      dispatch(setPictureUrl(userData.pictureUrl));
      dispatch(setGender(userData.gender));
      dispatch(setWeight(userData.weight));
      dispatch(setHeight(userData.height));
      dispatch(setBmi(userData.bmi));
      dispatch(setAge(userData.age));
    } else {
      console.error("no data:", userData);
    }

    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

//update user info
const updateUsersInfo = async (updateUsers, dispatch) => {
  try {
    console.log("Sending data to the server:", updateUsers);
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/users/PersonalInformations`,
      updateUsers,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const userData = response.data;
    dispatch(setGender(userData.gender));
    dispatch(setWeight(userData.weight));
    dispatch(setHeight(userData.height));
    dispatch(setBmi(userData.bmi));
    dispatch(setAge(userData.age));
    findDefaultInfo(updateUsers.gender, updateUsers.age);
    console.log("userData.gender", updateUsers.gender);
    console.log("userData.age", updateUsers.age);
    console.log("kcal_total", kcal_total);
    //update user goals
    const updatedUserGoals = {
      goals_kcal: kcal_total,
      goals_g: grams_total,
      goals_protein: g_gramsProtein,
      goals_fat: g_gramsFat,
      goals_salt: g_gramsSodium,
      goals_sugar: g_gramsSugar,
      goals_veg: g_gramsVeg,
      goals_carb: g_gramsCarb,
    };
    updatedbDefaultGoals(updatedUserGoals);

    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

//default
const updatedbDefaultGoals = async (updatedUserGoals) => {
  console.log("kcal_total in default", kcal_total);
  console.log(
    "updatedUserGoals.kcal_total in default",
    updatedUserGoals.kcal_total
  );
  try {
    console.log("Sending data to the server goals:", updatedUserGoals);
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/usersgoals/updategoals`,
      updatedUserGoals,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const userData = response.data;

    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

//export
const updatedbGoals = async (updatedUserGoals, dispatch) => {
  try {
    console.log("Sending data to the server goals:", updatedUserGoals);
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/usersgoals/updategoals`,
      updatedUserGoals,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const userData = response.data;
    dispatch(setGoalsKcal(userData.goals_kcal));
    dispatch(setGoalsG(userData.goals_g));
    dispatch(setGoalsProtein(userData.goals_protein));
    dispatch(setGoalsFat(userData.goals_fat));
    dispatch(setGoalsSalt(userData.goals_salt));
    dispatch(setGoalsSugar(userData.goals_sugar));
    dispatch(setGoalsVeg(userData.goals_veg));
    dispatch(setGoalsCarb(userData.goals_carb));


    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

//getusergoals
const fetchUserGoals = async (dispatch) => {
  console.log("Goals running");
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/usersgoals`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const userData = response.data;

    if (userData) {
      dispatch(setGoalsKcal(userData.goals_kcal));
      dispatch(setGoalsG(userData.goals_g));
      dispatch(setGoalsProtein(userData.goals_protein));
      dispatch(setGoalsFat(userData.goals_fat));
      dispatch(setGoalsSalt(userData.goals_salt));
      dispatch(setGoalsSugar(userData.goals_sugar));
      dispatch(setGoalsVeg(userData.goals_veg));
      dispatch(setGoalsCarb(userData.goals_carb));
    } else {
      console.error("no data:", userData);
    }

    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

//getusernutrition by todaydate
const fetchUserNutrition = async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/usersnutrition/bytodaydate`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const userData = response.data;

    if (userData) {
      dispatch(setAchKcal(userData.ach_kcal));
      dispatch(setAchG(userData.ach_g));
      dispatch(setAchProtein(userData.ach_protein));
      dispatch(setAchFat(userData.ach_fat));
      dispatch(setAchSalt(userData.ach_salt));
      dispatch(setAchSugar(userData.ach_sugar));
      dispatch(setAchVeg(userData.ach_veg));
      dispatch(setAchCarb(userData.ach_carb));


    } else {
      console.error("no data:", userData);
    }

    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

//lugie modify
//getusernutrition by date query
const fetchUserNutritionByDate = async (dispatch, year = null, month = null, date = null) => {
  const today = new Date();
  if (isNaN(year) || year < 1) {
    year = today.getFullYear();
  }
  if (isNaN(month) || month < 1 || month > 12) {
    month = today.getMonth() + 1; // Month is 0-based, so add 1
  }
  if (isNaN(date) || date < 1 || date > 31) {
    date = today.getDate();
  }
  const dateParam = `${year}-${month}-${date}`;

  console.log("dateParam in fetchUserNutritionByDate",dateParam)

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/usersnutrition/bydate?createdAt=${dateParam}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const userData = response.data;

    if (userData) {
      dispatch(setAchKcal(userData.ach_kcal));
      dispatch(setAchG(userData.ach_g));
      dispatch(setAchProtein(userData.ach_protein));
      dispatch(setAchFat(userData.ach_fat));
      dispatch(setAchSalt(userData.ach_salt));
      dispatch(setAchSugar(userData.ach_sugar));
      dispatch(setAchVeg(userData.ach_veg));
      dispatch(setAchCarb(userData.ach_carb));
    } else {
      console.error("no data:", userData);
    }

    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};




export { fetchUserData, updatedbGoals, updateUsersInfo, fetchUserGoals, fetchUserNutrition, fetchUserNutritionByDate};