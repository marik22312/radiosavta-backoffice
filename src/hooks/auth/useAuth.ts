import { useAuthContext } from "../../providers/AuthenticationProvider";

export const useAuth = () => {
  const { user, authToken, roles } = useAuthContext();

  return {
    user,
    authToken,
    isAuthenticated: !!authToken,
    roles,
  };
};
