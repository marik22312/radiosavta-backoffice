import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import {
  uploadRecordedShow,
  UploadRecordedShowParms,
} from "../api/RecordedShows.api";

export const useUploadRecordedShow = (opts?: AxiosRequestConfig) => {
  const [mutate] = useMutation(
    (args: UploadRecordedShowParms) => uploadRecordedShow(args, opts),
    {
      onError: () => console.log("error"),
    }
  );

  return {
    uploadRecordedShow: mutate,
  };
};
