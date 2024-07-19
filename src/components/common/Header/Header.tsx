"use client";

import Image from "next/image";
import styles from "./Header.module.css";
import { IconLock } from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import { NavList } from "./NavList";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.header} role="banner">
        <div className={styles.symbol}>
          <div className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="Sungkyun Technology Open Party"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div className={styles.dividerlnt} />
          <div className={styles.title}>
            <h1>S-TOP</h1>
            <span>성균관대학교 소프트웨어융합대학</span>
          </div>
        </div>
        <div className={styles.topnav} role="navigation">
          <ul>
            {NavList.map((topic) => (
              <li key={topic.name}>
                <div>{topic.name}</div>
                <ul>
                  {topic.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.authorization}>
            <IconLock className={styles.lockico} />
            <div>Login</div>
            <div className={styles.dividerlnr} />
            <div>Sign up</div>
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
          <div
            className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
            onClick={toggleHamburger}
          >
            {[1, 2, 3, 4].map((idx) => (
              <span key={idx}></span>
            ))}
          </div>
        </div>
      </div>
      <div className={`${styles.handout} ${isOpen ? styles.show : ""}`}>
        <div className={styles.overview}>
          {NavList.map((topic) => (
            <div key={topic.name}>
              <b>{topic.name}</b>
              <ul>
                {topic.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.shortcuts}>
          <div>
            <Link href="/#">VR 바로가기</Link>
          </div>
          <div>
            <Link href="https://www.skku.edu/skku/index.do">성균관대학교</Link>
            <Link href="https://sw.skku.edu/sw/index.do">소프트웨어융합대학</Link>
            <Link href="https://skb.skku.edu/swuniv/index.do">SW중심대학 사업단</Link>
          </div>
        </div>
      </div>
    </>
  );
}
