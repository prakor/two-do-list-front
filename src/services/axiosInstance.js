import axios from "axios";
import {
  clearStoredAuth,
  getStoredAuth,
  setStoredAuth,
} from "@services/authStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];
let authFailureHandler = null;

export const setAuthFailureHandler = (handler) => {
  authFailureHandler = typeof handler === "function" ? handler : null;
};

const processQueue = (error, token = null) => {
  failedQueue.forEach((pending) => {
    if (error) {
      pending.reject(error);
      return;
    }
    pending.resolve(token);
  });
  failedQueue = [];
};

const handleAuthFailure = () => {
  clearStoredAuth();
  if (authFailureHandler) {
    authFailureHandler();
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getStoredAuth();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((queueError) => Promise.reject(queueError));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken } = getStoredAuth();
      if (!refreshToken) {
        handleAuthFailure();
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const accessToken =
          refreshResponse.data?.accessToken ||
          refreshResponse.data?.tokens?.accessToken;
        const nextRefreshToken =
          refreshResponse.data?.refreshToken ||
          refreshResponse.data?.tokens?.refreshToken ||
          refreshToken;
        const user = refreshResponse.data?.user ?? getStoredAuth().user;

        if (!accessToken) {
          throw new Error("Missing access token from refresh response");
        }

        setStoredAuth({
          accessToken,
          refreshToken: nextRefreshToken,
          user,
        });

        processQueue(null, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        handleAuthFailure();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
