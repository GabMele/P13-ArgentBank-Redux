// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const getUserProfile = async () => {
  try {
    const response = await axios.post(`${API_URL}/profile`, {
      // Add authorization token or necessary headers here
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error(error.response ? error.response.data.message : 'Unknown error');
  }
};

export default {
  getUserProfile,
};
