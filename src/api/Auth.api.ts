import { LoginProvider } from "../domain/Auth";
import { User } from "../domain/Users";
import HttpClient from "../services/http.client";
import {
  LoginSuccessResponse,
  TryLogigArgs,
} from "../services/identity.service";

interface ResetPasswordResponse {
  success: boolean;
}
interface ForgotPasswordRepsonse {
  success: boolean;
}

export const resetPassword = (req: {
  token: string;
  captchaToken: string;
  password: string;
  passwordRepeat: string;
}) => {
  return HttpClient.post<ResetPasswordResponse>("/v2/auth/reset-password", {
    token: req.token,
    password: req.password,
    passwordRepeat: req.passwordRepeat,
    captchaToken: req.captchaToken,
  });
};
export const forgotPassword = (req: {
  captchaToken: string;
  email: string;
}) => {
  return HttpClient.post<ForgotPasswordRepsonse>("/v2/auth/forgot-password", {
    captchaToken: req.captchaToken,
    email: req.email,
  });
};

export const login = (credentials: TryLogigArgs) => {
  return HttpClient.post<LoginSuccessResponse>("/login", credentials);
};

export const getMe = () => {
  return HttpClient.get<User>("/me");
};

export interface V3LoginRequest {
  email?: string;
  password?: string;
  token?: string;
  provider?: LoginProvider;
}

export interface V3LoginResponse {
  user: User;
  token: string;
}
export const loginV3 = (request: V3LoginRequest) => {
  return HttpClient.post<V3LoginResponse>("/v3/auth/login", request);
};

export const authenticateV3 = () => {
  return HttpClient.post<V3LoginResponse>("/v3/auth/authenticate");
};
