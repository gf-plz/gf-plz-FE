import styled from "@emotion/styled";

type BreakActionModalProps = {
  characterName: string;
  onClose: () => void;
  onViewResult: () => void;
  onExtend: () => void;
};

export const BreakActionModal = ({ characterName, onClose, onViewResult, onExtend }: BreakActionModalProps) => {
  return (
    <Backdrop>
      <Dialog>
        <Header>헤어진 날짜가 지났어요</Header>
        <Body>{characterName}님과의 관계가 종료되었어요. 원하시면 결과를 확인하거나 연장을 요청할 수 있어요.</Body>
        <ButtonRow>
          <ResultButton type="button" onClick={onViewResult}>
            결과보기
          </ResultButton>
          <ExtendButton type="button" onClick={onExtend}>
            연장하기
          </ExtendButton>
        </ButtonRow>
        <CloseButton type="button" onClick={onClose}>
          닫기
        </CloseButton>
      </Dialog>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  width: min(420px, 90vw);
  background: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Header = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.title1.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  text-align: center;
`;

const Body = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const BaseButton = styled.button`
  flex: 1;
  border: none;
  border-radius: 12px;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  cursor: pointer;
`;

const ResultButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.primary.default};
  color: white;
`;

const ExtendButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.gray[20]};
  color: ${({ theme }) => theme.colors.text.default};
`;

const CloseButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing[1]};
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text.sub};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  align-self: center;
`;
