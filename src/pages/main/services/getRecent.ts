import { apiClient } from "@/api";

export const getRecent = async () => {
  const response = await apiClient.get("/api/characters/recent");
  return response.data;
};
