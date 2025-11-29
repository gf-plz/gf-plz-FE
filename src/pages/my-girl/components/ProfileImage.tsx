import styled from "@emotion/styled";

type ProfileImageProps = {
  imageUrl: string;
  name: string;
  description: string;
};

export const ProfileImage = ({ imageUrl, name, description }: ProfileImageProps) => {
  return (
    <Container>
      <Profile src={imageUrl} alt={name} />
      <GradientOverlay />
      <InfoSection>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </InfoSection>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const Profile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(250, 250, 250, 1) 75%);
  pointer-events: none;
`;

const InfoSection = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[6]};
  left: ${({ theme }) => theme.spacing[6]};
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Name = styled.h1`
  font-size: ${({ theme }) => theme.typography.heroTitle.fontSize};
  line-height: ${({ theme }) => theme.typography.heroTitle.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  margin: 0;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.default};
  padding: 0 24px 0 0;
  margin: 0;
`;
