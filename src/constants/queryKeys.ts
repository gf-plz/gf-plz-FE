export const QUERY_KEYS = {
  RECENT: (gender?: "MALE" | "FEMALE") => ["recent", gender],
  CHARACTER_LIST: (params?: { relation?: "yet" | "now"; gender?: "MALE" | "FEMALE" }) => ["characterList", params],
  CHARACTER_DETAIL: (id: number) => ["characterDetail", id],
  CHARACTER_SESSION: (characterId: number) => ["characterSession", characterId],
  SESSION_MESSAGE: (sessionId: number) => ["sessionMessage", sessionId],
};
