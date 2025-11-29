import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";

type UseCallAudioParams = {
  characterId: number;
  sessionId?: number;
  isMuted: boolean;
  onAudioReceived?: (audioBlob: Blob) => void;
};

const SILENCE_THRESHOLD = 800; // 0.5초 무음 후 전송
const MAX_CHUNK_DURATION = 4000; // 4초마다 강제 전송
const MIN_RECORDING_DURATION = 500; // 최소 0.5초 녹음해야 전송

export const useCallAudio = ({ characterId, sessionId, isMuted, onAudioReceived }: UseCallAudioParams) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const isProcessingRef = useRef<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);
  const checkIntervalRef = useRef<number | null>(null);
  const lastSoundTimeRef = useRef<number>(Date.now());
  const chunkStartTimeRef = useRef<number>(Date.now());
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const isMountedRef = useRef<boolean>(true);
  const isPlaybackStoppingRef = useRef<boolean>(false);
  const queryClient = useQueryClient();

  const tryRestartRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (isMuted || isPlayingRef.current || !recorder || recorder.state !== "inactive") {
      return;
    }

    recorder.start(1000);
    setIsRecording(true);
    lastSoundTimeRef.current = Date.now();
    chunkStartTimeRef.current = Date.now();
  }, [isMuted]);

  // 오디오 재생
  const playAudio = useCallback(
    (audioBlob: Blob) => {
      // 컴포넌트가 언마운트되었으면 재생하지 않음
      if (!isMountedRef.current) {
        return;
      }

      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }

      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state === "recording") {
        isPlaybackStoppingRef.current = true;
        recorder.stop();
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;
      isPlayingRef.current = true;
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        isPlayingRef.current = false;
        if (audioPlayerRef.current === audio) {
          audioPlayerRef.current = null;
        }
        tryRestartRecording();
      };

      audio.onerror = () => {
        isPlayingRef.current = false;
        URL.revokeObjectURL(audioUrl);
        if (audioPlayerRef.current === audio) {
          audioPlayerRef.current = null;
        }
      };

      audio
        .play()
        .then(() => {})
        .catch((error) => {
          console.error("오디오 재생 실패:", error);
          isPlayingRef.current = false;
          URL.revokeObjectURL(audioUrl);
        });
    },
    [tryRestartRecording]
  );

  // 음성 감지 (간단한 볼륨 체크)
  const checkAudioLevel = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
    const threshold = 30; // 볼륨 임계값

    if (average > threshold) {
      lastSoundTimeRef.current = Date.now();
    }
  }, []);

  // 오디오 청크 전송
  const sendAudioChunk = useCallback(
    async (audioBlob: Blob) => {
      // 이미 처리 중이거나 재생 중이거나 빈 파일이거나 언마운트되었으면 스킵
      if (isProcessingRef.current || isPlayingRef.current || audioBlob.size === 0 || !isMountedRef.current) {
        return;
      }

      if (!sessionId) {
        console.warn("[Audio] sessionId가 없어 전송을 건너뜁니다.");
        return;
      }

      isProcessingRef.current = true;
      setIsProcessing(true);
      try {
        const { postAudio } = await import("../services/postAudio");
        const responseBlob = await postAudio({
          characterId,
          sessionId,
          audioFile: new File([audioBlob], "audio.webm", { type: "audio/webm" }),
        });

        // 컴포넌트가 언마운트되었으면 응답 처리하지 않음
        if (!isMountedRef.current) {
          return;
        }

        // 응답 오디오 재생
        if (responseBlob && responseBlob.size > 0) {
          playAudio(responseBlob);
          onAudioReceived?.(responseBlob);
        }
      } catch (error) {
        // 언마운트된 경우 에러 무시
        if (isMountedRef.current) {
          console.error("오디오 전송 실패:", error);
        }
      } finally {
        if (isMountedRef.current) {
          isProcessingRef.current = false;
          setIsProcessing(false);
        }
        tryRestartRecording();
      }
    },
    [characterId, sessionId, playAudio, onAudioReceived, tryRestartRecording]
  );

  // 녹음 시작
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // AudioContext 생성 (음성 감지용)
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      // MediaRecorder 설정
      const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      chunkStartTimeRef.current = Date.now();

      mediaRecorder.onstop = async () => {
        if (isPlaybackStoppingRef.current) {
          isPlaybackStoppingRef.current = false;
          audioChunksRef.current = [];
          chunkStartTimeRef.current = Date.now();
          return;
        }

        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
          const recordingDuration = Date.now() - chunkStartTimeRef.current;

          // 최소 녹음 시간을 만족하고, 처리 중이 아니고, 재생 중이 아닐 때만 전송
          // 마운트 체크는 sendAudioChunk 내부에서 수행
          if (
            audioBlob.size > 0 &&
            recordingDuration >= MIN_RECORDING_DURATION &&
            !isProcessingRef.current &&
            !isPlayingRef.current
          ) {
            await sendAudioChunk(audioBlob);
          }
          audioChunksRef.current = [];
        }

        // 마운트 상태와 관계없이 시간 리셋 (다음 녹음을 위해)
        chunkStartTimeRef.current = Date.now();
      };

      // 주기적으로 체크하여 전송
      // timeslice를 지정하여 주기적으로 데이터 수집 (1초마다)
      mediaRecorder.start(1000);
      setIsRecording(true);
      lastSoundTimeRef.current = Date.now();

      // 음성 감지 체크
      checkIntervalRef.current = window.setInterval(() => {
        checkAudioLevel();
      }, 100);

      // 무음 감지 후 전송 (시간 기반 전송 제거)
      intervalRef.current = window.setInterval(() => {
        // 녹음 중이 아니거나, 처리 중이거나, 재생 중이면 전송하지 않음
        // 마운트 체크는 sendAudioChunk에서 수행
        if (mediaRecorder.state !== "recording" || isProcessingRef.current || isPlayingRef.current) {
          return;
        }

        const timeSinceLastSound = Date.now() - lastSoundTimeRef.current;
        const recordingDuration = Date.now() - chunkStartTimeRef.current;

        const shouldSendBySilence =
          timeSinceLastSound >= SILENCE_THRESHOLD && recordingDuration >= MIN_RECORDING_DURATION;
        const shouldSendByTime = recordingDuration >= MAX_CHUNK_DURATION;

        const shouldSend = (shouldSendBySilence || shouldSendByTime) && audioChunksRef.current.length > 0;

        if (shouldSend && !isPlayingRef.current) {
          mediaRecorder.stop();
        }
      }, 300); // 0.3초마다 체크 (더 빠른 반응)
    } catch (error) {
      console.error("녹음 시작 실패:", error);
      setIsRecording(false);
    }
  }, [checkAudioLevel, sendAudioChunk]);

  // 녹음 중지
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }

    audioChunksRef.current = [];
    setIsRecording(false);
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.RECENT("FEMALE"),
    });
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.RECENT("MALE"),
    });
  }, [queryClient]);

  // 음소거 상태에 따라 녹음 제어
  useEffect(() => {
    if (isMuted) {
      stopRecording();
    } else if (!isRecording && !isMuted) {
      startRecording();
    }
  }, [isMuted, isRecording, startRecording, stopRecording]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false; // 언마운트 플래그 설정
      stopRecording();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      isProcessingRef.current = false; // 진행 중인 요청 플래그 리셋
    };
  }, [stopRecording]);

  return {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    playAudio,
  };
};
