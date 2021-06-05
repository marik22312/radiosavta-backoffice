import { useQuery } from "react-query";
import { getUserById } from "../api/Users.api";

export const useUserById = (userId: string | number) => {
  const { data, isLoading } = useQuery(["users", userId], () =>
    getUserById(userId)
  );

  return { isLoading, user: data };
};
