import { useQuery } from "react-query";
import { getAllUsers } from "../api/Users.api";

export const useUsers = () => {
  const { data, isLoading } = useQuery("users", getAllUsers);

  return { isLoading, users: data?.data.users || [] };
};
