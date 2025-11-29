import { useQuery } from "@tanstack/react-query";
import {
  getHistoryList,
  type HistoryCharacter,
} from "../services/getHistoryList";

export const useGetHistoryList = (gender: "MALE" | "FEMALE") => {
  return useQuery<HistoryCharacter[]>({
    queryKey: ["history", gender],
    queryFn: () => getHistoryList(gender),
  });
};
