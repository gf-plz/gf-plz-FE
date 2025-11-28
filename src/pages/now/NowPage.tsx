import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { parseISO } from "date-fns";
import { ROUTES } from "@/routes";
import { NowListContainer } from "./components";
import { BreakActionModal } from "./components/BreakActionModal";
import { useGetCharacterList } from "../select/hooks/useGetCharacterList";
import type { Character } from "../select/types/character";

const NowPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [modalCharacter, setModalCharacter] = useState<Character | null>(null);
  const gender = (searchParams.get("gender") as "male" | "female") || "female";

  const isRelationshipExpired = useCallback((character: Character) => {
    if (!character.status.endDay) return false;
    const endDay = parseISO(character.status.endDay);
    const today = new Date();
    return endDay < today;
  }, []);

  const handleBack = () => {
    navigate({ pathname: ROUTES.HOME, search: `?gender=${gender}` });
  };

  const handleCardClick = (character: Character) => {
    if (isRelationshipExpired(character)) {
      setModalCharacter(character);
    } else {
      navigate({ pathname: ROUTES.MY_GIRL, search: `?id=${character.characterId}` }, { state: character });
    }
  };

  const closeModal = () => setModalCharacter(null);

  const handleViewResult = () => {
    closeModal();
    navigate(ROUTES.HISTORY);
  };

  const handleExtend = () => {
    closeModal();
    navigate(ROUTES.SELECT);
  };

  const apiGender = gender === "male" ? "MALE" : "FEMALE";

  const { data: characterList = [], isPending } = useGetCharacterList({
    relation: "now",
    gender: apiGender,
  });

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
        <NowListContainer items={characterList} onCardClick={handleCardClick} isExpired={isRelationshipExpired} />
      ) : (
        <LoadingMessage>만나고 있는 친구가 없어요.</LoadingMessage>
      )}

      {modalCharacter && (
        <BreakActionModal
          characterName={modalCharacter.name}
          onClose={closeModal}
          onViewResult={handleViewResult}
          onExtend={handleExtend}
        />
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
