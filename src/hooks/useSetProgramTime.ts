import { useMutation } from "react-query";
import { editProgramTime } from "../api/Programs.api";

export const useSetProgramTime = () => {
  const { mutate, ...rest } = useMutation(({ programId, programTime }: any) => {
    return editProgramTime(programId, programTime);
  });

  return {
    setProgramTime: mutate,
    ...rest,
  };
};
