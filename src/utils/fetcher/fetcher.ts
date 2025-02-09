import { getServerSideToken } from "@/components/common/Auth";
import { JWT_COOKIE_NAME, REFRESH_TOKEN_NAME } from "@/constants/Auth";
import { CommonAxios } from "@/utils/CommonAxios";
import Cookies from "js-cookie";

export interface FetcherArgs {
  url: string;
  query?: Record<string, unknown>;
  accessToken?: string | null;
  refreshToken?: string | null;
}

/**
 * swr fetcher
 * @param url 요청 URL
 * @param query 쿼리 파라미터
 * @returns api 서버로부터 반환되는 데이터
 */
export async function fetcher({ url, query }: FetcherArgs) {
  const { accessToken } = await getIsomorphicToken();
  CommonAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
  CommonAxios.defaults.withCredentials = true;

  return (await CommonAxios.get(url, { params: query })).data;
}

/**
 * 서버사이드에서 사용하는 fetch 대용 함수
 * @param url 요청 URL
 * @param query 쿼리 파라미터
 * @returns api 서버로부터 반환되는 데이터
 */
export async function ServerSideFetcher({ url, query }: FetcherArgs) {
  const { accessToken, refreshToken } = await getServerSideToken();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `${REFRESH_TOKEN_NAME}=${refreshToken}`,
    },
    params: query,
  };

  return (await CommonAxios.get(url, config)).data;
}

const getIsomorphicToken = async () => {
  if (typeof window !== "undefined") {
    // 브라우저 환경
    const accessToken = Cookies.get(JWT_COOKIE_NAME);
    return { accessToken: accessToken ?? null };
  } else {
    // 서버 환경
    // getServerSideToken 내부의 next/headers 에서 가져오는 cookies 가
    // 클라이언트 프로덕션 환경에서는 문제를 일으켜서 우선 임시로 이렇게 해결
    const { accessToken } = await getServerSideToken();
    return { accessToken: accessToken ?? null };
  }
};
