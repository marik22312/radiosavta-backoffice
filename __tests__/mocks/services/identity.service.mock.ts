import { IdentityServiceInterface, LoginSuccessResponse, TryLogigArgs} from '../../../src/services/identity.service'
import { AxiosInstance, AxiosResponse } from "axios";

export class IdentityServiceMock implements IdentityServiceInterface {
	public preformLogin = jest.fn();
}