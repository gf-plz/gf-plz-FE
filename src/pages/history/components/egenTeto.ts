export const EGEN_TETO_COLORS = {
  에겐: "#EBB9FF", // 옅은 보라 (이미지 글자색 #DA55FF의 밝은 버전)
  테토: "#CCE4FF", // 옅은 파랑 (이미지 글자색 #3A86FF의 밝은 버전)
} as const;

export type EgenTetoType = keyof typeof EGEN_TETO_COLORS;

export const getEgenTetoColor = (tag: string) => {
  // "테토 75%"와 같은 문자열에서 시작 부분이 일치하는지 확인
  if (tag.startsWith("에겐")) {
    return EGEN_TETO_COLORS["에겐"];
  }
  if (tag.startsWith("테토")) {
    return EGEN_TETO_COLORS["테토"];
  }
  return "#eeeff1"; // 기본값 회색
};
