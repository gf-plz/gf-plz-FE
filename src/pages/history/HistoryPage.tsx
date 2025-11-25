import styled from "@emotion/styled";
import { ChevronLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getMBTIColor,
  getAttachmentColor,
  getEgenTetoColor,
} from "./components";

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
            <ImageSection>
              <CardImage src={item.imageUrl} alt={item.name} />
              <NameOverlay>{item.name}</NameOverlay>
            </ImageSection>

            <ContentSection>
              <MessageBar>{item.message}</MessageBar>

              <AffectionContainer>
                <HeartIcon size={30} fill="#FF6B6B" stroke="#FF6B6B" />
                <ProgressBar>
                  <Progress $value={item.affection} />
                </ProgressBar>
                <Percentage>{item.affection}%</Percentage>
              </AffectionContainer>

              <TagList>
                {item.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    $bgColor={
                      index === 0
                        ? getMBTIColor(tag) // 첫 번째: MBTI
                        : index === 1
                        ? getAttachmentColor(tag) // 두 번째: 애착유형
                        : getEgenTetoColor(tag) // 세 번째: 에겐/테토
                    }
                  >
                    {tag}
                  </Tag>
                ))}
              </TagList>
            </ContentSection>
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

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NameOverlay = styled.span`
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const MessageBar = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[30]};
  border-radius: 9999px;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const AffectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: 0 ${({ theme }) => theme.spacing[1]};
`;

const HeartIcon = styled(Heart)`
  flex-shrink: 0;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.gray[30]};
  border-radius: 9999px;
  overflow: hidden;
`;

const Progress = styled.div<{ $value: number }>`
  width: ${({ $value }) => $value}%;
  height: 100%;
  background: linear-gradient(90deg, #fcbfc8 0%, #ff7c8b 100%);
  border-radius: 9999px;
`;

const Percentage = styled.span`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  min-width: 32px;
  text-align: right;
`;

const TagList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: center;
  margin-top: 4px;
`;

const Tag = styled.span<{ $bgColor: string }>`
  flex: 1;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ theme }) =>
    theme.colors.text
      .default}; // 밝은 배경이라 기본 텍스트 사용 (시안 확인 필요, 일단 기본)
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: 9999px;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default HistoryPage;
