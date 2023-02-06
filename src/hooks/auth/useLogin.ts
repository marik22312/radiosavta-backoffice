import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { login, loginV3 } from "../../api/Auth.api";
import { LoginProvider } from "../../domain/Auth";
import { useAuthContext } from "../../providers/AuthenticationProvider";
import { cookieOven } from "../../services/CookieOven";
import { setToken } from "../../services/http.client";
import { TryLogigArgs } from "../../services/identity.service";
import {
  getMagicAuthToken,
  loginWithEmailOTP as loginWithMagicLink,
} from "../../services/MagicLink";
import { queryClient } from "../../services/queryClient";

export const useLogin = (onError?: (err: AxiosError) => void) => {
  const { setAuthToken, setLoginProvider } = useAuthContext();
  const {
    mutateAsync: tryLogin,
    isLoading,
    isError,
  } = useMutation(login, {
    onError,
  });

  const preformLogin = async (credentials: TryLogigArgs) => {
    const res = await tryLogin(credentials);

    if (res) {
      setAuthToken(res.data.token);
      cookieOven.bakeCookie("auth", res.data.token);
      setToken(res.data.token);
      queryClient.invalidateQueries("logged_in_user");
      return true;
    }
  };

  const loginWithEmailOTP = async (email: string) => {
    const storedToken = await getMagicAuthToken();
    if (!storedToken) {
      console.log("NoToken");
      const token = await loginWithMagicLink(email);
      if (token) {
        setAuthToken(token);
        setLoginProvider(LoginProvider.MAGIC_LINK);
        setToken(token);
        localStorage.setItem("loginProvider", LoginProvider.MAGIC_LINK);
      }
      return token;
    }

    const { data: loginResponse } = await loginV3({
      email,
      token: storedToken,
      provider: LoginProvider.MAGIC_LINK,
    });
    setLoginProvider(LoginProvider.MAGIC_LINK);
    setAuthToken(loginResponse.token);
    setToken(loginResponse.token);
    localStorage.setItem("loginProvider", LoginProvider.MAGIC_LINK);
    // return user;
    return {};
  };

  return {
    preformLogin,
    isError,
    isLoading,
    loginWithEmailOTP,
  };
};
