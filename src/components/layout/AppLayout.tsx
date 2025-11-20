import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { TheHeader, type HeaderType } from "./TheHeader";
import { APP_WIDTH } from "@/constants";

type AppLayoutProps = {
  headerType?: HeaderType;
};

export const AppLayout = ({ headerType = "default" }: AppLayoutProps) => {
  return (
    <Background>
      <Container>
        {headerType === "default" && <TheHeader />}
        <Main>
          <Outlet />
        </Main>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  min-height: 100dvh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${APP_WIDTH}px;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 0;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
`;
