import { apiClient } from "../../../api";
import type { Character } from "../types/character";

type GetCharacterListParams = {
  relation?: "yet" | "now";
  gender?: "MALE" | "FEMALE";
};

export const getCharacterList = async (params?: GetCharacterListParams): Promise<Character[]> => {
  const response = await apiClient.get("/api/characters", {
    params,
  });
  return response.data;
};
