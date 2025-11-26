import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ImageSection, ContentSection } from "./components";

// TODO: API 연동 시 타입 정의 분리
type HistoryItem = {
  id: number;
  name: string;
  imageUrl: string;
  message: string;
  affection: number; // 0 ~ 100
  tags: string[];
};

// 더미 데이터
const MOCK_HISTORY_LIST: HistoryItem[] = [
  {
    id: 1,
    name: "길동",
    imageUrl:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
    message: "당신은 너무 멋져요! 덕분에 행복했어요!",
    affection: 75,
    tags: ["ISFP", "#안정형", "에겐"],
  },
  {
    id: 2,
    name: "길동",
    imageUrl:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=80",
    message: "당신은 너무 멋져요! 덕분에 행복했어요!",
    affection: 75,
    tags: ["ENFP", "#의존형", "테토"],
  },
  {
    id: 3,
    name: "길동",
    imageUrl:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
    message: "당신은 너무 멋져요! 덕분에 행복했어요!",
    affection: 50,
    tags: ["ESTJ", "#회피형", "에겐"],
  },
];

const HistoryPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={32} />
        </BackButton>
      </Header>

      <ListContainer>
        {MOCK_HISTORY_LIST.map((item) => (
          <HistoryCard key={item.id}>
            <ImageSection imageUrl={item.imageUrl} name={item.name} />

            <ContentSection
              message={item.message}
              affection={item.affection}
              tags={item.tags}
            />
          </HistoryCard>
        ))}
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

export default HistoryPage;
