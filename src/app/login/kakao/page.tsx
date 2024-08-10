"use client";

import { useAuth } from "@/components/common/Auth";
import { fetcher } from "@/utils/fetcher/fetcher";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

interface ResponseType {
  accessToken: string;
}

export default function Kakao() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const loginHandler = useCallback(
    async (code: string | string[]) => {
      // 백엔드 auth api
      const response: ResponseType = await fetcher({
        url: "http://localhost:8000/auth/login/kakao",
        query: { code: code },
      });
      if (response) {
        // Context에 토큰 저장
        console.log(response.accessToken);
        login(response.accessToken);
        router.push("/");
      } else {
        // 백엔드 통신 오류
        router.push("/");
      }
    },
    [router, login]
  );

  useEffect(() => {
    if (code) {
      loginHandler(code);
    } else if (error) {
      // 카카오 통신 오류
      router.push("/");
    }
  }, [code]);

  return <></>;
}
