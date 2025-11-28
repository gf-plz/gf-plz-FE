import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { NowCard } from "./NowCard";
import type { Character } from "../../select/types/character";

type NowListContainerProps = {
  items: Character[];
};

export const NowListContainer = ({ items }: NowListContainerProps) => {
  const navigate = useNavigate();

  const handleClick = (character: Character) => {
    navigate({ pathname: ROUTES.MY_GIRL, search: `?id=${character.characterId}` }, { state: character });
  };

  return (
    <Container>
      {items.map((item) => (
        <NowCard
          key={item.characterId}
          imageUrl={item.imageUrl}
          name={item.name}
          description={item.description}
          startDay={item.status.startDay}
          onClick={() => handleClick(item)}
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
