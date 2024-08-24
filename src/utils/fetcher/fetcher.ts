import { REFRESH_TOKEN_NAME } from "@/constants/Auth";
import { CommonAxios } from "@/utils/CommonAxios";

export interface FetcherArgs {
  url: string;
  query?: Record<string, unknown>;
  accessToken?: string | null;
  refreshToken?: string | null;
}

/**
 * swr, 서버사이드 데이터 패칭에 사용할 수 있는 fetch 대용 함수.
 * @param url 요청 URL
 * @param query 쿼리 파라미터
 * @param accessToken 액세스 토큰 (서버사이드에서 사용)
 * @param refreshToken 리프레시 토큰 (서버사이드에서 사용)
 * @returns api 서버로부터 반환되는 데이터
 */
export async function fetcher({ url, query, accessToken, refreshToken }: FetcherArgs) {
  return (
    await CommonAxios.get(url, {
      params: query,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        Cookie: refreshToken ? `${REFRESH_TOKEN_NAME}=${refreshToken}` : undefined,
      },
    })
  ).data;
}
