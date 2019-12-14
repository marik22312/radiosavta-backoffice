import { AxiosInstance, AxiosResponse } from "axios";
import BaseApiService from "./base.api.service";
import { CookieOven } from "./CookieOven";

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
	getUser: (token: string) => Promise<AxiosResponse<LoginSuccessResponse>>
	getTokenFromStorage: () => any
	setTokenToStorage: (user: any) => Promise<any>
	logout: () => void
}


export default class IdentityService extends BaseApiService implements IdentityServiceInterface {

	private cookieOven: CookieOven;

	constructor(axiosInstance: AxiosInstance, cookieOven: CookieOven) {
		super(axiosInstance);

		this.cookieOven = cookieOven;
	}

	public preformLogin(credentials: TryLogigArgs): Promise<AxiosResponse<LoginSuccessResponse>> {
		return this.post('/login', credentials);
	}

	public getTokenFromStorage(): any {
		const user: any = this.cookieOven.eatCookie('auth');
		return user;
	}

	public async setTokenToStorage(token: string): Promise<void> {
		return this.cookieOven.bakeCookie('auth', token, {
			maxAge: 60 * 24 * 14
		});
	}

	public getUser(token: string) {
		return this.get('/me');
	}

	public logout() {
		return this.cookieOven.clear('auth')
	}
}