import HttpClient from "../services/http.client";

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
