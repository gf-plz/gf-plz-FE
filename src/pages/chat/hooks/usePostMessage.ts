import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMessage, type PostMessageParams } from "../services/postMessage";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const usePostMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ characterId, sessionId, message }: PostMessageParams) =>
      postMessage({ characterId, sessionId, message }),
    onSuccess: (_, variables) => {
      // 메시지 전송 성공 시 해당 세션의 메시지 목록 쿼리를 무효화하여 최신 목록을 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SESSION_MESSAGE(variables.sessionId),
      });
    },
  });
};
