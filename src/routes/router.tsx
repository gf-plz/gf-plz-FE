import { AppLayout } from "@/components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./paths";
import MainPage from "../pages/main/MainPage";
import ChatPage from "../pages/chat/ChatPage";
import CallPage from "../pages/call/CallPage";
import SelectPage from "../pages/select/SelectPage";

/**
 * 애플리케이션 라우터 설정
 * - 각 페이지별로 다른 레이아웃 타입 적용
 * - 404 페이지는 레이아웃 없이 표시
 */
const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTES.CHAT,
        element: <ChatPage />,
      },
      {
        path: ROUTES.MENTOR,
        element: <CallPage />,
      },
      {
        path: ROUTES.MY,
        element: <SelectPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
