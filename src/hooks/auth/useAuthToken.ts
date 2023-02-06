import { useAuthContext } from "../../providers/AuthenticationProvider";

export const useAuthToken = () => {
  const { authToken, setAuthToken } = useAuthContext();

  return {
    setAuthToken,
    authToken,
  };
};
