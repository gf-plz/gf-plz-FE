import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLocation, useSearchParams } from "react-router-dom";
import { CallControls, CallHeader, CallProfile } from "./components";
import { useCallAudio } from "./hooks/useCallAudio";
import { useGetCharacterSession } from "@/pages/chat/hooks/useGetCharacterSession";
import { addImageSuffix } from "@/utils/image";

const CallPage = () => {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const characterName = state?.name || "지민";
  const fallbackImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400";
  const characterImage = addImageSuffix(state?.imageUrl ?? fallbackImage) ?? fallbackImage;
  const queryCharacterId = searchParams.get("id");
  const parsedQueryCharacterId = queryCharacterId ? Number(queryCharacterId) : NaN;
  const characterId =
    state?.characterId ??
    (Number.isFinite(parsedQueryCharacterId) && parsedQueryCharacterId > 0 ? parsedQueryCharacterId : 1);

  const sessionIdFromState = state?.sessionId ?? undefined;
  const normalizedStateSessionId = sessionIdFromState !== undefined ? Number(sessionIdFromState) : undefined;
  const validStateSessionId = Number.isFinite(normalizedStateSessionId) ? normalizedStateSessionId : undefined;

  const [time, setTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  // 음성 녹음 및 전송 훅
  const { data: characterSession } = useGetCharacterSession(characterId);
  const resolvedSessionId = characterSession?.sessionId ?? validStateSessionId;

  useCallAudio({
    characterId,
    sessionId: resolvedSessionId,
    isMuted,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Container>
      <CallHeader name={characterName} time={formatTime(time)} />

      <CallProfile imageUrl={characterImage} />

      <CallControls
        isMuted={isMuted}
        isSpeakerOn={isSpeakerOn}
        onToggleMute={() => setIsMuted(!isMuted)}
        onToggleSpeaker={() => setIsSpeakerOn(!isSpeakerOn)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
  background: linear-gradient(180deg, #2a3038 0%, #1a1c20 100%);
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

export default CallPage;
