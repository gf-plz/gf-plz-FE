import { useEffect, useMemo, useRef } from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ChatHeader, ChatMessage, type Message } from "../chat/components";
import { useGetCharacterSession } from "../chat/hooks/useGetCharacterSession";
import { useGetSessionMessage } from "../chat/hooks/useGetSessionMessage";
import type { MessageResponse } from "../chat/types/message";
import { formatTime, splitMessage } from "@/utils";
import { StatusSpinner, StatusMessage } from "@/components/common";
import { ROUTES } from "@/routes";
import type { HistoryCharacter } from "../history/services/getHistoryList";

const HistoryChatPage = () => {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const historyCharacter = state as HistoryCharacter | undefined;
  const queryCharacterId = searchParams.get("id");
  const parsedQueryCharacterId = queryCharacterId ? Number(queryCharacterId) : NaN;
  const characterId =
    historyCharacter?.characterId ??
    (Number.isFinite(parsedQueryCharacterId) && parsedQueryCharacterId > 0 ? parsedQueryCharacterId : undefined);

  useEffect(() => {
    if (!characterId) {
      navigate(ROUTES.HISTORY, { replace: true });
    }
  }, [characterId, navigate]);

  const characterName = historyCharacter?.name || "히스토리";
  const characterImage = historyCharacter?.imageUrl || "";

  const fallbackSessionId = historyCharacter?.status?.statusId;
  const normalizedFallbackSessionId =
    typeof fallbackSessionId === "number" && Number.isFinite(fallbackSessionId) ? fallbackSessionId : undefined;

  const { data: characterSession, isPending: isSessionLoading } = useGetCharacterSession(characterId);
  const resolvedSessionId = characterSession?.sessionId ?? normalizedFallbackSessionId;

  const { data: sessionMessages = [], isPending: isMessagesLoading } = useGetSessionMessage(resolvedSessionId);

  const formattedMessages: Message[] = useMemo(() => {
    const messages: Message[] = [];
    let consecutiveGroupIndex = 0;

    sessionMessages.forEach((msg: MessageResponse, msgIndex: number) => {
      const isMine = msg.senderRole === "USER";
      const prevMsg = msgIndex > 0 ? sessionMessages[msgIndex - 1] : null;
      const isPrevMine = prevMsg?.senderRole === "USER";
      const isConsecutive = !isMine && !isPrevMine && prevMsg !== null;

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
        showProfile: !isConsecutive,
        showName: !isConsecutive,
        animationDelay: !isMine && consecutiveGroupIndex > 0 ? consecutiveGroupIndex * 1 : 0,
      };

      if (!isMine && msg.textContent.length > 60) {
        const chunks = splitMessage(msg.textContent, 60);
        chunks.forEach((chunk, index) => {
          messages.push({
            ...baseMessage,
            id: `${msg.messageId}-${index}`,
            text: chunk,
            showProfile: index === 0 ? baseMessage.showProfile : false,
            showName: index === 0 ? baseMessage.showName : false,
            animationDelay: baseMessage.animationDelay + index * 1,
          });
          if (index > 0) {
            consecutiveGroupIndex++;
          }
        });
      } else {
        messages.push({
          ...baseMessage,
          text: msg.textContent,
        });
      }
    });

    return messages;
  }, [characterImage, characterName, sessionMessages]);

  const messageDelays = useMemo(() => formattedMessages.map((msg) => msg.animationDelay || 0), [formattedMessages]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

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

    scrollToBottom();

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    messageDelays.forEach((delay) => {
      const delayMs = delay * 1000;
      if (delayMs > 0) {
        const timeout = setTimeout(scrollToBottom, delayMs);
        timeouts.push(timeout);
      }
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [formattedMessages.length, messageDelays]);

  const showEmptyMessage = formattedMessages.length === 0;

  if (isSessionLoading || isMessagesLoading) {
    return (
      <PageContainer>
        <ChatHeader name={characterName} imageUrl={characterImage} />
        <LoadingContainer>
          <StatusSpinner />
          <StatusMessage>히스토리 대화 데이터를 불러오는 중입니다.</StatusMessage>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (!resolvedSessionId) {
    return (
      <PageContainer>
        <ChatHeader name={characterName} imageUrl={characterImage} />
        <LoadingContainer>
          <StatusMessage>해당 히스토리의 세션을 찾을 수 없습니다.</StatusMessage>
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ChatHeader name={characterName} imageUrl={characterImage} />
      <ChatContent ref={chatContentRef}>
        <MessageList>
          {formattedMessages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {showEmptyMessage && <ChatEmptyMessage>대화 기록이 없습니다.</ChatEmptyMessage>}
          <div ref={scrollRef} />
        </MessageList>
      </ChatContent>
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
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ChatEmptyMessage = styled(StatusMessage)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

export default HistoryChatPage;
