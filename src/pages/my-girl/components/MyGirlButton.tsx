import { ROUTES } from "@/routes";
import styled from "@emotion/styled";
import { MessageCircle, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MyGirlButton = () => {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(ROUTES.CHAT);
  };

  const handleCall = () => {
    navigate(ROUTES.CALL);
  };

  return (
    <Container>
      <Button onClick={handleChat} color="#8dbfc6">
        <MessageCircle size={24} strokeWidth={2} />
      </Button>
      <Button onClick={handleCall} color="#b6e5c3">
        <Phone size={24} strokeWidth={2} />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: 0 ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]};
  width: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Button = styled.button<{ color: string }>`
  display: flex;
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]};
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.text.default};
  border-radius: 16px;
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.colors.text.default};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }
`;
