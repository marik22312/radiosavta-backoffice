import { useMutation } from "react-query";
import { updateUserImage } from "../../../api/Users.api";

export const useEditUserImage = (
  userId: string | number,
  opts?: { onError?: (err: any) => void; onSuccess?: () => void }
) => {
  const { mutate, isLoading, isError } = useMutation(
    (image: File) => updateUserImage(userId, image),
    {
      onError: opts?.onError,
      onSuccess: opts?.onSuccess,
    }
  );

  return {
    isLoading,
    isError,
    updateImage: mutate,
  };
};
