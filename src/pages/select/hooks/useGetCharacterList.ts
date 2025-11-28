import { useQuery } from "@tanstack/react-query";
import { getCharacterList } from "../services/getCharacterList";
import { QUERY_KEYS } from "@/constants/queryKeys";

type UseGetCharacterListParams = {
  relation?: "yet" | "now";
  gender?: "MALE" | "FEMALE";
};

export const useGetCharacterList = (params?: UseGetCharacterListParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHARACTER_LIST(params),
    queryFn: () => getCharacterList(params),
  });
};
