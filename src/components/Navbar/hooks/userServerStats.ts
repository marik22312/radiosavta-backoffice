import { useQuery } from "react-query";
import { getStreamInfo } from "../../../api/StreamInfo.api";

export const useStreamInfo = () => {
  const { isLoading, data } = useQuery("stream-info", getStreamInfo, {
    refetchInterval: 15 * 1000,
  });

  return {
    streamInfo: data,
    isLoading,
  };
};
