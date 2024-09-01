import Axios from "axios";
import Cookies from "js-cookie";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const refreshTokens = async () => {
  try {
    const response = await Axios.post("/users/refreshToken", null, {
      withCredentials: true,
    });
    const { accessToken, refreshToken } = response.data;
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

axios.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshTokens();
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const axiosWithoutToken = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export { axios, axiosWithoutToken };
