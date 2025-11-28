import styled from "@emotion/styled";
import { NowCard } from "./NowCard";
import type { Character } from "../../select/types/character";

type NowListContainerProps = {
  items: Character[];
  onCardClick: (character: Character) => void;
  isExpired?: (character: Character) => boolean;
};

export const NowListContainer = ({ items, onCardClick, isExpired }: NowListContainerProps) => {
  return (
    <Container>
      {items.map((item) => (
        <NowCard
          key={item.characterId}
          imageUrl={item.imageUrl}
          name={item.name}
          description={item.description}
          startDay={item.status.startDay}
          gender={item.gender}
          isExpired={Boolean(isExpired?.(item))}
          onClick={() => onCardClick(item)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[5]} ${theme.spacing[8]}`};
  overflow-y: auto;
  width: 100%;
`;
