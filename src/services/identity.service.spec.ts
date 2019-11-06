import IdentityService, { IdentityServiceInterface } from './identity.service';
import { axiosMock } from '../../__tests__/mocks/axios.mock';
import { BASE_API_URL } from '../config/api.config';

describe('Identity Service', () => {
	let identityService: IdentityServiceInterface;

	beforeEach(() => {
		identityService = new IdentityService(axiosMock);
	});

	describe('Preform Login', () => {
		it ('Should Preform POST request to BASE_API + /login', async () => {
			const credentials = {
				email: 'someEmail@radiosavta.com',
				password: 'test1234'
			};
	
			await identityService.preformLogin(credentials);
	
			expect(axiosMock.post).toBeCalledWith(BASE_API_URL + '/login', credentials, undefined);
		})
	})

})