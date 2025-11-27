import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageSection, ContentSection } from "./components";

// TODO: API 연동 시 타입 정의 분리
type HistoryItem = {
  id: number;
  name: string;
  imageUrl: string;
  message: string;
  affection: number; // 0 ~ 100
  tags: string[];
  gender: "male" | "female";
};

// 더미 데이터
const MOCK_HISTORY_LIST: HistoryItem[] = [
  {
    id: 1,
    name: "지은",
    imageUrl:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
    message: "당신은 너무 멋져요! 덕분에 행복했어요!",
    affection: 75,
    tags: ["ISFP", "#안정형", "에겐"],
    gender: "female",
  },
  {
    id: 2,
    name: "도윤",
    imageUrl:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=80",
    message: "오늘 정말 즐거웠어, 다음에 또 보자!",
    affection: 88,
    tags: ["ENFP", "#다정함", "테토"],
    gender: "male",
  },
  {
    id: 3,
    name: "민지",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    message: "이야기 들어줘서 고마워요.",
    affection: 60,
    tags: ["ISTJ", "#신중형", "에겐"],
    gender: "female",
  },
  {
    id: 4,
    name: "준호",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    message: "형이랑 노니까 재밌다 ㅋㅋ",
    affection: 90,
    tags: ["ESTP", "#활동적", "테토"],
    gender: "male",
  },
];

const HistoryPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gender = (searchParams.get("gender") as "male" | "female") || "female";

  const filteredList = MOCK_HISTORY_LIST.filter(
    (item) => item.gender === gender
  );

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={32} />
        </BackButton>
      </Header>

      <ListContainer>
        {filteredList.map((item) => (
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
