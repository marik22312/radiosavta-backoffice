import { IBaseApiService } from '../../../src/services/base.api.service';

export const ApiServiceMock = (): IBaseApiService => ({
	get: jest.fn(),
	post: jest.fn(),
	put: jest.fn(),
	delete: jest.fn(),

})