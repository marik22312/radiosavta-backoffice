import { useQuery } from "react-query";
import { getMe } from "../../api/Auth.api";

interface UseLoggedInUserArgs {
  enabled?: boolean;
}
export const useLoggedInUser = (args?: UseLoggedInUserArgs) => {
  const { data, isLoading } = useQuery("logged_in_user", getMe, {
    ...args,
    refetchOnWindowFocus: false,
  });

  return {
    user: data?.data,
    isLoading,
  };
};
