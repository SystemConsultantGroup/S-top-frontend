import axios from "axios";
import { redirect } from "next/navigation";

/**
 * 클라이언트에서 사용하는 공통 axios
 * baseURL, token 설정 등의 코드 중복 방지 및 interceptor를 통한 응답 성공/실패 시 행동을 설정하기 위해 사용
 */
export const CommonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

CommonAxios.interceptors.response.use(
  function (response) {
    // 200번대 정상작동
    return response;
  },
  function (error) {
    // 400번대 에러
    if (error.response.status === 401) {
      redirect("/");
    }

    return Promise.reject(error);
  }
);
