import { API_URL } from "@/utils/config";
import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = API_URL + "/api/v1"

export const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})


apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);