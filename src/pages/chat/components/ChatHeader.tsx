import { HEADER_HEIGHT } from "@/constants";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

export const ChatHeader = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowLeft size={24} />
      </IconButton>
      <ProfileSection>
        <Avatar src="https://i.pravatar.cc/150?u=gildong" alt="길동" />
        <Name>길동</Name>
      </ProfileSection>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  position: sticky;
  top: 0;
  height: ${HEADER_HEIGHT}px;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray[20]};
`;

const Name = styled.span`
  font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[1]};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.default};
`;
