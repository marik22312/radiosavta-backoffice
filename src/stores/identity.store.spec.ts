import IdentityStore from './identity.store';
import { IdentityServiceMock } from '../../__tests__/mocks/services/identity.service.mock';
import { TryLogigArgs } from '../services/identity.service';

describe('Identity Store', () => {
	let identityService: IdentityServiceMock;
	let identityStore: IdentityStore;
	beforeEach(() => {
		identityService = new IdentityServiceMock();
		identityStore = new IdentityStore(identityService);
	})
	describe('Login', () => {
		it('Should Preform Login', async () => {

			identityService.preformLogin.mockReturnValue({
				data: {
					token: 'someToken'
				}
			})
			const credentials: TryLogigArgs = {
				email: 'test@test.co.il',
				password: 'test1234'
			}

			await identityStore.preformLogin(credentials);

			expect(identityStore.token).toBe('someToken')
		})
	})
})
