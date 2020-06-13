import { action, computed, observable } from "mobx";
import { setToken } from "../services/http.client";
import {
    PasswordServiceInterface,
    TryChangePassword
} from "../services/password.service";

export default class PasswordStore {

  @observable public token: string | null;
  @observable public user: any;
  private passwordService: PasswordServiceInterface;

  constructor(passwordService: PasswordServiceInterface) {
    this.passwordService = passwordService;

    this.token = this.passwordService.performChangePassword();
    this.user = {};
  }

  @action
  public async preformLogin(credentials: TryChangePassword): Promise<void> {
    try {
      const { data } = await this.passwordService.preformLogin(credentials);
      this.token = data.token;
      this.user = data.user;
      this.passwordService.setTokenToStorage(data.token);
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
      } catch (e) {
        if (e.response.status === 401) {
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
}
