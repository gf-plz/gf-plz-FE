import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { selectCharacter } from "../services/selectCharacter";
import { ROUTES } from "@/routes";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useSelectCharacter = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (characterId: number) => selectCharacter(characterId),
    onSuccess: (data) => {
      // 최근 선택된 캐릭터 정보 갱신 등 필요한 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECENT });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHARACTER_LIST({ relation: "yet", gender: "FEMALE" }) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHARACTER_LIST({ relation: "now", gender: "FEMALE" }) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHARACTER_LIST({ relation: "yet", gender: "MALE" }) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHARACTER_LIST({ relation: "now", gender: "MALE" }) });

      navigate(
        {
          pathname: ROUTES.MY_GIRL,
          search: `?id=${data.characterId}`,
        },
        { state: data.character }
      );
    },
    onError: (error) => {
      console.error("Failed to select character:", error);
      // TODO: 에러 처리 (토스트 메시지 등)
      alert("캐릭터 선택에 실패했습니다.");
    },
  });
};
