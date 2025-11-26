import styled from "@emotion/styled";
import { SelectCard } from "./SelectCard";

// TODO: API 연동 시 타입 정의 분리
type SelectItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type ListContainerProps = {
  items: SelectItem[];
};

export const ListContainer = ({ items }: ListContainerProps) => {
  return (
    <Container>
      {items.map((item) => (
        <SelectCard
          key={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          description={item.description}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => `0 ${theme.spacing[5]} ${theme.spacing[8]}`};
  overflow-y: auto;
`;

