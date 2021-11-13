import { useAuth } from "./auth/useAuth";

export const useMyPrograms = () => {
  const { user } = useAuth();

  return {
    userPrograms: user?.programs,
  };
};
