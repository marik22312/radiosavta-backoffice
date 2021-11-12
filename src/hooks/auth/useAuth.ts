import { useAuthContext } from "../../providers/AuthenticationProvider";

export const useAuth = () => {
  const { user, authToken } = useAuthContext();

  return {
    user,
    authToken,
    isAuthenticated: !!authToken,
  };
};
