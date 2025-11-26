import styled from "@emotion/styled";
import { Heart } from "lucide-react";
import { getMBTIColor, getAttachmentColor, getEgenTetoColor } from "./";

type ContentSectionProps = {
  message: string;
  affection: number;
  tags: string[];
};

export const ContentSection = ({
  message,
  affection,
  tags,
}: ContentSectionProps) => {
  return (
    <Container>
      <MessageBar>{message}</MessageBar>

      <AffectionContainer>
        <HeartIcon size={30} fill="#FF6B6B" stroke="#FF6B6B" />
        <ProgressBar>
          <Progress $value={affection} />
        </ProgressBar>
        <Percentage>{affection}%</Percentage>
      </AffectionContainer>

      <TagList>
        {tags.map((tag, index) => (
          <Tag
            key={index}
            $bgColor={
              index === 0
                ? getMBTIColor(tag)
                : index === 1
                ? getAttachmentColor(tag)
                : getEgenTetoColor(tag)
            }
          >
            {tag}
          </Tag>
        ))}
      </TagList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const MessageBar = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[30]};
  border-radius: 9999px;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const AffectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: 0 ${({ theme }) => theme.spacing[1]};
`;

const HeartIcon = styled(Heart)`
  flex-shrink: 0;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.gray[30]};
  border-radius: 9999px;
  overflow: hidden;
`;

const Progress = styled.div<{ $value: number }>`
  width: ${({ $value }) => $value}%;
  height: 100%;
  background: linear-gradient(90deg, #fcbfc8 0%, #ff7c8b 100%);
  border-radius: 9999px;
`;

const Percentage = styled.span`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  min-width: 32px;
  text-align: right;
`;

const TagList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: center;
  margin-top: 4px;
`;

const Tag = styled.span<{ $bgColor: string }>`
  flex: 1;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ theme }) => theme.colors.text.default};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: 9999px;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
