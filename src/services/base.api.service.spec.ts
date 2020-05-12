import { axiosMock } from '../../__tests__/mocks/axios.mock';
import { BASE_API_URL } from '../config/api.config';
import BaseApiService from './base.api.service';

describe('Base API Service', () => {
	
	let baseApiService: BaseApiService;
	beforeEach(() => {
		baseApiService = new BaseApiService(BASE_API_URL, axiosMock);
	});

	it('Should preform GET request', async () => {
		const url = 'http://www.radiosavta.com/';
		await baseApiService.get(url);
		
		expect(axiosMock.get).toBeCalledWith(BASE_API_URL + url, undefined);
	})
	it('Should preform POST request', async () => {
		const url = 'http://www.radiosavta.com/';
		const data = {
			key: 'value'
		}
		await baseApiService.post(url, data);
		
		expect(axiosMock.post).toBeCalledWith(BASE_API_URL + url, data, undefined);
	})
	it('Should preform PUT request', async () => {
		const url = 'http://www.radiosavta.com/';
		const data = {
			key: 'value'
		}

		await baseApiService.put(url, data);
		
		expect(axiosMock.put).toBeCalledWith(BASE_API_URL + url, data, undefined);
	})
	it('Should preform DELETE request', async () => {
		const url = 'http://www.radiosavta.com/';

		await baseApiService.delete(url);
		
		expect(axiosMock.delete).toBeCalledWith(BASE_API_URL + url, undefined);
	})
})