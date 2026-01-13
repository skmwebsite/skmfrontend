import { getToken, removeToken } from "@/src/utils/authStorage";
import { BaseUrl } from "@/src/utils/BaseUrl";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `${BaseUrl}api/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    config.headers.Authorization = `Bearer ${getToken() ?? ""}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
