// 메시지를 적절한 길이로 나누는 함수
export const splitMessage = (text: string, maxLength: number = 60): string[] => {
  if (text.length <= maxLength) {
    return [text];
  }

  const chunks: string[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    // 최대 길이만큼 자르기
    let endIndex = currentIndex + maxLength;

    // 문장 끝(마침표, 느낌표, 물음표)을 찾아서 그 위치에서 자르기
    if (endIndex < text.length) {
      const lastPeriod = text.lastIndexOf(".", endIndex);
      const lastExclamation = text.lastIndexOf("!", endIndex);
      const lastQuestion = text.lastIndexOf("?", endIndex);
      const lastNewline = text.lastIndexOf("\n", endIndex);

      const lastBreak = Math.max(lastPeriod, lastExclamation, lastQuestion, lastNewline);

      // 문장 끝을 찾았고, 현재 위치에서 너무 멀지 않으면 그 위치에서 자르기
      if (lastBreak > currentIndex + maxLength * 0.5) {
        endIndex = lastBreak + 1;
      } else {
        // 공백을 찾아서 자르기
        const lastSpace = text.lastIndexOf(" ", endIndex);
        if (lastSpace > currentIndex) {
          endIndex = lastSpace + 1;
        }
      }
    }

    const chunk = text.slice(currentIndex, endIndex).trim();
    if (chunk) {
      chunks.push(chunk);
    }
    currentIndex = endIndex;
  }

  return chunks;
};

