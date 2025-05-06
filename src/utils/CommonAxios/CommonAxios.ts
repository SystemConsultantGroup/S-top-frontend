import { setAccessTokenCookie } from "@/utils/auth/setAccessTokenCookie";
import axios, { AxiosRequestConfig } from "axios";

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _shouldRequestBeRetriedWithReissuedAccessToken?: boolean;
}

type FailedQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: RetryAxiosRequestConfig;
};

/**
 * @description POST: /auth/reissue 의 응답 타입.
 * refresh token 은 Set-Cookie 로 전송되므로 없음
 */
interface ReissueResponse {
  accessToken: string;
}

let isGettingReissuedAccessToken = false;
let failedRequestsQueue: FailedQueueItem[] = [];

/**
 * @description: refresh token 으로 access token 을 재발급 받은 후, 실패한 요청들을 재시도하는 함수
 */
const processFailedRequestsQueue = (error: unknown, reissuedAccessToken: string | null = null) => {
  failedRequestsQueue.forEach(({ resolve, reject, config }) => {
    if (!reissuedAccessToken) return reject(error);

    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${reissuedAccessToken}`;
    resolve(axios(config));
  });

  failedRequestsQueue = [];
};

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
    const originalRequest = _error.config;

    if (
      _error.response?.status === 401 && // access token 만료 포함 기타 사유로 인증 실패 시
      !originalRequest._shouldRequestBeRetriedWithReissuedAccessToken
    ) {
      if (isGettingReissuedAccessToken) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._shouldRequestBeRetriedWithReissuedAccessToken = true;
      isGettingReissuedAccessToken = true;

      try {
        const reissuedAccessToken = await getReissuedAccessToken();
        setAccessTokenCookie(reissuedAccessToken);
        isGettingReissuedAccessToken = false;

        CommonAxios.defaults.headers.Authorization = `Bearer ${reissuedAccessToken}`;
        processFailedRequestsQueue(null, reissuedAccessToken);

        // 기존 요청 재시도 (지금 refresh token 재발급 요청을 촉발한 요청 자체는 failedRequestsQueue 에 없으므로)
        originalRequest.headers.Authorization = `Bearer ${reissuedAccessToken}`;
        return CommonAxios(originalRequest);
      } catch (err) {
        // 기존의 refresh token 으로 access token 을 재발급 받지 못한 경우
        processFailedRequestsQueue(err, null);
        isGettingReissuedAccessToken = false;
        return Promise.reject(err);
      }
    }

    // 특정 에러 코드(4002, 3001)로 로그아웃이 필요한 상황
    // TODO: 여기 처리 필요함
    // if (
    //   error.response?.data?.code === 4002 ||
    //   error.response?.data?.code === 3001 ||
    //   error.response?.data?.code === 4000
    // ) {
    //   fetch("/auth/logout", {
    //     method: "POST",
    //     credentials: "include",
    //   })
    //     .then(() => {
    //       // Cookies.remove(JWT_COOKIE_NAME);
    //       CommonAxios.defaults.withCredentials = false;
    //       // window.location.replace("/");
    //     })
    //     .catch((error) => console.error("Logout failed:", error));
    // } else if (error.response?.status === 401) {
    //   // 401: 인증 실패 → 로그인 페이지(또는 메인)로 리다이렉트
    //   console.log("check refresh token here");
    //   // redirect("/");
    // }
    return Promise.reject(error);
  }
);
