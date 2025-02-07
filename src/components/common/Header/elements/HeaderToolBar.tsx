"use client";

import { fetcher } from "@/utils/fetcher";
import { IconLock, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../Auth";
import styles from "../Header.module.css";

interface IHeaderToolBarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoggedIn: boolean;
}

export function HeaderToolBar({ isOpen, setIsOpen, isLoggedIn }: IHeaderToolBarProps) {
  const [userData, setUserData] = useState<{ name: string } | null>(null);

  const { logout, isLoading } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크모드 상태 추가

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = async () => {
    try {
      const data2 = await fetcher({ url: "/users/me" });
      const data1 = await fetcher({ url: "/users/me" });
      //setUserData(() => data);
      setUserData(data1 ?? data2);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && !isLoading && !userData) {
      fetchData(); // 로그인하고 유저 데이터가 없을 경우 데이터를 가져오기
    }
  }, [isLoggedIn, isLoading, userData]);

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
    <div className={styles.toolbar}>
      <div className={styles.authorization}>
        {isLoggedIn ? (
          userData ? (
            // 로그인한 유저의 닉네임을 받아왔을 경우
            <>
              <div className={styles.userctrl}>
                <div>
                  <IconUser />
                  <Link href="/mypage" style={{ textDecoration: "none", color: "inherit" }}>
                    {userData.name}
                  </Link>
                </div>
                <ul>
                  <li>
                    <Link href="/mypage" style={{ textDecoration: "none", color: "inherit" }}>
                      내 정보
                    </Link>
                  </li>
                  <li>
                    <a onClick={logout}>로그아웃</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            // 로그인한 유저의 닉네임을 받아오기까지 대기
            <>
              <IconUser />
              <div>Loading...</div>
            </>
          )
        ) : (
          // 로그인하지 않은 사용자의 경우
          <>
            <IconLock className={styles.lockico} />
            <div>
              <Link href="/login" style={{ textDecoration: "none", color: "inherit" }}>
                Login
              </Link>
            </div>
          </>
        )}
      </div>
      <div className={styles.swuniv}>
        <Image
          src="/images/swuniv_logo.png"
          alt="National Center of Excellence in Software"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            filter: isDarkMode ? "invert(1)" : "none", // 다크모드 색상 반전
            opacity: isDarkMode ? 0.7 : 1, // 다크모드 투명도 80%
          }}
        />
      </div>
      <div className={`${styles.hamburger} ${isOpen ? styles.open : ""}`} onClick={toggleHamburger}>
        {[1, 2, 3, 4].map((idx) => (
          <span key={idx}></span>
        ))}
      </div>
    </div>
  );
}
