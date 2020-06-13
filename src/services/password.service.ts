import { AxiosResponse } from "axios";
import { IBaseApiService } from "./base.api.service";

export interface TryChangePassword {
    currentPassword: string;
	newPassword: string;
}

export interface PasswordChangeSuccsessResponse {
    successMessage: string
}

export interface PasswordServiceInterface {
  performChangePassword: (
    credentials: TryChangePassword
  ) => Promise<AxiosResponse<PasswordChangeSuccsessResponse>>;
}

export default class PasswordService implements PasswordServiceInterface {
  constructor(
	private api: IBaseApiService,
  ) {}

  public performChangePassword(
    credentials: TryChangePassword
  ): Promise<AxiosResponse<PasswordChangeSuccsessResponse>> {
    return this.api.post("/me/change-password", credentials);
  }

}
