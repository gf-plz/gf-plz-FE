export const EGEN_TETO_COLORS = {
  에겐: "#EBB9FF", // 옅은 보라 (이미지 글자색 #DA55FF의 밝은 버전)
  테토: "#CCE4FF", // 옅은 파랑 (이미지 글자색 #3A86FF의 밝은 버전)
} as const;

export type EgenTetoType = keyof typeof EGEN_TETO_COLORS;

export const getEgenTetoColor = (type: string) => {
  return EGEN_TETO_COLORS[type as EgenTetoType] || "#eeeff1"; // 기본값 회색
};

