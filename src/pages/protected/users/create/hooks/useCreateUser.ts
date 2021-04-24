import { useMutation } from "react-query";
import {
  createUser,
  CreateUserRequest,
  CreateUserRespone,
} from "../../../../../api/Users.api";
import { DataHookBaseArgs } from "../../../../../domain/commons/hooks";

export type UseCreateUserArgs = DataHookBaseArgs<CreateUserRespone>;

export const useCreateUser = (args?: UseCreateUserArgs) => {
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
