import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageSection, ContentSection } from "./components";
import { useGetHistoryList } from "./hooks/useGetHistoryList";
import { ROUTES } from "@/routes";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gender = (searchParams.get("gender") as "male" | "female") || "female";
  const apiGender = gender === "male" ? "MALE" : "FEMALE";

  const { data: historyList = [], isPending } = useGetHistoryList(apiGender);

  if (isPending) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <PageWrapper>
      <Header>
        <BackButton
          onClick={() =>
            navigate({ pathname: ROUTES.HOME, search: `?gender=${gender}` })
          }
        >
          <ChevronLeft size={32} />
        </BackButton>
      </Header>

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
                item.teto > 50
                  ? `테토 ${item.teto}%`
                  : `에겐 ${100 - item.teto}%`,
              ]}
            />
          </HistoryCard>
        ))}
        {historyList.length === 0 && (
          <EmptyMessage>히스토리가 없습니다.</EmptyMessage>
        )}
      </ListContainer>
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.sub};
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.sub};
`;

export default HistoryPage;
