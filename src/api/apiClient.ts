import { API_BASE_URL } from "@/constants/api";
import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (필요시 인증 토큰 추가 등)
apiClient.interceptors.request.use(
  (config) => {
    // TODO: 인증 토큰이 필요한 경우 여기에 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 공통 에러 처리
    if (error.response) {
      // 서버에서 응답을 받았지만 에러 상태 코드
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.error("Network Error:", error.request);
    } else {
      // 요청 설정 중 에러
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
