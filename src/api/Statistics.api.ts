import { httpClient } from "../services/http.client";
import { PlayLiveStatsResponse } from "../domain/Statistics";

export const getLivePlayerStats = () => {
  return httpClient.get<PlayLiveStatsResponse>(
    "/v2/statistics/live-player/play"
  );
};
