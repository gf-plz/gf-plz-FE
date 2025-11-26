import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ListContainer } from "./components";

// TODO: API 연동 시 타입 정의 분리
type SelectItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

// 더미 데이터
const MOCK_SELECT_LIST: SelectItem[] = [
  {
    id: 1,
    name: "길동",
    description: "밝고 활발한 성격의 여자친구",
    imageUrl:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "길동",
    description: "밝고 활발한 성격의 여자친구",
    imageUrl:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "길동",
    description: "밝고 활발한 성격의 여자친구",
    imageUrl:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "길동",
    description: "밝고 활발한 성격의 여자친구",
    imageUrl:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=600&q=80",
  },
];

const SelectPage = () => {
  const navigate = useNavigate();
  // TODO: 선택 상태 관리 (선택된 카드 테두리 강조 등)
  // const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={32} />
        </BackButton>
      </Header>

      <ListContainer items={MOCK_SELECT_LIST} />
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
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.default};
`;

export default SelectPage;
