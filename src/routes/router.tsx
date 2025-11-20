import { AppLayout } from "@/components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./paths";
import { CallPage, ChatPage, HistoryPage, MainPage, MyGirlPage, SelectPage } from "@/pages";

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
      {
        path: ROUTES.HISTORY,
        element: <HistoryPage />,
      },
      {
        path: ROUTES.MY_GIRL,
        element: <MyGirlPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
