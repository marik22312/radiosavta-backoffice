import { AxiosInstance, AxiosResponse } from "axios";
import { IdentityServiceInterface, LoginSuccessResponse, TryLogigArgs} from '../../../src/services/identity.service'

export class IdentityServiceMock implements IdentityServiceInterface {
	public preformLogin = jest.fn();
	public getUser = jest.fn();
	public getTokenFromStorage = jest.fn();
	public setTokenToStorage = jest.fn();
	public logout = jest.fn();
}