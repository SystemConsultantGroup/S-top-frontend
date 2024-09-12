import React from "react";
import { LoginBox } from "@/components/common/LoginBox/LoginBox";
import styles from "./loginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <LoginBox />
      </div>
    </div>
  );
}
