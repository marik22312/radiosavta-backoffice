import Chance from 'chance';

import { IdentityServiceMock } from '../../__tests__/mocks/services/identity.service.mock';
import { TryLogigArgs } from '../services/identity.service';
import IdentityStore, { PasswordValidationError, ResetPasswordObj } from './identity.store';

describe('Identity Store', () => {
	const chance = Chance();
	
	let identityService: IdentityServiceMock;
	let identityStore: IdentityStore;
	beforeEach(() => {
		identityService = new IdentityServiceMock();
		identityStore = new IdentityStore(identityService);
	})
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

	it('Should return PASSWORDS_NOT_MATCH when new password and password repeat not match', () => {
		const password = chance.string();
		const passwordObj: ResetPasswordObj = {
			passwordRepeat: '',
			newPassword: password
		}

		const response = identityStore.validatePasswordResetAndTransform(passwordObj);

		expect(response.error).toBe(PasswordValidationError.PASSWORDS_NOT_MATCH)
	});

	it('Should return PASSWORDS_TOO_SHORT when new password is too short', () => {
		const password = chance.string({length: 3});
		const passwordObj: ResetPasswordObj = {
			passwordRepeat: password,
			newPassword: password
		}

		const response = identityStore.validatePasswordResetAndTransform(passwordObj);

		expect(response.error).toBe(PasswordValidationError.PASSWORDS_TOO_SHORT)
	});
	
	it('Should return EMPTY_PASSWORD if new password is empty', () => {
		const password = chance.string();
		const passwordObj: ResetPasswordObj = {
			passwordRepeat: '',
			newPassword: ''
		}

		const response = identityStore.validatePasswordResetAndTransform(passwordObj);

		expect(response.error).toBe(PasswordValidationError.EMPTY_PASSWORD)
	});

	it('Should transform password object correctly', () => {
		const newPassword = chance.string();

		const passwordObj: ResetPasswordObj = {
			passwordRepeat: newPassword,
			newPassword
		}

		const response = identityStore.validatePasswordResetAndTransform(passwordObj);

		expect(response.error).toBe(null);
		expect(response.password).toBe(newPassword)
	})
})
