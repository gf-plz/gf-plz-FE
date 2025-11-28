export const QUERY_KEYS = {
  RECENT: ["recent"],
  CHARACTER_LIST: (params?: { relation?: "yet" | "now"; gender?: "MALE" | "FEMALE" }) => ["characterList", params],
};
