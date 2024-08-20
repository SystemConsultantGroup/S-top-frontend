"use client";

import React from "react";
import styles from "./registerPage.module.css";
import { RegisterForm } from "@/components/pages/registerPage/registerForm";

export default function RegisterPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.registerContainer}>
        <RegisterForm />
      </div>
    </div>
  );
}
