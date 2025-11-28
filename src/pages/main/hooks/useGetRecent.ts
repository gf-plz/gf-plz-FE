import { useQuery } from "@tanstack/react-query";
import { getRecent } from "../services/getRecent";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useGetRecent = (gender?: "MALE" | "FEMALE") => {
  return useQuery({
    queryKey: QUERY_KEYS.RECENT(gender),
    queryFn: () => getRecent(gender),
  });
};
