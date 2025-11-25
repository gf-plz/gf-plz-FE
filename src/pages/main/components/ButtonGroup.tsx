import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import type { GenderKey } from "../MainPage";

type ButtonGroupProps = {
  gender: GenderKey;
  accent: string;
};

export const ButtonGroup = ({ gender, accent }: ButtonGroupProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      <GhostButton type="button" onClick={() => navigate(ROUTES.SELECT)}>
        {gender === "male" ? "다른 남친 선택" : "다른 여친 선택"}
      </GhostButton>
      <PrimaryButton
        type="button"
        $accent={accent}
        onClick={() => navigate(ROUTES.HISTORY)}
      >
        히스토리
      </PrimaryButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const GhostButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing[5]};
  background-color: ${({ theme }) => theme.colors.gray[20]};
  color: ${({ theme }) => theme.colors.text.default};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  cursor: pointer;
`;

const PrimaryButton = styled.button<{ $accent: string }>`
  width: 100%;
  border: none;
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing[5]};
  background-color: ${({ $accent }) => $accent};
  color: ${({ theme }) => theme.colors.text.white};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
`;
