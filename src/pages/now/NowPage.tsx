import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/routes";
import { MyGirlButton, ProfileImage } from "../my-girl/components";
import { useGetCharacterList } from "../select/hooks/useGetCharacterList";

const NowPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gender = (searchParams.get("gender") as "male" | "female") || "female";

  // 성별 대문자 변환
  const apiGender = gender === "male" ? "MALE" : "FEMALE";

  const { data: characterList = [], isPending } = useGetCharacterList({
    relation: "now",
    gender: apiGender,
  });

  const characterData = characterList[0];

  const handleBack = () => {
    navigate(ROUTES.HOME);
  };

  if (isPending) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <ChevronLeft size={32} />
        </BackButton>
      </Header>

      {characterData ? (
        <ProfileImage
          imageUrl={characterData.imageUrl}
          name={characterData.name}
          description={characterData.description}
        />
      ) : (
        <LoadingMessage>만나고 있는 친구가 없어요.</LoadingMessage>
      )}

      <MyGirlButton characterData={characterData} />
    </Container>
  );
};

const Container = styled.div`
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
  justify-content: center;
  position: relative;
  min-height: 60px;
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
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  backdrop-filter: blur(4px);
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.sub};
`;

export default NowPage;
