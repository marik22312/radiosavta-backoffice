import { httpClient } from "../services/http.client";
import { StreamInfo } from "../domain/StreamInfo";

export const getStreamInfo = async (): Promise<StreamInfo> => {
  const { data } = await httpClient.get("/statistics/server");

  return data;
};
