import { useMutation, queryCache } from "react-query";
import { updateRecordedShow } from "../api/RecordedShows.api";

export const useEditRecordedShow = (
  programId: string | number,
  opts?: { onSuccess?: () => void; onError?: () => void }
) => {
  const [mutate, { isLoading }] = useMutation(
    ({ name }: any) => updateRecordedShow(programId, { name }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries("programs");
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
