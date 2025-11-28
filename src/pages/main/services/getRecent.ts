import { apiClient } from "@/api";

export const getRecent = async () => {
  const stored = localStorage.getItem("recentCharacter");
  if (stored) {
    const parsed = JSON.parse(stored);
    // MainPage의 ProfileCard에서 사용하는 형식으로 변환
    return {
      ...parsed,
      label: parsed.gender === "MALE" ? "남친" : "여친",
      tagColor: parsed.gender === "MALE" ? "#1AA2F7" : "#1EB465",
      imageAlt: parsed.name,
    };
  }

  try {
    const response = await apiClient.get("/api/characters/recent");
    return response.data;
  } catch (error) {
    return null;
  }
};
