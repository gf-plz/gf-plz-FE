import { apiClient } from "@/api";

export const moveToHistory = async (characterId: number): Promise<void> => {
  await apiClient.post("/api/relations/three-days", {
    characterId,
  });
};
