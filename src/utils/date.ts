export const formatTime = (dateString: string) => {
  const utcDateString = dateString.endsWith("Z") ? dateString : `${dateString}Z`;
  const utcDate = new Date(utcDateString);

  return utcDate.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
