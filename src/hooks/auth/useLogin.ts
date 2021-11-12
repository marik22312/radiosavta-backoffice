import { AxiosError } from "axios";
import { queryCache, useMutation } from "react-query";
import { login } from "../../api/Auth.api";
import { useAuthContext } from "../../providers/AuthenticationProvider";
import { cookieOven } from "../../services/CookieOven";
import { setToken } from "../../services/http.client";
import { TryLogigArgs } from "../../services/identity.service";

export const useLogin = (onError?: (err: AxiosError) => void) => {
  const { setAuthToken } = useAuthContext();
  const [tryLogin, { isLoading, isError }] = useMutation(login, {
    onError,
  });

  const preformLogin = async (credentials: TryLogigArgs) => {
    const res = await tryLogin(credentials);

    if (res) {
      setAuthToken(res.data.token);
      cookieOven.bakeCookie("auth", res.data.token);
      setToken(res.data.token);
      queryCache.invalidateQueries("logged_in_user");
      return true;
    }
  };

  return {
    preformLogin,
    isError,
    isLoading,
  };
};
