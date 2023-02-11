import { cookieOven } from "../../services/CookieOven";
import { useAuthToken } from "./useAuthToken";

export const useLogout = () => {
  const { setAuthToken } = useAuthToken();

  const logout = async () => {
    await logout();
    setAuthToken("");
    cookieOven.clear("auth");
    localStorage.removeItem("loginProvider");
    localStorage.removeItem("auth");
  };

  return {
    logout,
  };
};
