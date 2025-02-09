"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { JWT_COOKIE_NAME, JWT_MAX_AGE } from "@/constants/Auth";
import { CommonAxios } from "@/utils/CommonAxios";
import Cookies from "js-cookie";

interface AuthContextValue {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingCookie, setIsLoadingCookie] = useState(true);

  // 🔹 me API 요청 함수 추가
  async function fetchMe() {
    try {
      const response = await CommonAxios.get("/users/me");
      if (response.status === 200) {
        console.log("User data:", response.data);
      } else {
        console.error("Failed to fetch user data:", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // fetch previous token
  useEffect(() => {
    setIsLoadingCookie(true);

    const previousToken = Cookies.get(JWT_COOKIE_NAME);
    if (previousToken) {
      setToken(previousToken);
      CommonAxios.defaults.headers.Authorization = `Bearer ${previousToken}`;
      CommonAxios.defaults.withCredentials = true;
    } else {
      setToken(null);
    }

    setIsLoadingCookie(false);
  }, []);

  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token]);

  // useCallback 으로 감싸주지 않으면, `useAuth()` 사용처에서 의존성 배열에 이 함수를 넣을 경우
  // 무한 렌더링이 발생할 수 있습니다.
  const login = useCallback((token: string) => {
    setIsLoadingCookie(true);

    setToken(token);
    CommonAxios.defaults.headers.Authorization = `Bearer ${token}`;
    CommonAxios.defaults.withCredentials = true;
    Cookies.set(JWT_COOKIE_NAME, token, { "max-age": String(JWT_MAX_AGE), secure: true });

    setTimeout(() => {
      fetchMe(); // 토큰 설정 후 약간의 딜레이를 두고 me API 호출
      setIsLoadingCookie(false);
    }, 0);
  }, []);

  function logout() {
    setIsLoadingCookie(true);

    CommonAxios.post("/auth/logout");
    setToken(null);
    Cookies.remove(JWT_COOKIE_NAME);
    CommonAxios.defaults.withCredentials = false;

    setIsLoadingCookie(false);
    window.location.replace("/");
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isLoggedIn: !!token, isLoading: isLoadingCookie }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error("Error: Please use inside AuthProvider");
  }
  return context;
}
