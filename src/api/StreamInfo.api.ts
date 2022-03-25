import { httpClient } from "../services/http.client";

interface StreamInfo {
  isLive: boolean;
  listener_peak: number;
  listeners: number;
  streamStart: number;
  streamer: string;
  uniqueListeners: number;
}

export const getStreamInfo = async (): Promise<StreamInfo> => {
  const { data } = await httpClient.get("/statistics/server");

  return data;
};
