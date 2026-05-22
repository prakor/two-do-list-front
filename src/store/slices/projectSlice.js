import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "@services/projectService";

const getProjectId = (project) => project?.id ?? project?._id ?? null;

const normalizeProjects = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.projects)) {
    return payload.projects;
  }

  return [];
};

const normalizeProject = (payload) => {
  if (!payload || Array.isArray(payload)) {
    return null;
  }

  return payload?.project ?? payload;
};

const buildErrorMessage = (error, fallbackMessage) =>
  error?.message || fallbackMessage;

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (params, { rejectWithValue }) => {
    try {
      console.log("Fetching projects with params:", params);
      return await projectService.getProjects();
    } catch (error) {
      return rejectWithValue(buildErrorMessage(error, "Failed to fetch projects"));
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (id, { rejectWithValue }) => {
    try {
      return await projectService.getProjectById(id);
    } catch (error) {
      return rejectWithValue(buildErrorMessage(error, "Failed to fetch project detail"));
    }
  }
);

export const createProjectThunk = createAsyncThunk(
  "project/createProject",
  async (payload, { rejectWithValue }) => {
    try {
      return await projectService.createProject(payload);
    } catch (error) {
      return rejectWithValue(buildErrorMessage(error, "Failed to create project"));
    }
  }
);

export const updateProjectThunk = createAsyncThunk(
  "project/updateProject",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const updatedProject = await projectService.updateProject({ id, payload });
      return {
        id,
        updatedProject,
      };
    } catch (error) {
      return rejectWithValue(buildErrorMessage(error, "Failed to update project"));
    }
  }
);

export const deleteProjectThunk = createAsyncThunk(
  "project/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await projectService.deleteProject(id);
      return {
        id,
        response,
      };
    } catch (error) {
      return rejectWithValue(buildErrorMessage(error, "Failed to delete project"));
    }
  }
);

const initialState = {
  items: [],
  selectedProject: null,
  isLoadingList: false,
  isLoadingDetail: false,
  isMutating: false,
  error: null,
  lastFetchedAt: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
    setSelectedProjectById: (state, action) => {
      const projectId = action.payload;
      state.selectedProject =
        state.items.find((item) => getProjectId(item) === projectId) || null;
    },

    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoadingList = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoadingList = false;
        console.log('--- Projects fetched successfully:', action.payload);
        // state.items = normalizeProjects(action.payload);
        state.items = action.payload;
        state.lastFetchedAt = Date.now();
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoadingList = false;
        state.error = action.payload || "Failed to fetch projects";
      })

      .addCase(fetchProjectById.pending, (state) => {
        state.isLoadingDetail = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.selectedProject = normalizeProject(action.payload);
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.isLoadingDetail = false;
        state.error = action.payload || "Failed to fetch project detail";
      })

      .addCase(createProjectThunk.pending, (state) => {
        state.isMutating = true;
        state.error = null;
      })
      .addCase(createProjectThunk.fulfilled, (state, action) => {
        state.isMutating = false;
        const createdProject = normalizeProject(action.payload);

        if (!createdProject) {
          return;
        }

        state.items = [createdProject, ...state.items];
      })
      .addCase(createProjectThunk.rejected, (state, action) => {
        state.isMutating = false;
        state.error = action.payload || "Failed to create project";
      })

      .addCase(updateProjectThunk.pending, (state) => {
        state.isMutating = true;
        state.error = null;
      })
      .addCase(updateProjectThunk.fulfilled, (state, action) => {
        state.isMutating = false;

        const projectFromPayload = normalizeProject(action.payload.updatedProject);
        const nextProject = projectFromPayload || { id: action.payload.id };
        const targetId = getProjectId(nextProject) || action.payload.id;

        const targetIndex = state.items.findIndex(
          (item) => getProjectId(item) === targetId
        );

        if (targetIndex >= 0) {
          state.items[targetIndex] = {
            ...state.items[targetIndex],
            ...nextProject,
          };
        } else if (projectFromPayload) {
          state.items = [projectFromPayload, ...state.items];
        }

        if (state.selectedProject && getProjectId(state.selectedProject) === targetId) {
          state.selectedProject = {
            ...state.selectedProject,
            ...nextProject,
          };
        }
      })
      .addCase(updateProjectThunk.rejected, (state, action) => {
        state.isMutating = false;
        state.error = action.payload || "Failed to update project";
      })

      .addCase(deleteProjectThunk.pending, (state) => {
        state.isMutating = true;
        state.error = null;
      })
      .addCase(deleteProjectThunk.fulfilled, (state, action) => {
        state.isMutating = false;

        const deletedId = action.payload.id;
        state.items = state.items.filter((item) => getProjectId(item) !== deletedId);

        if (
          state.selectedProject &&
          getProjectId(state.selectedProject) === deletedId
        ) {
          state.selectedProject = null;
        }
      })
      .addCase(deleteProjectThunk.rejected, (state, action) => {
        state.isMutating = false;
        state.error = action.payload || "Failed to delete project";
      });
  },
});

export const {
  clearProjectError,
  setSelectedProjectById,
  clearSelectedProject,
} = projectSlice.actions;

export const selectProjects = (state) => state.project.items;
export const selectProjectById = (state, projectId) =>
  state.project.items.find((item) => getProjectId(item) === projectId) || null;
export const selectSelectedProject = (state) => state.project.selectedProject;
export const selectProjectLoadingStates = (state) => ({
  isLoadingList: state.project.isLoadingList,
  isLoadingDetail: state.project.isLoadingDetail,
  isMutating: state.project.isMutating,
});
export const selectProjectError = (state) => state.project.error;

export default projectSlice.reducer;
