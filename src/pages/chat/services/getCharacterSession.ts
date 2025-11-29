import { apiClient } from "@/api";

export type CharacterSessionResponse = {
  characterId: number;
  sessionId: number;
};

export const getCharacterSession = async (characterId: number): Promise<CharacterSessionResponse> => {
  const response = await apiClient.get(`/api/characters/${characterId}/session`);
  return response.data;
};
