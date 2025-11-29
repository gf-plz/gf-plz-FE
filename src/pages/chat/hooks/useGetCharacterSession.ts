import { useQuery } from "@tanstack/react-query";
import { getCharacterSession } from "../services/getCharacterSession";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useGetCharacterSession = (characterId?: number) => {
  const enabled = Boolean(characterId);

  return useQuery({
    queryKey: enabled ? QUERY_KEYS.CHARACTER_SESSION(characterId!) : ["characterSession", "idle"],
    queryFn: () => {
      if (!characterId) {
        throw new Error("characterId is required to fetch session");
      }
      return getCharacterSession(characterId);
    },
    enabled,
  });
};

