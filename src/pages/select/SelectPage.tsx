import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListContainer } from "./components";
import { useGetCharacterList } from "./hooks/useGetCharacterList";
import { PageStatus } from "@/components/common";

const SelectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gender = (searchParams.get("gender") as "male" | "female") || "female";

  // 성별 대문자 변환
  const apiGender = gender === "male" ? "MALE" : "FEMALE";

  const { data: characterList, isPending } = useGetCharacterList({
    relation: "yet",
    gender: apiGender,
  });

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={32} />
        </BackButton>
      </Header>

      <PageStatus
        isLoading={isPending}
        hasData={(characterList?.length ?? 0) > 0}
        loadingText="캐릭터 목록을 불러오는 중입니다."
        emptyText="새로운 캐릭터가 없습니다."
      >
        <ListContainer items={characterList ?? []} />
      </PageStatus>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 60px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.default};
  position: absolute;
  left: ${({ theme }) => theme.spacing[4]};
`;

export default SelectPage;
