import styled from "@emotion/styled";
import { ChatHeader, ChatInput, ChatMessage, type Message } from "./components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetSessionMessage } from "./hooks/useGetSessionMessage";
import type { MessageResponse } from "./types/message";

const ChatPage = () => {
  const { state } = useLocation();
  const characterName = state?.name || "상대방";
  const characterImage = state?.imageUrl || "";
  // TODO: 정확한 session id 경로 확인 필요. state.status.statusId를 사용한다고 가정
  const sessionId = state?.status?.statusId || "";

  const { data: sessionMessages = [], isPending } = useGetSessionMessage(sessionId);

  // API 응답을 UI 메시지 포맷으로 변환
  const formattedMessages: Message[] = sessionMessages.map((msg: MessageResponse) => ({
    id: msg.messageId.toString(),
    text: msg.textContent,
    timestamp: new Date(msg.createdAt).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    isMine: msg.senderRole === "USER",
    senderName: msg.senderRole === "USER" ? "나" : characterName,
    senderProfile: msg.senderRole === "USER" ? "" : characterImage,
  }));

  // 로컬에서 추가된 메시지 관리 (API 연동 전 임시)
  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  // API 메시지와 로컬 메시지 합치기
  const displayMessages = [...formattedMessages, ...localMessages];

  if (isPending) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  const handleSendMessage = (text: string) => {
    // TODO: 메시지 전송 API 연동 필요
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
    setLocalMessages((prev) => [...prev, newMessage]);
  };

  return (
    <PageContainer>
      <ChatHeader name={characterName} imageUrl={characterImage} />
      <ChatContent>
        <MessageList>
          {displayMessages.map((msg) => (
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
  overflow-y: auto;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default ChatPage;
