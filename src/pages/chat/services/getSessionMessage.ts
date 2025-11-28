import { apiClient } from "@/api";
import type { MessageResponse } from "../types/message";

export const getSessionMessage = async (sessionId: string): Promise<MessageResponse[]> => {
  const response = await apiClient.get(`/api/messages/session/${sessionId}`);
  return response.data;
};
