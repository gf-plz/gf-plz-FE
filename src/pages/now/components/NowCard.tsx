import styled from "@emotion/styled";

type NowCardProps = {
  imageUrl: string;
  name: string;
  description: string;
  onClick?: () => void;
};

export const NowCard = ({ imageUrl, name, description, onClick }: NowCardProps) => {
  return (
    <Container onClick={onClick}>
      <ImageSection>{imageUrl ? <CardImage src={imageUrl} alt={name} /> : <PlaceholderImage />}</ImageSection>

      <ContentSection>
        <Name>{name}</Name>
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

const Name = styled.h3`
  font-size: ${({ theme }) => theme.typography.title1.fontSize};
  line-height: ${({ theme }) => theme.typography.title1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
  text-align: center;
`;
