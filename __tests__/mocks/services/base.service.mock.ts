import { IBaseApiService } from '../../../src/services/base.api.service';
import { IUsersService } from '../../../src/services/users.service';

export const ApiServiceMock = (): IBaseApiService => ({
	get: jest.fn(),
	post: jest.fn(),
	put: jest.fn(),
	delete: jest.fn(),
})

export class UsersServiceMock implements IUsersService {
	public getAllUsers = jest.fn();
	public getUserById = jest.fn();
	public updateUserById = jest.fn();
	public disableUser = jest.fn();
}