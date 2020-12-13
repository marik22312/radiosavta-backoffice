import { useQuery } from "react-query";
import { getUserById } from "../api/Users.api";

export const useUserById = (userId: string | number) => {
  const { data, isLoading } = useQuery(["users", userId], async () => {
    const user = await getUserById(userId);
    return user.data;
  });

  return { isLoading, user: data?.user };
};
