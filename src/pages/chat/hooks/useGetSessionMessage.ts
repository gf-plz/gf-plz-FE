import { useQuery } from "@tanstack/react-query";
import { getSessionMessage } from "../services/getSessionMessage";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useGetSessionMessage = (sessionId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SESSION_MESSAGE(Number(sessionId))],
    queryFn: () => getSessionMessage(sessionId),
    enabled: !!sessionId,
  });
};
