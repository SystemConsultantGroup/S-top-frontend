import React from "react";
import { Button } from "@mantine/core";
import classes from "./LoginBox.module.css";

interface LoginBoxProps {
  width?: string | number;
  height?: string | number;
  logoSize?: string | number;
  iconSize?: string | number;
}

export function LoginBox({
  width = "auto",
  height = "auto",
  logoSize = 256,
  iconSize = 40,
}: LoginBoxProps) {
  return (
    <div className={classes.loginBox} style={{ width, height }}>
      <img
        src="/images/S-TopLogo.png"
        alt="Logo"
        className={classes.logo}
        style={{ width: logoSize, height: "auto" }}
      />
      <Button
        className={classes.button}
        justify="space-between"
        leftSection={
          <img
            src="/images/kakaoLogo.png"
            alt="카카오"
            style={{ width: iconSize, height: "auto" }}
          />
        }
        rightSection={<span />}
        style={{
          backgroundColor: "#FEE500",
          color: "#000000",
        }}
      >
        카카오 로그인
      </Button>
    </div>
  );
}
