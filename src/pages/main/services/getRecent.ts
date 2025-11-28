import { apiClient } from "@/api";

export const getRecent = async (gender?: "MALE" | "FEMALE") => {
  try {
    const response = await apiClient.get("/api/characters/recent", {
      params: { gender },
    });
    const data = response.data;

    if (!data) return null;

    // MainPage의 ProfileCard에서 사용하는 형식으로 변환
    return {
      ...data,
      label: data.gender === "MALE" ? "남친" : "여친",
      tagColor: data.gender === "MALE" ? "#1AA2F7" : "#1EB465",
      imageAlt: data.name,
    };
  } catch (error) {
    return null;
  }
};
