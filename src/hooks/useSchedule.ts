import { useQuery } from "react-query";
import { getSchedule } from "../api/Schedule.api";

export const useSchedule = () => {
  const { data, isLoading } = useQuery("todayShows", getSchedule);
  return {
    isLoading,
    shows: data?.data.schedule || [],
  };
};
