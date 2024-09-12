"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginBox } from "@/components/common/LoginBox/LoginBox";
import styles from "./loginPage.module.css";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        try {
          await axios.get(`http://localhost:8000/auth/login/kakao?code=${code}`, {
            withCredentials: true,
          });
          router.push("/register");
        } catch (error) {
          console.error("카카오 로그인 실패:", error);
        }
      }
    };

    handleKakaoLogin();
  }, [router]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <LoginBox />
      </div>
    </div>
  );
}
