import styled from "@emotion/styled";

type CallHeaderProps = {
  name: string;
  time: string;
};

export const CallHeader = ({ name, time }: CallHeaderProps) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Timer>{time}</Timer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
`;

const Timer = styled.span`
  font-size: 1.25rem;
  font-weight: 400;
  opacity: 0.8;
`;
