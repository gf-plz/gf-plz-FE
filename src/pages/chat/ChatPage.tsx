import styled from "@emotion/styled";
import { ChatHeader, ChatInput, ChatMessage, type Message } from "./components";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "안녕하세요! 오늘 날씨가 참 좋네요. 😊",
    timestamp: "오후 3:00",
    isMine: false,
    senderName: "길동",
    senderProfile: "https://i.pravatar.cc/150?u=gildong",
  },
  {
    id: "2",
    text: "안녕하세요~",
    timestamp: "오후 7:20",
    isMine: true,
    senderName: "나",
    senderProfile: "",
  },
  {
    id: "3",
    text: "오늘 점심은 뭐 드셨나요?",
    timestamp: "오후 7:20",
    isMine: false,
    senderName: "길동",
    senderProfile: "https://i.pravatar.cc/150?u=gildong",
  },
];

const ChatPage = () => {
  const { state } = useLocation();
  const characterName = state?.name || "길동";
  const characterImage =
    state?.imageUrl || "https://i.pravatar.cc/150?u=gildong";

  const [messages, setMessages] = useState<Message[]>(() => {
    return INITIAL_MESSAGES.map((msg) => {
      if (!msg.isMine) {
        return {
          ...msg,
          senderName: characterName,
          senderProfile: characterImage,
        };
      }
      return msg;
    });
  });

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      isMine: true,
      senderName: "나",
      senderProfile: "",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <PageContainer>
      <ChatHeader name={characterName} imageUrl={characterImage} />
      <ChatContent>
        <DateDivider>2025년 11월 21일 금요일</DateDivider>
        <MessageList>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </MessageList>
      </ChatContent>
      <ChatInput onSendMessage={handleSendMessage} />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.colors.gray[0]};
`;

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.background};
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const DateDivider = styled.div`
  align-self: center;
  background-color: ${({ theme }) => theme.colors.gray[20]};
  color: ${({ theme }) => theme.colors.gray[70]};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: 12px;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export default ChatPage;
