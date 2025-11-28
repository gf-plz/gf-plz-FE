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
      <Button
        type="button"
        variant="ghost"
        onClick={() => navigate({ pathname: ROUTES.SELECT, search: `?gender=${gender}` })}
      >
        {gender === "male" ? "만나고 있는 남친" : "만나고 있는 여친"}
      </Button>
      <Button
        type="button"
        variant="ghost"
        onClick={() => navigate({ pathname: ROUTES.SELECT, search: `?gender=${gender}` })}
      >
        {gender === "male" ? "다른 남친 선택" : "다른 여친 선택"}
      </Button>
      <Button
        type="button"
        variant="primary"
        $accent={accent}
        onClick={() => navigate({ pathname: ROUTES.HISTORY, search: `?gender=${gender}` })}
      >
        히스토리
      </Button>
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

type ButtonProps = {
  variant: "ghost" | "primary";
  $accent?: string;
};

const Button = styled.button<ButtonProps>`
  width: 100%;
  border: none;
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing[5]};
  font-size: 1.5rem;
  font-weight: ${({ theme, variant }) =>
    variant === "primary" ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Ghost variant styles */
  background-color: ${({ theme, variant, $accent }) => (variant === "primary" ? $accent : theme.colors.gray[20])};
  color: ${({ theme, variant }) => (variant === "primary" ? theme.colors.text.white : theme.colors.text.default)};
  box-shadow: ${({ variant }) => (variant === "primary" ? "0 10px 20px rgba(0, 0, 0, 0.12)" : "none")};

  &:hover {
    transform: translateY(-2px);
    ${({ theme, variant }) =>
      variant === "primary"
        ? `
        box-shadow: 0 14px 24px rgba(0, 0, 0, 0.25);
        filter: brightness(0.9);
      `
        : `
        background-color: ${theme.colors.gray[40]};
      `}
  }
`;
