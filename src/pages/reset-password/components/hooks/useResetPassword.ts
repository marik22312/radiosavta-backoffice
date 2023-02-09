import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { resetPassword } from "../../../../api/Auth.api";

export const useResetPassword = (onError?: (err: AxiosError) => void) => {
  const { mutateAsync: mutate, isLoading } = useMutation(resetPassword, {
    onError,
  });

  return {
    resetPassword: mutate,
    isLoading,
  };
};
