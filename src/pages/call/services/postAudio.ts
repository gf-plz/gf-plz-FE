import { apiClient } from "@/api";

export type PostAudioParams = {
  characterId: number;
  sessionId?: number;
  audioFile: File;
};

export const postAudio = async ({ characterId, sessionId, audioFile }: PostAudioParams) => {
  const formData = new FormData();
  formData.append("audio", audioFile);

  const params = new URLSearchParams();
  params.append("characterId", characterId.toString());
  if (sessionId) {
    params.append("sessionId", sessionId.toString());
  }

  const response = await apiClient.post(`/api/call/audio?${params.toString()}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob", // 오디오 바이너리 응답을 받기 위해
  });

  return response.data; // Blob 반환
};

