import { action, computed, observable } from "mobx";
import { setToken } from "../services/http.client";
import {
  IdentityServiceInterface,
  TryLogigArgs,
} from "../services/identity.service";
import {
  PasswordValidationError,
  validatePasswordResetAndTransform,
} from "../utils/identity.utils";

export interface ResetPasswordObj {
  newPassword: string;
  passwordRepeat: string;
  oldPassword: string;
}

export default class IdentityStore {
  @computed public get isLoggedIn() {
    return !!this.token;
  }

  @observable public token: string | null;
  @observable public user: any;
  private identityService: IdentityServiceInterface;

  constructor(identityService: IdentityServiceInterface) {
    this.identityService = identityService;

    this.token = this.identityService.getTokenFromStorage();
    this.user = {};

    // if (this.token) {
    //   this.setToken(this.token);
    //   this.getUser();
    // }
  }

  @action
  public async preformLogin(credentials: TryLogigArgs): Promise<void> {
    try {
      const { data } = await this.identityService.preformLogin(credentials);
      this.token = data.token;
      this.user = data.user;
      this.identityService.setTokenToStorage(data.token);
      setToken(this.token);
    } catch (e) {
      console.error(e);
    }
  }

  @action
  public async getUser(): Promise<void> {
    if (this.token) {
      try {
        const { data } = await this.identityService.getUser(this.token);
        this.user = data;
      } catch (e: any) {
        if (e.response?.status === 401) {
          this.logout();
        }
      }
    } else {
      this.logout();
    }
  }

  public setToken(token: string) {
    return setToken(token);
  }

  @action
  public async logout() {
    this.identityService.logout();
    this.token = null;
    this.user = {};
    this.setToken("");
  }

  @action
  public async resetPassword(passwordObj: ResetPasswordObj) {
    const { oldPassword, newPassword, passwordRepeat } = passwordObj;

    const validatedPassword = validatePasswordResetAndTransform({
      newPassword,
      passwordRepeat,
    });

    if (validatedPassword.error) {
      return {
        error: validatedPassword.error,
        data: null,
      };
    }
    try {
      const { data } = await this.identityService.resetPassword({
        currentPassword: oldPassword,
        newPassword: validatedPassword.password,
      });

      return {
        error: null,
        data,
      };
    } catch (error: any) {
      console.log(error.response);
      let stringError = PasswordValidationError.UKNOWN_ERROR;

      switch (error.response?.status) {
        case 401:
          stringError = PasswordValidationError.UNAUTHORIZED;
          break;
        case 403:
          stringError = PasswordValidationError.WRONG_PASSWORD;
          break;
        default:
          stringError = PasswordValidationError.UKNOWN_ERROR;
          break;
      }

      return {
        error: stringError,
        data: null,
      };
    }
  }
}
