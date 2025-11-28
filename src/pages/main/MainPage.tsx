import { useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { HeaderSection, ProfileCard, ButtonGroup } from "./components";
import { useGetRecent } from "./hooks/useGetRecent";

const PROFILE_CONTENT = {
  female: {
    label: "여친",
    tagColor: "#1EB465",
    characterId: 1,
    gender: "FEMALE",
    name: "지은",
    description: "밝고 활발한 성격의 여자친구",
    imageUrl: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
    imageAlt: "카페 창가에서 미소짓는 여성",
  },
  male: {
    label: "남친",
    tagColor: "#1AA2F7",
    characterId: 2,
    gender: "MALE",
    name: "도윤",
    description: "다정하고 듬직한 남자친구",
    imageUrl: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=80",
    imageAlt: "선명한 배경 앞에서 포즈를 취한 남성",
  },
} as const;

export type GenderKey = keyof typeof PROFILE_CONTENT;

export type ProfileContent = typeof PROFILE_CONTENT;

const MainPage = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGender = (searchParams.get("gender") as GenderKey) || "female";
  const [gender, setGender] = useState<GenderKey>(initialGender);
  const accent = theme.colors.primary[gender];
  const { data: recent, isPending } = useGetRecent();
  const navigate = useNavigate();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleGenderChange = (newGender: GenderKey) => {
    setGender(newGender);
    setSearchParams({ gender: newGender });
  };

  const handleProfileClick = () => {
    if (recent) {
      navigate({ pathname: ROUTES.MY_GIRL, search: `?id=${recent.characterId}` }, { state: recent });
    }
  };

  return (
    <PageWrapper>
      <Inner>
        <HeaderSection gender={gender} setGender={handleGenderChange} profileContent={PROFILE_CONTENT} />
        <ProfileCard profile={recent} onClick={handleProfileClick} />
        <ButtonGroup gender={gender} accent={accent} />
      </Inner>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing[8]};
  background-color: ${({ theme }) => theme.colors.background};
  box-sizing: border-box;
`;

const Inner = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: ${({ theme }) => theme.spacing[7]};
`;

export default MainPage;
