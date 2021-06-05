import { useState } from "react";
import { useMutation } from "react-query";
import {
  uploadRecordedShow,
  UploadRecordedShowParms,
} from "../api/RecordedShows.api";

export const useUploadRecordedShow = () => {
  const [mutate] = useMutation(
    (args: UploadRecordedShowParms) => uploadRecordedShow(args),
    {
      onError: () => console.log("error"),
    }
  );

  return {
    uploadRecordedShow: mutate,
  };
};
