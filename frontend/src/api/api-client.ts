import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  // baseURL: "http://82.112.227.200:8082/api/v1",
  // baseURL: "http://82.112.227.200:8082/api/v1",
  withCredentials: true,
})