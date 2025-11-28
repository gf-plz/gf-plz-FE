import styled from "@emotion/styled";
import { Mic, MicOff, PhoneOff, Volume1, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type CallControlsProps = {
  isMuted: boolean;
  isSpeakerOn: boolean;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onEndCall?: () => void;
};

export const CallControls = ({ isMuted, isSpeakerOn, onToggleMute, onToggleSpeaker }: CallControlsProps) => {
  const navigate = useNavigate();
  const handleEndCall = () => {
    navigate(-1);
  };

  return (
    <Container>
      <ActionButtons>
        <ActionButton onClick={onToggleMute}>
          <IconWrapper isActive={isMuted}>{isMuted ? <MicOff /> : <Mic />}</IconWrapper>
          <ButtonLabel>음소거</ButtonLabel>
        </ActionButton>

        <ActionButton onClick={onToggleSpeaker}>
          <IconWrapper isActive={isSpeakerOn}>{isSpeakerOn ? <Volume2 /> : <Volume1 />}</IconWrapper>
          <ButtonLabel>스피커</ButtonLabel>
        </ActionButton>
      </ActionButtons>

      <EndCallGroup>
        <EndCallButton onClick={handleEndCall}>
          <PhoneOff size={32} color="white" fill="white" />
        </EndCallButton>
        <ButtonLabel>통화 종료</ButtonLabel>
      </EndCallGroup>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
  padding-bottom: 2rem;
  z-index: 10;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  width: 100%;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

const IconWrapper = styled.div<{ isActive?: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${(props) => (props.isActive ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.15)")};
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  svg {
    width: 28px;
    height: 28px;
    color: ${(props) => (props.isActive ? "#1a1c20" : "white")};
  }
`;

const ButtonLabel = styled.span`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
`;

const EndCallGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const EndCallButton = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #ff3b30;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);
  transition: transform 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;
