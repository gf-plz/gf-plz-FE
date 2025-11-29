import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageSection, ContentSection } from "./components";
import { useGetHistoryList } from "./hooks/useGetHistoryList";
import { ROUTES } from "@/routes";
import { PageStatus } from "@/components/common";
import type { HistoryCharacter } from "./services/getHistoryList";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gender = (searchParams.get("gender") as "male" | "female") || "female";
  const apiGender = gender === "male" ? "MALE" : "FEMALE";
  const { data: historyList = [], isPending } = useGetHistoryList(apiGender);

  const handleOpenHistoryChat = (character: HistoryCharacter) => {
    navigate({ pathname: ROUTES.HISTORY_CHAT, search: `?id=${character.characterId}` }, { state: character });
  };

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={() => navigate({ pathname: ROUTES.HOME, search: `?gender=${gender}` })}>
          <ChevronLeft size={32} />
        </BackButton>
      </Header>

      <PageStatus
        isLoading={isPending}
        hasData={historyList.length > 0}
        loadingText="히스토리를 불러오는 중입니다."
        emptyText="히스토리가 없습니다."
      >
        <ListContainer>
          {historyList.map((item) => (
            <HistoryCard key={item.characterId}>
              <ImageSection imageUrl={item.imageUrl} name={item.name} />

              <ContentSection
                message={item.aiSummary}
                affection={item.status.like}
                tags={[
                  item.mbti,
                  `#${item.attachment}`,
                  item.teto > 50 ? `테토 ${item.teto}%` : `에겐 ${100 - item.teto}%`,
                ]}
              />

              <ActionRow>
                <HistoryChatButton onClick={() => handleOpenHistoryChat(item)}>히스토리 채팅 보기</HistoryChatButton>
              </ActionRow>
            </HistoryCard>
          ))}
        </ListContainer>
      </PageStatus>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.default};
`;

const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => `0 ${theme.spacing[5]} ${theme.spacing[8]}`};
  overflow-y: auto;
`;

const HistoryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: 24px;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const HistoryChatButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.default};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: 999px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

export default HistoryPage;
