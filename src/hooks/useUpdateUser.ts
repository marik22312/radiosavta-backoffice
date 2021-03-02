import { useMutation, useQueryCache } from "react-query";
import { updateUserById } from "../api/Users.api";

export const useUpdateUser = () => {
  const queryCache = useQueryCache();

  return useMutation(
    ({ userId, data }: any) => {
      return updateUserById(userId, data);
    },
    {
      onSuccess: () => queryCache.invalidateQueries("users"),
    }
  );
};
