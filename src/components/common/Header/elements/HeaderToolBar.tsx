"use client";

import Image from "next/image";
import styles from "../Header.module.css";
import { IconLock, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import { CommonAxios } from "@/utils/CommonAxios";

interface IHeaderToolBarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoggedIn: boolean;
}

export function HeaderToolBar({ isOpen, setIsOpen, isLoggedIn }: IHeaderToolBarProps) {
  const [userData, setUserData] = useState<{ name: string } | null>(null);

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = async () => {
    try {
      const data = await fetcher({ url: "/users/me" });
      setUserData(() => data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

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
                    <a
                      onClick={() => {
                        CommonAxios.post("/auth/logout");
                      }}
                    >
                      로그아웃
                    </a>
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
