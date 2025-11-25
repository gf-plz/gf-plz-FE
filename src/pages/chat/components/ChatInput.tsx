import { Send } from "lucide-react";
import styled from "@emotion/styled";
import { useState } from "react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      handleSend();
    }
  };

  return (
    <Container>
      <InputWrapper>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
        />
      </InputWrapper>
      <SendButton onClick={handleSend} disabled={!message.trim()}>
        <Send size={24} />
      </SendButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[20]};
  position: sticky;
  bottom: 0;
  width: 100%;
`;

const InputWrapper = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[10]};
  border-radius: 24px;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.colors.text.default};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[60]};
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.default};

  &:disabled {
    color: ${({ theme }) => theme.colors.gray[40]};
    cursor: not-allowed;
  }
`;
