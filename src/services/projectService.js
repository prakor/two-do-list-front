import axiosInstance from "./axiosInstance";

const unwrapResponse = (response) => {
  const payload = response?.data;
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }
  return payload;
};

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

const withErrorMapping = async (requestFn, fallbackMessage) => {
  try {
    return await requestFn();
  } catch (error) {
    throw new Error(getErrorMessage(error, fallbackMessage));
  }
};

const projectService = {
  getProjects: async () => {
    const response = await axiosInstance.get("/projects");
    console.log('--- Response from getProjects:', response);
    return response.data.data;
  },

  getProjectById: async (id) => {
    return withErrorMapping(async () => {
      const response = await axiosInstance.get(`/projects/${id}`);
      return unwrapResponse(response);
    }, "Failed to fetch project detail");
  },

  createProject: async (payload) => {
    return withErrorMapping(async () => {
      const response = await axiosInstance.post("/projects", payload);
      return unwrapResponse(response);
    }, "Failed to create project");
  },

  updateProject: async ({ id, payload }) => {
    return withErrorMapping(async () => {
      try {
        const patchResponse = await axiosInstance.patch(`/projects/${id}`, payload);
        return unwrapResponse(patchResponse);
      } catch (error) {
        const status = error?.response?.status;
        if (![404, 405, 501].includes(status)) {
          throw error;
        }

        const putResponse = await axiosInstance.put(`/projects/${id}`, payload);
        return unwrapResponse(putResponse);
      }
    }, "Failed to update project");
  },

  deleteProject: async (id) => {
    return withErrorMapping(async () => {
      const response = await axiosInstance.delete(`/projects/${id}`);
      return unwrapResponse(response);
    }, "Failed to delete project");
  },
};

export default projectService;
