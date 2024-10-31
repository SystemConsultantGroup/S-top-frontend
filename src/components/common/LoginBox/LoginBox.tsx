"use client";

import React from "react";
import { Button } from "@mantine/core";
import classes from "./LoginBox.module.css";

export function LoginBox() {
  const handleKakaoLogin = () => {
    const kakaoClientId = "71c7a5552be46df39f8781d45361e718";
    const redirectUri = "http://localhost:8000/auth/login/kakao";
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${redirectUri}`;
    window.location.href = kakaoUrl;
  };

  return (
    <div className={classes.loginBox}>
      <img src="/images/S-TopLogo.png" alt="Logo" className={classes.logo} />
      <Button
        className={classes.button}
        justify="space-between"
        leftSection={<img src="/images/kakaoLogo.png" alt="카카오" />}
        rightSection={<span />}
        style={{
          backgroundColor: "#FEE500",
          color: "#000000",
        }}
        onClick={handleKakaoLogin}
      >
        카카오 로그인
      </Button>
    </div>
  );
}
