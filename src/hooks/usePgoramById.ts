import { useQuery } from "react-query";
import { getProgramById } from "../api/Programs.api";

export const useProgramById = (programId: string | number) => {
  const { data, isLoading } = useQuery(
    ["programs", programId],
    () => getProgramById(programId),
    {
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, program: data };
};
