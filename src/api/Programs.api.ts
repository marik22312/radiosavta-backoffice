import { BASE_API_URL } from "../config/api.config";
import { Schedule } from "../domain/Schedule";
import { IFullProgram, IProgram } from "../models/types";
import HttpClient from "../services/http.client";

export const getTodaysShows = () => {
  return HttpClient.get<{ schedule: Schedule[] }>(
    BASE_API_URL + "/v2/schedule"
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

export const getProgramById = async (programId: string | number) => {
  const { data } = await HttpClient.get<{ program: IFullProgram }>(
    `/v2/programs/${programId}`
  );
  return data.program;
};
