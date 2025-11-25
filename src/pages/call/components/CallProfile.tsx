import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

type CallProfileProps = {
  imageUrl: string;
};

export const CallProfile = ({ imageUrl }: CallProfileProps) => {
  return (
    <Container>
      <RippleCircle delay="0s" />
      <RippleCircle delay="1s" />
      <RippleCircle delay="2s" />
      <ProfileImage src={imageUrl} alt="Profile" />
    </Container>
  );
};

const ripple = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.4;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform: scale(2);
    opacity: 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Container = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  z-index: 5;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
`;

const RippleCircle = styled.div<{ delay: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  animation: ${ripple} 3s infinite linear;
  animation-delay: ${(props) => props.delay};
  z-index: 1;
`;
