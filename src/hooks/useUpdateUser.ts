import { useMutation, useQueryClient } from "react-query";
import { updateUserById } from "../api/Users.api";

export const useUpdateUser = () => {
  const queryCache = useQueryClient();

  const { mutate, ...rest } = useMutation(
    ({ userId, data }: any) => {
      return updateUserById(userId, data);
    },
    {
      onSuccess: () => queryCache.invalidateQueries("users"),
    }
  );

  return {
    updateUser: mutate,
    ...rest,
  };
};
