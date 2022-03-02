import { useMutation } from "react-query";
import { updateProgramImage } from "../../../../../api/Programs.api";

export const useUpdateProgramImage = (
  programId: string | number,
  opts?: { onError?: (err: any) => void; onSuccess?: () => void }
) => {
  const [mutate, { isLoading, isError }] = useMutation(
    (image: File) => updateProgramImage(programId, image),
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
