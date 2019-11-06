import { observable, action, runInAction } from 'mobx';
import { IdentityServiceInterface, TryLogigArgs } from '../services/identity.service';

export default class IdentityStore {
	private identityService: IdentityServiceInterface;

	@observable public token: string | null;

	constructor(identityService: IdentityServiceInterface) {
		this.identityService = identityService;

		this.token = null;
	}

	@action
	public async preformLogin(credentials: TryLogigArgs) {
		try {
			const response = await this.identityService.preformLogin(credentials);
			this.token = response.data.token;
		} catch (e) {
			console.error(e);
		}
	}
}