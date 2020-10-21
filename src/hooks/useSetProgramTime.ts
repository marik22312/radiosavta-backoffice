import { useMutation } from "react-query";
import { editProgramTime } from "../api/Programs.api";

export const useSetProgramTime = () => {
  return useMutation(
    ({ programId, programTime }: any) => {
      console.log("Hooj", programTime);
      return editProgramTime(programId, programTime);
    },
    {
      onSuccess: (res) => {
        console.log("Succeded!", res);
      },
    }
  );
};
