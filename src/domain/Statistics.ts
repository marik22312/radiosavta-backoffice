export interface ResponseDataObject {
  [key: string]: number;
}

export interface ResponseData {
  [key: string]: ResponseDataObject;
}

export interface PlayLiveStatsResponse {
  response: {
    data: ResponseData;
  };
}
