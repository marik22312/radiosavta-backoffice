import { BASE_API_URL } from "../config/api.config";
import { Schedule } from "../domain/Schedule";
import { httpClient } from "../services/http.client";

export const getSchedule = () => {
  return httpClient.get<{ schedule: Schedule[] }>(
    BASE_API_URL + "/v2/schedule"
  );
};
