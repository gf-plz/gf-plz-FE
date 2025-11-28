import styled from "@emotion/styled";
import { differenceInDays, parseISO } from "date-fns";

type NowCardProps = {
  imageUrl: string;
  name: string;
  description: string;
  startDay: string | null;
  onClick?: () => void;
};

export const NowCard = ({ imageUrl, name, description, startDay, onClick }: NowCardProps) => {
  // D-day 계산
  const getDDay = (startDateStr: string | null) => {
    if (!startDateStr) return null;
    
    const startDate = parseISO(startDateStr);
    const today = new Date();
    
    // 날짜 차이 계산 (시작일 포함 D+1)
    const diffDays = differenceInDays(today, startDate) + 1;
    
    return `D+${diffDays}`;
  };

  const dDay = getDDay(startDay);

  return (
    <Container onClick={onClick}>
      <ImageSection>{imageUrl ? <CardImage src={imageUrl} alt={name} /> : <PlaceholderImage />}</ImageSection>

      <ContentSection>
        <NameWrapper>
          <Name>{name}</Name>
          {dDay && <DDayBadge>{dDay}</DDayBadge>}
        </NameWrapper>
        <Description>{description}</Description>
      </ContentSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray[30]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.colors.primary.default};
    background-color: ${({ theme }) => theme.colors.gray[0]}; // 배경색 유지
  }

  &:active {
    transform: translateY(-2px) scale(1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const ImageSection = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray[20]};
  border-radius: 20px;
  overflow: hidden;
  margin-top: 16px;
  margin-left: 16px;
  width: calc(100% - 32px);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray[30]};
`;

const ContentSection = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Name = styled.h3`
  font-size: ${({ theme }) => theme.typography.title1.fontSize};
  line-height: ${({ theme }) => theme.typography.title1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const DDayBadge = styled.div`
  background-color: #FFD4E9;
  color: #000;
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  padding: 6px 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
  text-align: center;
`;
