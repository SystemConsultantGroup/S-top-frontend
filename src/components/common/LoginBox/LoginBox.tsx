"use client";

import React from "react";
import { Button } from "@mantine/core";
import classes from "./LoginBox.module.css";
import Image from "next/image";

const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const redirectUri = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login/kakao`;

export function LoginBox() {
  const handleKakaoLogin = () => {
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${redirectUri}`;
    window.location.href = kakaoUrl;
  };

  return (
    <div className={classes.loginBox}>
      <Image src="/images/S-TopLogo.png" alt="Logo" width={250} height={250} className={classes.logo} />
      <Button
        className={classes.button}
        justify="space-between"
        leftSection={<Image src="/images/kakaoLogo.png" alt="카카오" width={100} height={0}/>}
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
