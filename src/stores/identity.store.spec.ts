import Chance from 'chance';

import { IdentityServiceMock } from '../../__tests__/mocks/services/identity.service.mock';
import { TryLogigArgs } from '../services/identity.service';
import IdentityStore from './identity.store';

describe('Identity Store', () => {
	const chance = Chance();
	
	let identityService: IdentityServiceMock;
	let identityStore: IdentityStore;
	beforeEach(() => {
		identityService = new IdentityServiceMock();
		identityStore = new IdentityStore(identityService);
	})
	describe('Login', () => {
		it('Should Preform Login', async () => {

			const token = chance.guid();
			const email = chance.email();
			const password = chance.word();

			identityService.preformLogin.mockReturnValue({
				data: {
					token
				}
			})
			const credentials: TryLogigArgs = {
				email,
				password
			}

			await identityStore.preformLogin(credentials);

			expect(identityStore.token).toBe(token);
			expect(identityService.preformLogin).toBeCalledWith(credentials);
			expect(identityService.setTokenToStorage).toBeCalledWith(token);
		})
	})
})
