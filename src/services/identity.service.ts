import BaseApiService from "./base.api.service";
import { AxiosInstance, AxiosResponse } from "axios";

export interface TryLogigArgs {
	email: string;
	password: string;
}

export interface LoginSuccessResponse {
	token: string;
	user: any // TODO: Add user interface
}
export interface IdentityServiceInterface {
	preformLogin: (credentials: TryLogigArgs) => Promise<AxiosResponse<LoginSuccessResponse>>
}


export default class IdentityService extends BaseApiService implements IdentityServiceInterface {

	constructor(axiosInstance: AxiosInstance) {
		super(axiosInstance);
	}

	public preformLogin(credentials: TryLogigArgs): Promise<AxiosResponse<LoginSuccessResponse>> {
		return this.post('/login', credentials);
	}
}