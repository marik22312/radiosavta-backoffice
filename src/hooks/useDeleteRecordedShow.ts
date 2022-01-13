import { useMutation } from "react-query";
import { deleteRecordedShow as preformDeleteRecordedShow } from "../api/RecordedShows.api";

export const useDeleteRecordedShow = (opts?: {
  onError?: (err: Error) => void;
  onSuccess?: () => void;
}) => {
  const [deleteRecordedShow, { isLoading }] = useMutation(
    (recordedShowId: string | number) =>
      preformDeleteRecordedShow(recordedShowId),
    {
      onError: opts?.onError,
      onSuccess: opts?.onSuccess,
    }
  );

  return {
    deleteRecordedShow,
    isLoading,
  };
};
