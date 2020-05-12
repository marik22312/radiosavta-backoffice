import { UsersService } from './users.service';

import Chance from 'chance';

const chance = new Chance();

const apiServiceMock = () => ({
	get: jest.fn(),
	post: jest.fn(),
	put: jest.fn(),
	delete: jest.fn(),
})

describe('Users Service Tests', () => {
	let apiService: any;
	beforeEach(() => {
		apiService = apiServiceMock();
	})
	it('Should call base api service correctly', async () => {
		const userId = chance.guid();
		apiService.put.mockResolvedValue({
			data: {
				id: userId
			}
		});
		const usersService = new UsersService(apiService);
		
		const user = await usersService.updateUserById(userId, {});

		expect(apiService.put).toBeCalledWith(`/users/${userId}`, {});
		expect(user.id).toBe(userId);
	})

	it('Should call base api service correctly', async () => {
		const userId = chance.guid();
		apiService.delete.mockResolvedValue({
			data: {
				id: userId
			}
		});
		const usersService = new UsersService(apiService);
		
		const user = await usersService.disableUser(userId);

		expect(apiService.delete).toBeCalledWith(`/users/${userId}`);
		expect(user.id).toBe(userId);
	})
})