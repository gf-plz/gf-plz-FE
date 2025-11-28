import styled from "@emotion/styled";
import { ChatHeader, ChatInput, ChatMessage, type Message } from "./components";
import { useLocation } from "react-router-dom";
import { useGetSessionMessage } from "./hooks/useGetSessionMessage";
import { usePostMessage } from "./hooks/usePostMessage";
import type { MessageResponse } from "./types/message";
import { useEffect, useRef, useState, useMemo } from "react";
import { formatTime, splitMessage } from "@/utils";

const ChatPage = () => {
  const { state } = useLocation();
  const characterName = state?.name || "상대방";
  const characterImage = state?.imageUrl || "";
  const characterId = state?.characterId;
  const sessionId = state?.status?.statusId || "";

  const { data: sessionMessages = [], isPending } = useGetSessionMessage(sessionId);
  const { mutate: sendMessage, isPending: isSending } = usePostMessage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  // 낙관적 업데이트를 위한 로컬 메시지 상태
  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);

  // API 응답을 UI 메시지 포맷으로 변환하고, ASSISTANT 메시지는 여러 개로 나누기
  const formattedMessages: Message[] = useMemo(() => {
    const messages: Message[] = [];
    let consecutiveGroupIndex = 0; // 연속된 상대방 메시지 그룹 내 인덱스

    sessionMessages.forEach((msg: MessageResponse, msgIndex: number) => {
      const isMine = msg.senderRole === "USER";
      const prevMsg = msgIndex > 0 ? sessionMessages[msgIndex - 1] : null;
      const isPrevMine = prevMsg?.senderRole === "USER";

      // 이전 메시지와 같은 발신자이고 연속된 메시지인지 확인
      const isConsecutive = !isMine && !isPrevMine && prevMsg !== null;

      // 연속된 그룹이 시작되면 인덱스 초기화, 아니면 증가
      if (!isConsecutive && !isMine) {
        consecutiveGroupIndex = 0;
      } else if (isConsecutive) {
        consecutiveGroupIndex++;
      }

      const baseMessage = {
        id: msg.messageId.toString(),
        timestamp: formatTime(msg.createdAt),
        isMine,
        senderName: isMine ? "나" : characterName,
        senderProfile: isMine ? "" : characterImage,
        // 연속된 상대방 메시지면 프로필과 이름 숨기기
        showProfile: !isConsecutive,
        showName: !isConsecutive,
        // 연속된 상대방 메시지면 1초씩 지연하여 순차 표시
        animationDelay: !isMine && consecutiveGroupIndex > 0 ? consecutiveGroupIndex * 1 : 0,
      };

      // ASSISTANT 메시지이고 길면 여러 개로 나누기
      if (!isMine && msg.textContent.length > 60) {
        const chunks = splitMessage(msg.textContent, 60);
        chunks.forEach((chunk, index) => {
          messages.push({
            ...baseMessage,
            id: `${msg.messageId}-${index}`,
            text: chunk,
            // 나눈 메시지 중 첫 번째가 아니면 프로필과 이름 숨기기
            showProfile: index === 0 ? baseMessage.showProfile : false,
            showName: index === 0 ? baseMessage.showName : false,
            // 나눈 메시지도 순차적으로 표시
            animationDelay: baseMessage.animationDelay + index * 1,
          });
          // 나눈 메시지도 그룹 인덱스에 포함
          if (index > 0) {
            consecutiveGroupIndex++;
          }
        });
      } else {
        // USER 메시지이거나 짧은 ASSISTANT 메시지는 그대로
        messages.push({
          ...baseMessage,
          text: msg.textContent,
        });
      }
    });

    return messages;
  }, [sessionMessages, characterName, characterImage]);

  // 각 메시지의 animationDelay 추출
  const messageDelays = useMemo(() => {
    return formattedMessages.map((msg) => msg.animationDelay || 0);
  }, [formattedMessages]);

  // 각 메시지가 나타날 때마다 스크롤 하단으로 이동
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (chatContentRef.current) {
        chatContentRef.current.scrollTo({
          top: chatContentRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    // 즉시 스크롤 (첫 번째 메시지)
    scrollToBottom();

    // 각 메시지의 animationDelay에 맞춰서 스크롤 트리거
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    messageDelays.forEach((delay) => {
      const delayMs = delay * 1000;
      if (delayMs > 0) {
        const timeout = setTimeout(() => {
          scrollToBottom();
        }, delayMs);
        timeouts.push(timeout);
      }
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [formattedMessages.length, optimisticMessages.length, isSending, messageDelays]);

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
      <ChatContent ref={chatContentRef}>
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
