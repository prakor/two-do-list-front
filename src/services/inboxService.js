import axiosInstance from "./axiosInstance";

const inboxService = {
  getInboxItems: async () => {
    try {
      const response = await axiosInstance.get('/inbox');
      // console.log('--- Response from getInboxItems:', response);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching inbox items:', error);
      throw new Error('Failed to fetch inbox items');
    }
  },
};

export default inboxService;