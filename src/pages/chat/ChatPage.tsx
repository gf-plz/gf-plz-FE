import styled from "@emotion/styled";
import { ChatHeader, ChatInput, ChatMessage, type Message } from "./components";
import { useLocation } from "react-router-dom";
import { useGetSessionMessage } from "./hooks/useGetSessionMessage";
import { usePostMessage } from "./hooks/usePostMessage";
import type { MessageResponse } from "./types/message";
import { useEffect, useRef } from "react";
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
  }, [formattedMessages]);

  if (isPending) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  const handleSendMessage = (text: string) => {
    if (!characterId || !sessionId) {
      console.error("Missing characterId or sessionId");
      return;
    }

    sendMessage({
      characterId,
      sessionId,
      message: text,
    });
  };

  return (
    <PageContainer>
      <ChatHeader name={characterName} imageUrl={characterImage} />
      <ChatContent>
        <MessageList>
          {formattedMessages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isSending && (
            <LoadingBubble>
              <div className="dot-flashing"></div>
            </LoadingBubble>
          )}
          <div ref={scrollRef} />
        </MessageList>
      </ChatContent>
      <ChatInput onSendMessage={handleSendMessage} />
    </PageContainer>
  );
};

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

const LoadingBubble = styled.div`
  align-self: flex-start;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.gray[10]};
  border-radius: 4px 20px 20px 20px;
  margin-left: 44px; // 프로필 이미지 너비 + gap 고려

  .dot-flashing {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;

    &::before,
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
    }

    &::before {
      left: -12px;
      width: 8px;
      height: 8px;
      border-radius: 5px;
      background-color: #9880ff;
      color: #9880ff;
      animation: dot-flashing 1s infinite alternate;
      animation-delay: 0s;
    }

    &::after {
      left: 12px;
      width: 8px;
      height: 8px;
      border-radius: 5px;
      background-color: #9880ff;
      color: #9880ff;
      animation: dot-flashing 1s infinite alternate;
      animation-delay: 1s;
    }
  }

  @keyframes dot-flashing {
    0% {
      background-color: #9880ff;
    }
    50%,
    100% {
      background-color: rgba(152, 128, 255, 0.2);
    }
  }
`;

export default ChatPage;
