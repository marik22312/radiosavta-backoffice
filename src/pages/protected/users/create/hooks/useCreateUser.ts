import { useMutation } from "react-query";
import {
  createUser,
  CreateUserRequest,
  CreateUserRespone,
} from "../../../../../api/Users.api";
import { DataHookBaseArgs } from "../../../../../domain/commons/hooks";

export const useCreateUser = (args?: DataHookBaseArgs<CreateUserRespone>) => {
  const [mutateFn, { isLoading }] = useMutation(
    (user: CreateUserRequest) => createUser(user),
    {
      onError: args?.onError,
      onSuccess: ({ user }) => {
        args?.onSuccess && args.onSuccess({ user });
      },
    }
  );

  return {
    createUser: mutateFn,
    isLoading,
  };
};
