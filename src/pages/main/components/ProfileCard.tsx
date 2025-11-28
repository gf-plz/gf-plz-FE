import styled from "@emotion/styled";
import type { ProfileContent, GenderKey } from "../MainPage";

type ProfileCardProps = {
  profile: ProfileContent[GenderKey];
  onClick?: () => void;
};

export const ProfileCard = ({ profile, onClick }: ProfileCardProps) => {
  return (
    <Container onClick={onClick}>
      <ProfileImageWrapper>
        {profile?.imageUrl ? (
          <>
            <ProfileImage src={profile.imageUrl} alt={profile.imageAlt} />
            <Description>
              <span>{profile.name}</span>
              <span>{profile.description}</span>
            </Description>
          </>
        ) : (
          <NotFound>선택하러 가기</NotFound>
        )}
      </ProfileImageWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 32px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  box-shadow: 0 18px 30px rgba(25, 25, 25, 0.08), 0 8px 12px rgba(25, 25, 25, 0.06);
  margin: 0 auto;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 22px 36px rgba(25, 25, 25, 0.12), 0 12px 18px rgba(25, 25, 25, 0.08);
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
`;

const Description = styled.div`
  position: absolute;
  bottom: 32px;
  left: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text.default};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: 1.75rem;
  text-transform: uppercase;
  z-index: 1;

  span:last-of-type {
    font-size: 1.125rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const NotFound = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;
