import { useQuery } from "react-query";
import { getMe } from "../../api/Auth.api";
import { User } from "../../domain/Users";
import { queryClient } from "../../services/queryClient";

interface UseLoggedInUserArgs {
  enabled?: boolean;
}
export const useLoggedInUser = (args?: UseLoggedInUserArgs) => {
  const { data, isLoading, refetch } = useQuery("logged_in_user", getMe, {
    ...args,
    refetchOnWindowFocus: false,
  });

  const setLoggedInUser = (user: User) => {
    queryClient.setQueryData("logged_in_user", {
      user,
    });
  };

  return {
    user: data?.data,
    roles: data?.data?.roles?.map((r) => r.name) || [],
    isLoading,
    refetch,
    setLoggedInUser,
  };
};
