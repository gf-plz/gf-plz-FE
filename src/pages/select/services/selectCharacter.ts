import { apiClient } from "@/api";
import type { Character } from "../../select/types/character";

type SelectCharacterResponse = {
  characterId: number;
  sessionId: number;
  character: Character;
};

export const selectCharacter = async (characterId: number): Promise<SelectCharacterResponse> => {
  const response = await apiClient.post(`/api/characters/${characterId}/select`);
  return response.data;
};
