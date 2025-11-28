import styled from "@emotion/styled";
import { SelectCard } from "./SelectCard";
import type { Character } from "../types/character";

type ListContainerProps = {
  items: Character[];
};

export const ListContainer = ({ items }: ListContainerProps) => {
  return (
    <Container>
      {items.map((item) => (
        <SelectCard key={item.characterId} imageUrl={item.imageUrl} name={item.name} description={item.description} />
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
`;
