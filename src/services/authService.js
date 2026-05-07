// src/services/authService.js
import axiosInstance from './axiosInstance';

const authService = {
  register: async (data) => {
    console.log('api --> register data : ', data);
    const response = await axiosInstance.post('/auth/register', data);
    console.log('--> response : ', response);
    return response.data
  },
  login: async (data) => {
    console.log('api --> login data : ', data);
    const response = await axiosInstance.post('/auth/login', data);
    console.log('--> response : ', response);
    return response.data
  },
};

export default authService;