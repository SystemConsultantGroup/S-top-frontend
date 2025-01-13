import { getServerSideToken } from "@/components/common/Auth";
import { REFRESH_TOKEN_NAME } from "@/constants/Auth";
import { CommonAxios } from "@/utils/CommonAxios";

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
  const { accessToken } = await getServerSideToken();

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
