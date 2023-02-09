import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { forgotPassword } from "../../../../api/Auth.api";

export const useForgotPassword = (onError?: (err: AxiosError) => void) => {
  const { mutate, isLoading } = useMutation(forgotPassword, { onError });

  return {
    forgotPassword: mutate,
    isLoading,
  };
};
