import { AxiosResponse } from "axios";
import { IBaseApiService } from "./base.api.service";
import { ICookieOven } from "./CookieOven";

export interface TryLogigArgs {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  token: string;
  user: any; // TODO: Add user interface
}
export interface IdentityServiceInterface {
  preformLogin: (
    credentials: TryLogigArgs
  ) => Promise<AxiosResponse<LoginSuccessResponse>>;
  getUser: (token: string) => Promise<AxiosResponse<LoginSuccessResponse>>;
  getTokenFromStorage: () => any;
  setTokenToStorage: (user: any) => Promise<any>;
  logout: () => void;
}

export default class IdentityService implements IdentityServiceInterface {
  constructor(
	private api: IBaseApiService,
    private cookieOven: ICookieOven
  ) {}

  public preformLogin(
    credentials: TryLogigArgs
  ): Promise<AxiosResponse<LoginSuccessResponse>> {
    return this.api.post("/login", credentials);
  }

  public getTokenFromStorage(): any {
    const user: any = this.cookieOven.eatCookie("auth");
    return user;
  }

  public async setTokenToStorage(token: string): Promise<void> {
    return this.cookieOven.bakeCookie("auth", token, {
      maxAge: 60 * 24 * 14,
    });
  }

  public getUser(token: string) {
    return this.api.get("/me");
  }

  public logout() {
    return this.cookieOven.clear("auth");
  }
}
