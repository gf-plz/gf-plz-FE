import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { ROUTES } from "@/routes";

const PROFILE_CONTENT = {
  female: {
    label: "여친",
    tagColor: "#1EB465",
    image:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
    imageAlt: "카페 창가에서 미소짓는 여성",
    tagName: "김도윤",
    descriptionLines: ["길동", "MBTI 20세"],
  },
  male: {
    label: "남친",
    tagColor: "#1AA2F7",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=80",
    imageAlt: "선명한 배경 앞에서 포즈를 취한 남성",
    tagName: "김도윤",
    descriptionLines: ["길동", "MBTI 20세"],
  },
} as const;

type GenderKey = keyof typeof PROFILE_CONTENT;

const MainPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [gender, setGender] = useState<GenderKey>("female");
  const profile = PROFILE_CONTENT[gender];
  const accent = theme.colors.primary[gender];

  return (
    <PageWrapper>
      <Inner>
        <HeaderSection>
          <Title>
            {gender === "male" ? "내 남친을 낳아도" : "내 여친을 낳아도"}
          </Title>
          <ToggleWrapper>
            <ToggleSwitch>
              <ToggleThumb $isMale={gender === "male"} $accent={accent} />
              {(Object.keys(PROFILE_CONTENT) as GenderKey[]).map((key) => {
                const option = PROFILE_CONTENT[key];
                const isActive = gender === key;

                return (
                  <ToggleLabel
                    key={key}
                    type="button"
                    onClick={() => setGender(key)}
                    $isActive={isActive}
                  >
                    {option.label}
                  </ToggleLabel>
                );
              })}
            </ToggleSwitch>
          </ToggleWrapper>
        </HeaderSection>

        <ProfileCard>
          <ProfileImageWrapper>
            <ProfileImage src={profile.image} alt={profile.imageAlt} />
            <Description>
              {profile.descriptionLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </Description>
          </ProfileImageWrapper>
        </ProfileCard>

        <ButtonGroup>
          <GhostButton type="button" onClick={() => navigate(ROUTES.SELECT)}>
            {gender === "male" ? "다른 남친 선택" : "다른 여친 선택"}
          </GhostButton>
          <PrimaryButton
            type="button"
            $accent={accent}
            onClick={() => navigate(ROUTES.HISTORY)}
          >
            히스토리
          </PrimaryButton>
        </ButtonGroup>
      </Inner>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[8]};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Inner = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[7]};
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.heroTitle.fontSize};
  line-height: ${({ theme }) => theme.typography.heroTitle.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 96px;
`;

const ToggleSwitch = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  width: 100%;
  height: 42px;
  padding: 3px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.gray[20]};
`;

const ToggleThumb = styled.span<{ $isMale: boolean; $accent: string }>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 45px;
  height: calc(100% - 6px);
  border-radius: 9999px;
  background-color: ${({ $accent }) => $accent};
  transition: transform 0.25s ease;
  transform: ${({ $isMale }) =>
    $isMale ? "translateX(100%)" : "translateX(0)"};
`;

const ToggleLabel = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  background: transparent;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text.white : theme.colors.text.default};
  cursor: pointer;
`;

const ProfileCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 100%;
  border-radius: 32px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  box-shadow: 0 18px 30px rgba(25, 25, 25, 0.08),
    0 8px 12px rgba(25, 25, 25, 0.06);
  margin: 0 auto;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #fff;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 85%;
  object-fit: cover;
  display: block;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0) 100%
  );
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const GhostButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing[5]};
  background-color: ${({ theme }) => theme.colors.gray[20]};
  color: ${({ theme }) => theme.colors.text.default};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  cursor: pointer;
`;

const PrimaryButton = styled.button<{ $accent: string }>`
  width: 100%;
  border: none;
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing[5]};
  background-color: ${({ $accent }) => $accent};
  color: ${({ theme }) => theme.colors.text.white};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
`;

export default MainPage;
