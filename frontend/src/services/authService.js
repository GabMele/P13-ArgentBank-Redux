// src/services/authService.js
// import api from '../api/axiosConfig';
import api from '@/services/apiService';


export const authService = {
  login: async (credentials) => {
    console.log("✅ authService.login() called");
    //console.trace(); 
    const response = await api.post('/login', credentials);
    const token = response.data.body?.token;
    console.log("✅ authService.login() response:", response);
    if (token) localStorage.setItem('token', token);
    
    const userProfileResponse = await authService.getProfile();
    console.log("✅ authService.login() userProfileResponse:", userProfileResponse.body);
    // console.log("✅ authService.login() userProfileResponse:", userProfileResponse.data);
    
    //return response.data;
    return { token, user: userProfileResponse.body };
  },

  signup: async (userData) => {
    const response = await api.post('/signup', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getProfile: async () => {
    console.log("✅ authService.getProfile() called");
    //console.trace(); 
    const response = await api.post('/profile'); 
    return response.data;
  },

  updateProfile: async (userData) => {
    console.log("✅ authService.updateProfile() called");
    const response = await api.put('/profile', userData);
    console.log("✅ authService.updateProfile() response:", response);
    return { user: response.data.body } ;
    // return response.data;
  }


};
