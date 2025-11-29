import { apiClient } from "@/api";

export interface HistoryCharacterStatus {
  statusId: number;
  relation: string;
  startDay: string;
  endDay: string;
  like: number;
}

export interface HistoryCharacter {
  characterId: number;
  mbti: string;
  attachment: string;
  teto: number;
  gender: "MALE" | "FEMALE";
  name: string;
  description: string;
  imageUrl: string;
  voiceType: string;
  status: HistoryCharacterStatus;
  aiSummary: string;
}

export const getHistoryList = async (
  gender: "MALE" | "FEMALE"
): Promise<HistoryCharacter[]> => {
  const response = await apiClient.get("/api/history", {
    params: { gender },
  });
  return response.data;
};
