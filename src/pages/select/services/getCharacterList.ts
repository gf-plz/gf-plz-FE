import { apiClient } from "../../../api";
import type { Character } from "../types/character";

export const getCharacterList = async (): Promise<Character[]> => {
  const response = await apiClient.get("/api/characters");
  return response.data;
};
