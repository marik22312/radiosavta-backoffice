import { AxiosError, AxiosRequestConfig } from "axios";
import { useMutation } from "react-query";
import {
  uploadRecordedShow,
  UploadRecordedShowParms,
} from "../api/RecordedShows.api";

interface UseUploadRecordedShowArgs {
  requestConfig?: AxiosRequestConfig;
  onError: (error: AxiosError) => void;
  onSuccess: (data: any) => void;
}
export const useUploadRecordedShow = (opts?: UseUploadRecordedShowArgs) => {
  const { mutate } = useMutation(
    (args: UploadRecordedShowParms) =>
      uploadRecordedShow(args, opts?.requestConfig),
    {
      onError: opts?.onError,
      onSuccess: opts?.onSuccess,
    }
  );

  return {
    uploadRecordedShow: mutate,
  };
};
