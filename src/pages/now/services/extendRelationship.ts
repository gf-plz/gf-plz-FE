import { apiClient } from "@/api";

export const extendRelationship = async (characterId: number): Promise<void> => {
  await apiClient.post(`/api/characters/${characterId}/extend`, {
    days: 3,
  });
};

