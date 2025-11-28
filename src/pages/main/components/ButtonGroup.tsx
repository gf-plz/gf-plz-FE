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
  const label = gender === "male" ? "남친" : "여친";

  return (
    <Container>
      <Row>
        <Button
          type="button"
          variant="light"
          $accent={accent}
          onClick={() => navigate({ pathname: ROUTES.NOW, search: `?gender=${gender}` })}
        >
          현재 {label}
        </Button>
        <Button
          type="button"
          variant="primary"
          $accent={accent}
          onClick={() => navigate({ pathname: ROUTES.SELECT, search: `?gender=${gender}` })}
        >
          다른 {label}
        </Button>
      </Row>
      <Button
        type="button"
        variant="secondary"
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

const Row = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[4]};
`;

type ButtonProps = {
  variant: "light" | "primary" | "secondary";
  $accent?: string;
};

const Button = styled.button<ButtonProps>`
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing[5]};
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  ${({ theme, variant, $accent }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: ${$accent};
          color: ${theme.colors.text.white};
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
        `;
      case "light":
        return `
          background-color: color-mix(in srgb, ${$accent}, white 85%);
          color: ${$accent}; // 텍스트를 엑센트 색상으로 변경하지 않고 검정으로 할지 고민. 일단 이미지 느낌상 엑센트색 아님 검정.
        `;
      case "secondary":
        return `
          background-color: ${theme.colors.gray[20]};
          color: ${theme.colors.text.default};
        `;
    }
  }}
  
  // Light variant specific color override if needed. 
  // The prompt image shows the first button is pinkish light. 
  // Let's try checking if I should make text black for readability on light background.
  ${({ variant, theme }) => variant === "light" && `color: ${theme.colors.text.default};`}

  &:hover {
    transform: translateY(-2px);
    filter: brightness(0.95);
  }
`;
