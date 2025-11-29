import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { parseISO } from "date-fns";
import { ROUTES } from "@/routes";
import { NowListContainer } from "./components";
import { BreakActionModal } from "./components/BreakActionModal";
import { useGetCharacterList } from "../select/hooks/useGetCharacterList";
import { PageStatus } from "@/components/common";
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
      navigate(
        { pathname: ROUTES.MY_GIRL, search: `?id=${character.characterId}` },
        { state: character }
      );
    }
  };

  const closeModal = () => setModalCharacter(null);

  const apiGender = gender === "male" ? "MALE" : "FEMALE";

  const { data: characterList = [], isPending } = useGetCharacterList({
    relation: "now",
    gender: apiGender,
  });

  // 정렬: 만료되지 않은 항목을 위로, 만료된 항목을 아래로
  const sortedCharacterList = [...characterList].sort((a, b) => {
    const aExpired = isRelationshipExpired(a);
    const bExpired = isRelationshipExpired(b);

    // 만료되지 않은 항목이 위로
    if (!aExpired && bExpired) return -1;
    if (aExpired && !bExpired) return 1;
    // 둘 다 만료되었거나 둘 다 만료되지 않은 경우 원래 순서 유지
    return 0;
  });

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <ChevronLeft size={32} />
        </BackButton>
      </Header>

      <PageStatus
        isLoading={isPending}
        hasData={sortedCharacterList.length > 0}
        loadingText="만나고 있는 친구 목록을 확인하고 있어요."
        emptyText="만나고 있는 친구가 없습니다."
      >
        <NowListContainer
          items={sortedCharacterList}
          onCardClick={handleCardClick}
          isExpired={isRelationshipExpired}
        />
      </PageStatus>

      {modalCharacter && (
        <BreakActionModal
          characterId={modalCharacter.characterId}
          characterName={modalCharacter.name}
          gender={modalCharacter.gender}
          onClose={closeModal}
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

export default NowPage;
