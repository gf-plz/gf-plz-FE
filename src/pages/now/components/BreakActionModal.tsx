import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/routes";
import { extendRelationship } from "../services/extendRelationship";
import { QUERY_KEYS } from "@/constants/queryKeys";

type BreakActionModalProps = {
  characterId: number;
  characterName: string;
  gender: "MALE" | "FEMALE";
  onClose: () => void;
};

export const BreakActionModal = ({
  characterId,
  characterName,
  gender,
  onClose,
}: BreakActionModalProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accent = theme.colors.primary[gender === "MALE" ? "male" : "female"];

  const extendMutation = useMutation({
    mutationFn: () => extendRelationship(characterId),
    onSuccess: () => {
      // 캐릭터 리스트 쿼리 무효화하여 데이터 새로고침
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CHARACTER_LIST({ relation: "now", gender }),
      });
      onClose();
    },
  });

  const handleViewResult = () => {
    onClose();
    navigate({
      pathname: ROUTES.HISTORY,
      search: `?gender=${gender === "MALE" ? "male" : "female"}`,
    });
  };

  const handleExtend = () => {
    extendMutation.mutate();
  };

  return (
    <Backdrop>
      <Dialog>
        <Header>헤어진 날짜가 지났어요</Header>
        <Body>
          {characterName}님과의 관계가 종료되었어요. 원하시면 결과를 확인하거나
          연장을 요청할 수 있어요.
        </Body>
        <ButtonRow>
          <ResultButton
            type="button"
            onClick={handleViewResult}
            $accent={accent}
          >
            결과보기
          </ResultButton>
          <ExtendButton
            type="button"
            onClick={handleExtend}
            $accent={accent}
            disabled={extendMutation.isPending}
          >
            {extendMutation.isPending ? "연장 중..." : "연장하기"}
          </ExtendButton>
        </ButtonRow>
        <CloseButton type="button" onClick={onClose}>
          닫기
        </CloseButton>
      </Dialog>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  width: min(420px, 90vw);
  background: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Header = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.title1.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  text-align: center;
`;

const Body = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[4]}; // ButtonGroup과 동일하게 간격 조정
`;

const BaseButton = styled.button<{ $accent?: string }>`
  flex: 1;
  box-sizing: border-box;
  border: none;
  border-radius: 20px; // ButtonGroup과 동일
  padding: ${({ theme }) => theme.spacing[4]}; // 약간 줄임 (모달 크기 고려)
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// '다른 여친 선택' 버튼 스타일 (Primary)
const ResultButton = styled(BaseButton)`
  background-color: ${({ $accent }) =>
    $accent ? `color-mix(in srgb, ${$accent}, white 85%)` : "#f0f0f0"};
  color: ${({ theme }) => theme.colors.text.default};
  box-shadow: none;
`;

// '현재 여친' 버튼 스타일 (Light)
const ExtendButton = styled(BaseButton)`
  background-color: ${({ $accent }) => $accent};
  color: ${({ theme }) => theme.colors.text.white};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
`;

// '히스토리' 버튼 스타일 (Secondary)
const CloseButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.gray[20]};
  color: ${({ theme }) => theme.colors.text.default};
  margin-top: ${({ theme }) => theme.spacing[1]};
  width: 100%; // 히스토리 버튼처럼 꽉 차게
`;
