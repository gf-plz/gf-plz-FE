import { useQuery } from "@tanstack/react-query";
import { getSessionMessage } from "../services/getSessionMessage";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useGetSessionMessage = (sessionId?: number) => {
  const normalizedSessionId = sessionId ?? undefined;

  return useQuery({
    queryKey: normalizedSessionId ? QUERY_KEYS.SESSION_MESSAGE(normalizedSessionId) : ["sessionMessage", "idle"],
    queryFn: () => {
      if (!normalizedSessionId) {
        throw new Error("sessionId is required");
      }
      return getSessionMessage(String(normalizedSessionId));
    },
    enabled: Boolean(normalizedSessionId),
  });
};
