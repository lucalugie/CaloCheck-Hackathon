import axios from "axios";

export const updateUsersNutritons = async (nutrition) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/usersnutrition/bydate`,
      nutrition,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const getUsersNutritons = async (setNutrition) => {
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

    const nutritionData = response.data;
    setNutrition({
      ach_kcal: nutritionData.ach_kcal,
      ach_g: nutritionData.ach_g,
      ach_protein: nutritionData.ach_protein,
      ach_fat: nutritionData.ach_fat,
      ach_salt: nutritionData.ach_salt,
      ach_sugar: nutritionData.ach_sugar,
      ach_veg: nutritionData.ach_veg,
      ach_carb: nutritionData.ach_carb,
    });

    console.log("userNutirion get pre data: ", nutritionData);

    return nutritionData;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

