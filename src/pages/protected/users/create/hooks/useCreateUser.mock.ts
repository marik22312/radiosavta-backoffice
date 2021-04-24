import { useEffect } from "react";
import { createFakeUser } from "../../../../../api/Users.api.mock";
import { User } from "../../../../../domain/Users";
import * as UseCreateUserFile from "./useCreateUser";

export const stubUseCreateUser = (
  opts?: Partial<ReturnType<typeof UseCreateUserFile.useCreateUser>>
) => {
  const useCreateUserSpy = jest
    .spyOn(UseCreateUserFile, "useCreateUser")
    .mockReturnValue({
      isLoading: opts?.isLoading || false,
      createUser: opts?.createUser || jest.fn(),
    });

  return {
    useCreateUserSpy,
  };
};
export const stubUseCreateUserSuccess = (user?: User) => {
  const useCreateUserSpy = jest
    .spyOn(UseCreateUserFile, "useCreateUser")
    .mockImplementation((args) => {
      useEffect(() => {
        args?.onSuccess && args.onSuccess({ user: user || createFakeUser() });
      });

      return {
        createUser: jest.fn(),
        isLoading: false,
      };
    });

  return {
    useCreateUserSpy,
  };
};
export const stubUseCreateUserError = (error?: Error) => {
  const useCreateUserSpy = jest
    .spyOn(UseCreateUserFile, "useCreateUser")
    .mockImplementation((args) => {
      useEffect(() => {
        args?.onError && args.onError(error || new Error("Some Error"));
      });

      return {
        createUser: jest.fn(),
        isLoading: false,
      };
    });

  return {
    useCreateUserSpy,
  };
};
