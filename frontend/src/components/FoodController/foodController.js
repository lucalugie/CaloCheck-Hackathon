import axios from "axios";

export const fetchFood = async (endpoint) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/foodnutrition/findfood/${endpoint}`
    );
    console.log("Set Data Complete");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const addFood = async (endpoint, data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};
