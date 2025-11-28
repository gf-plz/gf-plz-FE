import { apiClient } from "@/api";

export type PostMessageParams = {
  characterId: number;
  sessionId: number;
  message: string;
};

export type PostMessageResponse = {
  sessionId: number;
  reply: string;
};

export const postMessage = async ({ characterId, sessionId, message }: PostMessageParams) => {
  const response = await apiClient.post(`/api/chat`, {
    characterId,
    sessionId,
    content: message,
  });
  return response.data;
};
