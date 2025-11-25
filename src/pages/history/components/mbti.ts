export const MBTI_COLORS = {
  // SP (탐험가형)
  ESFP: "#DDF9FF", // 사교적
  ISFP: "#C3FBD8", // 조용하고 친절
  ESTP: "#FDFDFD", // 유연
  ISTP: "#E5DCF8", // 관대하고 유연

  // SJ (관리자형)
  ESFJ: "#E8FBF3", // 따뜻한 마음
  ISFJ: "#FFC8C8", // 조용하고 친절
  ESTJ: "#EBEBFF", // 실용적
  ISTJ: "#BFE6FA", // 조용하고 진지

  // NF (외교관형)
  ENFP: "#FFEADB", // 따뜻하고 열정적
  INFP: "#D2FAFB", // 이상주의적
  ENFJ: "#FFE5E5", // 반응 좋고 책임감 강함
  INFJ: "#FFD9EC", // 의미 찾는

  // NT (분석가형)
  ENTP: "#FFFACD", // 빠르고 영리
  INTP: "#D9FCD9", // 추상적인 생각
  ENTJ: "#FFF0D9", // 솔직
  INTJ: "#FFDAC1", // 독창적
} as const;

export type MBTIType = keyof typeof MBTI_COLORS;

export const getMBTIColor = (mbti: string) => {
  const upperMBTI = mbti.toUpperCase() as MBTIType;
  return MBTI_COLORS[upperMBTI] || "#eeeff1"; // 기본값 회색
};
