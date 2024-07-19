import React from "react";
import classes from "./LoginBox.module.css";

export function LoginBox() {
  return (
    <div className={classes.loginBox}>
      <img src="/images/S-TopLogo.png" alt="Logo" className={classes.logo} />
      <img src="/images/kakaoLoginButton.png" alt="카카오 로그인" className={classes.button} />
      <img src="/images/naverLoginButton.png" alt="네이버 로그인" className={classes.button} />
    </div>
  );
}
