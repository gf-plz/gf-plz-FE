export const ATTACHMENT_COLORS = {
  안정형: "#FFE597", // 안정형 (노랑)
  의존형: "#FBC6B9", // 의존형 (핑크/주황)
  거부형: "#DDE8F6", // 거부형 (하늘)
  회피형: "#EEE8DD", // 회피형 (베이지/갈색)
} as const;

export type AttachmentType = keyof typeof ATTACHMENT_COLORS;

export const getAttachmentColor = (attachment: string) => {
  // 태그에 #이 붙어있을 수 있으므로 제거 후 매칭 시도
  const cleanAttachment = attachment.replace("#", "") as AttachmentType;
  return ATTACHMENT_COLORS[cleanAttachment] || "#eeeff1"; // 기본값 회색
};

