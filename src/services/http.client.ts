import Axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = Axios.create();

export const setToken = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default axiosInstance;