import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/routes";
import { MyGirlButton, ProfileImage } from "./components";

// Mock 데이터 타입
type CharacterData = {
  characterId: number;
  gender: "FEMALE" | "MALE";
  name: string;
  description: string;
  imageUrl: string;
};

// Mock 데이터
const MOCK_CHARACTER_DATA: CharacterData = {
  characterId: 1,
  gender: "FEMALE",
  name: "지은",
  description: "밝고 활발한 성격의 여자친구",
  imageUrl: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
};

const MyGirlPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <ChevronLeft size={32} strokeWidth={3} />
      </BackButton>

      <ProfileImage
        imageUrl={MOCK_CHARACTER_DATA.imageUrl}
        name={MOCK_CHARACTER_DATA.name}
        description={MOCK_CHARACTER_DATA.description}
      />

      <MyGirlButton />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`;

const BackButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  left: ${({ theme }) => theme.spacing[4]};
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.default};
  cursor: pointer;
`;

export default MyGirlPage;
