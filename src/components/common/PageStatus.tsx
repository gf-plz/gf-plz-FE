import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import type { ReactNode } from "react";

type PageStatusProps = {
  isLoading?: boolean;
  hasData?: boolean;
  loadingText?: string;
  emptyText?: string;
  children: ReactNode;
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StatusWrapper = styled.div`
  width: 100%;
  flex: 1;
  min-height: 240px;
  padding: ${({ theme }) => theme.spacing[6]};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  text-align: center;
`;

const StyledSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.gray[20]};
  border-top-color: ${({ theme }) => theme.colors.primary.default};
  animation: ${spin} 0.8s linear infinite;
`;

const StatusText = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.sub};
`;

export const StatusSpinner = () => <StyledSpinner role="status" aria-label="로딩 중" />;
export const StatusMessage = StatusText;

export const PageStatus = ({
  isLoading,
  hasData = true,
  loadingText,
  emptyText,
  children,
}: PageStatusProps) => {
  if (isLoading) {
    return (
      <StatusWrapper>
        <StatusSpinner />
        <StatusMessage>{loadingText ?? "로딩 중입니다..."}</StatusMessage>
      </StatusWrapper>
    );
  }

  if (!hasData) {
    return (
      <StatusWrapper>
        <StatusMessage>{emptyText ?? "표시할 데이터가 없습니다."}</StatusMessage>
      </StatusWrapper>
    );
  }

  return <>{children}</>;
};

