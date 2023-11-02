//lugie modify****
import axios from "axios";

export const postUsersHistory = async (idfood) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/Calendars/history`,
      idfood,
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