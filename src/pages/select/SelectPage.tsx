import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListContainer } from "./components";

// TODO: API 연동 시 타입 정의 분리
type SelectItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  gender: "male" | "female";
};

// 더미 데이터
const MOCK_SELECT_LIST: SelectItem[] = [
  {
    id: 1,
    name: "지은",
    description: "밝고 활발한 성격의 여자친구",
    imageUrl:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
    gender: "female",
  },
  {
    id: 2,
    name: "민지",
    description: "조용하고 차분한 문학소녀",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    gender: "female",
  },
  {
    id: 3,
    name: "서연",
    description: "솔직하고 당당한 매력",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    gender: "female",
  },
  {
    id: 101,
    name: "도윤",
    description: "다정하고 듬직한 남자친구",
    imageUrl:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=80",
    gender: "male",
  },
  {
    id: 102,
    name: "준호",
    description: "유머러스하고 재치있는 성격",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    gender: "male",
  },
  {
    id: 103,
    name: "우진",
    description: "진중하고 스마트한 공대생",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    gender: "male",
  },
];

const SelectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gender = (searchParams.get("gender") as "male" | "female") || "female";

  // 성별에 따라 리스트 필터링
  const filteredList = MOCK_SELECT_LIST.filter(
    (item) => item.gender === gender
  );

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={32} />
        </BackButton>
      </Header>

      <ListContainer items={filteredList} />
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
