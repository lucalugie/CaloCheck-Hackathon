import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const fetchFood = async (endpoint) => {
  try {
    const response = await axios.get(`${baseURL}/${endpoint}`);
    console.log('Set Data Complete')
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};
export const addFood = async (endpoint, data) => {
    try {
      const response = await axios.post(`${baseURL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('Error adding data:', error);
      throw error;
    }
  };