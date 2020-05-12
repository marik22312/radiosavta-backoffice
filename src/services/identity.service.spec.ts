import { ApiServiceMock } from '../../__tests__/mocks/services/base.service.mock';
import { CookieOvenMock } from '../../__tests__/mocks/services/cookieOven.mock';
import { IBaseApiService } from './base.api.service';
import { ICookieOven } from './CookieOven';
import IdentityService, { IdentityServiceInterface } from './identity.service';

describe('Identity Service', () => {
	let identityService: IdentityServiceInterface;
	let apiService: IBaseApiService;
	let cookieOvenMock: ICookieOven;
	
	beforeEach(() => {
		apiService = ApiServiceMock()
		cookieOvenMock = CookieOvenMock();
		identityService = new IdentityService(apiService, cookieOvenMock);
	});

	describe('Preform Login', () => {
		it ('Should Preform POST request to BASE_API + /login', async () => {
			const credentials = {
				email: 'someEmail@radiosavta.com',
				password: 'test1234'
			};
	
			await identityService.preformLogin(credentials);
	
			expect(apiService.post).toBeCalledWith('/login', credentials);
		})
	})

})