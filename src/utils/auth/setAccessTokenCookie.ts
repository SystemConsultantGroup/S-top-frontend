import { JWT_COOKIE_NAME, JWT_MAX_AGE } from "@/constants/Auth";
import Cookies from "js-cookie";

// access token 을 브라우저에 non-httpOnly 쿠키로 지정하는 함수.
// TODO: 경고! 이 방식의 토큰 저장의 경우 보안상 매우 취약합니다. 추후 인 메모리 저장 방식 등으로 개편을 검토해야 합니다.
export const setAccessTokenCookie = (token: string) => {
  Cookies.set(JWT_COOKIE_NAME, token, { "max-age": String(JWT_MAX_AGE), secure: true });
};
