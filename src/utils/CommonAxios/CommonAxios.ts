import { JWT_COOKIE_NAME } from "@/constants/Auth";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

/**
 * 클라이언트에서 사용하는 공통 axios
 * baseURL, token 설정 등의 코드 중복 방지 및 interceptor를 통한
 * 응답 성공/실패 시 행동을 설정하기 위해 사용
 */
export const CommonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

CommonAxios.interceptors.response.use(
  function (response) {
    // 2xx(200)번대 정상작동
    return response;
  },
  async function (error) {
    // 특정 에러 코드(4002, 3001)로 로그아웃이 필요한 상황
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
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
