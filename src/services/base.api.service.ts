import { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_API_URL } from '../config/api.config';

export default class BaseApiService {

	private _httpClient: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this._httpClient = axiosInstance;
	}

	public get<T=any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this._httpClient.get(BASE_API_URL + url, config);
	}

	public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>{
		return this._httpClient.post(BASE_API_URL + url, data, config);
	}

	public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this._httpClient.put(BASE_API_URL + url, data, config);
	}

	public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>{
		return this._httpClient.delete(BASE_API_URL + url, config);
	}
}