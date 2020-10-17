import { BASE_API_URL } from "../config/api.config";
import { IFullProgram, IProgram } from "../models/types";
import HttpClient from "../services/http.client";

export const getTodaysShows = () => {
  return HttpClient.get<{ shows: IFullProgram[] }>(
    BASE_API_URL + "/v2/programs/today"
  );
};
