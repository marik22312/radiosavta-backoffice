import { observable, action, computed } from 'mobx';
import { IdentityServiceInterface, TryLogigArgs } from '../services/identity.service';
import { setToken } from '../services/http.client';

export default class IdentityStore {
	private _identityService: IdentityServiceInterface;

	@observable public token: string | null;

	constructor(identityService: IdentityServiceInterface) {
		this._identityService = identityService;

		this.token = null;
	}

	@computed public get isLoggedIn() {
		return this.token;
	}

	@action
	public async preformLogin(credentials: TryLogigArgs): Promise<void> {
		try {
			const response = await this._identityService.preformLogin(credentials);
			this.token = response.data.token;
			setToken(this.token);
		} catch (e) {
			console.error(e);
		}
	}
}