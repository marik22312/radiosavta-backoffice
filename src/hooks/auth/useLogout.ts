import { useAuthContext } from "../../providers/AuthenticationProvider";
import { cookieOven } from "../../services/CookieOven";

export const useLogout = () => {
  const { user, setAuthToken } = useAuthContext();

  const logout = () => {
    setAuthToken("");
    cookieOven.clear("auth");
  };

  return {
    logout,
  };
};
