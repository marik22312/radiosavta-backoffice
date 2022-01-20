import { useQuery } from "react-query";
import { getLivePlayerStats } from "../../api/Statistics.api";

export const usePlayLiveStats = () => {
  const { data, isLoading } = useQuery(
    "stats.player.live",
    () => getLivePlayerStats(),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    data: data?.data.response.data,
    isLoading,
  };
};
