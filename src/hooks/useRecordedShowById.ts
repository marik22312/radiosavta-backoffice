import { useQuery } from "react-query";
import { getRecordedShow } from "../api/RecordedShows.api";

export const useRecordedShowById = (recordedShowId: string | number) => {
  const { data, isLoading } = useQuery(
    ["recorded_shows", recordedShowId],
    () => getRecordedShow(recordedShowId),
    {
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, recordedShow: data?.recordedShow };
};
