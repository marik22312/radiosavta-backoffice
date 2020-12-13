import { BASE_API_URL } from "../config/api.config";
import { IFullProgram, IProgram } from "../models/types";
import HttpClient from "../services/http.client";

export const getTodaysShows = () => {
  return HttpClient.get<{ shows: IFullProgram[] }>(
    BASE_API_URL + "/v2/programs/today"
  );
};
export const getAllPrograms = () => {
  return HttpClient.get<{ programs: IFullProgram[] }>(
    BASE_API_URL + "/v2/programs"
  );
};

export const editProgramTime = (
  programId: string | number,
  programTimes: { start_time: string; day_of_week: string }
) => {
  return HttpClient.put<{ shows: IFullProgram[] }>(
    BASE_API_URL + `/v2/programs/${programId}/program-times`,
    programTimes
  );
};
