import { useMutation } from "react-query";
import { editProgramTime } from "../api/Programs.api";

export const useSetProgramTime = () => {
  return useMutation(({ programId, programTime }: any) => {
    return editProgramTime(programId, programTime);
  });
};
