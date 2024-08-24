import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("Request error", error);

    return Promise.reject(error);
  }
);

const axiosWithoutToken = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export { axiosWithoutToken, axios };
