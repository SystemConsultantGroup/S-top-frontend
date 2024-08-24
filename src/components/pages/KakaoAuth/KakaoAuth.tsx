"use client";

import { useAuth } from "@/components/common/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { JWT_COOKIE_NAME } from "@/constants/Auth";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/types/jwtPayload";

export function KakaoAuth() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    // 백엔드에서 브라우저에 설정한 쿠키를 가져옴
    const accessToken = Cookies.get(JWT_COOKIE_NAME);
    if (accessToken) {
      login(accessToken);
      const claims: CustomJwtPayload = jwtDecode(accessToken);
      if (claims.type === "TEMP") {
        // 가입되지 않은 사용자
        router.push("/register");
      } else {
        // 이미 가입된 사용자
        router.push("/");
      }
    } else {
      // 백엔드 오류
      router.push("/login");
    }
  }, [login, router]);

  return <></>;
}
