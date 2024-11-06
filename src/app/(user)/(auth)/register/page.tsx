"use client";

import React from "react";
import styles from "./registerPage.module.css";
import { RegisterForm } from "@/components/common/RegisterForm/registerForm";

export default function RegisterPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.registerContainer}>
        <RegisterForm />
      </div>
    </div>
  );
}
