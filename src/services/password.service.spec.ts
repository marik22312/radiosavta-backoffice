import { ApiServiceMock } from '../../__tests__/mocks/services/base.service.mock';
import { IBaseApiService } from './base.api.service';
import PasswordService, { PasswordServiceInterface } from './password.service';

describe('Password Service', () => {
	let passwordService: PasswordServiceInterface;
	let apiService: IBaseApiService;
	
	beforeEach(() => {
		apiService = ApiServiceMock()
		passwordService = new PasswordService(apiService);
	});

	describe('Preform Change Password', () => {
		it ('Should Preform POST request to BASE_API + /change-password', async () => {
			const credentials = {
                currentPassword: 'ABC12345',
                newPassword: 'ABC123456'
			};
	
			await PasswordService.performChangePassword(credentials);
	
			expect(apiService.post).toBeCalledWith('/change-password', credentials);
		})
	})

})