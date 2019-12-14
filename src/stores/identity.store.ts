import { observable, action, computed } from 'mobx';
import { IdentityServiceInterface, TryLogigArgs } from '../services/identity.service';
import { setToken } from '../services/http.client';
import { AxiosError } from 'axios';

export default class IdentityStore {
	private identityService: IdentityServiceInterface;

	@observable public token: string | null;
	@observable public user: any ;

	constructor(identityService: IdentityServiceInterface) {
		this.identityService = identityService;

		this.token = this.identityService.getTokenFromStorage();
		this.user = {}

		if (this.token) {
			this.setToken(this.token);
			this.getUser();
		}
	}

	@computed public get isLoggedIn() {
		return !!this.token;
	}

	@action
	public async preformLogin(credentials: TryLogigArgs): Promise<void> {
		try {
			const {data} = await this.identityService.preformLogin(credentials);
			this.token = data.token;
			this.user = data.user;
			this.identityService.setTokenToStorage(data.token);
			setToken(this.token);
		} catch (e) {
			console.error(e);
		}
	}

	@action
	public async getUser(): Promise<void> {
		if (this.token) {
			try {
				const { data } = await this.identityService.getUser(this.token);
				this.user = data;
			} catch (e) {
				if (e.response.status === 401) {
					this.logout();
				}
			}
		} else {
			this.logout();
		}
	}

	public setToken(token: string) {
		return setToken(token);
	}
	
	@action
	public async logout() {
		this.identityService.logout();
		this.token = null;
		this.user = {};
		this.setToken('');
	}
}