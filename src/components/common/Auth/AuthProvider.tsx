"use client";

import { createContext, useContext, useEffect, useState } from "react";
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

  // fetch previous token
  useEffect(() => {
    setIsLoadingCookie(true);

    const previousToken = Cookies.get(JWT_COOKIE_NAME);
    if (previousToken) {
      setToken(previousToken);
      CommonAxios.defaults.headers.Authorization = `Bearer ${token}`;
      CommonAxios.defaults.withCredentials = true;
    } else {
      setToken(null);
    }

    setIsLoadingCookie(false);
  }, [token]);

  function login(token: string) {
    setIsLoadingCookie(true);

    setToken(token);
    CommonAxios.defaults.headers.Authorization = `Bearer ${token}`;
    Cookies.set(JWT_COOKIE_NAME, token, { "max-age": String(JWT_MAX_AGE) });

    setIsLoadingCookie(false);
  }

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
