import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/routes";
import { NowListContainer } from "./components";
import { useGetCharacterList } from "../select/hooks/useGetCharacterList";

const NowPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gender = (searchParams.get("gender") as "male" | "female") || "female";

  // 성별 대문자 변환
  const apiGender = gender === "male" ? "MALE" : "FEMALE";

  // '만나고 있는' 캐릭터 목록 조회 (relation: "now")
  const { data: characterList = [], isPending } = useGetCharacterList({
    relation: "now",
    gender: apiGender,
  });

  const handleBack = () => {
    navigate({ pathname: ROUTES.HOME, search: `?gender=${gender}` });
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

      {characterList.length > 0 ? (
        <NowListContainer items={characterList} />
      ) : (
        <LoadingMessage>만나고 있는 친구가 없어요.</LoadingMessage>
      )}
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
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.default};
  position: absolute;
  left: ${({ theme }) => theme.spacing[4]};
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
