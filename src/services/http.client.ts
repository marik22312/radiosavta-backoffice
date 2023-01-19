import Axios, { AxiosInstance } from "axios";
import { BASE_API_URL } from "../config/api.config";
import mixpanel from "mixpanel-browser";

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: BASE_API_URL,
});

export const setToken = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = "Bearer " + token;
};

export const initHttpClient = () => {
  axiosInstance.defaults.headers.common["x-mixpanel-id"] =
    mixpanel.get_distinct_id();
};

export default axiosInstance;
export const httpClient = axiosInstance;
