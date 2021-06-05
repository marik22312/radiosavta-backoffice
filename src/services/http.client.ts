import Axios, { AxiosInstance } from "axios";
import { BASE_API_URL } from "../config/api.config";

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: BASE_API_URL,
});

export const setToken = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = "Bearer " + token;
};

export default axiosInstance;
export const httpClient = axiosInstance;
