import { JWT_COOKIE_NAME } from "@/constants/Auth";
import { setAccessTokenCookie } from "@/utils/auth/setAccessTokenCookie";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

/**
 * @description POST: /auth/reissue 의 응답 타입.
 * refresh token 은 Set-Cookie 로 전송되므로 없음
 */
interface ReissueResponse {
  accessToken: string;
}

const getReissuedAccessToken = async () => {
  const res = await CommonAxios.post<ReissueResponse>("/auth/reissue", null, {
    withCredentials: true, // refresh token 은 httpOnly 쿠키 그대로인 상태로 요청
  });

  return res.data.accessToken;
};

/**
 * 클라이언트에서 사용하는 공통 axios
 * baseURL, token 설정 등의 코드 중복 방지 및 interceptor를 통한
 * 응답 성공/실패 시 행동을 설정하기 위해 사용
 */
export const CommonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

interface CustomAxiosResponseInterceptorError {
  config: {
    _shouldRequestBeRetriedWithReissuedAccessToken?: boolean;
    headers: {
      [key: string]: string;
    };
  };
  response: {
    status: number;
  };
}

CommonAxios.interceptors.response.use(
  function (response) {
    // 2xx(200)번대 정상작동
    return response;
  },
  async function (error) {
    const _error = error as CustomAxiosResponseInterceptorError;

    // 인증 실패한 경우 access token 재발급 시도하고 새로고침 함.
    if (
      _error.response?.status === 401 // access token 만료 포함 기타 사유로 인증 실패 시
    ) {
      // SWR 등 비동기 상태 관리 라이브러리 도입 시 invalidate 로 새로고침 없이 구현 가능.
      // 지금은 수동으로 axios 요청을 직접 관리해야 해서 일단 reload 로 구현.
      const reissuedAccessToken = await getReissuedAccessToken();
      setAccessTokenCookie(reissuedAccessToken);
      return window.location.reload();
    }

    // 특정 에러 코드(4002, 3001)로 로그아웃이 필요한 상황
    // TODO: 여기 처리 필요함
    if (
      error.response?.data?.code === 4002 ||
      error.response?.data?.code === 3001 ||
      error.response?.data?.code === 4000
    ) {
      fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
      })
        .then(() => {
          Cookies.remove(JWT_COOKIE_NAME);
          CommonAxios.defaults.withCredentials = false;
          window.location.replace("/");
        })
        .catch((error) => console.error("Logout failed:", error));
    } else if (error.response?.status === 401) {
      // 401: 인증 실패 → 로그인 페이지(또는 메인)로 리다이렉트
      redirect("/");
    }
    return Promise.reject(error);
  }
);
