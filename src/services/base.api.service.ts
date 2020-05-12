import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export interface IBaseApiService {
	get<T = any>(
		url: string,
		config?: AxiosRequestConfig
	  ): Promise<AxiosResponse<T>>
	post<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	  ): Promise<AxiosResponse<T>>
	put<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	  ): Promise<AxiosResponse<T>>
	delete<T = any>(
		url: string,
		config?: AxiosRequestConfig
	  ): Promise<AxiosResponse<T>>
}

export default class BaseApiService implements IBaseApiService {
  constructor(private baseUrl: string, private httpClient: AxiosInstance) {}
  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.httpClient.get(this.baseUrl + url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.httpClient.post(this.baseUrl + url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.httpClient.put(this.baseUrl + url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.httpClient.delete(this.baseUrl + url, config);
  }
}
