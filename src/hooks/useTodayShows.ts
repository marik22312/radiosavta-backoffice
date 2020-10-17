import { useQuery } from "react-query";
import { getTodaysShows } from "../api/Programs.api";

export const useTodayShows = () => {
  const { data, isLoading } = useQuery("todayShows", getTodaysShows);
  return {
    isLoading,
    shows: data?.data.shows || [],
  };
};
