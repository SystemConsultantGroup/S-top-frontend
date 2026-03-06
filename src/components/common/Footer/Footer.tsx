"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { LogoList } from "./LogoList";
import { useEffect, useState } from "react";

export function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)"); // 다크모드 여부 확인
    setIsDarkMode(darkModeQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches); // 다크모드 변경 시 업데이트
    };

    darkModeQuery.addEventListener("change", handleChange);

    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.title}>
          <h2>성균관대학교 S-TOP</h2>
          <h3>Sungkyun Tech Open Party(S-TOP)</h3>
        </div>
        <div className={styles.terms}>
          <Link href="/privacy">개인정보처리방침</Link>
          <div className={styles.dividertnt} />
          <Link href="/policy">이용약관</Link>
          <div className={styles.dividertnt} />
          <Link
            href="https://www.skku.edu/skku/etc/netizen.do"
            target="_blank"
            rel="noopener noreferrer"
          >
            네티즌윤리규약
          </Link>
        </div>
        <div className={styles.detail}>
          <span>
            (16419) 경기도 수원시 장안구 서부로 2066 성균관대학교 자연과학캠퍼스 소프트웨어융합대학
          </span>
          <span>Copyright 2024. Sungkyunkwan University All Rights reserved.</span>
        </div>
        <div className={styles.logos}>
          {LogoList.map((logo, index) => {
            const appliedStyle =
              isDarkMode && index === 2
                ? { filter: "invert(1)", opacity: "0.7" }
                : { filter: "none", opacity: "1" };

            return (
              <Image
                key={index}
                src={logo.src}
                alt={logo.alt}
                width={0}
                height={0}
                sizes="100vw"
                style={appliedStyle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
