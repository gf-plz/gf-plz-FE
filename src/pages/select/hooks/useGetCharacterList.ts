import { useQuery } from "@tanstack/react-query";
import { getCharacterList } from "../services/getCharacterList";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useGetCharacterList = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CHARACTER_LIST,
    queryFn: getCharacterList,
  });
};

