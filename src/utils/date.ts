export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  // 한국 시간과 UTC 시간의 차이인 9시간을 더해줍니다.
  // 서버에서 UTC로 준다고 가정하거나, 로컬 시간대와의 차이를 보정
  // 만약 서버가 이미 KST라면 이 로직은 필요 없을 수 있으나,
  // 브라우저가 UTC로 해석하는 것을 방지하기 위해 조정합니다.
  
  // 단순히 Date 객체로 만들면 브라우저 로컬 타임존(KST)으로 변환됩니다.
  // 하지만 "2025-11-28T11:06:17" 처럼 타임존 정보 없이 오면 
  // 브라우저는 이를 로컬 시간(KST 11시)으로 해석할 수 있습니다.
  // 만약 이게 UTC 11시라면 KST로는 20시여야 합니다.
  
  // 타임존 정보(Z)가 없는 ISO 문자열의 경우:
  // 1. 서버가 UTC로 보냈다면 'Z'를 붙여서 UTC임을 명시
  const utcDateString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;
  const utcDate = new Date(utcDateString);

  return utcDate.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

