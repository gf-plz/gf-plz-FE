export interface CharacterStatus {
  statusId: number;
  relation: string;
  startDay: string | null;
  endDay: string | null;
  like: number;
}

export interface Character {
  characterId: number;
  mbti: string;
  attachment: string;
  teto: number;
  gender: "MALE" | "FEMALE";
  name: string;
  description: string;
  imageUrl: string;
  voiceType: string;
  status: CharacterStatus;
}

