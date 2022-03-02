import { BASE_API_URL } from "../config/api.config";
import { IFullProgram } from "../models/types";
import HttpClient from "../services/http.client";

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

export const updateProgramImage = async (
  programId: number | string,
  image: File
) => {
  const form = new FormData();
  form.append("image", image);

  const { data } = await HttpClient.put(
    `/v2/programs/${programId}/image`,
    form,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return data;
};
