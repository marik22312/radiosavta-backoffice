import { useMutation } from "react-query";
import { updateProgramImage } from "../../../../../api/Programs.api";

export const useUpdateProgramImage = (programId: string | number) => {
  const [mutate, { isLoading }] = useMutation((image: File) =>
    updateProgramImage(programId, image)
  );

  return {
    isLoading,
    updateImage: mutate,
  };
};
