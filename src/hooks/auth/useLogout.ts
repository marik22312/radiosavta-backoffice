import { cookieOven } from "../../services/CookieOven";
import { magic } from "../../services/MagicLink";
import { useAuthToken } from "./useAuthToken";

export const useLogout = () => {
  const { setAuthToken } = useAuthToken();

  const logout = async () => {
    await magic.user.logout();
    setAuthToken("");
    cookieOven.clear("auth");
    localStorage.removeItem("loginProvider");
    localStorage.removeItem("auth");
  };

  return {
    logout,
  };
};
