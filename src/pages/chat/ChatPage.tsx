import styled from "@emotion/styled";
import { ChatHeader, ChatInput, ChatMessage, type Message } from "./components";
import { useLocation } from "react-router-dom";
import { useGetSessionMessage } from "./hooks/useGetSessionMessage";
import { usePostMessage } from "./hooks/usePostMessage";
import type { MessageResponse } from "./types/message";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "@/utils";

const ChatPage = () => {
  const { state } = useLocation();
  const characterName = state?.name || "상대방";
  const characterImage = state?.imageUrl || "";
  const characterId = state?.characterId;
  const sessionId = state?.status?.statusId || "";

  const { data: sessionMessages = [], isPending } = useGetSessionMessage(sessionId);
  const { mutate: sendMessage, isPending: isSending } = usePostMessage();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 낙관적 업데이트를 위한 로컬 메시지 상태
  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);

  // API 응답을 UI 메시지 포맷으로 변환
  const formattedMessages: Message[] = sessionMessages.map((msg: MessageResponse) => ({
    id: msg.messageId.toString(),
    text: msg.textContent,
    timestamp: formatTime(msg.createdAt),
    isMine: msg.senderRole === "USER",
    senderName: msg.senderRole === "USER" ? "나" : characterName,
    senderProfile: msg.senderRole === "USER" ? "" : characterImage,
  }));

  // 메시지가 업데이트될 때마다 스크롤 하단으로 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formattedMessages.length, optimisticMessages.length, isSending]);

  if (isPending) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  const handleSendMessage = (text: string) => {
    if (!characterId || !sessionId) {
      console.error("Missing characterId or sessionId");
      return;
    }

    // 낙관적 업데이트: 전송 즉시 화면에 표시
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
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
    setOptimisticMessages((prev) => [...prev, tempMessage]);

    sendMessage(
      {
        characterId,
        sessionId,
        message: text,
      },
      {
        onSuccess: () => {
          // API 성공 시 낙관적 메시지 비우기
          // 이 시점에 쿼리가 갱신되어 formattedMessages에 새 메시지가 포함됨
          setOptimisticMessages([]);
        },
        onError: () => {
          // 실패 시 낙관적 메시지 제거 또는 에러 표시 (여기서는 제거)
          setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
          alert("메시지 전송에 실패했습니다.");
        },
      }
    );
  };

  return (
    <PageContainer>
      <ChatHeader name={characterName} imageUrl={characterImage} />
      <ChatContent>
        <MessageList>
          {formattedMessages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {optimisticMessages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isSending && (
            <TypingBubble>
              <span>작성중...</span>
            </TypingBubble>
          )}
          <div ref={scrollRef} />
        </MessageList>
      </ChatContent>
      <ChatInput onSendMessage={handleSendMessage} />
    </PageContainer>
  );
};

// ... styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
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

const TypingBubble = styled.div`
  align-self: flex-start;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.gray[10]};
  border-radius: 4px 20px 20px 20px;
  margin-left: 44px;
  color: ${({ theme }) => theme.colors.gray[70]};
  font-size: 0.875rem;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default ChatPage;
