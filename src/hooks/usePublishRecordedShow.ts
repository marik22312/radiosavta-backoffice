import { useMutation } from "react-query";
import { publishRecordedShow } from "../api/RecordedShows.api";
import { queryClient } from "../services/queryClient";

export const usePublisRecordedShow = () => {
  const { mutate, isLoading } = useMutation(publishRecordedShow, {
    onSuccess: () => queryClient.invalidateQueries(["recordedShow"]),
  });

  return {
    isLoading,
    publishRecordedShow: mutate,
  };
};
