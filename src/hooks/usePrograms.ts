import { useQuery } from "react-query";
import { getAllPrograms } from "../api/Programs.api";

export const usePrograms = () => {
  const { data, isLoading } = useQuery("programs", getAllPrograms);

  return { isLoading, programs: data?.data.programs || [] };
};
