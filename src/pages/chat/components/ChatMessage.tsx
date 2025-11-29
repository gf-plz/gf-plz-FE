import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export type Message = {
  id: string;
  text: string;
  timestamp: string;
  isMine: boolean;
  senderName?: string;
  senderProfile?: string;
  showProfile?: boolean; // 프로필 이미지 표시 여부
  showName?: boolean; // 이름 표시 여부
  animationDelay?: number; // 애니메이션 지연 시간 (초)
};

type ChatMessageProps = {
  message: Message;
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const showProfile = message.showProfile !== false; // 기본값 true
  const showName = message.showName !== false; // 기본값 true

  return (
    <Container isMine={message.isMine} animationDelay={message.animationDelay || 0}>
      {!message.isMine && showProfile && (
        <ProfileWrapper>
          <ProfileImage src={message.senderProfile} alt="" />
        </ProfileWrapper>
      )}
      {!message.isMine && !showProfile && <EmptyProfileSpace />}
      <ContentWrapper isMine={message.isMine}>
        {!message.isMine && showName && <SenderName>{message.senderName}</SenderName>}
        <BubbleWrapper isMine={message.isMine}>
          {message.isMine && <Time>{message.timestamp}</Time>}
          <Bubble isMine={message.isMine}>{message.text}</Bubble>
          {!message.isMine && <Time>{message.timestamp}</Time>}
        </BubbleWrapper>
      </ContentWrapper>
    </Container>
  );
};

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div<{ isMine: boolean; animationDelay: number }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
  animation: ${slideIn} 0.3s ease forwards;
  animation-delay: ${({ animationDelay }) => animationDelay}s;
  opacity: 0;
`;

const ProfileWrapper = styled.div`
  flex-shrink: 0;
`;

const EmptyProfileSpace = styled.div`
  width: 36px;
  flex-shrink: 0;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray[20]};
`;

const ContentWrapper = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
  gap: ${({ theme }) => theme.spacing[1]};
  max-width: 70%;
`;

const SenderName = styled.span`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  color: ${({ theme }) => theme.colors.text.sub};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

const BubbleWrapper = styled.div<{ isMine: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[1]};
  flex-direction: row;
`;

const Bubble = styled.div<{ isMine: boolean }>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ isMine }) => (isMine ? "20px 4px 20px 20px" : "4px 20px 20px 20px")};
  background-color: ${({ isMine, theme }) =>
    isMine ? "#FFE066" : theme.colors.gray[10]}; // Yellow for me, Gray for other
  color: ${({ theme }) => theme.colors.text.default};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const Time = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.gray[60]};
  margin-bottom: 2px;
  white-space: nowrap;
`;
