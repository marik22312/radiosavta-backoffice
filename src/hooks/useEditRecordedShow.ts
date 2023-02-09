import { useMutation } from "react-query";
import { updateRecordedShow } from "../api/RecordedShows.api";
import { queryClient } from "../services/queryClient";

export const useEditRecordedShow = (
  programId: string | number,
  opts?: { onSuccess?: () => void; onError?: () => void }
) => {
  const { mutate, isLoading } = useMutation(
    ({ name }: any) => updateRecordedShow(programId, { name }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("programs");
        opts?.onSuccess?.();
      },
      onError: opts?.onError,
    }
  );

  return {
    editRecordedShow: mutate,
    isLoading,
  };
};
