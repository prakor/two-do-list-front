import axiosInstance from "./axiosInstance";

const authService = {
  register: async (data) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  },
  login: async (data) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  },
};

export default authService;
