export interface MessageResponse {
  messageId: number;
  sessionId: number;
  senderRole: "USER" | "ASSISTANT";
  messageType: "TEXT";
  textContent: string;
  createdAt: string;
}

