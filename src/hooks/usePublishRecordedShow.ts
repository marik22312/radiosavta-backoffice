import { useMutation, queryCache } from "react-query";
import { publishRecordedShow } from "../api/RecordedShows.api";

export const usePublisRecordedShow = () => {
  const [mutate, { isLoading }] = useMutation(publishRecordedShow, {
    onSuccess: () => queryCache.invalidateQueries(["recordedShow"]),
  });

  return {
    isLoading,
    publishRecordedShow: mutate,
  };
};
